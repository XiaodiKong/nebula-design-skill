---
name: nebula-design-skill
description: Design, implement, review, and optimize frontend product experiences, enterprise applications, marketing websites, and HTML technical diagrams. Determine product app vs marketing site; for product apps choose focused page vs full system shell. Use for landing, feature, pricing, and launch pages; dashboards, CRM, risk/data/permission systems, workflows, tables, forms, AI workbenches; architecture, hierarchy, flow, lineage, topology, sequence, and relationship diagrams; information architecture, UI copy, components, theme tokens, typography, color semantics, and production frontend code. Use Cal.com by default and support registered Clarity, Notion, Linear, Claude, OpenCode AI, and Palantir themes with separate Chinese/Latin font stacks.
---

# Nebula Design

把模糊需求转化为清晰、可操作、可实现的前端体验，覆盖产品应用、企业中后台、营销官网与 HTML 技术图。主题由 [assets/theme-registry.json](assets/theme-registry.json) 注册，Cal.com 是默认主题。无论选择哪种视觉语言，都优先保证用户目标、信息层级、可信内容、状态语义和可访问性。

## 先判定设计表面

实现新页面前先读取 [references/surface-selection.md](references/surface-selection.md)，判断：

- **产品应用**：面向已登录用户完成任务，包含数据、状态、操作与权限。
- **营销官网**：面向公开访客解释价值、建立信任并推动注册、咨询或购买。
- **完整产品套件**：同时需要公开官网和登录后产品应用，两种表面分别设计并共享品牌语言。

表面确定后再选择布局。产品应用读取 [references/application-shell-selection.md](references/application-shell-selection.md)，判断聚焦单页面或完整系统外壳；营销官网读取 [references/marketing-page-patterns.md](references/marketing-page-patterns.md)，选择首页、Landing Page、功能页、定价页、发布页、解决方案页或文档入口。主题是独立维度，不能用 Cal.com、Linear 或导航位置替代表面判断。

需求信号明确时直接选择并说明依据；两种表面都合理且会显著改变实现时，实施前给用户明确选项。不要把“单 HTML 文件”“SPA 技术架构”和“聚焦单页面”当作同一个概念。已有仓库表面与外壳明确时优先沿用。

## 再确定交付模式

根据请求选择一种或多种模式：

- **方案设计**：输出受众目标、信息架构、页面结构、内容、字段、交互、状态与权限。
- **页面实现**：直接在现有技术栈中实现可运行界面；尊重仓库约定，不随意替换框架。
- **组件设计**：定义 API、状态、尺寸、交互、可访问性和使用边界。
- **图形设计**：把系统、层级、流程、血缘或关系数据转化为可读、可交互的 HTML 图形工作台。
- **设计评审**：指出具体问题、影响和修改建议；能修改时同步完成修复。
- **体验优化**：先定位任务阻力，再调整层级、流程、密度和反馈。
- **主题设计**：选择、实现或切换主题令牌，并保持同一业务界面在不同视觉语言下结构稳定。

用户要求实现或修改代码时，不要只交付文字方案。

## 按需读取参考

执行任务前读取所有相关文件：

