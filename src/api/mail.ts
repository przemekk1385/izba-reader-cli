import axios from "axios";

import type { Review } from "@/types";

class MailEndpoint {
  private apiUrl = `${process.env.VUE_APP_API_ROOT_URL}/mail`;
  private xApiKey = process.env.VUE_APP_API_KEY;

  public async send({
    review,
  }: {
    review: Review;
  }): Promise<number | undefined> {
    try {
      const { data, status } = await axios.post(`${this.apiUrl}/send`, review, {
        headers: { "X-API-KEY": this.xApiKey },
      });

      if (status === 202) {
        return status;
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

const mailEndpoint = new MailEndpoint();

export { mailEndpoint };
