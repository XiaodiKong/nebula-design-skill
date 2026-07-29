# Backend Product Design Skill

面向 Codex 的中文企业级中后台产品设计 Skill。它可以把业务需求转化为信息架构、页面结构、交互规则、视觉主题以及可运行的 HTML 页面或技术关系图。

项目默认使用 **Cal.com** 风格，并提供 Clarity、Notion、Linear、Claude、OpenCode AI 等可选主题。

## 主要能力

- 判断需求应该交付为聚焦单页面，还是带侧栏、顶栏、用户信息和面包屑的完整系统应用。
- 设计仪表盘、管理列表、详情页、表单、配置流程、多面板工作台等中后台页面。
- 生成系统架构图、层级结构图、流程图、泳道图、数据血缘 DAG、拓扑图、时序图和对象关系图。
- 支持搜索、筛选、节点聚焦、缩放适配、详情面板和列表降级等图形工作台交互。
- 提供六套共享语义令牌的视觉主题，支持运行时主题切换。
- 分离中文、英文、标题、正文和代码字体，避免不同主题都回退到同一套中文系统字体。
- 在已有项目中优先复用现有组件、路由、设计令牌和系统外壳。

## 应用形态判断

Skill 会先判断产品外壳，再设计页面：

| 形态 | 适合场景 | 默认结构 |
|---|---|---|
| 聚焦单页面 | 独立 Demo、嵌入页、公开查询页、单一分析或配置工具 | 页面标题、局部工具栏、核心工作区、局部详情 |
| 系统应用 | 完整中后台、多个业务模块、角色权限、组织或全局状态 | 侧栏、顶栏、用户信息、面包屑、内容工作区 |

“单 HTML 文件”“SPA 技术架构”和“聚焦单页面”是不同概念。一个单 HTML 文件也可以包含完整系统外壳；一个 SPA 也可以拥有多路由和全局导航。

当需求无法判断时，Skill 会在实施前让用户明确选择这两种形态，而不是机械添加导航栏。

## 视觉主题

| 主题 | 视觉特征 | 推荐场景 |
|---|---|---|
| **Cal.com（默认）** | 黑白中性、清爽留白、友好 SaaS | 通用后台、表单、客户成功、轻量工作台 |
| Clarity | 深蓝导航、企业蓝、紧凑清晰 | 风控、数据、权限、高密度运营 |
| Notion | 暖灰、内容优先、柔和色块 | 知识、项目、内容与协作 |
| Linear | 近黑画布、薰衣草蓝、低噪声 | 研发、自动化、运维与暗色工具 |
| Claude | 奶油画布、珊瑚色、衬线标题 | AI、研究、内容与知识分析 |
| OpenCode AI | 暖白、终端黑、全局等宽 | AI 编码、终端、日志与开发者工具 |

用户没有指定主题时始终使用 Cal.com。只有用户明确要求推荐、比较或选择最合适主题时，才会按业务场景推荐其他主题。

## 安装

