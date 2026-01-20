import type { MockMethod } from 'vite-plugin-mock'

// TOKEN
const adminToken = 'mock-admin-token'
const editorToken = 'mock-editor-token'

// 动态菜单
const menusAdmin = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: 'dashboard',
    icon: 'home',
  },
  {
    name: 'System',
    path: '/system',
    component: 'layout',
    icon: 'settings',
    children: [
      {
        name: 'Users',
        path: '/system/users',
        component: 'system-users',
        icon: 'people',
      },
    ],
  },
]

const menusEditor = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: 'dashboard',
    icon: 'home',
  },
]

// 按钮权限
const permsAdmin: string[] = ['user:add', 'user:edit', 'user:delete']
const permsEditor: string[] = ['user:edit']

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: any) => {
      const { username } = body || {}
      //   admin / editor
      if (username === 'admin') {
        return { code: 0, data: { token: adminToken } }
      }
      if (username === 'editor') {
        return { code: 0, data: { token: editorToken } }
      }
      return { code: 1001, message: 'Invalid username (use admin/editor)' }
    },
  },
  {
    url: '/api/me',
    method: 'get',
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')
      if (token === adminToken) {
        return { code: 0, data: { id: 1, username: 'admin', role: 'admin' } }
      }
      if (token === editorToken) {
        return { code: 0, data: { id: 2, username: 'editor', role: 'editor' } }
      }
      return { code: 401, message: 'Unauthorized' }
    },
  },
  {
    url: '/api/me/menus',
    method: 'get',
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')
      if (token === adminToken) return { code: 0, data: menusAdmin }
      if (token === editorToken) return { code: 0, data: menusEditor }
      return { code: 401, message: 'Unauthorized' }
    },
  },
  {
    url: '/api/me/perms',
    method: 'get',
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')
      if (token === adminToken) return { code: 0, data: permsAdmin }
      if (token === editorToken) return { code: 0, data: permsEditor }
      return { code: 401, message: 'Unauthorized' }
    },
  },
] as MockMethod[]
