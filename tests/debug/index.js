var cli = require("./../../src/index").instantiate();

var test = "test -i 'resources/**/*.*'";

function handler(value) {
  return value.split(",");
}

cli
.value("-i", "--include", "include files", handler)
.parse(test);

console.dir(cli.result);

console.log("------------------");
