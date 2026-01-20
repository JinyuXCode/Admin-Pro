import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import { RouterView } from 'vue-router'
import type { MenuItem } from '@/services/api/auth'

/**
 * component 字段到真实组件的映射
 * 先用手动白名单映射
 */
const pageMap: Record<string, () => Promise<any>> = {
  dashboard: () => import('@/pages/dashboard/index.vue'),
  'system-users': () => import('@/pages/Users.vue'),
}

function menuToRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  for (const m of menus) {
    if (m.component === 'layout') {
      const children = m.children ? menuToRoutes(m.children) : []

      routes.push({
        path: m.path,
        name: m.path,
        component: RouterView,
        redirect: children.length ? children[0]?.path : undefined,
        meta: { title: m.name },
        children,
      })
      continue
    }

    const loader = pageMap[m.component]
    if (!loader) continue

    routes.push({
      path: m.path,
      name: m.path,
      component: loader,
      meta: { title: m.name },
    })
  }

  return routes
}

export function buildDynamicRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  const children = menuToRoutes(menus)
  return [
    {
      path: '/',
      name: 'root',
      component: BasicLayout,
      redirect: '/dashboard',
      children,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
    },
  ]
}
