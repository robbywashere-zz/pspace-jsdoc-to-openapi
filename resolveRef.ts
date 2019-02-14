export const resolveRef = (node: { [key: string]: any }, ref: string = "") => {
  for (let path of ref.split("/").slice(1)) {
    node = node[path];
  }
  return node;
};
