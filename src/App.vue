<template>
  <n-config-provider local="en_US" :theme="darkTheme">
    <n-notification-provider>
      <n-layout content-style="padding: 24px">
        <router-view />
      </n-layout>
      <n-back-top />
    </n-notification-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  darkTheme,
  NBackTop,
  NConfigProvider,
  NGlobalStyle,
  NLayout,
  NNotificationProvider,
} from "naive-ui";
</script>
