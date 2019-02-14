import { FlagParam } from "../typeDef";

export function makeCliFlags(CombinedParams: FlagParam[]) {
  let Flags = `{ `;
  for (let i = 0; i < CombinedParams.length; i++) {
    let { name, description, type, required, hidden } = CombinedParams[i];
    const hide = hidden ? "hidden: " + hidden : "";
    let options = CombinedParams[i].enum
      ? ` options:` + JSON.stringify(CombinedParams[i].enum) + ","
      : "";
    Flags += ` 
    "${name}": flags.${type}({
      description: \`${description}\`,
      required: ${!!required}, ${options} ${hide}
    }),`;
  }
  Flags += `} `;
  return Flags;
}
