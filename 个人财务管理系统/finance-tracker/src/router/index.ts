import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: '/dashboard', // 访问 / 时自动跳转到 /dashboard
      children: [ // 嵌套路由，子页面会渲染在父组件的 <router-view> 中
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { title: '仪表盘' } // 	路由元信息，存放页面标题等自定义数据，后续面包屑会用到
        },
        {
          path: 'bills',
          name: 'Bills',
          component: () => import('@/views/BillsView.vue'),
          meta: { title: '账单管理' }
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('@/views/CategoriesView.vue'),
          meta: { title: '分类管理' }
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/views/ReportsView.vue'),
          meta: { title: '统计报表' }
        },
        {
          path: 'budget',
          name: 'Budget',
          component: () => import('@/views/BudgetView.vue'),
          meta: { title: '预算管理' }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/SettingsView.vue'),
          meta: { title: '系统设置' }
        }
      ]
    }
  ]
})

// 
router.beforeEach((to, from, next) => { // beforeEach	路由守卫，每次跳转前都会执行
  const userStore = useUserStore()

  // 如果去登录页,true
  if (to.path === '/login') { // 要去的路由
    next()  //放行，继续跳转
    return
  }

  // 如果未登录，跳转到登录页
  if (!userStore.isLoggedIn()) {
    next('login') // 拦截，跳转到登录页
    return
  }

  // 已登陆，放行
  next()
})
export default router