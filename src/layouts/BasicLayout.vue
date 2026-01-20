<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { h, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const perm = usePermissionStore()

function toMenuOptions(menus: any[]): MenuOption[] {
  return menus.map((m) => {
    const hasChildren = !!m.children?.length

    const option: MenuOption = {
      key: m.path,
      label: hasChildren
        ? () => m.name // 分组：不可点击
        : () => h(RouterLink, { to: m.path }, { default: () => m.name }),
    }

    if (hasChildren) {
      option.children = toMenuOptions(m.children)
    }

    return option
  })
}

const menuOptions = computed(() => toMenuOptions(perm.menus))
const selectedKey = computed(() => route.path)
</script>

<template>
  <n-layout has-sider style="height: 100vh">
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220">
      <div style="height: 56px; display: flex; align-items: center; padding: 0 12px">
        <n-text strong>Admin Pro</n-text>
      </div>
      <n-menu :options="menuOptions" :value="selectedKey" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header
        bordered
        style="
          height: 56px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          justify-content: space-between;
        "
      >
        <n-text>{{ route.meta?.title || 'Admin Pro' }}</n-text>
        <n-button size="small" type="error" @click="auth.logout()">Logout</n-button>
      </n-layout-header>

      <n-layout-content bordered style="padding: 16px">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
