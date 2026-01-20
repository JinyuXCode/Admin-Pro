import { defineStore } from 'pinia'
import { apiMyMenus, apiMyPerms, type MenuItem } from '@/services/api/auth'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menus: [] as MenuItem[],
    perms: [] as string[],
    isLoaded: false,
  }),
  actions: {
    async loadAll() {
      const [menus, perms] = await Promise.all([apiMyMenus(), apiMyPerms()])
      this.menus = menus
      this.perms = perms
      this.isLoaded = true
    },
    reset() {
      this.menus = []
      this.perms = []
      this.isLoaded = false
    },
  },
})
