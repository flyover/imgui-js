/// @ts-check
/// <reference types="node"/>

process.chdir(__dirname);

global["SystemJS"] = require("systemjs");

module.require("./system.config");

SystemJS.import("./main")
.then(function (main) { main.default(); })
.catch(console.error);
