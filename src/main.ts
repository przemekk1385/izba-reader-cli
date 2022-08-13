import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Fix TS2339: Property 'randomUUID' does not exist on type 'Crypto'.
// Based on: https://github.com/denoland/deno/issues/12754#issuecomment-970386235
declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

createApp(App).use(router).mount("#app");
