export function locate<T extends "body" | "query" | "path">(where: T) {
  return ({ in: location }: { in: string }) => location === where;
}

export function J(str: TemplateStringsArray, ...keys: object[]): string {
  return str
    .reduce<string[]>((p, n, i) => [...p, n, JSON.stringify(keys[i])], [])
    .join("");
}

export const collectNames = (list: { name: string }[]) =>
  list.reduce((p, { name }) => [...p, name], [] as string[]);

export const resolveRef = (node: { [key: string]: any }, ref: string = "") => {
  for (let path of ref.split("/").slice(1)) {
    node = node[path];
  }
  return node;
};

export function typify(spec: any, reqParams?: string[]) {
  return walk(null, spec, new Set(reqParams));

  function walk(name: string | null, prop: any, req = new Set()) {
    const { name: propName, type, items, required = [], properties } = prop;
    const Enum = prop.enum;
    name = propName ? propName : name;
    let R =
      (typeof required === "boolean" && required) || req.has(name) ? "" : "?";
    let declaration = name ? `${name}${R}: ` : "";
    if (type === "array") {
      declaration += `Array<${walk(null, items)}>`;
    } else if (type === "object") {
      const propNames = Object.keys(properties);
      declaration += `{ 
        `;
      for (let propName of propNames) {
        declaration += `${walk(
          propName,
          properties[propName],
          new Set(required)
        )}; 
        `;
      }
      declaration += `}`;
    } else {
      //assume string enum
      if (Enum)
        return (declaration += Enum.map((val: string) => '"' + val + '"').join(
          "|"
        ));
      return (declaration += type);
    }
    return declaration;
  }
}
