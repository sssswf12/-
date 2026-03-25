# 企业级数据可视化后台管理系统 — 项目指南

## 一、项目概述

| 项目 | 说明 |
|------|------|
| 项目名称 | DataView Admin — 企业级数据可视化后台管理系统 |
| 教学模式 | AI 导师引导式教学，用户自己动手写每一行代码 |
| 适合人群 | Vue3 新手，有基本的 HTML/CSS/JS 基础 |
| 最终成果 | 一个包含登录、布局、看板、图表、表格 CRUD、AI 智能聊天、系统设置的完整后台系统 |

### 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 构建工具 | Vite | 5.x | 极速开发服务器、打包构建 |
| 核心框架 | Vue 3 | 3.4+ | 组合式 API（Composition API） |
| 开发语言 | TypeScript | 5.x | 类型安全，减少运行时错误 |
| UI 组件库 | Element Plus | 2.x | 企业级 UI 组件（表格、表单、弹窗等） |
| 可视化 | ECharts | 5.x | 折线图、柱状图、饼图、地图等 |
| 路由 | Vue Router | 4.x | 页面导航、路由守卫 |
| 状态管理 | Pinia | 2.x | 全局状态（用户信息、主题等） |
| CSS 方案 | SCSS | — | 嵌套语法、变量、混入 |
| 网络请求 | Axios | 1.x | HTTP 请求封装、拦截器 |
| AI 接口 | OpenAI API / 兼容接口 | — | 大语言模型对话能力（支持 DeepSeek 等国产模型） |
| Markdown 渲染 | markdown-it | 14.x | 将 AI 回复的 Markdown 渲染为 HTML |
| 代码高亮 | highlight.js | 11.x | AI 回复中代码块的语法高亮 |

---

## 二、功能模块设计

### 模块总览

```
DataView Admin
├── 🔐 登录模块
├── 📐 布局框架
├── 📊 数据看板（Dashboard）
├── 👥 用户管理
├── 📋 数据管理
├── 📈 图表中心
├── 🤖 AI 智能聊天
└── ⚙️ 系统设置
```

### 各模块详细功能

#### 1. 🔐 登录模块

| 功能 | 说明 |
|------|------|
| 登录表单 | 用户名 + 密码输入，Element Plus 表单验证 |
| 记住密码 | 本地存储（localStorage） |
| 登录逻辑 | 模拟接口登录，Token 存储到 Pinia |
| 路由守卫 | 未登录自动跳转登录页 |

#### 2. 📐 布局框架

| 功能 | 说明 |
|------|------|
| 侧边栏导航 | 可折叠菜单，支持多级嵌套，高亮当前路由 |
| 顶部栏 | 面包屑导航 + 用户头像下拉菜单（个人信息/退出登录） |
| 主内容区 | `<router-view>` 动态渲染页面 |
| 响应式 | 小屏幕自动折叠侧边栏 |

#### 3. 📊 数据看板（Dashboard）

| 功能 | 说明 |
|------|------|
| 统计卡片 | 4 个数据概览卡片（总用户、总订单、总销售额、访问量） |
| 折线图 | 近 7 天 / 30 天趋势图（ECharts） |
| 柱状图 | 各部门/产品销售对比 |
| 饼图 | 数据分类占比 |
| 数据表格 | 最近操作记录 / 待办事项列表 |

#### 4. 👥 用户管理

| 功能 | 说明 |
|------|------|
| 用户列表 | Element Plus 表格展示，分页 |
| 搜索筛选 | 按用户名、状态、日期范围搜索 |
| 新增用户 | 弹窗表单，包含表单验证 |
| 编辑用户 | 弹窗回填数据，修改后提交 |
| 删除用户 | 确认弹窗 + 删除操作 |
| 状态切换 | 开关组件切换用户启用/禁用状态 |

#### 5. 📋 数据管理

| 功能 | 说明 |
|------|------|
| 数据列表 | 带排序、筛选的复杂表格 |
| 批量操作 | 多选 + 批量删除 |
| 数据导出 | 导出为 Excel / CSV 文件（Blob） |
| 详情查看 | 抽屉组件展示详细信息 |

