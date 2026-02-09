// 存储数据的 key 前缀，避免和其他网站的数据冲突
const STORAGE_PREFIX = 'finance_tracker_'   //统一前缀，防止和其他网站数据混淆，也方便批量清除

// 保存数据到 localStorage
export function setStorage<T>(key: string, value: T): void {    // T:TypeScript 泛型，表示"类型由调用者决定"
    const fullKey = STORAGE_PREFIX + key
    const data = JSON.stringify(value)  // 把对象/数组转成字符串，因为 localStorage 只能存字符串
    localStorage.setItem(fullKey, data)
}

// 从 localStorage 读取数据
export function getStorage<T>(key: string, defaultValue: T): T {
    const fullKey = STORAGE_PREFIX + key
    const data = localStorage.getItem(fullKey)
    if (data === null) {
        return defaultValue
    }
    try {
        return JSON.parse(data) as T    // 把字符串转回对象/数组
    } catch {
        return defaultValue
    }
}

// 删除指定数据
export function removeStorage(key: string): void {
    const fullKey = STORAGE_PREFIX + key
    localStorage.removeItem(fullKey)
}

// 清空所有本项目的数据
export function clearStorage(): void {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(STORAGE_PREFIX)) {    // startsWith(): 检查键名是否以项目前缀开头
            keysToRemove.push(key)
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
}