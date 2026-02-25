<template>
    <div class="categories-container">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="支出分类" name="expense" />
            <el-tab-pane label="收入分类" name="income" />
        </el-tabs>
    </div>

    <!-- 操作栏 -->
    <div class="action-bar"><el-button type="primary" @click="openAddDialog">新增分类</el-button></div>
    <!-- 分类列表 -->
    <div class="category-list">
        <div class="categoty-card" v-for="category in currentCategories" :key="category.id"><span
                class="category-name">{{ category.name }}</span>
            <div class="category-actions"><el-button type="primary" link size="small"
                    @click="openEditDialog(category)">编辑</el-button><el-button v-if="!category.isDefault" type="danger"
                    link size="small" @click="handleDelete(category.id)">删除</el-button><el-tag v-else size="small"
                    type="info">默认</el-tag>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '新增分类' : '编辑分类'" width="400px">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="formData.name" placeholder="请输入分类名称" />
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
import { ref, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCategoriesStore } from '@/stores/categories';

const categoriesStore = useCategoriesStore()

// 当前激活的Tab
const activeTab = ref<'expense' | 'income'>('expense')

// 根据当前Tab获取对应类型的分类
const currentCategories = computed(() => {
    return categoriesStore.getCategoriesByType(activeTab.value)
})

//弹窗相关
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add') // 新增：区分新增/编辑
const editingId = ref('') // 记录正在编辑的分类ID

const formData = reactive({
    name: ''
})

// 打开新增弹窗
const openAddDialog = () => {
    dialogType.value = 'add'
    formData.name = ''
    editingId.value = ''
    dialogVisible.value = true
}

// 打开编辑弹窗
const openEditDialog = (category: { id: string; name: string }) => {
    dialogType.value = 'edit'
    formData.name = category.name
    editingId.value = category.id
    dialogVisible.value = true
}

// 提交表单
const handleSubmit = () => {
    if (!formData.name.trim()) {
        ElMessage.warning('请输入分类名称')
        return
    }

    if (dialogType.value === 'add') {
        // 新增
        categoriesStore.addCategory({
            name: formData.name,
            type: activeTab.value,
            icon: 'More'
        })
        ElMessage.success('添加成功')
    } else {
        // 编辑
        categoriesStore.updateCategory(editingId.value, {
            name: formData.name
        })
        ElMessage.success('修改成功')
    }

    dialogVisible.value = false
}

// 删除分类
const handleDelete = (id: string) => {
    ElMessageBox.confirm('确定要删除这个分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        categoriesStore.deleteCategory(id)
        ElMessage.success('删除成功')
    }).catch(() => { })
}
</script>

<style scoped>
.action-bar {
    margin: 16px 0;
}

.category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.category-card {
    width: 200px;
    padding: 16px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.category-name {
    font-size: 16px;
    font-weight: 500;
}

.category-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}
</style>