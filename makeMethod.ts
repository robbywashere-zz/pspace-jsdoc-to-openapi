const {
  J
} = require("./newgen");

function makeMethod(def) {
  const path = def.PathParams.length ?
    "`" + def.Path.replace(/{/, "${parameters.") + "`" :
    `'${def.Path}'`;
  const checkParams = def.RequiredParams.length ?
    `this.checkParams(${J(def.RequiredParams)},parameters)` :
    ``;
  const bodyParams = def.BodyParams.length ?
    `this.pick(${J(def.BodyParams)},parameters)` :
    `undefined`;
  const queryParams = def.QueryParams.length ?
    `this.pick(${J(def.QueryParams)},parameters)` :
    `undefined`;
  const method = `'${def.Method.toUpperCase()}'`;
  const response = `${def.OpId}Response`;
  const opt = def.RequiredParams.length ? "" : "?";
  return `${def.OpId}(parameters${opt}: { ${def.ParamsTyped} }) {
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