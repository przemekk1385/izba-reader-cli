<template>
  <n-form ref="formRef" :model="formValue" :rules="rules">
    <n-form-item path="template" label="Use template">
      <n-checkbox-group v-model:value="formValue.templates">
        <n-checkbox value="iep.html" label="IEPiOE" />
        <!-- next -->
      </n-checkbox-group>
    </n-form-item>
    <n-form-item path="email" :show-label="false">
      <n-input-group>
        <n-input
          placeholder="user@example.com"
          type="text"
          v-model:value="formValue.email"
        >
          <template #prefix>
            <n-icon :component="Email" />
          </template>
        </n-input>
        <n-button ghost @click="handleClick">
          <template #icon>
            <n-icon :component="Send" />
          </template>
        </n-button>
      </n-input-group>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { defineEmits, Ref, ref } from "vue";
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NIcon,
  NInput,
  NInputGroup,
} from "naive-ui";
import { Email, Send } from "@vicons/carbon";

import type { FormInst, FormItemRule } from "naive-ui/es/form/src/interface";

const emits = defineEmits(["send"]);

const formRef = ref<FormInst | null>(null);
const rules = {
  email: {
    required: true,
    validator(_0: FormItemRule, value: string) {
      if (!value) {
        return new Error("email is required");
      } else if (!/^(\w|\.)+@((iep\.org\.pl)|(gmail\.com))$/gim.test(value)) {
        return new Error("this email is not supported");
      }
      return true;
    },
    trigger: ["blur", "input"],
  },
};
const formValue = ref({
  templates: [],
  email: "",
});

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      emits("send", formValue.value);
    }
  });
};

// TODO: templates endpoint
const availableTemplates = [{ label: "IEP", value: "iep.html" }];
const selectedTemplates = ref<string[]>([]);
</script>
