<template>
  <n-result status="404" title="404 Not Found" description="Page not found.">
    <template #footer>
      <n-button type="primary" @click="$router.push('/dashboard')">Back</n-button>
    </template>
  </n-result>
</template>
<script setup lang="ts"></script>
