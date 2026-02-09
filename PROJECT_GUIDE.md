# 个人财务管理系统 - 项目指导文档

## 一、项目概述

### 1.1 项目名称
Finance Tracker（个人财务管理系统）

### 1.2 教学模式
- **角色**：AI 作为导师，手把手教用户写代码
- **核心原则**：模拟真人写代码的思路，分步骤教学，不要一次性给完整代码
- **教学步骤**：
  1. **分析需求**：这个功能要做什么？
  2. **设计结构**：页面/组件分几个部分？
  3. **写模板骨架**：先搭 HTML 结构，用占位文字
  4. **分析数据需求**：模板里需要哪些变量？
  5. **分析函数需求**：模板里绑定了哪些事件，需要哪些函数？
  6. **逐步实现**：一个功能一个功能地写，每次只加一小块
  7. **解释代码**：说明为什么这样写，数据从哪来，到哪去
- **禁止行为**：
  - ❌ 不要一次性给出完整的几百行代码
  - ❌ 不要让用户只能"照着抄"而不理解
- **正确做法**：
  - ✅ 每次只给一小段代码（10-30行）
  - ✅ 写完一段，用户测试后，再写下一段
  - ✅ 说明这段代码的作用、数据流向
- **用户操作**：用户根据 AI 提供的代码，手动敲入（推荐）或复制粘贴到对应文件中

### 1.3 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 最新 | 前端框架，使用 Composition API |
| TypeScript | 最新 | 类型安全 |
| Vite | 最新 | 构建工具 |
| Element Plus | 最新 | UI 组件库（Element UI 的 Vue3 版本）|
| ECharts | 最新 | 数据可视化图表 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 最新 | 状态管理 |

### 1.4 数据存储方案
- 使用 **localStorage** 做本地持久化存储（无后端）
- 封装统一的数据存取工具类
- 后续可扩展为 API 请求

---

## 二、功能模块设计

### 2.1 模块总览
```
finance-tracker/
├── 登录页（Login）            - 模拟登录，学习表单
├── 后台布局（Layout）          - 侧边栏 + 顶栏 + 内容区
├── 首页仪表盘（Dashboard）     - 数据概览 + ECharts 图表
├── 账单管理（Bills）           - CRUD 核心功能
├── 分类管理（Categories）      - 树形数据管理
├── 统计报表（Reports）         - 多维度 ECharts 图表
├── 预算管理（Budget）          - 预算设置与追踪
└── 系统设置（Settings）        - 个人信息、数据导出
```

### 2.2 各模块详细功能

#### 登录页（Login）
- 用户名/密码表单
- 表单验证规则
- 模拟登录逻辑（存 token 到 localStorage）
- 登录状态持久化

#### 后台布局（Layout）
- 左侧菜单栏（可折叠）
- 顶部导航栏（用户信息、退出登录）
- 面包屑导航
- 主内容区域

#### 首页仪表盘（Dashboard）
- 统计卡片：本月收入、本月支出、本月结余、总资产
- ECharts 折线图：近 6 个月收支趋势
- ECharts 饼图：本月支出分类占比
- 最近交易记录列表（最近 5 条）

#### 账单管理（Bills）
- 账单列表（Element Plus Table）
- 搜索筛选：按日期范围、类型（收入/支出）、分类
- 新增账单（Dialog + Form）
- 编辑账单
- 删除账单（确认提示）
- 分页功能

#### 分类管理（Categories）
- 收入分类列表（工资、奖金、理财等）
- 支出分类列表（餐饮、交通、购物等）
- 新增/编辑/删除分类
- 默认分类（不可删除）

#### 统计报表（Reports）
- 月度报表：选择月份查看详细收支
- 年度报表：按月对比柱状图
- 分类统计：各分类的支出排行
- 趋势分析：收支趋势折线图

#### 预算管理（Budget）
- 设置月度总预算
- 各分类预算分配
- 预算使用进度条
- 超支预警提示

