import { locate, collectNames, resolveRef } from "./lib";
import { typify } from "./lib";
import { SwagDef, SwagParam, SwaggerSpec } from "./typeDef";

export function swag(spec: SwaggerSpec, ClassName = "Api") {
  let Def: SwagDef = {
    Types: [],
    Methods: [],
    ClassName
  };
  for (let Path of Object.keys(spec.paths)) {
    for (let Method of Object.keys(spec.paths[Path])) {
      const methodObj = spec.paths[Path][Method];
      const OpId = methodObj.operationId;
      const params = methodObj.parameters;
      const resp = ((Object.values(methodObj.responses)[0] || {}) as any)
        .schema;
      if (resp !== undefined) {
        Def.Types.push(
          `export type ${OpId}Response = ${typify(
            resolveRef(spec, resp["$ref"])
          )};`
        );
      } else {
        Def.Types.push(`export type ${OpId}Response = any;`);
      }
      let bodyParams = params
        .filter(locate("body"))
        .reduce<{ properties: {}; required: [] }>(
          (result, { schema, required }) => ({
            ...result,
            ...(resolveRef(spec, schema["$ref"]) || schema)
          }),
          Object.create(null)
        );
      const queryParams = params.filter(locate("query"));
      const pathParams = params
        .filter(locate("path"))
        .map(p => ({ ...p, required: true }));
      const requiredBodyParams: string[] = bodyParams.required || [];
      const AllParams = [
        ...queryParams,
        ...pathParams,
        ...Object.entries(bodyParams.properties || {}).map(([k, v]) => ({
          name: k,
          required: requiredBodyParams.includes(k),
          ...v
        }))
      ] as SwagParam[];
      const RequiredParams = [
        ...collectNames(pathParams),
        ...collectNames(queryParams.filter(p => p.required)),
        ...requiredBodyParams
      ];
      const CliParams = (spec.paths[Path][Method]["x-cli-parameters"] ||
        []) as SwagParam[];

      const Description = methodObj.summary || "";
      const QueryParams = collectNames(queryParams);
      const PathParams = collectNames(pathParams);
      const BodyParams = Object.keys(bodyParams.properties || {});
      const ParamsTyped = AllParams.map(qp => typify(qp, RequiredParams)).join(
        "; "
      );
      Def.Methods.push({
        OpId,
        Description,
        AllParams,
        CliParams,
        BodyParams,
        PathParams,
        QueryParams,
        ParamsTyped,
        RequiredParams,
        Method: Method.toUpperCase(),
        Path
      });
    }
  }
  return Def;
}
