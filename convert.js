  const swaggerConverter = require("api-spec-converter");
(function main(){
  let swagger2 = await swaggerConverter
    .convert({
      to: "openapi_3",
      from: "swagger_2",
      source: process.argv[2]
    })
    .then(converted => converted.stringify());

  prcoess.stdout.write(swagger)
})()
