import PaperspaceApi from "../build/src/PaperspaceApi";

class PaperspaceClient extends PaperspaceApi {
  setApiKey(apiKey: string) {
    this.setRequestHeadersHandler(headers => ({
      ...headers,
      "x-api-key": apiKey
    }));
  }
  async login({ email, password }: { email: string; password: string }) {
    const response = await this.LoginUser({ email, password });
    this.setApiKey(response.body.key);
  }
}
