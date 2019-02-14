import { SwagDefMethod, FlagParam } from "../typeDef";
import { makeCliFlags } from "./cliFlags";
export function makeCliCommand(def: SwagDefMethod) {
  let CombinedParams: FlagParam[] = [];
  [...def.CliParams, ...def.AllParams].forEach(param => {
    if (param.name.match(/password/i)) {
      CombinedParams.push({
        ...param,
        type: "boolean",
        hidden: !!param.required
      });
    } else {
      CombinedParams.push({ ...param });
    }
  });
  const optional = CombinedParams.filter(p => !p.required).map(p => p.name);
  const required = CombinedParams.filter(p => p.required).map(p => p.name);
  const flags = makeCliFlags(CombinedParams);
  const className = `${def.OpId}`;
  return `
  
  import { BaseCommand } from "../lib/BaseCommand";

  export default class ${className} extends BaseCommand {
    static flags = ${flags}
    async run() {
      await this.auth();
      const params = await this.params(
          this.parse(${className}).flags, ${JSON.stringify(
    optional
  )}, ${JSON.stringify(required)}
      );
      return this.client.${def.OpId}(params);
    }
  }`;
}
