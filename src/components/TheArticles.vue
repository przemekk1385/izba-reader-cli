<template>
  <n-grid cols="1" y-gap="24">
    <n-gi v-for="{ title, description, url, uuid } in modelValue" :key="uuid">
      <n-card>
        <template #header>
          <n-h2 prefix="bar">
            <n-text type="primary">{{ title }}</n-text>
          </n-h2>
        </template>
        <n-text>{{ description }}</n-text>
        <template #footer>
          <n-icon :component="Link" /> <n-a :href="url">{{ urlHost(url) }}</n-a>
        </template>
        <template #action>
          <n-button circle secondary strong type="warning">
            <template #icon>
              <n-icon :component="TrashCan" @click="deleteItem(uuid)" />
            </template>
          </n-button>
        </template>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { NA, NButton, NCard, NGi, NGrid, NH2, NIcon, NText } from "naive-ui";
import { Link, TrashCan } from "@vicons/carbon";

import type { Article } from "@/types";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: Article[];
}>();

const deleteItem = (lookupValue: string) => {
  const { modelValue: items } = props;
  const i: number = items.findIndex(({ uuid }) => uuid === lookupValue);

  items.splice(i, 1);

  emits("update:modelValue", items);
};

const urlHost = (url: string): string => new URL(url).host;
</script>
