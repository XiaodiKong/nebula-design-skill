# Nebula Design Skill

面向 Codex 的通用前端设计 Skill。它可以把需求转化为产品应用、企业中后台、营销官网、信息架构、交互规则、视觉主题，以及可运行的 HTML 页面或技术关系图。

项目默认使用 **Cal.com** 风格，并提供 AuraSearch、Clarity、Notion、Linear、Claude、OpenCode AI、Palantir 等可选主题。

## 主要能力

- 先判断需求属于产品应用、营销官网，还是同时包含两者的完整产品套件。
- 产品应用继续判断聚焦单页面，还是带导航、用户信息和全局上下文的完整系统应用。
- 设计首页、Landing Page、功能页、定价页、发布页、解决方案页和开发者入口。
- 设计仪表盘、管理列表、详情页、表单、配置流程、多面板工作台等中后台页面。
- 生成系统架构图、层级结构图、流程图、泳道图、数据血缘 DAG、拓扑图、时序图和对象关系图。
- 支持搜索、筛选、节点聚焦、缩放适配、详情面板和列表降级等图形工作台交互。
- 提供注册表驱动的共享语义主题，支持运行时主题切换。
- 将颜色策略与品牌主题分离，支持 Monochrome First、品牌主导和数据强调。
- 分离中文、英文、标题、正文和代码字体，避免不同主题都回退到同一套中文系统字体。
- 在已有项目中优先复用现有组件、路由、设计令牌和系统外壳。

## 设计表面判断

Skill 会先选择设计表面，再决定布局：

| 表面 | 核心目标 | 典型结构 |
|---|---|---|
| 产品应用 | 帮助登录用户完成任务、处理数据和持续运营 | 工作区、业务状态、操作、权限与反馈 |
| 营销官网 | 解释价值、建立信任并推动注册、咨询或购买 | 顶部品牌导航、Hero、产品证明、CTA 与页脚 |
| 完整产品套件 | 同时覆盖公开获客和登录后产品体验 | 独立官网 + 独立产品应用，共享品牌但不共用导航 |

产品应用还会进一步判断外壳：

| 形态 | 适合场景 | 默认结构 |
|---|---|---|
| 聚焦单页面 | 独立 Demo、嵌入页、公开查询页、单一分析或配置工具 | 页面标题、局部工具栏、核心工作区、局部详情 |
| 系统应用 | 完整中后台、多个业务模块、角色权限、组织或全局状态 | 侧栏、顶栏、用户信息、面包屑、内容工作区 |

“单 HTML 文件”“SPA 技术架构”和“聚焦单页面”是不同概念。一个单 HTML 文件也可以包含完整系统外壳或营销官网；一个 SPA 也可以拥有多路由和全局导航。

当表面会显著改变结果且上下文无法判断时，Skill 会在实施前让用户明确选择产品应用或营销官网，而不是根据导航位置或主题名称猜测。

## 视觉主题

| 主题 | 视觉特征 | 推荐方向 |
|---|---|---|
| **Cal.com（默认）** | 黑白中性、清爽留白、友好 SaaS | 通用产品应用、SaaS 官网、表单与定价 |
| AuraSearch | 浅紫画布、大圆角、紫色主操作、分析图表 | AI 分析、LLM 可观测性、SaaS BI 与增长运营 |
| Clarity | 深蓝、企业蓝、紧凑清晰 | 风控与数据后台、企业服务和安全官网 |
| Notion | 暖灰、内容优先、柔和色块 | 知识协作产品、内容型官网与模板展示 |
| Linear | 近黑画布、薰衣草蓝、低噪声 | 工程工具、开发者官网与产品发布 |
| Claude | 暖黑或奶油画布、陶土色、衬线标题 | AI 工作台、研究与内容产品叙事 |
| OpenCode AI | 终端黑、高对比、全局等宽 | AI 编码、终端工作台与开发者入口 |
| Palantir | 近黑任务画布、Blueprint 蓝、细边界 | Ontology、关键运营、态势感知和工业 AI 官网 |

用户没有指定主题时始终使用 Cal.com。只有用户明确要求推荐、比较或选择最合适主题时，才会按业务场景推荐其他主题。

## 颜色策略

主题回答“页面是什么视觉语言”，颜色策略回答“颜色承担什么信息”。两者独立组合：