#### 6. 📈 图表中心

| 功能 | 说明 |
|------|------|
| 折线图页 | 多系列折线、面积图，支持切换时间范围 |
| 柱状图页 | 普通柱状图、堆叠柱状图、横向柱状图 |
| 饼图页 | 饼图、环形图、南丁格尔玫瑰图 |
| 综合看板 | 多图表组合排版，模拟真实数据报表 |

#### 7. 🤖 AI 智能聊天

| 功能 | 说明 |
|------|------|
| 对话界面 | 类 ChatGPT 的聊天气泡布局（用户消息右侧、AI 回复左侧） |
| 消息发送 | 输入框 + 发送按钮，支持 Enter 发送、Shift+Enter 换行 |
| 流式输出 | AI 回复逐字显示（SSE / fetch stream），模拟打字机效果 |
| Markdown 渲染 | AI 回复支持 Markdown 格式（标题、列表、代码块、表格等） |
| 代码高亮 | AI 回复中的代码块自动语法高亮 |
| 聊天记录 | 本地存储历史对话，支持多会话切换 |
| 新建对话 | 清空当前聊天，开启新一轮对话 |
| 清空记录 | 删除所有历史对话记录 |
| 加载状态 | 等待 AI 回复时显示 loading 动画 |
| 自动滚动 | 新消息自动滚动到底部 |

#### 8. ⚙️ 系统设置

| 功能 | 说明 |
|------|------|
| 个人信息 | 查看和修改个人资料（头像、昵称、邮箱） |
| 修改密码 | 旧密码验证 + 新密码确认 |
| 主题切换 | 亮色 / 暗色模式切换 |
| 系统信息 | 显示版本号、技术栈信息 |

---

## 三、项目结构规划

```
dataview-admin/
├── public/                     # 静态资源（不经过构建）
│   └── favicon.ico
├── src/
│   ├── api/                    # 接口请求
│   │   ├── user.ts             # 用户相关接口
│   │   ├── dashboard.ts        # 看板数据接口
│   │   ├── chat.ts             # AI 聊天接口（流式请求）
│   │   └── index.ts            # axios 实例封装
│   ├── assets/                 # 静态资源（经过构建）
│   │   ├── images/
│   │   └── styles/
│   │       ├── variables.scss  # SCSS 全局变量
│   │       ├── reset.scss      # 样式重置
│   │       └── global.scss     # 全局公共样式
│   ├── components/             # 公共组件
│   │   ├── ChartCard.vue       # 图表容器卡片
│   │   ├── StatCard.vue        # 统计数据卡片
│   │   ├── PageHeader.vue      # 页面标题组件
│   │   └── MarkdownRenderer.vue # Markdown 渲染组件（AI 聊天用）
│   ├── composables/            # 组合式函数（可复用逻辑）
│   │   ├── useChart.ts         # ECharts 初始化与响应式
│   │   ├── useLoading.ts       # 加载状态管理
│   │   └── useChat.ts          # AI 聊天逻辑（发送、流式接收、历史管理）
│   ├── layout/                 # 布局组件
│   │   ├── AppLayout.vue       # 整体布局容器
│   │   ├── AppSidebar.vue      # 侧边栏
│   │   ├── AppHeader.vue       # 顶部栏
│   │   └── AppMain.vue         # 主内容区
│   ├── mock/                   # 模拟数据
│   │   ├── user.ts             # 用户模拟数据
│   │   └── dashboard.ts        # 看板模拟数据
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.ts             # 用户状态
│   │   └── app.ts              # 应用全局状态（侧边栏折叠、主题等）
│   ├── types/                  # TypeScript 类型定义
│   │   ├── user.d.ts
│   │   ├── dashboard.d.ts
│   │   ├── chat.d.ts
│   │   └── api.d.ts
│   ├── utils/                  # 工具函数
│   │   ├── format.ts           # 日期/数字格式化
│   │   └── storage.ts          # localStorage 封装
│   ├── views/                  # 页面组件
│   │   ├── login/
│   │   │   └── LoginView.vue
│   │   ├── dashboard/
│   │   │   └── DashboardView.vue
│   │   ├── user/
│   │   │   └── UserManage.vue
│   │   ├── data/
│   │   │   └── DataManage.vue
│   │   ├── charts/
│   │   │   ├── LineChart.vue
│   │   │   ├── BarChart.vue
│   │   │   ├── PieChart.vue
│   │   │   └── MixedChart.vue
│   │   ├── chat/
│   │   │   └── AiChat.vue
│   │   └── settings/
│   │       └── SettingsView.vue
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── index.html                  # HTML 模板
├── package.json
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 配置
├── TEACHING_GUIDE.md           # 教学规范文档
└── PROJECT_GUIDE.md            # 本文件：项目指南
```

