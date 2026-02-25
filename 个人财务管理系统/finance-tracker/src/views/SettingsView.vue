<template>
    <div class="setting-container">
        <!-- 个人信息 -->
        <el-card>
            <template #header>
                个人信息
            </template>
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input :value="userStore.userInfo.username" disabled />
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="nickname" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSaveNickname">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 16px;">
            <template #header>数据管理</template>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">将所有数据导出为JSON文件，可用于备份</p>
            <el-button type="success" @click="handleExport">导出数据</el-button>
        </el-card>
        <el-card style="margin-top: 16px;">
            <template #header>
                <span style="color:#f56c6c">危险操作</span>
            </template>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">清空后所有账单、分类、预算数据将不可恢复</p>
            <el-button type="danger" @click="handleClearData">清空所有数据</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { setStorage } from '@/utils/storage'

const userStore = useUserStore()

// 昵称
const nickname = ref(userStore.userInfo.nickname)

// 保存昵称
const handleSaveNickname = () => {
    if (!nickname.value.trim()) {
        ElMessage.warning('昵称不能空')
        return
    }
    userStore.userInfo.nickname = nickname.value
    setStorage('userInfo', userStore.userInfo)
    ElMessage.success('昵称修改成功')
}

// 导出数据
const handleExport = () => {
    const data = {
        userInfo: userStore.userInfo,
        bills: localStorage.getItem('finance_tracker_bills'),
        categories: localStorage.getItem('finance_tracker_categories'),
        budgets: localStorage.getItem('finance_tracker_budgets')
    }

    // 创建Blob对象，生成下载链接 JSON.stringify(data, null, 2)第三个参数2表示缩进两个空格让导出的JSON文件可读性更好
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })    // Blob浏览器原生API，用于创建二进制文件对象。这里把JSON字符串包装成一个文件
    const url = URL.createObjectURL(blob)   // 给这个Blob生成一个临时的下载连接

    // 创建隐藏的<a>标签模拟点击下载
    const link = document.createElement('a')    // 创建一个隐藏的<a>标签，设置herf和download属性后调用.click触发浏览器下载，前端纯客户端下载文件的标准方式
    link.href = url
    link.download = `finance_backup_${Date.now()}.json`
    link.click()

    // 释放内存
    URL.revokeObjectURL(url)    // URL.revokeObjectURL(url) 下载完毕后释放这个临时链接，避免内存泄漏
    ElMessage.success('导出成功')
}

// 清空所有数据
const handleClearData = () => {
    ElMessageBox.confirm(
        '确定要清空所有数据吗？此操作不可恢复！',
        '警告',
        {
            confirmButtonText: '确定清空',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        localStorage.removeItem('finance_tracker_bills')
        localStorage.removeItem('finance_tracker_categoties')
        localStorage.removeItem('finance_tracker_budgets')
        ElMessage.success('数据已清空')
    }).catch(() => {
        // 取消，什么都不做
    })
}
</script>