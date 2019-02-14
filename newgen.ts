import { swag } from "./swag";
import { join } from "path";
import $ from "shelljs";
import { makeClass } from "./templates/class";
import { apiHeader } from "./templates/apiHeader";
import { makeCliCommand } from "./templates/cliCommand";
import { writeFileSync } from "fs";
const SwagDef = swag(require("./swagger2.json"), "Api");

//mkdir('-p',)
//rm('-rf', '/tmp/*');
function Build() {
  const CLI_BUILD = join(__dirname, "cli-build");
  const CLI_PROTO = join(__dirname, "cli-prototype");
  const API_PATH = join(CLI_BUILD, "lib", "Api.ts");
  const CMD_PATH = join(CLI_BUILD, "commands");
  $.rm("-rf", CLI_BUILD);
  $.mkdir("-p", CLI_BUILD);
  $.cp("-R", join(CLI_PROTO, "*"), CLI_BUILD);
  Api(API_PATH);
  Cmd(CMD_PATH);
}
function Api(path: string) {
  const ApiTypes = SwagDef.Types.join("\n");
  const ApiClass = makeClass(SwagDef);
  writeFileSync(path, [apiHeader, ApiTypes, ApiClass].join("\n"));
}
function Cmd(path: string) {
  for (let method of SwagDef.Methods) {
    const filename = method.OpId + ".ts";
    const commandPath = join(path, filename);
    writeFileSync(commandPath, makeCliCommand(method));
  }
}

//writeFileSync("")

//console.log(makeCliCommand(SwagDef.Methods[0]));
//process.stdout.write(Global);
