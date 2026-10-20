---
<div align="center"> 
<img src="src/assets/pocketpal-dark-v2.png" alt="PocketPal AI 标志" width="120" />
 
# 口袋伙伴AI-中文优化版
 
**本地私有AI。**
 
文字聊天，语音聊天，本地调用工具。无需注册账号，无需云端，也无需联网。
 
<a href="https://pocketpal.dev/"><strong>pocketpal.dev</strong></a> ·
 
<a href="#get-the-app">获取应用</a> ·
 
<a href="https://pocketpal.dev/leaderboard">排行榜</a> ·
 
<a href="https://palshub.ai/">PalsHub</a> ·
 
<a href="https://github.com/a-ghorbani/pocketpal-ai/discussions">讨论</a>
 
<br/>
 
[![App Store](https://img.shields.io/badge/App_Store-下载-0D96F6?logo=apple&logoColor=white)](https://apps.apple.com/us/app/pocketpal-ai/id6502579498)
 
[![Google Play](https://img.shields.io/badge/Google_Play-获取-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.pocketpalai)
 
[![最新版本](https://img.shields.io/github/v/release/a-ghorbani/pocketpal-ai?sort=semver)](https://github.com/a-ghorbani/pocketpal-ai/releases)
 
[![许可证：MIT](https://img.shields.io/github/license/a-ghorbani/pocketpal-ai)](LICENSE)
 
[![Star数](https://img.shields.io/github/stars/a-ghorbani/pocketpal-ai)](https://github.com/a-ghorbani/pocketpal-ai/stargazers)
 
[![开放问题](https://img.shields.io/github/issues/a-ghorbani/pocketpal-ai)](https://github.com/a-ghorbani/pocketpal-ai/issues)
 
[![赞助商](https://img.shields.io/github/sponsors/a-ghorbani?logo=githubsponsors)](https://github.com/sponsors/a-ghorbani)
 
</div>
 
## 为什么做此分支？
 
国内网络下载模型很麻烦，口袋ai原版从本地上传模型并不能手动绑定投影模型，
搜索了其他分支，也有国内网络优化版，但是落后于官方版，最新官方版激活了骁龙NPU
本分支除了修改模型商店地址链接为国内镜像源:hf-mirror 之外无任何改动，仅做网络优化

本分支Bug:

模型商店需要令牌下载的模型不支持下载，
模型跑分后排行榜不可用
其他暂时未发现

以下是官方原版介绍：

大多数人工智能应用不过是通向他人服务器的一扇薄窗——你输入的每一条消息都会被发送到某个你看不见的地方，被记录并加以分析。而 PocketPal 则彻底颠覆了这一模式：**人工智能就运行在你的手机上，你的对话也始终留在本地，不会外传。**
 
- **🔒 默认私密** — 每一条提示、每一条回复以及每一份文档都仅保存在您的设备上。不会将任何内容上传或存储到外部服务器。
 
- **✈️ 离线可用** — 只需下载一次模型，即可随时随地使用，无需联网，也无需注册账号。在飞机上、在徒步路上， anywhere 都能用。
 
- **📱 适用于您已有的硬件** — 真正的语言模型、语音和工具，经过优化，可充分发挥您手机的 CPU、GPU 和 NPU 性能。
 
- **🆓 免费且开源** — 无需订阅，也无须购买“专业版”即可使用AI。采用MIT许可证，并在开放环境下构建。
 
> **隐私说明：** 从您的设备中流出的唯一数据，仅限于您主动选择分享的内容——即基准测试结果（如果您选择加入排行榜）以及您通过应用提交的反馈。
 
## 目录
 
- [功能](#features)
 
- [获取应用](#get-the-app)
 
- [工作原理](#how-it-works)
 
- [使用该应用](#using-the-app)
 
- [面向开发者](#for-developers)
 
- [贡献](#contributing)
 
- [路线图](#roadmap)
 
- [社区与支持](#community--support)
 
- [许可证](#license)
 
## 特性 
- **🧠 本地聊天** — 完全离线运行 GGUF 语言模型（Gemma、Qwen、Phi、Llama 等）。
 
- **🗣️ 文本转语音** — 通过设备端的神经网络文本转语音技术（Kokoro及其他引擎），为您的助手赋予声音，无需云端调用。
 
- **🎭 伙伴** — 创建拥有专属模型、系统提示词和个性的个性化助手（助理型与角色扮演型）。
 
- **🛍️ [PalsHub](https://palshub.ai/)** — 发现并安装社区中的Pals，包括可通过应用内购买获取的高级版。
 
- **🛠️ 技能与工具** — 让有能力的伙伴在工具使用循环中调用内置工具（计算器、日期/时间、富文本渲染）。
 
- **📥 Hugging Face 集成** — 使用您的访问令牌，直接从 HF Hub 搜索并下载 GGUF 模型，包括受限制的模型。
 
- **📊 基准测试** — 测量每秒处理的令牌数和内存占用，并可选择在[AI手机排行榜](https://pocketpal.dev/leaderboard)上进行对比。
 
- **⚡ 硬件加速** — 支持 CPU、GPU（iOS 上的 Metal，Android 上的 OpenCL/Adreno）以及 NPU（高通 Hexagon）推理路径，并提供优雅的回退机制。
 
- **🌍 本地化** — 支持11种语言，可在手机和平板上使用，并全面适配iPad。
 
## 获取应用 
| 平台 | |
 
| --- | --- |
 
| **iOS / iPadOS** | [![在 App Store 下载](https://img.shields.io/badge/App_Store-Download-0D96F6?logo=apple&logoColor=white)](https://apps.apple.com/us/app/pocketpal-ai/id6502579498) |
 
| **Android** | [![在 Google Play 获取](https://img.shields.io/badge/Google_Play-Get_it-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.pocketpalai) |
 
**开启您的首次聊天的三步：**
 
1. 请从 App Store 或 Google Play 安装 PocketPal。
 
2. **下载模型** — 点击菜单（☰）→ **模型**，选择一款适合您手机的模型并下载（或从 Hugging Face 添加）。
 
3. **加载后即可开始聊天**——就这么简单，您已实现AI的完全离线运行。
 
## 工作原理
 
您无需了解这些知识即可使用 PocketPal——但如果您好奇手机如何在离线状态下运行真正的人工智能，以下是简要说明。
 
PocketPal 是一个由四层构成的软件栈，从底层的硬件芯片到上层的聊天界面。每一层各司其职，且依赖关系严格遵循自顶向下的原则——JavaScript 应用与原生桥接层交互，桥接层再与推理引擎对接，而推理引擎则面向具体的硬件后端。
 
<div align="center"> 
<img src="assets/images and logos/stack-diagram-dark.png" alt="PocketPal AI 本地端架构——用户界面与工具使用 → 桥接层 → 引擎 → 硬件" width="100%">
 
</div>
 
| 层 | 此处运行的内容 |
 
| --- | --- |
 
| **UI 与工具使用** | React Native 应用（界面基于 React Native Paper，状态管理采用 MobX，聊天记录存储于 WatermelonDB）。**`AgentRunner`** 负责驱动每一次对话轮次——实时流式接收 token、在模型调用时分发**Talents**（工具），并将结果反馈用于后续推理。**Pals** 是可配置的虚拟角色；**PalsHub** 则是应用内用于分享与购买 Pals 的市场。 |
 
| **桥接** | 将 JavaScript 与引擎相连的原生模块。[`llama.rn`](https://github.com/mybigday/llama.rn) 通过 JSI 实现了大型语言模型推理的桥接；[`react-native-speech`](https://github.com/a-ghorbani/react-native-speech) 和 `onnxruntime-react-native` 则实现了文本到语音的桥接。 |
 
| **引擎** | 推理引擎。**llama.cpp** 以量化后的 **GGUF** 格式运行语言模型。**ONNX Runtime** 以 **ONNX** 格式运行 TTS 语音模型。 |
 
| **硬件** | 数学运算真正发生的地方。PocketPal 支持 **CPU**（通用回退）、**GPU**（iOS 上的 Metal，Android 上的 Qualcomm Adreno 的 OpenCL），以及 **NPU**（Qualcomm Hexagon）——在无法使用完整后端时，能够优雅地回退并卸载部分层。 |
 
## 使用该应用
 
<详情>
 
<summary><strong>📥 下载并加载模型</strong></summary>
 
<br/>
 
1. 打开应用，点击**菜单**（☰），然后进入**模型**。
 
2. 从列表中选择一个模型并点击**下载**，或点击**+**以从 Hugging Face 或本地存储中添加模型。
 
3. 在 Hugging Face 上搜索 GGUF 模型，并选择一款适合您设备内存与存储的量化版本——立即下载，或收藏以备后用。
 
4. 下载完成后，点击**加载**（或使用聊天输入框左侧的箭头图标，直接在聊天界面中进行加载）。
 
<img src="assets/images and logos/Download_models.png" alt="下载模型" width="100%">
 
</详情>
 
<详情>
 
<摘要><strong>💬 聊天</strong></摘要>
 
<br/>
 
1. 确保已加载模型。
 
2. 打开**聊天**页面，开始对话。
 
3. 推理期间屏幕保持亮起，空闲时自动关闭。
 
4. **复制**：点击复制图标即可复制完整回复，或长按某段文字仅复制该段内容。
 
5. **编辑**您的任意消息，只需长按——AI将根据您的修改重新生成回复。点击**重试**即可获得新的答案，您还可选择使用不同的模型。
 
<img src="assets/images and logos/Chat.png" alt="聊天" width="83%">
 
</详情>
 
<详情>
 
<summary><strong>🎭 伙伴与伙伴中心</strong></summary>
 
<br/>
 
创建个性化助手：
 
- **助手伙伴** — 选择默认模型，设置系统提示词（可自行编写或由应用生成），并自定义聊天输入框的颜色。
 
- **角色扮演伙伴** — 以上所有内容，外加地点、AI的角色以及其他上下文参数。
 
在聊天页面上使用伙伴选择器切换伙伴。在应用内浏览**[PalsHub](https://palshub.ai/)**，发现社区伙伴，其中部分高级伙伴可通过应用内购买获取。
 
<img src="assets/images and logos/Pals.png" alt="助手伙伴" width="100%">
 
<p><em>打造一款鸡尾酒配方助手</em></p>
 
</详情>
 
<详情>
 
<summary><strong>📊 为您的设备进行基准测试</strong></summary>
 
<br/>
 
1. 打开**基准测试**页面。
 
2. 运行性能测试，以比较各型号之间的速度与效率。
 
3. 审查每秒令牌数和内存使用情况。
 
4. 您还可以选择将您的成绩分享至【AI手机排行榜】（https://pocketpal.dev/leaderboard）。
 
<img src="assets/images and logos/Benchmark.png" alt="Benchmark" width="100%">
 
</详情>
 
<详情>
 
<summary><strong>🔑 设置 Hugging Face 令牌（用于受保护的模型）</strong></summary>
 
<br/>
 
1. 在您的 Hugging Face 账户中创建一个访问令牌（[文档](https://huggingface.co/docs/hub/en/security-tokens)）。
 
2. 在 PocketPal 中，前往**设置 → 设置代币**，粘贴并保存。
 
<img src="assets/images and logos/Token_in_pocketpal.png" alt="Token设置" width="66%">
 
</详情>
 
<详情>
 
<summary><strong>💌 发送反馈</strong></summary>
 
<br/>
 
前往**应用信息 → “分享您的想法”**，输入您的反馈——功能需求、改进建议，任何意见均可——并提交。
 
<img src="assets/images and logos/Send_Feedback.png" alt="发送反馈" width="50%">
 
</详情>
 
## 面向开发者
 
PocketPal 是一款标准的 React Native 应用。只要你会搭建 React Native 项目，就能开发 PocketPal。
 
### 先决条件 
- **Node.js** — 版本已在 [.nvmrc](.nvmrc) 文件中固定（当前为 `22.21.0`）；请运行 `nvm use` 以切换到该版本。较旧的 Node.js 版本将无法通过 `engines` 检查。
 
- **Yarn 1（经典版）** — `packageManager` 被固定为 `yarn@1.22.22`。
 
- **Xcode** + **CocoaPods**，以及 **Ruby + Bundler**（用于 iOS / Fastlane 工具链）。
 
- **Android Studio** + Android SDK/NDK。
 
有关平台的详细信息，请参阅[React Native 环境设置](https://reactnative.dev/docs/set-up-your-environment)。
 
### 克隆、安装与运行 
```bash
 
git 克隆 https://github.com/a-ghorbani/pocketpal-ai
 
cd 口袋掌机-ai
 
nvm use                       # 匹配已固定的 Node 版本
 
yarn install                  # 安装 JavaScript 依赖项
 
（cd ios && pod install）       # 仅适用于 iOS
 
yarn start                    # Metro 打包工具
 
yarn ios                      # 在 iOS 模拟器上构建并运行
 
yarn android                  # 在 Android 模拟器上构建并运行
 
```
 
核心的设备端聊天功能无需任何后端密钥即可运行；仅需对 PalsHub/身份验证功能进行额外配置。
 
> **原生变更规则：** 如果您修改了 `package.json`、原生模块、`ios/` 目录、`android/` 目录、Podfile 或 `build.gradle` 文件，请重新运行 `pod install` 并重新构建两个平台——仅通过 JavaScript 重新加载无法感知原生代码的变更。
 
### 质量门控 
```bash
 
yarn lint           # ESLint
 
yarn typecheck      # tsc --noEmit
 
yarn test           # Jest
 
yarn l10n:validate  # 验证本地化 JSON（占位符、完整性）
 
```
 
在提交 Pull Request 之前，请先运行 `yarn lint && yarn typecheck && yarn test`。提交将通过 Husky 钩子，借助 Commitlint（遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范）进行校验。
 
<详情>
 
<摘要><strong>仓库布局</strong></摘要>
 
<br/>
 
```
 
源/
 
├── screens/        # 聊天、模型、伙伴、基准测试、设置、关于等…
 
├── components/     # 可复用的 UI
 
├── store/          # MobX 存储（Model、ChatSession、Pal、TTS、HF、Benchmark 等）
 
├── 服务/
 
│   ├── agent/      # AgentRunner — 聊天/工具循环
 
│   ├── talents/    # 工具引擎 + 注册表
 
│   ├── tts/        # TTS引擎（kokoro、kitten、supertonic、system）
 
│   ├── palshub/    # PalsHub 市场集成 
│   └── downloads/  # 模型下载管理器
 
├── database/       # WatermelonDB 的模式、模型、迁移文件
 
├── repositories/   # 面向数据库的数据访问层
 
├── locales/        # 国际化 JSON + 懒加载器（index.ts 为注册表）
 
