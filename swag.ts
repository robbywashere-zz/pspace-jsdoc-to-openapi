import { locate, collectNames, resolveRef } from "./lib";
import { typify } from "./lib";
import { SwagDef, SwagParam, SwaggerSpec } from "./typeDef";
import { ok } from "assert";

export function swag(spec: SwaggerSpec, ClassName = "Api") {
  let Def: SwagDef = {
    Types: [],
    Methods: [],
    ClassName
  };
  for (let Path of Object.keys(spec.paths)) {
    for (let Method of Object.keys(spec.paths[Path])) {
      const OpId = spec.paths[Path][Method].operationId;
      const params = spec.paths[Path][Method].parameters;
      const resp = ((Object.values(spec.paths[Path][Method].responses)[0] ||
        {}) as any).schema;
      if (resp !== undefined) {
        Def.Types.push(
          `type ${OpId}Response = ${typify(resolveRef(spec, resp["$ref"]))};`
        );
      } else {
        Def.Types.push(`type ${OpId}Response = any;`);
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
      const queryParams = params
        .filter(locate("query"))
        .map(p => ({ ...p, required: true }));
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
      const OptionalParams = AllParams.filter(p => !p.required);
      const RequiredParams = [
        ...collectNames(pathParams),
        ...collectNames(queryParams.filter(p => p.required)),
        ...requiredBodyParams
      ];
      const CliParams = (spec.paths[Path][Method]["x-cli-parameters"] ||
        []) as SwagParam[];

      const Description = spec.paths[Path][Method].description || "";
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
