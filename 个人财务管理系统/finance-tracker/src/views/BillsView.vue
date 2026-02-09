<template>
    <div class="bills-container">
        <!-- 搜索筛选区域 -->
        <el-card class="filter-card">
            <el-form :inline="true" :model="filterForm">
                <el-form-item label="类型">
                    <el-select v-model="filterForm.type" placeholder="全部" clearable style="width: 120px">
                        <el-option label="收入" value="income" />
                        <el-option label="支出" value="expense" />
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="filterForm.categoryId" placeholder="全部" clearable style="width: 120px">
                        <el-option v-for="cat in allCategories" :key="cat.id" :label="cat.name" :value="cat.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker v-model="filterForm.dateRange" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD"
                        style="width: 240px" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- 操作栏 -->
        <div class="action-bar">
            <el-button type="primary" @click="openDialog('add')">新增账单</el-button>
        </div>

        <!-- 账单列表 -->
        <el-card>
            <el-table :data="paginatedBills" stripe style="width: 100%">
                <el-table-column prop="date" label="日期" width="120" />
                <el-table-column prop="type" label="类型" width="80">
                    <template #default="{ row }">
                        <el-tag :type="row.type === 'income' ? 'success' : 'danger'">
                            {{ row.type === 'income' ? '收入' : '支出' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="分类" width="100">
                    <template #default="{ row }">
                        {{ getCategoryName(row.categoryId) }}
                    </template>
                </el-table-column>
                <el-table-column label="金额" width="120">
                    <template #default="{ row }">
                        <span :class="row.type === 'income' ? 'income-text' : 'expense-text'">
                            {{ row.type === 'income' ? '+' : '-' }}{{ formatAmount(row.amount) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" show-overflow-tooltip />
                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="openDialog('edit', row)">编辑</el-button>
                        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50]" :total="filteredBills.length" layout="total, sizes, prev, pager, next" />
            </div>
        </el-card>

        <!-- 新增/编辑弹窗 -->
        <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '新增账单' : '编辑账单'" width="500px">
            <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio value="expense">支出</el-radio>
                        <el-radio value="income">收入</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类" prop="categoryId">
                    <el-select v-model="formData.categoryId" placeholder="请选择分类" style="width: 100%">
                        <el-option v-for="cat in currentTypeCategories" :key="cat.id" :label="cat.name"
                            :value="cat.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input-number v-model="formData.amount" :min="0.01" :precision="2" :step="10"
                        style="width: 100%" />
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker v-model="formData.date" type="date" placeholder="选择日期" value-format="YYYY-MM-DD"
                        style="width: 100%" />
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input v-model="formData.note" type="textarea" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>


<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useBillsStore } from '@/stores/bills'
import { useCategoriesStore } from '@/stores/categories'
import { formatAmount } from '@/utils/format'
import { getCurrentDate } from '@/utils/format'
import type { Bill, BillType } from '@/types'

const billsStore = useBillsStore()
const categoriesStore = useCategoriesStore()

// ==================== 筛选相关 ====================
const filterForm = reactive({
    type: '' as BillType | '',
    categoryId: '',
    dateRange: [] as string[]
})

// 所有分类（用于筛选下拉）
const allCategories = computed(() => categoriesStore.categories)

// 筛选后的账单
const filteredBills = ref<Bill[]>([])

// 执行筛选
const handleSearch = () => {
    filteredBills.value = billsStore.filterBills({
        type: filterForm.type || undefined,
        categoryId: filterForm.categoryId || undefined,
        startDate: filterForm.dateRange?.[0] || undefined,
        endDate: filterForm.dateRange?.[1] || undefined
    })
}

// 重置筛选
const handleReset = () => {
    filterForm.type = ''
    filterForm.categoryId = ''
    filterForm.dateRange = []
    handleSearch()
}

// 初始化加载数据
handleSearch()

// ==================== 分页相关 ====================
const currentPage = ref(1)
const pageSize = ref(10)

// 分页后的数据
const paginatedBills = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredBills.value.slice(start, end)
})

// ==================== 弹窗相关 ====================
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()
const editingId = ref('')

const formData = reactive({
    type: 'expense' as BillType,
    categoryId: '',
    amount: 0,
    date: getCurrentDate(),
    note: ''
})

// 表单验证规则
const formRules: FormRules = {
    type: [{ required: true, message: '请选择类型', trigger: 'change' }],
    categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
    amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
    date: [{ required: true, message: '请选择日期', trigger: 'change' }]
}

// 当前类型对应的分类
const currentTypeCategories = computed(() => {
    return categoriesStore.getCategoriesByType(formData.type)
})

// 切换类型时清空分类
watch(() => formData.type, () => {
    formData.categoryId = ''
})

// 打开弹窗
const openDialog = (type: 'add' | 'edit', row?: Bill) => {
    dialogType.value = type
    dialogVisible.value = true

    if (type === 'add') {
        // 新增：重置表单
        formData.type = 'expense'
        formData.categoryId = ''
        formData.amount = 0
        formData.date = getCurrentDate()
        formData.note = ''
        editingId.value = ''
    } else if (row) {
        // 编辑：填充数据
        formData.type = row.type
        formData.categoryId = row.categoryId
        formData.amount = row.amount
        formData.date = row.date
        formData.note = row.note
        editingId.value = row.id
    }
}

// 提交表单
const handleSubmit = async () => {
    if (!formRef.value) return
    const valid = await formRef.value.validate().catch(() => false)
    if (!valid) return

    if (dialogType.value === 'add') {
        billsStore.addBill({
            type: formData.type,
            categoryId: formData.categoryId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note
        })
        ElMessage.success('新增成功')
    } else {
        billsStore.updateBill(editingId.value, {
            type: formData.type,
            categoryId: formData.categoryId,
            amount: formData.amount,
            date: formData.date,
            note: formData.note
        })
        ElMessage.success('修改成功')
    }

    dialogVisible.value = false
    handleSearch() // 刷新列表
}

// ==================== 删除相关 ====================
const handleDelete = (row: Bill) => {
    ElMessageBox.confirm('确定要删除这条账单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        billsStore.deleteBill(row.id)
        ElMessage.success('删除成功')
        handleSearch()
    }).catch(() => { })
}

// ==================== 工具函数 ====================
const getCategoryName = (categoryId: string) => {
    const category = categoriesStore.getCategoryById(categoryId)
    return category?.name || '未知分类'
}
</script>

<style scoped>
.bills-container {
    padding: 0;
}

.filter-card {
    margin-bottom: 16px;
}

.action-bar {
    margin-bottom: 16px;
}

.pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
}

.income-text {
    color: #67c23a;
    font-weight: bold;
}

.expense-text {
    color: #f56c6c;
    font-weight: bold;
}
</style>