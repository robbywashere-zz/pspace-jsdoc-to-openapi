function typify(spec, reqParams) {

  return walk(null, spec, new Set(reqParams));

  function walk(name, prop, req = new Set()) {
    const {
      name: propName,
      type,
      items,
      required = [],
      properties,
    } = prop;

    const Enum = prop.enum;

    name = propName ? propName : name;

    let R = ((typeof required === "boolean" && required) || (req.has(name))) ? '' : '?';

    let declaration = name ? `${name}${R}: ` : '';

    if (type === 'array') {
      declaration += `Array<${walk(null,items)}>`
    } else if (type === 'object') {

      const propNames = Object.keys(properties);
      declaration += `{ 
        `
      for (let propName of propNames) {

        declaration += `${walk(propName, properties[propName],new Set(required))}; 
        `
      }
      declaration += `}`
    } else {
      //assume string enum
      if (Enum) return declaration += Enum.map(val => '"' + val + '"').join("|");
      return declaration += type;
    }


    return declaration;
  };

}

const locate = (where) => ({
  in: location
}) => location === where

const resolveRef = (node, ref = '') => {
  for (let path of ref.split("/").slice(1)) {
    node = node[path];
  }
  return node;
}

const J = JSON.stringify;

const collectNames = (list) => list.reduce((p, {
  name
}) => [...p, name], [])


function swag(spec, ClassName = "Api") {

  let Def = {
    Types: [],
    Methods: [],
    ClassName
  }
  for (let Path of Object.keys(spec.paths)) {

    for (let Method of Object.keys(spec.paths[Path])) {

      const OpId = spec.paths[Path][Method].operationId;
      const params = spec.paths[Path][Method].parameters;
      const resp = (Object.values(spec.paths[Path][Method].responses)[0] || {}).schema;

      if (resp !== undefined) {
        Def.Types.push(`type ${OpId}Response = ${typify(resolveRef(spec, resp['$ref']))};`);
      } else {
        Def.Types.push(`type ${OpId}Response = any;`);
      }


      let bodyParams = params.filter(locate('body'))
        .reduce((result, {
          schema,
          required
        }) => ({
          ...result,
          ...(resolveRef(spec, schema['$ref']) || schema)
        }), {});


      const queryParams = params.filter(locate('query'));

      const pathParams = params.filter(locate('path'));

      const allParams = [...queryParams, ...pathParams, ...Object.entries((bodyParams.properties || {})).map(([k, v]) => ({
        name: k,
        ...v
      }))];

      const requiredBodyParams = (bodyParams.required || []);
      const RequiredParams = [...collectNames(pathParams), ...collectNames(queryParams.filter((p) => p.required)), ...requiredBodyParams];
      const QueryParams = collectNames(queryParams);
      const PathParams = collectNames(pathParams);
      const BodyParams = Object.keys(bodyParams.properties || {});
      const ParamsTyped = allParams.map(qp => typify(qp, RequiredParams)).join("; ");

      Def.Methods.push({
        OpId,
        BodyParams,
        PathParams,
        QueryParams,
        ParamsTyped,
        RequiredParams,
        ParamsTyped,
        Method: Method.toUpperCase(),
        Path

      });
    }
  }
  return Def;

}

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

function makeMethod(def) {

  const path = (def.PathParams.length) ? "`" + def.Path.replace(/{/, "${parameters.") + "`" : `'${def.Path}'`;
  const checkParams = (def.RequiredParams.length) ? `this.checkParams(${J(def.RequiredParams)},parameters)` : ``;
  const bodyParams = (def.BodyParams.length) ? `this.pick(${J(def.BodyParams)},parameters)` : `undefined`;
  const queryParams = (def.QueryParams.length) ? `this.pick(${J(def.QueryParams)},parameters)` : `undefined`;
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
}`

}

function makeClass(def) {
  return `export default class ${def.ClassName} { 

    constructor(public apiKey?: string) {}

    SetRequestMethod(fn: RequestFunction){
      this.request = fn.bind(this) as RequestFunction;
    }

    request: RequestFunction = (req) => {
      if (!this.apiKey) {
        throw new Error(
          \`No api key, try #.SetToken(apiKey: string)\`
        );
      }
      let R = request(req.method, req.path);
      if (req.bodyParams) R = R.send(req.bodyParams);
      if (req.queryParams) R = R.query(req.queryParams);
      return R.set("x-api-key", this.apiKey).set("accept", "json");
    }

    SetToken(apiKey: string){
      this.apiKey = apiKey;
    }

    private pick(list: string[], params?: { [key: string] : any}){
      if (!params) return;
      return list.reduce((p, n) => ({ ...p,
        [n]: params[n]
      }), {});
    }

    private checkParams(list: string[], params: { [key: string ]: any }){
      return list.forEach(p => {
        if (!(p in params)) {
          throw new Error('Missing parameter: ' + p)
        }
      }); 
    }
    ${def.Methods.map(m=>makeMethod(m)).join('\n\n')}
  }
  `
}


const SwagDef = swag(require('./build/src/paperspace-api.swagger2.json'), "PaperspaceApi");
process.stdout.write(Global);
process.stdout.write(SwagDef.Types.join("\n"));
process.stdout.write(makeClass(SwagDef));