---

## 四、类型定义规划

> 以下仅为规划，到对应阶段时由用户自己编写。

### 用户相关类型 `types/user.d.ts`

```ts
// 用户信息
interface UserInfo {
  id: number
  username: string
  avatar: string
  email: string
  role: string
  status: 0 | 1          // 0 禁用 1 启用
  createTime: string
}

// 登录请求参数
interface LoginParams {
  username: string
  password: string
}

// 登录响应
interface LoginResult {
  token: string
  userInfo: UserInfo
}
```

### 看板数据类型 `types/dashboard.d.ts`

```ts
// 统计卡片数据
interface StatCardData {
  title: string
  value: number
  icon: string
  color: string
  trend: number           // 较昨日增长百分比
}

// 图表数据点
interface ChartDataItem {
  name: string
  value: number
}
```

### 通用 API 类型 `types/api.d.ts`

```ts
// 统一接口响应格式
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求参数
interface PageParams {
  page: number
  pageSize: number
}

// 分页响应
interface PageResult<T> {
  list: T[]
  total: number
}
```

### AI 聊天类型 `types/chat.d.ts`

```ts
// 单条聊天消息
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 一个完整的会话
interface ChatSession {
  id: string
  title: string              // 会话标题（取第一条消息的摘要）
  messages: ChatMessage[]
  createTime: number
  updateTime: number
}

// 发送给 AI 接口的请求体
interface ChatRequest {
  model: string              // 模型名称，如 'deepseek-chat'
  messages: {
    role: 'system' | 'user' | 'assistant'
    content: string
  }[]
  stream: boolean            // 是否流式输出
  temperature?: number       // 随机性控制 0-2
  max_tokens?: number        // 最大回复长度
}

// AI 流式响应的单个 chunk
interface ChatStreamChunk {
  id: string
  choices: {
    delta: {
      content?: string
    }
    finish_reason: string | null
  }[]
}
```

---

## 五、阶段任务分解

### 阶段 1：项目初始化

> 目标：用 Vite 创建项目，安装全部依赖，跑起来能看到页面

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 1.1 | 使用 Vite 创建 Vue3 + TS 项目 | [ ] | Vite 脚手架命令、项目模板选择 |
| 1.2 | 安装依赖：Element Plus、ECharts、Vue Router、Pinia、Axios、SCSS | [ ] | npm install 与 dependencies 的区别 |
| 1.3 | 配置 vite.config.ts（路径别名 @） | [ ] | resolve.alias 配置 |
| 1.4 | 配置 tsconfig.json（路径映射） | [ ] | paths 与 baseUrl |
| 1.5 | 在 main.ts 中注册 Element Plus | [ ] | app.use() 插件机制 |
| 1.6 | 创建全局样式文件（reset.scss、variables.scss） | [ ] | SCSS 变量、样式重置的意义 |
| 1.7 | 运行项目，确认首页正常显示 | [ ] | npm run dev、浏览器调试 |

### 阶段 2：登录页面

