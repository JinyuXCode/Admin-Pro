<template>
  <n-layout has-sider style="height: 100vh">
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220">
      <div style="height: 56px; display: flex; align-items: center; padding: 0 12px">
        <n-text strong> Admin Pro </n-text>
      </div>
      <n-menu :options="menuOptions" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header
        bordered
        style="height: 56px; display: flex; align-items: center; padding: 0 16px"
      >
        <n-space align="center" justify="space-between" style="width: 100%">
          <n-text>Dashboard</n-text>
          <n-space>
            <n-button size="small"> Profile </n-button>
            <n-button size="small" type="error"> Logout </n-button>
          </n-space>
        </n-space>
      </n-layout-header>

      <n-layout-content bordered style="padding: 16px">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { HomeOutline, PeopleOutline } from '@vicons/ionicons5'

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
    icon: () => h(HomeOutline),
  },
  {
    label: () => h(RouterLink, { to: '/users' }, { default: () => 'Users' }),
    key: 'users',
    icon: () => h(PeopleOutline),
  },
]
</script>
