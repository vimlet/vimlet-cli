// Multiple index to avoid iteration
var flagShort = {};
var flagLong = {};
var valueShort = {};
var valueLong = {};
var combinedShort = {};

exports.values = {};

exports.flag = function (short, long, description) {

  flagShort[short] = {
    short: short,
    long: long,
    description: description
  }

  flagLong[long] = {
    short: short,
    long: long,
    description: description
  }

  combinedShort[short] = {
    short: short,
    long: long,
    description: description
  }

  return exports;

};

exports.value = function (short, long, description, handler) {

  valueShort[short] = {
    short: short,
    long: long,
    description: description,
    handler: handler
  }

  valueLong[long] = {
    short: short,
    long: long,
    description: description,
    handler: handler
  }

  combinedShort[short] = {
    short: short,
    long: long,
    description: description
  }

  return exports;

};

exports.process = function (args) {

  var argsArray = spaceSplit(args);
  var values = {};
  var key;

  argsArray.forEach(function (element, index) {

    // Match short flag
    if (flagShort[element]) {
      key = flagShort[element].long.replace(/^-+/g, "");
      values[key] = true;

    }

    // Match long flag
    if (flagLong[element]) {
      key = element.replace(/^-+/g, "");
      values[key] = true;
    }

    // Match short value
    if (valueShort[element]) {
      key = valueShort[element].long.replace(/^-+/g, "");
      if ((index + 1) < argsArray.length) {
        if (valueShort[element].handler) {
          values[key] = valueShort[element].handler(argsArray[index + 1]);
        } else {
          values[key] = argsArray[index + 1];
        }
      }
    }

    // Match long value
    if (valueLong[element]) {
      key = element.replace(/^-+/g, "");
      if ((index + 1) < argsArray.length) {
        if (valueLong[element].handler) {
          values[key] = valueLong[element].handler(argsArray[index + 1]);
        } else {
          values[key] = argsArray[index + 1];
        }
      }
    }

  });

  exports.values = values;
  return values;
};

exports.printHelp = function() {
  var combinedShortKeys = Object.keys(combinedShort).sort(); 
  var element; 
  console.log("\nSHORT: \t\t LONG: \t\t\t\t DESCRIPTION:\n")
  combinedShortKeys.forEach(function(key){
    element = combinedShort[key];
    console.log(`${element.short} \t\t ${element.long} \t\t\t ${element.description}`)
  });
  console.log("");
};

function spaceSplit(s) {
  var split = s.split(/("[^"]*"|'[^']*'|[\S]+)+/g);
  var result = [];
  split.forEach(function (value) {
    if (value.trim() != "") {
      result.push(value);
    }
  });
  return result;
}


