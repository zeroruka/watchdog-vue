import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      children: [
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/AccountView.vue'),
          children: [
            {
              path: '',
              name: 'profile',
              component: () => import('@/components/Profile.vue')
            },
            {
              path: 'misc',
              name: 'misc',
              component: () => import('@/components/Misc.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const store = useAuthStore()
  if (to.name === 'home' && store.isAuthenticated) {
    return { name: 'dashboard' }
  }

  if (!store.isAuthenticated && to.name !== 'home') {
    return { name: 'home' }
  }
})

export default router
