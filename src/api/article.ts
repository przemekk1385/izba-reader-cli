import axios from "axios";

import type { Feed, News } from "@/types";

class ArticleEndpoint {
  private apiUrl = `${process.env.VUE_APP_API_HOST}/article`;
  private xApiKey = process.env.VUE_APP_API_KEY;

  public async list(): Promise<(Feed | News)[] | undefined> {
    try {
      const { data, status } = await axios.get(this.apiUrl, {
        headers: { "X-API-KEY": this.xApiKey },
      });

      if (status === 200) {
        return data;
      } else {
        const detail = data;
        console.log(detail);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message } = err;
        console.error(message);
      } else {
        console.error("Unknown error.");
      }
    }
  }
}

const articleEndpoint = new ArticleEndpoint();

export { articleEndpoint };
