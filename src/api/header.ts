import axios, { AxiosRequestHeaders } from "axios";

class HeaderEndpoint {
  private apiUrl = `${process.env.VUE_APP_API_ROOT_URL}/header`;
  private xApiKey = process.env.VUE_APP_API_KEY;

  public async list(): Promise<string[] | undefined> {
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
  public async retrieve({
    headers,
    uuid,
  }: {
    headers: AxiosRequestHeaders;
    uuid: string;
  }): Promise<string | undefined> {
    try {
      const { data, status } = await axios.get(`${this.apiUrl}/${uuid}`, {
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

const headerEndpoint = new HeaderEndpoint();

export { headerEndpoint };
