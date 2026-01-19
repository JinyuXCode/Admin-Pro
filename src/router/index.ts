import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/pages/Home.vue') },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/pages/Users.vue'),
        },
      ],
    },
  ],
})
