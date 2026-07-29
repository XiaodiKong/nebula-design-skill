---
name: backend-design-skill
description: Design, implement, review, or optimize desktop-first Chinese enterprise admin products and HTML-based technical diagrams; determine whether a request needs a focused single-page experience or a full system shell with navigation, user context, and global controls. Supports selectable Clarity, Cal.com, Notion, Linear, Claude, or OpenCode AI-inspired visual themes, uses Cal.com by default, and provides separate Chinese/Latin typography stacks. Use for dashboards, data platforms, CRM/customer profiles, risk-control systems, workflow/configuration tools, permission management, AI-assisted workbenches, tables, forms, detail pages, drawers, system architecture diagrams, hierarchy trees, flowcharts, swimlanes, data lineage DAGs, network topologies, sequence diagrams, relationship graphs, and other complex back-office interfaces; also use when turning business requirements into information architecture, interaction specifications, UI copy, reusable components, theme tokens, typography systems, SVG/Canvas diagram workbenches, or production frontend code.
---

# Backend Product Design

把模糊业务需求转化为清晰、可操作、可实现的中文企业级中后台。支持 Clarity、Cal.com、Notion、Linear、Claude 和 OpenCode AI 六套主题；Cal.com 是默认主题。无论选择哪种视觉语言，都优先保证任务效率、信息层级、状态语义和可访问性。

## 先判定应用形态

实现新页面前先读取 [references/application-shell-selection.md](references/application-shell-selection.md)，判断：

- **聚焦单页面**：没有全局导航，围绕一个独立任务组织。
- **系统应用**：带侧栏、顶栏、用户信息、面包屑和全局上下文。

需求信号明确时直接选择并说明依据；两者都合理且会显著改变实现时，实施前给用户两个明确选项。只有企业业务名称或“做一个页面”不是选择系统外壳的充分证据。不要把“单 HTML 文件”“SPA 技术架构”和“聚焦单页面”当作同一个概念。已有仓库存在系统外壳时默认嵌入现有外壳。

## 再确定交付模式

根据请求选择一种或多种模式：

- **方案设计**：输出用户任务、信息架构、页面结构、字段、交互、状态与权限。
- **页面实现**：直接在现有技术栈中实现可运行界面；尊重仓库约定，不随意替换框架。
- **组件设计**：定义 API、状态、尺寸、交互、可访问性和使用边界。
- **图形设计**：把系统、层级、流程、血缘或关系数据转化为可读、可交互的 HTML 图形工作台。
- **设计评审**：指出具体问题、影响和修改建议；能修改时同步完成修复。
- **体验优化**：先定位任务阻力，再调整层级、流程、密度和反馈。
- **主题设计**：选择、实现或切换主题令牌，并保持同一业务界面在不同视觉语言下结构稳定。

用户要求实现或修改代码时，不要只交付文字方案。

## 按需读取参考

执行任务前读取所有相关文件：

- 任何视觉或页面任务：读取 [references/visual-system.md](references/visual-system.md) 和 [references/theme-selection.md](references/theme-selection.md)。
- 任何新页面、页面重构或产品外壳选择：读取 [references/application-shell-selection.md](references/application-shell-selection.md)。
- 用户选择 Cal.com：读取 [references/theme-cal.md](references/theme-cal.md)。
- 用户选择 Notion：读取 [references/theme-notion.md](references/theme-notion.md)。
- 用户选择 Linear：读取 [references/theme-linear.md](references/theme-linear.md)。
- 用户选择 Claude：读取 [references/theme-claude.md](references/theme-claude.md)。
- 用户选择 OpenCode AI：读取 [references/theme-opencode.md](references/theme-opencode.md)。
- 任何字体选择、品牌字体接入或多语言排版：读取 [references/typography-system.md](references/typography-system.md)。
- 用户选择 Clarity：使用 [references/visual-system.md](references/visual-system.md) 中的 Clarity 主题规则。
- 用户未指定主题：读取 [references/theme-cal.md](references/theme-cal.md)，默认使用 Cal.com。
- 新页面、页面重构、信息架构：再读取 [references/page-patterns.md](references/page-patterns.md)。
- 表格、表单、弹层、图表、AI、权限或状态：再读取 [references/components-and-interactions.md](references/components-and-interactions.md)。
- 架构图、层级图、流程图、血缘、拓扑、DAG、时序或关系图：必须读取 [references/diagram-design.md](references/diagram-design.md)。
- 编码、验收或设计评审：再读取 [references/implementation-and-review.md](references/implementation-and-review.md)。
- 需要领域示例或不确定页面组织方式：读取 [references/example-blueprints.md](references/example-blueprints.md)。
- 新项目需要基础视觉变量时，从 [references/theme-selection.md](references/theme-selection.md) 指向的六套 `assets/*-tokens.css` 中选择一套；已有设计令牌时映射 `--admin-*` 语义，不要并行维护第二套冲突令牌。
- 实现 HTML 图形工作台且项目缺少图形令牌时，再使用 [assets/diagram-tokens.css](assets/diagram-tokens.css)。

## 工作流

### 1. 判定应用外壳

先根据需求与仓库判断聚焦单页面或系统应用。重点检查：

