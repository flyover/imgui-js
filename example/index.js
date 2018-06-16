/// @ts-check
/// <reference types="node"/>

const fs = require('fs');
const Response = require('node-fetch').Response;

global["fetch"] = (url) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(url)) {
      reject(`File not found: ${url}`);
    }
    const readStream = fs.createReadStream(url);
    readStream.on('open', function () {
      resolve(new Response(readStream, {
        status: 200,
        statusText: 'OK'
      }));
    });
  });
};

process.chdir(__dirname);

global["SystemJS"] = require("systemjs");

module.require("./system.config");

SystemJS.import("./main")
.then(function (main) { main.default(); })
.catch(console.error);