#### 系统设置（Settings）
- 个人信息编辑
- 数据导出为 JSON
- 清空数据（危险操作确认）

---

## 三、项目结构规划

```
finance-tracker/
├── public/
├── src/
│   ├── assets/                 # 静态资源（图片、样式）
│   │   └── styles/
│   │       └── global.css      # 全局样式
│   ├── components/             # 通用组件
│   │   ├── AppHeader.vue       # 顶部栏
│   │   ├── AppSidebar.vue      # 侧边栏
│   │   └── StatCard.vue        # 统计卡片
│   ├── views/                  # 页面组件
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── BillsView.vue
│   │   ├── CategoriesView.vue
│   │   ├── ReportsView.vue
│   │   ├── BudgetView.vue
│   │   └── SettingsView.vue
│   ├── layouts/                # 布局组件
│   │   └── MainLayout.vue
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── stores/                 # Pinia 状态管理
│   │   ├── user.ts             # 用户状态
│   │   ├── bills.ts            # 账单数据
│   │   ├── categories.ts       # 分类数据
│   │   └── budget.ts           # 预算数据
│   ├── types/                  # TypeScript 类型定义
│   │   └── index.ts            # 所有接口/类型
│   ├── utils/                  # 工具函数
│   │   ├── storage.ts          # localStorage 封装
│   │   └── format.ts           # 格式化工具（日期、金额）
│   ├── App.vue
│   └── main.ts
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 四、TypeScript 类型定义规划

```typescript
// 以下为需要用户自己编写的类型，此处仅作规划参考

// 账单记录
interface Bill {
  id: string
  type: 'income' | 'expense'     // 收入或支出
  amount: number                  // 金额
  categoryId: string              // 分类ID
  date: string                    // 日期 YYYY-MM-DD
  note: string                    // 备注
  createdAt: string               // 创建时间
}

// 分类
interface Category {
  id: string
  name: string                    // 分类名称
  type: 'income' | 'expense'     // 属于收入还是支出
  icon: string                    // 图标名称
  isDefault: boolean              // 是否默认分类
}

// 预算
interface Budget {
  id: string
  month: string                   // 月份 YYYY-MM
  totalAmount: number             // 总预算
  categories: BudgetCategory[]    // 分类预算
}

interface BudgetCategory {
  categoryId: string
  amount: number                  // 预算金额
}

