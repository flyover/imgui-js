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

    var Module=typeof Module!=="undefined"?Module:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject;});var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readBinary;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require$$0.dirname(scriptDirectory)+"/";}else {scriptDirectory=__dirname+"/";}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require$$1;if(!nodePath)nodePath=require$$0;filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/");}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status);};Module["inspect"]=function(){return "[Emscripten Module object]"};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)};}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs;}else if(typeof arguments!="undefined"){arguments_=arguments;}if(typeof quit==="function"){quit_=function(status){quit(status);};}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(document.currentScript){scriptDirectory=document.currentScript.src;}if(_scriptDir){scriptDirectory=_scriptDir;}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1);}else {scriptDirectory="";}{read_=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}};}}}else;var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){abort("no native wasm support detected");}var wasmMemory;var wasmTable;var ABORT=false;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else {var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else {u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else {var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4;}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else {var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0||i==maxBytesToRead/2)return str;++i;str+=String.fromCharCode(codeUnit);}}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2;}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}else {str+=String.fromCharCode(utf32);}}return str}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023;}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4;}return len}var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf);}var INITIAL_INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"];}else {wasmMemory=new WebAssembly.Memory({"initial":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_INITIAL_MEMORY/WASM_PAGE_SIZE});}if(wasmMemory){buffer=wasmMemory.buffer;}INITIAL_INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function initRuntime(){callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what);}what+="";err(what);ABORT=true;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return hasPrefix(filename,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(filename){return hasPrefix(filename,fileURIPrefix)}var wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABpgulAWACf38AYAF/AGACf38Bf2ABfwF/YAAAYAN/f38Bf2ADf39/AGAEf39/fwF/YAR/f39/AGAAAX9gBn9/f39/fwF/YAd/f39/f39/AX9gBX9/f39/AX9gBX9/f39/AGAGf39/f39/AGACf38BfWAHf39/f39/fwBgCH9/f39/f39/AX9gAAF9YAF/AX1gAn99AGABfQBgBn9/f39/fQBgA39/fQBgBX9/f399AGAEf39/fQBgBX9/fX9/AGABfQF9YAV/f399fwBgBn19fX9/fwBgCn9/f39/f39/f38AYAd/f39/f399AGAFf35+fn4AYAl/f39/f39/f38Bf2ADf399AX9gA39+fwF+YAJ/fQF9YAJ9fQF9YAh/f39/f39/fwBgCX9/f39/f39/fwBgC39/f39/f39/f39/AGAJf39/f39/f31/AGAGf39/f31/AGAEf399fwBgBH9/fX0AYAN/fX8AYAR/fX9/AGAIf39/fX9/f30Bf2AIf39/f39/fX8AYAd/f39/fX99AGAGf39/fX9/AGAFf39/fX0AYAZ/f31/f38AYAZ/f31/f30AYAZ/f319fX8AYAh/f319fX9/fwBgA31/fwBgAn19AGAHf39/f39/fQF/YAZ/f31/f38Bf2AGf399fX99AX9gB39/fX19f30Bf2AGf398fH9/AX9gA399fQF/YAN/f38BfWACfHwBfGAHf39/f319fwBgCH9/fX9/f31/AGAEf35+fwBgA399fQBgAn99AX9gAn5+AX5gA319fQF9YAF/AXxgB39/f319f38AYAp/f39/f39/f39/AX9gCH9/f39/f399AX9gCX9/f39/f31/fwF/YAl/f39+fn99f38Bf2AEf39/fQF/YAZ/f399f38Bf2AFf399f38Bf2AEf399fQF/YAZ/fX9/f30Bf2AEf31/fQF/YAZ/fX5+f30Bf2AFf319fX0Bf2AGf3x/f39/AX9gAn5/AX9gAXwBf2ACf38BfmADfn5+AX5gAXwBfWAAAXxgAnx/AXxgDH9/f39/f39/f39/fwBgDX9/f39/f39/f39/f38AYAp/f39/f39/f31/AGAIf39/f39/f30AYAl/f39/f399fX8AYAd/f39/f31/AGAIf39/f399f30AYAh/f39/f319fwBgCH9/f399fX9/AGAHf39/fX9/fwBgCX9/f31/f399fwBgB39/f31/f30AYAd/f399f31/AGAHf39/fX19fwBgB39/f319fX0AYAN/f34AYAp/f31/f39/f31/AGAJf399f39/f31/AGAIf399fX9/f38AYAp/f319fX19fX1/AGALf399fX19fX19fX0AYAx/f319fX19fX19fX8AYAN/f3wAYAJ/fgBgA39+fgBgB399fX1/f38AYAd/fX19fX19AGALf319fX19fX19fX8AYAJ/fABgCn9/f39/f399f38Bf2AJf39/f31/f399AX9gBX9/f31/AX9gCH9/f31/f39/AX9gB39/f319f30Bf2AJf39/fX1/fX9/AX9gCX9/f319fX9/fQF/YAd/f398fH9/AX9gCX9/f3x8f31/fwF/YAR/f31/AX9gBX9/fX99AX9gBn9/fX1/fwF/YAh/f319fX9/fwF/YAR/fX9/AX9gBX99f399AX9gBn99fX1/fQF/YAZ/fXx8f30Bf2ADfn9/AX9gAn5+AX9gA35+fgF/YAR+fn5+AX9gAn1/AX9gAn19AX9gBH19fX0Bf2ABfwF+YAJ/fgF+YAR/f399AX1gBX9/f319AX1gBH99fX0BfWACfn4BfWAEfn5+fQF9YAV+fn59fQF9YAJ9fwF9YAR9fX19AX1gBX19fX19AX1gBXx8fH19AX1gA39/fwF8YAJ/fAF8YAJ+fgF8YAN8fH0BfGADfHx8AXwCiAIrAWEBYgAeAWEBYwAOAWEBZAAmAWEBZQACAWEBZgCgAQFhAWcAYAFhAWgABgFhAWkADQFhAWoAAgFhAWsACAFhAWwABgFhAW0ADgFhAW4AAgFhAW8AAQFhAXAABgFhAXEAAQFhAXIABQFhAXMABwFhAXQAAwFhAXUABgFhAXYAAAFhAXcAdQFhAXgAAgFhAXkAAwFhAXoADAFhAUEAAQFhAUIABQFhAUMAAwFhAUQABAFhAUUABwFhAUYABQFhAUcABQFhAUgAAAFhAUkADQFhAUoAAAFhAUsACQFhAUwAAwFhAU0ABwFhAU4AAQFhAU8ABgFhAVAAAwFhAVEACQFhAWECAYACgAIDoRT7Ez8BAwADBlYlABMDAQlGBgEDAgUDBQMlFwAGAwMBAwIBGwMbAQAFAwNWAwUCAwACACACBwJIGDkCAwYJAwMCDwMlAwAqAQQD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EgAgABDeAgRAIAAoAgAPCyAACx0AIAAgASoCACACKgIAkiABKgIEIAIqAgSSECoaCyAAIAAgBDgCDCAAIAM4AgggACACOAIEIAAgATgCACAACwwAIAAgASAAIAFgGwsLACABIAAQNBCVFAs3AQF8An1D//9/fyAAEPQFIgFEAAAA4P//70dmDQAaQ///f/8gAUQAAADg///vx2UNABogAbYLCwsAIABCADcCACAACx0BAX8gABDeAgRAIAAoAgAhASAAEN0FGiABEE0LCxgBAX9BoLYDKAIAKAKsMyIAQQE6AHwgAAtaAQJ/IwBBEGsiAiQAIAJBoLYDKAIAIgNBmCpqIABBBHRqIgApArQBNwMIIAIgACkCrAE3AwAgAiACKgIMIAMqApgqIAGUlDgCDCACELYDIQAgAkEQaiQAIAALHQAgACABKgIAIAIqAgCTIAEqAgQgAioCBJMQKhoLEgAgAEHU5AI2AgAgAEEEahA1CxYAIAAoAhAQUAR/QQAFIABBBGoQLgsLFAAgACABENwNIABBvOMCNgIAIAALGAAgACABKQIANwIAIAAgAikCADcCCCAACyYBAX8jAEEQayIBJAAgASAANgIMIAFBDGoQLCEAIAFBEGokACAAC4IEAQN/IAJBgARPBEAgACABIAIQGhogAA8LIAAgAmohAwJAIAAgAXNBA3FFBEACQCACQQFIBEAgACECDAELIABBA3FFBEAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANPDQEgAkEDcQ0ACwsCQCADQXxxIgRBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUFAayEBIAJBQGsiAiAFTQ0ACwsgAiAETw0BA0AgAiABKAIANgIAIAFBBGohASACQQRqIgIgBEkNAAsMAQsgA0EESQRAIAAhAgwBCyADQXxqIgQgAEkEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLIAIgA0kEQANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAACxEAQQAgAEEEaiAAKAIIEFAbCwwAIAAgASAAIAFdGwsXACAAIAEqAgAgApQgASoCBCAClBAqGgsnAQJ/IAEoAgAhAiMAQRBrIgMkACAAIAFBBGogAhC+ByADQRBqJAALMwEBfyMAQRBrIgMkACAAIAEoAgAgA0EIaiACEJQBIgAoAgAQDBBYGiAAECsgA0EQaiQACxIAIABBADYCCCAAQgA3AgAgAAsUAQF/IAAoAggiAQRAIAEQRgsgAAs6AQF/AkAgAEUNAEGgtgMoAgAiAUUNACABIAEoAvAGQX9qNgLwBgsgAEGotgMoAgBBlLMDKAIAEQAACwcAIABBBGoLDQAgACgCCCABQQJ0agsgAQF/IAAoAggiAQRAIABCADcCACABEEYgAEEANgIICwsYAEMAAAAAIABDAACAP5YgAEMAAAAAXRsLMgEBf0GgtgMoAgAiAQRAIAEgASgC8AZBAWo2AvAGCyAAQai2AygCAEGQswMoAgARAgALHQACfyAAi0MAAABPXQRAIACoDAELQYCAgIB4C7ILqg0BB38CQCAARQ0AIABBeGoiAyAAQXxqKAIAIgFBeHEiAGohBQJAIAFBAXENACABQQNxRQ0BIAMgAygCACICayIDQcDMBCgCACIESQ0BIAAgAmohACADQcTMBCgCAEcEQCACQf8BTQRAIAMoAggiBCACQQN2IgJBA3RB2MwEakcaIAQgAygCDCIBRgRAQbDMBEGwzAQoAgBBfiACd3E2AgAMAwsgBCABNgIMIAEgBDYCCAwCCyADKAIYIQYCQCADIAMoAgwiAUcEQCAEIAMoAggiAk0EQCACKAIMGgsgAiABNgIMIAEgAjYCCAwBCwJAIANBFGoiAigCACIEDQAgA0EQaiICKAIAIgQNAEEAIQEMAQsDQCACIQcgBCIBQRRqIgIoAgAiBA0AIAFBEGohAiABKAIQIgQNAAsgB0EANgIACyAGRQ0BAkAgAyADKAIcIgJBAnRB4M4EaiIEKAIARgRAIAQgATYCACABDQFBtMwEQbTMBCgCAEF+IAJ3cTYCAAwDCyAGQRBBFCAGKAIQIANGG2ogATYCACABRQ0CCyABIAY2AhggAygCECICBEAgASACNgIQIAIgATYCGAsgAygCFCICRQ0BIAEgAjYCFCACIAE2AhgMAQsgBSgCBCIBQQNxQQNHDQBBuMwEIAA2AgAgBSABQX5xNgIEIAMgAEEBcjYCBCAAIANqIAA2AgAPCyAFIANNDQAgBSgCBCIBQQFxRQ0AAkAgAUECcUUEQCAFQcjMBCgCAEYEQEHIzAQgAzYCAEG8zARBvMwEKAIAIABqIgA2AgAgAyAAQQFyNgIEIANBxMwEKAIARw0DQbjMBEEANgIAQcTMBEEANgIADwsgBUHEzAQoAgBGBEBBxMwEIAM2AgBBuMwEQbjMBCgCACAAaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgAPCyABQXhxIABqIQACQCABQf8BTQRAIAUoAgwhAiAFKAIIIgQgAUEDdiIBQQN0QdjMBGoiB0cEQEHAzAQoAgAaCyACIARGBEBBsMwEQbDMBCgCAEF+IAF3cTYCAAwCCyACIAdHBEBBwMwEKAIAGgsgBCACNgIMIAIgBDYCCAwBCyAFKAIYIQYCQCAFIAUoAgwiAUcEQEHAzAQoAgAgBSgCCCICTQRAIAIoAgwaCyACIAE2AgwgASACNgIIDAELAkAgBUEUaiICKAIAIgQNACAFQRBqIgIoAgAiBA0AQQAhAQwBCwNAIAIhByAEIgFBFGoiAigCACIEDQAgAUEQaiECIAEoAhAiBA0ACyAHQQA2AgALIAZFDQACQCAFIAUoAhwiAkECdEHgzgRqIgQoAgBGBEAgBCABNgIAIAENAUG0zARBtMwEKAIAQX4gAndxNgIADAILIAZBEEEUIAYoAhAgBUYbaiABNgIAIAFFDQELIAEgBjYCGCAFKAIQIgIEQCABIAI2AhAgAiABNgIYCyAFKAIUIgJFDQAgASACNgIUIAIgATYCGAsgAyAAQQFyNgIEIAAgA2ogADYCACADQcTMBCgCAEcNAUG4zAQgADYCAA8LIAUgAUF+cTYCBCADIABBAXI2AgQgACADaiAANgIACyAAQf8BTQRAIABBA3YiAUEDdEHYzARqIQACf0GwzAQoAgAiAkEBIAF0IgFxRQRAQbDMBCABIAJyNgIAIAAMAQsgACgCCAshAiAAIAM2AgggAiADNgIMIAMgADYCDCADIAI2AggPCyADQgA3AhAgAwJ/QQAgAEEIdiIBRQ0AGkEfIABB////B0sNABogASABQYD+P2pBEHZBCHEiAXQiAiACQYDgH2pBEHZBBHEiAnQiBCAEQYCAD2pBEHZBAnEiBHRBD3YgASACciAEcmsiAUEBdCAAIAFBFWp2QQFxckEcagsiAjYCHCACQQJ0QeDOBGohAQJAAkACQEG0zAQoAgAiBEEBIAJ0IgdxRQRAQbTMBCAEIAdyNgIAIAEgAzYCACADIAE2AhgMAQsgAEEAQRkgAkEBdmsgAkEfRht0IQIgASgCACEBA0AgASIEKAIEQXhxIABGDQIgAkEddiEBIAJBAXQhAiAEIAFBBHFqIgdBEGooAgAiAQ0ACyAHIAM2AhAgAyAENgIYCyADIAM2AgwgAyADNgIIDAELIAQoAggiACADNgIMIAQgAzYCCCADQQA2AhggAyAENgIMIAMgADYCCAtB0MwEQdDMBCgCAEF/aiIANgIAIAANAEH4zwQhAwNAIAMoAgAiAEEIaiEDIAANAAtB0MwEQX82AgALCycBAX8jAEEQayICJAAgAEEBQczeAkGKwAJBzQUgARABIAJBEGokAAvzAgICfwF+AkAgAkUNACAAIAJqIgNBf2ogAToAACAAIAE6AAAgAkEDSQ0AIANBfmogAToAACAAIAE6AAEgA0F9aiABOgAAIAAgAToAAiACQQdJDQAgA0F8aiABOgAAIAAgAToAAyACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkF8aiABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBeGogATYCACACQXRqIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQXBqIAE2AgAgAkFsaiABNgIAIAJBaGogATYCACACQWRqIAE2AgAgBCADQQRxQRhyIgRrIgJBIEkNACABrSIFQiCGIAWEIQUgAyAEaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQWBqIgJBH0sNAAsLIAALCgAgACgCAEECRgvCAQIDfwF+AkACQCAAKQNwIgRQRQRAIAApA3ggBFkNAQsgABDJCyICQX9KDQELIABBADYCaEF/DwsgACgCCCEBAkACQCAAKQNwIgRQDQAgBCAAKQN4Qn+FfCIEIAEgACgCBCIDa6xZDQAgACADIASnajYCaAwBCyAAIAE2AmgLAkAgAUUEQCAAKAIEIQAMAQsgACAAKQN4IAEgACgCBCIAa0EBaqx8NwN4CyAAQX9qIgAtAAAgAkcEQCAAIAI6AAALIAILGQAgACABIAIQKhogAEEIaiADIAQQKhogAAsHACAAQQhqC+IBAQR/QaC2AygCACIEKAKsMyEDAkAgAUUNACADIAMoArwCIAMoArQCcjYCvAIgASAEKAK4NUcEQCAELQCYNkUNAQsgBCgCtDUiBigChAYgAygChAZHDQAgAyAGRwRAIAYoAgggAygCCHJBgICABHFFDQELIAMgAiAAIAIbIAEQ7RALIAMgATYCiAIgAyAAKQIANwKQAiADIABBCGoiAikCADcCmAIgA0EANgKMAiAEQQA2Aug0AkAgACABEOIFDQBBASEFIAAgAkEBEJUDRQ0AIAMgAygCjAJBAXI2AowCCyAFCxkAIAEgAEHEA2oQcCgCABDyASIAEJ8CIAALJQAgAEP//39/Q///f38QKhogAEEIakP//3//Q///f/8QKhogAAsNACAAQdgAaiABEKECCwsAIAAgATYCACAACyIBAX8jAEEQayICJAAgAiABNgIMIAAgARDrAiACQRBqJAALngsCBX8PfiMAQeAAayIFJAAgAkIghiABQiCIhCEPIARCL4YgA0IRiIQhDSAEQv///////z+DIg5CD4YgA0IxiIQhECACIASFQoCAgICAgICAgH+DIQogAkL///////8/gyILQiCIIREgDkIRiCESIARCMIinQf//AXEhBwJAAn8gAkIwiKdB//8BcSIJQX9qQf3/AU0EQEEAIAdBf2pB/v8BSQ0BGgsgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhCgwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEKIAMhAQwCCyABIAxCgICAgICAwP//AIWEUARAIAIgA4RQBEBCgICAgICA4P//ACEKQgAhAQwDCyAKQoCAgICAgMD//wCEIQpCACEBDAILIAMgAkKAgICAgIDA//8AhYRQBEAgASAMhCECQgAhASACUARAQoCAgICAgOD//wAhCgwDCyAKQoCAgICAgMD//wCEIQoMAgsgASAMhFAEQEIAIQEMAgsgAiADhFAEQEIAIQEMAgsgDEL///////8/WARAIAVB0ABqIAEgCyABIAsgC1AiBht5IAZBBnStfKciBkFxahCMASAFKQNYIgtCIIYgBSkDUCIBQiCIhCEPIAtCIIghEUEQIAZrIQYLIAYgAkL///////8/Vg0AGiAFQUBrIAMgDiADIA4gDlAiCBt5IAhBBnStfKciCEFxahCMASAFKQNIIgJCD4YgBSkDQCIDQjGIhCEQIAJCL4YgA0IRiIQhDSACQhGIIRIgBiAIa0EQagshBiANQv////8PgyICIAFC/////w+DIgF+IhMgA0IPhkKAgP7/D4MiAyAPQv////8PgyIMfnwiBEIghiIOIAEgA358Ig0gDlStIAIgDH4iFSADIAtC/////w+DIgt+fCIUIBBC/////w+DIg4gAX58IhAgBCATVK1CIIYgBEIgiIR8IhMgAiALfiIWIAMgEUKAgASEIg9+fCIDIAwgDn58IhEgASASQv////8Hg0KAgICACIQiAX58IhJCIIZ8Ihd8IQQgByAJaiAGakGBgH9qIQYCQCALIA5+IhggAiAPfnwiAiAYVK0gAiABIAx+fCIMIAJUrXwgDCAUIBVUrSAQIBRUrXx8IgIgDFStfCABIA9+fCABIAt+IgsgDiAPfnwiASALVK1CIIYgAUIgiIR8IAIgAUIghnwiASACVK18IAEgEiARVK0gAyAWVK0gESADVK18fEIghiASQiCIhHwiAyABVK18IAMgEyAQVK0gFyATVK18fCICIANUrXwiAUKAgICAgIDAAINQRQRAIAZBAWohBgwBCyANQj+IIQMgAUIBhiACQj+IhCEBIAJCAYYgBEI/iIQhAiANQgGGIQ0gAyAEQgGGhCEECyAGQf//AU4EQCAKQoCAgICAgMD//wCEIQpCACEBDAELAn4gBkEATARAQQEgBmsiB0H/AE0EQCAFQTBqIA0gBCAGQf8AaiIGEIwBIAVBIGogAiABIAYQjAEgBUEQaiANIAQgBxCFAyAFIAIgASAHEIUDIAUpAzAgBSkDOIRCAFKtIAUpAyAgBSkDEISEIQ0gBSkDKCAFKQMYhCEEIAUpAwAh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WgsCQCADLQApRQ0AIAAgACoC/AEgBb4QMTgC+AEgAUEIaiACEN0BIAFBCGpDAAAAABB8IAJBAEEAEFQaAkACQAJAAkACQAJAIAQoAtAzIgcgAygCJEcEQCAEKALUMyAHRiAHQQBHcSECIAMtACgNAyAELQCANCEFIAJFDQEgBUEARyEGDAQLIAMtACgNBCAELQCANA0BDAQLIAVFDQMLIAAgBCgC/DM2AogCQQEhBgwCCyACRQ0BCyAAIAc2AogCIAAgASkDGDcCmAIgACABKQMQNwKQAiAAQYwCaiIFKAIAIQIgBC0A4DMEQCAAIAJBFHI2AowCIAZFDQMgAkEEciECDAILIAAgAkEQcjYCjAIgBkUNAgwBCyAAIAEpAxA3ApACIAAgASkDGDcCmAIgAEGMAmoiBSAAKAKMAiICQRByNgIAIAZFDQELIAQoAtAzIAQoAvwzRg0AIAUgAkEwcjYCAAsgCBCBASABQSBqJAAL2AkCBH8EfiMAQfAAayIFJAAgBEL///////////8AgyEKAkACQCABQn98IgtCf1EgAkL///////////8AgyIJIAsgAVStfEJ/fCILQv///////7///wBWIAtC////////v///AFEbRQRAIANCf3wiC0J/UiAKIAsgA1StfEJ/fCILQv///////7///wBUIAtC////////v///AFEbDQELIAFQIAlCgICAgICAwP//AFQgCUKAgICAgIDA//8AURtFBEAgAkKAgICAgIAghCEEIAEhAwwCCyADUCAKQoCAgICAgMD//wBUIApCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhBAwCCyABIAlCgICAgICAwP//AIWEUARAQoCAgICAgOD//wAgAiABIAOFIAIgBIVCgICAgICAgICAf4WEUCIGGyEEQgAgASAGGyEDDAILIAMgCkKAgICAgIDA//8AhYRQDQEgASAJhFAEQCADIAqEQgBSDQIgASADgyEDIAIgBIMhBAwCCyADIAqEUEUNACABIQMgAiEEDAELIAMgASADIAFWIAogCVYgCSAKURsiBxshCiAEIAIgBxsiC0L///////8/gyEJIAIgBCAHGyICQjCIp0H//wFxIQggC0IwiKdB//8BcSIGRQRAIAVB4ABqIAogCSAKIAkgCVAiBht5IAZBBnStfKciBkFxahCM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gQELQQAhACABQQAQsgcgAhBiBH8gAAUgAhBwKAIACxCdBQsLbAEDfiAAIAJCIIgiAyABQiCIIgR+QgB8IAJC/////w+DIgIgAUL/////D4MiAX4iBUIgiCACIAR+fCICQiCIfCABIAN+IAJC/////w+DfCIBQiCIfDcDCCAAIAVC/////w+DIAFCIIaENwMAC0QCAn8BfiAAIAE3A3AgACAAKAIIIgIgACgCBCIDa6wiBDcDeCABUCAEIAFXckUEQCAAIAMgAadqNgJoDwsgACACNgJoC0sBAnwgACAAoiIBIACiIgIgASABoqIgAUSnRjuMh83GPqJEdOfK4vkAKr+goiACIAFEsvtuiRARgT+iRHesy1RVVcW/oKIgAKCgtgtPAQF8IAAgAKIiAESBXgz9///fv6JEAAAAAAAA8D+gIAAgAKIiAURCOgXhU1WlP6KgIAAgAaIgAERpUO7gQpP5PqJEJx4P6IfAVr+goqC2CyABAX8gAEEATgR/QaC2AygCACAAai0A/AFBAEcFIAELCzMBAX8jAEEQayIDJAAgACgCACADQQhqIAEQzwUiACgCACACKAIAEAogABArIANBEGokAAszAQF/IwBBEGsiAyQAIAAgASgCACADQQhqIAIQzwUiACgCABAMEFgaIAAQKyADQRBqJAALGQAgACgCACABNgIAIAAgACgCAEEIajYCAAsdACAAIAEqAgggASoCAJMgASoCDCABKgIEkxAqGgvAAQECf0GgtgMoAgAiAiACKALQMyIDIABHOgDcMwJAIAAgA0YNACACQQA7Ad4zIAJBADYC2DMgAEUNACACQQA2Aow0IAIgADYCiDQLIAJCADcC5DMgAiAANgLQMyACIAE2AvQzIAJBADoA3TMgAkEAOgDgMyAABEAgAiAANgLUM0ECIQECQCACKAK8NSAARg0AIAIoAsg1IABGDQAgAigCzDUgAEYNAEECQQEgAigC0DUgAEYbIQELIAIgATYC+DMLC0QCAn8BfCMAQRBrIgEkACAAKAIAQfjYAigCACABQQRqEAQhAyABIAEoAgQQWCEAIAMQgwIhAiAAEJ4BIAFBEGokACACCx4AIAAgACgCYCAAKAJYIAEgAiADEPQEIABBADYCWAs3AQF/IwBBEGsiAyQAIAAoAgAhACADQQhqIAIQLSABIANBCGogABEAACAD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BigCECIFDQALIAYgAzYCEAsgAyABNgIYIAMgAzYCDCADIAM2AggMAQsgASgCCCIAIAM2AgwgASADNgIIIANBADYCGCADIAE2AgwgAyAANgIICyAEQQhqIQAMAQsCQCAJRQ0AAkAgASgCHCIAQQJ0QeDOBGoiAigCACABRgRAIAIgBDYCACAEDQFBtMwEIApBfiAAd3E2AgAMAgsgCUEQQRQgCSgCECABRhtqIAQ2AgAgBEUNAQsgBCAJNgIYIAEoAhAiAARAIAQgADYCECAAIAQ2AhgLIAEoAhQiAEUNACAEIAA2AhQgACAENgIYCwJAIANBD00EQCABIAMgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAwBCyABIAVBA3I2AgQgASAFaiIEIANBAXI2AgQgAyAEaiADNgIAIAgEQCAIQQN2IgVBA3RB2MwEaiEAQcTMBCgCACECAn9BASAFdCIFIAZxRQRAQbDMBCAFIAZyNgIAIAAMAQsgACgCCAshBSAAIAI2AgggBSACNgIMIAIgADYCDCACIAU2AggLQcTMBCAENgIAQbjMBCADNgIACyABQQhqIQALIAtBEGokACAACx4BAX8jAEEQayIBJAAgASAAELwHEK4LIAFBEGokAAsiAQF/IwBBEGsiASQAIAEgABC8BxCwCyEAIAFBEGokACAAC/oBAgJ/A34jAEEQayICJAACfiABvSIFQv///////////wCDIgRCgICAgICAgHh8Qv/////////v/wBYBEAgBEI8hiEGIARCBIhCgICAgICAgIA8fAwBCyAEQoCAgICAgID4/wBaBEAgBUI8hiEGIAVCBIhCgICAgICAwP//AIQMAQsgBFAEQEIADAELIAIgBEIAIAWnZ0EgaiAEQiCIp2cgBEKAgICAEFQbIgNBMWoQjAEgAikDACEGIAIpAwhCgICAgICAwACFQYz4ACADa61CMIaECyEEIAAgBjcDACAAIAQgBUKAgICAgICAgIB/g4Q3AwggAkEQaiQAC0oBAn8CQCAALQAAIgJFIAIgAS0AACIDR3INAANAIAEtAAEhAyAALQABIgJFDQEgAUEBaiEBIABBAWohACACIANGDQALCyACIANrCxQAQaC2AygCACoCzDEgACoC9ASUC9svAxF/AX4MfSMAQaABayIDJABBoLYDKAIAIQYgAyAA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AUYNASABLQABIQIMAgtBAyEDIAEtAAEiAkHgAXFBoAFGDQEMAwtBAyEDIAEtAAEiAkGfAUsNAgtBAyEDIAJBwAFxQYABRw0BIAEtAAIiAUHAAXFBgAFHDQEgACABQT9xIAJBBnRBwB9xIARBD3FBDHRycjYCAEEDDwsgA0H4AXFB8AFGBEAgAEH9/wM2AgAgAgRAQQEhAyACIAFrQQRIDQILQQQhAyABLQAAIgRB9AFLDQECQAJAAkACQCAEQZB+ag4FAAICAgECCyABLQABIgJB8ABqQf8BcUEvTQ0CDAQLIAEtAAEiAkGPAU0NAQwDCyABLQABIQILIAJBwAFxQYABRw0BIAEtAAIiBUHAAXFBgAFHDQEgAS0AAyIBQcABcUGAAUcNASAFQQZ0QcAfcSACQQx0QYDgD3EgBEEHcUESdHJyIgJBgPD/AHFBgLADRg0BIAAgAUE/cSACcjYCAEEEDwtBACEDIABBADYCAAsgAwsRAEEAIABBCGogACgCEBBQGwspACAAIAE2AhAgAEGE8wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGg8gI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEG88QI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHY8AI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHw7wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGI7wI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEGg7gI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHg7QI2AgAgARBQRQRAIAAgACgCACgCABEBAAsgAAspACAAIAE2AgggAEHY3gI2AgAgARBQRQRAIAAgACgCACgCCBEBAAsgAAsyAQF/IwBBEGsiAyQAIAAoAgAgA0EIaiABEFsiACgCACACKAIAEAogABArIANBEGokAAuRAQEEfwJAQaC2AygCACICKAK8MyIDRSABIANGcg0AIAItAMAzDQBBAA8LAkAgAigCrDMiAyACKAKwM0cNACACKALQMyIFRSABIAVGckUEQCACLQDdM0UNAQsgACAAQQhqQQEQlQNFDQAgAi0AlzYNACADQQAQ4AVFDQAgAy0A7AJBBHENACABEOUFQQEhBAsgBAtGAQF/IwBBEGsiAiQAIAJBCGogACABELQBIAAgAikDCDcCACACQQhqIABBCGogAUEIahDFBCAAIAIpAwg3AgggAkEQaiQACyIAIAAgASoCACAAKgIAkjgCACAAIAEqAgQgACoCBJI4AgQLDwAgASAAKAIAaiACOAIACw0AIAEgACgCAGoqAgALWQECfyMAQRBrIgIkAAJAQaC2AygCACIDLQCgWkUNACACIAE2AgwgAygCqFoiAQRAIAEgACACKAIMEM0HGgwBCyADQazaAGogACACKAIMEKcGCyACQRBqJAALFwAgACAALwE0EKgCIAAgASACIAMQ8wILJgEBf0GgtgMoAgAoAqwzIgAtAH9FBEBBBUEGIAAoAtwCGxDMCQsL6AUCCH8DfSMAQeAAayICJAACQBA2IgUtAH8NAEGgtgMoAgAhAyAFIAAQVSEEIAJB2ABqIABBAEEBQwAAgL8QXxDTASELIAIgBSkCyAE3A1AgAkEoaiACQdAAaiACQThqIAsgCxAqEC8gAkFAayACQdAAaiACQShqEDwhCCACQThqIAJB0ABqIAJBIGogCyACKgJYIgxDAAAAAF5BAXMEfSAKBSAMIANB6CpqKgIAkguSIAIqAlwgA0HUKmoiCSoCACIKIAqSkhAqEC8gAkEoaiACQdAAaiACQThqEDwiBiAJKgIAEJwBIAYgBEEAEFRFDQAgAkE4aiAIEN0EIAICfyACKgI4IgqLQwAAAE9dBEAgCqgMAQtBgICAgHgLskMAAAA/kjgCOCACAn8gAioCPCIKi0MAAABPXQRAIAqoDAELQYCAgIB4C7JDAAAAP5I4AjwgBiAEIAJBH2ogAkEeakEAEIoBIgcEQCAEELMBCyAGIARBARCTASAFKAL8BCACQThqIAtDAACAv5JDAAAAP5QiCkEJQQhBByACLQAfIgQbIgkgBBsgCSACLQAeG0MAAIA/EDdBEBCnAiABBEAgBSgC/AQgAkE4aiAKQwAAgD8CfyALQwAAwECVIguLQwAAAE9dBEAgC6gMAQtBgICAgHgLshAxk0ESQwAAgD8QN0EQEKcCCyADQdwqaioCAEMAAAAAXkEBc0UEQCAFKAL8BCEEIAJBIGogAkE4aiACQRBqQwAAgD9DAACAPxAqEC8gBCACQSBqIApBBkMAAIA/EDdBECADKgLcKhDJAiAFKAL8BCACQThqIApBBUMAAIA/EDdBECADKgLcKhDJAgsgAy0AoFoEQCAGQf7sAUGC7QEgARtBABDOAQsgAioCWEMAAAAAXkEBcw0AIAIgAkEIaiAIKgIIIANB6CpqKgIAkiAIKgIEIAMqAtQqkhAqKQIANwMAIAIgAEEAQQEQqQELIAJB4ABqJAAgBwslAQF/QaC2AygCACIBQew0aiAAOAIAIAEgASgC6DRBAXI2Aug0C0YBA38gASgCBCECIAFBAhDDASIDBEAgASADIAEQogEiBGwQpAIgASABIAQQwwFBf2oQpAILIAAgASACIAEoAgQgAmsQ7QILzAECAX8BfSMAQRBrIgYkACAGIAE4AgggBiAAOAIMIAYgAjgCBAJ/IAEgAl1BAXNFBEAgBkEIaiAGQQRqELUDQwAAgL8hByAGKgIIIQELIAEgAF5BAXNFCwRAQ6uqqr4gB5MhByAGQQxqIAZBCGoQtQMgBioCCCEBIAYqAgwhAAsgAyAHIAEgBioCBCICkyAAIAEgAiABIAJdG5MiAUMAAMBAlEMI5TwekpWSizgCACAEIAEgAEMI5TwekpU4AgAgBSAAOAIAIAZBEGokAAtMACAEQQNIIANBgICACElyRQRAIAAgASACQwAAAL+SQwAAAAAgBLIiAkMAAIC/kkPbD8lAlCAClSAEQX9qEPEBIAAgA0EBIAUQ4AELCzcAIAAgASACIAMQxQchAiAABEAgACACIAFBf2oiAyACIAFIGyADIAJBf0cbIgJqQQA6AAALIAILCwAgACABIAIQkwQLJQAgACABKgIAIAEqAgQQKhogAEEIaiABKgIIIAEqAgwQKhogAAtVAQJ/QZy2AygCACIBIABBA2pBfHEiAmohAAJAIAJBAU5BACAAIAFNGw0AIAA/AEEQdEsEQCAAEBtFDQELQZy2AyAANgIAIAEPC0HQwwRBMDYCAEF/C9sBAgF/An5BASEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AIAAg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AAuAAQECfyMAQeAAayICJAAgAiABNwNYAkAgABDlAiIALQAAQSVHDQAgAC0AAUElRg0AIAIgATcDACACQRBqQcAAIAAgAhBcGiACQRBqIQADQCAAIgNBAWohACADLQAAQSBGDQALIAMgAkHYAGoQmhQgAikDWCEBCyACQeAAaiQAIAELgQEBAX8jAEHgAGsiAiQAIAIgATYCXAJAIAAQ5QIiAC0AAEElRw0AIAAtAAFBJUYNACACIAE2AgAgAkEQakHAACAAIAIQXBogAkEQaiEBA0AgASIAQQFqIQEgAC0AAEEgRg0ACyAAIAJB3ABqEJcGGiACKAJcIQELIAJB4ABqJAAgAQszACAAQQBIBEBDAACAAA8LIABBCUwEQCAAQQJ0QcD2AWoqAgAPC0MAACBBQQAgAGuyEGoLQAECfyAAKAIEIAFIBEAgARBLIQIgACgCCCIDBEAgAiADIAAoAgAQPhogACgCCBBGCyAAIAE2AgQgACACNgIICwsNACAAQSBGIABBCUZyCy8BAX8QNi0Af0UEQEGgtgMoAgBBwN4AaiICIAJBgRggACABEMoCIAJqQQEQuAELC3ABA38CQAJAQejCBCgCACIDIAFqIgJB4MIEKAIAIgRLDQBB5MIEKAIAIABNBEAgAUUNAiADIQIDQCACIAAtAAA6AAAgAkEBaiECIABBAWohACABQX9qIgENAAsMAQsgBEEBaiECC0HowgQgAjYCAAsLRwEBfyAAQQBBABCNAgJAIAIgA3JBAEgNACABKAIIIgQgAkggBCACayADSHINACABKAIAIQEgACADNgIIIAAgASACajYCAAsLZAEBfyMAQRBrIgQkACAEIAAgARDqCQJAIAJBAUgNACAEKAIEIAQoAghODQBBACEAA0AgAyAAQQJ0aiAEEOgENgIAIABBAWoiACACTg0BIAQoAgQgBCgCCEgNAAsLIARBEGokAAvBAQEDfyMAQRBrIgEkACAAQSBqEDQhAiAAQShqEDQhAyAAQQA6ABwgAEKDgICAEDcCFCAAQgA3AgwgAEEBOgAIIABCADcCACABQQhqQwAAAABDAAAAABAqGiACIAEpAwg3AgAgAUEIakMAAAAAQwAAAAAQKhogAyABKQMINwIAIABCgICAgICAgMA/NwJAIABBADoAPCAAQoCAgIDw//+//wA3AjQgAEEANgIwIABByABqQQBBLBBPGiABQRBqJAAgAAslACABIABrsiAClCAAspIiAotDAAAAT10EQCACqA8LQYCAgIB4CzcAAkAgACgCFCABTA0AIAAoAhwgAUEBdGovAQAiAUH//wNGDQAgACgCKCABQShsag8LIAAoAiwLJgAgBEGAgIAITwRAIAAgARBXIAAgAhBXIAAgAxBXIAAgBBD0AQsLPwAgACgCOCABKQIANwIAIAAoAjggAikCADcCCCAAKAI4IgEgAzYCECAAIAFBFGo2AjggACAAKAI0QQFqNgI0CxAAIABBzABqEIEBIAAQ9wQLSwECfwJAIAFBACAAIAFPGw0AA0AgAC8BACIDRQ0BIANB/wBNBH8gAkEBagUgAxCtCiACagshAiABRSAAQQJqIgAgAUlyDQALCyACCw8AIABB5ABqIAAgARDRBgtDAQJ/QaC2AygCACgCrDMhAwJAIAEQ/gJFDQBBCBCEAkUNAAJ/IAAEQCADIAAQVQwBCyADKAKIAgsQ+AJBASECCyACC4UCAQV/IwBBMGsiBSQAQaC2AygCACIDKAKoNSEEIAMoAqwzIQEgBUEIahDWCiICQQA2AgQgAiAANgIAIAIgAygCtDU2AgggAiADKALgMjYCDCACIAFBxANqEHAoAgA2AhAgBRC2BSACIAUpAwA3AhQgAiADQeABaiIBIAJBFGogARCDARspAgA3AhwgA0GcNWohAQJAIAMoApw1IARMBEAgASACELEHDAELAkAgASAEEHQoAgAgAEcNACABIAQQdCgCDCADKALgMkF/akcNACACKAIMIQAgASAEEHQgADYCDAwBCyABIARBAWoQuQUgASAEEHQgBUEIakEkED4aCyAFQTBqJAALDQBBoLYDKAIAKgLIMQsoAQN/EDYiAUH4AmoiABCBASABIAAQYgR/IAIFIAAQcCgCAAs2AuwCC0EBAX8QNiECAkAgAQRAIAIgAigC7AIgAHI2AuwCDAELIAIgAigC7AIgAEF/c3E2AuwCCyACQfgCaiACQewCahB2C0sBA30gACACKgIAIgUgAyoCACIGIAEqAgAiBCAEIAZeGyAEIAVdGyACKgIEIgUgAyoCBCIGIAEqAgQiBCAEIAZeGyAEIAVdGxAqGgsmAQN/QaC2AygCACIBKALQMyICBH8gAiABKAKsMygCiAJGBSAACwsQAEGg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C+MBAQJ/IAJBAEchAwJAAkACQCACRSAAQQNxRXINACABQf8BcSEEA0AgAC0AACAERg0CIABBAWohACACQX9qIgJBAEchAyACRQ0BIABBA3ENAAsLIANFDQELAkAgAC0AACABQf8BcUYgAkEESXINACABQf8BcUGBgoQIbCEDA0AgACgCACADcyIEQX9zIARB//37d2pxQYCBgoR4cQ0BIABBBGohACACQXxqIgJBA0sNAAsLIAJFDQAgAUH/AXEhAQNAIAEgAC0AAEYEQCAADwsgAEEBaiEAIAJBf2oiAg0ACwtBAAtWAQJ/IAACfyABQR9NBEAgACgCBCECIAAoAgAMAQsgACAAKAIAIgI2AgQgAEEANgIAIAFBYGohAUEACyIDIAF0NgIAIAAgAiABdCADQSAgAWt2cjYCBAvdAgEFfyMAQfABayIHJAAgByADKAIAIgg2AugBIAMoAgQhAyAHIAA2AgAgByADNgLsAUEBIQkCQAJAAkACQEEAIAhBAUYgAxsNACAAIAYgBEECdGooAgBrIgggACACEQIAQQFIDQBBACABayELIAVFIQoDQAJAIAghAyAKRSAEQQJIckUEQCAEQQJ0IAZqQXhqKAIAIQUgACALaiIIIAMgAhECAEF/Sg0BIAggBWsgAyACEQIAQX9KDQELIAcgCUECdGogAzYCACAHQegBaiAHQegBahDEByIAEJYEIAlBAWohCSAAIARqIQQgBygC6AFBAUYEQCAHKALsAUUNBQtBACEFQQEhCiADIQAgAyAGIARBAnRqKAIAayIIIAcoAgAgAhECAEEASg0BDAMLCyAAIQMMAgsgACEDCyAFDQELIAEgByAJEMMHIAMgASACIAQgBhCwBQsgB0HwAWokAAtYAQJ/IAACfyABQR9NBEAgACgCACECIAAoAgQMAQsgACgCBCECIABBADYCBCAAIAI2AgAgAUFgaiEBQQALIgMgAXY2AgQgACADQSAgAWt0IAIgAXZyNgIACwkAIAAgATgCUAsXACAAQQMQpAEgAUEDEKQBkkMAAAAAXgs+AgF/AX5BoLYDKAIAIgIgAigCkDRBAnI2ApA0IAApAgAhAyACQZg0aiABQQEgARs2AgAgAkGwNGogAzcDAAtmAQJ/IwBBEGsiASQAIAAoAgwhAiABQQhqIAAQyAEgACgCABB5IAIoAgAgAUEI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ASAEIAAQkQNBAWoQjgQgAwRAIAQQTQsCQCAFBEAgACACKAIMQQFqEKoFIAAgAigCCBCPBCAAIAEQqwUMAQsgACACKAIIELUECwsgAkEQaiQADwsQrQUACyQBAX9BASEBIAAqAgAgACoCCF4EfyABBSAAKgIEIAAqAgxeCwsQACAAIAFBgICAgHhyNgIICwkAIAAgATYCAAskACAAQQtPBH8gAEEQakFwcSIAIABBf2oiACAAQQtGGwVBCgsLCgBBjKoDEN0CAAtBAQF/IwBBEGsiBSQAIAUgASACIAMgBEKAgICAgICAgIB/hRCmASAAIAUpAwA3AwAgACAFKQMINwMIIAVBEGokAAvZAwICfwJ+IwBBIGsiAiQAAkAgAUL///////////8AgyIFQoCAgICAgMD/Q3wgBUKAgICAgIDAgLx/fFQEQCABQgSGIABCPIiEIQQgAEL//////////w+DIgBCgYCAgICAgIAIWgRAIARCgYCAgICAgIDAAHwhBAwCCyAEQoCAgICAgICAQH0hBCAAQoCAgICAgICACIVCAFINASAEQgGDIAR8IQQMAQsgAFAgBUKAgICAgIDA//8AVCAFQoCAgICAgMD//wBRG0UEQCABQgSGIABCPIiEQv////////8Dg0KAgICAgICA/P8AhCEEDAELQoCAgICAgID4/wAhBCAFQv///////7//wwBWDQBCACEEIAVCMIinIgNBkfcASQ0AIAJBEGogACABQv///////z+DQoCAgICAgMAAhCIEIANB/4h/ahCMASACIAAgBEGB+AAgA2sQhQMgAikDCEIEhiACKQMAIgBCPIiEIQQgAikDECACKQMYhEIAUq0gAEL//////////w+DhCIAQoGAgICAgICACFoEQCAEQgF8IQQMAQsgAEKAgICAgICAgAiFQgBSDQAgBEIBgyAEfCEECyACQSBqJAAgBCABQoCAgICAgICAgH+DhL8LygEBBn8jAEHwAWsiBSQAIAUgADYCAEEBIQYCQCADQQJIDQBBACABayEKIAAhBwNAIAAgByAKaiIIIAQgA0F+aiIJQQJ0aigCAGsiByACEQIAQQBOBEAgACAIIAIRAgBBf0oNAgsgBSAGQQJ0aiEAAkAgByAIIAIRAgBBAE4EQCAAIAc2AgAgA0F/aiEJDAELIAAgCDYCACAIIQcLIAZB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rAVBAWoiBRCnBSIEEKsFIAAgBRCqBSAAIAIQjwQLIAQgASACEI4EIANBADoADyACIARqIANBD2oQtAQgA0EQaiQADwsQrQUAC8cBAgF/An5BfyEDAkAgAEIAUiABQv///////////wCDIgRCgICAgICAwP//AFYgBEKAgICAgIDA//8AURsNAEEAIAJC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAAgBCAFhIRQBEBBAA8LIAEgAoNCAFkEQCAAQgBUIAEgAlMgASACURsNASAAIAEgAoWEQgBSDwsgAEIAViABIAJVIAEgAlEbDQAgACABIAKFhEIAUiEDCyADC4wRAgV/DH4jAEHAAWsiBSQAIARC////////P4MhEiACQv///////z+DIQwgAiAEhUKAgICAgICAgIB/gyERIARCMIinQf//AXEhBwJAAkACQCACQjCIp0H//wFxIglBf2pB/f8BTQRAIAdBf2pB/v8BSQ0BCyABUCACQv///////////wCDIgpCgICAgICAwP//AFQgCkKAgICAgIDA//8AURtFBEAgAkKAgICAgIAghCERDAILIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRG0UEQCAEQoCAgICAgCCEIREgAyEBDAILIAEgCkKAgICAgIDA//8AhYRQBEAgAyACQoCAgICAgMD//wCFhFAEQEIAIQFCgICAgICA4P//ACERDAMLIBFCgICAgICAwP//AIQhEUIAIQEMAgsgAyACQoCAgICAgMD//wCFhFAEQEIAIQEMAgsgASAKhFANAiACIAOEUARAIBFCgICAgICAwP//AIQhEUIAIQEMAgsgCkL///////8/WARAIAVBsAFqIAEgDCABIAwgDFAiBht5IAZBBnStfKciBkFxahCMAUEQIAZrIQYgBSkDuAEhDCAFKQOwASEBCyACQv///////z9WDQAgBUGgAWogAyASIAMgEiASUCIIG3kgCEEGdK18pyIIQXFqEIwBIAYgCGpBcGohBiAFKQOoASESIAUpA6ABIQMLIAVBkAFqIBJCgICAgICAwACEIhRCD4YgA0IxiIQiAkKEyfnOv+a8gvUAIAJ9IgQQ1QEgBUGAAWpCACAFKQOYAX0gBBDVASAFQfAAaiAFKQOIAUIBhiAFKQOAAUI/iIQiBCACENUBIAVB4ABqIARCACAFKQN4fRDVASAFQdAAaiAFKQNoQgGGIAUpA2BCP4iEIgQgAhDVASAFQUBrIARCACAFKQNYfRDVASAFQTBqIAUpA0hCAYYgBSkDQEI/iIQiBCACENUBIAVBIGogBEIAIAUpAzh9ENUBIAVBEGogBSkDKEIBhiAFKQMgQj+IhCIEIAIQ1QEgBSAEQgAgBSkDGH0Q1QEgBiAJIAdraiEGAn5CACAFKQMIQgGGIAUpAwBCP4iEQn98IgpC/////w+DIgQgAkIgiCIOfiIQIApCIIgiCiACQv////8PgyILfnwiAkIghiINIAQgC358IgsgDVStIAogDn4gAiAQVK1CIIYgAkIgiIR8fCALIAQgA0IRiEL/////D4MiDn4iECAKIANCD4ZCgID+/w+DIg1+fCICQiCGIg8gBCANfnwgD1StIAogDn4gAiAQVK1CIIYgAkIgiIR8fHwiAiALVK18IAJCAFKtfH0iC0L/////D4MiDiAEfiIQIAogDn4iDSAEIAtCIIgiD358IgtCIIZ8Ig4gEFStIAogD34gCyANVK1CIIYgC0IgiIR8fCAOQgAgAn0iAkIgiCILIAR+IhAgAkL/////D4MiDSAKfnwiAkIghiIPIAQgDX58IA9UrSAKIAt+IAIgEFStQiCGIAJCIIiEfHx8IgIgDlStfCACQn58IhAgAlStfEJ/fCILQv////8PgyICIAxCAoYgAUI+iIRC/////w+DIgR+Ig4gAUIeiEL/////D4MiCiALQiCIIgt+fCINIA5UrSANIBBCIIgiDiAMQh6IQv//7/8Pg0KAgBCEIgx+fCIPIA1UrXwgCyAMfnwgAiAMfiITIAQgC358Ig0gE1StQiCGIA1CIIiEfCAPIA1CIIZ8Ig0gD1StfCANIAogDn4iEyAQQv////8PgyIQIAR+fCIPIBNUrSAPIAIgAUIChkL8////D4MiE358IhUgD1StfHwiDyANVK18IA8gCyATfiILIAwgEH58IgwgBCAOfnwiBCACIAp+fCICQiCIIAIgBFStIAwgC1StIAQgDFStfHxCIIaEfCIMIA9UrXwgDCAVIA4gE34iBCAKIBB+fCIKQiCIIAogBFStQiCGhHwiBCAVVK0gBCACQiCGfCAEVK18fCIEIAxUrXwiAkL/////////AFgEQCABQjGGIARC/////w+DIgEgA0L/////D4MiCn4iDEIAUq19QgAgDH0iECAEQiCIIgwgCn4iDSABIANCIIgiC358Ig5CIIYiD1StfSACQv////8PgyAKfiABIBJC/////w+DfnwgCyAMfnwgDiANVK1CIIYgDkIgiIR8IAQgFEIgiH4gAyACQiCIfnwgAiALfnwgDCASfnxCIIZ8fSESIAZBf2ohBiAQIA99DAELIARCIYghCyABQjCGIAJCP4YgBEIBiIQiBEL/////D4MiASADQv////8PgyIKfiIMQgBSrX1CACAMfSIOIAEgA0IgiCIMfiIQIAsgAkIfhoQiDUL/////D4MiDyAKfnwiC0IghiITVK19IAwgD34gCiACQgGIIgpC/////w+DfnwgASASQv////8Pg358IAsgEFStQiCGIAtCIIiEfCAEIBRCIIh+IAMgAkIhiH58IAogDH58IA0gEn58QiCGfH0hEiAKIQIgDiATfQshASAGQYCAAU4EQCARQoCAgICAgMD//wCEIRFCACEBDAELIAZB//8AaiEHIAZBgYB/TARAAkAgBw0AIAQgAUIBhiADViASQgGGIAFCP4iEIgEgFFYgASAUURutfCIBIARUrSACQv///////z+DfCICQoCAgICAgMAAg1ANACACIBGEIREMAgtCACEBDAELIAQgAUIBhiADWiASQgGGIAFCP4iEIgEgFFogASAUURutfCIBIARUrSACQv///////z+DIAetQjCGhHwgEYQhEQsgACABNwMAIAAgETcDCCAFQcABaiQADwsgAEIANwMAIABCgICAgICA4P//ACARIAIgA4RQGzcDCCAFQcABaiQACxIAIABFBEBBAA8LIAAgARC3CwsuAgF/AXwjAEEQayIBJAAgASAAEMALIAEpAwAgASkDCBCvBSECIAFBEGokACACC6QBAQV/IwBBgAJrIgQkAAJAIAJBAkgNACABIAJBAnRqIgcgBDYCACAARQ0AIAQhAwNAIAMgASgCACAAQYACIABBgAJJGyIFED4aQQAhAwNAIAEgA0ECdGoiBigCACABIANBAWoiA0ECdGooAgAgBRA+GiAGIAYoAgAgBWo2AgAgAiADRw0ACyAAIAVrIgBFDQEgBygCACEDDAALAAsgBEGAAmokAAsmAQF/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AwsDQAJ/IAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAADAELIAEQUQsiAkFQakEKSSACQb9/akEaSXIgAkHfAEZyRUEAIAJBn39qQRpPG0UEQCAEQQFqIQQMAQsLQoCAgICAgOD//wAhCSACQSlGDQIgASgCaCICBEAgASABKAIEQX9qNgIECyADBEAgBEUNAwNAIARBf2ohBCACBEAgASABKAIEQX9qNgIECyAEDQALDAMLC0HQwwRBHDYCACABQgAQ1gELQgAhCQsgACAKNwMAIAAgCTcDCCAFQTBqJAALvwIBAX8jAEHQAGsiBCQAAkAgA0GAgAFOBEAgBEEgaiABIAJCAEKAgICAgICA//8AEFogBCkDKCECIAQpAyAhASADQf//AUgEQCADQYGAf2ohAwwCCyAEQRBqIAEgAkIAQoCAgICAgID//wAQWiADQf3/AiADQf3/AkgbQYKAfmohAyAEKQMYIQIgBCkDECEBDAELIANBgYB/Sg0AIARBQGsgASACQgBCgICAgICAwAAQWiAEKQNIIQIgBCkDQCEBIANBg4B+SgRAIANB/v8AaiEDDAELIARBMGogASACQgBCgICAgICAwAAQWiADQYaAfSADQYaAfUobQfz/AWohAyAEKQM4IQIgBCkDMCEBCyAEIAEgAkIAIANB//8Aaq1CMIYQWiAAIAQpAwg3AwggACAEKQMANwMAIARB0ABqJAALNQAgACABNwMAIAAgAkL///////8/gyAEQjCIp0GAgAJxIAJCMIinQf//AXFyrUIwhoQ3AwgLEQAgACABIAJB+gZB+wYQ0AcLmAIAAkACQCABQRRLDQACQAJAAkACQAJAAkACQAJAIAFBd2oOCgABAgkDBAUGCQcICyACIAIoAgAiAUEEajYCACAAIAEoAgA2AgAPCyACIAIoAgAiAUEEajYCACAAIAE0AgA3AwAPCyACIAIoAgAiAUEEajYCACAAIAE1AgA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEyAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEzAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEwAAA3AwAPCyACIAIoAgAiAUEEajYCACAAIAExAAA3AwAPCyAAIAIgAxEAAAsPCyACIAIoAgBBB2pBeHEiAUEIajYCACAAIAEpAwA3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GwAgACABIAIoAgAgAhCbASADIAQgBSAGEOoBC2QBBH8jAEEQayIBJAAgAUEANgIMIABBCGohAwNAIAAoAhAhAiABQQhqIAMQxgwgAiABQQxqIAFBCGoQ2gEgAUEIahArIAEgASgCDCICQQFqIgQ2AgwgBCACSQ0ACyABQRBqJAALawIDfwF8IwBBEGsiASQAIAFBADYCDANAIAFBCGogACgCECABQQxqENsBIAFBCGoQ9AUhBCAAIAEoAgxBA3RqIAQ5AwggAUEIahArIAEgASgCDCICQQFqIgM2AgwgAyACSQ0ACyABQRBqJAALKgEBfyMAQRBrIgIkACAAQdjCAiACQQhqIAEQdxADNgIAIAJBEGokACAACwcAIAAQ1QwLCgAgACABaiABbwsJACAAQgA3AwALNQAgACgCABogACgCACAAENQCQQN0ahogACgCACAAEMgBQQN0ahogACgCACAAENQCQQN0ahoLLAEBfyABIAAoAgQiAkcEQANAIAAQUxogAkF4aiICIAFHDQALCyAAIAE2AgQLNQAgACgCABogACgCACAAENUCQQJ0ahogACgCACAAEJoBQQJ0ahogACgCACAAENUCQQJ0ahoLLAEBfyABIAAoAgQiAkcEQANAIAAQUxogAkF8aiICIAFHDQALCyAAIAE2AgQLCQAgAEEAOwEACzUAIAAoAgAaIAAoAgAgABDWAkEBdGoaIAAoAgAgABCxAUEBdGoaIAAoAgAgABDWAkEBdGoaCywBAX8gASAAKAIEIgJHBEADQCAAEFMaIAJBfmoiAiABRw0ACwsgACABNgIECzEBAX8gABDzByAAKAIABEAgACAAKAIAEPQHIAAQUxogACgCACEBIAAQ1gIaIAEQTQsLRgEBfyAAELEBIgIgAUkEQCAAIAEgAmsQkg0PCyACIAFLBEAgACgCACABQQF0aiEBIAAQsQEhAiAAIAEQ9AcgACACEIwNCwsdACAAIAEgAigCACACELEBIAMgBCAFIAYgBxDtAQsdACAAIAEgAigCACACEJsBIAMgBCAFIAYgBxDtAQtkAQN/IwBBEGsiASQAIAFBADYCDANAIAAoAhQhAyABQQhqIAAgAkECdGpBBGoQqwQgAyABQQxqIAFBCGoQ2gEgAUEIahArIAEgASgCDEEBaiICNgIMIAJBBEkNAAsgAUEQaiQAC2cBAn8jAEEQayIBJAAgAUEANgIMA0AgAUEIaiAAKAIUIAFBDGoQ2wEgAUEIahCEASECIAAgASgCDEECdGogAjYCBCABQQhqECsgASABKAIMQQFqIgI2AgwgAkEESQ0ACyABQRBqJAALZAEDfyMAQRBrIgEkACABQQA2AgwDQCAAKAIQIQMgAUEIaiAAIAJBAnRqQQRqEKsEIAMgAUEMaiABQQhqENoBIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQNJDQALIAFBEGokAAtnAQJ/IwBBEGsiASQAIAFBADYCDANAIAFBCGogACgCECABQQxqENsBIAFBCGoQhAEhAiAAIAEoAgxBAnRqIAI2AgQgAUEIahArIAEgASgCDEEBaiICNgIMIAJBA0kNAAsgAUEQaiQAC2QBA38jAEEQayIBJAAgAUEANgIMA0AgACgCDCEDIAFBCGogACACQQJ0akEEahCrBCADIAFBDGogAUEIahDaASABQQhqECsgASABKAIMQQFqIgI2AgwgAkECSQ0ACyABQRBqJAALZwECfyMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAgwgAUEMahDbASABQQhqEIQBIQIgACABKAIMQQJ0aiACNgIEIAFBCGoQKyABIAEoAgxBAWoiAjYCDCACQQJJDQALIAFBEGokAAtkAQN/IwBBEGsiASQAIAFBADYCDANAIAAoAhAhAyABQQhqIAAgAkECdGpBBGoQiQIgAyABQQxqIAFBCGoQ2gEgAUEIahArIAEgASgCDEEBaiICNgIMIAJBA0kNAAsgAUEQaiQAC2gCAn8BfSMAQRBrIgEkACABQQA2AgwDQCABQQhqIAAoAhAgAUEMahDbASABQQhqEDMhAyAAIAEoAgxBAnRqIAM4AgQgAUEIahArIAEgASgCDEEBaiICNgIMIAJBA0kNAAsgAUEQaiQAC2QBA38jAEEQayIBJAAgAUEANgIMA0AgACgCDCEDIAFBCGogACACQQJ0akEEahCJAiADIAFBDGogAUEIahDaASABQQhqECsgASABKAIMQQFqIgI2AgwgAkECSQ0ACyABQRBqJAALaAICfwF9IwBBEGsiASQAIAFBADYCDANAIAFBCGogACgCDCABQQxqENsBIAFBCGoQMyEDIAAgASgCDEECdGogAzgCBCABQQhqECsgASABKAIM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QX9qBSAJC0EEdGoiB0EkaiAEIAJrIgM2AgAgASADNgKgHCACQQFIDQFBACEDA0AgACADIAZqEOgBIQQgASAHKAIkIANqQQF0akHIDGogBDsBACADQQFqIgMgAkcNAAsMAQsgBEEANgIECyAAIAYgAhDiAwsgBQRAIAAgBiABIAhBAXRqQcgMaiAFEKcDGiABQZwcaiIAIAAoAgAgBWs2AgALIAEgBSAGajYCACABIAEvAZYcQX9qOwGWHCABIAEvAZgcQX9qOwGYHAsL8gQBB38jAEEQayIDJAAgAEEIahA0IQQgAEGcAWoQNCEFIABB2AFqEDQhBiAAQewGahA0GiAAQaQHaiECIABB/AZqIQEgAEH0BmoQNCEHA0AgARA0QQhqIgEgAkcNAAsgAEG8CGohAiAAQZQIaiEBA0AgARA0QQhqIgEgAkcNAAsgAEGAKmoQRBpBACECIABBAEGQKhBPIQEgA0EIakMAAIC/QwAAgL8QKhogBCADKQMINwMAIAFCmrPm9IOAgODAADcDICABQYoINgIcIAFBgAg2AhggAUKJkaLkg4CA0MAANwMQIAFBLGpB/wFB1AAQTxogAUEANgKYASABQYCAgPwDNgKQASABQgA3A4gBIAFCgICA9NOZs6Y9NwOAASABQQA6AJQBIANBCGpDAACAP0MAAIA/ECoaIAUgAykDCDcCACABQgA3AqwBIAFBADoAqAEgAUGAgIQINgKkASABQgA3ArQBIAFBADYCvAEgAUEANgLQASABQQE2AswBIAFBADYCyAEgAUECNgLEASABQQM2AsABIANBCGpD//9//0P//3//ECoaIAYgAykDCDcDACADQQhqQ///f/9D//9//xAqGiAHIAMpAwg3AgAgAUGAgICGBDYCKEEAIQADQCABIABBAnRqIgRBgICA/Hs2AuwHIARBgAhqQYCAgPx7NgIAIABBAWoiAEEFRw0ACwNAIAEgAkECdGoiAEHQCGpBgICA/Hs2AgAgAEHQGGpBgICA/Hs2AgAgAkEBaiICQYAERw0AC0EAIQIDQCABIAJBAnRqQdAoakGAgID8ezYCACACQQFqIgJBFkcNAAsgA0EQaiQAC/APAgR/A30jAEEwayIEJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkADQAJAAkACQAJAAkACQAJA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BQsgAiADIAQEfyAEKAIABUEACyAFBH8gBSgCAAVBfwsgBiAHENgEIQkMBAsgAiADIAQEfiAEKQMABUKAgICAgICAgIB/CyAFBH4gBSkDAAVC////////////AAsgBiAHELsJIQkMAwsgAiADIAQEfiAEKQMABUIACyAFBH4gBSkDAAVCfwsgBiAHELoJIQkMAgsgAiADIAQEfSAEKgIABUP//3//CyAFBH0gBSoCAAVD//9/fwsgBiAHELkJIQkMAQsgAiADIAQEfCAEKwMABUT////////v/wsgBQR8IAUrAwAFRP///////+9/CyAGIAcQuAkhCQsgCEEQaiQAIAkLHgEBfkJ/IAAgAXwiAiABQn+FIABUGyACIAFCAFIbC1kBAX4gAUIBWUEAIAFCgICAgICAgICAf4QgAFUbRQRAQv///////////wAgACABfSICIAFC////////////AHwgAFMbIAIgAUIAUxsPC0KAgICAgICAgIB/C1kBAX4gAUJ/V0EAQoCAgICAgICAgH8gAX0gAFUbRQRAQv///////////wAgACABfCICQv///////////wAgAX0gAFMbIAIgAUIAVRsPC0KAgICAgICAgIB/C0UBAX8gAUEBTkEAIAFBgICAgHhyIABKG0UEQEH/////ByAAIAFrIgIgAUH/////B2ogAEgbIAIgAUEASBsPC0GAgICAeAtFAQF/IAFBf0xBAEGAgICAeCABayAAShtFBEBB/////wcgACABaiICQf////8HIAFrIABIGyACIAFBAEobDwtBgICAgHgLIgEBf0F/IAAgAWoiAiABQf//A3MgAEkbIAIgARtB//8DcQtOAQF/AkACQCABQQFOBEBBgIACIQIgAUGAgH5qIABMDQEMAgsgAUF/Sg0AQf//ASECIAFB//8BaiAASA0BCyAAIAFrIQILIAJBEHRBEHULTAEBfwJAAkAgAUF/TARAQYCAAiECQYCAfiABayAATA0BDAILIAFFDQBB//8BIQJB//8BIAFrIABIDQELIAAgAWohAgsgAkEQdEEQdQsgAQF/QX8gACABaiICIAFB/wFzIABJGyACIAEbQf8BcQtKAQF/AkACQCABQQFOBEBBgAEhAiABQYB/aiAATA0BDAILIAFBf0oNAEH/ACECIAFB/wBqIABIDQELIAAgAWshAgsg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QaggKAIANgKIBCABQaAgKQMANwOABCABQZggKQMANwP4AyABQZAgKQMANwPwA0GttgNBrCBBmLMDQQ0gAUHwA2pBB0F/EKkGQa22Ay0AAHIiADoAAAJAIABFDQAgAigCtDUiAEUNACABIAAoAgA2AlBBuSAgAUHQAGoQlgFDAAAAABDBA0EAIQAgAUFAayEDA0AgAUGQBGogAigCtDUgABDrBiABKgKYBCEJIAEqApQEIQogASoCkAQhCyABKgKcBCEMIAFBkARqEHghDSABQZAEahCvASEOIAEgCbs5AyAgASAMuzkDKCABIA27OQMwIAEgDrs5AzggAyABQfADaiAAQQJ0aigCADYCACABIAu7OQMQIAEgCrs5AxhBvyAgAUEQahBZIABBAWoiAEEHRw0AC0MAAAAAEIgFC0HxIEGcswMQrQMaELcBC0GstgMtAABBrbYDLQAAckUNACAFKAIAQQFIDQAgAUH4A2ohBEEAIQADQAJAIAUgABBIKAIAIgItAHtFDQAQ0wUhA0GttgMtAAAEQCABQfADaiACQZizAygCABDrBiADIAFB8ANqIARB/4GAfEMAAAAAQQ9DAACAPxCXAQtBrLYDLQAARQ0AIAItAAtBAXENACABIAIuAYgBNgIAIAFB8ANqQSBBpiEgARBcGiABQZAEaiACQQxqIgIgAUHoA2oQ+QIiCSAJECoQLyADIAIgAUGQBGpByMmRe0MAAAAAQQ8QbSADIAJBfyABQfADahDUBgsgAEEBaiIAIAUoAgBIDQALCxDUASABQaAEaiQAC0UBAX8gACgCACICIAAoAgRGBH8gACAAIAJBAWoQXRDpAiAAKAIABSACCyAAKAIIaiABLQAAOgAAIAAgACgCAEEBajYCAAtaAQJ/IABBABDyASECQaC2AygCACIAKAKIWkEBTgR/IABBiNoAaiEAAkADQCAAIAEQhQEoAgQgAkYNASABQQFqIgEgACgCAEgNAAtBAA8LIAAgARCFAQUgAQsLXQIDfwF+IwBBEGsiASQAIABBCGoQNCECIABBEGoQNCEDIABCADcCACABQQhqQwAAAABDAAAAABAqGiADIAEpAwgiBDcCACACIAQ3AgAgAEEAOgAYIAFBEGokACAAC9gBAQV/IwBBEGsiACQAQaC2AygCACEBQdIXELwBQd0XIABBCGpDAAAAAEMA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CDYCMCACIAA2AjwgAiACQZgBajYCLAJAIAFBCHENACADIANBGGo2AgAgAEGTqAEgAxAeDQAgAkEKOgBLCyACQYAHNgIoIAJB/gY2AiQgAkGBBzYCICACQYIHNgIMQezLBCgCAEUEQCACQX82AkwLIAIQwgsLIQAgA0EgaiQAIAALCQAgACgCPBASC00BAX8jAEEQayIDJAACfiAAKAI8IAGnIAFCIIinIAJB/wFxIANBCGoQGBCQBEUEQCADKQMIDAELIANCfzcDCEJ/CyEBIANBEGokACABCwQAQgAL2wIBB38jAEEgayIDJAAgAyAAKAIcIgQ2AhAgACgCFCEFIAMgAjYCHCADIAE2AhggAyAFIARrIgE2AhQgASACaiEEQQIhByADQRBqIQECfwJAAkAgACgCPCADQRBqQQIgA0EMahAREJAERQRAA0AgBCADKAIMIgVGDQIgBUF/TA0DIAEgBSABKAIEIghLIgZBA3RqIgkgBSAIQQAgBhtrIgggCSgCAGo2AgAgAUEMQQQgBhtqIgkgCSgCACAIazYCACAEIAVrIQQgACgCPCABQQhqIAEgBhsiASAHIAZrIgcgA0EMahAREJAERQ0ACwsgA0F/NgIMIARBf0cNAQsgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCECACDAELIABBADYCHCAAQgA3AxAgACAAKAIAQSByNgIAQQAgB0ECRg0AGiACIAEoAgRrCyEEIANBIGokACAEC0EBAn8jAEEQayIBJABBfyECAkAgABDGBw0AIAAgAUEPakEBIAAoAiARBQBBAUcNACABLQAPIQILIAFBEGokACACC7MBAQN/IAIoAkxBAE4Ef0EBBSAECxogAiACLQBKIgRBf2ogBHI6AEoCfyABIgQgAigCCCACKAIEIgVrIgNBAUgNABogACAFIAMgBCADIARJGyIDED4aIAIgAigCBCADajYCBCAAIANqIQAgBCADawsiAwRAA0ACQCACEMYHRQRAIAIgACADIAIoAiARBQAiBUEBakEBSw0BCyAEIANrDwsgACAFaiEAIAMgBWsiAw0ACwsgAQt2AQF/QQIhAQJ/IABBKxDQAkUEQCAALQAAQfIARyEBCyABQYABcgsgASAAQfgAENACGyIBQYCAIHIgASAAQeUAENACGyIBIAFBwAByIAAtAAAiAEHyAEYbIgFBgARyIAEgAEH3AEYbIgFBgAhyIAEgAEHhAEYbC7UCAgR/An0CQEGgtgMoAgAiASgCvDZBf0cNACABKAK0NSICRQ0AIAItAApBBHENACABKAL0NQ0AIAEoAow2DQAgASgCSCIDENkBIABBAnZxIAEoAkwiBBDZASAAQQN2cUYNAAJAIAIoArgCDQAgAi0AwQJFDQAgA0EBEIMDBEAgAiACKgJUIAJB4ANqEK8BkxDRAkMAAAAADwsgBEEBEIMDRQ0BIAIgAioCVCACQeADahCvAZIQ0QJDAAAAAA8LQwAAAAAgAkHgA2oQrwEgAhD+AZMgAkGUBmoQrwGSEDEhBiABKAJIQQEQgwMEQCABQQI2AsQ2IAFBAzYCvDYgAUEwNgK0NiAGjA8LIAEoAkxBARCDA0UNACABQQM2AsQ2IAFBAjYCvDYgAUEwNgK0NiAGIQULIAULMAEBfyMAQRBrIgIgADYCDCACIAAgAUECdCABQQBHQQJ0a2oiAEEEajYCCCAAKAIAC4MTAg1/A34jAEGwAmsiBSQAIAAoAkxBAE4Ef0EBBSADCxoCQCABLQAAIgRFDQACQAJAAkADQAJAAkAgBEH/AXEQhgMEQANAIAEiBEEBaiEBIAQtAAEQhgMNAAsgAEIAENYBA0ACfyAAKAIEIgEgACgCaEkEQCAAIAFBAWo2AgQgAS0AAAwBCyAAEFELEIYDDQALAkAgACgCaEUEQCAAKAIEIQEMAQsgACAAKAIEQX9qIgE2AgQLIAEgACgCCGusIAApA3ggEHx8IRAMAQsCfwJAAkAgAS0AACIEQSVGBEAgAS0AASIDQSpGDQEgA0ElRw0CCyAAQgAQ1gEgASAEQSVGaiEEAn8gACgCBCIBIAAoAmhJBEAgACABQQFqNgIEIAEtAAAMAQsgABBRCyIBIAQtAABHBEAgACgCaARAIAAgACgCBEF/ajYCBAtBACEMIAFBAE4NCgwICyAQQgF8IRAMAwtBACEHIAFBAmoMAQsCQCADELACRQ0AIAEtAAJBJEcNACACIAEtAAFBUGoQzQshByABQQNqDAELIAIoAgAhByACQQRqIQIgAUEBagshBEEAIQxBACEBIAQtAAAQsAIEQANAIAQtAAAgAUEKbGpBUGohASAELQABIQMgBEEBaiEEIAMQsAINAAsLAn8gBCAELQAAIghB7QBHDQAaQQAhCSAHQQBHIQwgBC0AASEIQQAhCiAEQQFqCyIDQQFqIQRBAyEGAkACQAJAAkACQAJAIAhBv39qDjoECgQKBAQECgoKCgMKCgoKCgoECgoKCgQKCgQKCgoKCgQKBAQEBAQABAUKAQoEBAQKCgQCBAoKBAoCCgsgA0ECaiAEIAMtAAFB6ABGIgMbIQRBfkF/IAMbIQYMBAsgA0ECaiAEIAMtAAFB7ABGIgMbIQRBA0EBIAMbIQYMAwtBASEGDAILQQIhBgwBC0EAIQYgAyEEC0EBIAYgBC0AACIDQS9xQQNGIggbIQ4CQCADQSByIAMgCBsiC0HbAEYNAAJAIAtB7gBHBEAgC0HjAEcNASABQQEgAUEBShshAQwCCyAHIA4gEBDIBwwCCyAAQgAQ1gEDQAJ/IAAoAgQiAyAAKAJoSQRAIAAgA0EBajYCBCADLQAADAELIAAQUQsQhgMNAAsCQCAAKAJoRQRAIAAoAgQhAwwBCyAAIAAoAgRBf2oiAzYCBAsgAyAAKAIIa6wgACkDeCAQfHwhEAsgACABrCIRENYBAkAgACgCBCIIIAAoAmgiA0kEQCAAIAhBAWo2AgQMAQsgABBRQQBIDQUgACgCaCEDCyADBEAgACAAKAIEQX9qNgIEC0EQIQMCQAJAAkACQAJAAkACQAJAAkACQAJAAkAgC0Gof2oOIQYLCwILCwsLCwELAgQBAQELBQsLCwsLAwYLCwILBAsLBgALIAtBv39qIgFBBktBASABdEHxAHFFcg0KCyAFIAAgDkEAEMoHIAApA3hCACAAKAIEIAAoAghrrH1RDQ8gB0UNCSAFKQMIIREgBSkDACESIA4OAwUGBwkLIAtB7wFxQeMARgRAIAVBIGpBf0GBAhBPGiAFQQA6ACAgC0HzAEcNCCAFQQA6AEEgBUEAOgAuIAVBADYBKgwICyAFQSBqIAQtAAEiA0HeAEYiCEGBAhBPGiAFQQA6ACAgBEECaiAEQQFqIAgbIQ0CfwJAAkAgBEECQQEgCBtqLQAAIgRBLUcEQCAEQd0ARg0BIANB3gBHIQYgDQwDCyAFIANB3gBHIgY6AE4MAQsgBSADQd4ARyIGOgB+CyANQQFqCyEEA0ACQCAELQAAIgNBLUcEQCADRQ0QIANB3QBHDQEMCgtBLSEDIAQtAAEiCEUgCEHdAEZyDQAgBEEBaiENAkAgBEF/ai0AACIEIAhPBEAgCCEDDAELA0AgBEEBaiIEIAVBIGpqIAY6AAAgBCANLQAAIgNJDQALCyANIQQLIAMgBWogBjoAISAEQQFqIQQMAAsAC0EIIQMMAgtBCiEDDAELQQAhAwsgACADEM8LIREgACkDeEIAIAAoAgQgACgCCGusfVENCiAHRSALQfAAR3JFBEAgByARPgIADAULIAcgDiAREMgHDAQLIAcgEiARELQLOAIADAMLIAcgEiAREK8FOQMADAILIAcgEjcDACAHIBE3AwgMAQsgAUEBakEfIAtB4wBGIggbIQYCQCAOQQFHIg1FBEAgByEDIAwEQCAGQQJ0EPkBIgNFDQcLIAVCADcDqAJBACEBIAxBAEchCQNAIAMhCgJAA0ACfyAAKAIEIgMgACgCaEkEQCAAIANBAWo2AgQgAy0AAAwBCyAAEFELIgMgBWotACFFDQEgBSADOgAbIAVBHGogBUEbaiAFQagCahC2CyIDQX5GDQAgA0F/Rg0HIAoEQCAKIAFBAnRqIAUoAhw2AgAgAUEBaiEBCyAJQQFzIAEgBkdyDQALIAogBkEBdEEBciIGQQJ0ELkHIgMNAQwGCwsCf0EBIAVBqAJqIgNFDQAaIAMoAgBFC0UNBEEAIQkMAQsgDARAQQAhASAGEPkBIgNFDQYDQCADIQkDQAJ/IAAoAgQiAyAAKAJoSQRAIAAgA0EBajYCBCADLQAADAELIAAQUQsiAyAFai0AIUUEQEEAIQoMBAsgASAJaiADOgAAIAFBAWoiASAGRw0AC0EAIQogCSAGQQF0QQFyIgYQuQciAw0ACwwHC0EAIQEgBwRAA0ACfyAAKAIEIgMgACgCaEkEQCAAIANBAWo2AgQgAy0AAAwBCyAAEFELIgMgBWotACEEQCABIAdqIAM6AAAgAUEBaiEBDAEFQQAhCiAHIQkMAwsACwALA0ACfyAAKAIEIgEgACgCaEkEQCAAIAFBAWo2AgQgAS0AAAwBCyAAEFELIAVqLQAhDQALQQAhCUEAIQpBACEBCwJAIAAoAmhFBEAgACgCBCEDDAELIAAgACgCBEF/aiIDNgIECyAAKQN4IAMgACgCCGusfCISUCARIBJSQQAgCBtyDQYCQCAMRQ0AIA1FBEAgByAKNgIADAELIAcgCTYCAAsgCA0AIAoEQCAKIAFBAnRqQQA2AgALIAlFBEBBACEJDAELIAEgCWpBADoAAAsgACgCBCAAKAIIa6wgACkDeCAQfHwhECAPIAdBAEdqIQ8LIARBAWohASAELQABIgQNAQwFCwtBACEJDAELQQAhCUEAIQoLIA9BfyAPGyEPCyAMRQ0AIAkQTSAKEE0LIAVBsAJqJAAgDwv2CQIGfwR+IwBBEGsiBSQAAn4CQAJAAkACQAJAIAFBJE0EQANAAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyICEIYDDQALAkACQCACQVVqDgMAAQABC0F/QQAgAkEtRhshBiAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AACECDAELIAAQUSECCwJAIAFBb3EgAkEwR3JFBEACfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEFELIgJBX3FB2ABGBEBBECEBAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyICQZGlA2otAABBEEkNBSAAKAJoRQ0IIAAgACgCBEF/ajYCBAwICyABDQFBCCEBDAQLIAFBCiABGyIBIAJBkaUDai0AAEsNACAAKAJoBEAgACAAKAIEQX9qNgIECyAAQgAQ1gFB0MMEQRw2AgBCAAwHCyABQQpHDQIgAkFQaiIDQQlNBEBBACEBA0AgAUEKbCADaiEBAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyICQVBqIgNBCU1BACABQZmz5swBSRsNAAsgAa0hCAsgA0EJSw0BIAhCCn4hCSADrSEKA0ACfyAAKAIEIgEgACgCaEkEQCAAIAFBAWo2AgQgAS0AAAwBCyAAEFELIgJBUGoiA0EJSyAJIAp8IghCmrPmzJmz5swZWnINAiAIQgp+IgkgA60iCkJ/hVgNAAtBCiEBDAMLQdDDBEEcNgIAQgAMBQtBCiEBIANBCU0NAQwCCyABIAFBf2pxBEAgASACQZGlA2otAAAiA0sEQANAIAMgASAEbGoiBEHG4/E4TUEAIAECfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEFELIgJBkaUDai0AACIDSxsNAAsgBK0hCAsgASADTQ0BIAGtIQkDQCAIIAl+IgogA61C/wGDIgtCf4VWDQIgCiALfCEIIAECfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEFELIgJBkaUDai0AACIDTQ0CIAUgCSAIENUBIAUpAwhQDQALDAELIAFBF2xBBXZBB3FBkacDaiwAACEHIAEgAkGRpQNqLQAAIgNLBEADQCADIAQgB3RyIgRB////P01BACABAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABBRCyICQZGlA2otAAAiA0sbDQALIAStIQgLIAEgA01CfyAHrSIJiCIKIAhUcg0AA0AgA61C/wGDIAggCYaEIQgCfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEFELIQIgCCAKVg0BIAEgAkGRpQNqLQAAIgNLDQALCyABIAJBkaUDai0AAE0NAANAIAECfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEFELQZGlA2otAABLDQALQdDDBEHEADYCAEEAIQZCfyEICyAAKAJoBEAgACAAKAIEQX9qNgIECyAIQn9RBEAgBkEBckUEQEHQwwRBxAA2AgBCfgwDCwsgCCAGrCIJhSAJfQwBCyAAQgAQ1gFCAAshCCAFQRBqJAAgCAuXHAMMfwZ+AXwjAEGQxgBrIgckAEEAIAMgBGoiEWshEgJAAn8DQAJAIAJBMEcEQCACQS5HDQQgASgCBCICIAEoAmhPDQEgASACQQFqNgIEIAItAAAMAwsgASgCBCICIAEoAmhJBEBBASEIIAEgAkEBajYCBCACLQAAIQIFQQEhCCABEFEhAgsMAQsLIAEQUQshAkEBIQogAkEwRw0AA0AgE0J/fCETAn8gASgCBCICIAEoAmhJBEAgASACQQFqNgIEIAItAAAMAQsgARBRCyICQTBGDQALQQEhCAsgB0EANgKQBgJ+AkACQAJAAkACQCACQS5GIgsgAkFQaiIJQQlNcgRAA0ACQCALQQFxBEAgCkUEQCAUIRNBASEKDAILIAhFIQgMBAsgFEIBfCEUIAxB/A9MBEAgDiAUpyACQTBGGyEOIAdBkAZqIAxBAnRqIgggDQR/IAIgCCgCAEEKbGpBUGoFIAkLNgIAQQEhCEEAIA1BAWoiAiACQQlGIgIbIQ0gAiAMaiEMDAELIAJBMEYNACAHIAcoAoBGQQFyNgKARkHcjwEhDgsCfyABKAIEIgIgASgCaEkEQCABIAJBAWo2AgQgAi0AAAwBCyABEFELIgJBLkYiCyACQVBqIglBCklyDQALCyATIBQgChshEyAIRSACQV9xQcUAR3JFBEACQCABIAYQyQciFUKAgICAgICAgIB/Ug0AIAZFDQVCACEVIAEoAmhFDQAgASABKAIEQX9qNgIECyAIRQ0DIBMgFXwhEwwFCyAIRSEIIAJBAEgNAQsgASgCaEUNACABIAEoAgRBf2o2AgQLIAhFDQILQdDDBEEcNgIAC0IAIRQgAUIAENYBQgAMAQsgBygCkAYiAUUEQCAHIAW3RAAAAAAAAAAAohD8ASAHKQMAIRQgBykDCAwBCyATIBRSIBRCCVVyIANBHkxBACABIAN2G3JFBEAgB0EwaiAFELABIAdBIGogARCEAyAHQRBqIAcpAzAgBykDOCAHKQMgIAcpAygQWiAHKQMQIRQgBykDGAwBCyATIARBfm2tVQRAQdDDBEHEADYCACAHQeAAaiAFELABIAdB0ABqIAcpA2AgBykDaEJ/Qv///////7///wAQWiAHQUBrIAcpA1AgBykDWEJ/Qv///////7///wAQWiAHKQNAIRQgBykDSAwBCyATIARBnn5qrFMEQEHQwwRBxAA2AgAgB0GQAWogBRCwASAHQYABaiAHKQOQASAHKQOYAUIAQoCAgICAgMAAEFogB0HwAGogBykDgAEgBykDiAFCAEKAgICAgIDAABBaIAcpA3AhFCAHKQN4DAELIA0EQCANQQhMBEAgB0GQBmogDEECdGoiAigCACEBA0AgAUEKbCEBIA1BAWoiDUEJRw0ACyACIAE2AgALIAxBAWohDAsCQCAOIBOnIgpKIA5BCU5yIApBEUpyDQAgCkEJRgRAIAdBwAFqIAUQsAEgB0GwAWogBygCkAYQhAMgB0GgAWogBykDwAEgBykDyAEgBykDsAEgBykDuAEQWiAHKQOgASEUIAcpA6gBDAILIApBCEwEQCAHQZACaiAFELABIAdBgAJqIAcoApAGEIQDIAdB8AFqIAcpA5ACIAcpA5gCIAcpA4ACIAcpA4gCEFogB0HgAWpBACAKa0ECdEHwpANqKAIAELABIAdB0AFqIAcpA/ABIAcpA/gBIAcpA+ABIAcpA+gBEMAHIAcpA9ABIRQgBykD2AEMAgsgAyAKQX1sakEbaiIBQR5MQQAgBygCkAYiAiABdhsNACAHQeACaiAFELABIAdB0AJqIAIQhAMgB0HAAmogBykD4AIgBykD6AIgBykD0AIgBykD2AIQWiAHQbACaiAKQQJ0QaikA2ooAgAQsAEgB0GgAmogBykDwAIgBykDyAIgBykDsAIgBykDuAIQWiAHKQOgAiEUIAcpA6gCDAELA0AgB0GQBmogDCICQX9qIgxBAnRqKAIARQ0AC0EAIQ0CQCAKQQlvIgFFBEBBACEIDAELIAEgAUEJaiAKQX9KGyEGAkAgAkUEQEEAIQhBACECDAELQYCU69wDQQAgBmtBAnRB8KQDaigCACIJbSEMQQAhC0EAIQFBACEIA0AgB0GQBmogAUECdGoiDiALIA4oAgAiDiAJbiIPaiILNgIAIAhBAWpB/w9xIAggC0UgASAIRnEiCxshCCAKQXdqIAogCxshCiAMIA4gCSAPbGtsIQsgAUEBaiIBIAJHDQALIAtFDQAgB0GQBmogAkECdGogCzYCACACQQFqIQILIAogBmtBCWohCgsDQCAHQZAGaiAIQQJ0aiEGAkADQCAKQSROBEAgCkEkRw0CIAYoAgBB0en5BE8NAgsgAkH/D2ohDEEAIQsgAiEJA0AgCSECAn9BACALrSAHQZAGaiAMQf8PcSIBQQJ0aiIJNQIAQh2GfCITQoGU69wDVA0AGiATIBNCgJTr3AOAIhRCgJTr3AN+fSETIBSnCyELIAkgE6ciCTYCACACIAIgAiABIAkbIAEgCEYbIAEgAkF/akH/D3FHGyEJIAFBf2ohDCABIAhHDQALIA1BY2ohDSALRQ0ACyAJIAhBf2pB/w9xIghGBEAgB0GQBmogCUH+D2pB/w9xQQJ0aiIBIAEoAgAgB0GQBmogCUF/akH/D3EiAkECdGooAgByNgIACyAKQQlqIQogB0GQBmogCEECdGogCzYCAAwBCwsCQANAIAJBAWpB/w9xIQYgB0GQBmogAkF/akH/D3FBAnRqIQsDQEEJQQEgCkEtShshDAJAA0AgCCEJQQAhAQJAA0ACQCABIAlqQf8PcSIIIAJGDQAgB0GQBmogCEECdGooAgAiCCABQQJ0QcCkA2ooAgAiDkkNACAIIA5LDQIgAUEBaiIBQQRHDQELCyAKQSRHDQBCACETQQAhAUIAIRQDQCACIAEgCWpB/w9xIgZGBEAgAkEBakH/D3EiAkECdCAHakEANgKMBgsgB0GABmogEyAUQgBCgICAgOWat47AABBaIAdB8AVqIAdBkAZqIAZBAnRqKAIAEIQDIAdB4AVqIAcpA4AGIAcpA4gGIAcpA/AFIAcpA/gFEKYBIAcpA+gFIRQgBykD4AUhEyABQQFqIgFBBEcNAAsgB0HQBWogBRCwASAHQcAFaiATIBQgBykD0AUgBykD2AUQWiAHKQPIBSEUQgAhEyAHKQPABSEVIA1B8QBqIgYgBGsiBEEAIARBAEobIAMgBCADSCIIGyIBQfAATA0CDAULIAwgDWohDSACIQggAiAJRg0AC0GAlOvcAyAMdiEOQX8gDHRBf3MhD0EAIQEgCSEIA0AgB0GQBmogCUECdGoiECABIBAoAgAiECAMdmoiATYCACAIQQFqQf8PcSAIIAFFIAggCUZxIgEbIQggCkF3aiAKIAEbIQogDyAQcSAObCEBIAlBAWpB/w9xIgkgAkcNAAsgAUUNASAGIAhHBEAgB0GQBmogAkECdGogATYCACAGIQIMAwsgCyALKAIAQQFyNgIAIAYhCAwBCwsLIAdBkAVqRAAAAAAAAPA/QeEBIAFrEK8CEPwBIAdBsAVqIAcpA5AFIAcpA5gFIBUgFBDMByAHKQO4BSEXIAcpA7AFIRggB0GABWpEAAAAAAAA8D9B8QAgAWsQrwIQ/AEgB0GgBWogFSAUIAcpA4AFIAcpA4gFELYHIAdB8ARqIBUgFCAHKQOgBSITIAcpA6gFIhYQrgUgB0HgBGogGCAXIAcpA/AEIAcpA/gEEKYBIAcpA+gEIRQgBykD4AQhFQsCQCAJQQRqQf8PcSIDIAJGDQACQCAHQZAGaiADQQJ0aigCACIDQf/Jte4BTQRAIANFQQAgCUEFakH/D3EgAkYbDQEgB0HwA2ogBbdEAAAAAAAA0D+iEPwBIAdB4ANqIBMgFiAHKQPwAyAHKQP4AxCmASAHKQPoAyEWIAcpA+ADIRMMAQsgA0GAyrXuAUcEQCAHQdAEaiAFt0QAAAAAAADoP6IQ/AEgB0HABGogEyAWIAcpA9AEIAcpA9gEEKYBIAcpA8gEIRYgBykDwAQhEwwBCyAFtyEZIAIgCUEFakH/D3FGBEAgB0GQBGogGUQAAAAAAADgP6IQ/AEgB0GABGogEyAWIAcpA5AEIAcpA5gEEKYBIAcpA4gEIRYgBykDgAQhEwwBCyAHQbAEaiAZRAAAAAAAAOg/ohD8ASAHQaAEaiATIBYgBykDsAQgBykDuAQQpgEgBykDqAQhFiAHKQOgBCETCyABQe8ASg0AIAdB0ANqIBMgFkIAQoCAgICAgMD/PxC2ByAHKQPQAyAHKQPYA0IAQgAQzgINACAHQcADaiATIBZCAEKAgICAgIDA/z8QpgEgBykDyAMhFiAHKQPAAyETCyAHQbADaiAVIBQgEyAWEKYBIAdBoANqIAcpA7ADIAcpA7gDIBggFxCuBSAHKQOoAyEUIAcpA6ADIRUCQCAGQf////8HcUF+IBFrTA0AIAcgFEL///////////8AgzcDmAMgByAVNwOQAyAHQYADaiAVIBRCAEKAgICAgICA/z8QWiAHKQOQAyAHKQOYA0KAgICAgICAuMAAEL8HIQIgFCAHKQOIAyACQQBIIgMbIRQgFSAHKQOAAyADGyEVIAggAyABIARHcnEgEyAWQgBCABDOAkEAR3FFQQAgDSACQX9KaiINQe4AaiASTBsNAEHQwwRBxAA2AgALIAdB8AJqIBUgFCANEMsHIAcpA/ACIRQgBykD+AILIRMgACAUNwMAIAAgEzcDCCAHQZDGAGokAAuzDQIIfwd+IwBBsANrIgYkAAJ/IAEoAgQiByABKAJoSQRAIAEgB0EBajYCBCAHLQAADAELIAEQUQshBwJAAn8DQAJAIAdBMEcEQCAHQS5HDQQgASgCBCIHIAEoAmhPDQEgASAHQQFqNgIEIActAAAMAwsgASgCBCIHIAEoAmhJBEBBASEJIAEgB0EBajYCBCAHLQAAIQcFQQEhCSABEFEhBwsMAQsLIAEQUQshB0EBIQogB0EwRw0AA0AgEkJ/fCESAn8gASgCBCIHIAEoAmhJBEAgASAHQQFqNgIEIActAAAMAQsgARBRCyIHQTBGDQALQQEhCQtCgICAgICAwP8/IQ4DQAJAIAdBIHIhCwJAAkAgB0FQaiIMQQpJDQAgB0EuR0EAIAtBn39qQQVLGw0CIAdBLkcNACAKDQJBASEKIBAhEgwBCyALQal/aiAMIAdBOUobIQcCQCAQQgdXBEAgByAIQQR0aiEIDAELIBBCHFcEQCAGQTBqIAcQsAEgBkEgaiATIA5CAEKAgICAgIDA/T8QWiAGQRBqIAYpAyAiEyAGKQMoIg4gBikDMCAGKQM4EFogBiAPIBEgBikDECAGKQMYEKYBIAYpAwghESAGKQMAIQ8MAQsgDSAHRXINACAGQdAAaiATIA5CAEKAgICAgICA/z8QWiAGQUBrIA8gESAGKQNQIAYpA1gQpgEgBikDSCERQQEhDSAGKQNAIQ8LIBBCAXwhEEEBIQkLIAEoAgQiByABKAJoSQRAIAEgB0EBajYCBCAHLQAAIQcFIAEQUSEHCwwBCwsCfgJAAkAgCUUEQCABKAJoRQRAIAUNAwwCCyABIAEoAgQiAkF/ajYCBCAFRQ0BIAEgAkF+ajYCBCAKRQ0CIAEgAkF9ajYCBAwCCyAQQgdXBEAgECEOA0AgCEEEdCEIIA5CAXwiDkIIUg0ACwsCQCAHQV9xQdAARgRAIAEgBRDJByIOQoCAgICAgICAgH9SDQEgBQRAQgAhDiABKAJoRQ0CIAEgASgCBEF/ajYCBAwCC0IAIQ8gAUIAENYBQgAMBAtCACEOIAEoAmhFDQAgASABKAIEQX9qNgIECyAIRQRAIAZB8ABqIAS3RAAAAAAAAAAAohD8ASAGKQNwIQ8gBikDeAwDCyASIBAgChtCAoYgDnxCYHwiEEEAIANrrVUEQEHQwwRBxAA2AgAgBkGgAWogBBCwASAGQZABaiAGKQOgASAGKQOoAUJ/Qv///////7///wAQWiAGQYABaiAGKQOQASAGKQOYAUJ/Qv///////7///wAQWiAGKQOAASEPIAYpA4gBDAMLIBAgA0GefmqsWQRAIAhBf0oEQANAIAZBoANqIA8gEUIAQoCAgICAgMD/v38QpgEgDyARQoCAgICAgID/PxC/ByEBIAZBkANqIA8gESAPIAYpA6ADIAFBAEgiBRsgESAGKQOoAyAFGxCmASAQQn98IRAgBikDmAMhESAGKQOQAyEPIAhBAXQgAUF/SnIiCEF/Sg0ACwsCfiAQIAOsfUIgfCIOpyIBQQAgAUEAShsgAiAOIAKtUxsiAUHxAE4EQCAGQYADaiAEELABIAYpA4gDIRIgBikDgAMhE0IADAELIAZB4AJqRAAAAAAAAPA/QZABIAFrEK8CEPwBIAZB0AJqIAQQsAEgBkHwAmogBikD4AIgBikD6AIgBikD0AIiEyAGKQPYAiISEMwHIAYpA/gCIRQgBikD8AILIQ4gBkHAAmogCCAIQQFxRSAPIBFCAEIAEM4CQQBHIAFBIEhxcSIBahCEAyAGQbACaiATIBIgBikDwAIgBikDyAIQWiAGQZACaiAGKQOwAiAGKQO4AiAOIBQQpgEgBkGgAmpCACAPIAEbQgAgESABGyATIBIQWiAGQYACaiAGKQOgAiAGKQOoAiAGKQOQAiAGKQOYAhCmASAGQfABaiAGKQOAAiAGKQOIAiAOIBQQrgUgBikD8AEiDiAGKQP4ASISQgBCABDOAkUEQEHQwwRBxAA2AgALIAZB4AFqIA4gEiAQpxDLByAGKQPgASEPIAYpA+gBDAMLQdDDBEHEADYCACAGQdABaiAEELABIAZBwAFqIAYpA9ABIAYpA9gBQgBCgICAgICAwAAQWiAGQbABaiAGKQPAASAGKQPIAUIAQoCAgICAgMAAEFogBikDsAEhDyAGKQO4AQwCCyABQgAQ1gELIAZB4ABqIAS3RAAAAAAAAAAAohD8ASAGKQNgIQ8gBikDaAshECAAIA83AwAgACAQNwMIIAZBsANqJAALCwAgACABIAIQ1AsLSQEBfyMAQZABayIDJAAgA0EAQZABEE8iA0F/NgJMIAMgADYCLCADQfwGNgIgIAMgADYCVCADIAEgAhDOCyEAIANBkAFqJAAgAAtUAQJ/IAEgACgCVCIBIAFBACACQYACaiIDEJMEIgQgAWsgAyAEGyIDIAIgAyACSRsiAhA+GiAAIAEgA2oiAzYCVCAAIAM2AgggACABIAJqNgIEIAILKQAgASABKAIAQQ9qQXBxIgFBEGo2AgAgACABKQMAIAEpAwgQrwU5AwALjxcDEn8CfgF8IwBBsARrIgkkACAJQQA2AiwCQCABvSIYQn9XBEBBASEQQYCkAyETIAGaIgG9IRgMAQsgBEGAEHEEQEEBIRBBg6QDIRMMAQtBhqQDQYGkAyAEQQFxIhAbIRMgEEUhFAsCQCAYQoCAgICAgID4/wCDQoCAgICAgID4/wBRBEAgAEEgIAIgEEEDaiIMIARB//97cRCZASAAIBMgEBCCASAAQZukA0GfpAMgBUEgcSIDG0GTpANBl6QDIAMbIAEgAWIbQQMQggEMAQsgCUEQaiEPAkACfwJAIAEgCUEsahDRByIBIAGgIgFEAAAAAAAAAABiBEAgCSAJKAIsIgZBf2o2AiwgBUEgciIWQeEARw0BDAMLIAVBIHIiFkHhAEYNAiAJKAIsIQtBBiADIANBAEgbDAELIAkgBkFjaiILNgIsIAFEAAAAAAAAsEGiIQFBBiADIANBAEgbCyEKIAlBMGogCUHQAmogC0EASBsiDiEIA0AgCAJ/IAFEAAAAAAAA8EFjIAFEAAAAAAAAAABmcQRAIAGrDAELQQALIgM2AgAgCEEEaiEIIAEgA7ihRAAAAABlzc1BoiIBRAAAAAAAAAAAYg0ACwJAIAtBAUgEQCALIQMgCCEGIA4hBwwBCyAOIQcgCyEDA0AgA0EdIANBHUgbIQ0CQCAIQXxqIgYgB0kNACANrSEZQgAhGANAIAYgGEL/////D4MgBjUCACAZhnwiGCAYQoCU69wDgCIYQoCU69wDfn0+AgAgBkF8aiIGIAdPDQALIBinIgNFDQAgB0F8aiIHIAM2AgALA0AgCCIGIAdLBEAgBkF8aiIIKAIARQ0BCwsgCSAJKAIsIA1rIgM2AiwgBiEIIANBAEoNAAsLIANBf0wEQCAKQRlqQQltQQFqIREgFkHmAEYhFwNAQQlBACADayADQXdIGyEMAkAgByAGTwRAIAcgB0EEaiAHKAIAGyEHDAELQYCU69wDIAx2IRVBfyAMdEF/cyESQQAhAyAHIQgDQCAIIAMgCCgCACINIAx2ajYCACANIBJxIBVsIQMgCEEEaiIIIAZJDQALIAcgB0EEaiAHKAIAGyEHIANFDQAgBiADNgIAIAZBBGohBgsgCSAJKAIsIAxqIgM2AiwgDiAHIBcbIgggEUECdGogBiAGIAhrQQJ1IBFKGyEGIANBAEgNAAsLQQAhCAJAIAcgBk8NACAOIAdrQQJ1QQlsIQhBCiEDIAcoAgAiDUEKSQ0AA0AgCEEBaiEIIA0gA0EKbCIDTw0ACwsgCkEAIAggFkHmAEYbayAWQecARiAKQQBHcWsiAyAGIA5rQQJ1QQlsQXdqSARAIANBgMgAaiISQQltIg1BAnQgCUEwakEEciAJQdQCaiALQQBIG2pBgGBqIQxBCiEDIBIgDUEJbGsiDUEHTARAA0AgA0EKbCEDIA1BAWoiDUEIRw0ACwsCQEEAIAYgDEEEaiIRRiAMKAIAIhIgEiADbiINIANsayIVGw0ARAAAAAAAAOA/RAAAAAAAAPA/RAAAAAAAAPg/IBUgA0EBdiILRhtEAAAAAAAA+D8gBiARRhsgFSALSRshGkQBAAAAAABAQ0QAAAAAAABAQyANQQFxGyEBAkAgFA0AIBMtAABBLUcNACAamiEaIAGaIQELIAwgEiAVayILNgIAIAEgGqAgAWENACAMIAMgC2oiAzYCACADQYCU69wDTwRAA0AgDEEANgIAIAxBfGoiDCAHSQRAIAdBfGoiB0EANgIACyAMIAwoAgBBAWoiAzYCACADQf+T69wDSw0ACwsgDiAHa0ECdUEJbCEIQQohAyAHKAIAIgtBCkkNAANAIAhBAWohCCALIANBCmwiA08NAAsLIAxBBGoiAyAGIAYgA0sbIQYLAn8DQEEAIAYiCyAHTQ0BGiALQXxqIgYoAgBFDQALQQELIRcCQCAWQecARwRAIARBCHEhFAwBCyAIQX9zQX8gCkEBIAobIgYgCEogCEF7SnEiAxsgBmohCkF/QX4gAxsgBWohBSAEQQhxIhQNAEEJIQYCQCAXRQ0AIAtBfGooAgAiA0UNAEEKIQ1BACEGIANBCnANAANAIAZBAWohBiADIA1BCmwiDXBFDQALCyALIA5rQQJ1QQlsQXdqIQMgBUFfcUHGAEYEQEEAIRQgCiADIAZrIgNBACADQQBKGyIDIAogA0gbIQoMAQtBACEUIAogAyAIaiAGayIDQQAgA0EAShsiAyAKIANIGyEKCyAKIBRyIhVBAEchEiAAQSAgAgJ/IAhBACAIQQBKGyAFQV9xIg1BxgBGDQAaIA8gCCAIQR91IgNqIANzrSAPEIcDIgZrQQFMBEADQCAGQX9qIgZBMDoAACAPIAZrQQJIDQALCyAGQX5qIhEgBToAACAGQX9qQS1BKyAIQQBIGzoAACAPIBFrCyAKIBBqIBJqakEBaiIMIAQQmQEgACATIBAQggEgAEEwIAIgDCAEQYCABHMQmQECQAJAAkAgDUHGAEYEQCAJQRBqQQhyIQMgCUEQakEJciEIIA4gByAHIA5LGyIFIQcDQCAHNQIAIAgQhwMhBgJAIAUgB0cEQCAGIAlBEGpNDQEDQCAGQX9qIgZBMDoAACAGIAlBEGpLDQALDAELIAYgCEcNACAJQTA6ABggAyEGCyAAIAYgCCAGaxCCASAHQQRqIgcgDk0NAAsgFQRAIABBo6QDQQEQggELIApBAUggByALT3INAQNAIAc1AgAgCBCHAyIGIAlBEGpLBEADQCAGQX9qIgZBMDoAACAGIAlBEGpLDQALCyAAIAYgCkEJIApBCUgbEIIBIApBd2ohBiAHQQRqIgcgC08NAyAKQQlKIQMgBiEKIAMNAAsMAgsCQCAKQQBIDQAgCyAHQQRqIBcbIQUgCUEQakEIciEDIAlBEGpBCXIhCyAHIQgDQCALIAg1AgAgCxCHAyIGRgRAIAlBMDoAGCADIQYLAkAgByAIRwRAIAYgCUEQak0NAQNAIAZBf2oiBkEwOgAAIAYgCUEQaksNAAsMAQsgACAGQQEQggEgBkEBaiEGIBRFQQAgCkEBSBsNACAAQaOkA0EBEIIBCyAAIAYgCyAGayIGIAogCiAGShsQggEgCiAGayEKIAhBBGoiCCAFTw0BIApBf0oNAAsLIABBMCAKQRJqQRJBABCZASAAIBEgDyARaxCCAQwCCyAKIQYLIABBMCAGQQlqQQlBABCZAQsMAQsgE0EJaiATIAVBIHEiCxshCgJAIANBC0sNAEEMIANrIgZFDQBEAAAAAAAAIEAhGgNAIBpEAAAAAAAAMECiIRogBkF/aiIGDQALIAotAABBLUYEQCAaIAGaIBqhoJohAQwBCyABIBqgIBqhIQELIA8gCSgCLCIGIAZBH3UiBmogBnOtIA8QhwMiBkYEQCAJQTA6AA8gCUEPaiEGCyAQQQJyIQ4gCSgCLCEIIAZBfmoiDSAFQQ9qOgAAIAZBf2pBLUErIAhBAEgbOgAAIARBCHEhCCAJQRBqIQcDQCAHIgUCfyABmUQAAAAAAADgQWMEQCABqgwBC0GAgICAeAsiBkHwowNqLQAAIAtyOgAAIAVBAWoiByAJQRBqa0EBRyAIIANBAEpyRUEAIAEgBrehRAAAAAAAADBAoiIBRAAAAAAAAAAAYRtyRQRAIAVBLjoAASAFQQJqIQcLIAFEAAAAAAAAAABiDQALIABBICACIA4gDyAJQRBqayANayAHaiADIA9qIA1rQQJqIANFIAcgCWtBbmogA05yGyIDaiIMIAQQmQEgACAKIA4QggEgAEEwIAIgDCAEQYCABHMQmQEgACAJQRBqIAcgCUEQamsiBRCCASAAQTAgAyAFIA8gDWsiA2prQQBBABCZASAAIA0gAxCCAQsgAEEgIAIgDCAEQYDAAHMQmQEgCUGwBGokACACIAwgDCACSBsLLQAgAFBFBEADQCABQX9qIgEgAKdBB3FBMHI6AAAgAEIDiCIAQgBSDQALCyABCzUAIABQRQRAA0AgAUF/aiIBIACnQQ9xQfCjA2otAAAgAnI6AAAgAEIEiCIAQgBSDQALCyABCw0AIABBgCpqQQAQvQELhwEBA38jAEEQayICJAACQAJAQYCgAyABLAAAENACRQRAQdDDBEEcNgIADAELIAEQywshBCACQbYDNgIAIAAgBEGAgAJyIAIQHyIAQYFgTwRAQdDDBEEAIABrNgIAQX8hAAsgAEEASA0BIAAgARDECyIDDQEgABASGgtBACEDCyACQRBqJAAgAwvbAgEEfyABvEH/////B3FBgICA/AdNQQAgALxB/////wdxQYGAgPwHSRtFBEAgACABkg8LIAG8IgJBgICA/ANGBEAgABDVBw8LIAJBHnZBAnEiBSAAvCIDQR92ciEEAkACQAJAIANB/////wdxIgNFBEACQCAEQQJrDgICAAMLQ9sPScAPCyACQf////8HcSICQYCAgPwHRwRAIAJFBEBD2w/JPyAAmA8LIANBgICA/AdHQQAgAkGAgIDoAGogA08bRQRAQ9sPyT8gAJgPCwJ9IANBgICA6ABqIAJJBEBDAAAAACAFDQEaCyAAIAGVixDVBwshAAJAAkACQCAEDgMFAAECCyAAjA8LQ9sPSUAgAEMuvbszkpMPCyAAQy69uzOSQ9sPScCSDwsgA0GAgID8B0YNAiAEQQJ0QfCfA2oqAgAPC0PbD0lAIQALIAAPCyAEQQJ0QeCfA2oqAgALmgEAAkAgAUGAAU4EQCAAQwAAAH+UIQAgAUH/AUgEQCABQYF/aiEBDAILIABDAAAAf5QhACABQf0CIAFB/QJIG0GCfmohAQwBCyABQYF/Sg0AIABDAACAAJQhACABQYN+SgRAIAFB/gBqIQEMAQsgAEMAAIAAlCEAIAFBhn0gAUGGfUobQfwBaiEBCyAAIAFBF3RBgICA/ANqvpQLuw0CEH8CfCMAQbAEayIFJAAgAiACQX1qQRhtIgNBACADQQBKGyIMQWhsaiEHQaCJAygCACIIQQBOBEAgCEEBaiEDIAwhAgNAIAVBwAJqIARBA3RqIAJBAEgEfEQAAAAAAAAAAAUgAkECdEGwiQNqKAIAtws5AwAgAkEBaiECIARBAWoiBCADRw0ACwsgB0FoaiEJQQAhAyAIQQAgCEEAShshBgNAIAMhBEEAIQJEAAAAAAAAAAAhEwNAIBMgACACQQN0aisDACAFQcACaiAEIAJrQQN0aisDAKKgIRMgAkEBaiICQQFHDQALIAUgA0EDdGogEzkDACADIAZGIQIgA0EBaiEDIAJFDQALQS8gB2shD0EwIAdrIQ0gB0FnaiEQIAghAwJAA0AgBSADQQN0aisDACETQQAhAiADIQQgA0EBSCIGRQRAA0AgBUHgA2ogAkECdGoCfyATAn8gE0QAAAAAAABwPqIiE5lEAAAAAAAA4EFjBEAgE6oMAQtBgICAgHgLtyITRAAAAAAAAHDBoqAiFJlEAAAAAAAA4EFjBEAgFKoMAQtBgICAgHgLNgIAIAUgBEF/aiIEQQN0aisDACAToCETIAJBAWoiAiADRw0ACwsCfyATIAkQrwIiEyATRAAAAAAAAMA/opxEAAAAAAAAIMCioCITmUQAAAAAAADgQWMEQCATqgwBC0GAgICAeAshCiATIAq3oSETAkACQAJAAn8gCUEBSCIRRQRAIANBAnQgBWoiAiACKALcAyICIAIgDXUiAiANdGsiBDYC3AMgAiAKaiEKIAQgD3UMAQsgCQ0BIANBAnQgBWooAtwDQRd1CyILQQFIDQIMAQtBAiELIBNEAAAAAAAA4D9mQQFzRQ0AQQAhCwwBC0EAIQJBACEEIAZFBEADQCAFQeADaiACQQJ0aiISKAIAIQ5B////ByEGAn8CQCAEDQBBgICACCEGIA4NAEEADAELIBIgBiAOazYCAEEBCyEEIAJBAWoiAiADRw0ACwsCQCARDQACQAJAIBAOAgABAgsgA0ECdCAFaiICIAIoAtwDQf///wNxNgLcAwwBCyADQQJ0IAVqIgIgAigC3ANB////AXE2AtwDCyAKQQFqIQogC0ECRw0ARAAAAAAAAPA/IBOhIRNBAiELIARFDQAgE0QAAAAAAADwPyAJEK8CoSETCyATRAAAAAAAAAAAYQRAQQAhBCADIQICQCADIAhMDQADQCAFQeADaiACQX9qIgJBAnRqKAIAIARyIQQgAiAISg0ACyAERQ0AIAkhBwNAIAdBaGohByAFQeADaiADQX9qIgNBAnRqKAIARQ0ACwwDC0EBIQIDQCACIgRBAWohAiAFQeADaiAIIARrQQJ0aigCAEUNAAsgAyAEaiEEA0AgBUHAAmogA0EBaiIGQQN0aiADQQFqIgMgDGpBAnRBsIkDaigCALc5AwBBACECRAAAAAAAAAAAIRMDQCATIAAgAkEDdGorAwAgBUHAAmogBiACa0EDdGorAwCioCETIAJBAWoiAkEBRw0ACyAFIANBA3RqIBM5AwAgAyAESA0ACyAEIQMMAQsLAkAgE0EAIAlrEK8CIhNEAAAAAAAAcEFmQQFzRQRAIAVB4ANqIANBAnRqAn8gEwJ/IBNEAAAAAAAAcD6iIhOZRAAAAAAAAOBBYwRAIBOqDAELQYCAgIB4CyICt0QAAAAAAABwwaKgIhOZRAAAAAAAAOBBYwRAIBOqDAELQYCAgIB4CzYCACADQQFqIQMMAQsCfyATmUQAAAAAAADgQWMEQCATqgwBC0GAgICAeAshAiAJIQcLIAVB4ANqIANBAnRqIAI2AgALRAAAAAAAAPA/IAcQrwIhEwJAIANBf0wNACADIQIDQCAFIAJBA3RqIBMgBUHgA2ogAkECdGooAgC3ojkDACATRAAAAAAAAHA+oiETIAJBAEohACACQX9qIQIgAA0AC0EAIQYgA0EASA0AIAhBACAIQQBKGyEAIAMhBANAIAAgBiAAIAZJGyEHIAMgBGshCUEAIQJEAAAAAAAAAAAhEwNAIBMgAkEDdEGAnwNqKwMAIAUgAiAEakEDdGorAwCioCETIAIgB0chCCACQQFqIQIgCA0ACyAFQaABaiAJQQN0aiATOQMAIARBf2ohBCADIAZHIQIgBkEBaiEGIAINAAsLRAAAAAAAAAAAIRMgA0EATgRAA0AgEyAFQaABaiADQQN0aisDAKAhEyADQQBKIQAgA0F/aiEDIAANAAsLIAEgE5ogEyALGzkDACAFQbAEaiQAIApBB3EL5AsCBn8IfUMAAIA/IQkCQAJAAkAgALwiBEGAgID8A0YNACABvCIFQf////8HcSICRQ0AIARB/////wdxIgNBgICA/AdNQQAgAkGBgID8B0kbRQRAIAAgAZIPCwJ/AkAgBEF/Sg0AQQIgAkH////bBEsNARogAkGAgID8A0kNAEEAIAJBlgEgAkEXdmsiBnYiByAGdCACRw0BGkECIAdBAXFrDAELQQALIQYCQCACQYCAgPwDRwRAIAJBgICA/AdHDQEgA0GAgID8A0YNAiADQYGAgPwDTwRAIAFDAAAAACAFQX9KGw8LQwAAAAAgAYwgBUF/ShsPCyAAQwAAgD8gAJUgBUF/ShsPCyAFQYCAgIAERgRAIAAgAJQPCyAFQYCAgPgDRyAEQQBIckUEQCAAkQ8LIACLIQggBEH/////A3FBgICA/ANHQQAgAxtFBEBDAACAPyAIlSAIIAVBAEgbIQkgBEF/Sg0BIAYgA0GAgICEfGpyRQRAIAkgCZMiACAAlQ8LIAmMIAkgBkEBRhsPCwJAIARBf0oNAAJAAkAgBg4CAAECCyAAIACTIgAgAJUPC0MAAIC/IQkLAn0gAkGBgIDoBE8EQCADQff///sDTQRAIAlDyvJJcZRDyvJJcZQgCUNgQqINlENgQqINlCAFQQBIGw8LIANBiICA/ANPBEAgCUPK8klxlEPK8klxlCAJQ2BCog2UQ2BCog2UIAVBAEobDwsgCEMAAIC/kiIAQwCquD+UIgggAENwpew2lCAAIACUQwAAAD8gACAAQwAAgL6UQ6uqqj6SlJOUQzuquL+UkiILkrxBgGBxviIAIAiTDAELIAhDAACAS5S8IAMgA0GAgIAESSIDGyIEQf///wNxIgZBgICA/ANyIQIgBEEXdUHpfkGBfyADG2ohA0EAIQQCQCAGQfKI8wBJDQAgBkHX5/YCSQRAQQEhBAwBCyACQYCAgHxqIQIgA0EBaiEDCyAEQQJ0IgZBkIkDaioCACINIAK+IgsgBkGAiQNqKgIAIgqTIgxDAACAPyAKIAuSlSIOlCIIvEGAYHG+IgAgACAAlCIPQwAAQECSIAggAJIgDiAMIAAgAkEBdUGA4P//fXFBgICAgAJyIARBFXRqQYCAgAJqviIMlJMgACALIAwgCpOTlJOUIguUIAggCJQiACAAlCAAIAAgACAAIABDQvFTPpRDVTJsPpKUQwWjiz6SlEOrqqo+kpRDt23bPpKUQ5qZGT+SlJIiCpK8QYBgcb4iAJQiDCALIACUIAggCiAAQwAAQMCSIA+Tk5SSIgiSvEGAYHG+IgBDAEB2P5QiCiAGQYiJA2oqAgAgCCAAIAyTk0NPOHY/lCAAQ8Yj9riUkpIiC5KSIAOyIgiSvEGAYHG+IgAgCJMgDZMgCpMLIQogACAFQYBgcb4iDZQiCCALIAqTIAGUIAEgDZMgAJSSIgCSIgG8IgJBgYCAmARODQFBgICAmAQhBAJAAkAgAkGAgICYBEYEQCAAQzyqODOSIAEgCJNeQQFzDQEMBAsgACABIAiTX0EBcyACQYCA2Jh8R3JFIAJB/////wdxIgRBgYDYmARPcg0EQQAhAyAEQYGAgPgDSQ0BC0EAQYCAgAQgBEEXdkGCf2p2IAJqIgVB////A3FBgICABHJBlgEgBUEXdkH/AXEiBGt2IgNrIAMgAkEASBshAyAAIAhBgICAfCAEQYF/anUgBXG+kyIIkrwhAgsgCQJ9IAJBgIB+cb4iAUMAcjE/lCIJIAFDjL6/NZQgACABIAiTk0MYcjE/lJIiCJIiACAAIAAgACAAlCIBIAEgASABIAFDTLsxM5RDDurdtZKUQ1WzijiSlENhCza7kpRDq6oqPpKUkyIBlCABQwAAAMCSlSAIIAAgCZOTIgEgACABlJKTk0MAAIA/kiIAvCADQRd0aiICQf///wNMBEAgACADENwLDAELIAK+C5QhCQsgCQ8LIAlDyvJJcZRDyvJJcZQPCyAJQ2BCog2UQ2BCog2UC88PAwh/An4IfEQAAAAAAADwPyEMAkACQAJAIAG9IgpCIIinIgNB/////wdxIgIgCqciBnJFDQAgAL0iC0IgiKchBSALpyIJRUEAIAVBgIDA/wNGGw0AIAVB/////wdxIgRBgIDA/wdLIARBgIDA/wdGIAlBAEdxciACQYCAwP8HS3JFQQAgBkUgAkGAgMD/B0dyG0UEQCAAIAGgDwsCQAJAAn8CQCAFQX9KDQBBAiACQf///5kESw0BGiACQYCAwP8DSQ0AIAJBFHYhByACQYCAgIoETwRAQQAgBkGzCCAHayIIdiIHIAh0IAZHDQIaQQIgB0EBcWsMAgsgBg0DIAJBkwggB2siBnYiByAGdCACRw0CQQIgB0EBcWshCAwCC0EACyEIIAYNAQsgAkGAgMD/B0YEQCAEQYCAwIB8aiAJckUNAiAEQYCAwP8DTwRAIAFEAAAAAAAAAAAgA0F/ShsPC0QAAAAAAAAAACABmiADQX9KGw8LIAJBgIDA/wNGBEAgA0F/SgRAIAAPC0QAAAAAAADwPyAAow8LIANBgICAgARGBEAgACAAog8LIANBgICA/wNHIAVBAEhyDQAgAJ8PCyAAmSEMIAVB/////wNxQYCAwP8DR0EAIAQbIAlyRQRARAAAAAAAAPA/IAyjIAwgA0EASBshDCAFQX9KDQEgCCAEQYCAwIB8anJFBEAgDCAMoSIAIACjDwsgDJogDCAIQQFGGw8LRAAAAAAAAPA/IQ0CQCAFQX9KDQACQAJAIAgOAgABAgsgACAAoSIAIACjDwtEAAAAAAAA8L8hDQsCfCACQYGAgI8ETwRAIAJBgYDAnwRPBEAgBEH//7//A00EQEQAAAAAAADwf0QAAAAAAAAAACADQQBIGw8LRAAAAAAAAPB/RAAAAAAAAAAAIANBAEobDwsgBEH+/7//A00EQCANRJx1AIg85Dd+okScdQCIPOQ3fqIgDURZ8/jCH26lAaJEWfP4wh9upQGiIANBAEgbDwsgBEGBgMD/A08EQCANRJx1AIg85Dd+okScdQCIPOQ3fqIgDURZ8/jCH26lAaJEWfP4wh9upQGiIANBAEobDwsgDEQAAAAAAADwv6AiAEQAAABgRxX3P6IiDCAARETfXfgLrlQ+oiAAIACiRAAAAAAAAOA/IAAgAEQAAAAAAADQv6JEVVVVVVVV1T+goqGiRP6CK2VHFfe/oqAiD6C9QoCAgIBwg78iACAMoQwBCyAMRAAAAAAAAEBDoiIAIAwgBEGAgMAASSICGyEMIAC9QiCIpyAEIAIbIgRB//8/cSIFQYCAwP8DciEDIARBFHVBzHdBgXggAhtqIQRBACECAkAgBUGPsQ5JDQAgBUH67C5JBEBBASECDAELIANBgIBAaiEDIARBAWohBAsgAkEDdCIFQfCIA2orAwAiESAMvUL/////D4MgA61CIIaEvyIPIAVB0IgDaisDACIOoSIQRAAAAAAAAPA/IA4gD6CjIhKiIgy9QoCAgIBwg78iACAAIACiIhNEAAAAAAAACECgIAwgAKAgEiAQIAAgA0EBdUGAgICAAnIgAkESdGpBgIAgaq1CIIa/IhCioSAAIA8gECAOoaGioaIiD6IgDCAMoiIAIACiIAAgACAAIAAgAETvTkVKKH7KP6JEZdvJk0qGzT+gokQBQR2pYHTRP6CiRE0mj1FVVdU/oKJE/6tv27Zt2z+gokQDMzMzMzPjP6CioCIOoL1CgICAgHCDvyIAoiIQIA8gAKIgDCAOIABEAAAAAAAACMCgIBOhoaKgIgygvUKAgICAcIO/IgBEAAAA4AnH7j+iIg4gBUHgiANqKwMAIAwgACAQoaFE/QM63AnH7j+iIABE9QFbFOAvPr6ioKAiD6CgIAS3IgygvUKAgICAcIO/IgAgDKEgEaEgDqELIQ4gACAKQoCAgIBwg78iEaIiDCAPIA6hIAGiIAEgEaEgAKKgIgCgIgG9IgqnIQICQCAKQiCIpyIDQYCAwIQETgRAIANBgIDA+3tqIAJyDQMgAET+gitlRxWXPKAgASAMoWRBAXMNAQwDCyADQYD4//8HcUGAmMOEBEkNACADQYDovPsDaiACcg0DIAAgASAMoWVBAXMNAAwDC0EAIQIgDQJ8IANB/////wdxIgRBgYCA/wNPBH5BAEGAgMAAIARBFHZBgnhqdiADaiIEQf//P3FBgIDAAHJBkwggBEEUdkH/D3EiBWt2IgJrIAIgA0EASBshAiAAIAxBgIBAIAVBgXhqdSAEca1CIIa/oSIMoL0FIAoLQoCAgIBwg78iAUQAAAAAQy7mP6IiDSAAIAEgDKGhRO85+v5CLuY/oiABRDlsqAxhXCC+oqAiDKAiACAAIAAgACAAoiIBIAEgASABIAFE0KS+cmk3Zj6iRPFr0sVBvbu+oKJELN4lr2pWET+gokSTvb4WbMFmv6CiRD5VVVVVVcU/oKKhIgGiIAFEAAAAAAAAAMCgoyAMIAAgDaGhIgEgACABoqChoUQAAAAAAADwP6AiAL0iCkIgiKcgAkEUdGoiA0H//z9MBEAgACACEK8CDAELIApC/////w+DIAOtQiCGhL8LoiEMCyAMDwsgDUScdQCIPOQ3fqJEnHUAiDzkN36iDwsgDURZ8/jCH26lAaJEWfP4wh9upQGiC/ABAgJ/AX0gALwiAkH/////B3EiAUGAgID8A08EQCABQYCAgPwDRgRAQwAAAABD2g9JQCACQX9KGw8LQwAAAAAgACAAk5UPCwJ9IAFB////9wNNBEBD2g/JPyABQYGAgJQDSQ0BGkNoIaIzIAAgAJQQtAUgAJSTIACTQ9oPyT+SDwsgAkF/TARAQ9oPyT8gAEMAAIA/kkMAAAA/lCIAkSIDIAMgABC0BZRDaCGis5KSkyIAIACSDwtDAACAPyAAk0MAAAA/lCIAkSIDIAAQtAWUIAAgA7xBgGBxviIAIACUkyADIACSlZIgAJIiACAAkgsLJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDCEAEN4HIAFBEGokACAACyoBAX8jAEEQayIAJAAgAEHuhAM2AgxB9PICQQcgACgCDBAGIABBEGokAAsqAQF/IwBBEGsiACQAIABBz4QDNgIMQZDyAkEGIAAoAgwQBiAAQRBqJAALKgEBfyMAQRBrIgAkACAAQeGCAzYCDEHAiANBBSAAKAIMEAYgAEEQaiQACyoBAX8jAEEQayIAJAAgAEHDggM2AgxBmIgDQQQgACgCDBAGIABBEGokAAvXCQMHfwF+AX0jAEEgayIFJABBoLYDKAIAIQACQBCLAwRAIABBADYC9DUMAQsgACgC9DUhAwJAAkAgACgC+DUEQCADBEAgAEH0NWohBAwDCyAAIAAqAoQ2IAAqAhhDAAAgwZSSQwAAAAAQMSIIOAKENgJAIAhDAAAAAF9BAXMNACAAKgKgOEMAAAAAX0EBcw0AIABBADYC+DULIABB9DVqIQQMAQsgAEH0NWohBCADDQELQQNBARCYAiECIAQoAgANACAALQD4AUUNAEEAEGZFDQAgAC0ACEEBcSEBCwJAQQAgAkUgARsNACAAKAK0NSICRQRAIAAoAvgyQX9qQYGAgIB4QX8Q+QQiAkUNAQsgACACNgL0NSAAIAI2Avg1IABCADcDgDYgACABQQFzOgCINiAAQQNBBCABGzYC3DULIAAgACoCGCAAKgKANpIiCDgCgDYCQAJAIAAoAvQ1RQ0AIAAoAtw1IgNBBEYEQCAAIAAqAoQ2IAhDzcxMvpJDzcxMPZUQShAxOAKENkEMQQQQmAJBDUEEEJgCayIBBEAgARDkBiAAQYCAgPwDNgKENgtBAxCGAUUEQCAAIAAtAIg2IAAqAoQ2QwAAgD9dcSIDOgCINgJ/IAMEQCAAKAK0NQRAQQEhAkEADAILQQAhAkEAIAMNARoLQQAhAiAEKAIACyEBIARBADYCAAwDCyAEKAIARQ0BIAAoAtw1IQMLQQAhAkEAIQEgA0EDRw0BIAAgACoChDYgACoCgDZDzcxMvpJDzcxMPZUQShAxOAKENkEAEGYEQEEBQX8gAC0A+QEbEOQGCyAALQD4AQ0BIAQoAgAhAQwBC0EAIQJBACEBC0EQQQEQmAIEQCAAQQE6AIg2CwJAIAAoAtAzBEAgAC0A3TNFDQELIAAtAIg2RQ0AQRBBAhCYAkUNACACIABB4AFqEIMBIABB/AZqEIMBc0EBc3IhAgsCQCAEKAIAIgNFDQAgAy0ACEEEcQ0AIAVBGGoQNCEGAn0CQAJAIAAoAtw1IgNBA0YEfyAALQD5AQ0BIAVBEGpBAUEAQwAAAABDAAAAABCNASAFIAUpAxA3AxggACgC3DUFIAMLQQRGDQELIAUqAhgMAQsgBUEQakEEQQBDAAAAAEMAAAAAEI0BIAUgBSkDECIHNwMYIAenvgtDAAAAAFsEQCAGKgIEQwAAAABbDQELIAAoAvQ1KAL8BSEDIAVBCGogBiAAKgIYQwAASESUIAAqAqQBIAAqAqgBEECUEEwQQSAFQRBqIANBDGogBUEIahAvIAMgBUEQakEBENkCIABBAToAlzYgACgC9DUQjAMLIAEEQAJAIAAoArQ1IgMEQCABIAMoAvwFRg0BCxBvIABBgAI7AZY2IAEQigQiAUEAEKwEIAEQbiABKAKMBkUEQCABQQAQiQQLIAEoArgCQQJHDQAgAEEBNgKMNgsgBEEANgIACyACRQ0AIAAoArQ1IgJFDQAgAiEBA0ACQCABIgQoAvgFIgFFDQAgBC0AuAJBAnENACAEKAIIQYCAgKgBcUGAgIAIRg0BCwsgAiAERwRAIAQQbiAEIAI2AogGIAAoArQ1IQILIABBgAI7AZY2QQAhBCACLQC4AkECcQR/IAAoAow2QQFzBSAECxDSBwsgBUEgaiQACyoBAX8jAEEQayIAJAAgAEHPgAM2AgxB8McCQQAgACgCDBAGIABBEGokAAsqAQF/IwBBEGsiACQAIABB4P8CNgIMQYixAyAAKAIMQQgQEyAAQRBqJAALKgEBfyMAQRBrIgAkACAAQdr/AjYCDEH8sAMgACgCDEEEEBMgAEEQaiQACy4BAX8jAEEQayIAJAAgAEHM/wI2AgxB8LADIAAoAgxBBEEAQX8QByAAQRBqJAALNgEBfyMAQRBrIgAkACAAQcf/AjYCDEHksAMgACgCDEEEQYCAgIB4Qf////8HEAcgAEEQaiQACy4BAX8jAEEQayIAJAAgAEG6/wI2AgxB2LADIAAoAgxBBEEAQX8QByAAQRBqJAALNgEBfyMAQRBrIgAkACAAQbb/AjYCDEHMsAMgACgCDEEEQYCAgIB4Qf////8HEAcgAEEQaiQACzABAX8jAEEQayIAJAAgAEGn/wI2AgxBwLADIAAoAgxBAkEAQf//AxAHIABBEGokAAsyAQF/IwBBEGsiACQAIABBof8CNgIMQbSwAyAAKAIMQQJBgIB+Qf//ARAHIABBEGokAAsvAQF/IwBBEGsiACQAIABBk/8CNgIMQZywAyAAKAIMQQFBAEH/ARAHIABBEGokAAtDAQF/AkAgAEUNACAAIQEDQCABKAIIQYCAgKgBcUGAgIAIRgRAIAEoAvgFIgENAQwCCwsgACABRg0AIAEgADYCiAYLCzABAX8jAEEQayIAJAAgAEGH/wI2AgxBqLADIAAoAgxBAUGAf0H/ABAHIABBEGokAAswAQF/IwBBEGsiACQAIABBgv8CNgIMQZCwAyAAKAIMQQFBgH9B/wAQByAAQRBqJAALKgEBfyMAQRBrIgEkACABIAA2AgwgASgCDBC1BRC5CyEAIAFBEGokACAAC2QAQbX3AUEPEOcBQbS/AkHQvwJB+L8CQQBBzL0CQRFBiMACQQBBiMACQQBBvvcBQYrAAkESEAUQkBQQhhQQgRQQ+BMQ9RMQ6RMQ5RMQmxMQkhMQkBMQhRMQ7xIQ2BIQohIQkRILKAEBfyMAQRBrIgIkACACIAEQSzYCDCAAIAJBDGoQ3wcaIAJBEGokAAtNAQJ/IwBBEGsiASQAIAEgADYCDCABQQhqQfDCBCgCACIAQbABaiABIAFBDGoQ3wciAiAAQbQBahDhByABQQhqECsgAhArIAFBEGokAAs6AQF/IwBBIGsiBCQAIARBCGogAiADENwFIQIgACABKAIAQQJByP4CIAJBrAYRBwAQWBogBEEgaiQAC1kBAn8jAEEQayIBJAAgASAANgIMIAFBCGpB8MIEKAIAIgBBrAFqIAEgAUEMahDPBSICIABBtAFqEOEHIAFBCGoQ4AchACABQQhqECsgAhArIAFBEGokACAACwcAIAAQ9wsLBwAgABD5CwtMAQF/QfDCBCgCACIDQawBaiAAEGwgA0GwAWogARBsIANBtAFqIAIQbAJAIAAQUEUEQCABEFBFDQELQQBBABChCA8LQbgGQbkGEKEICyYBAX8jAEEQayIBJAAgASAAEJIBIAEQLhCTAyABEDUgAUEQaiQACzUBAX8jAEEQayIEJAAgBEEIaiABIAIQgwsgACAEQQhqIAQgAxBbIgAQfSAAECsgBEEQaiQACzEBAX8jAEEQayICJAAgAkEIahCECyAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALOQEBfyMAQRBrIgIkACACQaC2AygCACkD4AE3AgggACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQAC/kDAgV/An0jAEFAaiICJAACQAJAQaC2AygCACIAKALINiIBDQAgACgCmDcNACAAKAK4NUUNASAAQYACOwGWNgwBCyAAQcg2aiAAQZg3aiIDIAEbIQECQCAALQC0NkEgcUUNACAAKALwNiIERQ0AIAEgAEHwNmogBCAAKAK4NUYbIQELAkACQCABIANGDQAgAygCAEUNASAAQaA3aigCACgC+AUgACgCtDVHDQEgAEGkN2oqAgAiBSABKgIMIgZdDQAgBSAGXA0BIABBqDdqKgIAIAEqAhBdQQFzDQELIAMhAQsCQCAAKAKMNg0AIAJBEGogAUEYaiIEIAEoAghBDGoQLyACQShqIAFBIGogASgCCEEMahAvIAJBMGogAkEQaiACQShqEDwhAyABKAIIIAMQ5QYgAkEoaiABKAIIQQAQrQcgAkEgaiABKAIIQdAAaiACQShqEDggBCACQSBqELYKIAEoAggiBC0AC0EBcUUNACAEKAL4BSEEIAJBCGogAyACQSBqEC8gAiADQQhqIAJBIGoQLyAEIAJBEGogAkEIaiACEDwQ5QYLEG8gACABKAIINgK0NSABKAIAIgMgACgCuDVHBEAgACADNgLQNSAAIAEoAgQ2AtQ1CyADIAAoAow2IAFBGGoQvgQgAEEAOgCwNgsgAkFAayQACyoBAX8jAEEQayIBJAAgAUEIaiAAKAIMEDIgACABKQMINwIEIAFBEGokAAsxACAAQfj9AjYCACAAQQRqEDQaIAAgATYCDCABEFBFBEAgACAAKAIAKAIAEQEACyAACzEBAX8jAEEQayIBJABBACABIAAQgwwiAEEEaiAAKAIMEFAbEIMBIQAgAUEQaiQAIAALMwEBfyMAQRBrIgMkACADQQhqIAAQMiADIAEQMiADQQhqIAMgAhCVAyEAIANBEGokACAAC1YBAX8jAEEwayIGJAAgACABIAIgBkEgaiADEMABIgMQRyAGQRBqIAQQwAEiBBBHIAYgBRDAASIFEEcQ8AEgBRCnARogBBCnARogAxCnARogBkEwaiQAC1YBAX8jAEEwayIGJAAgACABIAIgBkEgaiADEMABIgMQRyAGQRBqIAQQwAEiBBBHIAYgBRDAASIFEEcQyAIgBRCnARogBBCnARogAxCnARogBkEwaiQACyQBAX8jAEEQayIBJAAgASAAEOUBIAEQtgMhACABQRBqJAAgAAs3AQF/IwBBIGsiAyQAIANBEGogARDaBiAAIANBEGogA0EIaiACEFsiABCKFCAAECsgA0EgaiQAC0ABAX8jAEEgayIEJAAgACABIARBEGogAhDJASIAEEcgBCADEMkBIgIQRxCkBiACELIBGiAAELIBGiAEQSBqJAALOgEBfyMAQRBrIgUkACAFQQhqIAEQLkEAIAIgAxBfIAAgBUEIaiAFIAQQWyIAEH0gABArIAVBEGokAAsoAQF/IwBBEGsiAiQAIABB9PsCIAJBCGogARB3EAM2AgAgAkEQaiQACy4BAX8jAEEQayIBJAAgAUGgtgMoAgBB0DFqNgIMIAAgAUEMahCMDCABQRBqJAALJgEBfyMAQRBrIgEkACABENMFNgIMIAAgAUEMahDOBSABQRBqJAALLgEBfyMAQRBrIgEkACABQaC2AygCAEGkOGo2AgwgACABQQxqEM4FIAFBEGokAAsxAQF/IwBBEGsiAiQAIAJBCGogABAyIAIgARAyIAJBCGogAhD9BiEAIAJBEGokACAACykBAX8jAEEQayIBJAAgAUEIaiAAEDIgAUEIahDYCiEAIAFBEGokACAACzcBAX8jAEEQayICJAAgAkEIahBkQZACahDdASAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALNAEBfyMAQRBrIgIkACACEGQpApgCNwIIIAAgAkEIaiACIAEQWyIAEH0gABArIAJBEGokAAs0AQF/IwBBEGsiAiQAIAIQZCkCkAI3AgggACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQACy8BAX8jAEEQayIDJAAgA0EIaiAAEDIgAyABEDIgA0EIaiADIAIQlgIgA0EQaiQACyYBAX8jAEEQayIBJAAgASAAEC42AgBBhOUCIAEQwgIgAUEQaiQACyoBAX8jAEEgayICJAAgACACQQhqIAEQOyIAEDoQ8AYgABA5IAJBIGokAAsyAQF/IwBBEGsiAyQAIAAQLiADIAEQuwIiABA/IAIQ5QghASAAEIECGiADQRBqJAAgAQsuAQF/IwBBIGsiAiQAIAJBCGogABA7IgAQOiABENEKIQEgABA5IAJBIGokACABCzABAX8jAEEgayIDJAAgA0EIaiAAEDsiABA6IAEgAhDSCiEBIAAQOSADQSBqJAAgAQsuAQF/IwBBIGsiAiQAIAJBCGogABA7IgAQOiABENMKIQEgABA5IAJBIGokACABCzIBAX8jAEEQayIDJAAgABAuIAMgARC7AiIAED8gAhDUCiEBIAAQgQIaIANBEGokACABCy4BAX8jAEEgayICJAAgAkEIaiAAEDsiABA6IAEQ9wIhASAAEDkgAkEgaiQAIAELRgEBfyMAQTBrIgQkACAAEC4gBEEYaiABEDsiABA6IARBCGogAhC7AiIBED8gAxD1CCECIAEQgQIaIAAQOSAEQTBqJAAgAgs0AQF/IwBBIGsiBCQAIAAQLiAEQQhqIAEQOyIAEDogAiADEMgEIQEgABA5IARBIGokACABCyYBAX8jAEEQayIBJAAgASAAEC42AgBBhOUCIAEQyQMgAUEQaiQACy4BAX8jAEEgayIDJAAgABAuIAEgA0EIaiACEDsiABA6EPwIIAAQOSADQSBqJAALMQEBfyMAQRBrIgIkACAAEC4hACACQQhqIAEQMiAAIAJBCGoQgwYhACACQRBqJAAgAAuWAgEDfyMAQTBrIgIkACACIAA2AixB8MIEKAIAIQMCQCAAQQBIDQAgAygCnAEgAEgNACADQaABaiIAQfzdAhDSBSACQShqEIcIIAJBCGogABDVAyEEIAJBADYCGCACQSBqIAJBKGogAkEYahCCAiACQSBqIAQQhgggAkEgahArIAQQKyACQSBqIANBlAFqIANBmAFqIAJBCGogAkEsahBnIgMgAkEoahCFCCADECsgAkEANgIEIAJBGGogAkEoaiACQQRqEIICIAJBCGogAkEYahCSASAAIAJBCGoQ2gIgAkEIahA1IAJBGGoQKyABIAAQLjYCACACQSBqEJoDIQQgAkEgahArIAJBKGoQKwsgAkEwaiQAIAQLCQAgASACEKMMC1oBAn8jAEEQayIGJABB8MIEKAIAIgdBlAFqIAIQbCAHQZgBaiADEGwgByAENgKcASAAEC4gBiABEMkBIgAQR0G3BiAEIAUQgQYhASAAELIBGiAGQRBqJAAgAQuGAQEDfyMAQSBrIgIkACACIAA2AhxB8MIEKAIAIQMCQCAAQQBIDQAgAygChAEgAEgNACACQQhqIANBgAFqIAJBHGoQggIgAkEQaiACQQhqEJIBIANBiAFqIgAgAkEQahDaAiACQRBqEDUgAkEIahArIAEgABAuNgIAQQEhBAsgAkEgaiQAIAQLCQAgASACEKYMC1ABAn8jAEEQayIFJABB8MIEKAIAIgZBgAFqIAIQbCAGIAM2AoQBIAAQLiAFIAEQyQEiABBHQbYGIAMgBBCBBiEBIAAQsgEaIAVBEGokACABC0sBAn8jAEEgayIEJAAgABAuIQAgBEEQaiABELsCIgEQPyEFIARBCGogAxAyIAAgBSACIARBCGoQgQkhACABEIECGiAEQSBqJAAgAAs1AQF/IwBBEGsiBCQAIAAQLiEAIARBCGogAxAyIAAgASACIARBCGoQoAEhACAEQRBqJAAgAAsyAQF/IwBBEGsiAyQAIAAQLiADIAEQuwIiABA/IAIQgwkhASAAEIECGiADQRBqJAAgAQsqAQF/IwBBEGsiAyQAIAMgAhAuNgIAIAAgASADEIgJIQAgA0EQaiQAIAALMAEBfyMAQRBrIgMkACAAEC4hACADIAIQLjYCACAAIAEgAxCJCSEAIANBEGokACAACywBAX8jAEEQayICJAAgAiABEC42AgAgAEGE5QIgAhDhAiEAIAJBEGokACAACzIBAX8jAEEQayICJAAgABAuIQAgAiABEC42AgAgAEGE5QIgAhDjAiEAIAJBEGokACAAC0kBAX8jAEEgayIEJAAgABAuIQAgBEEQaiABEOUBIARBCGogAxAyIAQgBCkDCDcDACAAIARBEGogAiAEEOQCIQAgBEEgaiQAIAALCQAgABC3BRBNCykAIAAgATYCFCAAQez3AjYCACABEFBFBEAgACAAKAIAKAIIEQEACyAAC0cBAX8jAEEwayIEJAAgABAuIARBGGogARDQAyIAEEcgAiAEIAMQsgwiARCYCBDfAyECIAEQtwUaIAAQ1wIaIARBMGokACACCzUBAX8jAEEgayIDJAAgABAuIANBCGogARDRAyIAEEcgAhCMCSEBIAAQ2AIaIANBIGokACABCzUBAX8jAEEgayIDJAAgABAuIANBCGogARDQAyIAEEcgAhCjAyEBIAAQ1wIaIANBIGokACABCzgBAX8jAEEgayIDJAAgABAuIANBCGogARDRAyIAEEcgAkECchCjAyEBIAAQ2AIaIANBIGokACABC8IGAQJ/IwBB4ABr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aiABEMABIgAQRyACEDMgAxAzIAQQMyAHQQhqIAUQOyIBEDogBhAzEOgDIQIgARA5IAAQpwEaIAdBMGokACACC0EBAX8jAEEQayIEJAAgBCAANgIMIARBDGogARB6ENwBIARBDGogAhB6ENwBIARBDGogAxB6ENwBIARBEGokACAACzkBAX8jAEEgayIFJAAgBSACIAMgBBC5DSECIAAgASgCAEEDQajoAiACQawGEQcAEFgaIAVBIGokAAuVAgEDfyMAQTBrIgIkACACIAA2AixB8MIEKAIAIQMCQCAAQQBIDQAgAygCaCAATA0AIANB7ABqIgBB/N0CENIFIAJBKGoQhwggAkEIaiAAENUDIQQgAkEANgIYIAJBIGogAkEoaiACQRhqEIICIAJBIGogBBCGCCACQSBqECsgBBArIAJBIGogA0HgAGogA0HkAGogAkEIaiACQSxqEGciAyACQShqEIUIIAMQKyACQQA2AgQgAkEYaiACQShqIAJBBGoQggIgAkEIaiACQRhqEJIBIAAgAkEIahDaAiACQQhqEDUgAkEYahArIAEgABAuNgIAIAJBIGoQmgMhBCACQSBqECsgAkEoahArCyACQTBqJAAgBAsJACABIAIQuw0LWwECfyMAQRBrIgYkAEHwwgQoAgAiB0HgAGogAhBsIAdB5ABqIAMQbCAHIAQ2AmggABAuIAYgARDJASIAEEdBsgZBACAEIAUQqQYhASAAELIBGiAGQRBqJAAgAQsyAQF/IwBBIGsiAyQAIAAQLiADQQhqIAEQOyIAEDogAhDbBCEBIAAQOSADQSBqJAAgAQs1AQF/IwBBIGsiAyQAIANBGGogARAyIAAgA0EYaiADIAIQOyIBEDoQ0AkgARA5IANBIGokAAtZAgF/AX0jAEEQayIBJAAgASAANgIMIAFBCGpB8MIEKAIAIgBB2ABqIABB3ABqIAEgAUEMahBnIgAQiAggAUEIahAzIQIgAUEIahArIAAQKyABQRBqJAAgAgsHACABEMANC30CAn8CfSMAQTBrIgkkAEHwwgQoAgAiCkHYAGogARBsIApB3ABqIAIQbCAAEC4hACAJQRhqIAUQOyIBEDohAiAGEDMhCyAHEDMhDCAJQRBqIAgQMiAJIAkpAxA3AwggACADIAQgAiALIAwgCUEIahD/CCABEDkgCUEwaiQACzoB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ASoCDCACKgIIWwRAIAEqAhAgAioCDFsNAQsgARCMAyABIAJBCGpBARDZAgsgACgCuDMQbgwCCxBvIABBADYCuDMMAQsgACgC9DMiAUUNACABKAJIIgEgACgC0DNHDQAgARCfAiAALQDoAQ0AEG8LIAJBEGokAAs9AQF/IwBBEGsiAyQAIAAQLiEAIANBCGogARAyIANBCGohASAAEK4CIgAEQCAAIAEgAhDZAgsgA0EQaiQACzIBAX8jAEEQayICJAAgAkEIaiAAEDJBoLYDKAIAKAKsMyACQQhqIAEQnwUgAkEQaiQACykBAX8jAEEQayICJAAgAkEIaiAAEDIQZCACQQhqIAEQ2QIgAkEQaiQAC0EBAX8jAEEQayIBJAAgAUEIaiAAEDJBoLYDKAIAIgAgACgCkDRBBHI2ApA0IABBuDRqIAEpAgg3AwAgAUEQaiQACyoBAX8jAEEQayICJAAgAEGkxAIgAkEIaiABEHcQAzYCACACQRBqJAAgAAtFAQF/IwBBEGsiASQAIAEgADYCDCABQQhqQfDCBCgCAEHMAGogASABQQxqEPINIgAQ3AIgAUEIahArIAAQKyABQRBqJAALBwAgABDzDQtnAQF/IwBBEGsiAyQAAkAgAhBQRQRAQfDCBCgCAEHMAGogAhBsIANBCGogABAyIAMgARAyIANBCGogA0GvBhDIAwwBCyADQQhqIAAQMiADIAEQMiADQQhqIANBABDIAwsgA0EQaiQACycBAX8jAEEQayICJAAgAkEIaiAAEDIgAkEIaiABEJkEIAJBEGokAAsvAQF/IwBBEGsiAyQAIANBCGogABAyIAMgAhAyIANBCGogASADEKwCIANBEGokAAuUAQEDfwJAQaC2AygCAEHsMmoiAhBwKAIAIgEgAEYNACABKAL8BSAARg0AIAIoAgAiAUECSA0AIAFBfmohAQNAIAAgAiABEEgoAgBGBEAgAiABEEggAiABQQFqEEggAigCACABQX9zakECdBCuASACIAIoAgBBf2oQSCAANgIADwsgAUEASiEDIAFBf2ohASADDQALCwszAQF/IwBBEGsiAiQAIAIQZCkCFDcCCCAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALPAEBfyMAQRBrIgIkACACQaC2AygCACgCrDMpAgw3AgggACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQACykBAX8jAEEQayIBJAAgARA2KAL8BDYCDCAAIAFBDGoQzgUgAUEQaiQACzEBAX8jAEEQayICJAAgAkEIahCFByAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALPQECfyMAQRBrIgIkACACQQhqEGQiA0GgBGogA0EMahA4IAAgAkEIaiACIAEQWyIAEH0gABArIAJBEGokAAsxAQF/IwBBEGsiAiQAIAJBCGoQhgQgACACQQhqIAIgARBbIgAQfSAAECsgAkEQaiQACzEBAX8jAEEQayICJAAgAkEIahCLBSAAIAJBCGogAiABEFsiABB9IAAQKyACQRBqJAALpgEBA38jAEEgayIEJAAgBEEQaiAAENMDIARBEGogBEEIakHA3wIQlAEiBRDmASEGIAUQKyAEQRBqECsCQCAGBEAgBEEQaiAAEJIBIARBEGoQLiEAIARBCGogARAyIAAQNiAAEFUgBEEIaiACIAMQmwchACAEQRBqEDUMAQsgABDbAyEAIARBEGogARAyIAAgBEEQaiACIAMQmgchAAsgBEEgaiQAIAALhwEBA38CQEGgtgMoAgBB+DJqIgIQcCgCACAARg0AIAIoAgAiAUECSA0AIAFBfmohAQNAIAAgAiABEEgoAgBGBEAgAiABEEggAiABQQFqEEggAigCACABQX9zakECdBCuASACIAIoAgBBf2oQSCAANgIADwsgAUEASiEDIAFBf2ohASADDQALCwsyAQF/IwBBEGsiAyQAIAAQLiADIAEQuwIiABA/IAIQ/wEhASAAEIECGiADQRBqJAAgAQtEAgJ/AXwjAEEQayIBJAAgACgCAEHM3QIoAgAgAUEEahAEIQMgASABKAIEEFghACADEIMCIQIgABCeASABQRBqJAAgAgsoAQF/IwBBEGsiASQAIAEgABC7AiIAED8QvgogABCBAhogAUEQaiQACyoBAX8jAEEQayICJAAgAiAANgIMIAJBDGogAS0AABDcASACQRBqJAAgAAspAQF/IwBBEGsiAiQAIABBhLADIAJBCGogARCFDhADNgIAIAJBEGokAAsJACAAEIECEE0LJgEBfyMAQRBrIgEkACABIAAQuwIiABA/GiAAEIECGiABQRBqJAALKAEBfyMAQRBrIgIkACAAQbDSAiACQQhqIAEQdxADNgIAIAJBEGokAAs5AQJ/IwBBEGsiASQAIAFBoLYDKAIAIgJB3DdqQQAgAi0A3DcbNgIMIAAgAUEMahCJDiABQRBqJAALKAEBfyMAQRBrIgIkACAAQZzdAiACQQhqIAEQdxADNgIAIAJBEGokAAsmAQF/IwBBEGsiASQAIAEQjQM2AgwgACABQQxqEIsOIAFBEGokAAsoAQF/IwBBEGsiAiQAIABBuNsCIAJBCGogARB3EAM2AgAgAkEQaiQACyYBAX8jAEEQayIBJAAgARDUAzYCDCAAIAFBDGoQjQ4gAUEQaiQACzYBAX8jAEEQayIDJAAgAyAANgIMIANBDGogARB6ENwBIANBDGogAhCUAxDcASADQRBqJAAgAAs6AQF/IwBBIGsiBCQAIARBCGogAiADEI8OIQIgACABKAIAQQJBhN4CIAJBrAYRBwAQWBogBEEgaiQACzUBAX8jAEEQayIDJAAgAyACENgFIQIgACABKAIAQQFBgN4CIAJBrAYRBwAQWBogA0EQaiQAC2sBAn8jAEEgayIAJABB8MIEKAIAIgFBQGsiAhBQRQRAIABBCGogAiABQcgAahCRDiAAQRBqIABBCGoQkgEgAUE0aiAAQRBqENoCIABBEGoQNSAAQQhqECsLIAFBNGoQLiEBIABBIGokACABC04BAn8jAEEQayIAJABB8MIEKAIAIgJBNGoiAyABENIFIAJBxABqIgEQUEUEQCAAQQhqIAEgAkHIAGogAxCQDiAAQQhqECsLIABBEGokAAuXAwECf0HI9gAQSxDFDyEBQaC2AygCAEUEQCABEJwCCyABEL0PIAAgATYCACAAQQRqQfzdAhCRARogAEEQakH83QIQkQEaIABBHGoQeyAAQSBqEHsgAEEkahB7IABBKGoQeyAAQSxqEHsgAEEwahB7IABBNGpB/N0CEJEBGiAAQUBrEHsgAEHEAGoQeyAAQcgAahB7IABBzABqEI4BIABB0ABqEI4BIABB1ABqEI4BIABB2ABqEI4BIABB3ABqEI4BIABB4ABqEI4BIABB5ABqEI4BIABBADYCaCAAQewAakH83QIQkQEaIABB+ABqEI4BIABB/ABqEI4BIABBgAFqEI4BIABBADYChAEgAEGIAWpB/N0CEJEBGiAAQZQBahCOASAAQZgBahCOASAAQQA2ApwBIABBoAFqQfzdAhCRARogAEGsAWoQjgEgAEGwAWoQjgEgAEG0AWoQjgFBoLYDKAIAIQIgACgCABCcAhDUAyIBQQA2AsgBIAFBrQY2AsQBIAFBrgY2AsABIAFCADcDGCACEJwCIAALNwEBfyAAKAIEIgNBAXUgAWohASAAKAIAIQAgASACIANBAXEEfyABKAIAIABqKAIABSAACxEUAAs9AQF/IwBBEGsiBCQAIAAoAgAhACAEQQhqIAMQLSABIAIgBEEIaiAAEQUAIQAgBEEIahArIARBEGokACAAC0cBAn8jAEEQayIDJAAgAUEvTQRAIAMgAhDlASAAIAFBBHRqIgAgAykDCDcCtAEgACADKQMANwKsAUEBIQQLIANBEGokACAECygBAX8jAEEQayICJAAgAEHEwQIgAkEIaiABEHcQAzYCACACQRBqJAALQQEBfyMAQRBrIgMkAAJAIAJBL00EQCADIAEgAkEEdGpBrAFqNgIMIAAgA0EMahCYDgwBCyAAEI4BCyADQRBqJAALKAEBfyMAQRBrIgIkACACIAFBmAFqNgIMIAAgAkEMahB1IAJBEGokAAsoAQF/IwBBEGsiAiQAIAIgAUGQAWo2AgwgACACQQxqEHUgAkEQaiQACygBAX8jAEEQayICJAAgAiABQYgBajYCDCAAIAJBDGoQdSACQRBqJAALKAEBfyMAQRBrIgIkACACIAFBgAFqNgIMIAAgAkEMahB1IAJBEGokAAsoAQF/IwBBEGsiAiQAIAIgAUHYAGo2AgwgACACQQxqEHUgAkEQaiQACygBAX8jAEEQayICJAAgAiABQdAAajYCDCAAIAJBDGoQdSACQRBqJAALKAEBfyMAQRBrIgIkACACIAFByABqNgIMIAAgAkEMahB1IAJBEGokAAsnAQF/IwBBEGsiAiQAIAIgAUE4ajYCDCAAIAJBDGoQdSACQRBqJAALJQEBfUMAAIC/IQIgAUEVTQR9IAAgAUECdGpB0ChqKgIABSACCwsmAQF9QwAAgL8hAiABQf8DTQR9IAAgAUECdGpB0AhqKgIABSACCwtAAQF/IwBBEGsiAyQAAkAgAkEETQRAIAMgASACQQN0akH8Bmo2AgwgACADQQxqEHUMAQsgABCOAQsgA0EQaiQACygBAX8jAEEQayICJAAgAiABQewGajYCDCAAIAJBDGoQdSACQRBqJAALLgEBfyMAQRBrIgMkACAAKAIAIQAgAyACEEIgASADIAARAAAgAxA1IANBEGokAAsQACABIAIgAyAAKAIAESIACzACAX8BfSMAQRBrIgMkACADIAEgAiAAKAIAEQ8AOAIMIAMqAgwhBCADQRBqJAAgBAsOACABIAIgACgCABECAAsoAQF/IwBBEGsiAiQAIAIgAUHYAWo2AgwgACACQQxqEHUgAkEQaiQACygBAX8jAEEQayICJAAgAiABQZwBajYCDCAAIAJBDGoQdSACQRBqJAALOwEBfyMAQRBrIgIkACACIAEoApgBIgE2AgwCQCABRQRAIAAQewwBCyAAIAJBDGoQjwMaCyACQRBqJAALKAEBfyMAQRBrIgIkACAAQbDZAiACQQhqIAEQdxADNgIAIAJBEGokAAs6AQF/IwBBEGsiAiQAIAIgASgCjAEiATYCDAJAIAFFBEAgABB7DAELIAAgAkEMahCtDgsgAkEQaiQACy4BAX8jAEEQayIDJAAgAyABIAIgACgCABECADYCDCADKAIMIQAgA0EQaiQAIAALRwECfyMAQRBrIgIkAEHwwgQoAgAhAyACIAEQkgEgA0EQaiIDIAIQ2gIgAhA1IAAgARBQBH9BAAUgAxAuCzYCHCACQRBqJAALWQECfyMAQRBrIgIkACAAEN4CBEAgACgCACEDIAAQ3QUaIAMQTQsgACABKAIINgIIIAAgASkCADcCACABQQAQtQQgAkEAOgAPIAEgAkEPahC0BCACQRBqJAALDQBBoLYDKAIAKwPYMgtHAQJ/IwBBEGsiAiQAQfDCBCgCACEDIAIgARCSASADQQRqIgMgAhDaAiACEDUgACABEFAEf0EABSADEC4LNgIYIAJBEGokAAsnAQF/IwBBEGsiAiQAIAIgAUEIajYCDCAAIAJBDGoQdSACQRBqJAALZQEDfyMAQRBrIgIkACAAKAI0QQFOBEADQCACIAAoAjwgA0ECdGooAgA2AgwgAkEIaiABIAIgAkEMahCPAyIEENwCIAJBCGoQKyAEECsgA0EBaiIDIAAoAjRIDQALCyACQRBqJAALJwEBfyMAQRBrIgIkACACIAFBLGo2AgwgACACQQxqEHUgAkEQaiQACygBAX8jAEEQayICJAAgAiABKAIINgIMIAAgAkEMahBnGiACQRBqJAALJwEBfyMAQRBrIgEkACABQcD3ADYCDCAAIAFBDGoQmwIgAUEQaiQACycBAX8jAEEQayIBJAAgAUGy9wA2AgwgACABQQxqEJsCIAFBEGokAAsnAQF/IwBBEGsiASQAIAFBoPcANgIMIAAgAUEMahCbAiABQRBqJAALJgEBfyMAQRBrIgEkACABEPYJNgIMIAAgAUEMahCbAiABQRBqJAALJgEBfyMAQRBrIgEkACABQYAxNgIMIAAgAUEMahCbAiABQRBqJAALJgEBfyMAQRBrIgEkACABEPUJNgIMIAAgAUEMahCbAiABQRBqJAALJgEBfyMAQRBrIgEkACABQewwNgIMIAAgAUEMahCbAiABQRBqJAALJgEBfyMAQRBrIgEkACABQeYwNgIMIAAgAUEMahCbAiABQRBqJAALkgIBAn8jAEEwayICJAAgAkEANgIsIAJBfzYCKCACQX82AiQgAkF/NgIgIAEgAkEsaiACQShqIAJBJGogAkEgahCaCiAAEPUFIAJBGGpB4NoCEJQBIQEgAkEIaiACKAIgIAIoAiQgAigCKGxsIAIoAiwQeSAAIAEgAkEQaiACQQhqELIEIgMQvAIgAxArIAEQKyAAIAJBCGpB59oCEJQBIgEgAkEYaiACQShqEGciAxC8AiADECsgARArIAAgAkEIakHt2gIQlAEiASACQRhqIAJBJGoQZyIDELwCIAMQKyABECsgACACQQhqQfTaAhCUASIAIAJBGGogAkEgahBnIgEQvAIgARArIAAQKyACQTBqJAALkgIBAn8jAEEwayICJAAgAkEANgIsIAJBfzYCKCACQX82AiQgAkF/NgIgIAEgAkEsaiACQShqIAJBJGogAkEgahDMBiAAEPUFIAJBGGpB4NoCEJQBIQEgAkEIaiACKAIgIAIoAiQgAigCKGxsIAIoAiwQeSAAIAEgAkEQaiACQQhqELIEIgMQvAIgAxArIAEQKyAAIAJBCGpB59oCEJQBIgEgAkEYaiACQShqEGciAxC8AiADECsgARArIAAgAkEIakHt2gIQlAEiASACQRhqIAJBJGoQZyIDELwCIAMQKyABECsgACACQQhqQfTaAhCUASIAIAJBGGogAkEgahBnIgEQvAIgARArIAAQKyACQTBqJAALcQEBfyMAQSBrIgYkACAAKAIAIQAgBkEQaiACEC0gBkEIaiAEEC0gBiAFEC0gBkEYaiABIAZBEGogAyAGQQhqIAYgABEyACAGQRhqEHohACAGQRhqECsgBhArIAZBCGoQKyAGQRBqECsgBkEgaiQAIAALTgECfwJAQYjDBC0AAEEBcQ0AQYjDBBD7AUUNACMAQRBrIgAkAEECQaDaAhAIIQEgAEEQaiQAQYTDBCABNgIAQYjDBBD6AQtBhMMEKAIACy0AIAEgACgCCEcEQANAIAAoAhAaIAAgACgCCEF/ajYCCCAAKAIIIAFHDQALCwsHACAAKAIECyQBAn8jAEEQayICJAAgASAAEJAIIQMgAkEQaiQAIAEgACADGwskAQJ/IwBBEGsiAiQAIAAgARCQCCEDIAJBEGokACABIAAgAxsLJgAgACgCABogACgCACAAENsCahogACgCACAAENsCahogACgCABoLngIBAn8gAEGs2gBqEOACIABBlNoAahBFGiAAQYjaAGoQRRogAEH82QBqEOACIABB1NkAahBFGiAAQdDYAGoQ8QQaIABB3DtqELMKIABByDtqEEUaIABBvDtqEEUaIABBnDtqIgEQsgogAUEMahDgAiABEEUaIABBiDtqEEUaIABBnDlqEMAEGiAAQaQ4ahDABBogAEGIOGoiAkEYaiEBA0AgAUF0ahBFIgEgAkcNAAsgAEHcN2oQ4wYaIABBqDVqEEUaIABBnDVqEEUaIABBkDVqEEUaIABBhDVqEEUaIABB+DRqEEUaIABBnDNqEOACIABBkDNqEEUaIABBhDNqEEUaIABB+DJqEEUaIABB7DJqEEUaIABBCGoQ4gYaIAALKAEBfyAAIAEoAgA2AgAgASgCACEDIAAgATYCCCAAIAIgA2o2AgQgAAs/AQF/IwBBEGsiASQAIAAQUxogAUF/NgIMIAFB/////wc2AgggAUEMaiABQQhqEK0EKAIAIQAgAUEQaiQAIAALJgAgACgCABogACgCACAAENsCahogACgCABogACgCACAAEJsBahoLVQEBfyAAEJUIIAAQUyAAKAIAIAAoAgQgAUEEaiICEK4EIAAgAhDKASAAQQRqIAFBCGoQygEgABBTIAEQywEQygEgASABKAIENgIAIAAgABCbARDIDgtdAQJ/IwBBEGsiAiQAIAIgAEEIaiABEMoOIgEoAgAgASgCBEcEQANAIAAoAhAaIAEoAgAQkQggASABKAIAQQFqIgM2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Qcg5akG2ITYCACAAQdA4akGpITYCACAAQQA6ANg3IABBfzYCpDogAEKAgICAcDcCnDogAEEAOgCYOiAAQgA3A/A6IABB+DpqQgA3AwAgAEGAO2pCgICAgHA3AwAgAEIANwKUOyAAQQA2Arg7IAFDAAAAAEMAAAAAECoaIAIgASkDADcCACAAQQA2AuBZIABCADcCzFkgAEKAgICAoOH1kTw3AsRZIABBADoAwFkgAEKAgICAgICAyAo3A6hZIAFD//9/f0P//39/ECoaIAQgASkDACIINwIAIAMgCDcCACAAQQI2AshaIABBADoAvFogAEH////7BzYCuFogAEIANwKkWiAAQQA6AKBaIABBADYC+FkgAEEAOgD0WSAAQoCAgIAgNwPAWiAAQczaAGpBAEHoAxBPGiAAQX82ArxeIABCfzcCtF4gAEHA3gBqQQBBgRgQTxogAUEQaiQAIAALJwEBfyMAQRBrIgIkACACIAFBFGo2AgwgACACQQxqEHUgAkEQaiQACycBAX8jAEEQayICJAAgAiABQQxqNgIMIAAgAkEMahB1IAJBEGokAAsnAQF/IwBBEGsiAiQAIAIgAUEEajYCDCAAIAJBDGoQdSACQRBqJAALMAEBfyMAQRBrIgQkACAAKAIAIQAgBCADEEIgASACIAQgABEGACAEEDUgBEEQaiQACzcBAn8jAEEQayICJAAgACgCFCEDIAIgARCSASADIAIQLiAAKAIcQX9qEJIEIAIQNSACQRBqJAALKgEBfyMAQRBrIgIkACACIAA2AgwgAkEMaiABEJQDENwBIAJBEGokACAACyoBAX8jAEEQayICJAAgACACIAEoAhQQkQEiABDVAxogABA1IAJBEGokAAuXAQEBfyMAQTBrIgYkACAAKAIAIQAgBkEgaiABEC0gBkEYaiACEC0gBkEQaiADEC0gBkEIaiAEEC0gBiAFEC0gBkEoaiAGQSBqIAZBGGogBkEQaiAGQQhqIAYgABEOACAGQShqEHohACAGQShqECsgBhArIAZBCGoQKyAGQRBqECsgBkEYahArIAZBIGoQKyAGQTBqJAAgAAtFAQF/IwBBEGsiAyQAIAAoAgAhACADQQhqIAEQLSADIAIQLSADQQhqIAMgABECACEAIAMQKyADQQhqECsgA0EQaiQAIAALYQEBfyMAQSBrIgMkACAAKAIAIQAgA0EQaiABEC0gA0EIaiACEC0gA0EYaiADQRBqIANBCGogABEGACADQRhqEHohACADQRhqECsgA0EIahArIANBEGoQKyADQSBqJAAgAAttAQF/IwBBIGsiBCQAIAAoAgAhACAEQRBqIAEQLSAEQQhqIAIQLSAEIAMQLSAEQRhqIARBEGogBEEIaiAEIAARCAAgBEEYahB6IQAgBEEYahArIAQQKyAEQQhqECsgBEEQahArIARBIGokACAACzcBAX8jAEEQayICJAAgAiAANgIMIAIoAgwgASoCADgCACACIAIoAgxBCGo2AgwgAkEQaiQAIAALqwIBAn9BoLYDKAIAIQIgACgCABCcAhDUAyIBQQA2AsgBIAFCADcDwAEgAUIANwMYIAIQnAIgACgCABDrDiAAQQA2AgAgAEG0AWoQKyAAQbABahArIABBrAFqECsgAEGgAWoQNSAAQZgBahArIABBlAFqECsgAEGIAWoQNSAAQYABahArIABB/ABqECsgAEH4AGoQKyAAQewAahA1IABB5ABqECsgAEHgAGoQKyAAQdwAahArIABB2ABqECsgAEHUAGoQKyAAQdAAahArIABBzABqECsgAEHIAGoQKyAAQcQAahArIABBQGsQKyAAQTRqEDUgAEEwahArIABBLGoQKyAAQShqECsgAEEkahArIABBIGoQKyAAQRxqECsgAEEQahA1IABBBGoQNSAAC1gBAX8jAEEgayIEJAAgBEEYaiABEC0gBEEQaiACEC0gBEEIaiADEC0gBEEYaiAEQRBqIARBCGogABEGACAEQQhqECsgBEEQahArIARBGGoQKyAEQSBqJAALQAEBfyMAQRBrIgQkACAEIAMQLSAEQQhqIAEgAiAEIAARKwAgBEEIahB6IQAgBEEIahArIAQQKyAEQRBqJAAgAAtAAQF/IwBBEGsiBCQAIARBCGogARAtIAQgAhAtIARBCGogBCADIAARBQAhACAEECsgBEEIahArIARBEGokACAACwsAIAEgAiAAEUYACy0BAX8jAEEQayIEJAAgBCABIAIgAyAAET8ANgIMIAQoAgwhACAEQRBqJAAgAAsLACABIAIgABECAAteAQF/IwBBIGsiByQAIAdBGGogBBAtIAdBEGogBRAtIAdBCGogBhAtIAEgAiADIAdBGGogB0EQaiAHQQhqIAARHQAgB0EIahArIAdBEGoQKyAHQRhqECsgB0EgaiQACz4BAX8jAEEQayIDJAAgAyACEC0gA0EIaiABIAMgABEGACADQQhqEHohACADQQhqECsgAxArIANBEGokACAACw0AIAEgAiADIAARBQALPgEBfyMAQRBrIgUkACAFQQhqIAMQLSAFIAQQLSABIAIgBUEIaiAFIAARLgAgBRArIAVBCGoQKyAFQRBqJAALVQEBfyMAQSBrIgUkACAFQQhqIAEQQiAFIAQQLSAFQRhqIAVBCGogAiADIAUgABEcACAFQRhqEHohACAFQRhqECsgBRArIAVBCGoQNSAFQSBqJAAgAAsqAQF/IwBBEGsiAiQAIAIgASAAEQAAIAIQlAMhACACEDUgAkEQaiQAIAALKQIBfwF8IwBBEGsiASQAIAEgABFdADkDCCABKwMIIQIgAUEQaiQAIAILPgEBfyMAQRBrIgMkACADQQhqIAEQLSADIAIQLSADQQhqIAMgABECACEAIAMQKyADQQhqECsgA0EQaiQAIAALMgEBfyMAQRBrIgIkACACQQhqIAEQLSACQQhqIAARAwAhACACQQhqECsgAkEQaiQAIAALPAEBfyMAQRBrIgQkACAEQQhqIAEQLSAEIAIQLSAEQQhqIAQgAyAAEQYAIAQQKyAEQQhqECsgBEEQaiQACwkAIAEgABEDAAs2AQF/IwBBEGsiBCQAIARBCGogARAtIARBCGogAiADIAARBQAhACAEQQhqECsgBEEQaiQAIAALNAEBfyMAQRBrIgMkACADQQhqIAEQLSADQQhqIAIgABECACEAIANBCGoQKyADQRBqJAAgAAtFAQF/IwBBIGsiBCQAIARBEGogARBCIARBCGogAxAtIARBEGogAiAEQQhqIAARLQAgBEEIahArIARBEGoQNSAEQSBqJAALLQEBfyMAQRBrIgQkACAEIAEQQiAEIAIgAyAAEQUAIQAgBBA1IARBEGokACAAC1cBAX8jAEEgayIGJAAgBkEQaiABEEIgBkEIaiACEC0gBiADEC0gBkEQaiAGQQhqIAYgBCAFIAARDAAhACAGECsgBkEIahArIAZBEGoQNSAGQSBqJAAgAAtLAQF/IwBBIGsiBSQAIAVBEGogARBCIAVBCGogBBAtIAVBEGogAiADIAVBCGogABEHACEAIAVBCGoQ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IAggBxAtIAhBMGogCEEoaiAIQSBqIAhBGGogCEEQaiAIQQhqIAggABELACEAIAgQKyAIQQhqECsgCEEQahArIAhBGGoQKyAIQSBqECsgCEEoahArIAhBMGoQNSAIQUBrJAAgAAt1AQF/IwBBMGsiByQAIAdBIGogARBCIAdBGGogAhAtIAdBEGogAxAtIAdBCGogBBAtIAdBIGogB0EYaiAHQRBqIAdBCGogBSAGIAARCgAhACAHQQhqECsgB0EQahArIAdBGGoQKyAHQSBqEDUgB0EwaiQAIAALPAEBfyMAQRBrIgQkACAEQQhqIAIQLSAEIAMQLSABIARBCGogBCAAETgAIAQQKyAEQQhqECsgBEEQaiQAC6cBAQF/IwBBQGoiCiQAIApBMGogARBCIApBKGogAhAtIApBIGogAxAtIApBGGogBhAtIApBEGogBxAtIApBCGogCBAtIAogCRAtIApBMGogCkEoaiAKQSBqIAQgBSAKQRhqIApBEGogCkEIaiAKIAARJwAgChArIApBCGoQKyAKQRBqECsgCkEYahArIApBIGoQKyAKQShqECsgCkEwahA1IApBQGskAAuUAQEBfyMAQTBrIggkACAIQShqIAEQLSAIQSBqIAIQLSAIQRhqIAMQLSAIQRBqIAQQLSAIQQhqIAYQLSAIIAcQLSAIQShqIAhBIGogCEEYaiAIQRBqIAUgCEEIaiAIIAARCwAhACAIECsgCEEIahArIAhBEGoQKyAIQRhqECsgCEEgahArIAhBKGoQKyAIQTBqJAAgAAuOAQEBfyMAQTBrIgckACAHQShqIAEQLSAHQSBqIAIQLSAHQRhqIAMQLSAHQRBqIAQQLSAHQQhqIAUQLSAHIAYQLSAHQShqIAdBIGogB0EYaiAHQRBqIAdBCGogByAAEQ4AIAcQKyAHQQhqECsgB0EQahArIAdBGGoQKyAHQSBqECsgB0EoahArIAdBMGokAAspAQF/IwBBEGsiAiQAIAIgARBCIAIgABEDACEAIAIQNSACQRBqJAAgAAtHAQF/IwBBIGsiAyQAIANBEGogARBCIANBCGogAhAtIANBEGogA0EIaiAAEQIAIQAgA0EIahArIANBEGoQNSADQSBqJAAgAAs6AQF/IwBBIGsiAyQAIANBEGogARBCIAMgAhBCIANBEGogAyAAEQAAIAMQNSADQRBqEDUgA0EgaiQAC0MBAX8jAEEgayIDJAAgA0EYaiABEC0gA0EIaiACEEIgA0EYaiADQQhqIAARAAAgA0EIahA1IANBGGoQKyADQSBqJAALCwAgASACIAARFAALKwIBfwF9IwBBEGsiAiQAIAIgASAAERMAOAIMIAIqAgwhAyACQRBqJAAgAwsnAQF/IwBBEGsiASQAIAEgABEJADYCDCABKAIMIQAgAUEQaiQAIAALMgEBfyMAQRBrIgQkACAEQQhqIAIQLSABIARBCGogAyAAEQYAIARBCGoQKyAEQRBqJAALPAEBfyMAQRBrIgIkACACQQhqIAEQLSACIAJBCGogABEDADYCDCACKAIMIQAgAkEIahArIAJBEGokACAACz4BAX8jAEEQayIDJAAgA0EIaiACEC0gAyABIANBCGogABECADYCDCADKAIMIQAgA0EIahArIANBEGokACAACzABAX8jAEEQayIDJAAgA0EIaiACEC0gASADQQhqIAARAAAgA0EIahArIANBEGokAAsLACABIAIgABE5AAspAQF/IwBBEGsiBCQAIAQgARBCIAQgAiADIAARBgAgBBA1IARBEGokAAtFAQF/IwBBIGsiBCQAIARBEGogARBCIARBCGogAhAtIARBEGogBEEIaiADIAARBgAgBEEIahArIARBEGoQNSAEQSBqJAALCwAgASACIAARAAALZAEBfyMAQSBrIgUkACAFQRhqIAEQLSAFQRBqIAIQLSAFQQhqIAMQLSAFIAQQLSAFQRhqIAVBEGogBUEIaiAFIAARCAAgBRArIAVBCGoQKyAFQRBqECsgBUEYahArIAVBIGokAAswAQF/IwBBEGsiAyQAIANBCGogARAtIANBCGogAiAAEQAAIANBCGoQKyADQRBqJAALPAEBfyMAQRBrIgQkACAEQQhqIAEQLSAEIAMQLSAEQQhqIAIgBCAAEQYAIAQQKyAEQQhqECsgBEEQaiQACwkAIAEgABEVAAspAgF/AX0jAEEQayIBJAAgASAAERIAOAIMIAEqAgwhAiABQRBqJAAgAgs8AQF/IwBBEGsiAiQAIAIgARAtIAJBCGogAiAAEQAAIAJBCGoQeiEAIAJBCGoQKyACECsgAkEQaiQAIAALQgEBfyMAQRBrIgUkACAFQQhqIAEQLSAFIAIQLSAFQQhqIAUg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ECxB/LADQeDAAkHgASAAQShqECwQACAAQcIANgIoQZzMAkG2hAJBwLADQZjDAkHnASAAQShqECxBwLADQZzDAkHoASAAQShqECwQACAAQcAANgIoQZzMAkHDhAJBtLADQZjDAkHpASAAQShqECxBtLADQZzDAkHqASAAQShqECwQAEHThAJB6wEQzwggAEHIADYCKEGczAJB5YQCQfywA0HcwAJB3wEgAEEoahAsQfywA0HgwAJB4AEgAEEoahAsEAAgAEHMADYCKEGczAJB7IQCQfywA0HcwAJB3wEgAEEoahAsQfywA0HgwAJB4AEgAEEoahAsEAAgAEHQADYCKEGczAJB9IQCQcywA0GYwwJB7AEgAEEoahAsQcywA0GcwwJB7QEgAEEoahAsEAAgAEEANgIsIABB7gE2AiggACAAKQMoNwMgQYiFAiAAQSBqEM4IIABBADYCLCAAQe8BNgIoIAAgACkDKDcDGEGYhQIgAEEYahDOCEGphQJB8AEQzQhBs4UCQfEBEM0IIABBADYCLCAAQfIBNgIoIAAgACkDKDcDECAAQRBqEPoSIABBADYCLCAAQfMBNgIoIAAgACkDKDcDCCAAQQhqEPkSIABBADYCLCAAQfQBNgIoIAAgACkDKDcDACAAEPgSEPYSEPQSEPISEPASIABBMGokAAsJACAAIAEQ6g4LCQAgACABEOwOCwkAIAAgARDtDgsJACAAIAEQ7g4LCQAgACABEO8OCwkAIAAgARDwDgsFABDxDgsHACAAEPIOCwYAQejTAgs8AQF/QaC2AygCAEHU2QBqIgAQSSAAIAEQayICQQFqEIUCIABBABDWAyABIAIQPhogACACENYDQQA6AAAL5wYBAX8jAEEQayIAJABB6NMCQYDUAkGk1AJBAEHMvQJByQFBiMACQQBBiMACQQBB/4ECQYrAAkHKARAFQejTAkGMggJBxL0CQZjDAkHLAUHMARA9QcS9AkGcwwJBzQFBzgEQPRAAIABBCDYCDEHo0wJBlYICQYSwA0GYwwJBzwEgAEEMahAsQYSwA0GcwwJB0AEgAEEMahAsEAAgAEEMNgIMQejTAkGqggJBzLADQZjDAkHRASAAQQxqECxBzLADQZzDAkHSASAAQQxqECwQACAAQRA2AgxB6NMCQbGCAkH8sANB3MACQdMBIABBDGoQLEH8sANB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CwYAQbDBAguVAgEBfyMAQRBrIgAkAEGwwQJBxMECQeDBAkEAQcy9AkEdQYjAAkEAQYjAAkEAQe73AUGKwAJBHhAFIABBADYCDEGwwQJBz/cBQfywA0HcwAJBHyAAQQxqECxB/LADQeDAAkEgIABBDGoQLBAAIABBBDYCDEGwwQJB0fcBQfywA0HcwAJBHyAAQQxqECxB/LADQeDAAkEgIABBDGoQLBAAIABBCDYCDEGwwQJB6vcBQfywA0HcwAJBHyAAQQxqECxB/LADQeDAAkEgIABBDGoQLBAAIABBDDYCDEGwwQJB7PcBQfywA0HcwAJBHyAAQQxqECxB/LADQeDAAkEgIABBDGoQLBAAEIQUEIMUEIIUIABBEGokAAvgAQEDfyMAQRBrIgIkACACQQhqIABBz/cBEEMgAiABQc/3ARBDIAJBCGogAhDmASEDIAIQKyACQQhqECsCQCADRQ0AIAJBCGogAEHR9wEQQyACIAFB0fcBEEMgAkEIaiACEOYBIQMgAhArIAJBCGoQKyADRQ0AIAJBCGogAEHq9wEQQyACIAFB6vcBEEMgAkEIaiACEOYBIQMgAhArIAJBCGoQKyADRQ0AIAJBCGogAEHs9wEQQyACIAFB7PcBEEMgAkEIaiACEOYBIQQgAhArIAJBCGoQKwsgAkEQaiQAIAQLnwEBAX8jAEEQayIDJAAgA0EIaiACQc/3ARBDIAFBz/cBIANBCGoQYyADQQhqECsgA0EIaiACQdH3ARBDIAFB0fcBIANBCGoQYyADQQhqECsgA0EIaiACQer3ARBDIAFB6vcBIANBCGoQYyADQQhqECsgA0EIaiACQez3ARBDIAFB7PcBIANBCGoQYyADQQhqECsgACABEKADIANBEGokAAsxACABQc/3ASACEGMgAUHR9wEgAxBjIAFB6vcBIAQQYyABQez3ASAFEGMgACABEKADC5wBAQF/IwBBEGsiAyQAIANBCGogARCJAiACQc/3ASADQQhqEGMgA0EIahArIANBCGogAUEEahCJAiACQdH3ASADQQhqEGMgA0EIahArIANBCGogAUEIahCJAiACQer3ASADQQhqEGMgA0EIahArIANBCGogAUEMahCJAiACQez3ASADQQhqEGMgA0EIahArIAAgAhCgAyADQRBqJAALlAEBAX8jAEEQayICJAAgAkEI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ZXJHcmFiAFNsaWRlckdyYWJBY3RpdmUAQnV0dG9uAEJ1dHRvbkhvdmVyZWQAQnV0dG9uQWN0aXZlAEhlYWRlcgBIZWFkZXJIb3ZlcmVkAEhlYWRlckFjdGl2ZQBTZXBhcmF0b3IAU2VwYXJhdG9ySG92ZXJlZABTZXBhcmF0b3JBY3RpdmUAUmVzaXplR3JpcABSZXNpemVHcmlwSG92ZXJlZABSZXNpemVHcmlwQWN0aXZlAFRhYgBUYWJIb3ZlcmVkAFRhYkFjdGl2ZQBUYWJVbmZvY3VzZWQAVGFiVW5mb2N1c2VkQWN0aXZlAFBsb3RMaW5lcwBQbG90TGluZXNIb3ZlcmVkAFBsb3RIaXN0b2dyYW0AUGxvdEhpc3RvZ3JhbUhvdmVyZWQAVGV4dFNlbGVjdGVkQmcARHJhZ0Ryb3BUYXJnZXQATmF2SGlnaGxpZ2h0AE5hdldpbmRvd2luZ0hpZ2hsaWdodABOYXZXaW5kb3dpbmdEaW1CZwBNb2RhbFdpbmRvd0RpbUJnAFVua25vd24AIyNUb29sdGlwXyUwMmQAIyNNZW51XyUwMmQAIyNQb3B1cF8lMDh4AHdpbmRvd19jb250ZXh0AHZvaWRfY29udGV4dABBgBcLhAQDAAAAAQAAAAAAAAACAAAAAQAAAAMAAAACAAAAAAAAAGNvbHVtbnMAI1NvdXJjZUV4dGVybgAKJSpzJS4qcwAlKnMlLipzACAlLipzAAoAYWIATG9nQnV0dG9ucwBMb2cgVG8gVFRZAExvZyBUbyBGaWxlAExvZyBUbyBDbGlwYm9hcmQARGVmYXVsdCBEZXB0aAByYgB3dABEZWFyIEltR3VpIE1ldHJpY3MARGVhciBJbUd1aSAlcwBBcHBsaWNhdGlvbiBhdmVyYWdlICUuM2YgbXMvZnJhbWUgKCUuMWYgRlBTKQAlZCB2ZXJ0aWNlcywgJWQgaW5kaWNlcyAoJWQgdHJpYW5nbGVzKQAlZCBhY3RpdmUgd2luZG93cyAoJWQgdmlzaWJsZSkAJWQgYWN0aXZlIGFsbG9jYXRpb25zAFdpbmRvd3MARHJhd0xpc3QAQWN0aXZlIERyYXdMaXN0cyAoJWQpAFBvcHVwcwBQb3B1cHMgKCVkKQBQb3B1cElEOiAlMDh4LCBXaW5kb3c6ICclcyclcyVzAE5VTEwAIENoaWxkV2luZG93ACBDaGlsZE1lbnUAVGFiQmFycwBUYWIgQmFycyAoJWQpAEludGVybmFsIHN0YXRlAE5vbmUATW91c2UATmF2AE5hdktleWJvYXJkAE5hdkdhbWVwYWQAQZAbC+AGXw0AAGQNAABqDQAAbg0AAHoNAABIb3ZlcmVkV2luZG93OiAnJXMnAEhvdmVyZWRSb290V2luZG93OiAnJXMnAEhvdmVyZWRJZDogMHglMDhYLzB4JTA4WCAoJS4yZiBzZWMpLCBBbGxvd092ZXJsYXA6ICVkAEFjdGl2ZUlkOiAweCUwOFgvMHglMDhYICglLjJmIHNlYyksIEFsbG93T3ZlcmxhcDogJWQsIFNvdXJjZTogJXMAQWN0aXZlSWRXaW5kb3c6ICclcycATW92aW5nV2luZG93OiAnJXMnAE5hdldpbmRvdzogJyVzJwBOYXZJZDogMHglMDhYLCBOYXZMYXllcjogJWQATmF2SW5wdXRTb3VyY2U6ICVzAE5hdkFjdGl2ZTogJWQsIE5hdlZpc2libGU6ICVkAE5hdkFjdGl2YXRlSWQ6IDB4JTA4WCwgTmF2SW5wdXRJZDogMHglMDhYAE5hdkRpc2FibGVIaWdobGlnaHQ6ICVkLCBOYXZEaXNhYmxlTW91c2VIb3ZlcjogJWQATmF2V2luZG93aW5nVGFyZ2V0OiAnJXMnAERyYWdEcm9wOiAlZCwgU291cmNlSWQgPSAweCUwOFgsIFBheWxvYWQgIiVzIiAoJWQgYnl0ZXMpAFRvb2xzAFNob3cgd2luZG93cyBiZWdpbiBvcmRlcgBTaG93IHdpbmRvd3MgcmVjdGFuZ2xlcwBPdXRlclJlY3QAT3V0ZXJSZWN0Q2xpcHBlZABJbm5lclJlY3QASW5uZXJDbGlwUmVjdABXb3JrUmVjdABDb250ZW50cwBDb250ZW50c1JlZ2lvblJlY3QAAAAAAAAAALEPAAC7DwAAzA8AANYPAADkDwAA7Q8AAPYPAAAjI3JlY3RzX3R5cGUAJyVzJzoAKCU2LjFmLCU2LjFmKSAoJTYuMWYsJTYuMWYpIFNpemUgKCU2LjFmLCU2LjFmKSAlcwBTaG93IGNsaXBwaW5nIHJlY3RhbmdsZSB3aGVuIGhvdmVyaW5nIEltRHJhd0NtZCBub2RlACVkACMj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QQAA+EEAAAAAAAC4QQAAuEEAADBBAAAwQQAAqEEAAAAAAAAQQQAAuEEAAIBAAAAwQQAAXEIAAJBBAAC4QQAAEEEAADBBAACAQAAAkkIAAAAAAACIQQAAiEEAAABBAAAAQQAAXEIAAAAAAACIQQAAiEEAAABBAAAAQQAAtkIAAAAAAACIQQAAsEEAAKBAAAAAAFByb2dneUNsZWFuLnR0ZiwgJWRweAAgAP8AAAAgAP8AMTFjMQCsndcAAAAAAAAAACAA/wAAIG8gADD/MPAx/zEA/+//AE6vnwBBojELhScBAAIABAABAAEAAQABAAIAAQADAAIAAQACAAIAAQABAAEAAQABAAUAAgABAAIAAwADAAMAAgACAAQAAQABAAEAAgABAAUAAgADAAEAAgABAAIAAQABAAIAAQABAAIAAgABAAQAAQABAAEAAQAFAAoAAQACABMAAgABAAIAAQACAAEAAgABAAIAAQAFAAEABgADAAIAAQACAAIAAQABAAEABAAIAAUAAQABAAQAAQABAAMAAQACAAEABQABAAIAAQABAAEACgABAAEABQACAAQABgABAAQAAgACAAIADAACAAEAAQAGAAEAAQABAAQAAQABAAQABgAFAAEABAACAAIABAAKAAcAAQABAAQAAgAEAAIAAQAEAAMABgAKAAwABQAHAAIADgACAAkAAQABAAYABwAKAAQABwANAAEABQAEAAgABAABAAEAAgAcAAUABgABAAEABQACAAUAFAACAAIACQAIAAsAAgAJABEAAQAIAAYACAAbAAQABgAJABQACwAbAAYARAACAAIAAQABAAEAAgABAAIAAgAHAAYACwADAAMAAQABAAMAAQACAAEAAQABAAEAAQADAAEAAQAIAAMABAABAAUABwACAAEABAAEAAgABAACAAEAAgABAAEABAAFAAYAAwAGAAIADAADAAEAAwAJAAIABAADAAQAAQAFAAMAAwABAAMABwABAAUAAQABAAEAAQACAAMABAAFAAIAAwACAAYAAQABAAIAAQAHAAEABwADAAQABQAPAAIAAgABAAUAAwAWABMAAgABAAEAAQABAAIABQABAAEAAQAGAAEAAQAMAAgAAgAJABIAFgAEAAEAAQAFAAEAEAABAAIABwAKAA8AAQABAAYAAgAEAAEAAgAEAAEABgABAAEAAwACAAQAAQAGAAQABQABAAIAAQABAAIAAQAKAAMAAQADAAIAAQAJAAMAAgAFAAcAAgATAAQAAwAGAAEAAQABAAEAAQAEAAMAAgABAAEAAQACAAUAAwABAAEAAQACAAIAAQABAAIAAQABAAIAAQADAAEAAQABAAMABwABAAQAAQABAAIAAQABAAIAAQACAAQABAADAAgAAQABAAEAAgABAAMABQABAAMAAQADAAQABgACAAIADgAEAAYABgALAAkAAQAPAAMAAQAcAAUAAgAFAAUAAwABAAMABAAFAAQABgAOAAMAAgADAAUAFQACAAcAFAAKAAEAAgATAAIABAAcABwAAgADAAIAAQAOAAQAAQAaABwAKgAMACgAAwA0AE8ABQAOABEAAwACAAIACwADAAQABgADAAEACAACABcABAAFAAgACgAEAAIABwADAAUAAQABAAYAAwABAAIAAgACAAUAHAABAAEABwAHABQABQADAB0AAwARABoAAQAIAAQAGwADAAYACwAXAAUAAwAEAAYADQAYABAABgAFAAoAGQAjAAcAAwACAAMAAwAOAAMABgACAAYAAQAEAAIAAwAIAAIAAQABAAMAAwADAAQAAQABAA0AAgACAAQABQACAAEADgAOAAEAAgACAAEABAAFAAIAAwABAA4AAwAMAAMAEQACABAABQABAAIAAQAIAAkAAwATAAQAAgACAAQAEQAZABUAFAAcAEsAAQAKAB0AZwAEAAEAAgABAAEABAACAAQAAQACAAMAGAACAAIAAgABAAEAAgABAAMACAABAAEAAQACAAEAAQADAAEAAQABAAYAAQAFAAMAAQABAAEAAwAEAAEAAQAFAAIAAQAFAAYADQAJABAAAQABAAEAAQADAAIAAwACAAQABQACAAUAAgACAAMABwANAAcAAgACAAEAAQABAAEAAgADAAMAAgABAAYABAAJAAIAAQAOAAIADgACAAEAEgADAAQADgAEAAsAKQAPABcADwAXALAAAQADAAQAAQABAAEAAQAFAAMAAQACAAMABwADAAEAAQACAAEAAgAEAAQABgACAAQAAQAJAAcAAQAKAAUACAAQAB0AAQABAAIAAgADAAEAAwAFAAIABAAFAAQAAQABAAIAAgADAAMABwABAAYACgABABEAAQAsAAQABgACAAEAAQAGAAUABAACAAoAAQAGAAkAAgAIAAEAGAABAAIADQAHAAgACAACAAEABAABAAMAAQADAAMABQACAAUACgAJAAQACQAMAAIAAQAGAAEACgABAAEABwAHAAQACgAIAAMAAQANAAQAAwABAAYAAQADAAUAAgABAAIAEQAQAAUAAgAQAAYAAQAEAAIAAQADAAMABgAIAAUACwALAAEAAwADAAIABAAGAAoACQAFAAcABAAHAAQABwABAAEABAACAAEAAwAGAAgABwABAAYACwAFAAUAAwAYAAkABAACAAcADQAFAAEACABSABAAPQABAAEAAQAEAAIAAgAQAAoAAwAIAAEAAQAGAAQAAgABAAMAAQABAAEABAADAAgABAACAAIAAQABAAEAAQABAAYAAwAFAAEAAQAEAAYACQACAAEAAQABAAIAAQAHAAIAAQAGAAEABQAEAAQAAwABAAgAAQADAAMAAQADAAIAAgACAAIAAwABAAYAAQACAAEAAgABAAMABwABAAgAAgABAAIAAQAFAAIABQADAAUACgABAAIAAQABAAMAAgAFAAsAAwAJAAMABQABAAEABQAJAAEAAgABAAUABwAJAAkACAABAAMAAwADAAYACAACAAMAAgABAAEAIAAGAAEAAgAPAAkAAwAHAA0AAQADAAoADQACAA4AAQANAAoAAgABAAMACgAEAA8AAgAPAA8ACgABAAMACQAGAAkAIAAZABoALwAHAAMAAgADAAEABgADAAQAAwACAAgABQAEAAEACQAEAAIAAgATAAoABgACAAMACAABAAIAAgAEAAIAAQAJAAQABAAEAAYABAAIAAkAAgADAAEAAQABAAEAAwAFAAUAAQADAAgABAAGAAIAAQAEAAwAAQAFAAMABwANAAIABQAIAAEABgABAAIABQAOAAYAAQAFAAIABAAIAA8ABQABABcABgA+AAIACgABAAEACAABAAIAAgAKAAQAAgACAAkAAgABAAEAAwACAAMAAQAFAAMAAwACAAEAAwAIAAEAAQABAAsAAwABAAEABAADAAcAAQAOAAEAAgADAAwABQACAAUAAQAGAAcABQAHAA4ACwABAAMAAQAIAAkADAACAAEACwAIAAQABAACAAYACgAJAA0AAQABAAMAAQAFAAEAAwACAAQABAABABIAAgADAA4ACwAEAB0ABAACAAcAAQADAA0ACQACAAIABQADAAUAFAAHABAACAAFAEgAIgAGAAQAFgAMAAwAHAAtACQACQAHACcACQC/AAEAAQABAAQACwAIAAQACQACAAMAFgABAAEAAQABAAQAEQABAAcABwABAAsAHwAKAAIABAAIAAIAAwACAAEABAACABAABAAgAAIAAwATAA0ABAAJAAEABQACAA4ACAABAAEAAwAGABMABgAFAAEAEAAGAAIACgAIAAUAAQACAAMAAQAFAAUAAQALAAYABgABAAMAAwACAAYAAwAIAAEAAQAEAAoABwAFAAcABwAFAAgACQACAAEAAwAEAAEAAQADAAEAAwADAAIABgAQAAEABAAGAAMAAQAKAAYAAQADAA8AAgAJAAIACgAZAA0ACQAQAAYAAgACAAoACwAEAAMACQABAAIABgAGAAUABAAeACgAAQAKAAcADAAOACEABgADAAYABwADAAEAAwABAAsADgAEAAkABQAMAAsAMQASADMAHwCMAB8AAgACAAEABQABAAgAAQAKAAEABAAEAAMAGAABAAoAAQADAAYABgAQAAMABAAFAAIAAQAEAAIAOQAKAAYAFgACABYAAwAHABYABgAKAAsAJAASABAAIQAkAAIABQAFAAEAAQABAAQACgABAAQADQACAAcABQACAAkAAwAEAAEABwArAAMABwADAAkADgAHAAkAAQALAAEAAQADAAcABAASAA0AAQAOAAEAAwAGAAoASQACAAIAHgAGAAEACwASABMADQAWAAMALgAqACUAWQAHAAMAEAAiAAIAAgADAAkAAQAHAAEAAQABAAIAAgAEAAoABwADAAoAAwAJAAUAHAAJAAIABgANAAcAAwABAAMACgACAAcAAgALAAMABgAVADYAVQACAAEABAACAAIAAQAnAAMAFQACAAIABQABAAEAAQAEAAEAAQADAAQADwABAAMAAgAEAAQAAgADAAgAAgAUAAEACAAHAA0ABAABABoABgACAAkAIgAEABUANAAKAAQABAABAAUADAACAAsAAQAHAAIAHgAMACwAAgAeAAEAAQADAAYAEAAJABEAJwBSAAIAAgAYAAcAAQAHAAMAEAAJAA4ALAACAAEAAgABAAIAAwAFAAIABAABAAYABwAFAAMAAgAGAAEACwAFAAsAAgABABIAEwAIAAEAAwAYAB0AAgABAAMABQACAAIAAQANAAYABQABAC4ACwADAAUAAQABAAUACAACAAoABgAMAAYAAwAHAAsAAgAEABAADQACAAUAAQABAAIAAgAFAAIAHAAFAAIAFwAKAAgABAAEABYAJwBfACYACAAOAAkABQABAA0ABQAEAAMADQAMAAsAAQAJAAEAGwAlAAIABQAEAAQAPwDTAF8AAgACAAIAAQADAAUAAgABAAEAAgACAAEAAQABAAMAAgAEAAEAAgABAAEABQACAAIAAQABAAIAAwABAAMAAQABAAEAAwABAAQAAgABAAMABgABAAEAAwAHAA8ABQADAAIABQADAAkACwAEAAIAFgABAAYAAwAIAAcAAQAEABwABAAQAAMAAwAZAAQABAAbABsAAQAEAAEAAgACAAcAAQADAAUAAgAcAAgAAgAOAAEACAAGABAAGQADAAMAAwAOAAMAAwABAAEAAgABAAQABgADAAgABAABAAEAAQACAAMABgAKAAYAAgADABIAAwACAAUABQAEAAMAAQAFAAIABQAEABcABwAGAAwABgAEABEACwAJAAUAAQABAAoABQAMAAEAAQALABoAIQAHAAMABgABABEABwABAAUADAABAAsAAgAEAAEACAAOABEAFwABAAIAAQAHAAgAEAALAAkABgAFAAIABgAEABAAAgAIAA4AAQALAAgACQABAAEAAQAJABkABAALABMABwACAA8AAgAMAAgANAAHAAUAEwACABAABAAkAAgAAQAQAAgAGAAaAAQABgACAAkABQAEACQAAwAcAAwAGQAPACUAGwARAAwAOwAmAAUAIAB/AAEAAgAJABEADgAEAAEAAgABAAEACAALADIABAAOAAIAEwAQAAQAEQAFAAQABQAaAAwALQACABcALQBoAB4ADAAIAAMACgACAAIAAwADAAEABAAUAAcAAgAJAAYADwACABQAAQADABAABAALAA8ABgCGAAIABQA7AAEAAgACAAIAAQAJABEAAwAaAIkACgDTADsAAQACAAQAAQAEAAEAAQABAAIABgACAAMAAQABAAIAAwACAAMAAQADAAQABAACAAMAAwABAAQAAwABAAcAAgACAAMAAQACAAEAAwADAAMAAgACAAMAAgABAAMADgAGAAEAAwACAAkABgAPABsACQAiAJEAAQABAAIAAQABAAEAAQACAAEAAQABAAEAAgACAAIAAwABAAIAAQABAAEAAgADAAUACAADAAUAAgAEAAEAAwACAAIAAgAMAAQAAQABAAEACgAEAAUAAQAUAAQAEAABAA8ACQAFAAwAAgAJAAIABQAEAAIAGgATAAcAAQAaAAQAHgAMAA8AKgABAAYACACsAAEAAQAEAAIAAQABAAsAAgACAAQAAgABAAIAAQAKAAgAAQACAAEABAAFAAEAAgAFAAEACAAEAAEAAwAEAAIAAQAGAAIAAQADAAQAAQACAAEAAQABAAEADAAFAAcAAgAEAAMAAQABAAEAAwADAAYAAQACAAIAAwADAAMAAgABAAIADAAOAAsABgAGAAQADAACAAgAAQAHAAoAAQAjAAcABAANAA8ABAADABcAFQAcADQABQAaAAUABgABAAcACgACAAcANQADAAIAAQABAAEAAgCjABQCAQAKAAsAAQADAAMABAAIAAIACAAGAAIAAgAXABYABAACAAIABAACAAEAAwABAAMAAwAFAAkACAACAAEAAgAIAAEACgACAAwAFQAUAA8AaQACAAMAAQABAAMAAgADAAEAAQACAAUAAQAEAA8ACwATAAEAAQABAAEABQAEAAUAAQABAAIABQADAAUADAABAAIABQABAAsAAQABAA8ACQABAAQABQADABoACAACAAEAAwABAAEADwATAAIADAABAAIABQACAAcAAgATAAIAFAAGABoABwAFAAIAAgAHACIAFQANAEYAAgCAAAEAAQACAAEAAQACAAEAAQADAAIAAgACAA8AAQAEAAEAAwAEACoACgAGAAEAMQBVAAgAAQACAAEAAQAEAAQAAgADAAYAAQAFAAcABAADANMABAABAAIAAQACAAUAAQACAAQAAgACAAYABQAGAAoAAwAEADAAZAAGAAIAEAAoAQUAGwCDAQIAAgADAAcAEAAIAAUAJgAPACcAFQAJAAoAAwAHADsADQAbABUALwAFABUABgBBsNgACxQgAP8AACBvIAAw/zDwMf8xAP/v/wBB0tgAC7EeAQACAAQAAQABAAEAAQACAAEABgACAAIAAQAIAAUABwALAAEAAgAKAAoACAACAAQAFAACAAsACAACAAEAAgABAAYAAgABAAcABQADAAcAAQABAA0ABwAJAAEABAAGAAEAAgABAAoAAQABAAkAAgACAAQABQAGAA4AAQABAAkAAwASAAUABAACAAIACgAHAAEAAQABAAMAAgAEAAMAFwACAAoADAACAA4AAgAEAA0AAQAGAAoAAwABAAcADQAGAAQADQAFAAIAAwARAAIAAgAFAAcABgAEAAEABwAOABAABgANAAkADwABAAEABwAQAAQABwABABMACQACAAcADwACAAYABQANABkABAAOAA0ACwAZAAEAAQABAAIAAQACAAIAAwAKAAsAAwADAAEAAQAEAAQAAgABAAQACQABAAQAAwAFAAUAAgAHAAwACwAPAAcAEAAEAAUAEAACAAEAAQAGAAMAAwABAAEAAgAHAAYABgAHAAEABAAHAAYAAQABAAIAAQAMAAMAAwAJAAUACAABAAsAAQACAAMAEgAUAAQAAQADAAYAAQAHAAMABQAFAAcAAgACAAwAAwABAAQAAgADAAIAAwALAAgABwAEABEAAQAJABkAAQABAAQAAgACAAQAAQACAAcAAQABAAEAAwABAAIABgAQAAEAAgABAAEAAwAMABQAAgAFABQACAAHAAYAAgABAAEAAQABAAYAAgABAAIACgABAAEABgABAAMAAQACAAEABAABAAwABAABAAMAAQABAAEAAQABAAoABAAHAAUADQABAA8AAQABAB4ACwAJAAEADwAmAA4AAQAgABEAFAABAAkAHwACABUACQAEADEAFgACAAEADQABAAsALQAjACsANwAMABMAUwABAAMAAgADAA0AAgABAAcAAwASAAMADQAIAAEACAASAAUAAwAHABkAGAAJABgAKAADABEAGAACAAEABgACAAMAEAAPAAYABwADAAwAAQAJAAcAAwADAAMADwAVAAUAEAAEAAUADAALAAsAAwAGAAMAAgAfAAMAAgABAAEAFwAGAAYAAQAEAAIABgAFAAIAAQABAAMAAwAWAAIABgACAAMAEQADAAIABAAFAAEACQAFAAEAAQAGAA8ADAADABEAAgAOAAIACAABABcAEAAEAAIAFwAIAA8AFwAUAAwAGQATAC8ACwAVAEEALgAEAAMAAQAFAAYAAQACAAUAGgACAAEAAQADAAsAAQABAAEAAgABAAIAAwABAAEACgACAAMAAQABAAEAAwAGAAMAAgACAAYABgAJAAIAAgACAAYAAgAFAAoAAgAEAAEAAgABAAIAAgADAAEAAQADAAEAAgAJABcACQACAAEAAQABAAEABQADAAIAAQAKAAkABgABAAoAAgAfABkAAwAHAAUAKAABAA8ABgARAAcAGwC0AAEAAwACAAIAAQABAAEABgADAAoABwABAAMABgARAAgABgACAAIAAQADAAUABQAIABAADgAPAAEAAQAEAAEAAgABAAEAAQADAAIABwAFAAYAAgAFAAoAAQAEAAIACQABAAEACwAGAAEALAABAAMABwAJAAUAAQADAAEAAQAKAAcAAQAKAAQAAgAHABUADwAHAAIABQABAAgAAwAEAAEAAwABAAYAAQAEAAIAAQAEAAoACAABAAQABQABAAUACgACAAcAAQAKAAEAAQADAAQACwAKAB0ABAAHAAMABQACAAMAIQAFAAIAEwADAAEABAACAAYAHwALAAEAAwADAAMAAQAIAAoACQAMAAsADAAIAAMADgAIAAYACwABAAQAKQADAAEAAgAHAA0AAQAFAAYAAgAGAAwADAAWAAUACQAEAAgACQAJACIABgAYAAEAAQAUAAkACQADAAQAAQAHAAIAAgACAAYAAgAcAAUAAwAGAAEABAAGAAcABAACAAEABAACAA0ABgAEAAQAAwABAAgACAADAAIAAQAFAAEAAgACAAMAAQALAAsABwADAAYACgAIAAYAEAAQABYABwAMAAYAFQAFAAQABgAGAAMABgABAAMAAgABAAIACAAdAAEACgABAAYADQAGAAYAEwAfAAEADQAEAAQAFgARABoAIQAKAAQADwAMABkABgBDAAoAAgADAAEABgAKAAIABgACAAkAAQAJAAQABAABAAIAEAACAAUACQACAAMACAABAAgAAwAJAAQACAAGAAQACAALAAMAAgABAAEAAwAaAAEABwAFAAEACwABAAUAAwAFAAIADQAGACcABQABAAUAAgALAAYACgAFAAEADwAFAAMABgATABUAFgACAAQAAQAGAAEACAABAAQACAACAAQAAgACAAkAAgABAAEAAQAEAAMABgADAAwABwABAA4AAgAEAAoAAgANAAEAEQAHAAMAAgABAAMAAgANAAcADgAMAAMAAQAdAAIACAAJAA8ADgAJAA4AAQADAAEABgAFAAkACwADACYAKwAUAAcABwAIAAUADwAMABMADwBRAAgABwABAAUASQANACUAHAAIAAgAAQAPABIAFAClABwAAQAGAAsACAAEAA4ABwAPAAEAAwADAAYABAABAAcADgABAAEACwAeAAEABQABAAQADgABAAQAAgAHADQAAgAGAB0AAwABAAkAAQAVAAMABQABABoAAwALAA4ACwABABEABQABAAIAAQADAAIACAABAAIACQAMAAEAAQACAAMACAADABgADAAHAAcABQARAAMAAwADAAEAFwAKAAQABAAGAAMAAQAQABEAFgADAAoAFQAQABAABgAEAAoAAgABAAEAAgAIAAgABgAFAAMAAwADACcAGQAPAAEAAQAQAAYABwAZAA8ABgAGAAwAAQAWAA0AAQAEAAkABQAMAAIACQABAAwAHAAIAAMABQAKABYAPAABAAIAKAAEAD0APwAEAAEADQAMAAEABAAfAAwAAQAOAFkABQAQAAYAHQAOAAIABQAxABIAEgAFAB0AIQAvAAEAEQABABMADAACAAkABwAnAAwAAwAHAAwAJwADAAEALgAEAAwAAwAIAAkABQAfAA8AEgADAAIAAgBCABMADQARAAUAAwAuAHwADQA5ACIAAgAFAAQABQAIAAEAAQABAAQAAwABABEABQADAAUAAwABAAgABQAGAAMAGwADABoABwAMAAcAAgARAAMABwASAE4AEAAEACQAAQACAAEABgACAAEAJwARAAcABAANAAQABAAEAAEACgAEAAIABAAGAAMACgABABMAAQAaAAIABAAhAAIASQAvAAcAAwAIAAIABAAPABIAAQAdAAIAKQAOAAEAFQAQACkABwAnABkADQAsAAIAAgAKAAEADQAHAAEABwADAAUAFAAEAAgAAgAxAAEACgAGAAEABgAHAAoABwALABAAAwAMABQABAAKAAMAAQACAAsAAgAcAAkAAgAEAAcAAgAPAAEAGwABABwAEQAEAAUACgAHAAMAGAAKAAsABgAaAAMAAgAHAAIAAgAxABAACgAQAA8ABAAFABsAPQAeAA4AJgAWAAIABwAFAAEAAwAMABcAGAARABEAAwADAAIABAABAAYAAgAHAAUAAQABAAUAAQABAAkABAABAAMABgABAAgAAgAIAAQADgADAAUACwAEAAEAAwAgAAEAEwAEAAEADQALAAUAAgABAAgABgAIAAEABgAFAA0AAwAXAAsABQADABAAAwAJAAoAAQAYAAMAxgA0AAQAAgACAAUADgAFAAQAFgAFABQABAALAAYAKQABAAUAAgACAAsABQACABwAIwAIABYAAwASAAMACgAHAAUAAwAEAAEABQADAAgACQADAAYAAgAQABYABAAFAAUAAwADABIAFwACAAYAFwAFABsACAABACEAAgAMACsAEAAFAAIAAwAGAAEAFAAEAAIACQAHAAEACwACAAoAAwAOAB8ACQADABkAEgAUAAIABQAFABoADgABAAsAEQAMACgAEwAJAAYAHwBTAAIABwAJABMATgAMAA4AFQBMAAwAcQBPACIABAABAAEAPQASAFUACgACAAIADQAfAAsAMgAGACEAnwCzAAYABgAHAAQABAACAAQAAgAFAAgABwAUACAAFgABAAMACgAGAAcAHAAFAAoACQACAE0AEwANAAIABQABAAQABAAHAAQADQADAAkAHwARAAMAGgACAAYABgAFAAQAAQAHAAsAAwAEAAIAAQAGAAIAFAAEAAEACQACAAYAAwAHAAEAAQABABQAAgADAAEABgACAAMABgACAAQACAABAAUADQAIAAQACwAXAAEACgAGAAIAAQADABUAAgACAAQAGAAfAAQACgAKAAIABQDAAA8ABAAQAAcACQAzAAEAAgABAAEABQABAAEAAgABAAMABQADAAEAAwAEAAEAAwABAAMAAwAJAAgAAQACAAIAAgAEAAQAEgAMAFwAAgAKAAQAAwAOAAUAGQAQACoABAAOAAQAAgAVAAUAfgAeAB8AAgABAAUADQADABYABQAGAAYAFAAMAAEADgAMAFcAAwATAAEACAACAAkACQADAAMAFwACAAMABwAGAAMAAQACAAMACQABAAMAAQAGAAMAAgABAAMACwADAAEABgAKAAMAAgADAAEAAgABAAUAAQABAAsAAwAGAAQAAQAHAAIAAQACAAUABQAiAAQADgASAAQAEwAHAAUACAACAAYATwABAAUAAgAOAAgAAgAJAAIAAQAkABwAEAAEAAEAAQABAAIADAAGACoAJwAQABcABwAPAA8AAwACAAwABwAVAEAABgAJABwACAAMAAMAAwApADsAGAAzADcAOQAmAQkACQACAAYAAgAPAAEAAgANACYAWgAJAAkACQADAAsABwABAAEAAQAFAAYAAwACAAEAAgACAAMACAABAAQABAABAAUABwABAAQAAwAUAAQACQABAAEAAQAFAAUAEQABAAUAAgAGAAIABAABAAQABQAHAAMAEgALAAsAIAAHAAUABAAHAAsAfwAIAAQAAwADAAEACgABAAEABgAVAA4AAQAQAAEABwABAAMABgAJAEEAMwAEAAMADQADAAoAAQABAAwACQAVAG4AAwATABgAAQABAAoAPgAEAAEAHQAqAE4AHAAUABIAUgAGAAMADwAGAFQAOgD9AA8AmwAIAQ8AFQAJAA4ABwA6ACgAJwBBkPcAC4MBIAD/AAAw/zDwMf8xAP/v/yAA/wAABC8F4C3/LUCmn6YAACAA/wAQIF4gAA5/DgAAIAD/AAIBAwEQAREBKAEpAWgBaQGgAaEBrwGwAaAe+R4AAGNtYXAAbG9jYQBoZWFkAGdseWYAaGhlYQBobXR4AGtlcm4AR1BPUwBDRkYgAG1heHAAQaD4AAvkFi4uLSAgICAgICAgIC1YWFhYWFhYLSAgICBYICAgIC0gICAgICAgICAgIFggICAgICAgICAgIC1YWFhYWFhYICAgICAgICAgIC0gICAgICAgICAgWFhYWFhYWC0gICAgIFhYICAgICAgICAgIC4uLSAgICAgICAgIC1YLi4uLi5YLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC1YLi4uLi5YICAgICAgICAgIC0gICAgICAgICAgWC4uLi4uWC0gICAgWC4uWCAgICAgICAgIC0tLSAgICAgICAgIC1YWFguWFhYLSAgWC4uLlggIC0gICAgICAgICBYLi4uWCAgICAgICAgIC1YLi4uLlggICAgICAgICAgIC0gICAgICAgICAgIFguLi4uWC0gICAgWC4uWCAgICAgICAgIFggICAgICAgICAgIC0gIFguWCAgLSBYLi4uLi5YIC0gICAgICAgIFguLi4uLlggICAgICAgIC1YLi4uWCAgICAgICAgICAgIC0gICAgICAgICAgICBYLi4uWC0gICAgWC4uWCAgICAgICAgIFhYICAgICAgICAgIC0gIFguWCAgLVguLi4uLi4uWC0gICAgICAgWC4uLi4uLi5YICAgICAgIC1YLi5YLlggICAgICAgICAgIC0gICAgICAgICAgIFguWC4uWC0gICAgWC4uWCAgICAgICAgIFguWCAgICAgICAgIC0gIFguWCAgLVhYWFguWFhYWC0gICAgICAgWFhYWC5YWFhYICAgICAgIC1YLlggWC5YICAgICAgICAgIC0gICAgICAgICAgWC5YIFguWC0gICAgWC4uWFhYICAgICAgIFguLlggICAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC1YWCAgIFguWCAgICAgICAgIC0gICAgICAgICBYLlggICBYWC0gICAgWC4uWC4uWFhYICAgIFguLi5YICAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICAgWFggICAgWC5YICAgIFhYICAgIC0gICAgICBYLlggICAgICAgIC0gICAgICAgIFguWCAgICAgIC0gICAgWC4uWC4uWC4uWFggIFguLi4uWCAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICBYLlggICAgWC5YICAgIFguWCAgIC0gICAgICAgWC5YICAgICAgIC0gICAgICAgWC5YICAgICAgIC0gICAgWC4uWC4uWC4uWC5YIFguLi4uLlggICAgIC0gIFguWCAgLSAgIFguWCAgIC0gIFguLlggICAgWC5YICAgIFguLlggIC0gICAgICAgIFguWCAgICAgIC0gICAgICBYLlggICAgICAgIC1YWFggWC4uWC4uWC4uWC4uWFguLi4uLi5YICAgIC0gIFguWCAgLSAgIFguWCAgIC0gWC4uLlhYWFhYWC5YWFhYWFguLi5YIC0gICAgICAgICBYLlggICBYWC1YWCAgIFguWCAgICAgICAgIC1YLi5YWC4uLi4uLi4uWC4uWFguLi4uLi4uWCAgIC0gIFguWCAgLSAgIFguWCAgIC1YLi4uLi4uLi4uLi4uLi4uLi4uLi4uWC0gICAgICAgICAgWC5YIFguWC1YLlggWC5YICAgICAgICAgIC1YLi4uWC4uLi4uLi4uLi4uWFguLi4uLi4uLlggIC0gIFguWCAgLSAgIFguWCAgIC0gWC4uLlhYWFhYWC5YWFhYWFguLi5YIC0gICAgICAgICAgIFguWC4uWC1YLi5YLlggICAgICAgICAgIC0gWC4uLi4uLi4uLi4uLi4uWFguLi4uLi4uLi5YIC1YWFguWFhYLSAgIFguWCAgIC0gIFguLlggICAgWC5YICAgIFguLlggIC0gICAgICAgICAgICBYLi4uWC1YLi4uWCAgICAgICAgICAgIC0gIFguLi4uLi4uLi4uLi4uWFguLi4uLi4uLi4uWC1YLi4uLi5YLSAgIFguWCAgIC0gICBYLlggICAgWC5YICAgIFguWCAgIC0gICAgICAgICAgIFguLi4uWC1YLi4uLlggICAgICAgICAgIC0gIFguLi4uLi4uLi4uLi4uWFguLi4uLi5YWFhYWC1YWFhYWFhYLSAgIFguWCAgIC0gICAgWFggICAgWC5YICAgIFhYICAgIC0gICAgICAgICAgWC4uLi4uWC1YLi4uLi5YICAgICAgICAgIC0gICBYLi4uLi4uLi4uLi4uWFguLi5YLi5YICAgIC0tLS0tLS0tLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC0gICAgICAgICAgWFhYWFhYWC1YWFhYWFhYICAgICAgICAgIC0gICBYLi4uLi4uLi4uLi5YIFguLlggWC4uWCAgIC0gICAgICAgLVhYWFguWFhYWC0gICAgICAgWFhYWC5YWFhYICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgWC4uLi4uLi4uLi5YIFguWCAgWC4uWCAgIC0gICAgICAgLVguLi4uLi4uWC0gICAgICAgWC4uLi4uLi5YICAgICAgIC0gICAgWFggICAgICAgICAgIFhYICAgIC0gICAgICAgICAgIC0gICAgWC4uLi4uLi4uLi5YIFhYICAgIFguLlggIC0gICAgICAgLSBYLi4uLi5YIC0gICAgICAgIFguLi4uLlggICAgICAgIC0gICBYLlggICAgICAgICAgIFguWCAgIC0gICAgICAgICAgIC0gICAgIFguLi4uLi4uLlggICAgICAgIFguLlggICAgICAgICAgLSAgWC4uLlggIC0gICAgICAgICBYLi4uWCAgICAgICAgIC0gIFguLlggICAgICAgICAgIFguLlggIC0gICAgICAgICAgIC0gICAgIFguLi4uLi4uLlggICAgICAgICBYWCAgICAgICAgICAgLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC0gWC4uLlhYWFhYWFhYWFhYWFguLi5YIC0gICAgICAgICAgIC0gICAgIFhYWFhYWFhYWFggIC0tLS0tLS0tLS0tLSAgICAgICAgLSAgICBYICAgIC0gICAgICAgICAgIFggICAgICAgICAgIC1YLi4uLi4uLi4uLi4uLi4uLi4uLi4uWC0gICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLSAgICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gWC4uLlhYWFhYWFhYWFhYWFguLi5YIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gIFguLlggICAgICAgICAgIFguLlggIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gICBYLlggICAgICAgICAgIFguWCAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gICAgWFggICAgICAgICAgIFhYICAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIABBkI8BC9SxATddKSMjIyMjIyNoVjBxcycvIyMjWyksIyMvbDokI1E2PiMjNVtuNDI+Yy1USGAtPj4jL2U+MTFOTlY9QnYoKjouRj91dSMoZ1JVLm8wWEdIYCR2aExHMWh4dDk/V2AjLDVMc0NwIy1pPi5yJDwkNnBEPkxiJzs5Q3JjNnRnWG1LVmVVMmNENEVvM1IvMio+XWIoTUM7JGpQZlkuO2heYElXTTk8TGgyVGxTK2YtcyRvNlE8QldIYFlpVS54ZkxxJE47JDBpUi9HWDpVKGpjVzJwL1cqcT8tcW1uVUNJO2pIU0FpRldNLlIqa1VAQz1HSD9hOXdwOGYkZS4tNF5RZzEpUS1HTChsZihyLzdHclJnd1YlTVM9QyNgOE5EPlFvI3QnWCModiNZOXcwIzFEJENJZjtXJyNwV1VQWE91eFh1VShIOU0oMTxxLVVFMzEjXi1WJzhJUlVvN1FmLi9MPj1LZSQkJzVGJSldMF4jMFhAVS5hPHI6UUx0RnNMY0w2IyNsT2opIy5ZNTwtUiZLZ0x3cUpmTGdOJjtRP2dJXiNEWTJ1TGlAXnJNbDl0PWNXcTYjI3dlZz4kRkJqVlFUU0RnRUtuSVM3RU05PlpZOXcwI0w7Pj4jTXgmNE12dC8vTFtNa0EjV0BsSy5OJ1swIzdSTF8mI3crRiVIdEc5TSNYTGBOJi4sR000UGc7LTxuTEVOaHZ4Pi1Wc00uTTBySmZMSDJlVE1gKm9KTUhSQ2BOa2ZpbU0ySixXLWpYUzopcjB3SyNARmdlJFU+YHcnTjdHIyQjZkIjJEVeJCM6OTpoaytlT2UtLTZ4KUY3KkUlPzc2JV5HTUhlUFctWjVsJyZHaUYjJDk1NjpyUz9kQSNmaUs6KVlyK2AmIzBqQCdEYkcmI14kUEcuTGwrRE5hPFhDTUtFVipOKUxOL04qYj0lUTZwaWEtWGc4SSQ8TVImLFZkSmUkPCg3RztDa2wnJmhGOzskPF89WChiLlJTJSUpIyMjTVBCdXVFMVY6diZjWCYjMm0jKCZjVl1gazlPaExNYm4lcyRHMixCJEJmRDNYKnNwNSNsLCRSI114X1gxeEtYJWI1VSpbcjVpTWZVbzlVYE45OWhHKXRtKy9VczlwRylYUHVgPDBzLSlXVHQoZ0NSeElnKCU2c2ZoPWt0TUtuM2opPDY8YjVTa18vMCheXUFhTiMocC9MPiZWWj4xaSVoMVM5dTVvQFlhYVckZStiPFRXRm4vWjpPaChDeDIkbE5Fb05eZSkjQ0ZZQEBJO0JPUSpzUndadFp4UmNVN3VXNkNYb3cwaSg/JFFbY2pPZFtQNGQpXT5ST1BPcHhUTzdTdHdpMTo6aUIxcSlDXz1kVjI2SjsyLF03b3AkXXVRckBfVjckcV4lbFF3dHVIWV09RFgsbjNMIzBQSERPNGY5PmRDQE8+SEJ1S1BwUCpFLE4rYjNMI2xwUi9NclRFSC5JQVFrLmE+RFsuZTttYy54XUlwLlBIXicvYXFVTy8kMVd4TG9XMFtpTEE8UVQ7NUhLRCtAcVEnTlEoM19QTGhFNDhSLnFBUFN3UTAvV0s/WixbeD8tSjtqUVRXQTBYQEtKKF9ZOE4tOi9NNzQ6Ly1acEtyVXNzP2QjZFpxXURBYmtVKkpxa0wrbndYQEA0N2A1Pnc9NGgoOS5gR0NSVXhIUGVSYDVNam9sKGRVV3haYSg+U1RyUGtySmlXeGA1VTdGIy5nKmpyb2hHZ2BjZzpsU1R2RVkvRVZfN0g0UTlbWiVjbnY7SlFZWjVxLmw3WmVhczpIT0laT0I/RzxOYWxkJHFzXUBdTDxKN2JSKj5ndjpbN01JMmspLicyKCQ1Rk5QJkVRKCwpVV1XXStmaDE4LnZzYWkwMCk7RDNANGt1NVA/RFA4YUp0KztxVU1dPStiJzhAO21WaUJLeDBERVstYXVHbDg6UEomRGorTTZPQ11PXigoIyNdYDBpKWRyVDstN1hgPS1IM1tpZ1VuUEctTlpsby4ja0BoIz1PcmskbT5hPiQtP1RtJFVWKD8jUDZZWSMnLyMjI3hlN3EuNzNySTMqcFAvJDE+czkpVyxKck03U05dJy80QyN2JFVgMCNWLlswPnhRc0gkZkVtUE1nWTJ1N0toKEclc2lJZkxTb1MrTUsyZVRNJD01LE04cGBBLjtfUiUjdVtLIyR4NEFHOC5rSy9IU0I9PS0nSWUvUVR0Rz8tLipeTi00Qi9aTV8zWWxRQzcocDdxKSZdKGA2X2MpJC8qSkwoTC1eKF0kd0lNYGRQdE9kR0EsVTM6dzJNLTA8cS1dTF8/XikxdncnLixNUnNxVnIuTDthTiYjL0VnSilQQmNbLWY+K1dvbVgydTdscU0yaUV1bU1UY3NGPy1hVD1aLTk3VUVuWGdsRW4xSy1ibkVPYGd1RnQoYyU9O0FtX1FzQGpMb29JJk5YO10wI2o0I0YxNDtnbDgtR1FwZ3docnE4Jz1sX2YtYjQ5J1VPcWtMdTctIyNvRFkyTCh0ZStNY2gmZ0xZdEosTUV0SmZMaCd4J009JENTLVpaJVBdOGJaPiNTP1lZIyVRJnEnM15GdyY/RClVRE5yb2NNM0E3Ni8vb0w/I2g3Z2w4NVtxVy9ORE9rJTE2aWo7KzoxYSdpTklkYi1vdTguUCp3LHY1I0VJJFRXUz5Qb3QtUipIJy1TRXBBOmcpZitPJCUlYGtBI0c9OFJNbUcxJk9gPnRvOGJDXVQmJCxuLkxvTz4yOXNwM2R0LTUyVSVWTSNxNydESHBnKyNaOSVIW0s8TCVhMkUtZ3JXVk0zQDI9LWsyMnRMXTQkIyM2V2UnOFVKQ0tFW2RfPSV3STsnNlgtR3NMWDRqXlNnSiQjI1Iqdyx2UDN3SyNpaVcmIypoXkQmUj9qcDcrL3UmIyhBUCMjWFU4YyRmU1lXLUo5NV8tRHBbZzl3Y08mI00taDFPY0psYy0qdnB3MHhVWCYjT1FGS05YQFFJJ0lvUHA3bmIsUVUvL01RJlpEa0tQKVg8V1NWTCg2OHVWbCYjYydbMCMoczFYJnhtJFklQjcqSzplREEzMjNqOTk4R1hiQSNwd01zLWpnRCQ5UUlTQi1BXyhhTjR4b0ZNXkBDNThEMCtRK3EzbjAjM1UxSW5EakY2ODItU2pNWEpLKShoJGh4dWFfS111bDkyJSdCT1UmI0JSUmgtc2xnOEtEbHI6JUw3MUthOi5BOyVZVUxqRFBtTDxMWXM4aSNYd0pPWWFLUEtjMWg6JzlLZSxnKWIpLDc4PUkzOUI7eGlZJGJnR3ctJi5aaTlJblhEdVlhJUcqZjJCcTdtbjleI3AxdnYlIyhXaS07L1o1aG87IzI6OyVkJiN4OXY2OEM1Zz9udFgwWClwVGA7JXBCM3E3bWdHTikzJShQOG5UZDVMN0dlQS1HTEArJUozdTI6KFlmPmV0YGU7KWYjS204JitEQyRJNDY+I0tyXV11LVs9OTl0dHMxLnFiI3E3MmcxV0pPODFxK2VOJzAzJ2VNPiYxWHhZLWNhRW5PaiUybjgpKSw/SUxSNV4uSWJuPC1YLU1xN1thODJMcTpGJiNjZStTOXdzQ0sqeGA1NjlFOGV3J0hlXWg6c0lbMkxNJFtndWthM1pSZDY6dCVJRzo7JCVZaUo6TnE9P2VBdzsvOm5uRHEwKENZY01wRylxTE40JCMjJko8aiRVcEs8UTRhMV1NdXBXXi1zal8kJVtISyUnRiMjIyNRUlpKOjpZM0VHbDQnQCVGa2lBT2cjcFsjI09gZ3VrVGZCSGFnTDxMSHclcSZPVjAjI0Y9Ni86Y2hJbTBAZUNQOFhdOmtGSSVobDhoZ09AUmNCaFMtQFFiJCUrbT1oUERMZyolSzhsbih3Y2YzLydEVy0kLmxSP25bbkNILWVYT09OVEpsaDouUllGJTMncDZzcTpVSU1BOTQ1Jl5IRlM4N0AkRVAyaUc8LWxDTyQlY2B1S0dEM3JDJHgwQkw4YUZuLS1ga2UlI0hNUCd2aDEvUiZPX0o5J3VtLC48dHhbQCV3c0prJmJVVDJgMHVNdjdnZyNxcC9pai5MNTYnaGw7LnM1Q1VyeGpPTTctIyMubCtBdSdBJk86LVQ3MkxdUGAmPTtjdHAnWFNjWCpyVS4+LVhUdCwlT1ZVNClTMStSLSNkZzAvTm4/S3UxXjBmJEIqUDpSb3d3bS1gMFBLallERE0nM11kMzlWWkhFbDQsLmonXVBrLU0uaF4mOjBGQUNtJG1hcS0mc2d3MHQ3LzYoXnh0ayVMdUg4OEZqLWVrbT5HQSNfPjU2OHg2KE9GUmwtSVpwYCZiLF9QJyRNPEpucTc5VnNKVy9tV1MqUFVpcTc2O10vTk1fPmhMYnhmYyRtamAsTzsmJVcybWBaaDovKVVldHc6YUolXUs5aDpUY0ZddV8tU2o5LFZLM00uKicmMERbQ2FdSjlncDgsa0FXXSUoP0ElUiRmPC0+WnRzJ15rbj0tXkBjNCUtcFk2cUklSiUxSUd4ZkxVOUNQOGNiUGxYdik7Qz1iKSw8Mm1PdlA4dXAsVVZmMzgzOWFjQVdBVy1XPyNhby9eIyVLWW84ZlJVTE5kMi4+JW1dVUs6biVyJCdzd11KOzVwQW9PXyMybU8zbiwnPUg1KGV0SGcqYCtSTGd2Pj00VThndUQkSSVEOlc+LXI1ViolaipXOkt2ZWouTHAkPE0tU0daJzorUV9rK3V2T1NMaUVvKDxhRC9LPENDY2AnTHg+Jz87KytPJz4oKWpMUi1edTY4UEhtOFpGV2UrZWo4aDo5cjZMKjAvL2MmaUgmUjhwUmJBI0tqbSV1cFYxZzphXyNVcjdGdUEjKHRSaCMuWTVLK0A/MzwtOG0wJFBFbjtKOnJoNj9JNnVHPC1gd01VJ2lyY3AwTGFFX090bE1iJjEjNlQuI0ZES3UjMUx3JXUlK0dNK1gnZT9ZTGZqTVtWTzBNYnVGcDc7PlEmI1dJbykwQEYlcTdjIzRYQVhOLVUmVkI8SEZGKnFMKCQvViw7KGtYWmVqV09gPFs1Pz9ld1koKjk9JXdEYzssdTwnOXQzVy0oSDF0aDMrR111Y1Fda0xzN2RmKCQvKkpMXUAqdDdCdV9HM183bXA3PGlhUWpPQC5rTGc7eDNCMGxxcDdIZixeWmU3LSMjQC9jNThNbygzO2tucDAlKUE3Py1XK2VJJ284KWI8bktudydIbzhDPVk+cHFCPjBpZSZqaFpbP2lMUkBAX0F2QS1pUUMoPWtzUlpSVnA3YC49K05wQkMlcmgmM11SOjhYRG1FNV5WOE8oeDw8YUcvMU4kI0ZYJDBWNVk2eCdhRXJJM0kkN3glRWB2PC1CWSwpJS0/UHNmKmw/JUMzLm1NKD0vTTA6SnhHJz83V2hIJW8nYTwtODBnME5CeG9PKEdIPGRNXW4uKyVxQGpIP2YuVXNKMkdncyY0PC1lNDcmS2wrZi8vOUBgYis/LlRlTl8mQjhTcz92O15Ucms7ZiNZdkprbCZ3JF0+LStrPycoPFM6Njh0cSpXb0RmWnUnO21NPzhYW21hOFclKmAtPTtELihuYzcvOylnOlQxPV5KJCZCUlYoLWxUbU5CNnhxQltAMCpvLmVyTSo8U1dGXXUyPXN0LSooNnY+Xl0oSC5hUkVaU2ksIzE6W0lYYVpGT208LXVpI3FVcTIkIyNSaTt1NzVPSyMoUnRhVy1LLUZgUytjRl11TmAtS01RJXJQL1hyaS5MUmNCIyM9WUwzQmdNLzNNRD9AZiYxJ0JXLSlKdTxMMjVnbDh1aFZtMWhMJCMjKjgjIyMnQTMvTGtLVysoXnJXWD81V184ZylhKG0mSzhQPiNibW1XQ01rayYjVFJgQyw1ZD5nKUY7dCw0OkBfbDhHLzVoNHZVZCUmJTk1MDpWWEQnUWRXb1ktRiRCdFV3bWZlJFlxTCc4KFBXWChQP15AUG8zJCMjYE1Tcz9EV0JaL1M+KzQlPmZYLFZXdi93J0tEYExQNUliSDtyVFY+bjNjRUs4VSNiWF1sLS9WK15sajM7dmxNYiZbNVlROCNwZWtYOUpQM1hVQzcyTCwsPytOaSZjbzdBcG5PKjVOSywoKFctaTokLGtwJ1VEQU8oRzBTcTdNVmpKc2JJdSknWiwqWz5icjVmWF46RlBBV3ItbTJLZ0w8TFVOMDk4a1RGJiNsdm81OD0vdmpEbzsuOylLYSpoTFIjL2s9cktieHVWYD5RX25ONic4dVRHJiMxVDVnKXVMdjo4NzNVcFRMZ0grI0ZncEgnX28xNzgwUGg4S214UUo4I0g3Mkw0QDc2OEBUbSZRaDRDQi81T3ZtQSYsUSZRYlVvaSRhXyUzTTAxSCk0eDdJXiZLUVZndEZuVis7W1BjPlttNGsvLyxdMT8jYFZZW0pyKjMmJnNsUmZMaVZaSjpdPz1LM1N3PVskPXVSQj8zeGs0OEBhZWc8Wic8JCM0SCk2LD5lMGpUNidOIyhxJS5PPT8yU111KihtPC1WOEonKDEpR11bNjhoVyQ1J3FbR0MmNWpgVEU/bSdlc0ZHTlJNKWosZmZaPy1xeDg7LT5nNHQqOkNJUC9bUWFwNy85JyMoMXNhbzd3LS5xTlVka0opdENGJiNCXjt4R3ZuMnI5RkVQRkZGY0xALmlGTmtUdmUkbSUjUXZRUzhVQCkyWiszSzpBS001aXNaODgrZEtRKVc2PkolQ0w8S0U+YC5kKihCYC1uOEQ5b0s8VXBdYyRYJCgsKU04WnQ3L1tyZGtxVGdsLTBjdUdNdic/Pi1YVjFxWyctNWsnY0FaNjllO0RfPyRaUFAmc14rN10pJCokI0BRWWk5LDVQJiM5ciskJUNFPTY4Pks4cjA9ZFNDJSUoQHA3Lm03amlsUTAyJzAtVldBZzxhLycnM3UuPTRMJFkpNmsvSzpfWzM9Jmp2TDxMMEMvMid2Ol47LURJQlcsQjRFNjg6a1o7JT84KFE4Qkg9a082NUJXP3hTRyYjQHVVLERTKiw/LisobygjMXZDUzgjQ0hGPlRsR1cnYilUcTdWVDlxXipeJCQuOiZOQEAkJilXSHRQbSo1X3JPMCZlJUsmIy0zMGooRTQjJ1piLm8vKFRwbSQ+SydmQFtQdkZsLGhmSU5UTlU2dScwcGFvNyVYVXA5XTUuPiVoYDhfPVZZYnh1ZWwuTlRTc0pmTGFjRnUzQidsUVN1L202LU9xZW04VCtvRS0tJDBhL2tddWo5RXdzRz4ldmVSKmh2XkJGcFFqOksnI1NKLHNCLScjXShqLkxnOTJyVHctKm4lQC87MzlyckpGLGwjcVYlT3J0QmVDNi8sO3FCM2ViTldbPyxIcWoyTC4xTlAmR2pVUj0xRDhRYVMzVXAmQCo5d1A/K2xvN2I/QCUnazRgcDBaJDIyJUszK2lDWmo/WEpONE5tJitZRl11QC1XJFUlVkVRLywsPj4jKUQ8aCNgKWgwOjxRNjkwOXVhKyZWVSVuMjpjRzNGSi0lQEJqLURnTHJgSHcmSEFLaktqc2VLPC94S1QqKUIsTjlYM11rcmMxMnQncGdUVihMdi10TFt4Z18lPU1fcTdhXng/N1ViZD4jJThjWSNZWj89LGBXZHh1L2FlJiN3NilSODl0SSM2QHMnKDZCZjdhJj9TPV5aSV9rUyZhaWAmPXRFNzJMX0QsO15SKTdbJHM8RWgjYyYpcS5NWEklI3Y5Uk9hNUZaTyVzRjdxN053YiYjcHRVSjphcUplJFNsNjglLkQjIyNFQz48Py1hRiYjUk5Rdj5vOGxLTiU1LyQodmRmcTcrZWJBI3UxcF1vdlVLVyZZJXFdJz4kMUAtW3hmbiQ3WlRwN21NLEcsS283YSZHdSVHW1JNeEpzWzBNTSV3Y2kuTEZESykoPGNgUThOKWpFSUYqKz9QMmE4ZyUpJHFdbzJhSDhDJjxTaWJDL3EsKGU6djstYiM2WyROdERaODRKZTJLTnZCIyRQNT90UTNudCgwZD1qLkxRZi4vTGwzMysoO3EzTC13PThkWCQjV0YmdUlKQC1iZkk+JTpfaTJCNUNzUjgmOVomIz1tUEVubTBmYDwmYylRTDV1SiMldSVsSmorRC1yO0JvRiYjNERvUzk3aDVnKUUjbzomUzR3ZURGLDleSG9lYGgqTCtfYSpOckxXLTFwR18mMlVkQjg2ZSVCLzo9PilONHhlVy4qd2Z0LTskJzU4LUVTcXI8Yj9VSShfJUBbUDQ2PiNVYCc2QVFdbSY2L2BaPiNTP1lZI1ZjO3I3VTImMzI2ZD13JkgjIyMjP1RaYCo0PyYuTUs/TFA4VnhnPiRbUVhjJVFKdjkyLihEYipCKWdiKkJNOWRNKmhKTUFvKmMmI2Iwdj1QamVyXSRnRyZKWERmLT4nU3R2VTc1MDVsOSRBRnZnWVJJXiY8XmI2OD9qI3E5UVg0U00nUk8jJnNMMUlNLnJKZkxVQWoyMjFdZCMjRFc9bTgzdTU7J2JZeCwqU2wwaEwoVzs7JGRvQiZPL1RROihaXnhCZExqTDxMbmk7JydYLmAkIzgrMUdEOmskWVVXc2JuOG9naDZyeFoyWjldJW5kKz5WIyo4VV83MkxoKzJROENqMGk6NmhwJiRDLzpwKEhLPlQ4WVtnSFE0YDQpJyRBYihOb2YlVic4aEwmIzxORWR0ZyhuJz1TMUEoUTEvSSY0KFslZE1gLEl1JzE6X2hMPlNmRDA3JjZEPGZwOGRITTcvZyt0bFBOOUoqckthUGN0Jj8ndUJDZW1eam4lOV9LKTwsQzVLM3M9NWcmR21KYipbU1lxN0s7VFJMR0NzTS0kJDtTJTpZQHI3QUswcHBycEw8THJoLHE3ZS8lS1dLOjUwSV4rbSd2aWAzPyVacCs8LWQrJEwtU3Y6QC5vMTluJHMwJjM5O2tuO1MlQlNxKiQzV29KU0NMd2VWW2FaJ01RSWpPPDc7WC1YOyYrZE1MdnUjXlVzR0VDOVdFY1tYKHdJNyMyLihGMGpWKmVaZjwtUXYzSi1jK0o1QWxyQiMkcChINjhMdkVBJ3EzbjAjbSxbYCo4RnQpRmNZZ0V1ZF1DV2ZtNjgsKGFMQSRARUZUZ0xYb0JxL1VQbHA3OmRbLztyX2l4PTpURmBTNUgtYjxMSSZIWShLPWgjKV1MayRLMTRsVmZtOngkSDwzXlFsPE1gJE9oYXBCbmt1cCdEI0wkUGJfYE4qZ10yZTtYL0R0Zyxic2omSyMyWy06aVlyJ193Z0gpTlVJUjhhMW4jUz9ZZWonaDheNThVYlpkK15GS0QqVEA7NkE3YVFDW0s4ZC0odjZHSSR4OlQ8JidHcDVVZj5ATS4qSjo7JC1ydjI5J01dOHFNdi10THAsJzg4NmlhQz1IYipZSm9LSiwoaiVLPUhgSy52OUhnZ3FCSWladSdRdkJULiM9KTB1a3J1ViYuKTM9KF4xYG8qUGo0PC08YU4oKF43KCcjWjB3SyM1R1hAN3VdW2AqU140MzkzM0E0cmxdW2AqTzRDZ0xFbF12JDFRM0FlRjM3ZGJYaywuKXZqI3gnZGA7cWdiUVIlRlcsMig/TE89cyVTYzY4JU5QJyMjQW90bDh4PUJFI2oxVUQoWzMkTShdVUkyTFgzUnBLTkA7LyNmJ2YvJl9tdCZGKVhkRjw5dDQpUWEuKmtUTHdRJyhUVEI5LnhIJz4jTUorZ0xxOS0jI0BIdVpQTjBddTpoNy5ULi5HOjskL1VzaihUN2BROHRUNzJMbllsPC1xeDg7LUhWN1EtJlhkeCUxYSxoQz0wdStIbHNWPm51SVFMLTU8Tj8pTkJTKVFOKl9JLD8mKTInSU0lTDNJKVgoKGUvZGwyJjgnPE06XiNNKlErW1QuWHJpLkxZUzN2JWZGYDY4aDtiLVhbL0VuJ0NSLnE3RSlwJy9rbGUySE0sdTteJU9LQy1OK0xsJUY5Q0Y8TmYnXiN0MkwsOzI3VzowT0A2IyNVNlc3OiRySmZMV0hqJCMpd29xQmVmSVouUEs8Yip0N2VkO3AqX207NEV4SyNoQCZdPl8+QGtYUXRNYWNmRC5tLVZBYjg7SVJlTTMkd2YwJydocmEqc281NjgnSXAmdlJzODQ5J01SWVNwJTp0Omg1cVNnd3BFciRCPlEsO3MoQyMkKWBzdlF1RiQjIy1ELCMjLGc2OEAyW1Q7LlhTZE45UWUpcnB0Ll9LLSM1d0Ypc1AnIyNwI0MwYyUtR2IlaGQrPC1qJ0FpKngmJkhNa1RdQydPU2wjIzVSR1tKWGFITjtkJ3VBI3guX1U7LmBQVUAoWjNkdDRyMTUyQDp2LCdSLlNqJ3cjMDwtO2tQSSlGZkomI0FZSiYjLy8pPi1rPW09KlhuSyQ+PSk3MkxdMEklPi5HNjkwYTokIyM8LCk7Pzs3MiM/eDkrZDteVic5O2pZQDspYnIjcV5ZUXB4OlgjVGUkWl4nPS09YkdoTGY6RDYmYk53WjktWkQjbl45SGhMTXI1RzsnXWQmNid3WW1URm1MPExEKUZeJVt0Qyc4Oys5RSNDJGclIzVZPnE5d0k+UCg5bUlbPmtDLWVrTEMvUiZDSCtzJ0I7Sy1NNiRFQiVpczAwOitBNFs3eGtzLkxyTmswJkUpd0lMWUZAMkwnME5iJCtwdjwoMi43NjgvRnJZJmgkXjNpJkArRyVKVCc8LSx2YDM7XylJOU1eQUVdQ04/Q2wyQVpnKyU0aVRwVDM8bi0mJUglYjxGRGoyTTxoSD0mRWg8MkxlbiRiKmFUWD0tOFF4TilrMTFJTTFjXmolOXM8TDxORlNvKUI/KzwtKEd4c0YsXi1FaEAkNGRYaE4kKyNyeEs4J2plJ0Q3a2BlOykycFl3UEEnX3A5JkBeMThtbDFeW0BnNHQqW0pPYSpbPVFwNyhxSl9vT0xeKCc3ZkImSHEtOnNmLHNOajh4cV4+JFU0T11HS3gnbTkpYkBwN1lzdkszd15ZUi1DZFEqOklyPCgkdSYpIygmP0w5UmczSCk0ZmlFcF5pSTlPOEtuVGosXUg/RCpyNydNO1B3WjlLMEVeayYtY3BJOy5wLzZfdndvRk1WPC0+IyVYaS5MeFZuclUoNCY4L1ArOmhMU0tqJCNVJV00OXQnSTpyZ01pJ0ZMQGE6MFktdUFbMzknLCh2Ym1hKmhVJTwtU1JGYFR0OjU0MlJfVlYkcEBbcDhEVltBLD8xODM5RldkRjxUZGRGPDlBaC02Jjl0V29EbGhdJjFTcEdNcT5UaTFPKkgmIyhBTDhbX1AlLk0+dl4tKSlxT1QqRjVDcTBgWWUlKyRCNmk6N0AwSVg8TitUKzBNbE1CUFEqVmo+U3NEPFU0SkhZOGtEMikyZlUvTSMkZS4pVDQsXz04aExpbVsmKTs/VWtLJy14PycoOnNpSWZMPCRwRk1gaTw/JVcobUdESE0lPmlXUCwjI1BgJS9MPGVYaTpAWjlDLjdvPUAocFhkQU8vTkxROGxQbCtIUE9RYTh3RDg9XkdsUGE4VEtJMUNqaHNDVFNMSk0nL1dsPi1TKHF3JXNmL0AlI0I2Oy9VN0tddVpiaV5PY14ybjxiaFBtVWtNdz4ldDwpJ21FVkUnJ25gV25KcmEkXlRLdlg1Qj47X2FTRUsnLChod2EwOmk0Rz8uQmNpLihYWz9iKigkLD0tbjwuUSVgKFg9PytAQW0qSnMwJj0zYmg4S11tTDxMb05zJzYsJzg1YDA/dC8nX1U1OUBdZGRGPCNMZEY8ZVdkRjxPdU4vNDVyWTwtTEAmIytmbT42OT1MYixPY1pWLyk7VFRtOFZJOz8lT3RKPChiNG1xN002OnU/S1JkRjxnUkAyTD1GTlUtPGJbKDljL01MM207Wlskb0YzZylHQVdxcEFSYz08Uk91N2NMNWw7LVtBXSUvK2ZzZDtsI1NhZlQvZipXXTA9TyckKFRiPFspKkBlNzc1Ui06WW9iJWcqPmwqOnhQP1liLjUpJXdfST83dWs1SkMrRlMobSNpJ2suJ2EwaSk5PDdiJ2ZzJzU5aHEkKjVVaHYjI3BpXjgraElFQkZgbnZvYDsnbDAuXlMxPC13VUsyL0NvaDU4S0toTGpNPVNPKnJmT2ArcUNgVy1Pbi49QUo1Nj4+aTJAMkxINkE6JjVxYD85STNAQCcwNCZwMi9MVmEqVC00PC1pMztNOVV2WmQrTjc+YiplSXdnOkNDKWM8Pm5PJiM8SUdlO19fLnRoalpsPCV3KFdrMnhtcDRRQEkjSTksREZddTctUD0uLV86WUpdYVNAVj82KkMoKWRPcDc6V0wsYiYzUmcvLmNtTTkmcl4+JCg+LlotSSZKKFEwSGQ1USU3Q28tYmAtYzxOKDZyQGlwK0F1cks8bTg2UUl0aCojdjstT0JxaStMN3dERS1JcjhLWydtK0REU0x3SyYvLj8tViVVXyUzOnFLTnUkX2IqQi1rcDdOYUQnUWRXUVBLWXFbQD5QKWhJOypfRl11YFJiWy5qOF9RLzwmPnV1K1ZzSCRzTTlUQSU/KSh2bUo4MCksUDdFPil0akQlMkw9LXQjZktbJWB2PVE4PEZmTmtnZ15vSWJhaCojOC9RdCRGJjpLKi0oTi8nKzF2TUIsdSgpLWEuVlVVKiNbZSVnQUFPKFM+V2xBMik7U2E+Z1htOFlCYDFkQEsjbl03Ni1hJFUsbUY8ZlhdaWRxZCk8MyxdSjdKbVc0YDZddWtzPTQtNzJMKGpFays6YkowTV5xLThEbV9aPzBvbFAxQzlTYSZIW2QmYyRvb1FVal1FeGQqM1pNQC1XR1cyJXMnLEItX00lPiVVbDojLyd4b0ZNOVFYLSQuUU4nPlslJFokdUY2cEE2S2kyTzU6OHcqdlAxPC0xYFtHLCktbSM+MGBQJiNlYiMuM2kpcnRCNjEobyckP1gzQjwvUjkwO2VaXSVOY3E7LVRsXSNGPjJRZnReYWVfNXRLTDlNVWU5YipzTEVROTVDJmA9Rz9ATWo9d2gqJzNFPj0tPClHdCpJdyknUUc6YEBJd09mNyZdMWknUzAxQitFdi9OYWMjOVM7PTtZUXBnXzZVYCprVlkzOXhLLFsvNkFqNzonMUJtLV8xRVlmYTErbyZvNGhwN0tOX1EoT2xJb0BTJTtqVmRuMCcxPFZjNTI9dWAzXm8tbjEnZzR2NThIaiY2X3Q3JCMjP00pYzwkYmdRXydTWSgoLXhrQSNZKCxwJ0g5cklWWS1iLCclYkNQRjcuSjxVcF4sKGRVMVZZKjUjV2tUVT5oMTl3LFdRaExJKTNTI2YkMihlYixqcipiOzNWd10qN05IJSRjNFZzLGVEOT5YVzg/Tl1vKygqcGdDJS83MkxWLXU8SHAsM0BlXjlVQjFKK2FrOS1UTi9taEtQZytBSllkJE1sdkFGX2pDSyouTy1eKDYzYWRNVC0+VyVpZXdTOFc2bTJydENwbydSUzFSODQ9QHBhVEt0KT49JSYxWykqdnAndSt4LFZyd047Jl1rdU85SkRiZz1wTyRKKi5qVmU7dSdtMGRyOWwsPCp3TUsqT2U9ZzhsVl9LRUJGa08nb1VdXj1bLTc5MiNvaywpaV1sUjhxUTJvQTh3Y1JDWl43dy9Oamg7Py5zdFg/UTE+UzFxNEJuJClLMTwtckdkTyckV3IuTGMuQ0cpJC8qSkw0dE5SLyxTVk8zLGFVdydESk46KVNzO3dHbjlBMzJpanclRkwrWjBGbi5VOTtyZVNxKWJtSTMyVT09NUFMdUcmI1ZmMTM5OC9wVm8xKmMtKGFZMTY4bzxgSnNTYmstLDFOOyQ+MDpPVWFzKDM6OFo5NzJMU2ZGOGViPWMtOz5TUHc3LjZobjNtYDleWGtuKHIucVNbMDtUJSZRYz0rU1RSeFgncTFCTmszJipldTI7JjhxJCZ4PlEjUTdeVGYrNjwoZCVaVm1qMmJEaSUuM0wybis0VyckUGlEREcpZyxyJSs/LCRAP3VvdTV0U2UyYU5fQVFVKjxoYGUtR0k3KT9PSzJBLmQ3X2MpP3dRNUFTQERMM3IjN2ZTa2dsNi0rK0Q6J0EsdXE3U3ZsQiRwY3BIJ3EzbjAjXyVkWSN4Q3ByLWw8RjBOUkAtIyNGRVY2TlRGNiMjJGw4NE4xdz9BTz4nSUFPVVJRIyNWXkZ2LVhGYkdNN0ZsKE48M0RoTEdGJXEuMXJDJCM6VF9fJlBpNjglMHhpXyZbcUZKKDc3al8mSldvRi5WNzM1JlQsW1IqOnhGUipLNT4+I2BiVy0/NE5lXyY2TmVfJjZOZV8mbmBrci0jR0pjTTZYO3VNNlg7dU0oLmEuLl4yVGtMJW9SKCM7dS5UJWZBciU0dEo4Jj48MT1HSFpfK205LyNIMUZeUiNTQyMqTj1CQTkoRD92W1VpRlk+Pl44cCxLS0YuV11MMjl1TGtMbHUvKzRUPFhvSUImaHg9VDFQY0RhQiY7SEgrLUFGcj8obTlIWlYpRktTOEpDdztTRD02W14vRFpVTGBFVURmXUdHbEcmPnckKUYuL15uMytybG8rREI7NXNJWUdOaytpMXQtNjlKZy0tMHBhbzdTbSNLKXBkSFcmO0x1RE5IQEg+Iy9YLVRJKDtQPiMsR2M+IzBTdT4jNGAxPyM4bEM/Izx4VT8jQC5pPyNEOiVAI0hGN0AjTFJJQCNQX1tAI1RrbkAjWHcqQSNdLT1BI2E5T0EjZDxGJiMqO0cjIy5HWSMjMlNsIyM2YCgkIzpsOiQjPnhMJCNCLmAkI0Y6ciQjSkYuJSNOUkAlI1JfUiUjVmtlJSNad3clI18tNCYjM15SaCVTZmxyLWsnTVMubz8uNS9zV2VsL3dwRU0wJTMnLzEpS15mMS1kPkcyMSZ2KDM1PlZgMzlWN0E0PW9ueDRBMU9ZNUVJMDs2SWJncjZNJEhTN1E8KTU4QzV3LDtXb0EqI1slVCojYDFnKiNkPSMrI2hJNSsjbFVHKyNwYlkrI3RubCsjeCQpLCMmMTssIyo9TSwjLklgLCMyVXIsIzZiLi0jO3dbSCNpUXRBI21eMEIjcWpCQiN1dlRCIyMtaEIjJzkkQyMrRTZDIy9RSEMjM15aQyM3am1DIzt2KUQjPyw8RCNDOE5EI0dEYUQjS1BzRCNPXS9FI2cxQTUjS0EqMSNnQzE3I01HZDsjOCgwMiNMLWQzI3JXTTQjSGdhMSMsPHcwI1QuajwjTyMnMiNDWU4xI3FhXjojXzRtMyNvQC89I2VHOD0jdDhKNSNgKzc4IzR1SS0jbTNCMiNTQls4I1EwQDgjaVsqOSNpT244IzFObTsjXnNOOSNxaDw5Izo9eC0jUDtLMiMkJVg5I2JDKy4jUmc7PCNtTj0uI01URi4jUlpPLiMyPyk0I1kjKC8jWykxLyNiO0wvI2RBVS8jMFN2OyNsWSQwI25gLTAjc2Y2MCMoRjI0I3dySDAjJS9lMCNUbUQ8IyVKU01Gb3ZlOkNUQkVYSTo8ZWgyZylCLDNoMl5HM2k7I2QzakQ+KTRrTVlENGxWdWA0bWA6JjVuaVVBNUAoQTVCQTFdUEJCOnhsQkNDPTJDRExYTUNFVXRpQ2YmMGcyJ3ROP1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUC1xZWtDYC45a0VnXitGJGt3VmlGSlRCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1byxePC0yOFpJJ08/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHA7N3EtI2xMWUk6eHZEPSMAI1NDUk9MTFgAI1NDUk9MTFkAI2ltYWdlAFt4XQBbIF0AKHgpACggKQAlLjBmJSUAIHwALS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0AIyNDb21ib18lMDJkACpVbmtub3duIGl0ZW0qAAAAAAEAAABIdwAASHcAAAEAAAAlewAAJXsAAAIAAABIdwAASHcAAAIAAAAlewAAJXsAAAQAAABIdwAASHcAAAQAAAAlewAAJXsAAAgAAAAoewAAKHsAAAgAAAAtewAALXsAAAQAAABLdwAAS3cAAAgAAABLdwAATncAACVkACVmACVsZgAAIyNtaW4AIyNtYXgAJS4wZiBkZWcALQArACUwOFgATTowLjAwMABNOjAwMAAAkHcAAJR3AACYdwAAnHcAACMjWAAjI1kAIyNaACMjVwDQdwAA0HcAANB3AADQdwAA1HcAANp3AADgdwAA5ncAAOx3AADydwAA+HcAAOZ3AAAlM2QAUjolM2QARzolM2QAQjolM2QAQTolM2QASDolM2QAUzolM2QAVjolM2QAAAAweAAAMHgAADB4AAAweAAANngAAD54AABGeAAATngAAFZ4AABeeAAAZngAAE54AAAlMC4zZgBSOiUwLjNmAEc6JTAuM2YAQjolMC4zZgBBOiUwLjNmAEg6JTAuM2YAUzolMC4zZgBWOiUwLjNmAGNvbnRleHQAIyUwMlglMDJYJTAyWCUwMlgAIyUwMlglMDJYJTAyWAAjI1RleHQAJTAyWCUwMlglMDJYJTAyWAAlMDJYJTAyWCUwMlgAIyNDb2xvckJ1dHRvbgBwaWNrZXIAIyNwaWNrZXIAX0NPTDNGAF9DT0w0RgBoc3YAc3YAaHVlAGFscGhhAEN1cnJlbnQAIyNjdXJyZW50AE9yaWdpbmFsACMjb3JpZ2luYWwAIyNyZ2IAIyNoc3YAIyNoZXgA/wAA////AP8A/wD/AP///wAA////AP///wAA/0NvbG9yACMjcHJldmlldwAjJTAyWCUwMlglMDJYClI6ICVkLCBHOiAlZCwgQjogJWQKKCUuM2YsICUuM2YsICUuM2YpACMlMDJYJTAyWCUwMlglMDJYClI6JWQsIEc6JWQsIEI6JWQsIEE6JWQKKCUuM2YsICUuM2YsICUuM2YsICUuM2YpAEg6ICUuM2YsIFM6ICUuM2YsIFY6ICUuM2YASDogJS4zZiwgUzogJS4zZiwgVjogJS4zZiwgQTogJS4zZgBSR0IASFNWAEhleAAwLi4yNTUAMC4wMC4uMS4wMABDb3B5IGFzLi4AQ29weQAoJS4zZmYsICUuM2ZmLCAlLjNmZiwgJS4zZmYpACglZCwlZCwlZCwlZCkAMHglMDJYJTAyWCUwMlgAMHglMDJYJTAyWCUwMlglMDJYACMjc2VsZWN0YWJsZQAjI2R1bW15cGlja2VyAEFscGhhIEJhcgAjIwA+ACNUcmVlUHVzaAAlZDogJTguNGcKJWQ6ICU4LjRnACVkOiAlOC40ZwAlczogJXMAdHJ1ZQBmYWxzZQAlczogJWQAJSVzOiAlcwAlczogJS4zZgAjI01haW5NZW51QmFyACMjbWVudWJhcgAlLipzACoAJXUAJWxsZAAlbGx1ACMjdgAjIzwAIyM+AAAAAACAP83MzD0K1yM8bxKDOhe30TisxSc3vTeGNZW/1jN3zCsyX3CJMGFyZW5hAG9yZGJsa3MAc21ibGtzAGhibGtzAGhibGtoZAB1c21ibGtzAGZzbWJsa3MAdW9yZGJsa3MAZm9yZGJsa3MAa2VlcGNvc3QAbWFsbGluZm8AV3JhcEltR3VpQ29udGV4dAB4AHkASW1WZWMyAFNldABDb3B5AEVxdWFscwB6AHcASW1WZWM0AEltR3VpSW5wdXRUZXh0Q2FsbGJhY2tEYXRhAEV2ZW50RmxhZwBGbGFncwBFdmVudENoYXIARXZlbnRLZXkAQnVmAEJ1ZlRleHRMZW4AQnVmU2l6ZQBCdWZEaXJ0eQBDdXJzb3JQb3MAU2VsZWN0aW9uU3RhcnQAU2VsZWN0aW9uRW5kAERlbGV0ZUNoYXJzAEluc2VydENoYXJzAEhhc1NlbGVjdGlvbgBJbUd1aVNpemVDYWxsYmFja0RhdGEAUG9zAEN1cnJlbnRTaXplAERlc2lyZWRTaXplAEltR3VpTGlzdENsaXBwZXIAU3RhcnRQb3NZAEl0ZW1zSGVpZ2h0AEl0ZW1zQ291bnQAU3RlcE5vAERpc3BsYXlTdGFydABEaXNwbGF5RW5kAFN0ZXAAQmVnaW4ARW5kAEltRHJhd0NtZABFbGVtQ291bnQAQ2xpcFJlY3QAVGV4dHVyZUlkAFZ0eE9mZnNldABJZHhPZmZzZXQASW1EcmF3TGlzdABJdGVyYXRlRHJhd0NtZHMASWR4QnVmZmVyAFZ0eEJ1ZmZlcgBQdXNoQ2xpcFJlY3QAUHVzaENsaXBSZWN0RnVsbFNjcmVlbgBQb3BDbGlwUmVjdABQdXNoVGV4dHVyZUlEAFBvcFRleHR1cmVJRABHZXRDbGlwUmVjdE1pbgBHZXRDbGlwUmVjdE1heABBZGRMaW5lAEFkZFJlY3QAQWRkUmVjdEZpbGxlZABBZGRSZWN0RmlsbGVkTXVsdGlDb2xvcgBBZGRRdWFkAEFkZFF1YWRGaWxsZWQAQWRkVHJpYW5nbGUAQWRkVHJpYW5nbGVGaWxsZWQAQWRkQ2lyY2xlAEFkZENpcmNsZUZpbGxlZABBZGRUZXh0X0EAQWRkVGV4dF9CAEFkZEltYWdlAEFkZEltYWdlUXVhZABBZGRJbWFnZVJvdW5kZWQAQWRkUG9seWxpbmUAQWRkQ29udmV4UG9seUZpbGxlZABBZGRCZXppZXJDdXJ2ZQBQYXRoQ2xlYXIAUGF0aExpbmVUbwBQYXRoTGluZVRvTWVyZ2VEdXBsaWNhdGUAUGF0aEZpbGxDb252ZXgAUGF0aFN0cm9rZQBQYXRoQXJjVG8AUGF0aEFyY1RvRmFzdABQYXRoQmV6aWVyQ3VydmVUbwBQYXRoUmVjdABDaGFubmVsc1NwbGl0AENoYW5uZWxzTWVyZ2UAQ2hhbm5lbHNTZXRDdXJyZW50AEFkZENhbGxiYWNrAEFkZERyYXdDbWQAQ2xlYXIAQ2xlYXJGcmVlTWVtb3J5AFByaW1SZXNlcnZlAFByaW1SZWN0AFByaW1SZWN0VVYAUHJpbVF1YWRVVgBQcmltV3JpdGVWdHgAUHJpbVdyaXRlSWR4AFByaW1WdHgAVXBkYXRlQ2xpcFJlY3QAVXBkYXRlVGV4dHVyZUlEAEltRHJhd0RhdGEASXRlcmF0ZURyYXdMaXN0cwBWYWxpZABDbWRMaXN0c0NvdW50AFRvdGFsSWR4Q291bnQAVG90YWxWdHhDb3VudABEaXNwbGF5UG9zAERpc3BsYXlTaXplAEZyYW1lYnVmZmVyU2NhbGUARGVJbmRleEFsbEJ1ZmZlcnMAU2NhbGVDbGlwUmVjdHMASW1Gb250R2x5cGgAQ29kZXBvaW50AEFkdmFuY2VYAFgwAFkwAFgxAFkxAFUwAFYwAFUxAFYxAEltRm9udENvbmZpZwBGb250RGF0YQBGb250RGF0YU93bmVkQnlBdGxhcwBGb250Tm8AU2l6ZVBpeGVscwBPdmVyc2FtcGxlSABPdmVyc2FtcGxlVgBQaXhlbFNuYXBIAEdseXBoRXh0cmFTcGFjaW5nAEdseXBoT2Zmc2V0AEdseXBoUmFuZ2VzAEdseXBoTWluQWR2YW5jZVgAR2x5cGhNYXhBZHZhbmNlWABNZXJnZU1vZGUAUmFzdGVyaXplckZsYWdzAFJhc3Rlcml6ZXJNdWx0aXBseQBOYW1lAERzdEZvbnQASW1Gb250AEZvbnRTaXplAFNjYWxlAERpc3BsYXlPZmZzZXQASXRlcmF0ZUdseXBocwBGYWxsYmFja0dseXBoAEZhbGxiYWNrQWR2YW5jZVgARmFsbGJhY2tDaGFyAENvbmZpZ0RhdGFDb3VudABJdGVyYXRlQ29uZmlnRGF0YQBBc2NlbnQARGVzY2VudABNZXRyaWNzVG90YWxTdXJmYWNlAENsZWFyT3V0cHV0RGF0YQBCdWlsZExvb2t1cFRhYmxlAEZpbmRHbHlwaABGaW5kR2x5cGhOb0ZhbGxiYWNrAFNldEZhbGxiYWNrQ2hhcgBHZXRDaGFyQWR2YW5jZQBJc0xvYWRlZABHZXREZWJ1Z05hbWUAQ2FsY1RleHRTaXplQQBDYWxjV29yZFdyYXBQb3NpdGlvbkEAUmVuZGVyQ2hhcgBidWZmZXIAYnl0ZU9mZnNldABieXRlTGVuZ3RoAFRPRE86IEZvbnREYXRhICV6dSAlenUKAEltRm9udEF0bGFzAEFkZEZvbnREZWZhdWx0AEFkZEZvbnRGcm9tTWVtb3J5VFRGAENsZWFyVGV4RGF0YQBDbGVhcklucHV0RGF0YQBDbGVhckZvbnRzAEJ1aWxkAElzQnVpbHQAR2V0VGV4RGF0YUFzQWxwaGE4AEdldFRleERhdGFBc1JHQkEzMgBHZXRHbHlwaFJhbmdlc0RlZmF1bHQAR2V0R2x5cGhSYW5nZXNLb3JlYW4AR2V0R2x5cGhSYW5nZXNKYXBhbmVzZQBHZXRHbHlwaFJhbmdlc0NoaW5lc2VGdWxsAEdldEdseXBoUmFuZ2VzQ2hpbmVzZVNpbXBsaWZpZWRDb21tb24AR2V0R2x5cGhSYW5nZXNDeXJpbGxpYwBHZXRHbHlwaFJhbmdlc1RoYWkAR2V0R2x5cGhSYW5nZXNWaWV0bmFtZXNlAExvY2tlZABUZXhJRABUZXhEZXNpcmVkV2lkdGgAVGV4R2x5cGhQYWRkaW5nAFRleFdpZHRoAFRleEhlaWdodABUZXhVdlNjYWxlAFRleFV2V2hpdGVQaXhlbABJdGVyYXRlRm9udHMASW1HdWlJTwBDb25maWdGbGFncwBCYWNrZW5kRmxhZ3MARGVsdGFUaW1lAEluaVNhdmluZ1JhdGUASW5pRmlsZW5hbWUATG9nRmlsZW5hbWUATW91c2VEb3VibGVDbGlja1RpbWUATW91c2VEb3VibGVDbGlja01heERpc3QATW91c2VEcmFnVGhyZXNob2xkAF9nZXRBdF9LZXlNYXAAX3NldEF0X0tleU1hcABLZXlSZXBlYXREZWxheQBLZXlSZXBlYXRSYXRlAFVzZXJEYXRhAEZvbnRzAEZvbnRHbG9iYWxTY2FsZQBGb250QWxsb3dVc2VyU2NhbGluZwBGb250RGVmYXVsdABEaXNwbGF5RnJhbWVidWZmZXJTY2FsZQBNb3VzZURyYXdDdXJzb3IAQ29uZmlnTWFjT1NYQmVoYXZpb3JzAENvbmZpZ0lucHV0VGV4dEN1cnNvckJsaW5rAENvbmZpZ1dpbmRvd3NSZXNpemVGcm9tRWRnZXMAQ29uZmlnV2luZG93c01vdmVGcm9tVGl0bGVCYXJPbmx5AEJhY2tlbmRQbGF0Zm9ybU5hbWUAQmFja2VuZFJlbmRlcmVyTmFtZQBCYWNrZW5kUGxhdGZvcm1Vc2VyRGF0YQBCYWNrZW5kUmVuZGVyZXJVc2VyRGF0YQBCYWNrZW5kTGFuZ3VhZ2VVc2VyRGF0YQBHZXRDbGlwYm9hcmRUZXh0Rm4AU2V0Q2xpcGJvYXJkVGV4dEZuAENsaXBib2FyZFVzZXJEYXRhAE1vdXNlUG9zAF9nZXRBdF9Nb3VzZURvd24AX3NldEF0X01vdXNlRG93bgBNb3VzZVdoZWVsAEtleUN0cmwAS2V5U2hpZnQAS2V5QWx0AEtleVN1cGVyAF9nZXRBdF9LZXlzRG93bgBfc2V0QXRfS2V5c0Rvd24AX2dldEF0X05hdklucHV0cwBfc2V0QXRfTmF2SW5wdXRzAEFkZElucHV0Q2hhcmFjdGVyAEFkZElucHV0Q2hhcmFjdGVyc1VURjgAQ2xlYXJJbnB1dENoYXJhY3RlcnMAV2FudENhcHR1cmVNb3VzZQBXYW50Q2FwdHVyZUtleWJvYXJkAFdhbnRUZXh0SW5wdXQAV2FudFNldE1vdXNlUG9zAFdhbnRTYXZlSW5pU2V0dGluZ3MATmF2QWN0aXZlAE5hdlZpc2libGUARnJhbWVyYXRlAE1ldHJpY3NSZW5kZXJWZXJ0aWNlcwBNZXRyaWNzUmVuZGVySW5kaWNlcwBNZXRyaWNzUmVuZGVyV2luZG93cwBNZXRyaWNzQWN0aXZlV2luZG93cwBNZXRyaWNzQWN0aXZlQWxsb2NhdGlvbnMATW91c2VEZWx0YQBfZ2V0QXRfTW91c2VDbGlja2VkUG9zAF9nZXRBdF9Nb3VzZURvd25EdXJhdGlvbgBfZ2V0QXRfS2V5c0Rvd25EdXJhdGlvbgBfZ2V0QXRfTmF2SW5wdXRzRG93bkR1cmF0aW9uAEltR3VpU3R5bGUAQWxwaGEAV2luZG93UGFkZGluZwBXaW5kb3dSb3VuZGluZwBXaW5kb3dCb3JkZXJTaXplAFdpbmRvd01pblNpemUAV2luZG93VGl0bGVBbGlnbgBXaW5kb3dNZW51QnV0dG9uUG9zaXRpb24AQ2hpbGRSb3VuZGluZwBDaGlsZEJvcmRlclNpemUAUG9wdXBSb3VuZGluZwBQb3B1cEJvcmRlclNpemUARnJhbWVQYWRkaW5nAEZyYW1lUm91bmRpbmcARnJhbWVCb3JkZXJTaXplAEl0ZW1TcGFjaW5nAEl0ZW1Jbm5lclNwYWNpbmcAVG91Y2hFeHRyYVBhZGRpbmcASW5kZW50U3BhY2luZwBDb2x1bW5zTWluU3BhY2luZwBTY3JvbGxiYXJTaXplAFNjcm9sbGJhclJvdW5kaW5nAEdyYWJNaW5TaXplAEdyYWJSb3VuZGluZwBUYWJSb3VuZGluZwBUYWJCb3JkZXJTaXplAEJ1dHRvblRleHRBbGlnbgBTZWxlY3RhYmxlVGV4dEFsaWduAERpc3BsYXlXaW5kb3dQYWRkaW5nAERpc3BsYXlTYWZlQXJlYVBhZGRpbmcATW91c2VDdXJzb3JTY2FsZQBBbnRpQWxpYXNlZExpbmVzAEFudGlBbGlhc2VkRmlsbABDdXJ2ZVRlc3NlbGxhdGlvblRvbABfZ2V0QXRfQ29sb3JzAF9zZXRBdF9Db2xvcnMAU2NhbGVBbGxTaXplcwBJTUdVSV9WRVJTSU9OADEuNzEASU1HVUlfQ0hFQ0tWRVJTSU9OAEltR3VpSU9TaXplAEltR3VpU3R5bGVTaXplAEltVmVjMlNpemUASW1WZWM0U2l6ZQBJbURyYXdWZXJ0U2l6ZQBJbURyYXdJZHhTaXplAEltRHJhd1ZlcnRQb3NPZmZzZXQASW1EcmF3VmVydFVWT2Zmc2V0AEltRHJhd1ZlcnRDb2xPZmZzZXQAQ3JlYXRlQ29udGV4dABEZXN0cm95Q29udGV4dABHZXRDdXJyZW50Q29udGV4dABTZXRDdXJyZW50Q29udGV4dABEZWJ1Z0NoZWNrVmVyc2lvbkFuZERhdGFMYXlvdXQAR2V0SU8AR2V0U3R5bGUAR2V0RHJhd0RhdGEATmV3RnJhbWUAUmVuZGVyAEVuZEZyYW1lAFNob3dEZW1vV2luZG93AFNob3dBYm91dFdpbmRvdwBTaG93TWV0cmljc1dpbmRvdwBTaG93U3R5bGVFZGl0b3IAU2hvd1N0eWxlU2VsZWN0b3IAU2hvd0ZvbnRTZWxlY3RvcgBTaG93VXNlckd1aWRlAEdldFZlcnNpb24AU3R5bGVDb2xvcnNEYXJrAFN0eWxlQ29sb3JzQ2xhc3NpYwBTdHlsZUNvbG9yc0xpZ2h0AEJlZ2luQ2hpbGQARW5kQ2hpbGQAR2V0Q29udGVudFJlZ2lvbk1heABHZXRDb250ZW50UmVnaW9uQXZhaWwAR2V0V2luZG93Q29udGVudFJlZ2lvbk1pbgBHZXRXaW5kb3dDb250ZW50UmVnaW9uTWF4AEdldFdpbmRvd0NvbnRlbnRSZWdpb25XaWR0aABHZXRXaW5kb3dEcmF3TGlzdABHZXRXaW5kb3dQb3MAR2V0V2luZG93U2l6ZQBHZXRXaW5kb3dXaWR0aABHZXRXaW5kb3dIZWlnaHQASXNXaW5kb3dDb2xsYXBzZWQASXNXaW5kb3dBcHBlYXJpbmcAU2V0V2luZG93Rm9udFNjYWxlAFNldE5leHRXaW5kb3dQb3MAU2V0TmV4dFdpbmRvd1NpemUAU2V0TmV4dFdpbmRvd1NpemVDb25zdHJhaW50cwBTZXROZXh0V2luZG93Q29udGVudFNpemUAU2V0TmV4dFdpbmRvd0NvbGxhcHNlZABTZXROZXh0V2luZG93Rm9jdXMAU2V0TmV4dFdpbmRvd0JnQWxwaGEAU2V0V2luZG93UG9zAFNldFdpbmRvd1NpemUAU2V0V2luZG93Q29sbGFwc2VkAFNldFdpbmRvd0ZvY3VzAFNldFdpbmRvd05hbWVQb3MAU2V0V2luZG93TmFtZVNpemUAU2V0V2luZG93TmFtZUNvbGxhcHNlZABTZXRXaW5kb3dOYW1lRm9jdXMAR2V0U2Nyb2xsWABHZXRTY3JvbGxZAEdldFNjcm9sbE1heFgAR2V0U2Nyb2xsTWF4WQBTZXRTY3JvbGxYAFNldFNjcm9sbFkAU2V0U2Nyb2xsSGVyZVkAU2V0U2Nyb2xsRnJvbVBvc1kAU2V0U3RhdGVTdG9yYWdlAEdldFN0YXRlU3RvcmFnZQBQdXNoRm9udABQb3BGb250AFB1c2hTdHlsZUNvbG9yAFBvcFN0eWxlQ29sb3IAUHVzaFN0eWxlVmFyAFBvcFN0eWxlVmFyAEdldFN0eWxlQ29sb3JWZWM0AEdldEZvbnQAR2V0Rm9udFNpemUAR2V0Rm9udFRleFV2V2hpdGVQaXhlbABHZXRDb2xvclUzMl9BAEdldENvbG9yVTMyX0IAR2V0Q29sb3JVMzJfQwBQdXNoSXRlbVdpZHRoAFBvcEl0ZW1XaWR0aABTZXROZXh0SXRlbVdpZHRoAENhbGNJdGVtV2lkdGgAUHVzaFRleHRXcmFwUG9zAFBvcFRleHRXcmFwUG9zAFB1c2hBbGxvd0tleWJvYXJkRm9jdXMAUG9wQWxsb3dLZXlib2FyZEZvY3VzAFB1c2hCdXR0b25SZXBlYXQAUG9wQnV0dG9uUmVwZWF0AFNlcGFyYXRvcgBTYW1lTGluZQBOZXdMaW5lAFNwYWNpbmcARHVtbXkASW5kZW50AFVuaW5kZW50AEJlZ2luR3JvdXAARW5kR3JvdXAAR2V0Q3Vyc29yUG9zAEdldEN1cnNvclBvc1gAR2V0Q3Vyc29yUG9zWQBTZXRDdXJzb3JQb3MAU2V0Q3Vyc29yUG9zWABTZXRDdXJzb3JQb3NZAEdldEN1cnNvclN0YXJ0UG9zAEdldEN1cnNvclNjcmVlblBvcwBTZXRDdXJzb3JTY3JlZW5Qb3MAQWxpZ25UZXh0VG9GcmFtZVBhZGRpbmcAR2V0VGV4dExpbmVIZWlnaHQAR2V0VGV4dExpbmVIZWlnaHRXaXRoU3BhY2luZwBHZXRGcmFtZUhlaWdodABHZXRGcmFtZUhlaWdodFdpdGhTcGFjaW5nAENvbHVtbnMATmV4dENvbHVtbgBHZXRDb2x1bW5JbmRleABHZXRDb2x1bW5XaWR0aABTZXRDb2x1bW5XaWR0aABHZXRDb2x1bW5PZmZzZXQAU2V0Q29sdW1uT2Zmc2V0AEdldENvbHVtbnNDb3VudABQdXNoSUQAUG9wSUQAR2V0SUQAVGV4dFVuZm9ybWF0dGVkAFRleHQAVGV4dFYAVGV4dENvbG9yZWQAVGV4dENvbG9yZWRWAFRleHREaXNhYmxlZABUZXh0RGlzYWJsZWRWAFRleHRXcmFwcGVkAFRleHRXcmFwcGVkVgBMYWJlbFRleHQATGFiZWxUZXh0VgBCdWxsZXRUZXh0AEJ1bGxldFRleHRWAEJ1bGxldABCdXR0b24AU21hbGxCdXR0b24AQXJyb3dCdXR0b24ASW52aXNpYmxlQnV0dG9uAEltYWdlAEltYWdlQnV0dG9uAENoZWNrYm94AENoZWNrYm94RmxhZ3MAUmFkaW9CdXR0b25fQQBSYWRpb0J1dHRvbl9CAFBsb3RMaW5lcwBQbG90SGlzdG9ncmFtAFByb2dyZXNzQmFyAEJlZ2luQ29tYm8ARW5kQ29tYm8AQ29tYm8ARHJhZ0Zsb2F0AERyYWdGbG9hdDIARHJhZ0Zsb2F0MwBEcmFnRmxvYXQ0AERyYWdGbG9hdFJhbmdlMgBEcmFnSW50AERyYWdJbnQyAERyYWdJbnQzAERyYWdJbnQ0AERyYWdJbnRSYW5nZTIARHJhZ1NjYWxhcgBJbnB1dFRleHQASW5wdXRUZXh0V2l0aEhpbnQASW5wdXRUZXh0TXVsdGlsaW5lAElucHV0RmxvYXQASW5wdXRGbG9hdDIASW5wdXRGbG9hdDMASW5wdXRGbG9hdDQASW5wdXRJbnQASW5wdXRJbnQyAElucHV0SW50MwBJbnB1dEludDQASW5wdXREb3VibGUASW5wdXRTY2FsYXIAU2xpZGVyRmxvYXQAU2xpZGVyRmxvYXQyAFNsaWRlckZsb2F0MwBTbGlkZXJGbG9hdDQAU2xpZGVyQW5nbGUAU2xpZGVySW50AFNsaWRlckludDIAU2xpZGVySW50MwBTbGlkZXJJbnQ0AFNsaWRlclNjYWxhcgBWU2xpZGVyRmxvYXQAVlNsaWRlckludABWU2xpZGVyU2NhbGFyAENvbG9yRWRpdDMAQ29sb3JFZGl0NABDb2xvclBpY2tlcjMAQ29sb3JQaWNrZXI0AENvbG9yQnV0dG9uAFNldENvbG9yRWRpdE9wdGlvbnMAVHJlZU5vZGVfQQBUcmVlTm9kZV9CAFRyZWVOb2RlX0MAVHJlZU5vZGVFeF9BAFRyZWVOb2RlRXhfQgBUcmVlTm9kZUV4X0MAVHJlZVB1c2hfQQBUcmVlUHVzaF9CAFRyZWVQb3AAVHJlZUFkdmFuY2VUb0xhYmVsUG9zAEdldFRyZWVOb2RlVG9MYWJlbFNwYWNpbmcAQ29sbGFwc2luZ0hlYWRlcl9BAENvbGxhcHNpbmdIZWFkZXJfQgBTZXROZXh0SXRlbU9wZW4AU2VsZWN0YWJsZV9BAFNlbGVjdGFibGVfQgBMaXN0Qm94X0EATGlzdEJveF9CAExpc3RCb3hIZWFkZXJfQQBMaXN0Qm94SGVhZGVyX0IATGlzdEJveEZvb3RlcgBWYWx1ZV9BAFZhbHVlX0IAVmFsdWVfQwBWYWx1ZV9EAFNldFRvb2x0aXAAQmVnaW5Ub29sdGlwAEVuZFRvb2x0aXAAQmVnaW5NYWluTWVudUJhcgBFbmRNYWluTWVudUJhcgBCZWdpbk1lbnVCYXIARW5kTWVudUJhcgBCZWdpbk1lbnUARW5kTWVudQBNZW51SXRlbV9BAE1lbnVJdGVtX0IAT3BlblBvcHVwAE9wZW5Qb3B1cE9uSXRlbUNsaWNrAEJlZ2luUG9wdXAAQmVnaW5Qb3B1cE1vZGFsAEJlZ2luUG9wdXBDb250ZXh0SXRlbQBCZWdpblBvcHVwQ29udGV4dFdpbmRvdwBCZWdpblBvcHVwQ29udGV4dFZvaWQARW5kUG9wdXAASXNQb3B1cE9wZW4AQ2xvc2VDdXJyZW50UG9wdXAAQmVnaW5UYWJCYXIARW5kVGFiQmFyAEJlZ2luVGFiSXRlbQBFbmRUYWJJdGVtAFNldFRhYkl0ZW1DbG9zZWQATG9nVG9UVFkATG9nVG9GaWxlAExvZ1RvQ2xpcGJvYXJkAExvZ0ZpbmlzaABMb2dCdXR0b25zAExvZ1RleHQAQmVnaW5EcmFnRHJvcFNvdXJjZQBTZXREcmFnRHJvcFBheWxvYWQARW5kRHJhZ0Ryb3BTb3VyY2UAQmVnaW5EcmFnRHJvcFRhcmdldABBY2NlcHREcmFnRHJvcFBheWxvYWQARW5kRHJhZ0Ryb3BUYXJnZXQAR2V0RHJhZ0Ryb3BQYXlsb2FkAFNldEl0ZW1EZWZhdWx0Rm9jdXMAU2V0S2V5Ym9hcmRGb2N1c0hlcmUASXNJdGVtSG92ZXJlZABJc0l0ZW1BY3RpdmUASXNJdGVtRWRpdGVkAElzSXRlbUZvY3VzZWQASXNJdGVtQ2xpY2tlZABJc0l0ZW1WaXNpYmxlAElzSXRlbUFjdGl2YXRlZABJc0l0ZW1EZWFjdGl2YXRlZABJc0l0ZW1EZWFjdGl2YXRlZEFmdGVyRWRpdABJc0FueUl0ZW1Ib3ZlcmVkAElzQW55SXRlbUFjdGl2ZQBJc0FueUl0ZW1Gb2N1c2VkAEdldEl0ZW1SZWN0TWluAEdldEl0ZW1SZWN0TWF4AEdldEl0ZW1SZWN0U2l6ZQBTZXRJdGVtQWxsb3dPdmVybGFwAElzV2luZG93Rm9jdXNlZABJc1dpbmRvd0hvdmVyZWQASXNSZWN0VmlzaWJsZV9BAElzUmVjdFZpc2libGVfQgBHZXRUaW1lAEdldEZyYW1lQ291bnQAR2V0QmFja2dyb3VuZERyYXdMaXN0AEdldEZvcmVncm91bmREcmF3TGlzdABHZXREcmF3TGlzdFNoYXJlZERhdGEAR2V0U3R5bGVDb2xvck5hbWUAQ2FsY1RleHRTaXplAENhbGNMaXN0Q2xpcHBpbmcAQmVnaW5DaGlsZEZyYW1lAEVuZENoaWxkRnJhbWUAQ29sb3JDb252ZXJ0VTMyVG9GbG9hdDQAQ29sb3JDb252ZXJ0RmxvYXQ0VG9VMzIAQ29sb3JDb252ZXJ0UkdCdG9IU1YAQ29sb3JDb252ZXJ0SFNWdG9SR0IAR2V0S2V5SW5kZXgASXNLZXlEb3duAElzS2V5UHJlc3NlZABJc0tleVJlbGVhc2VkAEdldEtleVByZXNzZWRBbW91bnQASXNNb3VzZURvd24ASXNBbnlNb3VzZURvd24ASXNNb3VzZUNsaWNrZWQASXNNb3VzZURvdWJsZUNsaWNrZWQASXNNb3VzZVJlbGVhc2VkAElzTW91c2VEcmFnZ2luZwBJc01vdXNlSG92ZXJpbmdSZWN0AElzTW91c2VQb3NWYWxpZABHZXRNb3VzZVBvcwBHZXRNb3VzZVBvc09uT3BlbmluZ0N1cnJlbnRQb3B1cABHZXRNb3VzZURyYWdEZWx0YQBSZXNldE1vdXNlRHJhZ0RlbHRhAEdldE1vdXNlQ3Vyc29yAFNldE1vdXNlQ3Vyc29yAENhcHR1cmVLZXlib2FyZEZyb21BcHAAQ2FwdHVyZU1vdXNlRnJvbUFwcABHZXRDbGlwYm9hcmRUZXh0AFNldENsaXBib2FyZFRleHQATG9hZEluaVNldHRpbmdzRnJvbU1lbW9yeQBTYXZlSW5pU2V0dGluZ3NUb01lbW9yeQBTZXRBbGxvY2F0b3JGdW5jdGlvbnMATWVtQWxsb2MATWVtRnJlZQDEngAATjEwZW1zY3JpcHRlbjN2YWxFAACY2AAAsJ4AAGlpAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemUAAIifAABOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQBOU3QzX18yMjFfX2Jhc2ljX3N0cmluZ19jb21tb25JTGIxRUVFAAAAAJjYAABXnwAAHNkAABifAAAAAAAAAQAAAICfAAAAAAAAMTZXcmFwSW1HdWlDb250ZXh0AACY2AAAoJ8AAFAxNldyYXBJbUd1aUNvbnRleHQAeNkAALyfAAAAAAAAtJ8AAFBLMTZXcmFwSW1HdWlDb250ZXh0AAAAAHjZAADgnwAAAQAAALSfAAB2AHZpAAAAAIjYAAA2SW1WZWMyAJjYAAAUoAAAUDZJbVZlYzIAAAAAeNkAACSgAAAAAAAAHKAAAFBLNkltVmVjMgAAAHjZAABAoAAAAQAAABygAABmaWkAdmlpZgBB8MACC7ACxJ4AAMSeAADEngAAxJ4AAGlpaWlpAAAAxJ4AAMSeAADEngAAaWlpaQAAAAAE2AAAxJ4AAMSeAAA2SW1WZWM0AJjYAACooAAAUDZJbVZlYzQAAAAAeNkAALigAAAAAAAAsKAAAFBLNkltVmVjNAAAAHjZAADUoAAAAQAAALCgAADEngAAxJ4A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dFNoYXJlZERhdGEAMjBJbURyYXdMaXN0U2hhcmVkRGF0YQAAAJjYAADTvQAAeNkAALu9AAAIAAAA7L0AAIifAABM2AAAAAAAAMSeAACInwAABNgAAHzYAADEngAAaWlpaWZpAAAAAAAA2NcAAEzYAAB82AAAxJ4AAMSeAAB2aWlmaWkAAAAAAAAE2AAAWNgAABygAABM2AAAxJ4AAFjYAADEngAAAAAAANjXAAB82AAAfNgAAHzYAADEngAAxJ4AAMSeAAB2aWZmZmlpaQAAAABM2AAATNgAAATYAABM2AAABNgAAAAAAABM2AAATNgAAHzYAAB82AAAaWlpZmYAAAAE2AAATNgAAHzYAEHg/QILRgTYAADEngAAxJ4AAATYAAAAAAAAIL8AAHgDAAAyM2ltcG9ydF9tYXliZV9udWxsX3ZhbHVlSTZJbVZlYzJFAACY2AAA/L4AQbD+AgsixJ4AAEzYAAB82AAAxJ4AAGlpaWZpAAAAxJ4AAMSeAADk1wBB4P4CC+YJ2NcAAMSeAADEngAAxJ4AAMSeAABw2AAAdm9pZABib29sAGNoYXIAc2lnbmVkIGNoYXIAdW5zaWduZWQgY2hhcgBzaG9ydAB1bnNpZ25lZCBzaG9ydABpbnQAdW5zaWduZWQgaW50AGxvbmcAdW5zaWduZWQgbG9uZwBmbG9hdABkb3VibGUAc3RkOjpzdHJpbmcAc3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4Ac3RkOjp3c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAGVtc2NyaXB0ZW46OnZhbABlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAAAAABzZAACOwgAAAAAAAAEAAACAnwAAAAAAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAAAc2QAA6MIAAAAAAAABAAAAgJ8AAAAAAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQAAABzZAABAwwAAAAAAAAEAAACAnwAAAAAAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEaU5TXzExY2hhcl90cmFpdHNJRGlFRU5TXzlhbGxvY2F0b3JJRGlFRUVFAAAAHNkAAJzDAAAAAAAAAQAAAICfAAAAAAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAACY2AAA+MMAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SW1FRQAAmNgAACDEAEHWiAMLGvA/AAAAAAAA+D8AAAAAAAAAAAbQz0Pr/Uw+AEH7iAML/BVAA7jiPwAAgD8AAMA/AAAAANzP0TUAAAAAAMAVPwAAAAAAAAAAAwAAAAQAAAAEAAAABgAAAIP5ogBETm4A/CkVANFXJwDdNPUAYtvAADyZlQBBkEMAY1H+ALveqwC3YcUAOm4kANJNQgBJBuAACeou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AEGDnwMLkQFA+yH5PwAAAAAtRHQ+AAAAgJhG+DwAAABgUcx4OwAAAICDG/A5AAAAQCAlejgAAACAIoLjNgAAAAAd82k1OGPtPtoPST9emHs/2g/JP2k3rDFoISIztA8UM2ghojPbD0k/2w9Jv+TLFkDkyxbAAAAAAAAAAIDbD0lA2w9JwHJ3YQAtKyAgIDBYMHgAKG51bGwpAEGgoAMLQREACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABAAkLCwAACQYLAAALAAYRAAAAERERAEHxoAMLIQsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwBBq6EDCwEMAEG3oQMLFQwAAAAADAAAAAAJDAAAAAAADAAADABB5aEDCwEOAEHxoQMLFQ0AAAAEDQAAAAAJDgAAAAAADgAADgBBn6IDCwEQAEGrogMLHg8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgBB4qIDCw4SAAAAEhISAAAAAAAACQBBk6MDCwELAEGfowMLFQoAAAAACgAAAAAJCwAAAAAACwAACwBBzaMDCwEMAEHZowMLWAwAAAAADAAAAAAJDAAAAAAADAAADAAAMDEyMzQ1Njc4OUFCQ0RFRi0wWCswWCAwWC0weCsweCAweABpbmYASU5GAG5hbgBOQU4ALgBpbmZpbml0eQBuYW4AQcCkAwvjAtF0ngBXnb0qgHBSD///PicKAAAAZAAAAOgDAAAQJwAAoIYBAEBCDwCAlpgAAOH1BRgAAAA1AAAAcQAAAGv////O+///kr///wAAAAAAAAAA/////////////////////////////////////////////////////////////////wABAgMEBQYHCAn/////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP///////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAQIEBwMGBQAAAKDZAAByd2EAQcynAwsCgwMAQfOnAwsF//////8AQcCoAwvKCgIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADDBQAAwwYAAMMHAADDCAAAwwkAAMMKAADDCwAAwwwAAMMNAADTDgAAww8AAMMAAAy7AQAMwwIADMMDAAzDBAAM02Jhc2ljX3N0cmluZwBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAHZlY3RvcgBfX2N4YV9ndWFyZF9hY3F1aXJlIGRldGVjdGVkIHJlY3Vyc2l2ZSBpbml0aWFsaXphdGlvbgBzdGQ6OmV4Y2VwdGlvbgAAAAAAAAAA0NUAAIQDAACFAwAAhgMAAFN0OWV4Y2VwdGlvbgAAAACY2AAAwNUAAAAAAAD81QAAKwMAAIcDAACIAwAAU3QxMWxvZ2ljX2Vycm9yAMDYAADs1QAA0NUAAAAAAAAw1gAAKwMAAIkDAACIAwAAU3QxMmxlbmd0aF9lcnJvcgAAAADA2AAAHNYAAPzVAABTdDl0eXBlX2luZm8AAAAAmNgAADzWAABOMTBfX2N4eGFiaXYxMTZfX3NoaW1fdHlwZV9pbmZvRQAAAADA2AAAVNYAAEzWAABOMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mb0UAAADA2AAAhNYAAHjWAABOMTBfX2N4eGFiaXYxMTdfX3BiYXNlX3R5cGVfaW5mb0UAAADA2AAAtNYAAHjWAABOMTBfX2N4eGFiaXYxMTlfX3BvaW50ZXJfdHlwZV9pbmZvRQDA2AAA5NYAANjWAABOMTBfX2N4eGFiaXYxMjBfX2Z1bmN0aW9uX3R5cGVfaW5mb0UAAAAAwNgAABTXAAB41gAATjEwX19jeHhhYml2MTI5X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm9FAAAAwNgAAEjXAADY1gAAAAAAAMjXAACKAwAAiwMAAIwDAACNAwAAjgMAAE4xMF9fY3h4YWJpdjEyM19fZnVuZGFtZW50YWxfdHlwZV9pbmZvRQDA2AAAoNcAAHjWAAB2AAAAjNcAANTXAABQdgAAeNkAAODXAAAAAAAA2NcAAERuAACM1wAA9NcAAGIAAACM1wAAANgAAGMAAACM1wAADNgAAGgAAACM1wAAGNgAAGEAAACM1wAAJNgAAHMAAACM1wAAMNgAAHQAAACM1wAAPNgAAGkAAACM1wAASNgAAGoAAACM1wAAVNgAAGwAAACM1wAAYNgAAG0AAACM1wAAbNgAAGYAAACM1wAAeNgAAGQAAACM1wAAhNgAAAAAAACo1gAAigMAAI8DAACMAwAAjQMAAJADAACRAwAAkgMAAJMDAAAAAAAACNkAAIoDAACUAwAAjAMAAI0DAACQAwAAlQMAAJYDAACXAwAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAAAAAMDYAADg2AAAqNYAAAAAAABk2QAAigMAAJgDAACMAwAAjQMAAJADAACZAwAAmgMAAJsDAABOMTBfX2N4eGFiaXYxMjFfX3ZtaV9jbGFzc190eXBlX2luZm9FAAAAwNgAADzZAACo1gAAAAAAAAjXAACKAwAAnAMAAIwDAACNAwAAnQMAQZCzAwsRCAAAAAkAAAAEAAAAAQAAAAUAQayzAwsCfQMAQcSzAwsOfgMAAH8DAADoIQEAAAQAQdyzAwsBAQBB67MDCwUK/////wBBsLQDCwKg2QBB5LUDCwMQJgEAQZy2AwsDMChR";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile);}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(readBinary){return readBinary(wasmBinaryFile)}else {throw "both async and sync fetching of the wasm failed"}}catch(err){abort(err);}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw "failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return Promise.resolve().then(getBinary)}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmTable=Module["asm"]["R"];removeRunDependency();}addRunDependency();function receiveInstantiatedSource(output){receiveInstance(output["instance"]);}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason);})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiatedSource)})});}else {return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return {}}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)();}else {wasmTable.get(func)(callback.arg);}}else {func(callback.arg===undefined?null:callback.arg);}}}function dynCallLegacy(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}return Module["dynCall_"+sig].call(null,ptr)}function dynCall(sig,ptr,args){if(sig.indexOf("j")!=-1){return dynCallLegacy(sig,ptr,args)}return wasmTable.get(ptr).apply(null,args)}var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size){return _malloc(size+ExceptionInfoAttrs.SIZE)+ExceptionInfoAttrs.SIZE}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-ExceptionInfoAttrs.SIZE;this.set_type=function(type){HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]=type;};this.get_type=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]=destructor;};this.get_destructor=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=refcount;};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]=caught;};this.get_caught=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]=rethrown;};this.get_rethrown=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false);};this.add_ref=function(){var value=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=value+1;};this.release_ref=function(){var prev=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=prev-1;return prev===1};}function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);throw ptr}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0;}else {buffer.push(curr);}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function ___sys_fcntl64(fd,cmd,varargs){SYSCALLS.varargs=varargs;return 0}function ___sys_ioctl(fd,op,varargs){SYSCALLS.varargs=varargs;return 0}function ___sys_open(path,flags,varargs){SYSCALLS.varargs=varargs;}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return "_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return "_"+name}else {return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"");}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else {return this.name+": "+this.message}};return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count");}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else {unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else {throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return !!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else {throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right}function shallowCopyInternalPointer(o){return {count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted");}var finalizationGroup=false;function detachFinalizer(handle){}function runDestructor($$){if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else {$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function releaseClassHandle($$){$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$);}}function attachFinalizer(handle){if("undefined"===typeof FinalizationGroup){attachFinalizer=function(handle){return handle};return handle}finalizationGroup=new FinalizationGroup(function(iter){for(var result=iter.next();!result.done;result=iter.next()){var $$=result.value;if(!$$.ptr){console.warn("object already deleted: "+$$.ptr);}else {releaseClassHandle($$);}}});attachFinalizer=function(handle){finalizationGroup.register(handle,handle.$$,handle.$$);return handle};detachFinalizer=function(handle){finalizationGroup.unregister(handle.$$);};return attachFinalizer(handle)}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else {var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return !this.$$.ptr}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!");}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!");}Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr}else {return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal");}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle["delete"]();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError("Unsupporting sharing policy");}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined");}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType");}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified");}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record}}))}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else {var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else {return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else {toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else {return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else {this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else {this["toWireType"]=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol");}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;Module[name].argCount=numArguments;}}function getDynCaller(sig,ptr){assert(sig.indexOf("j")>=0,"getDynCaller should only be called with i64 sigs");var argCache=[];return function(){argCache.length=arguments.length;for(var i=0;i<arguments.length;i++){argCache[i]=arguments[i];}return dynCall(sig,ptr,argCache)}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(){if(signature.indexOf("j")!=-1){return getDynCaller(signature,rawFunction)}return wasmTable.get(rawFunction)}var fp=makeDynCaller();if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction);}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=embind__requireFunction(upcastSignature,upcast);}if(downcast){downcast=embind__requireFunction(downcastSignature,downcast);}rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else {basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}return body.apply(this,arguments)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return [referenceConverter,pointerConverter,constPointerConverter]});}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){assert(argCount>0);var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);var args=[rawConstructor];var destructors=[];whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1));}destructors.length=0;args.length=argCount;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr)};return []});return []});}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired";}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n";}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n";}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired;}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n";}else {for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n";}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else {ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction;}else {proto[methodName].overloadTable[argCount-2]=memberFunction;}return []});return []});}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_);}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name);}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object");}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);},enumerable:true,configurable:true};if(setter){desc.set=function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);};}else {desc.set=function(v){throwBindingError(humanName+" is a read-only property");};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],function(types){var getterReturnType=types[0];var desc={get:function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr))},enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors);};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return []});return []});}function __embind_register_constant(name,type,value){name=readLatin1String(name);whenDependentTypesAreResolved([],[type],function(type){type=type[0];Module[name]=type["fromWireType"](value);return []});}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1}case null:{return 2}case true:{return 3}case false:{return 4}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv},"toWireType":function(destructors,value){return __emval_register(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null});}function _embind_repr(v){if(v===null){return "null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else {return ""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null});}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes);},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return []});}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift};}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true});}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+1;}}}else {var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}str=a.join("");}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}var getLength;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string");}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value)};}else {getLength=function(){return value.length};}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1);}else {if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits");}HEAPU8[ptr+4+i]=charCode;}}else {for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i];}}}if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=function(){return HEAPU16};shift=1;}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=function(){return HEAPU32};shift=2;}registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||HEAP[currentBytePtr>>shift]==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+charSize;}}_free(value);return str},"toWireType":function(destructors,value){if(!(typeof value==="string")){throwBindingError("Cannot pass non-string to C++ string type "+name);}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}});}function requireHandle(handle){if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle);}return emval_handle_array[handle].value}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType));}return impl}function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=__emval_register(destructors);HEAP32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}function __emval_lookupTypes(argCount,argTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i);}return a}function __emval_call(handle,argCount,argTypes,argv){handle=requireHandle(handle);var types=__emval_lookupTypes(argCount,argTypes);var args=new Array(argCount);for(var i=0;i<argCount;++i){var type=types[i];args[i]=type["readValueFromPointer"](argv);argv+=type["argPackAdvance"];}var rv=handle.apply(undefined,args);return __emval_register(rv)}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}else {return symbol}}var emval_methodCallers=[];function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args);}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i]);}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"];}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n";}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n";}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);return __emval_addMethodCaller(invokerFunction)}function __emval_get_property(handle,key){handle=requireHandle(handle);key=requireHandle(key);return __emval_register(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1;}}function __emval_new_array(){return __emval_register([])}function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}function __emval_new_object(){return __emval_register({})}function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;runDestructors(destructors);__emval_decref(handle);}function __emval_set_property(handle,key,value){handle=requireHandle(handle);key=requireHandle(key);value=requireHandle(value);handle[key]=value;}function __emval_strictly_equals(first,second){first=requireHandle(first);second=requireHandle(second);return first===second}function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](argv);return __emval_register(v)}function __emval_typeof(handle){handle=requireHandle(handle);return __emval_register(typeof handle)}function _abort(){abort();}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num);}function abortOnCannotGrowMemory(requestedSize){abort("OOM");}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory();}function _fd_close(fd){return 0}function _fd_read(fd,iov,iovcnt,pnum){var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j]);}num+=len;}HEAP32[pnum>>2]=num;return 0}function _setTempRet0($i){}embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2);}if(enc4!==64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64");}catch(_){buf=new Buffer(s,"base64");}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i);}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}__ATINIT__.push({func:function(){___wasm_call_ctors();}});var asmLibraryArg={"P":___cxa_allocate_exception,"O":___cxa_throw,"r":___sys_fcntl64,"F":___sys_ioctl,"G":___sys_open,"I":__embind_register_bool,"g":__embind_register_class,"m":__embind_register_class_constructor,"d":__embind_register_class_function,"b":__embind_register_class_property,"w":__embind_register_constant,"H":__embind_register_emval,"u":__embind_register_float,"c":__embind_register_function,"i":__embind_register_integer,"h":__embind_register_memory_view,"v":__embind_register_std_string,"p":__embind_register_std_wstring,"J":__embind_register_void,"f":__emval_as,"M":__emval_call,"k":__emval_call_void_method,"o":__emval_decref,"j":__emval_get_method_caller,"n":__emval_get_property,"q":__emval_incref,"K":__emval_new_array,"y":__emval_new_cstring,"Q":__emval_new_object,"N":__emval_run_destructors,"l":__emval_set_property,"x":__emval_strictly_equals,"e":__emval_take_value,"L":__emval_typeof,"D":_abort,"B":_emscripten_memcpy_big,"C":_emscripten_resize_heap,"t":_fd_close,"E":_fd_read,"z":_fd_seek,"s":_fd_write,"a":wasmMemory,"A":_setTempRet0};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return (___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["S"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return (_malloc=Module["_malloc"]=Module["asm"]["T"]).apply(null,arguments)};var _free=Module["_free"]=function(){return (_free=Module["_free"]=Module["asm"]["U"]).apply(null,arguments)};var ___getTypeName=Module["___getTypeName"]=function(){return (___getTypeName=Module["___getTypeName"]=Module["asm"]["V"]).apply(null,arguments)};var ___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=function(){return (___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=Module["asm"]["W"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return (dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["X"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller;};function run(args){if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else {doRun();}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}noExitRuntime=true;run();


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
