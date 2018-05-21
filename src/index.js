exports.instantiate = function () {

  var instance = {};
  instance.combined = {};
  instance.result = {};

  // Multiple index to avoid iteration
  var flagShort = {};
  var flagLong = {};
  var valueShort = {};
  var valueLong = {};

  instance.flag = function (short, long, description) {

    var flag = {
      short: short,
      long: long,
      description: description
    };

    flagLong[long], instance.combined[long] = flag;
    if (short && short != "") {
      flagShort[short] = flag;
    }

    return instance;

  };

  instance.value = function (short, long, description, handler) {

    var value = {
      short: short,
      long: long,
      description: description,
      handler: handler
    };

    valueLong[long], instance.combined[long] = value;
    if (short && short != "") {
      valueShort[short] = value;
    }

    return instance;

  };

  instance.parse = function (args) {

    var argsArray = Array.isArray(args) ? args : spaceSplit(args);
    var values = {};
    var key;

    argsArray.forEach(function (element, index) { 

      // Match short flag
      if (flagShort[element]) {
        key = flagShort[element].long.replace(/^-+/g, "");
        values[key] = true;

      }

      // Match long flag
      else if (flagLong[element]) {
        key = element.replace(/^-+/g, "");
        values[key] = true;
      }

      // Match short value
      else if (valueShort[element]) {
        key = valueShort[element].long.replace(/^-+/g, "");
        if ((index + 1) < argsArray.length) {
          if (valueShort[element].handler) {
            values[key] = isReserved(argsArray[index + 1]) ? true : valueShort[element].handler(argsArray[index + 1]);
          } else {
            values[key] = isReserved(argsArray[index + 1]) ? true : argsArray[index + 1];
          }
        } else {
          // Value type matches with a null value will be treated as flags
          values[key] = true;
        }
      }

      // Match long value
      else if (valueLong[element]) {
        key = element.replace(/^-+/g, "");
        if ((index + 1) < argsArray.length) {
          if (valueLong[element].handler) {
            values[key] = isReserved(argsArray[index + 1]) ? true : valueLong[element].handler(argsArray[index + 1]);
          } else {
            values[key] = isReserved(argsArray[index + 1]) ? true : argsArray[index + 1];
          }
        } else {
          // Value type matches with a null value will be treated as flags
          values[key] = true;
        }
      }

    });

    instance.result = values;
    return values;
  };

  instance.printHelp = function () {
    var combinedShortKeys = Object.keys(instance.combined).sort();
    var element;

    var tabSize = 8;
    var firstPadding;
    var secondPadding;

    var shortHeader = "SHORT:" + " ".repeat((2 * tabSize) - "SHORT:".length);
    var longHeader = "LONG:" + " ".repeat((3 * tabSize) - "LONG:".length);
    var descriptionHeader = "DESCRIPTION:"

    console.log(`\n${shortHeader}${longHeader}${descriptionHeader}\n`);
    combinedShortKeys.forEach(function (key) {
      element = instance.combined[key];
      var elShort = element.short ? element.short : "";
      firstPadding = " ".repeat((2 * tabSize) - elShort.length);
      secondPadding = " ".repeat((3 * tabSize) - element.long.length);
      console.log(`${elShort}${firstPadding}${element.long}${secondPadding}${element.description}`);
    });
    console.log("");
  };

  function isReserved(value) {
    return value in flagShort || value in flagLong || value in valueShort || value in valueLong;
  }

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

  return instance;

};