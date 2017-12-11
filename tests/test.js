var cli = require("./../src/index").instantiate();

var test = "test -i hello output bye -t -f apple,pear,kiwi";

function handler(value) {
  return value.split(",");
}

cli
.flag("-t", "--test", "test flag")
.value("-i", "--input", "input files")
.value("o", "output", "output files")
.value("-f", "--fruits", "fruit list", handler)
.parse(test);

// console.dir(cli.result);
cli.printHelp();