// 用户
interface UserInfo {
  username: string
  nickname: string
  avatar: string
}
```

---

## 五、阶段任务分解

### 阶段一：项目初始化与基础配置（第 1-2 天）

#### 任务清单
- [已完成] 1.1 使用 create-vue 创建项目
- [已完成] 1.2 安装 Element Plus
- [已完成] 1.3 配置 Element Plus（全局引入 or 按需引入）
- [已完成] 1.4 安装 ECharts
- [已完成] 1.5 清理脚手架默认文件
- [已完成] 1.6 创建项目目录结构
- [已完成] 1.7 编写 TypeScript 类型定义文件
- [已完成] 1.8 编写 localStorage 工具类
- [已完成] 1.9 编写格式化工具函数

#### 学习要点
- Vite 的配置文件 vite.config.ts 各项配置的含义
- TypeScript 的 interface 和 type 的区别与使用
- Vue 3 插件的安装与注册机制
- ES Module 的导入导出

---

### 阶段二：路由与布局（第 3-4 天）

#### 任务清单
- [已完成] 2.1 配置 Vue Router 路由表
- [已完成] 2.2 创建 MainLayout 布局组件
- [已完成] 2.3 实现侧边栏菜单（Element Plus Menu）
- [已完成] 2.4 实现顶部导航栏
- [已完成] 2.5 实现面包屑导航
- [已完成] 2.6 添加路由守卫（登录拦截
- [已完成] 2.7 实现侧边栏折叠功能

#### 学习要点
- Vue Router 4 的路由配置方式
- 嵌套路由的概念和用法
- 路由守卫（beforeEach）的作用
- Element Plus 的 Container/Menu/Breadcrumb 组件
- Vue 3 组件间通信（props/emits）

---

### 阶段三：登录功能（第 4 天）

#### 任务清单
- [已完成] 3.1 创建登录页面布局
- [已完成] 3.2 使用 Element Plus Form 实现登录表单
- [已完成] 3.3 编写表单验证规则
- [已完成] 3.4 创建 user store（Pinia）
- [已完成] 3.5 实现模拟登录逻辑
- [已完成] 3.6 登录成功后跳转

#### 学习要点
- Element Plus 的 Form 组件与表单验证
- Pinia 的核心概念：state、getters、actions
- Pinia 持久化（手动存取 localStorage）
- 响应式数据（ref、reactive）的使用
- Vue 3 的 v-model 双向绑定

---

### 阶段四：账单管理 CRUD（第 5-7 天）⭐核心模块

#### 任务清单
- [已完成] 4.1 创建 bills store
- [已完成] 4.2 实现账单列表页面（Table 组件）
- [已完成] 4.3 实现搜索筛选功能（日期选择器、下拉选择）
- [已完成] 4.4 实现新增账单弹窗（Dialog + Form）
- [已完成] 4.5 实现编辑账单功能
- [已完成] 4.6 实现删除账单（确认弹窗）
- [已完成] 4.7 实现分页功能
- [已完成] 4.8 数据持久化到 localStorage

#### 学习要点
- Element Plus Table 组件的列定义和数据绑定
- Element Plus Dialog 弹窗的使用
- Element Plus 的 DatePicker、Select 组件
- computed 计算属性的使用（筛选数据）
- watch 侦听器的使用
- TypeScript 泛型在实际场景中的应用
- 数组方法：filter、map、reduce、find、sort
- UUID 生成或简易 ID 方案

---

### 阶段五：分类管理（第 8-9 天）

#### 任务清单
- [ ] 5.1 创建 categories store（含默认分类数据）
- [ ] 5.2 实现分类列表页面（收入/支出 Tab 切换）
- [ ] 5.3 实现新增分类
- [ ] 5.4 实现编辑分类
- [ ] 5.5 实现删除分类（校验是否被账单引用）
- [ ] 5.6 图标选择功能

#### 学习要点
- Element Plus 的 Tabs 组件
- Element Plus 的 Tag 组件
- 数据之间的关联关系处理
- 删除前的业务校验逻辑

---

### 阶段六：ECharts 图表与仪表盘（第 10-12 天）⭐核心模块

#### 任务清单
- [ ] 6.1 封装 ECharts 基础组件
- [ ] 6.2 实现仪表盘统计卡片
- [ ] 6.3 实现收支趋势折线图
- [ ] 6.4 实现支出分类饼图
- [ ] 6.5 实现最近交易列表
- [ ] 6.6 实现统计报表页面
- [ ] 6.7 月度柱状图
- [ ] 6.8 年度对比图
- [ ] 6.9 图表响应式适配

#### 学习要点
- ECharts 的核心概念：option、series、xAxis、yAxis
- ECharts 常见图表类型的配置
- Vue 3 封装第三方库组件的思路
- 组合式函数（composables）的抽取
- onMounted/onUnmounted 生命周期
- ResizeObserver 实现图表自适应
- 数据聚合计算（按月汇总、分类汇总）

---

### 阶段七：预算管理（第 13 天）

#### 任务清单
- [ ] 7.1 创建 budget store
- [ ] 7.2 实现预算设置页面
- [ ] 7.3 实现预算进度展示（Progress 组件）
- [ ] 7.4 实现超支预警逻辑

#### 学习要点
- Element Plus 的 Progress、Alert 组件
- 跨 store 数据引用（在 budget store 中访问 bills store）
- 条件样式绑定（:class、:style）

---

### 阶段八：系统设置与收尾（第 14-15 天）

#### 任务清单
- [ ] 8.1 实现个人信息编辑
- [ ] 8.2 实现数据导出功能（JSON）
- [ ] 8.3 实现清空数据功能
- [ ] 8.4 全局样式优化
- [ ] 8.5 响应式适配检查
- [ ] 8.6 代码整理与优化

#### 学习要点
- Blob 和 URL.createObjectURL 实现文件下载
- Element Plus 的 MessageBox 确认弹窗
- CSS 变量与主题定制
- 项目优化和代码规范

---

## 六、关键技术知识点索引

### Vue 3 核心
| 知识点 | 首次出现阶段 | 说明 |
|--------|------------|------|
| ref / reactive | 阶段三 | 响应式数据 |
| computed | 阶段四 | 计算属性 |
| watch / watchEffect | 阶段四 | 侦听器 |
| v-model | 阶段三 | 双向绑定 |
| v-for / v-if | 阶段四 | 条件与列表渲染 |
| props / emits | 阶段二 | 组件通信 |
| provide / inject | 阶段六 | 跨层级通信 |
| onMounted / onUnmounted | 阶段六 | 生命周期 |
| 组合式函数 (composables) | 阶段六 | 逻辑复用 |

### TypeScript
| 知识点 | 首次出现阶段 | 说明 |
|--------|------------|------|
| interface | 阶段一 | 接口定义 |
| type | 阶段一 | 类型别名 |
| 泛型 | 阶段四 | 通用类型 |
| 联合类型 | 阶段一 | 'income' \| 'expense' |
| 类型断言 | 阶段四 | as 关键字 |
| 可选属性 | 阶段三 | ? 标记 |

### Element Plus
| 组件 | 使用阶段 | 用途 |
|------|---------|------|
| Layout (Container) | 阶段二 | 页面布局 |
| Menu | 阶段二 | 侧边栏菜单 |
| Form / FormItem | 阶段三 | 表单 |
| Table / TableColumn | 阶段四 | 数据表格 |
| Dialog | 阶段四 | 弹窗 |
| DatePicker | 阶段四 | 日期选择 |
| Select | 阶段四 | 下拉选择 |
| Pagination | 阶段四 | 分页 |
| Tabs | 阶段五 | 标签切换 |
| Progress | 阶段七 | 进度条 |
| Message / MessageBox | 阶段四 | 提示/确认 |
| Breadcrumb | 阶段二 | 面包屑导航 |

### ECharts
| 图表类型 | 使用阶段 | 用途 |
|---------|---------|------|
| 折线图 (line) | 阶段六 | 收支趋势 |
| 饼图 (pie) | 阶段六 | 分类占比 |
| 柱状图 (bar) | 阶段六 | 月度对比 |

---

## 七、进度记录

> 用户在完成每个阶段后，更新此处的进度

| 阶段 | 状态 | 备注 |
|------|------|------|
| 阶段一：项目初始化 | 已完成 | |
| 阶段二：路由与布局 | 已完成 | |
| 阶段三：登录功能 | 未开始 | |
| 阶段四：账单管理 | 未开始 | |
| 阶段五：分类管理 | 未开始 | |
| 阶段六：图表与仪表盘 | 未开始 | |
| 阶段七：预算管理 | 未开始 | |
| 阶段八：设置与收尾 | 未开始 | |

---

## 八、常见问题预案

### Q1：Element Plus 全局引入 vs 按需引入？
- 学习阶段建议**全局引入**，简单直接
- 生产项目推荐**按需引入**，减小打包体积

### Q2：没有后端怎么办？
- 所有数据存储在 localStorage
- 封装 storage 工具类模拟数据持久化
- 学完后可以自行对接真实后端 API

### Q3：ECharts 如何与 Vue 3 配合？
- 封装为 Vue 组件，在 onMounted 中初始化
- 通过 watch 监听数据变化更新图表
- 在 onUnmounted 中销毁实例，防止内存泄漏

### Q4：Pinia 和 Vuex 的区别？
- Pinia 是 Vue 3 官方推荐的状态管理
- 更简洁的 API，更好的 TypeScript 支持
- 没有 mutations，直接在 actions 中修改 state
