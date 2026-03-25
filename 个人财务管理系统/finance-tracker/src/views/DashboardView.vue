<template>
    <div class="dashboard-container">
        <!-- 统计卡片区域 -->
        <!-- :gutter="16"	列之间的间距 16px -->
        <el-row :gutter="16" class="stat-cards">
            <el-col :xs="12" :sm="12" :md="6">
                <el-card class="stat-card income">
                    <div class="stat-title">本月收入</div>
                    <div class="stat-value">{{ formatAmount(monthlyIncome) }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6">
                <el-card class="stat-card expense">
                    <div class="stat-title">本月支出</div>
                    <div class="stat-value">{{ formatAmount(monthlyExpense) }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6">
                <el-card class="stat-card balance">
                    <div class="stat-title">本月结余</div>
                    <div class="stat-value">{{ formatAmount(monthlyBalance) }}</div>
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6">
                <el-card class="stat-card total">
                    <div class="stat-title">总资产</div>
                    <div class="stat-value">{{ formatAmount(totalAssets) }}</div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 图表区域（待实现） -->
        <el-row :gutter="16" class="chart-section">
            <el-col :xs="24" :sm="24" :md="14">
                <el-card>
                    <!-- template #header	el-card 的具名插槽，自定义卡片头部 -->
                    <template #header>收支趋势</template>
                    <div class="chart-placeholder">
                        <div ref="lineChartRef" class="chart-container"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10">
                <el-card>
                    <template #header>支出分类</template>
                    <div class="chart-placeholder">
                        <div class="chart-container" ref="pieChartRef"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 最近交易（待实现） -->
        <el-card class="recent-section">
            <template #header>最近交易</template>
            <el-table :data="recentBills" stripe>
                <el-table-column prop="date" label="日期" width="120" />
                <el-table-column label="类型" width="80">
                    <template #default="{ row }"><el-tag :type="row.type === 'income' ? 'success' : 'danger'"
                            size="small">{{ row.type === 'income' ? '收入' : '支出' }}</el-tag></template>
                </el-table-column>
                <el-table-column label="分类" width="100">
                    <template #default="{ row }">
                        <!-- 插槽语法，row 是当前行的数据 -->
                        {{ getCategoryName(row.categoryId) }}
                    </template>
                </el-table-column>
                <el-table-column label="金额" width="120">
                    <template #default="{ row }">
                        <!-- :style="{ color: ... }"	动态绑定样式 -->
                        <span :style="{ color: row.type === 'income' ? '#67c23a' : '#f56c6c' }">{{
                            row.type === 'income' ? '+' : '-' }}{{ formatAmount(row.amount) }}</span></template>
                </el-table-column>
                <el-table-column prop="note" label="备注" />
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useBillsStore } from '@/stores/bills'
import { formatAmount, getCurrentMonth } from '@/utils/format'
import { useCategoriesStore } from '@/stores/categories'
const categoriesStore = useCategoriesStore()


const billsStore = useBillsStore()

// 当前月份
const currentMonth = getCurrentMonth()

// 本月账单
const monthlyBills = computed(() => {
    return billsStore.getBillsByMonth(currentMonth)
})

// 折线图相关
const lineChartRef = ref<HTMLElement | null>(null)
let lineChart: echarts.ECharts | null = null

// 获取近6月的月份列表
const getRecentMonths = () => {
    const months: string[] = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        months.push(month)
    }
    return months
}

// 计算每月收入/支出数据
const getMonthlyData = () => {
    const months = getRecentMonths()
    const incomeData: number[] = []
    const expenseData: number[] = []

    months.forEach(month => {
        const bills = billsStore.getBillsByMonth(month)
        const income = bills.filter(b => b.type === 'income').reduce((s, b) => s + b.amount, 0)
        const expense = bills.filter(b => b.type === 'expense').reduce((s, b) => s + b.amount, 0)
        incomeData.push(income)
        expenseData.push(expense)
    })
    return { months, incomeData, expenseData }
}

