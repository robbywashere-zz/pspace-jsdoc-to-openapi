const doctrine = require("doctrine");
const swaggerParser = require("swagger-parser");
const _ = require("lodash");
const $ = require("shelljs");
const {
  readFileSync,
  writeFileSync
} = require("fs");
const path = require("path");
const Gschema = require("generate-schema");
const toOpenApi = require("json-schema-to-openapi-schema");
const fixJson = require("json5-relaxed").parse;
const swaggerConverter = require("api-spec-converter");
const {
  CodeGen
} = require("swagger-typescript-codegen");

function walkObject(obj, visit, parent = null) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof obj[key] === "object") {
      walkObject(obj[key], visit, Array.isArray(obj) ? parent : key);
    }
    visit({
      obj,
      key,
      parent,
      value
    });
  }
}

(async function main() {
  const jsdocRx = /\/\*.*[\s\S]+?\*\//gm;

  $.cd("/Users/robby/etc/Projects/paperspace-node/lib");

  let TsInterfaces = [];
  let Paths = {};
  let Schemas = {
    Error: {
      required: ["code", "message"],
      properties: {
        code: {
          type: "integer",
          format: "int32"
        },
        message: {
          type: "string"
        }
      }
    }
  };
  const jsfiles = $.ls("*/*.js");

  for (let jsfile of jsfiles) {
    let contents = $.cat(jsfile);

    let methodType = contents.match(/method:.+/g) || [];
    methodType =
      methodType.length > 0 ?
      methodType[0].search("get") > -1 ?
      "GET" :
      "POST" :
      null;

    let route = contents.match(/route:(.*),+?/) || [];
    route = route.length > 1 ? route[1].replace(/'/g, "").trim() : null;

    let jsdoc = contents.match(jsdocRx || [])[0];
    if (!jsdoc.length) continue;

    const result = doctrine.parse(jsdoc, {
      unwrap: true,
      sloppy: true
    });

    function title(name) {
      return result.tags.find(({
        title
      }) => title === name) || [];
    }

    function titleAll(name) {
      return result.tags.filter(({
        title
      }) => title === name) || [];
    }

    let example = titleAll("example").filter(
      e => e.description.search(/return value/i) > -1
    );

    let returnCode = titleAll("example")
      .map(e => (e.description.match(/Returns (\d+)/m) || [])[1])
      .filter(Boolean)
      .pop();

    const namespace = title("memberof").description;

    const method = title("method").name;

    const description = title("description").description;

    let respSchema;
    if (example[0]) {
      let e = example[0].description;
      const exResp = e.match(/value:([\s|\S]*)/m)[1];
      let jp = null;
      try {
        jp = fixJson(exResp);
      } catch (e) {
        throw e;
      }

      if (jp) {
        const exSchema = Gschema.json("", jp);

        let transform = {
          region: "string",
          privateIpAddress: "string",
          dtFinished: "string",
          dynamicPublicIp: "string",
          parentJobId: "string",
          networkId: "string",
          jobError: "boolean",
          autoSnapshotFrequency: "number",
          autoSnapshotSaveCount: "number",
          dtFinished: "string",
          dtDeleted: "string",
          os: "string",
          name: "string",
          ram: "string",
          gpu: "string",
          storageTotal: "string",
          storageUsed: "string",
          exitCode: "number",
          dtLastRun: "string",
          dtStarted: "string",
          dtFinished: "string",
          dtProvisioningFinished: "string",
          dtProvisioningStarted: "string",
          dtTeardownFinished: "string",
          dtTeardownStarted: "string",
          publicIpAddress: "string",
          userId: "string"
        };

        walkObject(exSchema, function ({
          obj,
          key,
          parent,
          value
        }) {
          if (key === "type") {
            if (transform[parent]) obj["type"] = transform[parent];
          }
        });

        respSchema = exSchema;
      }
    }

    const params = result.tags
      .filter(({
        name
      }) => name && /\w+\.\w+/.test(name))
      .map(p => {
        // console.log(p.description);
        if (p) {
          if (_.get(p, "type.type") === "OptionalType") {
            p.optional = true;
            p.type.name = p.type.expression.name;
          }
          if (p.name.indexOf(".")) {
            let name = p.name.split(".")[1];
            p.memberName = name;
          }
        }
        return p;
      });

    const interfaceParams = params
      .filter(p => p.memberName)
      .map(p => {
        return `${_.upperFirst(p.memberName)}${p.optional ? "?" : ""}: ${
          p.type.name
        };`;
      });

    const isNamespaceIndex = !(namespace && method);
    if (isNamespaceIndex) continue;
    //TS and OPEN API

    const interfaceName = _.upperFirst(namespace) + _.upperFirst(method);

    if (interfaceParams.length > 0) {
      const tsInterface = `
        export interface ${interfaceName} { 
            ${interfaceParams.join("\n        ")}
        }`;
      TsInterfaces.push(tsInterface);
    }

    if (!route && !methodType) continue;

    let pathParams = route
      .split("/")
      .reduce((p, n) => [n[0] === ":" ? n.substr(1) : null, ...p], [])
      .filter(Boolean);

    const MediaType = "application/json";
    let parameters = [];
    let names = [];
    let reqBodyRequired = [];
    let reqBodyProperties = {};
    let requestBody = {
      description: "request body params",
      content: {
        [MediaType]: {
          schema: {
            '$ref': `#/components/schemas/${interfaceName}RequestBody`
          }
        }
      },
    };
    const reqSchema = {};
    for (const param of params) {
      if (names.includes(param.memberName)) continue; //skip if already present due to human error
      names.push(param.memberName);
      //if (!param.type) console.log(param);
      let p = {
        name: param.memberName,
        required: param.type.type === "OptionalType" ? false : true,
        description: param.description,
        schema: {
          type: param.type.name
        }
      };

      if (pathParams.includes(param.memberName)) p.in = "path";
      else if (methodType === "GET") p.in = "query";
      else {
        reqBodyProperties = { ...reqBodyProperties,
          [param.memberName]: {
            type: param.type.name,
            description: param.description
          }
        }
        if (param.type.type !== "OptionalType") {
          reqBodyRequired.push(param.memberName)
        }
        continue;
      };
      parameters.push(p);
    }
    if (Object.keys(reqBodyProperties).length > 0) {
      reqSchema[`${interfaceName}RequestBody`] = {
        type: "object"
      };
      if (reqBodyRequired.length !== 0) {
        requestBody.required = true;
        reqSchema[`${interfaceName}RequestBody`].required = reqBodyRequired;
      }
      reqSchema[`${interfaceName}RequestBody`].properties = reqBodyProperties
    }

    const operationId = interfaceName; //???
    let paramRoute = route.replace(/:([\w]+)/g, "{$1}");
    let summary = description.split(".")[0].replace(/\n/g, " ");

    const AdHocSchemas = {
      JobsArtifactsGet: {
        type: "object",
        properties: {
          Credentials: {
            type: "object",
            properties: {
              AccessKeyId: {
                type: "string"
              },
              SecretAccessKey: {
                type: "string"
              },
              SessionToken: {
                type: "string"
              }
            }
          },
          bucket: {
            type: "string"
          },
          folder: {
            type: "string"
          }
        }
      },
      JobsLogs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            message: {
              type: "string"
            },
            line: {
              type: "number"
            }
          }
        }
      },
      LoginUser: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          key: {
            type: "string"
          }
        },
        required: ["name", "key"]
      }
    };

    let schema = respSchema ? {
        [`${interfaceName}Response`]: _.omit(toOpenApi(respSchema), ["title"])
      } :
      AdHocSchemas[interfaceName] ? {
        [`${interfaceName}Response`]: AdHocSchemas[interfaceName]
      } :
      null;

    let code = returnCode || "200";
    let response = {
      [code]: {
        description: "Expected response to a valid request"
      }
    };

    if (schema) {
      _.set(response[code], "content.application/json.schema", {
        $ref: `#/components/schemas/${interfaceName}Response`
      });
    }


    const paths = {
      [paramRoute]: {
        [methodType.toLowerCase()]: {
          summary,
          operationId,
          tags: [namespace],
          parameters,
          responses: {
            ...response,
            default: {
              description: "unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      }
    };
    if (Object.keys(reqBodyProperties).length > 0) {
      paths[paramRoute][methodType.toLowerCase()].requestBody = requestBody;
    }

    Paths = { ...Paths,
      ...paths
    };
    Schemas = { ...Schemas,
      ...reqSchema,
      ...schema
    };
  }

  const title = "paperspace-api";
  const OpenApi = {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title
    },
    servers: [{
      url: "https://api.paperspace.io"
    }],
    paths: Paths,

    components: {
      schemas: Schemas,
      securitySchemes: {
        api_key: {
          type: "apiKey",
          name: "x-api-key",
          in: "header"
        }
      }
    },
    security: [{
      api_key: []
    }]
  };

  const openapi = JSON.stringify(OpenApi, null, 4);

  try {
    await swaggerParser.validate(OpenApi);
  } catch (e) {
    console.log(openapi);
    console.error(e);
    process.exit(1);
  }

  const packagejson = {
    name: title,
    version: "1.0.0",
    description: title,
    main: "./dist/index.js",
    types: "./dist/index.d.ts"
  };

  let buildPath = path.join(__dirname, "build");
  let srcPath = path.join(__dirname, "src");

  $.rm("-rf", buildPath);
  $.cp("-r", srcPath, buildPath);
  $.mkdir("-p", path.join(buildPath, "src"));
  $.mkdir("-p", path.join(buildPath, "dist"));

  const openapiPath = path.resolve(
    path.join(buildPath, "src", `${title}.openapi3.json`)
  );
  const swaggerPath = path.resolve(
    path.join(buildPath, "src", `${title}.swagger2.json`)
  );
  writeFileSync(openapiPath, openapi);
  writeFileSync(
    path.join(buildPath, `package.json`),
    JSON.stringify(packagejson, null, 4)
  );
  //Disabled for now writeFileSync(path.join(buildPath,'dist',`index.d.ts`),TsInterfaces.join('\n'));

  let swagger2 = await swaggerConverter
    .convert({
      from: "openapi_3",
      to: "swagger_2",
      source: openapiPath
    })
    .then(converted => converted.stringify());

  writeFileSync(swaggerPath, swagger2);

  const templatePath = path.join(__dirname, "ts-templates");
  const tsSourceCode = CodeGen.getCustomCode({
    className: "PaperspaceApi",
    swagger: JSON.parse(swagger2),
    template: {
      class: readFileSync(path.join(templatePath, "class.mustache"), "utf-8"),
      method: readFileSync(path.join(templatePath, "method.mustache"), "utf-8"),
      type: readFileSync(path.join(templatePath, "type.mustache"), "utf-8")
    }
  });

  writeFileSync(path.join(buildPath, "src", `PaperspaceApi.ts`), tsSourceCode);
})();

//for FILE in $(find . -type f -exec grep -Iq . {} \; -and -print); do cat $FILE | ruby -e "puts (gets(nil).match(/\/\*.* \*\//m) || "").to_s.gsub(/\[|\]/,"")" > ${FILE}.jsdoc.js; done;
/*
    LoginUser2(parameters: LoginUserRequestBody & { foo: string }){
      const { apiToken, email, password, ...rest } = parameters;
      return this.LoginUser({ body: { apiToken, email, password } })
    }
    */
