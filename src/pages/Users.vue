<template>
  <n-card title="Users">
    <n-space>
      <n-button v-permission="'user:add'" type="primary">Add User</n-button>
      <n-button v-permission="'user:delete'" type="error">Delete User</n-button>
      <n-button v-permission="'user:edit'">Edit User</n-button>
    </n-space>

    <n-divider />

    <n-alert type="info">
      admin should see all buttons; editor should see only "Edit User".
    </n-alert>
  </n-card>
</template>
<script setup lang="ts"></script>