// 初始化折线图
const initLineChart = () => {
    if (!lineChartRef.value) return
    lineChart = echarts.init(lineChartRef.value)
    const { months, incomeData, expenseData } = getMonthlyData()

    const option = {
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['收入', '支出'],
            textStyle: { color: '#e0e0e0' }
        },
        xAxis: {
            type: 'category',
            data: months.map(m => m.slice(5) + '月'),
            axisLabel: { color: '#a0a0a0' },
            axisLine: { lineStyle: { color: '#a0a0a0' } }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: '#a0a0a0' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
        },
        series: [
            { name: '收入', type: 'line', data: incomeData, itemStyle: { color: '#52c41a' } },
            { name: '支出', type: 'line', data: expenseData, itemStyle: { color: '#f56c6c' } }
        ]
    }
    lineChart.setOption(option)
}

// 饼图相关
const pieChartRef = ref<HTMLElement | null>(null)
let pieChart: echarts.ECharts | null = null

// 计算本月各分类支出
const getCategoryExpenseData = () => {
    // 筛选本月支出
    const expenseBills = monthlyBills.value.filter(b => b.type === 'expense')

    // 按分类汇总
    const categoryMap: Record<string, number> = {}  // Ts类型，键是字符串，值是数字的对象
    expenseBills.forEach(bill => {
        if (categoryMap[bill.categoryId]) {
            categoryMap[bill.categoryId] += bill.amount
        } else {
            categoryMap[bill.categoryId] = bill.amount
        }
    })

    // 转换成饼图需要的格式 [{ name: '餐饮', value: 500 }, ...]
    const data = Object.keys(categoryMap).map(categoryId => {   // 获取对象的所有键（分类 ID）
        const category = categoriesStore.getCategoryById(categoryId)
        return {
            name: category?.name || '未知',
            value: categoryMap[categoryId]
        }
    })

    return data
}

// 初始化饼图
const initPieChart = () => {
    if (!pieChartRef.value) return

    pieChart = echarts.init(pieChartRef.value)
    const data = getCategoryExpenseData()

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}:￥{c} ({d}%)'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: data,
            label: {
                formatter: '{b}\n{d}%',
                color: '#e0e0e0'
            }
        }]
    }
    pieChart.setOption(option)
}

//最近交易 取最近五条账单
const recentBills = computed(() => {
    return billsStore.sortedBills.slice(0, 5)
})

// 根据分类ID获取分类名称
const getCategoryName = (categoryId: string) => {
    const category = categoriesStore.getCategoryById(categoryId)
    return category?.name || '未知'
}
// 本月收入
const monthlyIncome = computed(() => {
    return monthlyBills.value
        .filter(b => b.type === 'income')
        .reduce((sum, b) => sum + b.amount, 0)
})

// 本月支出
const monthlyExpense = computed(() => {
    return monthlyBills.value
        .filter(b => b.type === 'expense')
        .reduce((sum, b) => sum + b.amount, 0)
})

// 本月结余
const monthlyBalance = computed(() => {
    return monthlyIncome.value - monthlyExpense.value
})

// 总资产
const totalAssets = computed(() => {
    return billsStore.totalIncome - billsStore.totalExpense
})

// 自适应
const handleResize = () => {
    lineChart?.resize()
    pieChart?.resize()
}
onMounted(() => {
    initLineChart()
    initPieChart()
    window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    lineChart?.dispose()
    pieChart?.dispose()
})
</script>

<style scoped>
.stat-cards {
    margin-bottom: 16px;
}

.stat-card {
    text-align: center;
    padding: 10px 0;
}

.stat-title {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
}

.stat-card.income .stat-value {
    color: var(--success-color);
}

.stat-card.expense .stat-value {
    color: var(--danger-color);
}

.stat-card.balance .stat-value {
    color: var(--accent-color);
}

.stat-card.total .stat-value {
    color: var(--warning-color);
}

.chart-section {
    margin-bottom: 16px;
}

.chart-container {
    height: 300px;
    width: 100%;
}

.recent-section {
    margin-bottom: 16px;
}
</style>