import { SwagDefMethod, FlagParam } from "../typeDef";
import { makeCliFlags } from "./cliFlags";
export function makeCliCommand(def: SwagDefMethod) {
  let CombinedParams: FlagParam[] = [];
  let MaskedParams: FlagParam[] = [];
  [...def.CliParams, ...def.AllParams].forEach(param => {
    if (param.name.match(/password/i)) {
      CombinedParams.push({
        ...param,
        type: "boolean",
        hiddenPrompt: !!param.required
      });
      MaskedParams.push(param);
    } else {
      CombinedParams.push({ ...param });
    }
  });
  const optionalMasked = MaskedParams.filter(p => !p.required).map(p => p.name);
  const requiredMasked = MaskedParams.filter(p => p.required).map(p => p.name);
  const flags = makeCliFlags(CombinedParams);
  const className = `${def.OpId}`;
  return `
  import {  flags } from "@oclif/command";
  import { BaseCommand } from "../BaseCommand";

  export default class ${className} extends BaseCommand {
    static flags = ${flags}
    async run() {
      await this.auth();
      const params = await this.params(
          this.parse(${className}).flags, ${JSON.stringify(
    optionalMasked
  )}, ${JSON.stringify(requiredMasked)}
      );
      return this.client.${def.OpId}(params);
    }
  }`;
}