> 目标：完成登录页 UI + 表单验证 + 模拟登录逻辑

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 2.1 | 配置 Vue Router 基本路由（登录页 + 首页占位） | [ ] | createRouter、路由模式 |
| 2.2 | 创建登录页模板骨架 | [ ] | Element Plus 表单组件：el-form、el-input |
| 2.3 | 实现表单双向绑定（v-model） | [ ] | ref()、reactive() 的区别 |
| 2.4 | 添加表单验证规则 | [ ] | el-form rules 验证机制 |
| 2.5 | 编写登录函数（模拟接口） | [ ] | async/await、Promise 基础 |
| 2.6 | 创建 Pinia user store 存储 Token | [ ] | defineStore、state、actions |
| 2.7 | 登录成功后路由跳转 | [ ] | router.push()、编程式导航 |
| 2.8 | 登录页样式美化（居中布局、背景） | [ ] | Flex 布局、CSS 渐变背景 |

### 阶段 3：布局框架

> 目标：搭建侧边栏 + 顶部栏 + 主内容区的经典后台布局

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 3.1 | 创建 AppLayout.vue 整体布局容器 | [ ] | el-container 布局组件 |
| 3.2 | 创建 AppSidebar.vue 侧边栏（菜单） | [ ] | el-menu、el-menu-item、el-sub-menu |
| 3.3 | 侧边栏菜单点击跳转路由 | [ ] | router-link、菜单与路由的对应关系 |
| 3.4 | 创建 AppHeader.vue 顶部栏 | [ ] | 面包屑组件、el-dropdown |
| 3.5 | 实现侧边栏折叠/展开 | [ ] | Pinia 存储全局状态 (app store) |
| 3.6 | 配置所有页面的路由（嵌套路由） | [ ] | children 嵌套路由、路由元信息 meta |
| 3.7 | 添加路由守卫（未登录拦截） | [ ] | beforeEach 全局守卫、Token 校验 |
| 3.8 | 布局样式调整（固定侧边栏/顶部栏） | [ ] | position: fixed、CSS 过渡动画 |

### 阶段 4：数据看板（Dashboard）

> 目标：实现带统计卡片 + 多种 ECharts 图表的数据概览页面

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 4.1 | 创建看板页模板骨架（栅格布局） | [ ] | el-row、el-col 栅格系统 |
| 4.2 | 实现统计卡片组件（StatCard.vue） | [ ] | 组件 props 定义、父子组件通信 |
| 4.3 | 编写模拟数据（mock/dashboard.ts） | [ ] | 模拟数据设计思路 |
| 4.4 | 封装 ECharts 初始化 composable（useChart.ts） | [ ] | composable 模式、onMounted、onUnmounted 生命周期 |
| 4.5 | 实现折线图（近 7 天趋势） | [ ] | ECharts option 配置：xAxis、yAxis、series |
| 4.6 | 实现柱状图（部门销售对比） | [ ] | ECharts 柱状图配置、tooltip |
| 4.7 | 实现饼图（数据分类占比） | [ ] | ECharts 饼图配置、legend |
| 4.8 | 窗口 resize 时图表自适应 | [ ] | window.addEventListener、防抖 debounce |
| 4.9 | 看板页整体样式优化 | [ ] | 卡片阴影、间距、响应式栅格 |

### 阶段 5：用户管理

> 目标：完整的表格 CRUD（增删改查）功能

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 5.1 | 创建用户管理页模板（搜索栏 + 表格 + 分页） | [ ] | el-table、el-pagination |
| 5.2 | 编写用户模拟数据 | [ ] | 数组操作、数据结构设计 |
| 5.3 | 实现搜索筛选功能 | [ ] | computed 计算属性、数组 filter |
| 5.4 | 实现分页功能 | [ ] | 分页逻辑、slice 截取 |
| 5.5 | 新增用户弹窗（el-dialog + 表单） | [ ] | 弹窗控制、表单验证复用 |
| 5.6 | 编辑用户（数据回填到表单） | [ ] | 对象展开运算符、深拷贝 vs 浅拷贝 |
| 5.7 | 删除用户（确认弹窗） | [ ] | ElMessageBox.confirm、数组 splice/filter |
| 5.8 | 用户状态切换（el-switch） | [ ] | 开关组件、状态更新 |

### 阶段 6：数据管理

