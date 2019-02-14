import { SwagDefMethod } from "../typeDef";
export function makeJsdoc(def: SwagDefMethod) {
  return `/** ${def.Description} 
   * @method
   * @name ${def.OpId}
     ${def.AllParams.map(
       ({ name, type, description, required }) =>
         `* @param {${type}} ${required ? name : `[${name}]`} - ${description}`
     ).join("\n")}
   */`;
}
