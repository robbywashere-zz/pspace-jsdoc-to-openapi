export function makeCliFlags(CombinedParams) {
  let Flags = `{ `;
  for (let i = 0; i < CombinedParams.length; i++) {
    let {
      name,
      description,
      type,
      required,
    } = CombinedParams[i];
    let options = CombinedParams[i].enum ?
      `
      options:` + JSON.stringify(CombinedParams[i].enum) + "," : "";
    Flags += ` 
    "${name}": flags.${type}({
      description: \`${description}\`,
      required: ${!!required},${options}
    }),`;
  }
  Flags += `} `;
  console.log(Flags);
  return Flags;
}