> 目标：更复杂的表格操作 — 排序、批量操作、数据导出

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 6.1 | 创建数据管理页模板 | [ ] | 复杂表格布局 |
| 6.2 | 实现表格排序功能 | [ ] | el-table sortable 属性 |
| 6.3 | 实现多选 + 批量删除 | [ ] | selection-change 事件、批量操作逻辑 |
| 6.4 | 实现详情抽屉（el-drawer） | [ ] | 抽屉组件、数据传递 |
| 6.5 | 实现数据导出为 CSV | [ ] | Blob 对象、URL.createObjectURL、文件下载 |
| 6.6 | 日期范围筛选 | [ ] | el-date-picker、日期处理 |

### 阶段 7：图表中心

> 目标：展示多种 ECharts 图表类型，深入掌握可视化配置

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 7.1 | 折线图页面（多系列 + 面积图） | [ ] | areaStyle、多 series 配置 |
| 7.2 | 柱状图页面（堆叠 + 横向） | [ ] | stack 属性、yAxis 类目轴 |
| 7.3 | 饼图页面（环形图 + 南丁格尔图） | [ ] | radius 配置、roseType |
| 7.4 | 综合看板页面（多图组合） | [ ] | Grid 布局排版多图表 |
| 7.5 | 图表交互（点击事件、联动） | [ ] | ECharts 事件系统 |
| 7.6 | 时间范围切换按钮组 | [ ] | 按钮组交互、数据刷新 |

### 阶段 8：AI 智能聊天

> 目标：实现接入大语言模型的聊天功能，支持流式输出和 Markdown 渲染

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 8.1 | 搭建聊天页面模板骨架（左侧会话列表 + 右侧聊天区） | [ ] | Flex 布局、页面分栏设计 |
| 8.2 | 实现消息列表渲染（气泡样式） | [ ] | v-for 渲染列表、条件样式绑定 :class |
| 8.3 | 实现输入框 + 发送按钮 | [ ] | el-input textarea、键盘事件 @keydown |
| 8.4 | 编写 AI 接口请求函数（fetch + SSE 流式） | [ ] | fetch API、ReadableStream、TextDecoder |
| 8.5 | 实现流式输出（打字机效果） | [ ] | 流式数据解析、响应式字符串拼接 |
| 8.6 | 安装 markdown-it + highlight.js，渲染 AI 回复 | [ ] | Markdown 解析原理、v-html 指令 |
| 8.7 | 实现自动滚动到底部 | [ ] | scrollIntoView、nextTick |
| 8.8 | 实现会话管理（新建/切换/删除会话） | [ ] | 数组管理、localStorage 持久化 |
| 8.9 | 封装 useChat composable | [ ] | 逻辑抽离、composable 进阶 |
| 8.10 | 聊天页样式优化（加载动画、代码块样式） | [ ] | CSS animation、代码块主题 |

### 阶段 9：系统设置

> 目标：个人信息管理 + 主题切换

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 9.1 | 个人信息展示与编辑 | [ ] | 表单编辑模式切换 |
| 9.2 | 修改密码功能 | [ ] | 密码强度验证、自定义验证规则 |
| 9.3 | 主题切换（亮色/暗色） | [ ] | CSS 变量、Element Plus 暗色模式 |
| 9.4 | 系统信息展示 | [ ] | el-descriptions 描述列表组件 |

### 阶段 10：完善与优化

> 目标：补充细节，提升项目完整度和代码质量

| 序号 | 任务 | 状态 | 学习要点 |
|------|------|------|----------|
| 10.1 | 封装 Axios 请求（拦截器） | [ ] | 请求/响应拦截器、统一错误处理 |
| 10.2 | 404 页面 | [ ] | 路由匹配兜底、页面设计 |
| 10.3 | 页面加载 Loading 效果 | [ ] | v-loading 指令、骨架屏 |
| 10.4 | localStorage 工具封装 | [ ] | 泛型工具函数 |
| 10.5 | 全局错误处理 | [ ] | app.config.errorHandler |
| 10.6 | 项目打包与优化 | [ ] | npm run build、分包策略、体积分析 |

---

## 六、技术知识点索引

### Vue 3 框架

