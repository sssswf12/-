<template>
    <div class="budget-container">
        <!-- 月份选择 -->
        <el-card class="filter-card">
            <el-form :inline="true">
                <el-form-item label="选择月份">
                    <el-date-picker v-model="selectedMonth" type="month" plceholder="选择月份" value-format="YYYY-MM" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="openBudgetDialog">设置预算</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 总预算概览 -->
        <el-card class="overview-card">
            <div class="overview-header">
                <span>总预算：￥{{ formatAmount(totalBudget) }}</span>
                <span>已花：￥{{ formatAmount(totalSpent) }}</span>
                <span>剩余：￥{{ formatAmount(totalBudget - totalSpent) }}</span>
            </div>
            <el-progress :percentage="totalPercentage" :color="totalPercentage > 100 ? '#f56c6c' : '#67c23a'"
                :stroke-width="20" />
        </el-card>
        <el-card>
            <template #header>分类预算明细</template>
            <div v-if="categoryBudgetList.length === 0" style="text-align: center; color: #999; padding: 40px 0;">
                暂未设置分类预算
            </div>
            <div v-else class="budget-list">
                <div v-for="item in categoryBudgetList" :key="item.categoryId" class="budget-item">
                    <div class="budget-info">
                        <span class="budget-name">{{ item.name }}</span>
                        <span class="budget-amount">
                            ¥{{ formatAmount(item.spent) }} / ¥{{ formatAmount(item.budget) }}
                        </span>
                        <el-tag v-if="item.percentage > 100" type="danger" size="small">超支</el-tag>
                    </div>
                    <el-progress :percentage="Math.min(item.percentage, 100)"
                        :color="item.percentage > 80 ? (item.percentage > 100 ? '#f56c6c' : '#e6a23c') : '#67c23a'"
                        :stroke-width="12" />
                </div>
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible" title="设置预算" width="500px">
            <el-form label-width="100px">
                <el-form-item label="总预算金额">
                    <el-input-number v-model="budgetForm.totalAmount" :min="0" :step="50" style="width: 100%;" />
                </el-form-item>
                <el-divider>分类预算（可选）</el-divider>
                <el-form-item v-for="item in budgetForm.categories" :key="item.categoryId" :label="item.name">
                    <el-input-number v-model="item.amount" :min="0" :step="50" style="width:100%"></el-input-number>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSaveBudget">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useBudgetStore } from '@/stores/budget'
import { useBillsStore } from '@/stores/bills'
import { useCategoriesStore } from '@/stores/categories'
import { formatAmount, getCurrentMonth } from '@/utils/format'
import { ElMessage } from 'element-plus'

const budgetStore = useBudgetStore()
const billsStore = useBillsStore()
const categoriesStore = useCategoriesStore()

const selectedMonth = ref(getCurrentMonth())

// 弹窗控制
const dialogVisible = ref(false)
// 当前月份的预算
const currentBudget = computed(() => {
    return budgetStore.getBudgetByMonth(selectedMonth.value)
})

// 总预算金额
const totalBudget = computed(() => {
    return currentBudget.value?.totalAmount || 0
})

// 本月总支出
const totalSpent = computed(() => {
    return billsStore.getBillsByMonth(selectedMonth.value)
        .filter(b => b.type === 'expense')
        .reduce((sum, b) => sum + b.amount, 0)
})

// 总进度百分比
const totalPercentage = computed(() => {
    if (totalBudget.value === 0) return 0
    return Math.round((totalSpent.value / totalBudget.value) * 100)
})

// 分类预算明细
const categoryBudgetList = computed(() => {
    if (!currentBudget.value) return []

    // 本月所有支出账单
    const monthlyExpenseBills = billsStore.getBillsByMonth(selectedMonth.value)
        .filter(b => b.type === 'expense')

    return currentBudget.value.categories.map(bc => {
        const category = categoriesStore.getCategoryById(bc.categoryId)

        // 该分类实际花了多少
        const spent = monthlyExpenseBills
            .filter(b => b.categoryId === bc.categoryId)
            .reduce((sum, b) => sum + b.amount, 0)

        const percentage = bc.amount > 0 ? Math.round((spent / bc.amount) * 100) : 0

        return {
            categoryId: bc.categoryId,
            name: category?.name || '未知',
            budget: bc.amount,
            spent,
            percentage
        }
    })
})

// 获取所有支出分类
const expenseCategories = computed(() => {
    return categoriesStore.getCategoriesByType('expense')
})
// 表单根据
const budgetForm = reactive({
    totalAmount: 0,
    categories: [] as { categoryId: string; name: string; amount: number }[]
})

// 打开设置预算弹窗
const openBudgetDialog = () => {
    // 先看这个月有没有已设置的预算
    const existing = currentBudget.value

    if (existing) {
        // 存在，回填数据
        budgetForm.totalAmount = existing.totalAmount
        budgetForm.categories = expenseCategories.value.map(cat => {
            const found = existing.categories.find(c => c.categoryId === cat.id)
            return {
                categoryId: cat.id,
                name: cat.name,
                amount: found?.amount || 0
            }
        })
    } else {
        // 不存在，初始化为0
        budgetForm.totalAmount = 0
        budgetForm.categories = expenseCategories.value.map(cat => ({
            categoryId: cat.id,
            name: cat.name,
            amount: 0
        }))
    }
    dialogVisible.value = true
}

// 保存预算
const handleSaveBudget = () => {
    if (budgetForm.totalAmount <= 0) {
        ElMessage.warning('请输入总预算金额')
        return
    }

    // 转换为store需要的格式
    const categories = budgetForm.categories
        .filter(c => c.amount > 0)
        .map(c => ({
            categoryId: c.categoryId,
            amount: c.amount
        }))
    budgetStore.setBudget(selectedMonth.value, budgetForm.totalAmount, categories)
    ElMessage.success('预算设置成功')
    dialogVisible.value = false
}
</script>

<style scoped>
.filter-card {
    margin-bottom: 16px;
}

.overview-card {
    margin-bottom: 16px;
}

.overview-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
}

.budget-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.budget-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.budget-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.budget-name {
    font-size: 14px;
    width: 80px;
}

.budget-amount {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #666;
}
</style>