(function() {
    'use strict';

    module.exports = window.ModuleA = {

        myFunction: function() {
            require.ensure([], () => {
                const ModuleB = require("./ModuleB").ModuleB;
                ModuleB.testFunction();

                const ModuleC = require("./ModuleC");
                ModuleC.myFunction();
            }, "chunk2");
        }
    };
    return window.ModuleA;
}());