- 任何新页面或页面重构：先读取 [references/surface-selection.md](references/surface-selection.md)。
- 任何视觉任务：读取 [references/color-strategy.md](references/color-strategy.md) 和 [references/theme-selection.md](references/theme-selection.md)，先选颜色策略，再选主题。
- 新增主题、主题专属布局、多主题切换器或主题转译评审：必须读取 [references/theme-quality-gates.md](references/theme-quality-gates.md)。
- 需要查询默认主题、已注册主题或主题文件路径：读取 [assets/theme-registry.json](assets/theme-registry.json)，不要在新逻辑中硬编码主题数量。
- 产品应用：读取 [references/visual-system.md](references/visual-system.md) 和 [references/application-shell-selection.md](references/application-shell-selection.md)。
- 产品应用选择 Cal.com：读取 [references/theme-cal.md](references/theme-cal.md)。
- 产品应用选择 Notion：读取 [references/theme-notion.md](references/theme-notion.md)。
- 产品应用选择 Linear：读取 [references/theme-linear.md](references/theme-linear.md)。
- 产品应用选择 Claude：读取 [references/theme-claude.md](references/theme-claude.md)。
- 产品应用选择 OpenCode AI：读取 [references/theme-opencode.md](references/theme-opencode.md)。
- 产品应用选择 Palantir：读取 [references/theme-palantir.md](references/theme-palantir.md)。
- 产品应用选择 Clarity：使用 [references/visual-system.md](references/visual-system.md) 中的 Clarity 规则。
- 营销官网：必须读取 [references/marketing-page-patterns.md](references/marketing-page-patterns.md) 和 [references/marketing-theme-adaptation.md](references/marketing-theme-adaptation.md)，再按选择读取 [Cal.com](references/marketing-theme-cal.md)、[Clarity](references/marketing-theme-clarity.md)、[Notion](references/marketing-theme-notion.md)、[Linear](references/marketing-theme-linear.md)、[Claude](references/marketing-theme-claude.md)、[OpenCode AI](references/marketing-theme-opencode.md) 或 [Palantir](references/marketing-theme-palantir.md) 营销规范；用户要求全主题比较或切换器时读取全部已注册主题。
- 任何字体选择、品牌字体接入或多语言排版：读取 [references/typography-system.md](references/typography-system.md)。
- 用户未指定主题：默认使用 Cal.com；产品应用再读取 [references/theme-cal.md](references/theme-cal.md)。
- 产品应用的新页面、页面重构或信息架构：再读取 [references/page-patterns.md](references/page-patterns.md)。
- 产品应用的表格、表单、弹层、图表、AI、权限或状态：再读取 [references/components-and-interactions.md](references/components-and-interactions.md)。
- 架构图、层级图、流程图、血缘、拓扑、DAG、时序或关系图：必须读取 [references/diagram-design.md](references/diagram-design.md)。
- 编码、验收或设计评审：再读取 [references/implementation-and-review.md](references/implementation-and-review.md)。
- 产品应用需要领域示例或不确定页面组织方式：读取 [references/example-blueprints.md](references/example-blueprints.md)。
- 新项目需要基础视觉变量时，从 [assets/theme-registry.json](assets/theme-registry.json) 选择主题令牌；技术工作台、产品应用或图形页面再在其后加载 [assets/semantic-state-tokens.css](assets/semantic-state-tokens.css)。已有设计令牌时映射 `--admin-*` 与 `--nebula-*` 角色，不要并行维护第二套冲突令牌。
- 实现 HTML 图形工作台且项目缺少图形令牌时，再使用 [assets/diagram-tokens.css](assets/diagram-tokens.css)。

## 工作流

### 1. 判定设计表面与布局

先根据需求与仓库判断产品应用、营销官网或完整产品套件。

- 产品应用再判断聚焦单页面或系统应用，检查是否需要全局导航、用户/组织、权限、通知、环境或审计上下文。
- 营销官网再判断页面类型、目标受众、核心承诺、可信证据与唯一主 CTA。
- 完整产品套件分别建立官网导航与产品导航，不把两者混成一个巨型外壳。

证据不足且不同表面都会成立时，按 [references/surface-selection.md](references/surface-selection.md) 给出明确选择，不带着未确认的表面假设实施。产品应用的外壳仍按 [references/application-shell-selection.md](references/application-shell-selection.md) 判断。

### 2. 建立业务模型

先从用户输入和仓库中确认：

- 主要受众或用户角色、核心任务、使用频率和成功结果。
- 营销官网的价值主张、购买阶段、证明材料和转化目标。
- 核心实体、关键字段、状态流转、批量操作和权限边界。
- 数据规模、实时性、风险等级、审计要求和异常场景。
- 当前技术栈、组件库、路由、状态管理、接口与品牌约束。

信息缺失时做最小、可逆的合理假设，并在交付中标明；只有会显著改变业务流程或数据含义时才询问。

### 3. 先设计主路径，再排页面

产品应用用“进入页面 → 定位对象 → 判断状态 → 执行动作 → 获得反馈”描述主流程。营销官网用“识别相关性 → 理解价值 → 查看证据 → 消除顾虑 → 完成 CTA”描述转化路径。优先减少：

- 无意义的页面跳转。
- 重复填写和重复确认。
- 为展示而展示的指标或卡片。
- 被埋在更多菜单里的高频操作。
- 多层弹窗、抽屉或难以返回的分支。
- 空泛文案、重复 CTA 和没有证据的营销主张。

### 4. 建立页面层级

产品应用按需组织为：

1. 面包屑。
2. 页面标题、说明和主操作。
3. 查询与筛选。
4. 与当前任务直接相关的概览。
5. 主工作区。
6. 批量操作、分页和辅助详情。

先选择页面模式，再决定组件；不要从组件库拼装开始。

营销官网按 [references/marketing-page-patterns.md](references/marketing-page-patterns.md) 组织品牌导航、Hero、价值与产品证明、信任信息、决策支持、收尾 CTA 和页脚。只保留推动当前叙事所需的区块。

### 5. 建立图形语义

请求包含图形可视化时，先定义节点、关系、层级、方向、分组、状态和用户动作，再选择图类型与渲染技术。

- 层级明确时使用树形或分层布局，不用随机力导向图。
- 流程或依赖有方向时使用从左到右或从上到下的有向布局。
- 系统边界使用分组容器表达；不要只靠节点颜色区分系统。
- 图形必须提供标题、图例、缩放适配和详情入口；复杂图提供搜索、筛选和聚焦。
- 更新数据时尽量保持节点位置稳定，保护用户的空间记忆。
- 图形不能成为信息孤岛；按复杂度提供列表、树或表格替代视图。