| 策略 | 推荐场景 | 核心规则 |
|---|---|---|
| Monochrome First | Flow、DAG、关系图、架构图、AI IDE、高密度后台 | 类型保持中性，颜色留给状态、关键动作、AI 与数据 |
| Brand Led | 营销官网、品牌发布页、低密度轻应用 | 品牌色推动叙事，但不覆盖业务状态 |
| Data Emphasis | BI、监控、分析和多系列图表 | 系列色限制在可视化区域，不扩散到导航和分类 |

产品应用和技术图默认在主题令牌后加载 `assets/semantic-state-tokens.css`，获得跨主题一致的选择、运行、成功、警告、错误、AI 和数据系列角色。

## 安装

Codex 可以从用户目录或当前仓库的 `.agents/skills` 目录发现独立 Skill。Skill 更新后通常会被自动检测；如果没有出现，请重启 Codex。相关机制可参考 OpenAI 的 [Build skills](https://learn.chatgpt.com/docs/build-skills.md) 文档。

### 方式一：安装到用户目录

适合希望在所有项目中使用此 Skill 的用户：

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/XiaodiKong/nebula-design-skill.git \
  "$HOME/.agents/skills/nebula-design-skill"
```

更新：

```bash
git -C "$HOME/.agents/skills/nebula-design-skill" pull --ff-only
```

### 方式二：安装到当前仓库

适合团队只在某个项目中共享此 Skill：

```bash
mkdir -p .agents/skills
git submodule add \
  https://github.com/XiaodiKong/nebula-design-skill.git \
  .agents/skills/nebula-design-skill
```

克隆包含该子模块的项目后执行：

```bash
git submodule update --init --recursive
```

### 方式三：使用 Skill Installer

在 Codex 中调用 `$skill-installer`，要求它从本仓库安装：

```text
$skill-installer
Install the skill from https://github.com/XiaodiKong/nebula-design-skill
```

### 确认安装

- Codex CLI 或 IDE 扩展：输入 `/skills`，或输入 `$` 后查找 `nebula-design-skill`。
- ChatGPT 桌面应用：在侧栏的 Skills 中查找 `Nebula Design`。
- 如果 Skill 未出现，重启 Codex 后再次检查。

## 使用

显式调用 Skill：

```text
$nebula-design-skill 帮我设计一个客户运营分析页面。
```

如果设计表面不明确，Skill 会先询问：

```text
1. 产品应用：面向登录用户完成日常任务，包含业务导航、数据状态和操作。
2. 营销官网：面向访客解释价值并推动注册或咨询，包含品牌导航、产品证明和 CTA。
```

### 聚焦单页面

```text
$nebula-design-skill
生成一个可以独立打开的单 HTML 风控关系图 Demo。
不要添加全局导航，需要搜索、风险筛选、节点聚焦和对象详情。
```

### 完整系统应用

```text
$nebula-design-skill
设计一个完整的风控运营系统页面。
需要侧栏、顶栏、用户信息、生产环境标识和对象关系工作台。
```

### 营销官网

```text
$nebula-design-skill
为 AI 工作流产品设计一张 Cal.com 风格的 SaaS 首页。
目标是引导中小团队免费试用，需要 Hero、真实产品流程、定价摘要、FAQ 和 CTA。
```

```text
$nebula-design-skill
使用 Linear 风格设计一张开发者工具发布页，
需要顶部品牌导航、交互演示、性能证明、快速开始和文档入口。
```

### 指定主题

```text
$nebula-design-skill
使用 AuraSearch 风格设计一个 AI 模型可观测性系统，
需要 264px 圆角侧栏、指标卡、趋势图、模型排名和主从详情，并支持浅色与暗色模式。
```

```text
$nebula-design-skill
使用 Claude 风格设计一个中文 AI 知识分析工作台，
标题使用中文衬线字体，正文保持无衬线。
```

```text
$nebula-design-skill
使用 OpenCode AI 风格设计一个构建日志与依赖关系分析页面。
```

```text
$nebula-design-skill
使用 Palantir 风格设计一个供应链态势感知与异常处置工作台，
需要对象关系图、时间线、人工确认和完整审计记录。
```

### 生成架构图

```text
$nebula-design-skill
生成一个从用户端、API 网关、业务服务到数据库和消息队列的系统架构图。
使用分层布局，提供图例、缩放、搜索和节点详情。
```

### 在已有项目中实现

```text
$nebula-design-skill
分析当前仓库的技术栈和布局组件，
把客户详情页嵌入现有系统外壳，不要创建第二套设计令牌。
```

Skill 也支持根据描述自动触发，但显式使用 `$nebula-design-skill` 更容易保证目标明确。

## Demo

项目包含两个多主题比较 Demo，以及一套不依赖它们的 AuraSearch 独立产品模板。

产品应用 Demo：

```text
demo/index.html
```

官网营销页 Demo：

```text
demo/marketing.html
```

AuraSearch 独立产品模板：

```text
demo/aurasearch/index.html
```

启动本地预览：

```bash
python3 -m http.server 8765
```

浏览器打开：

```text
http://localhost:8765/demo/index.html
http://localhost:8765/demo/marketing.html
http://localhost:8765/demo/aurasearch/
```

AuraSearch 目录拥有自己的 `index.html`、`styles.css`、`app.js` 和本地设计资产，可以整目录复制到其他静态站点，不需要主题注册表、多主题 Demo 或第三方依赖。

产品应用 Demo 支持：

- 8 套已注册主题实时切换，首次打开默认为 Cal.com。
- 使用 Monochrome First：对象类型由短代码和分组表达，颜色仅表示风险状态。
- 搜索对象、按风险状态和时间范围筛选。
- 点击节点聚焦直接关系。
- 画布缩放、适配和状态统计。
- 右侧对象详情、主要风险链路和关联对象。
- 导航折叠、用户菜单、操作反馈和主题持久化。

官网营销页 Demo 支持：

- 基于公开页面研究与用户提供设计稿沉淀的 8 套主题切换，默认使用 Cal.com。
- 同一价值主张、内容结构和主 CTA 下比较不同官网视觉语言。
- 响应式顶部导航、产品流程交互、审计证明、FAQ 和本地表单反馈。
- 不使用相关品牌 Logo、插画、客户名单或虚构商业数据。
- 移动端布局、键盘焦点、语义 HTML 与 `prefers-reduced-motion`。
- 主题质量门槛覆盖文字层重叠、参考线对齐、装饰密度、中文断行与多断点回退。

AuraSearch 独立模板支持：

- 原稿级 264px 圆角侧栏、48px 顶部工具栏、大圆角业务表面和本地 Figma 导出图标。
- Dashboard、Prompt Explorer、AI 分析、竞品、报告和 Billing & Plans 等可切换页面。
- Prompt 搜索/筛选/主从详情、Canvas 趋势图、命令面板、操作反馈与时间范围切换。
- 浅色/暗色模式，以及 1240、1024、768 和 520px 四级响应式回退。
- 移除原有 `demo/index.html` 或 `demo/marketing.html` 不会影响它运行。

## 项目结构

```text
nebula-design-skill/
├── SKILL.md                              # Skill 入口与执行流程
├── agents/
│   └── openai.yaml                      # Skill 的界面元数据
├── assets/
│   ├── cal-tokens.css                   # Cal.com 默认主题
│   ├── aurasearch-tokens.css            # AuraSearch AI 分析 SaaS 主题
│   ├── clarity-tokens.css
│   ├── notion-tokens.css
│   ├── linear-tokens.css
│   ├── claude-tokens.css
│   ├── opencode-tokens.css
│   ├── palantir-tokens.css
│   ├── diagram-tokens.css               # 图形工作台语义令牌
│   ├── semantic-state-tokens.css        # 跨主题颜色角色
│   └── theme-registry.json              # 主题注册与默认值
├── references/
│   ├── application-shell-selection.md   # 单页面与系统应用判定
│   ├── surface-selection.md             # 产品应用与营销官网判定
│   ├── marketing-page-patterns.md       # 营销页面结构与转化规则
│   ├── marketing-theme-adaptation.md    # 多主题营销场景适配
│   ├── marketing-theme-cal.md           # Cal.com 官网风格
│   ├── marketing-theme-aurasearch.md    # AuraSearch 官网转译
│   ├── marketing-theme-clarity.md       # Clarity 官网风格
│   ├── marketing-theme-notion.md        # Notion 官网风格
│   ├── marketing-theme-linear.md        # Linear 官网风格
│   ├── marketing-theme-claude.md        # Claude 官网风格
│   ├── marketing-theme-opencode.md      # OpenCode AI 官网风格
│   ├── marketing-theme-palantir.md      # Palantir 官网风格
│   ├── theme-aurasearch.md              # AuraSearch 产品应用风格
│   ├── theme-palantir.md                # Palantir 产品应用风格
│   ├── theme-selection.md               # 主题选择规则
│   ├── color-strategy.md                # Monochrome First 等颜色策略
│   ├── theme-quality-gates.md           # 主题转译与布局质量门槛
│   ├── standalone-theme-implementation.md # 完整独立主题模板规则
│   ├── typography-system.md             # 中英文字体与回退
│   ├── diagram-design.md                # 架构图与关系图规范
│   ├── page-patterns.md                 # 页面模式
│   └── ...                              # 组件、实现与场景参考
├── demo/
│   ├── index.html                       # 多主题风控关系图 Demo
│   ├── marketing.html                   # 多主题官网营销页 Demo
│   └── aurasearch/                      # 独立 AuraSearch 产品 SPA
│       ├── index.html
│       ├── styles.css
│       ├── app.js
│       └── assets/                      # Figma 导出的本地演示资产
└── scripts/
    ├── validate-theme-contract.mjs      # 主题契约校验
    ├── validate-demo.mjs                # 多主题 Demo 校验
    └── validate-standalone-demo.mjs     # 独立模板校验
```

## 自定义

### 修改默认主题

默认主题和主题顺序在 `assets/theme-registry.json` 中声明。实际页面应通过 `--admin-*` 主题令牌与 `--nebula-*` 颜色角色引用颜色、字体、圆角和尺寸，不要在组件中绑定主题名称。

### 接入字体

项目不会直接分发 Copernicus、StyreneB、Berkeley Mono 等可能需要单独授权的品牌字体。若项目已有合法 `.woff2` 资产，可通过 `@font-face` 接入；否则使用各主题提供的开源字体和系统字体回退。

字体栈遵循：

```text
英文具体字体 → 中文具体字体 → 通用字体族
```

### 扩展主题

新增主题时：

1. 在 `references/` 中增加主题规范。
2. 在 `assets/` 中提供完整的 `--admin-*` 令牌。
3. 在 `assets/theme-registry.json` 注册主题，并更新选择矩阵和 Skill 路由。
4. 更新需要内嵌主题 CSS 的 Demo。
5. 按 `references/theme-quality-gates.md` 在多个断点检查重叠、参考线、断行和装饰密度。
6. 运行自动校验并检查正文、状态色、焦点环、图形画布和暗色系统控件。

## 验证

修改主题、语义令牌或 Demo 后运行：

```bash
node scripts/validate-theme-contract.mjs
node scripts/validate-demo.mjs
node scripts/validate-standalone-demo.mjs demo/aurasearch
```

第一条命令检查注册表、引用文件、主题令牌契约和跨主题颜色角色；第二条检查两个单 HTML Demo 的主题顺序、脚本语法、ID、锚点、语义结构和本地依赖约束；第三条检查独立模板的入口、路由、深浅色、断点、本地资产与脚本语法。

## 设计来源与说明

Cal.com、Notion、Linear、Claude 和 OpenCode AI 产品应用主题参考了 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 中的公开设计分析；Palantir 产品应用主题参考官方 [Blueprint](https://github.com/palantir/blueprint) 和 [Workshop 设计实践](https://www.palantir.com/docs/foundry/workshop/application-design-best-practices)。AuraSearch 主题来自用户提供的本地 Figma UI Kit；仓库不分发原始 `.fig` 画板，但独立演示模板包含为忠实验证设计语言而导出的部分图标和图形资产，公开分发前应确认原 UI Kit 的授权范围。营销主题进一步研究了 [Cal.com](https://cal.com/)、[Notion](https://www.notion.com/)、[Linear](https://linear.app/)、[Claude by Anthropic](https://www.anthropic.com/claude)、[OpenCode](https://opencode.ai/)、[Clarity Design System](https://clarity.design/) 和 [Palantir](https://www.palantir.com/) 的官方公开网站。

本项目提供的是面向产品应用与营销官网的非官方前端适配，不是相关品牌的官方设计系统、商标授权或像素级复刻。

## 从旧名称迁移

项目原名为 `backend-design-skill`。升级后请使用 `$nebula-design-skill`；旧安装建议重新克隆到 `nebula-design-skill` 目录，避免 Codex 缓存旧的 Skill 名称。现有 `--admin-*` CSS 令牌暂时保留以兼容已有页面。

## 参与贡献

欢迎提交 Issue 或 Pull Request，补充新的页面模式、设计主题、架构图范式、示例页面和可访问性改进。