- 是否只有一个闭环任务，还是存在多个稳定模块与跨页面任务。
- 是否需要全局导航、用户/组织、权限、通知、环境或审计上下文。
- 是否已有可复用的应用框架、路由和布局组件。
- 用户所说“单页”指交付封装、SPA 架构，还是产品外壳。

证据不足且两种形态都会成立时，按 [references/application-shell-selection.md](references/application-shell-selection.md) 给出明确选择，不带着未确认的外壳假设实施。像“做一个客户运营分析页面”这类没有现有外壳、全局模块或独立交付信息的请求必须先选择，不能仅凭企业场景默认加导航。

### 2. 建立业务模型

先从用户输入和仓库中确认：

- 主要用户角色、核心任务、使用频率和成功结果。
- 核心实体、关键字段、状态流转、批量操作和权限边界。
- 数据规模、实时性、风险等级、审计要求和异常场景。
- 当前技术栈、组件库、路由、状态管理、接口与品牌约束。

信息缺失时做最小、可逆的合理假设，并在交付中标明；只有会显著改变业务流程或数据含义时才询问。

### 3. 先设计任务流，再排页面

用“进入页面 → 定位对象 → 判断状态 → 执行动作 → 获得反馈”描述主流程。优先减少：

- 无意义的页面跳转。
- 重复填写和重复确认。
- 为展示而展示的指标或卡片。
- 被埋在更多菜单里的高频操作。
- 多层弹窗、抽屉或难以返回的分支。

### 4. 建立页面层级

按需组织为：

1. 面包屑。
2. 页面标题、说明和主操作。
3. 查询与筛选。
4. 与当前任务直接相关的概览。
5. 主工作区。
6. 批量操作、分页和辅助详情。

先选择页面模式，再决定组件；不要从组件库拼装开始。

### 5. 建立图形语义

请求包含图形可视化时，先定义节点、关系、层级、方向、分组、状态和用户动作，再选择图类型与渲染技术。

- 层级明确时使用树形或分层布局，不用随机力导向图。
- 流程或依赖有方向时使用从左到右或从上到下的有向布局。
- 系统边界使用分组容器表达；不要只靠节点颜色区分系统。
- 图形必须提供标题、图例、缩放适配和详情入口；复杂图提供搜索、筛选和聚焦。
- 更新数据时尽量保持节点位置稳定，保护用户的空间记忆。
- 图形不能成为信息孤岛；按复杂度提供列表、树或表格替代视图。

### 6. 选择并应用视觉主题

用户明确指定主题时直接使用。用户要求提供风格选择时，使用同一业务内容制作六套可比较预览或主题切换器；不要用不同信息架构制造虚假的风格差异。

用户未指定时：

- 默认使用 Cal.com，不因业务类型自动改成其他主题。
- 只有用户明确要求推荐、比较或“选择最合适主题”时，才按场景建议：高密度风控与数据后台可选 Clarity；内容、知识和协作工作区可选 Notion；暗色工程、研发与运维工具可选 Linear；AI 助手、研究与内容分析可选 Claude；AI 编码、终端与日志工具可选 OpenCode AI。

按 [references/typography-system.md](references/typography-system.md) 分离中文、英文、标题、正文和等宽字体。自定义字体只有在项目已有合法资产时使用。五套品牌风格是基于公开页面分析的非官方适配，不能声称使用官方设计系统。

遵守以下底线：

- 使用语义色和中性色建立层级；颜色不作无意义装饰。
- 采用 4px 间距网格、小圆角、弱边框、极少阴影。
- 默认桌面端、中等偏紧凑密度、中文优先。
- 只在业务模块确实独立时使用卡片，避免“卡片套卡片”。
- 关键操作必须有清楚的中文文字，不能只靠模糊图标。
- AI 能力作为工作流增强，不把整个产品做成聊天界面。

### 7. 补齐真实产品状态

每个可交付页面至少处理：

- 默认、悬停、聚焦、选中、禁用。
- 加载、空数据、无结果、失败、无权限。
- 表单校验、未保存变更、成功反馈。
- 长文本、大数字、极端数据量和横向溢出。
- 角色权限、危险操作和审计信息。

不要用静态“漂亮样例”代替真实交互状态。

### 8. 实现与验证

实现时：

- 复用现有组件、设计令牌和工程模式。
- 使用真实业务文案与有代表性的示例数据，避免 `Lorem ipsum` 和无意义占位。
- 保持语义 HTML、键盘操作、清晰焦点和足够对比度。
- 组件依赖 `--admin-*` 语义变量；主题切换不应改变业务状态、权限或主任务位置。
- 在适当尺寸下检查主流程；复杂表格优先保证桌面端，并为窄屏提供查看与轻操作降级。
- 图形页面检查节点重叠、连线穿越、文字截断、缩放边界、键盘操作和大数据量降级。
- 验证关键操作、状态切换、空态、错误态和布局溢出。

## 输出要求

方案设计应说明：

- 已知条件与关键假设。
- 页面目标、用户角色与主任务。
- 信息架构和主要交互。
- 关键字段、状态、权限与异常处理。
- 重要设计取舍，而不是逐项解释常识。

代码交付应包含：

- 可运行实现及相关文件。
- 已完成的交互和状态。
- 验证结果与仍受真实接口或业务规则限制的部分。

设计评审应按影响排序，给出具体位置、问题后果和可执行修改。