Codex 可以从用户目录或当前仓库的 `.agents/skills` 目录发现独立 Skill。Skill 更新后通常会被自动检测；如果没有出现，请重启 Codex。相关机制可参考 OpenAI 的 [Build skills](https://learn.chatgpt.com/docs/build-skills.md) 文档。

### 方式一：安装到用户目录

适合希望在所有项目中使用此 Skill 的用户：

```bash
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/XiaodiKong/backend-design-skill.git \
  "$HOME/.agents/skills/backend-design-skill"
```

更新：

```bash
git -C "$HOME/.agents/skills/backend-design-skill" pull --ff-only
```

### 方式二：安装到当前仓库

适合团队只在某个项目中共享此 Skill：

```bash
mkdir -p .agents/skills
git submodule add \
  https://github.com/XiaodiKong/backend-design-skill.git \
  .agents/skills/backend-design-skill
```

克隆包含该子模块的项目后执行：

```bash
git submodule update --init --recursive
```

### 方式三：使用 Skill Installer

在 Codex 中调用 `$skill-installer`，要求它从本仓库安装：

```text
$skill-installer
Install the skill from https://github.com/XiaodiKong/backend-design-skill
```

### 确认安装

- Codex CLI 或 IDE 扩展：输入 `/skills`，或输入 `$` 后查找 `backend-design-skill`。
- ChatGPT 桌面应用：在侧栏的 Skills 中查找 `Backend Product Design`。
- 如果 Skill 未出现，重启 Codex 后再次检查。

## 使用

显式调用 Skill：

```text
$backend-design-skill 帮我设计一个客户运营分析页面。
```

如果应用形态不明确，Skill 会先询问：

```text
1. 聚焦单页面：不带全局导航，适合独立 Demo、嵌入页或单一工具。
2. 完整系统页面：带侧栏、顶栏、用户信息和面包屑，适合作为中后台产品模块。
```

### 聚焦单页面

```text
$backend-design-skill
生成一个可以独立打开的单 HTML 风控关系图 Demo。
不要添加全局导航，需要搜索、风险筛选、节点聚焦和对象详情。
```

### 完整系统应用

```text
$backend-design-skill
设计一个完整的风控运营系统页面。
需要侧栏、顶栏、用户信息、生产环境标识和对象关系工作台。
```

### 指定主题

```text
$backend-design-skill
使用 Claude 风格设计一个中文 AI 知识分析工作台，
标题使用中文衬线字体，正文保持无衬线。
```

```text
$backend-design-skill
使用 OpenCode AI 风格设计一个构建日志与依赖关系分析页面。
```

### 生成架构图

```text
$backend-design-skill
生成一个从用户端、API 网关、业务服务到数据库和消息队列的系统架构图。
使用分层布局，提供图例、缩放、搜索和节点详情。
```

### 在已有项目中实现

```text
$backend-design-skill
分析当前仓库的技术栈和布局组件，
把客户详情页嵌入现有系统外壳，不要创建第二套设计令牌。
```

Skill 也支持根据描述自动触发，但显式使用 `$backend-design-skill` 更容易保证目标明确。

## Demo

项目包含一个风控对象关系系统页面：

```text
demo/index.html
```

启动本地预览：

```bash
python3 -m http.server 8765
```

浏览器打开：

```text
http://localhost:8765/demo/index.html
```

Demo 支持：

- 六套主题实时切换，首次打开默认为 Cal.com。
- 搜索对象、按风险状态和时间范围筛选。
- 点击节点聚焦直接关系。
- 画布缩放、适配和状态统计。
- 右侧对象详情、主要风险链路和关联对象。
- 导航折叠、用户菜单、操作反馈和主题持久化。

## 项目结构

```text
backend-design-skill/
├── SKILL.md                              # Skill 入口与执行流程
├── agents/
│   └── openai.yaml                      # Skill 的界面元数据
├── assets/
│   ├── cal-tokens.css                   # Cal.com 默认主题
│   ├── clarity-tokens.css
│   ├── notion-tokens.css
│   ├── linear-tokens.css
│   ├── claude-tokens.css
│   ├── opencode-tokens.css
│   └── diagram-tokens.css               # 图形工作台语义令牌
├── references/
│   ├── application-shell-selection.md   # 单页面与系统应用判定
│   ├── theme-selection.md               # 主题选择规则
│   ├── typography-system.md             # 中英文字体与回退
│   ├── diagram-design.md                # 架构图与关系图规范
│   ├── page-patterns.md                 # 页面模式
│   └── ...                              # 组件、实现与场景参考
└── demo/
    └── index.html                       # 六主题风控关系图 Demo
```

## 自定义

### 修改默认主题

默认主题在 `SKILL.md` 和 `references/theme-selection.md` 中声明。实际页面应通过 `--admin-*` 语义令牌引用颜色、字体、圆角和尺寸，不要在组件中绑定主题名称。

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
3. 更新 `references/theme-selection.md` 的选择矩阵和路由。
4. 验证正文、状态色、焦点环、图形画布和暗色系统控件。

## 设计来源与说明

Cal.com、Notion、Linear、Claude 和 OpenCode AI 主题参考了 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 中的公开设计分析。

本项目提供的是面向中文企业中后台的非官方适配，不是相关品牌的官方设计系统、商标授权或像素级复刻。

## 参与贡献

欢迎提交 Issue 或 Pull Request，补充新的页面模式、设计主题、架构图范式、示例页面和可访问性改进。
