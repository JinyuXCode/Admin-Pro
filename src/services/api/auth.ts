import { http, type ApiResp } from '@/services/http/client'

export type Role = 'admin' | 'editor'

export interface LoginReq {
  username: string
  password: string
}

export interface LoginResp {
  token: string
}

export interface MeResp {
  id: number
  username: string
  role: Role
}

export interface MenuItem {
  name: string
  path: string
  component: string
  icon?: string
  children?: MenuItem[]
}

export async function apiLogin(payload: LoginReq) {
  return (await http.post<any, ApiResp<LoginResp>>('/login', payload)).data!
}

export async function apiMe() {
  return (await http.get<any, ApiResp<MeResp>>('/me')).data!
}

export async function apiMyMenus() {
  return (await http.get<any, ApiResp<MenuItem[]>>('/me/menus')).data!
}

export async function apiMyPerms() {
  return (await http.get<any, ApiResp<string[]>>('/me/perms')).data!
}
