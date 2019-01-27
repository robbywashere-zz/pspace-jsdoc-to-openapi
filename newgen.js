function readSpec(filepath) {
  return JSON.parse(fs.readFileSync(filepath));
}


function typify(spec) {

  function walk(name, prop, req = new Set()) {
    const {
      name: propName,
      type,
      items,
      required = [],
      properties,
    } = prop;

    name = propName ? propName : name;

    let R = ((typeof required === "boolean" && required) || (req.has(name))) ? '' : '?';

    let declaration = name ? `${name}${R}: ` : '';

    if (type === 'array') {
      declaration += `Array<${walk(null,items)}>`
    } else if (type === 'object') {

      const propNames = Object.keys(properties);
      declaration += `{ `
      for (let propName of propNames) {
        declaration += `${walk(propName, properties[propName],new Set(required))}; `
      }
      declaration += `}`
    } else {
      return declaration += type;
    }


    return declaration;
  };

  return walk(null, spec);
}

const locate = (where) => ({ in: location
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


function swag(spec, ClassName = "PaperspaceApi") {

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
      }


      let bodyParams = params.filter(locate('body'))
        .reduce((result, {
          schema,
          required
        }) => ({ ...result,
          ...(resolveRef(spec, schema['$ref']) || schema)
        }), {});


      const queryParams = params.filter(locate('query'));

      const pathParams = params.filter(locate('path'));

      const allParams = [...queryParams, ...pathParams, ...Object.entries((bodyParams.properties || {})).map(([k, v]) => ({
        name: k,
        ...v
      }))];

      const requiredBodyParams = (bodyParams.required || []);
      const ParamsTyped = allParams.map(qp => typify(qp)).join("; ");
      const RequiredParams = [...collectNames(pathParams), ...collectNames(queryParams.filter((p) => p.required)), ...requiredBodyParams];
      const QueryParams = collectNames(queryParams);
      const PathParams = collectNames(pathParams);
      const BodyParams = Object.keys(bodyParams.properties || {});

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

const SwagDef = swag(require('./build/src/paperspace-api.swagger2.json'));

console.log(SwagDef.Types.join("\n"));
console.log(makeClass(SwagDef));

function makeMethod(def) {

  const path = (def.PathParams.length) ? `this.buildPath('${def.Path}',parameters)` : `'${def.Path}'`;
  const bodyParams = (def.BodyParams.length) ? `this.pick(${J(def.BodyParams)},parameters);` : `null`;
  const queryParams = (def.QueryParams.length) ? `this.pick(${J(def.QueryParams)},parameters);` : `null`;
  const checkParams = (def.RequiredParams.length) ? `this.checkParams(${J(def.RequiredParams)},parameters)` : ``;
  const method = def.Method.toUpperCase();

  return `${def.OpId}(parameters: { ${def.ParamsTyped} }): T<${def.OpId}Response> {

  ${checkParams}
  const path = ${path};
  const bodyParams = ${bodyParams};
  const queryParams = ${queryParams};
  const method = '${method}';

  return this.request({
    path,
    method,
    bodyParams,
    queryParams
  })

}`

}

function makeClass(def) {


  return `class ${def.ClassName}<T> { 

    request(props){
      return Promise.new(rs=>rs(props));
    }
    
    pick(list: string[], params: { [key: string] : any}){
      return list.reduce((p, n) => ({ ...p,
        [n]: params[n]
      }), {});
    }
    buildPath(path: string, params: { [key: string] : any }){
      return path.split('/').map(seg => seg[0] === '{' ? params[seg.slice(1, -1)] : seg).join('/');
    }
    checkParams(list: string[], params: { [key: string ]: any }){
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