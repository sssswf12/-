<template>
    <el-container class="layout-container">
        <!-- 左侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
            <div class="logo">
                <h2 v-show="!isCollapse">Finance Tracker</h2>
                <h2 v-show="isCollapse">FT</h2>
            </div>
            <el-menu :default-active="activeMenu" :collapse="isCollapse" router background-color="#304156"
                text-color="#bfcbd9" active-text-color="#409eff">
                <el-menu-item index="/dashboard">
                    <el-icon>
                        <DataLine />
                    </el-icon>
                    <span>仪表盘</span>
                </el-menu-item>
                <el-menu-item index="/bills">
                    <el-icon>
                        <List />
                    </el-icon>
                    <span>账单管理</span>
                </el-menu-item>
                <el-menu-item index="/categories">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>分类管理</span>
                </el-menu-item>
                <el-menu-item index="/reports">
                    <el-icon>
                        <PieChart />
                    </el-icon>
                    <span>统计报表</span>
                </el-menu-item>
                <el-menu-item index="/budget">
                    <el-icon>
                        <Wallet />
                    </el-icon>
                    <span>预算管理</span>
                </el-menu-item>
                <el-menu-item index="/settings">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>系统设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <!-- 右侧区域 -->
        <el-container>
            <!-- 顶部栏 -->
            <el-header class="layout-header">
                <div class="header-left">
                    <!-- 折叠按钮 -->
                    <el-icon class="collapse-btn" @click="toggleCollapse">
                        <Expand v-if="isCollapse" />
                        <Fold v-else />
                    </el-icon>
                    <!-- 面包屑 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="header-right">
                    <el-dropdown>
                        <span class="user-info">
                            <el-avatar :size="32" src="" />
                            <span class="username">管理员</span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>

            <!-- 主内容区 -->
            <el-main class="layout-main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
    DataLine,
    List,
    Grid,
    PieChart,
    Wallet,
    Setting,
    Expand,
    Fold
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 侧边栏折叠状态
const isCollapse = ref(false)

// 切换折叠
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
}

// 当前菜单高亮
const activeMenu = computed(() => route.path)

// 当前页面标题（从路由 meta 中获取）
const currentTitle = computed(() => (route.meta.title as string) || '')

// 退出登录
const handleLogout = () => {
    router.push('/login')
}
</script>

<style scoped>
.layout-container {
    height: 100vh;
}

.layout-aside {
    background-color: #304156;
    overflow-y: auto;
    transition: width 0.3s;
}

.logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.logo h2 {
    font-size: 18px;
    margin: 0;
    white-space: nowrap;
}

.layout-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.collapse-btn {
    font-size: 20px;
    cursor: pointer;
    color: #333;
}

.collapse-btn:hover {
    color: #409eff;
}

.header-right {
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.username {
    font-size: 14px;
    color: #333;
}

.layout-main {
    background-color: #f0f2f5;
}

/* 菜单折叠时隐藏文字 */
.el-menu--collapse .el-menu-item span {
    display: none;
}
</style>