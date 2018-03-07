exports.instantiate = function() {

  var instance = {};
  instance.combined = {};
  instance.result = {};

  // Multiple index to avoid iteration
  var flagShort = {};
  var flagLong = {};
  var valueShort = {};
  var valueLong = {};
    
  instance.flag = function (short, long, description) {
  
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
  
    instance.combined[short] = {
      short: short,
      long: long,
      description: description
    }
  
    return instance;
  
  };
  
  instance.value = function (short, long, description, handler) {
  
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
  
    instance.combined[short] = {
      short: short,
      long: long,
      description: description
    }
  
    return instance;
  
  };
  
  instance.parse = function (args) {
  
    var argsArray = Array.isArray(args)? args : spaceSplit(args);
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
        } else {
          // Value type matches with a null value will be treated as flags
          values[key] = true;
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
        } else {
          // Value type matches with a null value will be treated as flags
          values[key] = true;
        }
      }
  
    });
  
    instance.result = values;
    return values;
  };
  
  instance.printHelp = function() {
    var combinedShortKeys = Object.keys(instance.combined).sort(); 
    var element; 

    var tabSize = 8;   
    var firstPadding;
    var secondPadding;

    var shortHeader = "SHORT:" + " ".repeat((2 * tabSize) - "SHORT:".length);
    var longHeader ="LONG:" + " ".repeat((3 * tabSize) - "LONG:".length);
    var descriptionHeader = "DESCRIPTION:"

    console.log(`\n${shortHeader}${longHeader}${descriptionHeader}\n`);
    combinedShortKeys.forEach(function(key){
      element = instance.combined[key];
      firstPadding =  " ".repeat((2 * tabSize) - element.short.length);
      secondPadding =  " ".repeat((3 * tabSize) - element.long.length);    
      console.log(`${element.short}${firstPadding}${element.long}${secondPadding}${element.description}`);
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

  return instance;

};




