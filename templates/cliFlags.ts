import { FlagParam } from "../typeDef";
import { J } from "../lib";

function convertType(type: string) {
  switch (type) {
    case "number":
      return "integer";
    default:
      return type;
  }
}
export function makeCliFlags(CombinedParams: FlagParam[]) {
  let Flags = `{ `;
  for (let i = 0; i < CombinedParams.length; i++) {
    let { name, description, type, required, hiddenPrompt } = CombinedParams[i];
    const requiredHiddenParam = !hiddenPrompt
      ? ""
      : `
      hidden: true,
      default: true,`;
    //const hide = hidden ? "hidden: " + hidden : "";
    let options = CombinedParams[i].enum
      ? ` options:` + JSON.stringify(CombinedParams[i].enum) + ","
      : "";
    Flags += ` 
    "${name}": flags.${convertType(type)}({
      description: ${JSON.stringify(description)},
      required: ${!!required || hiddenPrompt}, ${options} ${requiredHiddenParam}
    }),`;
  }
  Flags += `} `;
  return Flags;
}
