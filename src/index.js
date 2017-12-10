var flagShort = {};
var flagLong = {};
var valueShort = {};
var valueLong = {};

var values = {};

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

  return exports;

};

exports.process = function (args) {

  var argsArray = spaceSplit(args);
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
        if(valueShort[element].handler) {
          values[key] = valueShort[element].handler(argsArray[index + 1]);
        }else {
          values[key] = argsArray[index + 1];
        }
      }
    }

    // Match long value
    if (valueLong[element]) {
      key = element.replace(/^-+/g, "");
      if ((index + 1) < argsArray.length) {
        if(valueLong[element].handler) {
          values[key] = valueLong[element].handler(argsArray[index + 1]);
        }else {
          values[key] = argsArray[index + 1];
        }
      }
    }

  });

  console.dir(values);

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


