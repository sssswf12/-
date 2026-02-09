import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
    // 登录 token
    const token = ref<string>(getStorage('token', ''))

    // 用户信息
    const userInfo = ref<UserInfo>(getStorage('userInfo', {
        username: '',
        nickname: '',
        avatar: ''
    }))

    // 是否已登录
    const isLoggedIn = () => token.value !== ''

    // 登录
    const login = (username: string, password: string): boolean => {
        // 模拟登录验证（实际项目会调用后端 API）
        if (username === 'admin' && password === '123456') {
            token.value = 'mock_token_' + Date.now()
            userInfo.value = {
                username: username,
                nickname: '管理员',
                avatar: ''
            }
            // 保存到 localStorage
            setStorage('token', token.value)
            setStorage('userInfo', userInfo.value)
            return true
        }
        return false
    }

    // 退出登录
    const logout = () => {
        token.value = ''
        userInfo.value = { username: '', nickname: '', avatar: '' }
        removeStorage('token')
        removeStorage('userInfo')
    }

    return {
        token,
        userInfo,
        isLoggedIn,
        login,
        logout
    }
})