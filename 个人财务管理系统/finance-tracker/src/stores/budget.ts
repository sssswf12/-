import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import { generateId } from '@/utils/format'
import type { Budget, BudgetCategory } from '@/types'

export const useBudgetStore = defineStore('budget', () => {
    // 预算列表（每月一条记录）
    const budgets = ref<Budget[]>(getStorage('budgets', []))

    // 获取指定月份的预算
    const getBudgetByMonth = (month: string): Budget | undefined => {
        return budgets.value.find(b => b.month === month)
    }

    // 设置某月预算（新增或更新）
    const setBudget = (month: string, totalAmount: number, categories: BudgetCategory[]) => {
        const index = budgets.value.findIndex(b => b.month === month)

        if (index !== -1) {
            // 新增该月预算
            budgets.value[index].totalAmount = totalAmount
            budgets.value[index].categories = categories
        } else {
            budgets.value.push({
                id: generateId(),
                month,
                totalAmount,
                categories
            })
        }
        saveToStorage()
    }
    const saveToStorage = () => {
        setStorage('budgets', budgets.value)
    }
    return {
        budgets,
        getBudgetByMonth,
        setBudget
    }
})