import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes } from './routes.static'
import { setupGuards } from './guards'

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
})

setupGuards(router)
