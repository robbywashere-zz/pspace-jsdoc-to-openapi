import { SwagDefMethod } from "../typeDef";
const { J } = require("./newgen");

export function makeJsdoc(def: SwagDefMethod) {
  return `/* ${def.Description} 
     * @method
     * @name ${def.OpId}
     ${def.AllParams.map(
       ({ name, type, description, required }) =>
         `* @param {${type}} ${required ? `[${name}]` : name} - ${description}`
     ).join("\n")}
   */`;
}

export function makeMethod(def: SwagDefMethod) {
  const path = def.PathParams.length
    ? "`" + def.Path.replace(/{/, "${parameters.") + "`"
    : `'${def.Path}'`;
  const checkParams = def.RequiredParams.length
    ? J`this.checkParams(${def.RequiredParams},parameters)`
    : ``;
  const bodyParams = def.BodyParams.length
    ? J`this.pick(${def.BodyParams},parameters)`
    : `undefined`;
  const queryParams = def.QueryParams.length
    ? J`this.pick(${def.QueryParams},parameters)`
    : `undefined`;
  const method = `'${def.Method.toUpperCase()}'`;
  const response = `${def.OpId}Response`;
  const opt = def.RequiredParams.length ? "" : "?";

  return `
  ${makeJsdoc(def)}
  
  ${def.OpId}(parameters${opt}: { ${def.ParamsTyped} }) {

  ${checkParams}

  return this.request<${response}>({
    path: ${path},
    method: ${method},
    bodyParams: ${bodyParams},
    queryParams: ${queryParams}
  })
}`;
}
exports.makeMethod = makeMethod;
