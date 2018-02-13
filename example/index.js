/// @ts-check
/// <reference types="node"/>

process.chdir(__dirname);

global["SystemJS"] = require("systemjs");

SystemJS.config({
    paths: {
        "imgui-js": "..",
    },
    packages: {
        "imgui-js": {
            main: "imgui.js",
            defaultExtension: 'js',
            meta: { "bind-imgui.js": { exports: "Module" } }
        }
    }
});

SystemJS.import("./main")
.then(function (main) { main.default(); })
.catch(console.error);
