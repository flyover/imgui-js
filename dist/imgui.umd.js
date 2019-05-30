(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ImGui = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var require$$0 = {};

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
    var require$$1 = {
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

    var bindImgui = createCommonjsModule(function (module, exports) {
    var Module = (function() {
      var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
      return (
    function(Module) {
      Module = Module || {};

    var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=function(status,toThrow){throw toThrow};Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof commonjsRequire==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){if(!nodeFS)nodeFS=require$$0;if(!nodePath)nodePath=require$$1;filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename);}return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/");}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);Module["quit"]=function(status){process["exit"](status);};Module["inspect"]=function(){return "[Emscripten Module object]"};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)};}Module["readBinary"]=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs;}else if(typeof arguments!="undefined"){Module["arguments"]=arguments;}if(typeof quit==="function"){Module["quit"]=function(status){quit(status);};}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(document.currentScript){scriptDirectory=document.currentScript.src;}if(_scriptDir){scriptDirectory=_scriptDir;}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1);}else{scriptDirectory="";}Module["read"]=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}};}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror();};xhr.onerror=onerror;xhr.send(null);};Module["setWindowTitle"]=function(title){document.title=title;};}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=undefined;var asm2wasmImports={"f64-rem":function(x,y){return x%y},"debugger":function(){debugger}};var setTempRet0=function(value){};if(typeof WebAssembly!=="object"){err("no native wasm support detected");}var wasmMemory;var wasmTable;var ABORT=false;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}else{if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63;}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4;}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer);}var DYNAMIC_BASE=5315584,DYNAMICTOP_PTR=72672;var TOTAL_STACK=5242880;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+INITIAL_TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"];}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=wasmMemory.buffer;}else{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY);}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func);}else{Module["dynCall_vi"](func,callback.arg);}}else{func(callback.arg===undefined?null:callback.arg);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAAB2AyxAWACf38Bf2ACf38AYAJ8fAF8YAF/AX9gAX8AYAN/f38Bf2AEf39/fwBgA39/fwBgAn9/AX1gBH9/f38Bf2AEf399fwBgAn99AX9gA399fQF/YAZ9fX1/f38AYAR/fX9/AGAFf39/fX8AYAABfGADf31/AGAFf39/f38Bf2AIf39/f39/f38Bf2AHf39/f39/fwF/YAZ/f39/f38Bf2AGf398fH9/AX9gCX9/f39/f39/fwF/YAN9f38AYAl/f39/f39/f38AYAZ/f39/f38AYAJ/fQBgAX8BfWAAAX9gAn19AGABfQBgAAF9YAAAYAN/f30Bf2AGf39/fX9/AGAIf399fX1/f38AYAR/fX99AX9gBn9/fX9/fwBgBX9/f399AGAHf39/f31/fQBgBn9/f399fwBgB39/f39/f38AYAd/f39/f399AGAGf39/f399AGAFf39/f38AYAZ/f31/f30AYAV/f31/fwBgCH9/fX9/f31/AGALf39/f39/f39/f38AYAl/f39/f39/fX8AYAh/f39/f399fwBgBH9/f30AYAZ/f319fX8AYAp/f39/f39/f39/AGADf399AGADf35/AX5gBn98f39/fwF/YAF/AXxgA39/fwF9YAR/f319AX9gCH9/fX19f39/AX9gBH9/fX8Bf2AFf399f30Bf2AHf39/fHx/fwF/YAR/f399AX9gBX9/f31/AX9gBn9/f31/fwF/YAp/f39/f39/f39/AX9gA399fQBgB399fX1/f38AYAd/f399fX1/AGAHf39/fX9/fQBgB39/f31/f38AYAl/f399f39/fX8AYAd/f39/f31/AGAIf39/f399f30AYAh/f39/f39/fQBgCH9/f39/f39/AGAKf39/f39/f399fwBgDH9/f39/f39/f39/fwBgDX9/f39/f39/f39/f38AYAN/f3wAYAN/f38BfGABfQF9YAJ9fQF9YAV/fX19fQBgBH9/fX0AYAJ/fQF9YAR9fX19AX9gBX9/f319AGADfX19AX1gAn19AX9gBH19fX0BfWALf319fX19fX19fX8AYAl/f31/f39/fX8AYAp/f31/f39/f31/AGAFf31/f30Bf2AIf399fX9/f38AYAt/f319fX19fX19fQBgCH9/f39/fX1/AGAHf39/fX1/fwBgBX9/fX9/AX9gCH9/f399fX9/AGAHf39/fX19fQBgCn9/fX19fX19fX8AYAx/f319fX19fX19fX8AYAd/fX19fX19AGAEf31/fwF/YAh/f399f39/fQF/YAV/fX9/fwF/YAV/fX5+fwF/YAZ/fX19f30Bf2AGf318fH99AX9gAn98AXxgAn9+AX5gCX9/f399f39/fQF/YAd/f319fX99AX9gCX9/f319fX9/fQF/YAZ/f31/f38Bf2AIf39/fX9/f38Bf2AKf39/f39/f31/fwF/YAl/f39/f399f38Bf2AJf39/fn5/fX9/AX9gCX9/f319f31/fwF/YAl/f398fH99f38Bf2AFfHx8fX0BfWADfHx9AXxgA3x8fAF8YAV9fX19fQF9YAN+fn4BfWADfn5+AX5gBX5+fn19AX1gBX9/f319AX1gB39/f39/f30Bf2AIf39/f39/f30Bf2AGf399fX99AX9gB39/f319f30Bf2AGf399fX9/AX9gB39/f31/fX8AYAl/f39/f399fX8AYAd/f39/fX1/AGAEf319fQF9YAZ/f39/f30Bf2AHf399f39/fQF/YAJ/fgBgA39/fgBgAn9/AX5gBX9/f39/AXxgBn9/f39/fwF8YAJ8fwF8YAN+f38Bf2ACfn8Bf2ABfAF9YAJ9fwF/YAJ9fwF9YAF/AX5gAn9/AXxgBH9/f38BfWAHf398f39/fwF/YAV/f399fQF/YAl/f399fX1/f38Bf2AGf39/fX99AX9gCH9/f398fH9/AX9gBX9/f399AX9gBn9/f399fwF/YAd/f39/fX9/AX9gC39/f39/f39/f39/AX9gCX9/f319fX9/fwBgCH9/f399fX1/AGAHf39/f31/fwBgCH9/f399f399AGAIf39/f31/f38AYAp/f39/fX9/f31/AGAJf39/f39/fX99AGAJf39/f39/f399AGALf39/f39/f39/fX8AAvQDNwNlbnYBYgA2A2VudgFjAE4DZW52AWQAGgNlbnYBZQAEA2VudgFmAAADZW52AWcAUQNlbnYBaABTA2VudgFpAAcDZW52AWoAAANlbnYBawAtA2VudgFsACEDZW52AW0ABwNlbnYBbgAAA2VudgFvAAYDZW52AXAAAANlbnYBcQAaA2VudgFyAAQDZW52AXMABANlbnYBdAAEA2VudgF1AAAI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CwtB/PYBKAIAIQEgAEGcqQQoAgAgAUH/AXFB8gZqEQEAC1oBA38jBCECIwRBEGokBCACQZipBCgCACIDQbAraiAAQQR0aiIAKQIANwIAIAIgACkCCDcCCCACIAIqAgwgA0GQKmoqAgAgAZSUOAIMIAIQoQMhBCACJAQgBAsWACAAIAEpAgA3AgAgACACKQIANwIICwYAQTQQAwsMACAAIAEgACABXRsLxgMBA38gAkGAwABOBEAgACABIAIQIxogAA8LIAAhBCAAIAJqIQMgAEEDcSABQQNxRgRAA0AgAEEDcQRAIAJFBEAgBA8LIAAgASwAADoAACAAQQFqIQAgAUEBaiEBIAJBAWshAgwBCwsgA0F8cSICQUBqIQUDQCAAIAVMBEAgACABKAIANgIAIAAgASgCBDYCBCAAIAEoAgg2AgggACABKAIMNgIMIAAgASgCEDYCECAAIAEoAhQ2AhQgACABKAIYNgIYIAAgASgCHDYCHCAAIAEoAiA2AiAgACABKAIkNgIkIAAgASgCKDYCKCAAIAEoAiw2AiwgACABKAIwNgIwIAAgASgCNDYCNCAAIAEoAjg2AjggACABKAI8NgI8IABBQGshACABQUBrIQEMAQsLA0AgACACSARAIAAgASgCADYCACAAQQRqIQAgAUEEaiEBDAELCwUgA0EEayECA0AgACACSARAIAAgASwAADoAACAAIAEsAAE6AAEgACABLAACOgACIAAgASwAAzoAAyAAQQRqIQAgAUEEaiEBDAELCwsDQCAAIANIBEAgACABLAAAOgAAIABBAWohACABQQFqIQEMAQsLIAQLEgAgAEG0+AE2AgAgAEEEahA+CyoAIAAoAhAQWwRAQQAhAAUgAEEEaiIALAALQQBIBEAgACgCACEACwsgAAsSACAAIAEQ6RAgAEHA+AE2AgALEAAgAC0AASAALQAAQQh0cgsqAQF/IwQhASMEQRBqJAQgASAANgIAQQQQPyIAIAEoAgA2AgAgASQEIAALJQEBfyABKAIAIQIgAEIANwIAIABBADYCCCAAIAFBBGogAhCTAQsIAEEMEANBAAsHACAAQQRqCycBAX8gACgCCCIBBEAgAEEANgIEIABBADYCACABEEEgAEEANgIICwsNACAAKAIIIAFBAnRqCxYAIAAgASoCACAClCABKgIEIAKUEDILKQEC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AhgLBUGgqgQgBCAGcjYCACAAIAI2AgAgAiAANgIYIAIgAjYCDCACIAI2AggLQbyqBEG8qgQoAgBBf2oiADYCACAABEAPC0HkrQQhAANAIAAoAgAiAUEIaiEAIAENAAtBvKoEQX82AgALDQAgACgCCCABQRxsagsNACABQQJ0IABqKgIACzEBAX8jBCEDIwRBEGokBCABKAIAIQEgAyACEHcgACABIAMoAgAQCBBfIAMQMSADJAQLIQAgACgCBCIABH8gACAAQQJtagVBCAsiACABIAAgAUobC88BAgR/AX4CQAJAIAApA3AiBUIAUgRAIAApA3ggBVkNAQsgABDsCyIBQQBIDQAgACgCCCECAkACQCAAKQNwIgVCAFEEQCACIQMMAQUgAiEDIAUgACkDeH0iBSACIAAoAgQiBGusVQ0BIAAgBCAFp0F/amo2AmgLDAELIAAgAjYCaAsgAwRAIAAgACkDeCADQQFqIAAoAgQiAGusfDcDeAUgACgCBCEACyAAQX9qIgAtAAAgAUcEQCAAIAE6AAALDAELIABBADYCaEF/IQELIAELIABDAAAAAEMAAIA/IAAgAEMAAIA/XhsgAEMAAAAAXRsLCgAgACgCAEECRguOAQEDfwJAAkAgACICQQNxRQ0AIAIhAQNAAkAgACwAAEUEQCABIQAMAQsgAEEBaiIAIgFBA3ENAQwCCwsMAQsDQCAAQQRqIQEgACgCACIDQYCBgoR4cUGAgYKEeHMgA0H//ft3anFFBEAgASEADAELCyADQf8BcQRAA0AgAEEBaiIALAAADQALCwsgACACawsVACAAIAEgAhAyIABBCGogAyAEEDILGwAgAUEAIABBwANqEHAoAgAQuwEiABC0AiAACwkAIAAgATYCAAsQAEGYqQQoAgBBlDNqKAIAC+IBAQJ/QZipBCgCACIEQZQzaigCACEDIAEEQAJAIAMgAygCuAIgAygCwAJyNgLAAiAEQaQ1aigCACABRwRAIARBgDZqLAAARQ0BCyAEQaA1aigCACIEKAL4BSADKAL4BUYEQCADIARHBEAgBCgCCCADKAIIckGAgIAEcUUNAgsgAyACIAAgAhsgARDmEAsLCyADIAE2AowCIAMgACkCADcClAIgAyAAKQIINwKcAiADQQA2ApACIAAgARCtBQR/QQAFIAAgAEEIakEBEIUDBEAg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QbCqBEEANgIAIAEgAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsMAQsCQEGoqgQoAgAiASAFSwRAQaiqBCABIAVrIgI2AgAMAQsgCiEAQfStBCgCAAR/QfytBCgCAAVB/K0EQYAgNgIAQfitBEGAIDYCAEGArgRBfzYCAEGErgRBfzYCAEGIrgRBADYCAEHYrQRBADYCAEH0rQQgAEFwcUHYqtWqBXM2AgBBgCALIgAgBUEvaiIHaiICQQAgAGsiBnEiBCAFTQRADAMLQdStBCgCACIABEBBzK0EKAIAIgMgBGoiCCADTSAIIABLcgRADAQLCyAFQTBqIQgCQAJAQditBCgCAEEEcQRAQQAhAgUCQAJAAkBBtKoEKAIAIgBFDQBB3K0EIQMDQAJAIAMoAgAiCSAATQRAIAkgAygCBGogAEsNAQsgAygCCCIDDQEMAgsLIAIgAWsgBnEiAkH/////B0kEQCACEMECIQEgASADKAIAIAMoAgRqRw0CIAFBf0cNBQVBACECCwwCC0EAEMECIgFBf0YEf0EABUHMrQQoAgAiAyABQfitBCgCACIAQX9qIgJqQQAgAGtxIAFrQQAgASACcRsgBGoiAmohACACQf////8HSSACIAVLcQR/QdStBCgCACIGBEAgACADTSAAIAZLcgRAQQAhAgwFCwsgASACEMECIgBGDQUgACEBDAIFQQALCyECDAELIAFBf0cgAkH/////B0lxIAggAktxRQRAIAFBf0YEQEEAIQIMAgUMBAsAC0H8rQQoAgAiACAHIAJrakEAIABrcSIAQf////8HTw0CQQAgAmshAyAAEMECQX9GBH8gAxDBAhpBAAUgACACaiECDAMLIQILQditBEHYrQQoAgBBBHI2AgALIARB/////wdJBEAgBBDBAiEBQQAQwQIiACABayIDIAVBKGpLIQQgAyACIAQbIQIgBEEBcyABQX9GciABQX9HIABBf0dxIAEgAElxQQFzckUNAQsMAQtBzK0EQcytBCgCACACaiIANgIAIABB0K0EKAIASwRAQdCtBCAANgIAC0G0qgQoAgAiBARAAkBB3K0EIQMCQAJAA0AgAygCACIHIAMoAgQiBmogAUYNASADKAIIIgMNAAsMAQsgAyIAKAIMQQhxRQRAIAcgBE0gASAES3EEQCAAIAIgBmo2AgQgBEEAIARBCGoiAGtBB3FBACAAQQdxGyIBaiEAQaiqBCgCACACaiICIAFrIQFBtKoEIAA2AgBBqKoEIAE2AgAgACABQQFyNgIEIAIgBGpBKDYCBEG4qgRBhK4EKAIANgIADAMLCwsgAUGsqgQoAgBJBEBBrKoEIAE2AgALIAEgAmohAEHcrQQhAwJAAkADQCADKAIAIABGDQEgAygCCCIDDQALDAELIAMoAgxBCHFFBEAgAyABNgIAIAMgAygCBCACajYCBCABQQAgAUEIaiIBa0EHcUEAIAFBB3EbaiIJIAVqIQYgAEEAIABBCGoiAWtBB3FBACABQQdxG2oiAiAJayAFayEDIAkgBUEDcjYCBCACIARGBEBBqKoEQaiqBCgCACADaiIANgIAQbSqBCAGNgIAIAYgAEEBcjYCBAUCQEGwqgQoAgAgAkYEQEGkqgRBpKoEKAIAIANqIgA2AgBBsKoEIAY2AgAgBiAAQQFyNgIEIAAgBmogADYCAAwBCyACKAIEIgtBA3FBAUYEQCALQQN2IQQgC0GAAkkEQCACKAIIIgAgAigCDCIBRgRAQZyqBEGcqgQoAgBBASAEdEF/c3E2AgAFIAAgATYCDCABIAA2AggLBQJAIAIoAhghCCACKAIMIgAgAkYEQAJAIAIiBEEQaiIBQQRqIgUoAgAiAARAIAUhAQUgBCgCECIARQRAQQAhAAwCCwsDQAJAIABBFGoiBygCACIERQRAIABBEGoiBygCACIERQ0BCyAHIQEgBCEADAELCyABQQA2AgALBSACKAIIIgEgADYCDCAAIAE2AggLIAhFDQAgAigCHCIBQQJ0QcysBGoiBCgCACACRgRAAkAgBCAANgIAIAANAEGgqgRBoKoEKAIAQQEgAXRBf3NxNgIADAILBSAIQRBqIAhBFGogCCgCECACRhsgADYCACAARQ0BCyAAIAg2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAigCFCIBRQ0AIAAgATYCFCABIAA2AhgLCyACIAtBeHEiAGohAiAAIANqIQMLIAIgAigCBEF+cTYCBCAGIANBAXI2AgQgAyAGaiADNgIAIANBA3YhASADQYACSQRAIAFBA3RBxKoEaiEAQZyqBCgCACICQQEgAXQiAXEEfyAAQQhqIQIgACgCCAVBnKoEIAEgAnI2AgAgAEEIaiECIAALIQEgAiAGNgIAIAEgBjYCDCAGIAE2AgggBiAANgIMDAELIANBCHYiAAR/IANB////B0sEf0EfBSAAIABBgP4/akEQdkEIcSIBdCICQYDgH2pBEHZBBHEhACADQQ4gAiAAdCICQYCAD2pBEHZBAnEiBCAAIAFycmsgAiAEdEEPdmoiAEEHanZBAXEgAEEBdHILBUEACyIBQQJ0QcysBGohACAGIAE2AhwgBkEANgIUIAZBADYCEEGgqgQoAgAiAkEBIAF0IgRxRQRAQaCqBCACIARyNgIAIAAgBjYCACAGIAA2AhggBiAGNgIMIAYgBjYCCAwBCyAAKAIAIgAoAgRBeHEgA0YEQCAAIQEFAkAgA0EAQRkgAUEBdmsgAUEfRht0IQIDQCAAQRBqIAJBH3ZBAnRqIgQoAgAiAQRAIAJBAXQhAiABKAIEQXhxIANGDQIgASEADAELCyAEIAY2AgAgBiAANgIYIAYgBjYCDCAGIAY2AggMAgsLIAEoAggiACAGNgIMIAEgBjYCCCAGIAA2AgggBiABNgIMIAZBADYCGAsLIAokBCAJQQhqDwsLQdytBCEDA0ACQCADKAIAIgAgBE0EQCAAIAMoAgRqIgcgBEsNAQsgAygCCCEDDAELC0G0qgRBACABQQhqIgBrQQdxQQAgAEEHcRsiACABaiIDNgIAQaiqBCACQVhqIgYgAGsiADYCACADIABBAXI2AgQgASAGakEoNgIEQbiqBEGErgQoAgA2AgAgBEEAIAdBUWoiAEEIaiIDa0EHcUEAIANBB3EbIABqIgAgACAEQRBqSRsiA0EbNgIEIANB3K0EKQIANwIIIANB5K0EKQIANwIQQdytBCABNgIAQeCtBCACNgIAQeitBEEANgIAQeStBCADQQhqNgIAIANBGGohAQNAIAFBBGoiAEEHNgIAIAFBCGogB0kEQCAAIQEMAQsLIAMgBEcEQCADIAMoAgRBfnE2AgQgBCADIARrIgBBAXI2AgQgAyAANgIAIABBA3YhASAAQYACSQRAIAFBA3RBxKoEaiEAQZyqBCgCACICQQEgAXQiAXEEfyAAQQhqIQMgACgCCAVBnKoEIAEgAnI2AgAgAEEIaiEDIAALIQEgAyAENgIAIAEgBDYCDCAEIAE2AgggBCAANgIMDAILIABBCHYiAQR/IABB////B0sEf0EfBSABIAFBgP4/akEQdkEIcSICdCIDQYDgH2pBEHZBBHEhASAAQQ4gAyABdCIDQYCAD2pBEHZBAnEiByABIAJycmsgAyAHdEEPdmoiAUEHanZBAXEgAUEBdHILBUEACyICQQJ0QcysBGohASAEIAI2AhwgBEEANgIUIARBADYCEEGgqgQoAgAiA0EBIAJ0IgdxRQRAQaCqBCADIAdyNgIAIAEgBDYCACAEIAE2AhggBCAENgIMIAQgBDYCCAwCCyABKAIAIgEoAgRBeHEgAEYEQCABIQIFAkAgAEEAQRkgAkEBdmsgAkEfRht0IQMDQCABQRBqIANBH3ZBAnRqIgcoAgAiAgRAIANBAXQhAyACKAIEQXhxIABGDQIgAiEBDAELCyAHIAQ2AgAgBCABNgIYIAQgBDYCDCAEIAQ2AggMAwsLIAIoAggiACAENgIMIAIgBDYCCCAEIAA2AgggBCACNgIMIARBADYCGAsLBUGsqgQoAgAiAEUgASAASXIEQEGsqgQgATYCAAtB3K0EIAE2AgBB4K0EIAI2AgBB6K0EQQA2AgBBwKoEQfStBCgCADYCAEG8qgRBfzYCAEHQqgRBxKoENgIAQcyqBEHEqgQ2AgBB2KoEQcyqBDYCAEHUqgRBzKoENgIAQeCqBEHUqgQ2AgBB3KoEQdSqBDYCAEHoqgRB3KoENgIAQeSqBEHcqgQ2AgBB8KoEQeSqBDYCAEHsqgRB5KoENgIAQfiqBEHsqgQ2AgBB9KoEQeyqBDYCAEGAqwRB9KoENgIAQfyqBEH0qgQ2AgBBiKsEQfyqBDYCAEGEqwRB/KoENgIAQZCrBEGEqwQ2AgBBjKsEQYSrBDYCAEGYqwRBjKsENgIAQZSrBEGMqwQ2AgBBoKsEQZSrBDYCAEGcqwRBlKsENgIAQairBEGcqwQ2AgBBpKsEQZyrBDYCAEGwqwRBpKsENgIAQayrBEGkqwQ2AgBBuKsEQayrBDYCAEG0qwRBrKsENgIAQcCrBEG0qwQ2AgBBvKsEQbSrBDYCAEHIqwRBvKsENgIAQcSrBEG8qwQ2AgBB0KsEQcSrBDYCAEHMqwRBxKsENgIAQdirBEHMqwQ2AgBB1KsEQcyrBDYCAEHgqwRB1KsENgIAQdyrBEHUqwQ2AgBB6KsEQdyrBDYCAEHkqwRB3KsENgIAQfCrBEHkqwQ2AgBB7KsEQeSrBDYCAEH4qwRB7KsENgIAQfSrBEHsqwQ2AgBBgKwEQfSrBDYCAEH8qwRB9KsENgIAQYisBEH8qwQ2AgBBhKwEQfyrBDYCAEGQrARBhKwENgIAQYysBEGErAQ2AgBBmKwEQYysBDYCAEGUrARBjKwENgIAQaCsBEGUrAQ2AgBBnKwEQZSsBDYCAEGorARBnKwENgIAQaSsBEGcrAQ2AgBBsKwEQaSsBDYCAEGsrARBpKwENgIAQbisBEGsrAQ2AgBBtKwEQaysBDYCAEHArARBtKwENgIAQbysBEG0rAQ2AgBByKwEQbysBDYCAEHErARBvKwENgIAQbSqBEEAIAFBCGoiAGtBB3FBACAAQQdxGyIAIAFqIgQ2AgBBqKoEIAJBWGoiAiAAayIANgIAIAQgAEEBcjYCBCABIAJqQSg2AgRBuKoEQYSuBCgCADYCAAtBqKoEKAIAIgAgBUsEQEGoqgQgACAFayICNgIADAILC0GIqgRBDDYCAAwCC0G0qgRBtKoEKAIAIgEgBWoiADYCACAAIAJBAXI2AgQgASAFQQNyNgIECyAKJAQgAUEIag8LIAokBEEACxcAIABB9PcBNgIAIAAgATYCCCAAEOYHCywAQZipBCgCACIAQcYzakEBOgAAIABBlDNqKAIAIgAgACgCkAJBBHI2ApACCwkAIAAoAgAQJwsoAQJ/An8jBCEDIwRBEGokBCAAQQRBwNQBQYHLAkENIAEQAiADCyQECzIBAn8QPCEBIABDAAAAAFsEQCABKgKgBCEACyABQewCaiICIAA4AgAgAUGAA2ogAhB4Cw0AIAAoAgggAUEEdGoLKwECfyMEIQEjBEEQaiQEIAEQYCICIAAQwBE2AgAgAkHAA2ogARB4IAEkBAs1ACAAKAIIQYAIcQR9IAAqAswCIAAQ5QGSQZipBCgCAEHIKmoqAgBDAAAAQJSSBUMAAAAACwsUACABIAIgACAAIAJKGyAAIAFIGwtRAQF8IAAgAKIiACAAoiEBRAAAAAAAAPA/IABEgV4M/f//3z+ioSABREI6BeFTVaU/oqAgACABoiAARGlQ7uBCk/k+okQnHg/oh8BWv6CioLYLSwECfCAAIACiIgEgAKIiAiABIAGioiABRKdGO4yHzcY+okR058ri+QAqv6CiIAIgAUSy+26JEBGBP6JEd6zLVFVVxb+goiAAoKC2C54BAQN/AkACQEGYqQQoAgAiAEH4MmoiASgCAEECTg0AIAAsAAJFDQAMAQsgAEGUM2ooAgAiAigCvAMEQBDmBgsQ6gEgAigCCEGAgIAIcUUEQBDlBgsgASABKAIAQX9qNgIAIAIoAghBgICAIHEEQCAAQag0aiIAIAAoAgBBf2o2AgALIAJBABDtBiABEH4Ef0EABSABEHAoAgALEP4ECws1AQF/IwQhAyMEQRBqJAQgACgCACEAIAMgAhA0IAEgAyAAQf8BcUHyBmoRAQAgAxAxIAMkBAsOACAAKAIAIAEoAgAQJgsOACAAEPcBIAEgABCBEQsyAQF/IwQhAyMEQRBqJAQgASgCACEBIAMgAhCxBSAAIAEgAygCABAIEF8gAxAxIAMkBAs2AQJ/IwQhAyMEQRBqJAQCfyAAKAIAIQQgAyABELEFIAQLIAMoAgAgAigCABALIAMQMSADJAQLKAECfwJ/IwQhAyMEQRBqJAQgAEECQdD9AUGa1gJBAyABEAIgAwskBAsoAQJ/An8jBCEDIwRBEGokBCAAQQFB1PsBQbDTAkEbIAEQAiADCyQEC50CAgh/AX0jBCEFIwRBIGokBEGYqQQoAgAiBEGUM2ooAgAhAyACBH8gAgUgAUEAEJABCyEGIAAEQCAAKgIEIgsgAyoCgAJDAACAP5JeIQggAyALOAKAAgsgBEHg2ABqIgIoAgAiACADKAKEAiIDSgRAIAIgAzYCACADIQALIAVBEGohBCAFIQIgAyAAa0ECdCEJIAEhAANAIABBCiAGIABrEOkBIgMgBiADGyIDIAZGIgogACADRnFFBEAgAyAAayEHIAggACABR3IEQCACIAk2AgAgAkGargQ2AgQgAiAHNgIIIAIgADYCDEHEiwIgAhCmAwUgBCAHNgIAIAQgATYCBEHNiwIgBBCmAwsLIANBAWohACAKRQ0ACyAFJAQLogEBBH8QPCwAf0UEQEGYqQQoAgAhCBC8ASAAEL0BIAMQsAMgAUEMbEGAyAFqKAIAIQogA0EASgRAIAhB3CpqIQtBACEIA0AgCRDQAUH2nQIgASACIAQgBSAGIAcQ1AMgCHIhCEMAAAAAIAsqAgAQaxB5EIoBIAIgCmohAiAJQQFqIgkgA0cNAAsFQQAhCAsQeSAAIABBABCQARC5ARCxAQsgCAuiAQEEfxA8LAB/RQRAQZipBCgCACEIELwBIAAQvQEgAxCwAyABQQxsQYDIAWooAgAhCiADQQBKBEAgCEHcKmohC0EAIQgDQCAJENABQfadAiABIAIgBCAFIAYgBxC2BCAIciEIQwAAAAAgCyoCABBrEHkQigEgAiAKaiECIAlBAWoiCSADRw0ACwVBACEICxB5IAAgAEEAEJABELkBELEBCyAIC6QBAQR/EDwsAH9FBEBBmKkEKAIAIQkQvAEgABC9ASADELADIAFBDGxBgMgBaigCACELIANBAEoEQCAJQdwqaiEMQQAhCQNAIAoQ0AFB9p0CIAEgAiAEIAUgBiAHIAgQvwQgCXIhCUMAAAAAIAwqAgAQaxB5EIoBIAIgC2ohAiAKQQFqIgogA0cNAAsFQQAhCQsQeSAAIABBABCQARC5ARCxAQsgCQsvAQF/IAAoAggiASAAKAIERgRAIAAgACgCACIBNgIIIAAgATYCBAUgACABNgIACwsQACAAKAIMIAFBAXRqLgEAC5YBAQR/IAAgAWpBBGoQSiIDQf//A3EhBCABQQxqIQUgA0H//wNxBH8CfyACLAAAIQZBACEBA0ACQCAAIAUgAUEEdGpqIgMtAAAgBkYEQCADLQABIAIsAAFGBEAgAy0AAiACLAACRgRAIAMtAAMgAiwAA0YNAwsLCyABQQFqIgEgBEkNAUEADAILCyADQQhqEMMBCwVBAAsLTQEDfyMEIQEjBEEQaiQEQZipBCgCACECIAEgACkCADcCACABIAApAgg3AgggASACQZAqaioCACABKgIMlDgCDCABEKEDIQMgASQEIAMLFwBBmKkEKAIAQbgxaioCACAAKgLsBJQLBgBBPBADCwgAQRMQA0EACyEAIABBAEgEf0EABSAAQZipBCgCAEGMAmpqLAAAQQBHCwv+AQEDfyABQf8BcSEEAkACQAJAIAJBAEciAyAAQQNxQQBHcQRAIAFB/wFxIQUDQCAFIAAtAABGDQIgAkF/aiICQQBHIgMgAEEBaiIAQQNxQQBHcQ0ACwsgA0UNAQsgAUH/AXEiASAALQAARgRAIAJFDQEMAgsgBEGBgoQIbCEDAkACQCACQQNNDQADQCAAKAIAIANzIgRBgIGChHhxQYCBgoR4cyAEQf/9+3dqcUUEQAEgAEEEaiEAIAJBfGoiAkEDSw0BDAILCwwBCyACRQ0BCwNAIAAtAAAgAUH/AXFGDQIgAkF/aiICRQ0BIABBAWohAAwAAAsAC0EAIQALIAALRQECfyMEIQAjBEEQaiQEEDwiASgC9AQQ9QMgACABKAL0BEE8ahD9AhDGAiABIAApAgA3AswDIAEgACkCCDcC1AMgACQEC+Q7Ay9/AX4FfSMEIQ8jBEHwAWokBCAPQdgAaiEEIA9ByABqIQggD0FAayEHQZipBCgCACEFIA9B6AFqIgMgABChAiIGNgIAIAZFIhEEQCAFQbg0aigCAARAIAggBUHgNGopAgAiMjcDAAUgCEMAAAAAQwAAAAAQMiAIKQMAITILIAcgMjcDACAEIAcpAgA3AgAgAyAAIAQgAhC0CiIGNgIACyACQQZyIAIgAkGAhDBxQYCEMEYbIQogBUHIMmooAgAiEyAGKAKcBEciDARAIAYgCjYCCAUgBigCCCEKCyAFQfgyaiIHEH4Ef0EABSAHEHAoAgALIQkgDAR/IAMoAgAhAiAJQQAgCkGAgIAocRsFIAMoAgAiCSECIAkoAuwFCyEUIAIgAUEARyIgOgCCASACKAKcBCATQX9qSCEZIAIoAqgBIQsgCkGAgIAgcUEARyIOBEAgBUGcNGogBUGoNGooAgAQeiEJIAMoAgAiBiECIBkgBigCjAEgCSgCAEdyIAYgCSgCBEdyIRkLIAIgC0EASiIbIBlyIglBAXE6AIABIAkEQCACQQhBARD/BAsgByADEHggAygCABD+BCADKAIAQQEQ7QYgDgRAIAVBnDRqIAVBqDRqIgcoAgAQeiICIAMoAgA2AgQgByACEOwGIAMoAgAgAigCADYCjAELIBsgCkGAgIAIcSIeRSImcQRAIAMoAgBBADYCgAYLIAVBtDRqIicoAgAiBwRAAkAgByADKAIAIgIoAqwBIglxQQBHIg0EQCAFQdg0aiIGEJ0CQ6zFJzdeBEAgAiAFQdA0aikCADcCuAEgAiAGKQIANwLAASACIAlBcXE2AqwBQQEhDQwCCwsgAiAFQdA0aiAHEL8DCwsgBUG4NGooAgAiAgRAIAIgAygCACIHKAKwAXEEfyAFQeQ0aioCAEMAAAAAXiESIAVB4DRqKgIAQwAAAABeBUEACyEGIAcgBUHgNGogAhD9BAVBACEGCyAFQbw0aigCAARAIAMoAgAiAiAFQeg0aikCACIyNwI0IDJCIIinvkMAAAAAXARAIAIQvwEgAygCABDRAZIhMyADKAIAIgIgMyACKgI4kjgCOAsFIAwEQCAEQwAAAABDAAAAABAyIAMoAgAgBCkDADcCNAsLIAVBwDRqKAIAIgIEQCADKAIAIAVB8DRqLAAAQQBHIAIQ+wQLIAVByDRqKAIABEAgAygCABB0CyADKAIAIgIsAIABBEAgAkEIQQAQ/wQLIA9B0AFqIRUgD0HIAWohCSAPQdgBaiEdIA9BIGohFyAPIgdBoAFqIRggB0EQaiEQIAdBkAFqIQsgB0GIAWohFiAHQYABaiEaIAdB+ABqIRwgB0G4AWohISAHQbABaiEiIAdB8ABqISMgB0HoAGohJCAUQQBHISUgDARAIAMoAgAgCiAUELUKIAMoAgAiAkEBOgB6IAJBADsBhgEgBUGQM2oiHygCACEMIB8gDEEBajYCACACIAw7AYgBIAJBADsBhAEgCEP//3//Q///f/9D//9/f0P//39/EDYgBCAIEMYCIAMoAgAiAiAEKQIANwLMAyACIAQpAgg3AtQDIAIgEzYCnAQgAkHAA2oiAigCBEEBSARAIAIgAkEBEFgQhQILIAJBATYCACADKAIAIQIgBUHkNWooAgAEQCACKAIIQYCAIHFBAEcgEXJFBEAgACACKAIAIgwQhwIEQCAEIAIoAkw2AgAgDCAEIAAQnAohAiADKAIAIAI2AgAgAygCACICIAQoAgA2AkwLCwsgBCACEO8GIAMoAgAiAiAEKQMANwIsIAIoAqQBIgxBAEoEQCACIAxBf2o2AqQBCyAGIBJxIBFBAXNyIgxBAXMgAigCqAEiEUEASnIEQCACIBFBf2pBASAMGzYCqAELIApBgICAMHEiEUUgGUEBc3JFBEACQCACQQE2AqgBIApBwABxRQ0AIAZFBEAgAkMAAAAAOAIcIAJDAAAAADgCFAsgEkUEQCACQwAAAAA4AiAgAkMAAAAAOAIYCyAEQwAAAABDAAAAABAyIAMoAgAiAiAEKQMANwIsCwsgAhD+BCADKAIAIgIgHkEARyIMBH8gBUG4KmoFIAVBwCpqIAVBoCpqIApBgICAwABxRSARQQBHcRsLKAIAIhE2AkggAiAFQZQqaikCADcCPCAKQYCAhChxQYCAgAhGIBG+QwAAAABbcQRAIARDAAAAACAKQYAIcQR9IAVBmCpqKgIABUMAAAAACxAyIAMoAgAiAiAEKQMANwI8CyACIAIqAjwgBUHUKmoiHioCABA5IAVBkDVqKgIAEDk4AsgCIAIgBUGUNWooAgA2AswCIApBAXFBAEciEUEBcyIfIApBIHEiKEVxBEAgBCACEJ8EIAVBmDNqKAIAIAMoAgBGBEACQCAFQaAzaigCAA0AIAVBqDNqKAIADQAgBCAEQQhqQQEQhQNFDQAgBSwA5QdFDQAgAygCAEEBOgB+CwsgAygCACICLAB+BEAgAiACLAB9QQFzOgB9IAIQggMgAygCABB0IAMoAgAhAgsFIAJBADoAfQsgAkEAOgB+IBUgAiACQSxqEO4GIAlD//9/f0P//39/EDIgAygCACECAkACQCAKQcAAcUUNACACLAB9DQAgBkUEQCAJIBUoAgAiBjYCACACIAY2AhwLIBJFBEAgCSAVKAIEIgY2AgQgAiAGNgIgCwwBCyACKAKQAUEASiITBEAgE0EBcyAGckUEQCAJIAIsAJgBBH0gAkEcaiIGKgIAIBUqAgAQOQUgAkEcaiEGIBUqAgALIjM4AgAgBiAzOAIACwUgAigClAFBAEwNAQsgEkUEQCACKAKUAUEASgRAIAkgAiwAmAEEfSACQSBqIgYqAgAgFSoCBBA5BSACQSBqIQYgFSoCBAsiMzgCBCAGIDM4AgALCyACLAB9DQAgAhCCAyADKAIAIQILIA8gAikCHDcDOCAEIA8pAjg3AgAgCCACIAQQ8gIgAygCACICIAgpAwAiMjcCHCAMIAIsAH0iBkVyBEAgBCAyNwMABSAdIAIQnwQgBCAdEM8CIAMoAgAiBiECIAQpAwAhMiAGLAB9IQYLIAIgMjcCFCAGQf8BcUUEQCACQRxqIAJBJGogCSoCAEP//39/XBsqAgAhNCACQSBqIAJBKGogCSoCBEP//39/XBsqAgAhMyACIgkgCkGAgAFxBH9BAQUCf0EAIAIqAjAgM15FDQAaIApBCHFFCwsiEkEBcSIGOgB5IAQCfQJAAn8gCSAKQYCAAnEEfyACQQE6AHggEgR/QQEhAgwDBSAKQQhxCwUgCkGAEHEhEyAKQQhxRSACKgIsIDQgEgR9IAVB9CpqKgIABUMAAAAAC5NecQR/IAkgE0ELdjoAeCATRSIJQQFzIAkgEnINAhpBAAUgCUEAOgB4QQAMAgsLRSACKgIwIDMgBUH0KmoqAgCTXnEiBjoAeUEBCyECIAZB/wFxBH0MAQVDAAAAAAsMAQsgBUH0KmoqAgALIAJB/wFxBH0gBUH0KmoqAgAFQwAAAAALEDIgAygCACICIAQpAwA3AnALIBkEQAJAIAJBfzYCoAEgDkEBcyANcg0AIAVBqDRqEOsGIQkgAygCACICIAkpAhQ3AgwLCyAKQYCAgBhxIhJBgICAGEYhBiAMBEAgAiAUQdACaiICKAIAOwGGASACIAMQeCAGIA0gDnJyBEAgAygCACECBSADKAIAIgIgFCkCyAE3AgwLCyAKQYCAgBBxIQkCQAJAIAIqArgBQ///f39bDQAgAigCqAENACAXIAJBHGogAkHAAWoQoAIgCCACQbgBaiAXEEAgBCAFQZwraiAIEKYBIAIgBEEAEL8DDAELIApBgICAgAFxBEAgBCACEPoEIAMoAgAgBCkDADcCDAwBCyAOQQFzIA1yIBtBAXNyRQRAIAQgAhD6BCADKAIAIAQpAwA3AgwMAQsgBiAJRSANcnINACAEIAIQ+gQgAygCACAEKQMANwIMCyADKAIAIQIgDCANckUEQAJAIAIoApABQQFODQAgAigClAFBAU4NACAFQRBqIgkqAgBDAAAAAF5FDQAgBSoCFEMAAAAAXkUNACAEIAVBlCtqIAVBnCtqEKYBIAMoAgAhAgJAAkAgBSwAwAFFDQAgAigCCEEBcQ0AIAggAioCFCACEL8BEDIgAygCACECDAELIAggAikCFDcDAAsgGCACQQxqIAgQNSAHIBggBBCmASAXIAcgCBBAIAMoAgBBDGoiAiAXKQMANwIAIAcgCSAEEEAgFyACIAcQsgMgAygCACICIBcpAwA3AgwLCyAEIAJBDGoQmQEgAygCACICIAQpAwA3AgwgAiAFQbQqaiAFQbwqaiAFQZwqaiAKQYCAgOAAcUGAgIAgRhsgDBsoAgA2AkQgAiACKAK4BiIJQf////8HRgR/Qf////8HBQJ/Qf////8HIAIoAqgGIg1Bf0YNABogCSANQQFqIg1qIA1vCws2ArAGIAIgAigCvAYiCUH/////B0YEf0H/////BwUCf0H/////ByACKAKsBiINQX9GDQAaIAkgDUEBaiINaiANbwsLNgK0BiACQX82AqwGIAJBfzYCqAYgAkH/////BzYCvAYgAkH/////BzYCuAYgBCACQQEQ6gYgAygCACAEKQMANwJYIARD//9/f0P//39/EDIgAygCACICIAQpAwA3AmAgF0F/NgIAIAdCADcDACAHQgA3AwhBAkEBIAUsAL8BGyENAn8gBUG0MWoiCSoCACIzQ83MrD+UIDNDzcxMPpQgAioCREMAAIA/kpIQOaghKSACLAB9RQRAIAIgFSAXIA0gBxCzCiADKAIAIQILIAIgAioCFCIzQwAAAABeRSAKQcCAgBBxcgR9IAkqAgBDAACAQZQFIDNDZmYmP5QLqLI4AqAEIAIoAvQEEPgDIAMoAgAoAvQEIgIgBUGoK2otAABBAkEAIAVBqStqLAAAG3I2AiQgAiAFQbAxaigCACgCRCgCCBCYAiAYEIwEIAYgDEEBcyAOcnIEQCAYIBhBCGpBARCIAgUgFEHMA2ogFEHUA2pBARCIAgsgCkGAgIDAAHEEfwJ/QQAgAygCACICEP8CRw0AGiACKAKoAUEBSAsFQQALIgIgBUHgNWoiFSgCACIGBH8gAygCACAGKALwBUYFQQALIgZyBEBBL0EuIAIbIAVB2DdqKgIAEEIhAiADKAIAKAL0BCAYIBhBCGogAkMAAAAAQQ8QdQsgBgRAIAMoAgAiAiAVKAIARgRAIAQgAhCfAiAEIAkqAgAQsQMgBCAYEI0CRQRAIAMoAgAoAvQEIAQgBEEIakEtIAVB7DVqKgIAQwAAgD6UEEIgBUGcKmoqAgBBDxB1CwsLIAMoAgAiBioCRCE0IAYqAkghMyAFQdw1aigCACICRQRAIAVBoDVqKAIAIQILIApBgCBxRSAZcSAOIBJFcnEiEgR/QQEFIAIEfyAGKAL0BSACKAL0BUYFQQALCyEOICkLsiE1IBAgBhCfBCADKAIAIgYsAH0EQCAFQdAqaiICKAIAIQcgAiAGKAJINgIAIA4Ef0EMQQsgBUH+NWosAAAbBUEMC0MAAIA/EEIhBiAPIBApAwA3AzAgDyAQKQMINwMoIAggDykCMDcCACAEIA8pAig3AgAgCCAEIAZBASA0EKwBIAIgBzYCAAUCQCAKQYABcUEARyITBH8gBUHMNGoFQQQgCkEYdkEBcUECciAKQYCAgDBxG0MAAIA/EEIhAiAFQcw0aiIbKAIABEAgAkH///8HcSAFQYw1aioCABBaQwAAf0OUQwAAAD+SqEEYdHIhAgsCfyADKAIAIgYoAvQEISogCEMAAAAAIAYQvwEQMiAEIAZBDGogCBA1IAsgAygCACIGQQxqIAZBFGoQNSAqCyAEIAsgAiA0QQ9BDCARGxB1IBsLQQA2AgAgEUUEQEEMQQtBCiAOGyADKAIALAB9G0MAAIA/EEIhAiADKAIAKAL0BCAQIBBBCGogAiA0QQMQdQsgCkGACHEEQCAEIAMoAgAQ+QQgCCADKAIAEJ8CIAQgCBC1AiADKAIAKAL0BCAEIARBCGpBDUMAAIA/EEIgNEMAAAAAIBEbQQMQdSAFQdAqaiIGKgIAQwAAAABeBEAgBCoCDCADKAIAIgIqAhAgAioCGJJdBEACfyACKAL0BCErIAggBBDxAiALIAQQ+AQgKwsgCCALQQVDAACAPxBCIAYqAgAQxQELCwsgAygCACICLAB4BH9BABCCBiADKAIABSACCywAeQRAQQEQggYLIApBAnFFBEAgNCAzkiE2QQAhAgNAIAggAygCACIGQQxqIg4gBkEUahA1IAQgDiAIIAJBGGxBgAhqEJ4CAn8gAygCACgC9AQhLCACQQFxQQBHIhsEQCAWIDMgNRAyBSAWIDUgMxAyCyALIAJBGGxBiAhqIgYgFhCgAiAIIAQgCxA1ICwLIAgQYwJ/IAMoAgAoAvQEIS0gGwRAIBYgNSAzEDIFIBYgMyA1EDILIAsgBiAWEKACIAggBCALEDUgLQsgCBBjAn8gAygCACgC9AQhLiAIIAQqAgAgNiAGKgIAlJIgBCoCBCA2IAJBGGxBjAhqKgIAlJIQMiAuCyAIIDQgAkEYbEGQCGooAgAgAkEYbEGUCGooAgAQxgEgAygCACgC9AQgAkECdCAHaigCABCBAiACQQFqIgIgDUkNAAsLIDNDAAAAAF5FIBNyRQRAAn8gAygCACICKAL0BCEvIAQgAkEMaiIGIAJBFGoQNSAvCyAGIARBBUMAAIA/EEIgNEEPIDMQpAELIBcoAgAiAkF/RwRAIAQgAygCACACIDVDAAAAABDpBiADKAIAKAL0BCAEIARBCGpBHUMAAIA/EEJDAACAPyAzEDkQxQELIAVB0CpqIgIqAgBDAAAAAF5FIBFyDQACfyADKAIAKAL0BCEwIAggEBDxAiALIAVBoCpqIgYqAgBDAACAvxAyIAQgCCALEDUgGiAQEPgEIBwgBioCAIxDAACAvxAyIBYgGiAcEDUgMAsgBCAWQQVDAACAPxBCIAIqAgAQxQELCyAVKAIAIgcgAygCACICRgRAIAcqAkQhMyAFQZwqaioCACE0IAQgBxCfAiAEIAkqAgAQsQMgBCAYEI0CBEAgBEMAAIC/IAkqAgCTELEDIAMoAgAiByECIAcqAkQhMwUgMyA0EDkhMyADKAIAIQILIAIoAvQEIAQgBEEIakEtIAVB7DVqKgIAEEIgM0F/QwAAQEAQpAEgAygCACECCyACIAIpAhw3AiQgAiACKgIMIAIqAliTIAIqAjySOAKMBCACKgIQIAIqAlyTIAJBQGsqAgCSIAIQvwGSIAMoAgAQ0QGSITMgAygCACICIDM4ApAEIAIgAioCDCACKgJYIjSTIAIqAjwiNZMgAioCNCIzQwAAAABbBH0gAioCFCACKgJwkwUgMwuSOAKUBCACIAIqAhAgAioCXJMgAkFAayoCAJMgAioCOCIzQwAAAABbBH0gAioCGCACKgJ0kwUgMwuSOAKYBCACIDVDAAAAAJIgNJMiMzgCsAMgAkMAAAAAOAK0AyACQwAAAAA4ArgDIAggM0MAAAAAkiACEL8BIAMoAgAQ0QGSIAMoAgAiB0FAayoCAJIgByoCXJMQMiAEIAJBDGogCBA1IAMoAgAiAiAEKQMAIjI3AtgBIAIgMjcCyAEgAiAyNwLQASACIDI3AuABIARDAAAAAEMAAAAAEDIgAygCACICIAQpAwAiMjcC9AEgAiAyNwLoASACQwAAAAA4AvwBIAJDAAAAADgC8AEgAkEAOgDEAiACIAIQjQRDAAAAAF46AMUCIAIgAigCwAI2ArwCIAJBADYCwAIgAkEAOgDGAiACIAIqAswBQwA8HMaSOAKAAiACQdACahC9AyADKAIAIgJBATYC4AIgAiAlBH8gFCgC6AIhByAUKALgAgVBACEHQQELNgLkAiACIAc2AugCIAIgAigCoAQ2AuwCIAJDAACAvzgC8AIgAkH0AmpBABC8AyADKAIAQYADahC9AyADKAIAQYwDahC9AyADKAIAIgJBADYCvAMgAkEANgKEAiACQQA2AogCIAIgAkHUBGo2AtwCIAJBmANqQQAQ6AYgAygCAEGkBGogHioCACAZELIIIAwEQCAUKALoAiIHIAMoAgAiBkHoAmoiAigCAEcEQCACIAc2AgAgBkH0AmogAhB4CwsgAygCACICKAKQASIHQQBKBEAgAiAHQX9qNgKQAQsgAigClAEiB0EASgRAIAIgB0F/ajYClAELIBIEQCACEHQgAygCAEEAEIsECyARRQRAIAMoAgAiAigC6AIhByACIAdBEHI2AugCIAJBATYCtAIgAkECNgK4AiAoQQBHIgZFBEAgAkGWhgIQXiADKAIAQQxqEIIJBEAgAygCAEEBOgB+CwsgIARAAkAgBUHIKmoqAgAhNCAJKgIAQwAAAD+UITMCfyADKAIAQaCGAhBeITEgISADKAIAEJ8CIAggIRDnBiALIDSMIDOTIDQgM5IQMiAEIAggCxA1IDELIAQgM0MAAIA/khDCBEUNACABQQA6AAALCyADKAIAIgJBADYCtAIgAkEBNgK4AiACIAc2AugCIApBgIDAAHFBAEciBwR9ICJB/KMCQQBBAEMAAIC/EGwgIioCAAVDAAAAAAshNiAIIABBAEEBQwAAgL8QbCALIDZDAAAAABAyIAQgCCALEDUgCCAQKQIANwIAIAggECkCCDcCCCAFQcQqaioCACEzIAYEfSAzBSAzIAkqAgCSIAVB3CpqKgIAkgshNSABBH0gMyAJKgIAkiAFQdwqaioCAJIFIDMLITQgBUGsKmoiAioCACI3QwAAAABeBEAgNCA1IDcQfyE0CyAIIDUgCCoCAJI4AgAgCEEIaiIBIAEqAgAgNJM4AgAgCyAIKQIANwIAIAsgCCkCCDcCCCALIAMoAgAiBioCDCAGKgIUkiAgBH0gEBCNAUMAAEDAkgUgMwuTOAIIIAggASAAQQAgBCACIAsQrQEgBwRAIAgqAgAhMyAIEHYhNCAaIAQqAgAiNSAzIDMgNCA1kyACKgIAlJIQOZIgCCoCBBAyIBxDAAAAQCA2k0MAAAAAEDIgFiAaIBwQNSAaQwAAAAAgCSoCAEMAAIC+lKiyEDIgHCAWIBoQNSAjIAEgGhA1ICRDAAAAACAFQbAqaioCABAyIBwgI0H8owJBAEEAICQgCxCtAQsLIAQgAygCABCfAiADKAIAIgFB3ANqIgAgBCkCADcCACAAIAQpAgg3AgggACABQcwDahC1AiADKAIAIgAgECoCACAAKgJIkjgC7AMgECoCDCAAENEBkiAFQdAqaiADKAIAIgAiAUHIAGogCkGACHEgH3IbKgIAkiEzIAAgMzgC8AMgACAAKgIMIAAqAhSSIAAqAnCTIAEqAkgiNJMiNTgC9AMgACAAKgIQIAAqAhiSIAAqAnSTIDSTIjY4AvgDIAAgACoC7ANDAAAAP5JDAAAAACAAKgI8QwAAAD+UIDSTEGIQOSI0khBiOAL8AyAAIDNDAAAAP5IQYjgCgAQgACA1QwAAAD+SIDSTEGI4AoQEIAAgNkMAAAA/khBiOAKIBCAAIAAoAlA2AowCIBAgEEEIakEAEIUDQQFxIQEgAygCACIAIAE2ApACIAAgECkCADcClAIgACAQKQIINwKcAiAAQfwDaiAAQYQEakEBEIgCIAMoAgAiAEEAOgB8BSADKAIAIgBB/ANqIABBhARqQQEQiAIgAygCACEACyAAIAAuAYQBQQFqOwGEASAnEIoEICZFBEACQCAKQcAAcUUEQCADKAIAIgAoApABQQFIBEACQCAAKAKUAUEBTg0AIAAqAtwDIAAqAuQDYEUEQCAAKgLgAyAAKgLoA2BFDQELIABBATYCpAELCwsgJQRAIBQsAH1FBEAgFCwAgQFFDQILIAMoAgBBATYCpAELCwsgAygCACIAIAVBkCpqKgIAQwAAAABfBH8gAEEBNgKkAUEBBSAAKAKkAUEASgR/QQEFIAAoAqgBQQBKCwsiAToAgQEgAAJ/AkAgACwAfQ0AIAFB/wFxRSAALAB6QQBHcUUNAEEADAELIAAoApABQQFIBH9BACAAKAKUAUEBTg0BGiAAKAKoAUEBSAVBAAsLIgA6AH8gDyQEIABB/wFxRQsPACABIAAoAgBqIAI2AgALDQAgASAAKAIAaigCAAs3AQJ/IwQhAiMEQRBqJAQgACgCACEAIAIgASAAQf8BcUHyBmoRAQAgAhB9IQMgAhAxIAIkBCADCzABAX8jBCECIwRBEGokBCACIAA2AgAgAkEIaiIAIAEpAgA3AgAgAiAAELEQIAIkBAsxAQF/IABBzPgBNgIAIAAoAggQW0UEQCAAKAIAKAIMIQEgACABQf8BcUHgBGoRBAALCwkAIAAgARCREQsZACAAKAIAIAE2AgAgACAAKAIAQQhqNgIACygBAn8CfyMEIQMjBEEQaiQEIABBAkGk+AFB0skCQSAgARACIAMLJAQLEAAgAEHQ9gEgASgCALgQGQsNACAAKAIIIAFBA3RqC4UBAQN/IwQhAyMEQRBqJAQgASgCDCEEIANBCGoiBUEANgIAIAMgAkEBdCAEaiICIAEoAixBAXQgBGogBUEBEN0DIABDAAAAADgCACAAIAMoAgA2AgQgACADKAIEIgE2AgggAEMAAAAAOAIMIAAgATYCECAAIAUoAgAgAmtBAXU2AhQgAyQECxAAIABCADcCACAAQgA3AggLHAAgACAAKAIIIgAgASAAIAFIIAFBAEhyGzYCBAsXACAAIAE2AgAgACACNgIIIABBADYCBAslACAAIAE6AAwgACACOwEAIAAgAzsBAiAAIAQ7AQQgACAFOwEGCw4AIAAoAgggAUH0AGxqC2sBAX8gBkGAgIAITwRAAkAgAEHIAGoiBxB+RQRAIAEgBxBwKAIARgRAIABBBkEEELABIAAgAiADIAQgBSAGEPMDDAILCyAAIAEQmAIgAEEGQQQQsAEgACACIAMgBCAFIAYQ8wMgABDlAgsLC4oCAQV/IwQhCiMEQSBqJAQgCkEYaiEMIApBCGohCSAKIQ0gBEGAgIAITwRAIAZFBEAgBRBcIAVqIQYLIAUgBkcEQCABRQRAIAAoAigoAgghAQsgAkMAAAAAWwRAIAAoAigqAgwhAgsgAEHIAGoQcBogCSAAQTxqEP0CIgspAgA3AgAgCSALKQIINwIIIAhBAEciCwRAIAkgCSoCACAIKgIAEDk4AgAgCSAJKgIEIAgqAgQQOTgCBCAJIAkqAgggCCoCCBBFOAIIIAkgCSoCDCAIKgIMEEU4AgwLIA0gAykCADcDACAMIA0pAgA3AgAgASAAIAIgDCAEIAkgBSAGIAcgCxDWCQsLIAokBAskAQF/QZipBCgCACIAQbQxaioCACAAQcgqaioCAEMAAABAlJILOQIBfwF9EGAoArwDIQEgAEEASARAIAEoAgwhAAsgAUEsaiAAEFUqAgAhAiABKgIUIAEqAhggAhB/Cw8AIAAgACgCAEF/ajYCAAsaACAAIAAoAlwgACgCVCABENkEIABBADYCVAtsAQN/IwQhAiMEQSBqJARBmKkEKAIAIQMgAhDeBiACIAA2AgAgAkEEaiIEIANBsCtqIABBBHRqIgApAgA3AgAgBCAAKQIINwIIIANB+DNqIAIQ3QYgACABKQIANwIAIAAgASkCCDcCCCACJAQLCABBBxADQQALpQIBBn8gAUFvSwRAEAoLIAAsAAsiBkEASCIEBH8gACgCBCEFIAAoAghB/////wdxQX9qBSAGQf8BcSEFQQoLIQMgBSABIAUgAUsbIgFBC0khAkEKIAFBEGpBcHFBf2ogAhsiByADRwRAAkACQAJAIAIEQCAAKAIAIQIgBAR/QQAhBCAABSAAIAIgBkH/AXFBAWoQ9wIgAhBUDAMLIQEFIAdBAWoiAxA/IQEgBAR/QQEhBCAAKAIABSABIAAgBkH/AXFBAWoQ9wIgAEEEaiECDAILIQILIAEgAiAAQQRqIgMoAgBBAWoQ9wIgAhBUIARFDQEgAyECIAdBAWohAwsgACADQYCAgIB4cjYCCCACIAU2AgAgACABNgIADAELIAAgBToACwsLC0sBA38gACgCBCABSARAIAFBAnQQUyECIABBCGoiAygCACIEBEAgAiAEIAAoAgBBAnQQRhogAygCABBBCyADIAI2AgAgACABNgIECwupAQEBfyABQf8HSgRAIAFBgnBqIgJB/wcgAkH/B0gbIAFBgXhqIAFB/g9KIgIbIQEgAEQAAAAAAADgf6IiAEQAAAAAAADgf6IgACACGyEABSABQYJ4SARAIAFB/A9qIgJBgnggAkGCeEobIAFB/gdqIAFBhHBIIgIbIQEgAEQAAAAAAAAQAKIiAEQAAAAAAAAQAKIgACACGyEACwsgACABQf8Haq1CNIa/ogtcAQJ/IAAsAAAiAiABLAAAIgNHIAJFcgR/IAIhASADBQN/IABBAWoiACwAACICIAFBAWoiASwAACIDRyACRXIEfyACIQEgAwUMAQsLCyEAIAFB/wFxIABB/wFxawuEAQEEfyMEIQMjBEEwaiQEAn8QPCIEKAL0BCEGIAMgACkCADcDCCADIAEpAgA3AwAgA0EQaiIBIAMpAgg3AgAgA0EYaiIAIAMpAgA3AgAgBgsgASAAIAIQogMgACAEKAL0BEE8ahD9AhDGAiAEIAApAgA3AswDIAQgACkCCDcC1AMgAyQECwsAIAAEQCAAEFQLCwsAQZipBCAANgIAC+QBAQN/QZipBCgCACICQZQzaigCACEBAn8CQCACQf81aiwAAEUNACACQf41aiwAAA0AEN4HDAELIAEoApACQQFxBH8gAEHAAHFFIAJBnDNqKAIAIAEoAvAFR3EEf0EABSAAQSBxRQRAIAJBtDNqKAIAIgMEQCABKAKMAiADRwRAIAJBxTNqLAAARQRAQQAgAyABKAJQRw0GGgsLCwsgASAAEKsFBH8gAEGAAXFFIAEoAugCQQRxQQBHcQR/QQAFIAEoAowCIAEoAlBGBEBBACABLAB8DQUaC0EBCwVBAAsLBUEACwsLMQEBfyMEIQMjBEEQaiQEIAEoAgAhASADIAIQcSAAIAEgAygCABAIEF8gAxAxIAMkBAtAACABKgIAIAAqAgBgBH8gASoCBCAAKgIEYAR/IAEqAgggACoCCF8EfyABKgIMIAAqAgxfBUEACwVBAAsFQQALCygBAn8CfyMEIQMjBEEQaiQEIABBAkGU/QFBs9MCQSogARACIAMLJAQLHgAgACAAKAJcIAAoAlQgASACIAMQ8gMgAEEANgJUCxAAIAAoAjwgAEFAaygCAEcLHwAgACgCBCABSARAIAAgACABEFgQlwMLIAAgATYCAAsPACAAIAEgACgCBGoQ+AELDgAgACgCCCABQcQBbGoLDQAgACgCCCABQQF0ags8AQF9IASyIQUgA0GAgIAITwRAIAAgASACQwAAAAAgBUMAAIC/kkPbD8lAlCAFlSAEEJcCIAAgAxCBAgsLGgEBfyAAKAI4IgIgATsBACAAIAJBAmo2AjgLoAECBH8CfSMEIQcjBEEQaiQEIAchCCAAQdQAaiEGIAJDAAAAAFsEQCAGIAEQmgIFIAYgBUEBaiIJIAYoAgBqEOgCIAVBAE4EQCAFsiEKIAQgA5MhBEEAIQADQCAIIAEqAgAgBCAAsiAKlZQgA5IiCxD5AiAClJIgASoCBCALEPgCIAKUkhAyIAYgCBCaAiAAQQFqIgAgCUcNAAsLCyAHJAQLKQEBfyMEIQIjBEEQaiQEIAIgATYCACAAQcgAaiACEHggABDbBCACJAQLDwAgACABEKUBQwAAAABeC0kBAX8gACgCACICIAAoAgRGBEAgACAAIAJBAWoQWBDoAiAAKAIAIQILIAAoAgggAkEDdGogASkCADcCACAAIAAoAgBBAWo2AgALFQBBmKkEKAIAQZk2akEAOgAAEK0DCzcBAX9BmKkEKAIAIgNB0DRqIAApAgA3AgAgA0HYNGogAikCADcCACADQbQ0aiABQQEgARs2AgALGQEBfSAAKgIAIgEgAZQgACoCBCIBIAGUkgs0AQF9IAAgASoCACIEIAIqAgAgBJMgAyoCAJSSIAEqAgQiBCACKgIEIASTIAMqAgSUkhAyCyYBAn0gACABKgIMIgIgASoCECIDIAIgASoCFJIgAyABKgIYkhBdCxwAIAAgASoCACACKgIAlCABKgIEIAIqAgSUEDILHQAgAEEAQQAQuwEhAEGYqQQoAgBBhDNqIAAQqwkLegEEf0GYqQQoAgAhBCAAQQBKBEAgBEH4M2ohAQNAIAEoAgggASgCAEF/akEUbGoiAyECIARBsCtqIAMoAgBBBHRqIgMgAikCBDcCACADIAIpAgw3AgggASABKAIAQX9qNgIAIABBf2ohAiAAQQFKBEAgAiEADAELCwsLrQEBBX9BmKkEKAIAIQEgAEEASgRAIAFBhDRqIQIgAUGQKmohBQNAIAIoAgggAigCAEF/akEMbGoiASgCABD3BCIEIAUQ1wIhAyAEKAIAQQRGBEACQAJAAkAgBCgCBEEBaw4CAAECCyADIAEoAgQ2AgAMAQsgAyABKAIENgIAIAMgASgCCDYCBAsLIAIgAigCAEF/ajYCACAAQX9qIQEgAEEBSgRAIAEhAAwBCwsLCwgAQRwQA0EACwgAQQYQA0EAC+EEAQJ/IAEtAAAiA0GAAXEEfwJ/IANB4AFxQcABRgRAIABB/f8DNgIAIAIEQEEBIAIgAWtBAkgNAhoLQQIgASwAACICQf8BcUHCAUgNARpBAiABLQABIgFBwAFxQYABRw0BGiAAIAFBP3EgAkEfcUEGdHI2AgBBAgwBCyADQfABcUHgAUYEQCAAQf3/AzYCACACBEBBASACIAFrQQNIDQIaCwJAAkACQCABLAAAIgNBYGsiAgRAIAJBDUYEQAwCBQwDCwALQQMgASwAASICQeABcUGgAUcNBBoMAgtBAyABLAABIgJB/wFxQZ8BSg0DGgwBCyABLAABIQILQQMgAkH/AXEiAkHAAXFBgAFHDQEaQQMgAS0AAiIBQcABcUGAAUcNARogACABQT9xIAJBBnRBwB9xIANBD3FBDHRycjYCAEEDDAELIANB+AFxQfABRwRAIABBADYCAEEADAELIABB/f8DNgIAIAIEQEEBIAIgAWtBBEgNARoLIAEsAAAiA0H/AXFB9AFKBH9BBAUCQAJAAkACQCADQXBrDgUAAgICAQILQQQgASwAASICQfAAakEYdEEYdUH/AXFBL0oNBBoMAgtBBCABLAABIgJB/wFxQY8BSg0DGgwBCyABLAABIQILIAJB/wFxIgJBwAFxQYABRgRAIAEtAAIiBEHAAXFBgAFGBEAgAS0AAyIBQcABcUGAAUYEQCAEQQZ0QcAfcSACQQx0QYDgD3EgA0EHcUESdHJyIgJBgPD/AHFBgLADRwRAIAAgAiABQT9xcjYCAAsLCwtBBAsLBSAAIAM2AgBBAQsLGgAgACABEPcLIgBBACAALQAAIAFB/wFxRhsLCgAgAEFQakEKSQs1AQJ/IwQhAyMEQRBqJAQCfyAAKAIAIQQgAyABEG8gBAsgAygCACACKAIAEAsgAxAxIAMkBAsnAQF/IwQhAiMEQRBqJAQgAiABEI8BIABByPYBIAIQBDYCACACJAQLDwAgASAAKAIAaiACOAIACw0AIAEgACgCAGoqAgALEQBBACAAQQhqIAAoAhAQWxsLMwAgAEGM+gE2AgAgACABNgIQIAEQW0UEQCAAKAIAKAIAIQEgACABQf8BcUHgBGoRBAALCzMAIABBrPoBNgIAIAAgATYCCCABEFtFBEAgACgCACgCACEBIAAgAUH/AXFB4ARqEQQACwszACAAQcD6ATYCACAAIAE2AgggARBbRQRAIAAoAgAoAgAhASAAIAFB/wFxQeAEahEEAAsLMwAgAEHY+gE2AgAgACABNgIIIAEQW0UEQCAAKAIAKAIAIQEgACABQf8BcUHgBGoRBAALCzMAIABBzPgBNgIAIAAgATYCCCABEFtFBEAgACgCACgCCCEBIAAgAUH/AXFB4ARqEQQACwv1AQEHfyMEIQMjBEEgaiQEIAEoArQCIQRBmKkEKAIAIgJBoDVqIggoAgAgAUcEQCACQYE2akEAOgAACyADQRBqIQUgA0EIaiEGIAMhByACQaQ1aiAANgIAIAggATYCACACQfQ1aiAENgIAIAFBgAZqIARBAnRqIAA2AgAgACABKAKMAkYEQCAGIAFBlAJqIAFBDGoiABBAIAcgAUGcAmogABBAIAUgBiAHEEMgAUGIBmogBEEEdGoiACAFKQIANwIAIAAgBSkCCDcCCAsgAkHgM2ooAgBBAkYEQCACQf81akEBOgAABSACQf41akEBOgAACyADJAQLPwEBfyAAQZipBCgCACIBQbQzaigCAEYEQCABQbwzaiAANgIACyAAIAFBuDNqKAIARgRAIAFBxzNqQQE6AAALC0EBAX8jBCECIwRBEGokBCACIAAgARCmASAAIAIpAwA3AgAgAiAAQQhqIgAgAUEIahCyAyAAIAIpAwA3AgAgAiQECyIAIAAgASoCACAAKgIAkjgCACAAIAEqAgQgACoCBJI4AgQLHAAgACAAKAIwQf//A3EQlgIgACABIAIgAxDkAgu4AgIHfwJ9IwQhAyMEQSBqJAQgA0EQaiEBIANBCGohAiADIQQQPCIALAB/RQRAAkBBmKkEKAIAIQUgACgC4AJFBEAQ/AgMAQsgACgCvAMEQBDqAQsgACoCDCEHIAAqAhQhCCACIABBmANqEH4EfSAHBSAHIAAqArADkgsgACoCzAEQMiAEIAcgCJIgACoCzAFDAACAP5IQMiABIAIgBBBDIAJDAAAAAEMAAAAAEDIgAkMAAAAAEKkBIAFBAEEAEGEEQAJ/IAAoAvQEIQYgAiABKgIIIAEqAgQQMiAGCyABIAJBG0MAAIA/EEJDAACAPxDFASAFQczYAGosAAAEQCABQZ+dAkEAEN0BCyAAKAK8AwRAEOkCIAAoArwDIAAoAswBNgIcCwUgACgCvAMEQBDpAgsLCwsgAyQEC/cFAhJ/An0jBCEEIwRB8ABqJAQgBEHgAGohBiAEQdgAaiEHIARByABqIQIgBEE4aiEDIARBCGohCiAEQTBqIQUgBEEoaiELIARBIGohDCAEQRhqIQ0gBCEREDwiCCwAfwR/QQAFQZipBCgCACEOIAggABBeIQ8gByAAQQBBAUMAAIC/EGwgAyAHKgIEIA5ByCpqIgkqAgBDAAAAQJSSQwAAgL+SIhQgFBAyIAYgCEHIAWoiECADEDUgAiAQIAYQQyACIAkqAgAQfCADIAIpAgA3AgAgAyACKQIINwIIIAcqAgBDAAAAAF4EQEMAAAAAIA5B3CpqKgIAEGsLIAVDAAAAACAJKgIAEDIgBiAQIAUQNSANQwAAAAAgCSoCABAyIAwgECANEDUgCyAMIAcQNSAKIAYgCxBDIAcqAgBDAAAAAF4EQCAGIAoQdiACEI0BEDIgBiAJKgIAEKkBIAMgChCFBwsgAyAPQQAQYQR/IAUgAhDmAyAFIAUqAgCoskMAAAA/kjgCACAFIAUqAgSoskMAAAA/kjgCBCACEI0BIRQgAyAPIAsgDEEAEJEBIgkEQCAPEMsBCyADIA9BARCXASAIKAL0BCAFIBRDAAAAP5QiFEEHQQggCywAAEUiAxtBCSAMLAAARSADchtDAACAPxBCQRAQlQIgAQRAQwAAgD8gAhB2IAIQjQEQRUMAAMBAlaiyEDkhFSAIKAL0BCAFIBQgFZNBEkMAAIA/EEJBEBCVAgsgDkHQKmoiAioCAEMAAAAAXgRAAn8gCCgC9AQhEiANQwAAgD9DAACAPxAyIAYgBSANEDUgEgsgBiAUQQZDAACAPxBCQRAgAioCABC7AiAIKAL0BCAFIBRBBUMAAIA/EEJBECACKgIAELsCCyAOQczYAGosAAAEQCAKQZCdAkGUnQIgARtBABDdAQsgByoCAEMAAAAAXgRAIBEgCikDADcDACAGIBEpAgA3AgAgBiAAQQBBARCuAQsgCQVBAAsLIRMgBCQEIBMLSgECfyABKAIEIQMgAUECEMQBIgIEQCABIAIgARCjAUH/AXEiAmwQkgIgASABIAIQxAFBf2oQkgILIAAgASADIAEoAgQgA2sQ3AILQgAgA0GAgIAITwRAIAAgASACQwAAAL+SQwAAAAAgBLIiAkMAAIC/kkPbD8lAlCAClSAEEJcCIAAgA0EBIAUQjwILCzYAIAAgASACIAMQlgciAiABQX9qIAJBf0cgAiABSHEbIQEgAAR/IAAgAWpBADoAACABBSACCwskAQF9IAAqAlwgACoC5AGSIQIgACABOAJcIAAgAiABkzgC5AELlgEBBn8jBCECIwRBIGokBCACQRhqIQUgAkEIaiEDIAIhBiAAEPcEIgQoAgBBBEYEQCAEKAIEQQJGBEAgBiAEQZipBCgCACIHQZAqahDXAiIEKQIANwMAIAUgBikCADcCACADIAA2AgAgAyAFKAIANgIEIAMgBSgCBDYCCCAHQYQ0aiADENwGIAQgASkCADcCAAsLIAIkBAsHAEHEABADCwgAQRgQA0EAC1IBA38QJCEDIAAjASgCACICaiIBIAJIIABBAEpxIAFBAEhyBEAgARAhGkEMEBVBfw8LIAEgA0oEQCABECJFBEBBDBAVQX8PCwsjASABNgIAIAILLgEBfyMEIQIjBEEQaiQEIAIgATYCAEHAgQIoAgAiASAAIAIQmQQaIAEQ2QsQCgubBAEIfyMEIQojBEHQAWokBCAKIgZBwAFqIgRCATcDACABIAJsIgsEQAJAQQAgAmshCCAGIAI2AgQgBiACNgIAIAIhByACIQFBAiEFA0AgBUECdCAGaiABIAIgB2pqIgk2AgAgBUEBaiEFIAkgC0kEQCABIQcgCSEBDAELCyAAIAtqIAhqIgUgAEsEfyAFIQlBASEHQQEhAQN/IAdBA3FBA0YEfyAAIAIgAyABIAYQigUgBEECEJcEIAFBAmoFIAFBf2oiB0ECdCAGaigCACAJIABrSQRAIAAgAiADIAEgBhCKBQUgACACIAMgBCABQQAgBhCWBAsgAUEBRgR/IARBARCVBEEABSAEIAcQlQRBAQsLIQEgBCAEKAIAQQFyIgc2AgAgACACaiIAIAVJDQAgAQsFQQEhB0EBCyEFIAAgAiADIAQgBUEAIAYQlgQgACEBIAUhAANAAn8CQCAAQQFGIAdBAUZxBH8gBCgCBEUNBAwBBSAAQQJIDQEgBEECEJUEIAQgBCgCAEEHczYCACAEQQEQlwQgASAAQX5qIgVBAnQgBmooAgBrIAhqIAIgAyAEIABBf2pBASAGEJYEIARBARCVBCAEIAQoAgBBAXIiBzYCACABIAhqIgEgAiADIAQgBUEBIAYQlgQgBQsMAQsgBCAEEJQHIgUQlwQgBCgCACEHIAEgCGohASAAIAVqCyEADAAACwALCyAKJAQLTgECfyACBH8CfwNAIAAsAAAiAyABLAAAIgRGBEAgAEEBaiEAIAFBAWohAUEAIAJBf2oiAkUNAhoMAQsLIANB/wFxIARB/wFxawsFQQALC6cBAQV/IAAoAkxBf0oEf0EBBUEACxogABD8CyAAKAIAQQFxQQBHIgRFBEAQkAUhASAAKAI0IgIEQCACIAAoAjg2AjgLIAAoAjgiAwRAIAMgAjYCNAsgACABKAIARgRAIAEgAzYCAAtBjKoEEBILIAAQjwUhAgJ/IAAgACgCDEE/cUHsAGoRAwAhBSAAKAJgIgMEQCADEFQLIARFBEAgABBUCyAFCyACcgshACAAIAEqAgAgASoCBBAyIABBCGogASoCCCABKgIMEDILDQBBmKkEKAIAQZAqagsLACAAIAEgAhDkDws2AQJ/IAAQYCIBQZQEaiABQQxqEEAgASgCvAMiAgRAIAAgAigCDEEBahD/ASABKgI8kzgCAAsLQgICfwJ8IwQhASMEQRBqJAQCfCAAKAIAQZj6ASgCACABQQRqEAYhBCABIAEoAgQQXyAEC6shAiABEMwBIAEkBCACC0AAIAEqAgQgACoCDF0EfyABKgIMIAAqAgReBH8gASoCACAAKgIIXQR/IAEqAgggACoCAF4FQQALBUEACwVBAAsLEAAgAEHs+QE2AgAgABDdBwu4AQEDfwJ/AkBBmKkEKAIAIgJBoDNqKAIAIgNFIAEgA0ZyDQAgAkGkM2osAAANAEEADAELIAJBlDNqKAIAIgMgAkGYM2ooAgBGBH8gASACQbQzaigCACIERiAERXJFBEBBACACQcUzaiwAAEUNAhoLIAAgAEEIakEBEIUDBH8gAkH/NWosAAAEf0EABSADQQAQqwUEfyADKALoAkEEcQR/QQAFIAEQiANBAQsFQQALCwVBAAsFQQALCwsQACAAQbz5ATYCACAAEKkFCxwAIAAgASoCCCABKgIAkyABKgIMIAEqAgSTEDILQgAgACAAKgIAIAEqAgCTOAIAIAAgACoCBCABKgIEkzgCBCAAIAEqAgAgACoCCJI4AgggACABKgIEIAAqAgySOAIMC6MDAgl/An0jBCEIIwRBQGskBCAIIgNBKGohBCADQSBqIQlBmKkEKAIAIgpBtDFqKgIAIg1DzczMPpQgApQhDCADQRhqIgUgDUMAAAA/lCINIA0gApQQMiADQTBqIgYgACAFEDUgBRA6IANBEGoiABA6IANBCGoiBxA6AkACQAJAAkACQCABDgQBAwACBAsgDIwhDAwBCyAMjCEMDAELIARDAAAAAEMAAEA/EDIgAyAEIAwQUSAFIAMpAwA3AwAgBEMtsl2/QwAAQL8QMiADIAQgDBBRIAAgAykDADcDACAEQy2yXT9DAABAvxAyIAMgBCAMEFEgByADKQMANwMADAELIARDAABAP0MAAAAAEDIgAyAEIAwQUSAFIAMpAwA3AwAgBEMAAEC/Qy2yXT8QMiADIAQgDBBRIAAgAykDADcDACAEQwAAQL9DLbJdvxAyIAMgBCAMEFEgByADKQMANwMACwJ/IApBlDNqKAIAKAL0BCELIAMgBiAFEDUgBCAGIAAQNSAJIAYgBxA1IAsLIAMgBCAJQQBDAACAPxBCEOMCIAgkBAspAQJ/IwQhAyMEQRBqJAQgAyACNgIAIABBACABIAMQ1QUhBCADJAQgBAvlDAIYfwd9IwQhBSMEQaABaiQEIAVBiAFqIQQgBUGAAWohCiAFQUBrIQ4gBUHwAGohDyAFQTBqIQYgBUH4AGohCCAFQdgAaiEMIAVBkQFqIREgBUGQAWohFSAFQQhqIQ0gBUHoAGohFiAFQdAAaiEXIAVByABqIRggBSEZEDwiCSwAfwRAQQAhAwVBmKkEKAIAIQcgAUGACHFFIAFBAnFBAEciEEEBc3EEQCAOIAdBxCpqKgIAQwAAAAAQMgUgDiAHQcQqaikCADcDAAsgDyACIAMEfyADBSACQQAQkAELIhJBAEMAAIC/EGwgDioCBCIcIAkqAvABEDkhHSAJKgLsASAHQbQxaiITKgIAIAdByCpqKgIAQwAAAECUkhBFIBxDAAAAQJQgDyoCBJIQOSEeIAkqAgwhHCAIEMkCIAQgHCAIKgIAkiAeIAkqAswBkhAyIAYgCUHIAWogBBBDIBAEQCAGIAYqAgAgCSoCPEMAAAA/lKiyQwAAgL+SIhyTOAIAIAYgBioCCCAckjgCCAsgBCATKgIAIh8gDyoCACIcIA4qAgAiIEMAAABAlCIhkkMAAAAAIBxDAAAAAF4bkiIiIB4QMiAEIB0QqQEgEARAIAwgBikCADcCACAMIAYpAgg3AggFIAwgBioCACIcIAYqAgQgIiAckiAHQdQqaioCAEMAAABAlJIgBioCDBBdCyAAIAEQwQgiCARAIAdB/DVqLAAARSABQYjAAHFBgMAARnEEQCAJIAkoAogCQQEgCSgChAJ0cjYCiAILCyAfICBDAABAQJQgISAQG5IhHCABQYACcUEARyEaAn8gDCAAQQAQYSEbIAkgCSgCkAJBAnI2ApACIAkgBikCADcCpAIgCSAGKQIINwKsAiAbCwRAIAwgACARIBUgAUEEdEHAIHEgAUEGdkECcUEQckEAIAFBwABxQQBHIhQbckGAKHMQkQEhAyAaBEAgCCEDBQJAIAMEfyABQcABcQR/IAAgB0GoNWooAgBGBUEBCyELIAFBgAFxBEAgBCAcIAwqAgCSIAwqAgwQMiAMIARBARCFAwR/IAdB/zVqLAAAQQFzQf8BcQVBAAtBAXEgC0EBcXJBAEchCwsgC0EBcSEDIBQEQCAHLQDlByALQQFxciEDCyAHQdQ4aiwAAEUgCEEBc3IgA0EBcUEAR3EFQQALIQMCQAJAAkAgACAHQaQ1aiIUKAIAIgtGBEAgB0GZNmosAABFDQEgB0GkNmooAgAgCEEBc3INARCbAiAUKAIAIQtBASEDCyAAIAtHDQELIAdBmTZqLAAARQ0AIAggB0GkNmooAgBBAUdyDQAQmwIMAQsgA0UEQCAIIQMMAgsLIAkoAtwCIAAgCEEBcyIDQQFxEMUECwsgAUEEcQRAEIIFC0EYQRkgESwAAEUiCBtBGiAVLAAARSAIchtDAACAPxBCIQsgBCAcIB0QMiANIAYgBBA1IBAEQCAFIAYpAwA3AyggBSAGQQhqIggpAwA3AyAgB0HMKmoqAgAhHCAKIAUpAig3AgAgBCAFKQIgNwIAIAogBCALQQEgHBCsASAGIABBAhCXASAKIA4qAgAgHRAyIBYgBiAKEDUgBCAWKQIANwIAIARBA0EBIAMbQwAAgD8Q0QIgB0HM2ABqLAAABEAgDUH8ogJB/6ICEN0BIARDAAAAAEMAAAAAEDIgDSAIIAIgEiAPIARBABCtASANQYGjAkGDowIQ3QEFIARDAAAAAEMAAAAAEDIgDSAIIAIgEiAPIARBABCtAQsFIBEsAAAgAUEBcXIEQCAFIAYpAwA3AxggBSAGKQMINwMQIAogBSkCGDcCACAEIAUpAhA3AgAgCiAEIAtBAEMAAAAAEKwBIAYgAEECEJcBCyABQYAEcQRAIAogHEMAAAA/lCAdIBMqAgBDAAAAP5SSEDIgFyAGIAoQNSAEIBcpAgA3AgAgBBCyBAUgGkUEQCAKIA4qAgAgHSATKgIAQ5qZGT6UkhAyIBggBiAKEDUgBCAYKQIANwIAIARBA0EBIAMbQzMzMz8Q0QILCyAHQczYAGosAAAEQCANQYOjAkEAEN0BCyAZIA0pAwA3AwAgBCAZKQIANwIAIAQgAiASQQAQrgELIAMgAUEIcUVxBEAgABDWBQsFIAggAUEIcUVxBH8gABDWBUEBBSAICyEDCwsgBSQEIAMLKQECfyMEIQMjBEEQaiQEIAMgAjYCACAAQQAgASADENcFIQQgAyQEIAQLmAgCFn8EfSMEIQQjBEGwAWokBCAEQZgBaiEGIARBkAFqIQkgBEGIAWohDSAEQTBqIQcgBEGhAWohDyAEQaABaiEWIARB6ABqIQogBEEQaiEFIARBgAFqIRAgBEFAayERIARB+ABqIRIgBEHQAGohCCAEQeAAaiETIAQhFCAEQcgAaiEVEDwiCywAfwR/QQAFQZipBCgCACEOIAsgABBeIQwQ/gEhGiADKgIAIhxDAAAAAFsEQCADIBo4AgAgGiEcCyADKgIEIhtDAAAAAFsEQCADIBo4AgQgGiEbCyAGIAtByAFqIhcgAxA1IAcgFyAGEEMgByAbIBpgBH0gDkHIKmoqAgAFQwAAAAALEHwgByAMQQAQYQR/IAcgDCAPIBZBABCRASEDIAogASoCACABKgIEIAEqAghDAACAPxA2IBwgGxBFQylcP0CVIRsgDkHMKmoqAgAgG0MAAAA/lBBFIRogBSAHKQMANwMAIAUgBykDCDcDCCAFQwAAQL8QsQMCQAJAIAJB//9ncSACIAJBAnEbIgJBgIAQcUUNACABKgIMQwAAgD9dRQ0AIAUqAgAiHCAFKgIIkkMAAAA/lEMAAAA/kqiyIR0gECAbIBySIAUqAgQQMiARIAUpAwg3AwAgARDkASEIIBJDAABAvyAbk0MAAEC/EDIgDSAQKQIANwIAIAkgESkCADcCACAGIBIpAgA3AgAgDSAJIAggGyAGIBpBChC1BAJ/IAsoAvQEIRggBiAdIAUqAgwQMiAYCyAFIAYgChDkASAaQQUQdQwBCyAIIAEgCiACQYCACHEbIgopAgA3AgAgCCAKKQIINwIIIAgqAgxDAACAP10EQCAEIAUpAwA3AyggBCAFKQMINwMgIAgQ5AEhBSATQwAAQL9DAABAvxAyIA0gBCkCKDcCACAJIAQpAiA3AgAgBiATKQIANwIAIA0gCSAFIBsgBiAaQX8QtQQFIAsoAvQEIAUgBUEIaiAIEOQBIBpBDxB1CwsgByAMQQEQlwEgDkHQKmoqAgBDAAAAAF4EQCAEIAcpAwA3AwggFCAHKQMINwMAIAkgBCkCCDcCACAGIBQpAgA3AgAgCSAGIBoQjAMFIAsoAvQEIAcgB0EIakEHQwAAgD8QQiAaQQ9DAACAPxCkAQsgAkGABHFFIA5BtDNqKAIAIAxGcQRAQQAQyQYEQCACQQJxBH9BiJ8CIAFBDEECEOwEBUGPnwIgAUEQQQIQ7AQLGiAVQwAAAABDAAAAABAyIAYgFSkCADcCACAAIAEgAiAGENUCGkMAAAAAQwAAgL8Qa0GEoAJBABC5ARDIBgsLIA8sAABFIAJBwABxQQBHckUEQCAAIAEgAkGCgBhxEMQICyADBEAgDBDLAQsgAwVBAAsLIRkgBCQEIBkL0QUCEH8BfSMEIQgjBEGgAWokBCAIQZgBaiEMIAhBiAFqIQ0gCEGAAWohECAIQdAAaiEKIAhB8ABqIQ8gCEFAayEUIAghESAIQeAAaiEVIAhB6ABqIRYQPCIOLAB/BH9BAAVBmKkEKAIAIQsgDiAAEF4hCSAQIABBAEEBQwAAgL8QbCAMIA5ByAFqIhIgARA1IAogEiAMEEMgDSAQKgIAIhhDAAAAAF4EfSAYIAtB3CpqKgIAkgVDAAAAAAtDAAAAABAyIAwgCkEIaiITIA0QNSAPIAogDBBDIA8gC0HIKmoiDyoCABB8IAogCUEAEGEEfyAGBEAgAkUEQCAGQd+dAhCHAgRAIAYQvgQhBgsLBSACQQxsQYTIAWooAgAhBgsCQAJAIAogCRDNAgRAIAssAOAHDQELIAtBqDVqKAIAIAlGDQAgC0G0NWooAgAgCUYNAAwBCyAJIA4QtQEgCSAOELMCIA4QdCALQcwzakEDNgIACyALQbQzaiISKAIAIAlGBH9BCQVBCEEHIAtBoDNqKAIAIAlGGwtDAACAPxBCIQEgCiAJQQEQlwEgCCAKKQMANwNIIBQgEykDADcDACALQcwqaioCACEYIA0gCCkCSDcCACAMIBQpAgA3AgAgDSAMIAFBASAYEKwBIA0QZiAKIAkgAiADIAQgBSAGIAdBASANEOsFIgEEQCAJEMsBCyAOKAL0BCANIA1BCGpBFEETIBIoAgAgCUYbQwAAgD8QQiALQYAraioCAEEPEHUgEUHAACACIAMgBhCWAyARaiECIAwgCioCACAKKgIEIA8qAgCSEDIgFUMAAAA/QwAAAAAQMiAMIBMgESACQQAgFUEAEK0BIBAqAgBDAAAAAF4EQCAWIBMqAgAgC0HcKmoqAgCSIAoqAgQgDyoCAJIQMiAMIBYpAgA3AgAgDCAAQQBBARCuAQsgAQVBAAsLIRcgCCQEIBcLCgAgASAAKAIIagtIAQJ/IAAsAAAiAQRAA0ACQCAAQQFqIQIgAUH/AXFBJUYiAQRAIAIsAABBJUcNAQsgAiAAIAEbQQFqIgAsAAAiAQ0BCwsLIAALNAAgAEEASAR9QwAAgAAFIABBCkgEfSAAQQJ0QdDHAWoqAgAFQwAAIEFBACAAa7IQgwELCws0AQJ/EDwsAH9FBEBBmKkEKAIAIgJB3NwAaiIDIANBgRggACABELwCIAJB3NwAamoQuQELC4YBAQV/AkACQCABQaypBCgCACIDaiIEQaSpBCgCACICSw0AQaipBCgCACAASwRAIAJBAWohBAwBCyABBEAgACECIAMhAANAAn8gAkEBaiEGIABBAWohAyAAIAIsAAA6AAAgAUF/aiIBRQ0DIAYLIQIgAyEADAAACwALDAELQaypBCAENgIACwtDAQF/IABBAEEAEPkBIAIgA3JBAE4EQCABKAIIIgQgAkggBCACayADSHJFBEAgACACIAEoAgBqNgIAIAAgAzYCCAsLC1kBAn8jBCEFIwRBEGokBCAFIgQgACABEKoJIAJBAEoEQAJAQQAhAANAIAQoAgQgBCgCCE4NASAAQQJ0IANqIAQQygQ2AgAgAEEBaiIAIAJIDQALCwsgBSQEC5wCAgF/An0gAUMAAAAAWwRAIAUgAjgCACAEIAI4AgAgAyACOAIABQJAIABDAACAPxDTBEOrqio+lSIHqCEGQwAAgD8gAZMgApQhAEMAAIA/IAcgBrKTIgggAZSTIAKUIQdDAACAP0MAAIA/IAiTIAGUkyAClCEBAkACQAJAAkACQAJAIAYOBQABAgMEBQsgAyACOAIAIAQgATgCACAFIAA4AgAMBQsgAyAHOAIAIAQgAjgCACAFIAA4AgAMBAsgAyAAOAIAIAQgAjgCACAFIAE4AgAMAwsgAyAAOAIAIAQgBzgCACAFIAI4AgAMAgsgAyABOAIAIAQgADgCACAFIAI4AgAMAQsgAyACOAIAIAQgADgCACAFIAc4AgALCwvwAQEDfyMEIQEjBEEQaiQEIABBIGoiAhA6IABBKGoiAxA6IABBADYCACAAQQA2AgQgAEEBOgAIIABBADYCDCAAQwAAAAA4AhAgAEEDNgIUIABBATYCGCAAQQA6ABwgAUMAAAAAQwAAAAAQMiACIAEpAwA3AgAgAUMAAAAAQwAAAAAQMiADIAEpAwA3AgAgAEEANgIwIABDAAAAADgCNCAAQ///f384AjggAEEAOgA8IABBQGtBADYCACAAQwAAgD84AkQgAEIANwJIIABCADcCUCAAQgA3AlggAEIANwJgIABCADcCaCAAQQA2AnAgASQECxAAIAEgAGuyIAKUIACykqgLRgAgACgCKCABQf//A3EiAUoEfyAAKAIwIAFBAXRqLgEAIgFBf0YEfyAAKAI0BSAAKAIYIAFB//8DcUEobGoLBSAAKAI0CwsVACAAQf8BcUEgRiAAQf8BcUEJRnILJgAgBEGAgIAITwRAIAAgARBjIAAgAhBjIAAgAxBjIAAgBBCBAgsLPwAgACgCNCABKQIANwIAIAAoAjQgAikCADcCCCAAKAI0IgEgAzYCECAAIAFBFGo2AjQgACAAKAIwQQFqNgIwCxQAIAAgACgCSEF/ajYCSCAAENsECw4AIAAoAgggAUHYAGxqCwwAIABDAAAAADgCAAtLAQN/IAAoAgQgAUgEQCABQQN0EFMhAiAAQQhqIgMoAgAiBARAIAIgBCAAKAIAQQN0EEYaIAMoAgAQQQsgAyACNgIAIAAgATYCBAsLLQECfxBgKAK8AyIAKAIMIQEgAEEsaiIAIAEQVUEMaiAAIAEQVUEUakEAEIgCC1QBA30gASoCACIEIAIqAgAiBV1FBEAgAyoCACIFIAQgBCAFXhshBQsgASoCBCIGIAIqAgQiBF1FBEAgAyoCBCIEIAYgBiAEXhshBAsgACAFIAQQMgtaAQN/QZipBCgCACIEQZw0aiECIABBAEoEfyACIABBf2oQekEEagUgAkEAEHpBCGoLKAIAIQMgAiAAEJEFIAEEQCAEQfQ1aigCAEUEQCADEIkEIQMLIAMQdAsLQQEBf0GYqQQoAgBBlDNqKAIAIQIgARD1AgR/QQgQiwIEfyAABH8gAiAAEF4FIAIoAowCCxDtAkEBBUEACwVBAAsLwAIBB38jBCEFIwRBMGokBEGYqQQoAgAiAkGUM2ooAgAhAyACQag0aigCACEEIAVBCGoiASIGQRRqEDogBkEcahA6IAEgADYCACABQQA2AgQgASADNgIIIAEgAkHIMmoiBigCADYCDCABIANBwANqEHAoAgA2AhAgBRDwBCABQRRqIgMgBSkDADcCACABIAJB8AFqIgcgAyAHEJUBGykCADcCHCAEQQFqIQMgAkGcNGoiAigCACAESgRAAkAgACACIAQQeigCAEYEQCACIAQQeigCDCAGKAIAQX9qRgRAIAEoAgwhACACIAQQeiAANgIMDAILCyACIAMQkQUgAiAEEHoiACABKQIANwIAIAAgASkCCDcCCCAAIAEpAhA3AhAgACABKQIYNwIYIAAgASgCIDYCIAsFIAIgARDsBgsgBSQECz8BA38QPCIBQfQCaiIAIgIgAigCAEF/ajYCACABIAAQfgR/QQAFIAAoAgggACgCAEF/akECdGooAgALNgLoAgtGAQJ/An8QPCICQfQCaiEDIAEEQCACQegCaiIBIAAgASgCAHI2AgAFIAJB6AJqIgEgASgCACAAQX9zcTYCAAsgAwsgARB4CzgBA38jBCEBIwRBEGokBBBgIQIgAUEIaiIDEMkCIAEgAkHIAWogAkEMahBAIAAgAyABEEAgASQECxAAIAAgASoCACABKgIMEDILiwMDBH8BfgR9IwQhBiMEQSBqJAQgBiEDQZipBCgCACIEQcQ0aigCAARAIARB+DRqKgIAIQkgBEGANWoqAgAhCiACIARB9DRqKgIAIgtDAAAAAGBFIARB/DRqKgIAIghDAAAAAGBFcgR9IAEqAhwFIAIqAgAgCyAIEGQLOAIAIAlDAAAAAGBFIApDAAAAAGBFcgR9IAJBBGohBSABKgIgBSACQQRqIgUqAgAgCSAKEGQLIQggBSAIOAIAIARBhDVqIgUoAgAEQCADQQRqEDogA0EMahA6IANBFGoQOiADIARBiDVqKAIANgIAIAMgASkCDDcCBCADIAEpAhw3AgwgAyACKQIANwIUIAMgBSgCAEH/AXFB4ARqEQQAIAIgAykCFDcCAAsLIAEoAghBwICACHFFBEAgAyACIARBpCpqEKYBIAIgAykDACIHNwIAIAIgB0IgiKe+IAEQvwEgARDRAZJDAAAAACAEQZwqaioCAEMAAIC/khA5khA5OAIECyAAIAIpAgA3AgAgBiQECywBAn9BmKkEKAIAIgBBtDNqKAIAIgEEfyABIABBlDNqKAIAKAKMAkYFQQALCwcAQcAAEAMLFgAgAEGYqQQoAgBB6gdqaiwAAEEARwtdAgJ/AX0gAEEATgRAQZipBCgCACIDQdgIaiAAQQJ0aioCACIEQwAAAABbIgIgAUEBc3JFBEAgBCADKgKIASIEXgR/IAAgBCADKgKMARCEB0EASgVBAAshAgsLIAILEAAgAgRAIAAgASACEEYaCwuAAwIEfwF8IwQhAyMEQRBqJAQgAyEBIAC8IgJBH3YhBCACQf////8HcSICQdufpPoDSQRAIAJBgICAzANPBEAgALsQ1AEhAAsFAn0gAkHSp+2DBEkEQCAEQQBHIQEgALshBSACQeSX24AETwRARBgtRFT7IQlARBgtRFT7IQnAIAEbIAWgmhDUAQwCCyABBEAgBUQYLURU+yH5P6AQ0wGMDAIFIAVEGC1EVPsh+b+gENMBDAILAAsgAkHW44iHBEkEQCAEQQBHIQEgALshBSACQeDbv4UETwRARBgtRFT7IRlARBgtRFT7IRnAIAEbIAWgENQBDAILIAEEQCAFRNIhM3982RJAoBDTAQwCBSAFRNIhM3982RLAoBDTAYwMAgsACyAAIACTIAJB////+wdLDQAaAkACQAJAAkAgACABEJEHQQNxDgMAAQIDCyABKwMAENQBDAMLIAErAwAQ0wEMAgsgASsDAJoQ1AEMAQsgASsDABDTAYwLIQALIAMkBCAAC4MDAwR/AX0BfCMEIQMjBEEQaiQEIAMhASAAvCICQR92IQQgAkH/////B3EiAkHbn6T6A0kEfSACQYCAgMwDSQR9QwAAgD8FIAC7ENMBCwUCfSACQdKn7YMESQRAIARBAEchASAAuyEGIAJB45fbgARLBEBEGC1EVPshCUBEGC1EVPshCcAgARsgBqAQ0wGMDAILIAEEQCAGRBgtRFT7Ifk/oBDUAQwCBUQYLURU+yH5PyAGoRDUAQwCCwALIAJB1uOIhwRJBEAgBEEARyEBIAJB39u/hQRLBEBEGC1EVPshGUBEGC1EVPshGcAgARsgALugENMBDAILIAEEQCAAjLtE0iEzf3zZEsCgENQBDAIFIAC7RNIhM3982RLAoBDUAQwCCwALIAAgAJMgAkH////7B0sNABoCQAJAAkACQCAAIAEQkQdBA3EOAwABAgMLIAErAwAQ0wEMAwsgASsDAJoQ1AEMAgsgASsDABDTAYwMAQsgASsDABDUAQsLIQUgAyQEIAULgwECAn8BfiAApyECIABC/////w9WBEADQCABQX9qIgEgACAAQgqAIgRCCn59p0H/AXFBMHI6AAAgAEL/////nwFWBEAgBCEADAELCyAEpyECCyACBEADQCABQX9qIgEgAiACQQpuIgNBCmxrQTByOgAAIAJBCk8EQCADIQIMAQsLCyABCxAAIABBIEYgAEF3akEFSXILHAAgAEGAYEsEf0GIqgRBACAAazYCAEF/BSAACwsTACAAKAIIIAAoAgBBf2pBBHRqC0IBAn8CfyABIQMgACgCACEBIAMLIAAoAgQiAEEBdWoiAiAAQQFxBH8gASACKAIAaigCAAUgAQtB/wFxQeAEahEEAAtlAQR/QZipBCgCACIBQZw0aigCACICQQBKBEACQCABQaQ0aigCACEDA38g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IAEoAghGBEAgARDhAQsgASAAIAEoAgAQ8gUiAjYCACABIAI2AgggACABEIIBDAULIAEQ4QEgAUEANgIIIAFBADYCACABQQA6AA8MBAsgARDhASABIAAoAiwiAjYCCCABIAI2AgAgAUEAOgAPDAMLIAAoAiwhBCAAIAEQggEgARDhASABLAAQBEAgASAENgIAIAQhAgUgASgCACICIARIBEADQAJAAn8gACACEOIBQf//A3FBCkYhDCABKAIAIQIgDAsNACABIAJBAWoiAjYCACACIARIDQELCwsLIAEgAjYCCCABQQA6AA8MAgtBAyEDDAELIAVBgIAMSARAIAVBjYAEawRAQQMhAwwCCyABKAIEIAEoAghGBEAgASAAIAEoAgAQ8gU2AgAgACABEIIBBSAAIAEQuAQLDAELAkACQAJAIAVBgIAMaw4CAgABCyABEOEBIAEgASgCCEEBajYCCCAAIAEQggEgASABKAIINgIAIAFBADoADwwCC0EDIQMMAQsgACABEIIBIAEQ4QEgASgCCCICQQBKBEAgASACQX9qIgI2AggLIAEgAjYCACABQQA6AA8LIANBA0YEQEEAIAUgBUH//wNKGyICQQBKBEACQCAGIAI7AQAgAkEKRgRAIAEsABANAQsCQAJAIAEsAAxFDQAgASgCBCABKAIIRw0AIAEoAgAiAiAAKAIsTg0AIAAhBSABQRhqIAJBAUEBELkEIgQEQCAEIAUgAhDiATsBAAsgACABKAIAQQEQ2QMgACABKAIAIAZBARCSAwRAIAEgASgCAEEBajYCACABQQA6AA8LDAELIAAgARCTAyAAIAEoAgAgBkEBEJIDBEAgASABKAIAQQEQ9wUgASABKAIAQQFqNgIAIAFBADoADwsLCwsFIANByQBGBEAgASgCBCABKAIIRgRAIAEoAgAiAiAAKAIsSARAIAAgASACQQEQ2gMLBSAAIAEQkwMLIAFBADoADwUgA0HOAEYEQCABKAIEIAEoAghGBEAgACABEIIBIAEoAgAiAkEASgRAIAAgASACQX9qQQEQ2gMgASABKAIAQX9qNgIACwUgACABEJMDCyABQQA6AA8LCwsgCSQEC0gBAX8gAUEYaiACIANBABC5BCIEQQBHIANBAEpxBEBBACEBA0AgAUEBdCAEaiAAIAEgAmoQ4gE7AQAgAUEBaiIBIANHDQALCwuTAQECfyAAQYAcakHjADsBACAAQYgcakHnBzYCACAAQf4baiICLgEAQeMARgRAIAAQ9gULIAFB5wdKBH8gAkEAOwEAIABBhBxqQQA2AgBBAAUgASAAQYQcaiIDKAIAakHnB0oEQANAIAAQ9gUgASADKAIAakHnB0oNAAsLIAIgAi4BACIBQQFqOwEAIAFBBHQgAGoLC1wAIAAgARCCASAAIAEQkwMgACABKAIAIAIgAxCSAwRAIAEgASgCACADEPcFIAEgAyABKAIAajYCACABQQA6AA8FIAFBlhxqIgAuAQAiAQRAIAAgAUF/ajsBAAsLC00BAn9BASEDA0ACQCAAIQIDQAJAIAJBAWohAAJAIAIsAAAOCwMAAAAAAAAAAAABAAsgACECDAELCyADQQFqIQMMAQsLIAEgAjYCACADC14BAn8jBCEEIwRBIGokBCAEIQUgASwAEARAIAUgAEEAEPYBIAUqAgwhAwsgASgCBCABKAIIRgRAIAEgASgCADYCBAsgASAAIAIgAxD1BSIANgIIIAEgADYCACAEJAQLVAECfyMEIQQjBEEgaiQEIAQhBSABLAAQBEAgBSAAQQAQ9gEgBSoCDCEDCyABIAAgAiADEPUFIgA2AgAgASAANgIEIAEgADYCCCABQQA6AA8gBCQECz0BAX8gABDYAiICLAAAQSVGBH8gAhDlCCIALAAABH8gASACIABBAWogAmtBIBC4ARD2BCABBSACCwUgAAsLgAECAn8BfiAAQQFqIAAgACwAAEEtRiIDGyIAQQFqIAAgACwAAEErRhsiACwAACICQVBqQRh0QRh1Qf8BcUEKSARAA0AgAkFQaqwgBEIKfnwhBCAAQQFqIgAsAAAiAkFQakEYdEEYdUH/AXFBCkgNAAsLIAFCACAEfSAEIAMbNwMAC80GAwp/AX0EfCMEIQsjBEEQaiQEQZipBCgCACEGIAIgA2IiCUEBcyIMIAFDAAAAAFxyIAMgAqEiEUQAAADg///vR2MiDUEBc3JFBEAgESAGQfTXAGoqAgC7orYhAQsgCyEIAkACQCAGQeAzaiIKKAIAIgdBAUcNAAJAQQAQlQEEQCAGQcQIaioCAEMAAIA/XgRAIAZBgAdqQQAQViIQIBBDCtcjPJQgBiwAigJFGyIQIBBDAAAgQZQgBiwAiQJFGyEQDAILCyAKKAIAIQcMAQsMAQsgB0ECRgRAIAQQ4wMhByAIQQNBBUPNzMw9QwAAIEEQkgEgCEEAEFYhECABIAcQ2QIQOSEBCwsgECABlCEBAn8gBkHEM2osAAAhDiAJBH8gAUMAAAAAXSAAKwMAIhIgAmVxIAFDAAAAAF4gEiADZnFyBUEACyEKIA4LQQBHIQgCfwJAIA0gBUMAAIA/XCAJcXEiCQR/IAFDAAAAAF0EQCAGQfDXAGoiByoCAEMAAAAAXg0CCyABQwAAAABeBH8gBkHw1wBqKgIAQwAAAABdBUEACwVBAAsgCCAKcnIEQCAGQfDXAGohBwwBCyABQwAAAABcBEAgBkHw1wBqIgggASAIKgIAkjgCACAGQezXAGoiB0EBOgAABUEAIAZB7NcAaiIHLAAARQ0CGgsgACsDACESIAkEQCAEIBEgEiACoSARo0QAAAAAAADwPyAFu6MiExDiAyIUIAZB8NcAaiIEKgIAuyARo6C2EFogBRCDAbuiIAKgEMEEIRIgB0EAOgAAIBIgAqEgEaMgExDiAyAUobYhBSAEIAQqAgAgBZM4AgAgACsDACETBSAEIBIgBkHw1wBqIgQqAgC7oBDBBCESIAdBADoAACAEIAQqAgAgEiAAKwMAIhOhtpM4AgALIBNEAAAAAAAAAAAgEiASRAAAAAAAAAAAYRsiEWEgDHJFBEAgAiARIBEgE2RFIAFDAAAAAF1FckEBckUgESACY3IbIgIgA2QEfCADBSACIAMgAiATY0UgAUMAAAAAXkVyQQFyGwshEQsgEyARYQR/QQAFIAAgETkDAEEBCwwBCyAHQwAAAAA4AgAgBkHs1wBqQQA6AABBAAshDyALJAQgDwunBgIKfwR9IwQhCyMEQRBqJARBmKkEKAIAIQYgAiADXCIJQQFzIgwgAUMAAAAAXHIgAyACkyIRQ///f39dIg1BAXNyRQRAIBEgBkH01wBqKgIAlCEBCyALIQgCQAJAIAZB4DNqIgooAgAiB0EBRw0AAkBBABCVAQRAIAZBxAhqKgIAQwAAgD9eBEAgBkGAB2pBABBWIhAgEEMK1yM8lCAGLACKAkUbIhAgEEMAACBBlCAGLACJAkUbIRAMAgsLIAooAgAhBwwBCwwBCyAHQQJGBEAgBBDjAyEHIAhBA0EFQ83MzD1DAAAgQRCSASAIQQAQViEQIAEgBxDZAhA5IQELCyAQIAGUIRACfyAGQcQzaiwAACEOIAkEfyAQQwAAAABdIAAqAgAiASACX3EgEEMAAAAAXiABIANgcXIFQQALIQogDgtBAEchCAJ/AkAgDSAFQwAAgD9cIAlxcSIJBH8gEEMAAAAAXQRAIAZB8NcAaiIHKgIAQwAAAABeDQILIBBDAAAAAF4EfyAGQfDXAGoqAgBDAAAAAF0FQQALBUEACyAIIApycgRAIAZB8NcAaiEHDAELIBBDAAAAAFwEQCAGQfDXAGoiCCAQIAgqAgCSOAIAIAZB7NcAaiIHQQE6AAAFQQAgBkHs1wBqIgcsAABFDQIaCyAAKgIAIQEgCQR9IAQgESABIAKTIBGVQwAAgD8gBZUiEhCDASITIAZB8NcAaiIEKgIAIBGVkhBaIAUQgwGUIAKSEMAEIQEgB0EAOgAAIAEgApMgEZUgEhCDASATkwUgBCABIAZB8NcAaiIEKgIAkhDABCEBIAdBADoAACABIAAqAgCTCyEFIAQgBCoCACAFkzgCACAAKgIAIgVDAAAAACABIAFDAAAAAFsbIgFbIAxyBEAgASECBQJAIAIgASABIAVeRSAQQwAAAABdRXJBAXJFIAEgAl1yGyICIANeRQRAIAIgBV1FIBBDAAAAAF5FckEBcg0BCyADIQILCyAFIAJbBH9BAAUgACACOAIAQQELDAELIAdDAAAAADgCACAGQezXAGpBADoAAEEACyEPIAskBCAPC7cEAwh/An4BfSMEIQgjBEEQaiQEQZipBCgCACEFIAIgA1IiCUEBcyIKIAFDAAAAAFxyRQRAIAVB9NcAaioCACADIAJ9tZQhAQsgCCEGAkACQCAFQeAzaiILKAIAIgdBAUcNAAJAQQAQlQEEQCAFQcQIaioCAEMAAIA/XgRAIAVBgAdqQQAQViIPIA9DCtcjPJQgBSwAigJFGyIPIA9DAAAgQZQgBSwAiQJFGyEPDAILCyALKAIAIQcMAQsMAQsgB0ECRgRAIAZBA0EFQ83MzD1DAAAgQRCSASAGQQAQViEPIAFBABDZAhA5IQELCyAPIAGUIQEgBUHEM2osAABBAEchBgJ/AkAgCQR/IAApAwAiDSACWCABQwAAAABdcSANIANaIAFDAAAAAF5xcgVBAAsgBnIEQCAFQfDXAGohAAwBCyABQwAAAABcBEAgBUHw1wBqIgYgASAGKgIAkjgCACAFQezXAGoiB0EBOgAABUEAIAVB7NcAaiIHLAAARQ0CGgsgBCAAKQMAIAVB8NcAaiIEKgIAr3wQ4QMhDSAHQQA6AAAgBCAEKgIAIA0gACkDACIOfbSTOAIAIA0gDlEgCnJFBEAgAiANIAFDAAAAAF1FIA0gDlhyRSANIAJUchsiAiADWAR+IAIgAyABQwAAAABeRSACIA5achsFIAMLIQ0LIA0gDlEEf0EABSAAIA03AwBBAQsMAQsgAEMAAAAAOAIAIAVB7NcAakEAOgAAQQALIQwgCCQEIAwLtwQDCH8CfgF9IwQhCCMEQRBqJARBmKkEKAIAIQUgAiADUiIJQQFzIgogAUMAAAAAXHJFBEAgBUH01wBqKgIAIAMgAn20lCEBCyAIIQYCQAJAIAVB4DNqIgsoAgAiB0EBRw0AAkBBABCVAQRAIAVBxAhqKgIAQwAAgD9eBEAgBUGAB2pBABBWIg8gD0MK1yM8lCAFLACKAkUbIg8gD0MAACBBlCAFLACJAkUbIQ8MAgsLIAsoAgAhBwwBCwwBCyAHQQJGBEAgBkEDQQVDzczMPUMAACBBEJIBIAZBABBWIQ8gAUEAENkCEDkhAQsLIA8gAZQhASAFQcQzaiwAAEEARyEGAn8CQCAJBH8gACkDACINIAJXIAFDAAAAAF1xIA0gA1kgAUMAAAAAXnFyBUEACyAGcgRAIAVB8NcAaiEADAELIAFDAAAAAFwEQCAFQfDXAGoiBiABIAYqAgCSOAIAIAVB7NcAaiIHQQE6AAAFQQAgBUHs1wBqIgcsAABFDQIaCyAEIAApAwAgBUHw1wBqIgQqAgCufBDhAyENIAdBADoAACAEIAQqAgAgDSAAKQMAIg59tJM4AgAgDSAOUSAKckUEQCACIA0gAUMAAAAAXUUgDSAOV3JFIA0gAlNyGyICIANXBH4gAiADIAFDAAAAAF5FIAIgDllyGwUgAwshDQsgDSAOUQR/QQAFIAAgDTcDAEEBCwwBCyAAQwAAAAA4AgAgBUHs1wBqQQA6AABBAAshDCAIJAQgDAu0BAIIfwF9IwQhCCMEQRBqJARBmKkEKAIAIQYgAiADRyIJQQFzIgogAUMAAAAAXHJFBEAgBkH01wBqKgIAIAMgAmuzlCEBCyAIIQUCQAJAIAZB4DNqIgsoAgAiB0EBRw0AAkBBABCVAQRAIAZBxAhqKgIAQwAAgD9eBEAgBkGAB2pBABBWIg0gDUMK1yM8lCAGLACKAkUbIg0gDUMAACBBlCAGLACJAkUbIQ0MAgsLIAsoAgAhBwwBCwwBCyAHQQJGBEAgBUEDQQVDzczMPUMAACBBEJIBIAVBABBWIQ0gAUEAENkCEDkhAQsLIA0gAZQhASAGQcQzaiwAAEEARyEFAn8CQCAJBH8gACgCACIHIAJNIAFDAAAAAF1xIAcgA08gAUMAAAAAXnFyBUEACyAFcgRAIAZB8NcAaiEADAELIAFDAAAAAFwEQCAGQfDXAGoiBSABIAUqAgCSOAIAIAZB7NcAaiIHQQE6AAAFQQAgBkHs1wBqIgcsAABFDQIaCyAEIAAoAgAgBkHw1wBqIgUqAgCpahDgAyEEIAdBADoAACAFIAUqAgAgBCAAKAIAIgVrspM4AgAgBCAFRiAKckUEQAJAIAIgBCABQwAAAABdRSAEIAVNckUgBCACSXIbIgQgA00EQCABQwAAAABeRSAEIAVPcg0BCyADIQQLCyAEIAVGBH9BAAUgACAENgIAQQELDAELIABDAAAAADgCACAGQezXAGpBADoAAEEACyEMIAgkBCAMC7QEAgh/AX0jBCEIIwRBEGokBEGYqQQoAgAhBiACIANHIglBAXMiCiABQwAAAABcckUEQCAGQfTXAGoqAgAgAyACa7KUIQELIAghBQJAAkAgBkHgM2oiCygCACIHQQFHDQACQEEAEJUBBEAgBkHECGoqAgBDAACAP14EQCAGQYAHakEAEFYiDSANQwrXIzyUIAYsAIoCRRsiDSANQwAAIEGUIAYsAIkCRRshDQwCCwsgCygCACEHDAELDAELIAdBAkYEQCAFQQNBBUPNzMw9QwAAIEEQkgEgBUEAEFYhDSABQQAQ2QIQOSEBCwsgDSABlCEBIAZBxDNqLAAAQQBHIQUCfwJAIAkEfyAAKAIAIgcgAkwgAUMAAAAAXXEgByADTiABQwAAAABecXIFQQALIAVyBEAgBkHw1wBqIQAMAQsgAUMAAAAAXARAIAZB8NcAaiIFIAEgBSoCAJI4AgAgBkHs1wBqIgdBAToAAAVBACAGQezXAGoiBywAAEUNAhoLIAQgACgCACAGQfDXAGoiBSoCAKhqEOADIQQgB0EAOgAAIAUgBSoCACAEIAAoAgAiBWuykzgCACAEIAVGIApyRQRAAkAgAiAEIAFDAAAAAF1FIAQgBUxyRSAEIAJIchsiBCADTARAIAFDAAAAAF5FIAQgBU5yDQELIAMhBAsLIAQgBUYEf0EABSAAIAQ2AgBBAQsMAQsgAEMAAAAAOAIAIAZB7NcAakEAOgAAQQALIQwgCCQEIAwLowMBAn8gAEGYqQQoAgAiCEG0M2oiCSgCAEYEQAJAAkACQCAIQeAzaigCAEEBaw4CAAECCyAILAD4AQ0BEHIMAQsgACAIQbA1aigCAEYEQCAIQcQzaiwAAEUEQBByCwsLCyAAIAkoAgBGBH8CfwJAAkACQAJAAkACQAJAIAEOBgABAgMEBQYLIAIgAyAEBH8gBCgCAAVBgICAgHgLIAUEfyAFKAIABUH/////BwsgBhD4CAwGCyACIAMgBAR/IAQoAgAFQQALIAUEfyAFKAIABUF/CyAGEPcIDAULIAIgAyAEBH4gBCkDAAVCgICAgICAgICAfwsgBQR+IAUpAwAFQv///////////wALIAYQ9ggMBAsgAiADIAQEfiAEKQMABUIACyAFBH4gBSkDAAVCfwsgBhD1CAwDCyACIAMgBAR9IAQqAgAFQ///f/8LIAUEfSAFKgIABUP//39/CyAGIAcQ9AgMAgsgAiADIAQEfCAEKwMABUT////////v/wsgBQR8IAUrAwAFRP///////+9/CyAGIAcQ8wgMAQtBAAsFQQALC7MCAQZ/IwQhByMEQSBqJARBmKkEKAIAIQggB0EQaiIFQQA2AgAgASgCACIEQX9KIAQgAkhxBEBBACAEIAVB6QIRBQAaCyAHQQhqIQYgByEEIANBf0cEQCAIQcQ0aigCAEUEQCAGQwAAAABDAAAAABAyIARD//9/fyADEPsFEDIgBiAEQQAQrwMLCyAAIAUoAgBBABD8BQRAIAJBAEoEQEEAIQNBACEAA0AgAxDQASABKAIAIQUCf0EAIAMgBkHpAhEFAAR/IAYoAgAFIAZB0J0CNgIAQdCdAgshCSAEQwAAAABDAAAAABAyIAkLIAMgBUYiBUEAIAQQrwEEQCABIAM2AgBBASEACyAFBEAQ8wQLEHkgA0EBaiIDIAJHDQALBUEAIQALEMgBBUEAIQALIAckBCAACwUAEMgBC+8BAgh/An0jBCEDIwRBMGokBCADIQUgA0EYaiEAIANBEGohAiADQQhqIQQQPCIBLAB/RQRAQZipBCgCACEGIAEqAswBIgggASoC7AGSIQkgAiABKgLIASAIEDIgBCABKgLIAUMAAIA/kiAJEDIgACACIAQQQyACIAAQdkMAAAAAEDIgAkMAAAAAEKkBIABBAEEAEGEEQAJ/IAEoAvQEIQcgAiAAKgIAIAAqAgQQMiAEIAAqAgAgACoCDBAyIAcLIAIgBEEbQwAAgD8QQkMAAIA/EMUBIAZBzNgAaiwAAARAQcCdAiAFEKYDCwsLIAMkBAt9AQV/IwQhAiMEQRBqJAQgAiEAEDwiASwAf0UEQEGYqQQoAgAhAyABKALgAiEEIAFBATYC4AIgASoC7AFDAAAAAF4EQCAAQwAAAABDAAAAABAyBSAAQwAAAAAgA0G0MWoqAgAQMgsgAEMAAAAAEKkBIAEgBDYC4AILIAIkBAvrAQIJfwF9IwQhACMEQTBqJAQgAEEgaiEBIABBEGohAiAAIQMgAEEIaiEGEDwiBywAf0UEQEGYqQQoAgAiBEG0MWoiCCoCACEJIARBxCpqIQUgAyAJIAcqAuwBIAkgBEHIKmoqAgBDAAAAQJSSEEUgCRA5IgkQMiABIAdByAFqIgQgAxA1IAIgBCABEEMgAkMAAAAAEHwgAkEAQQAQYQRAIAMgBSoCACAIKgIAQwAAAD+UkiAJQwAAAD+UEDIgBiACIAMQNSABIAYpAgA3AgAgARCyBAtDAAAAACAFKgIAQwAAAECUEGsLIAAkBAuSBAIMfwJ9IwQhAyMEQYABaiQEIANB8ABqIQUgAyEGIANB0ABqIQogA0HIAGohCCADQThqIQQgA0HoAGohCSADQeAAaiELIANB2ABqIQwQPCINLAB/RQRAQZipBCgCACEHIAggDSkCyAE3AwAgAyABKQIANwMwEL4BIQ8gB0G0MWoqAgAgB0HIKmoiASoCAEMAAABAlJIhECAFIAMpAjA3AgAgCSAFIA8gEBDJAyAGIAggCRA1IAQgCCAGEEMgBCABKgIAEHwgBEEAQQAQYQRAIAAQWiEAIAMgBCkDADcDKCADIARBCGoiASkDADcDIEEHQwAAgD8QQiEIIAdBzCpqIg4qAgAhDyAGIAMpAig3AgAgBSADKQIgNwIAIAYgBSAIQQEgDxCsASAFIAdB0CpqKgIAjCIPIA8QMiAEIAUQ0AIgBSAEKgIAIAEqAgAgABB/IAQqAgwQMiANKAL0BCAEQShDAACAPxBCIAAgDioCABCLCSACRQRAIAogAEMAAMhClEMK1yM8krs5AwAgBkEgQZidAiAKEHMaIAYhAgsgCSACQQBBAEMAAIC/EGwgCSoCACIAQwAAAABeBEAgCyAFKgIAIAdB1CpqKgIAkiAEKgIAIAEqAgAgAJMgB0HcKmoqAgCTEGQgBCoCBBAyIAxDAAAAAEMAAAA/EDIgCyABIAJBACAJIAwgBBCtAQsLCyADJAQL0AMCDn8BfSMEIQcjBEHgAGokBCAHQcgAaiELIAdBQGshDCAHQSBqIQggB0EQaiEJIAdBMGohCiAHQShqIQ0gB0HQAGohECAHIREQPCIOLAB/BH9BAAVBmKkEKAIAIRIgABDQASAOQYGdAhBeIQ8QeSAEQX9KBEAgCCAEsiIVIBUQMgUgCCASQcQqaikCADcDAAsgDCAOQcgBaiIEIAEQNSAKIAgQ5QMgCyAMIAoQNSAJIAQgCxBDIAsgBCAIEDUgDSAEIAgQNSAMIA0gARA1IAogCyAMEEMgCUMAAAAAEHwgCSAPQQAQYQR/IAkgDyANIBBBABCRASETQRVBFiANLAAARSIBG0EXIBAsAABFIAFyG0MAAIA/EEIhASAJIA9BARCXASAHIAkpAwA3AwggESAJKQMINwMAIAgqAgAgCCoCBBBFQwAAAAAgEkHMKmoqAgAQZCEVIAwgBykCCDcCACALIBEpAgA3AgAgDCALIAFBASAVEKwBIAUqAgxDAAAAAF4EQCAOKAL0BCAKIApBCGoiASAFEOQBQwAAAABBDxB1BSAKQQhqIQELIA4oAvQEIAAgCiABIAIgAyAGEOQBEPwBIBMFQQALCyEUIAckBCAUC7sCAQl/IwQhCCMEQTBqJAQgCEEgaiEGIAhBGGohByAIQRBqIQsgCEEIaiEMIAghDRA8IgosAH9FBEAgByAKQcgBaiIJIAEQNSAGIAkgBxBDIAUqAgxDAAAAAF4EQCAHQwAAAEBDAAAAQBAyIAYgByoCACAGKgIIkjgCCCAGIAcqAgQgBioCDJI4AgwLIAZDAAAAABB8IAZBAEEAEGEEQCAKKAL0BCEJIAZBCGohASAFKgIMQwAAAABeBEAgCSAGIAEgBRDkAUMAAAAAQQ9DAACAPxCkAQJ/IAooAvQEIQ4gC0MAAIA/QwAAgD8QMiAHIAYgCxA1IA1DAACAP0MAAIA/EDIgDCABIA0QQCAOCyAAIAcgDCACIAMgBBDkARD8AQUgCSAAIAYgASACIAMgBBDkARD8AQsLCyAIJAQL1QICDX8BfSMEIQIjBEFAayQEIAIhCkGYqQQoAgAiBEGUM2ooAgAhCCACQRhqIgUgBEG0MWoiCyoCACIPIA8QMiACQSBqIgYgASAFEDUgAkEQaiIJIARBxCpqIgwQ5QMgAkE4aiIDIAYgCRA1IAJBKGoiByABIAMQQyAHIABBABBhGiAHIAAgBiAFQQAQkQEhDkEVQRYgBiwAAEUiABtBFyAFLAAARSAAchtDAACAPxBCIQEgBiwAACAFLAAAckH/AXEEQAJ/IAgoAvQEIQ0gCSAHEOYDIApDAAAAAEMAAAC/EDIgAyAJIAoQNSANCyADIAsqAgBDAAAAP5RDAACAP5IgAUEJEJUCCyACQQhqIgEgByAMEDVBAUEDIAgsAH0bIQAgAyABKQIANwIAIAMgAEMAAIA/ENECEPMCBEBBAEMAAIC/EJAEBEAgCBDABwsLIAIkBCAOCz4CA38BfSMEIQIjBEEQaiQEIAIQ/gEiBSAFEDIgAkEIaiIDIAIpAgA3AgAgACABIANBABDDBCEEIAIkBCAEC4IDAgx/A30jBCECIwRBQGskBCACQTBqIQMgAkEoaiEHIAJBGGohBSACIQQgAkEQaiEKIAJBCGohCxA8IggsAH9FBEBBmKkEKAIAIgZB3NwAaiIMQYEYIAAgARC8AiAGQdzcAGpqIQ0gByAMIA1BAEMAAIC/EGxDAAAAACAIKgLwARA5IRAgBkHEKmohCSAIKgLsASAGQbQxaiIBKgIAIg4gBkHIKmoqAgBDAAAAQJSSEEUgDhA5IQ8gBCAOIAcqAgAiDkMAAAAAXgR9IA4gCSoCAEMAAABAlJIFQwAAAAALkiAPIAcqAgQQORAyIAMgCEHIAWoiACAEEDUgBSAAIAMQQyAFQwAAAAAQfCAFQQBBABBhBEAgBCAJKgIAIAEqAgBDAAAAP5SSIA9DAAAAP5QQMiAKIAUgBBA1IAMgCikCADcCACADELIEIAQgASoCACAJKgIAQwAAAECUkiAQEDIgCyAFIAQQNSADIAspAgA3AgAgAyAMIA1BABCuAQsLIAIkBAv8AgILfwF9IwQhAiMEQdAAaiQEIAJBQGshAyACQThqIQQgAkEoaiEFIAJBGGohBiACQQhqIQsgAiEJIAJBEGohDBA8IgcsAH9FBEBBmKkEKAIAIQgQvgEhDSAEIABBAEEBQwAAgL8QbCAGIA0gBCoCBCAIQcgqaiIKKgIAQwAAAECUkhAyIAMgB0HIAWoiByAGEDUgBSAHIAMQQyAJIA0gBCoCAEMAAAAAXgR9IAhB3CpqKgIABUMAAAAAC5IgCioCAEMAAABAlBAyIAsgByAJEDUgAyALIAQQNSAGIAcgAxBDIAYgCioCABB8IAZBAEEAEGEEQCAIQdzcAGoiCUGBGEG6zAIgARC8AiAIQdzcAGpqIQEgA0MAAAAAQwAAAD8QMiAFIAVBCGogCSABQQAgA0EAEK0BIAQqAgBDAAAAAF4EQCAMIAUqAgggCEHcKmoqAgCSIAUqAgQgCioCAJIQMiADIAwpAgA3AgAgAyAAQQBBARCuAQsLCyACJAQLIQEBfyMEIQIjBEEQaiQEIAIgATYCACAAIAIQhQkgAiQECzsAQZipBCgCAEGUM2ooAgAqAvACQwAAAABdBEBDAAAAABDgBkG6zAIgABDaAhDfBgVBuswCIAAQ2gILCx8BAX8jBCEBIwRBEGokBCABIAA2AgAgARCHCSABJAQLOAEBfyMEIQEjBEEQaiQEIAEgADYCAEEAQZipBCgCAEHAK2oQggJBuswCIAEQ2gJBARCiAiABJAQLpQECBH8EfSMEIQMjBEEQaiQEIANBCGohBCADIQUgASABKgIEIAAoAigoAggiBioCDCAGKgJIkkMAAAA/kkMAAIC/kqiykiIHOAIEIAEqAgAhCCAHQwAAgD+SIQlBACEBA0AgBCABskMAAABAlCAIkiIKIAcQMiAFIApDAACAP5IgCRAyIAAgBCAFIAJDAAAAAEEPEHUgAUEBaiIBQQNHDQALIAMkBAuOBgIHfwR9IwQhCCMEQTBqJAQgCEEgaiEGIAhBEGohByAIIgVBGGoiCUMAAAAAOAIAIAVBCGoiCiADOAIAIANDAAAAAFwEQEMAAAAAIANeBEAgCSgCACELIAkgCigCADYCACAKIAs2AgAgCSoCACENIAoqAgAhAwsgBiABKgIAIAEqAgggDRB/IAEqAgQQMiAHIAEqAgAgASoCCCADEH8gASoCDBAyIARDAAAAAFsEQCAAIAYgByACQwAAAABBDxB1BUMAAIA/QwAAgD8gASoCCCABKgIAIg6TQwAAAD+UIAEqAgwgASoCBJNDAAAAP5QQRUMAAIC/kkMAAAAAIAQQZCIMlSINIAYqAgAiAyAOk5STEOgDIQ9DAACAPyANIAcqAgAgDpOUkxDoAyEEIAMgDiAMkhA5IQMgDyAEWwRAIAUgAyAHKgIEEDIgACAFEGMgBSADIAYqAgQQMiAAIAUQYwUgD0MAAAAAWyAEQ9sPyT9bcQRAIAUgAyAHKgIEIAyTEDIgACAFIAxBA0EGEMYBIAUgAyAMIAYqAgSSEDIgACAFIAxBBkEJEMYBBSAFIAMgByoCBCAMkxAyIAAgBSAMQ9sPSUAgBJND2w9JQCAPk0EDEJcCIAUgAyAMIAYqAgSSEDIgACAFIAwgD0PbD0lAkiAEQ9sPSUCSQQMQlwILCyAHKgIAIgQgDCABKgIAkl4EQAJAQwAAgD8gDSABKgIIIgMgBJOUkxDoAyEOQwAAgD8gDSADIAYqAgCTlJMQ6AMhDSAEIAMgDJMQRSEDIA4gDVsEQCAFIAMgBioCBBAyIAAgBRBjIAUgAyAHKgIEEDIgACAFEGMMAQsgDkMAAAAAWyANQ9sPyT9bcQRAIAUgAyAMIAYqAgSSEDIgACAFIAxBCUEMEMYBIAUgAyAHKgIEIAyTEDIgACAFIAxBAEEDEMYBBSAFIAMgDCAGKgIEkhAyIAAgBSAMIA2MIA6MQQMQlwIgBSADIAcqAgQgDJMQMiAAIAUgDCAOIA1BAxCXAgsLCyAAIAIQgQILCyAIJAQLWQEDfyMEIQUjBEEQaiQEIAUhAwJAAkAgACABEJ4DIgQgABCdA0YNACAEKAIAIAFHDQAgBCACNgIEDAELIAMgATYCACADIAI2AgQgACAEIAMQxwQaCyAFJAQL9QMBD38jBCEEIwRB8ABqJAQgBEHoAGohByAEQeAAaiEKIAQhCCAEQdgAaiEFIARB0ABqIQYgBEHIAGohCyAEQUBrIQwgBEE4aiENIARBMGohDiAEQShqIQ8gBEEgaiEQIANBf0cEQCAAKAIoKAIIKAJEIREgBxA6IAoQOiAIQSBqIRIgCCEJA0AgCRA6IAlBCGoiCSASRw0ACyARIAMgByAKIAggCEEQaiIJEJIJBEAgASABKgIAIAcqAgCTOAIAIAEgASoCBCAHKgIEkzgCBCAAIBEoAggiAxCYAiALQwAAgD9DAAAAABAyIAYgCyACEFEgBSABIAYQNSAPQwAAgD9DAAAAABAyIA4gDyACEFEgDSABIA4QNSAQIAogAhBRIAwgDSAQEDUgACADIAUgDCAJIAhBGGoiB0GAgICAAxD8ASALQwAAAEBDAAAAABAyIAYgCyACEFEgBSABIAYQNSAPQwAAAEBDAAAAABAyIA4gDyACEFEgDSABIA4QNSAQIAogAhBRIAwgDSAQEDUgACADIAUgDCAJIAdBgICAgAMQ/AEgBiAKIAIQUSAFIAEgBhA1IAAgAyABIAUgCSAHQYCAgHgQ/AEgBiAKIAIQUSAFIAEgBhA1IAAgAyABIAUgCCAIQQhqQX8Q/AEgABDlAgsLIAQkBAuRAgIFfwJ9IwQhBiMEQSBqJAQgBkEYaiEHIAZBEGohCCAGQQhqIQkgBiEKAkACQCAFQRB0QRB1QQlrDhgBAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEACyAAIAUQ4QIiBQRAIAJDAAAAAGAEfSACIAAqAgCVBUMAAIA/CyECIAMgACoCCCADKgIAqLKSIgs4AgAgAyAAKgIMIAMqAgSospIiDDgCBCABQQZBBBCwASAHIAsgAiAFKgIIlJIgDCACIAUqAgyUkhAyIAggCyACIAUqAhCUkiAMIAIgBSoCFJSSEDIgCSAFKgIYIAUqAhwQMiAKIAUqAiAgBSoCJBAyIAEgByAIIAkgCiAEEPMDCwsgBiQECw4AIAAgATsBPCAAENAECzsAQeDjAy4BAEUEQEHg4wNB0IEBKQMANwMAQejjA0HYgQEpAwA3AwBB8KgBQZoPQfDjAxCEBgtB4OMDCzsAQbCVAy4BAEUEQEGwlQNB0IEBKQMANwMAQbiVA0HYgQEpAwA3AwBB4IEBQcQTQcCVAxCEBgtBsJUDC5UCAgd/AX4jBCEJIwRBIGokBCAJQRhqIQcgCUEIaiEIIAkiBkEQaiEKIAFBB0sEf0EABSAAKAIEQQJxBH9BAAUgCCAAQUBrIAAoAlgQVSILLwEIsiALLwEKshAyIAcgAUEYbEHw/wBqIAgQNSAIIAFBGGxB+P8AaikDACINNwMAIAMgDTcCACACIAFBGGxBgIABaikDADcCACAGIAcgAEEkaiIAEKACIAQgBikDADcCACAKIAcgCBA1IAYgCiAAEKACIAQgBikDADcCCCAHIAcqAgBDAADaQpI4AgAgBiAHIAAQoAIgBSAGKQMANwIAIAogByAIEDUgBiAKIAAQoAIgBSAGKQMANwIIQQELCyEMIAkkBCAMC+wBAQd/IwQhCSMEQRBqJAQgCSEFIAAoAhgiBgRAIAYhBQUgBUEANgIAIAAgBUEAQQBBABCfBiAFKAIAIgcEQCAAIAAoAiAgACgCHEECdGwQUyIGNgIYIAYhBSAAKAIcIAAoAiBsIghBAEoEQANAIAdBAWohCiAGQQRqIQsgBiAHLQAAQRh0Qf///wdyNgIAIAhBf2ohByAIQQFKBEAgCyEGIAchCCAKIQcMAQsLCwUgACgCGCEFCwsgASAFNgIAIAIEQCACIAAoAhw2AgALIAMEQCADIAAoAiA2AgALIAQEQCAEQQQ2AgALIAkkBAugBAECfyAALAAAIgFB/wFxIQICQCABQf8BcUEfSgRAIAFBAEgEQEGsqQQoAgAgAC0AAWtBf2ogAkGBf2oQ2wIgAEECaiEADAILIAFB/wFxQT9KBH9BrKkEKAIAQf//ACAALQABIAJBCHRya2ogAC0AAkEBahDbAiAAQQNqBSAAQQFqIAJBYWoQxgQgACAALQAAQWJqagshAAUgAUH/AXFBF0oEQEGsqQQoAgBB///fACAALQACIAJBEHRyIAAtAAFBCHRya2ogAC0AA0EBahDbAiAAQQRqIQAMAgsgAUH/AXFBD0oEQEGsqQQoAgBB//8/IAAtAAIgAkEQdHIgAC0AAUEIdHJraiAALQAEIAAtAANBCHRyQQFqENsCIABBBWohAAwCCyABQf8BcUEHSgRAIABBAmogAC0AASACQQh0ckGBcGoQxgQgACAALQABIAAtAABBCHRyQYNwamohAAwCCwJAAkACQAJAIAFBBGsOBAIDAQADCyAAQQNqIAAtAAIgAC0AAUEIdHJBAWoQxgQgACAALQACIAAtAAFBCHRyQQRqaiEADAQLQaypBCgCACAALQADIAAtAAFBEHRyIAAtAAJBCHRyQX9zaiAALQAEQQFqENsCIABBBWohAAwDC0GsqQQoAgAgAC0AAyAALQABQRB0ciAALQACQQh0ckF/c2ogAC0ABSAALQAEQQh0ckEBahDbAiAAQQZqIQALCwsgAAtNAQN/IAAoAgQgAUgEQCABQfQAbBBTIQIgAEEIaiIDKAIAIgQEQCACIAQgACgCAEH0AGwQRhogAygCABBBCyADIAI2AgAgACABNgIECwveAQEBfyAAKAIAIgIgACgCBEYEQCAAIAAgAkEBahBYEJUJIAAoAgAhAgsgACgCCCACQfQAbGoiAiABKQIANwIAIAIgASkCCDcCCCACIAEpAhA3AhAgAiABKQIYNwIYIAIgASkCIDcCICACIAEpAig3AiggAiABKQIwNwIwIAIgASkCODcCOCACQUBrIAFBQGspAgA3AgAgAiABKQJINwJIIAIgASkCUDcCUCACIAEpAlg3AlggAiABKQJgNwJgIAIgASkCaDcCaCACIAEoAnA2AnAgACAAKAIAQQFqNgIAC74BAQV/IwQhAyMEQRBqJAQgAyECIABBNGohBSABLAA8BEAgBRB+GgVB2AAQUyEEIAMgAywABDoABSAEEIUGIAIgBDYCACAFIAIQeAsgAEHMAGoiAiABEJYJIAIoAgggAigCAEF/akH0AGxqIgIoAnBFBEAgAiAFEHAoAgA2AnALIAIsAAhFBEAgAiACKAIEEFMiBDYCACACQQE6AAggBCABKAIAIAIoAgQQRhoLIAAQ7wMgAigCcCEGIAMkBCAGC6sBAQF/IAEtAAMgAS0AAEEYdCABLQABQRB0cnIgAS0AAkEIdHJBgIDwvQVGBEAgAS0AByABLQAEQRh0IAEtAAVBEHRyciABLQAGQQh0ckUEQCABEIcGIQJBoKkEIAE2AgBBpKkEIAAgAmoiAjYCAEGoqQQgADYCAEGsqQQgADYCACABQRBqIQADQCAAEJQJIgEgAEZBrKkEKAIAIAJLckUEQCABIQAMAQsLCwsL6QEBBX8jBCEGIwRBgAFqJAQgBiEFIAEQhwYiBxBTIgggARCYCSADBEAgBSADKQIANwIAIAUgAykCCDcCCCAFIAMpAhA3AhAgBSADKQIYNwIYIAUgAykCIDcCICAFIAMpAig3AiggBSADKQIwNwIwIAUgAykCODcCOCAFQUBrIANBQGspAgA3AgAgBSADKQJINwJIIAUgAykCUDcCUCAFIAMpAlg3AlggBSADKQJgNwJgIAUgAykCaDcCaCAFIAMoAnA2AnAFIAUQ3wILIAVBAToACCAAIAggByACIAUgBBCGBiEJIAYkBCAJC4oBAQJ/QaAiIQFBoCIsAAAiAgRAA0AgACACEJsDIAEsAAEQmwMgASwAAhCbAyABLAADEJsDIAEsAAQQmwNB1QBsakHVAGxqQdUAbGpB1QBsaiICOgAAIAAgAkEIdjoAASAAIAJBEHY6AAIgACACQRh2OgADIABBBGohACABQQVqIgEsAAAiAg0ACwsLLgECf0GgIhBcQQRqQQVtQQJ0EFMiBBCaCSAAIAQgASACIAMQmQkhBSAEEEEgBQtoAQJ/IwQhASMEQRBqJAQgAEEQaiICEDogAEF/NgIAIABBADsBBiAAQQA7AQQgAEF/OwEKIABBfzsBCCAAQwAAAAA4AgwgAUMAAAAAQwAAAAAQMiACIAEpAwA3AgAgAEEANgIYIAEkBAtNAQN/IAAoAgQgAUgEQCABQcQBbBBTIQIgAEEIaiIDKAIAIgQEQCACIAQgACgCAEHEAWwQRhogAygCABBBCyADIAI2AgAgACABNgIECwu6AgACfwJAAkACQAJAAkAgACwAAA51AwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBBAsgACwAAQ0DIAAsAAINAyAALAADDQNBAQwECwJAAkAgACwAAUHyAGsOCAEEBAQEBAQABAsgACwAAkHwAEcNAyAALAADQTFHDQNBAQwECyAALAACQfUARw0CIAAsAANB5QBHDQJBAQwDCyAALAABQdQARw0BIAAsAAJB1ABHDQEgACwAA0HPAEcNAUEBDAILIAAsAAFBAUcNACAALAACDQAgACwAAw0AQQEMAQtBAAsLoAEBAX8gABCeCQR/IAFBAEdBH3RBH3UFIAAsAABB9ABGBH8gACwAAUH0AEYEfyAALAACQeMARgR/IAAsAANB5gBGBH8CfyAAQQRqEMMBIgJBgIAISAR/QX8gAkGAgARrDQEFQX8gAkGAgAhrDQELGiAAQQhqEMMBIAFKBH8gAEEMaiABQQJ0ahDDAQVBfwsLBUF/CwVBfwsFQX8LBUF/CwsLwwgBEn8jBCEGIwRB4ABqJAQgBkFAayEIIAZBNGohBCAGQShqIQcgBkEkaiEKIAZBIGohCyAGQRBqIQwgBkEMaiENIAZBFGohDiAGIQUgACABNgIEIAAgAjYCCCAGQcwAaiIDQQBBABD5ASAAIAMpAgA3AjQgACADKAIINgI8IAEgAkGnnAIQ4wEhCSAAIAEgAkGsnAIQ4wEiDzYCECAAIAEgAkGxnAIQ4wEiEDYCFCAAIAEgAkG2nAIQ4wEiETYCGCAAIAEgAkG7nAIQ4wEiEjYCHCAAIAEgAkHAnAIQ4wEiEzYCICAAIAEgAkHFnAIQ4wE2AiQgACABIAJBypwCEOMBNgIoIBNFIBJFIAlFIBBFcnJyBH9BAAUCfyARBEBBACAPRQ0BGgUCQCAKQQI2AgAgC0EANgIAIAxBADYCACANQQA2AgAgASACQc+cAhDjASIPBEACQCADQQBBABD5ASAAIAMpAgA3AmQgACADKAIINgJsIANBAEEAEPkBIAAgAykCADcCcCAAIAMoAgg2AnggAyABIA9qQYCAgIACEPkBIAAgAykCADcCNCAAIAMoAgg2AjwgBCAAKQI0NwIAIAQgACgCPDYCCCAEQQIQkgIgBCAEEKMBQf8BcRD4ASADIAQQugIgDiAEELoCIAMgDikCADcCACADIA4oAgg2AgggByADQQAQ6wMgAyAEELoCIAMgBBC6AiAAIAMpAgA3AkwgACADKAIINgJUIAdBEUEBIAsQ3QIgB0GGAkEBIAoQ3QIgB0GkAkEBIAwQ3QIgB0GlAkEBIA0Q3QIgCCAEKQIANwIAIAggBCgCCDYCCCADIAcpAgA3AgAgAyAHKAIINgIIIAUgCCADEIwGIAAgBSkCADcCWCAAIAUoAgg2AmAgCygCACIHRSAKKAIAQQJHckUEQCAMKAIAIggEQCANKAIAIgVFDQIgBCAIEPgBIAMgBBC6AiAAIAMpAgA3AmQgACADKAIINgJsIAMgBCAFIAQoAgggBWsQ3AIgACADKQIANwJwIAAgAygCCDYCeAsgBCAHEPgBIAMgBBC6AiAAQUBrIgUgAykCADcCACAFIAMoAgg2AggMAwsLC0EADAILCyAAIAEgAkHUnAIQ4wEiAgR/IAEgAmpBBGoQSkH//wNxBUH//wMLNgIMIAEgCWpBAmoQSiICQf//A3EhBCAAQQA2AiwgAkH//wNxBH8gCUEEaiEHQQAhAkEAIQUDQAJAAkACQCABIAcgBUEDdGpqIgMQSkEQdEEQdQ4EAQICAAILAkAgA0ECahBKQRB0QRB1QQFrDgoAAgICAgICAgIAAgsgACADQQRqEMMBIAlqIgI2AiwMAQsgACADQQRqEMMBIAlqIgI2AiwLIAVBAWoiBSAERw0ACyACBH8gACABIAAoAhRqQTJqEEpB//8DcTYCMEEBBUEACwVBAAsLCyEUIAYkBCAUC6EBAQJ/IwQhByMEQTBqJAQgByIGQgA3AgQgBkIANwIMIAZCADcCFCAGQgA3AhwgBkIANwIkIAZBADYCLCAGQQE2AgAgACABIAYQzAQhACACBEAgAiAGKAIYQQAgABs2AgALIAMEQCADIAYoAiBBACAAGzYCAAsgBARAIAQgBigCHEEAIAAbNgIACyAFBEAgBSAGKAIkQQAgABs2AgALIAckBAukAQAgACgCPAR/IAAgASACIAMgBCAFEKEJQQEFIAAgARCLBiIBQQBIBH9BAAUgAgRAIAIgACgCBCABakECahBKQRB0QRB1NgIACyADBEAgAyAAKAIEIAFqQQRqEEpBEHRBEHU2AgALIAQEQCAEIAAoAgQgAWpBBmoQSkEQdEEQdTYCAAsgBQRAIAUgACgCBCABakEIahBKQRB0QRB1NgIAC0EBCwsLvgEBAn8gBEF/aiEGIARBAUoEfwN/IAVBA3QgA2ogBUEBaiIFQQN0IANqNgIEIAUgBkcNACAGCwVBAAtBA3QgA2pBADYCBCAAQQE2AgwgAEEANgIQIAAgAzYCHCAAIABBIGo2AhggACABNgIAIAAgAjYCBCAAIAQ2AhQgACAAKAIUIgIgACgCAEF/amogAm02AgggAEEAOwEgIABBADsBIiAAIABBKGo2AiQgACABOwEoIABBfzsBKiAAQQA2AiwLlwQBDH8jBCEPIwRBEGokBCAPIQwgAUEYaiIHKAIAIgovAQAiBSABKAIIIgQgAkF/amoiAiACIARvayILaiABKAIASgR/QQAhBUGAgICABCECQYCAgIAEIQRBAAVBgICAgAQhAkGAgICABCEEIAchBgNAIAogBSALIAwQiQYhBSABKAIQBEAgAyAFaiABKAIETARAAkAgBSAESAR/IAwoAgAFIAQgBUYgDCgCACIJIAJIcQR/IAkFDAILCyECIAYhCCAFIQQLCwUgBiAIIAUgBEgiBhshCCAFIAQgBhshBAsgCkEEaiIGKAIAIgovAQAiBSALaiABKAIATA0ACyAIBH8gCCIFKAIALwEABUEAIQVBAAsLIQggASgCEEEBRgRAIAsgBygCACIJLwEASgR/IAkhBgN/IAsgBigCBCIGLwEASgR/DAEFIAYLCwUgCQsiDgRAIAQhBiAHIQoDfyAOLwEAIAtrIQ0DQCANIAlBBGoiBCgCACIHLwEATgRAIAchCSAEIQoMAQsLIAMgCSANIAsgDBCJBiIHaiABKAIETiAHIAZKcgR/IAUFAn8gByAGSCAMKAIAIgQgAkhyBEAgBCECBSAFIAIgBEYgDSAISHFFDQEaCyANIQggByEGIAoLCyEEIA4oAgQiDgR/IAQhBQwBBSAEIQUgBgsLIQQLCyAAIAU2AgggACAINgIAIAAgBDYCBCAPJAQLGQBBfyAAKAIMIgAgASgCDCIBSiAAIAFIGwuFAgEDfyAAIAEgAiADEKQJAkACQCAAKAIIIgRFDQAgAyAAKAIEaiIDIAEoAgRKDQAgASgCHCIFRQ0AIAUgACgCACIAOwEAIAUgAzsBAiABIAUoAgQ2AhwgACAEKAIAIgMvAQBKBEAgA0EEaiIDIQQgAygCACEDCyAEIAU2AgAgACACaiEGIANBBGoiBCgCACIABEACQCADIQIgBCEDA0AgBiAALwEASARAIAIhAAwCCyADIAEoAhw2AgAgASACNgIcIABBBGoiAygCACIEBEAgACECIAQhAAwBCwsLBSADIQALIAUgADYCBCAGIAAvAQBKBEAgACAGOwEACwwBCyAAQQA2AggLC0UBAn8gAC8BBiICIAEvAQYiA0oEf0F/BSACIANIBH9BAQVBfyAALwEEIgAgAS8BBCIBSCAAQf//A3EgAUH//wNxShsLCwtTAQN/IwQhAyMEQRBqJAQgAyEEAkACQCAAIAEQngMiAiAAEJ0DRg0AIAIoAgAgAUcNAAwBCyAEIAFBfxChASAAIAIgBBDHBCECCyADJAQgAkEEagtgAQF/IAAQyARB/wFxQR5GBEACQCAAQQEQkgIgACgCBCAAKAIISARAA0AgABCjAUH/AXEiAUEPcUEPRiABQfABcUHwAUZyDQIgACgCBCAAKAIISA0ACwsLBSAAEMoEGgsLsAEBBH8gAUEAEPgBAkACQCABKAIEIgMgASgCCE4NAANAAkAgARDIBEH/AXFBG0oEfwNAIAEQqQkgARDIBEH/AXFBG0oNAAsgASgCBAUgAwshBSABEKMBIgZB/wFxIQQgBkH/AXFBDEYEQCABEKMBQf8BcUGAAnIhBAsgAiAERg0AIAEoAgQiAyABKAIISA0BDAILCyAAIAEgAyAFIANrENwCDAELIAAgAUEAQQAQ3AILCywBAX8gACABEJ4DIgIgABCdA0YEf0EABSABIAIoAgBGBH8gAigCBAVBAAsLC30BBH8jBCEEIwRBEGokBCAEIQMgAkGAgAJB6wgCf0HrACEGIAFBABD4ASAGCyABQQIQxAEiBUHXCUobIAVB64gCShtqIgJBf0ogAiAFSHEEQCADIAEpAgA3AgAgAyABKAIINgIIIAAgAyACEOsDBSAAQQBBABD5AQsgBCQEC8wCAQp/IwQhBSMEQUBrJAQgBUEwaiEEIAVBJGohCCAFQRhqIQcgBSEJIAVBDGoiAyABQfAAaiIGKQIANwIAIAMgBigCCDYCCCADQQAQ+AECfwJAAkACQCADEKMBQRh0QRh1DgQAAgIBAgsgAyACEJICIAMQowFB/wFxDAILIANBAhDEASEKIANBAhDEASEGIApBAEwNAANAAkAgAxCjASEMIAYgAkwgA0ECEMQBIgYgAkpxDQAgC0EBaiILIApIDQEMAgsLIAxB/wFxDAELIARBAEEAEPkBQX8LIQIgByABQTRqIgYpAgA3AgAgByAGKAIINgIIIAQgAUHkAGoiASkCADcCACAEIAEoAgg2AgggCSAEIAIQ6wMgCCAHKQIANwIAIAggBygCCDYCCCAEIAkpAgA3AgAgBCAJKAIINgIIIAAgCCAEEIwGIAUkBAvAAQEEfyMEIQUjBEHgAGokBCAFQTBqIgNCADcCBCADQgA3AgwgA0IANwIUIANCADcCHCADQgA3AiQgA0EANgIsIANBATYCACAFIgRCADcCACAEQgA3AgggBEIANwIQIARCADcCGCAEQgA3AiAgBEIANwIoAn8CQCAAIAEgAxDMBEUNACACIAMoAixBDmwQUyIDNgIAIAQgAzYCKCAAIAEgBBDMBEUNACAEKAIsDAELIAJBADYCAEEACyEGIAUkBCAGC7YOAhV/Cn0jBCERIwRBEGokBCARIQ8gACgCBCEDIAAgARCLBiEBIAJBADYCACABQQBIBEBBACEBBQJAIAEgA2oiAxBKIgFBEHRBEHVBAEoEQCADQQpqIhYgAUEQdEEQdUEBdCIQaiIGEEohASAGQX5qEEpB//8DcSISIBBBAXJqQQ5sEFMiCEUEQEEAIQEMAgsgEkEBaiEKQQAhA0EAIQAgBkECaiABQf//A3FqIQEDQCADQf8BcQRAIANBf2pBGHRBGHUhAwUgAUEBaiEGIAEsAAAiAEEIcQR/IAYsAAAhAyABQQJqBUEAIQMgBgshAQsgBSAQakEObCAIaiAAOgAMIAVBAWoiBSAKRw0AC0EAIQVBACEDA0AgBSAQaiIGQQ5sIAhqLQAMIgRBAnEEQCABQQFqIQBBACABLQAAIgFrIAEgBEEQcUUbIANqIQMFIARBEHEEfyABBSABLQABIAEtAABBCHRyQRB0QRB1IANqIQMgAUECagshAAsgBkEObCAIaiADOwEAIAVBAWoiBSAKRwRAIAAhAQwBCwtBACEFQQAhAQNAIAUgEGoiBkEObCAIai0ADCIEQQRxBEAgAEEBaiEDQQAgAC0AACIAayAAIARBIHFFGyABaiEBBSAEQSBxBH8gAAUgAC0AASAALQAAQQh0ckEQdEEQdSABaiEBIABBAmoLIQMLIAZBDmwgCGogATsBAiAFQQFqIgUgCkcEQCADIQAMAQsLQQAhAEEAIQFBACEDQQAhCgNAIAAgEGoiBEEObCAIaiwADCEUIARBDmwgCGouAQAhBSAEQQ5sIAhqLgECIQYgACATRgR/IAAEQCAIIAcgDSAVIA4gCiABIAMgDCALEIoGIQcLIBRBAXEiDwRAIAUhDiAGIQoFIARBAWoiAUEObCAIai4BACEOIAFBDmwgCGosAAxBAXEEfyAAQQFqIQAgBiEDIAFBDmwgCGouAQIhCiAFBSAFIA5qQQF1IQ4gBiIDIAFBDmwgCGouAQJqQQF1IQogBQshAQsgB0EObCAIakEBIA4gCkEAQQAQ+gEgDCEFIAshBiAWIAlBAXRqEEpB//8DcUEBaiETIAdBAWohByAPQQFzIRVBACENIAlBAWoFAn8gDUEARyEEIAdBAWohDyAHQQ5sIAhqIQ0gFEEBcUUEQCAERQRAQQEhDSAJDAILIA1BAyAFIAxqQQF1IAYgC2pBAXUgDCALEPoBIA8hB0EBIQ0gCQwBCyAEBEAgDUEDIAUgBiAMIAsQ+gEFIA1BAiAFIAZBAEEAEPoBCyALIQYgDyEHQQAhDSAMIQUgCQsLIQQgAEEBaiEJIAAgEkgEQCAFIQwgBiELIAkhACAEIQkMAQsLIAggByANIBUgDiAKIAEgAyAFIAYQigYhASAIIQMFIAFB//8DcUH//wNGBEACQCADQQpqIQlBACEBA0ACQCAPQQA2AgACfyAJEEohFyAJQQJqEEohAyAJQQRqIQsgFwtB//8DcSIMQQJxBH8gDEEBcQR/IAsQSkEQdEEQdbIhHSAJQQZqEEpBEHRBEHWyIR4gCUEIagUgCywAALIhHSAJLAAFsiEeIAlBBmoLBUMAAAAAIR1DAAAAACEeIAsLIQQgDEEIcQR/IAQQSkEQdEEQdbJDAACAOJQiGCEZQwAAAAAhGkMAAAAAIRsgBEECagUCfyAMQcAAcQRAIAQQSkEQdEEQdbJDAACAOJQhGUMAAAAAIRpDAAAAACEbIARBAmoQSkEQdEEQdbJDAACAOJQhGCAEQQRqDAELIAxBgAFxBH8gBBBKQRB0QRB1skMAAIA4lCEZIARBAmoQSkEQdEEQdbJDAACAOJQhGiAEQQRqEEpBEHRBEHWyQwAAgDiUIRsgBEEGahBKQRB0QRB1skMAAIA4lCEYIARBCGoFQwAAgD8hGUMAAAAAIRpDAAAAACEbQwAAgD8hGCAECwsLIQkgGiAalCAZIBmUkpEhICAYIBiUIBsgG5SSkSEhIAAgA0H//wNxIA8QkQYiC0EASgRAIA8oAgAhB0EAIQMDQCADQQ5sIAdqIgQuAQCyIRwgBCAgIB0gGSAclCAbIANBDmwgB2oiBC4BArIiH5SSkpSoOwEAIAQgISAeIBogHJQgGCAflJKSlKg7AQIgA0EObCAHaiIELgEEsiEcIAQgICAdIBkgHJQgGyADQQ5sIAdqIgQuAQayIh+UkpKUqDsBBCAEICEgHiAaIByUIBggH5SSkpSoOwEGIANBAWoiAyALRw0ACyABIAtqIgRBDmwQUyIDRQ0BIAFBAEoEQCADIA4gAUEObBBGGgsgAUEObCADaiAHIAtBDmwQRhogCgRAIAYQQQsgBxBBIAMhBSADIQYgAyEOIAQhAQUgCiEDCyAMQSBxRQ0CIAMhCgwBCwsgCgRAIAUQQQsgBxBBQQAhAQwDCwVBACEBQQAhAwsLIAIgAzYCAAsLIBEkBCABC4YCAgh/AX0jBCEGIwRBEGokBCAGIQQgAUEBSgRAQQEhAwNAIANBFGwgAGooAgAhCSADQRRsIABqKgIEIQogBCADQRRsIABqIgIpAgg3AgAgBCACKAIQNgIIIAMhAgNAIAogAkF/aiIFQRRsIABqKgIEXQRAIAJBFGwgAGoiByAFQRRsIABqIggpAgA3AgAgByAIKQIINwIIIAcgCCgCEDYCECACQQFKBH8gBSECDAIFIAULIQILCyACIANHBEAgAkEUbCAAaiAJNgIAIAJBFGwgAGogCjgCBCACQRRsIABqIgIgBCkCADcCCCACIAQoAgg2AhALIANBAWoiAyABRw0ACwsgBiQEC3cBAn8gACgCBCIBBEAgACABKAIANgIEBQJ/IAAoAggiAQRAIAFBf2ohAiAAKAIAIQEFQQBBxLUDEFMiAUUNARogASAAKAIANgIAIAAgATYCACAAQdAPNgIIQc8PIQILIAAgAjYCCCABQQRqIAJBHGxqCyEBCyABCycBAX8gACgCACIABEADQCAAKAIAIQEgABBBIAEEQCABIQAMAQsLCwvMCAIIfwt9IARDAACAP5IhESADBEAgArIhFiACQQBKIQogAUF8aiEJA0AgAyoCBCENIAMqAggiFEMAAAAAWwRAIA0gFl0EQCANQwAAAABgBEAgACANqCIFIAMgDSAEIA0gERCLASAJIAVBAWogAyANIAQgDSAREIsBBSAJQQAgAyANIAQgDSAREIsBCwsFAkAgAyoCDCESIAMqAhQiDiAEXiEFIA4gBCAFGyETIAMqAhgiDyARXSEGIA8gESAGGyEVIA0gFCAOIASTlJIgDSAFGyIOQwAAAABgIA0gFCAPIASTlJIgFCANkiIQIAYbIg9DAAAAAGBxBEAgDiAWXSAPIBZdcQRAIA6oIgYgD6giB0YEQCAGQQJ0IABqIgUgBSoCACAVIBOTIg1DAACAPyAOIAayIg6TIA8gDpOSQwAAAD+UkyADKgIQlJSSOAIAIAZBAnQgAWoiBSAFKgIAIA0gAyoCEJSSOAIADAMLIA4gD14EQCAHIQUgEowhEiARIBUgBJOTIRQgESATIASTkyEVIBAhDSAOIRAgDyEOBSAGIQUgByEGIBMhFCAPIRALIAVBAnQgAGoiByAHKgIAQwAAgD8gDiAFspNDAACAP5JDAAAAP5STIAMqAhAiDyASIAVBAWoiB7IgDZOUIASSIhMgFJOUIg6UkjgCACASIA+UIQ0gBiAHSgRAIA1DAAAAP5QhFyAHIQUDQCAFQQJ0IABqIgggFyAOkiAIKgIAkjgCACANIA6SIQ4gBUEBaiIFIAZHDQALCyAGQQJ0IABqIgUgD0MAAIA/IBAgBrKTQwAAAACSQwAAAD+Uk5QgFSASIAYgB2uylCATkpOUIA6SIAUqAgCSOAIAIAZBAnQgAWoiBSAVIBSTIA+UIAUqAgCSOAIADAILCyAKBEBBACEFA0AgBbIiDiANkyAUlSAEkiESIAVBAWoiBrIiDyANkyAUlSAEkiETIA0gDl0iByAQIA9eIghxBEAgACAFIAMgDSAEIA4gEhCLASAAIAUgAyAOIBIgDyATEIsBIAAgBSADIA8gEyAQIBEQiwEFAkAgECAOXSILIA0gD14iDHEEQCAAIAUgAyANIAQgDyATEIsBIAAgBSADIA8gEyAOIBIQiwEgACAFIAMgDiASIBAgERCLAQwBCyAHIBAgDl5xBEAgACAFIAMgDSAEIA4gEhCLASAAIAUgAyAOIBIgECAREIsBDAELIAsgDSAOXnEEQCAAIAUgAyANIAQgDiASEIsBIAAgBSADIA4gEiAQIBEQiwEMAQsgCCANIA9dcQRAIAAgBSADIA0gBCAPIBMQiwEgACAFIAMgDyATIBAgERCLAQwBCyAMIBAgD11xBEAgACAFIAMgDSAEIA8gExCLASAAIAUgAyAPIBMgECAREIsBBSAAIAUgAyANIAQgECAREIsBCwsLIAIgBkcEQCAGIQUMAQsLCwsLIAMoAgAiAw0ACwsLkQEBBH0gABCxCSEAIAEqAgggASoCACIGkyABKgIMIgcgASoCBCIFk5UhBCAABEAgACAEOAIIIABDAACAPyAElUMAAAAAIARDAAAAAFwbOAIMIAAgBiADIAWTIASUkiACspM4AgQgAEMAAIA/QwAAgL8gASgCEBs4AhAgACAFOAIUIAAgBzgCGCAAQQA2AgALIAAL4QQCC38DfSMEIQkjBEGgBGokBCAJIQwgCUGIBGoiBkIANwIAIAZBADYCCCAJQYQEaiIHQQA2AgAgACgCACIIQcAASgRAIAhBA3RBBHIQUyEFIAAoAgAhCAUgDCEFCyAIQQJ0IAVqIQogAkEUbCABaiAEIAAoAgQiAmqyQwAAgD+SOAIEIAJBAEoEQCAKQQRqIQ9BACECIAQhCwNAIAuyIREgBUEAIAhBAnQQahogCkEAIAAoAgBBAnRBBGoQahogAgRAIAchBANAIAIqAhggEV8EQCAEIAIoAgA2AgAgAkMAAAAAOAIQIAIgBigCBDYCACAGIAI2AgQFIAIhBAsgBCgCACICDQALCyABKgIEIhAgEUMAAIA/kiISXwRAA38gECABKgIMXARAIAYgASADIBEQtAkiAgRAIAIgBygCADYCACAHIAI2AgALCyABQRRqIQIgASoCGCIQIBJfBH8gAiEBDAEFIAILCyEBCyAHKAIAIgIEQCAFIA8gACgCACACIBEQswkLIAAoAgAiAkEASgRAQQAhAkMAAAAAIRADfyAAKAIMIAIgACgCCCANbGpqIAJBAnQgBWoqAgAgECACQQJ0IApqKgIAkiIQkotDAAB/Q5RDAAAAP5KoIgRB/wEgBEH/AUgbOgAAIAJBAWoiAiAAKAIAIgRIDQAgBAshAgsgBygCACIOBEAgDiEEA0AgBCAEKgIIIAQqAgSSOAIEIAQoAgAiBA0ACwsgC0EBaiELIA1BAWoiDSAAKAIESARAIAIhCCAOIQIMAQsLCyAGELIJIAUgDEcEQCAFEEELIAkkBAuRAwILfwJ9IAWMIRMgA0EASiILBH8DQCAIQQJ0IAJqKAIAIAlqIQkgCEEBaiIIIANHDQALIAlBFGxBFGoFQRQLEFMiCgRAIAsEQEEAIQgDQCAQQQN0IAFqIQ0gEUECdCACaiISKAIAIg5BAEoEQCAOQX9qIg9BA3QgDWoqAgQhBSAOIQlBACELA0AgBSALQQN0IA1qKgIEIhRcBEAgCEEUbCAKaiAFIBReIgk2AhAgCEEUbCAKaiAPIAsgCRtBA3QgDWoiDCoCACAElEMAAAAAkjgCACAIQRRsIApqIAwqAgQgE5RDAAAAAJI4AgQgCEEUbCAKaiALIA8gCRtBA3QgDWoiDCoCACAElEMAAAAAkjgCCCAIQRRsIApqIAwqAgQgE5RDAAAAAJI4AgwgCEEBaiEIIBIoAgAhCQsgC0EBaiIMIAlIBEAgCyEPIBQhBSAMIQsMAQsLCyAOIBBqIRAgEUEBaiIRIANHDQALBUEAIQgLIAogCBDNBCAKIAgQsAkgACAKIAggBiAHELUJIAoQQQsLjAUCCn8CfSMEIQ0jBEEQaiQEIA0iB0EANgIAIAIgApQhECABQQBKIg4EQAJAA0AgCEEObCAAaiwADEEBRiAGaiEGIAhBAWoiCCABRw0ACyAEIAY2AgAgBgRAIAMgBkECdBBTIgY2AgAgBkUEQCAEQQA2AgAMAgtBACEGA0ACQCALQQFGBEAgBygCAEEDdBBTIglFDQELIAdBADYCACAOBH9BACEFQX8hCEMAAAAAIQJDAAAAACEPA0AgBUEObCAAaiEKAkACQAJAAkACQCAFQQ5sIABqLAAMQQFrDgQAAQIDBAsgCEF/SgRAIAMoAgAgCEECdGogBygCACAGazYCAAsgCi4BALIhAiAFQQ5sIABqLgECsiEPIAcgBygCACIGQQFqNgIAIAkgBiACIA8Q7AMgCEEBaiEIDAMLIAouAQCyIQIgBUEObCAAai4BArIhDyAHIAcoAgAiCkEBajYCACAJIAogAiAPEOwDDAILIAkgByACIA8gBUEObCAAai4BBLIgBUEObCAAai4BBrIgCi4BALIgBUEObCAAaiIMLgECsiAQQQAQjwYgCi4BALIhAiAMLgECsiEPDAELIAkgByACIA8gBUEObCAAai4BBLIgBUEObCAAai4BBrIgBUEObCAAai4BCLIgBUEObCAAai4BCrIgCi4BALIgBUEObCAAaiIMLgECsiAQQQAQjgYgCi4BALIhAiAMLgECsiEPCyAFQQFqIgUgAUcNAAsgBygCAAVBfyEIQQALIQUgAygCACAIQQJ0aiAFIAZrNgIAIAtBAWoiC0ECSQ0BDAMLC0EAEEEgAygCABBBIANBADYCACAEQQA2AgALQQAhCQsFIARBADYCAAsgDSQEIAkLawEDfyMEIQcjBEEQaiQEIAdBBGoiCEEANgIAIAciCUEANgIAIAEgAkMzM7M+IAQgAyADIAReG5UgByAIELcJIgEEQCAAIAEgCSgCACIAIAgoAgAgAyAEIAUgBhC2CSAAEEEgARBBCyAHJAQLpQUBCX8jBCEMIwRBEGokBCAMIgZCADcDACABQQBKBEAgAiAEa0EASCELIAJBAWogBGshByAAIQoDQCAGQQAgBBBqGgJ/AkACQAJAAkACQCAEQQJrDgQAAQIDBAsgCwR/QQAhBUEABUEAIQBBACEFA38gACADbCAKaiIILAAAIglB/wFxIABBB3EgBmotAABrIAVqIQUgAEECakEHcSAGaiAJOgAAIAggBUEBdjoAACAAQQFqIgAgB0cNACAHCwsMBAsgCwR/QQAhBUEABUEAIQBBACEFA38gACADbCAKaiIILAAAIglB/wFxIABBB3EgBmotAABrIAVqIQUgAEEDakEHcSAGaiAJOgAAIAggBUEDbjoAACAAQQFqIgAgB0cNACAHCwsMAwsgCwR/QQAhBUEABUEAIQBBACEFA38gACADbCAKaiIILAAAIglB/wFxIABBB3EgBmotAABrIAVqIQUgAEEEakEHcSAGaiAJOgAAIAggBUECdjoAACAAQQFqIgAgB0cNACAHCwsMAgsgCwR/QQAhBUEABUEAIQBBACEFA38gACADbCAKaiIILAAAIglB/wFxIABBB3EgBmotAABrIAVqIQUgAEEFakEHcSAGaiAJOgAAIAggBUEFbjoAACAAQQFqIgAgB0cNACAHCwsMAQsgCwR/QQAhBUEABUEAIQBBACEFA38gACADbCAKaiIILAAAIglB/wFxIABBB3EgBmotAABrIAVqIQUgACAEakEHcSAGaiAJOgAAIAggBSAEbjoAACAAQQFqIgAgB0cNACAHCwsLIgAgAkgEQANAIAAgA2wgCmogBSAAQQdxIAZqLQAAayIFIARuOgAAIABBAWoiACACRw0ACwsgCkEBaiEKIA1BAWoiDSABRw0ACwsgDCQEC5MFAQl/IwQhDCMEQRBqJAQgDCIGQgA3AwAgAkEASgRAIAEgBGtBAEghCyABQQFqIARrIQcgACEKA0AgBkEAIAQQahoCfwJAAkACQAJAAkAgBEECaw4EAAECAwQLIAsEf0EAIQVBAAVBACEAQQAhBQN/IAAgCmoiCCwAACIJQf8BcSAAQQdxIAZqLQAAayAFaiEFIABBAmpBB3EgBmogCToAACAIIAVBAXY6AAAgAEEBaiIAIAdHDQAgBwsLDAQLIAsEf0EAIQVBAAVBACEAQQAhBQN/IAAgCmoiCCwAACIJQf8BcSAAQQdxIAZqLQAAayAFaiEFIABBA2pBB3EgBmogCToAACAIIAVBA246AAAgAEEBaiIAIAdHDQAgBwsLDAMLIAsEf0EAIQVBAAVBACEAQQAhBQN/IAAgCmoiCCwAACIJQf8BcSAAQQdxIAZqLQAAayAFaiEFIABBBGpBB3EgBmogCToAACAIIAVBAnY6AAAgAEEBaiIAIAdHDQAgBwsLDAILIAsEf0EAIQVBAAVBACEAQQAhBQN/IAAgCmoiCCwAACIJQf8BcSAAQQdxIAZqLQAAayAFaiEFIABBBWpBB3EgBmogCToAACAIIAVBBW46AAAgAEEBaiIAIAdHDQAgBwsLDAELIAsEf0EAIQVBAAVBACEAQQAhBQN/IAAgCmoiCCwAACIJQf8BcSAAQQdxIAZqLQAAayAFaiEFIAAgBGpBB3EgBmogCToAACAIIAUgBG46AAAgAEEBaiIAIAdHDQAgBwsLCyIAIAFIBEADQCAAIApqIAUgAEEHcSAGai0AAGsiBSAEbjoAACAAQQFqIgAgAUcNAAsLIAMgCmohCiANQQFqIg0gAkcNAAsLIAwkBAuQAQEEfyMEIQgjBEEgaiQEIAAgByAIQRBqIgkQkQYhCiAAIAcgBSAGIAhBGGoiByAIQRRqIgtBAEEAENEEIAgiACABNgIMIAggAjYCACAIIAM2AgQgCCAENgIIIAJFIANFcgRAIAkoAgAhAAUgACAJKAIAIgAgCiAFIAYgBygCACALKAIAELgJCyAAEEEgCCQEC7oBAQN/IAJBAEchBiAAKAIEIgQgACgCHGpBImoQSkH//wNxIgUgAUoEQCAGBEAgAiAEIAAoAiBqIAFBAnRqEEpBEHRBEHU2AgALIAMEQCADIAQgACgCIGogAUECdGpBAmoQSkEQdEEQdTYCAAsFIAYEQCACIAQgACgCIGogBUECdEF8amoQSkEQdEEQdTYCAAsgAwRAIAMgBCAAKAIgaiAFQQJ0aiABIAVrQQF0ahBKQRB0QRB1NgIACwsLUAEBfyAAKAIEIAFIBEAgACAAIAEQWBDgBAsgACgCACIDIAFIBEADQCAAKAIIIANBAXRqIAIuAQA7AQAgA0EBaiIDIAFHDQALCyAAIAE2AgALUAEBfyAAKAIEIAFIBEAgACAAIAEQWBCFAgsgACgCACIDIAFIBEADQCAAKAIIIANBAnRqIAIoAgA2AgAgA0EBaiIDIAFHDQALCyAAIAE2AgALSwEDfyAAKAIEIAFIBEAgAUEobBBTIQIgAEEIaiIDKAIAIgQEQCACIAQgACgCAEEobBBGGiADKAIAEEELIAMgAjYCACAAIAE2AgQLC00BA38jBCEDIwRBEGokBCADIQIgAEEoaiIEKAIAIAFIBEAgAkMAAIC/OAIAIABBHGogASACEL4JIAJBfzsBACAEIAEgAhC9CQsgAyQEC3ABAX8jBCEEIwRBEGokBCABEJMGIAQgACoCJCABLwEIspQgACoCKCABLwEKspQQMiACIAQpAwA3AgAgBCAAKgIkIAEvAQggAS8BBGqylCAAKgIoIAEvAQogAS8BBmqylBAyIAMgBCkDADcCACAEJAQLygIBCn8jBCEFIwRBEGokBCAAQUBrIAAoAlgQVSIDEJMGIAAoAhwhBiAAKAIEQQJxBEAgACgCFCAGIAMvAQggBiADQQpqIgEvAQBsaiICaiIEQQFqakF/OgAAIAAoAhQgBGpBfzoAACAAKAIUIAJBAWpqQX86AAAgACgCFCACakF/OgAABSADQQpqIQgDfyABIQJBACEHA0AgAy8BCCAHaiAGIAgvAQAgBGpsaiIJIAAoAhRqIAJBsAtqLAAAIgpBLkZBH3RBH3U6AAAgACgCFCAJQe0AamogCkHYAEZBH3RBH3U6AAAgAkEBaiECIAdBAWoiB0HsAEcNAAsgAUHsAGohASAEQQFqIgRBG0cNACAICyEBCyAFIAAqAiQgAy8BCLJDAAAAP5KUIAAqAiggAS8BALJDAAAAP5KUEDIgACAFKQMANwIsIAUkBAuBAgIGfwJ9IwQhBSMEQRBqJAQgBUEIaiEDIAUhBCAAEMIJIABBQGsiBigCAEEASgRAA0AgBiACEFUiASgCGARAIAEoAgBBgIAETQRAIAMQOiAEEDogACABIAMgBBDBCSABKAIYIAEoAgBB//8DcSABKgIQIgcgASoCFCIIIAcgAS8BBLKSIAggAS8BBrKSIAMqAgAgAyoCBCAEKgIAIAQqAgQgASoCDBCWBgsLIAJBAWoiAiAGKAIASA0ACwsgAEE0aiICKAIAQQBKBEBBACEAA0AgAiAAEFAoAgAsAFAEQCACIAAQUCgCABDQBAsgAEEBaiIAIAIoAgBIDQALCyAFJAQL1AEBAn0gBiAEKgIAIANBHGwgAGoqAgiSOAIAIAYgBSoCACADQRxsIABqKgIMkjgCBCAGIAQqAgAgA0EcbCAAaioCFJI4AhAgBiAFKgIAIANBHGwgAGoqAhiSOAIUIAZDAACAPyABspUiByADQRxsIABqLwEAspQ4AgggBkMAAIA/IAKylSIIIANBHGwgAGovAQKylDgCDCAGIAcgA0EcbCAAai8BBLKUOAIYIAYgCCADQRxsIABqLwEGspQ4AhwgBCADQRxsIABqKgIQIAQqAgCSOAIAC0YAIAIsADxFBEAgARDuAyABIAIoAhA2AgAgAUFAayACNgIAIAEgADYCRCABIAM4AkggASAEOAJMCyABIAEuAT5BAWo7AT4LYgAgAQRAIAEgACgCBCAAKAIcakEEahBKQRB0QRB1NgIACyACBEAgAiAAKAIEIAAoAhxqQQZqEEpBEHRBEHU2AgALIAMEQCADIAAoAgQgACgCHGpBCGoQSkEQdEEQdTYCAAsLbAEBfyAFQQBKBEAgBEEASiEHIAEgAmogAyAGbGohAQNAIAcEQEEAIQIDQCABIAJqIgMgACADLQAAaiwAADoAACACQQFqIgIgBEcNAAsLIAVBf2ohAiABIAZqIQEgBUEBSgRAIAIhBQwBCwsLCy8BAn8DQCAAIAJqIAKzIAGUqSIDQf8BIANB/wFJGzoAACACQQFqIgJBgAJHDQALC7MGAhR/BX0jBCEKIwRBIGokBCAAKAIYIREgACgCHCESIAIqAgAiGEMAAAAAXgR9IAEgGBDSBAUgASAYjBCYBgshGCAKQRRqIQ4gCkEQaiETIApBDGohDyAKQQhqIRAgCkEEaiEUIAohFSAAIAItABQiBCIFNgIYIAAgAi0AFSIHIgY2AhxDAACAPyAEspUhGUMAAIA/IAeylSEaIAUQkgYhGyAGEJIGIRwgAigCDCIFQQBKBEBBACEEQQAhBwNAIAdBBHQgA2ooAgwEQCACKAIQIQUgASACKAIIIgYEfyAEQQJ0IAZqKAIABSACKAIEIARqCxDUBCELIAdBBHQgA2oiBiAAKAIUIgggBi8BCGo7AQggB0EEdCADaiIJIAggCS8BCmo7AQogB0EEdCADaiIMIAwvAQQgCGs7AQQgB0EEdCADaiINIA0vAQYgCGs7AQYgASALIA4gExC8CSABIAsgGCAAKAIYs5QgGCAAKAIcs5QgDyAQIBQgFRDRBCABIAAoAiAgBi8BCGogACgCECIIIAkvAQpsaiAMLwEEQQEgACgCGCIWa2ogDS8BBkEBIAAoAhwiF2tqIAggGCAWs5QgGCAXs5QgCxC7CSAAKAIYIgtBAUsEQCAAKAIgIAYvAQhqIAAoAhAiCCAJLwEKbGogDC8BBCANLwEGIAggCxC6CQsgACgCHCILQQFLBEAgACgCICAGLwEIaiAAKAIQIgggCS8BCmxqIAwvAQQgDS8BBiAIIAsQuQkLIARBHGwgBWogBi4BCCIGOwEAIARBHGwgBWogCS4BCiIJOwECIARBHGwgBWogDC8BBCIMIAZB//8DcWo7AQQgBEEcbCAFaiANLwEGIgYgCUH//wNxajsBBiAEQRxsIAVqIBggDigCALKUOAIQIARBHGwgBWogGyAZIA8oAgAiCbKUkjgCCCAEQRxsIAVqIBwgGiAQKAIAIg2ylJI4AgwgBEEcbCAFaiAbIBkgCSAMarKUkjgCFCAEQRxsIAVqIBwgGiAGIA1qspSSOAIYIAIoAgwhBQsgB0EBaiEHIARBAWoiBCAFSA0ACwsgACARNgIYIAAgEjYCHCAKJAQLMgAgAEF/aiIAIABBAXVyIgAgAEECdXIiACAAQQR1ciIAIABBCHVyIgAgAEEQdXJBAWoLuwIBBX8jBCEGIwRBEGokBCAGIgIQaCACIABBQGsiBCgCABCaBiACKAIIQQAgAhCZBhBqGiAEKAIAQQBKBEADQCAEIAMQVS4BBCEFIAIgAxDPASAFOwEEIAQgAxBVLgEGIQUgAiADEM8BIAU7AQYgA0EBaiIDIAQoAgBIDQALCyABIAJBABDPASACKAIAEJcGIAIoAgBBAEoEQEEAIQEDQCACIAEQzwEoAgwEQCACIAEQzwEuAQghAyAEIAEQVSADOwEIIAIgARDPAS4BCiEDIAQgARBVIAM7AQogAiABEM8BLgEEIAQgARBVLgEERgRAIAIgARDPARogBCABEFUaCyAAIAAoAiAgAiABEM8BLwEKIAIgARDPAS8BBmoQugE2AiALIAFBAWoiASACKAIASA0ACwsgAhBnIAYkBAuRAQEFf0EwEFMiA0UiBiABIAJrIgVBA3QQUyIERSIHcgRAIAZFBEAgAxBBCyAHRQRAIAQQQQsFIABBADYCACAAIAE2AgggAEGAgAI2AgwgAEEANgIgIAAgAzYCBCAAIAQ2AiQgACACNgIUIAAgATYCECAAQQE2AhggAEEBNgIcIAMgBUGAgAIgAmsgBCAFEKMJCwuLAQEHfyMEIQMjBEEQaiQEIAMhBCAAKAIIIgIgACgCCCAAKAIAQQJ0aiIFSQRAIAIhBiACIQADQCAAKAIAIgcEQCAAIAZrQQN0IQhBACECA0AgB0EBIAJ0cQRAIAQgAiAIajYCACABIAQQeAsgAkEBaiICQSBHDQALCyAAQQRqIgAgBUkNAAsLIAMkBAsxACAAKAJYQX9MBEAgACAAKAIEQQJxBH8gAEECQQIQiAYFIABB2QFBGxCIBgs2AlgLCwcAIAAQnQYLvwEBAn8jBCEBIwRBEGokBCAAQSRqEDogAEEsahA6IABBNGoQaCAAQUBrIgJBADYCBCACQQA2AgAgAkEANgIIIABBADYCUCAAQQA2AkwgAEEANgJUIABBADoAACAAQQA2AgQgAEEANgIIIABBADYCDCAAQQE2AhAgAEIANwIUIABCADcCHCABQwAAAABDAAAAABAyIAAgASkDADcCJCABQwAAAABDAAAAABAyIAAgASkDADcCLCAAQX82AlggASQEC48CAgZ/An0jBCEJIwRBEGokBCAJIghBCGoiByAEIAMQQEMAAIA/IAcqAgAiDSANlCAHKgIEIg0gDZSSlSEOIAAoAiAiACACQRRsaiEEIAEgAkgEQCAFQf8BcSECIAZB/wFxIQogBUEIdkH/AXEhCyAGQQh2Qf8BcSEMIAVBEHZB/wFxIQUgBkEQdkH/AXEhBiABQRRsIABqIQADQCAIIAAgAxBAIAAgAiAKIA4gCCoCACAHKgIAlCAIKgIEIAcqAgSUkpRDAAAAAEMAAIA/EGQiDRDgAiALIAwgDRDgAkEIdHIgBSAGIA0Q4AJBEHRyIAAoAhBBgICAeHFyNgIQIABBFGoiACAESQ0ACwsgCSQEC7QBAgZ/An0jBCEGIwRBEGokBCAGIQQgACgCCCICQQBKBEADQCAAKAIEIAVBAnRqKAIAIgcoAgBBAEoEQEEAIQIDQCAEIAcgAhClBiIDKgIEIAEqAgAiCJQgAyoCCCABKgIEIgmUIAggAyoCDJQgCSADKgIQlBA2IAMgBCkCADcCBCADIAQpAgg3AgwgAkEBaiICIAcoAgBIDQALIAAoAgghAgsgBUEBaiIFIAJIDQALCyAGJAQL6QEBCH8jBCEHIwRBEGokBCAHIgMQaCAAQQA2AgwgAEEANgIQIAAoAghBAEoEQANAIAAoAgQgBEECdGooAgAiAUEMaiICEH5FBEAgAyACKAIAEPcDIAFBGGohBSACKAIAQQBKBEBBACEBA0AgBSACIAEQlAIvAQAQ+gMhBiADIAEQ+gMiCCAGKQIANwIAIAggBikCCDcCCCAIIAYoAhA2AhAgAUEBaiIBIAIoAgBIDQALCyAFIAMQkAcgAkEAEMABIAAgBSgCACAAKAIQajYCEAsgBEEBaiIEIAAoAghIDQALCyADEGcgByQEC74BAQF/IAZBgICACE8EQAJAIAhBD3FFIAdDAAAAAF9yBEAgACABIAIgAyAEIAUgBhD8AQwBCyAAQcgAaiIJEH5FBEAgASAJEHAoAgBGBEAgACgCGCEBIAAgAiADIAcgCBCgAyAAIAYQgQIgACABIAAoAhggAiADIAQgBRCkBgwCCwsgACABEJgCIAAoAhghASAAIAIgAyAHIAgQoAMgACAGEIECIAAgASAAKAIYIAIgAyAEIAUQpAYgABDlAgsLC3sBAX8gCkGAgIAITwRAAkAgAEHIAGoiCxB+RQRAIAEgCxBwKAIARgRAIABBBkEEELABIAAgAiADIAQgBSAGIAcgCCAJIAoQ2gQMAgsLIAAgARCYAiAAQQZBBBCwASAAIAIgAyAEIAUgBiAHIAggCSAKENoEIAAQ5QILCwuCCwINfw59IwQhECMEQRBqJAQgB0UEQCAGEFwgBmohBwsgECEPIAMgACoCCCADKgIAqLKSIhk4AgAgAyAAKgIMIAMqAgSospIiFzgCBCAXIAUqAgwiGF5FBEAgAiAAKgIAIgKVIR0gCEMAAAAAXiIRIBcgAiAdlCIkkiICIAUqAgQiGl1FckEBcyAHIAZLcQRAIAchDANAIAZBCiAMIAZrEOkBIgZBAWogByAGGyIGIAdJICQgApIiFyAaXXEEQCAXIQIMAQsLBSAXIQILIBEgByILIAYiDWtBkc4ASHIEfyAHBSAGIAdJIAIgGF1xBH8gBiEMIAIhFwN/IAxBCiALIAxrEOkBIgxBAWogByAMGyIMIAdJICQgF5IiFyAYXXEEfwwBBSAMCwsFIAYLCyIOIAZHBEAgAUEMaiISKAIAIRQgASAOIA1rIgdBBmwiFSAHQQJ0ELABIAEoAjQhCyABKAI4IQcgBiAOSQRAAkAgBiENIAEoAjAhDCALIQYgGSEXA0ACQCANIQsgEyEKIBchGSACIRgDQAJAIBFFBEAgDSELIBchGQwBCyAKRQRAIAAgHSALIA4gCCAZIAMqAgCTkxDXBCIKQQFqIAogCiALRhshCgsgCyAKSQRAIAohEyAYIQIMAQsgAyoCACEZIAsgDkkEQANAIAtBAWogCyALLAAAIgsQ4gIiCiALQQpGchshCyAKIAsgDklxDQALCyAkIBiSIRggCyAOTw0EQQAhCgwBCwsgDyALLAAAIgoiDTYCACAKQX9KBH8gC0EBagUCfyAPIAsgDhCmAiEWIA8oAgAiDUUNAiAWCyALagsiCyAOSQJ/AkAgDUEgTw0AAn8CQAJAIA1BCmsOBAEDAwADCyAZIRdBBgwBCyADKgIAIRdBB0EGICQgApIiAiAFKgIMXhsLDAELIAAgDUH//wNxEOECIgoEQAJAIB0gCioCBJQhFwJAIA1BCWsiDQRAIA1BF0cNAQsMAQsgGSAdIAoqAhCUkiEbIAIgHSAKKgIMlJIhGCACIB0gCioCFJSSIRwgGSAdIAoqAgiUkiIaIAUqAggiIF8EQCAbIAUqAgAiIWAEQCAKKgIYIR4gCioCHCEfIAoqAiAhIiAKKgIkISMgCQRAAkAgGiAhXQRAIB5DAACAPyAbICGTIBsgGpOVkyAiIB6TlJIhHiAhIRoLIBggBSoCBCIhXQRAIB8gIyAfk0MAAIA/IBwgIZMgHCAYk5WTlJIhHyAhIRgLIBsgIF4EQCAeICAgGpMgGyAak5UgIiAek5SSISIgICEbCyAcIAUqAgwiIF4EQCAfICMgH5MgICAYkyAcIBiTlZSSISMgICEcCyAYIBxgRQ0AIBkgF5IhF0EGDAYLCyAHIAxB//8DcSINOwEAIAcgDEEBajsBAiAHIAxBAmpB//8DcSIKOwEEIAcgDTsBBiAHIAo7AQggByAMQQNqOwEKIAYgGjgCACAGIBg4AgQgBiAENgIQIAYgHjgCCCAGIB84AgwgBiAbOAIUIAYgGDgCGCAGIAQ2AiQgBiAiOAIcIAYgHzgCICAGIBs4AiggBiAcOAIsIAYgBDYCOCAGICI4AjAgBiAjOAI0IAYgGjgCPCAGQUBrIBw4AgAgBiAENgJMIAYgHjgCRCAGICM4AkggB0EMaiEHIAxBBGohDCAGQdAAaiEGCwsLBUMAAAAAIRcLIBkgF5IhF0EAC0EHR3EEQCALIQ0MAgsLCwsFIAshBgsgAUEYaiIAIAYgASgCIGtBFG0Q9wMgEiAHIAEoAhRrQQF1EMABIBIoAgAhAyABIAEoAgBBf2oQpQYiBCAEKAIAIAMgFCAVamtqNgIAIAEgBjYCNCABIAc2AjggASAAKAIANgIwCwsgECQECysAIAVBgICACE8EQCAAIAEQYyAAIAIgAyAEIAcQpwYgACAFQQAgBhCPAgsLLAAgBUGAgIAITwRAIAAgARBjIAAgAhBjIAAgAxBjIAAgBBBjIAAgBRCBAgsLMAAgBUGAgIAITwRAIAAgARBjIAAgAhBjIAAgAxBjIAAgBBBjIAAgBUEBIAYQjwILC1UBAX8gACgCACICIAAoAgRGBEAgACAAIAJBAWoQWBDeBCAAKAIAIQILIAAoAgggAkEEdGoiAiABKQIANwIAIAIgASkCCDcCCCAAIAAoAgBBAWo2AgAL1wECBH8BfSMEIQMjBEEQaiQEIAMhAiAAEDogAEEUahD3ASAAQYQBaiEEIABBJGohAQNAIAEQOiABQQhqIgEgBEcNAAsgAEEANgIIIABDAAAAADgCDCAAQwAAAAA4AhAgAkMAAADGQwAAAMZDAAAARkMAAABGEDYgACACKQIANwIUIAAgAikCCDcCHEEAIQEDQCACIAGyQwAAAECUQ9sPSUCUQwAAQEGVIgUQ+QIgBRD4AhAyIABBJGogAUEDdGogAikDADcCACABQQFqIgFBDEcNAAsgAyQECzYAIABBgAFJBH9BAQUgAEGAEEkEf0ECBUEAQQRBAyAAQYB4cSIAQYCwA0YbIABBgLgDRhsLCwumEgEHfyMEIQEjBEEQaiQEIABFBEAQxwIhAAsgAUMAAAAAQwAAAABDAAAAAEMAAIA/EDYgAEGgAWoiAiABKQIANwIAIAIgASkCCDcCCCABQ5qZGT9DmpkZP0OamRk/QwAAgD8QNiAAQbABaiICIAEpAgA3AgAgAiABKQIINwIIIAFD16NwP0PXo3A/Q9ejcD9DAACAPxA2IABBwAFqIgIgASkCADcCACACIAEpAgg3AgggAUMAAAAAQwAAAABDAAAAAEMAAAAAEDYgAEHQAWoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAgD9DAACAP0MAAIA/Q0jhej8QNiAAQeABaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAAAAAEMAAAAAQwAAAABDmpmZPhA2IABB8AFqIgIgASkCADcCACACIAEpAgg3AgggAUMAAAAAQwAAAABDAAAAAEMAAAAAEDYgAEGAAmoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAgD9DAACAP0MAAIA/QwAAgD8QNiAAQZACaiICIAEpAgA3AgAgAiABKQIINwIIIAFDuB6FPkM9Chc/Q0jhej9DzczMPhA2IABBoAJqIgIgASkCADcCACACIAEpAgg3AgggAUO4HoU+Qz0KFz9DSOF6P0MfhSs/EDYgAEGwAmoiAiABKQIANwIAIAIgASkCCDcCCCABQ4/CdT9Dj8J1P0OPwnU/QwAAgD8QNiAAQcACaiIGIAEpAgA3AgAgBiABKQIINwIIIAFDhetRP0OF61E/Q4XrUT9DAACAPxA2IABB0AJqIgcgASkCADcCACAHIAEpAgg3AgggAUMAAIA/QwAAgD9DAACAP0NcjwI/EDYgAEHgAmoiAiABKQIANwIAIAIgASkCCDcCCCABQ/YoXD9D9ihcP0P2KFw/QwAAgD8QNiAAQfACaiICIAEpAgA3AgAgAiABKQIINwIIIAFDSOF6P0NI4Xo/Q0jhej9DFK4HPxA2IABBgANqIgIgASkCADcCACACIAEpAgg3AgggAUPXozA/Q9ejMD9D16MwP0PNzEw/EDYgAEGQA2oiAiABKQIANwIAIAIgASkCCDcCCCABQ0jh+j5DSOH6PkNI4fo+Q83MTD8QNiAAQaADaiICIAEpAgA3AgAgAiABKQIINwIIIAFDSOH6PkNI4fo+Q0jh+j5DAACAPxA2IABBsANqIgIgASkCADcCACACIAEpAgg3AgggAUO4HoU+Qz0KFz9DSOF6P0MAAIA/EDYgAEHAA2oiAiABKQIANwIAIAIgASkCCDcCCCABQ7gehT5DPQoXP0NI4Xo/QxSuRz8QNiAAQdADaiICIAEpAgA3AgAgAiABKQIINwIIIAFDH4XrPkNxPQo/Q83MTD9DmpkZPxA2IABB4ANqIgIgASkCADcCACACIAEpAgg3AgggAUO4HoU+Qz0KFz9DSOF6P0PNzMw+EDYgAEHwA2oiAiABKQIANwIAIAIgASkCCDcCCCABQ7gehT5DPQoXP0NI4Xo/QwAAgD8QNiAAQYAEaiICIAEpAgA3AgAgAiABKQIINwIIIAFDj8J1PUMUrgc/Q0jhej9DAACAPxA2IABBkARqIgIgASkCADcCACACIAEpAgg3AgggAUO4HoU+Qz0KFz9DSOF6P0NSuJ4+EDYgAEGgBGoiAyABKQIANwIAIAMgASkCCDcCCCABQ7gehT5DPQoXP0NI4Xo/Q83MTD8QNiAAQbAEaiIEIAEpAgA3AgAgBCABKQIINwIIIAFDuB6FPkM9Chc/Q0jhej9DAACAPxA2IABBwARqIgUgASkCADcCACAFIAEpAgg3AgggAUMUrsc+QxSuxz5DFK7HPkMAAIA/EDYgAEHQBGoiAiABKQIANwIAIAIgASkCCDcCCCABQylcDz5DrkfhPkPNzEw/QxSuRz8QNiAAQeAEaiICIAEpAgA3AgAgAiABKQIINwIIIAFDKVwPPkOuR+E+Q83MTD9DAACAPxA2IABB8ARqIgIgASkCADcCACACIAEpAgg3AgggAUPNzEw/Q83MTD9DzcxMP0MpXA8/EDYgAEGABWoiAiABKQIANwIAIAIgASkCCDcCCCABQ7gehT5DPQoXP0NI4Xo/Qx+FKz8QNiAAQZAFaiICIAEpAgA3AgAgAiABKQIINwIIIAFDuB6FPkM9Chc/Q0jhej9DMzNzPxA2IABBoAVqIgIgASkCADcCACACIAEpAgg3AgggASADIAdDZmZmPxDHASAAQbAFaiIDIAEpAgA3AgAgAyABKQIINwIIIABBwAVqIgIgBCkCADcCACACIAQpAgg3AgggASAFIAdDmpkZPxDHASAAQdAFaiIFIAEpAgA3AgAgBSABKQIINwIIIAEgAyAGQ83MTD8QxwEgAEHgBWoiAiABKQIANwIAIAIgASkCCDcCCCABIAUgBkPNzMw+EMcBIABB8AVqIgIgASkCADcCACACIAEpAgg3AgggAUMUrsc+QxSuxz5DFK7HPkMAAIA/EDYgAEGABmoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAgD9D9ijcPkMzM7M+QwAAgD8QNiAAQZAGaiICIAEpAgA3AgAgAiABKQIINwIIIAFDZmZmP0MzMzM/QwAAAABDAACAPxA2IABBoAZqIgIgASkCADcCACACIAEpAgg3AgggAUMAAIA/Q2Zm5j5DAAAAAEMAAIA/EDYgAEGwBmoiAiABKQIANwIAIAIgASkCCDcCCCABQ7gehT5DPQoXP0NI4Xo/QzMzsz4QNiAAQcAGaiICIAEpAgA3AgAgAiABKQIINwIIIAFDuB6FPkM9Chc/Q0jhej9DMzNzPxA2IABB0AZqIgIgASkCADcCACACIAEpAgg3AgggAEHgBmoiAiAEKQIANwIAIAIgBCkCCDcCCCABQzMzMz9DMzMzP0MzMzM/QzMzMz8QNiAAQfAGaiICIAEpAgA3AgAgAiABKQIINwIIIAFDzcxMPkPNzEw+Q83MTD5DzcxMPhA2IABBgAdqIgIgASkCADcCACACIAEpAgg3AgggAUPNzEw+Q83MTD5DzcxMPkMzM7M+EDYgAEGQB2oiACABKQIANwIAIAAgASkCCDcCCCABJAQLphIBB38jBCEBIwRBEGokBCAARQRAEMcCIQALIAFDZmZmP0NmZmY/Q2ZmZj9DAACAPxA2IABBoAFqIgIgASkCADcCACACIAEpAgg3AgggAUOamRk/Q5qZGT9DmpkZP0MAAIA/EDYgAEGwAWoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAAABDAAAAAEMAAAAAQzMzMz8QNiAAQcABaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAAAAAEMAAAAAQwAAAABDAAAAABA2IABB0AFqIgIgASkCADcCACACIAEpAgg3AgggAUOuR+E9Q65H4T1DKVwPPkMfhWs/EDYgAEHgAWoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAAD9DAAAAP0MAAAA/QwAAAD8QNiAAQfABaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAAAAAEMAAAAAQwAAAABDAAAAABA2IABBgAJqIgIgASkCADcCACACIAEpAgg3AgggAUP2KNw+Q/Yo3D5D9ijcPkMUrsc+EDYgAEGQAmoiAiABKQIANwIAIAIgASkCCDcCCCABQ9ej8D5D16PwPkPXozA/Q83MzD4QNiAAQaACaiICIAEpAgA3AgAgAiABKQIINwIIIAFDPQrXPkOF69E+QwrXIz9D16MwPxA2IABBsAJqIgIgASkCADcCACACIAEpAgg3AgggAUNxPYo+Q3E9ij5DcT0KP0PhelQ/EDYgAEHAAmoiBiABKQIANwIAIAYgASkCCDcCCCABQwrXoz5DCtejPkOuRyE/Q1K4Xj8QNiAAQdACaiIHIAEpAgA3AgAgByABKQIINwIIIAFDzczMPkPNzMw+Q83MTD9DzcxMPhA2IABB4AJqIgIgASkCADcCACACIAEpAgg3AgggAUPNzMw+Q83MzD5DzcwMP0PNzEw/EDYgAEHwAmoiAiABKQIANwIAIAIgASkCCDcCCCABQ83MTD5DAACAPkOamZk+Q5qZGT8QNiAAQYADaiICIAEpAgA3AgAgAiABKQIINwIIIAFDzczMPkPNzMw+Q83MTD9DmpmZPhA2IABBkANqIgIgASkCADcCACACIAEpAgg3AgggAUPNzMw+Q83MzD5DzcxMP0PNzMw+EDYgAEGgA2oiAiABKQIANwIAIAIgASkCCDcCCCABQ4Xr0T5DFK7HPkPNzEw/Q5qZGT8QNiAAQbADaiICIAEpAgA3AgAgAiABKQIINwIIIAFDZmZmP0NmZmY/Q2ZmZj9DAAAAPxA2IABBwANqIgIgASkCADcCACACIAEpAgg3AgggAUMAAIA/QwAAgD9DAACAP0OamZk+EDYgAEHQA2oiAiABKQIANwIAIAIgASkCCDcCCCABQ4Xr0T5DFK7HPkPNzEw/Q5qZGT8QNiAAQeADaiICIAEpAgA3AgAgAiABKQIINwIIIAFDMzOzPkPNzMw+Q/YoHD9DUrgePxA2IABB8ANqIgIgASkCADcCACACIAEpAgg3AgggAUPNzMw+Q4/C9T5Dj8I1P0NxPUo/EDYgAEGABGoiAiABKQIANwIAIAIgASkCCDcCCCABQx+F6z5DcT0KP0PNzEw/QwAAgD8QNiAAQZAEaiICIAEpAgA3AgAgAiABKQIINwIIIAFDzczMPkPNzMw+Q2ZmZj9DZmbmPhA2IABBoARqIgMgASkCADcCACADIAEpAgg3AgggAUNmZuY+Q2Zm5j5DZmZmP0PNzEw/EDYgAEGwBGoiBCABKQIANwIAIAQgASkCCDcCCCABQxSuBz9DFK4HP0NSuF4/Q83MTD8QNiAAQcAEaiIFIAEpAgA3AgAgBSABKQIINwIIIAFDAAAAP0MAAAA/QwAAAD9DAACAPxA2IABB0ARqIgIgASkCADcCACACIAEpAgg3AgggAUOamRk/Q5qZGT9DMzMzP0MAAIA/EDYgAEHgBGoiAiABKQIANwIAIAIgASkCCDcCCCABQzMzMz9DMzMzP0NmZmY/QwAAgD8QNiAAQfAEaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAACAP0MAAIA/QwAAgD9DCtcjPhA2IABBgAVqIgIgASkCADcCACACIAEpAgg3AgggAUMUrkc/Q4XrUT9DAACAP0OamRk/EDYgAEGQBWoiAiABKQIANwIAIAIgASkCCDcCCCABQxSuRz9DhetRP0MAAIA/Q2ZmZj8QNiAAQaAFaiICIAEpAgA3AgAgAiABKQIINwIIIAEgAyAHQ83MTD8QxwEgAEGwBWoiAyABKQIANwIAIAMgASkCCDcCCCAAQcAFaiICIAQpAgA3AgAgAiAEKQIINwIIIAEgBSAHQ5qZGT8QxwEgAEHQBWoiBSABKQIANwIAIAUgASkCCDcCCCABIAMgBkPNzEw/EMcBIABB4AVqIgIgASkCADcCACACIAEpAgg3AgggASAFIAZDzczMPhDHASAAQfAFaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAACAP0MAAIA/QwAAgD9DAACAPxA2IABBgAZqIgIgASkCADcCACACIAEpAgg3AgggAUNmZmY/QzMzMz9DAAAAAEMAAIA/EDYgAEGQBmoiAiABKQIANwIAIAIgASkCCDcCCCABQ2ZmZj9DMzMzP0MAAAAAQwAAgD8QNiAAQaAGaiICIAEpAgA3AgAgAiABKQIINwIIIAFDAACAP0OamRk/QwAAAABDAACAPxA2IABBsAZqIgIgASkCADcCACACIAEpAgg3AgggAUMAAAAAQwAAAABDAACAP0MzM7M+EDYgAEHABmoiAiABKQIANwIAIAIgASkCCDcCCCABQwAAgD9DAACAP0MAAAAAQ2ZmZj8QNiAAQdAGaiICIAEpAgA3AgAgAiABKQIINwIIIABB4AZqIgIgBCkCADcCACACIAQpAgg3AgggAUMAAIA/QwAAgD9DAACAP0MzMzM/EDYgAEHwBmoiAiABKQIANwIAIAIgASkCCDcCCCABQ83MTD9DzcxMP0PNzEw/Q83MTD4QNiAAQYAHaiICIAEpAgA3AgAgAiABKQIINwIIIAFDzcxMPkPNzEw+Q83MTD5DMzOzPhA2IABBkAdqIgAgASkCADcCACAAIAEpAgg3AgggASQECwMAAQtLAQN/IAAoAgQgAUgEQCABQQxsEFMhAiAAQQhqIgMoAgAiBARAIAIgBCAAKAIAQQxsEEYaIAMoAgAQQQsgAyACNgIAIAAgATYCBAsLSwEDfyAAKAIEIAFIBEAgAUEwbBBTIQIgAEEIaiIDKAIAIgQEQCACIAQgACgCAEEwbBBGGiADKAIAEEELIAMgAjYCACAAIAE2AgQLC5gBAQJ/IAEgACgCCGtBGG0hAyAAKAIAIgEgACgCBEYEQCAAIAAgAUEBahBYEPkDIAAoAgAhAQsgASADSgRAIAAoAgggA0EYbGoiBEEYaiAEIAEgA2tBGGwQswEaCyAAKAIIIANBGGxqIgEgAikCADcCACABIAIpAgg3AgggASACKQIQNwIQIAAgACgCAEEBajYCACAAKAIIGgtfAQF/IAAoAgAiAiAAKAIERgRAIAAgACACQQFqEFgQ+QMgACgCACECCyAAKAIIIAJBGGxqIgIgASkCADcCACACIAEpAgg3AgggAiABKQIQNwIQIAAgACgCAEEBajYCAAvHAgEBfyAAQdTYAGoQZyAAQcDYAGooAggiAQRAIAEQQQsgAEG02ABqKAIIIgEEQCABEEELIABBqNgAahBnIABBhNgAahBnIABB/NYAahDVBCAAQYw6aiIBQRxqEGcgAUEQahBnIAFBBGoQZyAAQYA6aigCCCIBBEAgARBBCyAAQfQ5aigCCCIBBEAgARBBCyAAQdg5aiIBEPYJIAFBDGoQZyABKAIIIgEEQCABEEELIABBxDlqKAIIIgEEQCABEEELIABB3DdqELcFIABBwDdqEPcJIABBnDdqEJsEIABBqDRqEGcgAEGcNGoQZyAAQZA0ahBnIABBhDRqKAIIIgEEQCABEEELIABB+DNqKAIIIgEEQCABEEELIABBhDNqEGcgAEH4MmoQZyAAQewyahBnIABB4DJqEGcgAEHUMmoQZyAAQQhqELwGC2ABAX0gACoCACABKgIAIgJeBEAgACACOAIACyAAKgIEIAEqAgQiAl4EQCAAIAI4AgQLIAAqAgggASoCACICXQRAIAAgAjgCCAsgACoCDCABKgIEIgJdBEAgACACOAIMCwvxAQEBfyACQYABSQR/IAAgAjoAAEEBBQJ/IAJBgBBJBEBBACABQQJIDQEaIAAgAkEGdkHAAWo6AAAgACACQT9xQYABcjoAAUECDAELAkAgAkGAeHFBgLADayIDBEAgA0GACEcNAUEADAILQQAgAUEESA0BGiAAIAJBEnZB8AFqOgAAIAAgAkEMdkE/cUGAAXI6AAEgACACQQZ2QT9xQYABcjoAAiAAIAJBP3FBgAFyOgADQQQMAQtBACABQQNIDQAaIAAgAkEMdkHgAWo6AAAgACACQQZ2QT9xQYABcjoAASAAIAJBP3FBgAFyOgACQQMLCws6ACAAQQA2AgwgAEIANwIAIABBADsBCCAAQQE2AhAgAEIANwIUIABCADcCHCAAQgA3AiQgAEEsahBPC0sBA38gACgCBCABSARAIAFBOGwQUyECIABBCGoiAygC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UAALJAAgASACIAMgBCAFIAYgByAIIAkgCiALIABBA3FBnAtqETEACyIAIAEgAiADIAQgBSAGIAcgCCAJIAogAEEDcUGYC2oRNgALIAAgASACIAMgBCAFIAYgByAIIAkgAEEDcUGUC2oRGQALIgAgASACIAMgBCAFIAYgByAIIAkgCiAAQQFxQZILahFPAAseACABIAIgAyAEIAUgBiAHIAggAEEDcUGOC2oRTgALIAAgASACIAMgBCAFIAYgByAIIAkgAEEDcUGKC2oRMgALHgAgASACIAMgBCAFIAYgByAIIABBAXFBiAtqEU0ACxwAIAEgAiADIAQgBSAGIAcgAEEHcUGAC2oRKgALHgAgASACIAMgBCAFIAYgByAIIABBAXFB/gpqETMACxwAIAEgAiADIAQgBSAGIAcgAEEDcUH6CmoRKwALDQAgAEH4KWpBABDAAQsaACABIAIgAyAEIAUgBiAAQQ9xQeoKahEaAAseACABIAIgAyAEIAUgBiAHIAggAEEBcUHoCmoRTAALHAAgASACIAMgBCAFIAYgByAAQQFxQeYKahFLAAsaACABIAIgAyAEIAUgBiAAQQNxQeIKahEsAAsYACABIAIgAyAEIAUgAEEPcUHSCmoRLQALHAAgASACIAMgBCAFIAYgByAAQQFxQdAKahEoAAsaACABIAIgAyAEIAUgBiAAQQNxQcwKahEpAAsYACABIAIgAyAEIAUgAEEDcUHICmoRJwALFgAgASACIAMgBCAAQR9xQagKahEGAAsgACABIAIgAyAEIAUgBiAHIAggCSAAQQFxQaYKahFKAAscACABIAIgAyAEIAUgBiAHIABBAXFBpApqEUkACxwAIAEgAiADIAQgBSAGIAcgAEEBcUGiCmoRSAALGgAgASACIAMgBCAFIAYgAEEDcUGeCmoRIwALGAAgASACIAMgBCAFIABBA3FBmgpqEQ8ACxwAIAEgAiADIAQgBSAGIAcgAEEBcUGYCmoRRwALFgAgASACIAMgBCAAQQNxQZQKahE0AAsVACABIAIgAyAAQf8AcUGUCWoRBwALHgAgASACIAMgBCAFIAYgByAIIABBAXFBkglqETAACxoAIAEgAiADIAQgBSAGIABBAXFBkAlqESYACxoAIAEgAiADIAQgBSAGIABBAXFBjglqES4ACxgAIAEgAiADIAQgBSAAQQNxQYoJahEvAAsWACABIAIgAyAEIABBA3FBhglqEQoACx4AIAEgAiADIAQgBSAGIAcgCCAAQQFxQYQJahEkAAsaACABIAIgAyAEIAUgBiAAQQFxQYIJahE1AAsUACABIAIgAyAAQQ9xQfIIahE3AAsWACABIAIgAyAEIABBA3FB7gZqEQ4ACxQAIAEgAiADIABBAXFB7AZqEREACxwAIAEgAiADIAQgBSAGIAcgAEEBcUHqBmoRRgALFAAgASACIAMgAEEBcUHoBmoRRQALFAAgASACIAMgAEEBcUHeBGoRGAALFQBBmKkEKAIAQTRqIABBAnRqKAIACxoAIAEgAiADIAQgBSAGIABBA3FB2gRqEQ0ACyIAIAEgAiADIAQgBSAGIAcgCCAJIAogAEEBcUGCBGoRRAALIAAgASACIAMgBCAFIAYgByAIIAkgAEEHcUH6A2oRFwALHgAgASACIAMgBCAFIAYgByAIIABBD3FB6gNqERMACxwAIAEgAiADIAQgBSAGIAcgAEEPcUHaA2oRFAALGgAgASACIAMgBCAFIAYgAEEfcUG6A2oRFQALGAAgASACIAMgBCAFIABBD3FBqgNqERIACxYAIAEgAiADIAQgAEEfcUGKA2oRCQALGgAgASACIAMgBCAFIAYgAEEBcUGIA2oRQwALGAAgASACIAMgBCAFIABBAXFBhgNqEUIACxYAIAEgAiADIAQgAEEBcUGEA2oRQQALHAAgASACIAMgBCAFIAYgByAAQQFxQYIDahFAAAsYACABIAIgAyAEIAUgAEEBcUHAAmoRPwALFgAgASACIAMgBCAAQQFxQb4CahE+AAseACABIAIgAyAEIAUgBiAHIAggAEEBcUG8AmoRPQALFgAgASACIAMgBCAAQQFxQboCahE8AAsUACABIAIgAyAAQQNxQbYCahEiAAsaACABIAIgAyAEIAUgBiAAQQFxQbQCahEWAAsWACABIAIgAyAEIABBAXFBsgFqESUACxQAIAEgAiADIABBAXFBsAFqEQwACxoAIAEgAiADIAQgBSAGIABBAXFBrAFqETkACxQAIAEgAiADIABBA3FByABqETsACxEAIAEgAiAAQR9xQShqEQgACw8AIAEgAEEDcUEkahEcAAsNACAAQR9xQQRqESAACw8AIAEgAEEBcUECahE6AAsKACAAQQFxERAA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fzYCACAAQcwzakEANgIAIABBkDNqIgFCADcDACABQgA3AwggAUEANgIQIAFBADoAFCAAQagzaiIBQgA3AwAgAUIANwMIIAFCADcDECABQgA3AxggAUEAOgAgIAJDAACAv0MAAIC/EDIgBiACKQMANwIAIABB2DNqIgFCADcDACABQgA3AwggAUEANgIQIAJDAAAAAEMAAAAAEDIgByACKQMANwIAIABB9DNqQQA2AgAgAEGYNWpBADoAACAAQZw1aiIBQgA3AgAgAUIANwIIIAFCADcCECABQgA3AhggAUIANwIgIAFBADYCKCACEGYgBCACKQIANwIAIAQgAikCCDcCCCAAQfQ1akEANgIAIABB2DVqIgFCADcDACABQgA3AwggAUIANwMQIAFBADoAGCAAQfg1akH/////BzYCACAAQfw1akEAOgAAIABB/TVqQQA6AAAgAEH+NWpBAToAACAAQYQ2akEANgIAIABBmDZqQQA6AAAgAEGZNmpBADoAACAAQZw2akEANgIAIABBoDZqQQA2AgAgAEH/NWpBADYAACAAQaw2akF/NgIAIABBqDZqQX82AgAgAEGkNmpBfzYCACAAQdg3akMAAAAAOAIAIABBhDhqIAU2AgAgAEGIOGpBlpMCNgIAIABB0DhqQQA2AgAgAEHVOGpBADoAACAAQdQ4akEAOgAAIABB2DhqQQA2AgAgAEHcOGpBfzYCACAAQeA4akF/NgIAIABBrDlqIgFCADcCACABQgA3AgggAUEANgIQIABBwDlqQX82AgAgAEHQOWpCADcDACAAQdTXAGpBADYCACAAQdjXAGpBgIDAFDYCACAAQezXAGpBADoAACAAQfDXAGpDAAAAADgCACAAQfTXAGpDCtcjPDgCACACQwAAAABDAAAAABAyIAMgAikDADcCACAAQYDYAGpBADYCACACQ///f39D//9/fxAyIAkgAikDACIKNwIAIAggCjcCACAAQaDYAGpBADoAACAAQaTYAGpDAAAAADgCACAAQczYAGpBADoAACAAQdDYAGpBADYCACAAQeDYAGpBADYCACAAQeTYAGpBAjYCACAAQejYAGpBAEHoAxBqGiAAQdjcAGpBfzYCACAAQdTcAGpBfzYCACAAQdDcAGpBfzYCACAAQdzcAGpBAEGBGBBqGiACJAQLYwIDfwF9IwQhBiME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Li4uWC0gICAgWC4uWCAgICAgICAgIC0tLSAgICAgICAgIC1YWFguWFhYLSAgWC4uLlggIC0gICAgICAgICBYLi4uWCAgICAgICAgIC1YLi4uLlggICAgICAgICAgIC0gICAgICAgICAgIFguLi4uWC0gICAgWC4uWCAgICAgICAgIFggICAgICAgICAgIC0gIFguWCAgLSBYLi4uLi5YIC0gICAgICAgIFguLi4uLlggICAgICAgIC1YLi4uWCAgICAgICAgICAgIC0gICAgICAgICAgICBYLi4uWC0gICAgWC4uWCAgICAgICAgIFhYICAgICAgICAgIC0gIFguWCAgLVguLi4uLi4uWC0gICAgICAgWC4uLi4uLi5YICAgICAgIC1YLi5YLlggICAgICAgICAgIC0gICAgICAgICAgIFguWC4uWC0gICAgWC4uWCAgICAgICAgIFguWCAgICAgICAgIC0gIFguWCAgLVhYWFguWFhYWC0gICAgICAgWFhYWC5YWFhYICAgICAgIC1YLlggWC5YICAgICAgICAgIC0gICAgICAgICAgWC5YIFguWC0gICAgWC4uWFhYICAgICAgIFguLlggICAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC1YWCAgIFguWCAgICAgICAgIC0gICAgICAgICBYLlggICBYWC0gICAgWC4uWC4uWFhYICAgIFguLi5YICAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICAgWFggICAgWC5YICAgIFhYICAgIC0gICAgICBYLlggICAgICAgIC0gICAgICAgIFguWCAgICAgIC0gICAgWC4uWC4uWC4uWFggIFguLi4uWCAgICAgIC0gIFguWCAgLSAgIFguWCAgIC0gICBYLlggICAgWC5YICAgIFguWCAgIC0gICAgICAgWC5YICAgICAgIC0gICAgICAgWC5YICAgICAgIC0gICAgWC4uWC4uWC4uWC5YIFguLi4uLlggICAgIC0gIFguWCAgLSAgIFguWCAgIC0gIFguLlggICAgWC5YICAgIFguLlggIC0gICAgICAgIFguWCAgICAgIC0gICAgICBYLlggICAgICAgIC1YWFggWC4uWC4uWC4uWC4uWFguLi4uLi5YICAgIC0gIFguWCAgLSAgIFguWCAgIC0gWC4uLlhYWFhYWC5YWFhYWFguLi5YIC0gICAgICAgICBYLlggICBYWC1YWCAgIFguWCAgICAgICAgIC1YLi5YWC4uLi4uLi4uWC4uWFguLi4uLi4uWCAgIC0gIFguWCAgLSAgIFguWCAgIC1YLi4uLi4uLi4uLi4uLi4uLi4uLi4uWC0gICAgICAgICAgWC5YIFguWC1YLlggWC5YICAgICAgICAgIC1YLi4uWC4uLi4uLi4uLi4uWFguLi4uLi4uLlggIC0gIFguWCAgLSAgIFguWCAgIC0gWC4uLlhYWFhYWC5YWFhYWFguLi5YIC0gICAgICAgICAgIFguWC4uWC1YLi5YLlggICAgICAgICAgIC0gWC4uLi4uLi4uLi4uLi4uWFguLi4uLi4uLi5YIC1YWFguWFhYLSAgIFguWCAgIC0gIFguLlggICAgWC5YICAgIFguLlggIC0gICAgICAgICAgICBYLi4uWC1YLi4uWCAgICAgICAgICAgIC0gIFguLi4uLi4uLi4uLi4uWFguLi4uLi4uLi4uWC1YLi4uLi5YLSAgIFguWCAgIC0gICBYLlggICAgWC5YICAgIFguWCAgIC0gICAgICAgICAgIFguLi4uWC1YLi4uLlggICAgICAgICAgIC0gIFguLi4uLi4uLi4uLi4uWFguLi4uLi5YWFhYWC1YWFhYWFhYLSAgIFguWCAgIC0gICAgWFggICAgWC5YICAgIFhYICAgIC0gICAgICAgICAgWC4uLi4uWC1YLi4uLi5YICAgICAgICAgIC0gICBYLi4uLi4uLi4uLi4uWFguLi5YLi5YICAgIC0tLS0tLS0tLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC0gICAgICAgICAgWFhYWFhYWC1YWFhYWFhYICAgICAgICAgIC0gICBYLi4uLi4uLi4uLi5YIFguLlggWC4uWCAgIC0gICAgICAgLVhYWFguWFhYWC0gICAgICAgWFhYWC5YWFhYICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgWC4uLi4uLi4uLi5YIFguWCAgWC4uWCAgIC0gICAgICAgLVguLi4uLi4uWC0gICAgICAgWC4uLi4uLi5YICAgICAgIC0gICAgWFggICAgICAgICAgIFhYICAgIC0gICAgICAgICAgIC0gICAgWC4uLi4uLi4uLi5YIFhYICAgIFguLlggIC0gICAgICAgLSBYLi4uLi5YIC0gICAgICAgIFguLi4uLlggICAgICAgIC0gICBYLlggICAgICAgICAgIFguWCAgIC0gICAgICAgICAgIC0gICAgIFguLi4uLi4uLlggICAgICAgIFguLlggICAgICAgICAgLSAgWC4uLlggIC0gICAgICAgICBYLi4uWCAgICAgICAgIC0gIFguLlggICAgICAgICAgIFguLlggIC0gICAgICAgICAgIC0gICAgIFguLi4uLi4uLlggICAgICAgICBYWCAgICAgICAgICAgLSAgIFguWCAgIC0gICAgICAgICAgWC5YICAgICAgICAgIC0gWC4uLlhYWFhYWFhYWFhYWFguLi5YIC0gICAgICAgICAgIC0gICAgIFhYWFhYWFhYWFggIC0tLS0tLS0tLS0tLSAgICAgICAgLSAgICBYICAgIC0gICAgICAgICAgIFggICAgICAgICAgIC1YLi4uLi4uLi4uLi4uLi4uLi4uLi4uWC0gICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLSAgICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gWC4uLlhYWFhYWFhYWFhYWFguLi5YIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gIFguLlggICAgICAgICAgIFguLlggIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gICBYLlggICAgICAgICAgIFguWCAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gICAgWFggICAgICAgICAgIFhYICAgIC0gICAgICAgICAgICAgICAgICAgICAgICAgICAgIABBoCILzF03XSkjIyMjIyMjaFYwcXMnLyMjI1spLCMjL2w6JCNRNj4jIzVbbjQyPmMtVEhgLT4+Iy9lPjExTk5WPUJ2KCo6LkY/dXUjKGdSVS5vMFhHSGAkdmhMRzFoeHQ5P1dgIyw1THNDcCMtaT4uciQ8JDZwRD5MYic7OUNyYzZ0Z1htS1ZlVTJjRDRFbzNSLzIqPl1iKE1DOyRqUGZZLjtoXmBJV005PExoMlRsUytmLXMkbzZRPEJXSGBZaVUueGZMcSROOyQwaVIvR1g6VShqY1cycC9XKnE/LXFtblVDSTtqSFNBaUZXTS5SKmtVQEM9R0g/YTl3cDhmJGUuLTReUWcxKVEtR0wobGYoci83R3JSZ3dWJU1TPUMjYDhORD5RbyN0J1gjKHYjWTl3MCMxRCRDSWY7VycjcFdVUFhPdXhYdVUoSDlNKDE8cS1VRTMxI14tVic4SVJVbzdRZi4vTD49S2UkJCc1RiUpXTBeIzBYQFUuYTxyOlFMdEZzTGNMNiMjbE9qKSMuWTU8LVImS2dMd3FKZkxnTiY7UT9nSV4jRFkydUxpQF5yTWw5dD1jV3E2IyN3ZWc+JEZCalZRVFNEZ0VLbklTN0VNOT5aWTl3MCNMOz4+I014JjRNdnQvL0xbTWtBI1dAbEsuTidbMCM3UkxfJiN3K0YlSHRHOU0jWExgTiYuLEdNNFBnOy08bkxFTmh2eD4tVnNNLk0wckpmTEgyZVRNYCpvSk1IUkNgTmtmaW1NMkosVy1qWFM6KXIwd0sjQEZnZSRVPmB3J043RyMkI2ZCIyRFXiQjOjk6aGsrZU9lLS02eClGNypFJT83NiVeR01IZVBXLVo1bCcmR2lGIyQ5NTY6clM/ZEEjZmlLOilZcitgJiMwakAnRGJHJiNeJFBHLkxsK0ROYTxYQ01LRVYqTilMTi9OKmI9JVE2cGlhLVhnOEkkPE1SJixWZEplJDwoN0c7Q2tsJyZoRjs7JDxfPVgoYi5SUyUlKSMjI01QQnV1RTFWOnYmY1gmIzJtIygmY1ZdYGs5T2hMTWJuJXMkRzIsQiRCZkQzWCpzcDUjbCwkUiNdeF9YMXhLWCViNVUqW3I1aU1mVW85VWBOOTloRyl0bSsvVXM5cEcpWFB1YDwwcy0pV1R0KGdDUnhJZyglNnNmaD1rdE1LbjNqKTw2PGI1U2tfLzAoXl1BYU4jKHAvTD4mVlo+MWklaDFTOXU1b0BZYWFXJGUrYjxUV0ZuL1o6T2goQ3gyJGxORW9OXmUpI0NGWUBASTtCT1Eqc1J3WnRaeFJjVTd1VzZDWG93MGkoPyRRW2NqT2RbUDRkKV0+Uk9QT3B4VE83U3R3aTE6OmlCMXEpQ189ZFYyNko7MixdN29wJF11UXJAX1Y3JHFeJWxRd3R1SFldPURYLG4zTCMwUEhETzRmOT5kQ0BPPkhCdUtQcFAqRSxOK2IzTCNscFIvTXJURUguSUFRay5hPkRbLmU7bWMueF1JcC5QSF4nL2FxVU8vJDFXeExvVzBbaUxBPFFUOzVIS0QrQHFRJ05RKDNfUExoRTQ4Ui5xQVBTd1EwL1dLP1osW3g/LUo7alFUV0EwWEBLSihfWThOLTovTTc0Oi8tWnBLclVzcz9kI2RacV1EQWJrVSpKcWtMK253WEBANDdgNT53PTRoKDkuYEdDUlV4SFBlUmA1TWpvbChkVVd4WmEoPlNUclBrckppV3hgNVU3RiMuZypqcm9oR2dgY2c6bFNUdkVZL0VWXzdINFE5W1olY252O0pRWVo1cS5sN1plYXM6SE9JWk9CP0c8TmFsZCRxc11AXUw8SjdiUio+Z3Y6WzdNSTJrKS4nMigkNUZOUCZFUSgsKVVdV10rZmgxOC52c2FpMDApO0QzQDRrdTVQP0RQOGFKdCs7cVVNXT0rYic4QDttVmlCS3gwREVbLWF1R2w4OlBKJkRqK002T0NdT14oKCMjXWAwaSlkclQ7LTdYYD0tSDNbaWdVblBHLU5abG8uI2tAaCM9T3JrJG0+YT4kLT9UbSRVVig/I1A2WVkjJy8jIyN4ZTdxLjczckkzKnBQLyQxPnM5KVcsSnJNN1NOXScvNEMjdiRVYDAjVi5bMD54UXNIJGZFbVBNZ1kydTdLaChHJXNpSWZMU29TK01LMmVUTSQ9NSxNOHBgQS47X1IlI3VbSyMkeDRBRzgua0svSFNCPT0tJ0llL1FUdEc/LS4qXk4tNEIvWk1fM1lsUUM3KHA3cSkmXShgNl9jKSQvKkpMKEwtXihdJHdJTWBkUHRPZEdBLFUzOncyTS0wPHEtXUxfP14pMXZ3Jy4sTVJzcVZyLkw7YU4mIy9FZ0opUEJjWy1mPitXb21YMnU3bHFNMmlFdW1NVGNzRj8tYVQ9Wi05N1VFblhnbEVuMUstYm5FT2BndUZ0KGMlPTtBbV9Rc0BqTG9vSSZOWDtdMCNqNCNGMTQ7Z2w4LUdRcGd3aHJxOCc9bF9mLWI0OSdVT3FrTHU3LSMjb0RZMkwodGUrTWNoJmdMWXRKLE1FdEpmTGgneCdNPSRDUy1aWiVQXThiWj4jUz9ZWSMlUSZxJzNeRncmP0QpVUROcm9jTTNBNzYvL29MPyNoN2dsODVbcVcvTkRPayUxNmlqOys6MWEnaU5JZGItb3U4LlAqdyx2NSNFSSRUV1M+UG90LVIqSCctU0VwQTpnKWYrTyQlJWBrQSNHPThSTW1HMSZPYD50bzhiQ11UJiQsbi5Mb08+MjlzcDNkdC01MlUlVk0jcTcnREhwZysjWjklSFtLPEwlYTJFLWdyV1ZNM0AyPS1rMjJ0TF00JCMjNldlJzhVSkNLRVtkXz0ld0k7JzZYLUdzTFg0al5TZ0okIyNSKncsdlAzd0sjaWlXJiMqaF5EJlI/anA3Ky91JiMoQVAjI1hVOGMkZlNZVy1KOTVfLURwW2c5d2NPJiNNLWgxT2NKbGMtKnZwdzB4VVgmI09RRktOWEBRSSdJb1BwN25iLFFVLy9NUSZaRGtLUClYPFdTVkwoNjh1VmwmI2MnWzAjKHMxWCZ4bSRZJUI3Kks6ZURBMzIzajk5OEdYYkEjcHdNcy1qZ0QkOVFJU0ItQV8oYU40eG9GTV5AQzU4RDArUStxM24wIzNVMUluRGpGNjgyLVNqTVhKSykoaCRoeHVhX0tddWw5MiUnQk9VJiNCUlJoLXNsZzhLRGxyOiVMNzFLYTouQTslWVVMakRQbUw8TFlzOGkjWHdKT1lhS1BLYzFoOic5S2UsZyliKSw3OD1JMzlCO3hpWSRiZ0d3LSYuWmk5SW5YRHVZYSVHKmYyQnE3bW45XiNwMXZ2JSMoV2ktOy9aNWhvOyMyOjslZCYjeDl2NjhDNWc/bnRYMFgpcFRgOyVwQjNxN21nR04pMyUoUDhuVGQ1TDdHZUEtR0xAKyVKM3UyOihZZj5ldGBlOylmI0ttOCYrREMkSTQ2PiNLcl1ddS1bPTk5dHRzMS5xYiNxNzJnMVdKTzgxcStlTicwMydlTT4mMVh4WS1jYUVuT2olMm44KSksP0lMUjVeLklibjwtWC1NcTdbYTgyTHE6RiYjY2UrUzl3c0NLKnhgNTY5RThldydIZV1oOnNJWzJMTSRbZ3VrYTNaUmQ2OnQlSUc6OyQlWWlKOk5xPT9lQXc7LzpubkRxMChDWWNNcEcpcUxONCQjIyZKPGokVXBLPFE0YTFdTXVwV14tc2pfJCVbSEslJ0YjIyMjUVJaSjo6WTNFR2w0J0AlRmtpQU9nI3BbIyNPYGd1a1RmQkhhZ0w8TEh3JXEmT1YwIyNGPTYvOmNoSW0wQGVDUDhYXTprRkklaGw4aGdPQFJjQmhTLUBRYiQlK209aFBETGcqJUs4bG4od2NmMy8nRFctJC5sUj9uW25DSC1lWE9PTlRKbGg6LlJZRiUzJ3A2c3E6VUlNQTk0NSZeSEZTODdAJEVQMmlHPC1sQ08kJWNgdUtHRDNyQyR4MEJMOGFGbi0tYGtlJSNITVAndmgxL1ImT19KOSd1bSwuPHR4W0Ald3NKayZiVVQyYDB1TXY3Z2cjcXAvaWouTDU2J2hsOy5zNUNVcnhqT003LSMjLmwrQXUnQSZPOi1UNzJMXVBgJj07Y3RwJ1hTY1gqclUuPi1YVHQsJU9WVTQpUzErUi0jZGcwL05uP0t1MV4wZiRCKlA6Um93d20tYDBQS2pZRERNJzNdZDM5VlpIRWw0LC5qJ11Qay1NLmheJjowRkFDbSRtYXEtJnNndzB0Ny82KF54dGslTHVIODhGai1la20+R0EjXz41Njh4NihPRlJsLUlacGAmYixfUCckTTxKbnE3OVZzSlcvbVdTKlBVaXE3NjtdL05NXz5oTGJ4ZmMkbWpgLE87JiVXMm1gWmg6LylVZXR3OmFKJV1LOWg6VGNGXXVfLVNqOSxWSzNNLionJjBEW0NhXUo5Z3A4LGtBV10lKD9BJVIkZjwtPlp0cydea249LV5AYzQlLXBZNnFJJUolMUlHeGZMVTlDUDhjYlBsWHYpO0M9YiksPDJtT3ZQOHVwLFVWZjM4MzlhY0FXQVctVz8jYW8vXiMlS1lvOGZSVUxOZDIuPiVtXVVLOm4lciQnc3ddSjs1cEFvT18jMm1PM24sJz1INShldEhnKmArUkxndj49NFU4Z3VEJEklRDpXPi1yNVYqJWoqVzpLdmVqLkxwJDxNLVNHWic6K1Ffayt1dk9TTGlFbyg8YUQvSzxDQ2NgJ0x4Pic/OysrTyc+KClqTFItXnU2OFBIbThaRldlK2VqOGg6OXI2TCowLy9jJmlIJlI4cFJiQSNLam0ldXBWMWc6YV8jVXI3RnVBIyh0UmgjLlk1SytAPzM8LThtMCRQRW47SjpyaDY/STZ1RzwtYHdNVSdpcmNwMExhRV9PdGxNYiYxIzZULiNGREt1IzFMdyV1JStHTStYJ2U/WUxmak1bVk8wTWJ1RnA3Oz5RJiNXSW8pMEBGJXE3YyM0WEFYTi1VJlZCPEhGRipxTCgkL1YsOyhrWFplaldPYDxbNT8/ZXdZKCo5PSV3RGM7LHU8Jzl0M1ctKEgxdGgzK0dddWNRXWtMczdkZigkLypKTF1AKnQ3QnVfRzNfN21wNzxpYVFqT0Aua0xnO3gzQjBscXA3SGYsXlplNy0jI0AvYzU4TW8oMztrbnAwJSlBNz8tVytlSSdvOCliPG5LbncnSG84Qz1ZPnBxQj4waWUmamhaWz9pTFJAQF9BdkEtaVFDKD1rc1JaUlZwN2AuPStOcEJDJXJoJjNdUjo4WERtRTVeVjhPKHg8PGFHLzFOJCNGWCQwVjVZNngnYUVySTNJJDd4JUVgdjwtQlksKSUtP1BzZipsPyVDMy5tTSg9L00wOkp4Ryc/N1doSCVvJ2E8LTgwZzBOQnhvTyhHSDxkTV1uLislcUBqSD9mLlVzSjJHZ3MmNDwtZTQ3JktsK2YvLzlAYGIrPy5UZU5fJkI4U3M/djteVHJrO2YjWXZKa2wmdyRdPi0raz8nKDxTOjY4dHEqV29EZlp1JzttTT84WFttYThXJSpgLT07RC4obmM3LzspZzpUMT1eSiQmQlJWKC1sVG1OQjZ4cUJbQDAqby5lck0qPFNXRl11Mj1zdC0qKDZ2Pl5dKEguYVJFWlNpLCMxOltJWGFaRk9tPC11aSNxVXEyJCMjUmk7dTc1T0sjKFJ0YVctSy1GYFMrY0ZddU5gLUtNUSVyUC9YcmkuTFJjQiMjPVlMM0JnTS8zTUQ/QGYmMSdCVy0pSnU8TDI1Z2w4dWhWbTFoTCQjIyo4IyMjJ0EzL0xrS1crKF5yV1g/NVdfOGcpYShtJks4UD4jYm1tV0NNa2smI1RSYEMsNWQ+ZylGO3QsNDpAX2w4Ry81aDR2VWQlJiU5NTA6VlhEJ1FkV29ZLUYkQnRVd21mZSRZcUwnOChQV1goUD9eQFBvMyQjI2BNU3M/RFdCWi9TPis0JT5mWCxWV3YvdydLRGBMUDVJYkg7clRWPm4zY0VLOFUjYlhdbC0vVitebGozO3ZsTWImWzVZUTgjcGVrWDlKUDNYVUM3MkwsLD8rTmkmY283QXBuTyo1TkssKChXLWk6JCxrcCdVREFPKEcwU3E3TVZqSnNiSXUpJ1osKls+YnI1ZlheOkZQQVdyLW0yS2dMPExVTjA5OGtURiYjbHZvNTg9L3ZqRG87LjspS2EqaExSIy9rPXJLYnh1VmA+UV9uTjYnOHVURyYjMVQ1Zyl1THY6ODczVXBUTGdIKyNGZ3BIJ19vMTc4MFBoOEtteFFKOCNINzJMNEA3NjhAVG0mUWg0Q0IvNU92bUEmLFEmUWJVb2kkYV8lM00wMUgpNHg3SV4mS1FWZ3RGblYrO1tQYz5bbTRrLy8sXTE/I2BWWVtKciozJiZzbFJmTGlWWko6XT89SzNTdz1bJD11UkI/M3hrNDhAYWVnPFonPCQjNEgpNiw+ZTBqVDYnTiMocSUuTz0/MlNddSoobTwtVjhKJygxKUddWzY4aFckNSdxW0dDJjVqYFRFP20nZXNGR05STSlqLGZmWj8tcXg4Oy0+ZzR0KjpDSVAvW1FhcDcvOScjKDFzYW83dy0ucU5VZGtKKXRDRiYjQl47eEd2bjJyOUZFUEZGRmNMQC5pRk5rVHZlJG0lI1F2UVM4VUApMlorM0s6QUtNNWlzWjg4K2RLUSlXNj5KJUNMPEtFPmAuZCooQmAtbjhEOW9LPFVwXWMkWCQoLClNOFp0Ny9bcmRrcVRnbC0wY3VHTXYnPz4tWFYxcVsnLTVrJ2NBWjY5ZTtEXz8kWlBQJnNeKzddKSQqJCNAUVlpOSw1UCYjOXIrJCVDRT02OD5LOHIwPWRTQyUlKEBwNy5tN2ppbFEwMicwLVZXQWc8YS8nJzN1Lj00TCRZKTZrL0s6X1szPSZqdkw8TDBDLzIndjpeOy1ESUJXLEI0RTY4OmtaOyU/OChROEJIPWtPNjVCVz94U0cmI0B1VSxEUyosPy4rKG8oIzF2Q1M4I0NIRj5UbEdXJ2IpVHE3VlQ5cV4qXiQkLjomTkBAJCYpV0h0UG0qNV9yTzAmZSVLJiMtMzBqKEU0IydaYi5vLyhUcG0kPksnZkBbUHZGbCxoZklOVE5VNnUnMHBhbzclWFVwOV01Lj4laGA4Xz1WWWJ4dWVsLk5UU3NKZkxhY0Z1M0InbFFTdS9tNi1PcWVtOFQrb0UtLSQwYS9rXXVqOUV3c0c+JXZlUipodl5CRnBRajpLJyNTSixzQi0nI10oai5MZzkyclR3LSpuJUAvOzM5cnJKRixsI3FWJU9ydEJlQzYvLDtxQjNlYk5XWz8sSHFqMkwuMU5QJkdqVVI9MUQ4UWFTM1VwJkAqOXdQPytsbzdiP0AlJ2s0YHAwWiQyMiVLMytpQ1pqP1hKTjRObSYrWUZddUAtVyRVJVZFUS8sLD4+IylEPGgjYCloMDo8UTY5MDl1YSsmVlUlbjI6Y0czRkotJUBCai1EZ0xyYEh3JkhBS2pLanNlSzwveEtUKilCLE45WDNda3JjMTJ0J3BnVFYoTHYtdExbeGdfJT1NX3E3YV54PzdVYmQ+IyU4Y1kjWVo/PSxgV2R4dS9hZSYjdzYpUjg5dEkjNkBzJyg2QmY3YSY/Uz1eWklfa1MmYWlgJj10RTcyTF9ELDteUik3WyRzPEVoI2MmKXEuTVhJJSN2OVJPYTVGWk8lc0Y3cTdOd2ImI3B0VUo6YXFKZSRTbDY4JS5EIyMjRUM+PD8tYUYmI1JOUXY+bzhsS04lNS8kKHZkZnE3K2ViQSN1MXBdb3ZVS1cmWSVxXSc+JDFALVt4Zm4kN1pUcDdtTSxHLEtvN2EmR3UlR1tSTXhKc1swTU0ld2NpLkxGREspKDxjYFE4TilqRUlGKis/UDJhOGclKSRxXW8yYUg4QyY8U2liQy9xLChlOnY7LWIjNlskTnREWjg0SmUyS052QiMkUDU/dFEzbnQoMGQ9ai5MUWYuL0xsMzMrKDtxM0wtdz04ZFgkI1dGJnVJSkAtYmZJPiU6X2kyQjVDc1I4JjlaJiM9bVBFbm0wZmA8JmMpUUw1dUojJXUlbEpqK0QtcjtCb0YmIzREb1M5N2g1ZylFI286JlM0d2VERiw5XkhvZWBoKkwrX2EqTnJMVy0xcEdfJjJVZEI4NmUlQi86PT4pTjR4ZVcuKndmdC07JCc1OC1FU3FyPGI/VUkoXyVAW1A0Nj4jVWAnNkFRXW0mNi9gWj4jUz9ZWSNWYztyN1UyJjMyNmQ9dyZIIyMjIz9UWmAqND8mLk1LP0xQOFZ4Zz4kW1FYYyVRSnY5Mi4oRGIqQilnYipCTTlkTSpoSk1BbypjJiNiMHY9UGplcl0kZ0cmSlhEZi0+J1N0dlU3NTA1bDkkQUZ2Z1lSSV4mPF5iNjg/aiNxOVFYNFNNJ1JPIyZzTDFJTS5ySmZMVUFqMjIxXWQjI0RXPW04M3U1OydiWXgsKlNsMGhMKFc7OyRkb0ImTy9UUTooWl54QmRMakw8TG5pOycnWC5gJCM4KzFHRDprJFlVV3NibjhvZ2g2cnhaMlo5XSVuZCs+ViMqOFVfNzJMaCsyUThDajBpOjZocCYkQy86cChISz5UOFlbZ0hRNGA0KSckQWIoTm9mJVYnOGhMJiM8TkVkdGcobic9UzFBKFExL0kmNChbJWRNYCxJdScxOl9oTD5TZkQwNyY2RDxmcDhkSE03L2crdGxQTjlKKnJLYVBjdCY/J3VCQ2VtXmpuJTlfSyk8LEM1SzNzPTVnJkdtSmIqW1NZcTdLO1RSTEdDc00tJCQ7UyU6WUByN0FLMHBwcnBMPExyaCxxN2UvJUtXSzo1MEleK20ndmlgMz8lWnArPC1kKyRMLVN2OkAubzE5biRzMCYzOTtrbjtTJUJTcSokM1dvSlNDTHdlVlthWidNUUlqTzw3O1gtWDsmK2RNTHZ1I15Vc0dFQzlXRWNbWCh3STcjMi4oRjBqViplWmY8LVF2M0otYytKNUFsckIjJHAoSDY4THZFQSdxM24wI20sW2AqOEZ0KUZjWWdFdWRdQ1dmbTY4LChhTEEkQEVGVGdMWG9CcS9VUGxwNzpkWy87cl9peD06VEZgUzVILWI8TEkmSFkoSz1oIyldTGskSzE0bFZmbTp4JEg8M15RbDxNYCRPaGFwQm5rdXAnRCNMJFBiX2BOKmddMmU7WC9EdGcsYnNqJksjMlstOmlZcidfd2dIKU5VSVI4YTFuI1M/WWVqJ2g4XjU4VWJaZCteRktEKlRAOzZBN2FRQ1tLOGQtKHY2R0kkeDpUPCYnR3A1VWY+QE0uKko6OyQtcnYyOSdNXThxTXYtdExwLCc4ODZpYUM9SGIqWUpvS0osKGolSz1IYEsudjlIZ2dxQklpWnUnUXZCVC4jPSkwdWtydVYmLikzPSheMWBvKlBqNDwtPGFOKCheNygnI1owd0sjNUdYQDd1XVtgKlNeNDM5MzNBNHJsXVtgKk80Q2dMRWxddiQxUTNBZUYzN2RiWGssLil2aiN4J2RgO3FnYlFSJUZXLDIoP0xPPXMlU2M2OCVOUCcjI0FvdGw4eD1CRSNqMVVEKFszJE0oXVVJMkxYM1JwS05AOy8jZidmLyZfbXQmRilYZEY8OXQ0KVFhLiprVEx3UScoVFRCOS54SCc+I01KK2dMcTktIyNASHVaUE4wXXU6aDcuVC4uRzo7JC9Vc2ooVDdgUTh0VDcyTG5ZbDwtcXg4Oy1IVjdRLSZYZHglMWEsaEM9MHUrSGxzVj5udUlRTC01PE4/KU5CUylRTipfSSw/JikyJ0lNJUwzSSlYKChlL2RsMiY4JzxNOl4jTSpRK1tULlhyaS5MWVMzdiVmRmA2OGg7Yi1YWy9FbidDUi5xN0UpcCcva2xlMkhNLHU7XiVPS0MtTitMbCVGOUNGPE5mJ14jdDJMLDsyN1c6ME9ANiMjVTZXNzokckpmTFdIaiQjKXdvcUJlZklaLlBLPGIqdDdlZDtwKl9tOzRFeEsjaEAmXT5fPkBrWFF0TWFjZkQubS1WQWI4O0lSZU0zJHdmMCcnaHJhKnNvNTY4J0lwJnZSczg0OSdNUllTcCU6dDpoNXFTZ3dwRXIkQj5RLDtzKEMjJClgc3ZRdUYkIyMtRCwjIyxnNjhAMltUOy5YU2ROOVFlKXJwdC5fSy0jNXdGKXNQJyMjcCNDMGMlLUdiJWhkKzwtaidBaSp4JiZITWtUXUMnT1NsIyM1UkdbSlhhSE47ZCd1QSN4Ll9VOy5gUFVAKFozZHQ0cjE1MkA6diwnUi5Taid3IzA8LTtrUEkpRmZKJiNBWUomIy8vKT4taz1tPSpYbkskPj0pNzJMXTBJJT4uRzY5MGE6JCMjPCwpOz87NzIjP3g5K2Q7XlYnOTtqWUA7KWJyI3FeWVFweDpYI1RlJFpeJz0tPWJHaExmOkQ2JmJOd1o5LVpEI25eOUhoTE1yNUc7J11kJjYnd1ltVEZtTDxMRClGXiVbdEMnODsrOUUjQyRnJSM1WT5xOXdJPlAoOW1JWz5rQy1la0xDL1ImQ0grcydCO0stTTYkRUIlaXMwMDorQTRbN3hrcy5Mck5rMCZFKXdJTFlGQDJMJzBOYiQrcHY8KDIuNzY4L0ZyWSZoJF4zaSZAK0clSlQnPC0sdmAzO18pSTlNXkFFXUNOP0NsMkFaZyslNGlUcFQzPG4tJiVIJWI8RkRqMk08aEg9JkVoPDJMZW4kYiphVFg9LThReE4pazExSU0xY15qJTlzPEw8TkZTbylCPys8LShHeHNGLF4tRWhAJDRkWGhOJCsjcnhLOCdqZSdEN2tgZTspMnBZd1BBJ19wOSZAXjE4bWwxXltAZzR0KltKT2EqWz1RcDcocUpfb09MXignN2ZCJkhxLTpzZixzTmo4eHFePiRVNE9dR0t4J205KWJAcDdZc3ZLM3deWVItQ2RRKjpJcjwoJHUmKSMoJj9MOVJnM0gpNGZpRXBeaUk5TzhLblRqLF1IP0QqcjcnTTtQd1o5SzBFXmsmLWNwSTsucC82X3Z3b0ZNVjwtPiMlWGkuTHhWbnJVKDQmOC9QKzpoTFNLaiQjVSVdNDl0J0k6cmdNaSdGTEBhOjBZLXVBWzM5JywodmJtYSpoVSU8LVNSRmBUdDo1NDJSX1ZWJHBAW3A4RFZbQSw/MTgzOUZXZEY8VGRkRjw5QWgtNiY5dFdvRGxoXSYxU3BHTXE+VGkxTypIJiMoQUw4W19QJS5NPnZeLSkpcU9UKkY1Q3EwYFllJSskQjZpOjdAMElYPE4rVCswTWxNQlBRKlZqPlNzRDxVNEpIWThrRDIpMmZVL00jJGUuKVQ0LF89OGhMaW1bJik7P1VrSycteD8nKDpzaUlmTDwkcEZNYGk8PyVXKG1HREhNJT5pV1AsIyNQYCUvTDxlWGk6QFo5Qy43bz1AKHBYZEFPL05MUThsUGwrSFBPUWE4d0Q4PV5HbFBhOFRLSTFDamhzQ1RTTEpNJy9XbD4tUyhxdyVzZi9AJSNCNjsvVTdLXXVaYmleT2NeMm48YmhQbVVrTXc+JXQ8KSdtRVZFJyduYFduSnJhJF5US3ZYNUI+O19hU0VLJywoaHdhMDppNEc/LkJjaS4oWFs/YiooJCw9LW48LlElYChYPT8rQEFtKkpzMCY9M2JoOEtdbUw8TG9Ocyc2LCc4NWAwP3QvJ19VNTlAXWRkRjwjTGRGPGVXZEY8T3VOLzQ1clk8LUxAJiMrZm0+Njk9TGIsT2NaVi8pO1RUbThWSTs/JU90SjwoYjRtcTdNNjp1P0tSZEY8Z1JAMkw9Rk5VLTxiWyg5Yy9NTDNtO1pbJG9GM2cpR0FXcXBBUmM9PFJPdTdjTDVsOy1bQV0lLytmc2Q7bCNTYWZUL2YqV10wPU8nJChUYjxbKSpAZTc3NVItOllvYiVnKj5sKjp4UD9ZYi41KSV3X0k/N3VrNUpDK0ZTKG0jaSdrLidhMGkpOTw3Yidmcyc1OWhxJCo1VWh2IyNwaV44K2hJRUJGYG52b2A7J2wwLl5TMTwtd1VLMi9Db2g1OEtLaExqTT1TTypyZk9gK3FDYFctT24uPUFKNTY+PmkyQDJMSDZBOiY1cWA/OUkzQEAnMDQmcDIvTFZhKlQtNDwtaTM7TTlVdlpkK043PmIqZUl3ZzpDQyljPD5uTyYjPElHZTtfXy50aGpabDwldyhXazJ4bXA0UUBJI0k5LERGXXU3LVA9Li1fOllKXWFTQFY/NipDKClkT3A3OldMLGImM1JnLy5jbU05JnJePiQoPi5aLUkmSihRMEhkNVElN0NvLWJgLWM8Tig2ckBpcCtBdXJLPG04NlFJdGgqI3Y7LU9CcWkrTDd3REUtSXI4S1snbStERFNMd0smLy4/LVYlVV8lMzpxS051JF9iKkIta3A3TmFEJ1FkV1FQS1lxW0A+UCloSTsqX0ZddWBSYlsuajhfUS88Jj51dStWc0gkc005VEElPykodm1KODApLFA3RT4pdGpEJTJMPS10I2ZLWyVgdj1RODxGZk5rZ2deb0liYWgqIzgvUXQkRiY6SyotKE4vJysxdk1CLHUoKS1hLlZVVSojW2UlZ0FBTyhTPldsQTIpO1NhPmdYbThZQmAxZEBLI25dNzYtYSRVLG1GPGZYXWlkcWQpPDMsXUo3Sm1XNGA2XXVrcz00LTcyTChqRWsrOmJKME1ecS04RG1fWj8wb2xQMUM5U2EmSFtkJmMkb29RVWpdRXhkKjNaTUAtV0dXMiVzJyxCLV9NJT4lVWw6Iy8neG9GTTlRWC0kLlFOJz5bJSRaJHVGNnBBNktpMk81Ojh3KnZQMTwtMWBbRywpLW0jPjBgUCYjZWIjLjNpKXJ0QjYxKG8nJD9YM0I8L1I5MDtlWl0lTmNxOy1UbF0jRj4yUWZ0XmFlXzV0S0w5TVVlOWIqc0xFUTk1QyZgPUc/QE1qPXdoKiczRT49LTwpR3QqSXcpJ1FHOmBASXdPZjcmXTFpJ1MwMUIrRXYvTmFjIzlTOz07WVFwZ182VWAqa1ZZMzl4SyxbLzZBajc6JzFCbS1fMUVZZmExK28mbzRocDdLTl9RKE9sSW9AUyU7alZkbjAnMTxWYzUyPXVgM15vLW4xJ2c0djU4SGomNl90NyQjIz9NKWM8JGJnUV8nU1koKC14a0EjWSgscCdIOXJJVlktYiwnJWJDUEY3Lko8VXBeLChkVTFWWSo1I1drVFU+aDE5dyxXUWhMSSkzUyNmJDIoZWIsanIqYjszVnddKjdOSCUkYzRWcyxlRDk+WFc4P05dbysoKnBnQyUvNzJMVi11PEhwLDNAZV45VUIxSithazktVE4vbWhLUGcrQUpZZCRNbHZBRl9qQ0sqLk8tXig2M2FkTVQtPlclaWV3UzhXNm0ycnRDcG8nUlMxUjg0PUBwYVRLdCk+PSUmMVspKnZwJ3UreCxWcndOOyZda3VPOUpEYmc9cE8kSioualZlO3UnbTBkcjlsLDwqd01LKk9lPWc4bFZfS0VCRmtPJ29VXV49Wy03OTIjb2ssKWldbFI4cVEyb0E4d2NSQ1peN3cvTmpoOz8uc3RYP1ExPlMxcTRCbiQpSzE8LXJHZE8nJFdyLkxjLkNHKSQvKkpMNHROUi8sU1ZPMyxhVXcnREpOOilTczt3R245QTMyaWp3JUZMK1owRm4uVTk7cmVTcSlibUkzMlU9PTVBTHVHJiNWZjEzOTgvcFZvMSpjLShhWTE2OG88YEpzU2JrLSwxTjskPjA6T1VhcygzOjhaOTcyTFNmRjhlYj1jLTs+U1B3Ny42aG4zbWA5XlhrbihyLnFTWzA7VCUmUWM9K1NUUnhYJ3ExQk5rMyYqZXUyOyY4cSQmeD5RI1E3XlRmKzY8KGQlWlZtajJiRGklLjNMMm4rNFcnJFBpRERHKWcsciUrPywkQD91b3U1dFNlMmFOX0FRVSo8aGBlLUdJNyk/T0syQS5kN19jKT93UTVBU0BETDNyIzdmU2tnbDYtKytEOidBLHVxN1N2bEIkcGNwSCdxM24wI18lZFkjeENwci1sPEYwTlJALSMjRkVWNk5URjYjIyRsODROMXc/QU8+J0lBT1VSUSMjVl5Gdi1YRmJHTTdGbChOPDNEaExHRiVxLjFyQyQjOlRfXyZQaTY4JTB4aV8mW3FGSig3N2pfJkpXb0YuVjczNSZULFtSKjp4RlIqSzU+PiNgYlctPzROZV8mNk5lXyY2TmVfJm5ga3ItI0dKY002WDt1TTZYO3VNKC5hLi5eMlRrTCVvUigjO3UuVCVmQXIlNHRKOCY+PDE9R0haXyttOS8jSDFGXlIjU0MjKk49QkE5KEQ/dltVaUZZPj5eOHAsS0tGLlddTDI5dUxrTGx1Lys0VDxYb0lCJmh4PVQxUGNEYUImO0hIKy1BRnI/KG05SFpWKUZLUzhKQ3c7U0Q9NlteL0RaVUxgRVVEZl1HR2xHJj53JClGLi9ebjMrcmxvK0RCOzVzSVlHTmsraTF0LTY5SmctLTBwYW83U20jSylwZEhXJjtMdUROSEBIPiMvWC1USSg7UD4jLEdjPiMwU3U+IzRgMT8jOGxDPyM8eFU/I0AuaT8jRDolQCNIRjdAI0xSSUAjUF9bQCNUa25AI1h3KkEjXS09QSNhOU9BI2Q8RiYjKjtHIyMuR1kjIzJTbCMjNmAoJCM6bDokIz54TCQjQi5gJCNGOnIkI0pGLiUjTlJAJSNSX1IlI1ZrZSUjWnd3JSNfLTQmIzNeUmglU2Zsci1rJ01TLm8/LjUvc1dlbC93cEVNMCUzJy8xKUteZjEtZD5HMjEmdigzNT5WYDM5VjdBND1vbng0QTFPWTVFSTA7NkliZ3I2TSRIUzdRPCk1OEM1dyw7V29BKiNbJVQqI2AxZyojZD0jKyNoSTUrI2xVRysjcGJZKyN0bmwrI3gkKSwjJjE7LCMqPU0sIy5JYCwjMlVyLCM2Yi4tIzt3W0gjaVF0QSNtXjBCI3FqQkIjdXZUQiMjLWhCIyc5JEMjK0U2QyMvUUhDIzNeWkMjN2ptQyM7dilEIz8sPEQjQzhORCNHRGFEI0tQc0QjT10vRSNnMUE1I0tBKjEjZ0MxNyNNR2Q7IzgoMDIjTC1kMyNyV000I0hnYTEjLDx3MCNULmo8I08jJzIjQ1lOMSNxYV46I180bTMjb0AvPSNlRzg9I3Q4SjUjYCs3OCM0dUktI20zQjIjU0JbOCNRMEA4I2lbKjkjaU9uOCMxTm07I15zTjkjcWg8OSM6PXgtI1A7SzIjJCVYOSNiQysuI1JnOzwjbU49LiNNVEYuI1JaTy4jMj8pNCNZIygvI1spMS8jYjtMLyNkQVUvIzBTdjsjbFkkMCNuYC0wI3NmNjAjKEYyNCN3ckgwIyUvZTAjVG1EPCMlSlNNRm92ZTpDVEJFWEk6PGVoMmcpQiwzaDJeRzNpOyNkM2pEPik0a01ZRDRsVnVgNG1gOiY1bmlVQTVAKEE1QkExXVBCQjp4bEJDQz0yQ0RMWE1DRVV0aUNmJjBnMid0Tj9QR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1BHVDRDUEdUNENQR1Q0Q1AtcWVrQ2AuOWtFZ14rRiRrd1ZpRkpUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNUtUQiY1S1RCJjVLVEImNW8sXjwtMjhaSSdPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwTz87eHBPPzt4cE8/O3hwOzdxLSNsTFlJOnh2RD0jAEH2/wALCkBAAABAQQAAmEEAQYqAAQu6AVBBAAAAAAAA4EAAAIBBAACAPwAAAEEAAPhBAAAAAAAAuEEAALhBAAAwQQAAMEEAAKhBAAAAAAAAEEEAALhBAACAQAAAMEEAAFxCAACQQQAAuEEAABBBAAAwQQAAgEAAAJJCAAAAAAAAiEEAAIhBAAAAQQAAAEEAAFxCAAAAAAAAiEEAAIhBAAAAQQAAAEEAALZCAAAAAAAAiEEAALBBAACgQAAAAAAgAP8AADD/MPAx/zEA/+//AE6vnwBB0IEBC5cnIAD/AAAw/zDwMf8xAP/v/wAAAQACAAQAAQABAAEAAQACAAEAAwACAAEAAgACAAEAAQABAAEAAQAFAAIAAQACAAMAAwADAAIAAgAEAAEAAQABAAIAAQAFAAIAAwABAAIAAQACAAEAAQACAAEAAQACAAIAAQAEAAEAAQABAAEABQAKAAEAAgATAAIAAQACAAEAAgABAAIAAQACAAEABQABAAYAAwACAAEAAgACAAEAAQABAAQACAAFAAEAAQAEAAEAAQADAAEAAgABAAUAAQACAAEAAQABAAoAAQABAAUAAgAEAAYAAQAEAAIAAgACAAwAAgABAAEABgABAAEAAQAEAAEAAQAEAAYABQABAAQAAgACAAQACgAHAAEAAQAEAAIABAACAAEABAADAAYACgAMAAUABwACAA4AAgAJAAEAAQAGAAcACgAEAAcADQABAAUABAAIAAQAAQABAAIAHAAFAAYAAQABAAUAAgAFABQAAgACAAkACAALAAIACQARAAEACAAGAAgAGwAEAAYACQAUAAsAGwAGAEQAAgACAAEAAQABAAIAAQACAAIABwAGAAsAAwADAAEAAQADAAEAAgABAAEAAQABAAEAAwABAAEACAADAAQAAQAFAAcAAgABAAQABAAIAAQAAgABAAIAAQABAAQABQAGAAMABgACAAwAAwABAAMACQACAAQAAwAEAAEABQADAAMAAQADAAcAAQAFAAEAAQABAAEAAgADAAQABQACAAMAAgAGAAEAAQACAAEABwABAAcAAwAEAAUADwACAAIAAQAFAAMAFgATAAIAAQABAAEAAQACAAUAAQABAAEABgABAAEADAAIAAIACQASABYABAABAAEABQABABAAAQACAAcACgAPAAEAAQAGAAIABAABAAIABAABAAYAAQABAAMAAgAEAAEABgAEAAUAAQACAAEAAQACAAEACgADAAEAAwACAAEACQADAAIABQAHAAIAEwAEAAMABgABAAEAAQABAAEABAADAAIAAQABAAEAAgAFAAMAAQABAAEAAgACAAEAAQACAAEAAQACAAEAAwABAAEAAQADAAcAAQAEAAEAAQACAAEAAQACAAEAAgAEAAQAAwAIAAEAAQABAAIAAQADAAUAAQADAAEAAwAEAAYAAgACAA4ABAAGAAYACwAJAAEADwADAAEAHAAFAAIABQAFAAMAAQADAAQABQAEAAYADgADAAIAAwAFABUAAgAHABQACgABAAIAEwACAAQAHAAcAAIAAwACAAEADgAEAAEAGgAcACoADAAoAAMANABPAAUADgARAAMAAgACAAsAAwAEAAYAAwABAAgAAgAXAAQABQAIAAoABAACAAcAAwAFAAEAAQAGAAMAAQACAAIAAgAFABwAAQABAAcABwAUAAUAAwAdAAMAEQAaAAEACAAEABsAAwAGAAsAFwAFAAMABAAGAA0AGAAQAAYABQAKABkAIwAHAAMAAgADAAMADgADAAYAAgAGAAEABAACAAMACAACAAEAAQADAAMAAwAEAAEAAQANAAIAAgAEAAUAAgABAA4ADgABAAIAAgABAAQABQACAAMAAQAOAAMADAADABEAAgAQAAUAAQACAAEACAAJAAMAEwAEAAIAAgAEABEAGQAVABQAHABLAAEACgAdAGcABAABAAIAAQABAAQAAgAEAAEAAgADABgAAgACAAIAAQABAAIAAQADAAgAAQABAAEAAgABAAEAAwABAAEAAQAGAAEABQADAAEAAQABAAMABAABAAEABQACAAEABQAGAA0ACQAQAAEAAQABAAEAAwACAAMAAgAEAAUAAgAFAAIAAgADAAcADQAHAAIAAgABAAEAAQABAAIAAwADAAIAAQAGAAQACQACAAEADgACAA4AAgABABIAAwAEAA4ABAALACkADwAXAA8AFwCwAAEAAwAEAAEAAQABAAEABQADAAEAAgADAAcAAwABAAEAAgABAAIABAAEAAYAAgAEAAEACQAHAAEACgAFAAgAEAAdAAEAAQACAAIAAwABAAMABQACAAQABQAEAAEAAQACAAIAAwADAAcAAQAGAAoAAQARAAEALAAEAAYAAgABAAEABgAFAAQAAgAKAAEABgAJAAIACAABABgAAQACAA0ABwAIAAgAAgABAAQAAQADAAEAAwADAAUAAgAFAAoACQAEAAkADAACAAEABgABAAoAAQABAAcABwAEAAoACAADAAEADQAEAAMAAQAGAAEAAwAFAAIAAQACABEAEAAFAAIAEAAGAAEABAACAAEAAwADAAYACAAFAAsACwABAAMAAwACAAQABgAKAAkABQAHAAQABwAEAAcAAQABAAQAAgABAAMABgAIAAcAAQAGAAsABQAFAAMAGAAJAAQAAgAHAA0ABQABAAgAUgAQAD0AAQABAAEABAACAAIAEAAKAAMACAABAAEABgAEAAIAAQADAAEAAQABAAQAAwAIAAQAAgACAAEAAQABAAEAAQAGAAMABQABAAEABAAGAAkAAgABAAEAAQACAAEABwACAAEABgABAAUABAAEAAMAAQAIAAEAAwADAAEAAwACAAIAAgACAAMAAQAGAAEAAgABAAIAAQADAAcAAQAIAAIAAQACAAEABQACAAUAAwAFAAoAAQACAAEAAQADAAIABQALAAMACQADAAUAAQABAAUACQABAAIAAQAFAAcACQAJAAgAAQADAAMAAwAGAAgAAgADAAIAAQABACAABgABAAIADwAJAAMABwANAAEAAwAKAA0AAgAOAAEADQAKAAIAAQADAAoABAAPAAIADwAPAAoAAQADAAkABgAJACAAGQAaAC8ABwADAAIAAwABAAYAAwAEAAMAAgAIAAUABAABAAkABAACAAIAEwAKAAYAAgADAAgAAQACAAIABAACAAEACQAEAAQABAAGAAQACAAJAAIAAwABAAEAAQABAAMABQAFAAEAAwAIAAQABgACAAEABAAMAAEABQADAAcADQACAAUACAABAAYAAQACAAUADgAGAAEABQACAAQACAAPAAUAAQAXAAYAPgACAAoAAQABAAgAAQACAAIACgAEAAIAAgAJAAIAAQABAAMAAgADAAEABQADAAMAAgABAAMACAABAAEAAQALAAMAAQABAAQAAwAHAAEADgABAAIAAwAMAAUAAgAFAAEABgAHAAUABwAOAAsAAQADAAEACAAJAAwAAgABAAsACAAEAAQAAgAGAAoACQANAAEAAQADAAEABQABAAMAAgAEAAQAAQASAAIAAwAOAAsABAAdAAQAAgAHAAEAAwANAAkAAgACAAUAAwAFABQABwAQAAgABQBIACIABgAEABYADAAMABwALQAkAAkABwAnAAkAvwABAAEAAQAEAAsACAAEAAkAAgADABYAAQABAAEAAQAEABEAAQAHAAcAAQALAB8ACgACAAQACAACAAMAAgABAAQAAgAQAAQAIAACAAMAEwANAAQACQABAAUAAgAOAAgAAQABAAMABgATAAYABQABABAABgACAAoACAAFAAEAAgADAAEABQAFAAEACwAGAAYAAQADAAMAAgAGAAMACAABAAEABAAKAAcABQAHAAcABQAIAAkAAgABAAMABAABAAEAAwABAAMAAwACAAYAEAABAAQABgADAAEACgAGAAEAAwAPAAIACQACAAoAGQANAAkAEAAGAAIAAgAKAAsABAADAAkAAQACAAYABgAFAAQAHgAoAAEACgAHAAwADgAhAAYAAwAGAAcAAwABAAMAAQALAA4ABAAJAAUADAALADEAEgAzAB8AjAAfAAIAAgABAAUAAQAIAAEACgABAAQABAADABgAAQAKAAEAAwAGAAYAEAADAAQABQACAAEABAACADkACgAGABYAAgAWAAMABwAWAAYACgALACQAEgAQACEAJAACAAUABQABAAEAAQAEAAoAAQAEAA0AAgAHAAUAAgAJAAMABAABAAcAKwADAAcAAwAJAA4ABwAJAAEACwABAAEAAwAHAAQAEgANAAEADgABAAMABgAKAEkAAgACAB4ABgABAAsAEgATAA0AFgADAC4AKgAlAFkABwADABAAIgACAAIAAwAJAAEABwABAAEAAQACAAIABAAKAAcAAwAKAAMACQAFABwACQACAAYADQAHAAMAAQADAAoAAgAHAAIACwADAAYAFQA2AFUAAgABAAQAAgACAAEAJwADABUAAgACAAUAAQABAAEABAABAAEAAwAEAA8AAQADAAIABAAEAAIAAwAIAAIAFAABAAgABwANAAQAAQAaAAYAAgAJACIABAAVADQACgAEAAQAAQAFAAwAAgALAAEABwACAB4ADAAsAAIAHgABAAEAAwAGABAACQARACcAUgACAAIAGAAHAAEABwADABAACQAOACwAAgABAAIAAQACAAMABQACAAQAAQAGAAcABQADAAIABgABAAsABQALAAIAAQASABMACAABAAMAGAAdAAIAAQADAAUAAgACAAEADQAGAAUAAQAuAAsAAwAFAAEAAQAFAAgAAgAKAAYADAAGAAMABwALAAIABAAQAA0AAgAFAAEAAQACAAIABQACABwABQACABcACgAIAAQABAAWACcAXwAmAAgADgAJAAUAAQANAAUABAADAA0ADAALAAEACQABABsAJQACAAUABAAEAD8A0wBfAAIAAgACAAEAAwAFAAIAAQABAAIAAgABAAEAAQADAAIABAABAAIAAQABAAUAAgACAAEAAQACAAMAAQADAAEAAQABAAMAAQAEAAIAAQADAAYAAQABAAMABwAPAAUAAwACAAUAAwAJAAsABAACABYAAQAGAAMACAAHAAEABAAcAAQAEAADAAMAGQAEAAQAGwAbAAEABAABAAIAAgAHAAEAAwAFAAIAHAAIAAIADgABAAgABgAQABkAAwADAAMADgADAAMAAQABAAIAAQAEAAYAAwAIAAQAAQABAAEAAgADAAYACgAGAAIAAwASAAMAAgAFAAUABAADAAEABQACAAUABAAXAAcABgAMAAYABAARAAsACQAFAAEAAQAKAAUADAABAAEACwAaACEABwADAAYAAQARAAcAAQAFAAwAAQALAAIABAABAAgADgARABcAAQACAAEABwAIABAACwAJAAYABQACAAYABAAQAAIACAAOAAEACwAIAAkAAQABAAEACQAZAAQACwATAAcAAgAPAAIADAAIADQABwAFABMAAgAQAAQAJAAIAAEAEAAIABgAGgAEAAYAAgAJAAUABAAkAAMAHAAMABkADwAlABsAEQAMADsAJgAFACAAfwABAAIACQARAA4ABAABAAIAAQABAAgACwAyAAQADgACABMAEAAEABEABQAEAAUAGgAMAC0AAgAXAC0AaAAeAAwACAADAAoAAgACAAMAAwABAAQAFAAHAAIACQAGAA8AAgAUAAEAAwAQAAQACwAPAAYAhgACAAUAOwABAAIAAgACAAEACQARAAMAGgCJAAoA0wA7AAEAAgAEAAEABAABAAEAAQACAAYAAgADAAEAAQACAAMAAgADAAEAAwAEAAQAAgADAAMAAQAEAAMAAQAHAAIAAgADAAEAAgABAAMAAwADAAIAAgADAAIAAQADAA4ABgABAAMAAgAJAAYADwAbAAkAIgCRAAEAAQACAAEAAQABAAEAAgABAAEAAQABAAIAAgACAAMAAQACAAEAAQABAAIAAwAFAAgAAwAFAAIABAABAAMAAgACAAIADAAEAAEAAQABAAoABAAFAAEAFAAEABAAAQAPAAkABQAMAAIACQACAAUABAACABoAEwAHAAEAGgAEAB4ADAAPACoAAQAGAAgArAABAAEABAACAAEAAQALAAIAAgAEAAIAAQACAAEACgAIAAEAAgABAAQABQABAAIABQABAAgABAABAAMABAACAAEABgACAAEAAwAEAAEAAgABAAEAAQABAAwABQAHAAIABAADAAEAAQABAAMAAwAGAAEAAgACAAMAAwADAAIAAQACAAwADgALAAYABgAEAAwAAgAIAAEABwAKAAEAIwAHAAQADQAPAAQAAwAXABUAHAA0AAUAGgAFAAYAAQAHAAoAAgAHADUAAwACAAEAAQABAAIAowAUAgEACgALAAEAAwADAAQACAACAAgABgACAAIAFwAWAAQAAgACAAQAAgABAAMAAQADAAMABQAJAAgAAgABAAIACAABAAoAAgAMABUAFAAPAGkAAgADAAEAAQADAAIAAwABAAEAAgAFAAEABAAPAAsAEwABAAEAAQABAAUABAAFAAEAAQACAAUAAwAFAAwAAQACAAUAAQALAAEAAQAPAAkAAQAEAAUAAwAaAAgAAgABAAMAAQABAA8AEwACAAwAAQACAAUAAgAHAAIAEwACABQABgAaAAcABQACAAIABwAiABUADQBGAAIAgAABAAEAAgABAAEAAgABAAEAAwACAAIAAgAPAAEABAABAAMABAAqAAoABgABADEAVQAIAAEAAgABAAEABAAEAAIAAwAGAAEABQAHAAQAAwDTAAQAAQACAAEAAgAFAAEAAgAEAAIAAgAGAAUABgAKAAMABAAwAGQABgACABAAKAEFABsAgwECAAIAAwAHABAACAAFACYADwAnABUACQAKAAMABwA7AA0AGwAVAC8ABQAVAAYAQfKoAQuxHgEAAgAEAAEAAQABAAEAAgABAAYAAgACAAEACAAFAAcACwABAAIACgAKAAgAAgAEABQAAgALAAgAAgABAAIAAQAGAAIAAQAHAAUAAwAHAAEAAQANAAcACQABAAQABgABAAIAAQAKAAEAAQAJAAIAAgAEAAUABgAOAAEAAQAJAAMAEgAFAAQAAgACAAoABwABAAEAAQADAAIABAADABcAAgAKAAwAAgAOAAIABAANAAEABgAKAAMAAQAHAA0ABgAEAA0ABQACAAMAEQACAAIABQAHAAYABAABAAcADgAQAAYADQAJAA8AAQABAAcAEAAEAAcAAQATAAkAAgAHAA8AAgAGAAUADQAZAAQADgANAAsAGQABAAEAAQACAAEAAgACAAMACgALAAMAAwABAAEABAAEAAIAAQAEAAkAAQAEAAMABQAFAAIABwAMAAsADwAHABAABAAFABAAAgABAAEABgADAAMAAQABAAIABwAGAAYABwABAAQABwAGAAEAAQACAAEADAADAAMACQAFAAgAAQALAAEAAgADABIAFAAEAAEAAwAGAAEABwADAAUABQAHAAIAAgAMAAMAAQAEAAIAAwACAAMACwAIAAcABAARAAEACQAZAAEAAQAEAAIAAgAEAAEAAgAHAAEAAQABAAMAAQACAAYAEAABAAIAAQABAAMADAAUAAIABQAUAAgABwAGAAIAAQABAAEAAQAGAAIAAQACAAoAAQABAAYAAQADAAEAAgABAAQAAQAMAAQAAQADAAEAAQABAAEAAQAKAAQABwAFAA0AAQAPAAEAAQAeAAsACQABAA8AJgAOAAEAIAARABQAAQAJAB8AAgAVAAkABAAxABYAAgABAA0AAQALAC0AIwArADcADAATAFMAAQADAAIAAwANAAIAAQAHAAMAEgADAA0ACAABAAgAEgAFAAMABwAZABgACQAYACgAAwARABgAAgABAAYAAgADABAADwAGAAcAAwAMAAEACQAHAAMAAwADAA8AFQAFABAABAAFAAwACwALAAMABgADAAIAHwADAAIAAQABABcABgAGAAEABAACAAYABQACAAEAAQADAAMAFgACAAYAAgADABEAAwACAAQABQABAAkABQABAAEABgAPAAwAAwARAAIADgACAAgAAQAXABAABAACABcACAAPABcAFAAMABkAEwAvAAsAFQBBAC4ABAADAAEABQAGAAEAAgAFABoAAgABAAEAAwALAAEAAQABAAIAAQACAAMAAQABAAoAAgADAAEAAQABAAMABgADAAIAAgAGAAYACQACAAIAAgAGAAIABQAKAAIABAABAAIAAQACAAIAAwABAAEAAwABAAIACQAXAAkAAgABAAEAAQABAAUAAwACAAEACgAJAAYAAQAKAAIAHwAZAAMABwAFACgAAQAPAAYAEQAHABsAtAABAAMAAgACAAEAAQABAAYAAwAKAAcAAQADAAYAEQAIAAYAAgACAAEAAwAFAAUACAAQAA4ADwABAAEABAABAAIAAQABAAEAAwACAAcABQAGAAIABQAKAAEABAACAAkAAQABAAsABgABACwAAQADAAcACQAFAAEAAwABAAEACgAHAAEACgAEAAIABwAVAA8ABwACAAUAAQAIAAMABAABAAMAAQAGAAEABAACAAEABAAKAAgAAQAEAAUAAQAFAAoAAgAHAAEACgABAAEAAwAEAAsACgAdAAQABwADAAUAAgADACEABQACABMAAwABAAQAAgAGAB8ACwABAAMAAwADAAEACAAKAAkADAALAAwACAADAA4ACAAGAAsAAQAEACkAAwABAAIABwANAAEABQAGAAIABgAMAAwAFgAFAAkABAAIAAkACQAiAAYAGAABAAEAFAAJAAkAAwAEAAEABwACAAIAAgAGAAIAHAAFAAMABgABAAQABgAHAAQAAgABAAQAAgANAAYABAAEAAMAAQAIAAgAAwACAAEABQABAAIAAgADAAEACwALAAcAAwAGAAoACAAGABAAEAAWAAcADAAGABUABQAEAAYABgADAAYAAQADAAIAAQACAAgAHQABAAoAAQAGAA0ABgAGABMAHwABAA0ABAAEABYAEQAaACEACgAEAA8ADAAZAAYAQwAKAAIAAwABAAYACgACAAYAAgAJAAEACQAEAAQAAQACABAAAgAFAAkAAgADAAgAAQAIAAMACQAEAAgABgAEAAgACwADAAIAAQABAAMAGgABAAcABQABAAsAAQAFAAMABQACAA0ABgAnAAUAAQAFAAIACwAGAAoABQABAA8ABQADAAYAEwAVABYAAgAEAAEABgABAAgAAQAEAAgAAgAEAAIAAgAJAAIAAQABAAEABAADAAYAAwAMAAcAAQAOAAIABAAKAAIADQABABEABwADAAIAAQADAAIADQAHAA4ADAADAAEAHQACAAgACQAPAA4ACQAOAAEAAwABAAYABQAJAAsAAwAmACsAFAAHAAcACAAFAA8ADAATAA8AUQAIAAcAAQAFAEkADQAlABwACAAIAAEADwASABQApQAcAAEABgALAAgABAAOAAcADwABAAMAAwAGAAQAAQAHAA4AAQABAAsAHgABAAUAAQAEAA4AAQAEAAIABwA0AAIABgAdAAMAAQAJAAEAFQADAAUAAQAaAAMACwAOAAsAAQARAAUAAQACAAEAAwACAAgAAQACAAkADAABAAEAAgADAAgAAwAYAAwABwAHAAUAEQADAAMAAwABABcACgAEAAQABgADAAEAEAARABYAAwAKABUAEAAQAAYABAAKAAIAAQABAAIACAAIAAYABQADAAMAAwAnABkADwABAAEAEAAGAAcAGQAPAAYABgAMAAEAFgANAAEABAAJAAUADAACAAkAAQAMABwACAADAAUACgAWADwAAQACACgABAA9AD8ABAABAA0ADAABAAQAHwAMAAEADgBZAAUAEAAGAB0ADgACAAUAMQASABIABQAdACEALwABABEAAQATAAwAAgAJAAcAJwAMAAMABwAMACcAAwABAC4ABAAMAAMACAAJAAUAHwAPABIAAwACAAIAQgATAA0AEQAFAAMALgB8AA0AOQAiAAIABQAEAAUACAABAAEAAQAEAAMAAQARAAUAAwAFAAMAAQAIAAUABgADABsAAwAaAAcADAAHAAIAEQADAAcAEgBOABAABAAkAAEAAgABAAYAAgABACcAEQAHAAQADQAEAAQABAABAAoABAACAAQABgADAAoAAQATAAEAGgACAAQAIQACAEkALwAHAAMACAACAAQADwASAAEAHQACACkADgABABUAEAApAAcAJwAZAA0ALAACAAIACgABAA0ABwABAAcAAwAFABQABAAIAAIAMQABAAoABgABAAYABwAKAAcACwAQAAMADAAUAAQACgADAAEAAgALAAIAHAAJAAIABAAHAAIADwABABsAAQAcABEABAAFAAoABwADABgACgALAAYAGgADAAIABwACAAIAMQAQAAoAEAAPAAQABQAbAD0AHgAOACYAFgACAAcABQABAAMADAAXABgAEQARAAMAAwACAAQAAQAGAAIABwAFAAEAAQAFAAEAAQAJAAQAAQADAAYAAQAIAAIACAAEAA4AAwAFAAsABAABAAMAIAABABMABAABAA0ACwAFAAIAAQAIAAYACAABAAYABQANAAMAFwALAAUAAwAQAAMACQAKAAEAGAADAMYANAAEAAIAAgAFAA4ABQAEABYABQAUAAQACwAGACkAAQAFAAIAAgALAAUAAgAcACMACAAWAAMAEgADAAoABwAFAAMABAABAAUAAwAIAAkAAwAGAAIAEAAWAAQABQAFAAMAAwASABcAAgAGABcABQAbAAgAAQAhAAIADAArABAABQACAAMABgABABQABAACAAkABwABAAsAAgAKAAMADgAfAAkAAwAZABIAFAACAAUABQAaAA4AAQALABEADAAoABMACQAGAB8AUwACAAcACQATAE4ADAAOABUATAAMAHEATwAiAAQAAQABAD0AEgBVAAoAAgACAA0AHwALADIABgAhAJ8AswAGAAYABwAEAAQAAgAEAAIABQAIAAcAFAAgABYAAQADAAoABgAHABwABQAKAAkAAgBNABMADQACAAUAAQAEAAQABwAEAA0AAwAJAB8AEQADABoAAgAGAAYABQAEAAEABwALAAMABAACAAEABgACABQABAABAAkAAgAGAAMABwABAAEAAQAUAAIAAwABAAYAAgADAAYAAgAEAAgAAQAFAA0ACAAEAAsAFwABAAoABgACAAEAAwAVAAIAAgAEABgAHwAEAAoACgACAAUAwAAPAAQAEAAHAAkAMwABAAIAAQABAAUAAQABAAIAAQADAAUAAwABAAMABAABAAMAAQADAAMACQAIAAEAAgACAAIABAAEABIADABcAAIACgAEAAMADgAFABkAEAAqAAQADgAEAAIAFQAFAH4AHgAfAAIAAQAFAA0AAwAWAAUABgAGABQADAABAA4ADABXAAMAEwABAAgAAgAJAAkAAwADABcAAgADAAcABgADAAEAAgADAAkAAQADAAEABgADAAIAAQADAAsAAwABAAYACgADAAIAAwABAAIAAQAFAAEAAQALAAMABgAEAAEABwACAAEAAgAFAAUAIgAEAA4AEgAEABMABwAFAAgAAgAGAE8AAQAFAAIADgAIAAIACQACAAEAJAAcABAABAABAAEAAQACAAwABgAqACcAEAAXAAcADwAPAAMAAgAMAAcAFQBAAAYACQAcAAgADAADAAMAKQA7ABgAMwA3ADkAJgEJAAkAAgAGAAIADwABAAIADQAmAFoACQAJAAkAAwALAAcAAQABAAEABQAGAAMAAgABAAIAAgADAAgAAQAEAAQAAQAFAAcAAQAEAAMAFAAEAAkAAQABAAEABQAFABEAAQAFAAIABgACAAQAAQAEAAUABwADABIACwALACAABwAFAAQABwALAH8ACAAEAAMAAwABAAoAAQABAAYAFQAOAAEAEAABAAcAAQADAAYACQBBADMABAADAA0AAwAKAAEAAQAMAAkAFQBuAAMAEwAYAAEAAQAKAD4ABAABAB0AKgBOABwAFAASAFIABgADAA8ABgBUADoA/QAPAJsACAEPABUACQAOAAcAOgAoACcAQbDHAQsQIAD/AAAELwXgLf8tQKafpgBB0scBCyaAP83MzD0K1yM8bxKDOhe30TisxSc3vTeGNZW/1jN3zCsyX3CJMABBgMgBC0YEAAAA344AAN+OAAAEAAAA6Y4AAOmOAAAIAAAA7I4AAOyOAAAIAAAA8Y4AAPGOAAAEAAAA4o4AAOKOAAAIAAAA4o4AAOWOAEHQyAELkgL3kAAA+5AAAP+QAAADkQAAuZAAALmQAAC5kAAAuZAAAL+QAADHkAAAz5AAANeQAADfkAAA55AAAO+QAADXkAAAi5AAAIuQAACLkAAAi5AAAI+QAACVkAAAm5AAAKGQAACnkAAArZAAALOQAAChkAAA/wAA////AP8A/wD/AP///wAA////AP///wAA/wAAAADoegAA0HQAANB0AADQdAAA0HQAADh7AABYewAA0HQAAAh7AADQdAAA0HQAAAh7AAA4ewAAOHsAAFh7AABYewAA6HoAAFh7AABYewAAWHsAANB0AADQdAAA0HQAAAAAAAAIewAAQHsAAAh1AAA4ewAA6HoAADh7AABYewAA0HQAANB0AEHwygELEtB0AADYdAAACHsAAFh7AADQdABBkMsBCyLoegAA0HQAANB0AAAIewAACHsAANh0AADQdAAAUHsAADh7AEHAywELIgh7AADQdAAAOHsAAAh7AAAIewAA2HQAANB0AADQdAAACHsAQfDLAQsSCHsAANh0AADQdAAACHsAAAh7AEGQzAELNuh6AADYdAAAWHsAANB0AAAIewAA2HQAADh7AAA4ewAACHsAANh0AADQdAAA0HQAADh7AAA4ewBB0MwBCxIIewAA2HQAAAh7AAA4ewAA0HQAQfDMAQsyCHsAADh7AAA4ewAA2HQAAAh7AADYdAAAOHsAANh0AAAIewAA2HQAANB0AAA4ewAA0HQAQbDNAQsiCHsAANh0AADQdAAAOHsAANB0AADQdAAA0HQAANB0AADQdABB4M0BCzYIewAA2HQAADh7AADQdAAA0HQAANB0AADQdAAA0HQAAAh7AADYdAAA0HQAADh7AAA4ewAA0HQAQaDOAQsSCHsAANh0AADQdAAA0HQAANB0AEHAzgELdgh7AADYdAAA0HQAANB0AADQdAAA0HQAANB0AAAAAAAACHsAANh0AAA4ewAA0HQAANB0AADQdAAA0HQAADh7AAAIewAA2HQAANB0AABgewAAYHsAANB0AAA4ewAAAAAAAAh7AADYdAAA0HQAADh7AAA4ewAAOHsAQcDPAQsSCHsAANh0AADQdAAA0HQAADh7AEHgzwELggEIewAA2HQAANB0AADQdAAA0HQAANB0AAA4ewAAAAAAAAh7AADYdAAA0HQAAFB7AADQdAAAOHsAANB0AADQdAAACHsAANh0AADQdAAAUHsAADh7AADQdAAA0HQAAAAAAAAIewAA2HQAADh7AADQdAAA0HQAANB0AADQdAAA0HQAANB0AEHw0AELIgh7AADYdAAA0HQAANB0AADQdAAA0HQAANB0AADQdAAA0HQAQaDRAQtGCHsAANh0AADQdAAA0HQAADh7AAA4ewAA0HQAAAAAAAAIewAA2HQAANB0AADQdAAA0HQAANB0AADQdAAA0HQAANB0AADQdABB8NEBC3YIewAA2HQAANB0AADQdAAA0HQAANB0AADQdAAA0HQAAAh7AADYdAAA0HQAANB0AADQdAAAOHsAADh7AAAAAAAA6HoAAFh7AADQdAAA0HQAAOh6AADYdAAA0HQAANB0AAA4ewAAOHsAANB0AADQdAAA0HQAANB0AEHw0gELkgEIewAA2HQAANB0AABAewAACHsAANB0AADQdAAA0HQAANB0AAA4ewAA0HQAANB0AADoegAA0HQAANB0AADQdAAA0HQAANB0AADQdAAAAAAAAOh6AAA4ewAA0HQAAAh7AADoegAA2HQAAAh7AAA4ewAA6HoAANh0AADQdAAAOHsAAOh6AADQdAAA0HQAANB0AADQdABBkNQBCyLoegAA0HQAADh7AADQdAAACHsAANB0AADQdAAACHsAADh7AEHA1AELhgEIewAA2HQAANB0AAA4ewAACHsAANh0AABQewAAUHsAAFB7AABQewAAUHsAAAAAAAAIewAAWHYAADh7AADQdAAACHsAAJh2AAA4ewAAWHsAAAh7AACYdgAAOHsAAAh7AAAIewAAmHYAADh7AAA4ewAA0HQAAAh3AADQdAAAWHsAANB0AADQdABB0NUBCzLoegAAIHYAANB0AABYewAA0HQAAEB7AAAwewAAAAAAADh7AAAgdgAAWHsAANh0AABYewBBkNYBC2LQdAAAIHYAAFh7AABYewAAWHsAANh0AADQdAAA0HQAAOh6AABAdQAA0HQAANB0AADQdAAA0HQAANB0AADQdAAA0HQAANB0AABAewAAAAAAAOh6AABAdQAA0HQAANB0AABAewBBgNcBCzboegAAMHUAADh7AAA4ewAA6HoAAEB1AADQdAAA0HQAAOh6AABAdQAA0HQAANB0AABYewAAOHsAQcDXAQsW6HoAAEB1AADQdAAA0HQAANB0AAA4ewBB4NcBCxboegAAQHUAANB0AABYewAAOHsAADh7AEGA2AELMuh6AABAdQAA0HQAAFh7AABYewAAWHsAADh7AAAAAAAA6HoAAEB1AABAewAACHsAAFh7AEHA2AELIuh6AABAdQAA0HQAANB0AADQdAAA0HQAAEB7AABYewAAOHsAQfDYAQsS6HoAAEB1AADQdAAAOHsAAEB7AEGQ2QELRuh6AABAdQAA0HQAADh7AABAewAACHsAAFh7AAAAAAAA6HoAAEB1AADQdAAA0HQAANB0AADQdAAA0HQAAEB7AABYewAAOHsAQeDZAQty6HoAAEB1AADQdAAA0HQAANB0AADQdAAA0HQAANB0AADQdAAA0HQAANB0AABAewAA6HoAAEB1AADQdAAA0HQAANB0AADQdAAA0HQAAEB7AADoegAAQHUAANB0AABYewAA0HQAAEB7AADYdAAAWHsAANB0AEHg2gELEuh6AABAdQAA0HQAAEB7AADYdABBgNsBCxboegAAQHUAANB0AABYewAAQHsAADh7AEGg2wELNuh6AABAdQAA0HQAAFh7AABAewAAOHsAAFh7AAAAAAAA6HoAAEB1AADQdAAA0HQAANB0AABAewBB4NsBC9YB6HoAAEB1AADQdAAA0HQAANB0AABAewAAWHsAAAAAAADoegAAQHUAANB0AADQdAAA0HQAANB0AABAewAAAAAAAOh6AABAdQAA0HQAANB0AADQdAAA0HQAAEB7AABYewAA6HoAAEB1AADQdAAA0HQAAEB7AABAewAAQHsAAEB7AADoegAAQHUAANB0AADQdAAAQHsAAFh7AAA4ewAAAAAAAOh6AABAdQAA0HQAANB0AABAewAAWHsAADh7AABYewAA6HoAAEB1AADQdAAA0HQAAEB7AABYewBBwN0BCxLoegAAQHUAANB0AADQdAAACHsAQeDdAQtG6HoAAOB3AAA4ewAAWHsAAOh6AAD4dQAAOHsAANh0AADoegAA6HUAADh7AAA4ewAA0HQAANB0AADQdAAA0HQAANB0AADQdABBsN4BC4EE0HQAANB0AADQdAAA0HQAAAIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADDBQAAwwYAAMMHAADDCAAAwwkAAMMKAADDCwAAwwwAAMMNAADTDgAAww8AAMMAAAy7AQAMwwIADMMDAAzDBAAM0wAAAAAKAAAAZAAAAOgDAAAQJwAAoIYBAEBCDwCAlpgAAOH1Bf////////////////////////////////////////////////////////////////8AAQIDBAUGBwgJ/////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AEHA4gELGBEACgAREREAAAAABQAAAAAAAAkAAAAACwBB4OIBCyERAA8KERERAwoHAAETCQsLAAAJBgsAAAsABhEAAAAREREAQZHjAQsBCwBBmuMBCxgRAAoKERERAAoAAAIACQsAAAAJAAsAAAsAQcvjAQsBDABB1+MBCxUMAAAAAAwAAAAACQwAAAAAAAwAAAwAQYXkAQsBDgBBkeQBCxUNAAAABA0AAAAACQ4AAAAAAA4AAA4AQb/kAQsBEABBy+QBCx4PAAAAAA8AAAAACRAAAAAAABAAABAAABIAAAASEhIAQYLlAQsOEgAAABISEgAAAAAAAAkAQbPlAQsBCwBBv+UBCxUKAAAAAAoAAAAACQsAAAAAAAsAAAsAQe3lAQsBDABB+eUBC74CDAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGAwAAAAQAAAAEAAAABgAAAIP5ogBETm4A/CkVANFXJwDdNPUAYtvAADyZlQBBkEMAY1H+ALveqwC3YcUAOm4kANJNQgBJBuAACeouAByS0QDrHf4AKbEcAOg+pwD1NYIARLsuAJzphAC0JnAAQX5fANaROQBTgzkAnPQ5AItfhAAo+b0A+B87AN7/lwAPmAUAES/vAApaiwBtH20Az342AAnLJwBGT7cAnmY/AC3qXwC6J3UA5evHAD178QD3OQcAklKKAPtr6gAfsV8ACF2NADADVgB7/EYA8KtrACC8zwA29JoA46kdAF5hkQAIG+YAhZllAKAUXwCNQGgAgNj/ACdzTQAGBjEAylYVAMmocwB74mAAa4zAAEHD6AELbUD7Ifk/AAAAAC1EdD4AAACAmEb4PAAAAGBRzHg7AAAAgIMb8DkAAABAICV6OAAAAIAiguM2AAAAAB3zaTU4Y+0+2g9JP16Yez/aD8k/aTesMWghIjO0DxQzaCGiMwAAAAAAAPA/AAAAAAAA+D8AQbjpAQsIBtDPQ+v9TD4AQcvpAQveB0ADuOI/7IEAANakAACcggAA76QAAAAAAAABAAAA8HQAAAAAAADsgQAALqUA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ABwAAADoegAAoHUAAAAAAACodQAAHQAAAEB7AADoegAAsHUAAAAAAAC4dQAAHgAAAAAAAADAdQAAHwAAACAAAAAhAAAAIgAAAAAAAADIdQAAIwAAACQAAAAlAAAAJgAAAAAAAADQdQAAJwAAACgAAAApAAAAKgAAAAAAAADYdQAAKwAAACwAAAAtAAAALgAAAAAAAADgdQAALwAAADAAAAAxAAAAMgAAANB0AADQdAAA0HQAAAh7AADYdAAACHsAAAAAAAAAdgAAMwAAADQAAAA1AAAANgAAAAAAAAAIdgAANwAAADgAAAA5AAAAOgAAAAh7AADYdAAAOHsAAAh7AADYdAAACHsAANh0AADQdAAA6HoAANh0AADYdAAA6HoAANB0AADYdAAA6HoAADh7AABYewAAWHsAADh7AADoegAACHsAAEB7AABAewAAQHsAANB0AABAewAAOHsAANB0AADQdAAAOHsAAOh6AAA4ewAA6HoAADh7AADQdAAAEHYAAOh6AABYewAAWHsAAOh6AAAIewAAOHsAAOh6AADQdAAAOHsAAOh6AABYewAAWHsAANB0AADQdAAA6HoAAFh2AADoegAA2HQAAFh2AADoegAA0HQAAOh6AADoegAAoHYAAKB2AADQdAAA2HQAANB0AADoegAAWHYAAFh7AADQdAAAWHYAADh7AABYewAAmHYAADh7AADQdAAA6HYAADh7AADoegAAiHYAAOh6AACYdgAA2HQAAOh6AACIdgAAMHsAAAh7AACYdgAAOHsAADh7AACYdgAAOHsAAOh6AAD4dgAA0HQAANB0AAAIdwAACHsAAPh2AADoegAA+HYAAEh7AADQdAAACHcAANB0AAAwdQAA2HQAACB2AAAIewAAKHcAAFh7AAAodwAAMHsAAOh6AAAQdgAAMHsAANB0AAAgdgAAMHsAAOh6AAAQdgAAOHcAAOh6AAAQdgAA0HQAAOh6AACAdgAA0HQAAOh6AABwdgAA6HoAAIh3AADQdAAA6HoAAEB1AAAwewAA6HoAADB1AAA4ewAA6HoAAEB1AABAewAAAAAAAKh3AAA7AAAA0HQAAEB1AADQdAAA6HoAAEB1AADQdAAA6HoAADB1AADoegAAmHcAANB0AADoegAA4HcAAAh7AADgdwAA4HcAADh7AABYewAA4HcAADh7AADgdwAACHsAABh4AADQdAAA0HQAANB0AACoeAAAOHkAADh5AEGIgwILA/AUAQBBwIMCC+CJAV9wiQD/CS8PAACAPwAAwD8AAAAA3M/RNQAAAAAAwBU/AQAAAAAAAABgegAAPAAAAD0AAAA+AAAAPwAAAAQAAAABAAAAAQAAAAEAAAAAAAAAiHoAADwAAABAAAAAPgAAAD8AAAAEAAAAAgAAAAIAAAACAAAAAAAAAJh6AABBAAAAQgAAAAIAAAAAAAAAqHoAAEEAAABDAAAAAgAAAAAAAADYegAAPAAAAEQAAAA+AAAAPwAAAAUAAAAAAAAAyHoAADwAAABFAAAAPgAAAD8AAAAGAAAAAAAAAGh7AAA8AAAARgAAAD4AAAA/AAAABAAAAAMAAAADAAAAAwAAACAA/wAAACAA/wAxMWMxAKyd1wAAIAD/ABAgXiAADn8OAABpbWd1aS5pbmkAaW1ndWlfbG9nLnR4dAAjTU9WRQBEZWJ1ZyMjRGVmYXVsdABXaW5kb3cALi4uACNDT0xMQVBTRQAjQ0xPU0UAV2luZG93QmcAQ2hpbGRCZwBQb3B1cEJnAEJvcmRlcgBCb3JkZXJTaGFkb3cARnJhbWVCZwBGcmFtZUJnSG92ZXJlZABGcmFtZUJnQWN0aXZlAFRpdGxlQmcAVGl0bGVCZ0FjdGl2ZQBUaXRsZUJnQ29sbGFwc2VkAE1lbnVCYXJCZwBTY3JvbGxiYXJCZwBTY3JvbGxiYXJHcmFiAFNjcm9sbGJhckdyYWJIb3ZlcmVkAFNjcm9sbGJhckdyYWJBY3RpdmUAQ2hlY2tNYXJrAFNsaWRlckdyYWIAU2xpZGVyR3JhYkFjdGl2ZQBCdXR0b25Ib3ZlcmVkAEJ1dHRvbkFjdGl2ZQBIZWFkZXIASGVhZGVySG92ZXJlZABIZWFkZXJBY3RpdmUAU2VwYXJhdG9ySG92ZXJlZABTZXBhcmF0b3JBY3RpdmUAUmVzaXplR3JpcABSZXNpemVHcmlwSG92ZXJlZABSZXNpemVHcmlwQWN0aXZlAFRhYgBUYWJIb3ZlcmVkAFRhYkFjdGl2ZQBUYWJVbmZvY3VzZWQAVGFiVW5mb2N1c2VkQWN0aXZlAFBsb3RMaW5lc0hvdmVyZWQAUGxvdEhpc3RvZ3JhbUhvdmVyZWQAVGV4dFNlbGVjdGVkQmcARHJhZ0Ryb3BUYXJnZXQATmF2SGlnaGxpZ2h0AE5hdldpbmRvd2luZ0hpZ2hsaWdodABOYXZXaW5kb3dpbmdEaW1CZwBNb2RhbFdpbmRvd0RpbUJnAFVua25vd24AIyNUb29sdGlwXyUwMmQAIyNNZW51XyUwMmQAIyNQb3B1cF8lMDh4AHdpbmRvd19jb250ZXh0AHZvaWRfY29udGV4dABjb2x1bW5zACNTb3VyY2VFeHRlcm4ACiUqcyUuKnMAICUuKnMAYWIACgBMb2cgVG8gVFRZAExvZyBUbyBGaWxlAExvZyBUbyBDbGlwYm9hcmQARGVwdGgAcmIAd3QASW1HdWkgTWV0cmljcwABRGVhciBJbUd1aSAlcwBBcHBsaWNhdGlvbiBhdmVyYWdlICUuM2YgbXMvZnJhbWUgKCUuMWYgRlBTKQAlZCB2ZXJ0aWNlcywgJWQgaW5kaWNlcyAoJWQgdHJpYW5nbGVzKQAlZCBhY3RpdmUgd2luZG93cyAoJWQgdmlzaWJsZSkAJWQgYWxsb2NhdGlvbnMAU2hvdyBjbGlwcGluZyByZWN0YW5nbGVzIHdoZW4gaG92ZXJpbmcgZHJhdyBjb21tYW5kcwBDdHJsIHNob3dzIHdpbmRvdyBiZWdpbiBvcmRlcgBXaW5kb3dzAERyYXdMaXN0AEFjdGl2ZSBEcmF3TGlzdHMgKCVkKQBQb3B1cHMAUG9wdXBzICglZCkAUG9wdXBJRDogJTA4eCwgV2luZG93OiAnJXMnJXMlcwBOVUxMACBDaGlsZFdpbmRvdwAgQ2hpbGRNZW51AFRhYkJhcnMAVGFiIEJhcnMgKCVkKQBJbnRlcm5hbCBzdGF0ZQBOb25lAE1vdXNlAE5hdgBOYXZLZXlib2FyZABOYXZHYW1lcGFkAEhvdmVyZWRXaW5kb3c6ICclcycASG92ZXJlZFJvb3RXaW5kb3c6ICclcycASG92ZXJlZElkOiAweCUwOFgvMHglMDhYICglLjJmIHNlYyksIEFsbG93T3ZlcmxhcDogJWQAQWN0aXZlSWQ6IDB4JTA4WC8weCUwOFggKCUuMmYgc2VjKSwgQWxsb3dPdmVybGFwOiAlZCwgU291cmNlOiAlcwBBY3RpdmVJZFdpbmRvdzogJyVzJwBNb3ZpbmdXaW5kb3c6ICclcycATmF2V2luZG93OiAnJXMnAE5hdklkOiAweCUwOFgsIE5hdkxheWVyOiAlZABOYXZJbnB1dFNvdXJjZTogJXMATmF2QWN0aXZlOiAlZCwgTmF2VmlzaWJsZTogJWQATmF2QWN0aXZhdGVJZDogMHglMDhYLCBOYXZJbnB1dElkOiAweCUwOFgATmF2RGlzYWJsZUhpZ2hsaWdodDogJWQsIE5hdkRpc2FibGVNb3VzZUhvdmVyOiAlZABOYXZXaW5kb3dpbmdUYXJnZXQ6ICclcycARHJhZ0Ryb3A6ICVkLCBTb3VyY2VJZCA9IDB4JTA4WCwgUGF5bG9hZCAiJXMiICglZCBieXRlcykAIyNPdmVybGF5ACVzLyVzXyUwOFgAJXMvJTA4WAAjUkVTSVpFACMjI05hdldpbmRvd2luZ0xpc3QAKFBvcHVwKQAoTWFpbiBtZW51IGJhcikAKFVudGl0bGVkKQBQb3M9JWYsJWYAU2l6ZT0lZiwlZgBDb2xsYXBzZWQ9JWQAIyMjAFslc11bJXNdCgBQb3M9JWQsJWQKAFNpemU9JWQsJWQKAENvbGxhcHNlZD0lZAoAJXMgKCVkKQAlcyAnJXMnLCAlZCBAIDB4JXAAUG9zOiAoJS4xZiwlLjFmKSwgU2l6ZTogKCUuMWYsJS4xZiksIFNpemVDb250ZW50cyAoJS4xZiwlLjFmKQBGbGFnczogMHglMDhYICglcyVzJXMlcyVzJXMlcyVzJXMuLikAQ2hpbGQgAFRvb2x0aXAgAFBvcHVwIABNb2RhbCAAQ2hpbGRNZW51IABOb1NhdmVkU2V0dGluZ3MgAE5vTW91c2VJbnB1dHMATm9OYXZJbnB1dHMAQWx3YXlzQXV0b1Jlc2l6ZQBTY3JvbGw6ICglLjJmLyUuMmYsJS4yZi8lLjJmKQBBY3RpdmU6ICVkLyVkLCBXcml0ZUFjY2Vzc2VkOiAlZCwgQmVnaW5PcmRlcldpdGhpbkNvbnRleHQ6ICVkAEFwcGVhcmluZzogJWQsIEhpZGRlbjogJWQgKFJlZyAlZCBSZXNpemUgJWQpLCBTa2lwSXRlbXM6ICVkAE5hdkxhc3RJZHM6IDB4JTA4WCwweCUwOFgsIE5hdkxheWVyQWN0aXZlTWFzazogJVgATmF2TGFzdENoaWxkTmF2V2luZG93OiAlcwBOYXZSZWN0UmVsWzBdOiAoJS4xZiwlLjFmKSglLjFmLCUuMWYpAE5hdlJlY3RSZWxbMF06IDxOb25lPgBSb290V2luZG93AFBhcmVudFdpbmRvdwBDaGlsZFdpbmRvd3MAQ29sdW1ucyBzZXRzICglZCkAQ29sdW1ucyBJZDogMHglMDhYLCBDb3VudDogJWQsIEZsYWdzOiAweCUwNFgAV2lkdGg6ICUuMWYgKE1pblg6ICUuMWYsIE1heFg6ICUuMWYpAENvbHVtbiAlMDJkOiBPZmZzZXROb3JtICUuM2YgKD0gJS4xZiBweCkAU3RvcmFnZTogJWQgYnl0ZXMAJXM6ICclcycgJWQgdnR4LCAlZCBpbmRpY2VzLCAlZCBjbWRzAENVUlJFTlRMWSBBUFBFTkRJTkcAQ2FsbGJhY2sgJXAsIHVzZXJfZGF0YSAlcABEcmF3ICU0ZCAlcyB2dHgsIHRleCAweCVwLCBjbGlwX3JlY3QgKCU0LjBmLCU0LjBmKS0oJTQuMGYsJTQuMGYpAGluZGV4ZWQAbm9uLWluZGV4ZWQAJXMgJTA0ZDogcG9zICglOC4yZiwlOC4yZiksIHV2ICglLjZmLCUuNmYpLCBjb2wgJTA4WAoAdnR4ACAgIABUYWJCYXIgKCVkIHRhYnMpJXMAICpJbmFjdGl2ZSoAPAAlMDJkJWMgVGFiIDB4JTA4WABjbWFwAGxvY2EAaGVhZABnbHlmAGhoZWEAaG10eABrZXJuAEdQT1MAQ0ZGIABtYXhwAFByb2dneUNsZWFuLnR0ZiwgMTNweAAjU0NST0xMWAAjU0NST0xMWQAjaW1hZ2UAWyBdAFt4XQAoeCkAKCApACUuMGYlJQAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQAgfAAjI0NvbWJvXyUwMmQAKlVua25vd24gaXRlbSoAJWQAJWYAJWxmACV1ACVsbGQAJWxsdQAjI3YAIyNtaW4AIyNtYXgALQArACUwOFgATTowLjAwMABNOjAwMABjb250ZXh0ACMlMDJYJTAyWCUwMlglMDJYACMlMDJYJTAyWCUwMlgAIyNUZXh0ACUwMlglMDJYJTAyWCUwMlgAJTAyWCUwMlglMDJYACMjQ29sb3JCdXR0b24AcGlja2VyACMjcGlja2VyAF9DT0wzRgBfQ09MNEYAaHN2AHN2AGh1ZQBhbHBoYQBDdXJyZW50ACMjY3VycmVudABPcmlnaW5hbAAjI29yaWdpbmFsACMjcmdiACMjaHN2ACMjaGV4ACMjc2VsZWN0YWJsZQAjI2R1bW15cGlja2VyAEFscGhhIEJhcgBDb2xvcgAjI3ByZXZpZXcAIyUwMlglMDJYJTAyWApSOiAlZCwgRzogJWQsIEI6ICVkCiglLjNmLCAlLjNmLCAlLjNmKQAjJTAyWCUwMlglMDJYJTAyWApSOiVkLCBHOiVkLCBCOiVkLCBBOiVkCiglLjNmLCAlLjNmLCAlLjNmLCAlLjNmKQAlM2QAUjolM2QARzolM2QAQjolM2QAQTolM2QASDolM2QAUzolM2QAVjolM2QAJTAuM2YAUjolMC4zZgBHOiUwLjNmAEI6JTAuM2YAQTolMC4zZgBIOiUwLjNmAFM6JTAuM2YAVjolMC4zZgAjI1gAIyNZACMjWgAjI1cAUkdCAEhTVgBIRVgAMC4uMjU1ADAuMDAuLjEuMDAAQ29weSBhcy4uACglLjNmZiwgJS4zZmYsICUuM2ZmLCAlLjNmZikAKCVkLCVkLCVkLCVkKQAweCUwMlglMDJYJTAyWAAweCUwMlglMDJYJTAyWCUwMlgACiMjACMjAD4AI1RyZWVQdXNoACVkOiAlOC40ZwolZDogJTguNGcAJWQ6ICU4LjRnAHRydWUAZmFsc2UAJXM6ICVzACVzOiAlZAAlJXM6ICVzACVzOiAlLjNmACMjTWFpbk1lbnVCYXIAIyNtZW51YmFyACMjPAAjIz4AJS4qcwAqADEuNjcASU1HVUlfVkVSU0lPTgBJTUdVSV9DSEVDS1ZFUlNJT04ASW1HdWlJT1NpemUASW1HdWlTdHlsZVNpemUASW1WZWMyU2l6ZQBJbVZlYzRTaXplAEltRHJhd1ZlcnRTaXplAEltRHJhd0lkeFNpemUASW1EcmF3VmVydFBvc09mZnNldABJbURyYXdWZXJ0VVZPZmZzZXQASW1EcmF3VmVydENvbE9mZnNldABDcmVhdGVDb250ZXh0AERlc3Ryb3lDb250ZXh0AEdldEN1cnJlbnRDb250ZXh0AFNldEN1cnJlbnRDb250ZXh0AERlYnVnQ2hlY2tWZXJzaW9uQW5kRGF0YUxheW91dABHZXRJTwBHZXRTdHlsZQBHZXREcmF3RGF0YQBOZXdGcmFtZQBSZW5kZXIARW5kRnJhbWUAU2hvd0RlbW9XaW5kb3cAU2hvd0Fib3V0V2luZG93AFNob3dNZXRyaWNzV2luZG93AFNob3dTdHlsZUVkaXRvcgBTaG93U3R5bGVTZWxlY3RvcgBTaG93Rm9udFNlbGVjdG9yAFNob3dVc2VyR3VpZGUAR2V0VmVyc2lvbgBTdHlsZUNvbG9yc0RhcmsAU3R5bGVDb2xvcnNDbGFzc2ljAFN0eWxlQ29sb3JzTGlnaHQAQmVnaW4ARW5kAEJlZ2luQ2hpbGQARW5kQ2hpbGQAR2V0Q29udGVudFJlZ2lvbk1heABHZXRDb250ZW50UmVnaW9uQXZhaWwAR2V0Q29udGVudFJlZ2lvbkF2YWlsV2lkdGgAR2V0V2luZG93Q29udGVudFJlZ2lvbk1pbgBHZXRXaW5kb3dDb250ZW50UmVnaW9uTWF4AEdldFdpbmRvd0NvbnRlbnRSZWdpb25XaWR0aABHZXRXaW5kb3dEcmF3TGlzdABHZXRXaW5kb3dQb3MAR2V0V2luZG93U2l6ZQBHZXRXaW5kb3dXaWR0aABHZXRXaW5kb3dIZWlnaHQASXNXaW5kb3dDb2xsYXBzZWQASXNXaW5kb3dBcHBlYXJpbmcAU2V0V2luZG93Rm9udFNjYWxlAFNldE5leHRXaW5kb3dQb3MAU2V0TmV4dFdpbmRvd1NpemUAU2V0TmV4dFdpbmRvd1NpemVDb25zdHJhaW50cwBTZXROZXh0V2luZG93Q29udGVudFNpemUAU2V0TmV4dFdpbmRvd0NvbGxhcHNlZABTZXROZXh0V2luZG93Rm9jdXMAU2V0TmV4dFdpbmRvd0JnQWxwaGEAU2V0V2luZG93UG9zAFNldFdpbmRvd1NpemUAU2V0V2luZG93Q29sbGFwc2VkAFNldFdpbmRvd0ZvY3VzAFNldFdpbmRvd05hbWVQb3MAU2V0V2luZG93TmFtZVNpemUAU2V0V2luZG93TmFtZUNvbGxhcHNlZABTZXRXaW5kb3dOYW1lRm9jdXMAR2V0U2Nyb2xsWABHZXRTY3JvbGxZAEdldFNjcm9sbE1heFgAR2V0U2Nyb2xsTWF4WQBTZXRTY3JvbGxYAFNldFNjcm9sbFkAU2V0U2Nyb2xsSGVyZVkAU2V0U2Nyb2xsRnJvbVBvc1kAU2V0U3RhdGVTdG9yYWdlAEdldFN0YXRlU3RvcmFnZQBQdXNoRm9udABQb3BGb250AFB1c2hTdHlsZUNvbG9yAFBvcFN0eWxlQ29sb3IAUHVzaFN0eWxlVmFyAFBvcFN0eWxlVmFyAEdldFN0eWxlQ29sb3JWZWM0AEdldEZvbnQAR2V0Rm9udFNpemUAR2V0Rm9udFRleFV2V2hpdGVQaXhlbABHZXRDb2xvclUzMl9BAEdldENvbG9yVTMyX0IAR2V0Q29sb3JVMzJfQwBQdXNoSXRlbVdpZHRoAFBvcEl0ZW1XaWR0aABDYWxjSXRlbVdpZHRoAFB1c2hUZXh0V3JhcFBvcwBQb3BUZXh0V3JhcFBvcwBQdXNoQWxsb3dLZXlib2FyZEZvY3VzAFBvcEFsbG93S2V5Ym9hcmRGb2N1cwBQdXNoQnV0dG9uUmVwZWF0AFBvcEJ1dHRvblJlcGVhdABTZXBhcmF0b3IAU2FtZUxpbmUATmV3TGluZQBTcGFjaW5nAER1bW15AEluZGVudABVbmluZGVudABCZWdpbkdyb3VwAEVuZEdyb3VwAEdldEN1cnNvclBvcwBHZXRDdXJzb3JQb3NYAEdldEN1cnNvclBvc1kAU2V0Q3Vyc29yUG9zAFNldEN1cnNvclBvc1gAU2V0Q3Vyc29yUG9zWQBHZXRDdXJzb3JTdGFydFBvcwBHZXRDdXJzb3JTY3JlZW5Qb3MAU2V0Q3Vyc29yU2NyZWVuUG9zAEFsaWduVGV4dFRvRnJhbWVQYWRkaW5nAEdldFRleHRMaW5lSGVpZ2h0AEdldFRleHRMaW5lSGVpZ2h0V2l0aFNwYWNpbmcAR2V0RnJhbWVIZWlnaHQAR2V0RnJhbWVIZWlnaHRXaXRoU3BhY2luZwBDb2x1bW5zAE5leHRDb2x1bW4AR2V0Q29sdW1uSW5kZXgAR2V0Q29sdW1uV2lkdGgAU2V0Q29sdW1uV2lkdGgAR2V0Q29sdW1uT2Zmc2V0AFNldENvbHVtbk9mZnNldABHZXRDb2x1bW5zQ291bnQAUHVzaElEAFBvcElEAEdldElEAFRleHRVbmZvcm1hdHRlZABUZXh0AFRleHRWAFRleHRDb2xvcmVkAFRleHRDb2xvcmVkVgBUZXh0RGlzYWJsZWQAVGV4dERpc2FibGVkVgBUZXh0V3JhcHBlZABUZXh0V3JhcHBlZFYATGFiZWxUZXh0AExhYmVsVGV4dFYAQnVsbGV0VGV4dABCdWxsZXRUZXh0VgBCdWxsZXQAQnV0dG9uAFNtYWxsQnV0dG9uAEFycm93QnV0dG9uAEludmlzaWJsZUJ1dHRvbgBJbWFnZQBJbWFnZUJ1dHRvbgBDaGVja2JveABDaGVja2JveEZsYWdzAFJhZGlvQnV0dG9uX0EAUmFkaW9CdXR0b25fQgBQbG90TGluZXMAUGxvdEhpc3RvZ3JhbQBQcm9ncmVzc0JhcgBCZWdpbkNvbWJvAEVuZENvbWJvAENvbWJvAERyYWdGbG9hdABEcmFnRmxvYXQyAERyYWdGbG9hdDMARHJhZ0Zsb2F0NABEcmFnRmxvYXRSYW5nZTIARHJhZ0ludABEcmFnSW50MgBEcmFnSW50MwBEcmFnSW50NABEcmFnSW50UmFuZ2UyAERyYWdTY2FsYXIASW5wdXRUZXh0AElucHV0VGV4dE11bHRpbGluZQBJbnB1dEZsb2F0AElucHV0RmxvYXQyAElucHV0RmxvYXQzAElucHV0RmxvYXQ0AElucHV0SW50AElucHV0SW50MgBJbnB1dEludDMASW5wdXRJbnQ0AElucHV0RG91YmxlAElucHV0U2NhbGFyAFNsaWRlckZsb2F0AFNsaWRlckZsb2F0MgBTbGlkZXJGbG9hdDMAU2xpZGVyRmxvYXQ0AFNsaWRlckFuZ2xlAFNsaWRlckludABTbGlkZXJJbnQyAFNsaWRlckludDMAU2xpZGVySW50NABTbGlkZXJTY2FsYXIAVlNsaWRlckZsb2F0AFZTbGlkZXJJbnQAVlNsaWRlclNjYWxhcgBDb2xvckVkaXQzAENvbG9yRWRpdDQAQ29sb3JQaWNrZXIzAENvbG9yUGlja2VyNABDb2xvckJ1dHRvbgBTZXRDb2xvckVkaXRPcHRpb25zAFRyZWVOb2RlX0EAVHJlZU5vZGVfQgBUcmVlTm9kZV9DAFRyZWVOb2RlRXhfQQBUcmVlTm9kZUV4X0IAVHJlZU5vZGVFeF9DAFRyZWVQdXNoX0EAVHJlZVB1c2hfQgBUcmVlUG9wAFRyZWVBZHZhbmNlVG9MYWJlbFBvcwBHZXRUcmVlTm9kZVRvTGFiZWxTcGFjaW5nAFNldE5leHRUcmVlTm9kZU9wZW4AQ29sbGFwc2luZ0hlYWRlcl9BAENvbGxhcHNpbmdIZWFkZXJfQgBTZWxlY3RhYmxlX0EAU2VsZWN0YWJsZV9CAExpc3RCb3hfQQBMaXN0Qm94X0IATGlzdEJveEhlYWRlcl9BAExpc3RCb3hIZWFkZXJfQgBMaXN0Qm94Rm9vdGVyAFZhbHVlX0EAVmFsdWVfQgBWYWx1ZV9DAFZhbHVlX0QAU2V0VG9vbHRpcABCZWdpblRvb2x0aXAARW5kVG9vbHRpcABCZWdpbk1haW5NZW51QmFyAEVuZE1haW5NZW51QmFyAEJlZ2luTWVudUJhcgBFbmRNZW51QmFyAEJlZ2luTWVudQBFbmRNZW51AE1lbnVJdGVtX0EATWVudUl0ZW1fQgBPcGVuUG9wdXAAT3BlblBvcHVwT25JdGVtQ2xpY2sAQmVnaW5Qb3B1cABCZWdpblBvcHVwTW9kYWwAQmVnaW5Qb3B1cENvbnRleHRJdGVtAEJlZ2luUG9wdXBDb250ZXh0V2luZG93AEJlZ2luUG9wdXBDb250ZXh0Vm9pZABFbmRQb3B1cABJc1BvcHVwT3BlbgBDbG9zZUN1cnJlbnRQb3B1cABCZWdpblRhYkJhcgBFbmRUYWJCYXIAQmVnaW5UYWJJdGVtAEVuZFRhYkl0ZW0AU2V0VGFiSXRlbUNsb3NlZABMb2dUb1RUWQBMb2dUb0ZpbGUATG9nVG9DbGlwYm9hcmQATG9nRmluaXNoAExvZ0J1dHRvbnMATG9nVGV4dABCZWdpbkRyYWdEcm9wU291cmNlAFNldERyYWdEcm9wUGF5bG9hZABFbmREcmFnRHJvcFNvdXJjZQBCZWdpbkRyYWdEcm9wVGFyZ2V0AEFjY2VwdERyYWdEcm9wUGF5bG9hZABFbmREcmFnRHJvcFRhcmdldABHZXREcmFnRHJvcFBheWxvYWQAUHVzaENsaXBSZWN0AFBvcENsaXBSZWN0AFNldEl0ZW1EZWZhdWx0Rm9jdXMAU2V0S2V5Ym9hcmRGb2N1c0hlcmUASXNJdGVtSG92ZXJlZABJc0l0ZW1BY3RpdmUASXNJdGVtRWRpdGVkAElzSXRlbUZvY3VzZWQASXNJdGVtQ2xpY2tlZABJc0l0ZW1WaXNpYmxlAElzSXRlbURlYWN0aXZhdGVkAElzSXRlbURlYWN0aXZhdGVkQWZ0ZXJFZGl0AElzQW55SXRlbUhvdmVyZWQASXNBbnlJdGVtQWN0aXZlAElzQW55SXRlbUZvY3VzZWQAR2V0SXRlbVJlY3RNaW4AR2V0SXRlbVJlY3RNYXgAR2V0SXRlbVJlY3RTaXplAFNldEl0ZW1BbGxvd092ZXJsYXAASXNXaW5kb3dGb2N1c2VkAElzV2luZG93SG92ZXJlZABJc1JlY3RWaXNpYmxlX0EASXNSZWN0VmlzaWJsZV9CAEdldFRpbWUAR2V0RnJhbWVDb3VudABHZXRPdmVybGF5RHJhd0xpc3QAR2V0RHJhd0xpc3RTaGFyZWREYXRhAEdldFN0eWxlQ29sb3JOYW1lAENhbGNUZXh0U2l6ZQBDYWxjTGlzdENsaXBwaW5nAEJlZ2luQ2hpbGRGcmFtZQBFbmRDaGlsZEZyYW1lAENvbG9yQ29udmVydFUzMlRvRmxvYXQ0AENvbG9yQ29udmVydEZsb2F0NFRvVTMyAENvbG9yQ29udmVydFJHQnRvSFNWAENvbG9yQ29udmVydEhTVnRvUkdCAEdldEtleUluZGV4AElzS2V5RG93bgBJc0tleVByZXNzZWQASXNLZXlSZWxlYXNlZABHZXRLZXlQcmVzc2VkQW1vdW50AElzTW91c2VEb3duAElzQW55TW91c2VEb3duAElzTW91c2VDbGlja2VkAElzTW91c2VEb3VibGVDbGlja2VkAElzTW91c2VSZWxlYXNlZABJc01vdXNlRHJhZ2dpbmcASXNNb3VzZUhvdmVyaW5nUmVjdABJc01vdXNlUG9zVmFsaWQAR2V0TW91c2VQb3MAR2V0TW91c2VQb3NPbk9wZW5pbmdDdXJyZW50UG9wdXAAR2V0TW91c2VEcmFnRGVsdGEAUmVzZXRNb3VzZURyYWdEZWx0YQBHZXRNb3VzZUN1cnNvcgBTZXRNb3VzZUN1cnNvcgBDYXB0dXJlS2V5Ym9hcmRGcm9tQXBwAENhcHR1cmVNb3VzZUZyb21BcHAAR2V0Q2xpcGJvYXJkVGV4dABTZXRDbGlwYm9hcmRUZXh0AExvYWRJbmlTZXR0aW5nc0Zyb21NZW1vcnkAU2F2ZUluaVNldHRpbmdzVG9NZW1vcnkAU2V0QWxsb2NhdG9yRnVuY3Rpb25zAE1lbUFsbG9jAE1lbUZyZWUAaWlpAE4xMGVtc2NyaXB0ZW4zdmFsRQB2aWlpaQBOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQBOU3QzX18yMjFfX2Jhc2ljX3N0cmluZ19jb21tb25JTGIxRUVFAGlpaWZpAHgAeQAyM2ltcG9ydF9tYXliZV9udWxsX3ZhbHVlSTZJbVZlYzJFAGlpaWlpAGlpaWYAaWlpZmYAaWlpaQAxMmFjY2Vzc192YWx1ZUlmTG0xRUUAdmlmZmZpaWkAegB3ADZJbVZlYzIAdmlpZmlpADEyYWNjZXNzX3ZhbHVlSWlMbTFFRQBpaWlpZmkAUDIwSW1EcmF3TGlzdFNoYXJlZERhdGEAMjBJbURyYXdMaXN0U2hhcmVkRGF0YQBQMTBJbURyYXdMaXN0ADEwSW1EcmF3TGlzdABkaQBpaWlpaWkAJXMAMjNpbXBvcnRfbWF5YmVfbnVsbF92YWx1ZUlOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TMF8xMWNoYXJfdHJhaXRzSWNFRU5TMF85YWxsb2NhdG9ySWNFRUVFRQAyNGltcG9ydF9tYXliZV9udWxsX3N0cmluZwAyM2FjY2Vzc19tYXliZV9udWxsX3ZhbHVlSWJMbTFFRQB2aWlmaQB2aWlpAGlpaWlpaWkAMTJhY2Nlc3NfdmFsdWVJZkxtNEVFADIzYWNjZXNzX21heWJlX251bGxfdmFsdWVJZkxtNEVFADEyYWNjZXNzX3ZhbHVlSWZMbTNFRQBpaWlpaWlpaWlpAHNldABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAMjNpbXBvcnRfbWF5YmVfbnVsbF92YWx1ZUlkRQBsZW5ndGgAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lmRUUAMjNpbXBvcnRfbWF5YmVfbnVsbF92YWx1ZUlmRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lqRUUAMjNpbXBvcnRfbWF5YmVfbnVsbF92YWx1ZUlqRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lpRUUAMjNpbXBvcnRfbWF5YmVfbnVsbF92YWx1ZUlpRQBpaWlpaWlpaWkAMTJhY2Nlc3NfdmFsdWVJaUxtNEVFADEyYWNjZXNzX3ZhbHVlSWlMbTNFRQAxMmFjY2Vzc192YWx1ZUlpTG0yRUUAJS4wZiBkZWcAMTJhY2Nlc3NfdmFsdWVJZkxtMkVFAGlpaWlpaWlpAGlpaWlkZGlpADEyYWNjZXNzX3ZhbHVlSWRMbTFFRQBQMjZJbUd1aUlucHV0VGV4dENhbGxiYWNrRGF0YQAyNkltR3VpSW5wdXRUZXh0Q2FsbGJhY2tEYXRhAGlpaWlpaWlpaWlpAHZpZmlpAHZpaWlpaWlpaWlpADEyYWNjZXNzX3ZhbHVlSWpMbTFFRQAxMmFjY2Vzc192YWx1ZUliTG0xRUUAdmlpaWlpaWkAbnVtYmVyAHZpaWYAZmlpAGlpAHZpaQBQNkltRm9udAA2SW1Gb250AFBLNkltVmVjNAA2SW1WZWM0AFRPRE86ICVzCgBhdXRvIEVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1HdWk6OkVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1HdWkoKTo6KGFub255bW91cyBjbGFzcyk6Om9wZXJhdG9yKCkoKSBjb25zdABhdXRvIEVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1HdWk6OkVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1HdWkoKTo6KGFub255bW91cyBjbGFzcyk6Om9wZXJhdG9yKCkoZW1zY3JpcHRlbjo6dmFsKSBjb25zdAB2aWZmAHZpaWlpaQBQMjFJbUd1aVNpemVDYWxsYmFja0RhdGEAMjFJbUd1aVNpemVDYWxsYmFja0RhdGEAdmlmAGZpAHN0cmluZwBQMTBJbUd1aVN0eWxlADEwSW1HdWlTdHlsZQB2aQBQMTBJbURyYXdEYXRhADEwSW1EcmF3RGF0YQBQN0ltR3VpSU8AN0ltR3VpSU8AUDE2V3JhcEltR3VpQ29udGV4dAAxNldyYXBJbUd1aUNvbnRleHQASW1HdWlTdHlsZQBBbHBoYQBXaW5kb3dQYWRkaW5nAFdpbmRvd1JvdW5kaW5nAFdpbmRvd0JvcmRlclNpemUAV2luZG93TWluU2l6ZQBXaW5kb3dUaXRsZUFsaWduAENoaWxkUm91bmRpbmcAQ2hpbGRCb3JkZXJTaXplAFBvcHVwUm91bmRpbmcAUG9wdXBCb3JkZXJTaXplAEZyYW1lUGFkZGluZwBGcmFtZVJvdW5kaW5nAEZyYW1lQm9yZGVyU2l6ZQBJdGVtU3BhY2luZwBJdGVtSW5uZXJTcGFjaW5nAFRvdWNoRXh0cmFQYWRkaW5nAEluZGVudFNwYWNpbmcAQ29sdW1uc01pblNwYWNpbmcAU2Nyb2xsYmFyU2l6ZQBTY3JvbGxiYXJSb3VuZGluZwBHcmFiTWluU2l6ZQBHcmFiUm91bmRpbmcAVGFiUm91bmRpbmcAVGFiQm9yZGVyU2l6ZQBCdXR0b25UZXh0QWxpZ24ARGlzcGxheVdpbmRvd1BhZGRpbmcARGlzcGxheVNhZmVBcmVhUGFkZGluZwBNb3VzZUN1cnNvclNjYWxlAEFudGlBbGlhc2VkTGluZXMAQW50aUFsaWFzZWRGaWxsAEN1cnZlVGVzc2VsbGF0aW9uVG9sAF9nZXRBdF9Db2xvcnMAX3NldEF0X0NvbG9ycwBTY2FsZUFsbFNpemVzAFA2SW1WZWM0AFBLNkltVmVjMgB2AFBLMTBJbUd1aVN0eWxlAEltR3VpSU8AQ29uZmlnRmxhZ3MAQmFja2VuZEZsYWdzAERpc3BsYXlTaXplAERlbHRhVGltZQBJbmlTYXZpbmdSYXRlAEluaUZpbGVuYW1lAExvZ0ZpbGVuYW1lAE1vdXNlRG91YmxlQ2xpY2tUaW1lAE1vdXNlRG91YmxlQ2xpY2tNYXhEaXN0AE1vdXNlRHJhZ1RocmVzaG9sZABfZ2V0QXRfS2V5TWFwAF9zZXRBdF9LZXlNYXAAS2V5UmVwZWF0RGVsYXkAS2V5UmVwZWF0UmF0ZQBVc2VyRGF0YQBGb250cwBGb250R2xvYmFsU2NhbGUARm9udEFsbG93VXNlclNjYWxpbmcARm9udERlZmF1bHQARGlzcGxheUZyYW1lYnVmZmVyU2NhbGUARGlzcGxheVZpc2libGVNaW4ARGlzcGxheVZpc2libGVNYXgATW91c2VEcmF3Q3Vyc29yAENvbmZpZ01hY09TWEJlaGF2aW9ycwBDb25maWdJbnB1dFRleHRDdXJzb3JCbGluawBDb25maWdXaW5kb3dzUmVzaXplRnJvbUVkZ2VzAENvbmZpZ1dpbmRvd3NNb3ZlRnJvbVRpdGxlQmFyT25seQBHZXRDbGlwYm9hcmRUZXh0Rm4AU2V0Q2xpcGJvYXJkVGV4dEZuAENsaXBib2FyZFVzZXJEYXRhAE1vdXNlUG9zAF9nZXRBdF9Nb3VzZURvd24AX3NldEF0X01vdXNlRG93bgBNb3VzZVdoZWVsAEtleUN0cmwAS2V5U2hpZnQAS2V5QWx0AEtleVN1cGVyAF9nZXRBdF9LZXlzRG93bgBfc2V0QXRfS2V5c0Rvd24AX2dldEF0X05hdklucHV0cwBfc2V0QXRfTmF2SW5wdXRzAEFkZElucHV0Q2hhcmFjdGVyAEFkZElucHV0Q2hhcmFjdGVyc1VURjgAQ2xlYXJJbnB1dENoYXJhY3RlcnMAV2FudENhcHR1cmVNb3VzZQBXYW50Q2FwdHVyZUtleWJvYXJkAFdhbnRUZXh0SW5wdXQAV2FudFNldE1vdXNlUG9zAFdhbnRTYXZlSW5pU2V0dGluZ3MATmF2QWN0aXZlAE5hdlZpc2libGUARnJhbWVyYXRlAE1ldHJpY3NSZW5kZXJWZXJ0aWNlcwBNZXRyaWNzUmVuZGVySW5kaWNlcwBNZXRyaWNzUmVuZGVyV2luZG93cwBNZXRyaWNzQWN0aXZlV2luZG93cwBNZXRyaWNzQWN0aXZlQWxsb2NhdGlvbnMATW91c2VEZWx0YQBfZ2V0QXRfTW91c2VDbGlja2VkUG9zAF9nZXRBdF9Nb3VzZURvd25EdXJhdGlvbgBfZ2V0QXRfS2V5c0Rvd25EdXJhdGlvbgBfZ2V0QXRfTmF2SW5wdXRzRG93bkR1cmF0aW9uAFBLN0ltR3VpSU8AaWlpaWYAZmlpaQBQMTFJbUZvbnRBdGxhcwAxMUltRm9udEF0bGFzAEltRm9udEF0bGFzAEFkZEZvbnREZWZhdWx0AEFkZEZvbnRGcm9tTWVtb3J5VFRGAENsZWFyVGV4RGF0YQBDbGVhcklucHV0RGF0YQBDbGVhckZvbnRzAENsZWFyAEJ1aWxkAElzQnVpbHQAR2V0VGV4RGF0YUFzQWxwaGE4AEdldFRleERhdGFBc1JHQkEzMgBHZXRHbHlwaFJhbmdlc0RlZmF1bHQAR2V0R2x5cGhSYW5nZXNLb3JlYW4AR2V0R2x5cGhSYW5nZXNKYXBhbmVzZQBHZXRHbHlwaFJhbmdlc0NoaW5lc2VGdWxsAEdldEdseXBoUmFuZ2VzQ2hpbmVzZVNpbXBsaWZpZWRDb21tb24AR2V0R2x5cGhSYW5nZXNDeXJpbGxpYwBHZXRHbHlwaFJhbmdlc1RoYWkATG9ja2VkAEZsYWdzAFRleElEAFRleERlc2lyZWRXaWR0aABUZXhHbHlwaFBhZGRpbmcAVGV4V2lkdGgAVGV4SGVpZ2h0AFRleFV2U2NhbGUAVGV4VXZXaGl0ZVBpeGVsAEl0ZXJhdGVGb250cwBwaXhlbHMAd2lkdGgAaGVpZ2h0AGJ5dGVzX3Blcl9waXhlbABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUAaWlpaWZpaQBGb250RGF0YQBidWZmZXIAYnl0ZU9mZnNldABieXRlTGVuZ3RoAFRPRE86IEZvbnREYXRhICV6dSAlenUKAEZvbnREYXRhT3duZWRCeUF0bGFzAEZvbnRObwBTaXplUGl4ZWxzAE92ZXJzYW1wbGVIAE92ZXJzYW1wbGVWAFBpeGVsU25hcEgAR2x5cGhFeHRyYVNwYWNpbmcAR2x5cGhPZmZzZXQAR2x5cGhSYW5nZXMAR2x5cGhNaW5BZHZhbmNlWABHbHlwaE1heEFkdmFuY2VYAE1lcmdlTW9kZQBSYXN0ZXJpemVyRmxhZ3MAUmFzdGVyaXplck11bHRpcGx5AE5hbWUAUEsxMUltRm9udEF0bGFzAEltRm9udABGb250U2l6ZQBTY2FsZQBEaXNwbGF5T2Zmc2V0AEl0ZXJhdGVHbHlwaHMARmFsbGJhY2tHbHlwaABGYWxsYmFja0FkdmFuY2VYAEZhbGxiYWNrQ2hhcgBDb25maWdEYXRhQ291bnQASXRlcmF0ZUNvbmZpZ0RhdGEAQXNjZW50AERlc2NlbnQATWV0cmljc1RvdGFsU3VyZmFjZQBDbGVhck91dHB1dERhdGEAQnVpbGRMb29rdXBUYWJsZQBGaW5kR2x5cGgARmluZEdseXBoTm9GYWxsYmFjawBTZXRGYWxsYmFja0NoYXIAR2V0Q2hhckFkdmFuY2UASXNMb2FkZWQAR2V0RGVidWdOYW1lAENhbGNUZXh0U2l6ZUEAQ2FsY1dvcmRXcmFwUG9zaXRpb25BAFJlbmRlckNoYXIAdmlpaWZpaWkAaWlpZmlmAGlpaWZmZmlpaQA8dW5rbm93bj4AUEs2SW1Gb250AFBLMTFJbUZvbnRHbHlwaAAxMUltRm9udEdseXBoAFAxMkltRm9udENvbmZpZwAxMkltRm9udENvbmZpZwBQMTFJbUZvbnRHbHlwaABJbUZvbnRDb25maWcARHN0Rm9udABhdXRvIEVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1Gb250Q29uZmlnOjpFbXNjcmlwdGVuQmluZGluZ0luaXRpYWxpemVyX0ltRm9udENvbmZpZygpOjooYW5vbnltb3VzIGNsYXNzKTo6b3BlcmF0b3IoKShJbUZvbnRDb25maWcgJiwgZW1zY3JpcHRlbjo6dmFsKSBjb25zdABhdXRvIEVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfSW1Gb250Q29uZmlnOjpFbXNjcmlwdGVuQmluZGluZ0luaXRpYWxpemVyX0ltRm9udENvbmZpZygpOjooYW5vbnltb3VzIGNsYXNzKTo6b3BlcmF0b3IoKShjb25zdCBJbUZvbnRDb25maWcgJikgY29uc3QAUEsxMkltRm9udENvbmZpZwBJbUZvbnRHbHlwaABDb2RlcG9pbnQAQWR2YW5jZVgAWDAAWTAAWDEAWTEAVTAAVjAAVTEAVjEASW1EcmF3RGF0YQBJdGVyYXRlRHJhd0xpc3RzAFZhbGlkAENtZExpc3RzQ291bnQAVG90YWxJZHhDb3VudABUb3RhbFZ0eENvdW50AERpc3BsYXlQb3MARGVJbmRleEFsbEJ1ZmZlcnMAU2NhbGVDbGlwUmVjdHMAUEsxMEltRHJhd0RhdGEAUEsxMEltRHJhd0xpc3QASW1EcmF3TGlzdABJdGVyYXRlRHJhd0NtZHMASWR4QnVmZmVyAFZ0eEJ1ZmZlcgBQdXNoQ2xpcFJlY3RGdWxsU2NyZWVuAFB1c2hUZXh0dXJlSUQAUG9wVGV4dHVyZUlEAEdldENsaXBSZWN0TWluAEdldENsaXBSZWN0TWF4AEFkZExpbmUAQWRkUmVjdABBZGRSZWN0RmlsbGVkAEFkZFJlY3RGaWxsZWRNdWx0aUNvbG9yAEFkZFF1YWQAQWRkUXVhZEZpbGxlZABBZGRUcmlhbmdsZQBBZGRUcmlhbmdsZUZpbGxlZABBZGRDaXJjbGUAQWRkQ2lyY2xlRmlsbGVkAEFkZFRleHRfQQBBZGRUZXh0X0IAQWRkSW1hZ2UAQWRkSW1hZ2VRdWFkAEFkZEltYWdlUm91bmRlZABBZGRQb2x5bGluZQBBZGRDb252ZXhQb2x5RmlsbGVkAEFkZEJlemllckN1cnZlAFBhdGhDbGVhcgBQYXRoTGluZVRvAFBhdGhMaW5lVG9NZXJnZUR1cGxpY2F0ZQBQYXRoRmlsbENvbnZleABQYXRoU3Ryb2tlAFBhdGhBcmNUbwBQYXRoQXJjVG9GYXN0AFBhdGhCZXppZXJDdXJ2ZVRvAFBhdGhSZWN0AENoYW5uZWxzU3BsaXQAQ2hhbm5lbHNNZXJnZQBDaGFubmVsc1NldEN1cnJlbnQAQWRkQ2FsbGJhY2sAQWRkRHJhd0NtZABDbGVhckZyZWVNZW1vcnkAUHJpbVJlc2VydmUAUHJpbVJlY3QAUHJpbVJlY3RVVgBQcmltUXVhZFVWAFByaW1Xcml0ZVZ0eABQcmltV3JpdGVJZHgAUHJpbVZ0eABVcGRhdGVDbGlwUmVjdABVcGRhdGVUZXh0dXJlSUQAdmlpaWlpaWlpaWlpAHZpaWlpZmkAdmlpaWZmZmkAdmlpaWlmAHZpaWlpaWlpZmkAdmlpaWlpaWlpZmkAdmlpaWlpaWlpaWlpaQB2aWlpZmlpaWZpADIzaW1wb3J0X21heWJlX251bGxfdmFsdWVJNkltVmVjNEUAdmlpaWZpaQB2aWlpZmlpZgB2aWlpaWlpAHZpaWlpaWlmAHZpaWlpaWlpZgB2aWlpaWlpaWkAdmlpaWlpZmkAdmlpaWlpZmlmAHZpaWlpaWYATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJY0VFAFBLOUltRHJhd0NtZAA5SW1EcmF3Q21kAEltRHJhd0NtZABFbGVtQ291bnQAQ2xpcFJlY3QAVGV4dHVyZUlkAFA5SW1EcmF3Q21kAEltR3VpTGlzdENsaXBwZXIAU3RhcnRQb3NZAEl0ZW1zSGVpZ2h0AEl0ZW1zQ291bnQAU3RlcE5vAERpc3BsYXlTdGFydABEaXNwbGF5RW5kAFN0ZXAAUDE2SW1HdWlMaXN0Q2xpcHBlcgAxNkltR3VpTGlzdENsaXBwZXIAdmlpaWYAUEsxNkltR3VpTGlzdENsaXBwZXIASW1HdWlTaXplQ2FsbGJhY2tEYXRhAFBvcwBDdXJyZW50U2l6ZQBEZXNpcmVkU2l6ZQBQSzIxSW1HdWlTaXplQ2FsbGJhY2tEYXRhAEltR3VpSW5wdXRUZXh0Q2FsbGJhY2tEYXRhAEV2ZW50RmxhZwBFdmVudENoYXIARXZlbnRLZXkAQnVmAEJ1ZlRleHRMZW4AQnVmU2l6ZQBCdWZEaXJ0eQBDdXJzb3JQb3MAU2VsZWN0aW9uU3RhcnQAU2VsZWN0aW9uRW5kAERlbGV0ZUNoYXJzAEluc2VydENoYXJzAEhhc1NlbGVjdGlvbgBQSzI2SW1HdWlJbnB1dFRleHRDYWxsYmFja0RhdGEASW1WZWM0AFNldABDb3B5AEVxdWFscwBJbVZlYzIAUDZJbVZlYzIAV3JhcEltR3VpQ29udGV4dABQSzE2V3JhcEltR3VpQ29udGV4dABtYWxsaW5mbwBhcmVuYQBvcmRibGtzAHNtYmxrcwBoYmxrcwBoYmxraGQAdXNtYmxrcwBmc21ibGtzAHVvcmRibGtzAGZvcmRibGtzAGtlZXBjb3N0AHZvaWQAYm9vbABzdGQ6OnN0cmluZwBzdGQ6OmJhc2ljX3N0cmluZzx1bnNpZ25lZCBjaGFyPgBzdGQ6OndzdHJpbmcAZW1zY3JpcHRlbjo6dmFsAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgaW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQzMl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZyBkb3VibGU+AE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWVFRQBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ltRUUAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4ATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXRFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lzRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAGRvdWJsZQBmbG9hdAB1bnNpZ25lZCBsb25nAGxvbmcAdW5zaWduZWQgaW50AGludAB1bnNpZ25lZCBzaG9ydABzaG9ydAB1bnNpZ25lZCBjaGFyAHNpZ25lZCBjaGFyAGNoYXIAcndhAGluZmluaXR5AAABAgQHAwYFAC0rICAgMFgweAAobnVsbCkALTBYKzBYIDBYLTB4KzB4IDB4AGluZgBJTkYAbmFuAE5BTgAuAHRlcm1pbmF0aW5nIHdpdGggJXMgZXhjZXB0aW9uIG9mIHR5cGUgJXM6ICVzAHRlcm1pbmF0aW5nIHdpdGggJXMgZXhjZXB0aW9uIG9mIHR5cGUgJXMAdGVybWluYXRpbmcgd2l0aCAlcyBmb3JlaWduIGV4Y2VwdGlvbgB0ZXJtaW5hdGluZwB1bmNhdWdodABTdDlleGNlcHRpb24ATjEwX19jeHhhYml2MTE2X19zaGltX3R5cGVfaW5mb0UAU3Q5dHlwZV9pbmZvAE4xMF9fY3h4YWJpdjEyMF9fc2lfY2xhc3NfdHlwZV9pbmZvRQBOMTBfX2N4eGFiaXYxMTdfX2NsYXNzX3R5cGVfaW5mb0UAcHRocmVhZF9vbmNlIGZhaWx1cmUgaW4gX19jeGFfZ2V0X2dsb2JhbHNfZmFzdCgpAGNhbm5vdCBjcmVhdGUgcHRocmVhZCBrZXkgZm9yIF9fY3hhX2dldF9nbG9iYWxzKCkAY2Fubm90IHplcm8gb3V0IHRocmVhZCB2YWx1ZSBmb3IgX19jeGFfZ2V0X2dsb2JhbHMoKQB0ZXJtaW5hdGVfaGFuZGxlciB1bmV4cGVjdGVkbHkgcmV0dXJuZWQAU3QxMWxvZ2ljX2Vycm9yAFN0MTJsZW5ndGhfZXJyb3IATjEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTE3X19wYmFzZV90eXBlX2luZm9FAE4xMF9fY3h4YWJpdjEyM19fZnVuZGFtZW50YWxfdHlwZV9pbmZvRQB2AFB2AERuAGIAYwBoAGEAcwB0AGkAagBsAG0AZgBkAE4xMF9fY3h4YWJpdjEyMV9fdm1pX2NsYXNzX3R5cGVfaW5mb0U=";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile);}function getBinary(){try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(Module["readBinary"]){return Module["readBinary"](wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err);}}function getBinaryPromise(){if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary());})}function createWasm(env){var info={"env":env,"global":{"NaN":NaN,Infinity:Infinity},"global.Math":Math,"asm2wasm":asm2wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate");}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"]);}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason);})}function instantiateAsync(){if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){return WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource);})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return {}}Module["asm"]=function(global,env,providedBuffer){env["memory"]=wasmMemory;env["table"]=wasmTable=new WebAssembly.Table({"initial":1442,"maximum":1442,"element":"anyfunc"});env["__memory_base"]=1024;env["__table_base"]=0;var exports=createWasm(env);return exports};__ATINIT__.push({func:function(){globalCtors();}});function ___cxa_allocate_exception(size){return _malloc(size)}function ___cxa_throw(ptr,type,destructor){throw ptr}function ___lock(){}var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0;}else{buffer.push(curr);}},varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(){var ret=UTF8ToString(SYSCALLS.get());return ret},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();return low},getZero:function(){SYSCALLS.get();}};function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___syscall145(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();return SYSCALLS.doReadv(stream,iov,iovcnt)}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(stream,HEAPU8[ptr+j]);}ret+=len;}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function ___syscall221(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___syscall5(which,varargs){SYSCALLS.varargs=varargs;try{var pathname=SYSCALLS.getStr(),flags=SYSCALLS.get(),mode=SYSCALLS.get();var stream=FS.open(pathname,flags,mode);return stream.fd}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return -e.errno}}function ___unlock(){}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return "_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return "_"+name}else{return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"");}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}};return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count");}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return !!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right}function shallowCopyInternalPointer(o){return {count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted");}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}}function runDestructor(handle){var $$=handle.$$;if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else{$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}this.$$.count.value-=1;var toDelete=0===this.$$.count.value;if(toDelete){runDestructor(this);}if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return !this.$$.ptr}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion");}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!");}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!");}Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr}else{return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal");}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle["delete"]();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError("Unsupporting sharing policy");}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name);}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name);}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined");}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType");}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified");}record.count={value:1};return Object.create(prototype,{$$:{value:record}})}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else{toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else{this["toWireType"]=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol");}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else{Module[name]=value;Module[name].argCount=numArguments;}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push("a"+i);}var name="dynCall_"+signature+"_"+rawFunction;var body="return function "+name+"("+args.join(", ")+") {\n";body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";body+="};\n";return new Function("dynCall","rawFunction",body)(dynCall,rawFunction)}var fp;if(Module["FUNCTION_TABLE_"+signature]!==undefined){fp=Module["FUNCTION_TABLE_"+signature][rawFunction];}else if(typeof FUNCTION_TABLE!=="undefined"){fp=FUNCTION_TABLE[rawFunction];}else{var dc=Module["dynCall_"+signature];if(dc===undefined){dc=Module["dynCall_"+signature.replace(/f/g,"d")];if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature);}}fp=makeDynCaller(dc);}if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction);}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=embind__requireFunction(upcastSignature,upcast);}if(downcast){downcast=embind__requireFunction(downcastSignature,downcast);}rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else{basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}return body.apply(this,arguments)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return [referenceConverter,pointerConverter,constPointerConverter]});}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1));}var destructors=[];var args=new Array(argCount);args[0]=rawConstructor;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr)};return []});return []});}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired";}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n";}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n";}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired;}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n";}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n";}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction;}else{proto[methodName].overloadTable[argCount-2]=memberFunction;}return []});return []});}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_);}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name);}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object");}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);},enumerable:true,configurable:true};if(setter){desc.set=function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType]);};}else{desc.set=function(v){throwBindingError(humanName+" is a read-only property");};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],function(types){var getterReturnType=types[0];var desc={get:function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr))},enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors);};}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return []});return []});}function __embind_register_constant(name,type,value){name=readLatin1String(name);whenDependentTypesAreResolved([],[type],function(type){type=type[0];Module[name]=type["fromWireType"](value);return []});}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1}case null:{return 2}case true:{return 3}case false:{return 4}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv},"toWireType":function(destructors,value){return __emval_register(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null});}function _embind_repr(v){if(v===null){return "null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return ""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null});}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes);},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return []});}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift};}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(heap["buffer"],data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true});}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var endChar=HEAPU8[value+4+length];var endCharSwap=0;if(endChar!=0){endCharSwap=endChar;HEAPU8[value+4+length]=0;}var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(HEAPU8[currentBytePtr]==0){var stringSegment=UTF8ToString(decodeStartPtr);if(str===undefined)str=stringSegment;else{str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+1;}}if(endCharSwap!=0)HEAPU8[value+4+length]=endCharSwap;}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}str=a.join("");}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}var getLength;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string");}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value)};}else{getLength=function(){return value.length};}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1);}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits");}HEAPU8[ptr+4+i]=charCode;}}else{for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i];}}}if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var getHeap,shift;if(charSize===2){getHeap=function(){return HEAPU16};shift=1;}else if(charSize===4){getHeap=function(){return HEAPU32};shift=2;}registerType(rawType,{name:name,"fromWireType":function(value){var HEAP=getHeap();var length=HEAPU32[value>>2];var a=new Array(length);var start=value+4>>shift;for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i]);}_free(value);return a.join("")},"toWireType":function(destructors,value){var HEAP=getHeap();var length=value.length;var ptr=_malloc(4+length*charSize);HEAPU32[ptr>>2]=length;var start=ptr+4>>shift;for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i);}if(destructors!==null){destructors.push(_free,ptr);}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}});}function requireHandle(handle){if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle);}return emval_handle_array[handle].value}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType));}return impl}function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=__emval_register(destructors);HEAP32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}function __emval_lookupTypes(argCount,argTypes,argWireTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i);}return a}function __emval_call(handle,argCount,argTypes,argv){handle=requireHandle(handle);var types=__emval_lookupTypes(argCount,argTypes);var args=new Array(argCount);for(var i=0;i<argCount;++i){var type=types[i];args[i]=type["readValueFromPointer"](argv);argv+=type["argPackAdvance"];}var rv=handle.apply(undefined,args);return __emval_register(rv)}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}else{return symbol}}var emval_methodCallers=[];function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args);}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i]);}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"];}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n";}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n";}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);return __emval_addMethodCaller(invokerFunction)}function __emval_get_property(handle,key){handle=requireHandle(handle);key=requireHandle(key);return __emval_register(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1;}}function __emval_new_array(){return __emval_register([])}function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}function __emval_new_object(){return __emval_register({})}function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;runDestructors(destructors);__emval_decref(handle);}function __emval_set_property(handle,key,value){handle=requireHandle(handle);key=requireHandle(key);value=requireHandle(value);handle[key]=value;}function __emval_strictly_equals(first,second){first=requireHandle(first);second=requireHandle(second);return first===second}function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](argv);return __emval_register(v)}function __emval_typeof(handle){handle=requireHandle(handle);return __emval_register(typeof handle)}function _abort(){Module["abort"]();}function _emscripten_get_heap_size(){return HEAP8.length}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);}function abortOnCannotGrowMemory(requestedSize){abort("OOM");}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory(requestedSize);}embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2);}if(enc4!==64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64");}catch(_){buf=new Buffer(s,"base64");}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i);}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmGlobalArg={};var asmLibraryArg={"e":abort,"G":setTempRet0,"C":___cxa_allocate_exception,"y":___cxa_throw,"R":___lock,"v":___setErrNo,"F":___syscall140,"E":___syscall145,"u":___syscall146,"p":___syscall221,"D":___syscall5,"B":___syscall54,"A":___syscall6,"t":___unlock,"W":__embind_register_bool,"g":__embind_register_class,"q":__embind_register_class_constructor,"c":__embind_register_class_function,"b":__embind_register_class_property,"z":__embind_register_constant,"V":__embind_register_emval,"x":__embind_register_float,"d":__embind_register_function,"k":__embind_register_integer,"i":__embind_register_memory_view,"w":__embind_register_std_string,"U":__embind_register_std_wstring,"T":__embind_register_void,"h":__emval_as,"S":__emval_call,"o":__emval_call_void_method,"s":__emval_decref,"n":__emval_get_method_caller,"j":__emval_get_property,"r":__emval_incref,"Q":__emval_new_array,"P":__emval_new_cstring,"O":__emval_new_object,"N":__emval_run_destructors,"m":__emval_set_property,"M":__emval_strictly_equals,"f":__emval_take_value,"L":__emval_typeof,"l":_abort,"K":_emscripten_get_heap_size,"J":_emscripten_memcpy_big,"I":_emscripten_resize_heap,"H":abortOnCannotGrowMemory,"a":DYNAMICTOP_PTR};var asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);Module["asm"]=asm;var ___getTypeName=Module["___getTypeName"]=function(){return Module["asm"]["X"].apply(null,arguments)};var _free=Module["_free"]=function(){return Module["asm"]["Y"].apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return Module["asm"]["Z"].apply(null,arguments)};var globalCtors=Module["globalCtors"]=function(){return Module["asm"]["yb"].apply(null,arguments)};var dynCall_d=Module["dynCall_d"]=function(){return Module["asm"]["_"].apply(null,arguments)};var dynCall_di=Module["dynCall_di"]=function(){return Module["asm"]["$"].apply(null,arguments)};var dynCall_f=Module["dynCall_f"]=function(){return Module["asm"]["aa"].apply(null,arguments)};var dynCall_fi=Module["dynCall_fi"]=function(){return Module["asm"]["ba"].apply(null,arguments)};var dynCall_fii=Module["dynCall_fii"]=function(){return Module["asm"]["ca"].apply(null,arguments)};var dynCall_fiii=Module["dynCall_fiii"]=function(){return Module["asm"]["da"].apply(null,arguments)};var dynCall_i=Module["dynCall_i"]=function(){return Module["asm"]["ea"].apply(null,arguments)};var dynCall_ii=Module["dynCall_ii"]=function(){return Module["asm"]["fa"].apply(null,arguments)};var dynCall_iidiiii=Module["dynCall_iidiiii"]=function(){return Module["asm"]["ga"].apply(null,arguments)};var dynCall_iif=Module["dynCall_iif"]=function(){return Module["asm"]["ha"].apply(null,arguments)};var dynCall_iiff=Module["dynCall_iiff"]=function(){return Module["asm"]["ia"].apply(null,arguments)};var dynCall_iifif=Module["dynCall_iifif"]=function(){return Module["asm"]["ja"].apply(null,arguments)};var dynCall_iii=Module["dynCall_iii"]=function(){return Module["asm"]["ka"].apply(null,arguments)};var dynCall_iiiddii=Module["dynCall_iiiddii"]=function(){return Module["asm"]["la"].apply(null,arguments)};var dynCall_iiif=Module["dynCall_iiif"]=function(){return Module["asm"]["ma"].apply(null,arguments)};var dynCall_iiiff=Module["dynCall_iiiff"]=function(){return Module["asm"]["na"].apply(null,arguments)};var dynCall_iiifffiii=Module["dynCall_iiifffiii"]=function(){return Module["asm"]["oa"].apply(null,arguments)};var dynCall_iiifi=Module["dynCall_iiifi"]=function(){return Module["asm"]["pa"].apply(null,arguments)};var dynCall_iiifif=Module["dynCall_iiifif"]=function(){return Module["asm"]["qa"].apply(null,arguments)};var dynCall_iiii=Module["dynCall_iiii"]=function(){return Module["asm"]["ra"].apply(null,arguments)};var dynCall_iiiiddii=Module["dynCall_iiiiddii"]=function(){return Module["asm"]["sa"].apply(null,arguments)};var dynCall_iiiif=Module["dynCall_iiiif"]=function(){return Module["asm"]["ta"].apply(null,arguments)};var dynCall_iiiifi=Module["dynCall_iiiifi"]=function(){return Module["asm"]["ua"].apply(null,arguments)};var dynCall_iiiifii=Module["dynCall_iiiifii"]=function(){return Module["asm"]["va"].apply(null,arguments)};var dynCall_iiiii=Module["dynCall_iiiii"]=function(){return Module["asm"]["wa"].apply(null,arguments)};var dynCall_iiiiii=Module["dynCall_iiiiii"]=function(){return Module["asm"]["xa"].apply(null,arguments)};var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=function(){return Module["asm"]["ya"].apply(null,arguments)};var dynCall_iiiiiiii=Module["dynCall_iiiiiiii"]=function(){return Module["asm"]["za"].apply(null,arguments)};var dynCall_iiiiiiiii=Module["dynCall_iiiiiiiii"]=function(){return Module["asm"]["Aa"].apply(null,arguments)};var dynCall_iiiiiiiiii=Module["dynCall_iiiiiiiiii"]=function(){return Module["asm"]["Ba"].apply(null,arguments)};var dynCall_iiiiiiiiiii=Module["dynCall_iiiiiiiiiii"]=function(){return Module["asm"]["Ca"].apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return Module["asm"]["Da"].apply(null,arguments)};var dynCall_v=Module["dynCall_v"]=function(){return Module["asm"]["Ea"].apply(null,arguments)};var dynCall_vf=Module["dynCall_vf"]=function(){return Module["asm"]["Fa"].apply(null,arguments)};var dynCall_vff=Module["dynCall_vff"]=function(){return Module["asm"]["Ga"].apply(null,arguments)};var dynCall_vfffiii=Module["dynCall_vfffiii"]=function(){return Module["asm"]["Ha"].apply(null,arguments)};var dynCall_vfii=Module["dynCall_vfii"]=function(){return Module["asm"]["Ia"].apply(null,arguments)};var dynCall_vi=Module["dynCall_vi"]=function(){return Module["asm"]["Ja"].apply(null,arguments)};var dynCall_vif=Module["dynCall_vif"]=function(){return Module["asm"]["Ka"].apply(null,arguments)};var dynCall_viff=Module["dynCall_viff"]=function(){return Module["asm"]["La"].apply(null,arguments)};var dynCall_vifffiii=Module["dynCall_vifffiii"]=function(){return Module["asm"]["Ma"].apply(null,arguments)};var dynCall_vifi=Module["dynCall_vifi"]=function(){return Module["asm"]["Na"].apply(null,arguments)};var dynCall_vifii=Module["dynCall_vifii"]=function(){return Module["asm"]["Oa"].apply(null,arguments)};var dynCall_vii=Module["dynCall_vii"]=function(){return Module["asm"]["Pa"].apply(null,arguments)};var dynCall_viif=Module["dynCall_viif"]=function(){return Module["asm"]["Qa"].apply(null,arguments)};var dynCall_viifffi=Module["dynCall_viifffi"]=function(){return Module["asm"]["Ra"].apply(null,arguments)};var dynCall_viifffiii=Module["dynCall_viifffiii"]=function(){return Module["asm"]["Sa"].apply(null,arguments)};var dynCall_viifi=Module["dynCall_viifi"]=function(){return Module["asm"]["Ta"].apply(null,arguments)};var dynCall_viifii=Module["dynCall_viifii"]=function(){return Module["asm"]["Ua"].apply(null,arguments)};var dynCall_viifiif=Module["dynCall_viifiif"]=function(){return Module["asm"]["Va"].apply(null,arguments)};var dynCall_viifiii=Module["dynCall_viifiii"]=function(){return Module["asm"]["Wa"].apply(null,arguments)};var dynCall_viifiiifi=Module["dynCall_viifiiifi"]=function(){return Module["asm"]["Xa"].apply(null,arguments)};var dynCall_viii=Module["dynCall_viii"]=function(){return Module["asm"]["Ya"].apply(null,arguments)};var dynCall_viiif=Module["dynCall_viiif"]=function(){return Module["asm"]["Za"].apply(null,arguments)};var dynCall_viiifffi=Module["dynCall_viiifffi"]=function(){return Module["asm"]["_a"].apply(null,arguments)};var dynCall_viiifi=Module["dynCall_viiifi"]=function(){return Module["asm"]["$a"].apply(null,arguments)};var dynCall_viiifii=Module["dynCall_viiifii"]=function(){return Module["asm"]["ab"].apply(null,arguments)};var dynCall_viiifiif=Module["dynCall_viiifiif"]=function(){return Module["asm"]["bb"].apply(null,arguments)};var dynCall_viiifiii=Module["dynCall_viiifiii"]=function(){return Module["asm"]["cb"].apply(null,arguments)};var dynCall_viiifiiifi=Module["dynCall_viiifiiifi"]=function(){return Module["asm"]["db"].apply(null,arguments)};var dynCall_viiii=Module["dynCall_viiii"]=function(){return Module["asm"]["eb"].apply(null,arguments)};var dynCall_viiiif=Module["dynCall_viiiif"]=function(){return Module["asm"]["fb"].apply(null,arguments)};var dynCall_viiiifi=Module["dynCall_viiiifi"]=function(){return Module["asm"]["gb"].apply(null,arguments)};var dynCall_viiiifif=Module["dynCall_viiiifif"]=function(){return Module["asm"]["hb"].apply(null,arguments)};var dynCall_viiiii=Module["dynCall_viiiii"]=function(){return Module["asm"]["ib"].apply(null,arguments)};var dynCall_viiiiif=Module["dynCall_viiiiif"]=function(){return Module["asm"]["jb"].apply(null,arguments)};var dynCall_viiiiifi=Module["dynCall_viiiiifi"]=function(){return Module["asm"]["kb"].apply(null,arguments)};var dynCall_viiiiifif=Module["dynCall_viiiiifif"]=function(){return Module["asm"]["lb"].apply(null,arguments)};var dynCall_viiiiii=Module["dynCall_viiiiii"]=function(){return Module["asm"]["mb"].apply(null,arguments)};var dynCall_viiiiiif=Module["dynCall_viiiiiif"]=function(){return Module["asm"]["nb"].apply(null,arguments)};var dynCall_viiiiiifi=Module["dynCall_viiiiiifi"]=function(){return Module["asm"]["ob"].apply(null,arguments)};var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=function(){return Module["asm"]["pb"].apply(null,arguments)};var dynCall_viiiiiiif=Module["dynCall_viiiiiiif"]=function(){return Module["asm"]["qb"].apply(null,arguments)};var dynCall_viiiiiiifi=Module["dynCall_viiiiiiifi"]=function(){return Module["asm"]["rb"].apply(null,arguments)};var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=function(){return Module["asm"]["sb"].apply(null,arguments)};var dynCall_viiiiiiiifi=Module["dynCall_viiiiiiiifi"]=function(){return Module["asm"]["tb"].apply(null,arguments)};var dynCall_viiiiiiiii=Module["dynCall_viiiiiiiii"]=function(){return Module["asm"]["ub"].apply(null,arguments)};var dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=function(){return Module["asm"]["vb"].apply(null,arguments)};var dynCall_viiiiiiiiiii=Module["dynCall_viiiiiiiiiii"]=function(){return Module["asm"]["wb"].apply(null,arguments)};var dynCall_viiiiiiiiiiii=Module["dynCall_viiiiiiiiiiii"]=function(){return Module["asm"]["xb"].apply(null,arguments)};Module["asm"]=asm;Module["then"]=function(func){if(Module["calledRun"]){func(Module);}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=function(){if(old)old();func(Module);};}return Module};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller;};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else{doRun();}}Module["run"]=run;function abort(what){if(Module["onAbort"]){Module["onAbort"](what);}if(what!==undefined){out(what);err(what);what=JSON.stringify(what);}else{what="";}ABORT=true;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}Module["noExitRuntime"]=true;run();


      return Module
    }
    );
    })();
    module.exports = Module;
    });
    var bindImgui_1 = bindImgui.bind;

    var bindImgui$1 = /*#__PURE__*/Object.freeze({
        'default': bindImgui,
        __moduleExports: bindImgui,
        bind: bindImgui_1
    });

    //-----------------------------------------------------------------------------
    //---- Implement STB libraries in a namespace to avoid linkage conflicts (defaults to global namespace)
    //#define IMGUI_STB_NAMESPACE     ImGuiStb
    //---- Define constructor and implicit cast operators to convert back<>forth from your math types and ImVec2/ImVec4.
    // This will be inlined as part of ImVec2 and ImVec4 class declarations.
    /*
    #define IM_VEC2_CLASS_EXTRA                                                 \
            ImVec2(const MyVec2& f) { x = f.x; y = f.y; }                       \
            operator MyVec2() const { return MyVec2(x,y); }

    #define IM_VEC4_CLASS_EXTRA                                                 \
            ImVec4(const MyVec4& f) { x = f.x; y = f.y; z = f.z; w = f.w; }     \
            operator MyVec4() const { return MyVec4(x,y,z,w); }
    */
    //---- Use 32-bit vertex indices (instead of default 16-bit) to allow meshes with more than 64K vertices. Render function needs to support it.
    //#define ImDrawIdx unsigned int
    //---- Tip: You can add extra functions within the ImGui:: namespace, here or in your own headers files.
    /*
    namespace ImGui
    {
        void MyFunction(const char* name, const MyMatrix44& v);
    }
    */

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
    const IMGUI_VERSION = "1.67"; // bind.IMGUI_VERSION;
    const IMGUI_VERSION_NUM = 16603; // bind.IMGUI_VERSION_NUM;
    // #define IMGUI_CHECKVERSION()        ImGui::DebugCheckVersionAndDataLayout(IMGUI_VERSION, sizeof(ImGuiIO), sizeof(ImGuiStyle), sizeof(ImVec2), sizeof(ImVec4), sizeof(ImDrawVert))
    function IMGUI_CHECKVERSION() { return DebugCheckVersionAndDataLayout(IMGUI_VERSION, exports.bind.ImGuiIOSize, exports.bind.ImGuiStyleSize, exports.bind.ImVec2Size, exports.bind.ImVec4Size, exports.bind.ImDrawVertSize); }
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
        ImGuiTabBarFlags[ImGuiTabBarFlags["NoCloseWithMiddleMouseButton"] = 4] = "NoCloseWithMiddleMouseButton";
        ImGuiTabBarFlags[ImGuiTabBarFlags["NoTabListPopupButton"] = 8] = "NoTabListPopupButton";
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
        ImGuiDataType[ImGuiDataType["S32"] = 0] = "S32";
        ImGuiDataType[ImGuiDataType["U32"] = 1] = "U32";
        ImGuiDataType[ImGuiDataType["S64"] = 2] = "S64";
        ImGuiDataType[ImGuiDataType["U64"] = 3] = "U64";
        ImGuiDataType[ImGuiDataType["Float"] = 4] = "Float";
        ImGuiDataType[ImGuiDataType["Double"] = 5] = "Double";
        ImGuiDataType[ImGuiDataType["COUNT"] = 6] = "COUNT";
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
        ImGuiNavInput[ImGuiNavInput["KeyLeft_"] = 17] = "KeyLeft_";
        ImGuiNavInput[ImGuiNavInput["KeyRight_"] = 18] = "KeyRight_";
        ImGuiNavInput[ImGuiNavInput["KeyUp_"] = 19] = "KeyUp_";
        ImGuiNavInput[ImGuiNavInput["KeyDown_"] = 20] = "KeyDown_";
        ImGuiNavInput[ImGuiNavInput["COUNT"] = 21] = "COUNT";
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
        ImGuiStyleVar[ImGuiStyleVar["Count_"] = 22] = "Count_";
        ImGuiStyleVar[ImGuiStyleVar["COUNT"] = 22] = "COUNT";
    })(exports.StyleVar || (exports.StyleVar = {}));
    (function (ImGuiBackendFlags) {
        ImGuiBackendFlags[ImGuiBackendFlags["None"] = 0] = "None";
        ImGuiBackendFlags[ImGuiBackendFlags["HasGamepad"] = 1] = "HasGamepad";
        ImGuiBackendFlags[ImGuiBackendFlags["HasMouseCursors"] = 2] = "HasMouseCursors";
        ImGuiBackendFlags[ImGuiBackendFlags["HasSetMousePos"] = 4] = "HasSetMousePos"; // Back-end can honor io.WantSetMousePos and reposition the mouse (only used if ImGuiConfigFlags_NavEnableSetMousePos is set).
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
        ImGuiColorEditFlags[ImGuiColorEditFlags["RGB"] = 1048576] = "RGB";
        ImGuiColorEditFlags[ImGuiColorEditFlags["HSV"] = 2097152] = "HSV";
        ImGuiColorEditFlags[ImGuiColorEditFlags["HEX"] = 4194304] = "HEX";
        ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 8388608] = "Uint8";
        ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 16777216] = "Float";
        ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 33554432] = "PickerHueBar";
        ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 67108864] = "PickerHueWheel";
        // Internals/Masks
        ImGuiColorEditFlags[ImGuiColorEditFlags["_InputsMask"] = 7340032] = "_InputsMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_DataTypeMask"] = 25165824] = "_DataTypeMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_PickerMask"] = 100663296] = "_PickerMask";
        ImGuiColorEditFlags[ImGuiColorEditFlags["_OptionsDefault"] = 42991616] = "_OptionsDefault";
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
    const IM_COL32_R_SHIFT = 0;
    const IM_COL32_G_SHIFT = 8;
    const IM_COL32_B_SHIFT = 16;
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
        get StartPosY() { return this.native.StartPosY; }
        get ItemsHeight() { return this.native.ItemsHeight; }
        get ItemsCount() { return this.native.ItemsCount; }
        get StepNo() { return this.native.StepNo; }
        get DisplayStart() { return this.native.DisplayStart; }
        get DisplayEnd() { return this.native.DisplayEnd; }
        // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
        // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
        // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
        // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
        constructor(items_count = -1, items_height = -1.0) {
            this.native = new exports.bind.ImGuiListClipper(items_count, items_height);
        }
        // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
        delete() {
            if (this.native) {
                this.native.delete();
                delete this.native;
            }
        }
        // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
        Step() {
            if (!this.native) {
                throw new Error();
            }
            const busy = this.native.Step();
            if (!busy) {
                this.delete();
            }
            return busy;
        }
        // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
        Begin(items_count, items_height = -1.0) {
            if (!this.native) {
                this.native = new undefined(items_count, items_height);
            }
            this.native.Begin(items_count, items_height);
        }
        // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
        End() {
            if (!this.native) {
                throw new Error();
            }
            this.native.End();
            this.delete();
        }
    }
    // Typically, 1 command = 1 GPU draw call (unless command is a callback)
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
    }
    // Vertex index (override with '#define ImDrawIdx unsigned int' inside in imconfig.h)
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
        // Functions
        // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
        // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
        DeIndexAllBuffers() { this.native.DeIndexAllBuffers(); }
        // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
        ScaleClipRects(sc) {
            this.native.ScaleClipRects(sc);
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
            this.WindowPadding.Copy(this.WindowPadding);
            this.WindowRounding = other.WindowRounding;
            this.WindowBorderSize = other.WindowBorderSize;
            this.WindowMinSize.Copy(this.WindowMinSize);
            this.WindowTitleAlign.Copy(this.WindowTitleAlign);
            this.ChildRounding = other.ChildRounding;
            this.ChildBorderSize = other.ChildBorderSize;
            this.PopupRounding = other.PopupRounding;
            this.PopupBorderSize = other.PopupBorderSize;
            this.FramePadding.Copy(this.FramePadding);
            this.FrameRounding = other.FrameRounding;
            this.FrameBorderSize = other.FrameBorderSize;
            this.ItemSpacing.Copy(this.ItemSpacing);
            this.ItemInnerSpacing.Copy(this.ItemInnerSpacing);
            this.TouchExtraPadding.Copy(this.TouchExtraPadding);
            this.IndentSpacing = other.IndentSpacing;
            this.ColumnsMinSpacing = other.ColumnsMinSpacing;
            this.ScrollbarSize = other.ScrollbarSize;
            this.ScrollbarRounding = other.ScrollbarRounding;
            this.GrabMinSize = other.GrabMinSize;
            this.GrabRounding = other.GrabRounding;
            this.TabRounding = other.TabRounding;
            this.TabBorderSize = other.TabBorderSize;
            this.ButtonTextAlign.Copy(this.ButtonTextAlign);
            this.DisplayWindowPadding.Copy(this.DisplayWindowPadding);
            this.DisplaySafeAreaPadding.Copy(this.DisplaySafeAreaPadding);
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
        // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
        get DisplayVisibleMin() { return this.native.DisplayVisibleMin; }
        // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize
        get DisplayVisibleMax() { return this.native.DisplayVisibleMax; }
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
    function DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert) {
        return exports.bind.DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert);
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
    // IMGUI_API float         GetContentRegionAvailWidth();                                       //
    function GetContentRegionAvailWidth() { return exports.bind.GetContentRegionAvailWidth(); }
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
    // IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    function SetNextTreeNodeOpen(is_open, cond = 0) {
        exports.bind.SetNextTreeNodeOpen(is_open, cond);
    }
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
    // IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
    function GetOverlayDrawList() {
        return new ImDrawList(exports.bind.GetOverlayDrawList());
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
    exports.GetClipboardText = GetClipboardText;
    exports.GetColorU32 = GetColorU32;
    exports.GetColumnIndex = GetColumnIndex;
    exports.GetColumnOffset = GetColumnOffset;
    exports.GetColumnWidth = GetColumnWidth;
    exports.GetColumnsCount = GetColumnsCount;
    exports.GetContentRegionAvail = GetContentRegionAvail;
    exports.GetContentRegionAvailWidth = GetContentRegionAvailWidth;
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
    exports.GetOverlayDrawList = GetOverlayDrawList;
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
    exports.InvisibleButton = InvisibleButton;
    exports.IsAnyItemActive = IsAnyItemActive;
    exports.IsAnyItemFocused = IsAnyItemFocused;
    exports.IsAnyItemHovered = IsAnyItemHovered;
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
    exports.SetNextTreeNodeOpen = SetNextTreeNodeOpen;
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

}));
