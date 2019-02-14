import { locate, collectNames } from "./newgen";
import { resolveRef } from "./resolveRef";
import { typify } from "./typify";

export type SwagDef = {
  Types: string[];
  Methods: SwagDefMethod[];
  ClassName: string;
};

export type SwagDefMethod = {
  OpId: string;
  AllParams: {}[];
  CliParams: {}[];
  BodyParams: string[];
  PathParams: string[];
  QueryParams: string[];
  ParamsTyped: string;
  RequiredParams: string[];
  Method: string;
  Path: string;
};

type SwaggerSpec = {
  paths: {
    [key: string]: {
      [key: string]: {
        "x-cli-parameters"?: {}[];
        parameters: {
          name: string;
          in: "path" | "query" | "body";
          schema: {
            $ref?: string;
          };
          required: string[];
        }[];
        operationId: string;
        responses: {
          $ref?: string;
        }[];
      };
    };
  };
};

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
      const queryParams = params.filter(locate("query"));
      const pathParams = params.filter(locate("path"));
      const AllParams = [
        ...queryParams,
        ...pathParams,
        ...Object.entries(bodyParams.properties || {}).map(([k, v]) => ({
          name: k,
          ...v
        }))
      ];
      const requiredBodyParams = bodyParams.required || [];
      const RequiredParams = [
        ...collectNames(pathParams),
        ...collectNames(queryParams.filter(p => p.required)),
        ...requiredBodyParams
      ];
      const CliParams = spec.paths[Path][Method]["x-cli-parameters"] || [];
      const QueryParams = collectNames(queryParams);
      const PathParams = collectNames(pathParams);
      const BodyParams = Object.keys(bodyParams.properties || {});
      const ParamsTyped = AllParams.map(qp => typify(qp, RequiredParams)).join(
        "; "
      );
      Def.Methods.push({
        OpId,
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
