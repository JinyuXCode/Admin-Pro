import type { RouteRecordRaw } from 'vue-router'

export const WHITE_LIST: string[] = ['/login']

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
]
