var cli = require("./../../src/index").instantiate();

// var test = "test -i 'resources/**/*.*'";

// function handler(value) {
//   return value.split(",");
// }

// cli
// .value("-i", "--include", "include files", handler)
// .parse(test);

// console.dir(cli.result);

// console.log("------------------");


// var test = 'test -c "hola"';
var test = 'test -c -f -p pepe';

cli.value("-c","--command").parse(test);
cli.value("-p","--pep").parse(test);
cli.flag("-f","--flag").parse(test);

console.log("RESULT",cli.result);
