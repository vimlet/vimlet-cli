<p align='center'>
<img src='https://vimlet.com/resources/img/cli-txt.png' title='Vimlet Cli' alt='Vimlet Cli' height="150">
</p>

Command line interface for node.js. The easiest way to handle your application from console.

## Installation

`npm install @vimlet/cli`

## How to use

`var cli = require("@vimlet/cli").instantiate();`


 **vimlet-cli** accepts flags and values: 
* flag: Commands which don't have value, like a boolean option. `flag("shorcut", "flagName", "description")`
* value: Commands that will have a value. `value("shorcut", "valueName", "description")`

IE:

```[javascript]
cli
.flag("w", "windows", "This flag will set the platform as windows")
.value("e", "extension", "This value will tell the extension of the output file")
.flag("h", "--help", "Shows help")
.parse(arg);
```

* `parse()` must be called at the end to parse the arguments.
* `arg` arguments is a string that can be taken from console or wherever the user wants.

As an example call: `example w e exe` => This will set the platform as windows and the extension to exe.


> Value also accept a handler as last param

> `value("t", "--test", "test handler", function(value){return value.split(",");})`

> In the example above, test data will be splitted by comas.

- `cli.printHelp();` Is a default function to print help in the console like:

|Shortcut|Name|Description|
|---|---|---|
|h|help|Print help|

## Documentation 

[vimlet cli documentation](https://vimlet.com/vimlet/vimlet-cli/master/docs/release/index.html)

## License
Vimlet Cli is released under MIT License. See [LICENSE](https://github.com/vimlet/vimlet-cli/blob/master/LICENSE) for details.

