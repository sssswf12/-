<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">Finance Tracker</h2>
            <p class="login-subtitle">个人财务管理系统</p>
            <!-- 
            :model	绑定表单数据
            :rules	绑定验证规则
            prop="username"	告诉表单项对应哪个字段，用于验证
            v-model	双向绑定输入框和数据
            @keyup.enter	按回车键触发登录
            :loading	按钮加载状态，防止重复点击
            -->
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="0" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" prefix-icon="User" size="large" />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
                        size="large" show-password @keyup.enter="handleLogin" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin">
                        登 录
                    </el-button>
                </el-form-item>
            </el-form>

            <p class="login-tip">提示：用户名 admin，密码 123456</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 表单引用，用于触发验证
const formRef = ref<FormInstance>() // 表单实例引用，用于调用 validate() 验证方法

// 表单数据
const formData = reactive({
    username: '',
    password: ''
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const rules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
        //  required必填           message提示文字                  trigger触发时机：失去焦点
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少6位', trigger: 'blur' }
        // 最小长度
    ]
}

// 登录处理
const handleLogin = async () => {
    // 先验证表单
    if (!formRef.value) return
    const valid = await formRef.value.validate().catch(() => false) //  formRef.value.validate()	触发表单验证，返回 Promise
    if (!valid) return

    loading.value = true

    // 模拟网络延迟
    setTimeout(() => {
        const success = userStore.login(formData.username, formData.password)
        loading.value = false

        if (success) {
            ElMessage.success('登录成功')
            router.push('/dashboard')
        } else {
            ElMessage.error('用户名或密码错误')
        }
    }, 500)
}
</script>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 不需要单独设背景，body 的渐变背景已经有了 */
}

.login-box {
    width: 400px;
    padding: 40px;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
}

.login-title {
    text-align: center;
    margin: 0 0 8px 0;
    color: var(--text-white);
    font-size: 28px;
}

.login-subtitle {
    text-align: center;
    margin: 0 0 30px 0;
    color: var(--text-secondary);
    font-size: 14px;
}

.login-form {
    margin-top: 20px;
}

.login-btn {
    width: 100%;
    background-color: var(--accent-color) !important;
    border-color: var(--accent-color) !important;
}

.login-btn:hover {
    background-color: var(--accent-hover) !important;
    border-color: var(--accent-hover) !important;
}

.login-tip {
    text-align: center;
    margin-top: 20px;
    color: var(--text-secondary);
    font-size: 12px;
}
</style>