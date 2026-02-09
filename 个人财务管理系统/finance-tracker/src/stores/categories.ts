import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import type { Category, BillType } from '@/types'
import { generateId } from '@/utils/format'

// 默认分类数据 预设的默认分类，首次使用时加载
const defaultCategories: Category[] = [
    // 支出分类
    { id: '1', name: '餐饮', type: 'expense', icon: 'Bowl', isDefault: true },
    { id: '2', name: '交通', type: 'expense', icon: 'Van', isDefault: true },
    { id: '3', name: '购物', type: 'expense', icon: 'ShoppingCart', isDefault: true },
    { id: '4', name: '娱乐', type: 'expense', icon: 'Film', isDefault: true },
    { id: '5', name: '居住', type: 'expense', icon: 'House', isDefault: true },
    { id: '6', name: '医疗', type: 'expense', icon: 'FirstAidKit', isDefault: true },
    { id: '7', name: '教育', type: 'expense', icon: 'Reading', isDefault: true },
    { id: '8', name: '其他支出', type: 'expense', icon: 'More', isDefault: true },
    // 收入分类
    { id: '9', name: '工资', type: 'income', icon: 'Money', isDefault: true },
    { id: '10', name: '奖金', type: 'income', icon: 'Present', isDefault: true },
    { id: '11', name: '理财', type: 'income', icon: 'TrendCharts', isDefault: true },
    { id: '12', name: '其他收入', type: 'income', icon: 'More', isDefault: true },
]

export const useCategoriesStore = defineStore('categories', () => {
    // 分类列表
    const categories = ref<Category[]>(
        getStorage('categories', defaultCategories)
    )

    // 获取指定类型的分类
    const getCategoriesByType = (type: BillType) => {
        return categories.value.filter(c => c.type === type)    // 数组筛选，返回符合条件的新数组
    }

    // 根据 ID 获取分类
    const getCategoryById = (id: string) => {
        return categories.value.find(c => c.id === id)
    }

    // 新增分类
    const addCategory = (category: Omit<Category, 'id' | 'isDefault'>) => { // TypeScript 工具类型，表示 Category 类型但排除 id 和 isDefault 字段
        const newCategory: Category = {
            ...category,
            id: generateId(),
            isDefault: false
        }
        categories.value.push(newCategory)
        saveToStorage()
    }

    // 更新分类
    const updateCategory = (id: string, data: Partial<Category>) => {   // 表示 Category 的部分字段（都变成可选）
        const index = categories.value.findIndex(c => c.id === id)  // 查找第一个符合条件的元素     findIndex 查找元素索引，找不到返回 -1
        if (index !== -1) {
            categories.value[index] = { ...categories.value[index], ...data }
            saveToStorage()
        }
    }

    // 删除分类
    const deleteCategory = (id: string) => {
        const index = categories.value.findIndex(c => c.id === id)
        if (index !== -1 && !categories.value[index].isDefault) {
            categories.value.splice(index, 1)   // 从数组中删除 1 个元素
            saveToStorage()
        }
    }

    // 保存到 localStorage
    const saveToStorage = () => {
        setStorage('categories', categories.value)
    }

    return {
        categories,
        getCategoriesByType,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory
    }
})