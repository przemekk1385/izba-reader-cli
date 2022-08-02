<template>
  <n-grid cols="1" y-gap="24">
    <n-gi>
      <n-page-header subtitle="fetched articles">
        <n-grid cols="12" item-responsive responsive="screen">
          <n-gi span="xs:6 s:4 m:1 l:1">
            <n-statistic label="All" :value="articlesCount" />
          </n-gi>
          <n-gi span="xs:6 s:4 m:1 l:1">
            <n-statistic label="Present" :value="articles.length" />
          </n-gi>
        </n-grid>
        <template #title> Articles </template>
      </n-page-header>
    </n-gi>
    <n-gi> <the-email-card @send="handleSend" /> </n-gi>
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
import { NGi, NGrid, NPageHeader, NStatistic, useNotification } from "naive-ui";
import { articleEndpoint, mailEndpoint } from "@/api";

import TheArticles from "@/components/TheArticles.vue";
import TheEmailCard from "@/components/TheEmailCard.vue";
import ThePreloader from "@/components/ThePreloader.vue";

import type { Ref } from "vue";
import type { Article } from "@/types";

const notification = useNotification();

const loading: Ref<boolean> = ref(true);

const articles: Ref<Article[]> = ref([]);
const articlesCount: Ref<number> = ref(0);

const fetchArticles = async (): Promise<void> => {
  const articlesList = await articleEndpoint.list();

  console.log(articles);

  if (articlesList) {
    articlesList.forEach((item) =>
      Object.assign(item, { uuid: crypto.randomUUID() })
    );
    articles.value.push(...articlesList);
  }
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
    notification.success({
      title: "Ok",
      description: `Review sent to '${recipient}'.`,
    });
  } else {
    notification.error({
      title: "Error",
      description: "Failed to send review.",
    });
  }
};

onMounted(async () => {
  await fetchArticles();
  articlesCount.value = articles.value.length;

  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
