<template>
  <n-drawer
    v-model:show="articleDrawer"
    content-style="padding: 12px"
    height="auto"
    placement="top"
  >
    <the-own-article-form @add="handleAdd" />
  </n-drawer>
  <n-drawer
    v-model:show="emailDrawer"
    content-style="padding: 12px"
    height="auto"
    placement="top"
  >
    <the-email-form @send="handleSend" />
  </n-drawer>

  <n-grid cols="1" y-gap="24">
    <n-gi>
      <n-space>
        <n-button
          circle
          secondary
          size="large"
          strong
          @click="articleDrawer = true"
        >
          <template #icon>
            <n-icon :component="DocumentAdd" />
          </template>
        </n-button>
        <n-button
          circle
          secondary
          size="large"
          strong
          @click="emailDrawer = true"
        >
          <template #icon>
            <n-icon :component="MailAll" />
          </template>
        </n-button>
      </n-space>
    </n-gi>
    <n-gi v-if="!loading && !articles.filter(({ isOwn }) => !isOwn).length">
      <n-alert title="Error" type="error">
        Failed to fetch articles. See console for details.
      </n-alert>
    </n-gi>
    <n-gi v-if="loading">
      <the-preloader />
    </n-gi>
    <n-gi v-else>
      <the-articles v-model="articles" />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  NAlert,
  NButton,
  NDrawer,
  NGi,
  NGrid,
  NIcon,
  NSpace,
  useMessage,
} from "naive-ui";
import { DocumentAdd, MailAll } from "@vicons/carbon";

import { articleEndpoint, mailEndpoint } from "@/api";

import TheArticles from "@/components/TheArticles.vue";
import TheEmailForm from "@/components/TheEmailForm.vue";
import TheOwnArticleForm from "@/components/TheOwnArticleForm.vue";
import ThePreloader from "@/components/ThePreloader.vue";

import type { Ref } from "vue";
import type { Article } from "@/types";

const message = useMessage();

const articleDrawer: Ref<boolean> = ref(false);
const emailDrawer: Ref<boolean> = ref(false);

const loading: Ref<boolean> = ref(true);

const articles: Ref<Article[]> = ref([]);

const fetchArticles = async (): Promise<void> => {
  const articlesList = await articleEndpoint.list();

  console.log(articles);

  if (articlesList) {
    articles.value.push(...articlesList);
  }
};

const handleAdd = (article: Article): void => {
  articles.value.unshift(article);
  message.info(`Article '${article.title}' added to review.`);
  articleDrawer.value = false;
};

const handleSend = async ({
  email: recipient,
}: {
  email: string;
}): Promise<void> => {
  const review = {
    recipient,
    articles: articles.value,
  };

  const status = await mailEndpoint.send({
    review,
  });
  if (status === 202) {
    message.info(
      `Review sent successfully, email to '${recipient}' should be sent soon.`
    );
  } else {
    message.error("Failed to send review.");
  }
  emailDrawer.value = false;
};

onMounted(async () => {
  await fetchArticles();

  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
