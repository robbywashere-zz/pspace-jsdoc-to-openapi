import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
//import { PaperspaceClient } from "./build/paperspace-client";

declare class PaperspaceClient {
  login(c: {}): any;
}

abstract class BaseCommand extends Command {
  public client = new PaperspaceClient();

  async fetchCredentials() {
    return Object.create({
      email: await cli.prompt("Email"),
      password: await cli.prompt("Password", { type: "mask" })
    });
  }

  constructor(...args: any[]) {
    super(args[0], args[1]);
  }

  async auth() {
    return this.client.login(await this.fetchCredentials());
  }

  async prompt<Opt extends string, Req extends string>(
    optional: Array<Opt>,
    required: Array<Req>
  ) {
    let result: { [K in Req]: string } &
      { [K in Opt]?: string } = Object.create(null);
    for (let k of [...optional, ...required])
      result[k] = await cli.prompt(k, { type: "mask" });
    return result;
  }

  async params<
    T extends {},
    Req extends keyof T & string,
    Opt extends keyof T & string
  >(flags: T, optional: Array<Opt>, required: Array<Req>) {
    const prompts = await this.prompt(
      optional.filter(k => flags[k]),
      required.filter(k => !flags[k])
    );
    for (let k of optional) delete flags[k];
    return { ...(flags as Pick<T, Exclude<keyof T, Req | Opt>>), ...prompts };
  }
}

class Hello extends BaseCommand {
  static flags = {
    apiToken: flags.string(),
    email: flags.string({ required: true }),
    password: flags.string()
  };

  async run() {
    await this.auth();
    const params = await this.params(this.parse(Hello).flags, [], ["password"]);
    //return this.client.LoginUser(params);
  }
}
