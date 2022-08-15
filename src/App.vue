<template>
  <n-config-provider local="en_US" :theme="darkTheme">
    <n-message-provider>
      <n-layout content-style="padding: 24px">
        <router-view />
      </n-layout>
      <n-back-top />
    </n-message-provider>
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
  NMessageProvider,
} from "naive-ui";
</script>
