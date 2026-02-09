import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import { generateId, getCurrentTimestamp } from '@/utils/format'
import type { Bill, BillType } from '@/types'

export const useBillsStore = defineStore('bills', () => {
    // 账单列表
    const bills = ref<Bill[]>(getStorage('bills', []))

    // 按日期倒序排列的账单
    const sortedBills = computed(() => {
        return [...bills.value].sort((a, b) => {    // [...xxx]展开运算符，复制一份数据 复制是因为sort会修改原数组，但是我不想修改原数据
            return new Date(b.date).getTime() - new Date(a.date).getTime()
            // new Date('2026-02-05') — 把字符串转成日期对象
            // .getTime() — 转成时间戳（毫秒数）
            // b - a — 大的在前，即日期新的在前（倒序）
        })
    })

    // 新增账单
    const addBill = (bill: Omit<Bill, 'id' | 'createdAt'>) => {
        const newBill: Bill = {
            ...bill,
            id: generateId(),
            createdAt: getCurrentTimestamp()
        }
        bills.value.push(newBill)
        saveToStorage()
    }

    // 更新账单
    const updateBill = (id: string, data: Partial<Bill>) => {
        const index = bills.value.findIndex(b => b.id === id)   // findIndex — 找到这条账单在数组中的位置
        if (index !== -1) {
            bills.value[index] = { ...bills.value[index], ...data } // { ...原数据, ...新数据 } — 合并，新数据覆盖旧数据
            saveToStorage()
        }
    }

    // 删除账单
    const deleteBill = (id: string) => {
        const index = bills.value.findIndex(b => b.id === id)
        if (index !== -1) {
            bills.value.splice(index, 1)
            saveToStorage()
        }
    }

    // 根据条件筛选账单
    const filterBills = (options: {
        type?: BillType
        categoryId?: string
        startDate?: string
        endDate?: string
    }) => {
        return sortedBills.value.filter(bill => {
            if (options.type && bill.type !== options.type) return false
            if (options.categoryId && bill.categoryId !== options.categoryId) return false
            if (options.startDate && bill.date < options.startDate) return false
            if (options.endDate && bill.date > options.endDate) return false
            return true
        })
    }

    // 获取指定月份的账单
    const getBillsByMonth = (month: string) => {
        return sortedBills.value.filter(bill => bill.date.startsWith(month))
    }

    // 计算总收入
    const totalIncome = computed(() => {
        return bills.value
            .filter(b => b.type === 'income')
            .reduce((sum, b) => sum + b.amount, 0)
    })

    // 计算总支出
    const totalExpense = computed(() => {
        return bills.value
            .filter(b => b.type === 'expense')
            .reduce((sum, b) => sum + b.amount, 0)
    })

    // 保存到 localStorage
    const saveToStorage = () => {
        setStorage('bills', bills.value)
    }

    return {
        bills,
        sortedBills,
        addBill,
        updateBill,
        deleteBill,
        filterBills,
        getBillsByMonth,
        totalIncome,
        totalExpense
    }
})