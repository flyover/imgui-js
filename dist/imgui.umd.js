(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ImGui = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // resolves . and .. elements in a path array with directory names there
    // must be no slashes, empty elements, or device names (c:\) in the array
    // (so also no leading and trailing slashes - it does not distinguish
    // relative and absolute paths)
    function normalizeArray(parts, allowAboveRoot) {
      // if the path tries to go above the root, `up` ends up > 0
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === '.') {
          parts.splice(i, 1);
        } else if (last === '..') {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }

      // if the path is allowed to go above the root, restore leading ..s
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift('..');
        }
      }

      return parts;
    }

    // Split a filename into [root, dir, basename, ext], unix version
    // 'root' is just a slash, or nothing.
    var splitPathRe =
        /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    var splitPath = function(filename) {
      return splitPathRe.exec(filename).slice(1);
    };

    // path.resolve([from ...], to)
    // posix version
    function resolve() {
      var resolvedPath = '',
          resolvedAbsolute = false;

      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = (i >= 0) ? arguments[i] : '/';

        // Skip empty and invalid entries
        if (typeof path !== 'string') {
          throw new TypeError('Arguments to path.resolve must be strings');
        } else if (!path) {
          continue;
        }

        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = path.charAt(0) === '/';
      }

      // At this point the path should be resolved to a full absolute path, but
      // handle relative paths to be safe (might happen when process.cwd() fails)

      // Normalize the path
      resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
        return !!p;
      }), !resolvedAbsolute).join('/');

      return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
    }
    // path.normalize(path)
    // posix version
    function normalize(path) {
      var isPathAbsolute = isAbsolute(path),
          trailingSlash = substr(path, -1) === '/';

      // Normalize the path
      path = normalizeArray(filter(path.split('/'), function(p) {
        return !!p;
      }), !isPathAbsolute).join('/');

      if (!path && !isPathAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }

      return (isPathAbsolute ? '/' : '') + path;
    }
    // posix version
    function isAbsolute(path) {
      return path.charAt(0) === '/';
    }

    // posix version
    function join() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return normalize(filter(paths, function(p, index) {
        if (typeof p !== 'string') {
          throw new TypeError('Arguments to path.join must be strings');
        }
        return p;
      }).join('/'));
    }


    // path.relative(from, to)
    // posix version
    function relative(from, to) {
      from = resolve(from).substr(1);
      to = resolve(to).substr(1);

      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== '') break;
        }

        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== '') break;
        }

        if (start > end) return [];
        return arr.slice(start, end - start + 1);
      }

      var fromParts = trim(from.split('/'));
      var toParts = trim(to.split('/'));

      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }

      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
      }

      outputParts = outputParts.concat(toParts.slice(samePartsLength));

      return outputParts.join('/');
    }

    var sep = '/';
    var delimiter = ':';

    function dirname(path) {
      var result = splitPath(path),
          root = result[0],
          dir = result[1];

      if (!root && !dir) {
        // No dirname whatsoever
        return '.';
      }

      if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.substr(0, dir.length - 1);
      }

      return root + dir;
    }

    function basename(path, ext) {
      var f = splitPath(path)[2];
      // TODO: make this comparison case-insensitive on windows?
      if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
      }
      return f;
    }


    function extname(path) {
      return splitPath(path)[3];
    }
    var require$$0 = {
      extname: extname,
      basename: basename,
      dirname: dirname,
      sep: sep,
      delimiter: delimiter,
      relative: relative,
      join: join,
      isAbsolute: isAbsolute,
      normalize: normalize,
      resolve: resolve
    };
    function filter (xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
        }
        return res;
    }

    // String.prototype.substr - negative index don't work in IE8
    var substr = 'ab'.substr(-1) === 'b' ?
        function (str, start, len) { return str.substr(start, len) } :
        function (str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
        }
    ;

    var require$$1 = {};

    var bindImgui = createCommonjsModule(function (module, exports) {
    var Module = (function() {
      var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
      if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
      return (
    function(Module) {
      Module = Module || {};

    var Module=typeof Module!=="undefined"?Module:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject;});var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readBinary;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require$$0.dirname(scriptDirectory)+"/";}else {scriptDirectory=__dirname+"/";}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require$$1;if(!nodePath)nodePath=require$$0;filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/");}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status);};Module["inspect"]=function(){return "[Emscripten Module object]"};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)};}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs;}else if(typeof arguments!="undefined"){arguments_=arguments;}if(typeof quit==="function"){quit_=function(status){quit(status);};}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(document.currentScript){scriptDirectory=document.currentScript.src;}if(_scriptDir){scriptDirectory=_scriptDir;}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1);}else {scriptDirectory="";}{read_=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}};}}}else;var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){abort("no native wasm support detected");}var wasmMemory;var wasmTable=new WebAssembly.Table({"initial":926,"maximum":926,"element":"anyfunc"});var ABORT=false;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else {var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else {u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else {var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4;}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else {var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0||i==maxBytesToRead/2)return str;++i;str+=String.fromCharCode(codeUnit);}}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2;}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}else {str+=String.fromCharCode(utf32);}}return str}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023;}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4;}return len}var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf);}var INITIAL_INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"];}else {wasmMemory=new WebAssembly.Memory({"initial":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE});}if(wasmMemory){buffer=wasmMemory.buffer;}INITIAL_INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function initRuntime(){callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what);}what+="";err(what);ABORT=true;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return hasPrefix(filename,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(filename){return hasPrefix(filename,fileURIPrefix)}var wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABpgulAWACf38AYAF/AGACf38Bf2ABfwF/YAAAYAN/f38Bf2ADf39/AGAEf39/fwF/YAR/f39/AGAAAX9gBn9/f39/fwF/YAd/f39/f39/AX9gBX9/f39/AX9gBX9/f39/AGAGf39/f39/AGACf38BfWAHf39/f39/fwBgCH9/f39/f39/AX9gAAF9YAF/AX1gAn99AGABfQBgBn9/f39/fQBgA39/fQBgBX9/f399AGAEf39/fQBgBX9/fX9/AGABfQF9YAV/f399fwBgBn19fX9/fwBgCn9/f39/f39/f38AYAd/f39/f399AGAFf35+fn4AYAl/f39/f39/f38Bf2ADf399AX9gA39+fwF+YAJ/fQF9YAJ9fQF9YAh/f39/f39/fwBgCX9/f39/f39/fwBgC39/f39/f39/f39/AGAJf39/f39/f31/AGAGf39/f31/AGAEf399fwBgBH9/fX0AYAN/fX8AYAR/fX9/AGAIf39/fX9/f30Bf2AIf39/f39/fX8AYAd/f39/fX99AGAGf39/fX9/AGAFf39/fX0AYAZ/f31/f38AYAZ/f31/f30AYAZ/f319fX8AYAh/f319fX9/fwBgA31/fwBgAn19AGAHf39/f39/fQF/YAZ/f31/f38Bf2AGf399fX99AX9gB39/fX19f30Bf2AGf398fH9/AX9gA399fQF/YAN/f38BfWACfHwBfGAHf39/f319fwBgCH9/fX9/f31/AGAEf35+fwBgA399fQBgAn99AX9gAn5+AX5gA319fQF9YAF/AXxgB39/f319f38AYAp/f39/f39/f39/AX9gCH9/f39/f399AX9gCX9/f39/f31/fwF/YAl/f39+fn99f38Bf2AEf39/fQF/YAZ/f399f38Bf2AFf399f38Bf2AEf399fQF/YAZ/fX9/f30Bf2AEf31/fQF/YAZ/fX5+f30Bf2AFf319fX0Bf2AGf3x/f39/AX9gAn5/AX9gAXwBf2ACf38BfmADfn5+AX5gAXwBfWAAAXxgAnx/AXxgDH9/f39/f39/f39/fwBgDX9/f39/f39/f39/f38AYAp/f39/f39/f31/AGAIf39/f39/f30AYAl/f39/f399fX8AYAd/f39/f31/AGAIf39/f399f30AYAh/f39/f319fwBgCH9/f399fX9/AGAHf39/fX9/fwBgCX9/f31/f399fwBgB39/f31/f30AYAd/f399f31/AGAHf39/fX19fwBgB39/f319fX0AYAN/f34AYAp/f31/f39/f31/AGAJf399f39/f31/AGAIf399fX9/f38AYAp/f319fX19fX1/AGALf399fX19fX19fX0AYAx/f319fX19fX19fX8AYAN/f3wAYAJ/fgBgA39+fgBgB399fX1/f38AYAd/fX19fX19AGALf319fX19fX19fX8AYAJ/fABgCn9/f39/f399f38Bf2AJf39/f31/f399AX9gBX9/f31/AX9gCH9/f31/f39/AX9gB39/f319f30Bf2AJf39/fX1/fX9/AX9gCX9/f319fX9/fQF/YAd/f398fH9/AX9gCX9/f3x8f31/fwF/YAR/f31/AX9gBX9/fX99AX9gBn9/fX1/fwF/YAh/f319fX9/fwF/YAR/fX9/AX9gBX99f399AX9gBn99fX1/fQF/YAZ/fXx8f30Bf2ADfn9/AX9gAn5+AX9gA35+fgF/YAR+fn5+AX9gAn1/AX9gAn19AX9gBH19fX0Bf2ABfwF+YAJ/fgF+YAR/f399AX1gBX9/f319AX1gBH99fX0BfWACfn4BfWAEfn5+fQF9YAV+fn59fQF9YAJ9fwF9YAR9fX19AX1gBX19fX19AX1gBXx8fH19AX1gA39/fwF8YAJ/fAF8YAJ+fgF8YAN8fH0BfGADfHx8AXwCkQIsAWEBYwAeAWEBZAAOAWEBZQAmAWEBZgACAWEBZwCgAQFhAWgAYAFhAWkABgFhAWoADQFhAWsAAgFhAWwACAFhAW0ABgFhAW4ADgFhAW8AAgFhAXAAAQFhAXEABgFhAXIAAQFhAXMAAwFhAXQABwFhAXUABQFhAXYABgFhAXcAAAFhAXgAdQFhAXkAAgFhAXoAAwFhAUEADAFhAUIAAQFhAUMABQFhAUQAAwFhAUUABAFhAUYABwFhAUcABQFhAUgABQFhAUkAAAFhAUoADQFhAUsAAAFhAUwACQFhAU0AAwFhAU4ABwFhAU8AAQFhAVAABgFhAVEAAwFhAVIACQFhAWECAYACgAIBYQFiAXAAngcDoRT7Ez8BAwADBlYlABMDAQlGBgEDAgUDBQMlFwAGAwMBAwIBGwMbAQAFAwNWAwUCAwACACACBwJIGDkCAwYJJQMD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EN4CBEAgACgCAA8LIAALHQAgACABKgIAIAIqAgCSIAEqAgQgAioCBJIQKhoLIAAgACAEOAIMIAAgAzgCCCAAIAI4AgQgACABOAIAIAALDAAgACABIAAgAWAbCwsAIAEgABA0EJQUCzcBAXwCfUP//39/IAAQ9AUiAUQAAADg///vR2YNABpD//9//yABRAAAAOD//+/HZQ0AGiABtgsLCwAgAEIANwIAIAALHQEBfyAAEN4CBEAgACgCACEBIAAQ3QUaIAEQTQsLGAEBf0GQtgMoAgAoAqwzIgBBAToAfCAAC1oBAn8jAEEQayICJAAgAkGQtgMoAgAiA0GYKmogAEEEdGoiACkCtAE3AwggAiAAKQKsATcDACACIAIqAgwgAyoCmCogAZSUOAIMIAIQtgMhACACQRBqJAAgAAsdACAAIAEqAgAgAioCAJMgASoCBCACKgIEkxAqGgsSACAAQdTkAjYCACAAQQRqEDULFgAgACgCEBBQBH9BAAUgAEEEahAuCwsUACAAIAEQ2w0gAEG84wI2AgAgAAsYACAAIAEpAgA3AgAgACACKQIANwIIIAALJgEBfyMAQRBrIgEkACABIAA2AgwgAUEMahAsIQAgAUEQaiQAIAALggQBA38gAkGABE8EQCAAIAEgAhAaGiAADwsgACACaiEDAkAgACABc0EDcUUEQAJAIAJBAUgEQCAAIQIMAQsgAEEDcUUEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA08NASACQQNxDQALCwJAIANBfHEiBEHAAEkNACACIARBQGoiBUsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYCMCACIAEoAjQ2AjQgAiABKAI4NgI4IAIgASgCPDYCPCABQUBrIQEgAkFAayICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ACwwBCyADQQRJBEAgACECDAELIANBfGoiBCAASQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAiAB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A3AiBFANACAEIAApA3hCf4V8IgQgASAAKAIEIgNrrFkNACAAIAMgBKdqNgJoDAELIAAgATYCaAsCQCABRQRAIAAoAgQhAAwBCyAAIAApA3ggASAAKAIEIgBrQQFqrHw3A3gLIABBf2oiAC0AACACRwRAIAAgAjoAAAsgAgsZACAAIAEgAhAqGiAAQQhqIAMgBBAqGiAACwcAIABBCGoL4wEBA39BkLYDKAIAIgQoAqwzIQMCQCABRQ0AIAMgAygCvAIgAygCtAJyNgK8AiABIAQoArg1RwRAIAQtAJg2RQ0BCyAEKAK0NSIFKAKEBiADKAKEBkcNACADIAVHBEAgBSgCCCADKAIIckGAgIAEcUUNAQsgAyACIAAgAhsgARDsEAsgAyABNgKIAiADIAApAgA3ApACIAMgAEEIaiICKQIANwKYAiADQQA2AowCIARBADYC6DQCQCAAIAEQ4gUiAQ0AIAAgAkEBEJUDRQ0AIAMgAygCjAJBAXI2AowCCyABQQFzCxkAIAEgAEHEA2oQcCgCABDzASIAEJ8CIAALJQAgAEP//39/Q///f38QKhogAEEIakP//3//Q///f/8QKhogAAsNACAAQdgAaiABEKECCwsAIAAgATYCACAACyIBAX8jAEEQayICJAAgAiABNgIMIAAgARDrAiACQRBqJAALngsCBX8PfiMAQeAAayIFJAAgAkIghiABQiCIhCEPIARCL4YgA0IRiIQhDSAEQv///////z+DIg5CD4YgA0IxiIQhECACIASFQoCAgICAgICAgH+DIQogAkL///////8/gyILQiCIIREgDkIRiCESIARCMIinQf//AXEhBwJAAn8gAkIwiKdB//8BcSIJQX9qQf3/AU0EQEEAIAdBf2pB/v8BSQ0BGgsgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhCgwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEKIAMhAQwCCyABIAxCgICAgICAwP//AIWEUARAIAIgA4RQBEBCgICAgICA4P//ACEKQgAhAQwDCyAKQoCAgICAgMD//wCEIQpCACEBDAILIAMgAkKAgICAgIDA//8AhYRQBEAgASAMhCECQgAhASACUARAQoCAgICAgOD//wAhCgwDCyAKQoCAgICAgMD//wCEIQoMAgsgASAMhFAEQEIAIQEMAgsgAiADhFAEQEIAIQEMAgsgDEL///////8/WARAIAVB0ABqIAEgCyABIAsgC1AiBht5IAZBBnStfKciBkFxahCMASAFKQNYIgtCIIYgBSkDUCIBQiCIhCEPIAtCIIghEUEQIAZrIQYLIAYgAkL///////8/Vg0AGiAFQUBrIAMgDiADIA4gDlAiCBt5IAhBBnStfKciCEFxahCMASAFKQNIIgJCD4YgBSkDQCIDQjGIhCEQIAJCL4YgA0IRiIQhDSACQhGIIRIgBiAIa0EQagshBiANQv////8PgyICIAFC/////w+DIgF+IhMgA0IPhkKAgP7/D4MiAyAPQv////8PgyIMfnwiBEIghiIOIAEgA358Ig0gDlStIAIgDH4iFSADIAtC/////w+DIgt+fCIUIBBC/////w+DIg4gAX58IhAgBCATVK1CIIYgBEIgiIR8IhMgAiALfiIWIAMgEUKAgASEIg9+fCIDIAwgDn58IhEgASASQv////8Hg0KAgICACIQiAX58IhJCIIZ8Ihd8IQQgByAJaiAGakGBgH9qIQYCQCALIA5+IhggAiAPfnwiAiAYVK0gAiABIAx+fCIMIAJUrXwgDCAUIBVUrSAQIBRUrXx8IgIgDFStfCABIA9+fCABIAt+IgsgDiAPfnwiASALVK1CIIYgAUIgiIR8IAIgAUIghnwiASACVK18IAEgEiARVK0gAyAWVK0gESADVK18fEIghiASQiCIhHwiAyABVK18IAMgEyAQVK0gFyATVK18fCICIANUrXwiAUKAgICAgIDAAINQRQRAIAZBAWohBgwBCyANQj+IIQMgAUIBhiACQj+IhCEBIAJCAYYgBEI/iIQhAiANQgGGIQ0gAyAEQgGGhCEECyAGQf//AU4EQCAKQoCAgICAgMD//wCEIQpCACEBDAELAn4gBkEATARAQQEgBmsiB0GAAU8EQEIAIQEMAwsgBUEwaiANIAQgBkH/AGoiBhCMASAFQSBqIAIgASAGEIwBIAVBEGogDSAEIAcQhAMgBSACIAEgBxCEAyAFKQMwIAUpAziEQgBSrSAFKQMgIAUpAxCEhCENIAUpAyggBSkDGIQhBCAF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KgL8ASAFvhAxOAL4ASABQQhqIAIQ3QEgAUEIakMAAAAAEHwgAkEAQQAQVBoCQAJAAkACQAJAAkAgBCgC0DMiByADKAIkRwRAIAQoAtQzIAdGIAdBAEdxIQIgAy0AKA0DIAQtAIA0IQUgAkUNASAFQQBHIQYMBAsgAy0AKA0EIAQtAIA0DQEMBAsgBUUNAwsgACAEKAL8MzYCiAJBASEGDAILIAJFDQELIAAgBzYCiAIgACABKQMYNwKYAiAAIAEpAxA3ApACIABBjAJqIgUoAgAhAiAELQDgMwRAIAAgAkEUcjYCjAIgBkUNAyACQQRyIQIMAgsgACACQRByNgKMAiAGRQ0CDAELIAAgASkDEDcCkAIgACABKQMYNwKYAiAAQYwCaiIFIAAoAowCIgJBEHI2AgAgBkUNAQsgBCgC0DMgBCgC/DNGDQAgBSACQTByNgIACyAIEIEBIAFBIGokAAvYCQIEfwR+IwBB8ABrIgUkACAEQv///////////wCDIQoCQAJAIAFCf3wiC0J/USACQv///////////wCDIgkgCyABVK18Qn98IgtC////////v///AFYgC0L///////+///8AURtFBEAgA0J/fCILQn9SIAogCyADVK18Qn98IgtC////////v///AFQgC0L///////+///8AURsNAQsgAVAgCUKAgICAgIDA//8AVCAJQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQQgASEDDAILIANQIApCgICAgICAwP//AFQgCkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEEDAILIAEgCUKAgICAgIDA//8AhYRQBEBCgICAgICA4P//ACACIAEgA4UgAiAEhUKAgICAgICAgIB/hYRQIgYbIQRCACABIAYbIQMMAgsgAyAKQoCAgICAgMD//wCFhFANASABIAmEUARAIAMgCoRCAFINAiABIAODIQMgAiAEgyEEDAILIAMgCoRQRQ0AIAEhAyACIQQMAQsgAyABIAMgAVYgCiAJViAJIApRGyIHGyEKIAQgAiAHGyILQv///////z+DIQkgAiAEIAcbIgJCMIinQf//AXEhCCALQjCIp0H//wFxIgZFBEAgBUHgAGogCiAJIAogCSAJUCIGG3kgBkEGdK18pyIGQXFqEIwBIAUpA2ghCSAFKQNgIQpB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AgALEJ0FCwtsAQN+IAAgAkIgiCIDIAFCIIgiBH5CAHwgAkL/////D4MiAiABQv////8PgyIBfiIFQiCIIAIgBH58IgJCIIh8IAEgA34gAkL/////D4N8IgFCIIh8NwMIIAAgBUL/////D4MgAUIghoQ3AwALRAICfwF+IAAgATcDcCAAIAAoAggiAiAAKAIEIgNrrCIENwN4IAFQIAQgAVdyRQRAIAAgAyABp2o2AmgPCyAAIAI2AmgLSwECfCAAIACiIgEgAKIiAiABIAGioiABRKdGO4yHzcY+okR058ri+QAqv6CiIAIgAUSy+26JEBGBP6JEd6zLVFVVxb+goiAAoKC2C08BAXwgACAAoiIARIFeDP3//9+/okQAAAAAAADwP6AgACAAoiIBREI6BeFTVaU/oqAgACABoiAARGlQ7uBCk/k+okQnHg/oh8BWv6CioLYLIAEBfyAAQQBOBH9BkLYDKAIAIABqLQD8AUEARwUgAQsLMwEBfyMAQRBrIgMkACAAKAIAIANBCGogARDPBSIAKAIAIAIoAgAQCiAAECsgA0EQaiQACzMBAX8jAEEQayIDJAAgACABKAIAIANBCGogAhDPBSIAKAIAEAwQWBogABArIANBEGokAAsZACAAKAIAIAE2AgAgACAAKAIAQQhqNgIACx0AIAAgASoCCCABKgIAkyABKgIMIAEqAgSTECoaC8ABAQJ/QZC2AygCACICIAIoAtAzIgMgAEc6ANwzAkAgACADRg0AIAJBADsB3jMgAkEANgLYMyAARQ0AIAJBADYCjDQgAiAANgKINAsgAkIANwLkMyACIAA2AtAzIAIgATYC9DMgAkEAOgDdMyACQQA6AOAzIAAEQCACIAA2AtQzQQIhAQJAIAIoArw1IABGDQAgAigCyDUgAEYNACACKALMNSAARg0AQQJBASACKALQNSAARhshAQsgAiABNgL4MwsLRAICfwF8IwBBEGsiASQAIAAoAgBB+NgCKAIAIAFBBGoQBCEDIAEgASgCBBBYIQAgAxCEAiECIAAQngEgAUEQaiQAIAILHgAgACAAKAJgIAAoAlggASACIAMQ9AQgAEEANgJYCzcBAX8jAEEQayIDJAAgACgCACEAIANBCGogAhAtIAEgA0EIaiAAEQAAIANBCGoQKyADQRBqJAALNQEBfyMAQRBrIgIkACAC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aiICKAIQIgUNAAsgAiAHNgIQCyAHIAE2AhggByAHNgIMIAcgBzYCCAwBCyABKAIIIgAgBzYCDCABIAc2AgggB0EANgIYIAcgATYCDCAHIAA2AggLIANBCGohAAwBCwJAIAlFDQACQCABKAIcIgBBAnRB0M4EaiICKAIAIAFGBEAgAiADNgIAIAMNAUGkzAQgCkF+IAB3cTYCAAwCCyAJQRBBFCAJKAIQIAFGG2ogAzYCACADRQ0BCyADIAk2AhggASgCECIABEAgAyAANgIQIAAgAzYCGAsgASgCFCIARQ0AIAMgADYCFCAAIAM2AhgLAkAgBEEPTQRAIAEgBCAFaiIAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEDAELIAEgBUEDcjYCBCALIARBAXI2AgQgBCALaiAENgIAIAgEQCAIQQN2IgNBA3RByMwEaiEAQbTMBCgCACECAn9BASADdCIDIAZxRQRAQaDMBCADIAZyNgIAIAAMAQsgACgCCAshAyAAIAI2AgggAyACNgIMIAIgADYCDCACIAM2AggLQbTMBCALNgIAQajMBCAENgIACyABQQhqIQALIAxBEGokACAACx4BAX8jAEEQayIBJAAgASAAELwHEK0LIAFBEGokAAsiAQF/IwBBEGsiASQAIAEgABC8BxCvCyEAIAFBEGokACAAC/oBAgJ/A34jAEEQayICJAACfiABvSIFQv///////////wCDIgRCgICAgICAgHh8Qv/////////v/wBYBEAgBEI8hiEGIARCBIhCgICAgICAgIA8fAwBCyAEQoCAgICAgID4/wBaBEAgBUI8hiEGIAVCBIhCgICAgICAwP//AIQMAQsgBFAEQEIADAELIAIgBEIAIAWnZ0EgaiAEQiCIp2cgBEKAgICAEFQbIgNBMWoQjAEgAikDACEGIAIpAwhCgICAgICAwACFQYz4ACADa61CMIaECyEEIAAgBjcDACAAIAQgBUKAgICAgICAgIB/g4Q3AwggAkEQaiQAC0oBAn8CQCAALQAAIgJFIAIgAS0AACIDR3INAANAIAEtAAEhAyAALQABIgJFDQEgAUEBaiEBIABBAWohACACIANGDQALCyACIANrCxQAQZC2AygCACoCzDEgACoC9ASUC9ovAxF/AX4MfSMAQaABayIDJABBkLYDKAIAIQYgAyAAEK0C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DQEMAwtBAyEDIAEtAAEiAkGfAUsNAgtBAyEDIAJBwAFxQYABRw0BIAEtAAIiAUHAAXFBgAFHDQEgACABQT9xIAJBBnRBwB9xIARBD3FBDHRycjYCAEEDDwsgA0H4AXFB8AFGBEAgAEH9/wM2AgAgAgRAQQEhAyACIAFrQQRIDQILQQQhAyABLQAAIgRB9AFLDQECQAJAAkACQCAEQZB+ag4FAAICAgECCyABLQABIgJB8ABqQf8BcUEvTQ0CDAQLIAEtAAEiAkGPAU0NAQwDCyABLQABIQILIAJBwAFxQYABRw0BIAEtAAIiBUHAAXFBgAFHDQEgAS0AAyIBQcABcUGAAUcNASAFQQZ0QcAfcSACQQx0QYDgD3EgBEEHcUESdHJyIgJBgPD/AHFBgLADRg0BIAAgAUE/cSACcjYCAEEEDwtBACEDIABBADYCAAsgAwsRAEEAIABBCGogACgCEBBQGwspACAAIAE2AhAgAEGE8wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGg8gI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEG88QI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHY8AI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHw7wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGI7wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGg7gI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHg7QI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHY3gI2AgAgARBQRQRAIAAgACgCACgCCBEBAAsgAAsyAQF/IwBBEGsiAyQAIAAoAgAgA0EIaiABEFsiACgCACACKAIAEAogABArIANBEGokAAuRAQEEfwJAQZC2AygCACICKAK8MyIDRSABIANGcg0AIAItAMAzDQBBAA8LAkAgAigCrDMiAyACKAKwM0cNACACKALQMyIFRSABIAVGckUEQCACLQDdM0UNAQsgACAAQQhqQQEQlQNFDQAgAi0AlzYNACADQQAQ4AVFDQAgAy0A7AJBBHENACABEOUFQQEhBAsgBAtGAQF/IwBBEGsiAiQAIAJBCGogACABELQBIAAgAikDCDcCACACQQhqIABBCGogAUEIahDFBCAAIAIpAwg3AgggAkEQaiQACyIAIAAgASoCACAAKgIAkjgCACAAIAEqAgQgACoCBJI4AgQLDwAgASAAKAIAaiACOAIACw0AIAEgACgCAGoqAgALWQECfyMAQRBrIgIkAAJAQZC2AygCACIDLQCgWkUNACACIAE2AgwgAygCqFoiAQRAIAEgACACKAIMEMoHGgwBCyADQazaAGogACACKAIMEKcGCyACQRBqJAALFwAgACAALwE0EKcCIAAgASACIAMQ8wILJgEBf0GQtgMoAgAoAqwzIgAtAH9FBEBBBUEGIAAoAtwCGxDLCQsL6AUCCH8DfSMAQeAAayICJAACQBA2IgUtAH8NAEGQtgMoAgAhAyAFIAAQVSEEIAJB2ABqIABBAEEBQwAAgL8QXxDTASELIAIgBSkCyAE3A1AgAkEoaiACQdAAaiACQThqIAsgCxAqEC8gAkFAayACQdAAaiACQShqEDwhCCACQThqIAJB0ABqIAJBIGogCyACKgJYIgxDAAAAAF5BAXMEfSAKBSAMIANB6CpqKgIAkguSIAIqAlwgA0HUKmoiCSoCACIKIAqSkhAqEC8gAkEoaiACQdAAaiACQThqEDwiBiAJKgIAEJwBIAYgBEEAEFRFDQAgAkE4aiAIEN0EIAICfyACKgI4IgqLQwAAAE9dBEAgCqgMAQtBgICAgHgLskMAAAA/kjgCOCACAn8gAioCPCIKi0MAAABPXQRAIAqoDAELQYCAgIB4C7JDAAAAP5I4AjwgBiAEIAJBH2ogAkEeakEAEIoBIgcEQCAEELMBCyAGIARBARCTASAFKAL8BCACQThqIAtDAACAv5JDAAAAP5QiCkEJQQhBByACLQAfIgQbIgkgBBsgCSACLQAeG0MAAIA/EDdBEBCmAiABBEAgBSgC/AQgAkE4aiAKQwAAgD8CfyALQwAAwECVIguLQwAAAE9dBEAgC6gMAQtBgICAgHgLshAxk0ESQwAAgD8QN0EQEKYCCyADQdwqaioCAEMAAAAAXkEBc0UEQCAFKAL8BCEEIAJBIGogAkE4aiACQRBqQwAAgD9DAACAPxAqEC8gBCACQSBqIApBBkMAAIA/EDdBECADKgLcKhDIAiAFKAL8BCACQThqIApBBUMAAIA/EDdBECADKgLcKhDIAgsgAy0AoFoEQCAGQf7sAUGC7QEgARtBABDOAQsgAioCWEMAAAAAXkEBcw0AIAIgAkEIaiAIKgIIIANB6CpqKgIAkiAIKgIEIAMqAtQqkhAqKQIANwMAIAIgAEEAQQEQqQELIAJB4ABqJAAgBwslAQF/QZC2AygCACIBQew0aiAAOAIAIAEgASgC6DRBAXI2Aug0C0YBA38gASgCBCECIAFBAhDDASIDBEAgASADIAEQogEiBGwQowIgASABIAQQwwFBf2oQowILIAAgASACIAEoAgQgAmsQ7QILzAECAX8BfSMAQRBrIgYkACAGIAE4AgggBiAAOAIMIAYgAjgCBAJ/IAEgAl1BAXNFBEAgBkEIaiAGQQRqELUDQwAAgL8hByAGKgIIIQELIAEgAF5BAXNFCwRAQ6uqqr4gB5MhByAGQQxqIAZBCGoQtQMgBioCCCEBIAYqAgwhAAsgAyAHIAEgBioCBCICkyAAIAEgAiABIAJdG5MiAUMAAMBAlEMI5TwekpWSizgCACAEIAEgAEMI5TwekpU4AgAgBSAAOAIAIAZBEGokAAtMACAEQQNIIANBgICACElyRQRAIAAgASACQwAAAL+SQwAAAAAgBLIiAkMAAIC/kkPbD8lAlCAClSAEQX9qEPIBIAAgA0EBIAUQ4AELCxIAQZC2AygCAEEAOgCxNhDXAws3ACAAIAEgAiADEMkHIQIgAARAIAAgAiABQX9qIgMgAiABSBsgAyACQX9HGyICakEAOgAACyACCwsAIAAgASACEJMECyUAIAAgASoCACABKgIEECoaIABBCGogASoCCCABKgIMECoaIAALVQECf0GMtgMoAgAiASAAQQNqQXxxIgJqIQACQCACQQFOQQAgACABTRsNACAAPwBBEHRLBEAgABAbRQ0BC0GMtgMgADYCACABDwtBwMMEQTA2AgBBfwvbAQIBfwJ+QQEhBAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNACAAIAKEIAUgBoSEUARAQQAP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RiAAQXdqQQVJcguDAQIDfwF+AkAgAEKAgICAEFQEQCAAIQUMAQsDQCABQX9qIgEgACAAQgqAIgVCCn59p0EwcjoAACAAQv////+fAVYhAiAFIQAgAg0ACwsgBaciAgRAA0AgAUF/aiIBIAIgAkEKbiIDQQpsa0EwcjoAACACQQlLIQQgAyECIAQNAAsLIAELiQMCA38BfCMAQRBrIgEkAAJAIAC8IgNB/////wdxIgJB2p+k+gNNBEAgAkGAgIDMA0kNASAAuxDXASEADAELIAJB0aftgwRNBEAgALshBCACQeOX24AETQRAIANBf0wEQCAERBgtRFT7Ifk/oBDYAYwhAAwDCyAERBgtRFT7Ifm/oBDYASEADAILRBgtRFT7IQnARBgtRFT7IQlAIANBf0obIASgmhDXASEADAELIAJB1eOIhwRNBEAgALshBCACQd/bv4UETQRAIANBf0wEQCAERNIhM3982RJAoBDYASEADAMLIARE0iEzf3zZEsCgENgBjCEADAILRBgtRFT7IRnARBgtRFT7IRlAIANBf0obIASgENcBIQAMAQsgAkGAgID8B08EQCAAIACTIQAMAQsCQAJAAkACQCAAIAFBCGoQ1gdBA3EOAwABAgMLIAErAwgQ1wEhAAwDCyABKwMIENgBIQAMAgsgASsDCJoQ1wEhAAwBCyABKwMIENgBjCEACyABQRBqJAAgAAvzAgIDfwF8IwBBEGsiASQAAn0gALwiA0H/////B3EiAkHan6T6A00EQEMAAIA/IAJBgICAzANJDQEaIAC7ENgBDAELIAJB0aftgwRNBEAgALshBCACQeSX24AETwRARBgtRFT7IQnARBgtRFT7IQlAIANBf0obIASgENgBjAwCCyADQX9MBEAgBEQYLURU+yH5P6AQ1wEMAgtEGC1EVPsh+T8gBKEQ1wEMAQsgAkHV44iHBE0EQCACQeDbv4UETwRARBgtRFT7IRnARBgtRFT7IRlAIANBf0obIAC7oBDYAQwCCyADQX9MBEBE0iEzf3zZEsAgALuhENcBDAILIAC7RNIhM3982RLAoBDXAQwBCyAAIACTIAJBgICA/AdPDQAaAkACQAJAAkAgACABQQhqENYHQQNxDgMAAQIDCyABKwMIENgBDAMLIAErAwiaENcBDAILIAErAwgQ2AGMDAELIAErAwgQ1wELIQAgAUEQaiQAIAALagEFf0GQtgMoAgAiBkGcNWoiBCAAEHQoAgghAiAEIAAQdCgCBCEFIAQgABC5BSABBEACQCACRQ0AAkAgBUUNACACLQB7DQAgBRC8BQ8LIAYoAow2BEAgAiEDDAELIAIQigQhAwsgAxBuCwteAQR/AkBBkLYDKAIAIgEoApw1IgJBAU4EQCABQaQ1aigCACEDA0AgAyACQX9qIgFBJGxqKAIEIgAEQCAALQALQQhxDQMLIAJBAUohACABIQIgAA0ACwtBACEACyAACzIAAkAgAC0ACUEBcQ0AQZC2AygCACIAKgL4WUMAAAAAX0EBcw0AIAAgACgCHDYC+FkLCw0AQZC2AygCAEGYKmoLCQAgACABEMYOCyoBAX8jAEEQayICJAAgAEGkzAIgAkEIaiABEHcQAzYCACACQRBqJAAgAAszAQF/IAAoAgAhAiAAKAIEIgBBAXUgAWoiASAAQQFxBH8gASgCACACaigCAAUgAgsRAQALFQAgABDeAgRAIAAoAgQPCyAALQALCwYAIAAQTQsjAQJ/QZC2AygCACIBKALMASICBEAgASgC0AEgACACEQAACwssAQF/IAAQkQNBBGoQ+gEiASAAEJEDNgIAIAFBBGogABAuIAAQkQMQPhogAQt1AQJ/IwBBMGsiAyQAQZC2AygCACEEIANBIGogACABEDwhACACBEAgACAEKAKsM0GQBGoQvQILIANBCGogACAEQfAqaiIBEDggAyAAQQhqIAEQLyADQRBqIANBCGogAxA8IARB4AFqELgEIQAgA0EwaiQAIAAL1wEBA38jAEEgayICJAAgASgCsAIhBCABQZC2AygCACIDKAK0NUcEQCADQQA6AJk2CyADIAQ2Aow2IAMgATYCtDUgAyAANgK4NSABIARBAnRqIAA2AowGIAAgASgCiAJGBEAgAkEIaiABQZACaiABQQxqIgAQOCACIAFBmAJqIAAQOCACQRBqIAJBCGogAhA8GiABIARBBHRqIgAgAikDGDcCnAYgACACKQMQNwKUBgsCQCADKAL4M0ECRgRAIANBAToAlzYMAQsgA0EBOgCWNgsgAkEgaiQACyUBAX9BkLYDKAIAIgIgADYCuDUgAigCtDUgAUECdGogADYCjAYLNwEBfyMAQRBrIgIkACACIAE2AgwgAkEMakEEIABBxANqEHAoAgAQhgUiABCfAiACQRBqJAAgAAtGAQJ/IAAoAgQgAUgEQCABQQJ0EEshAiAAKAIIIgMEQCACIAMgACgCAEECdBA+GiAAKAIIEEYLIAAgATYCBCAAIAI2AggLC0MCAX8BfCMAQRBrIgEkACAAKAIAQfzYAigCACABQQRqEAQhAiABIAEoAgQQWBCeASABQRBqJAAgAkQAAAAAAAAAAGILBwAgABBEGgtCACAAIAAqAgAgASoCAJM4AgAgACAAKgIEIAEqAgSTOAIEIAAgASoCACAAKgIIkjgCCCAAIAEqAgQgACoCDJI4AgwLDwAgASAAKAIAaiACOgAACw0AIAEgACgCAGotAAALoQMCA38CfSMAQUBqIgUkACAFQThqIAEgBUEwaiAAKAIoKgIMIghDAAAAP5QiCSAJIASUECoQLyAIQ83MzD6UIASUIQQgBUEwahA0IQEgBUEoahA0IQYgBUEgahA0IQcCQAJAAkACQAJAIAMOBAIDAAEECyAEjCEECyAFQRhqIAVBEGpDAAAAAEMAAEA/ECogBBBBIAUgBSkDGDcDMCAFQRhqIAVBEGpDLbJdv0MAAEC/ECogBBBBIAUgBSkDGDcDKCAFQRhqIAVBEGpDLbJdP0MAAEC/ECogBBBBIAUgBSkDGDcDIAwCCyAEjCEECyAFQRhqIAVBEGpDAABAP0MAAAAAECogBBBBIAUgBSkDGDcDMCAFQRhqIAVBEGpDAABAv0Mtsl0/ECogBBBBIAUgBSkDGDcDKCAFQRhqIAVBEGpDAABAv0Mtsl2/ECogBBBBIAUgBSkDGDcDIAsgBUEYaiAFQThqIAEQLyAFQRBqIAVBOGogBhAvIAVBCGogBUE4aiAHEC8gACAFQRhqIAVBEGogBUEIaiACEPICIAVBQGskAAsTACAAIAEoAgA2AgAgAUEANgIAC0QBAX8gAUUEQEEADwsgACgCAEEBTgRAA0AgASAAIAIQowEoAgBGBEAgACACEKMBDwsgAkEBaiICIAAoAgBIDQALC0EACykBAn0gACABKgIAIgQgApQgASoCBCIFIAOUkyAEIAOUIAUgApSSECoaC6YTAhV/B30jAEHgAWsiAyQAAkAQNiIPLQB/DQBBkLYDKAIAIQcQ0wEhHCACQRBxRQRAIBwgB0HoKmoqAgCSIRkLEIsBIR4gAEEAEIkBIRAgB0HoNGoQlQIQuwEgABC8ASACQff/v3xxQYiAwAByIAIgAkEgcRsiBEEIcUUEQCABIAQQjgkLAn8CfyAEQYCAwANxRQRAIAcoAqxZQYCAwANxIARyIQQLIARBgICADHFFCwRAIAcoAqxZQYCAgAxxIARyIQQLIARBgICAMHFFCwRAIAcoAqxZQYCAgDBxIARyIQQLIAcoAqxZIQYgAyABKAIAIgU2AtABIAMgASgCBCIINgLUASADIAEoAggiCjYC2AFDAACAPyEYIANB0AFqQQhyIREgA0HQAWpBBHIhEiAFviEaIAi+IRsgCr4hHSADIARBACAGQYCAgMABcSAEQYCAgMABcRtyIhMgBkH//7+AfnFyIglBAnEiDAR9IBgFIAEqAgwLOALcAQJAIBNBgIDAgAFxIhVBgIDAgAFGBEAgGiAbIB0gA0HQAWogEiAREPEBDAELIBNBgICAwQBxQYCAgMEARw0AIBogGyAdIANB0AFqIBIgERDHAgsgAwJ/IAMqAtABIhhDAAB/Q5RDAAAAP0MAAAC/IBhDAAAAAGAbkiIYi0MAAABPXQRAIBioDAELQYCAgIB4CyIKNgLAASADAn8gAyoC1AEiGEMAAH9DlEMAAAA/QwAAAL8gGEMAAAAAYBuSIhiLQwAAAE9dBEAgGKgMAQtBgICAgHgLIgY2AsQBIAMCfyADKgLYASIYQwAAf0OUQwAAAD9DAAAAvyAYQwAAAABgG5IiGItDAAAAT10EQCAYqAwBC0GAgICAeAsiCDYCyAEgHiAZkyEZQQNBBCAMGyENIAMCfyADKgLcASIYQwAAf0OUQwAAAD9DAAAAvyAYQwAAAABgG5IiGItDAAAAT10EQCAYqAwBC0GAgICAeAsiCzYCzAECQCAJQSBxIhQgBEGAgMABcUVyRQRAAn8gGSAHQegqaioCACIYIA1Bf2qyIhqUkyANspUiG4tDAAAAT10EQCAbqAwBC0GAgICAeAshBSAJQYCAIHEhBkMAAIA/An8gGSAYQwAAgD8gBbIQMSIZkiAalJMiGItDAAAAT10EQCAYqAwBC0GAgICAeAuyEDEhGCADQYABakHx7gFB+e4BIARBgICACHEiDhtBAEEAQwAAgL8QX0EAQf8BIAYbIRZDAAAAAEMAAIA/IAYbIRogCUEIcSEXQQBBAkEBIARBgICAAXEbIBkgAyoCgAFfG0EEdCEKQQAhBUEAIQRBACEIA0AgBARAQwAAAAAgByoC6CoQYAsgGSAYIARBAWoiBiANSRsQxQIgBEECdCIEQYDvAWooAgAhCwJAIA4EQCALIANB0AFqIARqQ4GAgDtDAAAAACAaIAQgCmpBgPABaigCAEMAAIA/EOgDIAVyIgUgCEEBcXIhCAwBCyALIANBwAFqIARqQwAAgD9BACAWIAQgCmpBoO8BaigCABDnAyAFciEFCyAXRQRAQe7wAUEBEPcCGgsgBiIEIA1HDQALIAVBAXEhBSAIQQFxIQ4MAQsgBEGAgIACcUUEQEEAIQUMAQtBACEFIBQNACAKQQBB/wEQnwEhBCAGQQBB/wEQnwEhBiAIQQBB/wEQnwEhBQJAIAxFBEAgAyALQQBB/wEQnwE2AjwgAyAFNgI4IAMgBjYCNCADIAQ2AjAgA0GAAWpBwABB9vABIANBMGoQXBoMAQsgAyAFNgJIIAMgBjYCRCADIAQ2AkAgA0GAAWpBwABBiPEBIANBQGsQXBoLIBkQxQICQEGW8QEgA0GAAWpBwABBBkEAEKgDIgVFDQAgA0HAAWpBDHIhCiADQcABakEIciEGIANBwAFqQQRyIQggA0GAAWohBANAAkAgBC0AACILQSNHBEAgC0EYdEEYdRDqAkUNAQsgBEEBaiEEDAELCyADQgA3A8gBIANCADcDwAEgDEUEQCADIAo2AhwgAyAGNgIYIAMgCDYCFCADIANBwAFqNgIQIARBnfEBIANBEGoQmQEaDAELIAMgBjYCKCADIAg2AiQgAyADQcABajYCICAEQa7xASADQSBqEJkBGgsgCUEIcUUEQEHu8AFBARD3AhoLC0EAIQYCQCAJQRBxDQAgFEUEQEMAAAAAIAdB6CpqKgIAEGALQwAAgD8hGSADQYABaiABKgIAIAEqAgQgASoCCCAMBH0gGQUgASoCDAsQMCEEIAMgA0H4AGpDAAAAAEMAAAAAECopAgA3AwhBu/EBIAQgCSADQQhqEOQCRSAJQQRxckUEQCAHIAMpA4ABNwKwWSAHQbjZAGogAykDiAE3AgBByfEBEL8DIANB6ABqIA9BkAJqEMUDIANB8ABqIANB6ABqIANB4ABqQwAAgL8gB0HkKmoqAgAQKhAvIANB8ABqQQAgA0HYAGpDAAAAAEMAAAAAECoQqwILIAlBCHFFBEBB7vABQQEQ9wIaC0HJ8QEQvQNFDQAgBygCrDMhBiAAIBBHBEAgACAQQQAQuAEQrQYLIBxDAABAQZQQxQJB0PEBIAEgAkGCgKT8AXFBgIHQA3IgB0Gw2QBqEN8DIAVyIQUQugELIAlBgAFxIAAgEEZyRQRAQwAAAAAgB0HoKmoqAgAQYCAAIBBBABC4AQtBACEEAkAgBiAFQQFzcg0AIA5FBEADQCAEQQJ0IgAgA0HQAWpqIANBwAFqIABqKAIAskMAAH9DlTgCACAEQQFqIgRBBEcNAAsLIBNBgICAwQBxQYCAgMEARgRAIAMqAtABIAMqAtQBIAMqAtgBIANB0AFqIBIgERDxAQsgFUGAgMCAAUYEQCADKgLQASADKgLUASADKgLYASADQdABaiASIBEQxwILIAEgAygC0AE2AgAgASADKALUATYCBCABIAMoAtgBNgIIIAwNACABIAMoAtwBNgIMCxByEKUBAkAgCUGABHENACAPKAKMAkEBcUUNABDzBkUNAEHZ8QFBABD+BCIABEAgASAAKAIAIgIpAAA3AAAgASACKAAINgAIQQEhBQsgE0GAgICAAXFFAn8gAEEAR0Hg8QFBABD+BCIERQ0AGiABIAQoAgAgDUECdBA+GkEBIQVBAQtFckUEQCABKgIAIAEqAgQgASoCCCABIAFBBGogAUEIahDHAgsQ8gYLAkAgBkUNACAHKALQMyIARQ0AIAcoAvQzIAZHDQAgDyAANgKIAgsgBUUNACAPKAKIAhCzAQsgA0HgAWokACAFC8EBAQF9AkAgACgCCARAEGQtAH9FDQELIABBfzYCCEEADwsCQAJAAkACQAJAIAAoAgwOBAABAgMECyAAQoCAgIAQNwIQEOkDIQEgAEEBNgIMIAAgATgCAEEBDwsgACgCCEEBRgRAIABBfzYCCEEADwsQ6QMhASAAIAAoAghBf2ogASAAKgIAkxDXBCAAQQM2AgwgACAAKAIQQQFqNgIQIAAgACgCFEEBajYCFEEBDwsgAEEDNgIMQQEPCyAAEI8GC0EACzEBAX8gACgCBCAAKAIIRwRAIAAQ3wggAEEAOgAPIAAgACgCBCIBNgIIIAAgATYCAAsLawECfyAAIAEQfiABKAIEIgIgASgCCCIDRwRAAkAgAiADSARAIAAgASACIAMgAmsQ4AMgASABKAIEIgA2AggMAQsgACABIAMgAiADaxDgAyABIAEoAggiADYCBAsgAUEAOgAPIAEgADYCAAsL9gEBBX8gACgC6BwhBCAAKAIEIQUgAiACIANBAXRqEPUCIQcCQAJAIARBgIAQcUUEQCAAKAIIIAdqIAAoAjRODQIgAyAFaiAAKAIMTg0CIABBDGohBAwBCyAAQQxqIQQgAyAFaiAAKAIMSA0AIAQgA0ECdEEgQYACIAMQuQEQnwEgBWpBAWoQvQELIAAoAhQhCCABIAVHBEAgCCABQQF0aiIGIANBAXRqIAYgBSABa0EBdBCuAQtBASEGIAggAUEBdGogAiADQQF0ED4aIAAgACgCBCADaiIBNgIEIAAgACgCCCAHajYCCCAEIAEQjwJBADsBAAsgBgs4AQF/IwBBEGsiBSQAIABBACABIAIgBUEIakMAAAAAQwAAAAAQKiADIAQQ6gMhACAFQRBqJAAgAAsOACAAQZqz5vR7NgLgHAskAQF/IwBBEGsiAyQAIAMgAjYCDCAAIAEgAhCnBiADQRBqJAALqgIBAn8jAEGAAWsiBSQAAkACQAJAAkAgAkF+cUF8ag4DAAIBAgsgBSADKAIANgJgIAAgASAEIAVB4ABqEFwhBgwCCyAFIAMpAwA3A3AgACABIAQgBUHwAGoQXCEGDAELAkACQAJAAkACQAJAIAIOCgIDBAUGBgYGAAEGCyAFIAMqAgC7OQMAIAAgASAEIAUQXCEGDAULIAUgAysDADkDECAAIAEgBCAFQRBqEFwhBgwECyAFIAMsAAA2AiAgACABIAQgBUEgahBcIQYMAwsgBSADLQAANgIwIAAgASAEIAVBMGoQXCEGDAILIAUgAy4BADYCQCAAIAEgBCAFQUBrEFwhBgwBCyAFIAMvAQA2AlAgACABIAQgBUHQAGoQXCEGCyAFQYABaiQAIAYLDAAgAEEMbEHQ7QFqC/sEAgd/A30jAEGQAWsiAiQAAkAQNiIDLQB/DQBBkLYDKAIAIQUgAyAAEFUhBCACQYgBaiAAQQBBAUMAAIC/EF8Q0wEhCiACIAMpAsgBNwOAASACQdAAaiACQYABaiACQegAaiAKIAIqAogBIgtDAAAAAF5BAXMEfSAJBSALIAVB6CpqKgIAkguSIAIqAowBIAVB1CpqIgMqAgAiCSAJkpIQKhAvIAJB8ABqIAJBgAFqIAJB0ABqEDwiBiADKgIAEJwBIAYgBEEAEFRFDQAgBiAEIAJB5wBqIAJB5gBqQQAQigEiBwRAIAEgAS0AAEEBczoAACAEELMBCyACQegAaiACQYABaiACQcgAaiAKIAoQKhAvIAJB0ABqIAJBgAFqIAJB6ABqEDwhAyAGIARBARCTASACIAMpAwA3A0AgAiADKQMINwM4QQlBCEEHIAItAGciBBsiCCAEGyAIIAItAGYbQwAAgD8QNyEEIAVB2CpqKgIAIQkgAiACKQNANwMgIAIgAikDODcDGCACQSBqIAJBGGogBEEBIAkQtQEgAS0AAARAIAJBMGogAyACQegAakMAAIA/An8gCkMAAMBAlSIJi0MAAABPXQRAIAmoDAELQYCAgIB4C7IQMSIJIAkQKhAvQRJDAACAPxA3IQQgAiACKQMwNwMQIAJBEGogBCAKIAkgCZKTENYICyAFLQCgWgRAIAZB9uwBQfrsASABLQAAG0EAEM4BCyACKgKIAUMAAAAAXkEBcw0AIAIgAkEoaiADKgIIIAVB6CpqKgIAkiADKgIEIAUqAtQqkhAqKQIANwMIIAJBCGogAEEAQQEQqQELIAJBkAFqJAAgBwusAQICfwF+IwBBQGoiAiQAAn9BABA2IgMtAH8NABogAyAAEFUhACACIAEpAgAiBDcDCCACIAQ3AzAgAkE4aiACQQhqQwAAAABDAAAAABDCAyACQRhqIANByAFqIgEgAkE4ahAvIAJBIGogASACQRhqEDwhASACQThqQwAAAAAQfEEAIAEgAEEAEFRFDQAaIAEgACACQRhqIAJBF2pBABCKAQshACACQUBrJAAgAAsLACAAIAFBABDsAwsNACAAKAIIIAFBA3RqC0YBAn8gACgCBCABSARAIAFBA3QQSyECIAAoAggiAwRAIAIgAyAAKAIAQQN0ED4aIAAoAggQRgsgACABNgIEIAAgAjYCCAsLaQEBfyAAIAAqAhAgAZIiATgCECAAIAAqAhQgApIiAjgCFAJ/IAKLQwAAAE9dBEAgAqgMAQtBgICAgHgLIQMgAEECAn8gAYtDAAAAT10EQCABqAwBC0GAgICAeAsgA0EAQQBBAEEAEO8DC6MEAgd/A30jAEEQayIKJAAgBkUEQCAFEGsgBWohBgsgASoCECEQIABDAAAAAEMAAAAAECohCAJAIAYgBU0NACACIBCVIREgAUEMaiENA0ACQAJAAkAgBEMAAAAAXkEBcw0AIAlFBEAgASARIAUgBiAEIA+TEPIEIgBBAWogACAAIAVGGyEJCyAFIAlJDQAgCCoCACAPXUEBc0UEQCAIIA84AgALIAggCCoCBCACkjgCBCAFIQkDQCAJIgAgBk8NAiAAQQFqIQkgACwAACILEOoCDQALIAkgACALQQpGGyEFQwAAAAAhD0EAIQkMAgsgCiAFLAAAIgA2AgwCQAJAAkACQCAAQQBOBEAgBUEBaiEMDAELIApBDGogBSAGELACIAVqIgwhCyAKKAIMIgBFDQELAkAgAEEfSw0AIA8hECAAQXZqDgQCAAADAAsgDSEOIAUhCyAPIBEgACABKAIASAR/IAEoAgggAEECdGoFIA4LKgIAlJIiECADYEEBcw0CCyALIQUMBQsgCCAIKgIAIA8QMTgCACAIIAgqAgQgApI4AgRDAAAAACEQCyAMIQUgECEPDAELIAUgBiAFIAZLGyEFQwAAAAAhDwwCCyAFIAZJDQALCyAIKgIAIA9dQQFzRQRAIAggDzgCAAsgD0MAAAAAXkVBACAIKgIEIgNDAAAAAFwbRQRAIAggAyACkjgCBAsgBwRAIAcgBTYCAAsgCkEQaiQACxAAQVxBXSAAQdsAShsgAGoLHAEBfyAAKAIAIQIgACABKAIANgIAIAEgAjYCAAvWAQIBfwJ9IAAqAgAQSiECAn8gACoCBBBKQwAAf0OUQwAAAD+SIgOLQwAAAE9dBEAgA6gMAQtBgICAgHgLQQh0IQECfyACQwAAf0OUQwAAAD+SIgKLQwAAAE9dBEAgAqgMAQtBgICAgHgLIAFyIQEgAQJ/IAAqAggQSkMAAH9DlEMAAAA/kiICi0MAAABPXQRAIAKoDAELQYCAgIB4C0EQdHIhASABAn8gACoCDBBKQwAAf0OUQwAAAD+SIgKLQwAAAE9dBEAgAqgMAQtBgICAgHgLQRh0cgvqAQEBfyMAQRBrIgckACADIARyIAVyIAZyQYCAgAhPBEAgByAAKAIoKQIANwMIIABBBkEEEKwBIAAgAC8BNBCnAiAAIAAvATRBAWpB//8DcRCnAiAAIAAvATRBAmpB//8DcRCnAiAAIAAvATQQpwIgACAALwE0QQJqQf//A3EQpwIgACAALwE0QQNqQf//A3EQpwIgACABIAdBCGogAxDzAiAAIAcgAioCACABKgIEECogB0EIaiAEEPMCIAAgAiAHQQhqIAUQ8wIgACAHIAEqAgAgAioCBBAqIAdBCGogBhDzAgsgB0EQaiQAC40DAgF/An0jAEEQayIFJAACQCAEQQAgA0MAAAA/QwAAAD9DAACAPyAEQQxxQQxGGyAEQQNxQQNGGyACKgIAIAEqAgAiBpOLlEMAAIC/khBAQwAAAD9DAAAAP0MAAIA/IARBCnFBCkYbIARBBXFBBUYbIAIqAgQgASoCBCIHk4uUQwAAgL+SEEAiA0MAAAAAX0EBcxtFBEAgACABEFcgACAFQQhqIAIqAgAgASoCBBAqEFcgACACEFcgACAFQQhqIAEqAgAgAioCBBAqEFcMAQsgACAFQQhqIAYgA0MAAAAAIARBAXEbIgaSIAcgBpIQKiAGQQZBCRCrASAAIAVBCGogAioCACADQwAAAAAgBEECcRsiBpMgBiABKgIEkhAqIAZBCUEMEKsBIAAgBUEIaiACKgIAIANDAAAAACAEQQhxGyIGkyACKgIEIAaTECogBkEAQQMQqwEgACAFQQhqIANDAAAAACAEQQRxGyIDIAEqAgCSIAIqAgQgA5MQKiADQQNBBhCrAQsgBUEQaiQAC/EBAgF/BH0jAEEQayIEJAAgBCABKgIAIAEqAgQgAioCACACKgIEEDAhAQJAIANFDQAgACgCQCICRQ0AIAAoAkggAkEEdGpBcGoiAioCDCEFIAIqAgghBiACKgIEIQcgASoCACACKgIAIghdQQFzRQRAIAEgCDgCAAsgASoCBCAHXUEBc0UEQCABIAc4AgQLIAEqAgggBl5BAXNFBEAgASAGOAIICyABKgIMIAVeQQFzDQAgASAFOAIMCyABIAEqAgAgASoCCBAxOAIIIAEgASoCBCABKgIMEDE4AgwgAEFAayABEKoKIAAQ+AMgBEEQaiQACx8AIAAoAgQgAUgEQCAAIAAgARBdEN4GCyAAIAE2AgALZwEBfyAAQQAQugMgAEEMakEAEL0BIABBGGpBABD7AyAAKAIoKAIkIQEgAEIANwIwIAAgATYCJCAAQgA3AjggAEFAa0EAEPgEIABBzABqQQAQvwEgAEHYAGpBABDfBiAAQeQAahDnBgsNACAAIAEgAhDXBCAACzcBAX9BkLYDKAIAIgEoApw1IAEoAqg1TARAIAFBkDRqEJUCQQAPCyABKAKsMyAAEFVBwQIQvgMLkwEBA38jAEFAaiICJABBkLYDKAIAIQQCQCAAEMADRQRAIARBkDRqEJUCDAELAkAgAUGAgICAAXEEQCACIAQoAqg1NgIQIAJBIGpBFEG9FiACQRBqEFwaDAELIAIgADYCACACQSBqQRRByRYgAhBcGgsgAkEgakEAIAFBgICAIHIQgAIiAw0AELoBCyACQUBrJAAgAwsUAEGQtgMoAgAoAqwzIAAQVRD4AgswAQN/QZC2AygCACIBKAKcNSABKAKoNSIDSgR/IAFBnDVqIAMQdCgCACAARgUgAgsLSgECf0GQtgMoAgAhAhA2IgEgAEMAAAAAWwR9IAJB+CpqKgIABSAACyABKgK0A5IiADgCtAMgASAAIAEqAgySIAEqArwDkjgCyAEL9QEDA38BfgF9IwBBEGsiBCQAQZC2AygCACgCrDMhBSAEQQhqEDQhBgJAAkACQCABKgIAIghDAAAAAF1FBEAgASoCBEMAAAAAXUEBcw0BCyAEEI0FIAQgBCkDACIHNwMIIAhDAAAAAFsNASAIQwAAAABdQQFzDQIgAUMAAIBAIAggB6e+IAUqAsgBk5IQMTgCAAwCCyAIQwAAAABcDQELIAEgAjgCAAsCQCABIAEqAgQiAkMAAAAAXAR9IAJDAAAAAF1BAXMNAUMAAIBAIAIgBioCBCAFKgLMAZOSEDEFIAMLOAIECyAAIAEpAgA3AgAgBEEQaiQAC+gBAgZ/A30jAEEQayICJABBkLYDKAIAIgMoAqwzIQUgAkMAAIA/An8gASADQegqaioCACIJIABBf2oiB7IiCpSTIACylSIIi0MAAABPXQRAIAioDAELQYCAgIB4C7IQMSIIOAIMIAJDAACAPwJ/IAEgCCAJkiAKlJMiAYtDAAAAT10EQCABqAwBC0GAgICAeAuyEDE4AgggBUGEA2oiBiACQQhqEHYgAEEBSgRAA0AgBiACQQxqEHYgBEEBaiIEIAdHDQALCyAFIAYQcCgCADYC8AIgAyADKALoNEF+cTYC6DQgAkEQaiQAC0kBA39BkLYDKAIAIgEoAqwzIgJB8AJqIgMgAEMAAAAAWwR9IAIqArQEBSAACzgCACACQYQDaiADEHYgASABKALoNEF+cTYC6DQLEQAgACABKgIAIAEqAgwQKhoL4QICBH8BfiMAQdAAayIAJAACQEGQtgMoAgAiAygCrDMiAS4BhAFBAk4EQBDUAQwBCyAAIAEpAhQiBDcDSCABKAKcASICQQFxBEAgAEMAAIBAIASnvhAxOAJICyACQQJxBEAgAEMAAIBAIARCIIinvhAxOAJMCxDUASAAQShqIAMoAqwzQcgBaiICIABByABqEC8gAEE4aiACIABBKGoQPCECIABByABqQwAAAAAQfAJAIAEoArgCRQRAIAEtAMECRQ0BCyABLQAKQYABcQ0AIAIgASgCTEEAEFQaIAIgASgCTEEBEJMBIAEoArgCDQEgASADKAK0NUcNASAAQSBqIAIgAEEYakMAAABAQwAAAEAQKhA4IABBEGogAkEIaiAAQQhqQwAAAEBDAAAAQBAqEC8gAEEoaiAAQSBqIABBEGoQPCADKAK4NUECEJMBDAELIAJBAEEAEFQaCyAAQdAAaiQAC2gCAn8CfUEBIQICQEGQtgMoAgAiAyAAQQJ0aioC9AciBEMAAAAAWw0AAkAgAUUNACAEIAMqAogBIgVeQQFzDQAgBCAEIAMqAhiTIAUgAyoCjAFDAAAAP5QQ/wJBAEoNAQtBACECCyACC2UBAn8jAEEQayIEJABBkLYDKAIAIgMgAygCkDRBEHI2ApA0IAQgACABEDwaIANBzDRqIAQpAwg3AgAgA0HENGogBCkDADcCACADQdg0akEANgIAIANB1DRqIAI2AgAgBEEQaiQAC0ABAX8jAEEQayICJAAgAiABNgIMAkBBkLYDKAIALQCZOgRAEIcFDAELQQEQgQQLIAAgARDrAhCABCACQRBqJAALNgAgACAAKgIAIAGTOAIAIAAgACoCBCABkzgCBCAAIAAqAgggAZI4AgggACAAKgIMIAGSOAIMCy4BAX8jAEEQayICJAAgAiABNgIMQYCgAygCACAAIAFBAEEAEM0HGiACQRBqJAALCgAgACgCOEEARwsSACAAQcTsAjYCACAAEPkHIAALEgAgAEGM7AI2AgAgABD7ByAACxIAIABB1OsCNgIAIAAQ/QcgAAsZACAAIAE2AhQgAEG46gI2AgAgABDKBSAACxkAIAAgATYCECAAQYDqAjYCACAAEIAIIAALEgAgAEHI6QI2AgAgABCBCCAACw4AIAAgASgCABAkEFgaCwwAQZC2AygCAEEIagsrAQF/IwBBEGsiAiQAIABBiL8CIAJBCGogARDKDxADNgIAIAJBEGokACAACwoAIAAoAgggAWoLLAECf0EBIQBBkLYDKAIAIgEtALE2RQRAIAEtAJk2QQBHIQALIAEgADoAmDYLJwEBfyMAQRBrIgIkACAAQQdBsOsCQdzoAkH3BSABEAEgAkEQaiQACycBAX8jAEEQayICJAAgAEEIQaDpAkHA3gJB9QUgARABIAJBEGokAAsnAQF/IwBBEGsiAiQAIABBA0G05QJBlMECQe0FIAEQASACQRBqJAALRAICfwF8IwBBEGsiASQAIAAoAgBBhNkCKAIAIAFBBGoQBCEDIAEgASgCBBBYIQAgAxCEAiECIAAQngEgAUEQaiQAIAILrgECA38BfSMAQSBrIgMkAEGQtgMoAgAiBEHcKmoqAgAiBkMAAAAAXkEBc0UEQCAEKAKsMyIEKAL8BCEFIANBGGogACADQRBqQwAAgD9DAACAPxAqEC8gA0EIaiABIANDAACAP0MAAIA/ECoQLyAFIANBGGogA0EIakEGQwAAgD8QNyACQQ8gBhCXASAEKAL8BCAAIAFBBUMAAIA/EDcgAkEPIAYQlwELIANBIGokAAsXACABKAIAIQEgACACNgJYIAAgATYCVAuYAwMCfwF+BH0jAEEgayIIJAAgCCABKQIAIgo3AxgCfSAFBEAgCqe+IQsgCCAFKQIAIgo3AxAgCqe+DAELIAhBEGogAyAEQQBDAAAAABBfIAgqAhghCyAIKgIQCyEMQQEhBSALIAySIAdBCGogAiAHGyIJKgIAIg1gRQRAIAgqAhwgCCoCFJIgCSoCBGAhBQsgByABIAcbIQEgBwRAQQEhByALIAEqAgBdBH8gBwUgCCoCHCABKgIEXQsgBXJBAEchBQsgBioCACIOQwAAAABeQQFzRQRAIAggCyALIA4gAioCACALkyAMk5SSEDE4AhgLIAYqAgQiDEMAAAAAXkEBc0UEQCAIIAgqAhwiCyALIAwgAioCBCALkyAIKgIUk5SSEDE4AhwLAkAgBQRAIAggASoCACABKgIEIA0gCSoCBBAwIQEgAEEAQwAAAAAgCEEYakEAQwAAgD8QNyADIARDAAAAACABEKUCDAELIABBAEMAAAAAIAhBGGpBAEMAAIA/EDcgAyAEQwAAAABBABClAgsgCEEgaiQAC6AlAxR/An4LfSMAQcADayIEJABBkLYDKAIAIQcQNiISLQB/RQRAIBIoAvwEIQYQiwEhHCAHQeg0ahCVAiAAELwBIAJBBHZBf3NBEHEgAnIhBRC7ASACQQhxRQRAIAEgBRCMCQsCfwJ/IAJBgICAMHFFBEAgBygCrFlBgICAMHEiAkGAgIAQIAIbIAVyIQULIAVBgICAwAFxRQsEQCAHKAKsWUGAgIDAAXEiAkGAgIDAACACGyAFciEFCyAFQQhxRQsEQCAHKAKsWUGAgARxIAVyIQULIAQgEikCyAEiGDcDuAMQ0wEiICAcICAgB0HoKmoqAgAiIpJBAkEBIAVBgoAEcSITQYCABEYbspSTEDEhHCAEQaADaiABQQxBECAFQQJxIgsbIhQQPhogHEMAAAA/lCIbIBxDCtejPZQiI5MhHQJ/IBxDGy/dPJQiHotDAAAAT10EQCAeqAwBC0GAgICAeAshAiAEQZgDaiAgIBySQwAAAD+UIBinviIakiAbIBhCIIinvpIQKiEKIARBkANqIB0gArKTIh5DAAAAABAqIQ4gBEGIA2ogHkMAAAC/lCIhIB5D0LNdv5QQKiEPIARBgANqICEgHkPQs10/lBAqIRAgBCABKAIAIgI2AvwCIAQgASgCBCIINgL4AiAEIAEoAggiDDYC9AIgBCACNgLwAiAEIAg2AuwCIAQgDDYC6AIgHCAakiEeIAVBgICAwABxIQ0CfyAgQ83MTD6UIhqLQwAAAE9dBEAgGqgMAQtBgICAgHgLIRUgIiAekiEeIAK+IRogCL4hISAMviEfAkAgDQRAIBogISAfIARB/AJqIARB+AJqIARB9AJqEMcCDAELIAVBgICAgAFxRQ0AIBogISAfIARB8AJqIARB7AJqIARB6AJqEPEBCyAgIB6SISFBCEEBEPsCAkAgBUGAgIAgcSIWBEBB5/EBIARByAJqICAgHCAHKgLoKpKSIBwQKhCuAxpBACEIAn9BABD9AkUNABogBEHIAmogB0GEB2ogChA4IARBsAJqIAdB4AFqIAoQOAJ/QQAgBEHIAmoQ+AEiGiAdQwAAgL+SIh8gH5RgQQFzDQAaQQAgGiAbQwAAgD+SIhogGpRfQQFzDQAaIAQgBCoCtAIgBCoCsAIQ3gtD2w9JQJVDAAAAP5QiGkMAAIA/kiAaIBpDAAAAAF0bOAL8AkEBCyEIIARB4AJqIARByAJqIAQqAvwCQwAAAMCUQ9sPSUCUIhoQiQMiHyAaEIgDIhoQogMgCCAOIA8gECAEQeACahCZBUUNABogBEHgAmogBEGwAmogHyAaEKIDIA4gDyAQIARB4AJqEJkFRQRAIARB2AJqIA4gDyAQIARB4AJqEIsLIAQgBCkD2AI3A+ACCyAOIA8gECAEQeACaiAEQdgCaiAEQZACaiAEQYgCahCNCyAEQwAAgD8gBCoCkAKTQxe30ThDAACAPxBeIho4AvQCIAQgBCoC2AIgGpVDF7fROEMAAIA/EF44AvgCQQEhCUEBC0EARyECIAhBAEchDCAJQQBHIQggBUEIcQ0BQe7wAUEBEPcCGgwBC0EAIQwgBUGAgIAQcUUEQEEAIQhBACECDAELQevxASAEQcgCaiAcIBwQKhCuAxoQ/QIiCARAIAQgByoC4AEgBCoCuAOTIBxDAACAv5IiGpUQSjgC+AIgBEMAAIA/IAcqAuQBIAQqArwDkyAalRBKkzgC9AILIAVBCHFFBEBB7vABQQEQ9wIaCyAEQcgCaiAeIAQqArwDECoQggRB7vEBIARByAJqICAgHBAqEK4DGhD9AkUEQCAIIQIMAQsgBCAHKgLkASAEKgK8A5MgHEMAAIC/kpUQSjgC/AJBASEMQQEhAgsgIiAhkiEiAkAgE0GAgARHDQAgBEHIAmogIiAEKgK8AxAqEIIEQfLxASAEQcgCaiAgIBwQKhCuAxoQ/QJFDQAgAUMAAIA/IAcqAuQBIAQqArwDkyAcQwAAgL+SlRBKkzgCDEEBIQILEPoCIAVBgAJxIglFBEBDAAAAACAHKgLoKhBgELsBCwJAIAVBgAFxIhENACAAQQAQiQEiFyAARg0AIAkEQEMAAAAAIAcqAugqEGALIAAgF0EAELgBCyAJRQRAQRBBARD7AiAEQcgCaiABKgIAIAEqAgQgASoCCCALBH1DAACAPwUgASoCDAsQMCEAIBEEQEH48QFBABBZCyAEIARBwAJqICBDAABAQJQiGiAgICCSIh8QKikCADcDgAFBgPIBIAAgBUHAgLjAAXEiACAEQYABahDkAhoCQCADRQ0AQYryAUEAEFkgBEGwAmogAyoCACADKgIEIAMqAgggCwR9QwAAgD8FIAMqAgwLEDAhCSAEIARBqAJqIBogHxAqKQIANwN4QZPyASAJIAAgBEH4AGoQ5AJFDQAgASADIBQQPhpBASECCxD6AhClAQsgAUEIaiEAIAFBBGohAwJAIAggDHJBAUcNACANBEAgBCoC/AIiGkOsxSe3kiAaIBpDAACAP2AbIAQqAvgCIhpDrMUnNyAaQwAAAABeGyAEKgL0AiIaQ703hjUgGkMAAAAAXhsgASADIAAQ8QEMAQsgBUGAgICAAXFFDQAgASAEKAL8AjYCACABIAQoAvgCNgIEIAEgBCgC9AI2AggLAkAgBUEgcQ0AICAgIiAeIBNBgIAERhuSIAQqArgDkxDEAyAFQZqAuMwBcSEJQQEhCwJAIAVBgIDAAHFFQQAgBUGAgMADcSIRGw0AQZ7yASABIAlBhIDAAHIQowNFDQBBASECIAcoAtAzRQ0AIActAN0zQQBHIQsLIAVBgICAAXFFQQAgERtFBEBBpPIBIAEgCUGEgIABchCjAyACciECCyAFQYCAgAJxRUEAIBEbRQRAQaryASABIAlBhICAAnIQowMgAnIhAgsQxgEgDUUgC3INACABKgIAIAEqAgQgASoCCCAEQcgCaiAEQbACaiAEQeACahDHAiAEKgLIAkMAAAAAX0EBcw0AIAQqAvwCIhpDAAAAAF5BAXMNAAJAIAQqAuACIh9DAAAAAF9BAXMNACAEKgL0AiIkIB9bDQAgGiAEKgL4AiAkQwAAAD+UIAEgAyAAEPEBDAELIAQqArACQwAAAABfQQFzDQAgGiAEKgL4AkMAAAA/lCAfIAEgAyAAEPEBC0EAIQkCQCACRQ0AIA0EQCAEIAEoAgAiADYC8AIgBCABKAIEIgI2AuwCIAQgASoCCCIaOALoAiAAviACviAaIARB/AJqIARB+AJqIARB9AJqEMcCQQEhCQwBC0EBIQkgBUGAgICAAXFFDQAgBCABKAIAIgA2AvwCIAQgASgCBCICNgL4AiAEIAEqAggiGjgC9AIgAL4gAr4gGiAEQfACaiAEQewCaiAEQegCahDxAQsgFbIhGiAEQcgCakMAAIA/QwAAgD9DAACAP0MAAIA/EDAhACAEKgL8AkMAAIA/QwAAgD8gACAAQQRqIABBCGoQ8QEgABC2AyEAIARBsAJqIAQqAvACIAQqAuwCIAQqAugCQwAAgD8QMBC2AyEDIARB4AJqEDQhBwJAIBYEQEMAAMA/IBuVIR4gGyAdkiIhQwAAAD+UISRBBAJ/IBuLQwAAAE9dBEAgG6gMAQtBgICAgHgLQQxtELkBIQJBACEFA0AgBigCGCENIAYgCiAkIAWyIh9DAADAQJUiGyAbkkPbD0lAlCAekyIbIB4gH0MAAIA/kkMAAMBAlSIfIB+SQ9sPSUCUkiIfIAIQ8gEgBkF/QQAgIxDgASAGKAIYIQsgBEGwAmogCioCACAdIBsQiQOUkiAKKgIEIB0gGxCIA5SSECoaIARB2AJqIAoqAgAgHSAfEIkDlJIgCioCBCAdIB8QiAOUkhAqGiAEIAQpA7ACIhg3A6ACIAQgBCkD2AIiGTcDmAIgBCAYNwNwIAQgGTcDaCAGIA0gCyAEQfAAaiAEQegAaiAFQQJ0QbDyAWooAgAgBUEBaiIFQQJ0QbDyAWooAgAQnQogBUEGRw0ACwJ/ICNDZmYmP0PNzAw/IAwblCIdQzMzsz+VIhuLQwAAAE9dBEAgG6gMAQtBgICAgHgLIQUgBiAEQbACaiAhIAQqAvwCIhsgG5JD2w9JQJQiHhCJAyIblEMAAAA/lCAKKgIAkiAhIB4QiAMiHpRDAAAAP5QgCioCBJIQKiICIB0gACAFQQlBIBCfASIFEKYCIAYgAiAdQwAAgD+SQYCBgnwgBUMAAIA/EMgCIAYgAiAdQX8gBUMAAIA/EMgCIARBkAJqIA4gGyAeEKIDIARB2AJqIAogBEGQAmoQLyAEQYgCaiAPIBsgHhCiAyAEQZACaiAKIARBiAJqEC8gBEGAAmogECAbIB4QogMgBEGIAmogCiAEQYACahAvIARBgAJqEIQHIAZBBkEGEKwBIAYgBEHYAmogBEGAAmogABDCAiAGIARBkAJqIARBgAJqIAAQwgIgBiAEQYgCaiAEQYACakF/EMICIAYgBEHYAmogBEGAAmpBABDCAiAGIARBkAJqIARBgAJqQYCAgHgQwgIgBiAEQYgCaiAEQYACakEAEMICIAYgBEHYAmogBEGQAmogBEGIAmpBgIGCfEMAAMA/ENUGIARB8AFqIARBiAJqIARB2AJqIAQqAvgCEEoQjAYgBEH4AWogBEHwAWogBEGQAmpDAACAPyAEKgL0ApMQShCMBiAEIAQpA/gBNwPgAgwBCyAFQYCAgBBxRQ0AIARBsAJqIARBuANqIARB2AJqIBwgHBAqEC8gBiAEQbgDaiAEQbACakF/IAAgAEF/ELcDIARBsAJqIARBuANqIARB2AJqIBwgHBAqEC9BACECIAYgBEG4A2ogBEGwAmpBAEEAQYCAgHhBgICAeBC3AyAEIAQpA7gDNwPoASAEQeABaiAEQbgDaiAEQbACaiAcIBwQKhAvIAQgBCkD6AE3A2AgBCAEKQPgATcDWCAEQeAAaiAEQdgAakMAAAAAENwDIAQqArgDIh1DAAAAQJIhGyAcIB2SQwAAAMCSISMgBAJ/IB0gHCAEKgL4AhBKlJJDAAAAP5IiHYtDAAAAT10EQCAdqAwBC0GAgICAeAuyIBsgIxBeOALgAiAEKgK8AyIdQwAAAECSIRsgHCAdkkMAAADAkiEjIAcCfyAdIBxDAACAPyAEKgL0ApMQSpSSQwAAAD+SIh+LQwAAAE9dBEAgH6gMAQtBgICAgHgLsiAbICMQXjgCBCAcQwAAwECVIRsDQCAGIARBsAJqIB4gGyACspQgHZIQKiAEQdgCaiAhIBsgAkEBaiIAspQgBCoCvAOSECogAkECdEGw8gFqKAIAIgIgAiAAQQJ0QbDyAWooAgAiAiACELcDIAQqArwDIR0gACICQQZHDQALIAQqAvwCIRsgBEHYAWogHiAdECohACAEQdABaiAhIBwgBCoCvAOSECohAiAEIAApAgA3A1AgBCACKQIANwNIIARB0ABqIARByABqQwAAAAAQ3AMgGkMAAIA/kiEhIARByAFqIB5DAACAv5ICfyAdIBwgG5SSQwAAAD+SIh2LQwAAAE9dBEAgHagMAQtBgICAgHgLshAqIQAgBEHAAWogISAaECohAiAEIAApAgA3A0AgBCACKQIANwM4IAYgBEFAayAEQThqICBDAAAAQJIQiwYLIAYgB0MAACBBQwAAwEAgCBsiHSADQQwQpgIgBiAHIB1DAACAP5JBgIGCfEEMQwAAgD8QyAIgBiAHIB1Bf0EMQwAAgD8QyAIgE0GAgARGBEAgASoCDBBKIR0gBCAEQbACaiAiIAQqArwDIhsgICAikiAcIBuSEFIiACkDADcDuAEgBCAAKQMINwOwASAAEHghGyAEQagBakMAAAAAQwAAAAAQKiECIAQgBCkDsAE3AyggBCAEKQO4ATcDMCAEIAIpAgA3AyAgBEEwaiAEQShqQQAgG0MAAAA/lCAEQSBqQwAAAABBfxDLBCAGIAAgAEEIaiADIAMgA0H///8HcSICIAIQtwMgBCAAKQMAIhg3A6ABIAQgACkDCCIZNwOYASAEIBk3AxAgBCAYNwMYIAQqArwDIRsgBEEYaiAEQRBqQwAAAAAQ3AMgGkMAAIA/kiEeIARBkAFqICJDAACAv5ICfyAbIBxDAACAPyAdk5SSQwAAAD+SIhyLQwAAAE9dBEAgHKgMAQtBgICAgHgLshAqIQAgBEGIAWogHiAaECohAiAEIAApAgA3AwggBCACKQIANwMAIAYgBEEIaiAEICBDAAAAQJIQiwYLEKUBQQAhCAJAIAlFDQAgBEGgA2ogASAUENACRQ0AIBIoAogCELMBQQEhCAsQcgsgBEHAA2okACAICx0AIAAgASACIAMQmxQgACACIAMQ4gMgAUEAOgAPC04BAX1DAACAvyEDIABBDGogASACahCPAi8BACIAQQpHBH1BkLYDKAIAKALEMSAAEOQDQZC2AygCACIAKgLIMSAAKALEMSoCEJWUBSADCwt+AQN/IAFBAXQiAyAAQRRqKAIAaiIBIAEgAkEBdCIEahD1AiEFIAAgACgCCCAFazYCCCAAIAAoAgQgAms2AgQgACgCFCADaiAEaiIALwEAIgIEQANAIAEgAjsBACABQQJqIQEgAC8BAiECIABBAmohACACDQALCyABQQA7AQAL7gMDBn8BfgJ9IwBB0ABrIggkAAJAEDYiDC0Afw0AQZC2AygCACEHIAhBEGpBwAAgASACAn8gBUUEQCABEKwDKAIEIQULIAULEKsDGiAGQYKACHFFIAZyQZCAgAFyIQsCQCADBEAQ0wEhDhC7ASAAELwBQwAAgD8QiwEgDiAHQegqaioCAJIiDyAPkpMQMRDFAkHS7gEgCEEQakHAACALQQAQqAMEQCAIQRBqIAdBiDxqKAIAIAEgAiAFENoEIQkLIAdB0CpqIgUpAgAhDSAFIAdB1CpqKAIANgIAQwAAAAAgByoC6CoQYEHo7gEgCEEIaiAOIA4QKkGBA0GBASAGQYCAAXEbIgUQ7AMEQCABQS0gAiACIAQgAyAHLQD4ARsgAyAEGxCoBkEBIQkLQwAAAAAgByoC6CoQYEHq7gEgCEEIaiAOIA4QKiAFEOwDBEAgAUErIAIgAiAEIAMgBy0A+AEbIAMgBBsQqAZBASEJCyAAIABBABCJASIBRwRAQwAAAAAgByoC6CoQYCAAIAFBABC4AQsgByANNwLQKhByEKUBIAkNAQwCCyAAIAhBEGpBwAAgC0EAEKgDRQ0BIAhBEGogB0GIPGooAgAgASACIAUQ2gRFDQELIAwoAogCELMBQQEhCgsgCEHQAGokACAKCyAAAn8gACgCACABSgRAIAAgARBIDAELIABBDGoLKgIAC/cBAgN/BH1BkLYDKAIAIgUqAsgxIgogBSgCxDEiByoCEJUhCyAAQwAAAABDAAAAABAqIQUCQANAIAEgAkkEQCABLwEAIQYgAUECaiIAIQEgBkENRg0BIAZBCkYEQCAFIAUqAgAgCBAxIgk4AgAgBSAKIAUqAgSSOAIEQwAAAAAhCCAAIQEgBEUNAgwDBSAIIAsgByAGEOQDlJIhCCAAIQEMAgsACwsgBSoCACEJIAEhAAsgCSAIXUEBc0UEQCAFIAg4AgALIAhDAAAAAF5FQQAgBSoCBCIJQwAAAABcG0UEQCAFIAogCZI4AgQLIAMEQCADIAA2AgALC+wCAQV/IwBBMGsiBiQAAkACQCAAKAIAIgNBH00EQCABQRR2IANBCkZxIAFBCnYgA0EJRnFyDQEMAgsgA0GAwHxqQYAySQ0BCwJAIAFBj4AIcUUNACABQQFxRSADQVBqIgRBCklyRQRAIANBVmoiB0EFSyAHQQJGcg0CCwJAIAFBgIAIcUUgBEEKSXINACADQVZqIgVBG01BAEEBIAV0QbuAgMAAcRsNAEEAIQUgA0HlAEcNAgtBACEFIAFBAnFFIANBX3FBv39qQQZJckVBACAEQQlLGw0BIAFBBHFFIANBn39qQRlLckUEQCAAIANBYGoiAzYCAAsgAUEIcUUNACADEOoEDQELQQEhBSABQYAEcUUNAEEAIQUgBhDNBCEEIAZBAEEwEE8aIAQgAzsBDCAEQYAENgIAIARBADYCCCAEIAE2AgQgBCACEQMADQAgACAELwEMIgA2AgAgAEUNAEEBIQULIAZBMGokACAFC0IBAX8jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAAQQQgASACIAZBDGogBkEIaiAFQwAAgD8Q1AQhACAGQRBqJAAgAAs/AQF/IwBBEGsiByQAIAcgBDgCCCAHIAM4AgwgAEEIIAEgAiAHQQxqIAdBCGogBSAGENQEIQAgB0EQaiQAIAALGAEBfxBkIgAqAswBIAAqAhCTIAAqAlSSC506AiB/BX0jAEGgAmsiByQAAkAQNiIKLQB/DQBBkLYDKAIAIQkgBUGAgMAAcSITBEAQuwELIAogABBVIRAgB0GYAmogAEEAQQFDAACAvxBfIAcgBCkCADcDiAIQiwEhKAJ9IBMEQBD5AkMAAABBlAwBCyAHKgKcAgshKSAJQdQqaioCACEnIAcgBykDiAI3AxggB0GQAmogB0EYaiAoICkgJyAnkpIQwgMgB0G4AWogCkHIAWoiBCAHQZACahAvIAdBuAFqIAdB+AFqIAQgB0G4AWoQPCIYQQhqIAdB0ABqIAcqApgCIidDAAAAAF5BAXMEfUMAAAAABSAnIAlB6CpqKgIAkgtDAAAAABAqEC8gB0HoAWogGCAHQbgBahA8IQQCQCATBEAgBCAQIBgQVEUEQCAEIAkqAtQqEJwBEKUBDAMLIAdBuAFqIBgQ3QEgECAHQbgBakEAEJMFRQRAEMYDEKUBDAMLEDYiFSIEIAQoArwCIBUoArQCcjYCvAIgByAHKgKQAiAVKgJwkzgCkAIMAQsgBCAJKgLUKhCcASAKIRUgBCAQIBgQVEUNAQsgGCAQELwCIg8EQCAJQQE2ApQ6CyAJKALcOyEUAn9BACAKIBAQ3wUiDkUNABpBACAJKALANyAKRw0AGiAJKALINyAKKALkAkYLIRkgDwRAIAktANgHQQBHIQsLAn9BACAJKALQMyIIIBBGDQAaQQEgCSgCyDUgEEYNABpBACAJKAK8NSAQRw0AGiAJKALcNUEDRgshDCAJQdw7aiEEIAVBgAFxISACQAJAAkAgE0UgECAUR3IEfyAIBSAIRQRAIAkoAvwzIBVBARDcBEYhGiAJKALQMyEICyAVQQEQ3AQgCEYhDSAJKALQMwsgEEYEQCANIAsgDnIgDCAacnIiFnIhEQwBCyATRSIIIAVBBHYgDHJxIRIgDSALIA5yIAwgGnJyIhZyQQFHBEBBACEWDAELIAQQqQMgCUGAPGogAhBrQQFqIhEQhgIgCUGIPGooAgAgAiARED4aIAdBADYCuAEgCUHoO2ogA0EBahC9ASAJQfQ7akEAEIYCIAlBjDxqQQA6AAAgCUHgO2ogCUHwO2ooAgAgAyACIAdBuAFqEIAFNgIAIAlB5DtqIAcoArgBIAJrNgIAAkAgECAJKALcO0YEQCAEEJYGDAELIAkgEDYC3DsgCUGUPGpBADYCACAJQZg8aiAIEJAJIAggGXEgEnIhEgsgBUGAwABxBEAgCUGkPGpBAToAAAsCQCATDQAgDiAZQQFzcUUEQCALRQ0BIAktAPgBRQ0BC0EBIRILQQEhESAWQQFzIAkoAtAzIBBGcg0BIBAgChDeASAQIAoQlgMgChBuIAlBgoAIQQIgBUHACHEbNgLoMyATICByDQEgCUEMNgLkMwwBCyAEQQAgECAURhsiBCAQIAkoAtAzIghHcg0BEG9BACEECyAJKALQMyEIC0EAIRpBACEKIAggEEYEQCAWIBEgCS0A2AdFcnJBAXMhCgsgBUGAgAFxIRQgDSAEQQBHcSAIIBBGciEZAkAgBEUNACAEEM8BIBlxIRogFEUgGUEBc3INACAHQQA2ArgBIARBDGogA0EBahC9ASAEIAQoAhQgBCgCDCACIAdBuAFqEIAFNgIEIAQgBygCuAEgAms2AgggBBCWBiAEEM8BIBpxIRoLAn8gGSAackUEQEEAIAkoAtAzIBBHDQEaC0EAIARFIBRyDQAaIAQtADBBAEcLISEgBUGAgAJxIQ0gAQR/IAIhCCAhBH8gBCgCIAUgCAstAABFBUEACyIfIA1FIhFyIiRFBEAgCSgCxDFBKhDxAiELIAlB4NgAaiAJKALEMSIIKAIQNgIAIAlBlNkAaiAIKAJENgIAIAlBgNkAaiAIKQIwNwIAIAlBmNkAaiAIKAJINgIAIAlBnNkAaiAIKAJMNgIAIAlBiNkAaiAIKAI4NgIAIAlB/NgAaiALNgIAIAlB3NgAaiALKAIENgIAIAlB0NgAaiEIAkAgCUHw2ABqEGJFDQAgCBBiRQ0AIAlB5NgAahBiGgsgCBCPBwtBACEWAkAgCSgC0DMgEEcNACAEQQA2AvAcIAQgBjYC7BwgBCAFNgLoHCAEIAM2AjQgBCgCCCEWIAlBATYCvF4gCSAJLQDoASILQQFzOgDdMyAJKgLgASEoIBgqAgAhKSAJKgLQKiEqIAQqAjghKwJ9IBMEQCAJKgLkASAVKgLMAZMgCSoC1CqTDAELIAkqAsgxQwAAAD+UCyEnIAktAK0BIQgCQAJAIBJFBEAgD0EBcyISIAhyDQEgCS0A3QdFDQELIAQQzgQgBEEBOgDlHAwBCwJAIAhFIBJyDQAgCS0A3QdFDQAgBEGMgAQQlQEgBEGNgAwQlQEMAQsgKCApkyAqkyArkiEoAkAgCS0A2AdFDQAgBC0A5RwNACAPRQ0BIAQgBEE8aiAoICcQnQkgBBCpAwwBCyALRQ0AIAQtAOUcDQAgCSoC9AZDAAAAAFsEQCAJKgL4BkMAAAAAWw0BCyAEIARBPGogKCAnEJwJIAQQqQMgBEEBOgDkHAsCQCAELQDlHEUNACAJLQDoAQ0AIARBADoA5RwLIAVBgAhxIQsCQAJAIAktAPgBBEAgCS0A+gEiEkUhDiAIRSASRXINAgwBCyAIDQBBACEODAELIAktAPsBQQBHIQ4LAkAgC0UNACAOQQAQZ0EBc3IgFHINACAJLQD5AQ0AIAdBCTsBuAEgCUGIKmogB0G4AWoQmwkNACAHQQk2ArgBIAdBuAFqIAUgBhDmA0UNACAEIAcoArgBEJUBCyAJQYgqaiILKAIAQQFIDQBBACEIIAwgFEEARyAOcnJFBEADQCAHIAsgCBCPAi8BACIMNgK4AQJAIAxBCUYEQCAJLQD5AQ0BCyAHQbgBaiAFIAYQ5gNFDQAgBCAHKAK4ARCVAQsgCEEBaiIIIAsoAgBIDQALCyALQQAQvQELIAVBgIAQcSEiAn8CQAJAAkACQCAQIAkoAtAzIghHBEBBACESDAELIAktANwzBEBBACEMDAILIAoEQEEAIQxBASEKDAILIAVBgIAEcSEjIAktAPkBIR0CfwJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJ/AkACQAJAAkACQAJAAkAgCS0ArQEiJQRAIAktAPsBDQEgCUH4AWoiGy0AACELIAlB+gFqIh4tAAAhDEEAIQ4MAgtBACEOAkAgCUH4AWoiGy0AAEUEQEEAIQsMAQtBASELIAktAPsBDQAgCS0A+gEgHXJFIQ4LIAlB+gFqIR4gCyEMDAELQQAhEkEAIQ4gCS0A+AFFBEAgCS0A+gEgHXJFIQ4LAkAgHUUNACAJLQD4AQ0AIAktAPoBRSESCyAJQfoBaiIeLQAARSIXIQogCUH4AWoiGy0AAEUNAQwCCyAMQf8BcUUhF0EAIRJBACEKIAtB/wFxDQELIB0NAQwDC0EAIB0NAxogHi0AAEUEQCAJLQD7ASEPIA5FDQIgD0UhDEEAIQtBACEKDAULQQAhCyAOBEBBACEKQQAhDAwFC0EAIQ1BACEMQQAMBwsgHi0AAA0BIAktAPsBRSELQQAhDCAORQ0EDAMLQQAhC0EAIQpBACEOQQAhCEEAIQ1BACEMIA9FDQkMDwsgCgshDEEAIQsgDkUNAiAMIQpBACEMC0EBIRxBEhBnDQMLQQAhDkEAIQgCQCALRQ0AQQoQZ0EBcyAUQQBHciANQQBHciIPQQFzIQggDyATRXINAEEBIQsgBBDPASEICyAcDQMMBAtBACENQQALIQsMCQsgDSAUciIPRSEIIA8gE0VyDQAgBBDPASEIC0EBIQ5BEBBnDQILQQAhHCAMRQ0CCyATRUEJEGcgEXEiHEVyDQFBACERIAQQzwEhHCAODQIMAwsgBUGAgMIAcUGAgMAARwRAIA1FIRwMAgsgBBDPASEcDAELQQAhESAORQ0BC0EBIRFBERBnRQ0AIBRFIgshDwwBCwJAIAtFDQBBCRBnRQ0AIAghDSAKIQwgFEUiCyEPIBFFDQIMAQtBACELIBFFBEAgCCENIAohDAwCCyAURSELQQAhDwtBASEmQRQQZyAjRSALcSIOcSERQRMQZwRAIAohDCAIIQ0gDyELIBEMAwtBACEOIA8hCyAIIQ0gCiEMIBEgEkUNAhoMAQtBACERQQAhDkEAIBJFDQEaC0EUEGcEQCAUICNyRSEOCyARCyEIIB1BEXQhCgJAAkACQAJAQQEQZwRAIARBhIAEQYCABEGMgAQgFxsgDBsgCnIQlQEMAQtBAhBnBEAgBEGFgARBgYAEQY2ABCAXGyAMGyAKchCVAQwBCyATRUEDEGdFckUEQCAbLQAABEAgFSAVKgJUIAkqAsgxk0MAAAAAEDEQ0QIMAgsgBEGGgARBgoAEIAwbIApyEJUBDAELIBNFQQQQZ0EBc3JFBEAgGy0AAARAIBUgFSoCVCAJKgLIMZIQggcQQBDRAgwCCyAEQYeABEGDgAQgDBsgCnIQlQEMAQtBBxBnBEAgBEGGgARBhIAEIBstAAAbIApyEJUBDAELQQgQZwRAIARBh4AEQYWABCAbLQAAGyAKchCVAQwBCyAUQQoQZ0VyRQRAIAQgCkGIgARyEJUBDAELIBRBCxBnRXJFBEACQCAEEM8BDQAgF0UEQCAEQYyADBCVAQwBCyAlRQ0AIAktAPsBRQ0AIB4tAAANACAbLQAADQAgBEGEgAwQlQELIAQgCkGJgARyEJUBDAELQQEhF0ENEGcEQEEBIRJBACEXIBNFBEBBASEKDAULIBstAAAhCgJAIAVBgBBxBEAgCiIIRSESIBQNBSASIQogCA0BDAYLIAoiCEEARyESIBQNBCASIQogCA0FCyAHQQo2ArgBIAdBuAFqIAUgBhDmA0UNASAEIAcoArgBEJUBDAELQQAhEkEBIQpBDhBnDQMgCCAOckEBRgRAIARBioAEQYuABCAIGxCVASAEIAQoAjwiCjYCRCAEQUBrIAo2AgAMAQsCQCAmRQ0AQQ8QZ0UNACAEEM4EIARBAToA5BwMAQsgDSAcckEBRgRAIAkoAswBBEBBACEIIAQQzwEEQCAEQUBrKAIAIAQoAkQQwgEhCAsCfyAEEM8BBEAgBEFAaygCACAEKAJEELkBDAELIAQoAgQLIQogBCgCFCIMIAhBAXQiCGogDCAKQQF0IgtqEPUCQQFqIgwQSyIKIAwgCCAEKAIUIgxqIAsgDGoQ6AYgChCTAyAKEEYLQQAhFyANRQ0CIAQQzwFFBEAgBBDOBAsgBEEBOgDkHCAEIQogBEE8aiIIKAIEIAgoAghHBEAgCiAIEKYDIAhBADoADwsMAgtBACEXIAtFDQEQowgiCEUNASAIEGtBAXRBAmoQSyEMAkAgCC0AAEUEQCAMQQA7AQAMAQtBACEKA0ACQCAHQbgBaiAIQQAQsAIhCyAHKAK4ASINRQ0AIAggC2ohCAJAIA1B//8DSw0AIAdBuAFqIAUgBhDmA0UNACAMIApBAXRqIAcoArgBOwEAIApBAWohCgsgCC0AAA0BCwsgDCAKQQF0akEAOwEAIApBAUgNACAEIARBPGogDCAKEI8JIARBAToA5BwLIAwQRgwBC0EAIRcLQQAhEkEAIQoMAQsgEiEKCyAaIAQQzwEgGXFyIRogCSgC0DMhCAsCQCAIIBBGBEACQCAUIBdBAXNyDQAgAiAEKAIsIgsQ/gFFDQAgBCgCJEF/aiEMIBdFDQQMAgtBACEMQQAhCyAXDQEMAwtBAAwECyAFQSBxRSASQQFzckUNAQwCC0EAIQtBACESCyAURQRAIARBAToAMCAEQRhqIAQoAgxBAnRBAXIQhgIgBCgCICAEKAIYIAQoAhRBABDoBgsCQCAFQcADcUUNAAJAIAVBwABxBEBBwAAhEUEAIQ5BABBnDQELICAEQEGAASERQQMhDkEDEGcNAUEEIQ5BBBBnDQELQYACIRFBFSEOIAVBgAJxRQ0BCyAHQbgBahDNBCIIQQxqQQBBJBBPGiAIIA42AhAgCEEANgIIIAggBTYCBCAIIBE2AgAgCCAEKAIgNgIUIAggBCgCCDYCGCAEKAI0IQ0gCEEAOgAgIAggDTYCHCAIIAQoAhQiDSANIAQoAjxBAXRqEPUCIg82AiQgCCANIA0gBEFAaygCAEEBdGoQ9QIiDjYCKCAIIA0gDSAEKAJEQQF0ahD1AiINNgIsIAggBhEDABogDyAIKAIkIhFHBEAgCCgCFCIPIA8gEWoQ/AQhDyAEQQE6AOQcIAQgDzYCPAsgDiAIKAIoIg9HBEAgBCAIKAIUIg4gDiAPahD8BDYCQAsgDSAIKAIsIg9HBEAgBCAIKAIUIg0gDSAPahD8BDYCRAsgCC0AIEUNAAJAICJFDQAgCCgCGCINIBZMDQAgBEEMaiAEKAIMIA0gFmtqEL0BCyAEIAQoAhQgBCgCDCAIKAIUQQAQgAU2AgQgBCAIKAIYNgIIIAQQqQMLIBQNACAEKAIgIgggAhD+AUUNACAEKAIIIQwgCCELCyALBEAgIkUgDCAWRnJFBEAgB0G4AWoQzQQiCCAMNgIYIAggAjYCFCAIIAU2AgQgCEGAgBA2AgAgCEEANgIIIAggAyAMQQFqELkBNgIcIAggBhEDABogCCgCFCECIAgoAhggCCgCHCIDQX9qEMIBIQwLIAIgCyAMQQFqIAMQwgEQlAULIARBADYC8BwgBEIANwLoHCALQQBHCyEXAkAgCkUNACAJKALQMyAQRw0AEG8LIBNFBEAgGCAQQQEQkwEgByAYKQMANwOwASAHIBgpAwg3A6gBQQdDAACAPxA3IQMgCUHYKmoqAgAhJyAHIAcpA7ABNwMQIAcgBykDqAE3AwggB0EQaiAHQQhqIANBASAnELUBCyAHQbgBaiAYKgIAIicgGCoCBCIoICcgByoCkAKSICggByoClAKSEDAhDAJAIBMEQCAHIBUpAsgBNwOgAQwBCyAHQaABaiAYIAlB0CpqEC8LIAdBmAFqQwAAAABDAAAAABAqIRsgIQRAIAQoAiAhAgsgB0EANgKUAQJAAkACQAJAAkACQAJAAkAgHwRAIAcgARBrIAFqIhY2ApQBIBkgGnINASATRQ0DDAULIBkgGnJBAUcNASAHIAIgBCgCCGoiFjYClAEgAiEBCyAEKAIUIQ0gB0GIAWoQNCEPQQAhCkGYeCELIAdBgAFqEDQhDkEAIRFBmHghBkEAIQggGQRAQQEhCCANIAQoAjxBAXRqIRFBfyEGCyAaBEAgCEEBaiEIQX8hCyANIARBQGsoAgAgBCgCRBDCAUEBdGohCgsgCCATQRR2aiEDQQAhAiANIQgDQAJAIAgvAQAiHEEKRwRAIBwNAQwFCyACQQFqIQICQCAGQX9HDQBBfyEGIAggEUkNACADQQJIBEAgAiEGDAYLIANBf2ohAyACIQYLIAtBf0cNAEF/IQsgCCAKSQ0AIANBAkgEQCACIQsMBQsgA0F/aiEDIAIhCwsgCEECaiEIDAALAAsgEwRAIAIhAQwDCyAHAn8gECAJKALQM0YEQCACIAQoAghqDAELIAIQayACagsiFjYClAEgAiEBCyAWIAFrQf///wBKDQQMAgsgB0HQAGogESANEIYHIBFBAEEAEOUDIA8gBygCUDYCACAPIAkqAsgxIicgAkEBaiICIAYgBkF/RhuylDgCBCACIAsgC0F/RhsiA0EATgRAIAdB0ABqIAogDRCGByAKQQBBABDlAyAOIAcoAlA2AgAgDiAJKgLIMSInIAOylDgCBAsgEwRAIAdB0ABqIAcqApACICcgArKUECoaIAcgBykDUDcDmAELAkAgGUUNACAELQDkHEUNAAJAIAVBgCBxRQRAIAcqApACIilDAACAPpQhJyAPKgIAIiggBCoCOCIqXUEBc0UEQCAEAn9DAAAAACAoICeTEDEiJ4tDAAAAT10EQCAnqAwBC0GAgICAeAuyOAI4DAILICggKZMiKCAqYEEBcw0BIAQCfyAnICiSIieLQwAAAE9dBEAgJ6gMAQtBgICAgHgLsjgCOAwBCyAEQQA2AjgLIBMEQAJAIA8qAgQiJyAJKgLIMZMiKSAVKgJUIihdQQFzRQRAQwAAAAAgKRAxIScMAQsgJyAHKgKUApMiKSAoIidgQQFzDQAgKSEnCyAVICc4AlQgFSAVKgLMASAoICeTkiInOALMASAHICc4AqQBCyAEQQA6AOQcCyAHQfgAaiAEKgI4QwAAAAAQKiEDAkAgGkUNACAEQUBrKAIAIgYgBCgCRCIKEMIBIQIgBiAKELkBIQZBKkMAAIA/Q5qZGT8gGRsQNyEKIAdB0ABqIAdBoAFqIA4QLyAHQfAAaiAHQdAAaiADEDggByANIAJBAXRqIgg2AmwgAiAGTg0AQwAAAABDAAAAQCATGyEpQwAAAABDAACAvyATGyEqIA0gBkEBdGohBiAJKgLIMSEoIAdB2ABqIQsgByoCdCEnA0AgJyAMKgIMICiSXg0BAkAgJyAMKgIEXUEBc0UEQANAIAggBk8NAiAHIAhBAmoiAjYCbCAILwEAIQ0gAiEIIA1BCkcNAAsMAQsgB0HgAGogCCAGIAdB7ABqQQEQ5QMgByoCYEMAAAAAX0EBc0UEQCAHAn8gCSgCxDFBIBDkA0MAAAA/lCIni0MAAABPXQRAICeoDAELQYCAgIB4C7I4AmALIAdBKGogB0HwAGogB0HIAGpDAAAAACAqIAkqAsgxkxAqEC8gB0FAayAHQfAAaiAHQThqIAcqAmAgKRAqEC8gB0HQAGogB0EoaiAHQUBrEDwiAiAHQShqIAwQzAIQvQIgAiAHQShqIAwQzAIQ3wIEQCAVKAL8BCAHQdAAaiALIApDAAAAAEEPEG0LIAkqAsgxISggBygCbCEIIAcqAnQhJwsgAyoCACErIAcgKCAnkiInOAJ0IAcgByoCoAEgK5M4AnAgCCAGSQ0ACwtBACEIAkAgE0UEQCAMIQggFiABa0H///8ASg0BCyAfQwAAgD8QNyECIAkqAsgxIScgCSgCxDEhBiAVKAL8BCEKIAdB0ABqIAdBoAFqIAMQOCAKIAYgJyAHQdAAaiACIAEgFkMAAAAAIAgQpQILIBlFDQIgBCAJKgIYIAQqAuAckiInOALgHEEBIQgCQCAnQwAAAABfDQAgCS0ArgFFDQAgJ0OamZk/ELcHQ83MTD9fIQgLIAdB0ABqIAdBoAFqIA8QLyAHQfAAaiAHQdAAaiADEDggB0HQAGogByoCcCInIAcqAnQiKCAJKgLIMZNDAAAAP5IgJ0MAAIA/kiAoQwAAwL+SEFIhAgJAIAhFDQAgAiAHQShqIAwQzAIQ3wJFDQAgFSgC/AQhAyAHQShqIAIQxQMgAyACIAdBKGpBAEMAAIA/EDdDAACAPxDRAQsgFA0CIAdBKGogByoCcEMAAIC/kiAHKgJ0IAkqAsgxkxAqGiAJIAcpAyg3AuRZDAILIAcqApACIScgASAHQZQBahCaCSECIAdB0ABqICcgCSoCyDEgArKUECoaIAcgBykDUDcDmAFBACEMIAcoApQBIRYLIB9DAACAPxA3IQIgFSgC/AQgCSgCxDEgCSoCyDEgB0GgAWogAiABIBZDAAAAACAMEKUCCyATRQ0AIAdB0ABqIBsgB0EoakMAAAAAIAkqAsgxECoQLyAHQdAAahCsBhDGAxClAQsCQCAkRQRAEI4HDAELIAktAKBaRQ0AIAdBoAFqIAEgFhDOAQsgByoCmAJDAAAAAF5BAXNFBEAgByAHQSBqIBgqAgggCUHoKmoqAgCSIBgqAgQgCSoC1CqSECopAgA3AwAgByAAQQBBARCpAQsgF0EBcyAFQYCAgAFxQRV2ckUEQCAQELMBCyASIBcgBUEgcRshCAsgB0GgAmokACAIC+MBAQR/IwBBEGsiAiQAAkAgABDlAiIALQAAQSVHBEBBAyEBDAELA0AgACIDQQFqIQAgAy0AASIEQVBqQf8BcUEKSQ0AC0H/////ByEBIAJB/////wc2AgwCQCAEQS5HDQAgA0ECaiACQQxqEJcGIQAgAigCDCIBQeQASQ0AIAJBAzYCDEEDIQELAkACQAJAAkAgAC0AACIAQbt/ag4DAgMBAAsgAEGbf2oOAwECAAILIAFB/////wdHDQILQX8hASACQX82AgwMAQtBAyABIAFB/////wdGGyEBCyACQRBqJAAgAQvnAwMHfwJ+An0jAEHwAGsiAyQAAkAQNiIELQB/DQBBkLYDKAIAIQUgBCAAEFUhBiADQegAaiAAQQBBAUMAAIC/EF8gAyAEKQLIASIKNwNgIAVB1CpqIgkqAgAhDAJAIAJBgARxRQ0AIAwgBCoC+AEiDV1BAXMNACADIA0gDJMgCkIgiKe+kjgCZAsgAyABKQIAIgo3A1AgBUHQKmoiCCoCACENIAMgCjcDECADQdgAaiADQRBqIAMqAmggDSANkpIgAyoCbCAMIAySkhDCAyADQThqIANB4ABqIANB2ABqEC8gA0FAayADQeAAaiADQThqEDwhASADQdgAaiAJKgIAEHwgASAGQQAQVEUNACABIAYgA0E3aiADQTZqIAQoAuwCQQF2QQFxIAJyEIoBIgcEQCAGELMBC0EXQRZBFSADLQA3IgIbIgQgAhsgBCADLQA2G0MAAIA/EDchAiABIAZBARCTASADIAEpAwAiCjcDKCADIAEpAwgiCzcDICAFQdgqaioCACEMIAMgCjcDCCADIAs3AwAgA0EIaiADIAJBASAMELUBIANBOGogASAIEC8gA0EYaiABQQhqIAgQOCADQThqIANBGGogAEEAIANB6ABqIAVBmCtqIAEQtgELIANB8ABqJAAgBwtTAQJ/IwBBEGsiBCQAAkACQCAAIAEQ9AMiAyAAEPMDRwRAIAMoAgAgAUYNAQsgACADIARBCGogASACEOkEELcGGgwBCyADIAI2AgQLIARBEGokAAsdACAABEAgACABQQN0aiIAIAM4AgQgACACOAIACwt1AAJAIAAoAgAEQCAAIAIgAxDkBCABQQRHDQEgACAEIAUQ5AQgACAGIAcQ5AQMAQsgACgCKCAAKAIsQQ5saiABIAIgAyAEIAUQjAIgACgCKCAAKAIsQQ5saiIBIAc7AQogASAGOwEICyAAIAAoAixBAWo2AiwLSQEBfyABQQAQjQIgAUECEMMBIQMgASACIAEQogEiAmwQowIgACABIAEgAhDDASIAIAIgA0EBamxqQQJqIAEgAhDDASAAaxDtAgsqAAJ9Q9sPyT8gAEMAAAAAXw0AGkMAAAAAIABDAACAP2ANABogABDfCwsLrAICAX8CfSMAQRBrIgUkAAJAAkACQAJAAkAgAw4EAAECAwQLIAAgBUEIaiABKgIAIAIqAgAiBpIgASoCBCACKgIEIgeTECogBSAGIAEqAgCSIAcgASoCBJIQKiABIAQQ8gIMAwsgACAFQQhqIAEqAgAgAioCACIGkyABKgIEIAIqAgQiB5IQKiAFIAEqAgAgBpMgASoCBCAHkxAqIAEgBBDyAgwCCyAAIAVBCGogASoCACACKgIAIgaSIAEqAgQgAioCBCIHkhAqIAUgASoCACAGkyAHIAEqAgSSECogASAEEPICDAELIAAgBUEIaiABKgIAIAIqAgAiBpMgASoCBCACKgIEIgeTECogBSAGIAEqAgCSIAEqAgQgB5MQKiABIAQQ8gILIAVBEGokAAsQACAAKAIIIAAoAgBBA3RqC0wBA38gACgCCCECIAAoAgAiAARAA0AgAiAAQQF2IgRBA3RqIgNBCGogAiADKAIAIAFJIgMbIQIgACAEQX9zaiAEIAMbIgANAAsLIAILJwEBfyAAKAIUIgEEQCABEEYLIAAoAhgiAQRAIAEQRgsgAEIANwIUC8wCAQR/IwBBIGsiBiQAIAZBGGogAioCACABKgIEECoaIAZBEGogASoCACACKgIEECoaIAZBCGogBCoCACADKgIEECoaIAYgAyoCACAEKgIEECoaIAAoAjwiByAALwE0Igg7AQYgByAIOwEAIAcgCEEDajsBCiAHIAhBAmoiCTsBCCAHIAk7AQQgByAIQQFqOwECIAAoAjggASkCADcCACAAKAI4IAMpAgA3AgggACgCOCIBIAU2AhAgASAGKQMYNwIUIAAoAjggBikDCDcCHCAAKAI4IgEgBTYCJCABIAIpAgA3AiggACgCOCAEKQIANwIwIAAoAjgiASAFNgI4IAEgBikDEDcCPCAAKAI4IAYpAwA3AkQgACgCOCIBIAU2AkwgACABQdAAajYCOCAAIAAoAjRBBGo2AjQgACAAKAI8QQxqNgI8IAZBIGokAAsPACAAQUBrEIEBIAAQ+AMLqwIBBn8jAEEQayICJAAgAgJ/IAAoAkAiAQRAIAAoAkggAUEEdGpBcGoMAQsgACgCKEEUagsiASkCCDcDCCACIAEpAgA3AwACQAJAAkAgACgCACIDQQFIDQAgACgCCCIBRQ0AIAEgA0F/aiIEQShsaiIFKAIAIgYEQCABIARBKGxqQQRqIAJBEBDQAg0BCyABIARBKGxqKAIgRQ0BCyAAEPkDDAELAkAgA0ECSCAGcg0AIAVBWGpBACADQQFKGyIDQQRqIAJBEBDQAg0AIAMoAhQhBgJ/QQAgACgCTCIFRQ0AGiAAKAJUIAVBAnRqQXxqKAIACyAGRw0AIAMoAiANACAAEIEBDAELIAEgBEEobGoiACACKQMANwIEIAAgAikDCDcCDAsgAkEQaiQAC5YBAQN/IwBBMGsiAyQAIANBCGoQ3AYiAQJ/IAAoAkAiAgRAIAAoAkggAkEEdGpBcGoMAQsgACgCKEEUagsiAikCADcCBCABIAIpAgg3AgwgAQJ/QQAgACgCTCICRQ0AGiAAKAJUIAJBAnRqQXxqKAIACzYCFCABIAAoAjA2AhggASAAKAIMNgIcIAAgARDbBiADQTBqJAALQgAgABBJIABBDGoQSSAAQRhqEEkgAEEANgI8IABCADcCNCAAQUBrEEkgAEHMAGoQSSAAQdgAahBJIABB5ABqEKsKCx8AIAAoAgQgAUgEQCAAIAAgARBdEIgHCyAAIAE2AgALDQAgACgCCCABQRRsagsQACAAKAIIIAAoAgBBKGxqCx4BAX8QZCIAKAL8BCAAKALAAygCDEEBahD2AhCUAgsqAQJ/AkBBkLYDKAIAIgEtALE2RQ0AIAEoAsg2DQAgASgCmDdFIQALIAALCAAQZBoQ1AELnAEBAn8jAEEwayIBJAAgAUGQtgMoAgAiAigC0Fk2AhAgAUEgakEQQa4WIAFBEGoQXBoCQCAARQ0AIAFBIGoQrQIiAEUNACAALQB6RQ0AIABBATYCpAEgAEEBOgCBASACIAIoAtBZQQFqIgA2AtBZIAEgADYCACABQSBqQRBBrhYgARBcGgsgAUEgakEAQceGsBAQgAIaIAFBMGokAAtAAQJ/IwBBEGsiASQAEDYiAiAAKQIANwLIASABQQhqIAJB4AFqIAJByAFqELQBIAIgASkDCDcC4AEgAUEQaiQACxsBAX9BkLYDKAIAIgAqAsgxIABB5CpqKgIAkgvGBQIEfwh9IwBBMGsiByQAIAdBIGogBEEIaiIKIAIQOCAHIAcpAyA3AwAgB0EoaiABIAQgBxD8AgJAAkAgBkEBRgRAQX9BACADKAIAQX9HGyEGA0AgAyAGQQJ0QYAXaiAGQX9GIgkbKAIAIQgCQCAJRQRAIAggAygCAEYNAQsgABA0IQkCQAJAAkACQAJAIAgOBAIBAwAECyAHQRBqIAUqAgAgBSoCDBAqGiAAIAcpAxA3AgAMAwsgB0EQaiAFKgIAIAUqAgQgAioCBJMQKhogACAHKQMQNwIADAILIAdBEGogBSoCCCACKgIAkyAFKgIMECoaIAAgBykDEDcCAAwBCyAHQRBqIAUqAgggAioCAJMgBSoCBCACKgIEkxAqGiAAIAcpAxA3AgALIAdBCGogCSACEC8gBCAHQRBqIAkgB0EIahA8EKACDQMLIAZBAWoiBkEERw0ACwtBf0EAIAMoAgAiCEF/RxshBiAFKgIMIRAgBCoCDCENIAIqAgQhDCAEKgIEIQ4gBSoCBCERIAIqAgAhCyAEKgIAIQ8gBSoCCCESA0ACQCAIIAMgBkECdEGQF2ogBkF/RhsoAgAiBEZBACAGQX9HGw0AIAogBSAEGyoCACASIA8gBEEBRhuTIAtdIBEgDSAEQQJGGyAQIA4gBEEDRhuTIAxdcg0AIAAQNCIAAn0gBEUEQCAFKgIAIAIqAgCTDAELIARBAUYEQCAFKgIIDAELIAcqAigLOAIAIAACfSAEQQJGBEAgBSoCBCACKgIEkwwBCyAEQQNGBEAgBSoCDAwBCyAHKgIsCzgCBCADIAQ2AgAMAwsgBkEBaiIGQQRHDQALIANBfzYCACABKgIAIAuSIAoqAgAQQCALkyAPEDEhCyAAIAEqAgQgDJIgDRBAIAyTIA4QMTgCBCAAIAs4AgAMAQsgAyAINgIACyAHQTBqJAALaAEDfyMAQRBrIgIkAAJAIAAQkgUiAygCAEEIRw0AIAMoAgRBAUcNAEGQtgMoAgAiBEGENWoCfyACIAMgBEGYKmoQkQUiAyoCADgCBCACIAA2AgAgAgsQlgcgAyABOAIACyACQRBqJAALOAECfyMAQRBrIgEkAEGQtgMoAgAoAqwzIQIgAUEIahCNBSAAIAFBCGogAkHIAWoQOCABQRBqJAALPQECf0GQtgMoAgAiACgCvDMgACgCrDMoAogCIgFGBEAgAEEBOgDAMwsgASAAKALQM0YEQCAAQQE6AN0zCwtFAQJ/QZC2AygCACICIABqLQDoAQR/IAFDAAAAAF1BAXNFBEAgAioCMCEBCyACIABBAnRqQcQIaioCACABIAGUYAUgAwsLpQEBA38jAEEQayIDJABBkLYDKAIAIQICQAJAIAAoAggiBEGAgBBxBEAgACgCjAYhAAwBCwJAIARBgICAKHFBgICACEcNACAAKAKMBiIARQ0AIAFFDQELQQAgAigCjDYQlwMgAkEANgKcNiACQQE7AJk2IAMQVhogAkGoNmogAykDCDcCACACIAMpAwA3AqA2ENcDDAELIAIgADYCuDULIANBEGokAAsRAQF/IAAoAogGIgEgACABGwtJAQJ/IAAoAgQiBUEIdSEGIAAoAgAiACABIAVBAXEEfyACKAIAIAZqKAIABSAGCyACaiADQQIgBUECcRsgBCAAKAIAKAIYEQ0ACyIAIABDAAAAAEMAAAAAQZC2AygCACIAKgIQIAAqAhQQUhoLCgBBzaoDEN0CAAsQACACBEAgACABIAIQPhoLCwkAIAAgATYCBAsWACAARQRAQQAPC0HAwwQgADYCAEF/C1YBAX8jAEEQayIBJAAgAEH////7BzYCFCAAQQA2AgggAEIANwIAIABC////+/f//7//ADcCDCABEFYaIAAgASkDCDcCICAAIAEpAwA3AhggAUEQaiQACwsAIAAgASACELoLC+MBAQJ/IAJBAEchAwJAAkACQCACRSAAQQNxRXINACABQf8BcSEEA0AgAC0AACAERg0CIABBAWohACACQX9qIgJBAEchAyACRQ0BIABBA3ENAAsLIANFDQELAkAgAC0AACABQf8BcUYgAkEESXINACABQf8BcUGBgoQIbCEDA0AgACgCACADcyIEQX9zIARB//37d2pxQYCBgoR4cQ0BIABBBGohACACQXxqIgJBA0sNAAsLIAJFDQAgAUH/AXEhAQNAIAEgAC0AAEYEQCAADwsgAEEBaiEAIAJBf2oiAg0ACwtBAAtWAQJ/IAACfyABQR9NBEAgACgCBCECIAAoAgAMAQsgACAAKAIAIgI2AgQgAEEANgIAIAFBYGohAUEACyIDIAF0NgIAIAAgAiABdCADQSAgAWt2cjYCBAvdAgEFfyMAQfABayIHJAAgByADKAIAIgg2AugBIAMoAgQhAyAHIAA2AgAgByADNgLsAUEBIQkCQAJAAkACQEEAIAhBAUYgAxsNACAAIAYgBEECdGooAgBrIgggACACEQIAQQFIDQBBACABayELIAVFIQoDQAJAIAghAyAKRSAEQQJIckUEQCAEQQJ0IAZqQXhqKAIAIQUgACALaiIIIAMgAhECAEF/Sg0BIAggBWsgAyACEQIAQX9KDQELIAcgCUECdGogAzYCACAHQegBaiAHQegBahDDByIAEJYEIAlBAWohCSAAIARqIQQgBygC6AFBAUYEQCAHKALsAUUNBQtBACEFQQEhCiADIQAgAyAGIARBAnRqKAIAayIIIAcoAgAgAhECAEEASg0BDAMLCyAAIQMMAgsgACEDCyAFDQELIAEgByAJEMIHIAMgASACIAQgBhCwBQsgB0HwAWokAAtYAQJ/IAACfyABQR9NBEAgACgCACECIAAoAgQMAQsgACgCBCECIABBADYCBCAAIAI2AgAgAUFgaiEBQQALIgMgAXY2AgQgACADQSAgAWt0IAIgAXZyNgIACwkAIAAgATgCUAsXACAAQQMQpAEgAUEDEKQBkkMAAAAAXgs+AgF/AX5BkLYDKAIAIgIgAigCkDRBAnI2ApA0IAApAgAhAyACQZg0aiABQQEgARs2AgAgAkGwNGogAzcDAAtmAQJ/IwBBEGsiASQAIAAoAgwhAiABQQhqIAAQyAEgACgCABB5IAIoAgAgAUEIahDXDCAAEO4HIAAoAgAEQCAAIAAoAgAQ7wcgABBTGiAAKAIAIQIgABDUAhogAhBNCyABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQmw0gAhArIAIgAxDIASADKAIAEHkgAkEIaiACEJoNIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAEJoBIAAoAgAQeSACKAIAIAFBCGoQ5gwgABDBBSABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQwgUgAhArIAIgAxCaASADKAIAEHkgAkEIaiACEJwNIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAEJoBIAAoAgAQeSACKAIAIAFBCGoQ6gwgABDBBSABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQwgUgAhArIAIgAxCaASADKAIAEHkgAkEIaiACEJ0NIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAEJoBIAAoAgAQeSACKAIAIAFBCGoQ7QwgABDBBSABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQwgUgAhArIAIgAxCaASADKAIAEHkgAkEIaiACEJ4NIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAELEBIAAoAgAQeSACKAIAIAFBCGoQ/wwgABD1ByABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQ9gcgAhArIAIgAxCxASADKAIAEHkgAkEIaiACEKANIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAELEBIAAoAgAQeSACKAIAIAFBCGoQgw0gABD1ByABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQ9gcgAhArIAIgAxCxASADKAIAEHkgAkEIaiACEKENIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAEJsBIAAoAgAQeSACKAIAIAFBCGoQkw0gABDUBSABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQ1QUgAhArIAIgAxCbASADKAIAEHkgAkEIaiACELIEIgEgACgCDBCZAiABECsgAkEQaiQAIAALPgECfyMAQRBrIgEkACAAKAIMIQIgAUEIaiAAEJsBIAAoAgAQeSACKAIAIAFBCGoQlw0gABDUBSABQRBqJAALYgECfyMAQRBrIgIkACAAEJoCIQMgACABNgIMIAIgAUHs2QIQQyADIAIQ3wEQ1QUgAhArIAIgAxCbASADKAIAEHkgAkEIaiACEKINIgEgACgCDBCZAiABECsgAkEQaiQAIAALOwEBfyMAQRBrIgIkACAAIAFBDGogAkEIaiABKgIMIAEqAhySIAEqAhAgARCBApIQKhA8GiACQRBqJAALCQAgACABEGgaC8ABAQV/AkBBkLYDKAIAQZw1aiIDEGINAAJAIABFIAMoAgAiBEEBSHINAANAAkAgAyACEHQoAgQiBUUNACAFLQALQQFxDQBBACEGIAIhBSACIAMoAgAiBE4NAgNAIAMgBRB0KAIEIgQEQCAGIAQoAvwFIAAoAvwFRnIhBgtBACAFQQFqIgUgAygCACIESCAGQQFxGw0ACyAGQQFxRQ0CCyACQQFqIgIgAygCACIESA0ACwsgAiAETg0AIAIgARCKAwsLCQAgACABEMUOCycAIAMgAygCACACIAFrIgBrIgI2AgAgAEEBTgRAIAIgASAAED4aCwsPACAAKAIIIAAoAgA2AgALEAAgACABEJQIIAAgAjYCBAsPACAAKAIAIAAoAgQ2AgQLKwEBfyMAQRBrIgIkACAAQZjaAiACQQhqIAEQjwEQAzYCACACQRBqJAAgAAszAQF/IAAoAgAhAiAAKAIEIgBBAXUgAWoiASAAQQFxBH8gASgCACACaigCAAUgAgsRAwALDAAgACABLQAAOgAACwkAIAAgAToACwsJACABIAARAQALBwAgABEJAAtGAgF/An0CQCABKgIAIgMgACoCAGBBAXMNACABKgIEIgQgACoCBGBBAXMNACADIAAqAghdQQFzDQAgBCAAKgIMXSECCyACCycBAX8jAEEQayICJAAgAEEGQYD3AkGIwgJBhAYgARABIAJBEGokAAsnAQF/IwBBEGsiAiQAIABBB0Gw9gJB3OgCQYIGIAEQASACQRBqJAALJwEBfyMAQRBrIgIkACAAQQJBrOUCQZjDAkHsBSABEAEgAkEQaiQACycBAX8jAEEQayICJAAgAEEDQaDlAkGUwQJB6wUgARABIAJBEGokAAsnAQF/IwBBEGsiAiQAIABBAUGkyAJBzL0CQeYFIAEQASACQRBqJAALRgEBf0GQtgMoAgAhAyAAIAEQlwMgAygCtDUgAUEEdGoiACACKQIINwKcBiAAIAIpAgA3ApQGIANBAToAlzYgA0EBOwCVNgsnAQF/IwBBEGsiAiQAIABBAkGs4wJBkMYCQeQFIAEQASACQRBqJAALQQAgABD6AyAAQewAahBFGiAAQdgAahBFGiAAQcwAahBFGiAAQUBrEEUaIABBGGoQRRogAEEMahBFGiAAEEUaIAALDgAgACgCCCABQcgAbGoLOQEBfyMAQRBrIgIkACACIAE2AgxBpNsCIABBA0Gg3AJB0NcCQeICIAJBDGoQLEEAEAIgAkEQaiQACz0BAX8jAEEQayICJAAgAiABKQIANwMIQZjZAiAAQQJB0NoCQZDGAkGkAiACQQhqEIcBQQAQAiACQRBqJAALIAACfyAAmUQAAAAAAADgQWMEQCAAqgwBC0GAgICAeAsLMQECfSAAIAEqAgAiAyACKgIAIgQgAyAEXRsgASoCBCIDIAIqAgQiBCADIARdGxAqGgsPACABIAAoAgBqIAI7AQALCQAgACABEOEIC4AFAgR/An0jAEFAaiIEJAACQBA2IgUtAH8NAEGQtgMoAgAhByAEIAUpAsgBNwM4IARBMGogAEEAQQFDAACAvxBfQYCAgAJBiICAAiADGyEGIAUoAtwCRQRAAn8gB0HgKmoiAioCACIIQwAAAD+UIgmLQwAAAE9dBEAgCagMAQtBgICAgHgLIQEgBCoCMCEJIAUgBSoCyAEgAbKSOALIAUENIARBKGogCCAIkiAHQeQqaioCABAqEKoCIABBACAGIARBKGogCUMAAAAAECoQoAEhBkEBEKkCIAUgBSoCyAECfyACKgIAQwAAAL+UIgiLQwAAAE9dBEAgCKgMAQtBgICAgHgLspI4AsgBDAELAkAgAQRAIARBKGogAUEAQQBDAACAvxBfDAELIARBKGpDAAAAAEMAAAAAECoaCyAFQbgEaiAEKgIwIAQqAigCfyAHKgLIMUOamZk/lCIIi0MAAABPXQRAIAioDAELQYCAgIB4C7IQ/wUhCCAEQSBqEIYEQwAAAAAgBCoCICAIkxAxIQkgAEEAIAZBgICABHIgBEEgaiAIQwAAAAAQKhCgASEGIAQqAihDAAAAAF5BAXNFBEBBACAHQdQrahD3ASAEQRhqIARBOGogBEEgaiAJIAUqAsgEkkMAAAAAECoQLyAEIAQpAxg3AwggBEEIaiABQQBBABCpAUEBEKgCCyACRQ0AIARBEGogBEE4aiAEQSBqIAkgBSoCzASSIAcqAsgxIghDzczMPpSSIAhDTDcJPpRDAAAAP5QQKhAvIANBAXNDAACAPxA3IQAgByoCyDEhCCAEIAQpAxA3AwAgBCAAIAhDLbJdP5QQ1ggLIARBQGskACAGC1wBA38jAEEQayIAJAAgABA2KAL4BSIBKQKYAjcDCCAAIAEpApACNwMAEI0DIQIQxgNDAAAAAEMAAIC/EGAgASAAKQMANwLIASAAIAIqAjwQnAEQpQEgAEEQaiQACyABAn8QNiICLQB/BH8gAQUgAiAAEFVBACAAQQAQ4gILC88DAgR/Cn0jAEEQayIHJAAQNiEIAkAgAkH///93TQRAQcyZs34gAhCKBhDuBCEJQYCBgnwgAhCKBhDuBCEKIAgoAvwEIAAgASAJIAUgBhBtIAAqAgQiCyAEKgIEkiINIAEqAgQiDF1BAXMNASADIAOSIRMgBCoCACEUQQAhBANAIA0gCyAMEF4hDwJAIA0gA5IiESAMEEAiEiAPXw0AIARBAXGyIAOUIAAqAgAiDiAUkpIiDSABKgIAIgtdQQFzDQADQCANIA4gCxBeIQwgDSADkiALEEAiECAMX0UEQAJ/An9BACAPIAAqAgRfQQFzDQAaIAwgDl8iAiAQIAtgQQFzDQAaIAJBAnILIgIgEiABKgIEYEEBcw0AGiACQQRyIAIgDCAOXxsiAiAQIAtgQQFzDQAaIAJBCHILIQIgCCgC/AQgB0EIaiAMIA8QKiAHIBAgEhAqIAogBUMAAAAAIAIgBnEiAhsgAhBtIAEqAgAhCwsgEyANkiINIAtdQQFzRQRAIAAqAgAhDgwBCwsgASoCBCEMCyARIAxdQQFzDQIgBEEBaiEEIAAqAgQhCyARIQ0MAAsACyAIKAL8BCAAIAEgAiAFIAYQbQsgB0EQaiQACzUAIAEoAgQgASgCCEcEQCABEN8IIAAgARB+IAFBADoADyABIAEoAggiADYCBCABIAA2AgALCwoAIABBAEEwEE8LKAEBfyAAQUBrQQA2AgAgACAAKAIEIgE2AkQgAEEAOgBLIAAgATYCPAuqBgMJfwJ+An0jAEHAAWsiByQAAkAQNiIMLQB/DQBBkLYDKAIAIQggDCAAEFUhCRCLASESIAdBuAFqIABBAEEBQwAAgL8QXyAHQTBqIAxByAFqIgogB0GYAWogEiAHKgK8ASAIQdQqaioCACISIBKSkhAqEC9DAAAAACESIAdBMGogB0GoAWogCiAHQTBqEDwiCkEIaiIOIAdB+ABqIAcqArgBIhNDAAAAAF5BAXMEfSASBSATIAhB6CpqKgIAkgtDAAAAABAqEC8gB0GYAWogCiAHQTBqEDwiDSAIKgLUKhCcASANIAkgChBURQ0AAkAgBUUEQCABEKwDKAIEIQUMAQsgAUEERw0AIAVByO4BEP4BRQ0AIAUQ0wQhBQsgCiAJELwCIQ8CQCAJEKYGRQRAIAwgCRDfBSENIA8EQCAILQDYB0EARyELCwJAIAsgDXINACAIKAK8NSAJRg0AIAgoAsg1IAlHDQILIAkgDBDeASAJIAwQlgMgDBBuIAhBDDYC5DMCQCANDQAgCwRAIAgtAPgBDQELIAgoAsg1IAlHDQILIAwQpggLIAogCSAAIAEgAiAFEKUGIQsMAQtBCSELIAkgCCgC0DNHBH9BCEEHIAgoArwzIAlGGwUgCwtDAACAPxA3IQsgCiAJQQEQkwEgByAKKQMAIhA3A5ABIAcgCikDCCIRNwOIASAIQdgqaioCACESIAcgEDcDGCAHIBE3AxAgB0EYaiAHQRBqIAtBASASELUBIAogCSABIAIgAyAEIAUgBkEAIAdB+ABqEFYiAxCjBiILBEAgCRCzAQsgAyoCCCADKgIAXkEBc0UEQCAMKAL8BCADIANBCGpBFEETIAgoAtAzIAlGG0MAAIA/EDcgCEGMK2oqAgBBDxBtCyAKIA4gB0EwaiAHQTBqQcAAIAEgAiAFEKsDIAdBMGpqQQAgB0EoakMAAAA/QwAAAD8QKkEAELYBIAcqArgBQwAAAABeQQFzDQAgByAHQSBqIAoqAgggCEHoKmoqAgCSIAoqAgQgCCoC1CqSECopAgA3AwggB0EIaiAAQQBBARCpAQsgB0HAAWokACALCw4AIAEgAKEgAruiIACgC5sGAgZ/Bn0jAEEQayIJJABBkLYDKAIAIQogAEEIaiIMIAdBAXEiBxBpIAAgBxBpk0MAAIDAkiESIApBiCtqKgIAIRAgBCADayINIAMgBGsgBCADSxsiC0EASAR9IBAFIBIgC0EBarKVIBAQMQsgEhBAIhFDAAAAP5QiECAAIAcQaUMAAABAkpIhEyAMIAcQaSEUAkAgCigC0DMgAUcNAAJAIAUCfwJ/An0CQAJAIAooAvgzQX9qDgIAAQYLIAotAOgBRQ0EIApB4AFqIAcQcSEBAn0gEiARkyIRQwAAAABeQQFzRQRAIAEqAgAgE5MgEZVDAAAAAEMAAIA/EF4hDwtDAACAPyAPkwsgDyAHGwwBCyAJQQNBBUMAAAAAQwAAAAAQjQEgCSoCBCEPIAkqAgAhESABIAooAsQ1RgRAIAotANwzRQ0ECyAPjCARIAcbIg9DAAAAAFsNBCACKAIAIAMgBCAGEKAGIhFDAACAP2BBAXNFQQACfQJAIAtB5ABqQckBTwRAQQ4QhgFFDQELQwAAgL9DAACAPyAPQwAAAABdGyALspUMAQsgD0MAAMhClQsiD0MAACBBlCAPQQ8QhgEbIg9DAAAAAF4bQQAgEUMAAAAAX0EBc0UgD0MAAAAAXUEBcxtyDQQgESAPkhBKCyANs5QiD0MAAIBPXSAPQwAAAABgcQRAIA+pDAELQQALIQECfyAPQwAAAD+SIg9DAACAT10gD0MAAAAAYHEEQCAPqQwBC0EACyIFIAEgASAFSRsgA2oLEOcCIgEgAigCAEYNASACIAE2AgBBASEODAELEG8LAkAgEkMAAIA/XUEBc0UEQCAJIAAgABA8GgwBCyATIBRDAAAAwJIgEJNDAACAPyACKAIAIAMgBCAGEKAGIgaTIAYgBxsQgAEhBiAHRQRAIAkgBiAQkyAAKgIEQwAAAECSIBAgBpIgACoCDEMAAADAkhBSGgwBCyAJIAAqAgBDAAAAQJIgBiAQkyAAKgIIQwAAAMCSIBAgBpIQUhoLIAggCSkDCDcCCCAIIAkpAwA3AgAgCUEQaiQAIA4LgAcCBX8HfSMAQRBrIgkkAEGQtgMoAgAhCiAAQQhqIgsgB0EBcSIHEGkgACAHEGmTQwAAgMCSIRMgCkGIK2oqAgAhDyAEIANrIg0gAyAEayAEIANKGyIMQQBIBH0gDwUgEyAMQQFqspUgDxAxCyATEEAiEEMAAAA/lCEPIAAgBxBpQwAAAECSIQ4gCyAHEGkhFAJ9IAMgBGxBf0pBAXJFBEAgA7IiESARjCADQX9KG0MAAIA/IAaVIhEQZSISIBIgBLIiEiASjCAEQX9KGyAREGWSlQwBC0MAAIA/QwAAAAAgA0EASBsLIREgDyAOkiESQQAhCwJAIAooAtAzIAFHDQACQCAFAn8CfwJ9AkACQCAKKAL4M0F/ag4CAAEGCyAKLQDoAUUNBEMAAAAAIQ4gCkHgAWogBxBxIQECfSATIBCTIhBDAAAAAF5BAXNFBEAgASoCACASkyAQlUMAAAAAQwAAgD8QXiEOC0MAAIA/IA6TCyAOIAcbDAELIAlBA0EFQwAAAABDAAAAABCNASAJKgIEIQ4gCSoCACEQIAEgCigCxDVGBEAgCi0A3DNFDQQLIA6MIBAgBxsiDkMAAAAAWw0EIAIoAgAgAyAEIAYgERCiBiIQQwAAgD9gQQFzRUEAAn0CQCAMQeQAakHJAU8EQEEOEIYBRQ0BC0MAAIC/QwAAgD8gDkMAAAAAXRsgDLKVDAELIA5DAADIQpULIg5DAAAgQZQgDkEPEIYBGyIOQwAAAABeG0EAIBBDAAAAAF9BAXNFIA5DAAAAAF1BAXMbcg0EIBAgDpIQSgsgDbKUIg6LQwAAAE9dBEAgDqgMAQtBgICAgHgLIQECfyAOQwAAAD+SIg6LQwAAAE9dBEAgDqgMAQtBgICAgHgLIgUgASABIAVIGyADagsQ5wIiASACKAIARg0BIAIgATYCAEEBIQsMAQsQbwsCQCATQwAAgD9dQQFzRQRAIAkgACAAEDwaDAELIBIgFEMAAADAkiAPk0MAAIA/IAIoAgAgAyAEIAYgERCiBiIGkyAGIAcbEIABIQYgB0UEQCAJIAYgD5MgACoCBEMAAABAkiAPIAaSIAAqAgxDAAAAwJIQUhoMAQsgCSAAKgIAQwAAAECSIAYgD5MgACoCCEMAAADAkiAPIAaSEFIaCyAIIAkpAwg3AgggCCAJKQMANwIAIAlBEGokACALCz0AAkAgAC0AAEElRw0AIAAtAAFBLkcNACAALQACQTBHDQAgAC0AA0HmAEcNACAALQAEDQBByO4BIQALIAAL+wUDCn8CfgJ9IwBBoAFrIggkAAJAEDYiDS0Afw0AQZC2AygCACEJIA0gABBVIQoQiwEhFCAIQZgBaiAAQQBBAUMAAIC/EF8gCEEgaiANQcgBaiIMIAhB+ABqIBQgCCoCnAEgCUHUKmoqAgAiFCAUkpIQKhAvQwAAAAAhFCAIQSBqIAhBiAFqIAwgCEEgahA8IgxBCGoiECAIQfAAaiAIKgKYASIVQwAAAABeQQFzBH0gFAUgFSAJQegqaioCAJILQwAAAAAQKhAvIAhB+ABqIAwgCEEgahA8Ig4gCSoC1CoQnAEgDiAKIAwQVEUNAAJAIAZFBEAgARCsAygCBCEGDAELIAFBBEcNACAGQcjuARD+AUUNACAGENMEIQYLIAwgChC8AiERAkAgChCmBkUEQEEAIQ4gDSAKEN8FIQ8gEQRAIAktANgHQQBHIQ4gCS0A3QdBAEchCwsCQCAOIA9yIAtyDQAgCSgCvDUgCkYNACAJKALINSAKRw0CCyAKIA0Q3gEgCiANEJYDIA0QbiAJQQw2AuQzAkAgDw0AAkAgDgRAIAsgCS0A+AFBAEdyRQ0BDAILIAsNAQsgCSgCyDUgCkcNAgsgDRCmCAsgDCAKIAAgASACIAYQpQYhCwwBC0EJIQsgCiAJKALQM0cEf0EIQQcgCSgCvDMgCkYbBSALC0MAAIA/EDchCyAMIApBARCTASAIIAwpAwAiEjcDaCAIIAwpAwgiEzcDYCAJQdgqaioCACEUIAggEjcDECAIIBM3AwggCEEQaiAIQQhqIAtBASAUELUBIAogASACIAMgBCAFIAYgBxC7CSILBEAgChCzAQsgDCAQIAhBIGogCEEgakHAACABIAIgBhCrAyAIQSBqakEAIAhB8ABqQwAAAD9DAAAAPxAqQQAQtgEgCCoCmAFDAAAAAF5BAXMNACAIIAhBGGogDCoCCCAJQegqaioCAJIgDCoCBCAJKgLUKpIQKikCADcDACAIIABBAEEBEKkBCyAIQaABaiQAIAsLegECfyMAQeAAayICJAAgAiABOQNYAkAgABDlAiIALQAAQSVHDQAgAC0AAUElRg0AIAIgATkDACACQRBqQcAAIAAgAhBcGiACQRBqIQADQCAAIgNBAWohACADLQAAQSBGDQALIAIgAxDBByIBOQNYCyACQeAAaiQAIAELfAECfyMAQeAAayICJAAgAiABOAJcAkAgABDlAiIALQAAQSVHDQAgAC0AAUElRg0AIAIgAbs5AwAgAkEQakHAACAAIAIQXBogAkEQaiEAA0AgACIDQQFqIQAgAy0AAEEgRg0ACyACIAMQwQe2IgE4AlwLIAJB4ABqJAAgAQt6AQF9EOkDIQMgAEF/NgIUIABCgICAgHA3AgwgACABNgIIIAAgAjgCBCAAIAM4AgAgAkMAAAAAXkEBc0UEQCABIAIgAEEQaiAAQRRqEKQGIAAoAhAiAUEBTgRAIAAqAgAgACoCBCICIAGylJIgAhChBgsgAEECNgIMCwuTBgIHfwN9IwBBEGsiCCQAQZC2AygCACEGIAIgA0YgAUMAAAAAXHJFBEAgBioCyFkgAyACa7OUIQELAkAgBigC+DMiB0EBRgR/AkBBABCDAUUNACAGQcQIaioCAEMAAIA/XkEBcw0AIAZB9AZqQQAQcSoCACINQwrXIzyUIA0gBi0A+gEbIg1DAAAgQZQgDSAGLQD5ARshDQwCCyAGKAL4MwUgBwtBAkcNACAIQQhqQQNBBUPNzMw9QwAAIEEQjQEgCEEIakEAEHEqAgAhDSABQQAQ6AIQMSEBCyANIAGUIQEgBi0A3DMhC0EAIQcCf0EAIAIgA0YiDA0AGkEBIAFDAAAAAF5BAXNFQQAgACgCACIJIANPGw0AGiAJIAJNIAFDAAAAAF1xCyEJAn8CQAJAAkAgCkUNACABQwAAAABdQQFzRQRAIAYqAsRZQwAAAABeDQILIAFDAAAAAF5BAXMNACAGKgLEWUMAAAAAXSEHCyAJIAtyDQAgB0UNAQsgBkEAOgDAWSAGQQA2AsRZQQAMAQsCQCABQwAAAABcBEAgBkEBOgDAWSAGIAEgBioCxFmSOALEWQwBCyAGLQDAWQ0AQQAMAQsgACgCACEHAkAgCgRAIAQCfyAHIAJrsyADIAJrIgSzIg2VQwAAgD8gBZUiDhBlIg8gBioCxFkgDZWSEEogBRBlIgVDAACAT10gBUMAAAAAYHEEQCAFqQwBC0EACyAEbCACahDnAiEHIAZBADoAwFkgBiAGKgLEWSAHIAJrsyANlSAOEGUgD5OTOALEWSAAKAIAIQQMAQsgBAJ/IAYqAsRZIgVDAACAT10gBUMAAAAAYHEEQCAFqQwBC0EACyAHahDnAiEHIAZBADoAwFkgBiAGKgLEWSAHIAAoAgAiBGuykzgCxFkLAkAgDCAEIAdGcg0AIAcgAiAHIAJPQQAgAUMAAAAAXUEBcyAHIARNchsbIgcgA01BACABQwAAAABeQQFzIAcgBE9yGw0AIAMhBwsgBCAHRwRAIAAgBzYCAAsgBCAHRwshACAIQRBqJAAgAAuLBgIHfwN9IwBBEGsiCCQAQZC2AygCACEGIAIgA0YgAUMAAAAAXHJFBEAgBioCyFkgAyACa7KUIQELAkAgBigC+DMiB0EBRgR/AkBBABCDAUUNACAGQcQIaioCAEMAAIA/XkEBcw0AIAZB9AZqQQAQcSoCACINQwrXIzyUIA0gBi0A+gEbIg1DAAAgQZQgDSAGLQD5ARshDQwCCyAGKAL4MwUgBwtBAkcNACAIQQhqQQNBBUPNzMw9QwAAIEEQjQEgCEEIakEAEHEqAgAhDSABQQAQ6AIQMSEBCyANIAGUIQEgBi0A3DMhC0EAIQcCf0EAIAIgA0YiDA0AGkEBIAFDAAAAAF5BAXNFQQAgACgCACIJIANOGw0AGiAJIAJMIAFDAAAAAF1xCyEJAn8CQAJAAkAgCkUNACABQwAAAABdQQFzRQRAIAYqAsRZQwAAAABeDQILIAFDAAAAAF5BAXMNACAGKgLEWUMAAAAAXSEHCyAJIAtyDQAgB0UNAQsgBkEAOgDAWSAGQQA2AsRZQQAMAQsCQCABQwAAAABcBEAgBkEBOgDAWSAGIAEgBioCxFmSOALEWQwBCyAGLQDAWQ0AQQAMAQsgACgCACEHAkAgCgRAIAQCfyAHIAJrsiADIAJrIgSyIg2VQwAAgD8gBZUiDhBlIg8gBioCxFkgDZWSEEogBRBlIgWLQwAAAE9dBEAgBagMAQtBgICAgHgLIARsIAJqEOcCIQcgBkEAOgDAWSAGIAYqAsRZIAcgAmuyIA2VIA4QZSAPk5M4AsRZIAAoAgAhBAwBCyAEAn8gBioCxFkiBYtDAAAAT10EQCAFqAwBC0GAgICAeAsgB2oQ5wIhByAGQQA6AMBZIAYgBioCxFkgByAAKAIAIgRrspM4AsRZCwJAIAwgBCAHRnINACAHIAIgByACTkEAIAFDAAAAAF1BAXMgByAETHIbGyIHIANMQQAgAUMAAAAAXkEBcyAHIAROchsNACADIQcLIAQgB0cEQCAAIAc2AgALIAQgB0cLIQAgCEEQaiQAIAAL7ggDBX8BfQF8IwBB0AFrIgUkAANAIAAiBkEBaiEAIAYsAAAiBxDqAg0ACwJAIAdB/wFxQVZqIgBBBUtBASAAdEEjcUVyRQRAA0AgBiwAASEAIAZBAWoiCSEGIAAQ6gINAAsgCSEGDAELIAchAEEAIQcLAkAgAEUNACAFQcgBaiADIAIQrAMiACgCABA+GiAERQRAIAAoAgghBAsgBUEANgLEAQJAAkACQAJAAkACQCACQXxqDgYAAwMDAQIDCyAFIAMoAgA2ArgBIAVBADYCsAECQCAHRQ0AIAUgBUG4AWo2AmAgASAEIAVB4ABqEJkBQQFIDQUCQAJAAkAgB0H/AXFBVmoOBgEAAwMDAgMLIAUgBUHEAWo2AjAgBkHI7gEgBUEwahCZAUUNBiADIAUoAsQBIAUoArgBajYCAAwGCyAFIAVBsAFqNgJAIAZBy+4BIAVBQGsQmQFFDQUgAwJ/IAUqArABIAUoArgBspQiCotDAAAAT10EQCAKqAwBC0GAgICAeAs2AgAMBQsgBSAFQbABajYCUCAGQcvuASAFQdAAahCZAUUNBCAFKgKwASIKQwAAAABbDQQgAwJ/IAUoArgBsiAKlSIKi0MAAABPXQRAIAqoDAELQYCAgIB4CzYCAAwECyAFIAVBxAFqNgIgIAYgBCAFQSBqEJkBQQFHDQMgAyAFKALEATYCAAwDCyAFIAMoAgA2ArgBIAVBADYCsAEgBwRAIAUgBUG4AWo2AoABIAFBy+4BIAVBgAFqEJkBQQFIDQQLIAUgBUGwAWo2AnAgBkHL7gEgBUHwAGoQmQFBAUgNAwJAAkACQAJAIAdB/wFxQVZqDgYBAAMDAwIDCyADIAUqArgBIAUqArABkjgCAAwFCyADIAUqArgBIAUqArABlDgCAAwECyAFKgKwASIKQwAAAABbDQMgAyAFKgK4ASAKlTgCAAwDCyADIAUoArABNgIADAILIAUgAykDADcDuAEgBUIANwOwASAHBEAgBSAFQbgBajYCoAEgAUHO7gEgBUGgAWoQmQFBAUgNAwsgBSAFQbABajYCkAEgBkHO7gEgBUGQAWoQmQFBAUgNAgJAAkACQAJAIAdB/wFxQVZqDgYBAAMDAwIDCyADIAUrA7gBIAUrA7ABoDkDAAwECyADIAUrA7gBIAUrA7ABojkDAAwDCyAFKwOwASILRAAAAAAAAAAAYQ0CIAMgBSsDuAEgC6M5AwAMAgsgAyAFKQOwATcDAAwBCyACQXtqQQJNBEAgBSADNgIAIAYgBCAFEJkBGgwBCyAFIAVBuAFqNgIQIAYgBCAFQRBqEJkBGgJAAkACQAJAIAIOBAABAgMECyADIAUoArgBQYB/Qf8AEJ8BOgAADAMLIAMgBSgCuAFBAEH/ARCfAToAAAwCCyADIAUoArgBQYCAfkH//wEQnwE7AQAMAQsgAyAFKAK4AUEAQf//AxCfATsBAAsgBUHIAWogAyAAKAIAENACQQBHIQgMAQsLIAVB0AFqJAAgCAujCQMMfwJ+BH0jAEHAAWsiAyQAQZC2AygCACIFIAUoApA0Ig1Bb3E2ApA0AkAQNiIHLQB/DQAgByAAEFUhCCACQSBxIglFBEAQ0wEhEQsgA0G4AWogAEEAQQFDAACAvxBfIANBmAFqIAdByAFqIgQgA0HQAGogERCLASACQcAAcSIMGyITIAMqArwBIAVB1CpqKgIAIhQgFJKSECoQLyADQdAAaiADQagBaiAEIANBmAFqEDwiBEEIaiIOIANBQGsgAyoCuAEiFEMAAAAAXkEBcwR9IBIFIBQgBUHoKmoqAgCSC0MAAAAAECoQLyADQZgBaiAEIANB0ABqEDwiCiAFKgLUKhCcASAKIAggBBBURQ0AIAQgCCADQZcBaiADQZYBakEAEIoBIQYgCBDAAyEKQQhBByADLQCXARtDAACAPxA3IQsgBCoCACAEKgIIIBGTEDEhEiAEIAhBARCTASAMRQRAIAcoAvwEIAQgA0HQAGogEiAEKgIMECogCyAFQdgqaioCAEEPQQUgCRsQbQsgCUUEQEEWQRZBFSADLQCXAUEBcRsgChtDAACAPxA3IQlBAEMAAIA/EDchCyAHKAL8BCADQdAAaiASIAQqAgQQKiAOIAkgBUHYKmoqAgBBD0EKIBMgEV8bEG0gBygC/AQhCSADIANBiAFqIBIgBSoC1CoiEZIgESAEKgIEkhAqKQIANwMoIAkgA0EoaiALQQNDAACAPxCfAwsgAyAEKQMAIg83A4ABIAMgBCkDCCIQNwN4IAVB2CpqKgIAIREgAyAPNwMgIAMgEDcDGCADQSBqIANBGGogERDcAyABRSAMckUEQCADQdAAaiAEIAVB0CpqEC8gA0HQAGogA0FAayASIAQqAgwQKiABQQBBACADQfAAakMAAAAAQwAAAAAQKkEAELYBCyADKgK4AUMAAAAAXkEBc0UEQCADIANB6ABqIAQqAgggBUHoKmoqAgCSIAQqAgQgBSoC1CqSECopAgA3AxAgA0EQaiAAQQBBARCpAQsCQAJAIAZFBEAgCiAFKAK8NSAIR3JFDQFBACEGIAoNAgwDCyAKDQELIAcoArACRQRAIAcgCDYCjAYLIAgQ+AILAkAgDUEQcQRAIAUgBSgCkDRBEHI2ApA0IAVBxDRqIgAgACoCACATEDE4AgAMAQsgA0HQAGogE0MAAAAAECogA0FAa0P//39/An9BCCACIAJBBHIgAkEecRsiAkEEcQ0AGkEEIAJBAnENABpBFEF/IAJBCHEbCxCqBhAqQQAQyAMLIAMgBSgCqDU2AgAgA0HQAGpBEEGx7QEgAxBcGgJAIANB0ABqEK0CIgBFDQAgAC0Ae0UNACADQfAAaiAAEPUKIAJBAXEEQCAAQQA2AqABCyADQUBrEJUHIANBMGogBBDFAyADQThqIANBMGogA0HwAGogAEGgAWogA0FAayAEQQEQhAQgA0E4akEAIANBMGpDAAAAAEMAAAAAECoQqwILQQEgA0FAayAFKgLQKiAFQaAqaioCABAqEKoCIANB0ABqQQBBw4KAIBCAAiEGQQEQqQIgBg0AELoBCyADQcABaiQAIAYLEgAgAEHm7AFB3ewBIAEbEMEICykAIAAgASoCACABKgIIkkMAAAA/lCABKgIEIAEqAgySQwAAAD+UECoaCx0BAX0gACABKgIAIgIgApIgASoCBCICIAKSECoaC7cDAgV/An0jAEFAaiICJABBkLYDKAIAIgMoAqwzIQQgAkEgaiABIAJBGGogAyoCyDEiByAHECoQLyACQRBqIANB0CpqEN4EIAJBKGogAkEgaiACQRBqEC8gAkEwaiABIAJBKGoQPCIBIABBABBUIQUgASAAIAJBD2ogAkEOakEAEIoBIQYgBQRAQRdBFiACLQAOG0MAAIA/EDchACACQShqIAEQ3QQgAi0ADwRAIAQoAvwEIAJBKGpDAAAAQCADKgLIMUMAAAA/lEMAAIA/khAxIABBDBCmAgsgAyoCyDEhB0EAQwAAgD8QNyEAIAJBKGogAkEgakMAAAA/QwAAAD8QKhD6BCAEKAL8BCEBIAJBIGogAkEoaiACQRhqIAdDAAAAP5RDgQQ1P5RDAACAv5IiByAHECoQLyACQRBqIAJBKGogAiAHjCIIIAgQKhAvIAEgAkEgaiACQRBqIABDAACAPxDRASAEKAL8BCEBIAJBIGogAkEoaiACQRhqIAcgCBAqEC8gAkEQaiACQShqIAIgCCAHECoQLyABIAJBIGogAkEQaiAAQwAAgD8Q0QELIAJBQGskACAGC4gDAwZ/An4CfSMAQdAAayIEJAACQBA2IgUtAH8NAEGQtgMoAgAhByAFIAAQVSEIIARBOGogBUHIAWoiACACEC8gBEFAayAAIARBOGoQPCEAENMBIQ0gAiACKgIEIA1gQQFzBH0gDAUgB0HUKmoqAgALEHwgACAIQQAQVEUNACAAIAggBEE3aiAEQTZqIAUoAuwCQQF2QQFxIANyEIoBIQZBF0EWQRUgBC0ANyIDGyIJIAMbIAkgBC0ANhtDAACAPxA3IQNBAEMAAIA/EDchCSAAIAhBARCTASAEIAApAwAiCjcDKCAEIAApAwgiCzcDICAHQdgqaioCACEMIAQgCjcDECAEIAs3AwggBEEQaiAEQQhqIANBASAMELUBIAUoAvwEIQMgBEEYaiAAIARBOGpDAAAAACACKgIAIAcqAsgxIgyTQwAAAD+UEDFDAAAAACACKgIEIAyTQwAAAD+UEDEQKhAvIAQgBCkDGDcDACADIAQgCSABQwAAgD8QnwMLIARB0ABqJAAgBgtRAQN/IwBBEGsiASQAQZC2AygCAEHUKmoiAigCACEDIAJBADYCACAAIAFBCGpDAAAAAEMAAAAAECpBgAQQ7AMhACACIAM2AgAgAUEQaiQAIAALSQEDfwJAQdjCBCgCACIDIAFqIgJB0MIEKAIAIgRLDQBBzMIEKAIAIABLBEAgBEEBaiECDAELIAMgACABED4aC0HYwgQgAjYCAAvwAwIHfwJ9IwBBIGsiAiQAIAFBDU4EQANAIAAqAgQiCiAAIAFBAXZBFGxqIgMqAgQiCV1BAXMgCSAAIAFBf2oiB0EUbGoqAgQiCV0iBEYEQCACIAAgB0EAIAogCV0gBHMbQRRsaiIGIgRBEGooAgA2AhggAiAGKQIINwMQIAIgBikCADcDCCAEIANBEGooAgA2AhAgBiADQQhqKQIANwIIIAYgAykCADcCACADIAIoAhg2AhAgAyACKQMQNwIIIAMgAikDCDcCAAsgAiAAQRBqKAIANgIYIAIgAEEIaikCADcDECACIAApAgA3AwggACADKQIANwIAIAAgAykCCDcCCCAAIAMoAhA2AhBBASEGA0AgAyACKQMINwIAIAMgAigCGDYCECADIAIpAxA3AgggACoCBCEJA0AgBiIIQQFqIQYgACAIQRRsaiIFKgIEIAldDQALA0AgByIEQX9qIQcgCSAAIARBFGxqIgMqAgRdDQALIAggBEgEQCACIAUoAhA2AhggAiAFKQIINwMQIAIgBSkCADcDCCAFIAMpAgA3AgAgBSADKQIINwIIIAUgAygCEDYCEAwBCwsCQCAEIAEgCGsiAUgEQCAAIAQQ4wQgBSEADAELIAUgARDjBCAEIQELIAFBDEoNAAsLIAJBIGokAAt5AAJAIAAoAhwgAU4EQCAAKAIEDQELIAAgATYCHAsCQCAAKAIkIAJOBEAgACgCBA0BCyAAIAI2AiQLAkAgACgCGCABTARAIAAoAgQNAQsgACABNgIYCwJAIAAoAiAgAkwEQCAAKAIEDQELIAAgAjYCIAsgAEEBNgIEC3wBAX8gABC2BiAAIAAqAhAgAZIiATgCCCAAIAE4AhAgACAAKgIUIAKSIgI4AhQgACACOAIMAn8gAotDAAAAT10EQCACqAwBC0GAgICAeAshAyAAQQECfyABi0MAAABPXQRAIAGoDAELQYCAgIB4CyADQQBBAEEAQQAQ7wML8BICDH8PfSMAQYADayIDJAAgAyAAKAJgNgI4IAMgACkCWDcDMCADIAAoAkg2AhggAyAAKQJANwMQIANBIGogA0EQaiABEPADAkAgAygCJCADKAIoTg0AIABBzABqIQ1BASEMA0ACQAJAAkACQAJAAn8CQAJAAn0CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIANBIGoQogEiCEF/ag4fARQBAwUHBgoUDhASFBEUFBQBAAACBAELDA0NFg8JCBMLIANBIGoCfyAMBEAgCiAGQQJtaiEKCyAKQQdqQQhtCxCjAgwbCyAKIAZBAm1qIQoMGwsgBkECSA0cIAIgA0HAAWogBkECdGoiBEF4aioCACAEQXxqKgIAEOUEDBkLIAZBAUgNGyACQwAAAAAgBkECdCADaioCvAEQ5QQMGAsgBkEBSA0aIAIgBkECdCADaioCvAFDAAAAABDlBAwXC0EBIQdBACEEQQAhBSAGQQJIDRsDQCACIANBwAFqIAVBAnRqKgIAIANBwAFqIAdBAnRqKgIAELIDIAVBAmoiBUEBciIHIAZIDQALDBcLQQAhBCAGQQFODREMGgtBACEEIAZBAUgNGUEAIQUMEwtBACEEIAZBBE4NEAwYC0EAIQQgBkEESA0XQQAMEAtBBSEHQQAhBEEAIQUgBkEGSA0WA0AgAiAFQQJ0IgggA0HAAWpqIgQqAgAgA0HAAWogCEEEcmoqAgAgBCoCCCAEKgIMIAQqAhAgA0HAAWogB0ECdGoqAgAQoQEgBUELaiEHIAVBBmohBSAHIAZIDQALDBILIAZBCEgNEyAGQX5qIQhBACEFQQUhBwNAIAIgBUECdCILIANBwAFqaiIEKgIAIANBwAFqIAtBBHJqKgIAIAQqAgggBCoCDCAEKgIQIANBwAFqIAdBAnRqKgIAEKEBIAVBC2ohByAFQQZqIgQhBSAHIAhIDQALIARBAXIiBSAGTg0TIAIgA0HAAWogBEECdGoqAgAgA0HAAWogBUECdGoqAgAQsgMMEQsgBkEISA0SIAZBemohCEEAIQVBASEHA0AgAiAFIgRBAnQiCyADQcABamoqAgAgA0HAAWogB0ECdGoqAgAQsgMgBEECaiIFQQFyIgcgCEgNAAsgBEEHaiIIIAZODRIgAiADQcABaiAFQQJ0aioCACADQcABaiAHQQJ0aioCACALIANBwAFqaiIEKgIQIAQqAhQgBCoCGCADQcABaiAIQQJ0aioCABChAQwQCyAGQQRIDRFBBEEDIAZBAXEiBRsiByAGTg0PIAMqAsABQwAAAAAgBRshDwNAIANBwAFqIAdBAnRqKgIAIRAgA0HAAWogBUECdGoiBCoCACERIAQqAgghEiAEKgIEIRMCQCAIQRtGBEAgAiARIA8gEyASIBBDAAAAABChAQwBCyACIA8gESATIBJDAAAAACAQEKEBCyAFQQdqIQdDAAAAACEPIAVBBGohBSAHIAZIDQALDA8LAkAgDg0AIAAoAnhFDQAgA0EwaiAAIAEQ5gkLQQEhDgtBACEEIAZBAUggCUEJSnINESADQcABaiAGQX9qIgZBAnRqKgIAIQ8gA0FAayAJQQxsaiIFIAMoAig2AgggBSADKQMgNwIAIAMgA0EwaiANIAhBCkYbIgUoAgg2AgggAyAFKQIANwMAIANBIGogAwJ/IA+LQwAAAE9dBEAgD6gMAQtBgICAgHgLEOUJIAMoAihFDREgA0EANgIkIAlBAWohCQwOCyAJQQFIDQ4gAyADQUBrIAlBf2oiCUEMbGoiBCgCCDYCKCADIAQpAgA3AyAMDQsgAhC2BkEBIQQMDwtBACEEAkACQAJAAkAgA0EgahCiAUFeag4EAAECAxILIAZBB0gNESADKgLYASEPIAMqAtQBIRAgAyoC0AEhESACIAMqAsABQwAAAAAgAyoCxAEgAyoCyAEiEiADKgLMAUMAAAAAEKEBIAIgEUMAAAAAIBAgEowgD0MAAAAAEKEBDA0LIAZBDUgNECADKgLsASEPIAMqAugBIRAgAyoC5AEhESADKgLgASESIAMqAtwBIRMgAyoC2AEhFCACIAMqAsABIAMqAsQBIAMqAsgBIAMqAswBIAMqAtABIAMqAtQBEKEBIAIgFCATIBIgESAQIA8QoQEMDAsgBkEJSA0PIAMqAuABIRAgAyoC2AEhESADKgLUASESIAMqAtwBIQ8gAiADKgLAASADKgLEASITIAMqAsgBIAMqAswBIhQgAyoC0AFDAAAAABChASACIBJDAAAAACARIA8gECAPIBMgFJKSjBChAQwLCyAGQQtIDQ4gAyoC6AEhDyADKgLAASIQIAMqAsgBIhGSIAMqAtABIhKSIAMqAtgBIhOSIAMqAuABIhSSIhWLIRYgAyoCxAEiFyADKgLMASIYkiADKgLUASIZkiADKgLcASIakiADKgLkASIbkiIciyEdIAIgECAXIBEgGCASIBkQoQEgAiATIBogFCAbIA8gFYwgFiAdXiIEGyAcjCAPIAQbEKEBDAoLIAhB/wFGDQELIAhBIEkNCiAIQf8BRw0BCyADQSBqQQQQwwGyQwAAgDeUDAELIANBIGpBfxCjAiADQSBqEOgEQRB0QRB1sgshDyAGQS9KDQcgA0HAAWogBkECdGogDzgCACAGQQFqIQYMBgtBASEFDAILQQELIQUDQCAFRQRAIARBA2oiCCAGTg0EIARBBGohBSACQwAAAAAgA0HAAWogBEECdGoiByoCACAHKgIEIAcqAgggA0HAAWogCEECdGoqAgAgBiAEa0EFRgR9IANBwAFqIAVBAnRqKgIABUMAAAAACxChASAFIQRBASEFDAELIARBA2oiCCAGTg0DIARBBGohBSACIANBwAFqIARBAnRqIgcqAgBDAAAAACAHKgIEIAcqAgggBiAEa0EFRgR9IANBwAFqIAVBAnRqKgIABUMAAAAACyADQcABaiAIQQJ0aioCABChASAFIQRBACEFDAALAAsDQCAFRQRAIAQgBk4NAyACIANBwAFqIARBAnRqKgIAQwAAAAAQsgMgBEEBaiEEQQEhBQwBCyAEIAZODQIgAkMAAAAAIANBwAFqIARBAnRqKgIAELIDIARBAWohBEEAIQUMAAsAC0EAIQwLQQAhBgsgAygCJCADKAIoSA0BCwtBACEECyADQYADaiQAIAQLIgECfyAAKAIEIgIgACgCCEgEfyAAKAIAIAJqLQAABSABCwuGAQECfyAAEKIBIgFBYGpB/wFxQdYBTQRAIAFB9X5qDwsgAUEJakH/AXFBA00EQCAAEKIBIAFBCHRyQeySfGoPCyABQQVqQf8BcUEDTQRAQZT1AyAAEKIBIAFBCHRyaw8LAkACQAJAIAFBZGoOAgABAgsgAEECEMMBDwsgAEEEEMMBIQILIAILEgAgACACNgIEIAAgATYCACAACyABAX9BASEBIAFBACAAQQlGIABBIEZyIABBgOAARnIbC4gDAgZ/AX0gAEEgaiECIAAoAiAEQANAIAMgAiAEEJECLwEAELkBIQMgBEEBaiIFIQQgBSACKAIARw0ACwsgABBJIABBFGoiBBBJIABBADoAVCAAIANBAWoQ9gkgACgCIEEASgRAA0AgAiABEJECLwEAIQUgAiABEJECKAIEIQYgACAFEEggBjYCACAEIAUQjwIgATsBACABQQFqIgEgACgCIEgNAAsLIABBIBDxAgRAIAIQ+QEvAQBBCUcEQCACIAIoAgBBAWoQugMLIAIQ+QEgAEEgEPECQSgQPiIBQQk7AQAgASABKgIEQwAAgECUIgc4AgQgAEEJEEggBzgCACAALwEgIQIgBCABLwEAEI8CIAJBf2o7AQALIAAgACAALwFCELsGIgE2AiwgACABBH0gASoCBAVDAAAAAAs4AgxBACEB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EI4DKAIAIgM2AgwgAiADEKwFIgM2AgwCQCABIANGDQACfyADQQpGBEBBASEEIAAhASAAKAIADAELQQAgAyABTSACKAIMQQFqEKcFIgEbDQEgABDeAiEEIAAQLgshBSABIAUgABCRA0EBahCOBCAEBEAgBRBNCwJAIANBCkcEQCAAIAIoAgxBAWoQqgUgACACKAIIEI8EIAAgARCrBQwBCyAAIAIoAggQtQQLCyACQRBqJAAPCxCtBQALJAEBf0EBIQEgACoCACAAKgIIXgR/IAEFIAAqAgQgACoCDF4LCxAAIAAgAUGAgICAeHI2AggLCQAgACABNgIACyQAIABBC08EfyAAQRBqQXBxIgAgAEF/aiIAIABBC0YbBUEKCwsKAEH8qQMQ3QIAC9kDAgJ/An4jAEEgayICJAACQCABQv///////////wCDIgVCgICAgICAwP9DfCAFQoCAgICAgMCAvH98VARAIAFCBIYgAEI8iIQhBCAAQv//////////D4MiAEKBgICAgICAgAhaBEAgBEKBgICAgICAgMAAfCEEDAILIARCgICAgICAgIBAfSEEIABCgICAgICAgIAIhUIAUg0BIARCAYMgBHwhBAwBCyAAUCAFQoCAgICAgMD//wBUIAVCgICAgICAwP//AFEbRQRAIAFCBIYgAEI8iIRC/////////wODQoCAgICAgID8/wCEIQQMAQtCgICAgICAgPj/ACEEIAVC////////v//DAFYNAEIAIQQgBUIwiKciA0GR9wBJDQAgAkEQaiAAIAFC////////P4NCgICAgICAwACEIgQgA0H/iH9qEIwBIAIgACAEQYH4ACADaxCEAyACKQMIQgSGIAIpAwAiAEI8iIQhBCACKQMQIAIpAxiEQgBSrSAAQv//////////D4OEIgBCgYCAgICAgIAIWgRAIARCAXwhBAwBCyAAQoCAgICAgICACIVCAFINACAEQgGDIAR8IQQLIAJBIGokACAEIAFCgICAgICAgICAf4OEvwtBAQF/IwBBEGsiBSQAIAUgASACIAMgBEKAgICAgICAgIB/hRCmASAAIAUpAwA3AwAgACAFKQMINwMIIAVBEGokAAu5AQEGfyMAQfABayIGJAAgBiAANgIAQQEhBwJAIANBAkgNAEEAIAFrIQkgACEFA0AgACAFIAlqIgUgBCADQX5qIgpBAnRqKAIAayIIIAIRAgBBAE4EQCAAIAUgAhECAEF/Sg0CCyAGIAdBAnRqIAggBSAIIAUgAhECAEF/SiIAGyIFNgIAIAdBAWohByADQX9qIAogABsiA0ECSA0BIAYoAgAhAAwACwALIAEgBiAHEMIHIAZB8AFqJAALrhECD38BfiMAQdAAayIHJAAgByABNgJMIAdBN2ohFSAHQThqIRNBACEBAkADQAJAIBBBAEgNACABQf////8HIBBrSgRAQcDDBEE9NgIAQX8hEAwBCyABIBBqIRALIAcoAkwiDCEBAkACQAJAIAwtAAAiCARAA0ACQAJAIAhB/wFxIghFBEAgASEIDAELIAhBJUcNASABIQgDQCABLQABQSVHDQEgByABQQJqIgo2AkwgCEEBaiEIIAEtAAIhCyAKIQEgC0ElRg0ACwsgCCAMayEBIAAEQCAAIAwgARCCAQsgAQ0GIAcoAkwsAAEQrwIhASAHKAJMIQggBwJ/AkAgAUUNACAILQACQSRHDQAgCCwAAUFQaiESQQEhFCAIQQNqDAELQX8hEiAIQQFqCyIBNgJMQQAhEQJAIAEsAAAiDUFgaiIKQR9LBEAgASEIDAELIAEhCEEBIAp0IgtBidEEcUUNAANAIAcgAUEBaiIINgJMIAsgEXIhESABLAABIg1BYGoiCkEgTw0BIAghAUEBIAp0IgtBidEEcQ0ACwsCQCANQSpGBEAgBwJ/AkAgCCwAARCvAkUNACAHKAJMIgEtAAJBJEcNACABLAABQQJ0IARqQcB+akEKNgIAIAEsAAFBA3QgA2pBgH1qKAIAIQ5BASEUIAFBA2oMAQsgFA0GQQAhFEEAIQ4gAARAIAIgAigCACIBQQRqNgIAIAEoAgAhDgsgBygCTEEBagsiATYCTCAOQX9KDQFBACAOayEOIBFBgMAAciERDAELIAdBzABqEMwHIg5BAEgNBCAHKAJMIQELQX8hCQJAIAEtAABBLkcNACABLQABQSpGBEACQCABLAACEK8CRQ0AIAcoAkwiAS0AA0EkRw0AIAEsAAJBAnQgBGpBwH5qQQo2AgAgASwAAkEDdCADakGAfWooAgAhCSAHIAFBBGoiATYCTAwCCyAUDQUgAAR/IAIgAigCACIBQQRqNgIAIAEoAgAFQQALIQkgByAHKAJMQQJqIgE2AkwMAQsgByABQQFqNgJMIAdBzABqEMwHIQkgBygCTCEBC0EAIQgDQCAIIQtBfyEPIAEsAABBv39qQTlLDQggByABQQFqIg02AkwgASwAACEIIA0hASAIIAtBOmxqQd+fA2otAAAiCEF/akEISQ0ACwJAAkAgCEETRwRAIAhFDQogEkEATgRAIAQgEkECdGogCDYCACAHIAMgEkEDdGopAwA3A0AMAgsgAEUNCCAHQUBrIAggAiAGEMsHIAcoAkwhDQwCCyASQX9KDQkLQQAhASAARQ0HCyARQf//e3EiCiARIBFBgMAAcRshCEEAIQ9BhKADIRIgEyERAkACQAJAAn8CQAJAAkACQAJ/AkACQAJAAkACQAJAAkAgDUF/aiwAACIBQV9xIAEgAUEPcUEDRhsgASALGyIBQah/ag4hBBQUFBQUFBQUDhQPBg4ODhQGFBQUFAIFAxQUCRQBFBQEAAsCQCABQb9/ag4HDhQLFA4ODgALIAFB0wBGDQkMEwsgBykDQCEWQYSgAwwFC0EAIQECQAJAAkACQAJAAkACQCALQf8BcQ4IAAECAwQaBQYaCyAHKAJAIBA2AgAMGQsgBygCQCAQNgIADBgLIAcoAkAgEKw3AwAMFwsgBygCQCAQOwEADBYLIAcoAkAgEDoAAAwVCyAHKAJAIBA2AgAMFAsgBygCQCAQrDcDAAwTCyAJQQggCUEISxshCSAIQQhyIQhB+AAhAQsgBykDQCATIAFBIHEQzQshDCAIQQhxRQ0DIAcpA0BQDQMgAUEEdkGEoANqIRJBAiEPDAMLIAcpA0AgExDMCyEMIAhBCHFFDQIgCSATIAxrIgFBAWogCSABShshCQwCCyAHKQNAIhZCf1cEQCAHQgAgFn0iFjcDQEEBIQ9BhKADDAELIAhBgBBxBEBBASEPQYWgAwwBC0GGoANBhKADIAhBAXEiDxsLIRIgFiATEIcDIQwLIAhB//97cSAIIAlBf0obIQggCSAHKQNAIhZQRXJFBEBBACEJIBMhDAwMCyAJIBZQIBMgDGtqIgEgCSABShshCQwLCyAHKAJAIgFBjqADIAEbIgxBACAJEJMEIgEgCSAMaiABGyERIAohCCABIAxrIAkgARshCQwKCyAJBEAgBygCQAwCC0EAIQEgAEEgIA5BACAIEJgBDAILIAdBADYCDCAHIAcpA0A+AgggByAHQQhqNgJAQX8hCSAHQQhqCyELQQAhAQJAA0AgCygCACIKRQ0BIAdBBGogChDPByIMQQBIIgogDCAJIAFrS3JFBEAgC0EEaiELIAkgASAMaiIBSw0BDAILC0F/IQ8gCg0LCyAAQSAgDiABIAgQmAEgAUUEQEEAIQEMAQtBACENIAcoAkAhCwNAIAsoAgAiCkUNASAHQQRqIAoQzwciCiANaiINIAFKDQEgACAHQQRqIAoQggEgC0EEaiELIA0gAUkNAAsLIABBICAOIAEgCEGAwABzEJgBIA4gASAOIAFKGyEBDAgLIAAgBysDQCAOIAkgCCABIAURVwAhAQwHCyAHIAcpA0A8ADdBASEJIBUhDCAKIQgMBAsgByABQQFqIgo2AkwgAS0AASEIIAohAQwACwALIBAhDyAADQQgFEUNAkEBIQEDQCAEIAFBAnRqKAIAIgAEQCADIAFBA3RqIAAgAiAGEMsHQQEhDyABQQFqIgFBCkcNAQwGCwtBASEPIAFBCk8NBANAIAQgAUECdGooAgANASABQQFqIgFBCkcNAAsMBAtBfyEPDAMLIABBICAPIBEgDGsiCyAJIAkgC0gbIgpqIg0gDiAOIA1IGyIBIA0gCBCYASAAIBIgDxCCASAAQTAgASANIAhBgIAEcxCYASAAQTAgCiALQQAQmAEgACAMIAsQggEgAEEgIAEgDSAIQYDAAHMQmAEMAQsLQQAhDwsgB0HQAGokACAPC2kBAn8CQCAAKAIUIAAoAhxNDQAgAEEAQQAgACgCJBEFABogACgCFA0AQX8PCyAAKAIEIgEgACgCCCICSQRAIAAgASACa6xBASAAKAIoESMAGgsgAEEANgIcIABCADcDECAAQgA3AgRBAAt5AQF/IAAEQCAAKAJMQX9MBEAgABCyBQ8LIAAQsgUPC0GgtAMoAgAEQEGgtAMoAgAQswUhAQtBjMQEKAIAIgAEQANAIAAoAkxBAE4Ef0EBBUEACxogACgCFCAAKAIcSwRAIAAQsgUgAXIhAQsgACgCOCIADQALCyABCysAIABDa9MNvJRDuhMvvZIgAJRDdaoqPpIgAJQgAEOu5TS/lEMAAIA/kpULIgEBfyMAQRBrIgEgADYCCCABIAEoAggoAgQ2AgwgASgCDAv2AQIEfwF+IwBBMGsiASQAAkACQAJAQZC2AygCACICLQCWNg0AIAItAJc2RQ0AIAIoArQ1IgMNAQsgAkHgAWoQgwEEQCAAIAIpA+ABNwIADAILIAAgAikC1Ds3AgAMAQsgAUEoaiADQQxqIAFBGGogAyACKAKMNkEEdGoiBEGUBmoiAyoCACACQdAqaioCAEMAAIBAlCADEHgQQJIgBCoCoAYgAkHUKmoqAgAgAxCvARBAkxAqEC8gAUEYahCMBCABIAEpAyAiBTcDCCABIAU3AwAgAUEQaiABQShqIAFBGGogARD8AiAAIAFBEGoQfwsgAUEwaiQACyUAIABB7PcCNgIAIAAoAhQQUEUEQCAAIAAoAgAoAgwRAQALIAALGwAgACABIAIoAgAgAhCaASADIAQgBSAGEOwBCx8AIAAoAgQgAUgEQCAAIAAgARBdELMHCyAAIAE2AgALGwAgACABIAIoAgAgAhCaASADIAQgBSAGEOoBCxIAIABBsPUCNgIAIAAQ6AcgAAuaAQEDf0GQtgMoAgAiAygC+DJBf2ohASAABEAgASAAELUHIgBBf2ogAEF/RhshAQsCQCABQQBIDQAgA0H4MmohAwNAAkAgAyABIgAQSCgCACIBRQ0AIAEtAHtFDQAgASgCCCICQYCAgAhxIAJBgIQQcUGAhBBGcg0AIAEQigQhAgwCCyAAQX9qIQFBACECIABBAEoNAAsLIAIQbgs9AQF/IwBBEGsiAyQAIAAoAgAgA0EIaiABEGgiACgCACADIAIQ1QMiASgCABAKIAEQKyAAECsgA0EQaiQAC1cCAX8BfiMAQRBrIgEkACAAQgA3AgQgAEEAOgAAIABCADcCDCABQQhqQwAAAABDAAAAABAqGiAAIAEpAwgiAjcCHCAAIAI3AiQgACACNwIUIAFBEGokAAuTAQMCfwF+AX1BkLYDKAIAIQEgAARAIAAQzAMaCyABIAA2AsQxIAFDAACAPyABKgKYASAAKgIQlCAAKgJElBAxOALMMQJAIAEoAqwzIgJFBEAMAQsgAhD/ASEEIAEoAsQxIQALIAEgBDgCyDEgACgCOCkCLCEDIAFB3DFqIAQ4AgAgAUHYMWogADYCACABIAM3A9AxCykBAn9BkLYDKAIAIgAoAqABIgEEfyABBSAAKAKUAUE0akEAEEgoAgALCzEBAX8gABDwByAAKAIABEAgACAAKAIAEPEHIAAQUxogACgCACEBIAAQ1QIaIAEQTQsLRgEBfyAAEJoBIgIgAUkEQCAAIAEgAmsQ/QwPCyACIAFLBEAgACgCACABQQJ0aiEBIAAQmgEhAiAAIAEQ8QcgACACEPUMCwsdACAAIAEgAigCACACEJoBIAMgBCAFIAYgBxDtAQstAQF/IAEgACgC/AVGBEBBAQ8LA0AgACABRiICRQRAIAAoAvgFIgANAQsLIAILGQAgACABNgIUIABBxOwCNgIAIAAQ+gcgAAsZACAAIAE2AhAgAEGM7AI2AgAgABD8ByAACxkAIAAgATYCDCAAQdTrAjYCACAAEP4HIAALZAEDfyMAQRBrIgEkACABQQA2AgwDQCAAKAIUIQMgAUEIaiAAIAJBAnRqQQRqEIoCIAMgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQRJDQALIAFBEGokAAtGAQJ/IAAoAgQgAUgEQCABQQF0EEshAiAAKAIIIgMEQCACIAMgACgCAEEBdBA+GiAAKAIIEEYLIAAgATYCBCAAIAI2AggLC2gCAn8BfSMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAhQgAUEMahDbASABQQhqEDMhAyAAIAEoAgxBAnRqIAM4AgQgAUEIahArIAEgASgCDEEBaiICNgIMIAJBBEkNAAsgAUEQaiQACxkAIAAgATYCDCAAQcjpAjYCACAAEIIIIAALEgAgAEHA5gI2AgAgABCLCCAACxIAIABBiOYCNgIAIAAQ0AUgAAsoAQF/IwBBEGsiAiQAIABBjMcCIAJBCGogARB3EAM2AgAgAkEQaiQACyoBAX8jAEEQayICJAAgAEHgsAMgAkEIaiABEHcQAzYCACACQRBqJAAgAAtkAQR/IwBBEGsiASQAIAFBADYCDCAAQQRqIQMDQCAAKAIIIQIgAUEIaiADEIUOIAIgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgwiAkEBaiIENgIMIAQgAkkNAAsgAUEQaiQAC2YBA38jAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIIIAFBDGoQ2wEgAUEIahCaAyECIAAgASgCDGogAjoABCABQQhqECsgASABKAIMIgJBAWoiAzYCDCADIAJJDQALIAFBEGokAAsNACAAIAEgARBrELELCw0AQZC2AygCAEGcOWoLMQEBfyAAEJUIIAAoAgAEQCAAIAAoAgAQkwggABBTGiAAKAIAIQEgABDbAhogARBNCwtDAQF/IAAQmwEiAiABSQRAIAAgASACaxDSDg8LIAIgAUsEQCAAKAIAIAFqIQEgABCbASECIAAgARCTCCAAIAIQyw4LCzcBAX8jAEEQayIDJAAgA0EIaiABIAIgACgCABEGACADQQhqEHohACADQQhqECsgA0EQaiQAIAALKAEBfyMAQRBrIgIkACAAQcjTAiACQQhqIAEQdxADNgIAIAJBEGokAAspAQF/IwBBEGsiAiQAIAIgADYCDCACQQxqIAEQehDcASACQRBqJAAgAAs3AQF/IAAoAgQiA0EBdSABaiEBIAAoAgAhACABIAIgA0EBcQR/IAEoAgAgAGooAgAFIAALEQAAC0QCAn8BfCMAQRBrIgEkACAAKAIAQYTMAigCACABQQRqEAQhAyABIAEoAgQQWCEAIAMQhAIhAiAAEJ4BIAFBEGokACACCw8AIABBGGoQVhogABCRBAs1AQF/IwBBEGsiAyQAIAMgADYCDCADQQxqIAEQehDcASADQQxqIAIQehDcASADQRBqJAAgAAsOACAAKAIIQf////8HcQsnAQF/IwBBEGsiAyQAIAMgARBCIAMgAiAAEQAAIAMQNSADQRBqJAAL2AEBBH9BkLYDKAIAIQIgACAAKALkAkEBaiIENgLkAiAAKALsAkEFcSIDRQRAIAAgACgC6AJBAWo2AugCCwJAIAIoAtAzIAFHIgUNACACLQDYN0UNACACQeozai0AAEECcQ0AIAIoAsQ3DQAgAiAANgLENyACIAAoAugCQQBBfyADG0EBIAItAPkBG2o2AtQ3CwJ/AkAgAigCwDcgAEcNAEEBIAQgAigCyDdGDQEaAkAgAw0AIAAoAugCIAIoAsw3Rw0AIAIgATYCzDVBAQ8LIAUNABBvC0EACwtnAQJ/QQEhAwJAQZC2AygCACgCtDUiAkUNAAJAIAIoAvwFIgJFDQAgAi0Ae0UNACACIAAoAvwFRg0AQQAhAyACKAIIIgBBgICAwABxDQEgAUEIcQ0AIABBgICAIHENAQtBASEDCyADCycBAX8jAEEQayICJAAgAEEDQdT6AkGUwQJBlQYgARABIAJBEGokAAs+AAJ/AkAgAEGQtgMoAgAiACgCrDNBkARqEN8CDQAgAQRAIAAoAtAzIAFGDQELQQEgAC0AoFpFDQEaC0EACwsnAQF/IwBBEGsiAiQAIABBBUGw+AJB5N8CQYcGIAEQASACQRBqJAALJwEBfyMAQRBrIgIkACAAQQVB8PQCQeTfAkH+BSABEAEgAkEQaiQACzYBAX9BkLYDKAIAIgFBADoAwDMgASAANgK8MwJAIABFDQAgASgCxDMgAEYNACABQgA3A8gzCwsnAQF/IwBBEGsiAiQAIABBAkGc4wJBmMMCQeIFIAEQASACQRBqJAALJwEBfyMAQRBrIgIkACAAQQNB9OICQZzDAkHeBSABEAEgAkEQaiQACycBAX8jAEEQayICJAAgAEEDQbTgAkGcwwJB2gUgARABIAJBEGokAAsnAQF/IwBBEGsiAiQAIABBA0GQ4AJBnMMCQdgFIAEQASACQRBqJAALJwEBfyMAQRBrIgIkACAAQQJBpN8CQZDGAkHRBSABEAEgAkEQaiQACycBAX8jAEEQayICJAAgAEEBQZS+AkHMvQJB0AUgARABIAJBEGokAAsOACAAQwAAAAA4AgAgAAsLACAAQQA2AgAgAAtbAQF/IAAQRBogAEEMahBEGiAAQRhqEEQaIABBQGsQRBogAEHMAGoQRBogAEHYAGoQRBogAEHkAGoiAkEIahBEGiACEOcGIABBADYCLCAAIAE2AiggABC7AyAACzkBAX8jAEEQayICJAAgAiABNgIMQfTGAiAAQQVBoNECQZTIAkGwASACQQxqECxBABACIAJBEGokAAs5AQF/IwBBEGsiAiQAIAIgATYCDEH0xgIgAEEDQajIAkGcwwJBkwEgAkEMahAsQQAQAiACQRBqJAALCQAgACABEMUPCw0AIAEgACgCAGovAQALGwAgACABIAAoAigqAgxDzcxMPpQgAkEIEKYCCzkCAX8BfCMAQRBrIgEkACAAKAIAQZDAAigCACABQQRqEAQhAiABIAEoAgQQWBCeASABQRBqJAAgAgsJACAAECkQWBoLXAECfyAAIAIQmhQiBAR/IAQgAzYCCCAEIAI2AgQgBCABNgIAIAJFBEAgBEF/NgIMQQAPCyAEIAAoAoQcIgE2AgwgACABIAJqNgKEHCAAIAFBAXRqQbAMagUgBQsLGgAgASAAKgI4IABBJGoQeJMQQEMAAAAAEDELEwBBkLYDKAIAKgLIMUMAAKBBlAusAQIDfwF9IwBBEGsiAyQAQZC2AygCACEEIANBCGogAUEAQQFDAACAvxBfIAMgAyoCCCAEQdAqaiIFKgIAkiADKgIMIARB1CpqKgIAIgYgBpKSECohASAFKgIAIQYgAQJ9IAIEQCABKgIAIAYgBEHoKmoqAgAgBCoCyDGSkpIMAQsgASoCACAGQwAAgD+SkgsiBjgCACAAIAYQ+AUQQCABKgIEECoaIANBEGokAAsNACAAKAJwIAEoAhBqC+8LAwt/AX4EfSMAQSBrIgQkAEGQtgMoAgAhBSAAQQA6AFwgACgCACIDQQFOBEADQAJAIAAgARCjASIDKAIIIAAoAiBIBEAgAygCACAAKAIQRw0BIABBADYCEAwBCyABIAJHBEAgACABEKMBIQMgACACEKMBIgYgAykCGDcCGCAGIAMpAhA3AhAgBiADKQIINwIIIAYgAykCADcCAAsgAkEBaiECCyABQQFqIgEgACgCACIDSA0ACwsgAiADRwRAIAAiASgCBCACSARAIAEgASACEF0Q4AgLIAEgAjYCAAsgACgCFCIDBEAgAEEANgIUIAAgAzYCEAsgACgCVCIBBEACQCAAIAEQoQMiAUUNAAJAIAAgARDHBCAAKAJYaiICQQBIDQAgAiAAKAIATg0AIAAgAhCjASECIAQgASkCGDcDGCAEIAEpAhA3AxAgBCABKQIINwMIIAQgASkCADcDACABIAIpAhg3AhggASACKQIQNwIQIAEgAikCCDcCCCABIAIpAgA3AgAgAiAEKQMYNwIYIAIgBCkDEDcCECACIAQpAwAiDDcCACACIAQpAwg3AgggDKciASADIAEgACgCEEYbIQMLIAAtAFJBwABxRQ0AQZC2AygCACIBKgL4WUMAAAAAX0EBc0UEQCABIAEoAhw2AvhZCwsgAEEANgJUCwJAIAAtAFBBBHFFDQAgABDrCCIBRQ0AIAAgASgCACIDNgIQCyAFQcg7aiIIIAAoAgAQ3wYCQCAAKAIAQQFIBEBBACEGDAELQQAhBkEAIQIDQCAAIAIQowEhAQJAIAYEQCAGKAIMIAEoAgxODQELIAEhBgsgACgCECEHIAEoAgAhCiAEIAAgARD6BSABKAIEQYCAwABxRRD5BSABIAQoAgAiCzYCHCAHIApGIQcgC74hDiACBH0gBSoC6CoFQwAAAAALIQ8gByAJciEJIAggAhCwAyACNgIAIAEoAhwhASAIIAIQsAMgATYCBCANIA8gDpKSIQ0gAkEBaiICIAAoAgBIDQALCwJAAkACQAJAAkAgDSAAQSRqIgcQeEMAAAAAEDEiDpNDAAAAACAOIA1dGyINQwAAAABeRQ0AIAAtAFBBwABxRQ0AIAVB0DtqKAIAIAUoAsg7IA0QygkgACgCAEEBSA0CQQAhAQNAAn8gCCABELADKgIEIg2LQwAAAE9dBEAgDagMAQtBgICAgHgLIQIgACAIIAEQsAMoAgAQowEgArI4AhggAUEBaiIBIAAoAgAiAkgNAAsMAQsQ+AUhDSAAKAIAQQFIDQFBACEBA0AgACABEKMBIgIgAioCHCANEEA4AhggAUEBaiIBIAAoAgAiAkgNAAsLIABBADYCPCACQQBMDQFDAAAAACENQQAhAQNAIAAgARCjASICIA04AhQgA0UEQCACKAIAIgNBACADIAUoAtA1RhshAwsgDSACKgIYIAUqAugqIg6SkiENIAFBAWoiASAAKAIASA0ACwwCCyAAQQA2AjwLIAVB6CpqKgIAIQ5DAAAAACENCyAAIA0gDpNDAAAAABAxIg04AjgCQCANIAcQeF5FDQAgACgCAEECSA0AIAAoAlBBkAFxQYABRw0AIAAQ6ggiAUUNACAAIAEoAgAiAzYCEAsCQAJAIAlBAXFFBEAgAEEANgIQDAELIAAoAhAiAQ0BC0EAIQEgBkUNACAAKAIUDQAgACAGKAIAIgE2AhAgASEDCyAAQQA6AF0gACABNgIYAkAgA0UNACAAIAMQoQMiAUUNACAAIAEQ6QgLIAAgACAAKgJAEPcFOAJAIAAgACAAKgJEEPcFIg04AkQCQCAAKgJAIg4gDVwEQCAAIAAqAkwgBSoCyDEiD0MAAIxClBAxIA0gDpOLQ5qZmT6VEDEiEDgCTAJAIAAoAiBBAWogBSgC4DJIDQAgACoCSCAPQwAAIEGUXg0AIA4gDSAQIAUqAhiUEOgIIQ0LIAAgDTgCQAwBCyAAQQA2AkwLIAAtAFJBEHFFBEAgAEHoAGpBABCGAgsgBEEgaiQACwwAIAAgASkCADcCAAv/AQIFfwF9IwBBEGsiAyQAEDYiAC0Af0UEQEGQtgMoAgAhAQJAEP8DRQ0AIAEoArw2QQFLDQAgASgCtDUiAi0AC0EQcUUNAANAIAIiBCgC+AUiAgRAIAItAAtBEHENAQsLIAAgAkcNACAEKALgAg0AIAEoArg2DQAgABBuIAAoApAGQQEgAEGkBmoQvgQgAUEBNgK4NiABQQE6AJY2IAFBATYCjDYQyQILEJQCEHIgACoCyAEhBSADIAAQjwUgACAFIAMqAgCTOALEAiAAQZwDahCJBUEAOgApEKUBIABBADoAwgIgAEKAgICAEDcCsAIgAEEBNgLcAgsgA0EQaiQAC/UBAgN/AX0jAEEwayIAJAACQBA2IgEtAH8NACABLQAJQQRxRQ0AELsBQZT2ARC8ASAAQSBqIAEQjwUgAEEQaiAAKgIgIgNDAAAAP5IQTCAAKgIkIAEqAkCSQwAAAD+SEEwgAyAAKgIoIAEqAjyTEDFDAAAAP5IQTCAAKgIsQwAAAD+SEEwQUiICIAFB0ANqEL0CIAIgAkEIakEAEJYCIABBCGogACoCICABKgLEApIgACoCJCABKgLIApIQKhogASAAKQMINwLIAUEBIQIgAUEBOgDCAiABQoGAgIAgNwKwAiABQQA2AtwCEKsGCyAAQTBqJAAgAgubAQEBfyAAQQA2AgggACAAKgIYIAEQMSIBOAIYIAAgACoCHCACEDE4AhwgACAAKgIgIAMQMTgCIEMAAAAAIQIDQCACIAECfUMAAAAAIARFDQAaQwAAAAAgAUMAAAAAXkEBcw0AGiAAKgIAC5KSIQIgBEEBaiIEQQNHBEAgACAEQQJ0aioCGCEBDAELCyAAIAI4AgggACoCBCACEDELrgsCDX8FfSMAQdABayIJJAACQBA2Ig8tAH8NAEGQtgMoAgAhCyAPIAEQVSEMIAlByAFqIAFBAEEBQwAAgL8QXyAIKgIAIhdDAAAAAFsEQCAIEIsBIhc4AgALIAgqAgRDAAAAAFsEQCAIIAkqAswBIAtB1CpqKgIAIhYgFpKSOAIECyAJQagBaiAPQcgBaiIKIAgQLyAJQZABaiAJQbgBaiAKIAlBqAFqEDwiCiALQdAqaiIIEC8gCUGgAWogCkEIaiIRIAgQOCAJQagBaiAJQZABaiAJQaABahA8IQ0gCUGgAWogESAJQYgBaiAJKgLIASIWQwAAAABeQQFzBH1DAAAAAAUgFiALQegqaioCAJILQwAAAAAQKhAvIAlBkAFqIAogCUGgAWoQPCIIIAtB1CpqKgIAEJwBIAhBACAKEFRFDQBD//9/fyEWIAogDBC8AiEMIAZD//9/f1xBACAHQ///f39cG0UEQEEAIQhD//9//yEYIANBAEoEQANAQQAgCCACEQ8AIhkgGVsEQCAWIBkQQCEWIBggGRAxIRgLIAhBAWoiCCADRw0ACwsgGCAHIAdD//9/f1sbIQcgFiAGIAZD//9/f1sbIQYLIAkgCikDADcDgAEgCSAKKQMINwN4QQdDAACAPxA3IQggC0HYKmoqAgAhFiAJIAkpA4ABNwNQIAkgCSkDeDcDSCAJQdAAaiAJQcgAaiAIQQEgFhC1AQJAQQFBAiAAGyADSg0AIAMgAEUiEGshDgJ/IBeLQwAAAE9dBEAgF6gMAQtBgICAgHgLIAMQwgEhEkF/IQgCQCAMRQ0AIA0gC0HgAWoQuARFDQBBAAJ/IAsqAuABIA0qAgAiFpMgDSoCCCAWk5VDAAAAAENy+X8/EF4gDrKUIhaLQwAAAE9dBEAgFqgMAQtBgICAgHgLIgggBGogA28gAhEPACEWQQAgCEEBaiIMIARqIANvIAIRDwAhFyAARQRAIAkgF7s5AyggCSAMNgIgIAkgCDYCECAJIBa7OQMYQb71ASAJQRBqEMkDDAELIABBAUcNACAJIAg2AjAgCSAWuzkDOEHS9QEgCUEwahDJAwsgCUGgAWpDAAAAAEMAAIA/QwAAgD8gByAGk5VDAAAAACAGIAdcGyIXQQAgBCADbyACEQ8AIAaTlBBKkxAqIRVBKEEmIAAbQwAAgD8QNyETQSlBJyAAG0MAAIA/EDchFCASIBBrIhBBAUgNAEMAAIA/IBCylSEYIBcgBoyUQwAAAABDAACAPyAGQwAAAABdGyAHIAaUQwAAAABdGyEZIA1BCGohDCAEQQFqIRIgDrIhGkEAIQRDAAAAACEWA0AgCUGIAWogGCAWIgeSIhZDAACAPyAXQQAgEgJ/IAcgGpRDAAAAP5IiB4tDAAAAT10EQCAHqAwBC0GAgICAeAsiDmogA28gAhEPACAGk5QQSpMQKhogCUHwAGogDSAMIBUQ9gECQCAARQRAIAkgCSkDiAE3A2AgCUHoAGogDSAMIAlB4ABqEPYBIA8oAvwEIAlB8ABqIAlB6ABqIBQgEyAIIA5GG0MAAIA/ENEBDAELIAlB6ABqIA0gDCAJQeAAaiAJKgKIASAZECoQ9gEgAEEBRw0AIAkqAmgiByAJKgJwQwAAAECSYEEBc0UEQCAJIAdDAACAv5I4AmgLIA8oAvwEIAlB8ABqIAlB6ABqIBQgEyAIIA5GG0MAAAAAQQ8QbQsgCSAJKQOIATcDoAEgBEEBaiIEIBBHDQALCyAFBEAgCUGgAWogCioCACAKKgIEIAsqAtQqkhAqIBEgBUEAQQAgCUGIAWpDAAAAP0MAAAAAECpBABC2AQsgCSoCyAFDAAAAAF5BAXMNACAJIAlB2ABqIBEqAgAgC0HoKmoqAgCSIA0qAgQQKikCADcDCCAJQQhqIAFBAEEBEKkBCyAJQdABaiQAC/sBAQN/IwBBMGsiBiQAIAAgAyAEEIIGBEBBkLYDKAIAIQcCQCAGQRhqIAMQgwQQvAMiABCkA0UEQBDJBAwBC0EAIQQDQCAAKAIQIgUgACgCFEgEQANAIAEoAgAhA0EAIAUgBkEUaiACEQUARQRAIAZBvu0BNgIUCyAFENIBIAYoAhQgAyAFRkEAIAZBCGpDAAAAAEMAAAAAECoQoAEEQCABIAU2AgBBASEECyADIAVGBEAQigULEHIgBUEBaiIFIAAoAhRIDQALCyAAEKQDDQALEMkEQQAhBSAEQQFxRQ0AIAcoAqwzKAKIAhCzAUEBIQULCyAGQTBqJAAgBQtsAgN/AX0jAEEQayIDJAAgAkF/TARAIAFBBxDCASECCxCNAyEFIANBCGoQNCIEQQA2AgAgBCACsiIGQwAAgD6SIAYgAiABSBsQgwSUIAUqAjwiBiAGkpI4AgQgACAEEIMGIQAgA0EQaiQAIAALzwMCBn8DfSMAQfAAayICJABBkLYDKAIAIQMCQBA2IgUtAH8NACAAEP4GIQcgAkHoAGogAEEAQQFDAACAvxBfIAIgASkCADcDWBCLASEIEIMEIQkgA0HkKmoqAgAhCiACIAIpA1g3AxAgAkHgAGogAkEQaiAIIAogCUPNzOxAlJIQwgMgAkEwaiAFQcgBaiIBIAJB0ABqIAIqAmAgAioCZCACKgJsEDEQKhAvQwAAAAAhCCACQShqIAJBQGsgASACQTBqEDwiAUEIaiACQSBqIAIqAmgiCUMAAAAAXkEBcwR9IAgFIAkgA0HoKmoqAgCSC0MAAAAAECoQLyACQTBqIAEgAkEoahA8IQQgBSACKQM4NwKYAiAFIAIpAzA3ApACIANB6DRqEJUCIAQgBEEIahD9BiIGRQRAIAJBKGogBBDdASACQShqIANB1CpqKgIAEHwgBEEAIAEQVBoMAQsQuwEgAioCaEMAAAAAXkEBc0UEQCACIAJBGGogASoCCCADQegqaioCAJIgASoCBCADQdQqaioCAJIQKikCADcDCCACQQhqIABBAEEBEKkBCyACQShqIAEQ3QEgByACQShqQQAQkwUaCyACQfAAaiQAIAYLUQEBf0GQtgMoAgAoAqwzIgEgACgCADYCiAIgASAAKAIENgKMAiABIAApAgg3ApACIAEgACkCEDcCmAIgASAAKQIYNwKgAiABIAApAiA3AqgCCxkAIABBCGoQVhogAEEYahBWGiAAEIEJIAALIgIBfwF9QZC2AygCACIAKgLIMSAAQdAqaioCACIBIAGSkgtDAQF/IwBBEGsiASQAIAEgADYCDBA2IQBDAAAAABDBAyAAIAAoAoACQQFqNgKAAiAAQcQDaiABQQxqEHYgAUEQaiQACz4BAn8QNiIFLQB/BH8gBAVBkLYDKAIAQcDeAGoiBEGBGCACIAMQygIhAiAFIAAQmAMgASAEIAIgBGoQ4gILCz0BAn8QNiIFLQB/BH8gBAVBkLYDKAIAQcDeAGoiBEGBGCACIAMQygIhAiAFIAAQVSABIAQgAiAEahDiAgsLXQEBfSAAQf8BcSABQf8BcSABQRh2s0MAAH9DlSICEPACIABBCHZB/wFxIAFBCHZB/wFxIAIQ8AJBCHRyIABBEHZB/wFxIAFBEHZB/wFxIAIQ8AJBEHRyQYCAgHhyC9UCAwJ/AX4GfSMAQYABayIEJAAgBEH4AGogASoCACIJIAIqAgAiCJIiCkMAAIA/kiABKgIEIgcQKiEBIARB8ABqIAhDAAAAQJIiCyACKgIEQwAAgD+SIgwQKiEFIAQgASkCADcDOCAEIAUpAgA3AzAgACAEQThqIARBMGpBAUGAgIB4EPIDIARB6ABqIAogBxAqIQEgBCACKQIAIgY3A2AgBCABKQIANwMoIAQgBjcDICAAIARBKGogBEEgakEBQX8Q8gMgBEHYAGogCSADkiAIkyIDQwAAgL+SIAcQKiEBIARB0ABqIAsgDBAqIQIgBCABKQIANwMYIAQgAikCADcDECAAIARBGGogBEEQakEAQYCAgHgQ8gMgBEHIAGogAyAHECohASAEIAY3A0AgBCABKQIANwMIIAQgBjcDACAAIARBCGogBEEAQX8Q8gMgBEGAAWokAAsvAQF9IAAgASoCACIEIAIqAgAgBJMgA5SSIAEqAgQiBCACKgIEIASTIAOUkhAqGgu1AgIFfwJ9IwBBIGsiBCQAIAAoAgQhAyAEQgA3AwggBEEANgIcIARCADcCFAJAIANBAUgNAANAIARBCGogACAFEIsCIAQoAhwiBkEBSA0BAkAgBQ0AIAggBCoCFJIgAl5FDQBBACEDDAILIAggBCoCGJIgAl5FBEAgCCAEKgIQkiEIIAUgBmoiBSADSA0BDAILCyAEKgIIIgggAV4EQCAFIQMMAQsgBCoCDCABXkEBc0UEQCAGQQEgBkEBShshB0EAIQMDQCAIIAAgBSADEOEDIgmSIgIgAV5BAXNFBEAgAyAFaiEDIAggCUMAAAA/lJIgAV4NAyADQQFqIQMMAwsgAiEIIANBAWoiAyAHRw0ACwsgBSAGaiIDQX9qIgUgAyAAIAUQ6AFBCkYbIQMLIARBIGokACADC4oDAgR/An0jAEEgayIEJAACQCACIAEoAgRGBEAgAwRAIARBCGogAUEAEIsCIAAgAjYCECAAQQA2AgwgAEEANgIEIAAgBCoCGCAEKgIUkzgCCCAAIAQoAgw2AgAMAgsgAEGAgID8AzYCCCAAQgA3AgBBACEDIAJBAU4EQANAIARBCGogASADIgUQiwIgBCgCHCADaiIDIAJIDQALCyAAIAU2AhQgAEEANgIQIAAgAzYCDAwBC0EAIQMgAEEANgIEIARBCGogAUEAEIsCAkAgBCgCHCIFIAJKBEAgBSEGDAELA0AgAyEHIAAgBCoCECAAKgIEkjgCBCAEQQhqIAEgBSIDEIsCIAQoAhwiBiADaiIFIAJMDQALCyAAIAY2AhAgACADNgIMIAQqAhQhCCAEKgIYIQkgACAHNgIUIAAgCSAIkzgCCCAAIAQoAgg2AgAgAyACTg0AIAIgA2shAkEAIQUDQCAAIAEgAyAFEOEDIAAqAgCSOAIAIAVBAWoiBSACRw0ACwsgBEEgaiQAC0ACAX8BfSAAKAIIIgFBAE4EQCABQf////8HRwRAIAAqAgAgACoCBCICIAGylJIgAhChBgsgAEL/////PzcCCAsLMQECfyAAKAIEIQIDQCABIgNBAWoiASACSARAIAAgARDeCEUNAQsLIAEgAiADIAJIGwshAANAIAFBAUgEQEEADwsgACABQX9qIgEQ3ghFDQALIAELEQAgAEEYaiABQQAgAhD2BRoLOAEBfyMAQRBrIgYkACAAIAEgAiADIAZBCGpDAAAAAEMAAAAAECogBCAFEOoDIQAgBkEQaiQAIAALGQAgAEEAIAEgAiADIARBgIDAAHIgBRDqAwssAQF/EDYiASABKgIQIAEqAlSTIACSIgA4AswBIAEgASoC5AEgABAxOALkAQs7AQJ/IAAgACgCPCAAKAIEIgEQwgE2AjwgAEFAayICIAIoAgAgARDCATYCACAAIAAoAkQgARDCATYCRAuFAQEEfwJAIABBAWogACAALQAAQS1GIgUbIgNBAWogAyAAIAVqLQAAQStGGyIALQAAIgRBUGpB/wFxQQlLBEAgACEDDAELA0AgAkEKbCAEakFQaiECIAAtAAEhBCAAQQFqIgMhACAEQVBqQf8BcUEKSQ0ACwsgAUEAIAJrIAIgBRs2AgAgAwtAAQF/IwBBEGsiBSQAIAUgAzYCCCAFIAI2AgwgAEEEIAEgBUEMaiAFQQhqIARDAACAPxDPBCEAIAVBEGokACAACz0BAX8jAEEQayIGJAAgBiADOAIIIAYgAjgCDCAAQQggASAGQQxqIAZBCGogBCAFEM8EIQAgBkEQaiQAIAALDAAgACABIAAgAWYbCwwAIAAgASAAIAFjGwvIAQEBfyABIAJiBH0gA0MAAIA/XCEFAnwgASACY0EBc0UEQCAAIAEgAhDYCAwBCyAAIAIgARDYCAshACAFBEAgAEQAAAAAAAAAAGNBAXNFBEBDAACAP0MAAIA/IAAgAaFEAAAAAAAAAAAgAhCbBiABoaO2k0MAAIA/IAOVEGWTIASUDwtDAACAPyAEkyAARAAAAAAAAAAAIAEQmgYiAKEgAiAAoaO2QwAAgD8gA5UQZZQgBJIPCyAAIAGhIAIgAaGjtgVDAAAAAAsLtQEBAX8gASACXAR9IANDAACAP1whBQJ9IAEgAl1BAXNFBEAgACABIAIQXgwBCyAAIAIgARBeCyEAIAUEQCAAQwAAAABdQQFzRQRAQwAAgD9DAACAPyAAIAGTQwAAAAAgAhBAIAGTlZNDAACAPyADlRBlkyAElA8LQwAAgD8gBJMgAEMAAAAAIAEQMSIAkyACIACTlUMAAIA/IAOVEGWUIASSDwsgACABkyACIAGTlQVDAAAAAAsLOwAgASACUgR9An4gAiABVgRAIAAgASACENkIDAELIAAgAiABENkICyABfbogAiABfbqjtgVDAAAAAAsLOwAgASACUgR9An4gAiABVQRAIAAgASACENoIDAELIAAgAiABENoICyABfbkgAiABfbmjtgVDAAAAAAsLOgAgASACRwR9An8gAiABSwRAIAAgASACENsIDAELIAAgAiABENsICyABa7MgAiABa7OVBUMAAAAACwtFAQF/IAAQlQYQNiICIAIqAswBIgAgAZM4AtQBIAIgAUGQtgMoAgBB5CpqKgIAkzgC9AEgAigCwAMiAgRAIAIgADgCHAsLogEBAX8gASACRwR9An8gAiABSgRAIAAgASACEJ8BDAELIAAgAiABEJ8BCyEAIAUEQCAAQX9MBEBDAACAP0MAAIA/IAAgAWtBACACEMIBIAFrbbKTQwAAgD8gA5UQZZMgBJQPC0MAAIA/IASTIABBACABELkBIgBrIAIgAGttskMAAIA/IAOVEGWUIASSDwsgACABa7IgAiABa7KVBUMAAAAACwviAwECfyMAQRBrIgokAAJAAkACQAJAAkACQAJAAkACQAJAAkAgAg4KAAECAwQFBgcICQoLIAogAywAADYCDCAAIAEgCkEMaiAELAAAIAUsAAAgBiAHIAggCRDSBCILRQ0JIAMgCigCDDoAAAwJCyAKIAMtAAA2AgwgACABIApBDGogBC0AACAFLQAAIAYgByAIIAkQ0QQiC0UNCCADIAooAgw6AAAMCAsgCiADLgEANgIMIAAgASAKQQxqIAQuAQAgBS4BACAGIAcgCCAJENIEIgtFDQcgAyAKKAIMOwEADAcLIAogAy8BADYCDCAAIAEgCkEMaiAELwEAIAUvAQAgBiAHIAggCRDRBCILRQ0GIAMgCigCDDsBAAwGCyAAIAEgAyAEKAIAIAUoAgAgBiAHIAggCRDSBCELDAULIAAgASADIAQoAgAgBSgCACAGIAcgCCAJENEEIQsMBAsgACABIAMgBCkDACAFKQMAIAYgByAIIAkQrQkhCwwDCyAAIAEgAyAEKQMAIAUpAwAgBiAHIAggCRCsCSELDAILIAAgASADIAQqAgAgBSoCACAGIAcgCCAJEKsJIQsMAQsgACABIAMgBCsDACAFKwMAIAYgByAIIAkQqgkhCwsgCkEQaiQAIAsL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JGxqIAFBJBA+GiAAIAAoAgBBAWo2AgALWAAgAQRAQZC2AygCACEBIAAgACgCxAM7AagDIAAgACgCnAM7AaoDIAAgASgCqDU7AawDIAAgASgC+DQ7Aa4DIAAgASgChDU7AbADIAAgASgCkDU7AbIDCwtGAQJ/IAAoAgQgAUgEQCABQSRsEEshAiAAKAIIIgMEQCACIAMgACgCAEEkbBA+GiAAKAIIEEYLIAAgATYCBCAAIAI2AggLC7cBAQR/AkAgAigCECIDBH8gAwUgAhCXCw0BIAIoAhALIAIoAhQiBWsgAUkEQCACIAAgASACKAIkEQUADwsCQCACLABLQQBIDQAgASEEA0AgBCIDRQ0BIAAgA0F/aiIEai0AAEEKRw0ACyACIAAgAyACKAIkEQUAIgQgA0kNASAAIANqIQAgASADayEBIAIoAhQhBSADIQYLIAUgACABED4aIAIgAigCFCABajYCFCABIAZqIQQLIAQLPgECf0GQtgMoAgAiAUH4MmohAiABKAL4MiEBA0AgAUEBSARAQX8PCyACIAFBf2oiARBIKAIAIABHDQALIAELngYCBH8DfiMAQYABayIFJAACQAJAAkAgAyAEQgBCABDOAkUNACADIAQQmAshByACQjCIpyIIQf//AXEiBkH//wFGDQAgBw0BCyAFQRBqIAEgAiADIAQQWiAFIAUpAxAiASAFKQMYIgIgASACEL8HIAUpAwghAiAFKQMAIQQMAQsgASACQv///////z+DIAatQjCGhCIKIAMgBEL///////8/gyAEQjCIp0H//wFxIgetQjCGhCIJEM4CQQBMBEAgASAKIAMgCRDOAgRAIAEhBAwCCyAFQfAAaiABIAJCAEIAEFogBSkDeCECIAUpA3AhBAwBCyAGBH4gAQUgBUHgAGogASAKQgBCgICAgICAwLvAABBaIAUpA2giCkIwiKdBiH9qIQYgBSkDYAshBCAHRQRAIAVB0ABqIAMgCUIAQoCAgICAgMC7wAAQWiAFKQNYIglCMIinQYh/aiEHIAUpA1AhAwsgCUL///////8/g0KAgICAgIDAAIQhCyAKQv///////z+DQoCAgICAgMAAhCEKIAYgB0oEQANAAn4gCiALfSAEIANUrX0iCUIAWQRAIAkgBCADfSIEhFAEQCAFQSBqIAEgAkIAQgAQWiAFKQMoIQIg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IQEgABDeAgR/IAAQ3QVBf2oFIAELC3gBA38jAEEQayIDJABBbyACTwRAAkAgAkEKTQRAIAAgAhC1BCAAIQQMAQsgACACEKwFQQFqIgUQpwUiBBCrBSAAIAUQqgUgACACEI8ECyAEIAEgAhCOBCADQQA6AA8gAiAEaiADQQ9qELQEIANBEGokAA8LEK0FAAuIEQIFfwx+IwBBwAFrIgUkACAEQv///////z+DIRIgAkL///////8/gyELIAIgBIVCgICAgICAgICAf4MhESAEQjCIp0H//wFxIQcCQAJAAkAgAkIwiKdB//8BcSIJQX9qQf3/AU0EQCAHQX9qQf7/AUkNAQsgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhEQwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCERIAMhAQwCCyABIAxCgICAgICAwP//AIWEUARAIAMgAkKAgICAgIDA//8AhYRQBEBCACEBQoCAgICAgOD//wAhEQwDCyARQoCAgICAgMD//wCEIRFCACEBDAILIAMgAkKAgICAgIDA//8AhYRQBEBCACEBDAILIAEgDIRQDQIgAiADhFAEQCARQoCAgICAgMD//wCEIRFCACEBDAILIAxC////////P1gEQCAFQbABaiABIAsgASALIAtQIgYbeSAGQQZ0rXynIgZBcWoQjAFBECAGayEGIAUpA7gBIQsgBSkDsAEhAQsgAkL///////8/Vg0AIAVBoAFqIAMgEiADIBIgElAiCBt5IAhBBnStfKciCEFxahCMASAGIAhqQXBqIQYgBSkDqAEhEiAFKQOgASEDCyAFQZABaiASQoCAgICAgMAAhCIUQg+GIANCMYiEIgJChMn5zr/mvIL1ACACfSIEENUBIAVBgAFqQgAgBSkDmAF9IAQQ1QEgBUHwAGogBSkDiAFCAYYgBSkDgAFCP4iEIgQgAhDVASAFQeAAaiAEQgAgBSkDeH0Q1QEgBUHQAGogBSkDaEIBhiAFKQNgQj+IhCIEIAIQ1QEgBUFAayAEQgAgBSkDWH0Q1QEgBUEwaiAFKQNIQgGGIAUpA0BCP4iEIgQgAhDVASAFQSBqIARCACAFKQM4fRDVASAFQRBqIAUpAyhCAYYgBSkDIEI/iIQiBCACENUBIAUgBEIAIAUpAxh9ENUBIAYgCSAHa2ohBgJ+QgAgBSkDCEIBhiAFKQMAQj+IhEJ/fCIMQv////8PgyIEIAJCIIgiCn4iDSAMQiCIIgwgAkL/////D4MiEH58IgJCIIggAiANVK1CIIaEIAogDH58IAJCIIYiCiAEIBB+fCICIApUrXwgAiAEIANCEYhC/////w+DIg1+IhAgDCADQg+GQoCA/v8PgyIOfnwiCkIghiIPIAQgDn58IA9UrSAMIA1+IAogEFStQiCGIApCIIiEfHx8IgogAlStfCAKQgBSrXx9IgJC/////w+DIg0gBH4iECAMIA1+Ig4gBCACQiCIIg9+fCICQiCGfCINIBBUrSAMIA9+IAIgDlStQiCGIAJCIIiEfHwgDUIAIAp9IgJCIIgiCiAEfiIQIAJC/////w+DIg4gDH58IgJCIIYiDyAEIA5+fCAPVK0gCiAMfiACIBBUrUIghiACQiCIhHx8fCICIA1UrXwgAkJ+fCIQIAJUrXxCf3wiCkL/////D4MiAiALQgKGIAFCPoiEQv////8PgyIEfiINIAFCHohC/////w+DIgwgCkIgiCIKfnwiDiANVK0gDiAQQiCIIg0gC0IeiEL//+//D4NCgIAQhCILfnwiDyAOVK18IAogC358IAIgC34iEyAEIAp+fCIOIBNUrUIghiAOQiCIhHwgDyAOQiCGfCIOIA9UrXwgDiAMIA1+IhMgEEL/////D4MiECAEfnwiDyATVK0gDyACIAFCAoZC/P///w+DIhN+fCIVIA9UrXx8Ig8gDlStfCAPIAogE34iCiALIBB+fCILIAQgDX58IgQgAiAMfnwiAkIgiCACIARUrSALIApUrSAEIAtUrXx8QiCGhHwiCyAPVK18IAsgFSANIBN+IgQgDCAQfnwiDEIgiCAMIARUrUIghoR8IgQgFVStIAQgAkIghnwgBFStfHwiBCALVK18IgJC/////////wBYBEAgAUIxhiAEQv////8PgyIBIANC/////w+DIgx+IgtCAFKtfUIAIAt9IhAgBEIgiCILIAx+Ig4gASADQiCIIgp+fCINQiCGIg9UrX0gAkL/////D4MgDH4gASASQv////8Pg358IAogC358IA0gDlStQiCGIA1CIIiEfCAEIBRCIIh+IAMgAkIgiH58IAIgCn58IAsgEn58QiCGfH0hEiAGQX9qIQYgECAPfQwBCyAEQiGIIQogAUIwhiACQj+GIARCAYiEIgRC/////w+DIgEgA0L/////D4MiDH4iC0IAUq19QgAgC30iDSABIANCIIgiC34iECAKIAJCH4aEIg5C/////w+DIg8gDH58IgpCIIYiE1StfSAEIBRCIIh+IAMgAkIhiH58IAJCAYgiAiALfnwgDiASfnxCIIYgCyAPfiACQv////8PgyAMfnwgASASQv////8Pg358IAogEFStQiCGIApCIIiEfHx9IRIgDSATfQshASAGQYCAAU4EQCARQoCAgICAgMD//wCEIRFCACEBDAELIAZB//8AaiEHIAZBgYB/TARAAkAgBw0AIAQgAUIBhiADViASQgGGIAFCP4iEIgEgFFYgASAUURutfCIBIARUrSACQv///////z+DfCICQoCAgICAgMAAg1ANACACIBGEIREMAgtCACEBDAELIAQgAUIBhiADWiASQgGGIAFCP4iEIgEgFFogASAUURutfCIBIARUrSACQv///////z+DIAetQjCGhHwgEYQhEQsgACABNwMAIAAgETcDCCAFQcABaiQADwsgAEIANwMAIABCgICAgICA4P//ACARIAIgA4RQGzcDCCAFQcABaiQAC8cBAgF/An5BfyEDAkAgAEIAUiABQv///////////wCDIgRCgICAgICAwP//AFYgBEKAgICAgIDA//8AURsNAEEAIAJC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAAgBCAFhIRQBEBBAA8LIAEgAoNCAFkEQCAAQgBUIAEgAlMgASACURsNASAAIAEgAoWEQgBSDwsgAEIAViABIAJVIAEgAlEbDQAgACABIAKFhEIAUiEDCyADCy4CAX8BfCMAQRBrIgEkACABIAAQvQsgASkDACABKQMIEK4FIQIgAUEQaiQAIAILpAEBBX8jAEGAAmsiBCQAAkAgAkECSA0AIAEgAkECdGoiByAENgIAIABFDQAgBCEDA0AgAyABKAIAIABBgAIgAEGAAkkbIgUQPhpBACEDA0AgASADQQJ0aiIGKAIAIAEgA0EBaiIDQQJ0aigCACAFED4aIAYgBigCACAFajYCACACIANHDQALIAAgBWsiAEUNASAHKAIAIQMMAAsACyAEQYACaiQACyYBAX8gACgCAEF/amgiAUUEQCAAKAIEaCIAQSBqQQAgABsPCyABC0MAAkAgAEUNAAJAAkACQAJAIAFBAmoOBgABAgIEAwQLIAAgAjwAAA8LIAAgAj0BAA8LIAAgAj4CAA8LIAAgAjcDAAsL+AMCA38BfgJAAkACQAJ/IAAoAgQiAiAAKAJoSQRAIAAgAkEBajYCBCACLQAADAELIAAQUQsiA0FVag4DAQABAAsgA0FQaiEBDAELIANBLUYhBAJAIAFFAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyICQVBqIgFBCklyDQAgACgCaEUNACAAIAAoAgRBf2o2AgQLIAIhAwsCQCABQQpJBEBBACEBA0AgAyABQQpsaiEBAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyIDQVBqIgJBCU1BACABQVBqIgFBzJmz5gBIGw0ACyABrCEFAkAgAkEKTw0AA0AgA60gBUIKfnxCUHwhBQJ/IAAoAgQiASAAKAJoSQRAIAAgAUEBajYCBCABLQAADAELIAAQUQsiA0FQaiICQQlLDQEgBUKuj4XXx8LrowFTDQALCyACQQpJBEADQAJ/IAAoAgQiASAAKAJoSQRAIAAgAUEBajYCBCABLQAADAELIAAQUQtBUGpBCkkNAAsLIAAoAmgEQCAAIAAoAgRBf2o2AgQLQgAgBX0gBSAEGyEFDAELQoCAgICAgICAgH8hBSAAKAJoRQ0AIAAgACgCBEF/ajYCBEKAgICAgICAgIB/DwsgBQvvBwIFfwJ+IwBBMGsiBSQAAkAgAkECTQRAIAJBAnQiAkGMpgNqKAIAIQcgAkGApgNqKAIAIQgDQAJ/IAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAADAELIAEQUQsiAhCGAw0AC0EBIQYCQAJAIAJBVWoOAwABAAELQX9BASACQS1GGyEGIAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAAIQIMAQsgARBRIQILAkACQANAIARBuKUDaiwAACACQSByRgRAAkAgBEEGSw0AIAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAAIQIMAQsgARBRIQILIARBAWoiBEEIRw0BDAILCyAEQQNHBEAgBEEIRg0BIANFIARBBElyDQIgBEEIRg0BCyABKAJoIgIEQCABIAEoAgRBf2o2AgQLIANFIARBBElyDQADQCACBEAgASABKAIEQX9qNgIECyAEQX9qIgRBA0sNAAsLIAUgBrJDAACAf5QQtAsgBSkDCCEJIAUpAwAhCgwCCwJAAkACQCAEDQBBACEEA0AgBEHBpQNqLAAAIAJBIHJHDQECQCAEQQFLDQAgASgCBCICIAEoAmhJBEAgASACQQFqNgIEIAItAAAhAgwBCyABEFEhAgsgBEEBaiIEQQNHDQALDAELAkACQCAEDgQAAQECAQsCQCACQTBHDQACfyABKAIEIgQgASgCaEkEQCABIARBAWo2AgQgBC0AAAwBCyABEFELQV9xQdgARgRAIAVBEGogASAIIAcgBiADEMYLIAUpAxghCSAFKQMQIQoMBgsgASgCaEUNACABIAEoAgRBf2o2AgQLIAVBIGogASACIAggByAGIAMQxQsgBSkDKCEJIAUpAyAhCgwECyABKAJoBEAgASABKAIEQX9qNgIECwwBCwJAAn8gASgCBCICIAEoAmhJBEAgASACQQFqNgIEIAItAAAMAQsgARBRC0EoRgRAQQEhBAwBC0KAgICAgIDg//8AIQkgASgCaEUNAyABIAEoAgRBf2o2AgQMAwsDQAJ/IAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAADAELIAEQUQsiAkFQakEKSSACQb9/akEaSXIgAkHfAEZyRUEAIAJBn39qQRpPG0UEQCAEQQFqIQQMAQsLQoCAgICAgOD//wAhCSACQSlGDQIgASgCaCICBEAgASABKAIEQX9qNgIECyADBEAgBEUNAwNAIARBf2ohBCACBEAgASABKAIEQX9qNgIECyAEDQALDAMLC0HAwwRBHDYCACABQgAQ1gELQgAhCQsgACAKNwMAIAAgCTcDCCAFQTBqJAALvwIBAX8jAEHQAGsiBCQAAkAgA0GAgAFOBEAgBEEgaiABIAJCAEKAgICAgICA//8AEFogBCkDKCECIAQpAyAhASADQf//AUgEQCADQYGAf2ohAwwCCyAEQRBqIAEgAkIAQoCAgICAgID//wAQWiADQf3/AiADQf3/AkgbQYKAfmohAyAEKQMYIQIgBCkDECEBDAELIANBgYB/Sg0AIARBQGsgASACQgBCgICAgICAwAAQWiAEKQNIIQIgBCkDQCEBIANBg4B+SgRAIANB/v8AaiEDDAELIARBMGogASACQgBCgICAgICAwAAQWiADQYaAfSADQYaAfUobQfz/AWohAyAEKQM4IQIgBCkDMCEBCyAEIAEgAkIAIANB//8Aaq1CMIYQWiAAIAQpAwg3AwggACAEKQMANwMAIARB0ABqJAALNQAgACABNwMAIAAgAkL///////8/gyAEQjCIp0GAgAJxIAJCMIinQf//AXFyrUIwhoQ3AwgLugEBAn8jAEGgAWsiBCQAIARBCGpBqKQDQZABED4aAkACQCABQX9qQf////8HTwRAIAENAUEBIQEgBEGfAWohAAsgBCAANgI0IAQgADYCHCAEQX4gAGsiBSABIAEgBUsbIgE2AjggBCAAIAFqIgA2AiQgBCAANgIYIARBCGogAiADEMoHIQAgAUUNASAEKAIcIgEgASAEKAIYRmtBADoAAAwBC0HAwwRBPTYCAEF/IQALIARBoAFqJAAgAAsRACAAIAEgAkGAB0GBBxDNBwuYAgACQAJAIAFBFEsNAAJAAkACQAJAAkACQAJAAkAgAUF3ag4KAAECCQMEBQYJBwgLIAIgAigCACIBQQRqNgIAIAAgASgCADYCAA8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATUCADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LIAAgAiADEQAACw8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASkDADcDAAtEAQN/IAAoAgAsAAAQrwIEQANAIAAoAgAiAiwAACEDIAAgAkEBajYCACADIAFBCmxqQVBqIQEgAiwAARCvAg0ACwsgAQv7AgEDfyMAQdABayIFJAAgBSACNgLMAUEAIQIgBUGgAWpBAEEoEE8aIAUgBSgCzAE2AsgBAkBBACABIAVByAFqIAVB0ABqIAVBoAFqIAMgBBCxBUEASARAQX8hAQwBCyAAKAJMQQBOBEBBASECCyAAKAIAIQYgACwASkEATARAIAAgBkFfcTYCAAsgBkEgcSEHAn8gACgCMARAIAAgASAFQcgBaiAFQdAAaiAFQaABaiADIAQQsQUMAQsgAEHQADYCMCAAIAVB0ABqNgIQIAAgBTYCHCAAIAU2AhQgACgCLCEGIAAgBTYCLCAAIAEgBUHIAWogBUHQAGogBUGgAWogAyAEELEFIgEgBkUNABogAEEAQQAgACgCJBEFABogAEEANgIwIAAgBjYCLCAAQQA2AhwgAEEANgIQIAAoAhQhAyAAQQA2AhQgAUF/IAMbCyEBIAAgACgCACIAIAdyNgIAQX8gASAAQSBxGyEBIAJFDQALIAVB0AFqJAAgAQt/AgF/AX4gAL0iA0I0iKdB/w9xIgJB/w9HBHwgAkUEQCABIABEAAAAAAAAAABhBH9BAAUgAEQAAAAAAADwQ6IgARDOByEAIAEoAgBBQGoLNgIAIAAPCyABIAJBgnhqNgIAIANC/////////4eAf4NCgICAgICAgPA/hL8FIAALCxIAIABFBEBBAA8LIAAgARDOCwtgAgJ/AX4gACgCKCEBQQEhAiAAQgAgAC0AAEGAAXEEf0ECQQEgACgCFCAAKAIcSxsFIAILIAERIwAiA0IAWQR+IAAoAhQgACgCHGusIAMgACgCCCAAKAIEa6x9fAUgAwsLIAACfyAAKAJMQX9MBEAgACABENIHDAELIAAgARDSBwsLfwEBfiABQQFGBEBCACAAKAIIIAAoAgRrrH0hAgsCQCAAKAIUIAAoAhxLBEAgAEEAQQAgACgCJBEFABogACgCFEUNAQsgAEEANgIcIABCADcDECAAIAIgASAAKAIoESMAQgBTDQAgAEIANwIEIAAgACgCAEFvcTYCAEEADwtBfwt8AQJ/IAAgAC0ASiIBQX9qIAFyOgBKIAAoAhQgACgCHEsEQCAAQQBBACAAKAIkEQUAGgsgAEEANgIcIABCADcDECAAKAIAIgFBBHEEQCAAIAFBIHI2AgBBfw8LIAAgACgCLCAAKAIwaiICNgIIIAAgAjYCBCABQRt0QR91C08BAn9BkLYDKAIAIgIgADYCjDYgAigCtDUhAQJAIAANACACIAEQigQiATYCtDUgASgCjAYiAEUNACAAQQAgAUGUBmoQvgQPCyABQQEQiQQLEwAgACgCCCAAKAIAQSRsakFcaguBAgIDfwF8IwBBEGsiAyQAAkAgALwiBEH/////B3EiAkHan6TuBE0EQCABIAC7IgUgBUSDyMltMF/kP6JEAAAAAAAAOEOgRAAAAAAAADjDoCIFRAAAAFD7Ifm/oqAgBURjYhphtBBRvqKgOQMAIAWZRAAAAAAAAOBBYwRAIAWqIQIMAgtBgICAgHghAgwBCyACQYCAgPwHTwRAIAEgACAAk7s5AwBBACECDAELIAMgAiACQRd2Qep+aiICQRd0a767OQMIIANBCGogAyACEN0LIQIgBEF/TARAIAEgAysDAJo5AwBBACACayECDAELIAEgAykDADcDAAsgA0EQaiQAIAIL7wICA38DfSAAvCICQf////8HcSIBQYCAgOQESQRAAkACfyABQf////YDTQRAIAFBgICAzANJDQJBfyEBQQEMAQsgAIshAAJ9IAFB///f/ANNBEAgAUH//7/5A00EQCAAIACSQwAAgL+SIABDAAAAQJKVIQBBACEBQQAMAwtBASEBIABDAACAv5IgAEMAAIA/kpUMAQsgAUH//++ABE0EQEECIQEgAEMAAMC/kiAAQwAAwD+UQwAAgD+SlQwBC0EDIQFDAACAvyAAlQshAEEACyEDIAAgAJQiBSAFlCIEIARDRxLavZRDmMpMvpKUIQYgBSAEIARDJax8PZRDDfURPpKUQ6mqqj6SlCEEIAMEQCAAIAAgBiAEkpSTDwsgAUECdCIBQfCIA2oqAgAgACAGIASSlCABQYCJA2oqAgCTIACTkyIAIACMIAJBf0obIQALIAAPCyAAQ9oPyT8gAJggALxB/////wdxQYCAgPwHSxsLKAEBfyMAQRBrIgEkACABIAA2AgxBrPECQQUgASgCDBAGIAFBEGokAAsoAQF/IwBBEGsiASQAIAEgADYCDEHI8AJBBCABKAIMEAYgAUEQaiQACygBAX8jAEEQayIBJAAgASAANgIMQeDvAkEDIAEoAgwQBiABQRBqJAALKAEBfyMAQRBrIgEkACABIAA2AgxB+O4CQQIgASgCDBAGIAFBEGokAAsoAQF/IwBBEGsiASQAIAEgADYCDEGY2gJBASABKAIMEAYgAUEQaiQACygBAX8jAEEQayIBJAAgASAANgIMQdDtAkEAIAEoAgwQBiABQRBqJAAL4gEAQcivA0H4/gIQIkH0rwNB/f4CQQFBAUEAECEQ8gsQ8QsQ7wsQ7gsQ7QsQ7AsQ6wsQ6gsQ6QsQ6AsQ5wtBiL8CQef/AhAUQdCFA0Hz/wIQFEGohgNBBEGUgAMQDkGEhwNBAkGhgAMQDkHghwNBBEGwgAMQDkHEvQJBv4ADECAQ5gtB7YADEN0HQZKBAxDcB0G5gQMQ2wdB2IEDENoHQYCCAxDZB0GdggMQ2AcQ5AsQ4wtBiIMDEN0HQaiDAxDcB0HJgwMQ2wdB6oMDENoHQYyEAxDZB0GthAMQ2AcQ4gsQ4QsLKgEBfyMAQRBrIgIkACAAQdSvAyACQQhqIAEQdxADNgIAIAJBEGokACAAC0QCAn8BfCMAQRBrIgEkACAAKAIAQdD+AigCACABQQRqEAQhAyABIAEoAgQQWCEAIAMQhAIhAiAAEJ4BIAFBEGokACACCw0AIAAgASACIAMQ9wsLoAEBBn8jAEEQayIDJABBkLYDKAIAIgFBADYC+FkgAUH82QBqIgJBABCGAiADQQA6AA8gAiADQQ9qEL4KIAEoAohaQQBKBEAgAUGI2gBqIQUDQCABIAUgBBCFASIGIAIgBigCEBEGACAEQQFqIgQgASgCiFpIDQALCyAABEAgACACEJoFNgIACyACKAIIIgBBlLYDIAAbIQAgA0EQaiQAIAAL/QIBB39BkLYDKAIAIQYgAUUEQCAAEGshAQsgAUEBahBLIAAgARA+IgggAWoiBUEAOgAAIAFBAU4EQCAIIQEDQAJAAkAgAS0AACIAQXZqDgQAAQEAAQsgAUEBaiEBDAELIAEhAwJAIAEgBU8NAAN/AkAgAEH/AXFBdmoOBAIAAAIACyAFIANBAWoiA0YEfyAFBSADLQAAIQAMAQsLIQMLIANBADoAAAJAIAEtAAAiAEE7Rg0AAn8CQAJAIABB2wBHIAMgAU1yDQAgA0F/aiIHLQAAQd0ARw0AIAdBADoAAEG7ECECIAFBAWoiACAHQd0AEI0HIgFFDQEgAUEBaiAHQdsAEI0HIgRFDQEgAUEAOgAAIAAhAiAEQQFqDAILIAJFIARFcg0CIAYgAiAEIAEgAigCDBEIAAwCCyAACyEBIAIQvwoiAkUEQEEAIQJBACEEDAELIAYgAiABIAIoAggRBQAhBAsgA0EBaiIBIAVJDQALCyAIEEYgBkEBOgD0WQsbACAAIAEgAigCACACELEBIAMgBCAFIAYQ7AELGwAgACABIAIoAgAgAhCbASADIAQgBSAGEOwBCxsAIAAgASACKAIAIAIQsQEgAyAEIAUgBhDqAQsbACAAIAEgAigCACACEJsBIAMgBCAFIAYQ6gELZAEEfyMAQRBrIgEkACABQQA2AgwgAEEIaiEDA0AgACgCECECIAFBCGogAxDFDCACIAFBDGogAUEIahDaASABQQhqECsgASABKAIMIgJBAWoiBDYCDCAEIAJJDQALIAFBEGokAAtrAgN/AXwjAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIQIAFBDGoQ2wEgAUEIahD0BSEEIAAgASgCDEEDdGogBDkDCCABQQhqECsgASABKAIMIgJBAWoiAzYCDCADIAJJDQALIAFBEGokAAsqAQF/IwBBEGsiAiQAIABB2MICIAJBCGogARB3EAM2AgAgAkEQaiQAIAALBwAgABDUDAsKACAAIAFqIAFvCwkAIABCADcDAAs1ACAAKAIAGiAAKAIAIAAQ1AJBA3RqGiAAKAIAIAAQyAFBA3RqGiAAKAIAIAAQ1AJBA3RqGgssAQF/IAEgACgCBCICRwRAA0AgABBTGiACQXhqIgIgAUcNAAsLIAAgATYCBAs1ACAAKAIAGiAAKAIAIAAQ1QJBAnRqGiAAKAIAIAAQmgFBAnRqGiAAKAIAIAAQ1QJBAnRqGgssAQF/IAEgACgCBCICRwRAA0AgABBTGiACQXxqIgIgAUcNAAsLIAAgATYCBAsJACAAQQA7AQALNQAgACgCABogACgCACAAENYCQQF0ahogACgCACAAELEBQQF0ahogACgCACAAENYCQQF0ahoLLAEBfyABIAAoAgQiAkcEQANAIAAQUxogAkF+aiICIAFHDQALCyAAIAE2AgQLMQEBfyAAEPMHIAAoAgAEQCAAIAAoAgAQ9AcgABBTGiAAKAIAIQEgABDWAhogARBNCwtGAQF/IAAQsQEiAiABSQRAIAAgASACaxCRDQ8LIAIgAUsEQCAAKAIAIAFBAXRqIQEgABCxASECIAAgARD0ByAAIAIQiw0LCx0AIAAgASACKAIAIAIQsQEgAyAEIAUgBiAHEO0BCx0AIAAgASACKAIAIAIQmwEgAyAEIAUgBiAHEO0BC2QBA38jAEEQayIBJAAgAUEANgIMA0AgACgCFCEDIAFBCGogACACQQJ0akEEahCrBCADIAFBDGogAUEIahDaASABQQhqECsgASABKAIMQQFqIgI2AgwgAkEESQ0ACyABQRBqJAALZwECfyMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAhQgAUEMahDbASABQQhqEIQBIQIgACABKAIMQQJ0aiACNgIEIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQRJDQALIAFBEGokAAtkAQN/IwBBEGsiASQAIAFBADYCDANAIAAoAhAhAyABQQhqIAAgAkECdGpBBGoQqwQgAyABQQxqIAFBCGoQ2gEgAUEIahArIAEgASgCDEEBaiICNgIMIAJBA0kNAAsgAUEQaiQAC2cBAn8jAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIQIAFBDGoQ2wEgAUEIahCEASECIAAgASgCDEECdGogAjYCBCABQQhqECsgASABKAIMQQFqIgI2AgwgAkEDSQ0ACyABQRBqJAALZAEDfyMAQRBrIgEkACABQQA2AgwDQCAAKAIMIQMgAUEIaiAAIAJBAnRqQQRqEKsEIAMgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQJJDQALIAFBEGokAAtnAQJ/IwBBEGsiASQAIAFBADYCDANAIAFBCGogACgCDCABQQxqENsBIAFBCGoQhAEhAiAAIAEoAgxBAnRqIAI2AgQgAUEIahArIAEgASgCDEEBaiICNgIMIAJBAkkNAAsgAUEQaiQAC2QBA38jAEEQayIBJAAgAUEANgIMA0AgACgCECEDIAFBCGogACACQQJ0akEEahCKAiADIAFBDGogAUEIahDaASABQQhqECsgASABKAIMQQFqIgI2AgwgAkEDSQ0ACyABQRBqJAALaAICfwF9IwBBEGsiASQAIAFBADYCDANAIAFBCGogACgCECABQQxqENsBIAFBCGoQMyEDIAAgASgCDEECdGogAzgCBCABQQhqECsgASABKAIMQQFqIgI2AgwgAkEDSQ0ACyABQRBqJAALZAEDfyMAQRBrIgEkACABQQA2AgwDQCAAKAIMIQMgAUEIaiAAIAJBAnRqQQRqEIoCIAMgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQJJDQALIAFBEGokAAtoAgJ/AX0jAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIMIAFBDGoQ2wEgAUEIahAzIQMgACABKAIMQQJ0aiADOAIEIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQJJDQALIAFBEGokAAtkAQR/IwBBEGsiASQAIAFBADYCDCAAQQRqIQMDQCAAKAIIIQIgAUEIaiADEIoCIAIgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgwiAkEBaiIENgIMIAQgAkkNAAsgAUEQaiQAC2oCA38BfSMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAgggAUEMahDbASABQQhqEDMhBCAAIAEoAgxBAnRqIAQ4AgQgAUEIahArIAEgASgCDCICQQFqIgM2AgwgAyACSQ0ACyABQRBqJAALDwAgACABIAIgAyAEELkNCxoAIAAoAgAQDSAAIAEoAgA2AgAgAUEANgIACwkAIAAQIxBYGgsNACAAIAEgAiADEMINC2QBBH8jAEEQayIBJAAgAUEANgIMIABBBGohAwNAIAAoAgghAiABQQhqIAMQqwQgAiABQQxqIAFBCGoQ2gEgAUEIahArIAEgASgCDCICQQFqIgQ2AgwgBCACSQ0ACyABQRBqJAALaQEDfyMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAgggAUEMahDbASABQQhqEIQBIQIgACABKAIMQQJ0aiACNgIEIAFBCGoQKyABIAEoAgwiAkEBaiIDNgIMIAMgAkkNAAsgAUEQaiQAC2UBBH8jAEEQayIBJAAgAUEANgIMIABBBGohAwNAIAAoAgghAiABQQhqIAMQnggaIAIgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgwiAkEBaiIENgIMIAQgAkkNAAsgAUEQaiQAC2kBA38jAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIIIAFBDGoQ2wEgAUEIahDbAyECIAAgASgCDEECdGogAjYCBCABQQhqECsgASABKAIMIgJBAWoiAzYCDCADIAJJDQALIAFBEGokAAt3AQJ/IwBBEGsiAiQAQZC2AygCACEBIAAQbiAAKAJIIAAQ3gEgAUEBOgCWNiACQQhqIAFB4AFqIAAoAvwFQQxqEDggASACKQMINwLsMwJAIAAtAAhBBHENACAAKAL8BS0ACEEEcQ0AIAEgADYCuDMLIAJBEGokAAsNAEGQtgMoAgAoAuAyCxAAIAEgAiADIAAoAgARBQALDQAgACgCACABKAIASQsJACAAQQA6AAALSQEBfyAAKAIAIgIgACgCBEYEQCAAIAAgAkEBahBdEMkFIAAoAgAhAgsgACgCCCACQQF0aiABLwEAOwEAIAAgACgCAEEBajYCAAssAQF/IAEgACgCBCICRwRAA0AgABBTGiACQX9qIgIgAUcNAAsLIAAgATYCBAsJACAAQQA2AgALLAAgACgCABogACgCACAAENsCahogACgCACAAEJsBahogACgCACAAENsCahoLXwECfyMAQRBrIgEkAEGQtgMoAgBBADYC+FkCQCAARQ0AIAFBADYCDCABQQxqEOIHIQIgAEGWGBCFBSIARQ0AIAAoAkwaIAIgASgCDCAAELQHGiAAENMCCyABQRBqJAALDgAgASACIAAoAgARAAALEQBBACAAQQRqIAAoAhQQUBsLPQEBfyMAQRBrIgYkACAAKAIAIQAgBkEIaiACEC0gASAGQQhqIAMgBCAFIAARGgAgBkEIahArIAZBEGokAAtjAQF/IwBBIGsiBiQAIAAoAgAhACAGQRhqIAIQLSAGQRBqIAMQLSAGQQhqIAQQLSABIAZBGGogBkEQaiAGQQhqIAUgABENACAGQQhqECsgBkEQahArIAZBGGoQKyAGQSBqJAALRQEBfyMAQRBrIgMkACAAKAIAIQAgAyACEC0gA0EIaiABIAMgABEGACADQQhqEHohACADQQhqECsgAxArIANBEGokACAAC0UBAX8jAEEQayIFJAAgACgCACEAIAVBCGogAhAtIAUgAxAtIAEgBUEIaiAFIAQgABEIACAFECsgBUEIahArIAVBEGokAAspAQF/IwBBEGsiAiQAIABB8McCIAJBCGogARCPARADNgIAIAJBEGokAAsqAQF/IwBBEGsiAiQAIABByLADIAJBCGogARB3EAM2AgAgAkEQaiQAIAALKAEBfyMAQRBrIgIkACAAQeDBAiACQQhqIAEQdxADNgIAIAJBEGokAAs5AQF/IAAoAgQiBEEBdSABaiEBIAAoAgAhACABIAIgAyAEQQFxBH8gASgCACAAaigCAAUgAAsRBgALHQBBhLMDIAE2AgBBgLMDIAA2AgBBmLYDQQA2AgALMQAgAEGnEBD+AUUgAUGQKkZxIAJBrAdGcSAD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NgIMIAhBDGogAyAEBH8gBC4BAAVBgIB+CyAFBH8gBS4BAAVB//8BCyAGIAcQ2QQiCUUNByACIAgoAgw7AQAMBwsgCCACLwEANgIMIAhBDGogAyAEBH8gBC8BAAVBAAsgBQR/IAUvAQAFQf//AwsgBiAHENgEIglFDQYgAiAIKAIMOwEADAYLIAIgAyAEBH8gBCgCAAVBgICAgHgLIAUEfyAFKAIABUH/////BwsgBiAHENkEIQkMBQsgAiADIAQEfyAEKAIABUEACyAFBH8gBSgCAAVBfwsgBiAHENgEIQkMBAsgAiADIAQEfiAEKQMABUKAgICAgICAgIB/CyAFBH4gBSkDAAVC////////////AAsgBiAHELoJIQkMAwsgAiADIAQEfiAEKQMABUIACyAFBH4gBSkDAAVCfwsgBiAHELkJIQkMAgsgAiADIAQEfSAEKgIABUP//3//CyAFBH0gBSoCAAVD//9/fwsgBiAHELgJIQkMAQsgAiADIAQEfCAEKwMABUT////////v/wsgBQR8IAUrAwAFRP///////+9/CyAGIAcQtwkhCQsgCEEQaiQAIAkLHgEBfkJ/IAAgAXwiAiABQn+FIABUGyACIAFCAFIbC1kBAX4gAUIBWUEAIAFCgICAgICAgICAf4QgAFUbRQRAQv///////////wAgACABfSICIAFC////////////AHwgAFMbIAIgAUIAUxsPC0KAgICAgICAgIB/C1kBAX4gAUJ/V0EAQoCAgICAgICAgH8gAX0gAFUbRQRAQv///////////wAgACABfCICQv///////////wAgAX0gAFMbIAIgAUIAVRsPC0KAgICAgICAgIB/C0UBAX8gAUEBTkEAIAFBgICAgHhyIABKG0UEQEH/////ByAAIAFrIgIgAUH/////B2ogAEgbIAIgAUEASBsPC0GAgICAeAtFAQF/IAFBf0xBAEGAgICAeCABayAAShtFBEBB/////wcgACABaiICQf////8HIAFrIABIGyACIAFBAEobDwtBgICAgHgLIgEBf0F/IAAgAWoiAiABQf//A3MgAEkbIAIgARtB//8DcQtOAQF/AkACQCABQQFOBEBBgIACIQIgAUGAgH5qIABMDQEMAgsgAUF/Sg0AQf//ASECIAFB//8BaiAASA0BCyAAIAFrIQILIAJB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KAIAajYCACACQQAQkQIoAgAhAyACIAIoAggQoAogAyAGaiEGCyACKAIAIQMLIANBAEwLBEAgAigCDCEJDAELIAIQ+QEhBSACKAIMIQkgAigCACIDQQFIDQAgAigCCCELQQAhAgNAIAsgAkEobGoiDCAGNgIcIAwoAgAgBmohBiACQQFqIgIgA0cNAAsLIAQgCWohBCADIAdqIQcgCEEBaiIIIAAoAgRIDQALCyABIAEoAgAgB2oQugMgAUEMaiABKAIMIARqEL0BIAEoAhQgASgCDEEBdGogBEEBdGshAyAAKAIEQQJOBEAgASgCCCABKAIAQShsakEAIAdrQShsaiEEIABBCGohB0EBIQIDQCAHIAIQhQEiBSgCACIGBEAgBCAFKAIIIAZBKGwiBBA+IARqIQQLIAUoAgwiBgRAIAMgBSgCFCAGQQF0IgMQPiADaiEDCyACQQFqIgIgACgCBEgNAAsLIAEgAzYCPCABEPgDIABBATYCBAsLnQIBB38jAEEwayIEJAAgAEEIaiEDIAAoAggiBiACSARAIAMgAhDSBgsgACACNgIEIANBABCFASIAQgA3AgAgAEIANwIQIABCADcCCCACQQJOBEAgAUHMAGohByABQUBrIQggBEEIakEEciEFQQEhAANAIAMgABCFASEBAkAgACAGTgRAIAFCADcCACABQgA3AhAgAUIANwIIIAEQRBogAUEMahBEGgwBCyABQQAQugMgAyAAEIUBQQxqQQAQvQELIAMgABCFASgCAEUEQCAEQQhqENwGIQEgBSAIEIADIgkpAgA3AgAgBSAJKQIINwIIIAQgBxBwKAIANgIcIAMgABCFASABENsGCyAAQQFqIgAgAkcNAAsLIARBMGokAAu+AQEBfyAGQYCAgAhPBEAgB0MAAAAAX0VBACAIQQ9xG0UEQCAAIAEgAiADIAQgBSAGEJACDwsCQCAAQcwAaiIJEGJFBEAgCRBwKAIAIAFGDQELIAAgARCSAiAAKAIYIQEgACACIAMgByAIELgDIAAgBhD1ASAAIAEgACgCGCACIAMgBCAFENMGIAAQ9AIPCyAAKAIYIQEgACACIAMgByAIELgDIAAgBhD1ASAAIAEgACgCGCACIAMgBCAFENMGCwt5AQF/IApBgICACE8EQAJAIABBzABqIgsQYkUEQCALEHAoAgAgAUYNAQsg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AU0EQCABIAEqAgQgAioCBCACKgIMIgMQXjgCBCACQQRqIQIgAUEMagwBCyABIAEqAgAgAioCACACKgIIIgMQXjgCACABQQhqCyIBIAEqAgAgAioCACADEF44AgALhAEBAn8gASAAKAIIa0ECdSEBAn8gACgCACIDIAAoAgRGBEAgACAAIANBAWoQXRCZAyAAKAIAIQMLIAMgAUoLBEAgACgCCCABQQJ0aiIEQQRqIAQgAyABa0ECdBCuAQsgACgCCCABQQJ0aiACKAIANgIAIAAgACgCAEEBajYCACAAKAIIGgsGACAAEE0LBwAgABD6AQtwAQF9IAAqAgAgASoCACICXkEBc0UEQCAAIAI4AgALIAAqAgQgASoCBCICXkEBc0UEQCAAIAI4AgQLIAAqAgggASoCACICXUEBc0UEQCAAIAI4AggLIAAqAgwgASoCBCICXUEBc0UEQCAAIAI4AgwLCysBAX8jAEEQayICJAAgAkEANgIMIAJBDGogACABELACIQAgAkEQaiQAIAALiwIBBH8jAEGwAmsiASQAIAAoAiAhAxCOCCECIAEgACgCADYCICABQawtQaAQIAMgAkF+akgbNgIkIAFBMGpBgAJBmS0gAUEgahBcGiABIAFBMGo2AhAgAEGXLCABQRBqEOECBEAgACgCAEEBTgRAQQAhAwNAIAAgAxCjASICENIBQbgtEOEEBEAgACACQX8Q3QMLQwAAAABDAAAAQBBgQbotEOEEBEAgACACQQEQ3QMLQwAAAABDAACAvxBgIAAoAhAhBCABIAIoAgAiAjYCCCABQSpBICACIARGGzYCBCABIAM2AgBBvC0gARBZEHIgA0EBaiIDIAAoAgBIDQALCxC3AQsgAUGwAmokAAv8DgIIfwZ9IwBBoARrIgEkAAJAQZkYIABBABCAAkUNABDUAyEAIAFBpxA2AuADQawYIAFB4ANqEFkgASAAKgLUBiIJuzkD2AMgAUMAAHpEIAmVuzkD0ANBuhggAUHQA2oQWSAAKALYBiECIAEgACgC3AYiBTYCxAMgASACNgLAAyABIAVBA202AsgDQecYIAFBwANqEFkgASAAKQPgBkIgiTcDsANBjhkgAUGwA2oQWSABIAAoAugGNgKgA0GtGSABQaADahBZEMMCQZC2AygCACICQewyaiIFQcMZEO4GIAEgAigCiDg2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gICAgICAwL9AfCAFQoCAgICAgMDAv398VARAIAFCGYinIQIgAFAgAUL///8PgyIFQoCAgAhUIAVCgICACFEbRQRAIAJBgYCAgARqIQIMAgsgAkGAgICABGohAiAAIAVCgICACIWEQgBSDQEgAkEBcSACaiECDAELIABQIAVCgICAgICAwP//AFQgBUKAgICAgIDA//8AURtFBEAgAUIZiKdB////AXFBgICA/gdyIQIMAQtBgICA/AchAiAFQv///////7+/wABWDQBBACECIAVCMIinIgRBkf4ASQ0AIANBEGogACABQv///////z+DQoCAgICAgMAAhCIFIARB/4F/ahCMASADIAAgBUGB/wAgBGsQhAMgAykDCCIAQhmIpyECIAMpAwAgAykDECADKQMYhEIAUq2EIgVQIABC////D4MiAEKAgIAIVCAAQoCAgAhRG0UEQCACQQFqIQIMAQsgBSAAQoCAgAiFhEIAUg0AIAJBAXEgAmohAgsgA0EgaiQAIAIgAUIgiKdBgICAgHhxcr4LxwECA38CfiMAQRBrIgMkAAJ+IAG8IgRB/////wdxIgJBgICAfGpB////9wdNBEAgAq1CGYZCgICAgICAgMA/fAwBCyACQYCAgPwHTwRAIAStQhmGQoCAgICAgMD//wCEDAELIAJFBEBCAAwBCyADIAKtQgAgAmciAkHRAGoQjAEgAykDACEFIAMpAwhCgICAgICAwACFQYn/ACACa61CMIaECyEGIAAgBTcDACAAIAYgBEGAgICAeHGtQiCGhDcDCCADQRBqJAAL7AYBDn8jAEGgCGsiByQAIAdBmAhqQgA3AwAgB0GQCGpCADcDACAHQgA3A4gIIAdCADcDgAgCQAJAAkACQAJAQfskLQAAIgNFBEBBfyEIQQEhAQwBCwNAIAAgBGotAABFDQQgByADQf8BcSIBQQJ0aiAEQQFqIgQ2AgAgB0GACGogAUEDdkEccWoiAiACKAIAQQEgAUEfcXRyNgIAIARB+yRqLQAAIgMNAAtBASEBQX8hCCAEQQFLDQELQX8hBUEBIQIMAQtBACECQQEhCUEBIQMDQAJ/IAMgCGpB+yRqLQAAIgYgAUH7JGotAAAiBUYEQCADIAlGBEAgAiAJaiECQQEMAgsgA0EBagwBCyAGIAVLBEAgASAIayEJIAEhAkEBDAELIAIh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oiITmUQAAAAAAADgQWMEQCATqgwBC0GAgICAeAsiArdEAAAAAAAAcMGioCITmUQAAAAAAADgQWMEQCATqgwBC0GAgICAeAs2AgAgA0EBaiEDDAELAn8gE5lEAAAAAAAA4EFjBEAgE6oMAQtBgICAgHgLIQIgCSEHCyAFQeADaiADQQJ0aiACNgIAC0QAAAAAAADwPyAHEK4CIRMCQCADQX9MDQAgAyECA0AgBSACQQN0aiATIAVB4ANqIAJBAnRqKAIAt6I5AwAgE0QAAAAAAABwPqIhEyACQQBKIQAgAkF/aiECIAANAAtBACEGIANBAEgNACAIQQAgCEEAShshACADIQQDQCAAIAYgACAGSRshByADIARrIQlBACECRAAAAAAAAAAAIRMDQCATIAJBA3RB8J4DaisDACAFIAIgBGpBA3RqKwMAoqAhEyACIAdHIQggAkEBaiECIAgNAAsgBUGgAWogCUEDdGogEzkDACAEQX9qIQQgAyAGRyECIAZBAWohBiACDQALC0QAAAAAAAAAACETIANBAE4EQANAIBMgBUGgAWogA0EDdGorAwCgIRMgA0EASiEAIANBf2ohAyAADQALCyABIBOaIBMgCxs5AwAgBUGwBGokACAKQQdxC9sCAQR/IAG8Qf////8HcUGAgID8B01BACAAvEH/////B3FBgYCA/AdJG0UEQCAAIAGSDwsgAbwiAkGAgID8A0YEQCAAENcHDwsgAkEedkECcSIFIAC8IgNBH3ZyIQQCQAJAAkAgA0H/////B3EiA0UEQAJAIARBAmsOAgIAAwtD2w9JwA8LIAJB/////wdxIgJBgICA/AdHBEAgAkUEQEPbD8k/IACYDwsgA0GAgID8B0dBACACQYCAgOgAaiADTxtFBEBD2w/JPyAAmA8LAn0gA0GAgIDoAGogAkkEQEMAAAAAIAUNARoLIAAgAZWLENcHCyEAAkACQAJAIAQOAwUAAQILIACMDwtD2w9JQCAAQy69uzOSkw8LIABDLr27M5JD2w9JwJIPCyADQYCAgPwHRg0CIARBAnRB2IgDaioCAA8LQ9sPSUAhAAsgAA8LIARBAnRByIgDaioCAAvyAQICfwF9AkAgALwiAkH/////B3EiAUGAgID8A08EQCABQYCAgPwDRg0BQwAAAAAgACAAk5UPCwJ9IAFB////9wNNBEBD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CwtMAQF/QeDCBCgCACIDQawBaiAAEGwgA0GwAWogARBsIANBtAFqIAIQbAJAIAAQUEUEQCABEFBFDQELQQBBABChCA8LQbgGQbkGEKEICyYBAX8jAEEQayIBJAAgASAAEJIBIAEQLhCTAyABEDUgAUEQaiQACzUBAX8jAEEQayIEJAAgBEEIaiABIAIQggsgACAEQQhqIAQgAxBbIgAQfSAAECsgBEEQaiQACzEBAX8jAEEQayICJAAgAkEIahCDCyAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALOQEBfyMAQRBrIgIkACACQZC2AygCACkD4AE3AgggACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQAC/kDAgV/An0jAEFAaiICJAACQAJAQZC2AygCACIAKALINiIBDQAgACgCmDcNACAAKAK4NUUNASAAQYACOwGWNgwBCyAAQcg2aiAAQZg3aiIDIAEbIQECQCAALQC0NkEgcUUNACAAKALwNiIERQ0AIAEgAEHwNmogBCAAKAK4NUYbIQELAkACQCABIANGDQAgAygCAEUNASAAQaA3aigCACgC+AUgACgCtDVHDQEgAEGkN2oqAgAiBSABKgIMIgZdDQAgBSAGXA0BIABBqDdqKgIAIAEqAhBdQQFzDQELIAMhAQsCQCAAKAKMNg0AIAJBEGogAUEYaiIEIAEoAghBDGoQLyACQShqIAFBIGogASgCCEEMahAvIAJBMGogAkEQaiACQShqEDwhAyABKAIIIAMQ5QYgAkEoaiABKAIIQQAQrQcgAkEgaiABKAIIQdAAaiACQShqEDggBCACQSBqELUKIAEoAggiBC0AC0EBcUUNACAEKAL4BSEEIAJBCGogAyACQSBqEC8gAiADQQhqIAJBIGoQLyAEIAJBEGogAkEIaiACEDwQ5QYLEG8gACABKAIINgK0NSABKAIAIgMgACgCuDVHBEAgACADNgLQNSAAIAEoAgQ2AtQ1CyADIAAoAow2IAFBGGoQvgQgAEEAOgCwNgsgAkFAayQACyoBAX8jAEEQayIBJAAgAUEIaiAAKAIMEDIgACABKQMINwIEIAFBEGokAAsxACAAQfj9AjYCACAAQQRqEDQaIAAgATYCDCABEFBFBEAgACAAKAIAKAIAEQEACyAACzEBAX8jAEEQayIBJABBACABIAAQggwiAEEEaiAAKAIMEFAbEIMBIQAgAUEQaiQAIAALMwEBfyMAQRBrIgMkACADQQhqIAAQMiADIAEQMiADQQhqIAMgAhCVAyEAIANBEGokACAAC1YBAX8jAEEwayIGJAAgACABIAIgBkEgaiADEMABIgMQRyAGQRBqIAQQwAEiBBBHIAYgBRDAASIFEEcQ8QEgBRCnARogBBCnARogAxCnARogBkEwaiQAC1YBAX8jAEEwayIGJAAgACABIAIgBkEgaiADEMABIgMQRyAGQRBqIAQQwAEiBBBHIAYgBRDAASIFEEcQxwIgBRCnARogBBCnARogAxCnARogBkEwaiQACyQBAX8jAEEQayIBJAAgASAAEOUBIAEQtgMhACABQRBqJAAgAAs3AQF/IwBBIGsiAyQAIANBEGogARDaBiAAIANBEGogA0EIaiACEFsiABCJFCAAECsgA0EgaiQAC0ABAX8jAEEgayIEJAAgACABIARBEGogAhDJASIAEEcgBCADEMkBIgIQRxCkBiACELIBGiAAELIBGiAEQSBqJAALOgEBfyMAQRBrIgUkACAFQQhqIAEQLkEAIAIgAxBfIAAgBUEIaiAFIAQQWyIAEH0gABArIAVBEGokAAsoAQF/IwBBEGsiAiQAIABB9PsCIAJBCGogARB3EAM2AgAgAkEQaiQACy4BAX8jAEEQayIBJAAgAUGQtgMoAgBB0DFqNgIMIAAgAUEMahCLDCABQRBqJAALJgEBfyMAQRBrIgEkACABENMFNgIMIAAgAUEMahDOBSABQRBqJAALLgEBfyMAQRBrIgEkACABQZC2AygCAEGkOGo2AgwgACABQQxqEM4FIAFBEGokAAsxAQF/IwBBEGsiAiQAIAJBCGogABAyIAIgARAyIAJBCGogAhD9BiEAIAJBEGokACAACykBAX8jAEEQayIBJAAgAUEIaiAAEDIgAUEIahDXCiEAIAFBEGokACAACzcBAX8jAEEQayICJAAgAkEIahBkQZACahDdASAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALNAEBfyMAQRBrIgIkACACEGQpApgCNwIIIAAgAkEIaiACIAEQWyIAEH0gABArIAJBEGokAAs0AQF/IwBBEGsiAiQAIAIQZCkCkAI3AgggACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQACy8BAX8jAEEQayIDJAAgA0EIaiAAEDIgAyABEDIgA0EIaiADIAIQlgIgA0EQaiQACyYBAX8jAEEQayIBJAAgASAAEC42AgBBhOUCIAEQwQIgAUEQaiQACyoBAX8jAEEgayICJAAgACACQQhqIAEQOyIAEDoQ8AYgABA5IAJBIGokAAsyAQF/IwBBEGsiAyQAIAAQLiADIAEQugIiABA/IAIQ5AghASAAEIICGiADQRBqJAAgAQsuAQF/IwBBIGsiAiQAIAJBCGogABA7IgAQOiABENAKIQEgABA5IAJBIGokACABCzABAX8jAEEgayIDJAAgA0EIaiAAEDsiABA6IAEgAhDRCiEBIAAQOSADQSBqJAAgAQsuAQF/IwBBIGsiAiQAIAJBCGogABA7IgAQOiABENIKIQEgABA5IAJBIGokACABCzIBAX8jAEEQayIDJAAgABAuIAMgARC6AiIAED8gAhDTCiEBIAAQggIaIANBEGokACABCy4BAX8jAEEgayICJAAgAkEIaiAAEDsiABA6IAEQ9wIhASAAEDkgAkEgaiQAIAELRgEBfyMAQTBrIgQkACAAEC4gBEEYaiABEDsiABA6IARBCGogAhC6AiIBED8gAxD0CCECIAEQggIaIAAQOSAEQTBqJAAgAgs0AQF/IwBBIGsiBCQAIAAQLiAEQQhqIAEQOyIAEDogAiADEMgEIQEgABA5IARBIGokACABCyYBAX8jAEEQayIBJAAgASAAEC42AgBBhOUCIAEQyQMgAUEQaiQACy4BAX8jAEEgayIDJAAgABAuIAEgA0EIaiACEDsiABA6EPsIIAAQOSADQSBqJAALMQEBfyMAQRBrIgIkACAAEC4hACACQQhqIAEQMiAAIAJBCGoQgwYhACACQRBqJAAgAAuWAgEDfyMAQTBrIgIkACACIAA2AixB4MIEKAIAIQMCQCAAQQBIDQAgAygCnAEgAEgNACADQaABaiIAQfzdAhDSBSACQShqEIcIIAJBCGogABDVAyEEIAJBADYCGCACQSBqIAJBKGogAkEYahCDAiACQSBqIAQQhgggAkEgahArIAQQKyACQSBqIANBlAFqIANBmAFqIAJBCGogAkEsahBoIgMgAkEoahCFCCADECsgAkEANgIEIAJBGGogAkEoaiACQQRqEIMCIAJBCGogAkEYahCSASAAIAJB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ASABKAIEEFghACADEIQCIQIgABCeASABQRBqJAAgAgs5AQF/IwBBEGsiAiQAIAIgASgCLCIBNgIMAkAgAUUEQCAAEHsMAQsgACACQQxqENcFCyACQRBqJAALKgEBfyMAQRBrIgIkACAAQajTAiACQQhqIAEQdxADNgIAIAJBEGokACAAC2kBA38jAEEQayICJAAgACgCIEEBTgRAIABBIGohA0EAIQADQCACIAMgABCRAjYCDCACQQhqIAEgAiACQQxqEOYOIgQQ3AIgAkEIahArIAQQKyAAQQFqIgAgAygCAEgNAAsLIAJBEGokAAsnAQF/IwBBEGsiAiQAIAIgAUEwajYCDCAAIAJBDGoQdSACQRBqJAALOgEBfyMAQRBrIgIkACACIAEoAnAiATYCDAJAIAFFBEAgABB7DAELIAAgAkEMahCPAxoLIAJBEGokAAsxACAAQZC2AygCACAAGyIAEOEOIABBkLYDKAIARgRAQQAQnAILIAAEQCAAEMgOEEYLCy4BAX8jAEEQayICJAAgAiABEJIBIABByABqIAIQLkEnEJIEIAIQNSACQRBqJAALKwEBfyMAQRBrIgIkACAAIAIgAUHIAGoQkQEiABDVAxogABA1IAJBEGokAAs5AQF/IwBBEGsiAiQAAkAgASgCMCIBRQRAIAAQewwBCyACIAE2AgwgACACQQxqEJsCCyACQRBqJAALJwEBfyMAQRBrIgIkACACIAFBKGo2AgwgACACQQxqEHUgAkEQaiQACycBAX8jAEEQayICJAAgAiABQSBqNgIMIAAgAkEMahB1IAJBEGokAAsmAQF/IwBBEGsiACQAIABB1dUCNgIAQbTUAiAAEMsDIABBEGokAAsqAQF/IwBBEGsiASQAIAFBvtQCNgIAQbTUAiABEMsDIAAQeyABQRBqJAALJwEBfyMAQRBrIgIkACACQQhqIAEQMiAAIAJBCGoQngogAkEQaiQACycBAX8jAEEQayICJAAgAiABQSRqNgIMIAAgAkEMahB1IAJBEGokAAtfAQF/IAAoAgAiAiAAKAIERgRAIAAgACACQQFqEF0QqQcgACgCACECCyAAKAIIIAJBGGxqIgIgASkCADcCACACIAEpAhA3AhAgAiABKQIINwIIIAAgACgCAEEBajYCAAsnAQF/IwBBEGsiAiQAIAIgAUEcajYCDCAA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NCAAQgA3AoQ0IABCADcC9DMgAEH6M2pCADcBACAAQbQ1akEAQSwQTxogARBWGiAFIAEpAwg3AgggBSABKQMANwIAIABCADcD8DUgAEKAgICA8P////8ANwKMNiAAQfg1akIANwMAIABBgDZqQgA3AwAgAEGINmpBADoAACAAQgA3ArQ2IABBADsBsDYgAEEANgKcNiAAQQE6AJY2IABBADsBlDYgAEF/NgLENiAAQQA2AJc2IABCfzcCvDYgAEIANwPANyAAQv/////3/////wA3A8g3IABC//////f/////ADcD0DcgAEEANgKgOCAAQQA6AJk6IABBADYClDogAEHIOWpBtiE2AgAgAEHQOGpBqSE2AgAgAEEAOgDYNyAAQX82AqQ6IABCgICAgHA3Apw6IABBADoAmDogAEIANwPwOiAAQfg6akIANwMAIABBgDtqQoCAgIBwNwMAIABCADcClDsgAEEANgK4OyABQwAAAABDAAAAABAqGiACIAEpAwA3AgAgAEEANgLgWSAAQgA3AsxZIABCgICAgKDh9ZE8NwLEWSAAQQA6AMBZIABCgICAgICAgMgKNwOoWSABQ///f39D//9/fxAqGiAEIAEpAwAiCDcCACADIAg3AgAgAEECNgLIWiAAQQA6ALxaIABB////+wc2ArhaIABCADcCpFogAEEAOgCgWiAAQQA2AvhZIABBADoA9FkgAEKAgICAIDcDwFogAEHM2gBqQQBB6AMQTxogAEF/NgK8XiAAQn83ArReIABBwN4AakEAQYEYEE8aIAFBEGokACAACycBAX8jAEEQayICJAAgAiABQRRqNgIMIAAgAkEMahB1IAJBEGokAAsnAQF/IwBBEGsiAiQAIAIgAUEMajYCDCAAIAJBDGoQdSACQRBqJAALJwEBfyMAQRBrIgIkACACIAFBBGo2AgwgACACQQxqEHUgAkEQaiQACzABAX8jAEEQayIEJAAgACgCACEAIAQgAxBCIAEgAiAEIAARBgAgBBA1IARBEGokAAs3AQJ/IwBBEGsiAiQAIAAoAhQhAyACIAEQkgEgAyACEC4gACgCHEF/ahCSBCACEDUgAkEQaiQACyoBAX8jAEEQayICJAAgAiAANgIMIAJBDGogARCUAxDcASACQRBqJAAgAAsqAQF/IwBBEGsiAiQAIAAgAiABKAIUEJEBIgAQ1QMaIAAQNSACQRBqJAALlwEBAX8jAEEwayIGJAAgACgCACEAIAZBIGogARAtIAZBGGogAhAtIAZBEGogAxAtIAZBCGogBBAtIAYgBRAtIAZBKGogBkEgaiAGQRhqIAZBEGogBkEIaiAGIAARDgAgBkEoahB6IQAgBkEoahArIAYQKyAGQQhqECsgBkEQahArIAZBGGoQKyAGQSBqECsgBkEwaiQAIAALRQEBfyMAQRBrIgMkACAAKAIAIQAgA0EIaiABEC0gAyACEC0gA0EIaiADIAARAgAhACADECsgA0EIahArIANBEGokACAAC2EBAX8jAEEgayIDJAAgACgCACEAIANBEGogARAtIANBCGogAhAtIANBGGogA0EQaiADQQhqIAARBgAgA0EYahB6IQAgA0EYahArIANBCGoQKyADQRBqECsgA0EgaiQAIAALbQEBfyMAQSBrIgQkACAAKAIAIQAgBEEQaiABEC0gBEEIaiACEC0gBCADEC0gBEEYaiAEQRBqIARBCGogBCAAEQgAIARBGGoQeiEAIARBGGoQKyAEECsgBEEIahArIARBEGoQKyAEQSBqJAAgAAs3AQF/IwBBEGsiAiQAIAIgADYCDCACKAIMIAEqAgA4AgAgAiACKAIMQQhqNgIMIAJBEGokACAAC6sCAQJ/QZC2AygCACECIAAoAgAQnAIQ1AMiAUEANgLIASABQgA3A8ABIAFCADcDGCACEJwCIAAoAgAQ6g4gAEEANgIAIABBtAFqECsgAEGwAWoQKyAAQawBahArIABBoAFqEDUgAEGYAWoQKyAAQZQBahArIABBiAFqEDUgAEGAAWoQKyAAQfwAahArIABB+ABqECsgAEHsAGoQNSAAQeQAahArIABB4ABqECsgAEHcAGoQKyAAQdgAahArIABB1ABqECsgAEHQAGoQKyAAQcwAahArIABByABqECsgAEHEAGoQKyAAQUBrECsgAEE0ahA1IABBMGoQKyAAQSxqECsgAEEoahArIABBJGoQKyAAQSBqECsgAEEcahArIABBEGoQNSAAQQRqEDUgAAtYAQF/IwBBIGsiBCQAIARBGGogARAtIARBEGogAhAtIARBCGogAxAtIARBGGogBEEQaiAEQQhqIAARBgAgBEEIahArIARBEGoQKyAEQRhqECsgBEEgaiQAC0ABAX8jAEEQayIEJAAgBCADEC0gBEEIaiABIAIgBCAAESsAIARBCGoQeiEAIARBCGoQKyAEECsgBEEQaiQAIAALQAEBfyMAQRBrIgQkACAEQQhqIAEQLSAEIAIQLSAEQQhqIAQgAyAAEQUAIQAgBBArIARBCGoQKyAEQRBqJAAgAAsLACABIAIgABFGAAstAQF/IwBBEGsiBCQAIAQgASACIAMgABE/ADYCDCAEKAIMIQAgBEEQaiQAIAALCwAgASACIAARAgALXgEBfyMAQSBrIgckACAHQRhqIAQQLSAHQRBqIAUQLSAHQQhqIAYQLSABIAIgAyAHQRhqIAdBEGogB0EIaiAAER0AIAdBCGoQKyAHQRBqECsgB0EYahArIAdBIGokAAs+AQF/IwBBEGsiAyQAIAMgAhAtIANBCGogASADIAARBgAgA0EIahB6IQAgA0EIahArIAMQKyADQRBqJAAgAAsNACABIAIgAyAAEQUACz4BAX8jAEEQayIFJAAgBUEIaiADEC0gBSAEEC0gASACIAVBCGogBSAAES4AIAUQKyAFQQhqECsgBUEQaiQAC1UBAX8jAEEgayIFJAAgBUEIaiABEEIgBSAEEC0gBUEYaiAFQQhqIAIgAyAFIAARHAAgBUEYahB6IQAgBUEYahArIAUQKyAFQQhqEDUgBUEgaiQAIAALKgEBfyMAQRBrIgIkACACIAEgABEAACACEJQDIQAgAhA1IAJBEGokACAACykCAX8BfCMAQRBrIgEkACABIAARXQA5AwggASsDCCECIAFBEGokACACCz4BAX8jAEEQayIDJAAgA0EIaiABEC0gAyACEC0gA0EIaiADIAARAgAhACADECsgA0EIahArIANBEGokACAACzIBAX8jAEEQayICJAAgAkEIaiABEC0gAkEIaiAAEQMAIQAgAkEIahArIAJBEGokACAACzwBAX8jAEEQayIEJAAgBEEIaiABEC0gBCACEC0gBEEIaiAEIAMgABEGACAEECsgBEEIahArIARBEGokAAsJACABIAARAwALNgEBfyMAQRBrIgQkACAEQQhqIAEQLSAEQQhqIAIgAyAAEQUAIQAgBEEIahArIARBEGokACAACzQBAX8jAEEQayIDJAAgA0EIaiABEC0gA0EIaiACIAARAgAhACADQQhqECsgA0EQaiQAIAALRQEBfyMA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aiAEEC0gB0EIaiAFEC0gByAGEC0gB0EoaiAHQSBqIAdBGGogB0EQaiAHQQhqIAcgABEOACAHECsgB0EIahArIAdBEGoQKyAHQRhqECsgB0EgahArIAdBKGoQKyAHQTBqJAALKQEBfyMAQRBrIgIkACACIAEQQiACIAARAwAhACACEDUgAkEQaiQAIAALRwEBfyMAQSBrIgMkACADQRBqIAEQQiADQQhqIAIQLSADQRBqIANBCGogABECACEAIANBCGoQKyADQRBqEDUgA0EgaiQAIAALOgEBfyMAQSBrIgMkACADQRBqIAEQQiADIAIQQiADQRBqIAMgABEAACADEDUgA0EQahA1IANBIGokAAtDAQF/IwBBIGsiAyQAIANBGGogARAtIANBCGogAhBCIANBGGogA0EIaiAAEQAAIANBCGoQNSADQRhqECsgA0EgaiQACwsAIAEgAiAAERQACysCAX8BfSMAQRBrIgIkACACIAEgABETADgCDCACKgIMIQMgAkEQaiQAIAMLJwEBfyMAQRBrIgEkACABIAARCQA2AgwgASgCDCEAIAFBEGokACAACzIBAX8jAEEQayIEJAAgBEEIaiACEC0gASAEQQhqIAMgABEGACAEQQhqECsgBEEQaiQACzwBAX8jAEEQayICJAAgAkEIaiABEC0gAiACQQhqIAARAwA2AgwgAigCDCEAIAJBCGoQKyACQRBqJAAgAAs+AQF/IwBBEGsiAyQAIANBCGogAhAtIAMgASADQQhqIAARAgA2AgwgAygCDCEAIANBCGoQKyADQRBqJAAgAAswAQF/IwBBEGsiAyQAIANBCGogAhAtIAEgA0EIaiAAEQAAIANBCGoQKyADQRBqJAALCwAgASACIAAROQALKQEBfyMAQRBrIgQkACAEIAEQQiAEIAIgAyAAEQYAIAQQNSAEQRBqJAALRQEBfyMAQSBrIgQkACAEQRBqIAEQQiAEQQhqIAIQLSAEQRBqIARBCGogAyAAEQYAIARBCGoQKyAEQRBqEDUgBEEgaiQACwsAIAEgAiAAEQAAC2QBAX8jAEEgayIFJAAgBUEYaiABEC0gBUEQaiACEC0gBUEIaiADEC0gBSAEEC0gBUEYaiAFQRBqIAVBCGogBSAAEQgAIAUQKyAFQQhqECsgBUEQahArIAVBGGoQKyAFQSBqJAALMAEB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QeDAAkHsAiAAQQhqECwQACAAQTA2AghBhN0CQaKUAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABBNDYCCEGE3QJBsJQCQeywA0HcwAJB6wIgAEEIahAsQeywA0HgwAJB7AIgAEEIahAsEABBhN0CQcCUAkHEvQJBmMMCQe0CQfMCED1BAEEAQQBBABAAIABBwAA2AghBhN0CQc2UAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABBxAA2AghBhN0CQduUAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAQYTdAkHrlAJBxL0CQZjDAkHtAkH0AhA9QQBBAEEAQQAQAEGE3QJB95QCQcS9AkGYwwJB7QJB9QIQPUEAQQBBAEEAEABBhN0CQYiVAkHEvQJBmMMCQe0CQfYCED1BAEEAQQBBABAAIABB4AA2AghBhN0CQZqVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB5AA2AghBhN0CQaiVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB6AA2AghBhN0CQbqVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB7AA2AghBhN0CQciVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB8AA2AghBhN0CQdqVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB9AA2AghBhN0CQeaVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB+AA2AghBhN0CQfOVAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAIABB/AA2AghBhN0CQf+VAkHssANB3MACQesCIABBCGoQLEHssANB4MACQewCIABBCGoQLBAAQYTdAkGNlgJBxL0CQZjDAkHtAkH3AhA9QQBBAEEAQQAQAEGE3QJBnZYCQcS9AkGYwwJB7QJB+AIQPUEAQQBBAEEAEABBhN0CQbGWAkHEvQJBmMMCQe0CQfkCED1BAEEAQQBBABAA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ayIAJABBkNMCQajTAkHI0wJBAEHMvQJBwwFBiMACQQBBiMACQQBByIECQYrAAkHEARAFIABBADYCDEGQ0wJB1IECQbCwA0GYwwJBxQEgAEEMahAsQbCwA0GcwwJBxgEgAEEMahAsEAAgAEEENgIMQZDTAkHegQJB7LADQdzAAkHHASAAQQxqECxB7LADQeDAAkHIASAAQQxqECwQACAAQQg2AgxBkNMCQeeBAkHssANB3MACQccBIABBDGoQLEHssANB4MACQcgBIABBDGoQLBAAIABBDDYCDEGQ0wJB6oECQeywA0HcwAJBxwEgAEEMahAsQeywA0HgwAJByAEgAEEMahAsEAAgAEEQNgIMQZDTAkHtgQJB7LADQdzAAkHHASAAQQxqECxB7LADQeDAAkHIASAAQQxqECwQACAAQRQ2AgxBkNMCQfCBAkHssANB3MACQccBIABBDGoQLEHssANB4MACQcgBIABBDGoQLBAAIABBGDYCDEGQ0wJB84ECQeywA0HcwAJBxwEgAEEMahAsQeywA0HgwAJByAEgAEEMahAsEAAgAEEcNgIMQZDTAkH2gQJB7LADQdzAAkHHASAAQQxqECxB7LADQeDAAkHIASAAQQxqECwQACAAQSA2AgxBkNMCQfmBAkHssANB3MACQccBIABBDGoQLEHssANB4MACQcgBIABBDGoQLBAAIABBJDYCDEGQ0wJB/IECQeywA0HcwAJBxwEgAEEMahAsQeywA0HgwAJByAEgAEEMahAsEAAgAEEQaiQACzwBAX8jAEEQayIAJAAgAEG/ATYCDEGY0gJBuYECQQNB9NICQZzDAkHCASAAQQxqECxBABACIABBEGokAAsJACAAIAEQ8g4LPwEBfyMAQRBrIgEkACABIAApAgA3AwhBmNICQaeBAkECQezSAkGQxgJBwQEgAUEIahCHAUEAEAIgAUEQaiQACzwBAX8jAEEQayIAJAAgAEG1ATYCDEGY0gJBvoACQQNB4NICQZzDAkHAASAAQQxqECxBABACIABBEGokAAsJACAAIAEQ+A4L8wMCDH8BfiMAQRBrIgEkACAAEDQaIABBCGoQNCEEIABBEGoQNCEFIABBGGoQNCEGIABBIGoQNCEHIABBKGoQNCEIIABByABqEFYhAiAAQdgAahBWIQMgAEH8AGoQNCEJIABBhAFqEEQaIABBsAFqEEQaIABBvAFqEEQaIABByAFqEEQaIABB1AFqEEQaIABB7AFqEO0FIQogAEHwAWoQ7QUhCyAAQfQBahDtBSEMIAFDAAAAAEMAAAAAECoaIAYgASkDACINNwIAIAUgDTcCACAEIA03AgAgACANNwIAIAFDAAAAAEMAAAAAECoaIAggASkDACINNwIAIAcgDTcCACAAQUBrQgA3AgAgAEIANwI4IABCADcCMCABEFYaIAMgASkDCDcCCCADIAEpAwA3AgAgAiABKQMINwIIIAIgASkDADcCACAAQgA3AnAgAEEAOgB6IABBADsBeCAAQoCAgIAQNwJoIAFDAAAAAEMAAAAAECoaIAkgASkDADcCACAAQQE2ApgBIABCgICAgBA3ApABIABCADcC4AEgAEGAgID8ezYCrAEgAEIANwKkASAAQn83ApwBIABBADYC6AEgCiABEOwFKAIANgIAIAsgARDsBSgCADYCACAMIAEQ7AUoAgA2AgAgAEEANgL4ASABQRBqJAALDgAgAARAIAAQ4wYQTQsLBgBBmNICC6ADAQF/IwBBEGsiACQAQZjSAkGw0gJB0NICQQBBzL0CQbMBQYjAAkEAQYjAAkEAQbOAAkGKwAJBtAEQBRCVEyAAQQA2AghBmNICQc+AAkH0rwNBmMMCQbYBIABBCGoQLEH0rwNBnMMCQbcBIABBCGoQLBAAIABBCDYCCEGY0gJB1YACQbywA0GYwwJBuAEgAEEIahAsQbywA0GcwwJBuQEgAEEIahAsEAAgAEEMNgIIQZjSAkHjgAJBvLADQZjDAkG4ASAAQQhqECxBvLADQZzDAkG5ASAAQQhqECwQACAAQRA2AghBmNICQfGAAkG8sANBmMMCQbgBIABBCGoQLEG8sANBnMMCQbkBIABBCGoQLBAAQZjSAkH/gAJBxL0CQZjDAkG6AUG7ARA9QQBBAEEAQQAQAEGY0gJBioECQcS9AkGYwwJBugFBvAEQPUEAQQBBAEEAEABBmNICQZaBAkHEvQJBmMMCQboBQb0BED1BAEEAQQBBABAAIABBADYCDCAAQb4BNgIIIAAgACkDCDcDACAAEJQTEJITIABBEGokAAsNACAAIAEgAiADEPkOCzwBAX8jAEEQayIAJAAgAEGMATYCDEH0xgJB//8BQQNB/NECQZzDAkGyASAAQQxqECxBABACIABBEGokAAsJACAAIAEQpwILDQAgACABIAIgAxD6Dgs8AQF/IwBBEGsiACQAIABBigE2AgxB9MYCQef/AUELQcDRAkHs0QJBsQEgAEEMahAsQQAQAiAAQRBqJAALGQAgACABIAIgAyAEIAUgBiAHIAggCRD8DgsRACAAIAEgAiADIAQgBRD+DgvjBgIQfwF+IwBBEGsiAyQAIABBDGoQNCEEIABBFGoQNCEFIABBHGoQNCEGIABBJGoQNCEHIABBLGoQNCEIIABBNGoQNCEJIABB0ABqEDQhCiAAQdgAahA0GiAAQeAAahA0IQsgAEHoAGoQNCEMIABB8ABqEDQhDSAAQbgBahA0IQ4gAEHAAWoQNCEPIABByAFqEJcTIABBxANqEEQhECAAQdADahBWGiAAQeADahBWGiAAQfADahBWGiAAQYAEahBWGiAAQZAEahBWGiAAQaAEahBWGiAAQbgEakEAQSQQTxogAEHcBGoQmwMgAEHoBGoQRBogAEG0BmohESAAQYAFaiABQdAxahDuBSESIABBlAZqIQEDQCABEFZBEGoiASARRw0ACyAAIAIQmQc2AgAgACACQQAQ8wE2AgQgECAAQQRqEHYgAEEANgIIIANDAAAAAEMAAAAAECoaIAQgAykDADcCACADQwAAAABDAAAAABAqGiAGIAMpAwAiEzcCACAFIBM3AgAgA0MAAAAAQwAAAAAQKhogCCADKQMAIhM3AgAgByATNwIAIANDAAAAAEMAAAAAECoaIAkgAykDADcCACAAQgA3AjwgACACEGtBAWo2AkQgAEGhEBBVIQEgAEEANgJMIAAgATYCSCADQwAAAABDAAAAABAqGiAKIAMpAwA3AgAgA0P//39/Q///f38QKhogCyADKQMANwIAIANDAAAAP0MAAAA/ECoaIAwgAykDADcCACADQwAAAABDAAAAABAqGiANIAMpAwA3AgAgAEEANgB/IABCADcCeCAAQX82ApQBIABB//8DOwGIASAAQYCAfDYChAEgAEH/AToAgwEgAEKAgICAcDcCnAEgAEEAOgCYASAAQoCAgIBwNwKMASAAQQ82ArQBIABCADcCpAEgAEKPgICA8AE3AqwBIAND//9/f0P//39/ECoaIA8gAykDACITNwIAIA4gEzcCACAAIBI2AvwEIABCgICA/HM3AvQEIABC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Qez3ARBDIAFB7PcBIANBCGoQYyADQQhqECsgACABEKADIANBEGokAAsxACABQc/3ASACEGMgAUHR9wEgAxBjIAFB6vcBIAQQYyABQez3ASAFEGMgACABEKADC5wBAQF/IwBBEGsiAyQAIANBCGogARCKAiACQc/3ASADQQhqEGMgA0EIahArIANBCGogAUEEahCKAiACQdH3ASADQQhqEGMgA0EIahArIANBCGogAUEIahCKAiACQer3ASADQQhqEGMgA0EIahArIANBCGogAUEMahCKAiACQez3ASADQQhqEGMgA0EIahArIAAgAhCgAyADQRBqJAALlAEBAX8jAEEQayICJAAgAkEIaiAAQc/3ARBDIAEgAkEIahAzOAIAIAJBCGoQKyACQQhqIABB0fcBEEMgASACQQhqEDM4AgQgAkEIahArIAJBCGogAEHq9wEQQyABIAJBCGoQMzgCCCACQQhqECsgAkEIaiAAQez3ARBDIAEgAkEIahAzOAIMIAJBCGoQKyACQRBqJAALOgEBfyMAQRBrIgAkACAAQRk2AgxBnMACQeP3AUEDQZzBAkGUwQJBHCAAQQxqECxBABACIABBEGokAAs6AQF/IwBBEGsiACQAIABBGDYCDEGcwAJB3vcBQQNBiMECQZTBAkEbIABBDGoQLEEAEAIgAEEQaiQACzoBAX8jAEEQayIAJAAgAEEXNgIMQZzAAkHa9wFBBEHwwAJBgMECQRogAEEMahAsQQAQAiAAQRBqJAALBgBBnMACC68BAQF/IwBBEGsiACQAQZzAAkGwwAJBzMACQQBBzL0CQRNBiMACQQBBiMACQQBB0/cBQYrAAkEUEAUgAEEANgIIQZzAAkHP9wFB7LADQdzAAkEVIABBCGoQLEHssANB4MACQRYgAEEIahAsEAAgAEEENgIMQZzAAkHR9wFB7LADQdzAAkEVIABBDGoQLEHssANB4MACQRYgAEEMahAsEAAQjRQQjBQQixQgAEEQaiQAC4EBAQJ/IwBBEGsiAiQAIAJBCGogAEHP9wEQQyACIAFBz/cBEEMgAkEIaiACEOYBIQMgAhArIAJBCGoQKyADBEAgAkEIaiAAQdH3ARBDIAIgAUHR9wEQQyACQQhqIAIQ5gEhACACECsgAkEIahArIAJBEGokACAADwsgAkEQaiQAQQALVAEBfyMAQRBr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gD8AAIC/AwAAAAYAQYoRC+cFgD8AAIA/BgAAAAkAAAAAAIA/AAAAAAAAgL8AAIA/CQAAAAwAAABUZXh0AFRleHREaXNhYmxlZABXaW5kb3dCZwBDaGlsZEJnAFBvcHVwQmcAQm9yZGVyAEJvcmRlclNoYWRvdwBGcmFtZUJnAEZyYW1lQmdIb3ZlcmVkAEZyYW1lQmdBY3RpdmUAVGl0bGVCZwBUaXRsZUJnQWN0aXZlAFRpdGxlQmdDb2xsYXBzZWQATWVudUJhckJnAFNjcm9sbGJhckJnAFNjcm9sbGJhckdyYWIAU2Nyb2xsYmFyR3JhYkhvdmVyZWQAU2Nyb2xsYmFyR3JhYkFjdGl2ZQBDaGVja01hcmsAU2xpZGVyR3JhYgBTbGlkZXJHcmFiQWN0aXZlAEJ1dHRvbgBCdXR0b25Ib3ZlcmVkAEJ1dHRvbkFjdGl2ZQBIZWFkZXIASGVhZGVySG92ZXJlZABIZWFkZXJBY3RpdmUAU2VwYXJhdG9yAFNlcGFyYXRvckhvdmVyZWQAU2VwYXJhdG9yQWN0aXZlAFJlc2l6ZUdyaXAAUmVzaXplR3JpcEhvdmVyZWQAUmVzaXplR3JpcEFjdGl2ZQBUYWIAVGFiSG92ZXJlZABUYWJBY3RpdmUAVGFiVW5mb2N1c2VkAFRhYlVuZm9jdXNlZEFjdGl2ZQBQbG90TGluZXMAUGxvdExpbmVzSG92ZXJlZABQbG90SGlzdG9ncmFtAFBsb3RIaXN0b2dyYW1Ib3ZlcmVkAFRleHRTZWxlY3RlZEJnAERyYWdEcm9wVGFyZ2V0AE5hdkhpZ2hsaWdodABOYXZXaW5kb3dpbmdIaWdobGlnaHQATmF2V2luZG93aW5nRGltQmcATW9kYWxXaW5kb3dEaW1CZwBVbmtub3duACMjVG9vbHRpcF8lMDJkACMjTWVudV8lMDJkACMjUG9wdXBfJTA4eAB3aW5kb3dfY29udGV4dAB2b2lkX2NvbnRleHQAQYAXC4QEAwAAAAEAAAAAAAAAAgAAAAEAAAADAAAAAgAAAAAAAABjb2x1bW5zACNTb3VyY2VFeHRlcm4ACiUqcyUuKnMAJSpzJS4qcwAgJS4qcwAKAGFiAExvZ0J1dHRvbnMATG9nIFRvIFRUWQBMb2cgVG8gRmlsZQBMb2cgVG8gQ2xpcGJvYXJkAERlZmF1bHQgRGVwdGgAcmIAd3QARGVhciBJbUd1aSBNZXRyaWNzAERlYXIgSW1HdWkgJXMAQXBwbGljYXRpb24gYXZlcmFnZSAlLjNmIG1zL2ZyYW1lICglLjFmIEZQUykAJWQgdmVydGljZXMsICVkIGluZGljZXMgKCVkIHRyaWFuZ2xlcykAJWQgYWN0aXZlIHdpbmRvd3MgKCVkIHZpc2libGUpACVkIGFjdGl2ZSBhbGxvY2F0aW9ucwBXaW5kb3dzAERyYXdMaXN0AEFjdGl2ZSBEcmF3TGlzdHMgKCVkKQBQb3B1cHMAUG9wdXBzICglZCkAUG9wdXBJRDogJTA4eCwgV2luZG93OiAnJXMnJXMlcwBOVUxMACBDaGlsZFdpbmRvdwAgQ2hpbGRNZW51AFRhYkJhcnMAVGFiIEJhcnMgKCVkKQBJbnRlcm5hbCBzdGF0ZQBOb25lAE1vdXNlAE5hdgBOYXZLZXlib2FyZABOYXZHYW1lcGFkAEGQGwvgBl8NAABkDQAAag0AAG4NAAB6DQAASG92ZXJlZFdpbmRvdzogJyVzJwBIb3ZlcmVkUm9vdFdpbmRvdzogJyVzJwBIb3ZlcmVkSWQ6IDB4JTA4WC8weCUwOFggKCUuMmYgc2VjKSwgQWxsb3dPdmVybGFwOiAlZABBY3RpdmVJZDogMHglMDhYLzB4JTA4WCAoJS4yZiBzZWMpLCBBbGxvd092ZXJsYXA6ICVkLCBTb3VyY2U6ICVzAEFjdGl2ZUlkV2luZG93OiAnJXMnAE1vdmluZ1dpbmRvdzogJyVzJwBOYXZXaW5kb3c6ICclcycATmF2SWQ6IDB4JTA4WCwgTmF2TGF5ZXI6ICVkAE5hdklucHV0U291cmNlOiAlcwBOYXZBY3RpdmU6ICVkLCBOYXZWaXNpYmxlOiAlZABOYXZBY3RpdmF0ZUlkOiAweCUwOFgsIE5hdklucHV0SWQ6IDB4JTA4WABOYXZEaXNhYmxlSGlnaGxpZ2h0OiAlZCwgTmF2RGlzYWJsZU1vdXNlSG92ZXI6ICVkAE5hdldpbmRvd2luZ1RhcmdldDogJyVzJwBEcmFnRHJvcDogJWQsIFNvdXJjZUlkID0gMHglMDhYLCBQYXlsb2FkICIlcyIgKCVkIGJ5dGVzKQBUb29scwBTaG93IHdpbmRvd3MgYmVnaW4gb3JkZXIAU2hvdyB3aW5kb3dzIHJlY3RhbmdsZXMAT3V0ZXJSZWN0AE91dGVyUmVjdENsaXBwZWQASW5uZXJSZWN0AElubmVyQ2xpcFJlY3QAV29ya1JlY3QAQ29udGVudHMAQ29udGVudHNSZWdpb25SZWN0AAAAAAAAAACxDwAAuw8AAMwPAADWDwAA5A8AAO0PAAD2DwAAIyNyZWN0c190eXBlACclcyc6ACglNi4xZiwlNi4xZikgKCU2LjFmLCU2LjFmKSBTaXplICglNi4xZiwlNi4xZikgJXMAU2hvdyBjbGlwcGluZyByZWN0YW5nbGUgd2hlbiBob3ZlcmluZyBJbURyYXdDbWQgbm9kZQAlZAAjI0JhY2tncm91bmQAIyNGb3JlZ3JvdW5kACVzLyVzXyUwOFgAJXMvJTA4WAAjUkVTSVpFACNDT0xMQVBTRQAjQ0xPU0UAKgBBgCILoA0IAAAAAQAAAAAAAAAIAAAAAgAAAAQAAAAIAAAAAQAAAAwAAAAIAAAAAQAAABAAAAAIAAAAAgAAABQAAAAIAAAAAgAAABwAAAAIAAAAAQAAACgAAAAIAAAAAQAAACwAAAAIAAAAAQAAADAAAAAIAAAAAQAAADQAAAAIAAAAAgAAADgAAAAIAAAAAQAAAEAAAAAIAAAAAQAAAEQAAAAIAAAAAgAAAEgAAAAIAAAAAgAAAFAAAAAIAAAAAQAAAGAAAAAIAAAAAQAAAGgAAAAIAAAAAQAAAGwAAAAIAAAAAQAAAHAAAAAIAAAAAQAAAHQAAAAIAAAAAQAAAHgAAAAIAAAAAgAAAIAAAAAIAAAAAgAAAIgAAAAjIyNOYXZXaW5kb3dpbmdMaXN0AChQb3B1cCkAIyNNYWluTWVudUJhcgAoTWFpbiBtZW51IGJhcikAKFVudGl0bGVkKQBQb3M9JWYsJWYAU2l6ZT0lZiwlZgBDb2xsYXBzZWQ9JWQAIyMjAFslc11bJXNdCgBQb3M9JWQsJWQKAFNpemU9JWQsJWQKAENvbGxhcHNlZD0lZAoAJXMgKCVkKQAlcyAnJXMnLCAlZCBAIDB4JXAAUG9zOiAoJS4xZiwlLjFmKSwgU2l6ZTogKCUuMWYsJS4xZiksIENvbnRlbnRTaXplICglLjFmLCUuMWYpAEZsYWdzOiAweCUwOFggKCVzJXMlcyVzJXMlcyVzJXMlcy4uKQBDaGlsZCAAVG9vbHRpcCAAUG9wdXAgAE1vZGFsIABDaGlsZE1lbnUgAE5vU2F2ZWRTZXR0aW5ncyAATm9Nb3VzZUlucHV0cwBOb05hdklucHV0cwBBbHdheXNBdXRvUmVzaXplAFNjcm9sbDogKCUuMmYvJS4yZiwlLjJmLyUuMmYpAEFjdGl2ZTogJWQvJWQsIFdyaXRlQWNjZXNzZWQ6ICVkLCBCZWdpbk9yZGVyV2l0aGluQ29udGV4dDogJWQAQXBwZWFyaW5nOiAlZCwgSGlkZGVuOiAlZCAoQ2FuU2tpcCAlZCBDYW5ub3QgJWQpLCBTa2lwSXRlbXM6ICVkAE5hdkxhc3RJZHM6IDB4JTA4WCwweCUwOFgsIE5hdkxheWVyQWN0aXZlTWFzazogJVgATmF2TGFzdENoaWxkTmF2V2luZG93OiAlcwBOYXZSZWN0UmVsWzBdOiAoJS4xZiwlLjFmKSglLjFmLCUuMWYpAE5hdlJlY3RSZWxbMF06IDxOb25lPgBSb290V2luZG93AFBhcmVudFdpbmRvdwBDaGlsZFdpbmRvd3MAQ29sdW1ucwBDb2x1bW5zIHNldHMgKCVkKQBTdG9yYWdlOiAlZCBieXRlcwBDb2x1bW5zIElkOiAweCUwOFgsIENvdW50OiAlZCwgRmxhZ3M6IDB4JTA0WABXaWR0aDogJS4xZiAoTWluWDogJS4xZiwgTWF4WDogJS4xZikAQ29sdW1uICUwMmQ6IE9mZnNldE5vcm0gJS4zZiAoPSAlLjFmIHB4KQAlczogJyVzJyAlZCB2dHgsICVkIGluZGljZXMsICVkIGNtZHMAQ1VSUkVOVExZIEFQUEVORElORwBDYWxsYmFjayAlcCwgdXNlcl9kYXRhICVwAERyYXcgJTRkIHRyaWFuZ2xlcywgdGV4IDB4JXAsIGNsaXBfcmVjdCAoJTQuMGYsJTQuMGYpLSglNC4wZiwlNC4wZikAJXMARWxlbUNvdW50OiAlZCwgRWxlbUNvdW50LzM6ICVkLCBWdHhPZmZzZXQ6ICslZCwgSWR4T2Zmc2V0OiArJWQAJXMgJTA0ZDogcG9zICglOC4yZiwlOC4yZiksIHV2ICglLjZmLCUuNmYpLCBjb2wgJTA4WAoAZWxlbQAgICAgAFRhYkJhciAoJWQgdGFicyklcwAgKkluYWN0aXZlKgA8AD4AJTAyZCVjIFRhYiAweCUwOFgAAACwCAAAtQgAAMIIAADLCAAA0wgAANsIAADiCAAA7wgAAPcIAAAGCQAAFAkAABwJAAAqCQAAOwkAAEUJAABRCQAAXwkAAHQJAACICQAAkgkAAJ0JAACuCQAAtQkAAMMJAADQCQAA1wkAAOUJAADyCQAA/AkAAA0KAAAdCgAAKAoAADoKAABLCgAATwoAAFoKAABkCgAAcQoAAIQKAACOCgAAnwoAAK0KAADCCgAA0QoAAOAKAADtCgAAAwsAABULAAAAAAAAAABAQAAAQEEAAJhBAEGqLwvuAVBBAAAAAAAA4EAAAIBBAACAPwAAAEEAAPhBAAAAAAAAuEEAALhBAAAwQQAAMEEAAKhBAAAAAAAAEEEAALhBAACAQAAAMEEAAFxCAACQQQAAuEEAABBBAAAwQQAAgEAAAJJCAAAAAAAAiEEAAIhBAAAAQQAAAEEAAFxCAAAAAAAAiEEAAIhBAAAAQQAAAEEAALZCAAAAAAAAiEEAALBBAACgQAAAAABQcm9nZ3lDbGVhbi50dGYsICVkcHgAIAD/AAAAIAD/ADExYzEArJ3XAAAAAAAAAAAgAP8AACBvIAAw/zDwMf8xAP/v/wBOr58AQaIxC4UnAQACAAQAAQABAAEAAQACAAEAAwACAAEAAgACAAEAAQABAAEAAQAFAAIAAQACAAMAAwADAAIAAgAEAAEAAQABAAIAAQAFAAIAAwABAAIAAQACAAEAAQACAAEAAQACAAIAAQAEAAEAAQABAAEABQAKAAEAAgATAAIAAQACAAEAAgABAAIAAQACAAEABQABAAYAAwACAAEAAgACAAEAAQABAAQACAAFAAEAAQAEAAEAAQADAAEAAgABAAUAAQACAAEAAQABAAoAAQABAAUAAgAEAAYAAQAEAAIAAgACAAwAAgABAAEABgABAAEAAQAEAAEAAQAEAAYABQABAAQAAgACAAQACgAHAAEAAQAEAAIABAACAAEABAADAAYACgAMAAUABwACAA4AAgAJAAEAAQAGAAcACgAEAAcADQABAAUABAAIAAQAAQABAAIAHAAFAAYAAQABAAUAAgAFABQAAgACAAkACAALAAIACQARAAEACAAGAAgAGwAEAAYACQAUAAsAGwAGAEQAAgACAAEAAQABAAIAAQACAAIABwAGAAsAAwADAAEAAQADAAEAAgABAAEAAQABAAEAAwABAAEACAADAAQAAQAFAAcAAgABAAQABAAIAAQAAgABAAIAAQABAAQABQAGAAMABgACAAwAAwABAAMACQACAAQAAwAEAAEABQADAAMAAQADAAcAAQAFAAEAAQABAAEAAgADAAQABQACAAMAAgAGAAEAAQACAAEABwABAAcAAwAEAAUADwACAAIAAQAFAAMAFgATAAIAAQABAAEAAQACAAUAAQABAAEABgABAAEADAAIAAIACQASABYABAABAAEABQABABAAAQACAAcACgAPAAEAAQAGAAIABAABAAIABAABAAYAAQABAAMAAgAEAAEABgAEAAUAAQACAAEAAQACAAEACgADAAEAAwACAAEACQADAAIABQAHAAIAEwAEAAMABgABAAEAAQABAAEABAADAAIAAQABAAEAAgAFAAMAAQABAAEAAgACAAEAAQACAAEAAQACAAEAAwABAAEAAQADAAcAAQAEAAEAAQACAAEAAQACAAEAAgAEAAQAAwAIAAEAAQABAAIAAQADAAUAAQADAAEAAwAEAAYAAgACAA4ABAAGAAYACwAJAAEADwADAAEAHAAFAAIABQAFAAMAAQADAAQABQAEAAYADgADAAIAAwAFABUAAgAHABQACgABAAIAEwACAAQAHAAcAAIAAwACAAEADgAEAAEAGgAcACoADAAoAAMANABPAAUADgARAAMAAgACAAsAAwAEAAYAAwABAAgAAgAXAAQABQAIAAoABAACAAcAAwAFAAEAAQAGAAMAAQACAAIAAgAFABwAAQABAAcABwAUAAUAAwAdAAMAEQAaAAEACAAEABsAAwAGAAsAFwAFAAMABAAGAA0AGAAQAAYABQAKABkAIwAHAAMAAgADAAMADgADAAYAAgAGAAEABAACAAMACAACAAEAAQADAAMAAwAEAAEAAQANAAIAAgAEAAUAAgABAA4ADgABAAIAAgABAAQABQACAAMAAQAOAAMADAADABEAAgAQAAUAAQACAAEACAAJAAMAEwAEAAIAAgAEABEAGQAVABQAHABLAAEACgAdAGcABAABAAIAAQABAAQAAgAEAAEAAgADABgAAgACAAIAAQABAAIAAQADAAgAAQABAAEAAgABAAEAAwABAAEAAQAGAAEABQADAAEAAQABAAMABAABAAEABQACAAEABQAGAA0ACQAQAAEAAQABAAEAAwACAAMAAgAEAAUAAgAFAAIAAgADAAcADQAHAAIAAgABAAEAAQABAAIAAwADAAIAAQAGAAQACQACAAEADgACAA4AAgABABIAAwAEAA4ABAALACkADwAXAA8AFwCwAAEAAwAEAAEAAQABAAEABQADAAEAAgADAAcAAwABAAEAAgABAAIABAAEAAYAAgAEAAEACQAHAAEACgAFAAgAEAAdAAEAAQACAAIAAwABAAMABQACAAQABQAEAAEAAQACAAIAAwADAAcAAQAGAAoAAQARAAEALAAEAAYAAgABAAEABgAFAAQAAgAKAAEABgAJAAIACAABABgAAQACAA0ABwAIAAgAAgABAAQAAQADAAEAAwADAAUAAgAFAAoACQAEAAkADAACAAEABgABAAoAAQABAAcABwAEAAoACAADAAEADQAEAAMAAQAGAAEAAwAFAAIAAQACABEAEAAFAAIAEAAGAAEABAACAAEAAwADAAYACAAFAAsACwABAAMAAwACAAQABgAKAAkABQAHAAQABwAEAAcAAQABAAQAAgABAAMABgAIAAcAAQAGAAsABQAFAAMAGAAJAAQAAgAHAA0ABQABAAgAUgAQAD0AAQABAAEABAACAAIAEAAKAAMACAABAAEABgAEAAIAAQADAAEAAQABAAQAAwAIAAQAAgACAAEAAQABAAEAAQAGAAMABQABAAEABAAGAAkAAgABAAEAAQACAAEABwACAAEABgABAAUABAAEAAMAAQAIAAEAAwADAAEAAwACAAIAAgACAAMAAQAGAAEAAgABAAIAAQADAAcAAQAIAAIAAQACAAEABQACAAUAAwAFAAoAAQACAAEAAQADAAIABQALAAMACQADAAUAAQABAAUACQABAAIAAQAFAAcACQAJAAgAAQADAAMAAwAGAAgAAgADAAIAAQABACAABgABAAIADwAJAAMABwANAAEAAwAKAA0AAgAOAAEADQAKAAIAAQADAAoABAAPAAIADwAPAAoAAQADAAkABgAJACAAGQAaAC8ABwADAAIAAwABAAYAAwAEAAMAAgAIAAUABAABAAkABAACAAIAEwAKAAYAAgADAAgAAQACAAIABAACAAEACQAEAAQABAAGAAQACAAJAAIAAwABAAEAAQABAAMABQAFAAEAAwAIAAQABgACAAEABAAMAAEABQADAAcADQACAAUACAABAAYAAQACAAUADgAGAAEABQACAAQACAAPAAUAAQAXAAYAPgACAAoAAQABAAgAAQACAAIACgAEAAIAAgAJAAIAAQABAAMAAgADAAEABQADAAMAAgABAAMACAABAAEAAQALAAMAAQABAAQAAwAHAAEADgABAAIAAwAMAAUAAgAFAAEABgAHAAUABwAOAAsAAQADAAEACAAJAAwAAgABAAsACAAEAAQAAgAGAAoACQANAAEAAQADAAEABQABAAMAAgAEAAQAAQASAAIAAwAOAAsABAAdAAQAAgAHAAEAAwANAAkAAgACAAUAAwAFABQABwAQAAgABQBIACIABgAEABYADAAMABwALQAkAAkABwAnAAkAvwABAAEAAQAEAAsACAAEAAkAAgADABYAAQABAAEAAQAEABEAAQAHAAcAAQALAB8ACgACAAQACAACAAMAAgABAAQAAgAQAAQAIAACAAMAEwANAAQACQABAAUAAgAOAAgAAQABAAMABgATAAYABQABABAABgACAAoACAAFAAEAAgADAAEABQAFAAEACwAGAAYAAQADAAMAAgAGAAMACAABAAEABAAKAAcABQAHAAcABQAIAAkAAgABAAMABAABAAEAAwABAAMAAwACAAYAEAABAAQABgADAAEACgAGAAEAAwAPAAIACQACAAoAGQANAAkAEAAGAAIAAgAKAAsABAADAAkAAQACAAYABgAFAAQAHgAoAAEACgAHAAwADgAhAAYAAwAGAAcAAwABAAMAAQALAA4ABAAJAAUADAALADEAEgAzAB8AjAAfAAIAAgABAAUAAQAIAAEACgABAAQABAADABgAAQAKAAEAAwAGAAYAEAADAAQABQACAAEABAACADkACgAGABYAAgAWAAMABwAWAAYACgALACQAEgAQACEAJAACAAUABQABAAEAAQAEAAoAAQAEAA0AAgAHAAUAAgAJAAMABAABAAcAKwADAAcAAwAJAA4ABwAJAAEACwABAAEAAwAHAAQAEgANAAEADgABAAMABgAKAEkAAgACAB4ABgABAAsAEgATAA0AFgADAC4AKgAlAFkABwADABAAIgACAAIAAwAJAAEABwABAAEAAQACAAIABAAKAAcAAwAKAAMACQAFABwACQACAAYADQAHAAMAAQADAAoAAgAHAAIACwADAAYAFQA2AFUAAgABAAQAAgACAAEAJwADABUAAgACAAUAAQABAAEABAABAAEAAwAEAA8AAQADAAIABAAEAAIAAwAIAAIAFAABAAgABwANAAQAAQAaAAYAAgAJACIABAAVADQACgAEAAQAAQAFAAwAAgALAAEABwACAB4ADAAsAAIAHgABAAEAAwAGABAACQARACcAUgACAAIAGAAHAAEABwADABAACQAOACwAAgABAAIAAQACAAMABQACAAQAAQAGAAcABQADAAIABgABAAsABQALAAIAAQASABMACAABAAMAGAAdAAIAAQADAAUAAgACAAEADQAGAAUAAQAuAAsAAwAFAAEAAQAFAAgAAgAKAAYADAAGAAMABwALAAIABAAQAA0AAgAFAAEAAQACAAIABQACABwABQACABcACgAIAAQABAAWACcAXwAmAAgADgAJAAUAAQANAAUABAADAA0ADAALAAEACQABABsAJQACAAUABAAEAD8A0wBfAAIAAgACAAEAAwAFAAIAAQABAAIAAgABAAEAAQADAAIABAABAAIAAQABAAUAAgACAAEAAQACAAMAAQADAAEAAQABAAMAAQAEAAIAAQADAAYAAQABAAMABwAPAAUAAwACAAUAAwAJAAsABAACABYAAQAGAAMACAAHAAEABAAcAAQAEAADAAMAGQAEAAQAGwAbAAEABAABAAIAAgAHAAEAAwAFAAIAHAAIAAIADgABAAgABgAQABkAAwADAAMADgADAAMAAQABAAIAAQAEAAYAAwAIAAQAAQABAAEAAgADAAYACgAGAAIAAwASAAMAAgAFAAUABAADAAEABQACAAUABAAXAAcABgAMAAYABAARAAsACQAFAAEAAQAKAAUADAABAAEACwAaACEABwADAAYAAQARAAcAAQAFAAwAAQALAAIABAABAAgADgARABcAAQACAAEABwAIABAACwAJAAYABQACAAYABAAQAAIACAAOAAEACwAIAAkAAQABAAEACQAZAAQACwATAAcAAgAPAAIADAAIADQABwAFABMAAgAQAAQAJAAIAAEAEAAIABgAGgAEAAYAAgAJAAUABAAkAAMAHAAMABkADwAlABsAEQAMADsAJgAFACAAfwABAAIACQARAA4ABAABAAIAAQABAAgACwAyAAQADgACABMAEAAEABEABQAEAAUAGgAMAC0AAgAXAC0AaAAeAAwACAADAAoAAgACAAMAAwABAAQAFAAHAAIACQAGAA8AAgAUAAEAAwAQAAQACwAPAAYAhgACAAUAOwABAAIAAgACAAEACQARAAMAGgCJAAoA0wA7AAEAAgAEAAEABAABAAEAAQACAAYAAgADAAEAAQACAAMAAgADAAEAAwAEAAQAAgADAAMAAQAEAAMAAQAHAAIAAgADAAEAAgABAAMAAwADAAIAAgADAAIAAQADAA4ABgABAAMAAgAJAAYADwAbAAkAIgCRAAEAAQACAAEAAQABAAEAAgABAAEAAQABAAIAAgACAAMAAQACAAEAAQABAAIAAwAFAAgAAwAFAAIABAABAAMAAgACAAIADAAEAAEAAQABAAoABAAFAAEAFAAEABAAAQAPAAkABQAMAAIACQACAAUABAACABoAEwAHAAEAGgAEAB4ADAAPACoAAQAGAAgArAABAAEABAACAAEAAQALAAIAAgAEAAIAAQACAAEACgAIAAEAAgABAAQABQABAAIABQABAAgABAABAAMABAACAAEABgACAAEAAwAEAAEAAgABAAEAAQABAAwABQAHAAIABAADAAEAAQABAAMAAwAGAAEAAgACAAMAAwADAAIAAQACAAwADgALAAYABgAEAAwAAgAIAAEABwAKAAEAIwAHAAQADQAPAAQAAwAXABUAHAA0AAUAGgAFAAYAAQAHAAoAAgAHADUAAwACAAEAAQABAAIAowAUAgEACgALAAEAAwADAAQACAACAAgABgACAAIAFwAWAAQAAgACAAQAAgABAAMAAQADAAMABQAJAAgAAgABAAIACAABAAoAAgAMABUAFAAPAGkAAgADAAEAAQADAAIAAwABAAEAAgAFAAEABAAPAAsAEwABAAEAAQABAAUABAAFAAEAAQACAAUAAwAFAAwAAQACAAUAAQALAAEAAQAPAAkAAQAEAAUAAwAaAAgAAgABAAMAAQABAA8AEwACAAwAAQACAAUAAgAHAAIAEwACABQABgAaAAcABQACAAIABwAiABUADQBGAAIAgAABAAEAAgABAAEAAgABAAEAAwACAAIAAgAPAAEABAABAAMABAAqAAoABgABADEAVQAIAAEAAgABAAEABAAEAAIAAwAGAAEABQAHAAQAAwDTAAQAAQACAAEAAgAFAAEAAgAEAAIAAgAGAAUABgAKAAMABAAwAGQABgACABAAKAEFABsAgwECAAIAAwAHABAACAAFACYADwAnABUACQAKAAMABwA7AA0AGwAVAC8ABQAVAAYAQbDYAAsUIAD/AAAgbyAAMP8w8DH/MQD/7/8AQdLYAAuxHgEAAgAEAAEAAQABAAEAAgABAAYAAgACAAEACAAFAAcACwABAAIACgAKAAgAAgAEABQAAgALAAgAAgABAAIAAQAGAAIAAQAHAAUAAwAHAAEAAQANAAcACQABAAQABgABAAIAAQAKAAEAAQAJAAIAAgAEAAUABgAOAAEAAQAJAAMAEgAFAAQAAgACAAoABwABAAEAAQADAAIABAADABcAAgAKAAwAAgAOAAIABAANAAEABgAKAAMAAQAHAA0ABgAEAA0ABQACAAMAEQACAAIABQAHAAYABAABAAcADgAQAAYADQAJAA8AAQABAAcAEAAEAAcAAQATAAkAAgAHAA8AAgAGAAUADQAZAAQADgANAAsAGQABAAEAAQACAAEAAgACAAMACgALAAMAAwABAAEABAAEAAIAAQAEAAkAAQAEAAMABQAFAAIABwAMAAsADwAHABAABAAFABAAAgABAAEABgADAAMAAQABAAIABwAGAAYABwABAAQABwAGAAEAAQACAAEADAADAAMACQAFAAgAAQALAAEAAgADABIAFAAEAAEAAwAGAAEABwADAAUABQAHAAIAAgAMAAMAAQAEAAIAAwACAAMACwAIAAcABAARAAEACQAZAAEAAQAEAAIAAgAEAAEAAgAHAAEAAQABAAMAAQACAAYAEAABAAIAAQABAAMADAAUAAIABQAUAAgABwAGAAIAAQABAAEAAQAGAAIAAQACAAoAAQABAAYAAQADAAEAAgABAAQAAQAMAAQAAQADAAEAAQABAAEAAQAKAAQABwAFAA0AAQAPAAEAAQAeAAsACQABAA8AJgAOAAEAIAARABQAAQAJAB8AAgAVAAkABAAxABYAAgABAA0AAQALAC0AIwArADcADAATAFMAAQADAAIAAwANAAIAAQAHAAMAEgADAA0ACAABAAgAEgAFAAMABwAZABgACQAYACgAAwARABgAAgABAAYAAgADABAADwAGAAcAAwAMAAEACQAHAAMAAwADAA8AFQAFABAABAAFAAwACwALAAMABgADAAIAHwADAAIAAQABABcABgAGAAEABAACAAYABQACAAEAAQADAAMAFgACAAYAAgADABEAAwACAAQABQABAAkABQABAAEABgAPAAwAAwARAAIADgACAAgAAQAXABAABAACABcACAAPABcAFAAMABkAEwAvAAsAFQBBAC4ABAADAAEABQAGAAEAAgAFABoAAgABAAEAAwALAAEAAQABAAIAAQACAAMAAQABAAoAAgADAAEAAQABAAMABgADAAIAAgAGAAYACQACAAIAAgAGAAIABQAKAAIABAABAAIAAQACAAIAAwABAAEAAwABAAIACQAXAAkAAgABAAEAAQABAAUAAwACAAEACgAJAAYAAQAKAAIAHwAZAAMABwAFACgAAQAPAAYAEQAHABsAtAABAAMAAgACAAEAAQABAAYAAwAKAAcAAQADAAYAEQAIAAYAAgACAAEAAwAFAAUACAAQAA4ADwABAAEABAABAAIAAQABAAEAAwACAAcABQAGAAIABQAKAAEABAACAAkAAQABAAsABgABACwAAQADAAcACQAFAAEAAwABAAEACgAHAAEACgAEAAIABwAVAA8ABwACAAUAAQAIAAMABAABAAMAAQAGAAEABAACAAEABAAKAAgAAQAEAAUAAQAFAAoAAgAHAAEACgABAAEAAwAEAAsACgAdAAQABwADAAUAAgADACEABQACABMAAwABAAQAAgAGAB8ACwABAAMAAwADAAEACAAKAAkADAALAAwACAADAA4ACAAGAAsAAQAEACkAAwABAAIABwANAAEABQAGAAIABgAMAAwAFgAFAAkABAAIAAkACQAiAAYAGAABAAEAFAAJAAkAAwAEAAEABwACAAIAAgAGAAIAHAAFAAMABgABAAQABgAHAAQAAgABAAQAAgANAAYABAAEAAMAAQAIAAgAAwACAAEABQABAAIAAgADAAEACwALAAcAAwAGAAoACAAGABAAEAAWAAcADAAGABUABQAEAAYABgADAAYAAQADAAIAAQACAAgAHQABAAoAAQAGAA0ABgAGABMAHwABAA0ABAAEABYAEQAaACEACgAEAA8ADAAZAAYAQwAKAAIAAwABAAYACgACAAYAAgAJAAEACQAEAAQAAQACABAAAgAFAAkAAgADAAgAAQAIAAMACQAEAAgABgAEAAgACwADAAIAAQABAAMAGgABAAcABQABAAsAAQAFAAMABQACAA0ABgAnAAUAAQAFAAIACwAGAAoABQABAA8ABQADAAYAEwAVABYAAgAEAAEABgABAAgAAQAEAAgAAgAEAAIAAgAJAAIAAQABAAEABAADAAYAAwAMAAcAAQAOAAIABAAKAAIADQABABEABwADAAIAAQADAAIADQAHAA4ADAADAAEAHQACAAgACQAPAA4ACQAOAAEAAwABAAYABQAJAAsAAwAmACsAFAAHAAcACAAFAA8ADAATAA8AUQAIAAcAAQAFAEkADQAlABwACAAIAAEADwASABQApQAcAAEABgALAAgABAAOAAcADwABAAMAAwAGAAQAAQAHAA4AAQABAAsAHgABAAUAAQAEAA4AAQAEAAIABwA0AAIABgAdAAMAAQAJAAEAFQADAAUAAQAaAAMACwAOAAsAAQARAAUAAQACAAEAAwACAAgAAQACAAkADAABAAEAAgADAAgAAwAYAAwABwAHAAUAEQADAAMAAwABABcACgAEAAQABgADAAEAEAARABYAAwAKABUAEAAQAAYABAAKAAIAAQABAAIACAAIAAYABQADAAMAAwAnABkADwABAAEAEAAGAAcAGQAPAAYABgAMAAEAFgANAAEABAAJAAUADAACAAkAAQAMABwACAADAAUACgAWADwAAQACACgABAA9AD8ABAABAA0ADAABAAQAHwAMAAEADgBZAAUAEAAGAB0ADgACAAUAMQASABIABQAdACEALwABABEAAQATAAwAAgAJAAcAJwAMAAMABwAMACcAAwABAC4ABAAMAAMACAAJAAUAHwAPABIAAwACAAIAQgATAA0AEQAFAAMALgB8AA0AOQAiAAIABQAEAAUACAABAAEAAQAEAAMAAQARAAUAAwAFAAMAAQAIAAUABgADABsAAwAaAAcADAAHAAIAEQADAAcAEgBOABAABAAkAAEAAgABAAYAAgABACcAEQAHAAQADQAEAAQABAABAAoABAACAAQABgADAAoAAQATAAEAGgACAAQAIQACAEkALwAHAAMACAACAAQADwASAAEAHQACACkADgABABUAEAApAAcAJwAZAA0ALAACAAIACgABAA0ABwABAAcAAwAFABQABAAIAAIAMQABAAoABgABAAYABwAKAAcACwAQAAMADAAUAAQACgADAAEAAgALAAIAHAAJAAIABAAHAAIADwABABsAAQAcABEABAAFAAoABwADABgACgALAAYAGgADAAIABwACAAIAMQAQAAoAEAAPAAQABQAbAD0AHgAOACYAFgACAAcABQABAAMADAAXABgAEQARAAMAAwACAAQAAQAGAAIABwAFAAEAAQAFAAEAAQAJAAQAAQADAAYAAQAIAAIACAAEAA4AAwAFAAsABAABAAMAIAABABMABAABAA0ACwAFAAIAAQAIAAYACAABAAYABQANAAMAFwALAAUAAwAQAAMACQAKAAEAGAADAMYANAAEAAIAAgAFAA4ABQAEABYABQAUAAQACwAGACkAAQAFAAIAAgALAAUAAgAcACMACAAWAAMAEgADAAoABwAFAAMABAABAAUAAwAIAAkAAwAGAAIAEAAWAAQABQAFAAMAAwASABcAAgAGABcABQAbAAgAAQAhAAIADAArABAABQACAAMABgABABQABAACAAkABwABAAsAAgAKAAMADgAfAAkAAwAZABIAFAACAAUABQAaAA4AAQALABEADAAoABMACQAGAB8AUwACAAcACQATAE4ADAAOABUATAAMAHEATwAiAAQAAQABAD0AEgBVAAoAAgACAA0AHwALADIABgAhAJ8AswAGAAYABwAEAAQAAgAEAAIABQAIAAcAFAAgABYAAQADAAoABgAHABwABQAKAAkAAgBNABMADQACAAUAAQAEAAQABwAEAA0AAwAJAB8AEQADABoAAgAGAAYABQAEAAEABwALAAMABAACAAEABgACABQABAABAAkAAgAGAAMABwABAAEAAQAUAAIAAwABAAYAAgADAAYAAgAEAAgAAQAFAA0ACAAEAAsAFwABAAoABgACAAEAAwAVAAIAAgAEABgAHwAEAAoACgACAAUAwAAPAAQAEAAHAAkAMwABAAIAAQABAAUAAQABAAIAAQADAAUAAwABAAMABAABAAMAAQADAAMACQAIAAEAAgACAAIABAAEABIADABcAAIACgAEAAMADgAFABkAEAAqAAQADgAEAAIAFQAFAH4AHgAfAAIAAQAFAA0AAwAWAAUABgAGABQADAABAA4ADABXAAMAEwABAAgAAgAJAAkAAwADABcAAgADAAcABgADAAEAAgADAAkAAQADAAEABgADAAIAAQADAAsAAwABAAYACgADAAIAAwABAAIAAQAFAAEAAQALAAMABgAEAAEABwACAAEAAgAFAAUAIgAEAA4AEgAEABMABwAFAAgAAgAGAE8AAQAFAAIADgAIAAIACQACAAEAJAAcABAABAABAAEAAQACAAwABgAqACcAEAAXAAcADwAPAAMAAgAMAAcAFQBAAAYACQAcAAgADAADAAMAKQA7ABgAMwA3ADkAJgEJAAkAAgAGAAIADwABAAIADQAmAFoACQAJAAkAAwALAAcAAQABAAEABQAGAAMAAgABAAIAAgADAAgAAQAEAAQAAQAFAAcAAQAEAAMAFAAEAAkAAQABAAEABQAFABEAAQAFAAIABgACAAQAAQAEAAUABwADABIACwALACAABwAFAAQABwALAH8ACAAEAAMAAwABAAoAAQABAAYAFQAOAAEAEAABAAcAAQADAAYACQBBADMABAADAA0AAwAKAAEAAQAMAAkAFQBuAAMAEwAYAAEAAQAKAD4ABAABAB0AKgBOABwAFAASAFIABgADAA8ABgBUADoA/QAPAJsACAEPABUACQAOAAcAOgAoACcAQZD3AAuDASAA/wAAMP8w8DH/MQD/7/8gAP8AAAQvBeAt/y1App+mAAAgAP8AECBeIAAOfw4AACAA/wACAQMBEAERASgBKQFoAWkBoAGhAa8BsAGgHvkeAABjbWFwAGxvY2EAaGVhZABnbHlmAGhoZWEAaG10eABrZXJuAEdQT1MAQ0ZGIABtYXhwAEGg+AAL5BYuLi0gICAgICAgICAtWFhYWFhYWC0gICAgWCAgICAtICAgICAgICAgICBYICAgICAgICAgICAtWFhYWFhYWCAgICAgICAgICAtICAgICAgICAgIFhYWFhYWFgtICAgICBYWCAgICAgICAgICAuLi0gICAgICAgICAtWC4uLi4uWC0gICBYLlggICAtICAgICAgICAgIFguWCAgICAgICAgICAtWC4uLi4uWCAgICAgICAgICAtICAgICAgICAgIFguLi4uLlgtICAgIFguLlggICAgICAgICAtLS0gICAgICAgICAtWFhYLlhYWC0gIFguLi5YICAtICAgICAgICAgWC4uLlggICAgICAgICAtWC4uLi5YICAgICAgICAgICAtICAgICAgICAgICBYLi4uLlgtICAgIFguLlggICAgICAgICBYICAgICAgICAgICAtICBYLlggIC0gWC4uLi4uWCAtICAgICAgICBYLi4uLi5YICAgICAgICAtWC4uLlggICAgICAgICAgICAtICAgICAgICAgICAgWC4uLlgtICAgIFguLlggICAgICAgICBYWCAgICAgICAgICAtICBYLlggIC1YLi4uLi4uLlgtICAgICAgIFguLi4uLi4uWCAgICAgICAtWC4uWC5YICAgICAgICAgICAtICAgICAgICAgICBYLlguLlgtICAgIFguLlggICAgICAgICBYLlggICAgICAgICAtICBYLlggIC1YWFhYLlhYWFgtICAgICAgIFhYWFguWFhYWCAgICAgICAtWC5YIFguWCAgICAgICAgICAtICAgICAgICAgIFguWCBYLlgtICAgIFguLlhYWCAgICAgICBYLi5YICAgICAgICAtICBYLlggIC0gICBYLlggICAtICAgICAgICAgIFguWCAgICAgICAgICAtWFggICBYLlggICAgICAgICAtICAgICAgICAgWC5YICAgWFgtICAgIFguLlguLlhYWCAgICBYLi4uWCAgICAgICAtICBYLlggIC0gICBYLlggICAtICAgIFhYICAgIFguWCAgICBYWCAgICAtICAgICAgWC5YICAgICAgICAtICAgICAgICBYLlggICAgICAtICAgIFguLlguLlguLlhYICBYLi4uLlggICAgICAtICBYLlggIC0gICBYLlggICAtICAgWC5YICAgIFguWCAgICBYLlggICAtICAgICAgIFguWCAgICAgICAtICAgICAgIFguWCAgICAgICAtICAgIFguLlguLlguLlguWCBYLi4uLi5YICAgICAtICBYLlggIC0gICBYLlggICAtICBYLi5YICAgIFguWCAgICBYLi5YICAtICAgICAgICBYLlggICAgICAtICAgICAgWC5YICAgICAgICAtWFhYIFguLlguLlguLlguLlhYLi4uLi4uWCAgICAtICBYLlggIC0gICBYLlggICAtIFguLi5YWFhYWFguWFhYWFhYLi4uWCAtICAgICAgICAgWC5YICAgWFgtWFggICBYLlggICAgICAgICAtWC4uWFguLi4uLi4uLlguLlhYLi4uLi4uLlggICAtICBYLlggIC0gICBYLlggICAtWC4uLi4uLi4uLi4uLi4uLi4uLi4uLlgtICAgICAgICAgIFguWCBYLlgtWC5YIFguWCAgICAgICAgICAtWC4uLlguLi4uLi4uLi4uLlhYLi4uLi4uLi5YICAtICBYLlggIC0gICBYLlggICAtIFguLi5YWFhYWFguWFhYWFhYLi4uWCAtICAgICAgICAgICBYLlguLlgtWC4uWC5YICAgICAgICAgICAtIFguLi4uLi4uLi4uLi4uLlhYLi4uLi4uLi4uWCAtWFhYLlhYWC0gICBYLlggICAtICBYLi5YICAgIFguWCAgICBYLi5YICAtICAgICAgICAgICAgWC4uLlgtWC4uLlggICAgICAgICAgICAtICBYLi4uLi4uLi4uLi4uLlhYLi4uLi4uLi4uLlgtWC4uLi4uWC0gICBYLlggICAtICAgWC5YICAgIFguWCAgICBYLlggICAtICAgICAgICAgICBYLi4uLlgtWC4uLi5YICAgICAgICAgICAtICBYLi4uLi4uLi4uLi4uLlhYLi4uLi4uWFhYWFgtWFhYWFhYWC0gICBYLlggICAtICAgIFhYICAgIFguWCAgICBYWCAgICAtICAgICAgICAgIFguLi4uLlgtWC4uLi4uWCAgICAgICAgICAtICAgWC4uLi4uLi4uLi4uLlhYLi4uWC4uWCAgICAtLS0tLS0tLS0gICBYLlggICAtICAgICAgICAgIFguWCAgICAgICAgICAtICAgICAgICAgIFhYWFhYWFgtWFhYWFhYWCAgICAgICAgICAtICAgWC4uLi4uLi4uLi4uWCBYLi5YIFguLlggICAtICAgICAgIC1YWFhYLlhYWFgtICAgICAgIFhYWFguWFhYWCAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgIFguLi4uLi4uLi4uWCBYLlggIFguLlggICAtICAgICAgIC1YLi4uLi4uLlgtICAgICAgIFguLi4uLi4uWCAgICAgICAtICAgIFhYICAgICAgICAgICBYWCAgICAtICAgICAgICAgICAtICAgIFguLi4uLi4uLi4uWCBYWCAgICBYLi5YICAtICAgICAgIC0gWC4uLi4uWCAtICAgICAgICBYLi4uLi5YICAgICAgICAtICAgWC5YICAgICAgICAgICBYLlggICAtICAgICAgICAgICAtICAgICBYLi4uLi4uLi5YICAgICAgICBYLi5YICAgICAgICAgIC0gIFguLi5YICAtICAgICAgICAgWC4uLlggICAgICAgICAtICBYLi5YICAgICAgICAgICBYLi5YICAtICAgICAgICAgICAtICAgICBYLi4uLi4uLi5YICAgICAgICAgWFggICAgICAgICAgIC0gICBYLlggICAtICAgICAgICAgIFguWCAgICAgICAgICAtIFguLi5YWFhYWFhYWFhYWFhYLi4uWCAtICAgICAgICAgICAtICAgICBYWFhYWFhYWFhYICAtLS0tLS0tLS0tLS0gICAgICAgIC0gICAgWCAgICAtICAgICAgICAgICBYICAgICAgICAgICAtWC4uLi4uLi4uLi4uLi4uLi4uLi4uLlgtICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0gICAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFguLi5YWFhYWFhYWFhYWFhYLi4uWCAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtICBYLi5YICAgICAgICAgICBYLi5YICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtICAgWC5YICAgICAgICAgICBYLlggICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtICAgIFhYICAgICAgICAgICBYWCAgICAtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAQZCPAQvUsQE3XSkjIyMjIyMjaFYwcXMnLyMjI1spLCMjL2w6JCNRNj4jIzVbbjQyPmMtVEhgLT4+Iy9lPjExTk5WPUJ2KCo6LkY/dXUjKGdSVS5vMFhHSGAkdmhMRzFoeHQ5P1dgIyw1THNDcCMtaT4uciQ8JDZwRD5MYic7OUNyYzZ0Z1htS1ZlVTJjRDRFbzNSLzIqPl1iKE1DOyRqUGZZLjtoXmBJV005PExoMlRsUytmLXMkbzZRPEJXSGBZaVUueGZMcSROOyQwaVIvR1g6VShqY1cycC9XKnE/LXFtblVDSTtqSFNBaUZXTS5SKmtVQEM9R0g/YTl3cDhmJGUuLTReUWcxKVEtR0wobGYoci83R3JSZ3dWJU1TPUMjYDhORD5RbyN0J1gjKHYjWTl3MCMxRCRDSWY7VycjcFdVUFhPdXhYdVUoSDlNKDE8cS1VRTMxI14tVic4SVJVbzdRZi4vTD49S2UkJCc1RiUpXTBeIzBYQFUuYTxyOlFMdEZzTGNMNiMjbE9qKSMuWTU8LVImS2dMd3FKZkxnTiY7UT9nSV4jRFkydUxpQF5yTWw5dD1jV3E2IyN3ZWc+JEZCalZRVFNEZ0VLbklTN0VNOT5aWTl3MCNMOz4+I014JjRNdnQvL0xbTWtBI1dAbEsuTidbMCM3UkxfJiN3K0YlSHRHOU0jWExgTiYuLEdNNFBnOy08bkxFTmh2eD4tVnNNLk0wckpmTEgyZVRNYCpvSk1IUkNgTmtmaW1NMkosVy1qWFM6KXIwd0sjQEZnZSRVPmB3J043RyMkI2ZCIyRFXiQjOjk6aGsrZU9lLS02eClGNypFJT83NiVeR01IZVBXLVo1bCcmR2lGIyQ5NTY6clM/ZEEjZmlLOilZcitgJiMwakAnRGJHJiNeJFBHLkxsK0ROYTxYQ01LRVYqTilMTi9OKmI9JVE2cGlhLVhnOEkkPE1SJixWZEplJDwoN0c7Q2tsJyZoRjs7JDxfPVgoYi5SUyUlKSMjI01QQnV1RTFWOnYmY1gmIzJtIygmY1ZdYGs5T2hMTWJuJXMkRzIsQiRCZkQzWCpzcDUjbCwkUiNdeF9YMXhLWCViNVUqW3I1aU1mVW85VWBOOTloRyl0bSsvVXM5cEcpWFB1YDwwcy0pV1R0KGdDUnhJZyglNnNmaD1rdE1LbjNqKTw2PGI1U2tfLzAoXl1BYU4jKHAvTD4mVlo+MWklaDFTOXU1b0BZYWFXJGUrYjxUV0ZuL1o6T2goQ3gyJGxORW9OXmUpI0NGWUBASTtCT1Eqc1J3WnRaeFJjVTd1VzZDWG93MGkoPyRRW2NqT2RbUDRkKV0+Uk9QT3B4VE83U3R3aTE6OmlCMXEpQ189ZFYyNko7MixdN29wJF11UXJAX1Y3JHFeJWxRd3R1SFldPURYLG4zTCMwUEhETzRmOT5kQ0BPPkhCdUtQcFAqRSxOK2IzTCNscFIvTXJURUguSUFRay5hPkRbLmU7bWMueF1JcC5QSF4nL2FxVU8vJDFXeExvVzBbaUxBPFFUOzVIS0QrQHFRJ05RKDNfUExoRTQ4Ui5xQVBTd1EwL1dLP1osW3g/LUo7alFUV0EwWEBLSihfWThOLTovTTc0Oi8tWnBLclVzcz9kI2RacV1EQWJrVSpKcWtMK253WEBANDdgNT53PTRoKDkuYEdDUlV4SFBlUmA1TWpvbChkVVd4WmEoPlNUclBrckppV3hgNVU3RiMuZypqcm9oR2dgY2c6bFNUdkVZL0VWXzdINFE5W1olY252O0pRWVo1cS5sN1plYXM6SE9JWk9CP0c8TmFsZCRxc11AXUw8SjdiUio+Z3Y6WzdNSTJrKS4nMigkNUZOUCZFUSgsKVVdV10rZmgxOC52c2FpMDApO0QzQDRrdTVQP0RQOGFKdCs7cVVNXT0rYic4QDttVmlCS3gwREVbLWF1R2w4OlBKJkRqK002T0NdT14oKCMjXWAwaSlkclQ7LTdYYD0tSDNbaWdVblBHLU5abG8uI2tAaCM9T3JrJG0+YT4kLT9UbSRVVig/I1A2WVkjJy8jIyN4ZTdxLjczckkzKnBQLyQxPnM5KVcsSnJNN1NOXScvNEMjdiRVYDAjVi5bMD54UXNIJGZFbVBNZ1kydTdLaChHJXNpSWZMU29TK01LMmVUTSQ9NSxNOHBgQS47X1IlI3VbSyMkeDRBRzgua0svSFNCPT0tJ0llL1FUdEc/LS4qXk4tNEIvWk1fM1lsUUM3KHA3cSkmXShgNl9jKSQvKkpMKEwtXihdJHdJTWBkUHRPZEdBLFUzOncyTS0wPHEtXUxfP14pMXZ3Jy4sTVJzcVZyLkw7YU4mIy9FZ0opUEJjWy1mPitXb21YMnU3bHFNMmlFdW1NVGNzRj8tYVQ9Wi05N1VFblhnbEVuMUstYm5FT2BndUZ0KGMlPTtBbV9Rc0BqTG9vSSZOWDtdMCNqNCNGMTQ7Z2w4LUdRcGd3aHJxOCc9bF9mLWI0OSdVT3FrTHU3LSMjb0RZMkwodGUrTWNoJmdMWXRKLE1FdEpmTGgneCdNPSRDUy1aWiVQXThiWj4jUz9ZWSMlUSZxJzNeRncmP0QpVUROcm9jTTNBNzYvL29MPyNoN2dsODVbcVcvTkRPayUxNmlqOys6MWEnaU5JZGItb3U4LlAqdyx2NSNFSSRUV1M+UG90LVIqSCctU0VwQTpnKWYrTyQlJWBrQSNHPThSTW1HMSZPYD50bzhiQ11UJiQsbi5Mb08+MjlzcDNkdC01MlUlVk0jcTcnREhwZysjWjklSFtLPEwlYTJFLWdyV1ZNM0AyPS1rMjJ0TF00JCMjNldlJzhVSkNLRVtkXz0ld0k7JzZYLUdzTFg0al5TZ0okIyNSKncsdlAzd0sjaWlXJiMqaF5EJlI/anA3Ky91JiMoQVAjI1hVOGMkZlNZVy1KOTVfLURwW2c5d2NPJiNNLWgxT2NKbGMtKnZwdzB4VVgmI09RRktOWEBRSSdJb1BwN25iLFFVLy9NUSZaRGtLUClYPFdTVkwoNjh1VmwmI2MnWzAjKHMxWCZ4bSRZJUI3Kks6ZURBMzIzajk5OEdYYkEjcHdNcy1qZ0QkOVFJU0ItQV8oYU40eG9GTV5AQzU4RDArUStxM24wIzNVMUluRGpGNjgyLVNqTVhKSykoaCRoeHVhX0tddWw5MiUnQk9VJiNCUlJoLXNsZzhLRGxyOiVMNzFLYTouQTslWVVMakRQbUw8TFlzOGkjWHdKT1lhS1BLYzFoOic5S2UsZyliKSw3OD1JMzlCO3hpWSRiZ0d3LSYuWmk5SW5YRHVZYSVHKmYyQnE3bW45XiNwMXZ2JSMoV2ktOy9aNWhvOyMyOjslZCYjeDl2NjhDNWc/bnRYMFgpcFRgOyVwQjNxN21nR04pMyUoUDhuVGQ1TDdHZUEtR0xAKyVKM3UyOihZZj5ldGBlOylmI0ttOCYrREMkSTQ2PiNLcl1ddS1bPTk5dHRzMS5xYiNxNzJnMVdKTzgxcStlTicwMydlTT4mMVh4WS1jYUVuT2olMm44KSksP0lMUjVeLklibjwtWC1NcTdbYTgyTHE6RiYjY2UrUzl3c0NLKnhgNTY5RThldydIZV1oOnNJWzJMTSRbZ3VrYTNaUmQ2OnQlSUc6OyQlWWlKOk5xPT9lQXc7LzpubkRxMChDWWNNcEcpcUxONCQjIyZKPGokVXBLPFE0YTFdTXVwV14tc2pfJCVbSEslJ0YjIyMjUVJaSjo6WTNFR2w0J0AlRmtpQU9nI3BbIyNPYGd1a1RmQkhhZ0w8TEh3JXEmT1YwIyNGPTYvOmNoSW0wQGVDUDhYXTprRkklaGw4aGdPQFJjQmhTLUBRYiQlK209aFBETGcqJUs4bG4od2NmMy8nRFctJC5sUj9uW25DSC1lWE9PTlRKbGg6LlJZRiUzJ3A2c3E6VUlNQTk0NSZeSEZTODdAJEVQMmlHPC1sQ08kJWNgdUtHRDNyQyR4MEJMOGFGbi0tYGtlJSNITVAndmgxL1ImT19KOSd1bSwuPHR4W0Ald3NKayZiVVQyYDB1TXY3Z2cjcXAvaWouTDU2J2hsOy5zNUNVcnhqT003LSMjLmwrQXUnQSZPOi1UNzJMXVBgJj07Y3RwJ1hTY1gqclUuPi1YVHQsJU9WVTQpUzErUi0jZGcwL05uP0t1MV4wZiRCKlA6Um93d20tYDBQS2pZRERNJzNdZDM5VlpIRWw0LC5qJ11Qay1NLmheJjowRkFDbSRtYXEtJnNndzB0Ny82KF54dGslTHVIODhGai1la20+R0EjXz41Njh4NihPRlJsLUlacGAmYixfUCckTTxKbnE3OVZzSlcvbVdTKlBVaXE3NjtdL05NXz5oTGJ4ZmMkbWpgLE87JiVXMm1gWmg6LylVZXR3OmFKJV1LOWg6VGNGXXVfLVNqOSxWSzNNLionJjBEW0NhXUo5Z3A4LGtBV10lKD9BJVIkZjwtPlp0cydea249LV5AYzQlLXBZNnFJJUolMUlHeGZMVTlDUDhjYlBsWHYpO0M9YiksPDJtT3ZQOHVwLFVWZjM4MzlhY0FXQVctVz8jYW8vXiMlS1lvOGZSVUxOZDIuPiVtXVVLOm4lciQnc3ddSjs1cEFvT18jMm1PM24sJz1INShldEhnKmArUkxndj49NFU4Z3VEJEklRDpXPi1yNVYqJWoqVzpLdmVqLkxwJDxNLVNHWic6K1Ffayt1dk9TTGlFbyg8YUQvSzxDQ2NgJ0x4Pic/OysrTyc+KClqTFItXnU2OFBIbThaRldlK2VqOGg6OXI2TCowLy9jJmlIJlI4cFJiQSNLam0ldXBWMWc6YV8jVXI3RnVBIyh0UmgjLlk1SytAPzM8LThtMCRQRW47SjpyaDY/STZ1RzwtYHdNVSdpcmNwMExhRV9PdGxNYiYxIzZULiNGREt1IzFMdyV1JStHTStYJ2U/WUxmak1bVk8wTWJ1RnA3Oz5RJiNXSW8pMEBGJXE3YyM0WEFYTi1VJlZCPEhGRipxTCgkL1YsOyhrWFplaldPYDxbNT8/ZXdZKCo5PSV3RGM7LHU8Jzl0M1ctKEgxdGgzK0dddWNRXWtMczdkZigkLypKTF1AKnQ3QnVfRzNfN21wNzxpYVFqT0Aua0xnO3gzQjBscXA3SGYsXlplNy0jI0AvYzU4TW8oMztrbnAwJSlBNz8tVytlSSdvOCliPG5LbncnSG84Qz1ZPnBxQj4waWUmamhaWz9pTFJAQF9BdkEtaVFDKD1rc1JaUlZwN2AuPStOcEJDJXJoJjNdUjo4WERtRTVeVjhPKHg8PGFHLzFOJCNGWCQwVjVZNngnYUVySTNJJDd4JUVgdjwtQlksKSUtP1BzZipsPyVDMy5tTSg9L00wOkp4Ryc/N1doSCVvJ2E8LTgwZzBOQnhvTyhHSDxkTV1uLislcUBqSD9mLlVzSjJHZ3MmNDwtZTQ3JktsK2YvLzlAYGIrPy5UZU5fJkI4U3M/djteVHJrO2YjWXZKa2wmdyRdPi0raz8nKDxTOjY4dHEqV29EZlp1JzttTT84WFttYThXJSpgLT07RC4obmM3LzspZzpUMT1eSiQmQlJWKC1sVG1OQjZ4cUJbQDAqby5lck0qPFNXRl11Mj1zdC0qKDZ2Pl5dKEguYVJFWlNpLCMxOltJWGFaRk9tPC11aSNxVXEyJCMjUmk7dTc1T0sjKFJ0YVctSy1GYFMrY0ZddU5gLUtNUSVyUC9YcmkuTFJjQiMjPVlMM0JnTS8zTUQ/QGYmMSdCVy0pSnU8TDI1Z2w4dWhWbTFoTCQjIyo4IyMjJ0EzL0xrS1crKF5yV1g/NVdfOGcpYShtJks4UD4jYm1tV0NNa2smI1RSYEMsNWQ+ZylGO3QsNDpAX2w4Ry81aDR2VWQlJiU5NTA6VlhEJ1FkV29ZLUYkQnRVd21mZSRZcUwnOChQV1goUD9eQFBvMyQjI2BNU3M/RFdCWi9TPis0JT5mWCxWV3YvdydLRGBMUDVJYkg7clRWPm4zY0VLOFUjYlhdbC0vVitebGozO3ZsTWImWzVZUTgjcGVrWDlKUDNYVUM3MkwsLD8rTmkmY283QXBuTyo1TkssKChXLWk6JCxrcCdVREFPKEcwU3E3TVZqSnNiSXUpJ1osKls+YnI1ZlheOkZQQVdyLW0yS2dMPExVTjA5OGtURiYjbHZvNTg9L3ZqRG87LjspS2EqaExSIy9rPXJLYnh1VmA+UV9uTjYnOHVURyYjMVQ1Zyl1THY6ODczVXBUTGdIKyNGZ3BIJ19vMTc4MFBoOEtteFFKOCNINzJMNEA3NjhAVG0mUWg0Q0IvNU92bUEmLFEmUWJVb2kkYV8lM00wMUgpNHg3SV4mS1FWZ3RGblYrO1tQYz5bbTRrLy8sXTE/I2BWWVtKciozJiZzbFJmTGlWWko6XT89SzNTdz1bJD11UkI/M3hrNDhAYWVnPFonPCQjNEgpNiw+ZTBqVDYnTiMocSUuTz0/MlNddSoobTwtVjhKJygxKUddWzY4aFckNSdxW0dDJjVqYFRFP20nZXNGR05STSlqLGZmWj8tcXg4Oy0+ZzR0KjpDSVAvW1FhcDcvOScjKDFzYW83dy0ucU5VZGtKKXRDRiYjQl47eEd2bjJyOUZFUEZGRmNMQC5pRk5rVHZlJG0lI1F2UVM4VUApMlorM0s6QUtNNWlzWjg4K2RLUSlXNj5KJUNMPEtFPmAuZCooQmAtbjhEOW9LPFVwXWMkWCQoLClNOFp0Ny9bcmRrcVRnbC0wY3VHTXYnPz4tWFYxcVsnLTVrJ2NBWjY5ZTtEXz8kWlBQJnNeKzddKSQqJCNAUVlpOSw1UCYjOXIrJCVDRT02OD5LOHIwPWRTQyUlKEBwNy5tN2ppbFEwMicwLVZXQWc8YS8nJzN1Lj00TCRZKTZrL0s6X1szPSZqdkw8TDBDLzIndjpeOy1ESUJXLEI0RTY4OmtaOyU/OChROEJIPWtPNjVCVz94U0cmI0B1VSxEUyosPy4rKG8oIzF2Q1M4I0NIRj5UbEdXJ2IpVHE3VlQ5cV4qXiQkLjomTkBAJCYpV0h0UG0qNV9yTzAmZSVLJiMtMzBqKEU0IydaYi5vLyhUcG0kPksnZkBbUHZGbCxoZklOVE5VNnUnMHBhbzclWFVwOV01Lj4laGA4Xz1WWWJ4dWVsLk5UU3NKZkxhY0Z1M0InbFFTdS9tNi1PcWVtOFQrb0UtLSQwYS9rXXVqOUV3c0c+JXZlUipodl5CRnBRajpLJyNTSixzQi0nI10oai5MZzkyclR3LSpuJUAvOzM5cnJKRixsI3FWJU9ydEJlQzYvLDtxQjNlYk5XWz8sSHFqMkwuMU5QJkdqVVI9MUQ4UWFTM1VwJkAqOXdQPytsbzdiP0AlJ2s0YHAwWiQyMiVLMytpQ1pqP1hKTjRObSYrWUZddUAtVyRVJVZFUS8sLD4+IylEPGgjYCloMDo8UTY5MDl1YSsmVlUlbjI6Y0czRkotJUBCai1EZ0xyYEh3JkhBS2pLanNlSzwveEtUKilCLE45WDNda3JjMTJ0J3BnVFYoTHYtdExbeGdfJT1NX3E3YV54PzdVYmQ+IyU4Y1kjWVo/PSxgV2R4dS9hZSYjdzYpUjg5dEkjNkBzJyg2QmY3YSY/Uz1eWklfa1MmYWlgJj10RTcyTF9ELDteUik3WyRzPEVoI2MmKXEuTVhJJSN2OVJPYTVGWk8lc0Y3cTdOd2ImI3B0VUo6YXFKZSRTbDY4JS5EIyMjRUM+PD8tYUYmI1JOUXY+bzhsS04lNS8kKHZkZnE3K2ViQSN1MXBdb3ZVS1cmWSVxXSc+JDFALVt4Zm4kN1pUcDdtTSxHLEtvN2EmR3UlR1tSTXhKc1swTU0ld2NpLkxGREspKDxjYFE4TilqRUlGKis/UDJhOGclKSRxXW8yYUg4QyY8U2liQy9xLChlOnY7LWIjNlskTnREWjg0SmUyS052QiMkUDU/dFEzbnQoMGQ9ai5MUWYuL0xsMzMrKDtxM0wtdz04ZFgkI1dGJnVJSkAtYmZJPiU6X2kyQjVDc1I4JjlaJiM9bVBFbm0wZmA8JmMpUUw1dUojJXUlbEpqK0QtcjtCb0YmIzREb1M5N2g1ZylFI286JlM0d2VERiw5XkhvZWBoKkwrX2EqTnJMVy0xcEdfJjJVZEI4NmUlQi86PT4pTjR4ZVcuKndmdC07JCc1OC1FU3FyPGI/VUkoXyVAW1A0Nj4jVWAnNkFRXW0mNi9gWj4jUz9ZWSNWYztyN1UyJjMyNmQ9dyZIIyMjIz9UWmAqND8mLk1LP0xQOFZ4Zz4kW1FYYyVRSnY5Mi4oRGIqQilnYipCTTlkTSpoSk1BbypjJiNiMHY9UGplcl0kZ0cmSlhEZi0+J1N0dlU3NTA1bDkkQUZ2Z1lSSV4mPF5iNjg/aiNxOVFYNFNNJ1JPIyZzTDFJTS5ySmZMVUFqMjIxXWQjI0RXPW04M3U1OydiWXgsKlNsMGhMKFc7OyRkb0ImTy9UUTooWl54QmRMakw8TG5pOycnWC5gJCM4KzFHRDprJFlVV3NibjhvZ2g2cnhaMlo5XSVuZCs+ViMqOFVfNzJMaCsyUThDajBpOjZocCYkQy86cChISz5UOFlbZ0hRNGA0KSckQWIoTm9mJVYnOGhMJiM8TkVkdGcobic9UzFBKFExL0kmNChbJWRNYCxJdScxOl9oTD5TZkQwNyY2RDxmcDhkSE03L2crdGxQTjlKKnJLYVBjdCY/J3VCQ2VtXmpuJTlfSyk8LEM1SzNzPTVnJkdtSmIqW1NZcTdLO1RSTEdDc00tJCQ7UyU6WUByN0FLMHBwcnBMPExyaCxxN2UvJUtXSzo1MEleK20ndmlgMz8lWnArPC1kKyRMLVN2OkAubzE5biRzMCYzOTtrbjtTJUJTcSokM1dvSlNDTHdlVlthWidNUUlqTzw3O1gtWDsmK2RNTHZ1I15Vc0dFQzlXRWNbWCh3STcjMi4oRjBqViplWmY8LVF2M0otYytKNUFsckIjJHAoSDY4THZFQSdxM24wI20sW2AqOEZ0KUZjWWdFdWRdQ1dmbTY4LChhTEEkQEVGVGdMWG9CcS9VUGxwNzpkWy87cl9peD06VEZgUzVILWI8TEkmSFkoSz1oIyldTGskSzE0bFZmbTp4JEg8M15RbDxNYCRPaGFwQm5rdXAnRCNMJFBiX2BOKmddMmU7WC9EdGcsYnNqJksjMlstOmlZcidfd2dIKU5VSVI4YTFuI1M/WWVqJ2g4XjU4VWJaZCteRktEKlRAOzZBN2FRQ1tLOGQtKHY2R0kkeDpUPCYnR3A1VWY+QE0uKko6OyQtcnYyOSdNXThxTXYtdExwLCc4ODZpYUM9SGIqWUpvS0osKGolSz1IYEsudjlIZ2dxQklpWnUnUXZCVC4jPSkwdWtydVYmLikzPSheMWBvKlBqNDwtPGFOKCheNygnI1owd0sjNUdYQDd1XVtgKlNeNDM5MzNBNHJsXVtgKk80Q2dMRWxddiQxUTNBZUYzN2RiWGssLil2aiN4J2RgO3FnYlFSJUZXLDIoP0xPPXMlU2M2OCVOUCcjI0FvdGw4eD1CRSNqMVVEKFszJE0oXVVJMkxYM1JwS05AOy8jZidmLyZfbXQmRilYZEY8OXQ0KVFhLiprVEx3UScoVFRCOS54SCc+I01KK2dMcTktIyNASHVaUE4wXXU6aDcuVC4uRzo7JC9Vc2ooVDdgUTh0VDcyTG5ZbDwtcXg4Oy1IVjdRLSZYZHglMWEsaEM9MHUrSGxzVj5udUlRTC01PE4/KU5CUylRTipfSSw/JikyJ0lNJUwzSSlYKChlL2RsMiY4JzxNOl4jTSpRK1tULlhyaS5MWVMzdiVmRmA2OGg7Yi1YWy9FbidDUi5xN0UpcCcva2xlMkhNLHU7XiVPS0MtTitMbCVGOUNGPE5mJ14jdDJMLDsyN1c6ME9ANiMjVTZXNzokckpmTFdIaiQjKXdvcUJlZklaLlBLPGIqdDdlZDtwKl9tOzRFeEsjaEAmXT5fPkBrWFF0TWFjZkQubS1WQWI4O0lSZU0zJHdmMCcnaHJhKnNvNTY4J0lwJnZSczg0OSdNUllTcCU6dDpoNXFTZ3dwRXIkQj5RLDtzKEMjJClgc3ZRdUYkIyMtRCwjIyxnNjhAMltUOy5YU2ROOVFlKXJwdC5fSy0jNXdGKXNQJyMjcCNDMGMlLUdiJWhkKzwtaidBaSp4JiZITWtUXUMnT1NsIyM1UkdbSlhhSE47ZCd1QSN4Ll9VOy5gUFVAKFozZHQ0cjE1MkA6diwnUi5Taid3IzA8LTtrUEkpRmZKJiNBWUomIy8vKT4taz1tPSpYbkskPj0pNzJMXTBJJT4uRzY5MGE6JCMjPCwpOz87NzIjP3g5K2Q7XlYnOTtqWUA7KWJyI3FeWVFweDpYI1RlJFpeJz0tPWJHaExmOkQ2JmJOd1o5LVpEI25eOUhoTE1yNUc7J11kJjYnd1ltVEZtTDxMRClGXiVbdEMnODsrOUUjQyRnJSM1WT5xOXdJPlAoOW1JWz5rQy1la0xDL1ImQ0grcydCO0stTTYkRUIlaXMwMDorQTRbN3hrcy5Mck5rMCZFKXdJTFlGQDJMJzBOYiQrcHY8KDIuNzY4L0ZyWSZoJF4zaSZAK0clSlQnPC0sdmAzO18pSTlNXkFFXUNOP0NsMkFaZyslNGlUcFQzPG4tJiVIJWI8RkRqMk08aEg9JkVoPDJMZW4kYiphVFg9LThReE4pazExSU0xY15qJTlzPEw8TkZTbylCPys8LShHeHNGLF4tRWhAJDRkWGhOJCsjcnhLOCdqZSdEN2tgZTspMnBZd1BBJ19wOSZAXjE4bWwxXltAZzR0KltKT2EqWz1RcDcocUpfb09MXignN2ZCJkhxLTpzZixzTmo4eHFePiRVNE9dR0t4J205KWJAcDdZc3ZLM3deWVItQ2RRKjpJcjwoJHUmKSMoJj9MOVJnM0gpNGZpRXBeaUk5TzhLblRqLF1IP0QqcjcnTTtQd1o5SzBFXmsmLWNwSTsucC82X3Z3b0ZNVjwtPiMlWGkuTHhWbnJVKDQmOC9QKzpoTFNLaiQjVSVdNDl0J0k6cmdNaSdGTEBhOjBZLXVBWzM5JywodmJtYSpoVSU8LVNSRmBUdDo1NDJSX1ZWJHBAW3A4RFZbQSw/MTgzOUZXZEY8VGRkRjw5QWgtNiY5dFdvRGxoXSYxU3BHTXE+VGkxTypIJiMoQUw4W19QJS5NPnZeLSkpcU9UKkY1Q3EwYFllJSskQjZpOjdAMElYPE4rVCswTWxNQlBRKlZqPlNzRDxVNEpIWThrRDIpMmZVL00jJGUuKVQ0LF89OGhMaW1bJik7P1VrSycteD8nKDpzaUlmTDwkcEZNYGk8PyVXKG1HREhNJT5pV1AsIyNQYCUvTDxlWGk6QFo5Qy43bz1AKHBYZEFPL05MUThsUGwrSFBPUWE4d0Q4PV5HbFBhOFRLSTFDamhzQ1RTTEpNJy9XbD4tUyhxdyVzZi9AJSNCNjsvVTdLXXVaYmleT2NeMm48YmhQbVVrTXc+JXQ8KSdtRVZFJyduYFduSnJhJF5US3ZYNUI+O19hU0VLJywoaHdhMDppNEc/LkJjaS4oWFs/YiooJCw9LW48LlElYChYPT8rQEFtKkpzMCY9M2JoOEtdbUw8TG9Ocyc2LCc4NWAwP3QvJ19VNTlAXWRkRjwjTGRGPGVXZEY8T3VOLzQ1clk8LUxAJiMrZm0+Njk9TGIsT2NaVi8pO1RUbThWSTs/JU90SjwoYjRtcTdNNjp1P0tSZEY8Z1JAMkw9Rk5VLTxiWyg5Yy9NTDNtO1pbJG9GM2cpR0FXcXBBUmM9PFJPdTdjTDVsOy1bQV0lLytmc2Q7bCNTYWZUL2YqV10wPU8nJChUYjxbKSpAZTc3NVItOllvYiVnKj5sKjp4UD9ZYi41KSV3X0k/N3VrNUpDK0ZTKG0jaSdrLidhMGkpOTw3Yidmcyc1OWhxJCo1VWh2IyNwaV44K2hJRUJGYG52b2A7J2wwLl5TMTwtd1VLMi9Db2g1OEtLaExqTT1TTypyZk9gK3FDYFctT24uPUFKNTY+PmkyQDJMSDZBOiY1cWA/OUkzQEAnMDQmcDIvTFZhKlQtNDwtaTM7TTlVdlpkK043PmIqZUl3ZzpDQyljPD5uTyYjPElHZTtfXy50aGpabDwldyhXazJ4bXA0UUBJI0k5LERGXXU3LVA9Li1fOllKXWFTQFY/NipDKClkT3A3OldMLGImM1JnLy5jbU05JnJePiQoPi5aLUkmSihRMEhkNVElN0NvLWJgLWM8Tig2ckBpcCtBdXJLPG04NlFJdGgqI3Y7LU9CcWkrTDd3REUtSXI4S1snbStERFNMd0smLy4/LVYlVV8lMzpxS051JF9iKkIta3A3TmFEJ1FkV1FQS1lxW0A+UCloSTsqX0ZddWBSYlsuajhfUS88Jj51dStWc0gkc005VEElPykodm1KODApLFA3RT4pdGpEJTJMPS10I2ZLWyVgdj1RODxGZk5rZ2deb0liYWgqIzgvUXQkRiY6SyotKE4vJysxdk1CLHUoKS1hLlZVVSojW2UlZ0FBTyhTPldsQTIpO1NhPmdYbThZQmAxZEBLI25dNzYtYSRVLG1GPGZYXWlkcWQpPDMsXUo3Sm1XNGA2XXVrcz00LTcyTChqRWsrOmJKME1ecS04RG1fWj8wb2xQMUM5U2EmSFtkJmMkb29RVWpdRXhkKjNaTUAtV0dXMiVzJyxCLV9NJT4lVWw6Iy8neG9GTTlRWC0kLlFOJz5bJSRaJHVGNnBBNktpMk81Ojh3KnZQMTwtMWBbRywpLW0jPjBgUCYjZWIjLjNpKXJ0QjYxKG8nJD9YM0I8L1I5MDtlWl0lTmNxOy1UbF0jRj4yUWZ0XmFlXzV0S0w5TVVlOWIqc0xFUTk1QyZgPUc/QE1qPXdoKiczRT49LTwpR3QqSXcpJ1FHOmBASXdPZjcmXTFpJ1MwMUIrRXYvTmFjIzlTOz07WVFwZ182VWAqa1ZZMzl4SyxbLzZBajc6JzFCbS1fMUVZZmExK28mbzRocDdLTl9RKE9sSW9AUyU7alZkbjAnMTxWYzUyPXVgM15vLW4xJ2c0djU4SGomNl90NyQjIz9NKWM8JGJnUV8nU1koKC14a0EjWSgscCdIOXJJVlktYiwnJWJDUEY3Lko8VXBeLChkVTFWWSo1I1drVFU+aDE5dyxXUWhMSSkzUyNmJDIoZWIsanIqYjszVnddKjdOSCUkYzRWcyxlRDk+WFc4P05dbysoKnBnQyUvNzJMVi11PEhwLDNAZV45VUIxSithazktVE4vbWhLUGcrQUpZZCRNbHZBRl9qQ0sqLk8tXig2M2FkTVQtPlclaWV3UzhXNm0ycnRDcG8nUlMxUjg0PUBwYVRLdCk+PSUmMVspKnZwJ3UreCxWcndOOyZda3VPOUpEYmc9cE8kSioualZlO3UnbTBkcjlsLDwqd01LKk9lPWc4bFZfS0VCRmtPJ29VXV49Wy03OTIjb2ssKWldbFI4cVEyb0E4d2NSQ1peN3cvTmpoOz8uc3RYP1ExPlMxcTRCbiQpSzE8LXJHZE8nJFdyLkxjLkNHKSQvKkpMNHROUi8sU1ZPMyxhVXcnREpOOilTczt3R245QTMyaWp3JUZMK1owRm4uVTk7cmVTcSlibUkzMlU9PTVBTHVHJiNWZjEzOTgvcFZvMSpjLShhWTE2OG88YEpzU2JrLSwxTjskPjA6T1VhcygzOjhaOTcyTFNmRjhlYj1jLTs+U1B3Ny42aG4zbWA5XlhrbihyLnFTWzA7VCUmUWM9K1NUUnhYJ3ExQk5rMyYqZXUyOyY4cSQmeD5RI1E3XlRmKzY8KGQlWlZtajJiRGklLjNMMm4rNFcnJFBpRERHKWcsciUrPywkQD91b3U1dFNlMmFOX0FRVSo8aGBlLUdJNyk/T0syQS5kN19jKT93UTVBU0BETDNyIzdmU2tnbDYtKytEOidBLHVxN1N2bEIkcGNwSCdxM24wI18lZFkjeENwci1sPEYwTlJALSMjRkVWNk5URjYjIyRsODROMXc/QU8+J0lBT1VSUSMjVl5Gdi1YRmJHTTdGbChOPDNEaExHRiVxLjFyQyQjOlRfXyZQaTY4JTB4aV8mW3FGSig3N2pfJkpXb0YuVjczNSZULFtSKjp4RlIqSzU+PiNgYlctPzROZV8mNk5lXyY2TmVfJm5ga3ItI0dKY002WDt1TTZYO3VNKC5hLi5eMlRrTCVvUigjO3UuVCVmQXIlNHRKOCY+PDE9R0haXyttOS8jSDFGXlIjU0MjKk49QkE5KEQ/dltVaUZZPj5eOHAsS0tGLlddTDI5dUxrTGx1Lys0VDxYb0lCJmh4PVQxUGNEYUImO0hIKy1BRnI/KG05SFpWKUZLUzhKQ3c7U0Q9NlteL0RaVUxgRVVEZl1HR2xHJj53JClGLi9ebjMrcmxvK0RCOzVzSVlHTmsraTF0LTY5SmctLTBwYW83U20jSylwZEhXJjtMdUROSEBIPiMvWC1USSg7UD4jLEdjPiMwU3U+IzRgMT8jOGxDPyM8eFU/I0AuaT8jRDolQCNIRjdAI0xSSUAjUF9bQCNUa25AI1h3KkEjXS09QSNhOU9BI2Q8RiYjKjtHIyMuR1kjIzJTbCMjNmAoJCM6bDokIz54TCQjQi5gJCNGOnIkI0pGLiUjTlJAJSNSX1IlI1ZrZSUjWnd3JSNfLTQmIzNeUmglU2Zsci1rJ01TLm8/LjUvc1dlbC93cEVNMCUzJy8xKUteZjEtZD5HMjEmdigzNT5WYDM5VjdBND1vbng0QTFPWTVFSTA7NkliZ3I2TSRIUzdRPCk1OEM1dyw7V29BKiNbJVQqI2AxZyojZD0jKyNoSTUrI2xVRysjcGJZKyN0bmwrI3gkKSwjJjE7LCMqPU0sIy5JYCwjMlVyLCM2Yi4tIzt3W0gjaVF0QSNtXjBCI3FqQkIjdXZUQiMjLWhCIyc5JEMjK0U2QyMvUUhDIzNeWkMjN2ptQyM7dilEIz8sPEQjQzhORCNHRGFEI0tQc0QjT10vRSNnMUE1I0tBKjEjZ0MxNyNNR2Q7IzgoMDIjTC1kMyNyV000I0hnYTEjLDx3MCNULmo8I08jJzIjQ1lOMSNxYV46I180bTMjb0AvPSNlRzg9I3Q4SjUjYCs3OCM0dUktI20zQjIjU0JbOCNRMEA4I2lbKjkjaU9uOCMxTm07I15zTjkjcWg8OSM6PXgtI1A7SzIjJCVYOSNiQysuI1JnOzwjbU49LiNNVEYuI1JaTy4jMj8pNCNZIygvI1spMS8jYjtMLyNkQVUvIzBTdjsjbFkkMCNuYC0wI3NmNjAjKEYyNCN3ckgwIyUvZTAjVG1EPCMlSlNNRm92ZTpDVEJFWEk6PGVoMmcpQiwzaDJeRzNpOyNkM2pEPik0a01ZRDRsVnVgNG1gOiY1bmlVQTVAKEE1QkExXVBCQjp4bEJDQz0yQ0RMWE1DRVV0aUNmJjBnMid0Tj9QR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1AtcWVrQ2Au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Y2tEYXRhAFBvcwBDdXJyZW50U2l6ZQBEZXNpcmVkU2l6ZQBJbUd1aUxpc3RDbGlwcGVyAFN0YXJ0UG9zWQBJdGVtc0hlaWdodABJdGVtc0NvdW50AFN0ZXBObwBEaXNwbGF5U3RhcnQARGlzcGxheUVuZABTdGVwAEJlZ2luAEVuZABJbURyYXdDbWQARWxlbUNvdW50AENsaXBSZWN0AFRleHR1cmVJZABWdHhPZmZzZXQASWR4T2Zmc2V0AEltRHJhd0xpc3QASXRlcmF0ZURyYXdDbWRzAElkeEJ1ZmZlcgBWdHhCdWZmZXIAUHVzaENsaXBSZWN0AFB1c2hDbGlwUmVjdEZ1bGxTY3JlZW4AUG9wQ2xpcFJlY3QAUHVzaFRleHR1cmVJRABQb3BUZXh0dXJlSUQAR2V0Q2xpcFJlY3RNaW4AR2V0Q2xpcFJlY3RNYXgAQWRkTGluZQBBZGRSZWN0AEFkZFJlY3RGaWxsZWQAQWRkUmVjdEZpbGxlZE11bHRpQ29sb3IAQWRkUXVhZABBZGRRdWFkRmlsbGVkAEFkZFRyaWFuZ2xlAEFkZFRyaWFuZ2xlRmlsbGVkAEFkZENpcmNsZQBBZGRDaXJjbGVGaWxsZWQAQWRkVGV4dF9BAEFkZFRleHRfQgBBZGRJbWFnZQBBZGRJbWFnZVF1YWQAQWRkSW1hZ2VSb3VuZGVkAEFkZFBvbHlsaW5lAEFkZENvbnZleFBvbHlGaWxsZWQAQWRkQmV6aWVyQ3VydmUAUGF0aENsZWFyAFBhdGhMaW5lVG8AUGF0aExpbmVUb01lcmdlRHVwbGljYXRlAFBhdGhGaWxsQ29udmV4AFBhdGhTdHJva2UAUGF0aEFyY1RvAFBhdGhBcmNUb0Zhc3QAUGF0aEJlemllckN1cnZlVG8AUGF0aFJlY3QAQ2hhbm5lbHNTcGxpdABDaGFubmVsc01lcmdlAENoYW5uZWxzU2V0Q3VycmVudABBZGRDYWxsYmFjawBBZGREcmF3Q21kAENsZWFyAENsZWFyRnJlZU1lbW9yeQBQcmltUmVzZXJ2ZQBQcmltUmVjdABQcmltUmVjdFVWAFByaW1RdWFkVVYAUHJpbVdyaXRlVnR4AFByaW1Xcml0ZUlkeABQcmltVnR4AFVwZGF0ZUNsaXBSZWN0AFVwZGF0ZVRleHR1cmVJRABJbURyYXdEYXRhAEl0ZXJhdGVEcmF3TGlzdHMAVmFsaWQAQ21kTGlzdHNDb3VudABUb3RhbElkeENvdW50AFRvdGFsVnR4Q291bnQARGlzcGxheVBvcwBEaXNwbGF5U2l6ZQBGcmFtZWJ1ZmZlclNjYWxlAERlSW5kZXhBbGxCdWZmZXJzAFNjYWxlQ2xpcFJlY3RzAEltRm9udEdseXBoAENvZGVwb2ludABBZHZhbmNlWABYMABZMABYMQBZMQBVMABWMABVMQBWMQBJbUZvbnRDb25maWcARm9udERhdGEARm9udERhdGFPd25lZEJ5QXRsYXMARm9udE5vAFNpemVQaXhlbHMAT3ZlcnNhbXBsZUgAT3ZlcnNhbXBsZVYAUGl4ZWxTbmFwSABHbHlwaEV4dHJhU3BhY2luZwBHbHlwaE9mZnNldABHbHlwaFJhbmdlcwBHbHlwaE1pbkFkdmFuY2VYAEdseXBoTWF4QWR2YW5jZVgATWVyZ2VNb2RlAFJhc3Rlcml6ZXJGbGFncwBSYXN0ZXJpemVyTXVsdGlwbHkATmFtZQBEc3RGb250AEltRm9udABGb250U2l6ZQBTY2FsZQBEaXNwbGF5T2Zmc2V0AEl0ZXJhdGVHbHlwaHMARmFsbGJhY2tHbHlwaABGYWxsYmFja0FkdmFuY2VYAEZhbGxiYWNrQ2hhcgBDb25maWdEYXRhQ291bnQASXRlcmF0ZUNvbmZpZ0RhdGEAQXNjZW50AERlc2NlbnQATWV0cmljc1RvdGFsU3VyZmFjZQBDbGVhck91dHB1dERhdGEAQnVpbGRMb29rdXBUYWJsZQBGaW5kR2x5cGgARmluZEdseXBoTm9GYWxsYmFjawBTZXRGYWxsYmFja0NoYXIAR2V0Q2hhckFkdmFuY2UASXNMb2FkZWQAR2V0RGVidWdOYW1lAENhbGNUZXh0U2l6ZUEAQ2FsY1dvcmRXcmFwUG9zaXRpb25BAFJlbmRlckNoYXIAYnVmZmVyAGJ5dGVPZmZzZXQAYnl0ZUxlbmd0aABUT0RPOiBGb250RGF0YSAlenUgJXp1CgBJbUZvbnRBdGxhcwBBZGRGb250RGVmYXVsdABBZGRGb250RnJvbU1lbW9yeVRURgBDbGVhclRleERhdGEAQ2xlYXJJbnB1dERhdGEAQ2xlYXJGb250cwBCdWlsZABJc0J1aWx0AEdldFRleERhdGFBc0FscGhhOABHZXRUZXhEYXRhQXNSR0JBMzIAR2V0R2x5cGhSYW5nZXNEZWZhdWx0AEdldEdseXBoUmFuZ2VzS29yZWFuAEdldEdseXBoUmFuZ2VzSmFwYW5lc2UAR2V0R2x5cGhSYW5nZXNDaGluZXNlRnVsbABHZXRHbHlwaFJhbmdlc0NoaW5lc2VTaW1wbGlmaWVkQ29tbW9uAEdldEdseXBoUmFuZ2VzQ3lyaWxsaWMAR2V0R2x5cGhSYW5nZXNUaGFpAEdldEdseXBoUmFuZ2VzVmlldG5hbWVzZQBMb2NrZWQAVGV4SUQAVGV4RGVzaXJlZFdpZHRoAFRleEdseXBoUGFkZGluZwBUZXhXaWR0aABUZXhIZWlnaHQAVGV4VXZTY2FsZQBUZXhVdldoaXRlUGl4ZWwASXRlcmF0ZUZvbnRzAEltR3VpSU8AQ29uZmlnRmxhZ3MAQmFja2VuZEZsYWdzAERlbHRhVGltZQBJbmlTYXZpbmdSYXRlAEluaUZpbGVuYW1lAExvZ0ZpbGVuYW1lAE1vdXNlRG91YmxlQ2xpY2tUaW1lAE1vdXNlRG91YmxlQ2xpY2tNYXhEaXN0AE1vdXNlRHJhZ1RocmVzaG9sZABfZ2V0QXRfS2V5TWFwAF9zZXRBdF9LZXlNYXAAS2V5UmVwZWF0RGVsYXkAS2V5UmVwZWF0UmF0ZQBVc2VyRGF0YQBGb250cwBGb250R2xvYmFsU2NhbGUARm9udEFsbG93VXNlclNjYWxpbmcARm9udERlZmF1bHQARGlzcGxheUZyYW1lYnVmZmVyU2NhbGUATW91c2VEcmF3Q3Vyc29yAENvbmZpZ01hY09TWEJlaGF2aW9ycwBDb25maWdJbnB1dFRleHRDdXJzb3JCbGluawBDb25maWdXaW5kb3dzUmVzaXplRnJvbUVkZ2VzAENvbmZpZ1dpbmRvd3NNb3ZlRnJvbVRpdGxlQmFyT25seQBCYWNrZW5kUGxhdGZvcm1OYW1lAEJhY2tlbmRSZW5kZXJlck5hbWUAQmFja2VuZFBsYXRmb3JtVXNlckRhdGEAQmFja2VuZFJlbmRlcmVyVXNlckRhdGEAQmFja2VuZExhbmd1YWdlVXNlckRhdGEAR2V0Q2xpcGJvYXJkVGV4dEZuAFNldENsaXBib2FyZFRleHRGbgBDbGlwYm9hcmRVc2VyRGF0YQBNb3VzZVBvcwBfZ2V0QXRfTW91c2VEb3duAF9zZXRBdF9Nb3VzZURvd24ATW91c2VXaGVlbABLZXlDdHJsAEtleVNoaWZ0AEtleUFsdABLZXlTdXBlcgBfZ2V0QXRfS2V5c0Rvd24AX3NldEF0X0tleXNEb3duAF9nZXRBdF9OYXZJbnB1dHMAX3NldEF0X05hdklucHV0cwBBZGRJbnB1dENoYXJhY3RlcgBBZGRJbnB1dENoYXJhY3RlcnNVVEY4AENsZWFySW5wdXRDaGFyYWN0ZXJzAFdhbnRDYXB0dXJlTW91c2UAV2FudENhcHR1cmVLZXlib2FyZABXYW50VGV4dElucHV0AFdhbnRTZXRNb3VzZVBvcwBXYW50U2F2ZUluaVNldHRpbmdzAE5hdkFjdGl2ZQBOYXZWaXNpYmxlAEZyYW1lcmF0ZQBNZXRyaWNzUmVuZGVyVmVydGljZXMATWV0cmljc1JlbmRlckluZGljZXMATWV0cmljc1JlbmRlcldpbmRvd3MATWV0cmljc0FjdGl2ZVdpbmRvd3MATWV0cmljc0FjdGl2ZUFsbG9jYXRpb25zAE1vdXNlRGVsdGEAX2dldEF0X01vdXNlQ2xpY2tlZFBvcwBfZ2V0QXRfTW91c2VEb3duRHVyYXRpb24AX2dldEF0X0tleXNEb3duRHVyYXRpb24AX2dldEF0X05hdklucHV0c0Rvd25EdXJhdGlvbgBJbUd1aVN0eWxlAEFscGhhAFdpbmRvd1BhZGRpbmcAV2luZG93Um91bmRpbmcAV2luZG93Qm9yZGVyU2l6ZQBXaW5kb3dNaW5TaXplAFdpbmRvd1RpdGxlQWxpZ24AV2luZG93TWVudUJ1dHRvblBvc2l0aW9uAENoaWxkUm91bmRpbmcAQ2hpbGRCb3JkZXJTaXplAFBvcHVwUm91bmRpbmcAUG9wdXBCb3JkZXJTaXplAEZyYW1lUGFkZGluZwBGcmFtZVJvdW5kaW5nAEZyYW1lQm9yZGVyU2l6ZQBJdGVtU3BhY2luZwBJdGVtSW5uZXJTcGFjaW5nAFRvdWNoRXh0cmFQYWRkaW5nAEluZGVudFNwYWNpbmcAQ29sdW1uc01pblNwYWNpbmcAU2Nyb2xsYmFyU2l6ZQBTY3JvbGxiYXJSb3VuZGluZwBHcmFiTWluU2l6ZQBHcmFiUm91bmRpbmcAVGFiUm91bmRpbmcAVGFiQm9yZGVyU2l6ZQBCdXR0b25UZXh0QWxpZ24AU2VsZWN0YWJsZVRleHRBbGlnbgBEaXNwbGF5V2luZG93UGFkZGluZwBEaXNwbGF5U2FmZUFyZWFQYWRkaW5nAE1vdXNlQ3Vyc29yU2NhbGUAQW50aUFsaWFzZWRMaW5lcwBBbnRpQWxpYXNlZEZpbGwAQ3VydmVUZXNzZWxsYXRpb25Ub2wAX2dldEF0X0NvbG9ycwBfc2V0QXRfQ29sb3JzAFNjYWxlQWxsU2l6ZXMASU1HVUlfVkVSU0lPTgAxLjcxAElNR1VJX0NIRUNLVkVSU0lPTgBJbUd1aUlPU2l6ZQBJbUd1aVN0eWxlU2l6ZQBJbVZlYzJTaXplAEltVmVjNFNpemUASW1EcmF3VmVydFNpemUASW1EcmF3SWR4U2l6ZQBJbURyYXdWZXJ0UG9zT2Zmc2V0AEltRHJhd1ZlcnRVVk9mZnNldABJbURyYXdWZXJ0Q29sT2Zmc2V0AENyZWF0ZUNvbnRleHQARGVzdHJveUNvbnRleHQAR2V0Q3VycmVudENvbnRleHQAU2V0Q3VycmVudENvbnRleHQARGVidWdDaGVja1ZlcnNpb25BbmREYXRhTGF5b3V0AEdldElPAEdldFN0eWxlAEdldERyYXdEYXRhAE5ld0ZyYW1lAFJlbmRlcgBFbmRGcmFtZQBTaG93RGVtb1dpbmRvdwBTaG93QWJvdXRXaW5kb3cAU2hvd01ldHJpY3NXaW5kb3cAU2hvd1N0eWxlRWRpdG9yAFNob3dTdHlsZVNlbGVjdG9yAFNob3dGb250U2VsZWN0b3IAU2hvd1VzZXJHdWlkZQBHZXRWZXJzaW9uAFN0eWxlQ29sb3JzRGFyawBTdHlsZUNvbG9yc0NsYXNzaWMAU3R5bGVDb2xvcnNMaWdodABCZWdpbkNoaWxkAEVuZENoaWxkAEdldENvbnRlbnRSZWdpb25NYXgAR2V0Q29udGVudFJlZ2lvbkF2YWlsAEdldFdpbmRvd0NvbnRlbnRSZWdpb25NaW4AR2V0V2luZG93Q29udGVudFJlZ2lvbk1heABHZXRXaW5kb3dDb250ZW50UmVnaW9uV2lkdGgAR2V0V2luZG93RHJhd0xpc3QAR2V0V2luZG93UG9zAEdldFdpbmRvd1NpemUAR2V0V2luZG93V2lkdGgAR2V0V2luZG93SGVpZ2h0AElzV2luZG93Q29sbGFwc2VkAElzV2luZG93QXBwZWFyaW5nAFNldFdpbmRvd0ZvbnRTY2FsZQBTZXROZXh0V2luZG93UG9zAFNldE5leHRXaW5kb3dTaXplAFNldE5leHRXaW5kb3dTaXplQ29uc3RyYWludHMAU2V0TmV4dFdpbmRvd0NvbnRlbnRTaXplAFNldE5leHRXaW5kb3dDb2xsYXBzZWQAU2V0TmV4dFdpbmRvd0ZvY3VzAFNldE5leHRXaW5kb3dCZ0FscGhhAFNldFdpbmRvd1BvcwBTZXRXaW5kb3dTaXplAFNldFdpbmRvd0NvbGxhcHNlZABTZXRXaW5kb3dGb2N1cwBTZXRXaW5kb3dOYW1lUG9zAFNldFdpbmRvd05hbWVTaXplAFNldFdpbmRvd05hbWVDb2xsYXBzZWQAU2V0V2luZG93TmFtZUZvY3VzAEdldFNjcm9sbFgAR2V0U2Nyb2xsWQBHZXRTY3JvbGxNYXhYAEdldFNjcm9sbE1heFkAU2V0U2Nyb2xsWABTZXRTY3JvbGxZAFNldFNjcm9sbEhlcmVZAFNldFNjcm9sbEZyb21Qb3NZAFNldFN0YXRlU3RvcmFnZQBHZXRTdGF0ZVN0b3JhZ2UAUHVzaEZvbnQAUG9wRm9udABQdXNoU3R5bGVDb2xvcgBQb3BTdHlsZUNvbG9yAFB1c2hTdHlsZVZhcgBQb3BTdHlsZVZhcgBHZXRTdHlsZUNvbG9yVmVjNABHZXRGb250AEdldEZvbnRTaXplAEdldEZvbnRUZXhVdldoaXRlUGl4ZWwAR2V0Q29sb3JVMzJfQQBHZXRDb2xvclUzMl9CAEdldENvbG9yVTMyX0MAUHVzaEl0ZW1XaWR0aABQb3BJdGVtV2lkdGgAU2V0TmV4dEl0ZW1XaWR0aABDYWxjSXRlbVdpZHRoAFB1c2hUZXh0V3JhcFBvcwBQb3BUZXh0V3JhcFBvcwBQdXNoQWxsb3dLZXlib2FyZEZvY3VzAFBvcEFsbG93S2V5Ym9hcmRGb2N1cwBQdXNoQnV0dG9uUmVwZWF0AFBvcEJ1dHRvblJlcGVhdABTZXBhcmF0b3IAU2FtZUxpbmUATmV3TGluZQBTcGFjaW5nAER1bW15AEluZGVudABVbmluZGVudABCZWdpbkdyb3VwAEVuZEdyb3VwAEdldEN1cnNvclBvcwBHZXRDdXJzb3JQb3NYAEdldEN1cnNvclBvc1kAU2V0Q3Vyc29yUG9zAFNldEN1cnNvclBvc1gAU2V0Q3Vyc29yUG9zWQBHZXRDdXJzb3JTdGFydFBvcwBHZXRDdXJzb3JTY3JlZW5Qb3MAU2V0Q3Vyc29yU2NyZWVuUG9zAEFsaWduVGV4dFRvRnJhbWVQYWRkaW5nAEdldFRleHRMaW5lSGVpZ2h0AEdldFRleHRMaW5lSGVpZ2h0V2l0aFNwYWNpbmcAR2V0RnJhbWVIZWlnaHQAR2V0RnJhbWVIZWlnaHRXaXRoU3BhY2luZwBDb2x1bW5zAE5leHRDb2x1bW4AR2V0Q29sdW1uSW5kZXgAR2V0Q29sdW1uV2lkdGgAU2V0Q29sdW1uV2lkdGgAR2V0Q29sdW1uT2Zmc2V0AFNldENvbHVtbk9mZnNldABHZXRDb2x1bW5zQ291bnQAUHVzaElEAFBvcElEAEdldElEAFRleHRVbmZvcm1hdHRlZABUZXh0AFRleHRWAFRleHRDb2xvcmVkAFRleHRDb2xvcmVkVgBUZXh0RGlzYWJsZWQAVGV4dERpc2FibGVkVgBUZXh0V3JhcHBlZABUZXh0V3JhcHBlZFYATGFiZWxUZXh0AExhYmVsVGV4dFYAQnVsbGV0VGV4dABCdWxsZXRUZXh0VgBCdWxsZXQAQnV0dG9uAFNtYWxsQnV0dG9uAEFycm93QnV0dG9uAEludmlzaWJsZUJ1dHRvbgBJbWFnZQBJbWFnZUJ1dHRvbgBDaGVja2JveABDaGVja2JveEZsYWdzAFJhZGlvQnV0dG9uX0EAUmFkaW9CdXR0b25fQgBQbG90TGluZXMAUGxvdEhpc3RvZ3JhbQBQcm9ncmVzc0JhcgBCZWdpbkNvbWJvAEVuZENvbWJvAENvbWJvAERyYWdGbG9hdABEcmFnRmxvYXQyAERyYWdGbG9hdDMARHJhZ0Zsb2F0NABEcmFnRmxvYXRSYW5nZTIARHJhZ0ludABEcmFnSW50MgBEcmFnSW50MwBEcmFnSW50NABEcmFnSW50UmFuZ2UyAERyYWdTY2FsYXIASW5wdXRUZXh0AElucHV0VGV4dFdpdGhIaW50AElucHV0VGV4dE11bHRpbGluZQBJbnB1dEZsb2F0AElucHV0RmxvYXQyAElucHV0RmxvYXQzAElucHV0RmxvYXQ0AElucHV0SW50AElucHV0SW50MgBJbnB1dEludDMASW5wdXRJbnQ0AElucHV0RG91YmxlAElucHV0U2NhbGFyAFNsaWRlckZsb2F0AFNsaWRlckZsb2F0MgBTbGlkZXJGbG9hdDMAU2xpZGVyRmxvYXQ0AFNsaWRlckFuZ2xlAFNsaWRlckludABTbGlkZXJJbnQyAFNsaWRlckludDMAU2xpZGVySW50NABTbGlkZXJTY2FsYXIAVlNsaWRlckZsb2F0AFZTbGlkZXJJbnQAVlNsaWRlclNjYWxhcgBDb2xvckVkaXQzAENvbG9yRWRpdDQAQ29sb3JQaWNrZXIzAENvbG9yUGlja2VyNABDb2xvckJ1dHRvbgBTZXRDb2xvckVkaXRPcHRpb25zAFRyZWVOb2RlX0EAVHJlZU5vZGVfQgBUcmVlTm9kZV9DAFRyZWVOb2RlRXhfQQBUcmVlTm9kZUV4X0IAVHJlZU5vZGVFeF9DAFRyZWVQdXNoX0EAVHJlZVB1c2hfQgBUcmVlUG9wAFRyZWVBZHZhbmNlVG9MYWJlbFBvcwBHZXRUcmVlTm9kZVRvTGFiZWxTcGFjaW5nAENvbGxhcHNpbmdIZWFkZXJfQQBDb2xsYXBzaW5nSGVhZGVyX0IAU2V0TmV4dEl0ZW1PcGVuAFNlbGVjdGFibGVfQQBTZWxlY3RhYmxlX0IATGlzdEJveF9BAExpc3RCb3hfQgBMaXN0Qm94SGVhZGVyX0EATGlzdEJveEhlYWRlcl9CAExpc3RCb3hGb290ZXIAVmFsdWVfQQBWYWx1ZV9CAFZhbHVlX0MAVmFsdWVfRABTZXRUb29sdGlwAEJlZ2luVG9vbHRpcABFbmRUb29sdGlwAEJlZ2luTWFpbk1lbnVCYXIARW5kTWFpbk1lbnVCYXIAQmVnaW5NZW51QmFyAEVuZE1lbnVCYXIAQmVnaW5NZW51AEVuZE1lbnUATWVudUl0ZW1fQQBNZW51SXRlbV9CAE9wZW5Qb3B1cABPcGVuUG9wdXBPbkl0ZW1DbGljawBCZWdpblBvcHVwAEJlZ2luUG9wdXBNb2RhbABCZWdpblBvcHVwQ29udGV4dEl0ZW0AQmVnaW5Qb3B1cENvbnRleHRXaW5kb3cAQmVnaW5Qb3B1cENvbnRleHRWb2lkAEVuZFBvcHVwAElzUG9wdXBPcGVuAENsb3NlQ3VycmVudFBvcHVwAEJlZ2luVGFiQmFyAEVuZFRhYkJhcgBCZWdpblRhYkl0ZW0ARW5kVGFiSXRlbQBTZXRUYWJJdGVtQ2xvc2VkAExvZ1RvVFRZAExvZ1RvRmlsZQBMb2dUb0NsaXBib2FyZABMb2dGaW5pc2gATG9nQnV0dG9ucwBMb2dUZXh0AEJlZ2luRHJhZ0Ryb3BTb3VyY2UAU2V0RHJhZ0Ryb3BQYXlsb2FkAEVuZERyYWdEcm9wU291cmNlAEJlZ2luRHJhZ0Ryb3BUYXJnZXQAQWNjZXB0RHJhZ0Ryb3BQYXlsb2FkAEVuZERyYWdEcm9wVGFyZ2V0AEdldERyYWdEcm9wUGF5bG9hZABTZXRJdGVtRGVmYXVsdEZvY3VzAFNldEtleWJvYXJkRm9jdXNIZXJlAElzSXRlbUhvdmVyZWQASXNJdGVtQWN0aXZlAElzSXRlbUVkaXRlZABJc0l0ZW1Gb2N1c2VkAElzSXRlbUNsaWNrZWQASXNJdGVtVmlzaWJsZQBJc0l0ZW1BY3RpdmF0ZWQASXNJdGVtRGVhY3RpdmF0ZWQASXNJdGVtRGVhY3RpdmF0ZWRBZnRlckVkaXQASXNBbnlJdGVtSG92ZXJlZABJc0FueUl0ZW1BY3RpdmUASXNBbnlJdGVtRm9jdXNlZABHZXRJdGVtUmVjdE1pbgBHZXRJdGVtUmVjdE1heABHZXRJdGVtUmVjdFNpemUAU2V0SXRlbUFsbG93T3ZlcmxhcABJc1dpbmRvd0ZvY3VzZWQASXNXaW5kb3dIb3ZlcmVkAElzUmVjdFZpc2libGVfQQBJc1JlY3RWaXNpYmxlX0IAR2V0VGltZQBHZXRGcmFtZUNvdW50AEdldEJhY2tncm91bmREcmF3TGlzdABHZXRGb3JlZ3JvdW5kRHJhd0xpc3QAR2V0RHJhd0xpc3RTaGFyZWREYXRhAEdldFN0eWxlQ29sb3JOYW1lAENhbGNUZXh0U2l6ZQBDYWxjTGlzdENsaXBwaW5nAEJlZ2luQ2hpbGRGcmFtZQBFbmRDaGlsZEZyYW1lAENvbG9yQ29udmVydFUzMlRvRmxvYXQ0AENvbG9yQ29udmVydEZsb2F0NFRvVTMyAENvbG9yQ29udmVydFJHQnRvSFNWAENvbG9yQ29udmVydEhTVnRvUkdCAEdldEtleUluZGV4AElzS2V5RG93bgBJc0tleVByZXNzZWQASXNLZXlSZWxlYXNlZABHZXRLZXlQcmVzc2VkQW1vdW50AElzTW91c2VEb3duAElzQW55TW91c2VEb3duAElzTW91c2VDbGlja2VkAElzTW91c2VEb3VibGVDbGlja2VkAElzTW91c2VSZWxlYXNlZABJc01vdXNlRHJhZ2dpbmcASXNNb3VzZUhvdmVyaW5nUmVjdABJc01vdXNlUG9zVmFsaWQAR2V0TW91c2VQb3MAR2V0TW91c2VQb3NPbk9wZW5pbmdDdXJyZW50UG9wdXAAR2V0TW91c2VEcmFnRGVsdGEAUmVzZXRNb3VzZURyYWdEZWx0YQBHZXRNb3VzZUN1cnNvcgBTZXRNb3VzZUN1cnNvcgBDYXB0dXJlS2V5Ym9hcmRGcm9tQXBwAENhcHR1cmVNb3VzZUZyb21BcHAAR2V0Q2xpcGJvYXJkVGV4dABTZXRDbGlwYm9hcmRUZXh0AExvYWRJbmlTZXR0aW5nc0Zyb21NZW1vcnkAU2F2ZUluaVNldHRpbmdzVG9NZW1vcnkAU2V0QWxsb2NhdG9yRnVuY3Rpb25zAE1lbUFsbG9jAE1lbUZyZWUAxJ4AAE4xMGVtc2NyaXB0ZW4zdmFsRQAAiNgAALCeAABpaQBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAACInwAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUATlN0M19fMjIxX19iYXNpY19zdHJpbmdfY29tbW9uSUxiMUVFRQAAAACI2AAAV58AAAzZAAAYnwAAAAAAAAEAAACAnwAAAAAAADE2V3JhcEltR3VpQ29udGV4dAAAiNgAAKCfAABQMTZXcmFwSW1HdWlDb250ZXh0AGjZAAC8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ZwBlbXNjcmlwdGVuOjp2YWwAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8Y2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxmbG9hdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgBOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQAAAAAM2QAAjsIAAAAAAAABAAAAgJ8AAAAAAABOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAADNkAAOjCAAAAAAAAAQAAAICfAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURzTlNfMTFjaGFyX3RyYWl0c0lEc0VFTlNfOWFsbG9jYXRvcklEc0VFRUUAAAAM2QAAQMMAAAAAAAABAAAAgJ8AAAAAAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJh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AACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///AAAAAAAAAAD/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAAAAAAAAAAIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADDBQAAwwYAAMMHAADDCAAAwwkAAMMKAADDCwAAwwwAAMMNAADTDgAAww8AAMMAAAy7AQAMwwIADMMDAAzDBAAM02Jhc2ljX3N0cmluZwBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAHZlY3RvcgBfX2N4YV9ndWFyZF9hY3F1aXJlIGRldGVjdGVkIHJlY3Vyc2l2ZSBpbml0aWFsaXphdGlvbgBzdGQ6OmV4Y2VwdGlvbgAAAAAAAAAAwNUAAIQDAACFAwAAhgMAAFN0OWV4Y2VwdGlvbgAAAACI2AAAsNUAAAAAAADs1QAAKwMAAIcDAACIAwAAU3QxMWxvZ2ljX2Vycm9yALDYAADc1QAAwNUAAAAAAAAg1gAAKwMAAIkDAACIAwAAU3QxMmxlbmd0aF9lcnJvcgAAAACw2AAADNYAAOzVAABTdDl0eXBlX2luZm8AAAAAiNgAACzWAABOMTBfX2N4eGFiaXYxMTZfX3NoaW1fdHlwZV9pbmZvRQAAAACw2AAARNYAADzWAABOMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mb0UAAACw2AAAdNYAAGjWAABOMTBfX2N4eGFiaXYxMTdfX3BiYXNlX3R5cGVfaW5mb0UAAACw2AAApNYAAGjWAABOMTBfX2N4eGFiaXYxMTlfX3BvaW50ZXJfdHlwZV9pbmZvRQCw2AAA1NYAAMjWAABOMTBfX2N4eGFiaXYxMjBfX2Z1bmN0aW9uX3R5cGVfaW5mb0UAAAAAsNgAAATXAABo1gAATjEwX19jeHhhYml2MTI5X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm9FAAAAsNgAADjXAADI1gAAAAAAALjXAACKAwAAiwMAAIwDAACNAwAAjgMAAE4xMF9fY3h4YWJpdjEyM19fZnVuZGFtZW50YWxfdHlwZV9pbmZvRQCw2AAAkNcAAGjWAAB2AAAAfNcAAMTXAABQdgAAaNkAANDXAAAAAAAAyNcAAERuAAB81wAA5NcAAGIAAAB81wAA8NcAAGMAAAB81wAA/NcAAGgAAAB81wAACNgAAGEAAAB81wAAFNgAAHMAAAB81wAAINgAAHQAAAB81wAALNgAAGkAAAB81wAAONgAAGoAAAB81wAARNgAAGwAAAB81wAAUNgAAG0AAAB81wAAXNgAAGYAAAB81wAAaNgAAGQAAAB81wAAdNgAAAAAAACY1gAAigMAAI8DAACMAwAAjQMAAJADAACRAwAAkgMAAJMDAAAAAAAA+NgAAIoDAACUAwAAjAMAAI0DAACQAwAAlQMAAJYDAACXAwAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAALDYAADQ2AAAmNYAAAAAAABU2QAAigMAAJgDAACMAwAAjQMAAJADAACZAwAAmgMAAJsDAABOMTBfX2N4eGFiaXYxMjFfX3ZtaV9jbGFzc190eXBlX2luZm9FAAAAsNgAACzZAACY1gAAAAAAAPjWAACKAwAAnAMAAIwDAACNAwAAnQMAQYCzAwsRCAAAAAkAAAAEAAAAAQAAAAUAQZyzAwsCfgMAQbSzAwsOewMAAH8DAAAYIgEAAAQAQcyzAwsBAQBB27MDCwUK/////wBBoLQDCwKQ2QBB1LUDCwPsIQEAQYy2AwsDIChR";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile);}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(readBinary){return readBinary(wasmBinaryFile)}else {throw "both async and sync fetching of the wasm failed"}}catch(err){abort(err);}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw "failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return Promise.resolve().then(getBinary)}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency();}addRunDependency();function receiveInstantiatedSource(output){receiveInstance(output["instance"]);}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason);})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiatedSource)})});}else {return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return {}}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)();}else {wasmTable.get(func)(callback.arg);}}else {func(callback.arg===undefined?null:callback.arg);}}}function dynCallLegacy(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}return Module["dynCall_"+sig].call(null,ptr)}function dynCall(sig,ptr,args){if(sig.indexOf("j")!=-1){return dynCallLegacy(sig,ptr,args)}return wasmTable.get(ptr).apply(null,args)}var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size){return _malloc(size+ExceptionInfoAttrs.SIZE)+ExceptionInfoAttrs.SIZE}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-ExceptionInfoAttrs.SIZE;this.set_type=function(type){HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]=type;};this.get_type=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]=destructor;};this.get_destructor=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=refcount;};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]=caught;};this.get_caught=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]=rethrown;};this.get_rethrown=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false);};this.add_ref=function(){var value=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=value+1;};this.release_ref=function(){var prev=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=prev-1;return prev===1};}function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);throw ptr}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0;}else {buffer.push(curr);}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function ___sys_fcntl64(fd,cmd,varargs){SYSCALLS.varargs=varargs;return 0}function ___sys_ioctl(fd,op,varargs){SYSCALLS.varargs=varargs;return 0}function ___sys_open(path,flags,varargs){SYSCALLS.varargs=varargs;}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return "_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return "_"+name}else {return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"");}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else {return this.name+": "+this.message}};return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count");}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else {unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else {throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return !!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else {throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right}function shallowCopyInternalPointer(o){return {count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted");}var finalizationGroup=false;function detachFinalizer(handle){}function runDestructor($$){if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else {$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function releaseClassHandle($$){$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$);}}function attachFinalizer(handle){if("undefined"===typeof FinalizationGroup){attachFinalizer=function(handle){return handle};return handle}finalizationGroup=new FinalizationGroup(function(iter){for(var result=iter.next();!result.done;result=iter.next()){var $$=result.value;if(!$$.ptr){console.warn("object already deleted: "+$$.ptr);}else {releaseClassHandle($$);}}});attachFinalizer=function(handle){finalizationGroup.register(handle,handle.$$,handle.$$);return handle};detachFinalizer=function(handle){finalizationGroup.unregister(handle.$$);};return attachFinalizer(handle)}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else {var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return !this.$$.ptr}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!");}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!");}Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr}else {return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal");}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle["delete"]();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError("Unsupporting sharing policy");}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined");}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType");}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified");}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record}}))}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else {var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else {return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else {toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else {return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else {this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else {this["toWireType"]=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol");}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;Module[name].argCount=numArguments;}}function getDynCaller(sig,ptr){assert(sig.indexOf("j")>=0,"getDynCaller should only be called with i64 sigs");var argCache=[];return function(){argCache.length=arguments.length;for(var i=0;i<arguments.length;i++){argCache[i]=arguments[i];}return dynCall(sig,ptr,argCache)}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(){if(signature.indexOf("j")!=-1){return getDynCaller(signature,rawFunction)}return wasmTable.get(rawFunction)}var fp=makeDynCaller();if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction);}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=embind__requireFunction(upcastSignature,upcast);}if(downcast){downcast=embind__requireFunction(downcastSignature,downcast);}rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else {basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}return body.apply(this,arguments)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return [referenceConverter,pointerConverter,constPointerConverter]});}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){assert(argCount>0);var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);var args=[rawConstructor];var destructors=[];whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1));}destructors.length=0;args.length=argCount;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr)};return []});return []});}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired";}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n";}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n";}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired;}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n";}else {for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n";}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else {ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction;}else {proto[methodName].overloadTable[argCount-2]=memberFunction;}return []});return []});}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_);}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name);}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object");}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);},enumerable:true,configurable:true};if(setter){desc.set=function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);};}else {desc.set=function(v){throwBindingError(humanName+" is a read-only property");};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],function(types){var getterReturnType=types[0];var desc={get:function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr))},enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors);};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return []});return []});}function __embind_register_constant(name,type,value){name=readLatin1String(name);whenDependentTypesAreResolved([],[type],function(type){type=type[0];Module[name]=type["fromWireType"](value);return []});}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1}case null:{return 2}case true:{return 3}case false:{return 4}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv},"toWireType":function(destructors,value){return __emval_register(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null});}function _embind_repr(v){if(v===null){return "null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else {return ""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null});}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes);},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return []});}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift};}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true});}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+1;}}}else {var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}str=a.join("");}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}var getLength;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string");}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value)};}else {getLength=function(){return value.length};}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1);}else {if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits");}HEAPU8[ptr+4+i]=charCode;}}else {for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i];}}}if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=function(){return HEAPU16};shift=1;}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=function(){return HEAPU32};shift=2;}registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||HEAP[currentBytePtr>>shift]==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+charSize;}}_free(value);return str},"toWireType":function(destructors,value){if(!(typeof value==="string")){throwBindingError("Cannot pass non-string to C++ string type "+name);}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}});}function requireHandle(handle){if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle);}return emval_handle_array[handle].value}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType));}return impl}function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=__emval_register(destructors);HEAP32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}function __emval_lookupTypes(argCount,argTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i);}return a}function __emval_call(handle,argCount,argTypes,argv){handle=requireHandle(handle);var types=__emval_lookupTypes(argCount,argTypes);var args=new Array(argCount);for(var i=0;i<argCount;++i){var type=types[i];args[i]=type["readValueFromPointer"](argv);argv+=type["argPackAdvance"];}var rv=handle.apply(undefined,args);return __emval_register(rv)}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}else {return symbol}}var emval_methodCallers=[];function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args);}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i]);}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"];}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n";}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n";}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);return __emval_addMethodCaller(invokerFunction)}function __emval_get_property(handle,key){handle=requireHandle(handle);key=requireHandle(key);return __emval_register(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1;}}function __emval_new_array(){return __emval_register([])}function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}function __emval_new_object(){return __emval_register({})}function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;runDestructors(destructors);__emval_decref(handle);}function __emval_set_property(handle,key,value){handle=requireHandle(handle);key=requireHandle(key);value=requireHandle(value);handle[key]=value;}function __emval_strictly_equals(first,second){first=requireHandle(first);second=requireHandle(second);return first===second}function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](argv);return __emval_register(v)}function __emval_typeof(handle){handle=requireHandle(handle);return __emval_register(typeof handle)}function _abort(){abort();}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num);}function abortOnCannotGrowMemory(requestedSize){abort("OOM");}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory();}function _fd_close(fd){return 0}function _fd_read(fd,iov,iovcnt,pnum){var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j]);}num+=len;}HEAP32[pnum>>2]=num;return 0}function _setTempRet0($i){}embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2);}if(enc4!==64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64");}catch(_){buf=new Buffer(s,"base64");}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i);}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}__ATINIT__.push({func:function(){___wasm_call_ctors();}});var asmLibraryArg={"Q":___cxa_allocate_exception,"P":___cxa_throw,"b":wasmTable,"u":___sys_fcntl64,"G":___sys_ioctl,"H":___sys_open,"J":__embind_register_bool,"h":__embind_register_class,"n":__embind_register_class_constructor,"e":__embind_register_class_function,"c":__embind_register_class_property,"x":__embind_register_constant,"I":__embind_register_emval,"v":__embind_register_float,"d":__embind_register_function,"j":__embind_register_integer,"i":__embind_register_memory_view,"w":__embind_register_std_string,"q":__embind_register_std_wstring,"K":__embind_register_void,"g":__emval_as,"N":__emval_call,"l":__emval_call_void_method,"p":__emval_decref,"k":__emval_get_method_caller,"o":__emval_get_property,"r":__emval_incref,"L":__emval_new_array,"z":__emval_new_cstring,"R":__emval_new_object,"O":__emval_run_destructors,"m":__emval_set_property,"y":__emval_strictly_equals,"f":__emval_take_value,"M":__emval_typeof,"E":_abort,"C":_emscripten_memcpy_big,"D":_emscripten_resize_heap,"s":_fd_close,"F":_fd_read,"A":_fd_seek,"t":_fd_write,"a":wasmMemory,"B":_setTempRet0};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return (___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["S"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return (_malloc=Module["_malloc"]=Module["asm"]["T"]).apply(null,arguments)};var _free=Module["_free"]=function(){return (_free=Module["_free"]=Module["asm"]["U"]).apply(null,arguments)};var ___getTypeName=Module["___getTypeName"]=function(){return (___getTypeName=Module["___getTypeName"]=Module["asm"]["V"]).apply(null,arguments)};var ___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=function(){return (___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=Module["asm"]["W"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return (dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["X"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller;};function run(args){if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else {doRun();}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}noExitRuntime=true;run();


      return Module.ready
    }
    );
    })();
    module.exports = Module;
    });
    var bindImgui_1 = bindImgui.bind;

    var bindImgui$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': bindImgui,
        __moduleExports: bindImgui,
        bind: bindImgui_1
    });

    function imgui (value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                bindImgui(value).then((value) => {
                    exports.bind = value;
                    resolve();
                });
            });
        });
    }
    function import_Scalar(sca) {
        if (Array.isArray(sca)) {
            return [sca[0]];
        }
        if (typeof sca === "function") {
            return [sca()];
        }
        return [sca.x];
    }
    function export_Scalar(tuple, sca) {
        if (Array.isArray(sca)) {
            sca[0] = tuple[0];
            return;
        }
        if (typeof sca === "function") {
            sca(tuple[0]);
            return;
        }
        sca.x = tuple[0];
    }
    function import_Vector2(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1]];
        }
        return [vec.x, vec.y];
    }
    function export_Vector2(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
    }
    function import_Vector3(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1], vec[2]];
        }
        return [vec.x, vec.y, vec.z];
    }
    function export_Vector3(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            vec[2] = tuple[2];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
        vec.z = tuple[2];
    }
    function import_Vector4(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1], vec[2], vec[3] || 0];
        }
        return [vec.x, vec.y, vec.z, vec.w];
    }
    function export_Vector4(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            vec[2] = tuple[2];
            vec[3] = tuple[3];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
        vec.z = tuple[2];
        vec.w = tuple[3];
    }
    function import_Color3(col) {
        if (Array.isArray(col)) {
            return [col[0], col[1], col[2]];
        }
        if ("r" in col) {
            return [col.r, col.g, col.b];
        }
        return [col.x, col.y, col.z];
    }
    function export_Color3(tuple, col) {
        if (Array.isArray(col)) {
            col[0] = tuple[0];
            col[1] = tuple[1];
            col[2] = tuple[2];
            return;
        }
        if ("r" in col) {
            col.r = tuple[0];
            col.g = tuple[1];
            col.b = tuple[2];
            return;
        }
        col.x = tuple[0];
        col.y = tuple[1];
        col.z = tuple[2];
    }
    function import_Color4(col) {
        if (Array.isArray(col)) {
            return [col[0], col[1], col[2], col[3]];
        }
        if ("r" in col) {
            return [col.r, col.g, col.b, col.a];
        }
        return [col.x, col.y, col.z, col.w];
    }
    function export_Color4(tuple, col) {
        if (Array.isArray(col)) {
            col[0] = tuple[0];
            col[1] = tuple[1];
            col[2] = tuple[2];
            return;
        }
        if ("r" in col) {
            col.r = tuple[0];
            col.g = tuple[1];
            col.b = tuple[2];
            return;
        }
        col.x = tuple[0];
        col.y = tuple[1];
        col.z = tuple[2];
    }
    const IMGUI_VERSION = "1.71"; // bind.IMGUI_VERSION;
    const IMGUI_VERSION_NUM = 17100; // bind.IMGUI_VERSION_NUM;
    // #define IMGUI_CHECKVERSION()        ImGui::DebugCheckVersionAndDataLayout(IMGUI_VERSION, sizeof(ImGuiIO), sizeof(ImGuiStyle), sizeof(ImVec2), sizeof(ImVec4), sizeof(ImDrawVert))
    function IMGUI_CHECKVERSION() { return DebugCheckVersionAndDataLayout(IMGUI_VERSION, exports.bind.ImGuiIOSize, exports.bind.ImGuiStyleSize, exports.bind.ImVec2Size, exports.bind.ImVec4Size, exports.bind.ImDrawVertSize, exports.bind.ImDrawIdxSize); }
    function IM_ASSERT(_EXPR) { if (!_EXPR) {
        throw new Error();
    } }
    function IM_ARRAYSIZE(_ARR) {
        if (_ARR instanceof ImStringBuffer) {
            return _ARR.size;
        }
        else {
            return _ARR.length;
        }
    }
    class ImStringBuffer {
        constructor(size, buffer = "") {
            this.size = size;
            this.buffer = buffer;
        }
    }
    (function (ImGuiWindowFlags) {
        ImGuiWindowFlags[ImGuiWindowFlags["None"] = 0] = "None";
        ImGuiWindowFlags[ImGuiWindowFlags["NoTitleBar"] = 1] = "NoTitleBar";
        ImGuiWindowFlags[ImGuiWindowFlags["NoResize"] = 2] = "NoResize";
        ImGuiWindowFlags[ImGuiWindowFlags["NoMove"] = 4] = "NoMove";
        ImGuiWindowFlags[ImGuiWindowFlags["NoScrollbar"] = 8] = "NoScrollbar";
        ImGuiWindowFlags[ImGuiWindowFlags["NoScrollWithMouse"] = 16] = "NoScrollWithMouse";
        ImGuiWindowFlags[ImGuiWindowFlags["NoCollapse"] = 32] = "NoCollapse";
        ImGuiWindowFlags[ImGuiWindowFlags["AlwaysAutoResize"] = 64] = "AlwaysAutoResize";
        ImGuiWindowFlags[ImGuiWindowFlags["NoBackground"] = 128] = "NoBackground";
        ImGuiWindowFlags[ImGuiWindowFlags["NoSavedSettings"] = 256] = "NoSavedSettings";
        ImGuiWindowFlags[ImGuiWindowFlags["NoMouseInputs"] = 512] = "NoMouseInputs";
        ImGuiWindowFlags[ImGuiWindowFlags["MenuBar"] = 1024] = "MenuBar";
        ImGuiWindowFlags[ImGuiWindowFlags["HorizontalScrollbar"] = 2048] = "HorizontalScrollbar";
        ImGuiWindowFlags[ImGuiWindowFlags["NoFocusOnAppearing"] = 4096] = "NoFocusOnAppearing";
        ImGuiWindowFlags[ImGuiWindowFlags["NoBringToFrontOnFocus"] = 8192] = "NoBringToFrontOnFocus";
        ImGuiWindowFlags[ImGuiWindowFlags["AlwaysVerticalScrollbar"] = 16384] = "AlwaysVerticalScrollbar";
        ImGuiWindowFlags[ImGuiWindowFlags["AlwaysHorizontalScrollbar"] = 32768] = "AlwaysHorizontalScrollbar";
        ImGuiWindowFlags[ImGuiWindowFlags["AlwaysUseWindowPadding"] = 65536] = "AlwaysUseWindowPadding";
        ImGuiWindowFlags[ImGuiWindowFlags["NoNavInputs"] = 262144] = "NoNavInputs";
        ImGuiWindowFlags[ImGuiWindowFlags["NoNavFocus"] = 524288] = "NoNavFocus";
        ImGuiWindowFlags[ImGuiWindowFlags["UnsavedDocument"] = 1048576] = "UnsavedDocument";
        ImGuiWindowFlags[ImGuiWindowFlags["NoNav"] = 786432] = "NoNav";
        ImGuiWindowFlags[ImGuiWindowFlags["NoDecoration"] = 43] = "NoDecoration";
        ImGuiWindowFlags[ImGuiWindowFlags["NoInputs"] = 786944] = "NoInputs";
        // [Internal]
        ImGuiWindowFlags[ImGuiWindowFlags["NavFlattened"] = 8388608] = "NavFlattened";
        ImGuiWindowFlags[ImGuiWindowFlags["ChildWindow"] = 16777216] = "ChildWindow";
        ImGuiWindowFlags[ImGuiWindowFlags["Tooltip"] = 33554432] = "Tooltip";
        ImGuiWindowFlags[ImGuiWindowFlags["Popup"] = 67108864] = "Popup";
        ImGuiWindowFlags[ImGuiWindowFlags["Modal"] = 134217728] = "Modal";
        ImGuiWindowFlags[ImGuiWindowFlags["ChildMenu"] = 268435456] = "ChildMenu";
    })(exports.WindowFlags || (exports.WindowFlags = {}));
    (function (ImGuiInputTextFlags) {
        ImGuiInputTextFlags[ImGuiInputTextFlags["None"] = 0] = "None";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CharsDecimal"] = 1] = "CharsDecimal";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CharsHexadecimal"] = 2] = "CharsHexadecimal";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CharsUppercase"] = 4] = "CharsUppercase";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CharsNoBlank"] = 8] = "CharsNoBlank";
        ImGuiInputTextFlags[ImGuiInputTextFlags["AutoSelectAll"] = 16] = "AutoSelectAll";
        ImGuiInputTextFlags[ImGuiInputTextFlags["EnterReturnsTrue"] = 32] = "EnterReturnsTrue";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCompletion"] = 64] = "CallbackCompletion";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackHistory"] = 128] = "CallbackHistory";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackAlways"] = 256] = "CallbackAlways";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCharFilter"] = 512] = "CallbackCharFilter";
        ImGuiInputTextFlags[ImGuiInputTextFlags["AllowTabInput"] = 1024] = "AllowTabInput";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CtrlEnterForNewLine"] = 2048] = "CtrlEnterForNewLine";
        ImGuiInputTextFlags[ImGuiInputTextFlags["NoHorizontalScroll"] = 4096] = "NoHorizontalScroll";
        ImGuiInputTextFlags[ImGuiInputTextFlags["AlwaysInsertMode"] = 8192] = "AlwaysInsertMode";
        ImGuiInputTextFlags[ImGuiInputTextFlags["ReadOnly"] = 16384] = "ReadOnly";
        ImGuiInputTextFlags[ImGuiInputTextFlags["Password"] = 32768] = "Password";
        ImGuiInputTextFlags[ImGuiInputTextFlags["NoUndoRedo"] = 65536] = "NoUndoRedo";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CharsScientific"] = 131072] = "CharsScientific";
        ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackResize"] = 262144] = "CallbackResize";
        // [Internal]
        ImGuiInputTextFlags[ImGuiInputTextFlags["Multiline"] = 1048576] = "Multiline";
        ImGuiInputTextFlags[ImGuiInputTextFlags["NoMarkEdited"] = 2097152] = "NoMarkEdited";
    })(exports.InputTextFlags || (exports.InputTextFlags = {}));
    (function (ImGuiTreeNodeFlags) {
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["None"] = 0] = "None";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Selected"] = 1] = "Selected";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Framed"] = 2] = "Framed";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["AllowItemOverlap"] = 4] = "AllowItemOverlap";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoTreePushOnOpen"] = 8] = "NoTreePushOnOpen";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoAutoOpenOnLog"] = 16] = "NoAutoOpenOnLog";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["DefaultOpen"] = 32] = "DefaultOpen";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnDoubleClick"] = 64] = "OpenOnDoubleClick";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnArrow"] = 128] = "OpenOnArrow";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Leaf"] = 256] = "Leaf";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Bullet"] = 512] = "Bullet";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["FramePadding"] = 1024] = "FramePadding";
        //SpanAllAvailWidth  = 1 << 11,  // FIXME: TODO: Extend hit box horizontally even if not framed
        //NoScrollOnOpen     = 1 << 12,  // FIXME: TODO: Disable automatic scroll on TreePop() if node got just open and contents is not visible
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NavLeftJumpsBackHere"] = 8192] = "NavLeftJumpsBackHere";
        ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["CollapsingHeader"] = 26] = "CollapsingHeader";
    })(exports.TreeNodeFlags || (exports.TreeNodeFlags = {}));
    (function (ImGuiSelectableFlags) {
        ImGuiSelectableFlags[ImGuiSelectableFlags["None"] = 0] = "None";
        ImGuiSelectableFlags[ImGuiSelectableFlags["DontClosePopups"] = 1] = "DontClosePopups";
        ImGuiSelectableFlags[ImGuiSelectableFlags["SpanAllColumns"] = 2] = "SpanAllColumns";
        ImGuiSelectableFlags[ImGuiSelectableFlags["AllowDoubleClick"] = 4] = "AllowDoubleClick";
        ImGuiSelectableFlags[ImGuiSelectableFlags["Disabled"] = 8] = "Disabled"; // Cannot be selected, display greyed out text
    })(exports.SelectableFlags || (exports.SelectableFlags = {}));
    (function (ImGuiComboFlags) {
        ImGuiComboFlags[ImGuiComboFlags["None"] = 0] = "None";
        ImGuiComboFlags[ImGuiComboFlags["PopupAlignLeft"] = 1] = "PopupAlignLeft";
        ImGuiComboFlags[ImGuiComboFlags["HeightSmall"] = 2] = "HeightSmall";
        ImGuiComboFlags[ImGuiComboFlags["HeightRegular"] = 4] = "HeightRegular";
        ImGuiComboFlags[ImGuiComboFlags["HeightLarge"] = 8] = "HeightLarge";
        ImGuiComboFlags[ImGuiComboFlags["HeightLargest"] = 16] = "HeightLargest";
        ImGuiComboFlags[ImGuiComboFlags["NoArrowButton"] = 32] = "NoArrowButton";
        ImGuiComboFlags[ImGuiComboFlags["NoPreview"] = 64] = "NoPreview";
        ImGuiComboFlags[ImGuiComboFlags["HeightMask_"] = 30] = "HeightMask_";
    })(exports.ImGuiComboFlags || (exports.ImGuiComboFlags = {}));
    (function (ImGuiTabBarFlags) {
        ImGuiTabBarFlags[ImGuiTabBarFlags["None"] = 0] = "None";
        ImGuiTabBarFlags[ImGuiTabBarFlags["Reorderable"] = 1] = "Reorderable";
        ImGuiTabBarFlags[ImGuiTabBarFlags["AutoSelectNewTabs"] = 2] = "AutoSelectNewTabs";
        ImGuiTabBarFlags[ImGuiTabBarFlags["TabListPopupButton"] = 4] = "TabListPopupButton";
        ImGuiTabBarFlags[ImGuiTabBarFlags["NoCloseWithMiddleMouseButton"] = 8] = "NoCloseWithMiddleMouseButton";
        ImGuiTabBarFlags[ImGuiTabBarFlags["NoTabListScrollingButtons"] = 16] = "NoTabListScrollingButtons";
        ImGuiTabBarFlags[ImGuiTabBarFlags["NoTooltip"] = 32] = "NoTooltip";
        ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyResizeDown"] = 64] = "FittingPolicyResizeDown";
        ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyScroll"] = 128] = "FittingPolicyScroll";
        ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyMask_"] = 192] = "FittingPolicyMask_";
        ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyDefault_"] = 64] = "FittingPolicyDefault_";
    })(exports.TabBarFlags || (exports.TabBarFlags = {}));
    (function (ImGuiTabItemFlags) {
        ImGuiTabItemFlags[ImGuiTabItemFlags["ImGuiTabItemFlags_None"] = 0] = "ImGuiTabItemFlags_None";
        ImGuiTabItemFlags[ImGuiTabItemFlags["ImGuiTabItemFlags_UnsavedDocument"] = 1] = "ImGuiTabItemFlags_UnsavedDocument";
        ImGuiTabItemFlags[ImGuiTabItemFlags["ImGuiTabItemFlags_SetSelected"] = 2] = "ImGuiTabItemFlags_SetSelected";
        ImGuiTabItemFlags[ImGuiTabItemFlags["ImGuiTabItemFlags_NoCloseWithMiddleMouseButton"] = 4] = "ImGuiTabItemFlags_NoCloseWithMiddleMouseButton";
        ImGuiTabItemFlags[ImGuiTabItemFlags["ImGuiTabItemFlags_NoPushId"] = 8] = "ImGuiTabItemFlags_NoPushId"; // Don't call PushID(tab->ID)/PopID() on BeginTabItem()/EndTabItem()
    })(exports.TabItemFlags || (exports.TabItemFlags = {}));
    (function (ImGuiFocusedFlags) {
        ImGuiFocusedFlags[ImGuiFocusedFlags["None"] = 0] = "None";
        ImGuiFocusedFlags[ImGuiFocusedFlags["ChildWindows"] = 1] = "ChildWindows";
        ImGuiFocusedFlags[ImGuiFocusedFlags["RootWindow"] = 2] = "RootWindow";
        ImGuiFocusedFlags[ImGuiFocusedFlags["AnyWindow"] = 4] = "AnyWindow";
        ImGuiFocusedFlags[ImGuiFocusedFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
    })(exports.ImGuiFocusedFlags || (exports.ImGuiFocusedFlags = {}));
    (function (ImGuiHoveredFlags) {
        ImGuiHoveredFlags[ImGuiHoveredFlags["None"] = 0] = "None";
        ImGuiHoveredFlags[ImGuiHoveredFlags["ChildWindows"] = 1] = "ChildWindows";
        ImGuiHoveredFlags[ImGuiHoveredFlags["RootWindow"] = 2] = "RootWindow";
        ImGuiHoveredFlags[ImGuiHoveredFlags["AnyWindow"] = 4] = "AnyWindow";
        ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByPopup"] = 8] = "AllowWhenBlockedByPopup";
        //AllowWhenBlockedByModal     = 1 << 4,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
        ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByActiveItem"] = 32] = "AllowWhenBlockedByActiveItem";
        ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenOverlapped"] = 64] = "AllowWhenOverlapped";
        ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenDisabled"] = 128] = "AllowWhenDisabled";
        ImGuiHoveredFlags[ImGuiHoveredFlags["RectOnly"] = 104] = "RectOnly";
        ImGuiHoveredFlags[ImGuiHoveredFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
    })(exports.ImGuiHoveredFlags || (exports.ImGuiHoveredFlags = {}));
    (function (ImGuiDragDropFlags) {
        // BeginDragDropSource() flags
        ImGuiDragDropFlags[ImGuiDragDropFlags["None"] = 0] = "None";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoPreviewTooltip"] = 1] = "SourceNoPreviewTooltip";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoDisableHover"] = 2] = "SourceNoDisableHover";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoHoldToOpenOthers"] = 4] = "SourceNoHoldToOpenOthers";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAllowNullID"] = 8] = "SourceAllowNullID";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceExtern"] = 16] = "SourceExtern";
        ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAutoExpirePayload"] = 32] = "SourceAutoExpirePayload";
        // AcceptDragDropPayload() flags
        ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptBeforeDelivery"] = 1024] = "AcceptBeforeDelivery";
        ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoDrawDefaultRect"] = 2048] = "AcceptNoDrawDefaultRect";
        ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoPreviewTooltip"] = 4096] = "AcceptNoPreviewTooltip";
        ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptPeekOnly"] = 3072] = "AcceptPeekOnly";
    })(exports.ImGuiDragDropFlags || (exports.ImGuiDragDropFlags = {}));
    // Standard Drag and Drop payload types. You can define you own payload types using 12-characters long strings. Types starting with '_' are defined by Dear ImGui.
    const IMGUI_PAYLOAD_TYPE_COLOR_3F = "_COL3F"; // float[3]     // Standard type for colors, without alpha. User code may use this type.
    const IMGUI_PAYLOAD_TYPE_COLOR_4F = "_COL4F"; // float[4]     // Standard type for colors. User code may use this type.
    (function (ImGuiDataType) {
        ImGuiDataType[ImGuiDataType["S8"] = 0] = "S8";
        ImGuiDataType[ImGuiDataType["U8"] = 1] = "U8";
        ImGuiDataType[ImGuiDataType["S16"] = 2] = "S16";
        ImGuiDataType[ImGuiDataType["U16"] = 3] = "U16";
        ImGuiDataType[ImGuiDataType["S32"] = 4] = "S32";
        ImGuiDataType[ImGuiDataType["U32"] = 5] = "U32";
        ImGuiDataType[ImGuiDataType["S64"] = 6] = "S64";
        ImGuiDataType[ImGuiDataType["U64"] = 7] = "U64";
        ImGuiDataType[ImGuiDataType["Float"] = 8] = "Float";
        ImGuiDataType[ImGuiDataType["Double"] = 9] = "Double";
        ImGuiDataType[ImGuiDataType["COUNT"] = 10] = "COUNT";
    })(exports.ImGuiDataType || (exports.ImGuiDataType = {}));
    (function (ImGuiDir) {
        ImGuiDir[ImGuiDir["None"] = -1] = "None";
        ImGuiDir[ImGuiDir["Left"] = 0] = "Left";
        ImGuiDir[ImGuiDir["Right"] = 1] = "Right";
        ImGuiDir[ImGuiDir["Up"] = 2] = "Up";
        ImGuiDir[ImGuiDir["Down"] = 3] = "Down";
        ImGuiDir[ImGuiDir["COUNT"] = 4] = "COUNT";
    })(exports.ImGuiDir || (exports.ImGuiDir = {}));
    (function (ImGuiKey) {
        ImGuiKey[ImGuiKey["Tab"] = 0] = "Tab";
        ImGuiKey[ImGuiKey["LeftArrow"] = 1] = "LeftArrow";
        ImGuiKey[ImGuiKey["RightArrow"] = 2] = "RightArrow";
        ImGuiKey[ImGuiKey["UpArrow"] = 3] = "UpArrow";
        ImGuiKey[ImGuiKey["DownArrow"] = 4] = "DownArrow";
        ImGuiKey[ImGuiKey["PageUp"] = 5] = "PageUp";
        ImGuiKey[ImGuiKey["PageDown"] = 6] = "PageDown";
        ImGuiKey[ImGuiKey["Home"] = 7] = "Home";
        ImGuiKey[ImGuiKey["End"] = 8] = "End";
        ImGuiKey[ImGuiKey["Insert"] = 9] = "Insert";
        ImGuiKey[ImGuiKey["Delete"] = 10] = "Delete";
        ImGuiKey[ImGuiKey["Backspace"] = 11] = "Backspace";
        ImGuiKey[ImGuiKey["Space"] = 12] = "Space";
        ImGuiKey[ImGuiKey["Enter"] = 13] = "Enter";
        ImGuiKey[ImGuiKey["Escape"] = 14] = "Escape";
        ImGuiKey[ImGuiKey["A"] = 15] = "A";
        ImGuiKey[ImGuiKey["C"] = 16] = "C";
        ImGuiKey[ImGuiKey["V"] = 17] = "V";
        ImGuiKey[ImGuiKey["X"] = 18] = "X";
        ImGuiKey[ImGuiKey["Y"] = 19] = "Y";
        ImGuiKey[ImGuiKey["Z"] = 20] = "Z";
        ImGuiKey[ImGuiKey["COUNT"] = 21] = "COUNT";
    })(exports.Key || (exports.Key = {}));
    (function (ImGuiNavInput) {
        // Gamepad Mapping
        ImGuiNavInput[ImGuiNavInput["Activate"] = 0] = "Activate";
        ImGuiNavInput[ImGuiNavInput["Cancel"] = 1] = "Cancel";
        ImGuiNavInput[ImGuiNavInput["Input"] = 2] = "Input";
        ImGuiNavInput[ImGuiNavInput["Menu"] = 3] = "Menu";
        ImGuiNavInput[ImGuiNavInput["DpadLeft"] = 4] = "DpadLeft";
        ImGuiNavInput[ImGuiNavInput["DpadRight"] = 5] = "DpadRight";
        ImGuiNavInput[ImGuiNavInput["DpadUp"] = 6] = "DpadUp";
        ImGuiNavInput[ImGuiNavInput["DpadDown"] = 7] = "DpadDown";
        ImGuiNavInput[ImGuiNavInput["LStickLeft"] = 8] = "LStickLeft";
        ImGuiNavInput[ImGuiNavInput["LStickRight"] = 9] = "LStickRight";
        ImGuiNavInput[ImGuiNavInput["LStickUp"] = 10] = "LStickUp";
        ImGuiNavInput[ImGuiNavInput["LStickDown"] = 11] = "LStickDown";
        ImGuiNavInput[ImGuiNavInput["FocusPrev"] = 12] = "FocusPrev";
        ImGuiNavInput[ImGuiNavInput["FocusNext"] = 13] = "FocusNext";
        ImGuiNavInput[ImGuiNavInput["TweakSlow"] = 14] = "TweakSlow";
        ImGuiNavInput[ImGuiNavInput["TweakFast"] = 15] = "TweakFast";
        // [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
        // Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) may be directly reading from io.KeyDown[] instead of io.NavInputs[].
        ImGuiNavInput[ImGuiNavInput["KeyMenu_"] = 16] = "KeyMenu_";
        ImGuiNavInput[ImGuiNavInput["KeyTab_"] = 17] = "KeyTab_";
        ImGuiNavInput[ImGuiNavInput["KeyLeft_"] = 18] = "KeyLeft_";
        ImGuiNavInput[ImGuiNavInput["KeyRight_"] = 19] = "KeyRight_";
        ImGuiNavInput[ImGuiNavInput["KeyUp_"] = 20] = "KeyUp_";
        ImGuiNavInput[ImGuiNavInput["KeyDown_"] = 21] = "KeyDown_";
        ImGuiNavInput[ImGuiNavInput["COUNT"] = 22] = "COUNT";
        ImGuiNavInput[ImGuiNavInput["InternalStart_"] = 16] = "InternalStart_";
    })(exports.NavInput || (exports.NavInput = {}));
    (function (ImGuiConfigFlags) {
        ImGuiConfigFlags[ImGuiConfigFlags["None"] = 0] = "None";
        ImGuiConfigFlags[ImGuiConfigFlags["NavEnableKeyboard"] = 1] = "NavEnableKeyboard";
        ImGuiConfigFlags[ImGuiConfigFlags["NavEnableGamepad"] = 2] = "NavEnableGamepad";
        ImGuiConfigFlags[ImGuiConfigFlags["NavEnableSetMousePos"] = 4] = "NavEnableSetMousePos";
        ImGuiConfigFlags[ImGuiConfigFlags["NavNoCaptureKeyboard"] = 8] = "NavNoCaptureKeyboard";
        ImGuiConfigFlags[ImGuiConfigFlags["NoMouse"] = 16] = "NoMouse";
        ImGuiConfigFlags[ImGuiConfigFlags["NoMouseCursorChange"] = 32] = "NoMouseCursorChange";
        ImGuiConfigFlags[ImGuiConfigFlags["IsSRGB"] = 1048576] = "IsSRGB";
        ImGuiConfigFlags[ImGuiConfigFlags["IsTouchScreen"] = 2097152] = "IsTouchScreen"; // Application is using a touch screen instead of a mouse.
    })(exports.ImGuiConfigFlags || (exports.ImGuiConfigFlags = {}));
    (function (ImGuiCol) {
        ImGuiCol[ImGuiCol["Text"] = 0] = "Text";
        ImGuiCol[ImGuiCol["TextDisabled"] = 1] = "TextDisabled";
        ImGuiCol[ImGuiCol["WindowBg"] = 2] = "WindowBg";
        ImGuiCol[ImGuiCol["ChildBg"] = 3] = "ChildBg";
        ImGuiCol[ImGuiCol["PopupBg"] = 4] = "PopupBg";
        ImGuiCol[ImGuiCol["Border"] = 5] = "Border";
        ImGuiCol[ImGuiCol["BorderShadow"] = 6] = "BorderShadow";
        ImGuiCol[ImGuiCol["FrameBg"] = 7] = "FrameBg";
        ImGuiCol[ImGuiCol["FrameBgHovered"] = 8] = "FrameBgHovered";
        ImGuiCol[ImGuiCol["FrameBgActive"] = 9] = "FrameBgActive";
        ImGuiCol[ImGuiCol["TitleBg"] = 10] = "TitleBg";
        ImGuiCol[ImGuiCol["TitleBgActive"] = 11] = "TitleBgActive";
        ImGuiCol[ImGuiCol["TitleBgCollapsed"] = 12] = "TitleBgCollapsed";
        ImGuiCol[ImGuiCol["MenuBarBg"] = 13] = "MenuBarBg";
        ImGuiCol[ImGuiCol["ScrollbarBg"] = 14] = "ScrollbarBg";
        ImGuiCol[ImGuiCol["ScrollbarGrab"] = 15] = "ScrollbarGrab";
        ImGuiCol[ImGuiCol["ScrollbarGrabHovered"] = 16] = "ScrollbarGrabHovered";
        ImGuiCol[ImGuiCol["ScrollbarGrabActive"] = 17] = "ScrollbarGrabActive";
        ImGuiCol[ImGuiCol["CheckMark"] = 18] = "CheckMark";
        ImGuiCol[ImGuiCol["SliderGrab"] = 19] = "SliderGrab";
        ImGuiCol[ImGuiCol["SliderGrabActive"] = 20] = "SliderGrabActive";
        ImGuiCol[ImGuiCol["Button"] = 21] = "Button";
        ImGuiCol[ImGuiCol["ButtonHovered"] = 22] = "ButtonHovered";
        ImGuiCol[ImGuiCol["ButtonActive"] = 23] = "ButtonActive";
        ImGuiCol[ImGuiCol["Header"] = 24] = "Header";
        ImGuiCol[ImGuiCol["HeaderHovered"] = 25] = "HeaderHovered";
        ImGuiCol[ImGuiCol["HeaderActive"] = 26] = "HeaderActive";
        ImGuiCol[ImGuiCol["Separator"] = 27] = "Separator";
        ImGuiCol[ImGuiCol["SeparatorHovered"] = 28] = "SeparatorHovered";
        ImGuiCol[ImGuiCol["SeparatorActive"] = 29] = "SeparatorActive";
        ImGuiCol[ImGuiCol["ResizeGrip"] = 30] = "ResizeGrip";
        ImGuiCol[ImGuiCol["ResizeGripHovered"] = 31] = "ResizeGripHovered";
        ImGuiCol[ImGuiCol["ResizeGripActive"] = 32] = "ResizeGripActive";
        ImGuiCol[ImGuiCol["Tab"] = 33] = "Tab";
        ImGuiCol[ImGuiCol["TabHovered"] = 34] = "TabHovered";
        ImGuiCol[ImGuiCol["TabActive"] = 35] = "TabActive";
        ImGuiCol[ImGuiCol["TabUnfocused"] = 36] = "TabUnfocused";
        ImGuiCol[ImGuiCol["TabUnfocusedActive"] = 37] = "TabUnfocusedActive";
        ImGuiCol[ImGuiCol["PlotLines"] = 38] = "PlotLines";
        ImGuiCol[ImGuiCol["PlotLinesHovered"] = 39] = "PlotLinesHovered";
        ImGuiCol[ImGuiCol["PlotHistogram"] = 40] = "PlotHistogram";
        ImGuiCol[ImGuiCol["PlotHistogramHovered"] = 41] = "PlotHistogramHovered";
        ImGuiCol[ImGuiCol["TextSelectedBg"] = 42] = "TextSelectedBg";
        ImGuiCol[ImGuiCol["DragDropTarget"] = 43] = "DragDropTarget";
        ImGuiCol[ImGuiCol["NavHighlight"] = 44] = "NavHighlight";
        ImGuiCol[ImGuiCol["NavWindowingHighlight"] = 45] = "NavWindowingHighlight";
        ImGuiCol[ImGuiCol["NavWindowingDimBg"] = 46] = "NavWindowingDimBg";
        ImGuiCol[ImGuiCol["ModalWindowDimBg"] = 47] = "ModalWindowDimBg";
        ImGuiCol[ImGuiCol["COUNT"] = 48] = "COUNT";
    })(exports.ImGuiCol || (exports.ImGuiCol = {}));
    (function (ImGuiStyleVar) {
        // Enum name ......................// Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
        ImGuiStyleVar[ImGuiStyleVar["Alpha"] = 0] = "Alpha";
        ImGuiStyleVar[ImGuiStyleVar["WindowPadding"] = 1] = "WindowPadding";
        ImGuiStyleVar[ImGuiStyleVar["WindowRounding"] = 2] = "WindowRounding";
        ImGuiStyleVar[ImGuiStyleVar["WindowBorderSize"] = 3] = "WindowBorderSize";
        ImGuiStyleVar[ImGuiStyleVar["WindowMinSize"] = 4] = "WindowMinSize";
        ImGuiStyleVar[ImGuiStyleVar["WindowTitleAlign"] = 5] = "WindowTitleAlign";
        // WindowMenuButtonPosition, // ImGuiDir WindowMenuButtonPosition
        ImGuiStyleVar[ImGuiStyleVar["ChildRounding"] = 6] = "ChildRounding";
        ImGuiStyleVar[ImGuiStyleVar["ChildBorderSize"] = 7] = "ChildBorderSize";
        ImGuiStyleVar[ImGuiStyleVar["PopupRounding"] = 8] = "PopupRounding";
        ImGuiStyleVar[ImGuiStyleVar["PopupBorderSize"] = 9] = "PopupBorderSize";
        ImGuiStyleVar[ImGuiStyleVar["FramePadding"] = 10] = "FramePadding";
        ImGuiStyleVar[ImGuiStyleVar["FrameRounding"] = 11] = "FrameRounding";
        ImGuiStyleVar[ImGuiStyleVar["FrameBorderSize"] = 12] = "FrameBorderSize";
        ImGuiStyleVar[ImGuiStyleVar["ItemSpacing"] = 13] = "ItemSpacing";
        ImGuiStyleVar[ImGuiStyleVar["ItemInnerSpacing"] = 14] = "ItemInnerSpacing";
        ImGuiStyleVar[ImGuiStyleVar["IndentSpacing"] = 15] = "IndentSpacing";
        ImGuiStyleVar[ImGuiStyleVar["ScrollbarSize"] = 16] = "ScrollbarSize";
        ImGuiStyleVar[ImGuiStyleVar["ScrollbarRounding"] = 17] = "ScrollbarRounding";
        ImGuiStyleVar[ImGuiStyleVar["GrabMinSize"] = 18] = "GrabMinSize";
        ImGuiStyleVar[ImGuiStyleVar["GrabRounding"] = 19] = "GrabRounding";
        ImGuiStyleVar[ImGuiStyleVar["TabRounding"] = 20] = "TabRounding";
        ImGuiStyleVar[ImGuiStyleVar["ButtonTextAlign"] = 21] = "ButtonTextAlign";
        ImGuiStyleVar[ImGuiStyleVar["SelectableTextAlign"] = 22] = "SelectableTextAlign";
        ImGuiStyleVar[ImGuiStyleVar["Count_"] = 23] = "Count_";
        ImGuiStyleVar[ImGuiStyleVar["COUNT"] = 23] = "COUNT";
    })(exports.StyleVar || (exports.StyleVar = {}));
    (function (ImGuiBackendFlags) {
        ImGuiBackendFlags[ImGuiBackendFlags["None"] = 0] = "None";
        ImGuiBackendFlags[ImGuiBackendFlags["HasGamepad"] = 1] = "HasGamepad";
        ImGuiBackendFlags[ImGuiBackendFlags["HasMouseCursors"] = 2] = "HasMouseCursors";
        ImGuiBackendFlags[ImGuiBackendFlags["HasSetMousePos"] = 4] = "HasSetMousePos";
        ImGuiBackendFlags[ImGuiBackendFlags["RendererHasVtxOffset"] = 8] = "RendererHasVtxOffset";
    })(exports.ImGuiBackendFlags || (exports.ImGuiBackendFlags = {}));
    (function (ImGuiColorEditFlags) {
        ImGuiColorEditFlags[ImGuiColorEditFlags["None"] = 0] = "None";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoAlpha"] = 2] = "NoAlpha";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoPicker"] = 4] = "NoPicker";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoOptions"] = 8] = "NoOptions";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoSmallPreview"] = 16] = "NoSmallPreview";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoInputs"] = 32] = "NoInputs";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoTooltip"] = 64] = "NoTooltip";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoLabel"] = 128] = "NoLabel";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoSidePreview"] = 256] = "NoSidePreview";
        ImGuiColorEditFlags[ImGuiColorEditFlags["NoDragDrop"] = 512] = "NoDragDrop";
        // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
        ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaBar"] = 65536] = "AlphaBar";
        ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreview"] = 131072] = "AlphaPreview";
        ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreviewHalf"] = 262144] = "AlphaPreviewHalf";
        ImGuiColorEditFlags[ImGuiColorEditFlags["HDR"] = 524288] = "HDR";
        ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayRGB"] = 1048576] = "DisplayRGB";
        ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayHSV"] = 2097152] = "DisplayHSV";
        ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayHex"] = 4194304] = "DisplayHex";
        ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 8388608] = "Uint8";
        ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 16777216] = "Float";
        ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 33554432] = "PickerHueBar";
        ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 67108864] = "PickerHueWheel";
        ImGuiColorEditFlags[ImGuiColorEditFlags["InputRGB"] = 134217728] = "InputRGB";
        ImGuiColorEditFlags[ImGuiColorEditFlags["InputHSV"] = 268435456] = "InputHSV";
        // Defaults Options. You can set application defaults using SetColorEditOptions(). The intent is that you probably don't want to
        // override them in most of your calls. Let the user choose via the option menu and/or call SetColorEditOptions() once during startup.
        ImGuiColorEditFlags[ImGuiColorEditFlags["_OptionsDefault"] = 177209344] = "_OptionsDefault";
        // [Internal] Masks
        ImGuiColorEditFlags[ImGuiColorEditFlags["_DisplayMask"] = 7340032] = "_DisplayMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_DataTypeMask"] = 25165824] = "_DataTypeMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_PickerMask"] = 100663296] = "_PickerMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_InputMask"] = 402653184] = "_InputMask";
    })(exports.ImGuiColorEditFlags || (exports.ImGuiColorEditFlags = {}));
    (function (ImGuiMouseCursor) {
        ImGuiMouseCursor[ImGuiMouseCursor["None"] = -1] = "None";
        ImGuiMouseCursor[ImGuiMouseCursor["Arrow"] = 0] = "Arrow";
        ImGuiMouseCursor[ImGuiMouseCursor["TextInput"] = 1] = "TextInput";
        ImGuiMouseCursor[ImGuiMouseCursor["ResizeAll"] = 2] = "ResizeAll";
        ImGuiMouseCursor[ImGuiMouseCursor["ResizeNS"] = 3] = "ResizeNS";
        ImGuiMouseCursor[ImGuiMouseCursor["ResizeEW"] = 4] = "ResizeEW";
        ImGuiMouseCursor[ImGuiMouseCursor["ResizeNESW"] = 5] = "ResizeNESW";
        ImGuiMouseCursor[ImGuiMouseCursor["ResizeNWSE"] = 6] = "ResizeNWSE";
        ImGuiMouseCursor[ImGuiMouseCursor["Hand"] = 7] = "Hand";
        ImGuiMouseCursor[ImGuiMouseCursor["Count_"] = 8] = "Count_";
        ImGuiMouseCursor[ImGuiMouseCursor["COUNT"] = 8] = "COUNT";
    })(exports.MouseCursor || (exports.MouseCursor = {}));
    (function (ImGuiCond) {
        ImGuiCond[ImGuiCond["Always"] = 1] = "Always";
        ImGuiCond[ImGuiCond["Once"] = 2] = "Once";
        ImGuiCond[ImGuiCond["FirstUseEver"] = 4] = "FirstUseEver";
        ImGuiCond[ImGuiCond["Appearing"] = 8] = "Appearing";
    })(exports.ImGuiCond || (exports.ImGuiCond = {}));
    (function (ImDrawCornerFlags) {
        ImDrawCornerFlags[ImDrawCornerFlags["TopLeft"] = 1] = "TopLeft";
        ImDrawCornerFlags[ImDrawCornerFlags["TopRight"] = 2] = "TopRight";
        ImDrawCornerFlags[ImDrawCornerFlags["BotLeft"] = 4] = "BotLeft";
        ImDrawCornerFlags[ImDrawCornerFlags["BotRight"] = 8] = "BotRight";
        ImDrawCornerFlags[ImDrawCornerFlags["Top"] = 3] = "Top";
        ImDrawCornerFlags[ImDrawCornerFlags["Bot"] = 12] = "Bot";
        ImDrawCornerFlags[ImDrawCornerFlags["Left"] = 5] = "Left";
        ImDrawCornerFlags[ImDrawCornerFlags["Right"] = 10] = "Right";
        ImDrawCornerFlags[ImDrawCornerFlags["All"] = 15] = "All";
    })(exports.wCornerFlags || (exports.wCornerFlags = {}));
    (function (ImDrawListFlags) {
        ImDrawListFlags[ImDrawListFlags["None"] = 0] = "None";
        ImDrawListFlags[ImDrawListFlags["AntiAliasedLines"] = 1] = "AntiAliasedLines";
        ImDrawListFlags[ImDrawListFlags["AntiAliasedFill"] = 2] = "AntiAliasedFill";
    })(exports.wListFlags || (exports.wListFlags = {}));
    class ImVec2 {
        constructor(x = 0.0, y = 0.0) {
            this.x = x;
            this.y = y;
        }
        Set(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        Copy(other) {
            this.x = other.x;
            this.y = other.y;
            return this;
        }
        Equals(other) {
            if (this.x !== other.x) {
                return false;
            }
            if (this.y !== other.y) {
                return false;
            }
            return true;
        }
    }
    ImVec2.ZERO = new ImVec2(0.0, 0.0);
    ImVec2.UNIT = new ImVec2(1.0, 1.0);
    ImVec2.UNIT_X = new ImVec2(1.0, 0.0);
    ImVec2.UNIT_Y = new ImVec2(0.0, 1.0);
    class ImVec4 {
        constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Set(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            return this;
        }
        Copy(other) {
            this.x = other.x;
            this.y = other.y;
            this.z = other.z;
            this.w = other.w;
            return this;
        }
        Equals(other) {
            if (this.x !== other.x) {
                return false;
            }
            if (this.y !== other.y) {
                return false;
            }
            if (this.z !== other.z) {
                return false;
            }
            if (this.w !== other.w) {
                return false;
            }
            return true;
        }
    }
    ImVec4.ZERO = new ImVec4(0.0, 0.0, 0.0, 0.0);
    ImVec4.UNIT = new ImVec4(1.0, 1.0, 1.0, 1.0);
    ImVec4.UNIT_X = new ImVec4(1.0, 0.0, 0.0, 0.0);
    ImVec4.UNIT_Y = new ImVec4(0.0, 1.0, 0.0, 0.0);
    ImVec4.UNIT_Z = new ImVec4(0.0, 0.0, 1.0, 0.0);
    ImVec4.UNIT_W = new ImVec4(0.0, 0.0, 0.0, 1.0);
    ImVec4.BLACK = new ImVec4(0.0, 0.0, 0.0, 1.0);
    ImVec4.WHITE = new ImVec4(1.0, 1.0, 1.0, 1.0);
    //-----------------------------------------------------------------------------
    // Helpers
    //-----------------------------------------------------------------------------
    // Lightweight std::vector<> like class to avoid dragging dependencies (also: windows implementation of STL with debug enabled is absurdly slow, so let's bypass it so our code runs fast in debug).
    // Our implementation does NOT call C++ constructors/destructors. This is intentional and we do not require it. Do not use this class as a straight std::vector replacement in your code!
    class ImVector extends Array {
        constructor() {
            super(...arguments);
            this.Data = this;
            // public:
            // int                         Size;
            // int                         Capacity;
            // T*                          Data;
            // typedef T                   value_type;
            // typedef value_type*         iterator;
            // typedef const value_type*   const_iterator;
            // inline ImVector()           { Size = Capacity = 0; Data = NULL; }
            // inline ~ImVector()          { if (Data) ImGui::MemFree(Data); }
            // inline bool                 empty() const                   { return Size == 0; }
            // inline int                  size() const                    { return Size; }
            // inline int                  capacity() const                { return Capacity; }
            // inline value_type&          operator[](int i)               { IM_ASSERT(i < Size); return Data[i]; }
            // inline const value_type&    operator[](int i) const         { IM_ASSERT(i < Size); return Data[i]; }
            // inline void                 clear()                         { if (Data) { Size = Capacity = 0; ImGui::MemFree(Data); Data = NULL; } }
            // inline iterator             begin()                         { return Data; }
            // inline const_iterator       begin() const                   { return Data; }
            // inline iterator             end()                           { return Data + Size; }
            // inline const_iterator       end() const                     { return Data + Size; }
            // inline value_type&          front()                         { IM_ASSERT(Size > 0); return Data[0]; }
            // inline const value_type&    front() const                   { IM_ASSERT(Size > 0); return Data[0]; }
            // inline value_type&          back()                          { IM_ASSERT(Size > 0); return Data[Size - 1]; }
            // inline const value_type&    back() const                    { IM_ASSERT(Size > 0); return Data[Size - 1]; }
            // inline void                 swap(ImVector<T>& rhs)          { int rhs_size = rhs.Size; rhs.Size = Size; Size = rhs_size; int rhs_cap = rhs.Capacity; rhs.Capacity = Capacity; Capacity = rhs_cap; value_type* rhs_data = rhs.Data; rhs.Data = Data; Data = rhs_data; }
            // inline int                  _grow_capacity(int size) const  { int new_capacity = Capacity ? (Capacity + Capacity/2) : 8; return new_capacity > size ? new_capacity : size; }
            // inline void                 resize(int new_size)            { if (new_size > Capacity) reserve(_grow_capacity(new_size)); Size = new_size; }
            // inline void                 resize(int new_size, const T& v){ if (new_size > Capacity) reserve(_grow_capacity(new_size)); if (new_size > Size) for (int n = Size; n < new_size; n++) Data[n] = v; Size = new_size; }
            // inline void                 reserve(int new_capacity)
            // {
            //     if (new_capacity <= Capacity)
            //         return;
            //     T* new_data = (value_type*)ImGui::MemAlloc((size_t)new_capacity * sizeof(T));
            //     if (Data)
            //         memcpy(new_data, Data, (size_t)Size * sizeof(T));
            //     ImGui::MemFree(Data);
            //     Data = new_data;
            //     Capacity = new_capacity;
            // }
            // inline void                 push_back(const value_type& v)  { if (Size == Capacity) reserve(_grow_capacity(Size + 1)); Data[Size++] = v; }
            // inline void                 pop_back()                      { IM_ASSERT(Size > 0); Size--; }
            // inline void                 push_front(const value_type& v) { if (Size == 0) push_back(v); else insert(Data, v); }
            // inline iterator             erase(const_iterator it)                        { IM_ASSERT(it >= Data && it < Data+Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(value_type)); Size--; return Data + off; }
            // inline iterator             erase(const_iterator it, const_iterator it_last){ IM_ASSERT(it >= Data && it < Data+Size && it_last > it && it_last <= Data+Size); const ptrdiff_t count = it_last - it; const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + count, ((size_t)Size - (size_t)off - count) * sizeof(value_type)); Size -= (int)count; return Data + off; }
            // inline iterator             erase_unsorted(const_iterator it)               { IM_ASSERT(it >= Data && it < Data+Size);  const ptrdiff_t off = it - Data; if (it < Data+Size-1) memcpy(Data + off, Data + Size - 1, sizeof(value_type)); Size--; return Data + off; }
            // inline iterator             insert(const_iterator it, const value_type& v)  { IM_ASSERT(it >= Data && it <= Data+Size); const ptrdiff_t off = it - Data; if (Size == Capacity) reserve(_grow_capacity(Size + 1)); if (off < (int)Size) memmove(Data + off + 1, Data + off, ((size_t)Size - (size_t)off) * sizeof(value_type)); Data[off] = v; Size++; return Data + off; }
            // inline bool                 contains(const value_type& v) const             { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data++ == v) return true; return false; }
        }
        get Size() { return this.length; }
        empty() { return this.length === 0; }
        clear() { this.length = 0; }
        pop_back() { return this.pop(); }
        push_back(value) { this.push(value); }
    }
    // Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
    class ImGuiTextFilter {
        // IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
        constructor(default_filter = "") {
            // [Internal]
            // struct TextRange
            // {
            //     const char* b;
            //     const char* e;
            //     TextRange() { b = e = NULL; }
            //     TextRange(const char* _b, const char* _e) { b = _b; e = _e; }
            //     const char* begin() const { return b; }
            //     const char* end() const { return e; }
            //     bool empty() const { return b == e; }
            //     char front() const { return *b; }
            //     static bool is_blank(char c) { return c == ' ' || c == '\t'; }
            //     void trim_blanks() { while (b < e && is_blank(*b)) b++; while (e > b && is_blank(*(e-1))) e--; }
            //     IMGUI_API void split(char separator, ImVector<TextRange>& out);
            // };
            // char                InputBuf[256];
            this.InputBuf = new ImStringBuffer(256);
            // ImVector<TextRange> Filters;
            // int                 CountGrep;
            this.CountGrep = 0;
            if (default_filter) {
                // ImStrncpy(InputBuf, default_filter, IM_ARRAYSIZE(InputBuf));
                this.InputBuf.buffer = default_filter;
                this.Build();
            }
            else {
                // InputBuf[0] = 0;
                this.InputBuf.buffer = "";
                this.CountGrep = 0;
            }
        }
        // IMGUI_API bool      Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f);    // Helper calling InputText+Build
        Draw(label = "Filter (inc,-exc)", width = 0.0) {
            if (width !== 0.0)
                exports.bind.PushItemWidth(width);
            const value_changed = InputText(label, this.InputBuf, IM_ARRAYSIZE(this.InputBuf));
            if (width !== 0.0)
                exports.bind.PopItemWidth();
            if (value_changed)
                this.Build();
            return value_changed;
        }
        // IMGUI_API bool      PassFilter(const char* text, const char* text_end = NULL) const;
        PassFilter(text, text_end = null) {
            // if (Filters.empty())
            //     return true;
            // if (text == NULL)
            //     text = "";
            // for (int i = 0; i != Filters.Size; i++)
            // {
            //     const TextRange& f = Filters[i];
            //     if (f.empty())
            //         continue;
            //     if (f.front() == '-')
            //     {
            //         // Subtract
            //         if (ImStristr(text, text_end, f.begin()+1, f.end()) != NULL)
            //             return false;
            //     }
            //     else
            //     {
            //         // Grep
            //         if (ImStristr(text, text_end, f.begin(), f.end()) != NULL)
            //             return true;
            //     }
            // }
            // Implicit * grep
            if (this.CountGrep === 0)
                return true;
            return false;
        }
        // IMGUI_API void      Build();
        Build() {
            // Filters.resize(0);
            // TextRange input_range(InputBuf, InputBuf+strlen(InputBuf));
            // input_range.split(',', Filters);
            this.CountGrep = 0;
            // for (int i = 0; i != Filters.Size; i++)
            // {
            //     Filters[i].trim_blanks();
            //     if (Filters[i].empty())
            //         continue;
            //     if (Filters[i].front() != '-')
            //         CountGrep += 1;
            // }
        }
        // void                Clear() { InputBuf[0] = 0; Build(); }
        Clear() { this.InputBuf.buffer = ""; this.Build(); }
        // bool                IsActive() const { return !Filters.empty(); }
        IsActive() { return false; }
    }
    // Helper: Text buffer for logging/accumulating text
    class ImGuiTextBuffer {
        constructor() {
            // ImVector<char>      Buf;
            this.Buf = "";
            // ImGuiTextBuffer()   { Buf.push_back(0); }
            // inline char         operator[](int i) { return Buf.Data[i]; }
            // const char*         begin() const { return &Buf.front(); }
            // const char*         end() const { return &Buf.back(); }      // Buf is zero-terminated, so end() will point on the zero-terminator
            // int                 size() const { return Buf.Size - 1; }
            // bool                empty() { return Buf.Size <= 1; }
            // void                clear() { Buf.clear(); Buf.push_back(0); }
            // void                reserve(int capacity) { Buf.reserve(capacity); }
            // const char*         c_str() const { return Buf.Data; }
            // IMGUI_API void      appendf(const char* fmt, ...) IM_FMTARGS(2);
            // IMGUI_API void      appendfv(const char* fmt, va_list args) IM_FMTLIST(2);
        }
        begin() { return this.Buf; }
        size() { return this.Buf.length; }
        clear() { this.Buf = ""; }
        append(text) { this.Buf += text; }
    }
    // Helper: Simple Key->value storage
    // Typically you don't have to worry about this since a storage is held within each Window.
    // We use it to e.g. store collapse state for a tree (Int 0/1), store color edit options.
    // This is optimized for efficient reading (dichotomy into a contiguous buffer), rare writing (typically tied to user interactions)
    // You can use it as custom user storage for temporary values. Declare your own storage if, for example:
    // - You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
    // - You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
    // Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
    class ImGuiStorage {
    }
    // Helpers macros to generate 32-bits encoded colors
    const IM_COL32_R_SHIFT =  0;
    const IM_COL32_G_SHIFT = 8;
    const IM_COL32_B_SHIFT =  16;
    const IM_COL32_A_SHIFT = 24;
    const IM_COL32_A_MASK = 0xFF000000;
    function IM_COL32(R, G, B, A = 255) {
        return ((A << IM_COL32_A_SHIFT) | (B << IM_COL32_B_SHIFT) | (G << IM_COL32_G_SHIFT) | (R << IM_COL32_R_SHIFT)) >>> 0;
    }
    const IM_COL32_WHITE = IM_COL32(255, 255, 255, 255); // Opaque white = 0xFFFFFFFF
    const IM_COL32_BLACK = IM_COL32(0, 0, 0, 255); // Opaque black
    const IM_COL32_BLACK_TRANS = IM_COL32(0, 0, 0, 0); // Transparent black = 0x00000000
    // ImColor() helper to implicity converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
    // Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
    // **Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
    // **None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
    class ImColor {
        constructor(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
            // ImVec4              Value;
            this.Value = new ImVec4();
            if (typeof (r) === "number") {
                if (r > 255 && g === 0.0 && b === 0.0 && a === 1.0) {
                    this.Value.x = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_R_SHIFT) & 0xFF) / 255));
                    this.Value.y = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_G_SHIFT) & 0xFF) / 255));
                    this.Value.z = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_B_SHIFT) & 0xFF) / 255));
                    this.Value.w = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_A_SHIFT) & 0xFF) / 255));
                }
                else if (r <= 1.0 && g <= 1.0 && b <= 1.0 && a <= 1.0) {
                    this.Value.x = Math.max(0.0, r);
                    this.Value.y = Math.max(0.0, g);
                    this.Value.z = Math.max(0.0, b);
                    this.Value.w = Math.max(0.0, a);
                }
                else {
                    this.Value.x = Math.max(0.0, Math.min(1.0, r / 255));
                    this.Value.y = Math.max(0.0, Math.min(1.0, g / 255));
                    this.Value.z = Math.max(0.0, Math.min(1.0, b / 255));
                    if (a <= 1.0) {
                        this.Value.w = Math.max(0.0, a);
                    }
                    else {
                        this.Value.w = Math.max(0.0, Math.min(1.0, a / 255));
                    }
                }
            }
            else {
                this.Value.Copy(r);
            }
        }
        // inline operator ImU32() const                                   { return ImGui::ColorConvertFloat4ToU32(Value); }
        toImU32() { return ColorConvertFloat4ToU32(this.Value); }
        // inline operator ImVec4() const                                  { return Value; }
        toImVec4() { return this.Value; }
        // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
        // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
        SetHSV(h, s, v, a = 1.0) {
            const ref_r = [this.Value.x];
            const ref_g = [this.Value.y];
            const ref_b = [this.Value.z];
            ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
            this.Value.x = ref_r[0];
            this.Value.y = ref_g[0];
            this.Value.z = ref_b[0];
            this.Value.w = a;
        }
        // static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r,g,b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r,g,b,a); }
        static HSV(h, s, v, a = 1.0) {
            const color = new ImColor();
            color.SetHSV(h, s, v, a);
            return color;
        }
    }
    const ImGuiInputTextDefaultSize = 128;
    // Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
    class ImGuiInputTextCallbackData {
        constructor(native, UserData) {
            this.native = native;
            this.UserData = UserData;
        }
        // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
        get EventFlag() { return this.native.EventFlag; }
        // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
        get Flags() { return this.native.Flags; }
        // void*               UserData;       // What user passed to InputText()      // Read-only
        // public get UserData(): any { return this.native.UserData; }
        // CharFilter event:
        // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
        get EventChar() { return this.native.EventChar; }
        set EventChar(value) { this.native.EventChar = value; }
        // Completion,History,Always events:
        // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
        // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
        get EventKey() { return this.native.EventKey; }
        // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
        get Buf() { return this.native.Buf; }
        set Buf(value) { this.native.Buf = value; }
        // int                 BufTextLen;     // Current text length in bytes         // Read-write
        get BufTextLen() { return this.native.BufTextLen; }
        set BufTextLen(value) { this.native.BufTextLen = value; }
        // int                 BufSize;        // Maximum text length in bytes         // Read-only
        get BufSize() { return this.native.BufSize; }
        // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
        set BufDirty(value) { this.native.BufDirty = value; }
        // int                 CursorPos;      //                                      // Read-write
        get CursorPos() { return this.native.CursorPos; }
        set CursorPos(value) { this.native.CursorPos = value; }
        // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
        get SelectionStart() { return this.native.SelectionStart; }
        set SelectionStart(value) { this.native.SelectionStart = value; }
        // int                 SelectionEnd;   //                                      // Read-write
        get SelectionEnd() { return this.native.SelectionEnd; }
        set SelectionEnd(value) { this.native.SelectionEnd = value; }
        // NB: Helper functions for text manipulation. Calling those function loses selection.
        // IMGUI_API void    DeleteChars(int pos, int bytes_count);
        DeleteChars(pos, bytes_count) { return this.native.DeleteChars(pos, bytes_count); }
        // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
        InsertChars(pos, text, text_end = null) { return this.native.InsertChars(pos, text_end !== null ? text.substring(0, text_end) : text); }
        // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
        HasSelection() { return this.native.HasSelection(); }
    }
    // Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
    // NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
    class ImGuiSizeCallbackData {
        constructor(native, UserData) {
            this.native = native;
            this.UserData = UserData;
        }
        get Pos() { return this.native.Pos; }
        get CurrentSize() { return this.native.CurrentSize; }
        get DesiredSize() { return this.native.DesiredSize; }
    }
    class ImGuiListClipper {
        // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
        // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
        // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
        // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
        constructor(items_count = -1, items_height = -1.0) {
            this._native = null;
            this.items_count = -1;
            this.items_height = -1.0;
            this.items_count = items_count;
            this.items_height = items_height;
        }
        get native() {
            return this._native || (this._native = new exports.bind.ImGuiListClipper(this.items_count, this.items_height));
        }
        get StartPosY() { return this.native.StartPosY; }
        get ItemsHeight() { return this.native.ItemsHeight; }
        get ItemsCount() { return this.native.ItemsCount; }
        get StepNo() { return this.native.StepNo; }
        get DisplayStart() { return this.native.DisplayStart; }
        get DisplayEnd() { return this.native.DisplayEnd; }
        // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
        delete() {
            if (this._native !== null) {
                this._native.delete();
                this._native = null;
            }
        }
        // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
        Step() {
            const busy = this.native.Step();
            if (!busy) {
                this.delete();
            }
            return busy;
        }
        // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
        Begin(items_count, items_height = -1.0) {
            this.items_count = items_count;
            this.items_height = items_height;
            this.native.Begin(items_count, items_height);
        }
        // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
        End() {
            this.native.End();
            this.delete();
        }
    }
    // Special Draw callback value to request renderer back-end to reset the graphics/render state.
    // The renderer back-end needs to handle this special value, otherwise it will crash trying to call a function at this address.
    // This is useful for example if you submitted callbacks which you know have altered the render state and you want it to be restored.
    // It is not done by default because they are many perfectly useful way of altering render state for imgui contents (e.g. changing shader/blending settings before an Image call).
    const ImDrawCallback_ResetRenderState = -1;
    // Typically, 1 command = 1 GPU draw call (unless command is a callback)
    // Pre 1.71 back-ends will typically ignore the VtxOffset/IdxOffset fields. When 'io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset'
    // is enabled, those fields allow us to render meshes larger than 64K vertices while keeping 16-bits indices.
    class ImDrawCmd {
        constructor(native) {
            this.native = native;
            // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
            this.UserCallback = null; // TODO
            // void*           UserCallbackData;       // The draw callback code can access this.
            this.UserCallbackData = null; // TODO
        }
        // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
        get ElemCount() { return this.native.ElemCount; }
        // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
        get ClipRect() { return this.native.ClipRect; }
        // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
        get TextureId() {
            return ImGuiContext.getTexture(this.native.TextureId);
        }
        // unsigned int    VtxOffset;              // Start offset in vertex buffer. Pre-1.71 or without ImGuiBackendFlags_RendererHasVtxOffset: always 0. With ImGuiBackendFlags_RendererHasVtxOffset: may be >0 to support meshes larger than 64K vertices with 16-bits indices.
        get VtxOffset() { return this.native.VtxOffset; }
        // unsigned int    IdxOffset;              // Start offset in index buffer. Always equal to sum of ElemCount drawn so far.
        get IdxOffset() { return this.native.IdxOffset; }
    }
    // Vertex index 
    // (to allow large meshes with 16-bits indices: set 'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset' and handle ImDrawCmd::VtxOffset in the renderer back-end)
    // (to use 32-bits indices: override with '#define ImDrawIdx unsigned int' in imconfig.h)
    // #ifndef ImDrawIdx
    // typedef unsigned short ImDrawIdx;
    // #endif
    const ImDrawIdxSize = 2; // bind.ImDrawIdxSize;
    // Vertex layout
    // #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
    const ImDrawVertSize = 20; // bind.ImDrawVertSize;
    const ImDrawVertPosOffset = 0; // bind.ImDrawVertPosOffset;
    const ImDrawVertUVOffset = 8; // bind.ImDrawVertUVOffset;
    const ImDrawVertColOffset = 16; // bind.ImDrawVertColOffset;
    class ImDrawVert {
        constructor(buffer, byteOffset = 0) {
            this.pos = new Float32Array(buffer, byteOffset + exports.bind.ImDrawVertPosOffset, 2);
            this.uv = new Float32Array(buffer, byteOffset + exports.bind.ImDrawVertUVOffset, 2);
            this.col = new Uint32Array(buffer, byteOffset + exports.bind.ImDrawVertColOffset, 1);
        }
    }
    // #else
    // You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
    // The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
    // The type has to be described within the macro (you can either declare the struct or use a typedef)
    // NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
    // IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
    // #endif
    // Draw channels are used by the Columns API to "split" the render list into different channels while building, so items of each column can be batched together.
    // You can also use them to simulate drawing layers and submit primitives in a different order than how they will be rendered.
    class ImDrawChannel {
    }
    class ImDrawListSharedData {
        constructor(native) {
            this.native = native;
        }
    }
    // Draw command list
    // This is the low-level list of polygons that ImGui functions are filling. At the end of the frame, all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
    // Each ImGui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to access the current window draw list and draw custom primitives.
    // You can interleave normal ImGui:: calls and adding primitives to the current draw list.
    // All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), however you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
    // Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
    class ImDrawList {
        constructor(native) {
            this.native = native;
        }
        IterateDrawCmds(callback) {
            this.native.IterateDrawCmds((draw_cmd, ElemStart) => {
                callback(new ImDrawCmd(draw_cmd), ElemStart);
            });
        }
        // This is what you have to render
        // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
        // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
        get IdxBuffer() { return this.native.IdxBuffer; }
        // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
        get VtxBuffer() { return this.native.VtxBuffer; }
        // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
        get Flags() { return this.native.Flags; }
        set Flags(value) { this.native.Flags = value; }
        // [Internal, used while building lists]
        // const ImDrawListSharedData* _Data;          // Pointer to shared draw data (you can use ImGui::GetDrawListSharedData() to get the one from current ImGui context)
        // const char*             _OwnerName;         // Pointer to owner window's name for debugging
        // unsigned int            _VtxCurrentIdx;     // [Internal] == VtxBuffer.Size
        // ImDrawVert*             _VtxWritePtr;       // [Internal] point within VtxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
        // ImDrawIdx*              _IdxWritePtr;       // [Internal] point within IdxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
        // ImVector<ImVec4>        _ClipRectStack;     // [Internal]
        // ImVector<ImTextureID>   _TextureIdStack;    // [Internal]
        // ImVector<ImVec2>        _Path;              // [Internal] current path building
        // int                     _ChannelsCurrent;   // [Internal] current channel number (0)
        // int                     _ChannelsCount;     // [Internal] number of active channels (1+)
        // ImVector<ImDrawChannel> _Channels;          // [Internal] draw channels for columns API (not resized down so _ChannelsCount may be smaller than _Channels.Size)
        // ImDrawList(const ImDrawListSharedData* shared_data) { _Data = shared_data; _OwnerName = NULL; Clear(); }
        // ~ImDrawList() { ClearFreeMemory(); }
        // IMGUI_API void  PushClipRect(ImVec2 clip_rect_min, ImVec2 clip_rect_max, bool intersect_with_current_clip_rect = false);  // Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)
        PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect = false) {
            this.native.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
        }
        // IMGUI_API void  PushClipRectFullScreen();
        PushClipRectFullScreen() { this.native.PushClipRectFullScreen(); }
        // IMGUI_API void  PopClipRect();
        PopClipRect() { this.native.PopClipRect(); }
        // IMGUI_API void  PushTextureID(ImTextureID texture_id);
        PushTextureID(texture_id) {
            this.native.PushTextureID(ImGuiContext.setTexture(texture_id));
        }
        // IMGUI_API void  PopTextureID();
        PopTextureID() { this.native.PopTextureID(); }
        // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
        GetClipRectMin(out = new ImVec2()) {
            return this.native.GetClipRectMin(out);
        }
        // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }
        GetClipRectMax(out = new ImVec2()) {
            return this.native.GetClipRectMax(out);
        }
        // Primitives
        // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
        AddLine(a, b, col, thickness = 1.0) {
            this.native.AddLine(a, b, col, thickness);
        }
        // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
        AddRect(a, b, col, rounding = 0.0, rounding_corners_flags = exports.wCornerFlags.All, thickness = 1.0) {
            this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
        }
        // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
        AddRectFilled(a, b, col, rounding = 0.0, rounding_corners_flags = exports.wCornerFlags.All) {
            this.native.AddRectFilled(a, b, col, rounding, rounding_corners_flags);
        }
        // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
        AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left) {
            this.native.AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
        }
        // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
        AddQuad(a, b, c, d, col, thickness = 1.0) {
            this.native.AddQuad(a, b, c, d, col, thickness);
        }
        // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
        AddQuadFilled(a, b, c, d, col) {
            this.native.AddQuadFilled(a, b, c, d, col);
        }
        // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
        AddTriangle(a, b, c, col, thickness = 1.0) {
            this.native.AddTriangle(a, b, c, col, thickness);
        }
        // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
        AddTriangleFilled(a, b, c, col) {
            this.native.AddTriangleFilled(a, b, c, col);
        }
        // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
        AddCircle(centre, radius, col, num_segments = 12, thickness = 1.0) {
            this.native.AddCircle(centre, radius, col, num_segments, thickness);
        }
        // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
        AddCircleFilled(centre, radius, col, num_segments = 12) {
            this.native.AddCircleFilled(centre, radius, col, num_segments);
        }
        AddText(...args) {
            if (args[0] instanceof ImFont) {
                const font = args[0];
                const font_size = args[1];
                const pos = args[2];
                const col = args[3];
                const text_begin = args[4];
                const text_end = args[5] || null;
                const wrap_width = args[6] = 0.0;
                const cpu_fine_clip_rect = args[7] || null;
                this.native.AddText_B(font.native, font_size, pos, col, text_end !== null ? text_begin.substring(0, text_end) : text_begin, wrap_width, cpu_fine_clip_rect);
            }
            else {
                const pos = args[0];
                const col = args[1];
                const text_begin = args[2];
                const text_end = args[3] || null;
                this.native.AddText_A(pos, col, text_end !== null ? text_begin.substring(0, text_end) : text_begin);
            }
        }
        // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
        AddImage(user_texture_id, a, b, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT, col = 0xFFFFFFFF) {
            this.native.AddImage(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col);
        }
        // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
        AddImageQuad(user_texture_id, a, b, c, d, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT_X, uv_c = ImVec2.UNIT, uv_d = ImVec2.UNIT_Y, col = 0xFFFFFFFF) {
            this.native.AddImageQuad(ImGuiContext.setTexture(user_texture_id), a, b, c, d, uv_a, uv_b, uv_c, uv_d, col);
        }
        // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
        AddImageRounded(user_texture_id, a, b, uv_a, uv_b, col, rounding, rounding_corners = exports.wCornerFlags.All) {
            this.native.AddImageRounded(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col, rounding, rounding_corners);
        }
        // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
        AddPolyline(points, num_points, col, closed, thickness) {
            this.native.AddPolyline(points, num_points, col, closed, thickness);
        }
        // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
        AddConvexPolyFilled(points, num_points, col) {
            this.native.AddConvexPolyFilled(points, num_points, col);
        }
        // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
        AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness = 1.0, num_segments = 0) {
            this.native.AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness, num_segments);
        }
        // Stateful path API, add points then finish with PathFill() or PathStroke()
        // inline    void  PathClear()                                                 { _Path.resize(0); }
        PathClear() { this.native.PathClear(); }
        // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
        PathLineTo(pos) { this.native.PathLineTo(pos); }
        // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
        PathLineToMergeDuplicate(pos) { this.native.PathLineToMergeDuplicate(pos); }
        // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
        PathFillConvex(col) { this.native.PathFillConvex(col); }
        // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
        PathStroke(col, closed, thickness = 1.0) { this.native.PathStroke(col, closed, thickness); }
        // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
        PathArcTo(centre, radius, a_min, a_max, num_segments = 10) { this.native.PathArcTo(centre, radius, a_min, a_max, num_segments); }
        // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
        PathArcToFast(centre, radius, a_min_of_12, a_max_of_12) { this.native.PathArcToFast(centre, radius, a_min_of_12, a_max_of_12); }
        // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
        PathBezierCurveTo(p1, p2, p3, num_segments = 0) { this.native.PathBezierCurveTo(p1, p2, p3, num_segments); }
        // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);
        PathRect(rect_min, rect_max, rounding = 0.0, rounding_corners_flags = exports.wCornerFlags.All) { this.native.PathRect(rect_min, rect_max, rounding, rounding_corners_flags); }
        // Channels
        // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
        // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
        // IMGUI_API void  ChannelsSplit(int channels_count);
        ChannelsSplit(channels_count) { this.native.ChannelsSplit(channels_count); }
        // IMGUI_API void  ChannelsMerge();
        ChannelsMerge() { this.native.ChannelsMerge(); }
        // IMGUI_API void  ChannelsSetCurrent(int channel_index);
        ChannelsSetCurrent(channel_index) { this.native.ChannelsSetCurrent(channel_index); }
        // Advanced
        // IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
        AddCallback(callback, callback_data) {
            const _callback = (parent_list, draw_cmd) => {
                callback(new ImDrawList(parent_list), new ImDrawCmd(draw_cmd));
            };
            this.native.AddCallback(_callback, callback_data);
        }
        // IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
        AddDrawCmd() { this.native.AddDrawCmd(); }
        // Internal helpers
        // NB: all primitives needs to be reserved via PrimReserve() beforehand!
        // IMGUI_API void  Clear();
        Clear() { this.native.Clear(); }
        // IMGUI_API void  ClearFreeMemory();
        ClearFreeMemory() { this.native.ClearFreeMemory(); }
        // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
        PrimReserve(idx_count, vtx_count) { this.native.PrimReserve(idx_count, vtx_count); }
        // IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
        PrimRect(a, b, col) { this.native.PrimRect(a, b, col); }
        // IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
        PrimRectUV(a, b, uv_a, uv_b, col) { this.native.PrimRectUV(a, b, uv_a, uv_b, col); }
        // IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
        PrimQuadUV(a, b, c, d, uv_a, uv_b, uv_c, uv_d, col) { this.native.PrimQuadUV(a, b, c, d, uv_a, uv_b, uv_c, uv_d, col); }
        // inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col){ _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
        PrimWriteVtx(pos, uv, col) { this.native.PrimWriteVtx(pos, uv, col); }
        // inline    void  PrimWriteIdx(ImDrawIdx idx)                                 { *_IdxWritePtr = idx; _IdxWritePtr++; }
        PrimWriteIdx(idx) { this.native.PrimWriteIdx(idx); }
        // inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)     { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); }
        PrimVtx(pos, uv, col) { this.native.PrimVtx(pos, uv, col); }
        // IMGUI_API void  UpdateClipRect();
        UpdateClipRect() { this.native.UpdateClipRect(); }
        // IMGUI_API void  UpdateTextureID();
        UpdateTextureID() { this.native.UpdateTextureID(); }
    }
    // All draw data to render an ImGui frame
    class ImDrawData {
        constructor(native) {
            this.native = native;
        }
        IterateDrawLists(callback) {
            this.native.IterateDrawLists((draw_list) => {
                callback(new ImDrawList(draw_list));
            });
        }
        // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
        get Valid() { return this.native.Valid; }
        // ImDrawList**    CmdLists;
        // int             CmdListsCount;
        get CmdListsCount() { return this.native.CmdListsCount; }
        // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
        get TotalIdxCount() { return this.native.TotalIdxCount; }
        // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
        get TotalVtxCount() { return this.native.TotalVtxCount; }
        // ImVec2          DisplayPos;             // Upper-left position of the viewport to render (== upper-left of the orthogonal projection matrix to use)
        get DisplayPos() { return this.native.DisplayPos; }
        // ImVec2          DisplaySize;            // Size of the viewport to render (== io.DisplaySize for the main viewport) (DisplayPos + DisplaySize == lower-right of the orthogonal projection matrix to use)
        get DisplaySize() { return this.native.DisplaySize; }
        // ImVec2          FramebufferScale;       // Amount of pixels for each unit of DisplaySize. Based on io.DisplayFramebufferScale. Generally (1,1) on normal display, (2,2) on OSX with Retina display.
        get FramebufferScale() { return this.native.FramebufferScale; }
        // Functions
        // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
        // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
        DeIndexAllBuffers() { this.native.DeIndexAllBuffers(); }
        // IMGUI_API void ScaleClipRects(const ImVec2& fb_scale);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
        ScaleClipRects(fb_scale) {
            this.native.ScaleClipRects(fb_scale);
        }
    }
    class script_ImFontConfig {
        constructor() {
            // void*           FontData;                   //          // TTF/OTF data
            // int             FontDataSize;               //          // TTF/OTF data size
            this.FontData = null;
            // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
            this.FontDataOwnedByAtlas = true;
            // int             FontNo;                     // 0        // Index of font within TTF/OTF file
            this.FontNo = 0;
            // float           SizePixels;                 //          // Size in pixels for rasterizer.
            this.SizePixels = 0;
            // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
            this.OversampleH = 3;
            this.OversampleV = 1;
            // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
            this.PixelSnapH = false;
            // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
            this.GlyphExtraSpacing = new ImVec2(0, 0);
            // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
            this.GlyphOffset = new ImVec2(0, 0);
            // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
            this.GlyphRanges = null;
            // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
            this.GlyphMinAdvanceX = 0;
            // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
            this.GlyphMaxAdvanceX = Number.MAX_VALUE;
            // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
            this.MergeMode = false;
            // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
            this.RasterizerFlags = 0;
            // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
            this.RasterizerMultiply = 1.0;
            // [Internal]
            // char            Name[32];                               // Name (strictly to ease debugging)
            this.Name = "";
            // ImFont*         DstFont;
            this.DstFont = null;
            // IMGUI_API ImFontConfig();
        }
    }
    class ImFontConfig {
        constructor(internal = new script_ImFontConfig()) {
            this.internal = internal;
        }
        // void*           FontData;                   //          // TTF/OTF data
        // int             FontDataSize;               //          // TTF/OTF data size
        get FontData() { return this.internal.FontData; }
        // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
        get FontDataOwnedByAtlas() { return this.internal.FontDataOwnedByAtlas; }
        // int             FontNo;                     // 0        // Index of font within TTF/OTF file
        get FontNo() { return this.internal.FontNo; }
        // float           SizePixels;                 //          // Size in pixels for rasterizer.
        get SizePixels() { return this.internal.SizePixels; }
        // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
        get OversampleH() { return this.internal.OversampleH; }
        get OversampleV() { return this.internal.OversampleV; }
        // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
        get PixelSnapH() { return this.internal.PixelSnapH; }
        // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
        get GlyphExtraSpacing() { return this.internal.GlyphExtraSpacing; }
        // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
        get GlyphOffset() { return this.internal.GlyphOffset; }
        // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
        get GlyphRanges() { return this.internal.GlyphRanges; }
        // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
        get GlyphMinAdvanceX() { return this.internal.GlyphMinAdvanceX; }
        // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
        get GlyphMaxAdvanceX() { return this.internal.GlyphMaxAdvanceX; }
        // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
        get MergeMode() { return this.internal.MergeMode; }
        // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
        get RasterizerFlags() { return this.internal.RasterizerFlags; }
        // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
        get RasterizerMultiply() { return this.internal.RasterizerMultiply; }
        // [Internal]
        // char            Name[32];                               // Name (strictly to ease debugging)
        get Name() { return this.internal.Name; }
        set Name(value) { this.internal.Name = value; }
        // ImFont*         DstFont;
        get DstFont() {
            const font = this.internal.DstFont;
            return font && new ImFont(font);
        }
    }
    // struct ImFontGlyph
    class script_ImFontGlyph {
        constructor() {
            // ImWchar         Codepoint;          // 0x0000..0xFFFF
            this.Codepoint = 0;
            // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
            this.AdvanceX = 0.0;
            // float           X0, Y0, X1, Y1;     // Glyph corners
            this.X0 = 0.0;
            this.Y0 = 0.0;
            this.X1 = 1.0;
            this.Y1 = 1.0;
            // float           U0, V0, U1, V1;     // Texture coordinates
            this.U0 = 0.0;
            this.V0 = 0.0;
            this.U1 = 1.0;
            this.V1 = 1.0;
        }
    }
    class ImFontGlyph {
        constructor(internal = new script_ImFontGlyph()) {
            this.internal = internal;
        }
        // ImWchar         Codepoint;          // 0x0000..0xFFFF
        get Codepoint() { return this.internal.Codepoint; }
        // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
        get AdvanceX() { return this.internal.AdvanceX; }
        ;
        // float           X0, Y0, X1, Y1;     // Glyph corners
        get X0() { return this.internal.X0; }
        ;
        get Y0() { return this.internal.Y0; }
        ;
        get X1() { return this.internal.X1; }
        ;
        get Y1() { return this.internal.Y1; }
        ;
        // float           U0, V0, U1, V1;     // Texture coordinates
        get U0() { return this.internal.U0; }
        ;
        get V0() { return this.internal.V0; }
        ;
        get U1() { return this.internal.U1; }
        ;
        get V1() { return this.internal.V1; }
        ;
    }
    (function (ImFontAtlasFlags) {
        ImFontAtlasFlags[ImFontAtlasFlags["None"] = 0] = "None";
        ImFontAtlasFlags[ImFontAtlasFlags["NoPowerOfTwoHeight"] = 1] = "NoPowerOfTwoHeight";
        ImFontAtlasFlags[ImFontAtlasFlags["NoMouseCursors"] = 2] = "NoMouseCursors";
    })(exports.ImFontAtlasFlags || (exports.ImFontAtlasFlags = {}));
    // Load and rasterize multiple TTF/OTF fonts into a same texture.
    // Sharing a texture for multiple fonts allows us to reduce the number of draw calls during rendering.
    // We also add custom graphic data into the texture that serves for ImGui.
    //  1. (Optional) Call AddFont*** functions. If you don't call any, the default font will be loaded for you.
    //  2. Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
    //  3. Upload the pixels data into a texture within your graphics system.
    //  4. Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture. This value will be passed back to you during rendering to identify the texture.
    // IMPORTANT: If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the ImFont is build (when calling GetTextData*** or Build()). We only copy the pointer, not the data.
    class ImFontAtlas {
        constructor(native) {
            this.native = native;
        }
        // IMGUI_API ImFontAtlas();
        // IMGUI_API ~ImFontAtlas();
        // IMGUI_API ImFont*           AddFont(const ImFontConfig* font_cfg);
        // IMGUI_API ImFont*           AddFontDefault(const ImFontConfig* font_cfg = NULL);
        AddFontDefault(font_cfg = null) {
            return new ImFont(this.native.AddFontDefault(font_cfg));
        }
        // IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
        // IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after Build(). Set font_cfg->FontDataOwnedByAtlas to false to keep ownership.
        AddFontFromMemoryTTF(data, size_pixels, font_cfg = null, glyph_ranges = null) {
            return new ImFont(this.native.AddFontFromMemoryTTF(new Uint8Array(data), size_pixels, font_cfg && font_cfg.internal, glyph_ranges));
        }
        // IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
        // IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
        // IMGUI_API void              ClearTexData();             // Clear the CPU-side texture data. Saves RAM once the texture has been copied to graphics memory.
        ClearTexData() { this.native.ClearTexData(); }
        // IMGUI_API void              ClearInputData();           // Clear the input TTF data (inc sizes, glyph ranges)
        ClearInputData() { this.native.ClearInputData(); }
        // IMGUI_API void              ClearFonts();               // Clear the ImGui-side font data (glyphs storage, UV coordinates)
        ClearFonts() { this.native.ClearFonts(); }
        // IMGUI_API void              Clear();                    // Clear all
        Clear() { this.native.Clear(); }
        // Build atlas, retrieve pixel data.
        // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
        // RGBA32 format is provided for convenience and compatibility, but note that unless you use CustomRect to draw color data, the RGB pixels emitted from Fonts will all be white (~75% of waste).
        // Pitch = Width * BytesPerPixels
        // IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
        Build() { return this.native.Build(); }
        // IMGUI_API bool              IsBuilt()                   { return Fonts.Size > 0 && (TexPixelsAlpha8 != NULL || TexPixelsRGBA32 != NULL); }
        IsBuilt() { return this.native.IsBuilt(); }
        // IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
        GetTexDataAsAlpha8() {
            return this.native.GetTexDataAsAlpha8();
        }
        // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
        GetTexDataAsRGBA32() {
            return this.native.GetTexDataAsRGBA32();
        }
        // void                        SetTexID(ImTextureID id)    { TexID = id; }
        SetTexID(id) { this.TexID = id; }
        //-------------------------------------------
        // Glyph Ranges
        //-------------------------------------------
        // Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
        // NB: Make sure that your string are UTF-8 and NOT in your local code page. In C++11, you can create UTF-8 string literal using the u8"Hello world" syntax. See FAQ for details.
        // IMGUI_API const ImWchar*    GetGlyphRangesDefault();    // Basic Latin, Extended Latin
        GetGlyphRangesDefault() { return this.native.GetGlyphRangesDefault(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesKorean();     // Default + Korean characters
        GetGlyphRangesKorean() { return this.native.GetGlyphRangesKorean(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesJapanese();   // Default + Hiragana, Katakana, Half-Width, Selection of 1946 Ideographs
        GetGlyphRangesJapanese() { return this.native.GetGlyphRangesJapanese(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesChineseFull();            // Default + Half-Width + Japanese Hiragana/Katakana + full set of about 21000 CJK Unified Ideographs
        GetGlyphRangesChineseFull() { return this.native.GetGlyphRangesChineseFull(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesChineseSimplifiedCommon();// Default + Half-Width + Japanese Hiragana/Katakana + set of 2500 CJK Unified Ideographs for common simplified Chinese
        GetGlyphRangesChineseSimplifiedCommon() { return this.native.GetGlyphRangesChineseSimplifiedCommon(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();   // Default + about 400 Cyrillic characters
        GetGlyphRangesCyrillic() { return this.native.GetGlyphRangesCyrillic(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesThai();       // Default + Thai characters
        GetGlyphRangesThai() { return this.native.GetGlyphRangesThai(); }
        // IMGUI_API const ImWchar*    GetGlyphRangesVietnamese();       // Default + Vietnamese characters
        GetGlyphRangesVietnamese() { return this.native.GetGlyphRangesVietnamese(); }
        // Helpers to build glyph ranges from text data. Feed your application strings/characters to it then call BuildRanges().
        // struct GlyphRangesBuilder
        // {
        //     ImVector<unsigned char> UsedChars;  // Store 1-bit per Unicode code point (0=unused, 1=used)
        //     GlyphRangesBuilder()                { UsedChars.resize(0x10000 / 8); memset(UsedChars.Data, 0, 0x10000 / 8); }
        //     bool           GetBit(int n) const  { return (UsedChars[n >> 3] & (1 << (n & 7))) != 0; }
        //     void           SetBit(int n)        { UsedChars[n >> 3] |= 1 << (n & 7); }  // Set bit 'c' in the array
        //     void           AddChar(ImWchar c)   { SetBit(c); }                          // Add character
        //     IMGUI_API void AddText(const char* text, const char* text_end = NULL);      // Add string (each character of the UTF-8 string are added)
        //     IMGUI_API void AddRanges(const ImWchar* ranges);                            // Add ranges, e.g. builder.AddRanges(ImFontAtlas::GetGlyphRangesDefault) to force add all of ASCII/Latin+Ext
        //     IMGUI_API void BuildRanges(ImVector<ImWchar>* out_ranges);                  // Output new ranges
        // };
        //-------------------------------------------
        // Custom Rectangles/Glyphs API
        //-------------------------------------------
        // You can request arbitrary rectangles to be packed into the atlas, for your own purposes. After calling Build(), you can query the rectangle position and render your pixels.
        // You can also request your rectangles to be mapped as font glyph (given a font + Unicode point), so you can render e.g. custom colorful icons and use them as regular glyphs.
        // struct CustomRect
        // {
        //     unsigned int    ID;             // Input    // User ID. Use <0x10000 to map into a font glyph, >=0x10000 for other/internal/custom texture data.
        //     unsigned short  Width, Height;  // Input    // Desired rectangle dimension
        //     unsigned short  X, Y;           // Output   // Packed position in Atlas
        //     float           GlyphAdvanceX;  // Input    // For custom font glyphs only (ID<0x10000): glyph xadvance
        //     ImVec2          GlyphOffset;    // Input    // For custom font glyphs only (ID<0x10000): glyph display offset
        //     ImFont*         Font;           // Input    // For custom font glyphs only (ID<0x10000): target font
        //     CustomRect()            { ID = 0xFFFFFFFF; Width = Height = 0; X = Y = 0xFFFF; GlyphAdvanceX = 0.0f; GlyphOffset = ImVec2(0,0); Font = NULL; }
        //     bool IsPacked() const   { return X != 0xFFFF; }
        // };
        // IMGUI_API int       AddCustomRectRegular(unsigned int id, int width, int height);                                                                   // Id needs to be >= 0x10000. Id >= 0x80000000 are reserved for ImGui and ImDrawList
        // IMGUI_API int       AddCustomRectFontGlyph(ImFont* font, ImWchar id, int width, int height, float advance_x, const ImVec2& offset = ImVec2(0,0));   // Id needs to be < 0x10000 to register a rectangle to map into a specific font.
        // IMGUI_API void      CalcCustomRectUV(const CustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max);
        // const CustomRect*   GetCustomRectByIndex(int index) const { if (index < 0) return NULL; return &CustomRects[index]; }
        //-------------------------------------------
        // Members
        //-------------------------------------------
        // bool                        Locked;             // Marked as Locked by ImGui::NewFrame() so attempt to modify the atlas will assert.
        get Locked() { return this.native.Locked; }
        set Locked(value) { this.native.Locked = value; }
        // ImFontAtlasFlags            Flags;              // Build flags (see ImFontAtlasFlags_)
        get Flags() { return this.native.Flags; }
        set Flags(value) { this.native.Flags = value; }
        // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
        get TexID() {
            return ImGuiContext.getTexture(this.native.TexID);
        }
        set TexID(value) {
            this.native.TexID = ImGuiContext.setTexture(value);
        }
        // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
        get TexDesiredWidth() { return this.native.TexDesiredWidth; }
        set TexDesiredWidth(value) { this.native.TexDesiredWidth = value; }
        // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.
        get TexGlyphPadding() { return this.native.TexGlyphPadding; }
        set TexGlyphPadding(value) { this.native.TexGlyphPadding = value; }
        // [Internal]
        // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
        // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
        // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
        // int                         TexWidth;           // Texture width calculated during Build().
        get TexWidth() { return this.native.TexWidth; }
        // int                         TexHeight;          // Texture height calculated during Build().
        get TexHeight() { return this.native.TexHeight; }
        // ImVec2                      TexUvScale;         // = (1.0f/TexWidth, 1.0f/TexHeight)
        get TexUvScale() { return this.native.TexUvScale; }
        // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
        get TexUvWhitePixel() { return this.native.TexUvWhitePixel; }
        // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
        get Fonts() {
            const fonts = new ImVector();
            this.native.IterateFonts((font) => {
                fonts.push(new ImFont(font));
            });
            return fonts;
        }
    }
    // Font runtime data and rendering
    // ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
    class ImFont {
        constructor(native) {
            this.native = native;
        }
        // Members: Hot ~62/78 bytes
        // float                       FontSize;           // <user set>   // Height of characters, set during loading (don't change after loading)
        get FontSize() { return this.native.FontSize; }
        // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
        get Scale() { return this.native.Scale; }
        set Scale(value) { this.native.Scale = value; }
        // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
        get DisplayOffset() { return this.native.DisplayOffset; }
        // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
        get Glyphs() {
            const glyphs = new ImVector();
            this.native.IterateGlyphs((glyph) => {
                glyphs.push(new ImFontGlyph(glyph)); // TODO: wrap native
            });
            return glyphs;
        }
        // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
        // get IndexAdvanceX(): any { return this.native.IndexAdvanceX; }
        // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
        // get IndexLookup(): any { return this.native.IndexLookup; }
        // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
        get FallbackGlyph() {
            const glyph = this.native.FallbackGlyph;
            return glyph && new ImFontGlyph(glyph);
        }
        set FallbackGlyph(value) {
            this.native.FallbackGlyph = value && value.internal;
        }
        // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
        get FallbackAdvanceX() { return this.native.FallbackAdvanceX; }
        // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
        get FallbackChar() { return this.native.FallbackChar; }
        // Members: Cold ~18/26 bytes
        // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
        get ConfigDataCount() { return this.ConfigData.length; }
        // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
        get ConfigData() {
            const cfg_data = [];
            this.native.IterateConfigData((cfg) => {
                cfg_data.push(new ImFontConfig(cfg));
            });
            return cfg_data;
        }
        // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
        get ContainerAtlas() { return null; }
        // float                       Ascent, Descent;    //              // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
        get Ascent() { return this.native.Ascent; }
        get Descent() { return this.native.Descent; }
        // int                         MetricsTotalSurface;//              // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)
        get MetricsTotalSurface() { return this.native.MetricsTotalSurface; }
        // Methods
        // IMGUI_API ImFont();
        // IMGUI_API ~ImFont();
        // IMGUI_API void              ClearOutputData();
        ClearOutputData() { return this.native.ClearOutputData(); }
        // IMGUI_API void              BuildLookupTable();
        BuildLookupTable() { return this.native.BuildLookupTable(); }
        // IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
        FindGlyph(c) {
            const glyph = this.native.FindGlyph(c);
            return glyph && new ImFontGlyph(glyph);
        }
        // IMGUI_API const ImFontGlyph*FindGlyphNoFallback(ImWchar c) const;
        FindGlyphNoFallback(c) {
            const glyph = this.native.FindGlyphNoFallback(c);
            return glyph && new ImFontGlyph(glyph);
        }
        // IMGUI_API void              SetFallbackChar(ImWchar c);
        SetFallbackChar(c) { return this.native.SetFallbackChar(c); }
        // float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
        GetCharAdvance(c) { return this.native.GetCharAdvance(c); }
        // bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
        IsLoaded() { return this.native.IsLoaded(); }
        // const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }
        GetDebugName() { return this.native.GetDebugName(); }
        // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
        // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
        // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
        CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end = null, remaining = null) {
            return this.native.CalcTextSizeA(size, max_width, wrap_width, text_end !== null ? text_begin.substring(0, text_end) : text_begin, remaining, new ImVec2());
        }
        // IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
        CalcWordWrapPositionA(scale, text, text_end = null, wrap_width) {
            return this.native.CalcWordWrapPositionA(scale, text_end !== null ? text.substring(0, text_end) : text, wrap_width);
        }
        // IMGUI_API void              RenderChar(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, unsigned short c) const;
        RenderChar(draw_list, size, pos, col, c) {
            this.native.RenderChar(draw_list.native, size, pos, col, c);
        }
        // IMGUI_API void              RenderText(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, const ImVec4& clip_rect, const char* text_begin, const char* text_end, float wrap_width = 0.0f, bool cpu_fine_clip = false) const;
        RenderText(draw_list, size, pos, col, clip_rect, text_begin, text_end = null, wrap_width = 0.0, cpu_fine_clip = false) { }
    }
    // a script version of BindImGui.ImGuiStyle with matching interface
    class script_ImGuiStyle {
        constructor() {
            this.Alpha = 1.0;
            this.WindowPadding = new ImVec2(8, 8);
            this.WindowRounding = 7.0;
            this.WindowBorderSize = 0.0;
            this.WindowMinSize = new ImVec2(32, 32);
            this.WindowTitleAlign = new ImVec2(0.0, 0.5);
            this.WindowMenuButtonPosition = exports.ImGuiDir.Left;
            this.ChildRounding = 0.0;
            this.ChildBorderSize = 1.0;
            this.PopupRounding = 0.0;
            this.PopupBorderSize = 1.0;
            this.FramePadding = new ImVec2(4, 3);
            this.FrameRounding = 0.0;
            this.FrameBorderSize = 0.0;
            this.ItemSpacing = new ImVec2(8, 4);
            this.ItemInnerSpacing = new ImVec2(4, 4);
            this.TouchExtraPadding = new ImVec2(0, 0);
            this.IndentSpacing = 21.0;
            this.ColumnsMinSpacing = 6.0;
            this.ScrollbarSize = 16.0;
            this.ScrollbarRounding = 9.0;
            this.GrabMinSize = 10.0;
            this.GrabRounding = 0.0;
            this.TabRounding = 0.0;
            this.TabBorderSize = 0.0;
            this.ButtonTextAlign = new ImVec2(0.5, 0.5);
            this.SelectableTextAlign = new ImVec2(0.0, 0.0);
            this.DisplayWindowPadding = new ImVec2(22, 22);
            this.DisplaySafeAreaPadding = new ImVec2(4, 4);
            this.MouseCursorScale = 1;
            this.AntiAliasedLines = true;
            this.AntiAliasedFill = true;
            this.CurveTessellationTol = 1.25;
            this.Colors = [];
            for (let i = 0; i < exports.ImGuiCol.COUNT; ++i) {
                this.Colors[i] = new ImVec4();
            }
            const _this = new ImGuiStyle(this);
            const native = new exports.bind.ImGuiStyle();
            const _that = new ImGuiStyle(native);
            _that.Copy(_this);
            exports.bind.StyleColorsClassic(native);
            _this.Copy(_that);
            native.delete();
        }
        _getAt_Colors(index) { return this.Colors[index]; }
        _setAt_Colors(index, color) { this.Colors[index].Copy(color); return true; }
        ScaleAllSizes(scale_factor) {
            const _this = new ImGuiStyle(this);
            const native = new exports.bind.ImGuiStyle();
            const _that = new ImGuiStyle(native);
            _that.Copy(_this);
            native.ScaleAllSizes(scale_factor);
            _this.Copy(_that);
            native.delete();
        }
    }
    class ImGuiStyle {
        constructor(internal = new script_ImGuiStyle()) {
            this.internal = internal;
            this.Colors = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return exports.ImGuiCol.COUNT;
                    }
                    return this.internal._getAt_Colors(Number(key));
                },
                set: (target, key, value) => {
                    return this.internal._setAt_Colors(Number(key), value);
                },
            });
        }
        get Alpha() { return this.internal.Alpha; }
        set Alpha(value) { this.internal.Alpha = value; }
        get WindowPadding() { return this.internal.WindowPadding; }
        get WindowRounding() { return this.internal.WindowRounding; }
        set WindowRounding(value) { this.internal.WindowRounding = value; }
        get WindowBorderSize() { return this.internal.WindowBorderSize; }
        set WindowBorderSize(value) { this.internal.WindowBorderSize = value; }
        get WindowMinSize() { return this.internal.WindowMinSize; }
        get WindowTitleAlign() { return this.internal.WindowTitleAlign; }
        get WindowMenuButtonPosition() { return this.internal.WindowMenuButtonPosition; }
        set WindowMenuButtonPosition(value) { this.internal.WindowMenuButtonPosition = value; }
        get ChildRounding() { return this.internal.ChildRounding; }
        set ChildRounding(value) { this.internal.ChildRounding = value; }
        get ChildBorderSize() { return this.internal.ChildBorderSize; }
        set ChildBorderSize(value) { this.internal.ChildBorderSize = value; }
        get PopupRounding() { return this.internal.PopupRounding; }
        set PopupRounding(value) { this.internal.PopupRounding = value; }
        get PopupBorderSize() { return this.internal.PopupBorderSize; }
        set PopupBorderSize(value) { this.internal.PopupBorderSize = value; }
        get FramePadding() { return this.internal.FramePadding; }
        get FrameRounding() { return this.internal.FrameRounding; }
        set FrameRounding(value) { this.internal.FrameRounding = value; }
        get FrameBorderSize() { return this.internal.FrameBorderSize; }
        set FrameBorderSize(value) { this.internal.FrameBorderSize = value; }
        get ItemSpacing() { return this.internal.ItemSpacing; }
        get ItemInnerSpacing() { return this.internal.ItemInnerSpacing; }
        get TouchExtraPadding() { return this.internal.TouchExtraPadding; }
        get IndentSpacing() { return this.internal.IndentSpacing; }
        set IndentSpacing(value) { this.internal.IndentSpacing = value; }
        get ColumnsMinSpacing() { return this.internal.ColumnsMinSpacing; }
        set ColumnsMinSpacing(value) { this.internal.ColumnsMinSpacing = value; }
        get ScrollbarSize() { return this.internal.ScrollbarSize; }
        set ScrollbarSize(value) { this.internal.ScrollbarSize = value; }
        get ScrollbarRounding() { return this.internal.ScrollbarRounding; }
        set ScrollbarRounding(value) { this.internal.ScrollbarRounding = value; }
        get GrabMinSize() { return this.internal.GrabMinSize; }
        set GrabMinSize(value) { this.internal.GrabMinSize = value; }
        get GrabRounding() { return this.internal.GrabRounding; }
        set GrabRounding(value) { this.internal.GrabRounding = value; }
        get TabRounding() { return this.internal.TabRounding; }
        set TabRounding(value) { this.internal.TabRounding = value; }
        get TabBorderSize() { return this.internal.TabBorderSize; }
        set TabBorderSize(value) { this.internal.TabBorderSize = value; }
        get ButtonTextAlign() { return this.internal.ButtonTextAlign; }
        get SelectableTextAlign() { return this.internal.SelectableTextAlign; }
        get DisplayWindowPadding() { return this.internal.DisplayWindowPadding; }
        get DisplaySafeAreaPadding() { return this.internal.DisplaySafeAreaPadding; }
        get MouseCursorScale() { return this.internal.MouseCursorScale; }
        set MouseCursorScale(value) { this.internal.MouseCursorScale = value; }
        get AntiAliasedLines() { return this.internal.AntiAliasedLines; }
        set AntiAliasedLines(value) { this.internal.AntiAliasedLines = value; }
        get AntiAliasedFill() { return this.internal.AntiAliasedFill; }
        set AntiAliasedFill(value) { this.internal.AntiAliasedFill = value; }
        get CurveTessellationTol() { return this.internal.CurveTessellationTol; }
        set CurveTessellationTol(value) { this.internal.CurveTessellationTol = value; }
        Copy(other) {
            this.Alpha = other.Alpha;
            this.WindowPadding.Copy(other.WindowPadding);
            this.WindowRounding = other.WindowRounding;
            this.WindowBorderSize = other.WindowBorderSize;
            this.WindowMinSize.Copy(other.WindowMinSize);
            this.WindowTitleAlign.Copy(other.WindowTitleAlign);
            this.WindowMenuButtonPosition = other.WindowMenuButtonPosition;
            this.ChildRounding = other.ChildRounding;
            this.ChildBorderSize = other.ChildBorderSize;
            this.PopupRounding = other.PopupRounding;
            this.PopupBorderSize = other.PopupBorderSize;
            this.FramePadding.Copy(other.FramePadding);
            this.FrameRounding = other.FrameRounding;
            this.FrameBorderSize = other.FrameBorderSize;
            this.ItemSpacing.Copy(other.ItemSpacing);
            this.ItemInnerSpacing.Copy(other.ItemInnerSpacing);
            this.TouchExtraPadding.Copy(other.TouchExtraPadding);
            this.IndentSpacing = other.IndentSpacing;
            this.ColumnsMinSpacing = other.ColumnsMinSpacing;
            this.ScrollbarSize = other.ScrollbarSize;
            this.ScrollbarRounding = other.ScrollbarRounding;
            this.GrabMinSize = other.GrabMinSize;
            this.GrabRounding = other.GrabRounding;
            this.TabRounding = other.TabRounding;
            this.TabBorderSize = other.TabBorderSize;
            this.ButtonTextAlign.Copy(other.ButtonTextAlign);
            this.DisplayWindowPadding.Copy(other.DisplayWindowPadding);
            this.DisplaySafeAreaPadding.Copy(other.DisplaySafeAreaPadding);
            this.MouseCursorScale = other.MouseCursorScale;
            this.AntiAliasedLines = other.AntiAliasedLines;
            this.AntiAliasedFill = other.AntiAliasedFill;
            this.CurveTessellationTol = other.CurveTessellationTol;
            for (let i = 0; i < exports.ImGuiCol.COUNT; ++i) {
                this.Colors[i].Copy(other.Colors[i]);
            }
            return this;
        }
        ScaleAllSizes(scale_factor) { this.internal.ScaleAllSizes(scale_factor); }
    }
    // This is where your app communicate with Dear ImGui. Access via ImGui::GetIO().
    // Read 'Programmer guide' section in .cpp file for general usage.
    class ImGuiIO {
        constructor(native) {
            this.native = native;
            // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
            this.KeyMap = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return exports.Key.COUNT;
                    }
                    return this.native._getAt_KeyMap(Number(key));
                },
                set: (target, key, value) => {
                    return this.native._setAt_KeyMap(Number(key), value);
                },
            });
            // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
            this.MouseDown = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return 5;
                    }
                    return this.native._getAt_MouseDown(Number(key));
                },
                set: (target, key, value) => {
                    return this.native._setAt_MouseDown(Number(key), value);
                },
            });
            // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
            this.KeysDown = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return 512;
                    }
                    return this.native._getAt_KeysDown(Number(key));
                },
                set: (target, key, value) => {
                    return this.native._setAt_KeysDown(Number(key), value);
                },
            });
            // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
            this.NavInputs = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return exports.NavInput.COUNT;
                    }
                    return this.native._getAt_NavInputs(Number(key));
                },
                set: (target, key, value) => {
                    return this.native._setAt_NavInputs(Number(key), value);
                },
            });
            //------------------------------------------------------------------
            // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
            //------------------------------------------------------------------
            // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
            // ImVec2      MouseClickedPos[5];         // Position at time of clicking
            this.MouseClickedPos = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return 5;
                    }
                    return this.native._getAt_MouseClickedPos(Number(key));
                },
            });
            // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
            // bool        MouseClicked[5];            // Mouse button went from !Down to Down
            // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
            // bool        MouseReleased[5];           // Mouse button went from Down to !Down
            // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
            // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
            this.MouseDownDuration = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return 5;
                    }
                    return this.native._getAt_MouseDownDuration(Number(key));
                },
            });
            // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
            // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
            // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
            // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
            this.KeysDownDuration = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return 512;
                    }
                    return this.native._getAt_KeysDownDuration(Number(key));
                },
            });
            // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
            // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
            this.NavInputsDownDuration = new Proxy([], {
                get: (target, key) => {
                    if (key === "length") {
                        return exports.NavInput.COUNT;
                    }
                    return this.native._getAt_NavInputsDownDuration(Number(key));
                },
            });
        }
        //------------------------------------------------------------------
        // Settings (fill once)                 // Default value:
        //------------------------------------------------------------------
        // ImGuiConfigFlags   ConfigFlags;         // = 0                  // See ImGuiConfigFlags_ enum. Set by user/application. Gamepad/keyboard navigation options, etc.
        get ConfigFlags() { return this.native.ConfigFlags; }
        set ConfigFlags(value) { this.native.ConfigFlags = value; }
        // ImGuiBackendFlags  BackendFlags;        // = 0                  // Set ImGuiBackendFlags_ enum. Set by imgui_impl_xxx files or custom back-end to communicate features supported by the back-end.
        get BackendFlags() { return this.native.BackendFlags; }
        set BackendFlags(value) { this.native.BackendFlags = value; }
        // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
        get DisplaySize() { return this.native.DisplaySize; }
        // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
        get DeltaTime() { return this.native.DeltaTime; }
        set DeltaTime(value) { this.native.DeltaTime = value; }
        // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
        get IniSavingRate() { return this.native.IniSavingRate; }
        set IniSavingRate(value) { this.native.IniSavingRate = value; }
        // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
        get IniFilename() { return this.native.IniFilename; }
        set IniFilename(value) { this.native.IniFilename = value; }
        // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
        get LogFilename() { return this.native.LogFilename; }
        set LogFilename(value) { this.native.LogFilename = value; }
        // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
        get MouseDoubleClickTime() { return this.native.MouseDoubleClickTime; }
        set MouseDoubleClickTime(value) { this.native.MouseDoubleClickTime = value; }
        // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
        get MouseDoubleClickMaxDist() { return this.native.MouseDoubleClickMaxDist; }
        set MouseDoubleClickMaxDist(value) { this.native.MouseDoubleClickMaxDist = value; }
        // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
        get MouseDragThreshold() { return this.native.MouseDragThreshold; }
        set MouseDragThreshold(value) { this.native.MouseDragThreshold = value; }
        // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
        get KeyRepeatDelay() { return this.native.KeyRepeatDelay; }
        set KeyRepeatDelay(value) { this.native.KeyRepeatDelay = value; }
        // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
        get KeyRepeatRate() { return this.native.KeyRepeatRate; }
        set KeyRepeatRate(value) { this.native.KeyRepeatRate = value; }
        // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.
        get UserData() { return this.native.UserData; }
        set UserData(value) { this.native.UserData = value; }
        // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
        get Fonts() { return new ImFontAtlas(this.native.Fonts); }
        // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
        get FontGlobalScale() { return this.native.FontGlobalScale; }
        set FontGlobalScale(value) { this.native.FontGlobalScale = value; }
        // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
        get FontAllowUserScaling() { return this.native.FontAllowUserScaling; }
        set FontAllowUserScaling(value) { this.native.FontAllowUserScaling = value; }
        // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
        get FontDefault() {
            const font = this.native.FontDefault;
            return (font === null) ? null : new ImFont(font);
        }
        set FontDefault(value) {
            this.native.FontDefault = value && value.native;
        }
        // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
        get DisplayFramebufferScale() { return this.native.DisplayFramebufferScale; }
        // Miscellaneous configuration options
        // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
        get ConfigMacOSXBehaviors() { return this.native.ConfigMacOSXBehaviors; }
        set ConfigMacOSXBehaviors(value) { this.native.ConfigMacOSXBehaviors = value; }
        // bool          ConfigInputTextCursorBlink;   // = true               // Enable blinking cursor, for users who consider it annoying.
        get ConfigInputTextCursorBlink() { return this.native.ConfigInputTextCursorBlink; }
        set ConfigInputTextCursorBlink(value) { this.native.ConfigInputTextCursorBlink = value; }
        // bool          ConfigWindowsResizeFromEdges; // = false          // [BETA] Enable resizing of windows from their edges and from the lower-left corner. This requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback. (This used to be the ImGuiWindowFlags_ResizeFromAnySide flag)
        get ConfigWindowsResizeFromEdges() { return this.native.ConfigWindowsResizeFromEdges; }
        set ConfigWindowsResizeFromEdges(value) { this.native.ConfigWindowsResizeFromEdges = value; }
        // bool        ConfigWindowsMoveFromTitleBarOnly;// = false        // [BETA] Set to true to only allow moving windows when clicked+dragged from the title bar. Windows without a title bar are not affected.
        get ConfigWindowsMoveFromTitleBarOnly() { return this.native.ConfigWindowsMoveFromTitleBarOnly; }
        set ConfigWindowsMoveFromTitleBarOnly(value) { this.native.ConfigWindowsMoveFromTitleBarOnly = value; }
        //------------------------------------------------------------------
        // Settings (User Functions)
        //------------------------------------------------------------------
        // Optional: Platform/Renderer back-end name (informational only! will be displayed in About Window) + User data for back-end/wrappers to store their own stuff.
        // const char* BackendPlatformName;            // = NULL
        get BackendPlatformName() { return this.native.BackendPlatformName; }
        set BackendPlatformName(value) { this.native.BackendPlatformName = value; }
        // const char* BackendRendererName;            // = NULL
        get BackendRendererName() { return this.native.BackendRendererName; }
        set BackendRendererName(value) { this.native.BackendRendererName = value; }
        // void*       BackendPlatformUserData;        // = NULL
        get BackendPlatformUserData() { return this.native.BackendPlatformUserData; }
        set BackendPlatformUserData(value) { this.native.BackendPlatformUserData = value; }
        // void*       BackendRendererUserData;        // = NULL
        get BackendRendererUserData() { return this.native.BackendRendererUserData; }
        set BackendRendererUserData(value) { this.native.BackendRendererUserData = value; }
        // void*       BackendLanguageUserData;        // = NULL
        get BackendLanguageUserData() { return this.native.BackendLanguageUserData; }
        set BackendLanguageUserData(value) { this.native.BackendLanguageUserData = value; }
        // Optional: access OS clipboard
        // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
        // const char* (*GetClipboardTextFn)(void* user_data);
        get GetClipboardTextFn() { return this.native.GetClipboardTextFn; }
        set GetClipboardTextFn(value) { this.native.GetClipboardTextFn = value; }
        // void        (*SetClipboardTextFn)(void* user_data, const char* text);
        get SetClipboardTextFn() { return this.native.SetClipboardTextFn; }
        set SetClipboardTextFn(value) { this.native.SetClipboardTextFn = value; }
        // void*       ClipboardUserData;
        get ClipboardUserData() { return this.native.ClipboardUserData; }
        set ClipboardUserData(value) { this.native.ClipboardUserData = value; }
        // Optional: override memory allocations. MemFreeFn() may be called with a NULL pointer.
        // (default to posix malloc/free)
        // void*       (*MemAllocFn)(size_t sz);
        // void        (*MemFreeFn)(void* ptr);
        // Optional: notify OS Input Method Editor of the screen position of your cursor for text input position (e.g. when using Japanese/Chinese IME in Windows)
        // (default to use native imm32 api on Windows)
        // void        (*ImeSetInputScreenPosFn)(int x, int y);
        // void*       ImeWindowHandle;            // (Windows) Set this to your HWND to get automatic IME cursor positioning.
        //------------------------------------------------------------------
        // Input - Fill before calling NewFrame()
        //------------------------------------------------------------------
        // ImVec2      MousePos;                   // Mouse position, in pixels. Set to ImVec2(-FLT_MAX,-FLT_MAX) if mouse is unavailable (on another screen, etc.)
        get MousePos() { return this.native.MousePos; }
        // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
        get MouseWheel() { return this.native.MouseWheel; }
        set MouseWheel(value) { this.native.MouseWheel = value; }
        // float       MouseWheelH;                    // Mouse wheel (Horizontal). Most users don't have a mouse with an horizontal wheel, may not be filled by all back-ends.
        get MouseWheelH() { return this.native.MouseWheelH; }
        set MouseWheelH(value) { this.native.MouseWheelH = value; }
        // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
        get MouseDrawCursor() { return this.native.MouseDrawCursor; }
        set MouseDrawCursor(value) { this.native.MouseDrawCursor = value; }
        // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
        get KeyCtrl() { return this.native.KeyCtrl; }
        set KeyCtrl(value) { this.native.KeyCtrl = value; }
        // bool        KeyShift;                   // Keyboard modifier pressed: Shift
        get KeyShift() { return this.native.KeyShift; }
        set KeyShift(value) { this.native.KeyShift = value; }
        // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
        get KeyAlt() { return this.native.KeyAlt; }
        set KeyAlt(value) { this.native.KeyAlt = value; }
        // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
        get KeySuper() { return this.native.KeySuper; }
        set KeySuper(value) { this.native.KeySuper = value; }
        // Functions
        // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
        AddInputCharacter(c) { this.native.AddInputCharacter(c); }
        // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
        AddInputCharactersUTF8(utf8_chars) { this.native.AddInputCharactersUTF8(utf8_chars); }
        // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually
        ClearInputCharacters() { this.native.ClearInputCharacters(); }
        //------------------------------------------------------------------
        // Output - Retrieve after calling NewFrame()
        //------------------------------------------------------------------
        // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active).
        get WantCaptureMouse() { return this.native.WantCaptureMouse; }
        set WantCaptureMouse(value) { this.native.WantCaptureMouse = value; }
        // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
        get WantCaptureKeyboard() { return this.native.WantCaptureKeyboard; }
        set WantCaptureKeyboard(value) { this.native.WantCaptureKeyboard = value; }
        // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
        get WantTextInput() { return this.native.WantTextInput; }
        set WantTextInput(value) { this.native.WantTextInput = value; }
        // bool        WantSetMousePos;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
        get WantSetMousePos() { return this.native.WantSetMousePos; }
        set WantSetMousePos(value) { this.native.WantSetMousePos = value; }
        // bool        WantSaveIniSettings;        // When manual .ini load/save is active (io.IniFilename == NULL), this will be set to notify your application that you can call SaveIniSettingsToMemory() and save yourself. IMPORTANT: You need to clear io.WantSaveIniSettings yourself.
        get WantSaveIniSettings() { return this.native.WantSaveIniSettings; }
        set WantSaveIniSettings(value) { this.native.WantSaveIniSettings = value; }
        // bool        NavActive;                  // Directional navigation is currently allowed (will handle ImGuiKey_NavXXX events) = a window is focused and it doesn't use the ImGuiWindowFlags_NoNavInputs flag.
        get NavActive() { return this.native.NavActive; }
        set NavActive(value) { this.native.NavActive = value; }
        // bool        NavVisible;                 // Directional navigation is visible and allowed (will handle ImGuiKey_NavXXX events).
        get NavVisible() { return this.native.NavVisible; }
        set NavVisible(value) { this.native.NavVisible = value; }
        // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
        get Framerate() { return this.native.Framerate; }
        // int         MetricsRenderVertices;      // Vertices output during last call to Render()
        get MetricsRenderVertices() { return this.native.MetricsRenderVertices; }
        // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
        get MetricsRenderIndices() { return this.native.MetricsRenderIndices; }
        // int         MetricsRenderWindows;       // Number of visible windows
        get MetricsRenderWindows() { return this.native.MetricsRenderWindows; }
        // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
        get MetricsActiveWindows() { return this.native.MetricsActiveWindows; }
        // int         MetricsActiveAllocations;   // Number of active allocations, updated by MemAlloc/MemFree based on current context. May be off if you have multiple imgui contexts.
        get MetricsActiveAllocations() { return this.native.MetricsActiveAllocations; }
        // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
        get MouseDelta() { return this.native.MouseDelta; }
    }
    // Context creation and access, if you want to use multiple context, share context between modules (e.g. DLL).
    // All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
    // All those functions are not reliant on the current context.
    class ImGuiContext {
        constructor(native) {
            this.native = native;
            this.textures = [];
        }
        static getTexture(index) {
            if (ImGuiContext.current_ctx === null) {
                throw new Error();
            }
            return ImGuiContext.current_ctx._getTexture(index);
        }
        static setTexture(texture) {
            if (ImGuiContext.current_ctx === null) {
                throw new Error();
            }
            return ImGuiContext.current_ctx._setTexture(texture);
        }
        _getTexture(index) {
            return this.textures[index] || null;
        }
        _setTexture(texture) {
            let index = this.textures.indexOf(texture);
            if (index === -1) {
                for (let i = 0; i < this.textures.length; ++i) {
                    if (this.textures[i] === null) {
                        this.textures[i] = texture;
                        return i;
                    }
                }
                index = this.textures.length;
                this.textures.push(texture);
            }
            return index;
        }
    }
    ImGuiContext.current_ctx = null;
    // IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
    function CreateContext(shared_font_atlas = null) {
        const ctx = new ImGuiContext(exports.bind.CreateContext());
        if (ImGuiContext.current_ctx === null) {
            ImGuiContext.current_ctx = ctx;
        }
        return ctx;
    }
    // IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = Destroy current context
    function DestroyContext(ctx = null) {
        if (ctx === null) {
            ctx = ImGuiContext.current_ctx;
            ImGuiContext.current_ctx = null;
        }
        exports.bind.DestroyContext((ctx === null) ? null : ctx.native);
    }
    // IMGUI_API ImGuiContext* GetCurrentContext();
    function GetCurrentContext() {
        // const ctx_native: BindImGui.ImGuiContext | null = bind.GetCurrentContext();
        return ImGuiContext.current_ctx;
    }
    // IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
    function SetCurrentContext(ctx) {
        exports.bind.SetCurrentContext((ctx === null) ? null : ctx.native);
        ImGuiContext.current_ctx = ctx;
    }
    // IMGUI_API bool          DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert);
    function DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert, sz_draw_idx) {
        return exports.bind.DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert, sz_draw_idx);
    }
    // Main
    // IMGUI_API ImGuiIO&      GetIO();
    function GetIO() { return new ImGuiIO(exports.bind.GetIO()); }
    // IMGUI_API ImGuiStyle&   GetStyle();
    function GetStyle() { return new ImGuiStyle(exports.bind.GetStyle()); }
    // IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
    function NewFrame() { exports.bind.NewFrame(); }
    // IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
    function EndFrame() { exports.bind.EndFrame(); }
    // IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
    function Render() { exports.bind.Render(); }
    // IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
    function GetDrawData() {
        const draw_data = exports.bind.GetDrawData();
        return (draw_data === null) ? null : new ImDrawData(draw_data);
    }
    // Demo, Debug, Informations
    // IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
    function ShowDemoWindow(p_open = null) { exports.bind.ShowDemoWindow(p_open); }
    // IMGUI_API void          ShowAboutWindow(bool* p_open = NULL);       // create about window. display Dear ImGui version, credits and build/system information.
    function ShowAboutWindow(p_open = null) {
        if (p_open === null) {
            exports.bind.ShowAboutWindow(null);
        }
        else if (Array.isArray(p_open)) {
            exports.bind.ShowAboutWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            exports.bind.ShowAboutWindow(ref_open);
            p_open(ref_open[0]);
        }
    }
    // IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
    function ShowMetricsWindow(p_open = null) {
        if (p_open === null) {
            exports.bind.ShowMetricsWindow(null);
        }
        else if (Array.isArray(p_open)) {
            exports.bind.ShowMetricsWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            exports.bind.ShowMetricsWindow(ref_open);
            p_open(ref_open[0]);
        }
    }
    // IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
    function ShowStyleEditor(ref = null) {
        if (ref === null) {
            exports.bind.ShowStyleEditor(null);
        }
        else if (ref.internal instanceof exports.bind.ImGuiStyle) {
            exports.bind.ShowStyleEditor(ref.internal);
        }
        else {
            const native = new exports.bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(ref);
            exports.bind.ShowStyleEditor(native);
            ref.Copy(wrap);
            native.delete();
        }
    }
    // IMGUI_API bool          ShowStyleSelector(const char* label);
    function ShowStyleSelector(label) { return exports.bind.ShowStyleSelector(label); }
    // IMGUI_API void          ShowFontSelector(const char* label);
    function ShowFontSelector(label) { exports.bind.ShowFontSelector(label); }
    // IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
    function ShowUserGuide() { exports.bind.ShowUserGuide(); }
    // IMGUI_API const char*   GetVersion();
    function GetVersion() { return exports.bind.GetVersion(); }
    // Styles
    // IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
    function StyleColorsClassic(dst = null) {
        if (dst === null) {
            exports.bind.StyleColorsClassic(null);
        }
        else if (dst.internal instanceof exports.bind.ImGuiStyle) {
            exports.bind.StyleColorsClassic(dst.internal);
        }
        else {
            const native = new exports.bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            exports.bind.StyleColorsClassic(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    // IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
    function StyleColorsDark(dst = null) {
        if (dst === null) {
            exports.bind.StyleColorsDark(null);
        }
        else if (dst.internal instanceof exports.bind.ImGuiStyle) {
            exports.bind.StyleColorsDark(dst.internal);
        }
        else {
            const native = new exports.bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            exports.bind.StyleColorsDark(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    // IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
    function StyleColorsLight(dst = null) {
        if (dst === null) {
            exports.bind.StyleColorsLight(null);
        }
        else if (dst.internal instanceof exports.bind.ImGuiStyle) {
            exports.bind.StyleColorsLight(dst.internal);
        }
        else {
            const native = new exports.bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            exports.bind.StyleColorsLight(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    // Window
    // IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
    function Begin(name, open = null, flags = 0) {
        if (open === null) {
            return exports.bind.Begin(name, null, flags);
        }
        else if (Array.isArray(open)) {
            return exports.bind.Begin(name, open, flags);
        }
        else {
            const ref_open = [open()];
            const opened = exports.bind.Begin(name, ref_open, flags);
            open(ref_open[0]);
            return opened;
        }
    }
    // IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
    function End() { exports.bind.End(); }
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
    function BeginChild(id, size = ImVec2.ZERO, border = false, extra_flags = 0) {
        return exports.bind.BeginChild(id, size, border, extra_flags);
    }
    // IMGUI_API void          EndChild();
    function EndChild() { exports.bind.EndChild(); }
    // IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
    function GetContentRegionMax(out = new ImVec2()) {
        return exports.bind.GetContentRegionMax(out);
    }
    // IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
    function GetContentRegionAvail(out = new ImVec2()) {
        return exports.bind.GetContentRegionAvail(out);
    }
    // IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
    function GetWindowContentRegionMin(out = new ImVec2()) {
        return exports.bind.GetWindowContentRegionMin(out);
    }
    // IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
    function GetWindowContentRegionMax(out = new ImVec2()) {
        return exports.bind.GetWindowContentRegionMax(out);
    }
    // IMGUI_API float         GetWindowContentRegionWidth();                                      //
    function GetWindowContentRegionWidth() { return exports.bind.GetWindowContentRegionWidth(); }
    // IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
    function GetWindowDrawList() {
        return new ImDrawList(exports.bind.GetWindowDrawList());
    }
    // IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
    function GetWindowPos(out = new ImVec2()) {
        return exports.bind.GetWindowPos(out);
    }
    // IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
    function GetWindowSize(out = new ImVec2()) {
        return exports.bind.GetWindowSize(out);
    }
    // IMGUI_API float         GetWindowWidth();
    function GetWindowWidth() { return exports.bind.GetWindowWidth(); }
    // IMGUI_API float         GetWindowHeight();
    function GetWindowHeight() { return exports.bind.GetWindowHeight(); }
    // IMGUI_API bool          IsWindowCollapsed();
    function IsWindowCollapsed() { return exports.bind.IsWindowCollapsed(); }
    // IMGUI_API bool          IsWindowAppearing();
    function IsWindowAppearing() { return exports.bind.IsWindowAppearing(); }
    // IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
    function SetWindowFontScale(scale) { exports.bind.SetWindowFontScale(scale); }
    // IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
    function SetNextWindowPos(pos, cond = 0, pivot = ImVec2.ZERO) {
        exports.bind.SetNextWindowPos(pos, cond, pivot);
    }
    // IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
    function SetNextWindowSize(pos, cond = 0) {
        exports.bind.SetNextWindowSize(pos, cond);
    }
    // IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
    function SetNextWindowSizeConstraints(size_min, size_max, custom_callback = null, custom_callback_data = null) {
        if (custom_callback) {
            exports.bind.SetNextWindowSizeConstraints(size_min, size_max, (data) => {
                custom_callback(new ImGuiSizeCallbackData(data, custom_callback_data));
            }, null);
        }
        else {
            exports.bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
        }
    }
    // IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
    function SetNextWindowContentSize(size) {
        exports.bind.SetNextWindowContentSize(size);
    }
    // IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
    function SetNextWindowCollapsed(collapsed, cond = 0) {
        exports.bind.SetNextWindowCollapsed(collapsed, cond);
    }
    // IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
    function SetNextWindowFocus() { exports.bind.SetNextWindowFocus(); }
    // IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                  // set next window background color alpha. helper to easily modify ImGuiCol_WindowBg/ChildBg/PopupBg.
    function SetNextWindowBgAlpha(alpha) { exports.bind.SetNextWindowBgAlpha(alpha); }
    // IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
    // IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
    // IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
    // IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
    // IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
    // IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
    // IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
    // IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
    function SetWindowPos(name_or_pos, pos_or_cond = 0, cond = 0) {
        if (typeof (name_or_pos) === "string") {
            exports.bind.SetWindowNamePos(name_or_pos, pos_or_cond, cond);
            return;
        }
        else {
            exports.bind.SetWindowPos(name_or_pos, pos_or_cond);
        }
    }
    function SetWindowSize(name_or_size, size_or_cond = 0, cond = 0) {
        if (typeof (name_or_size) === "string") {
            exports.bind.SetWindowNamePos(name_or_size, size_or_cond, cond);
        }
        else {
            exports.bind.SetWindowSize(name_or_size, size_or_cond);
        }
    }
    function SetWindowCollapsed(name_or_collapsed, collapsed_or_cond = 0, cond = 0) {
        if (typeof (name_or_collapsed) === "string") {
            exports.bind.SetWindowNameCollapsed(name_or_collapsed, collapsed_or_cond, cond);
        }
        else {
            exports.bind.SetWindowCollapsed(name_or_collapsed, collapsed_or_cond);
        }
    }
    function SetWindowFocus(name) {
        if (typeof (name) === "string") {
            exports.bind.SetWindowNameFocus(name);
        }
        else {
            exports.bind.SetWindowFocus();
        }
    }
    // IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
    function GetScrollX() { return exports.bind.GetScrollX(); }
    // IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
    function GetScrollY() { return exports.bind.GetScrollY(); }
    // IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
    function GetScrollMaxX() { return exports.bind.GetScrollMaxX(); }
    // IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
    function GetScrollMaxY() { return exports.bind.GetScrollMaxY(); }
    // IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
    function SetScrollX(scroll_x) { exports.bind.SetScrollX(scroll_x); }
    // IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
    function SetScrollY(scroll_y) { exports.bind.SetScrollY(scroll_y); }
    // IMGUI_API void          SetScrollHereY(float center_y_ratio = 0.5f);                         // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    function SetScrollHereY(center_y_ratio = 0.5) {
        exports.bind.SetScrollHereY(center_y_ratio);
    }
    // IMGUI_API void          SetScrollFromPosY(float pos_y, float center_y_ratio = 0.5f);        // adjust scrolling amount to make given position valid. use GetCursorPos() or GetCursorStartPos()+offset to get valid positions.
    function SetScrollFromPosY(pos_y, center_y_ratio = 0.5) {
        exports.bind.SetScrollFromPosY(pos_y, center_y_ratio);
    }
    // IMGUI_API void          SetStateStorage(ImGuiStorage* tree);                                // replace tree state storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
    // IMGUI_API ImGuiStorage* GetStateStorage();
    // Parameters stacks (shared)
    // IMGUI_API void          PushFont(ImFont* font);                                             // use NULL as a shortcut to push default font
    function PushFont(font) { exports.bind.PushFont(font ? font.native : null); }
    // IMGUI_API void          PopFont();
    function PopFont() { exports.bind.PopFont(); }
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
    function PushStyleColor(idx, col) {
        if (col instanceof ImColor) {
            exports.bind.PushStyleColor(idx, col.Value);
        }
        else {
            exports.bind.PushStyleColor(idx, col);
        }
    }
    // IMGUI_API void          PopStyleColor(int count = 1);
    function PopStyleColor(count = 1) {
        exports.bind.PopStyleColor(count);
    }
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
    function PushStyleVar(idx, val) {
        exports.bind.PushStyleVar(idx, val);
    }
    // IMGUI_API void          PopStyleVar(int count = 1);
    function PopStyleVar(count = 1) {
        exports.bind.PopStyleVar(count);
    }
    // IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
    function GetStyleColorVec4(idx) {
        return exports.bind.GetStyleColorVec4(idx);
    }
    // IMGUI_API ImFont*       GetFont();                                                          // get current font
    function GetFont() {
        return new ImFont(exports.bind.GetFont());
    }
    // IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
    function GetFontSize() { return exports.bind.GetFontSize(); }
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    function GetFontTexUvWhitePixel(out = new ImVec2()) {
        return exports.bind.GetFontTexUvWhitePixel(out);
    }
    function GetColorU32(...args) {
        if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                // TODO: ImGuiCol or ImU32
                const idx = args[0];
                return exports.bind.GetColorU32_A(idx, 1.0);
            }
            else {
                const col = args[0];
                return exports.bind.GetColorU32_B(col);
            }
        }
        else {
            const idx = args[0];
            const alpha_mul = args[1];
            return exports.bind.GetColorU32_A(idx, alpha_mul);
        }
    }
    // Parameters stacks (current window)
    // IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
    function PushItemWidth(item_width) { exports.bind.PushItemWidth(item_width); }
    // IMGUI_API void          PopItemWidth();
    function PopItemWidth() { exports.bind.PopItemWidth(); }
    // IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
    function SetNextItemWidth(item_width) { exports.bind.SetNextItemWidth(item_width); } // set width of the _next_ common large "item+label" widget. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
    function CalcItemWidth() { return exports.bind.CalcItemWidth(); }
    // IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    function PushTextWrapPos(wrap_pos_x = 0.0) {
        exports.bind.PushTextWrapPos(wrap_pos_x);
    }
    // IMGUI_API void          PopTextWrapPos();
    function PopTextWrapPos() { exports.bind.PopTextWrapPos(); }
    // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
    function PushAllowKeyboardFocus(allow_keyboard_focus) { exports.bind.PushAllowKeyboardFocus(allow_keyboard_focus); }
    // IMGUI_API void          PopAllowKeyboardFocus();
    function PopAllowKeyboardFocus() { exports.bind.PopAllowKeyboardFocus(); }
    // IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
    function PushButtonRepeat(repeat) { exports.bind.PushButtonRepeat(repeat); }
    // IMGUI_API void          PopButtonRepeat();
    function PopButtonRepeat() { exports.bind.PopButtonRepeat(); }
    // Cursor / Layout
    // IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
    function Separator() { exports.bind.Separator(); }
    // IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
    function SameLine(pos_x = 0.0, spacing_w = -1.0) {
        exports.bind.SameLine(pos_x, spacing_w);
    }
    // IMGUI_API void          NewLine();                                                          // undo a SameLine()
    function NewLine() { exports.bind.NewLine(); }
    // IMGUI_API void          Spacing();                                                          // add vertical spacing
    function Spacing() { exports.bind.Spacing(); }
    // IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
    function Dummy(size) { exports.bind.Dummy(size); }
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
    function Indent(indent_w = 0.0) { exports.bind.Indent(indent_w); }
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
    function Unindent(indent_w = 0.0) { exports.bind.Unindent(indent_w); }
    // IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
    function BeginGroup() { exports.bind.BeginGroup(); }
    // IMGUI_API void          EndGroup();
    function EndGroup() { exports.bind.EndGroup(); }
    // IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
    function GetCursorPos(out = new ImVec2()) { return exports.bind.GetCursorPos(out); }
    // IMGUI_API float         GetCursorPosX();                                                    // "
    function GetCursorPosX() { return exports.bind.GetCursorPosX(); }
    // IMGUI_API float         GetCursorPosY();                                                    // "
    function GetCursorPosY() { return exports.bind.GetCursorPosY(); }
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
    function SetCursorPos(local_pos) { exports.bind.SetCursorPos(local_pos); }
    // IMGUI_API void          SetCursorPosX(float x);                                             // "
    function SetCursorPosX(x) { exports.bind.SetCursorPosX(x); }
    // IMGUI_API void          SetCursorPosY(float y);                                             // "
    function SetCursorPosY(y) { exports.bind.SetCursorPosY(y); }
    // IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
    function GetCursorStartPos(out = new ImVec2()) { return exports.bind.GetCursorStartPos(out); }
    // IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    function GetCursorScreenPos(out = new ImVec2()) { return exports.bind.GetCursorScreenPos(out); }
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
    function SetCursorScreenPos(pos) { exports.bind.SetCursorScreenPos(pos); }
    // IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
    function AlignTextToFramePadding() { exports.bind.AlignTextToFramePadding(); }
    // IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
    function GetTextLineHeight() { return exports.bind.GetTextLineHeight(); }
    // IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
    function GetTextLineHeightWithSpacing() { return exports.bind.GetTextLineHeightWithSpacing(); }
    // IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
    function GetFrameHeight() { return exports.bind.GetFrameHeight(); }
    // IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
    function GetFrameHeightWithSpacing() { return exports.bind.GetFrameHeightWithSpacing(); }
    // Columns
    // You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    function Columns(count = 1, id = null, border = true) {
        id = id || "";
        exports.bind.Columns(count, id, border);
    }
    // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
    function NextColumn() { exports.bind.NextColumn(); }
    // IMGUI_API int           GetColumnIndex();                                                   // get current column index
    function GetColumnIndex() { return exports.bind.GetColumnIndex(); }
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    function GetColumnWidth(column_index = -1) {
        return exports.bind.GetColumnWidth(column_index);
    }
    // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
    function SetColumnWidth(column_index, width) { exports.bind.SetColumnWidth(column_index, width); }
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    function GetColumnOffset(column_index = -1) {
        return exports.bind.GetColumnOffset(column_index);
    }
    // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
    function SetColumnOffset(column_index, offset_x) { exports.bind.SetColumnOffset(column_index, offset_x); }
    // IMGUI_API int           GetColumnsCount();
    function GetColumnsCount() { return exports.bind.GetColumnsCount(); }
    // ID scopes
    // If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
    // You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
    // IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
    // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API void          PushID(const void* ptr_id);
    // IMGUI_API void          PushID(int int_id);
    function PushID(id) { exports.bind.PushID(id); }
    // IMGUI_API void          PopID();
    function PopID() { exports.bind.PopID(); }
    // IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
    // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API ImGuiID       GetID(const void* ptr_id);
    function GetID(id) { return exports.bind.GetID(id); }
    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    function TextUnformatted(text, text_end = null) { exports.bind.TextUnformatted(text_end !== null ? text.substring(0, text_end) : text); }
    // IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
    // IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
    function Text(fmt /*, ...args: any[]*/) { exports.bind.Text(fmt /*, ...args*/); }
    // IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
    function TextColored(col, fmt /*, ...args: any[]*/) {
        exports.bind.TextColored((col instanceof ImColor) ? col.Value : col, fmt /*, ...args*/);
    }
    // IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
    function TextDisabled(fmt /*, ...args: any[]*/) { exports.bind.TextDisabled(fmt /*, ...args*/); }
    // IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
    // IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
    function TextWrapped(fmt /*, ...args: any[]*/) { exports.bind.TextWrapped(fmt /*, ...args*/); }
    // IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
    // IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
    function LabelText(label, fmt /*, ...args: any[]*/) { exports.bind.LabelText(label, fmt /*, ...args*/); }
    // IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
    // IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
    function BulletText(fmt /*, ...args: any[]*/) { exports.bind.BulletText(fmt /*, ...args*/); }
    // IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
    function Bullet() { exports.bind.Bullet(); }
    // Widgets: Main
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
    function Button(label, size = ImVec2.ZERO) {
        return exports.bind.Button(label, size);
    }
    // IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
    function SmallButton(label) { return exports.bind.SmallButton(label); }
    // IMGUI_API bool          ArrowButton(const char* str_id, ImGuiDir dir);                  // square button with an arrow shape
    function ArrowButton(str_id, dir) { return exports.bind.ArrowButton(str_id, dir); }
    // IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
    function InvisibleButton(str_id, size) {
        return exports.bind.InvisibleButton(str_id, size);
    }
    // IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
    function Image(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, tint_col = ImVec4.WHITE, border_col = ImVec4.ZERO) {
        exports.bind.Image(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, tint_col, border_col);
    }
    // IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
    function ImageButton(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, frame_padding = -1, bg_col = ImVec4.ZERO, tint_col = ImVec4.WHITE) {
        return exports.bind.ImageButton(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, frame_padding, bg_col, tint_col);
    }
    // IMGUI_API bool          Checkbox(const char* label, bool* v);
    function Checkbox(label, v) {
        if (Array.isArray(v)) {
            return exports.bind.Checkbox(label, v);
        }
        else {
            const ref_v = [v()];
            const ret = exports.bind.Checkbox(label, ref_v);
            v(ref_v[0]);
            return ret;
        }
    }
    // IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
    function CheckboxFlags(label, flags, flags_value) {
        if (Array.isArray(flags)) {
            return exports.bind.CheckboxFlags(label, flags, flags_value);
        }
        else {
            const ref_flags = [flags()];
            const ret = exports.bind.CheckboxFlags(label, ref_flags, flags_value);
            flags(ref_flags[0]);
            return ret;
        }
    }
    function RadioButton(label, ...args) {
        if (typeof (args[0]) === "boolean") {
            const active = args[0];
            return exports.bind.RadioButton_A(label, active);
        }
        else {
            const v = args[0];
            const v_button = args[1];
            const _v = Array.isArray(v) ? v : [v()];
            const ret = exports.bind.RadioButton_B(label, _v, v_button);
            if (!Array.isArray(v)) {
                v(_v[0]);
            }
            return ret;
        }
    }
    function PlotLines(label, ...args) {
        if (Array.isArray(args[0])) {
            const values = args[0];
            const values_getter = (data, idx) => values[idx * stride];
            const values_count = typeof (args[1]) === "number" ? args[1] : values.length;
            const values_offset = typeof (args[2]) === "number" ? args[2] : 0;
            const overlay_text = typeof (args[3]) === "string" ? args[3] : null;
            const scale_min = typeof (args[4]) === "number" ? args[4] : Number.MAX_VALUE;
            const scale_max = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const graph_size = args[6] || ImVec2.ZERO;
            const stride = typeof (args[7]) === "number" ? args[7] : 1;
            exports.bind.PlotLines(label, values_getter, null, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
        else {
            const values_getter = args[0];
            const data = args[1];
            const values_count = args[2];
            const values_offset = typeof (args[3]) === "number" ? args[3] : 0;
            const overlay_text = typeof (args[4]) === "string" ? args[4] : null;
            const scale_min = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const scale_max = typeof (args[6]) === "number" ? args[6] : Number.MAX_VALUE;
            const graph_size = args[7] || ImVec2.ZERO;
            exports.bind.PlotLines(label, values_getter, data, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
    }
    function PlotHistogram(label, ...args) {
        if (Array.isArray(args[0])) {
            const values = args[0];
            const values_getter = (data, idx) => values[idx * stride];
            const values_count = typeof (args[1]) === "number" ? args[1] : values.length;
            const values_offset = typeof (args[2]) === "number" ? args[2] : 0;
            const overlay_text = typeof (args[3]) === "string" ? args[3] : null;
            const scale_min = typeof (args[4]) === "number" ? args[4] : Number.MAX_VALUE;
            const scale_max = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const graph_size = args[6] || ImVec2.ZERO;
            const stride = typeof (args[7]) === "number" ? args[7] : 1;
            exports.bind.PlotHistogram(label, values_getter, null, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
        else {
            const values_getter = args[0];
            const data = args[1];
            const values_count = args[2];
            const values_offset = typeof (args[3]) === "number" ? args[3] : 0;
            const overlay_text = typeof (args[4]) === "string" ? args[4] : null;
            const scale_min = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const scale_max = typeof (args[6]) === "number" ? args[6] : Number.MAX_VALUE;
            const graph_size = args[7] || ImVec2.ZERO;
            exports.bind.PlotHistogram(label, values_getter, data, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
    }
    // IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
    function ProgressBar(fraction, size_arg = new ImVec2(-1, 0), overlay = null) {
        exports.bind.ProgressBar(fraction, size_arg, overlay);
    }
    // Widgets: Combo Box
    // The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it.
    // The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
    // IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
    function BeginCombo(label, preview_value = null, flags = 0) {
        return exports.bind.BeginCombo(label, preview_value, flags);
    }
    // IMGUI_API void          EndCombo();
    function EndCombo() { exports.bind.EndCombo(); }
    function Combo(label, current_item, ...args) {
        let ret = false;
        const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
        if (Array.isArray(args[0])) {
            const items = args[0];
            const items_count = typeof (args[1]) === "number" ? args[1] : items.length;
            const popup_max_height_in_items = typeof (args[2]) === "number" ? args[2] : -1;
            const items_getter = (data, idx, out_text) => { out_text[0] = items[idx]; return true; };
            ret = exports.bind.Combo(label, _current_item, items_getter, null, items_count, popup_max_height_in_items);
        }
        else if (typeof (args[0]) === "string") {
            const items_separated_by_zeros = args[0];
            const popup_max_height_in_items = typeof (args[1]) === "number" ? args[1] : -1;
            const items = items_separated_by_zeros.replace(/^\0+|\0+$/g, "").split("\0");
            const items_count = items.length;
            const items_getter = (data, idx, out_text) => { out_text[0] = items[idx]; return true; };
            ret = exports.bind.Combo(label, _current_item, items_getter, null, items_count, popup_max_height_in_items);
        }
        else {
            const items_getter = args[0];
            const data = args[1];
            const items_count = args[2];
            const popup_max_height_in_items = typeof (args[3]) === "number" ? args[3] : -1;
            ret = exports.bind.Combo(label, _current_item, items_getter, data, items_count, popup_max_height_in_items);
        }
        if (!Array.isArray(current_item)) {
            current_item(_current_item[0]);
        }
        return ret;
    }
    // Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
    // IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
    function DragFloat(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.DragFloat(label, _v, v_speed, v_min, v_max, display_format, power);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat2(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        const _v = import_Vector2(v);
        const ret = exports.bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, power);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat3(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        const _v = import_Vector3(v);
        const ret = exports.bind.DragFloat3(label, _v, v_speed, v_min, v_max, display_format, power);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat4(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        const _v = import_Vector4(v);
        const ret = exports.bind.DragFloat4(label, _v, v_speed, v_min, v_max, display_format, power);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", const char* display_format_max = NULL, float power = 1.0f);
    function DragFloatRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", display_format_max = null, power = 1.0) {
        const _v_current_min = import_Scalar(v_current_min);
        const _v_current_max = import_Scalar(v_current_max);
        const ret = exports.bind.DragFloatRange2(label, _v_current_min, _v_current_max, v_speed, v_min, v_max, display_format, display_format_max, power);
        export_Scalar(_v_current_min, v_current_min);
        export_Scalar(_v_current_max, v_current_max);
        return ret;
    }
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%d");                                       // If v_min >= v_max we have no bound
    function DragInt(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        const _v = import_Scalar(v);
        const ret = exports.bind.DragInt(label, _v, v_speed, v_min, v_max, format);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt2(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        const _v = import_Vector2(v);
        const ret = exports.bind.DragInt2(label, _v, v_speed, v_min, v_max, format);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt3(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        const _v = import_Vector3(v);
        const ret = exports.bind.DragInt3(label, _v, v_speed, v_min, v_max, format);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt4(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        const _v = import_Vector4(v);
        const ret = exports.bind.DragInt4(label, _v, v_speed, v_min, v_max, format);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
    function DragIntRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", format_max = null) {
        const _v_current_min = import_Scalar(v_current_min);
        const _v_current_max = import_Scalar(v_current_max);
        const ret = exports.bind.DragIntRange2(label, _v_current_min, _v_current_max, v_speed, v_min, v_max, format, format_max);
        export_Scalar(_v_current_min, v_current_min);
        export_Scalar(_v_current_max, v_current_max);
        return ret;
    }
    // IMGUI_API bool          DragScalar(const char* label, ImGuiDataType data_type, void* v, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
    // IMGUI_API bool          DragScalarN(const char* label, ImGuiDataType data_type, void* v, int components, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
    function DragScalar(label, v, v_speed, v_min = null, v_max = null, format = null, power = 1.0) {
        if (v instanceof Int8Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.S8, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Uint8Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.U8, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Int16Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.S16, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Uint16Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.U16, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Int32Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.S32, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.U32, v, v_speed, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.DragScalar(label, ImGuiDataType.S64, v, v_speed, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.DragScalar(label, ImGuiDataType.U64, v, v_speed, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.Float, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return exports.bind.DragScalar(label, exports.ImGuiDataType.Double, v, v_speed, v_min, v_max, format, power);
        }
        throw new Error();
    }
    // Widgets: Input with Keyboard
    // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return exports.bind.InputText(label, buf, buf_size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = exports.bind.InputText(label, ref_buf, _buf_size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = exports.bind.InputText(label, ref_buf, buf_size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    // IMGUI_API bool          InputTextWithHint(const char* label, const char* hint, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    function InputTextWithHint(label, hint, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return exports.bind.InputTextWithHint(label, hint, buf, buf_size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = exports.bind.InputTextWithHint(label, hint, ref_buf, _buf_size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = exports.bind.InputTextWithHint(label, hint, ref_buf, buf_size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return exports.bind.InputTextMultiline(label, buf, buf_size, size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = exports.bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = exports.bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat(label, v, step = 0.0, step_fast = 0.0, format = "%.3f", extra_flags = 0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.InputFloat(label, _v, step, step_fast, format, extra_flags);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat2(label, v, format = "%.3f", extra_flags = 0) {
        const _v = import_Vector2(v);
        const ret = exports.bind.InputFloat2(label, _v, format, extra_flags);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat3(label, v, format = "%.3f", extra_flags = 0) {
        const _v = import_Vector3(v);
        const ret = exports.bind.InputFloat3(label, _v, format, extra_flags);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat4(label, v, format = "%.3f", extra_flags = 0) {
        const _v = import_Vector4(v);
        const ret = exports.bind.InputFloat4(label, _v, format, extra_flags);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
    function InputInt(label, v, step = 1, step_fast = 100, extra_flags = 0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.InputInt(label, _v, step, step_fast, extra_flags);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
    function InputInt2(label, v, extra_flags = 0) {
        const _v = import_Vector2(v);
        const ret = exports.bind.InputInt2(label, _v, extra_flags);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
    function InputInt3(label, v, extra_flags = 0) {
        const _v = import_Vector3(v);
        const ret = exports.bind.InputInt3(label, _v, extra_flags);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
    function InputInt4(label, v, extra_flags = 0) {
        const _v = import_Vector4(v);
        const ret = exports.bind.InputInt4(label, _v, extra_flags);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputDouble(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.6f", ImGuiInputTextFlags extra_flags = 0);
    function InputDouble(label, v, step = 0.0, step_fast = 0.0, format = "%.6f", extra_flags = 0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.InputDouble(label, _v, step, step_fast, format, extra_flags);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          InputScalar(const char* label, ImGuiDataType data_type, void* v, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
    // IMGUI_API bool          InputScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
    function InputScalar(label, v, step = null, step_fast = null, format = null, extra_flags = 0) {
        if (v instanceof Int8Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.S8, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Uint8Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.U8, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Int16Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.S16, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Uint16Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.U16, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Int32Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.S32, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Uint32Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.U32, v, step, step_fast, format, extra_flags);
        }
        // if (v instanceof Int64Array) { return bind.InputScalar(label, ImGuiDataType.S64, v, step, step_fast, format, extra_flags); }
        // if (v instanceof Uint64Array) { return bind.InputScalar(label, ImGuiDataType.U64, v, step, step_fast, format, extra_flags); }
        if (v instanceof Float32Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.Float, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Float64Array) {
            return exports.bind.InputScalar(label, exports.ImGuiDataType.Double, v, step, step_fast, format, extra_flags);
        }
        throw new Error();
    }
    // Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);     // adjust format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
    function SliderFloat(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.SliderFloat(label, _v, v_min, v_max, format, power);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat2(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        const _v = import_Vector2(v);
        const ret = exports.bind.SliderFloat2(label, _v, v_min, v_max, format, power);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat3(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        const _v = import_Vector3(v);
        const ret = exports.bind.SliderFloat3(label, _v, v_min, v_max, format, power);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat4(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        const _v = import_Vector4(v);
        const ret = exports.bind.SliderFloat4(label, _v, v_min, v_max, format, power);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
    function SliderAngle(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0) {
        const _v_rad = import_Scalar(v_rad);
        const ret = exports.bind.SliderAngle(label, _v_rad, v_degrees_min, v_degrees_max);
        export_Scalar(_v_rad, v_rad);
        return ret;
    }
    function SliderAngle3(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0) {
        const _v_rad = import_Vector3(v_rad);
        _v_rad[0] = Math.floor(_v_rad[0] * 180 / Math.PI);
        _v_rad[1] = Math.floor(_v_rad[1] * 180 / Math.PI);
        _v_rad[2] = Math.floor(_v_rad[2] * 180 / Math.PI);
        const ret = exports.bind.SliderInt3(label, _v_rad, v_degrees_min, v_degrees_max, "%d deg");
        _v_rad[0] = _v_rad[0] * Math.PI / 180;
        _v_rad[1] = _v_rad[1] * Math.PI / 180;
        _v_rad[2] = _v_rad[2] * Math.PI / 180;
        export_Vector3(_v_rad, v_rad);
        return ret;
    }
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d");
    function SliderInt(label, v, v_min, v_max, format = "%d") {
        const _v = import_Scalar(v);
        const ret = exports.bind.SliderInt(label, _v, v_min, v_max, format);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d");
    function SliderInt2(label, v, v_min, v_max, format = "%d") {
        const _v = import_Vector2(v);
        const ret = exports.bind.SliderInt2(label, _v, v_min, v_max, format);
        export_Vector2(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d");
    function SliderInt3(label, v, v_min, v_max, format = "%d") {
        const _v = import_Vector3(v);
        const ret = exports.bind.SliderInt3(label, _v, v_min, v_max, format);
        export_Vector3(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d");
    function SliderInt4(label, v, v_min, v_max, format = "%d") {
        const _v = import_Vector4(v);
        const ret = exports.bind.SliderInt4(label, _v, v_min, v_max, format);
        export_Vector4(_v, v);
        return ret;
    }
    // IMGUI_API bool          SliderScalar(const char* label, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    // IMGUI_API bool          SliderScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    function SliderScalar(label, v, v_min, v_max, format = null, power = 1.0) {
        if (v instanceof Int8Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.S8, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint8Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.U8, v, v_min, v_max, format, power);
        }
        if (v instanceof Int16Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.S16, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint16Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.U16, v, v_min, v_max, format, power);
        }
        if (v instanceof Int32Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.S32, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.U32, v, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.SliderScalar(label, ImGuiDataType.S64, v, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.SliderScalar(label, ImGuiDataType.U64, v, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.Float, v, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return exports.bind.SliderScalar(label, exports.ImGuiDataType.Double, v, v_min, v_max, format, power);
        }
        throw new Error();
    }
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function VSliderFloat(label, size, v, v_min, v_max, format = "%.3f", power = 1.0) {
        const _v = import_Scalar(v);
        const ret = exports.bind.VSliderFloat(label, size, _v, v_min, v_max, format, power);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d");
    function VSliderInt(label, size, v, v_min, v_max, format = "%d") {
        const _v = import_Scalar(v);
        const ret = exports.bind.VSliderInt(label, size, _v, v_min, v_max, format);
        export_Scalar(_v, v);
        return ret;
    }
    // IMGUI_API bool          VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    function VSliderScalar(label, size, data_type, v, v_min, v_max, format = null, power = 1.0) {
        if (v instanceof Int8Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.S8, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint8Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.U8, v, v_min, v_max, format, power);
        }
        if (v instanceof Int16Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.S16, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint16Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.U16, v, v_min, v_max, format, power);
        }
        if (v instanceof Int32Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.S32, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.U32, v, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.S64, v, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.U64, v, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.Float, v, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return exports.bind.VSliderScalar(label, size, exports.ImGuiDataType.Double, v, v_min, v_max, format, power);
        }
        throw new Error();
    }
    // Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
    // Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
    // IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    function ColorEdit3(label, col, flags = 0) {
        const _col = import_Color3(col);
        const ret = exports.bind.ColorEdit3(label, _col, flags);
        export_Color3(_col, col);
        return ret;
    }
    // IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
    function ColorEdit4(label, col, flags = 0) {
        const _col = import_Color4(col);
        const ret = exports.bind.ColorEdit4(label, _col, flags);
        export_Color4(_col, col);
        return ret;
    }
    // IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    function ColorPicker3(label, col, flags = 0) {
        const _col = import_Color3(col);
        const ret = exports.bind.ColorPicker3(label, _col, flags);
        export_Color3(_col, col);
        return ret;
    }
    // IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
    function ColorPicker4(label, col, flags = 0, ref_col = null) {
        const _col = import_Color4(col);
        const _ref_col = ref_col ? import_Color4(ref_col) : null;
        const ret = exports.bind.ColorPicker4(label, _col, flags, _ref_col);
        export_Color4(_col, col);
        if (_ref_col && ref_col) {
            export_Color4(_ref_col, ref_col);
        }
        return ret;
    }
    // IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
    function ColorButton(desc_id, col, flags = 0, size = ImVec2.ZERO) {
        return exports.bind.ColorButton(desc_id, col, flags, size);
    }
    // IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
    function SetColorEditOptions(flags) {
        exports.bind.SetColorEditOptions(flags);
    }
    function TreeNode(...args) {
        if (typeof (args[0]) === "string") {
            if (args.length === 1) {
                const label = args[0];
                return exports.bind.TreeNode_A(label);
            }
            else {
                const str_id = args[0];
                const fmt = args[1];
                return exports.bind.TreeNode_B(str_id, fmt);
            }
        }
        else {
            const ptr_id = args[0];
            const fmt = args[1];
            return exports.bind.TreeNode_C(ptr_id, fmt);
        }
    }
    function TreeNodeEx(...args) {
        if (typeof (args[0]) === "string") {
            if (args.length < 3) {
                const label = args[0];
                const flags = args[1] || 0;
                return exports.bind.TreeNodeEx_A(label, flags);
            }
            else {
                const str_id = args[0];
                const flags = args[1];
                const fmt = args[2];
                return exports.bind.TreeNodeEx_B(str_id, flags, fmt);
            }
        }
        else {
            const ptr_id = args[0];
            const flags = args[1];
            const fmt = args[2];
            return exports.bind.TreeNodeEx_C(ptr_id, flags, fmt);
        }
    }
    function TreePush(...args) {
        if (typeof (args[0]) === "string") {
            const str_id = args[0];
            exports.bind.TreePush_A(str_id);
        }
        else {
            const ptr_id = args[0];
            exports.bind.TreePush_B(ptr_id);
        }
    }
    // IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
    function TreePop() { exports.bind.TreePop(); }
    // IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
    function TreeAdvanceToLabelPos() { exports.bind.TreeAdvanceToLabelPos(); }
    // IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
    function GetTreeNodeToLabelSpacing() { return exports.bind.GetTreeNodeToLabelSpacing(); }
    function CollapsingHeader(label, ...args) {
        if (args.length === 0) {
            return exports.bind.CollapsingHeader_A(label, 0);
        }
        else {
            if (typeof (args[0]) === "number") {
                const flags = args[0];
                return exports.bind.CollapsingHeader_A(label, flags);
            }
            else {
                const p_open = args[0];
                const flags = args[1] || 0;
                const ref_open = Array.isArray(p_open) ? p_open : [p_open()];
                const ret = exports.bind.CollapsingHeader_B(label, ref_open, flags);
                if (!Array.isArray(p_open)) {
                    p_open(ref_open[0]);
                }
                return ret;
            }
        }
    }
    // IMGUI_API void          SetNextItemOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    function SetNextItemOpen(is_open, cond = 0) {
        exports.bind.SetNextItemOpen(is_open, cond);
    }
    function Selectable(label, ...args) {
        if (args.length === 0) {
            return exports.bind.Selectable_A(label, false, 0, ImVec2.ZERO);
        }
        else {
            if (typeof (args[0]) === "boolean") {
                const selected = args[0];
                const flags = args[1] || 0;
                const size = args[2] || ImVec2.ZERO;
                return exports.bind.Selectable_A(label, selected, flags, size);
            }
            else {
                const p_selected = args[0];
                const flags = args[1] || 0;
                const size = args[2] || ImVec2.ZERO;
                const ref_selected = Array.isArray(p_selected) ? p_selected : [p_selected()];
                const ret = exports.bind.Selectable_B(label, ref_selected, flags, size);
                if (!Array.isArray(p_selected)) {
                    p_selected(ref_selected[0]);
                }
                return ret;
            }
        }
    }
    function ListBox(label, current_item, ...args) {
        let ret = false;
        const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
        if (Array.isArray(args[0])) {
            const items = args[0];
            const items_count = typeof (args[1]) === "number" ? args[1] : items.length;
            const height_in_items = typeof (args[2]) === "number" ? args[2] : -1;
            ret = exports.bind.ListBox_A(label, _current_item, items, items_count, height_in_items);
        }
        else {
            const items_getter = args[0];
            const data = args[1];
            const items_count = args[2];
            const height_in_items = typeof (args[3]) === "number" ? args[3] : -1;
            ret = exports.bind.ListBox_B(label, _current_item, items_getter, data, items_count, height_in_items);
        }
        if (!Array.isArray(current_item)) {
            current_item(_current_item[0]);
        }
        return ret;
    }
    function ListBoxHeader(label, ...args) {
        if (typeof (args[0]) === "object") {
            const size = args[0];
            return exports.bind.ListBoxHeader_A(label, size);
        }
        else {
            const items_count = args[0];
            const height_in_items = typeof (args[1]) === "number" ? args[1] : -1;
            return exports.bind.ListBoxHeader_B(label, items_count, height_in_items);
        }
    }
    // IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
    function ListBoxFooter() {
        exports.bind.ListBoxFooter();
    }
    function Value(prefix, ...args) {
        if (typeof (args[0]) === "boolean") {
            exports.bind.Value_A(prefix, args[0]);
        }
        else if (typeof (args[0]) === "number") {
            if (Number.isInteger(args[0])) {
                exports.bind.Value_B(prefix, args[0]);
            }
            else {
                exports.bind.Value_D(prefix, args[0], typeof (args[1]) === "string" ? args[1] : null);
            }
        }
        else {
            exports.bind.Text(prefix + String(args[0]));
        }
    }
    // Tooltips
    // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
    function BeginTooltip() { exports.bind.BeginTooltip(); }
    // IMGUI_API void          EndTooltip();
    function EndTooltip() { exports.bind.EndTooltip(); }
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    function SetTooltip(fmt) {
        exports.bind.SetTooltip(fmt);
    }
    // Menus
    // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
    function BeginMainMenuBar() { return exports.bind.BeginMainMenuBar(); }
    // IMGUI_API void          EndMainMenuBar();
    function EndMainMenuBar() { exports.bind.EndMainMenuBar(); }
    // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
    function BeginMenuBar() { return exports.bind.BeginMenuBar(); }
    // IMGUI_API void          EndMenuBar();
    function EndMenuBar() { exports.bind.EndMenuBar(); }
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    function BeginMenu(label, enabled = true) { return exports.bind.BeginMenu(label, enabled); }
    // IMGUI_API void          EndMenu();
    function EndMenu() { exports.bind.EndMenu(); }
    function MenuItem(label, ...args) {
        if (args.length === 0) {
            return exports.bind.MenuItem_A(label, null, false, true);
        }
        else if (args.length === 1) {
            const shortcut = args[0];
            return exports.bind.MenuItem_A(label, shortcut, false, true);
        }
        else {
            const shortcut = args[0];
            if (typeof (args[1]) === "boolean") {
                const selected = args[1];
                const enabled = typeof (args[2]) === "boolean" ? args[2] : true;
                return exports.bind.MenuItem_A(label, shortcut, selected, enabled);
            }
            else {
                const p_selected = args[1];
                const enabled = typeof (args[2]) === "boolean" ? args[2] : true;
                const ref_selected = Array.isArray(p_selected) ? p_selected : [p_selected()];
                const ret = exports.bind.MenuItem_B(label, shortcut, ref_selected, enabled);
                if (!Array.isArray(p_selected)) {
                    p_selected(ref_selected[0]);
                }
                return ret;
            }
        }
    }
    // Popups
    // IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
    function OpenPopup(str_id) { exports.bind.OpenPopup(str_id); }
    // IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
    function OpenPopupOnItemClick(str_id = null, mouse_button = 1) {
        return exports.bind.OpenPopupOnItemClick(str_id, mouse_button);
    }
    // IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
    function BeginPopup(str_id) { return exports.bind.BeginPopup(str_id); }
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
    function BeginPopupModal(str_id = "", p_open = null, extra_flags = 0) {
        if (Array.isArray(p_open)) {
            return exports.bind.BeginPopupModal(str_id, p_open, extra_flags);
        }
        else if (typeof (p_open) === "function") {
            const _p_open = [p_open()];
            const ret = exports.bind.BeginPopupModal(str_id, _p_open, extra_flags);
            p_open(_p_open[0]);
            return ret;
        }
        else {
            return exports.bind.BeginPopupModal(str_id, null, extra_flags);
        }
    }
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    function BeginPopupContextItem(str_id = null, mouse_button = 1) {
        return exports.bind.BeginPopupContextItem(str_id, mouse_button);
    }
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
    function BeginPopupContextWindow(str_id = null, mouse_button = 1, also_over_items = true) {
        return exports.bind.BeginPopupContextWindow(str_id, mouse_button, also_over_items);
    }
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
    function BeginPopupContextVoid(str_id = null, mouse_button = 1) {
        return exports.bind.BeginPopupContextVoid(str_id, mouse_button);
    }
    // IMGUI_API void          EndPopup();
    function EndPopup() { exports.bind.EndPopup(); }
    // IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
    function IsPopupOpen(str_id) { return exports.bind.IsPopupOpen(str_id); }
    // IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
    function CloseCurrentPopup() { exports.bind.CloseCurrentPopup(); }
    // Tab Bars, Tabs
    // [BETA API] API may evolve!
    // IMGUI_API bool          BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0);        // create and append into a TabBar
    function BeginTabBar(str_id, flags = 0) { return exports.bind.BeginTabBar(str_id, flags); }
    // IMGUI_API void          EndTabBar();                                                        // only call EndTabBar() if BeginTabBar() returns true!
    function EndTabBar() { exports.bind.EndTabBar(); }
    // IMGUI_API bool          BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0);// create a Tab. Returns true if the Tab is selected.
    function BeginTabItem(label, p_open = null, flags = 0) {
        // return bind.BeginTabItem(label, p_open, flags);
        if (p_open === null) {
            return exports.bind.BeginTabItem(label, null, flags);
        }
        else if (Array.isArray(p_open)) {
            return exports.bind.BeginTabItem(label, p_open, flags);
        }
        else {
            const ref_open = [p_open()];
            const ret = exports.bind.BeginTabItem(label, ref_open, flags);
            p_open(ref_open[0]);
            return ret;
        }
    }
    // IMGUI_API void          EndTabItem();                                                       // only call EndTabItem() if BeginTabItem() returns true!
    function EndTabItem() { exports.bind.EndTabItem(); }
    // IMGUI_API void          SetTabItemClosed(const char* tab_or_docked_window_label);           // notify TabBar or Docking system of a closed tab/window ahead (useful to reduce visual flicker on reorderable tab bars). For tab-bar: call after BeginTabBar() and before Tab submissions. Otherwise call with a window name.
    function SetTabItemClosed(tab_or_docked_window_label) { exports.bind.SetTabItemClosed(tab_or_docked_window_label); }
    // Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
    // IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
    function LogToTTY(max_depth = -1) {
        exports.bind.LogToTTY(max_depth);
    }
    // IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
    function LogToFile(max_depth = -1, filename = null) {
        exports.bind.LogToFile(max_depth, filename);
    }
    // IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
    function LogToClipboard(max_depth = -1) {
        exports.bind.LogToClipboard(max_depth);
    }
    // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
    function LogFinish() { exports.bind.LogFinish(); }
    // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
    function LogButtons() { exports.bind.LogButtons(); }
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    function LogText(fmt) {
        exports.bind.LogText(fmt);
    }
    const _ImGui_DragDropPayload_data = {};
    // Drag and Drop
    // [BETA API] Missing Demo code. API may evolve.
    // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
    function BeginDragDropSource(flags = 0) {
        return exports.bind.BeginDragDropSource(flags);
    }
    // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
    function SetDragDropPayload(type, data, cond = 0) {
        _ImGui_DragDropPayload_data[type] = data;
        return exports.bind.SetDragDropPayload(type, data, 0, cond);
    }
    // IMGUI_API void          EndDragDropSource();
    function EndDragDropSource() {
        exports.bind.EndDragDropSource();
    }
    // IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
    function BeginDragDropTarget() {
        return exports.bind.BeginDragDropTarget();
    }
    // IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
    function AcceptDragDropPayload(type, flags = 0) {
        const data = _ImGui_DragDropPayload_data[type];
        return exports.bind.AcceptDragDropPayload(type, flags) ? { Data: data } : null;
    }
    // IMGUI_API void          EndDragDropTarget();
    function EndDragDropTarget() {
        exports.bind.EndDragDropTarget();
    }
    // Clipping
    // IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
    function PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect) {
        exports.bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    // IMGUI_API void          PopClipRect();
    function PopClipRect() {
        exports.bind.PopClipRect();
    }
    // Focus
    // (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
    // (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
    // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
    function SetItemDefaultFocus() { exports.bind.SetItemDefaultFocus(); }
    // IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
    function SetKeyboardFocusHere(offset = 0) {
        exports.bind.SetKeyboardFocusHere(offset);
    }
    // Utilities
    // IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
    function IsItemHovered(flags = 0) {
        return exports.bind.IsItemHovered(flags);
    }
    // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
    function IsItemActive() { return exports.bind.IsItemActive(); }
    // IMGUI_API bool          IsItemEdited();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
    function IsItemEdited() { return exports.bind.IsItemEdited(); }
    // IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
    function IsItemFocused() { return exports.bind.IsItemFocused(); }
    // IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
    function IsItemClicked(mouse_button = 0) {
        return exports.bind.IsItemClicked(mouse_button);
    }
    // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
    function IsItemVisible() { return exports.bind.IsItemVisible(); }
    // IMGUI_API bool          IsItemActivated();                                                  // was the last item just made active (item was previously inactive).
    function IsItemActivated() { return exports.bind.IsItemActivated(); }
    // IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
    function IsItemDeactivated() { return exports.bind.IsItemDeactivated(); }
    // IMGUI_API bool          IsItemDeactivatedAfterEdit();                                     // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
    function IsItemDeactivatedAfterEdit() { return exports.bind.IsItemDeactivatedAfterEdit(); }
    // IMGUI_API bool          IsAnyItemHovered();
    function IsAnyItemHovered() { return exports.bind.IsAnyItemHovered(); }
    // IMGUI_API bool          IsAnyItemActive();
    function IsAnyItemActive() { return exports.bind.IsAnyItemActive(); }
    // IMGUI_API bool          IsAnyItemFocused();
    function IsAnyItemFocused() { return exports.bind.IsAnyItemFocused(); }
    // IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
    function GetItemRectMin(out = new ImVec2()) {
        return exports.bind.GetItemRectMin(out);
    }
    // IMGUI_API ImVec2        GetItemRectMax();                                                   // "
    function GetItemRectMax(out = new ImVec2()) {
        return exports.bind.GetItemRectMax(out);
    }
    // IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
    function GetItemRectSize(out = new ImVec2()) {
        return exports.bind.GetItemRectSize(out);
    }
    // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
    function SetItemAllowOverlap() { exports.bind.SetItemAllowOverlap(); }
    // IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
    function IsWindowFocused(flags = 0) {
        return exports.bind.IsWindowFocused(flags);
    }
    // IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
    function IsWindowHovered(flags = 0) {
        return exports.bind.IsWindowHovered(flags);
    }
    function IsRectVisible(...args) {
        if (args.length === 1) {
            const size = args[0];
            return exports.bind.IsRectVisible_A(size);
        }
        else {
            const rect_min = args[0];
            const rect_max = args[1];
            return exports.bind.IsRectVisible_B(rect_min, rect_max);
        }
    }
    // IMGUI_API float         GetTime();
    function GetTime() { return exports.bind.GetTime(); }
    // IMGUI_API int           GetFrameCount();
    function GetFrameCount() { return exports.bind.GetFrameCount(); }
    function GetBackgroundDrawList() {
        return new ImDrawList(exports.bind.GetBackgroundDrawList());
    }
    function GetForegroundDrawList() {
        return new ImDrawList(exports.bind.GetForegroundDrawList());
    }
    // IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
    function GetDrawListSharedData() {
        return new ImDrawListSharedData(exports.bind.GetDrawListSharedData());
    }
    // IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
    function GetStyleColorName(idx) { return exports.bind.GetStyleColorName(idx); }
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    function CalcTextSize(text, text_end = null, hide_text_after_double_hash = false, wrap_width = -1, out = new ImVec2()) {
        return exports.bind.CalcTextSize(text_end !== null ? text.substring(0, text_end) : text, hide_text_after_double_hash, wrap_width, out);
    }
    // IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
    function CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end) {
        return exports.bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
    }
    // IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
    function BeginChildFrame(id, size, extra_flags = 0) {
        return exports.bind.BeginChildFrame(id, size, extra_flags);
    }
    // IMGUI_API void          EndChildFrame();
    function EndChildFrame() { exports.bind.EndChildFrame(); }
    // IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
    function ColorConvertU32ToFloat4(in_, out = new ImVec4()) {
        return exports.bind.ColorConvertU32ToFloat4(in_, out);
    }
    // IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
    function ColorConvertFloat4ToU32(in_) {
        return exports.bind.ColorConvertFloat4ToU32(in_);
    }
    // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
    function ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v) { exports.bind.ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v); }
    // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
    function ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b) { exports.bind.ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b); }
    // Inputs
    // IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
    function GetKeyIndex(imgui_key) {
        return exports.bind.GetKeyIndex(imgui_key);
    }
    // IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
    function IsKeyDown(user_key_index) {
        return exports.bind.IsKeyDown(user_key_index);
    }
    // IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
    function IsKeyPressed(user_key_index, repeat = true) {
        return exports.bind.IsKeyPressed(user_key_index, repeat);
    }
    // IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
    function IsKeyReleased(user_key_index) {
        return exports.bind.IsKeyReleased(user_key_index);
    }
    // IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
    function GetKeyPressedAmount(user_key_index, repeat_delay, rate) {
        return exports.bind.GetKeyPressedAmount(user_key_index, repeat_delay, rate);
    }
    // IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
    function IsMouseDown(button) {
        return exports.bind.IsMouseDown(button);
    }
    // IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
    function IsMouseClicked(button, repeat = false) {
        return exports.bind.IsMouseClicked(button, repeat);
    }
    // IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
    function IsMouseDoubleClicked(button) {
        return exports.bind.IsMouseDoubleClicked(button);
    }
    // IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
    function IsMouseReleased(button) {
        return exports.bind.IsMouseReleased(button);
    }
    // IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    function IsMouseDragging(button = 0, lock_threshold = -1.0) {
        return exports.bind.IsMouseDragging(button, lock_threshold);
    }
    // IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
    function IsMouseHoveringRect(r_min, r_max, clip = true) {
        return exports.bind.IsMouseHoveringRect(r_min, r_max, clip);
    }
    // IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
    function IsMousePosValid(mouse_pos = null) {
        return exports.bind.IsMousePosValid(mouse_pos);
    }
    // IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
    function GetMousePos(out = new ImVec2()) {
        return exports.bind.GetMousePos(out);
    }
    // IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
    function GetMousePosOnOpeningCurrentPopup(out = new ImVec2()) {
        return exports.bind.GetMousePosOnOpeningCurrentPopup(out);
    }
    // IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    function GetMouseDragDelta(button = 0, lock_threshold = -1.0, out = new ImVec2()) {
        return exports.bind.GetMouseDragDelta(button, lock_threshold, out);
    }
    // IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
    function ResetMouseDragDelta(button = 0) {
        exports.bind.ResetMouseDragDelta(button);
    }
    // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
    function GetMouseCursor() { return exports.bind.GetMouseCursor(); }
    // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
    function SetMouseCursor(type) { exports.bind.SetMouseCursor(type); }
    // IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
    function CaptureKeyboardFromApp(capture = true) {
        return exports.bind.CaptureKeyboardFromApp(capture);
    }
    // IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
    function CaptureMouseFromApp(capture = true) {
        exports.bind.CaptureMouseFromApp(capture);
    }
    // Clipboard Utilities (also see the LogToClipboard() function to capture or output text data to the clipboard)
    // IMGUI_API const char*   GetClipboardText();
    function GetClipboardText() { return exports.bind.GetClipboardText(); }
    // IMGUI_API void          SetClipboardText(const char* text);
    function SetClipboardText(text) { exports.bind.SetClipboardText(text); }
    // Settings/.Ini Utilities
    // The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
    // Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.
    // IMGUI_API void          LoadIniSettingsFromDisk(const char* ini_filename);                  // call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).
    function LoadIniSettingsFromDisk(ini_filename) { throw new Error(); } // TODO
    // IMGUI_API void          LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0); // call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.
    function LoadIniSettingsFromMemory(ini_data, ini_size = 0) { exports.bind.LoadIniSettingsFromMemory(ini_data); }
    // IMGUI_API void          SaveIniSettingsToDisk(const char* ini_filename);
    function SaveIniSettingsToDisk(ini_filename) { throw new Error(); } // TODO
    // IMGUI_API const char*   SaveIniSettingsToMemory(size_t* out_ini_size = NULL);               // return a zero-terminated string with the .ini data which you can save by your own mean. call when io.WantSaveIniSettings is set, then save data by your own mean and clear io.WantSaveIniSettings.
    function SaveIniSettingsToMemory(out_ini_size = null) { return exports.bind.SaveIniSettingsToMemory(); }
    // Memory Utilities
    // All those functions are not reliant on the current context.
    // If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again.
    // IMGUI_API void          SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void(*free_func)(void* ptr, void* user_data), void* user_data = NULL);
    function SetAllocatorFunctions(alloc_func, free_func, user_data = null) {
        exports.bind.SetAllocatorFunctions(alloc_func, free_func, user_data);
    }
    // IMGUI_API void*         MemAlloc(size_t sz);
    function MemAlloc(sz) { exports.bind.MemAlloc(sz); }
    // IMGUI_API void          MemFree(void* ptr);
    function MemFree(ptr) { exports.bind.MemFree(ptr); }

    exports.AcceptDragDropPayload = AcceptDragDropPayload;
    exports.AlignTextToFramePadding = AlignTextToFramePadding;
    exports.ArrowButton = ArrowButton;
    exports.BackendFlags = exports.ImGuiBackendFlags;
    exports.Begin = Begin;
    exports.BeginChild = BeginChild;
    exports.BeginChildFrame = BeginChildFrame;
    exports.BeginCombo = BeginCombo;
    exports.BeginDragDropSource = BeginDragDropSource;
    exports.BeginDragDropTarget = BeginDragDropTarget;
    exports.BeginGroup = BeginGroup;
    exports.BeginMainMenuBar = BeginMainMenuBar;
    exports.BeginMenu = BeginMenu;
    exports.BeginMenuBar = BeginMenuBar;
    exports.BeginPopup = BeginPopup;
    exports.BeginPopupContextItem = BeginPopupContextItem;
    exports.BeginPopupContextVoid = BeginPopupContextVoid;
    exports.BeginPopupContextWindow = BeginPopupContextWindow;
    exports.BeginPopupModal = BeginPopupModal;
    exports.BeginTabBar = BeginTabBar;
    exports.BeginTabItem = BeginTabItem;
    exports.BeginTooltip = BeginTooltip;
    exports.Bind = bindImgui$1;
    exports.Bullet = Bullet;
    exports.BulletText = BulletText;
    exports.Button = Button;
    exports.CalcItemWidth = CalcItemWidth;
    exports.CalcListClipping = CalcListClipping;
    exports.CalcTextSize = CalcTextSize;
    exports.CaptureKeyboardFromApp = CaptureKeyboardFromApp;
    exports.CaptureMouseFromApp = CaptureMouseFromApp;
    exports.Checkbox = Checkbox;
    exports.CheckboxFlags = CheckboxFlags;
    exports.CloseCurrentPopup = CloseCurrentPopup;
    exports.Col = exports.ImGuiCol;
    exports.CollapsingHeader = CollapsingHeader;
    exports.ColorButton = ColorButton;
    exports.ColorConvertFloat4ToU32 = ColorConvertFloat4ToU32;
    exports.ColorConvertHSVtoRGB = ColorConvertHSVtoRGB;
    exports.ColorConvertRGBtoHSV = ColorConvertRGBtoHSV;
    exports.ColorConvertU32ToFloat4 = ColorConvertU32ToFloat4;
    exports.ColorEdit3 = ColorEdit3;
    exports.ColorEdit4 = ColorEdit4;
    exports.ColorEditFlags = exports.ImGuiColorEditFlags;
    exports.ColorPicker3 = ColorPicker3;
    exports.ColorPicker4 = ColorPicker4;
    exports.Columns = Columns;
    exports.Combo = Combo;
    exports.ComboFlags = exports.ImGuiComboFlags;
    exports.Cond = exports.ImGuiCond;
    exports.ConfigFlags = exports.ImGuiConfigFlags;
    exports.CreateContext = CreateContext;
    exports.DataType = exports.ImGuiDataType;
    exports.DebugCheckVersionAndDataLayout = DebugCheckVersionAndDataLayout;
    exports.DestroyContext = DestroyContext;
    exports.Dir = exports.ImGuiDir;
    exports.DragDropFlags = exports.ImGuiDragDropFlags;
    exports.DragFloat = DragFloat;
    exports.DragFloat2 = DragFloat2;
    exports.DragFloat3 = DragFloat3;
    exports.DragFloat4 = DragFloat4;
    exports.DragFloatRange2 = DragFloatRange2;
    exports.DragInt = DragInt;
    exports.DragInt2 = DragInt2;
    exports.DragInt3 = DragInt3;
    exports.DragInt4 = DragInt4;
    exports.DragIntRange2 = DragIntRange2;
    exports.DragScalar = DragScalar;
    exports.Dummy = Dummy;
    exports.End = End;
    exports.EndChild = EndChild;
    exports.EndChildFrame = EndChildFrame;
    exports.EndCombo = EndCombo;
    exports.EndDragDropSource = EndDragDropSource;
    exports.EndDragDropTarget = EndDragDropTarget;
    exports.EndFrame = EndFrame;
    exports.EndGroup = EndGroup;
    exports.EndMainMenuBar = EndMainMenuBar;
    exports.EndMenu = EndMenu;
    exports.EndMenuBar = EndMenuBar;
    exports.EndPopup = EndPopup;
    exports.EndTabBar = EndTabBar;
    exports.EndTabItem = EndTabItem;
    exports.EndTooltip = EndTooltip;
    exports.FocusedFlags = exports.ImGuiFocusedFlags;
    exports.GetBackgroundDrawList = GetBackgroundDrawList;
    exports.GetClipboardText = GetClipboardText;
    exports.GetColorU32 = GetColorU32;
    exports.GetColumnIndex = GetColumnIndex;
    exports.GetColumnOffset = GetColumnOffset;
    exports.GetColumnWidth = GetColumnWidth;
    exports.GetColumnsCount = GetColumnsCount;
    exports.GetContentRegionAvail = GetContentRegionAvail;
    exports.GetContentRegionMax = GetContentRegionMax;
    exports.GetCurrentContext = GetCurrentContext;
    exports.GetCursorPos = GetCursorPos;
    exports.GetCursorPosX = GetCursorPosX;
    exports.GetCursorPosY = GetCursorPosY;
    exports.GetCursorScreenPos = GetCursorScreenPos;
    exports.GetCursorStartPos = GetCursorStartPos;
    exports.GetDrawData = GetDrawData;
    exports.GetDrawListSharedData = GetDrawListSharedData;
    exports.GetFont = GetFont;
    exports.GetFontSize = GetFontSize;
    exports.GetFontTexUvWhitePixel = GetFontTexUvWhitePixel;
    exports.GetForegroundDrawList = GetForegroundDrawList;
    exports.GetFrameCount = GetFrameCount;
    exports.GetFrameHeight = GetFrameHeight;
    exports.GetFrameHeightWithSpacing = GetFrameHeightWithSpacing;
    exports.GetID = GetID;
    exports.GetIO = GetIO;
    exports.GetItemRectMax = GetItemRectMax;
    exports.GetItemRectMin = GetItemRectMin;
    exports.GetItemRectSize = GetItemRectSize;
    exports.GetKeyIndex = GetKeyIndex;
    exports.GetKeyPressedAmount = GetKeyPressedAmount;
    exports.GetMouseCursor = GetMouseCursor;
    exports.GetMouseDragDelta = GetMouseDragDelta;
    exports.GetMousePos = GetMousePos;
    exports.GetMousePosOnOpeningCurrentPopup = GetMousePosOnOpeningCurrentPopup;
    exports.GetScrollMaxX = GetScrollMaxX;
    exports.GetScrollMaxY = GetScrollMaxY;
    exports.GetScrollX = GetScrollX;
    exports.GetScrollY = GetScrollY;
    exports.GetStyle = GetStyle;
    exports.GetStyleColorName = GetStyleColorName;
    exports.GetStyleColorVec4 = GetStyleColorVec4;
    exports.GetTextLineHeight = GetTextLineHeight;
    exports.GetTextLineHeightWithSpacing = GetTextLineHeightWithSpacing;
    exports.GetTime = GetTime;
    exports.GetTreeNodeToLabelSpacing = GetTreeNodeToLabelSpacing;
    exports.GetVersion = GetVersion;
    exports.GetWindowContentRegionMax = GetWindowContentRegionMax;
    exports.GetWindowContentRegionMin = GetWindowContentRegionMin;
    exports.GetWindowContentRegionWidth = GetWindowContentRegionWidth;
    exports.GetWindowDrawList = GetWindowDrawList;
    exports.GetWindowHeight = GetWindowHeight;
    exports.GetWindowPos = GetWindowPos;
    exports.GetWindowSize = GetWindowSize;
    exports.GetWindowWidth = GetWindowWidth;
    exports.HoveredFlags = exports.ImGuiHoveredFlags;
    exports.IMGUI_CHECKVERSION = IMGUI_CHECKVERSION;
    exports.IMGUI_PAYLOAD_TYPE_COLOR_3F = IMGUI_PAYLOAD_TYPE_COLOR_3F;
    exports.IMGUI_PAYLOAD_TYPE_COLOR_4F = IMGUI_PAYLOAD_TYPE_COLOR_4F;
    exports.IMGUI_VERSION = IMGUI_VERSION;
    exports.IMGUI_VERSION_NUM = IMGUI_VERSION_NUM;
    exports.IM_ARRAYSIZE = IM_ARRAYSIZE;
    exports.IM_ASSERT = IM_ASSERT;
    exports.IM_COL32 = IM_COL32;
    exports.IM_COL32_A_MASK = IM_COL32_A_MASK;
    exports.IM_COL32_A_SHIFT = IM_COL32_A_SHIFT;
    exports.IM_COL32_BLACK = IM_COL32_BLACK;
    exports.IM_COL32_BLACK_TRANS = IM_COL32_BLACK_TRANS;
    exports.IM_COL32_B_SHIFT = IM_COL32_B_SHIFT;
    exports.IM_COL32_G_SHIFT = IM_COL32_G_SHIFT;
    exports.IM_COL32_R_SHIFT = IM_COL32_R_SHIFT;
    exports.IM_COL32_WHITE = IM_COL32_WHITE;
    exports.ImColor = ImColor;
    exports.ImDrawCallback_ResetRenderState = ImDrawCallback_ResetRenderState;
    exports.ImDrawChannel = ImDrawChannel;
    exports.ImDrawCmd = ImDrawCmd;
    exports.ImDrawCornerFlags = exports.wCornerFlags;
    exports.ImDrawData = ImDrawData;
    exports.ImDrawIdxSize = ImDrawIdxSize;
    exports.ImDrawList = ImDrawList;
    exports.ImDrawListFlags = exports.wListFlags;
    exports.ImDrawListSharedData = ImDrawListSharedData;
    exports.ImDrawVert = ImDrawVert;
    exports.ImDrawVertColOffset = ImDrawVertColOffset;
    exports.ImDrawVertPosOffset = ImDrawVertPosOffset;
    exports.ImDrawVertSize = ImDrawVertSize;
    exports.ImDrawVertUVOffset = ImDrawVertUVOffset;
    exports.ImFont = ImFont;
    exports.ImFontAtlas = ImFontAtlas;
    exports.ImFontConfig = ImFontConfig;
    exports.ImFontGlyph = ImFontGlyph;
    exports.ImGuiContext = ImGuiContext;
    exports.ImGuiIO = ImGuiIO;
    exports.ImGuiInputTextCallbackData = ImGuiInputTextCallbackData;
    exports.ImGuiInputTextDefaultSize = ImGuiInputTextDefaultSize;
    exports.ImGuiInputTextFlags = exports.InputTextFlags;
    exports.ImGuiKey = exports.Key;
    exports.ImGuiListClipper = ImGuiListClipper;
    exports.ImGuiMouseCursor = exports.MouseCursor;
    exports.ImGuiNavInput = exports.NavInput;
    exports.ImGuiSelectableFlags = exports.SelectableFlags;
    exports.ImGuiSizeCallbackData = ImGuiSizeCallbackData;
    exports.ImGuiStorage = ImGuiStorage;
    exports.ImGuiStyle = ImGuiStyle;
    exports.ImGuiStyleVar = exports.StyleVar;
    exports.ImGuiTabBarFlags = exports.TabBarFlags;
    exports.ImGuiTabItemFlags = exports.TabItemFlags;
    exports.ImGuiTextBuffer = ImGuiTextBuffer;
    exports.ImGuiTextFilter = ImGuiTextFilter;
    exports.ImGuiTreeNodeFlags = exports.TreeNodeFlags;
    exports.ImGuiWindowFlags = exports.WindowFlags;
    exports.ImStringBuffer = ImStringBuffer;
    exports.ImVec2 = ImVec2;
    exports.ImVec4 = ImVec4;
    exports.ImVector = ImVector;
    exports.Image = Image;
    exports.ImageButton = ImageButton;
    exports.Indent = Indent;
    exports.InputDouble = InputDouble;
    exports.InputFloat = InputFloat;
    exports.InputFloat2 = InputFloat2;
    exports.InputFloat3 = InputFloat3;
    exports.InputFloat4 = InputFloat4;
    exports.InputInt = InputInt;
    exports.InputInt2 = InputInt2;
    exports.InputInt3 = InputInt3;
    exports.InputInt4 = InputInt4;
    exports.InputScalar = InputScalar;
    exports.InputText = InputText;
    exports.InputTextMultiline = InputTextMultiline;
    exports.InputTextWithHint = InputTextWithHint;
    exports.InvisibleButton = InvisibleButton;
    exports.IsAnyItemActive = IsAnyItemActive;
    exports.IsAnyItemFocused = IsAnyItemFocused;
    exports.IsAnyItemHovered = IsAnyItemHovered;
    exports.IsItemActivated = IsItemActivated;
    exports.IsItemActive = IsItemActive;
    exports.IsItemClicked = IsItemClicked;
    exports.IsItemDeactivated = IsItemDeactivated;
    exports.IsItemDeactivatedAfterEdit = IsItemDeactivatedAfterEdit;
    exports.IsItemEdited = IsItemEdited;
    exports.IsItemFocused = IsItemFocused;
    exports.IsItemHovered = IsItemHovered;
    exports.IsItemVisible = IsItemVisible;
    exports.IsKeyDown = IsKeyDown;
    exports.IsKeyPressed = IsKeyPressed;
    exports.IsKeyReleased = IsKeyReleased;
    exports.IsMouseClicked = IsMouseClicked;
    exports.IsMouseDoubleClicked = IsMouseDoubleClicked;
    exports.IsMouseDown = IsMouseDown;
    exports.IsMouseDragging = IsMouseDragging;
    exports.IsMouseHoveringRect = IsMouseHoveringRect;
    exports.IsMousePosValid = IsMousePosValid;
    exports.IsMouseReleased = IsMouseReleased;
    exports.IsPopupOpen = IsPopupOpen;
    exports.IsRectVisible = IsRectVisible;
    exports.IsWindowAppearing = IsWindowAppearing;
    exports.IsWindowCollapsed = IsWindowCollapsed;
    exports.IsWindowFocused = IsWindowFocused;
    exports.IsWindowHovered = IsWindowHovered;
    exports.LabelText = LabelText;
    exports.ListBox = ListBox;
    exports.ListBoxFooter = ListBoxFooter;
    exports.ListBoxHeader = ListBoxHeader;
    exports.LoadIniSettingsFromDisk = LoadIniSettingsFromDisk;
    exports.LoadIniSettingsFromMemory = LoadIniSettingsFromMemory;
    exports.LogButtons = LogButtons;
    exports.LogFinish = LogFinish;
    exports.LogText = LogText;
    exports.LogToClipboard = LogToClipboard;
    exports.LogToFile = LogToFile;
    exports.LogToTTY = LogToTTY;
    exports.MemAlloc = MemAlloc;
    exports.MemFree = MemFree;
    exports.MenuItem = MenuItem;
    exports.NewFrame = NewFrame;
    exports.NewLine = NewLine;
    exports.NextColumn = NextColumn;
    exports.OpenPopup = OpenPopup;
    exports.OpenPopupOnItemClick = OpenPopupOnItemClick;
    exports.PlotHistogram = PlotHistogram;
    exports.PlotLines = PlotLines;
    exports.PopAllowKeyboardFocus = PopAllowKeyboardFocus;
    exports.PopButtonRepeat = PopButtonRepeat;
    exports.PopClipRect = PopClipRect;
    exports.PopFont = PopFont;
    exports.PopID = PopID;
    exports.PopItemWidth = PopItemWidth;
    exports.PopStyleColor = PopStyleColor;
    exports.PopStyleVar = PopStyleVar;
    exports.PopTextWrapPos = PopTextWrapPos;
    exports.ProgressBar = ProgressBar;
    exports.PushAllowKeyboardFocus = PushAllowKeyboardFocus;
    exports.PushButtonRepeat = PushButtonRepeat;
    exports.PushClipRect = PushClipRect;
    exports.PushFont = PushFont;
    exports.PushID = PushID;
    exports.PushItemWidth = PushItemWidth;
    exports.PushStyleColor = PushStyleColor;
    exports.PushStyleVar = PushStyleVar;
    exports.PushTextWrapPos = PushTextWrapPos;
    exports.RadioButton = RadioButton;
    exports.Render = Render;
    exports.ResetMouseDragDelta = ResetMouseDragDelta;
    exports.SameLine = SameLine;
    exports.SaveIniSettingsToDisk = SaveIniSettingsToDisk;
    exports.SaveIniSettingsToMemory = SaveIniSettingsToMemory;
    exports.Selectable = Selectable;
    exports.Separator = Separator;
    exports.SetAllocatorFunctions = SetAllocatorFunctions;
    exports.SetClipboardText = SetClipboardText;
    exports.SetColorEditOptions = SetColorEditOptions;
    exports.SetColumnOffset = SetColumnOffset;
    exports.SetColumnWidth = SetColumnWidth;
    exports.SetCurrentContext = SetCurrentContext;
    exports.SetCursorPos = SetCursorPos;
    exports.SetCursorPosX = SetCursorPosX;
    exports.SetCursorPosY = SetCursorPosY;
    exports.SetCursorScreenPos = SetCursorScreenPos;
    exports.SetDragDropPayload = SetDragDropPayload;
    exports.SetItemAllowOverlap = SetItemAllowOverlap;
    exports.SetItemDefaultFocus = SetItemDefaultFocus;
    exports.SetKeyboardFocusHere = SetKeyboardFocusHere;
    exports.SetMouseCursor = SetMouseCursor;
    exports.SetNextItemOpen = SetNextItemOpen;
    exports.SetNextItemWidth = SetNextItemWidth;
    exports.SetNextWindowBgAlpha = SetNextWindowBgAlpha;
    exports.SetNextWindowCollapsed = SetNextWindowCollapsed;
    exports.SetNextWindowContentSize = SetNextWindowContentSize;
    exports.SetNextWindowFocus = SetNextWindowFocus;
    exports.SetNextWindowPos = SetNextWindowPos;
    exports.SetNextWindowSize = SetNextWindowSize;
    exports.SetNextWindowSizeConstraints = SetNextWindowSizeConstraints;
    exports.SetScrollFromPosY = SetScrollFromPosY;
    exports.SetScrollHereY = SetScrollHereY;
    exports.SetScrollX = SetScrollX;
    exports.SetScrollY = SetScrollY;
    exports.SetTabItemClosed = SetTabItemClosed;
    exports.SetTooltip = SetTooltip;
    exports.SetWindowCollapsed = SetWindowCollapsed;
    exports.SetWindowFocus = SetWindowFocus;
    exports.SetWindowFontScale = SetWindowFontScale;
    exports.SetWindowPos = SetWindowPos;
    exports.SetWindowSize = SetWindowSize;
    exports.ShowAboutWindow = ShowAboutWindow;
    exports.ShowDemoWindow = ShowDemoWindow;
    exports.ShowFontSelector = ShowFontSelector;
    exports.ShowMetricsWindow = ShowMetricsWindow;
    exports.ShowStyleEditor = ShowStyleEditor;
    exports.ShowStyleSelector = ShowStyleSelector;
    exports.ShowUserGuide = ShowUserGuide;
    exports.SliderAngle = SliderAngle;
    exports.SliderAngle3 = SliderAngle3;
    exports.SliderFloat = SliderFloat;
    exports.SliderFloat2 = SliderFloat2;
    exports.SliderFloat3 = SliderFloat3;
    exports.SliderFloat4 = SliderFloat4;
    exports.SliderInt = SliderInt;
    exports.SliderInt2 = SliderInt2;
    exports.SliderInt3 = SliderInt3;
    exports.SliderInt4 = SliderInt4;
    exports.SliderScalar = SliderScalar;
    exports.SmallButton = SmallButton;
    exports.Spacing = Spacing;
    exports.StyleColorsClassic = StyleColorsClassic;
    exports.StyleColorsDark = StyleColorsDark;
    exports.StyleColorsLight = StyleColorsLight;
    exports.Text = Text;
    exports.TextColored = TextColored;
    exports.TextDisabled = TextDisabled;
    exports.TextUnformatted = TextUnformatted;
    exports.TextWrapped = TextWrapped;
    exports.TreeAdvanceToLabelPos = TreeAdvanceToLabelPos;
    exports.TreeNode = TreeNode;
    exports.TreeNodeEx = TreeNodeEx;
    exports.TreePop = TreePop;
    exports.TreePush = TreePush;
    exports.Unindent = Unindent;
    exports.VSliderFloat = VSliderFloat;
    exports.VSliderInt = VSliderInt;
    exports.VSliderScalar = VSliderScalar;
    exports.Value = Value;
    exports.default = imgui;
    exports.script_ImFontConfig = script_ImFontConfig;
    exports.script_ImFontGlyph = script_ImFontGlyph;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
