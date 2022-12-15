<template>
  <n-form ref="formRef" :model="formValue" :rules="rules">
    <n-form-item :show-label="false" path="title">
      <n-input v-model:value="formValue.title" placeholder="Title" type="text">
        <template #prefix>
          <n-icon :component="StringText" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="url">
      <n-input v-model:value="formValue.url" placeholder="https://www.example.com/" type="text">
        <template #prefix>
          <n-icon :component="Link" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input v-model:value="formValue.description" placeholder="Text goes here." type="textarea" />
    </n-form-item>
    <n-grid cols="1">
      <n-gi>
        <div style="display: flex; justify-content: flex-end">
          <n-button ghost @click="handleClick">
            <template #icon>
              <n-icon :component="Add" />
            </template>
          </n-button>
        </div>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { NButton, NForm, NFormItem, NGi, NGrid, NIcon, NInput } from "naive-ui";
import { Add, Link, StringText } from "@vicons/carbon";

import type { FormInst, FormItemRule } from "naive-ui/es/form/src/interface";

const emits = defineEmits(["add"]);

const formRef = ref<FormInst | null>(null);
const rules = {
  title: {
    required: true,
    trigger: ["blur", "input"],
  },
  description: {
    required: true,
    trigger: ["blur", "input"],
  },
  url: {
    required: true,
    trigger: ["blur", "input"],
    validator(_0: FormItemRule, value: string) {
      // Based on: https://stackoverflow.com/a/43467144
      let url;

      try {
        url = new URL(value);
      } catch (_1) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
  },
};
const formValue = ref({
  title: "",
  description: "",
  url: "",
});

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      emits(
        "add",
        Object.assign({}, formValue.value, {
          uuid: crypto.randomUUID(),
          isOwn: true,
        })
      );
    }
  });
};
</script>