| 知识点 | 首次出现阶段 |
|--------|------------|
| ref() / reactive() | 阶段 2（登录表单） |
| computed | 阶段 5（搜索筛选） |
| watch / watchEffect | 阶段 4（图表数据更新） |
| onMounted / onUnmounted | 阶段 4（ECharts 初始化） |
| 组件 props / emits | 阶段 4（StatCard 组件） |
| provide / inject | 阶段 8（主题切换） |
| composable 组合式函数 | 阶段 4（useChart） |
| v-model 双向绑定 | 阶段 2（表单输入） |
| v-for 列表渲染 | 阶段 4（统计卡片循环） |
| v-if / v-show 条件渲染 | 阶段 5（弹窗显隐） |

### TypeScript

| 知识点 | 首次出现阶段 |
|--------|------------|
| interface 接口定义 | 阶段 2（LoginParams） |
| 泛型 `<T>` | 阶段 9（API 响应封装） |
| 类型断言 | 阶段 4（DOM 元素获取） |
| 联合类型 `0 \| 1` | 阶段 5（用户状态） |
| 可选属性 `?` | 阶段 5（搜索参数） |

### Element Plus

| 知识点 | 首次出现阶段 |
|--------|------------|
| el-form + el-form-item | 阶段 2（登录表单） |
| el-input | 阶段 2（登录表单） |
| el-button | 阶段 2（登录按钮） |
| el-menu / el-sub-menu | 阶段 3（侧边栏菜单） |
| el-container 布局 | 阶段 3（整体布局） |
| el-breadcrumb 面包屑 | 阶段 3（顶部栏） |
| el-dropdown | 阶段 3（用户下拉菜单） |
| el-row / el-col 栅格 | 阶段 4（看板布局） |
| el-table / el-table-column | 阶段 5（用户列表） |
| el-pagination | 阶段 5（分页） |
| el-dialog | 阶段 5（新增/编辑弹窗） |
| el-switch | 阶段 5（状态切换） |
| el-drawer | 阶段 6（详情抽屉） |
| el-date-picker | 阶段 6（日期筛选） |
| el-descriptions | 阶段 8（系统信息） |
| ElMessage / ElMessageBox | 阶段 5（提示 / 确认框） |

### ECharts

| 知识点 | 首次出现阶段 |
|--------|------------|
| echarts.init() | 阶段 4（useChart） |
| setOption() | 阶段 4（折线图） |
| xAxis / yAxis 配置 | 阶段 4（折线图） |
| series 数据系列 | 阶段 4（折线图） |
| tooltip 悬浮提示 | 阶段 4（柱状图） |
| legend 图例 | 阶段 4（饼图） |
| resize() 响应式 | 阶段 4（窗口缩放） |
| areaStyle 面积图 | 阶段 7（折线图进阶） |
| stack 堆叠 | 阶段 7（柱状图进阶） |
| roseType 南丁格尔图 | 阶段 7（饼图进阶） |
| 事件监听 on('click') | 阶段 7（图表交互） |

### 其他

| 知识点 | 首次出现阶段 |
|--------|------------|
| Vue Router 路由配置 | 阶段 2 |
| 嵌套路由 children | 阶段 3 |
| 路由守卫 beforeEach | 阶段 3 |
| Pinia defineStore | 阶段 2 |
| Axios 请求 | 阶段 10 |
| Blob 文件导出 | 阶段 6 |
| SCSS 变量 / 嵌套 | 阶段 1 |
| localStorage | 阶段 2 |
| 防抖 debounce | 阶段 4 |
| async / await | 阶段 2 |
| fetch API 原生请求 | 阶段 8（AI 流式请求） |
| ReadableStream 流式读取 | 阶段 8（SSE 数据解析） |
| TextDecoder 文本解码 | 阶段 8（二进制流转文本） |
| markdown-it Markdown 解析 | 阶段 8（AI 回复渲染） |
| highlight.js 代码高亮 | 阶段 8（代码块着色） |
| v-html 指令 | 阶段 8（渲染 HTML 字符串） |
| nextTick 异步 DOM 更新 | 阶段 8（自动滚动） |

---

## 七、进度记录

