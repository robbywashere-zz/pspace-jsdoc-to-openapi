import { makeMethod } from "./method";
import { SwagDef } from "../typeDef";

export function makeClass(def: SwagDef) {
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
    ${def.Methods.map(m => makeMethod(m)).join("\n\n")}
  }
  `;
}
