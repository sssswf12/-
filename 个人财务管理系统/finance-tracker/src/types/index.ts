// ==================== 账单相关 ====================

// 账单类型：只能是 'income'(收入) 或 'expense'(支出)，不能是别的值
export type BillType = 'income' | 'expense'

// 一条账单记录
export interface Bill {
    id: string            // 唯一标识，用来区分每一条账单
    type: BillType        // 类型：收入还是支出
    amount: number        // 金额，比如 100、59.9
    categoryId: string    // 分类的 id，用来关联到分类（比如"餐饮"、"工资"）
    date: string          // 日期，格式 'YYYY-MM-DD'，比如 '2026-02-04'
    note: string          // 备注，比如 '和朋友聚餐'
    createdAt: string     // 创建时间，记录这条账单是什么时候录入的
}

// ==================== 分类相关 ====================

// 一个分类
export interface Category {
    id: string            // 唯一标识
    name: string          // 分类名称，比如 '餐饮'、'工资'
    type: BillType        // 这个分类属于收入还是支出
    icon: string          // 图标名称，用来在页面上显示图标
    isDefault: boolean    // 是否是默认分类，默认分类不允许删除
}

// ==================== 预算相关 ====================

// 某个分类的预算
export interface BudgetCategory {
    categoryId: string    // 对应哪个分类
    amount: number        // 这个分类的预算金额
}

// 一个月的预算
export interface Budget {
    id: string            // 唯一标识
    month: string         // 月份，格式 'YYYY-MM'，比如 '2026-02'
    totalAmount: number   // 这个月的总预算
    categories: BudgetCategory[]  // 各分类的预算明细，是一个数组
}

// ==================== 用户相关 ====================

// 用户信息
export interface UserInfo {
    username: string      // 用户名，用于登录
    nickname: string      // 昵称，显示在页面上
    avatar: string        // 头像图片地址
}