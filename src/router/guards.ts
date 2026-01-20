import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'

import { WHITE_LIST } from './routes.static'
import { buildDynamicRoutes } from './dynamic'

export function setupGuards(router: Router) {
  router.beforeEach(async (to) => {
    const auth = useAuthStore()
    const perm = usePermissionStore()

    // * 已登录并加载了权限
    if (auth.isAuthed && to.path === '/login') {
      return { path: '/dashboard' }
    }

    // * 未登录
    if (!auth.isAuthed) {
      if (WHITE_LIST.includes(to.path)) return true
      return { path: '/login', query: { redirect: to.fullPath } }
    }

    // ! 已经登陆但是未加载权限：加载用户信息 + 菜单权限，注入动态路由
    if (!perm.isLoaded) {
      try {
        if (!auth.me) await auth.fetchMe()
        await perm.loadAll()

        const dynamicRoutes = buildDynamicRoutes(perm.menus)
        dynamicRoutes.forEach((r) => router.addRoute(r))

        // 关键：确保 addRoute 后重新进入目标路由
        return { ...to, replace: true }
      } catch {
        auth.clearAuth()
        perm.reset()
        return { path: '/login', query: { redirect: to.fullPath } }
      }
    }

    return true
  })
}
