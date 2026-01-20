import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'

export interface ApiResp<T> {
  code: number
  data?: T
  message?: string
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers = config.headers || {}
    config.headers.authorization = `Bearer ${auth.token}`
  }
  return config
})

http.interceptors.response.use(
  (resp) => {
    const res = resp.data as ApiResp<any>
    // 统一处理业务码
    if (typeof res?.code === 'number' && res.code !== 0) {
      return Promise.reject(res)
    }
    return res as unknown as AxiosResponse
  },
  (error) => Promise.reject(error),
)
