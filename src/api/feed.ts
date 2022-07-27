import axios from "axios";

import type { Feed } from "@/types";

class FeedEndpoint {
  private apiUrl = `${process.env.VUE_APP_API_HOST}/feed`;
  private xApiKey = process.env.VUE_APP_API_KEY;

  public async list(): Promise<Feed[] | undefined> {
    const urls = (await this.urls()) || [];

    try {
      const { data, status } = await axios.get(
        `${this.apiUrl}?${urls
          .map((url) => `urls=${encodeURIComponent(url)}`)
          .join("&")}`,
        { headers: { "X-API-KEY": this.xApiKey } }
      );

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

  public async urls(): Promise<string[] | undefined> {
    try {
      const { data, status } = await axios.get(`${this.apiUrl}/urls`, {
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

const feedEndpoint = new FeedEndpoint();

export { feedEndpoint };
