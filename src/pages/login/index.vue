<template>
  <div style="height: 100vh; display: flex; align-items: center; justify-content: center">
    <n-card title="Login" style="width: 360px">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item label="Username" path="username">
          <n-input v-model:value="form.username" placeholder="admin / editor" />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input v-model:value="form.password" type="password" placeholder="any" />
        </n-form-item>
        <n-space justify="end">
          <n-button type="primary" :loading="loading" @click="onSubmit">Login</n-button>
        </n-space>
      </n-form>
      <n-alert style="margin-top: 12px" type="info">
        Use username: <n-text code>admin</n-text> or <n-text code>editor</n-text>
      </n-alert>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const loading = ref(false)
const formRef = ref<FormInst | null>(null)

const form = reactive({
  username: 'admin',
  password: '123456',
})

const rules: FormRules = {
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
}

async function onSubmit() {
  await formRef.value?.validate()
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } finally {
    loading.value = false
  }
}
</script>
