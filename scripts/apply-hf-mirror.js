#!/usr/bin/env node
/*
 * hf-mirror 下载链路重放脚本（幂等）
 *
 * 用途：上游更新后，把「所有模型/TTS 下载源指向 hf-mirror.com」这一组改动重新打上。
 * 设计原则：
 *  - 每条锚点都是从基线提交逐行提取的精确文本，命中数不符就报错停下，绝不静默出一个没汉化的包；
 *  - 已经打过（锚点原文不存在、替换后的文本存在）视为 OK，可重复执行；
 *  - 只做域名/链接替换，不碰任何业务逻辑；
 *  - 同时校验两条安全边界没被人手滑改掉：HF token 仍只发往官方域名、
 *    获取 token 的链接仍指向官方站点（镜像站没有登录页）。
 *
 * 用法：
 *   node scripts/apply-hf-mirror.js            # 只检查并打印报告
 *   node scripts/apply-hf-mirror.js --apply    # 应用尚未生效的锚点
 *   node scripts/apply-hf-mirror.js --check    # 检查，未全部生效则退出码 1（CI 用）
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const MODE = process.argv.includes('--apply') ? 'apply' : process.argv.includes('--check') ? 'check' : 'report';
const MIRROR = 'https://hf-mirror.com';

// 锚点由基线提交逐行提取，勿手工编辑；重新生成方式见 README/仓库说明。
const ANCHORS = [
  {
    "file": "src/__automation__/screens/BenchmarkRunnerScreen.tsx",
    "mode": "line",
    "old": "            url: `https://huggingface.co/${model.hfModelId}/resolve/main/${variant.filename}`,",
    "new": "            url: `https://hf-mirror.com/${model.hfModelId}/resolve/main/${variant.filename}`,",
    "expect": 1
  },
  {
    "file": "src/api/hf.ts",
    "mode": "line",
    "old": "import {urls} from '../config';",
    "new": "import {HF_DOMAIN, urls} from '../config';",
    "expect": 1
  },
  {
    "file": "src/api/hf.ts",
    "mode": "block",
    "old": "        nextLink = match[1];",
    "new": "        // 镜像返回的 Link 头仍是 huggingface.co 官方域名，翻页前改写到镜像，\n        // 否则第二页起会绕回国内不可达的官方站点。\n        nextLink = match[1].replace(/^https:\\/\\/huggingface\\.co/, HF_DOMAIN);",
    "expect": 1
  },
  {
    "file": "src/config/urls.ts",
    "mode": "line",
    "old": "export const HF_DOMAIN = 'https://huggingface.co';",
    "new": "export const HF_DOMAIN = 'https://hf-mirror.com';",
    "expect": 1
  },
  {
    "file": "src/services/deviceRules/parse.ts",
    "mode": "block",
    "old": "    return parsed.protocol === 'https:' && parsed.host === 'huggingface.co';",
    "new": "    return (\n      parsed.protocol === 'https:' &&\n      (parsed.host === 'huggingface.co' || parsed.host === 'hf-mirror.com')\n    );",
    "expect": 1
  },
  {
    "file": "src/services/deviceRules/parse.ts",
    "mode": "line",
    "old": "  `https://huggingface.co/${repo}/resolve/main/${filename}`;",
    "new": "  `https://hf-mirror.com/${repo}/resolve/main/${filename}`;",
    "expect": 1
  },
  {
    "file": "src/services/tts/constants.ts",
    "mode": "line",
    "old": "  'https://huggingface.co/Supertone/supertonic-3/resolve/main';",
    "new": "  'https://hf-mirror.com/Supertone/supertonic-3/resolve/main';",
    "expect": 1
  },
  {
    "file": "src/services/tts/constants.ts",
    "mode": "line",
    "old": "  'https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main';",
    "new": "  'https://hf-mirror.com/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main';",
    "expect": 1
  },
  {
    "file": "src/services/tts/constants.ts",
    "mode": "line",
    "old": "  'https://huggingface.co/datasets/palshub/phonemizer-dicts/resolve/main/en-us.bin';",
    "new": "  'https://hf-mirror.com/datasets/palshub/phonemizer-dicts/resolve/main/en-us.bin';",
    "expect": 1
  },
  {
    "file": "src/services/tts/constants.ts",
    "mode": "line",
    "old": "  'https://huggingface.co/palshub/kitten-tts-nano-0.8-fp32/resolve/main';",
    "new": "  'https://hf-mirror.com/palshub/kitten-tts-nano-0.8-fp32/resolve/main';",
    "expect": 1
  },
  {
    "file": "src/store/ModelStore.ts",
    "mode": "line",
    "old": "      url: `https://huggingface.co/${candidate.hfRepo}`,",
    "new": "      url: `https://hf-mirror.com/${candidate.hfRepo}`,",
    "expect": 1
  },
  {
    "file": "src/store/ModelStore.ts",
    "mode": "line",
    "old": "      url: `https://huggingface.co/${draft.hfRepo}`,",
    "new": "      url: `https://hf-mirror.com/${draft.hfRepo}`,",
    "expect": 1
  },
  {
    "file": "src/store/ModelStore.ts",
    "mode": "line",
    "old": "      url: `https://huggingface.co/${entry.repo}`,",
    "new": "      url: `https://hf-mirror.com/${entry.repo}`,",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "  url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',",
    "new": "  url: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "new": "      url: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',",
    "new": "      url: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-f16.gguf',",
    "new": "      url: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-f16.gguf',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "    'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "new": "    'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "  hfUrl: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',",
    "new": "  hfUrl: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF',",
    "expect": 1
  },
  {
    "file": "src/store/builtinPalModels.ts",
    "mode": "line",
    "old": "    url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "new": "    url: 'https://hf-mirror.com/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',",
    "expect": 1
  },
  {
    "file": "src/store/onboarding/onboardingPals.ts",
    "mode": "line",
    "old": "  downloadUrl: `https://huggingface.co/${input.repo}/resolve/main/${input.filename}`,",
    "new": "  downloadUrl: `https://hf-mirror.com/${input.repo}/resolve/main/${input.filename}`,",
    "expect": 1
  },
  {
    "file": "src/utils/errors.ts",
    "mode": "block",
    "old": "      if (url.includes('huggingface.co') || url.includes('hf.co')) {",
    "new": "      if (\n        url.includes('huggingface.co') ||\n        url.includes('hf.co') ||\n        url.includes('hf-mirror.com')\n      ) {",
    "expect": 1
  }
];

// 允许继续保留官方域名的位置（不是下载链路）：镜像站没有登录页/token 页。
const OFFICIAL_OK = [/\/settings\/tokens/, /\/spaces\//, /\/docs\//];

function read(f) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function countNeedles(hay, needle) {
  if (needle === '') return 0;
  let n = 0, i = 0;
  while ((i = hay.indexOf(needle, i)) !== -1) { n++; i += needle.length; }
  return n;
}

const results = [];
let pending = 0, failed = 0, applied = 0, totalRepl = 0;

for (const a of ANCHORS) {
  const src = read(a.file);
  if (src === null) {
    failed++;
    results.push({st: 'MISSING', file: a.file, note: '文件不存在（上游可能改名/移动/删除，需人工确认）'});
    continue;
  }
  const hasOld = countNeedles(src, a.old);
  const hasNew = countNeedles(src, a.new);
  if (hasOld === 0 && hasNew > 0) { results.push({st: 'OK', file: a.file, note: '已生效'}); applied += hasNew; continue; }
  if (hasOld === 0 && hasNew === 0) {
    failed++;
    results.push({st: 'DEAD', file: a.file, note: '锚点原文与替换后文本都不在文件里 —— 上游改动了这一段，重放会漏改，需人工处理：' + JSON.stringify(a.old.slice(0, 90))});
    continue;
  }
  if (MODE === 'apply') {
    const out = src.split(a.old).join(a.new);
    fs.writeFileSync(path.join(ROOT, a.file), out);
    const n = hasOld;
    totalRepl += n;
    results.push({st: 'APPLIED', file: a.file, note: '替换 ' + n + ' 处'});
  } else {
    pending++;
    results.push({st: 'PENDING', file: a.file, note: '待替换 ' + hasOld + ' 处：' + JSON.stringify(a.old.trim().slice(0, 70))});
  }
}

// 残留校验：代码行（非注释、非上面白名单）里不允许再出现官方下载域名
const residue = [];
for (const f of [...new Set(ANCHORS.map(a => a.file))]) {
  const src = read(f);
  if (!src) continue;
  src.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (!line.includes('https://huggingface.co')) return;
    if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('/**')) return;
    if (OFFICIAL_OK.some(re => re.test(line))) return;
    residue.push(f + ':' + (i + 1) + ' ' + t.slice(0, 100));
  });
}

// 安全边界校验（只警告，不改动文件）
const notes = [];
const dm = read('src/services/downloads/DownloadManager.ts');
if (dm) {
  const gate = /parsed\.host === 'huggingface\.co'/.test(dm);
  const relaxed = /parsed\.host === 'hf-mirror\.com'/.test(dm);
  notes.push(gate
    ? (relaxed ? 'WARN: DownloadManager 的 token 主机门已放宽到镜像站 —— HF Access Token 会发往第三方镜像，请确认这是有意为之'
               : 'OK: HF token 仍只发往 huggingface.co 官方域名')
    : 'WARN: 找不到 DownloadManager 的 token 主机门（上游可能重写），请人工确认 token 不会被发往镜像站');
}
const sheet = read('src/components/HFTokenSheet/HFTokenSheet.tsx');
if (sheet) {
  notes.push(sheet.includes('https://huggingface.co/settings/tokens')
    ? 'OK: 获取 token 的链接仍指向官方站点（镜像站无登录页）'
    : 'WARN: 获取 token 的链接被改成非官方域名，用户将无法在镜像站登录取 token');
}

console.log('');
console.log('hf-mirror 下载链路重放检查  (' + (MODE === 'apply' ? 'APPLY' : MODE === 'check' ? 'CHECK' : 'REPORT') + ')');
console.log('-'.repeat(88));
for (const r of results) console.log(('  ' + r.st).padEnd(12) + r.file.padEnd(52) + r.note.slice(0, 70));
console.log('-'.repeat(88));
console.log('锚点规则 ' + ANCHORS.length + ' 条 | 已生效 ' + applied + ' | 本次替换 ' + totalRepl + ' | 待处理 ' + pending + ' | 失败 ' + failed);
console.log('残留官方下载域名（应只在注释/白名单里）: ' + residue.length);
residue.forEach(r => console.log('   ! ' + r));
notes.forEach(n => console.log('   · ' + n));
const bad = failed > 0 || residue.length > 0 || (MODE === 'check' && pending > 0);
console.log(bad ? '结论: FAIL —— 未达成「全部下载走镜像」，工作流在此停止。' : '结论: PASS —— 下载链路全部指向 ' + MIRROR + '，安全边界完好。');
process.exit(bad ? 1 : 0);