### 6. 选择并应用视觉主题

先按 [references/color-strategy.md](references/color-strategy.md) 选择颜色策略，再应用主题。Flow、DAG、关系图、数据血缘、架构图、AI IDE 和高密度后台默认使用 `monochrome-first`；营销官网默认使用 `brand-led`；只有数据比较需要多系列色时使用 `data-emphasis`。主题不能覆盖错误、警告、成功、运行等受保护状态角色。

用户明确指定主题时直接使用。用户要求提供风格选择时，使用同一业务内容制作已注册主题的可比较预览或主题切换器；不要用不同信息架构制造虚假的风格差异。营销官网按 [references/marketing-theme-adaptation.md](references/marketing-theme-adaptation.md) 转译主题，不照搬中后台侧栏与高密度组件。

用户未指定时：

- 默认使用 Cal.com，不因表面或业务类型自动改成其他主题。
- 只有用户明确要求推荐、比较或“选择最合适主题”时，才按场景建议：高密度风控与数据后台可选 Clarity；内容、知识和协作工作区可选 Notion；暗色工程、研发与运维工具可选 Linear；AI 助手、研究与内容分析可选 Claude；AI 编码、终端与日志工具可选 OpenCode AI；关键运营、Ontology、态势感知与多面板任务控制台可选 Palantir。

按 [references/typography-system.md](references/typography-system.md) 分离中文、英文、标题、正文和等宽字体。自定义字体只有在项目已有合法资产时使用。这些参考品牌主题是基于公开页面分析的非官方适配，不能声称使用官方设计系统。

遵守以下底线：

- 使用语义色和中性色建立层级；颜色不作无意义装饰。
- 对象类型优先用文字、图标、形状或分组表达；颜色主要留给状态、关键动作、AI 与数据。
- 采用一致间距网格、克制圆角和有目的的边框或阴影。
- 主题装饰与布局遵守 [references/theme-quality-gates.md](references/theme-quality-gates.md)：可读内容层不得互相覆盖，参考线必须与真实容器对齐，品牌装饰不能与业务模块竞争。
- 产品应用默认桌面端、中等偏紧凑密度、中文优先；营销官网必须适配移动端并允许更强的展示层级。
- 只在业务模块确实独立时使用卡片，避免“卡片套卡片”。
- 关键操作必须有清楚的中文文字，不能只靠模糊图标。
- AI 能力作为工作流增强，不把整个产品做成聊天界面。

### 7. 补齐真实产品状态

产品应用至少处理：

- 默认、悬停、聚焦、选中、禁用。
- 加载、空数据、无结果、失败、无权限。
- 表单校验、未保存变更、成功反馈。
- 长文本、大数字、极端数据量和横向溢出。
- 角色权限、危险操作和审计信息。

不要用静态“漂亮样例”代替真实交互状态。

营销官网至少处理导航展开、CTA 反馈、表单校验、媒体加载失败、空缺证明、窄屏断行、减少动态效果和关键内容无 JavaScript 时的降级。不要用虚构 Logo、数据、奖项或评价制造可信度。

### 8. 实现与验证

实现时：

- 复用现有组件、设计令牌和工程模式。
- 使用真实业务文案与有代表性的示例数据，避免 `Lorem ipsum` 和无意义占位。
- 保持语义 HTML、键盘操作、清晰焦点和足够对比度。
- 组件依赖 `--admin-*` 语义变量；主题切换不应改变业务状态、权限或主任务位置。
- 需要跨主题状态角色时，在主题令牌后加载 `assets/semantic-state-tokens.css`，组件使用 `--nebula-*`。
- 在适当尺寸下检查主流程；复杂表格优先保证桌面端，并为窄屏提供查看与轻操作降级。
- 营销页面检查移动端导航、内容顺序、首屏加载、语义标题、可索引正文、CTA 和 `prefers-reduced-motion`。
- 主题专属布局至少检查 1440、1280、1024、768 和 390px；多主题页面不能只检查默认主题。
- 图形页面检查节点重叠、连线穿越、文字截断、缩放边界、键盘操作和大数据量降级。
- 验证关键操作、状态切换、空态、错误态和布局溢出。
- 修改主题、令牌或 Demo 后运行 `node scripts/validate-theme-contract.mjs` 与 `node scripts/validate-demo.mjs`。

## 输出要求

方案设计应说明：

- 已知条件与关键假设。
- 设计表面、页面目标、目标受众或用户角色与主路径。
- 信息架构和主要交互。
- 产品应用说明关键字段、状态、权限与异常处理。
- 营销官网说明价值主张、内容顺序、证明材料和主 CTA。
- 重要设计取舍，而不是逐项解释常识。

代码交付应包含：

- 可运行实现及相关文件。
- 已完成的交互和状态。
- 验证结果与仍受真实接口或业务规则限制的部分。

设计评审应按影响排序，给出具体位置、问题后果和可执行修改。
