/// @ts-check
/// <reference types="node"/>

const path = require('path');

global["__filename"] = module.filename;
global["__dirname"] = path.dirname(module.filename);

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    if (!fs.existsSync(url)) {
      reject(`File not found: ${url}`);
    }
    const readStream = fs.createReadStream(url);
    readStream.on('open', function () {
      const Response = require('node-fetch').Response;
      resolve(new Response(readStream, {
        status: 200,
        statusText: 'OK'
      }));
    });
  });
};
global["fetch"] = fetch;

process.chdir(__dirname);

module.require("@flyover/system");

module.require("./system.config.js");

System.import("main")
.then(function (main) { main.default(); })
.catch(console.error);
