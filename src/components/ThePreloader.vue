<template>
  <n-grid :cols="1" :y-gap="24">
    <n-gi v-for="i in randomNumber(2, 5)" :key="i">
      <n-card>
        <n-skeleton text :repeat="3" />
        <n-skeleton text style="width: 75%" />
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { NCard, NGi, NGrid, NSkeleton } from "naive-ui";

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
</script>
