/// <reference types="node"/>

process.chdir(__dirname);

global.SystemJS = require("systemjs");

[ "fs", "path" ].forEach(function (id) {
    SystemJS.set(id, SystemJS.newModule(require(id)));    
});

SystemJS.config({
    packages: {
        "./bind-imgui": {
            main: "../bind-imgui.js",
            format: "global",
            defaultExtension: 'js',
            meta: { "../bind-imgui.js": { exports: "Module" } }
        },
        "..": { defaultExtension: "js" },
        ".": { defaultExtension: "js" }
    }
});

SystemJS.import("./main")
.then(function (main) { main.default(); })
.catch(console.error);
