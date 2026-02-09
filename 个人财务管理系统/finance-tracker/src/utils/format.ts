// 格式化金额，保留两位小数，加千分位
// 例如：1234567.8 → '1,234,567.80'
//\B          // 匹配非单词边界（确保不在开头或数字与小数点之间）
//(?=         // 正向肯定预查（只匹配位置，不消耗字符）
//  (\d{3})+  // 匹配连续的3位数字，至少一次
//  (?!\d)    // 后面不能跟着数字（确保匹配到整数部分的结尾）
//)
export function formatAmount(amount: number): string {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')  // 正则表达式，每 3 位数字加一个逗号（千分位）  .toFixed(2)将数字转换为字符串并且保留两位小数
}

// 格式化金额带符号
// 例如：收入显示 '+100.00'，支出显示 '-100.00'
export function formatAmountWithSign(amount: number, type: 'income' | 'expense'): string {
    const formatted = formatAmount(amount)
    return type === 'income' ? `+${formatted}` : `-${formatted}`
}

// 获取当前日期，格式 YYYY-MM-DD
export function getCurrentDate(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')  // padStart(2, '0')不足 2 位时前面补 0，比如 '5' 变成 '05'  date.getMonth() + 1 JS 的月份从 0 开始，所以要 +1
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// 获取当前月份，格式 YYYY-MM
export function getCurrentMonth(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

// 格式化日期显示，'2026-02-05' → '2月5日'
export function formatDateShort(dateStr: string): string {
    const [, month, day] = dateStr.split('-')
    return `${parseInt(month)}月${parseInt(day)}日`
}

// 生成唯一 ID（使用时间戳 + 随机数）
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)    // 时间戳转 36 进制字符串，更短且唯一
}

// 获取当前时间戳字符串，用于 createdAt 字段
export function getCurrentTimestamp(): string {
    return new Date().toISOString() // 返回标准格式时间字符串，如 '2026-02-05T10:30:00.000Z'
}