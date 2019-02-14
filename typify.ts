export function typify(spec, reqParams?: string[]) {
  return walk(null, spec, new Set(reqParams));

  function walk(name, prop, req = new Set()) {
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
        return (declaration += Enum.map(val => '"' + val + '"').join("|"));
      return (declaration += type);
    }
    return declaration;
  }
}
