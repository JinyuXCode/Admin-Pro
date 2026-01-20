import type { Router } from 'vue-router'

/**
 * addRoute 动态注入的路由需要手动 removeRoute 回收。
 * 规则： 只回收“动态根路由”的 children 以及 not-found
 */
const DYNAMIC_ROUTE_NAMES = new Set<string>(['root', 'not-found'])

export function resetDynamicRoutes(router: Router) {
  // removeRoute need route.name
  for (const name of DYNAMIC_ROUTE_NAMES) {
    if (router.hasRoute(name)) router.removeRoute(name)
  }
}
