import { defineStore } from 'pinia'
import { apiLogin, apiMe, type MeResp } from '@/services/api/auth'

const TOKEN_KEY = 'adminpro_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || '',
    me: null as MeResp | null,
  }),
  getters: {
    isAuthed: (s) => !!s.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    clearAuth() {
      this.token = ''
      this.me = null
      localStorage.removeItem(TOKEN_KEY)
    },
    async login(username: string, password: string) {
      const res = await apiLogin({ username, password })
      this.setToken(res.token)
      this.me = await apiMe()
    },
    async fetchMe() {
      this.me = await apiMe()
      return this.me
    },
  },
})
