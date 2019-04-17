var cli = require("./../src/index").instantiate();

thisArg = "vcomet-cli install";

cli
.value("i", "install", "Installs vcomet or dependency")
.value("p", "path", "Specifies dependency path")
.value(null, "clear", "Removes various elements")
.flag(null, "init", "Initialize a vComet project")
.flag(null, "prune", "Removes unused dependencies")
.flag(null, "--no-save", "Prevents vcomet.json generation")
.flag(null, "help", "Display this help")
.parse(thisArg);

console.dir(cli.result);