| 阶段 | 名称 | 任务数 | 已完成 | 状态 |
|------|------|--------|--------|------|
| 1 | 项目初始化 | 7 | 0 | 未开始 |
| 2 | 登录页面 | 8 | 0 | 未开始 |
| 3 | 布局框架 | 8 | 0 | 未开始 |
| 4 | 数据看板 | 9 | 0 | 未开始 |
| 5 | 用户管理 | 8 | 0 | 未开始 |
| 6 | 数据管理 | 6 | 0 | 未开始 |
| 7 | 图表中心 | 6 | 0 | 未开始 |
| 8 | AI 智能聊天 | 10 | 0 | 未开始 |
| 9 | 系统设置 | 4 | 0 | 未开始 |
| 10 | 完善与优化 | 6 | 0 | 未开始 |
| **合计** | | **72** | **0** | |

---

## 八、常见问题预案

### Q1：为什么用模拟数据而不是真实后端？

本项目专注于前端开发学习。使用 mock 数据可以让你不依赖后端就能跑通所有功能。等前端能力扎实后，再对接真实 API 是很容易的。

### Q2：为什么选 Composition API 而不是 Options API？

Composition API 是 Vue3 的主推写法，更适合 TypeScript，逻辑复用更灵活（composable），也是目前业界主流方向。

### Q3：ECharts 图表不显示怎么办？

常见原因：
1. 容器 `<div>` 没有设置明确的宽高（ECharts 需要容器有尺寸）
2. `echarts.init()` 在 DOM 还没渲染时就调用了（应在 `onMounted` 中初始化）
3. 数据为空时没有做判空处理

### Q4：Element Plus 样式没生效？

检查：
1. `main.ts` 中是否导入了 `import 'element-plus/dist/index.css'`
2. 组件名是否写对（如 `el-button` 而非 `el-Button`）
3. 是否在 `main.ts` 中调用了 `app.use(ElementPlus)`

### Q5：TypeScript 报错看不懂怎么办？

1. 先看红色波浪线下的错误提示
2. 最常见的是类型不匹配 — 检查变量类型定义是否和实际赋值一致
3. `any` 类型可以临时绕过，但不推荐长期使用
4. 遇到不懂的错误随时问导师

### Q6：页面空白/白屏？

1. 打开浏览器控制台（F12）查看红色报错
2. 最常见：组件 import 路径错误、变量未定义、模板语法错误
3. 检查 `<router-view>` 是否正确放置

### Q7：AI 聊天的 API Key 怎么获取？

本项目支持 OpenAI 兼容接口格式，推荐使用国产模型（价格低、速度快）：
1. **DeepSeek**：访问 https://platform.deepseek.com 注册，创建 API Key
2. **通义千问**：访问阿里云百炼平台注册
3. 也可以用 OpenAI 官方 Key，接口格式完全兼容

API Key 属于敏感信息，代码中不要硬编码，应放在环境变量（`.env` 文件）中。

### Q8：流式输出（SSE）是什么原理？

普通 HTTP 请求：发一次请求 → 等全部生成完 → 一次性返回全部内容。
流式输出（SSE）：发一次请求 → 服务器边生成边推送 → 前端逐步接收逐步显示。

好处：用户不用等几秒才看到完整回复，而是像打字一样一个字一个字地出现，体验更好。
技术实现：用浏览器原生 `fetch` API + `ReadableStream` 读取，不需要 Axios（Axios 不支持流式）。

### Q9：每个阶段大约多少代码量？

| 阶段 | 预估代码量 |
|------|-----------|
| 阶段 1 项目初始化 | ~50 行（配置文件为主） |
| 阶段 2 登录页面 | ~150 行 |
| 阶段 3 布局框架 | ~250 行 |
| 阶段 4 数据看板 | ~350 行 |
| 阶段 5 用户管理 | ~300 行 |
| 阶段 6 数据管理 | ~250 行 |
| 阶段 7 图表中心 | ~400 行 |
| 阶段 8 AI 智能聊天 | ~350 行 |
| 阶段 9 系统设置 | ~200 行 |
| 阶段 10 完善优化 | ~200 行 |
| **合计** | **~2500 行** |

> 每阶段按功能单元拆分为 10-30 行一段，循序渐进完成。
