<!-- 统计报表页面要展示什么？
月份选择器：选择查看哪个月的数据
月度统计卡片：该月收入、支出、结余
柱状图：该月每日收支对比
分类排行：支出最多的分类 TOP 5 -->

<template>
    <div class="reports-container">
        <el-card class="filter-card">
            <!-- 月份选择器：选择查看哪个月的数据 -->
            <el-form :inline="true">
                <el-form-item label="选择月份">
                    <el-date-picker v-model="selectMonth" type="month" placeholder="选择月份" value-format="YYYY-MM">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 统计卡片 -->
        <el-row :gutter="16" class="stat-cards">
            <el-col :span="8">
                <el-card class="stat-card">
                    <div class="stat-title">月收入</div>
                    <div class="stat-value value">￥{{ formatAmount(monthlyIncome) }}</div>
                </el-card>
            </el-col>
            <el-col :span="8"><el-card class="stat-card">
                    <div class="stat-title">月支出</div>
                    <div class="stat-value expense">￥{{ formatAmount(monthlyExpense) }}</div>
                </el-card></el-col>
            <el-col :span="8">
                <el-card class="stat-card">
                    <div class="stat-title">月结余</div>
                    <div class="stat-value balance">￥{{ formatAmount(monthlyBalance) }}</div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 柱状图 -->
        <el-card class="chart-card">
            <template #header>每日支出</template>
            <div ref="barChartRef" class="chart-container"></div>
        </el-card>
        <!-- 分类排行 -->
        <el-card>
            <template #header>支出分类排行</template>
            <div>排行列表</div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useBillsStore } from '@/stores/bills'
import { formatAmount, getCurrentMonth } from '@/utils/format'

const billsStore = useBillsStore()

// 当前选中的月份
const selectMonth = ref(getCurrentMonth())

// 选中月份的账单
const monthlyBills = computed(() => {
    return billsStore.getBillsByMonth(selectMonth.value)
})

// 月收入
const monthlyIncome = computed(() => {
    return monthlyBills.value
        .filter(b => b.type === 'income')
        .reduce((sum, b) => sum + b.amount, 0)
})

// 月支出
const monthlyExpense = computed(() => {
    return monthlyBills.value
        .filter(b => b.type === 'expense')
        .reduce((sum, b) => sum + b.amount, 0)
})

// 月结余
const monthlyBalance = computed(() => {
    return monthlyIncome.value - monthlyExpense.value
})

// 柱状图相关
const barChartRef = ref<HTMLElement | null>(null)
let barChart: echarts.Echarts | null = null

// 获取该月每日数据
const getDailyData = () => {
    // 获取该月天数
    const [year, month] = selectMonth.value.split('-').map(Number)
    const daysInMonth = new Date(year, month, 0).getDate()  //new Date(year, month, 0).getDate()	获取该月有多少天（传入下月 0 号 = 上月最后一天）

    const days: string[] = []
    const incomeData: number[] = []
    const expenseData: number[] = []

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${selectMonth.value}-${String(day).padStart(2, '0')}`
        days.push(`${day}日`)
        // 计算该日收入
        const dayIncome = monthlyBills.value
            .filter(b => b.date === dateStr && b.type === 'income')
            .reduce((sum, b) => sum + b.amount, 0)

        // 计算该日支出
        const dayExpense = monthlyBills.value
            .filter(b => b.date === dateStr && b.type === 'expense')
            .reduce((sum, b) => sum + b.amount, 0)

        incomeData.push(dayIncome)
        expenseData.push(dayExpense)
    }
    return { days, incomeData, expenseData }
}

// 初始化
const updateBarChart = () => {
    if (!barChartRef.value) return
    if (!barChart) {
        barChart = echarts.init(barChartRef.value)
    }
    const { days, incomeData, expenseData } = getDailyData()

    const option = {
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['收入', '支出'],
            textStyle: { color: '#e0e0e0' }
        },
        xAxis: {
            type: 'category',
            data: days,
            axisLabel: { color: '#a0a0a0' },
            axisLine: { lineStyle: { color: '#a0a0a0' } }
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: '#a0a0a0' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } }
        },
        series: [
            { name: '收入', type: 'bar', data: incomeData, itemStyle: { color: '#52c41a' } },
            { name: '支出', type: 'bar', data: expenseData, itemStyle: { color: '#f56c6c' } }
        ]
    }
    barChart.setOption(option)
}

// 监听月份变化，更细图表   切换月份时自动更新图表
watch(selectMonth, () => {
    updateBarChart()
})

// 生命周期
onMounted(() => {
    updateBarChart()
})

onUnmounted(() => {
    barChart?.dispose()
})
</script>

<style scoped>
.filter-card {
    margin-bottom: 16px;
}

.stat-cards {
    margin-bottom: 16px;
}

.stat-card {
    text-align: center;
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

.stat-value.income {
    color: var(--success-color);
}

.stat-value.expense {
    color: var(--danger-color);
}

.stat-value.balance {
    color: var(--accent-color);
}

.chart-card {
    margin-bottom: 16px;
}

.chart-container {
    height: 300px;
    width: 100%;
}
</style>