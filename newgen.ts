const { swag } = require("./swag");
const { makeCliFlags } = require("./makeCliFlags");

const { makeClass } = require("./makeClass");

export function locate<T extends "body" | "query" | "path">(where: T) {
  return ({ in: location }: { in: string }) => location === where;
}

const J = JSON.stringify;
exports.J = J;

export const collectNames = (list: { name: string }[]) =>
  list.reduce((p, { name }) => [...p, name], [] as string[]);

const Global = `
import request, { Response } from "superagent";
export interface ResponseWithBody<T> extends Response {
  body: T;
}
export type RequestType = {
    path: string;
    method: string;
    bodyParams?: {};
    queryParams?: {};
  }
export type RequestFunction = <T>(req: RequestType) => Promise<ResponseWithBody<T>>;
`;

function makeCli(def) {
  let CombinedParams = [];
  let SecretParams = [];
  let PromptParamsOpt = [];
  let OmitParams = [...def.CliParams]; //Remove command specific flag from final send
  //filter passwords cuz cli password entry is DUMB AF
  //const password = flags.password ? await cli.prompt("Password") : undefined;
  //

  [...def.CliParams, ...def.AllParams].forEach(param => {
    if (param.name.match(/password/i)) {
      SecretParams.push(param); //if required command flag will not be present
      if (!param.required) {
        CombinedParams.push({
          //convert param into a boolean flag for prompt
          ...param,
          type: "boolean"
        });
      }
    } else {
      CombinedParams.push(param);
    }
  });

  //const omitFlags = makeOmitFlags(OmitParams);
  const flags = makeCliFlags(CombinedParams);
  const prompt = makeCliPrompt(SecretParams);
  return flags;
}

function makeCliPrompt(SecretParams) {
  let params = [...SecretParams.map(p => p.name)];
  let required = [...SecretParams.filter(p => p.required).map(p => p.name)];
}

function makeBaseCommandClass() {
  return `export abstract class BaseCommand extends Command {
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
  }`;
}

function makeCommanderClass(Def) {
  const required = [];
  const optional = [];

  const flags =
    required.reduce((p, name) => p + `${name}: flags.string(),\n`, "") +
    optional.reduce(
      (p, name) => p + `${name}: flags.boolean(),\n`,
      ""
    )`export class ${Def.Method}_CMD extends BaseCommand {
    static flags = {
      ${flags}
    }
    async run() {
      await this.auth();
      const params = await this.params(
        this.parse(${Def.Method}).flags, ${J(optional)}, ${J(required)}
      );
      return this.client.${Def.Method}(params);
    }
  }`;
}

const SwagDef = swag(
  require("./build/src/paperspace-api.swagger2.json"),
  "PaperspaceApi"
);

//process.stdout.write(Global);
//process.stdout.write(SwagDef.Types.join("\n"));
//process.stdout.write(makeClass(SwagDef));
