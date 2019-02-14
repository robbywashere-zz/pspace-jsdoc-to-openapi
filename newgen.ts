import { swag } from "./swag";
import { join } from "path";
import { makeCliCommand } from "./templates/cliCommand";
import $ from "shelljs";

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

const SwagDef = swag(require("./swagger2.json"), "Api");

//mkdir('-p',)
//rm('-rf', '/tmp/*');
const CLI_DIR = join(__dirname, "cli-build");
console.log(CLI_DIR);
//console.log(makeCliCommand(SwagDef.Methods[0]));
//process.stdout.write(Global);
//process.stdout.write(SwagDef.Types.join("\n"));
//process.stdout.write(makeClass(SwagDef));
