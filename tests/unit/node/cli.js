const {
    suite,
    test
} = intern.getInterface("tdd");
const {
    assert
} = intern.getPlugin("chai");

var cli = require("../../../src").instantiate(); 


 
suite("cli", () => {
    test("flagShortcut", () => {
        cli.flag("-f", "--flag").parse('test -f');
        assert.strictEqual(cli.result.flag, true, "The expected output is: true");
    });
    test("flagLong", () => {
        cli.flag("-f", "--flag").parse('test --flag');
        assert.strictEqual(cli.result.flag, true, "The expected output is: true");
    });
    test("valueShortcut", () => {
        cli.value("-v", "--value").parse('test -v value');
        assert.strictEqual(cli.result.value, "value", "The expected output is: value");
    });
    test("valueLong", () => {
        cli.value("-v", "--value").parse('test --value value');
        assert.strictEqual(cli.result.value, "value", "The expected output is: value");
    });
    test("valueSentence", () => {
        cli.value("-v", "--value").parse('test -v "This is a sentence as value"');
        assert.strictEqual(cli.result.value, "This is a sentence as value", "The expected output is: This is a sentence as value");
    });
    test("handler", () => {
        function handler(value) {
            return value.split(",");
        }
        cli.value("-v", "--value", "Description", handler).parse('test -v "apple,pear,kiwi"');
        var expected = ['apple', 'pear', 'kiwi'];
        assert.strictEqual(JSON.stringify(cli.result.value), JSON.stringify(expected), "The expected output is: " + expected);
    });
    test("valueAsFlag", () => {
        cli.value("-v", "--value").parse('test -v');
        assert.strictEqual(cli.result.value, true, "The expected output is: true");
    });
    test("alltogether", () => {
        var str = "test -i hello output bye -t -f apple,pear,kiwi install";

        function handler(value) {
            return value.split(",");
        }
        cli
            .flag("-t", "--test", "test flag")
            .value("-i", "--input", "input files")
            .value("o", "output", "output files")
            .value("-f", "--fruits", "fruit list", handler)
            .value("i", "install", "install something")
            .flag("s", "start", "start something cool")
            .flag("h", "help", "shows help")
            .parse(str);
        var expected = {
            input: 'hello',
            output: 'bye',
            test: true,
            flag: true,
            fruits: ['apple', 'pear', 'kiwi'],
            install: true
        };
        assert.strictEqual(JSON.stringify(cli.result), JSON.stringify(expected), "The expected output is: " + expected);
    });
    test("multivalueShortcut", () => {
        var str = "test -i hello output bye -t -f apple,pear,kiwi install -i bye -i cheese";
        function handler(value) {
            return value.split(",");
        }
        cli
            .flag("-t", "--test", "test flag")
            .value("-i", "--input", "input files")
            .value("o", "output", "output files")
            .value("-f", "--fruits", "fruit list", handler)
            .value("i", "install", "install something")
            .flag("s", "start", "start something cool")
            .flag("h", "help", "shows help")
            .parse(str);
        var expected = {
            input: ['hello','bye','cheese'],
            output: 'bye',
            test: true,
            flag: true,
            fruits: ['apple', 'pear', 'kiwi'],
            install: true
        };
        assert.strictEqual(JSON.stringify(cli.result), JSON.stringify(expected), "The expected output is: " + expected);
    });
    test("multivalueLong", () => {
        var str = "test --input hello output bye -t -f apple,pear,kiwi install --input bye --input cheese";
        function handler(value) {
            return value.split(",");
        }
        cli
            .flag("-t", "--test", "test flag")
            .value("-i", "--input", "input files")
            .value("o", "output", "output files")
            .value("-f", "--fruits", "fruit list", handler)
            .value("i", "install", "install something")
            .flag("s", "start", "start something cool")
            .flag("h", "help", "shows help")
            .parse(str);
        var expected = {
            input: ['hello','bye','cheese'],
            output: 'bye',
            test: true,
            flag: true,
            fruits: ['apple', 'pear', 'kiwi'],
            install: true
        };
        assert.strictEqual(JSON.stringify(cli.result), JSON.stringify(expected), "The expected output is: " + expected);
    });
    test("multivalueMixed", () => {
        var str = "test -i hello output bye -t -f apple,pear,kiwi install --input bye -i cheese";
        function handler(value) {
            return value.split(",");
        }
        cli
            .flag("-t", "--test", "test flag")
            .value("-i", "--input", "input files")
            .value("o", "output", "output files")
            .value("-f", "--fruits", "fruit list", handler)
            .value("i", "install", "install something")
            .flag("s", "start", "start something cool")
            .flag("h", "help", "shows help")
            .parse(str);
        var expected = {
            input: ['hello','bye','cheese'],
            output: 'bye',
            test: true,
            flag: true,
            fruits: ['apple', 'pear', 'kiwi'],
            install: true
        };
        assert.strictEqual(JSON.stringify(cli.result), JSON.stringify(expected), "The expected output is: " + expected);
    });

});