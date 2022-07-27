<template>
  <n-grid cols="1" y-gap="24">
    <n-gi>
      <n-page-header subtitle="fetched feeds and news">
        <n-grid cols="12" item-responsive responsive="screen">
          <n-gi span="xs:6 s:4 m:1 l:1">
            <n-statistic label="Fetched" :value="feedsCount + newsCount" />
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
import { feedEndpoint, mailEndpoint, newsEndpoint } from "@/api";

import TheArticles from "@/components/TheArticles.vue";
import TheEmailCard from "@/components/TheEmailCard.vue";
import ThePreloader from "@/components/ThePreloader.vue";

import type { Ref } from "vue";
import type { Feed, News } from "@/types";

const notification = useNotification();

const loading: Ref<boolean> = ref(true);

const feedsCount: Ref<number> = ref(0);
const newsCount: Ref<number> = ref(0);

const articles: Ref<Array<Feed | News>> = ref([]);

const fetchFeeds = async (): Promise<void> => {
  const feeds = await feedEndpoint.list();

  if (feeds) {
    articles.value.push(
      ...feeds.map(({ title, description, url }) => ({
        title,
        description,
        url,
        uuid: crypto.randomUUID(),
      }))
    );
    feedsCount.value = feeds.length;
  }
};

const fetchNews = async (): Promise<void> => {
  const news = await newsEndpoint.list();

  if (news) {
    articles.value.push(
      ...news.map(({ title, description, url, date }) => ({
        title,
        description,
        url,
        date,
        uuid: crypto.randomUUID(),
      }))
    );
    newsCount.value = news.length;
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
  await fetchFeeds();
  await fetchNews();

  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
