var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/boolbase/index.js
var require_boolbase = __commonJS((exports, module) => {
  module.exports = {
    trueFunc: function trueFunc() {
      return true;
    },
    falseFunc: function falseFunc() {
      return false;
    }
  };
});

// node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/axios/lib/utils.js
var isBuffer = function(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
};
var isArrayBufferView = function(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
};
var forEach = function(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length;i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0;i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
};
var findKey = function(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
};
var merge = function() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length;i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
};
var isSpecCompliantForm = function(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
};
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
var isArrayBuffer = kindOfTest("ArrayBuffer");
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
var isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
var _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i = thing.length;
  if (!isNumber(i))
    return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method \'" + name + "\'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = undefined;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction(_global.postMessage));
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};

// node_modules/axios/lib/core/AxiosError.js
var AxiosError = function(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
};
utils_default.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
var prototype = AxiosError.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);
  utils_default.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_default = AxiosError;

// node_modules/axios/lib/helpers/null.js
var null_default = null;

// node_modules/axios/lib/helpers/toFormData.js
var isVisitable = function(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
};
var removeBrackets = function(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
};
var renderKey = function(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
};
var isFlatArray = function(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
};
var toFormData = function(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (null_default || FormData);
  options = utils_default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils_default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
};
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
var toFormData_default = toFormData;

// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
var encode = function(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
};
var AxiosURLSearchParams = function(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
};
var prototype2 = AxiosURLSearchParams.prototype;
prototype2.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype2.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/axios/lib/helpers/buildURL.js
var encode2 = function(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
};
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode2;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}

// node_modules/axios/lib/core/InterceptorManager.js
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
var InterceptorManager_default = InterceptorManager;

// node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

// node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

// node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default = typeof FormData !== "undefined" ? FormData : null;

// node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default = typeof Blob !== "undefined" ? Blob : null;

// node_modules/axios/lib/platform/browser/index.js
var browser_default = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: Blob_default
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};

// node_modules/axios/lib/platform/common/utils.js
var exports_utils = {};
__export(exports_utils, {
  origin: () => {
    {
      return origin;
    }
  },
  navigator: () => {
    {
      return _navigator;
    }
  },
  hasStandardBrowserWebWorkerEnv: () => {
    {
      return hasStandardBrowserWebWorkerEnv;
    }
  },
  hasStandardBrowserEnv: () => {
    {
      return hasStandardBrowserEnv;
    }
  },
  hasBrowserEnv: () => {
    {
      return hasBrowserEnv;
    }
  }
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || undefined;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";

// node_modules/axios/lib/platform/index.js
var platform_default = {
  ...exports_utils,
  ...browser_default
};

// node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new platform_default.classes.URLSearchParams, Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

// node_modules/axios/lib/helpers/formDataToJSON.js
var parsePropPath = function(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
};
var arrayToObject = function(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0;i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
};
var formDataToJSON = function(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__")
      return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
};
var formDataToJSON_default = formDataToJSON;

// node_modules/axios/lib/defaults/index.js
var stringifySafely = function(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
};
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils_default.isObject(data);
    if (isObjectPayload && utils_default.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils_default.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
    }
    if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
      return data;
    }
    if (utils_default.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils_default.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData_default(isFileList2 ? { "files[]": data } : data, _FormData && new _FormData, this.formSerializer);
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
      return data;
    }
    if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": undefined
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var defaults_default = defaults;

// node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/axios/lib/core/AxiosHeaders.js
var normalizeHeader = function(header) {
  return header && String(header).trim().toLowerCase();
};
var normalizeValue = function(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
};
var parseTokens = function(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
};
var matchHeaderValue = function(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value))
    return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
};
var formatHeader = function(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
};
var buildAccessors = function(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
};
var $internals = Symbol("internals");
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === undefined || _rewrite === true || _rewrite === undefined && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else if (utils_default.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype3 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype3, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/axios/lib/core/transformData.js
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });
  headers.normalize();
  return data;
}

// node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = function(message, config, request) {
  AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
  this.name = "CanceledError";
};
utils_default.inherits(CanceledError, AxiosError_default, {
  __CANCEL__: true
});
var CanceledError_default = CanceledError;

// node_modules/axios/lib/core/settle.js
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_default("Request failed with status code " + response.status, [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
}

// node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}

// node_modules/axios/lib/helpers/speedometer.js
var speedometer = function(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== undefined ? min : 1000;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
};
var speedometer_default = speedometer;

// node_modules/axios/lib/helpers/throttle.js
var throttle = function(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
};
var throttle_default = throttle;

// node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return throttle_default((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
var progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? function standardBrowserEnv() {
  const msie = platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent);
  const urlParsingNode = document.createElement("a");
  let originURL;
  function resolveURL(url) {
    let href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin(requestURL) {
    const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

// node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? {
  write(name, value, expires, path, domain, secure) {
    const cookie = [name + "=" + encodeURIComponent(value)];
    utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
    utils_default.isString(path) && cookie.push("path=" + path);
    utils_default.isString(domain) && cookie.push("domain=" + domain);
    secure === true && cookie.push("secure");
    document.cookie = cookie.join("; ");
  },
  read(name) {
    const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
    return match ? decodeURIComponent(match[3]) : null;
  },
  remove(name) {
    this.write(name, "", Date.now() - 86400000);
  }
} : {
  write() {
  },
  read() {
    return null;
  },
  remove() {
  }
};

// node_modules/axios/lib/helpers/isAbsoluteURL.js
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

// node_modules/axios/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/axios/lib/core/buildFullPath.js
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };
  utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders_default.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")));
  }
  let contentType;
  if (utils_default.isFormData(data)) {
    if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform_default.hasStandardBrowserEnv) {
    withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};

// node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig_default(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest;
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional3 = _config.transitional || transitional_default;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError_default(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    requestData === undefined && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController;
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError_default(`timeout ${timeout} of ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils_default.asap(unsubscribe);
    return signal;
  }
};
var composeSignals_default = composeSignals;

// node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
var readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (;; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  });
};

// node_modules/axios/lib/adapters/fetch.js
var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
var test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform_default.origin, {
    body: new ReadableStream,
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var supportsResponseStream = isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
var resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response);
var getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils_default.isBlob(body)) {
    return body.size;
  }
  if (utils_default.isSpecCompliantForm(body)) {
    const _request = new Request(platform_default.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils_default.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils_default.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
var resolveBodyLength = async (headers, body) => {
  const length = utils_default.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
var fetch_default = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig_default(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals_default([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils_default.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : undefined
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
      response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
        flush && flush();
        unsubscribe && unsubscribe();
      }), options);
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders_default.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request), {
        cause: err.cause || err
      });
    }
    throw AxiosError_default.from(err, err && err.code, config, request);
  }
});

// node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: null_default,
  xhr: xhr_default,
  fetch: fetch_default
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
var adapters_default = {
  getAdapter: (adapters) => {
    adapters = utils_default.isArray(adapters) ? adapters : [adapters];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0;i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === undefined) {
          throw new AxiosError_default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError_default(`There is no suitable adapter to dispatch the request ` + s, "ERR_NOT_SUPPORT");
    }
    return adapter;
  },
  adapters: knownAdapters
};

// node_modules/axios/lib/core/dispatchRequest.js
var throwIfCancellationRequested = function(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
};
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(config, config.transformResponse, response);
    response.headers = AxiosHeaders_default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
        reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

// node_modules/axios/lib/env/data.js
var VERSION = "1.7.7";

// node_modules/axios/lib/helpers/validator.js
var assertOptions = function(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
};
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional3(validator, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option \'" + opt + "\'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError_default.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
var validator_default = {
  assertOptions,
  validators
};

// node_modules/axios/lib/core/Axios.js
var validators2 = validator_default.validators;

class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_default,
      response: new InterceptorManager_default
    };
  }
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;
        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error;
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional4, paramsSerializer, headers } = config;
    if (transitional4 !== undefined) {
      validator_default.assertOptions(transitional4, {
        silentJSONParsing: validators2.transitional(validators2.boolean),
        forcedJSONParsing: validators2.transitional(validators2.boolean),
        clarifyTimeoutError: validators2.transitional(validators2.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(paramsSerializer, {
          encode: validators2.function,
          serialize: validators2.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
    headers && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/axios/lib/cancel/CancelToken.js
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message, config, request);
      resolvePromise(token.reason);
    });
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController;
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}
var CancelToken_default = CancelToken;

// node_modules/axios/lib/helpers/spread.js
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/axios/lib/helpers/isAxiosError.js
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/axios/lib/axios.js
var createInstance = function(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
};
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// node_modules/cheerio/dist/browser/static.js
var exports_static = {};
__export(exports_static, {
  xml: () => {
    {
      return xml;
    }
  },
  text: () => {
    {
      return text;
    }
  },
  root: () => {
    {
      return root;
    }
  },
  parseHTML: () => {
    {
      return parseHTML;
    }
  },
  merge: () => {
    {
      return merge2;
    }
  },
  html: () => {
    {
      return html;
    }
  },
  extract: () => {
    {
      return extract;
    }
  },
  contains: () => {
    {
      return contains;
    }
  }
});

// node_modules/domutils/lib/esm/index.js
var exports_esm2 = {};
__export(exports_esm2, {
  uniqueSort: () => {
    {
      return uniqueSort;
    }
  },
  textContent: () => {
    {
      return textContent;
    }
  },
  testElement: () => {
    {
      return testElement;
    }
  },
  replaceElement: () => {
    {
      return replaceElement;
    }
  },
  removeSubsets: () => {
    {
      return removeSubsets;
    }
  },
  removeElement: () => {
    {
      return removeElement;
    }
  },
  prevElementSibling: () => {
    {
      return prevElementSibling;
    }
  },
  prependChild: () => {
    {
      return prependChild;
    }
  },
  prepend: () => {
    {
      return prepend;
    }
  },
  nextElementSibling: () => {
    {
      return nextElementSibling;
    }
  },
  isText: () => {
    {
      return isText;
    }
  },
  isTag: () => {
    {
      return isTag2;
    }
  },
  isDocument: () => {
    {
      return isDocument;
    }
  },
  isComment: () => {
    {
      return isComment;
    }
  },
  isCDATA: () => {
    {
      return isCDATA;
    }
  },
  innerText: () => {
    {
      return innerText;
    }
  },
  hasChildren: () => {
    {
      return hasChildren;
    }
  },
  hasAttrib: () => {
    {
      return hasAttrib;
    }
  },
  getText: () => {
    {
      return getText;
    }
  },
  getSiblings: () => {
    {
      return getSiblings;
    }
  },
  getParent: () => {
    {
      return getParent;
    }
  },
  getOuterHTML: () => {
    {
      return getOuterHTML;
    }
  },
  getName: () => {
    {
      return getName;
    }
  },
  getInnerHTML: () => {
    {
      return getInnerHTML;
    }
  },
  getFeed: () => {
    {
      return getFeed;
    }
  },
  getElementsByTagType: () => {
    {
      return getElementsByTagType;
    }
  },
  getElementsByTagName: () => {
    {
      return getElementsByTagName;
    }
  },
  getElements: () => {
    {
      return getElements;
    }
  },
  getElementById: () => {
    {
      return getElementById;
    }
  },
  getChildren: () => {
    {
      return getChildren;
    }
  },
  getAttributeValue: () => {
    {
      return getAttributeValue;
    }
  },
  findOneChild: () => {
    {
      return findOneChild;
    }
  },
  findOne: () => {
    {
      return findOne;
    }
  },
  findAll: () => {
    {
      return findAll;
    }
  },
  find: () => {
    {
      return find;
    }
  },
  filter: () => {
    {
      return filter2;
    }
  },
  existsOne: () => {
    {
      return existsOne;
    }
  },
  compareDocumentPosition: () => {
    {
      return compareDocumentPosition;
    }
  },
  appendChild: () => {
    {
      return appendChild;
    }
  },
  append: () => {
    {
      return append2;
    }
  },
  DocumentPosition: () => {
    {
      return DocumentPosition;
    }
  }
});

// node_modules/domelementtype/lib/esm/index.js
function isTag(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
var Root = ElementType.Root;
var Text = ElementType.Text;
var Directive = ElementType.Directive;
var Comment = ElementType.Comment;
var Script = ElementType.Script;
var Style = ElementType.Style;
var Tag = ElementType.Tag;
var CDATA = ElementType.CDATA;
var Doctype = ElementType.Doctype;

// node_modules/domhandler/lib/esm/node.js
function isTag2(node2) {
  return isTag(node2);
}
function isCDATA(node2) {
  return node2.type === ElementType.CDATA;
}
function isText(node2) {
  return node2.type === ElementType.Text;
}
function isComment(node2) {
  return node2.type === ElementType.Comment;
}
function isDirective(node2) {
  return node2.type === ElementType.Directive;
}
function isDocument(node2) {
  return node2.type === ElementType.Root;
}
function hasChildren(node2) {
  return Object.prototype.hasOwnProperty.call(node2, "children");
}
function cloneNode(node2, recursive = false) {
  let result;
  if (isText(node2)) {
    result = new Text2(node2.data);
  } else if (isComment(node2)) {
    result = new Comment2(node2.data);
  } else if (isTag2(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Element(node2.name, { ...node2.attribs }, children);
    children.forEach((child) => child.parent = clone);
    if (node2.namespace != null) {
      clone.namespace = node2.namespace;
    }
    if (node2["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = { ...node2["x-attribsNamespace"] };
    }
    if (node2["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = { ...node2["x-attribsPrefix"] };
    }
    result = clone;
  } else if (isCDATA(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new CDATA2(children);
    children.forEach((child) => child.parent = clone);
    result = clone;
  } else if (isDocument(node2)) {
    const children = recursive ? cloneChildren(node2.children) : [];
    const clone = new Document(children);
    children.forEach((child) => child.parent = clone);
    if (node2["x-mode"]) {
      clone["x-mode"] = node2["x-mode"];
    }
    result = clone;
  } else if (isDirective(node2)) {
    const instruction = new ProcessingInstruction(node2.name, node2.data);
    if (node2["x-name"] != null) {
      instruction["x-name"] = node2["x-name"];
      instruction["x-publicId"] = node2["x-publicId"];
      instruction["x-systemId"] = node2["x-systemId"];
    }
    result = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node2.type}`);
  }
  result.startIndex = node2.startIndex;
  result.endIndex = node2.endIndex;
  if (node2.sourceCodeLocation != null) {
    result.sourceCodeLocation = node2.sourceCodeLocation;
  }
  return result;
}
var cloneChildren = function(childs) {
  const children = childs.map((child) => cloneNode(child, true));
  for (let i = 1;i < children.length; i++) {
    children[i].prev = children[i - 1];
    children[i - 1].next = children[i];
  }
  return children;
};

class Node {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev) {
    this.prev = prev;
  }
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next) {
    this.next = next;
  }
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
}

class DataNode extends Node {
  constructor(data3) {
    super();
    this.data = data3;
  }
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data3) {
    this.data = data3;
  }
}

class Text2 extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
}

class Comment2 extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
}

class ProcessingInstruction extends DataNode {
  constructor(name, data3) {
    super(data3);
    this.name = name;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
}

class NodeWithChildren extends Node {
  constructor(children) {
    super();
    this.children = children;
  }
  get firstChild() {
    var _a;
    return (_a = this.children[0]) !== null && _a !== undefined ? _a : null;
  }
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
}

class CDATA2 extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
}

class Document extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
}

class Element extends NodeWithChildren {
  constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    this.name = name;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  get tagName() {
    return this.name;
  }
  set tagName(name) {
    this.name = name;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name) => {
      var _a, _b;
      return {
        name,
        value: this.attribs[name],
        namespace: (_a = this["x-attribsNamespace"]) === null || _a === undefined ? undefined : _a[name],
        prefix: (_b = this["x-attribsPrefix"]) === null || _b === undefined ? undefined : _b[name]
      };
    });
  }
}

// node_modules/domhandler/lib/esm/index.js
var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};

class DomHandler {
  constructor(callback, options, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    if (typeof callback === "object") {
      options = callback;
      callback = undefined;
    }
    this.callback = callback !== null && callback !== undefined ? callback : null;
    this.options = options !== null && options !== undefined ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== undefined ? elementCB : null;
  }
  onparserinit(parser) {
    this.parser = parser;
  }
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(elem);
  }
  onopentag(name, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : undefined;
    const element = new Element(name, attribs, undefined, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data3) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data3;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node4 = new Text2(data3);
      this.addNode(node4);
      this.lastNode = node4;
    }
  }
  oncomment(data3) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data3;
      return;
    }
    const node4 = new Comment2(data3);
    this.addNode(node4);
    this.lastNode = node4;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text = new Text2("");
    const node4 = new CDATA2([text]);
    this.addNode(node4);
    text.parent = node4;
    this.lastNode = text;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name, data3) {
    const node4 = new ProcessingInstruction(name, data3);
    this.addNode(node4);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node4) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices) {
      node4.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node4.endIndex = this.parser.endIndex;
    }
    parent.children.push(node4);
    if (previousSibling) {
      node4.prev = previousSibling;
      previousSibling.next = node4;
    }
    node4.parent = parent;
    this.lastNode = null;
  }
}

// node_modules/entities/lib/esm/generated/decode-data-html.js
var decode_data_html_default = new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\uD835\uDD04rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\uD835\uDD38plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\uD835\uDC9Cign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\uD835\uDD05pf;\uC000\uD835\uDD39eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\uD835\uDC9Ep\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\uD835\uDD07\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\uD835\uDD3B\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\uD835\uDC9Frok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\uD835\uDD08rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\uD835\uDD3Csilon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\uD835\uDD09lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\uD835\uDD3DAll;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\uD835\uDD0A;\u62D9pf;\uC000\uD835\uDD3Eeater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\uD835\uDCA2;\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\uD835\uDD40a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\uD835\uDD0Dpf;\uC000\uD835\uDD41\u01E3\u07C7\0\u07CCr;\uC000\uD835\uDCA5rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\uD835\uDD0Epf;\uC000\uD835\uDD42cr;\uC000\uD835\uDCA6\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\uD835\uDD0F\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\uD835\uDD43er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\uD835\uDD10nusPlus;\u6213pf;\uC000\uD835\uDD44c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\uD835\uDD11\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\uD835\uDCA9ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\uD835\uDD12rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\uD835\uDD46enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\uD835\uDCAAash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\uD835\uDD13i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\uD835\uDCAB;\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\uD835\uDD14pf;\u611Acr;\uC000\uD835\uDCAC\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\uD835\uDD16ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\uD835\uDD4A\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\uD835\uDCAEar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\uD835\uDD17\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\uD835\uDD4BipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\uD835\uDCAFrok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\uD835\uDD18rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\uD835\uDD4C\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\uD835\uDCB0ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\uD835\uDD19pf;\uC000\uD835\uDD4Dcr;\uC000\uD835\uDCB1dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\uD835\uDD1Apf;\uC000\uD835\uDD4Ecr;\uC000\uD835\uDCB2\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\uD835\uDD1B;\u439Epf;\uC000\uD835\uDD4Fcr;\uC000\uD835\uDCB3\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\uD835\uDD1Cpf;\uC000\uD835\uDD50cr;\uC000\uD835\uDCB4ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\uD835\uDCB5\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\uD835\uDD1Erave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\uD835\uDD52\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\uD835\uDCB6;\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\uD835\uDD1Fg\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\uD835\uDD53\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\uD835\uDCB7mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\uD835\uDD20\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\uD835\uDD54o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\uD835\uDCB8\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\uD835\uDD21ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\uD835\uDD55\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\uD835\uDCB9;\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\uD835\uDD22\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\uD835\uDD56\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\uD835\uDD23lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\uD835\uDD57\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\uD835\uDCBB\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\uD835\uDD24\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\uD835\uDD58\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\uD835\uDD25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\uD835\uDD59bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\uD835\uDCBDas\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\uD835\uDD26rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\uD835\uDD5Aa;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\uD835\uDCBEn\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\uD835\uDD27ath;\u4237pf;\uC000\uD835\uDD5B\u01E3\u23EC\0\u23F1r;\uC000\uD835\uDCBFrcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\uD835\uDD28reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\uD835\uDD5Ccr;\uC000\uD835\uDCC0\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\uD835\uDD29\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\uD835\uDD5Dus;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\uD835\uDCC1m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\uD835\uDD2Ao;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\uD835\uDD5E\u0100ct\u28F8\u28FDr;\uC000\uD835\uDCC2pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\uD835\uDD2B\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\uD835\uDD5F\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\uD835\uDCC3ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\uD835\uDD2C\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\uD835\uDD60\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\uD835\uDD2D\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\uD835\uDD61nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\uD835\uDCC5;\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\uD835\uDD2Epf;\uC000\uD835\uDD62rime;\u6057cr;\uC000\uD835\uDCC6\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\uD835\uDD2F\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\uD835\uDD63us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\uD835\uDCC7\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\uD835\uDD30\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\uD835\uDD64a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\uD835\uDCC8tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\uD835\uDD31\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\uD835\uDD65rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\uD835\uDCC9;\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\uD835\uDD32rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\uD835\uDD66\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\uD835\uDCCA\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\uD835\uDD33tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\uD835\uDD67ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\uD835\uDCCB\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\uD835\uDD34pf;\uC000\uD835\uDD68\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\uD835\uDCCC\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\uD835\uDD35\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\uD835\uDD69im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\uD835\uDCCD\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\uD835\uDD36cy;\u4457pf;\uC000\uD835\uDD6Acr;\uC000\uD835\uDCCE\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\uD835\uDD37cy;\u4436grarr;\u61DDpf;\uC000\uD835\uDD6Bcr;\uC000\uD835\uDCCF\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c) => c.charCodeAt(0)));

// node_modules/entities/lib/esm/generated/decode-data-xml.js
var decode_data_xml_default = new Uint16Array("\u0200aglq\t\x15\x18\x1B\u026D\x0F\0\0\x12p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c) => c.charCodeAt(0)));

// node_modules/entities/lib/esm/decode_codepoint.js
function replaceCodePoint(codePoint) {
  var _a;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a = decodeMap.get(codePoint)) !== null && _a !== undefined ? _a : codePoint;
}
var _a;
var decodeMap = new Map([
  [0, 65533],
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (_a = String.fromCodePoint) !== null && _a !== undefined ? _a : function(codePoint) {
  let output = "";
  if (codePoint > 65535) {
    codePoint -= 65536;
    output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
    codePoint = 56320 | codePoint & 1023;
  }
  output += String.fromCharCode(codePoint);
  return output;
};

// node_modules/entities/lib/esm/decode.js
var isNumber2 = function(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
};
var isHexadecimalCharacter = function(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
};
var isAsciiAlphaNumeric = function(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber2(code);
};
var isEntityInAttributeInvalidEnd = function(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
};
var getDecoder = function(decodeTree) {
  let ret = "";
  const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder.startEntity(decodeMode);
      const len = decoder.write(str, offset + 1);
      if (len < 0) {
        lastIndex = offset + decoder.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
};
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo = nodeIdx;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo = mid + 1;
    } else if (midVal > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));

class EntityDecoder {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber2(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber2(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  emitNumericEntity(lastCp, expectedLength) {
    var _a2;
    if (this.consumed <= expectedLength) {
      (_a2 = this.errors) === null || _a2 === undefined || _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (;offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var _a2;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a2 = this.errors) === null || _a2 === undefined || _a2.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  end() {
    var _a2;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a2 = this.errors) === null || _a2 === undefined || _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);

// node_modules/entities/lib/esm/escape.js
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match;
  while ((match = xmlReplacer.exec(str)) !== null) {
    const i = match.index;
    const char = str.charCodeAt(i);
    const next = xmlCodeMap.get(char);
    if (next !== undefined) {
      ret += str.substring(lastIdx, i) + next;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
var getEscaper = function(regex, map) {
  return function escape(data3) {
    let match;
    let lastIdx = 0;
    let result = "";
    while (match = regex.exec(data3)) {
      if (lastIdx !== match.index) {
        result += data3.substring(lastIdx, match.index);
      }
      result += map.get(match[0].charCodeAt(0));
      lastIdx = match.index + 1;
    }
    return result + data3.substring(lastIdx);
  };
};
var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
var escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));
// node_modules/entities/lib/esm/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// node_modules/dom-serializer/lib/esm/foreignNames.js
var elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((val) => [val.toLowerCase(), val]));
var attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((val) => [val.toLowerCase(), val]));

// node_modules/dom-serializer/lib/esm/index.js
var replaceQuotes = function(value) {
  return value.replace(/"/g, "&quot;");
};
var formatAttributes = function(attributes, opts) {
  var _a2;
  if (!attributes)
    return;
  const encode3 = ((_a2 = opts.encodeEntities) !== null && _a2 !== undefined ? _a2 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes).map((key) => {
    var _a3, _b;
    const value = (_a3 = attributes[key]) !== null && _a3 !== undefined ? _a3 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b = attributeNames.get(key)) !== null && _b !== undefined ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode3(value)}"`;
  }).join(" ");
};
function render(node4, options = {}) {
  const nodes = "length" in node4 ? node4 : [node4];
  let output = "";
  for (let i = 0;i < nodes.length; i++) {
    output += renderNode(nodes[i], options);
  }
  return output;
}
var renderNode = function(node4, options) {
  switch (node4.type) {
    case Root:
      return render(node4.children, options);
    case Doctype:
    case Directive:
      return renderDirective(node4);
    case Comment:
      return renderComment(node4);
    case CDATA:
      return renderCdata(node4);
    case Script:
    case Style:
    case Tag:
      return renderTag(node4, options);
    case Text:
      return renderText(node4, options);
  }
};
var renderTag = function(elem, opts) {
  var _a2;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a2 = elementNames.get(elem.name)) !== null && _a2 !== undefined ? _a2 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = { ...opts, xmlMode: false };
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = { ...opts, xmlMode: "foreign" };
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== false : opts.selfClosingTags && singleTag.has(elem.name))) {
    if (!opts.xmlMode)
      tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
};
var renderDirective = function(elem) {
  return `<${elem.data}>`;
};
var renderText = function(elem, opts) {
  var _a2;
  let data3 = elem.data || "";
  if (((_a2 = opts.encodeEntities) !== null && _a2 !== undefined ? _a2 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data3 = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data3) : escapeText(data3);
  }
  return data3;
};
var renderCdata = function(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
};
var renderComment = function(elem) {
  return `<!--${elem.data}-->`;
};
var unencodedElements = new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
var singleTag = new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var esm_default = render;
var foreignModeIntegrationPoints = new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
var foreignElements = new Set(["svg", "math"]);

// node_modules/domutils/lib/esm/stringify.js
function getOuterHTML(node4, options) {
  return esm_default(node4, options);
}
function getInnerHTML(node4, options) {
  return hasChildren(node4) ? node4.children.map((node5) => getOuterHTML(node5, options)).join("") : "";
}
function getText(node4) {
  if (Array.isArray(node4))
    return node4.map(getText).join("");
  if (isTag2(node4))
    return node4.name === "br" ? "\n" : getText(node4.children);
  if (isCDATA(node4))
    return getText(node4.children);
  if (isText(node4))
    return node4.data;
  return "";
}
function textContent(node4) {
  if (Array.isArray(node4))
    return node4.map(textContent).join("");
  if (hasChildren(node4) && !isComment(node4)) {
    return textContent(node4.children);
  }
  if (isText(node4))
    return node4.data;
  return "";
}
function innerText(node4) {
  if (Array.isArray(node4))
    return node4.map(innerText).join("");
  if (hasChildren(node4) && (node4.type === ElementType.Tag || isCDATA(node4))) {
    return innerText(node4.children);
  }
  if (isText(node4))
    return node4.data;
  return "";
}
// node_modules/domutils/lib/esm/traversal.js
function getChildren(elem) {
  return hasChildren(elem) ? elem.children : [];
}
function getParent(elem) {
  return elem.parent || null;
}
function getSiblings(elem) {
  const parent = getParent(elem);
  if (parent != null)
    return getChildren(parent);
  const siblings = [elem];
  let { prev, next } = elem;
  while (prev != null) {
    siblings.unshift(prev);
    ({ prev } = prev);
  }
  while (next != null) {
    siblings.push(next);
    ({ next } = next);
  }
  return siblings;
}
function getAttributeValue(elem, name) {
  var _a2;
  return (_a2 = elem.attribs) === null || _a2 === undefined ? undefined : _a2[name];
}
function hasAttrib(elem, name) {
  return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
function getName(elem) {
  return elem.name;
}
function nextElementSibling(elem) {
  let { next } = elem;
  while (next !== null && !isTag2(next))
    ({ next } = next);
  return next;
}
function prevElementSibling(elem) {
  let { prev } = elem;
  while (prev !== null && !isTag2(prev))
    ({ prev } = prev);
  return prev;
}
// node_modules/domutils/lib/esm/manipulation.js
function removeElement(elem) {
  if (elem.prev)
    elem.prev.next = elem.next;
  if (elem.next)
    elem.next.prev = elem.prev;
  if (elem.parent) {
    const childs = elem.parent.children;
    const childsIndex = childs.lastIndexOf(elem);
    if (childsIndex >= 0) {
      childs.splice(childsIndex, 1);
    }
  }
  elem.next = null;
  elem.prev = null;
  elem.parent = null;
}
function replaceElement(elem, replacement) {
  const prev = replacement.prev = elem.prev;
  if (prev) {
    prev.next = replacement;
  }
  const next = replacement.next = elem.next;
  if (next) {
    next.prev = replacement;
  }
  const parent = replacement.parent = elem.parent;
  if (parent) {
    const childs = parent.children;
    childs[childs.lastIndexOf(elem)] = replacement;
    elem.parent = null;
  }
}
function appendChild(parent, child) {
  removeElement(child);
  child.next = null;
  child.parent = parent;
  if (parent.children.push(child) > 1) {
    const sibling = parent.children[parent.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}
function append2(elem, next) {
  removeElement(next);
  const { parent } = elem;
  const currNext = elem.next;
  next.next = currNext;
  next.prev = elem;
  elem.next = next;
  next.parent = parent;
  if (currNext) {
    currNext.prev = next;
    if (parent) {
      const childs = parent.children;
      childs.splice(childs.lastIndexOf(currNext), 0, next);
    }
  } else if (parent) {
    parent.children.push(next);
  }
}
function prependChild(parent, child) {
  removeElement(child);
  child.parent = parent;
  child.prev = null;
  if (parent.children.unshift(child) !== 1) {
    const sibling = parent.children[1];
    sibling.prev = child;
    child.next = sibling;
  } else {
    child.next = null;
  }
}
function prepend(elem, prev) {
  removeElement(prev);
  const { parent } = elem;
  if (parent) {
    const childs = parent.children;
    childs.splice(childs.indexOf(elem), 0, prev);
  }
  if (elem.prev) {
    elem.prev.next = prev;
  }
  prev.parent = parent;
  prev.prev = elem.prev;
  prev.next = elem;
  elem.prev = prev;
}
// node_modules/domutils/lib/esm/querying.js
function filter2(test2, node4, recurse = true, limit = Infinity) {
  return find(test2, Array.isArray(node4) ? node4 : [node4], recurse, limit);
}
function find(test2, nodes, recurse, limit) {
  const result = [];
  const nodeStack = [nodes];
  const indexStack = [0];
  for (;; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (indexStack.length === 1) {
        return result;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (test2(elem)) {
      result.push(elem);
      if (--limit <= 0)
        return result;
    }
    if (recurse && hasChildren(elem) && elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
function findOneChild(test2, nodes) {
  return nodes.find(test2);
}
function findOne(test2, nodes, recurse = true) {
  let elem = null;
  for (let i = 0;i < nodes.length && !elem; i++) {
    const node4 = nodes[i];
    if (!isTag2(node4)) {
      continue;
    } else if (test2(node4)) {
      elem = node4;
    } else if (recurse && node4.children.length > 0) {
      elem = findOne(test2, node4.children, true);
    }
  }
  return elem;
}
function existsOne(test2, nodes) {
  return nodes.some((checked) => isTag2(checked) && (test2(checked) || existsOne(test2, checked.children)));
}
function findAll(test2, nodes) {
  const result = [];
  const nodeStack = [nodes];
  const indexStack = [0];
  for (;; ) {
    if (indexStack[0] >= nodeStack[0].length) {
      if (nodeStack.length === 1) {
        return result;
      }
      nodeStack.shift();
      indexStack.shift();
      continue;
    }
    const elem = nodeStack[0][indexStack[0]++];
    if (!isTag2(elem))
      continue;
    if (test2(elem))
      result.push(elem);
    if (elem.children.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.children);
    }
  }
}
// node_modules/domutils/lib/esm/legacy.js
var getAttribCheck = function(attrib, value) {
  if (typeof value === "function") {
    return (elem) => isTag2(elem) && value(elem.attribs[attrib]);
  }
  return (elem) => isTag2(elem) && elem.attribs[attrib] === value;
};
var combineFuncs = function(a, b) {
  return (elem) => a(elem) || b(elem);
};
var compileTest = function(options) {
  const funcs = Object.keys(options).map((key) => {
    const value = options[key];
    return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
  });
  return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
};
function testElement(options, node4) {
  const test2 = compileTest(options);
  return test2 ? test2(node4) : true;
}
function getElements(options, nodes, recurse, limit = Infinity) {
  const test2 = compileTest(options);
  return test2 ? filter2(test2, nodes, recurse, limit) : [];
}
function getElementById(id, nodes, recurse = true) {
  if (!Array.isArray(nodes))
    nodes = [nodes];
  return findOne(getAttribCheck("id", id), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
  return filter2(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
  return filter2(Checks["tag_type"](type), nodes, recurse, limit);
}
var Checks = {
  tag_name(name) {
    if (typeof name === "function") {
      return (elem) => isTag2(elem) && name(elem.name);
    } else if (name === "*") {
      return isTag2;
    }
    return (elem) => isTag2(elem) && elem.name === name;
  },
  tag_type(type) {
    if (typeof type === "function") {
      return (elem) => type(elem.type);
    }
    return (elem) => elem.type === type;
  },
  tag_contains(data3) {
    if (typeof data3 === "function") {
      return (elem) => isText(elem) && data3(elem.data);
    }
    return (elem) => isText(elem) && elem.data === data3;
  }
};
// node_modules/domutils/lib/esm/helpers.js
function removeSubsets(nodes) {
  let idx = nodes.length;
  while (--idx >= 0) {
    const node4 = nodes[idx];
    if (idx > 0 && nodes.lastIndexOf(node4, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }
    for (let ancestor = node4.parent;ancestor; ancestor = ancestor.parent) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }
  return nodes;
}
function compareDocumentPosition(nodeA, nodeB) {
  const aParents = [];
  const bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
  while (current) {
    aParents.unshift(current);
    current = current.parent;
  }
  current = hasChildren(nodeB) ? nodeB : nodeB.parent;
  while (current) {
    bParents.unshift(current);
    current = current.parent;
  }
  const maxIdx = Math.min(aParents.length, bParents.length);
  let idx = 0;
  while (idx < maxIdx && aParents[idx] === bParents[idx]) {
    idx++;
  }
  if (idx === 0) {
    return DocumentPosition.DISCONNECTED;
  }
  const sharedParent = aParents[idx - 1];
  const siblings = sharedParent.children;
  const aSibling = aParents[idx];
  const bSibling = bParents[idx];
  if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
    }
    return DocumentPosition.FOLLOWING;
  }
  if (sharedParent === nodeA) {
    return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
  }
  return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
  nodes = nodes.filter((node4, i, arr) => !arr.includes(node4, i + 1));
  nodes.sort((a, b) => {
    const relative = compareDocumentPosition(a, b);
    if (relative & DocumentPosition.PRECEDING) {
      return -1;
    } else if (relative & DocumentPosition.FOLLOWING) {
      return 1;
    }
    return 0;
  });
  return nodes;
}
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
// node_modules/domutils/lib/esm/feeds.js
function getFeed(doc) {
  const feedRoot = getOneElement(isValidFeed, doc);
  return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
var getAtomFeed = function(feedRoot) {
  var _a2;
  const childs = feedRoot.children;
  const feed = {
    type: "atom",
    items: getElementsByTagName("entry", childs).map((item) => {
      var _a3;
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "id", children);
      addConditionally(entry, "title", "title", children);
      const href2 = (_a3 = getOneElement("link", children)) === null || _a3 === undefined ? undefined : _a3.attribs["href"];
      if (href2) {
        entry.link = href2;
      }
      const description = fetch3("summary", children) || fetch3("content", children);
      if (description) {
        entry.description = description;
      }
      const pubDate = fetch3("updated", children);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  const href = (_a2 = getOneElement("link", childs)) === null || _a2 === undefined ? undefined : _a2.attribs["href"];
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  const updated = fetch3("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
};
var getRssFeed = function(feedRoot) {
  var _a2, _b;
  const childs = (_b = (_a2 = getOneElement("channel", feedRoot.children)) === null || _a2 === undefined ? undefined : _a2.children) !== null && _b !== undefined ? _b : [];
  const feed = {
    type: feedRoot.name.substr(0, 3),
    id: "",
    items: getElementsByTagName("item", feedRoot.children).map((item) => {
      const { children } = item;
      const entry = { media: getMediaElements(children) };
      addConditionally(entry, "id", "guid", children);
      addConditionally(entry, "title", "title", children);
      addConditionally(entry, "link", "link", children);
      addConditionally(entry, "description", "description", children);
      const pubDate = fetch3("pubDate", children) || fetch3("dc:date", children);
      if (pubDate)
        entry.pubDate = new Date(pubDate);
      return entry;
    })
  };
  addConditionally(feed, "title", "title", childs);
  addConditionally(feed, "link", "link", childs);
  addConditionally(feed, "description", "description", childs);
  const updated = fetch3("lastBuildDate", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "managingEditor", childs, true);
  return feed;
};
var getMediaElements = function(where) {
  return getElementsByTagName("media:content", where).map((elem) => {
    const { attribs } = elem;
    const media = {
      medium: attribs["medium"],
      isDefault: !!attribs["isDefault"]
    };
    for (const attrib of MEDIA_KEYS_STRING) {
      if (attribs[attrib]) {
        media[attrib] = attribs[attrib];
      }
    }
    for (const attrib of MEDIA_KEYS_INT) {
      if (attribs[attrib]) {
        media[attrib] = parseInt(attribs[attrib], 10);
      }
    }
    if (attribs["expression"]) {
      media.expression = attribs["expression"];
    }
    return media;
  });
};
var getOneElement = function(tagName, node4) {
  return getElementsByTagName(tagName, node4, true, 1)[0];
};
var fetch3 = function(tagName, where, recurse = false) {
  return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
};
var addConditionally = function(obj, prop, tagName, where, recurse = false) {
  const val = fetch3(tagName, where, recurse);
  if (val)
    obj[prop] = val;
};
var isValidFeed = function(value) {
  return value === "rss" || value === "feed" || value === "rdf:RDF";
};
var MEDIA_KEYS_STRING = ["url", "type", "lang"];
var MEDIA_KEYS_INT = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
// node_modules/cheerio/dist/browser/options.js
function flattenOptions(options, baseOptions) {
  if (!options) {
    return baseOptions !== null && baseOptions !== undefined ? baseOptions : defaultOpts2;
  }
  const opts = {
    _useHtmlParser2: !!options.xmlMode,
    ...baseOptions,
    ...options
  };
  if (options.xml) {
    opts._useHtmlParser2 = true;
    opts.xmlMode = true;
    if (options.xml !== true) {
      Object.assign(opts, options.xml);
    }
  } else if (options.xmlMode) {
    opts._useHtmlParser2 = true;
  }
  return opts;
}
var defaultOpts2 = {
  _useHtmlParser2: false
};

// node_modules/cheerio/dist/browser/static.js
var render2 = function(that, dom, options2) {
  if (!that)
    return "";
  return that(dom !== null && dom !== undefined ? dom : that._root.children, null, undefined, options2).toString();
};
var isOptions = function(dom, options2) {
  return !options2 && typeof dom === "object" && dom != null && !("length" in dom) && !("type" in dom);
};
function html(dom, options2) {
  const toRender = isOptions(dom) ? (options2 = dom, undefined) : dom;
  const opts = {
    ...this === null || this === undefined ? undefined : this._options,
    ...flattenOptions(options2)
  };
  return render2(this, toRender, opts);
}
function xml(dom) {
  const options2 = { ...this._options, xmlMode: true };
  return render2(this, dom, options2);
}
function text(elements) {
  const elems = elements !== null && elements !== undefined ? elements : this ? this.root() : [];
  let ret = "";
  for (let i = 0;i < elems.length; i++) {
    ret += textContent(elems[i]);
  }
  return ret;
}
function parseHTML(data3, context, keepScripts = typeof context === "boolean" ? context : false) {
  if (!data3 || typeof data3 !== "string") {
    return null;
  }
  if (typeof context === "boolean") {
    keepScripts = context;
  }
  const parsed = this.load(data3, this._options, false);
  if (!keepScripts) {
    parsed("script").remove();
  }
  return [...parsed.root()[0].children];
}
function root() {
  return this(this._root);
}
function contains(container, contained) {
  if (contained === container) {
    return false;
  }
  let next = contained;
  while (next && next !== next.parent) {
    next = next.parent;
    if (next === container) {
      return true;
    }
  }
  return false;
}
function extract(map) {
  return this.root().extract(map);
}
function merge2(arr1, arr2) {
  if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
    return;
  }
  let newLength = arr1.length;
  const len = +arr2.length;
  for (let i = 0;i < len; i++) {
    arr1[newLength++] = arr2[i];
  }
  arr1.length = newLength;
  return arr1;
}
var isArrayLike = function(item) {
  if (Array.isArray(item)) {
    return true;
  }
  if (typeof item !== "object" || item === null || !("length" in item) || typeof item.length !== "number" || item.length < 0) {
    return false;
  }
  for (let i = 0;i < item.length; i++) {
    if (!(i in item)) {
      return false;
    }
  }
  return true;
};
// node_modules/cheerio/dist/browser/api/attributes.js
var exports_attributes = {};
__export(exports_attributes, {
  val: () => {
    {
      return val;
    }
  },
  toggleClass: () => {
    {
      return toggleClass;
    }
  },
  removeClass: () => {
    {
      return removeClass;
    }
  },
  removeAttr: () => {
    {
      return removeAttr;
    }
  },
  prop: () => {
    {
      return prop;
    }
  },
  hasClass: () => {
    {
      return hasClass;
    }
  },
  data: () => {
    {
      return data3;
    }
  },
  attr: () => {
    {
      return attr;
    }
  },
  addClass: () => {
    {
      return addClass;
    }
  }
});

// node_modules/cheerio/dist/browser/utils.js
function isCheerio(maybeCheerio) {
  return maybeCheerio.cheerio != null;
}
function camelCase(str) {
  return str.replace(/[._-](\w|$)/g, (_, x) => x.toUpperCase());
}
function cssCase(str) {
  return str.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function domEach(array, fn) {
  const len = array.length;
  for (let i = 0;i < len; i++)
    fn(array[i], i);
  return array;
}
function isHtml(str) {
  const tagStart = str.indexOf("<");
  if (tagStart < 0 || tagStart > str.length - 3)
    return false;
  const tagChar = str.charCodeAt(tagStart + 1);
  return (tagChar >= CharacterCodes.LowerA && tagChar <= CharacterCodes.LowerZ || tagChar >= CharacterCodes.UpperA && tagChar <= CharacterCodes.UpperZ || tagChar === CharacterCodes.Exclamation) && str.includes(">", tagStart + 2);
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["LowerA"] = 97] = "LowerA";
  CharacterCodes2[CharacterCodes2["LowerZ"] = 122] = "LowerZ";
  CharacterCodes2[CharacterCodes2["UpperA"] = 65] = "UpperA";
  CharacterCodes2[CharacterCodes2["UpperZ"] = 90] = "UpperZ";
  CharacterCodes2[CharacterCodes2["Exclamation"] = 33] = "Exclamation";
})(CharacterCodes || (CharacterCodes = {}));

// node_modules/cheerio/dist/browser/api/attributes.js
var getAttr = function(elem, name, xmlMode) {
  var _a2;
  if (!elem || !isTag2(elem))
    return;
  (_a2 = elem.attribs) !== null && _a2 !== undefined || (elem.attribs = {});
  if (!name) {
    return elem.attribs;
  }
  if (hasOwn.call(elem.attribs, name)) {
    return !xmlMode && rboolean.test(name) ? name : elem.attribs[name];
  }
  if (elem.name === "option" && name === "value") {
    return text(elem.children);
  }
  if (elem.name === "input" && (elem.attribs["type"] === "radio" || elem.attribs["type"] === "checkbox") && name === "value") {
    return "on";
  }
  return;
};
var setAttr = function(el, name, value) {
  if (value === null) {
    removeAttribute(el, name);
  } else {
    el.attribs[name] = `${value}`;
  }
};
function attr(name, value) {
  if (typeof name === "object" || value !== undefined) {
    if (typeof value === "function") {
      if (typeof name !== "string") {
        {
          throw new Error("Bad combination of arguments.");
        }
      }
      return domEach(this, (el, i) => {
        if (isTag2(el))
          setAttr(el, name, value.call(el, i, el.attribs[name]));
      });
    }
    return domEach(this, (el) => {
      if (!isTag2(el))
        return;
      if (typeof name === "object") {
        for (const objName of Object.keys(name)) {
          const objValue = name[objName];
          setAttr(el, objName, objValue);
        }
      } else {
        setAttr(el, name, value);
      }
    });
  }
  return arguments.length > 1 ? this : getAttr(this[0], name, this.options.xmlMode);
}
var getProp = function(el, name, xmlMode) {
  return name in el ? el[name] : !xmlMode && rboolean.test(name) ? getAttr(el, name, false) !== undefined : getAttr(el, name, xmlMode);
};
var setProp = function(el, name, value, xmlMode) {
  if (name in el) {
    el[name] = value;
  } else {
    setAttr(el, name, !xmlMode && rboolean.test(name) ? value ? "" : null : `${value}`);
  }
};
function prop(name, value) {
  var _a2;
  if (typeof name === "string" && value === undefined) {
    const el = this[0];
    if (!el || !isTag2(el))
      return;
    switch (name) {
      case "style": {
        const property = this.css();
        const keys = Object.keys(property);
        for (let i = 0;i < keys.length; i++) {
          property[i] = keys[i];
        }
        property.length = keys.length;
        return property;
      }
      case "tagName":
      case "nodeName": {
        return el.name.toUpperCase();
      }
      case "href":
      case "src": {
        const prop2 = (_a2 = el.attribs) === null || _a2 === undefined ? undefined : _a2[name];
        if (typeof URL !== "undefined" && (name === "href" && (el.tagName === "a" || el.tagName === "link") || name === "src" && (el.tagName === "img" || el.tagName === "iframe" || el.tagName === "audio" || el.tagName === "video" || el.tagName === "source")) && prop2 !== undefined && this.options.baseURI) {
          return new URL(prop2, this.options.baseURI).href;
        }
        return prop2;
      }
      case "innerText": {
        return innerText(el);
      }
      case "textContent": {
        return textContent(el);
      }
      case "outerHTML": {
        return this.clone().wrap("<container />").parent().html();
      }
      case "innerHTML": {
        return this.html();
      }
      default: {
        return getProp(el, name, this.options.xmlMode);
      }
    }
  }
  if (typeof name === "object" || value !== undefined) {
    if (typeof value === "function") {
      if (typeof name === "object") {
        throw new TypeError("Bad combination of arguments.");
      }
      return domEach(this, (el, i) => {
        if (isTag2(el)) {
          setProp(el, name, value.call(el, i, getProp(el, name, this.options.xmlMode)), this.options.xmlMode);
        }
      });
    }
    return domEach(this, (el) => {
      if (!isTag2(el))
        return;
      if (typeof name === "object") {
        for (const key of Object.keys(name)) {
          const val = name[key];
          setProp(el, key, val, this.options.xmlMode);
        }
      } else {
        setProp(el, name, value, this.options.xmlMode);
      }
    });
  }
  return;
}
var setData = function(elem, name, value) {
  var _a2;
  (_a2 = elem.data) !== null && _a2 !== undefined || (elem.data = {});
  if (typeof name === "object")
    Object.assign(elem.data, name);
  else if (typeof name === "string" && value !== undefined) {
    elem.data[name] = value;
  }
};
var readAllData = function(el) {
  for (const domName of Object.keys(el.attribs)) {
    if (!domName.startsWith(dataAttrPrefix)) {
      continue;
    }
    const jsName = camelCase(domName.slice(dataAttrPrefix.length));
    if (!hasOwn.call(el.data, jsName)) {
      el.data[jsName] = parseDataValue(el.attribs[domName]);
    }
  }
  return el.data;
};
var readData = function(el, name) {
  const domName = dataAttrPrefix + cssCase(name);
  const data3 = el.data;
  if (hasOwn.call(data3, name)) {
    return data3[name];
  }
  if (hasOwn.call(el.attribs, domName)) {
    return data3[name] = parseDataValue(el.attribs[domName]);
  }
  return;
};
var parseDataValue = function(value) {
  if (value === "null")
    return null;
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  const num = Number(value);
  if (value === String(num))
    return num;
  if (rbrace.test(value)) {
    try {
      return JSON.parse(value);
    } catch {
    }
  }
  return value;
};
function data3(name, value) {
  var _a2;
  const elem = this[0];
  if (!elem || !isTag2(elem))
    return;
  const dataEl = elem;
  (_a2 = dataEl.data) !== null && _a2 !== undefined || (dataEl.data = {});
  if (name == null) {
    return readAllData(dataEl);
  }
  if (typeof name === "object" || value !== undefined) {
    domEach(this, (el) => {
      if (isTag2(el)) {
        if (typeof name === "object")
          setData(el, name);
        else
          setData(el, name, value);
      }
    });
    return this;
  }
  return readData(dataEl, name);
}
function val(value) {
  const querying3 = arguments.length === 0;
  const element = this[0];
  if (!element || !isTag2(element))
    return querying3 ? undefined : this;
  switch (element.name) {
    case "textarea": {
      return this.text(value);
    }
    case "select": {
      const option = this.find("option:selected");
      if (!querying3) {
        if (this.attr("multiple") == null && typeof value === "object") {
          return this;
        }
        this.find("option").removeAttr("selected");
        const values = typeof value === "object" ? value : [value];
        for (const val2 of values) {
          this.find(`option[value="${val2}"]`).attr("selected", "");
        }
        return this;
      }
      return this.attr("multiple") ? option.toArray().map((el) => text(el.children)) : option.attr("value");
    }
    case "input":
    case "option": {
      return querying3 ? this.attr("value") : this.attr("value", value);
    }
  }
  return;
}
var removeAttribute = function(elem, name) {
  if (!elem.attribs || !hasOwn.call(elem.attribs, name))
    return;
  delete elem.attribs[name];
};
var splitNames = function(names) {
  return names ? names.trim().split(rspace) : [];
};
function removeAttr(name) {
  const attrNames = splitNames(name);
  for (const attrName of attrNames) {
    domEach(this, (elem) => {
      if (isTag2(elem))
        removeAttribute(elem, attrName);
    });
  }
  return this;
}
function hasClass(className) {
  return this.toArray().some((elem) => {
    const clazz = isTag2(elem) && elem.attribs["class"];
    let idx = -1;
    if (clazz && className.length > 0) {
      while ((idx = clazz.indexOf(className, idx + 1)) > -1) {
        const end = idx + className.length;
        if ((idx === 0 || rspace.test(clazz[idx - 1])) && (end === clazz.length || rspace.test(clazz[end]))) {
          return true;
        }
      }
    }
    return false;
  });
}
function addClass(value) {
  if (typeof value === "function") {
    return domEach(this, (el, i) => {
      if (isTag2(el)) {
        const className = el.attribs["class"] || "";
        addClass.call([el], value.call(el, i, className));
      }
    });
  }
  if (!value || typeof value !== "string")
    return this;
  const classNames = value.split(rspace);
  const numElements = this.length;
  for (let i = 0;i < numElements; i++) {
    const el = this[i];
    if (!isTag2(el))
      continue;
    const className = getAttr(el, "class", false);
    if (className) {
      let setClass = ` ${className} `;
      for (const cn of classNames) {
        const appendClass = `${cn} `;
        if (!setClass.includes(` ${appendClass}`))
          setClass += appendClass;
      }
      setAttr(el, "class", setClass.trim());
    } else {
      setAttr(el, "class", classNames.join(" ").trim());
    }
  }
  return this;
}
function removeClass(name) {
  if (typeof name === "function") {
    return domEach(this, (el, i) => {
      if (isTag2(el)) {
        removeClass.call([el], name.call(el, i, el.attribs["class"] || ""));
      }
    });
  }
  const classes = splitNames(name);
  const numClasses = classes.length;
  const removeAll = arguments.length === 0;
  return domEach(this, (el) => {
    if (!isTag2(el))
      return;
    if (removeAll) {
      el.attribs["class"] = "";
    } else {
      const elClasses = splitNames(el.attribs["class"]);
      let changed = false;
      for (let j = 0;j < numClasses; j++) {
        const index = elClasses.indexOf(classes[j]);
        if (index >= 0) {
          elClasses.splice(index, 1);
          changed = true;
          j--;
        }
      }
      if (changed) {
        el.attribs["class"] = elClasses.join(" ");
      }
    }
  });
}
function toggleClass(value, stateVal) {
  if (typeof value === "function") {
    return domEach(this, (el, i) => {
      if (isTag2(el)) {
        toggleClass.call([el], value.call(el, i, el.attribs["class"] || "", stateVal), stateVal);
      }
    });
  }
  if (!value || typeof value !== "string")
    return this;
  const classNames = value.split(rspace);
  const numClasses = classNames.length;
  const state = typeof stateVal === "boolean" ? stateVal ? 1 : -1 : 0;
  const numElements = this.length;
  for (let i = 0;i < numElements; i++) {
    const el = this[i];
    if (!isTag2(el))
      continue;
    const elementClasses = splitNames(el.attribs["class"]);
    for (let j = 0;j < numClasses; j++) {
      const index = elementClasses.indexOf(classNames[j]);
      if (state >= 0 && index < 0) {
        elementClasses.push(classNames[j]);
      } else if (state <= 0 && index >= 0) {
        elementClasses.splice(index, 1);
      }
    }
    el.attribs["class"] = elementClasses.join(" ");
  }
  return this;
}
var hasOwn = Object.prototype.hasOwnProperty;
var rspace = /\s+/;
var dataAttrPrefix = "data-";
var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
var rbrace = /^{[^]*}$|^\[[^]*]$/;

// node_modules/cheerio/dist/browser/api/traversing.js
var exports_traversing = {};
__export(exports_traversing, {
  toArray: () => {
    {
      return toArray2;
    }
  },
  slice: () => {
    {
      return slice;
    }
  },
  siblings: () => {
    {
      return siblings;
    }
  },
  prevUntil: () => {
    {
      return prevUntil;
    }
  },
  prevAll: () => {
    {
      return prevAll;
    }
  },
  prev: () => {
    {
      return prev;
    }
  },
  parentsUntil: () => {
    {
      return parentsUntil;
    }
  },
  parents: () => {
    {
      return parents;
    }
  },
  parent: () => {
    {
      return parent;
    }
  },
  not: () => {
    {
      return not;
    }
  },
  nextUntil: () => {
    {
      return nextUntil;
    }
  },
  nextAll: () => {
    {
      return nextAll;
    }
  },
  next: () => {
    {
      return next;
    }
  },
  map: () => {
    {
      return map;
    }
  },
  last: () => {
    {
      return last;
    }
  },
  is: () => {
    {
      return is3;
    }
  },
  index: () => {
    {
      return index;
    }
  },
  has: () => {
    {
      return has;
    }
  },
  get: () => {
    {
      return get;
    }
  },
  first: () => {
    {
      return first;
    }
  },
  find: () => {
    {
      return find3;
    }
  },
  filterArray: () => {
    {
      return filterArray;
    }
  },
  filter: () => {
    {
      return filter4;
    }
  },
  eq: () => {
    {
      return eq;
    }
  },
  end: () => {
    {
      return end;
    }
  },
  each: () => {
    {
      return each;
    }
  },
  contents: () => {
    {
      return contents;
    }
  },
  closest: () => {
    {
      return closest;
    }
  },
  children: () => {
    {
      return children;
    }
  },
  addBack: () => {
    {
      return addBack;
    }
  },
  add: () => {
    {
      return add;
    }
  },
  _findBySelector: () => {
    {
      return _findBySelector;
    }
  }
});

// node_modules/css-what/lib/es/types.js
var SelectorType;
(function(SelectorType2) {
  SelectorType2["Attribute"] = "attribute";
  SelectorType2["Pseudo"] = "pseudo";
  SelectorType2["PseudoElement"] = "pseudo-element";
  SelectorType2["Tag"] = "tag";
  SelectorType2["Universal"] = "universal";
  SelectorType2["Adjacent"] = "adjacent";
  SelectorType2["Child"] = "child";
  SelectorType2["Descendant"] = "descendant";
  SelectorType2["Parent"] = "parent";
  SelectorType2["Sibling"] = "sibling";
  SelectorType2["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
var AttributeAction;
(function(AttributeAction2) {
  AttributeAction2["Any"] = "any";
  AttributeAction2["Element"] = "element";
  AttributeAction2["End"] = "end";
  AttributeAction2["Equals"] = "equals";
  AttributeAction2["Exists"] = "exists";
  AttributeAction2["Hyphen"] = "hyphen";
  AttributeAction2["Not"] = "not";
  AttributeAction2["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));
// node_modules/css-what/lib/es/parse.js
function isTraversal(selector) {
  switch (selector.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator:
      return true;
    default:
      return false;
  }
}
var funescape = function(_, escaped, escapedWhitespace) {
  const high = parseInt(escaped, 16) - 65536;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
};
var unescapeCSS = function(str) {
  return str.replace(reEscape, funescape);
};
var isQuote = function(c) {
  return c === 39 || c === 34;
};
var isWhitespace = function(c) {
  return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
};
function parse(selector) {
  const subselects = [];
  const endIndex = parseSelector(subselects, `${selector}`, 0);
  if (endIndex < selector.length) {
    throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
  }
  return subselects;
}
var parseSelector = function(subselects, selector, selectorIndex) {
  let tokens = [];
  function getName2(offset) {
    const match = selector.slice(selectorIndex + offset).match(reName);
    if (!match) {
      throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
    }
    const [name] = match;
    selectorIndex += offset + name.length;
    return unescapeCSS(name);
  }
  function stripWhitespace(offset) {
    selectorIndex += offset;
    while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) {
      selectorIndex++;
    }
  }
  function readValueWithParenthesis() {
    selectorIndex += 1;
    const start = selectorIndex;
    let counter = 1;
    for (;counter > 0 && selectorIndex < selector.length; selectorIndex++) {
      if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
        counter++;
      } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
        counter--;
      }
    }
    if (counter) {
      throw new Error("Parenthesis not matched");
    }
    return unescapeCSS(selector.slice(start, selectorIndex - 1));
  }
  function isEscaped(pos) {
    let slashCount = 0;
    while (selector.charCodeAt(--pos) === 92)
      slashCount++;
    return (slashCount & 1) === 1;
  }
  function ensureNotTraversal() {
    if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
      throw new Error("Did not expect successive traversals.");
    }
  }
  function addTraversal(type) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens[tokens.length - 1].type = type;
      return;
    }
    ensureNotTraversal();
    tokens.push({ type });
  }
  function addSpecialAttribute(name, action) {
    tokens.push({
      type: SelectorType.Attribute,
      name,
      action,
      value: getName2(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function finalizeSubselector() {
    if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens.pop();
    }
    if (tokens.length === 0) {
      throw new Error("Empty sub-selector");
    }
    subselects.push(tokens);
  }
  stripWhitespace(0);
  if (selector.length === selectorIndex) {
    return selectorIndex;
  }
  loop:
    while (selectorIndex < selector.length) {
      const firstChar = selector.charCodeAt(selectorIndex);
      switch (firstChar) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
            ensureNotTraversal();
            tokens.push({ type: SelectorType.Descendant });
          }
          stripWhitespace(1);
          break;
        }
        case 62: {
          addTraversal(SelectorType.Child);
          stripWhitespace(1);
          break;
        }
        case 60: {
          addTraversal(SelectorType.Parent);
          stripWhitespace(1);
          break;
        }
        case 126: {
          addTraversal(SelectorType.Sibling);
          stripWhitespace(1);
          break;
        }
        case 43: {
          addTraversal(SelectorType.Adjacent);
          stripWhitespace(1);
          break;
        }
        case 46: {
          addSpecialAttribute("class", AttributeAction.Element);
          break;
        }
        case 35: {
          addSpecialAttribute("id", AttributeAction.Equals);
          break;
        }
        case 91: {
          stripWhitespace(1);
          let name;
          let namespace = null;
          if (selector.charCodeAt(selectorIndex) === 124) {
            name = getName2(1);
          } else if (selector.startsWith("*|", selectorIndex)) {
            namespace = "*";
            name = getName2(2);
          } else {
            name = getName2(0);
            if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
              namespace = name;
              name = getName2(1);
            }
          }
          stripWhitespace(0);
          let action = AttributeAction.Exists;
          const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
          if (possibleAction) {
            action = possibleAction;
            if (selector.charCodeAt(selectorIndex + 1) !== 61) {
              throw new Error("Expected `=`");
            }
            stripWhitespace(2);
          } else if (selector.charCodeAt(selectorIndex) === 61) {
            action = AttributeAction.Equals;
            stripWhitespace(1);
          }
          let value = "";
          let ignoreCase = null;
          if (action !== "exists") {
            if (isQuote(selector.charCodeAt(selectorIndex))) {
              const quote = selector.charCodeAt(selectorIndex);
              let sectionEnd = selectorIndex + 1;
              while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                sectionEnd += 1;
              }
              if (selector.charCodeAt(sectionEnd) !== quote) {
                throw new Error("Attribute value didn't end");
              }
              value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
              selectorIndex = sectionEnd + 1;
            } else {
              const valueStart = selectorIndex;
              while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
                selectorIndex += 1;
              }
              value = unescapeCSS(selector.slice(valueStart, selectorIndex));
            }
            stripWhitespace(0);
            const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
            if (forceIgnore === 115) {
              ignoreCase = false;
              stripWhitespace(1);
            } else if (forceIgnore === 105) {
              ignoreCase = true;
              stripWhitespace(1);
            }
          }
          if (selector.charCodeAt(selectorIndex) !== 93) {
            throw new Error("Attribute selector didn't terminate");
          }
          selectorIndex += 1;
          const attributeSelector = {
            type: SelectorType.Attribute,
            name,
            action,
            value,
            namespace,
            ignoreCase
          };
          tokens.push(attributeSelector);
          break;
        }
        case 58: {
          if (selector.charCodeAt(selectorIndex + 1) === 58) {
            tokens.push({
              type: SelectorType.PseudoElement,
              name: getName2(2).toLowerCase(),
              data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
            });
            continue;
          }
          const name = getName2(1).toLowerCase();
          let data4 = null;
          if (selector.charCodeAt(selectorIndex) === 40) {
            if (unpackPseudos.has(name)) {
              if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
                throw new Error(`Pseudo-selector ${name} cannot be quoted`);
              }
              data4 = [];
              selectorIndex = parseSelector(data4, selector, selectorIndex + 1);
              if (selector.charCodeAt(selectorIndex) !== 41) {
                throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
              }
              selectorIndex += 1;
            } else {
              data4 = readValueWithParenthesis();
              if (stripQuotesFromPseudos.has(name)) {
                const quot = data4.charCodeAt(0);
                if (quot === data4.charCodeAt(data4.length - 1) && isQuote(quot)) {
                  data4 = data4.slice(1, -1);
                }
              }
              data4 = unescapeCSS(data4);
            }
          }
          tokens.push({ type: SelectorType.Pseudo, name, data: data4 });
          break;
        }
        case 44: {
          finalizeSubselector();
          tokens = [];
          stripWhitespace(1);
          break;
        }
        default: {
          if (selector.startsWith("/*", selectorIndex)) {
            const endIndex = selector.indexOf("*/", selectorIndex + 2);
            if (endIndex < 0) {
              throw new Error("Comment was not terminated");
            }
            selectorIndex = endIndex + 2;
            if (tokens.length === 0) {
              stripWhitespace(0);
            }
            break;
          }
          let namespace = null;
          let name;
          if (firstChar === 42) {
            selectorIndex += 1;
            name = "*";
          } else if (firstChar === 124) {
            name = "";
            if (selector.charCodeAt(selectorIndex + 1) === 124) {
              addTraversal(SelectorType.ColumnCombinator);
              stripWhitespace(2);
              break;
            }
          } else if (reName.test(selector.slice(selectorIndex))) {
            name = getName2(0);
          } else {
            break loop;
          }
          if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
            namespace = name;
            if (selector.charCodeAt(selectorIndex + 1) === 42) {
              name = "*";
              selectorIndex += 2;
            } else {
              name = getName2(1);
            }
          }
          tokens.push(name === "*" ? { type: SelectorType.Universal, namespace } : { type: SelectorType.Tag, name, namespace });
        }
      }
    }
  finalizeSubselector();
  return selectorIndex;
};
var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var actionTypes = new Map([
  [126, AttributeAction.Element],
  [94, AttributeAction.Start],
  [36, AttributeAction.End],
  [42, AttributeAction.Any],
  [33, AttributeAction.Not],
  [124, AttributeAction.Hyphen]
]);
var unpackPseudos = new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
var stripQuotesFromPseudos = new Set(["contains", "icontains"]);
// node_modules/css-select/lib/esm/index.js
var import_boolbase6 = __toESM(require_boolbase(), 1);

// node_modules/css-select/lib/esm/compile.js
var import_boolbase5 = __toESM(require_boolbase(), 1);

// node_modules/css-select/lib/esm/sort.js
function isTraversal2(token) {
  return !procedure.has(token.type);
}
var getProcedure = function(token) {
  var _a2, _b;
  let proc = (_a2 = procedure.get(token.type)) !== null && _a2 !== undefined ? _a2 : -1;
  if (token.type === SelectorType.Attribute) {
    proc = (_b = attributes.get(token.action)) !== null && _b !== undefined ? _b : 4;
    if (token.action === AttributeAction.Equals && token.name === "id") {
      proc = 9;
    }
    if (token.ignoreCase) {
      proc >>= 1;
    }
  } else if (token.type === SelectorType.Pseudo) {
    if (!token.data) {
      proc = 3;
    } else if (token.name === "has" || token.name === "contains") {
      proc = 0;
    } else if (Array.isArray(token.data)) {
      proc = Math.min(...token.data.map((d) => Math.min(...d.map(getProcedure))));
      if (proc < 0) {
        proc = 0;
      }
    } else {
      proc = 2;
    }
  }
  return proc;
};
var procedure = new Map([
  [SelectorType.Universal, 50],
  [SelectorType.Tag, 30],
  [SelectorType.Attribute, 1],
  [SelectorType.Pseudo, 0]
]);
var attributes = new Map([
  [AttributeAction.Exists, 10],
  [AttributeAction.Equals, 8],
  [AttributeAction.Not, 7],
  [AttributeAction.Start, 6],
  [AttributeAction.End, 6],
  [AttributeAction.Any, 5]
]);
function sortByProcedure(arr) {
  const procs = arr.map(getProcedure);
  for (let i = 1;i < arr.length; i++) {
    const procNew = procs[i];
    if (procNew < 0)
      continue;
    for (let j = i - 1;j >= 0 && procNew < procs[j]; j--) {
      const token = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = token;
      procs[j + 1] = procs[j];
      procs[j] = procNew;
    }
  }
}

// node_modules/css-select/lib/esm/attributes.js
var import_boolbase = __toESM(require_boolbase(), 1);
var escapeRegex = function(value) {
  return value.replace(reChars, "\\$&");
};
var shouldIgnoreCase = function(selector, options2) {
  return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options2.quirksMode : !options2.xmlMode && caseInsensitiveAttributes.has(selector.name);
};
var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
var caseInsensitiveAttributes = new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
var attributeRules = {
  equals(next, data4, options2) {
    const { adapter } = options2;
    const { name } = data4;
    let { value } = data4;
    if (shouldIgnoreCase(data4, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter.getAttributeValue(elem, name);
        return attr2 != null && attr2.length === value.length && attr2.toLowerCase() === value && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) === value && next(elem);
  },
  hyphen(next, data4, options2) {
    const { adapter } = options2;
    const { name } = data4;
    let { value } = data4;
    const len = value.length;
    if (shouldIgnoreCase(data4, options2)) {
      value = value.toLowerCase();
      return function hyphenIC(elem) {
        const attr2 = adapter.getAttributeValue(elem, name);
        return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return function hyphen(elem) {
      const attr2 = adapter.getAttributeValue(elem, name);
      return attr2 != null && (attr2.length === len || attr2.charAt(len) === "-") && attr2.substr(0, len) === value && next(elem);
    };
  },
  element(next, data4, options2) {
    const { adapter } = options2;
    const { name, value } = data4;
    if (/\s/.test(value)) {
      return import_boolbase.default.falseFunc;
    }
    const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:\$|\\s)`, shouldIgnoreCase(data4, options2) ? "i" : "");
    return function element(elem) {
      const attr2 = adapter.getAttributeValue(elem, name);
      return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next(elem);
    };
  },
  exists(next, { name }, { adapter }) {
    return (elem) => adapter.hasAttrib(elem, name) && next(elem);
  },
  start(next, data4, options2) {
    const { adapter } = options2;
    const { name } = data4;
    let { value } = data4;
    const len = value.length;
    if (len === 0) {
      return import_boolbase.default.falseFunc;
    }
    if (shouldIgnoreCase(data4, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter.getAttributeValue(elem, name);
        return attr2 != null && attr2.length >= len && attr2.substr(0, len).toLowerCase() === value && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === undefined ? undefined : _a2.startsWith(value)) && next(elem);
    };
  },
  end(next, data4, options2) {
    const { adapter } = options2;
    const { name } = data4;
    let { value } = data4;
    const len = -value.length;
    if (len === 0) {
      return import_boolbase.default.falseFunc;
    }
    if (shouldIgnoreCase(data4, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        var _a2;
        return ((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === undefined ? undefined : _a2.substr(len).toLowerCase()) === value && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === undefined ? undefined : _a2.endsWith(value)) && next(elem);
    };
  },
  any(next, data4, options2) {
    const { adapter } = options2;
    const { name, value } = data4;
    if (value === "") {
      return import_boolbase.default.falseFunc;
    }
    if (shouldIgnoreCase(data4, options2)) {
      const regex = new RegExp(escapeRegex(value), "i");
      return function anyIC(elem) {
        const attr2 = adapter.getAttributeValue(elem, name);
        return attr2 != null && attr2.length >= value.length && regex.test(attr2) && next(elem);
      };
    }
    return (elem) => {
      var _a2;
      return !!((_a2 = adapter.getAttributeValue(elem, name)) === null || _a2 === undefined ? undefined : _a2.includes(value)) && next(elem);
    };
  },
  not(next, data4, options2) {
    const { adapter } = options2;
    const { name } = data4;
    let { value } = data4;
    if (value === "") {
      return (elem) => !!adapter.getAttributeValue(elem, name) && next(elem);
    } else if (shouldIgnoreCase(data4, options2)) {
      value = value.toLowerCase();
      return (elem) => {
        const attr2 = adapter.getAttributeValue(elem, name);
        return (attr2 == null || attr2.length !== value.length || attr2.toLowerCase() !== value) && next(elem);
      };
    }
    return (elem) => adapter.getAttributeValue(elem, name) !== value && next(elem);
  }
};

// node_modules/nth-check/lib/esm/parse.js
function parse2(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number !== null && number !== undefined ? number : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number = readNumber();
    } else {
      sign = number = 0;
    }
  }
  if (number === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}
var whitespace = new Set([9, 10, 12, 13, 32]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);

// node_modules/nth-check/lib/esm/compile.js
var import_boolbase2 = __toESM(require_boolbase(), 1);
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return import_boolbase2.default.falseFunc;
  if (a === -1)
    return (index) => index <= b;
  if (a === 0)
    return (index) => index === b;
  if (a === 1)
    return b < 0 ? import_boolbase2.default.trueFunc : (index) => index >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index) => index >= b && index % absA === bMod : (index) => index <= b && index % absA === bMod;
}

// node_modules/nth-check/lib/esm/index.js
function nthCheck(formula) {
  return compile(parse2(formula));
}

// node_modules/css-select/lib/esm/pseudo-selectors/filters.js
var import_boolbase3 = __toESM(require_boolbase(), 1);
var getChildFunc = function(next, adapter) {
  return (elem) => {
    const parent = adapter.getParent(elem);
    return parent != null && adapter.isTag(parent) && next(elem);
  };
};
var dynamicStatePseudo = function(name) {
  return function dynamicPseudo(next, _rule, { adapter }) {
    const func = adapter[name];
    if (typeof func !== "function") {
      return import_boolbase3.default.falseFunc;
    }
    return function active(elem) {
      return func(elem) && next(elem);
    };
  };
};
var filters = {
  contains(next, text2, { adapter }) {
    return function contains(elem) {
      return next(elem) && adapter.getText(elem).includes(text2);
    };
  },
  icontains(next, text2, { adapter }) {
    const itext = text2.toLowerCase();
    return function icontains(elem) {
      return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
    };
  },
  "nth-child"(next, rule, { adapter, equals }) {
    const func = nthCheck(rule);
    if (func === import_boolbase3.default.falseFunc)
      return import_boolbase3.default.falseFunc;
    if (func === import_boolbase3.default.trueFunc)
      return getChildFunc(next, adapter);
    return function nthChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0;i < siblings.length; i++) {
        if (equals(elem, siblings[i]))
          break;
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-child"(next, rule, { adapter, equals }) {
    const func = nthCheck(rule);
    if (func === import_boolbase3.default.falseFunc)
      return import_boolbase3.default.falseFunc;
    if (func === import_boolbase3.default.trueFunc)
      return getChildFunc(next, adapter);
    return function nthLastChild(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1;i >= 0; i--) {
        if (equals(elem, siblings[i]))
          break;
        if (adapter.isTag(siblings[i])) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-of-type"(next, rule, { adapter, equals }) {
    const func = nthCheck(rule);
    if (func === import_boolbase3.default.falseFunc)
      return import_boolbase3.default.falseFunc;
    if (func === import_boolbase3.default.trueFunc)
      return getChildFunc(next, adapter);
    return function nthOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = 0;i < siblings.length; i++) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling))
          break;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  "nth-last-of-type"(next, rule, { adapter, equals }) {
    const func = nthCheck(rule);
    if (func === import_boolbase3.default.falseFunc)
      return import_boolbase3.default.falseFunc;
    if (func === import_boolbase3.default.trueFunc)
      return getChildFunc(next, adapter);
    return function nthLastOfType(elem) {
      const siblings = adapter.getSiblings(elem);
      let pos = 0;
      for (let i = siblings.length - 1;i >= 0; i--) {
        const currentSibling = siblings[i];
        if (equals(elem, currentSibling))
          break;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
          pos++;
        }
      }
      return func(pos) && next(elem);
    };
  },
  root(next, _rule, { adapter }) {
    return (elem) => {
      const parent = adapter.getParent(elem);
      return (parent == null || !adapter.isTag(parent)) && next(elem);
    };
  },
  scope(next, rule, options2, context) {
    const { equals } = options2;
    if (!context || context.length === 0) {
      return filters["root"](next, rule, options2);
    }
    if (context.length === 1) {
      return (elem) => equals(context[0], elem) && next(elem);
    }
    return (elem) => context.includes(elem) && next(elem);
  },
  hover: dynamicStatePseudo("isHovered"),
  visited: dynamicStatePseudo("isVisited"),
  active: dynamicStatePseudo("isActive")
};

// node_modules/css-select/lib/esm/pseudo-selectors/pseudos.js
function verifyPseudoArgs(func, name, subselect, argIndex) {
  if (subselect === null) {
    if (func.length > argIndex) {
      throw new Error(`Pseudo-class :${name} requires an argument`);
    }
  } else if (func.length === argIndex) {
    throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
  }
}
var pseudos = {
  empty(elem, { adapter }) {
    return !adapter.getChildren(elem).some((elem2) => adapter.isTag(elem2) || adapter.getText(elem2) !== "");
  },
  "first-child"(elem, { adapter, equals }) {
    if (adapter.prevElementSibling) {
      return adapter.prevElementSibling(elem) == null;
    }
    const firstChild = adapter.getSiblings(elem).find((elem2) => adapter.isTag(elem2));
    return firstChild != null && equals(elem, firstChild);
  },
  "last-child"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    for (let i = siblings.length - 1;i >= 0; i--) {
      if (equals(elem, siblings[i]))
        return true;
      if (adapter.isTag(siblings[i]))
        break;
    }
    return false;
  },
  "first-of-type"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = 0;i < siblings.length; i++) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling))
        return true;
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "last-of-type"(elem, { adapter, equals }) {
    const siblings = adapter.getSiblings(elem);
    const elemName = adapter.getName(elem);
    for (let i = siblings.length - 1;i >= 0; i--) {
      const currentSibling = siblings[i];
      if (equals(elem, currentSibling))
        return true;
      if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
        break;
      }
    }
    return false;
  },
  "only-of-type"(elem, { adapter, equals }) {
    const elemName = adapter.getName(elem);
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName);
  },
  "only-child"(elem, { adapter, equals }) {
    return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling));
  }
};

// node_modules/css-select/lib/esm/pseudo-selectors/aliases.js
var aliases = {
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
};

// node_modules/css-select/lib/esm/pseudo-selectors/subselects.js
var import_boolbase4 = __toESM(require_boolbase(), 1);
function ensureIsTag(next, adapter) {
  if (next === import_boolbase4.default.falseFunc)
    return import_boolbase4.default.falseFunc;
  return (elem) => adapter.isTag(elem) && next(elem);
}
function getNextSiblings(elem, adapter) {
  const siblings = adapter.getSiblings(elem);
  if (siblings.length <= 1)
    return [];
  const elemIndex = siblings.indexOf(elem);
  if (elemIndex < 0 || elemIndex === siblings.length - 1)
    return [];
  return siblings.slice(elemIndex + 1).filter(adapter.isTag);
}
var copyOptions = function(options2) {
  return {
    xmlMode: !!options2.xmlMode,
    lowerCaseAttributeNames: !!options2.lowerCaseAttributeNames,
    lowerCaseTags: !!options2.lowerCaseTags,
    quirksMode: !!options2.quirksMode,
    cacheResults: !!options2.cacheResults,
    pseudos: options2.pseudos,
    adapter: options2.adapter,
    equals: options2.equals
  };
};
var PLACEHOLDER_ELEMENT = {};
var is = (next, token, options2, context, compileToken) => {
  const func = compileToken(token, copyOptions(options2), context);
  return func === import_boolbase4.default.trueFunc ? next : func === import_boolbase4.default.falseFunc ? import_boolbase4.default.falseFunc : (elem) => func(elem) && next(elem);
};
var subselects = {
  is,
  matches: is,
  where: is,
  not(next, token, options2, context, compileToken) {
    const func = compileToken(token, copyOptions(options2), context);
    return func === import_boolbase4.default.falseFunc ? next : func === import_boolbase4.default.trueFunc ? import_boolbase4.default.falseFunc : (elem) => !func(elem) && next(elem);
  },
  has(next, subselect, options2, _context, compileToken) {
    const { adapter } = options2;
    const opts = copyOptions(options2);
    opts.relativeSelector = true;
    const context = subselect.some((s) => s.some(isTraversal2)) ? [PLACEHOLDER_ELEMENT] : undefined;
    const compiled = compileToken(subselect, opts, context);
    if (compiled === import_boolbase4.default.falseFunc)
      return import_boolbase4.default.falseFunc;
    const hasElement = ensureIsTag(compiled, adapter);
    if (context && compiled !== import_boolbase4.default.trueFunc) {
      const { shouldTestNextSiblings = false } = compiled;
      return (elem) => {
        if (!next(elem))
          return false;
        context[0] = elem;
        const childs = adapter.getChildren(elem);
        const nextElements = shouldTestNextSiblings ? [...childs, ...getNextSiblings(elem, adapter)] : childs;
        return adapter.existsOne(hasElement, nextElements);
      };
    }
    return (elem) => next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
  }
};

// node_modules/css-select/lib/esm/pseudo-selectors/index.js
function compilePseudoSelector(next, selector, options2, context, compileToken) {
  var _a2;
  const { name, data: data4 } = selector;
  if (Array.isArray(data4)) {
    if (!(name in subselects)) {
      throw new Error(`Unknown pseudo-class :${name}(${data4})`);
    }
    return subselects[name](next, data4, options2, context, compileToken);
  }
  const userPseudo = (_a2 = options2.pseudos) === null || _a2 === undefined ? undefined : _a2[name];
  const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
  if (typeof stringPseudo === "string") {
    if (data4 != null) {
      throw new Error(`Pseudo ${name} doesn't have any arguments`);
    }
    const alias = parse(stringPseudo);
    return subselects["is"](next, alias, options2, context, compileToken);
  }
  if (typeof userPseudo === "function") {
    verifyPseudoArgs(userPseudo, name, data4, 1);
    return (elem) => userPseudo(elem, data4) && next(elem);
  }
  if (name in filters) {
    return filters[name](next, data4, options2, context);
  }
  if (name in pseudos) {
    const pseudo = pseudos[name];
    verifyPseudoArgs(pseudo, name, data4, 2);
    return (elem) => pseudo(elem, options2, data4) && next(elem);
  }
  throw new Error(`Unknown pseudo-class :${name}`);
}

// node_modules/css-select/lib/esm/general.js
var getElementParent = function(node4, adapter) {
  const parent = adapter.getParent(node4);
  if (parent && adapter.isTag(parent)) {
    return parent;
  }
  return null;
};
function compileGeneralSelector(next, selector, options2, context, compileToken) {
  const { adapter, equals } = options2;
  switch (selector.type) {
    case SelectorType.PseudoElement: {
      throw new Error("Pseudo-elements are not supported by css-select");
    }
    case SelectorType.ColumnCombinator: {
      throw new Error("Column combinators are not yet supported by css-select");
    }
    case SelectorType.Attribute: {
      if (selector.namespace != null) {
        throw new Error("Namespaced attributes are not yet supported by css-select");
      }
      if (!options2.xmlMode || options2.lowerCaseAttributeNames) {
        selector.name = selector.name.toLowerCase();
      }
      return attributeRules[selector.action](next, selector, options2);
    }
    case SelectorType.Pseudo: {
      return compilePseudoSelector(next, selector, options2, context, compileToken);
    }
    case SelectorType.Tag: {
      if (selector.namespace != null) {
        throw new Error("Namespaced tag names are not yet supported by css-select");
      }
      let { name } = selector;
      if (!options2.xmlMode || options2.lowerCaseTags) {
        name = name.toLowerCase();
      }
      return function tag(elem) {
        return adapter.getName(elem) === name && next(elem);
      };
    }
    case SelectorType.Descendant: {
      if (options2.cacheResults === false || typeof WeakSet === "undefined") {
        return function descendant(elem) {
          let current = elem;
          while (current = getElementParent(current, adapter)) {
            if (next(current)) {
              return true;
            }
          }
          return false;
        };
      }
      const isFalseCache = new WeakSet;
      return function cachedDescendant(elem) {
        let current = elem;
        while (current = getElementParent(current, adapter)) {
          if (!isFalseCache.has(current)) {
            if (adapter.isTag(current) && next(current)) {
              return true;
            }
            isFalseCache.add(current);
          }
        }
        return false;
      };
    }
    case "_flexibleDescendant": {
      return function flexibleDescendant(elem) {
        let current = elem;
        do {
          if (next(current))
            return true;
        } while (current = getElementParent(current, adapter));
        return false;
      };
    }
    case SelectorType.Parent: {
      return function parent(elem) {
        return adapter.getChildren(elem).some((elem2) => adapter.isTag(elem2) && next(elem2));
      };
    }
    case SelectorType.Child: {
      return function child(elem) {
        const parent = adapter.getParent(elem);
        return parent != null && adapter.isTag(parent) && next(parent);
      };
    }
    case SelectorType.Sibling: {
      return function sibling(elem) {
        const siblings = adapter.getSiblings(elem);
        for (let i = 0;i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter.isTag(currentSibling) && next(currentSibling)) {
            return true;
          }
        }
        return false;
      };
    }
    case SelectorType.Adjacent: {
      if (adapter.prevElementSibling) {
        return function adjacent(elem) {
          const previous = adapter.prevElementSibling(elem);
          return previous != null && next(previous);
        };
      }
      return function adjacent(elem) {
        const siblings = adapter.getSiblings(elem);
        let lastElement;
        for (let i = 0;i < siblings.length; i++) {
          const currentSibling = siblings[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter.isTag(currentSibling)) {
            lastElement = currentSibling;
          }
        }
        return !!lastElement && next(lastElement);
      };
    }
    case SelectorType.Universal: {
      if (selector.namespace != null && selector.namespace !== "*") {
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      }
      return next;
    }
  }
}

// node_modules/css-select/lib/esm/compile.js
function compile3(selector, options2, context) {
  const next = compileUnsafe(selector, options2, context);
  return ensureIsTag(next, options2.adapter);
}
function compileUnsafe(selector, options2, context) {
  const token = typeof selector === "string" ? parse(selector) : selector;
  return compileToken(token, options2, context);
}
var includesScopePseudo = function(t) {
  return t.type === SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data4) => data4.some(includesScopePseudo)));
};
var absolutize = function(token, { adapter }, context) {
  const hasContext = !!(context === null || context === undefined ? undefined : context.every((e) => {
    const parent = adapter.isTag(e) && adapter.getParent(e);
    return e === PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
  }));
  for (const t of token) {
    if (t.length > 0 && isTraversal2(t[0]) && t[0].type !== SelectorType.Descendant) {
    } else if (hasContext && !t.some(includesScopePseudo)) {
      t.unshift(DESCENDANT_TOKEN);
    } else {
      continue;
    }
    t.unshift(SCOPE_TOKEN);
  }
};
function compileToken(token, options2, context) {
  var _a2;
  token.forEach(sortByProcedure);
  context = (_a2 = options2.context) !== null && _a2 !== undefined ? _a2 : context;
  const isArrayContext = Array.isArray(context);
  const finalContext = context && (Array.isArray(context) ? context : [context]);
  if (options2.relativeSelector !== false) {
    absolutize(token, options2, finalContext);
  } else if (token.some((t) => t.length > 0 && isTraversal2(t[0]))) {
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  }
  let shouldTestNextSiblings = false;
  const query = token.map((rules) => {
    if (rules.length >= 2) {
      const [first, second] = rules;
      if (first.type !== SelectorType.Pseudo || first.name !== "scope") {
      } else if (isArrayContext && second.type === SelectorType.Descendant) {
        rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
      } else if (second.type === SelectorType.Adjacent || second.type === SelectorType.Sibling) {
        shouldTestNextSiblings = true;
      }
    }
    return compileRules(rules, options2, finalContext);
  }).reduce(reduceRules, import_boolbase5.default.falseFunc);
  query.shouldTestNextSiblings = shouldTestNextSiblings;
  return query;
}
var compileRules = function(rules, options2, context) {
  var _a2;
  return rules.reduce((previous, rule) => previous === import_boolbase5.default.falseFunc ? import_boolbase5.default.falseFunc : compileGeneralSelector(previous, rule, options2, context, compileToken), (_a2 = options2.rootFunc) !== null && _a2 !== undefined ? _a2 : import_boolbase5.default.trueFunc);
};
var reduceRules = function(a, b) {
  if (b === import_boolbase5.default.falseFunc || a === import_boolbase5.default.trueFunc) {
    return a;
  }
  if (a === import_boolbase5.default.falseFunc || b === import_boolbase5.default.trueFunc) {
    return b;
  }
  return function combine(elem) {
    return a(elem) || b(elem);
  };
};
var DESCENDANT_TOKEN = { type: SelectorType.Descendant };
var FLEXIBLE_DESCENDANT_TOKEN = {
  type: "_flexibleDescendant"
};
var SCOPE_TOKEN = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};

// node_modules/css-select/lib/esm/index.js
var convertOptionFormats = function(options2) {
  var _a2, _b, _c, _d;
  const opts = options2 !== null && options2 !== undefined ? options2 : defaultOptions;
  (_a2 = opts.adapter) !== null && _a2 !== undefined || (opts.adapter = exports_esm2);
  (_b = opts.equals) !== null && _b !== undefined || (opts.equals = (_d = (_c = opts.adapter) === null || _c === undefined ? undefined : _c.equals) !== null && _d !== undefined ? _d : defaultEquals);
  return opts;
};
var wrapCompile = function(func) {
  return function addAdapter(selector, options2, context) {
    const opts = convertOptionFormats(options2);
    return func(selector, opts, context);
  };
};
var getSelectorFunc = function(searchFunc) {
  return function select(query, elements, options2) {
    const opts = convertOptionFormats(options2);
    if (typeof query !== "function") {
      query = compileUnsafe(query, opts, elements);
    }
    const filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
    return searchFunc(query, filteredElements, opts);
  };
};
function prepareContext(elems, adapter, shouldTestNextSiblings = false) {
  if (shouldTestNextSiblings) {
    elems = appendNextSiblings(elems, adapter);
  }
  return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
}
var appendNextSiblings = function(elem, adapter) {
  const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
  const elemsLength = elems.length;
  for (let i = 0;i < elemsLength; i++) {
    const nextSiblings = getNextSiblings(elems[i], adapter);
    elems.push(...nextSiblings);
  }
  return elems;
};
var defaultEquals = (a, b) => a === b;
var defaultOptions = {
  adapter: exports_esm2,
  equals: defaultEquals
};
var compile5 = wrapCompile(compile3);
var _compileUnsafe = wrapCompile(compileUnsafe);
var _compileToken = wrapCompile(compileToken);
var selectAll = getSelectorFunc((query, elems, options2) => query === import_boolbase6.default.falseFunc || !elems || elems.length === 0 ? [] : options2.adapter.findAll(query, elems));
var selectOne = getSelectorFunc((query, elems, options2) => query === import_boolbase6.default.falseFunc || !elems || elems.length === 0 ? null : options2.adapter.findOne(query, elems));

// node_modules/cheerio-select/lib/esm/index.js
var boolbase7 = __toESM(require_boolbase(), 1);

// node_modules/cheerio-select/lib/esm/positionals.js
function isFilter(s) {
  if (s.type !== "pseudo")
    return false;
  if (filterNames.has(s.name))
    return true;
  if (s.name === "not" && Array.isArray(s.data)) {
    return s.data.some((s2) => s2.some(isFilter));
  }
  return false;
}
function getLimit(filter3, data4, partLimit) {
  const num = data4 != null ? parseInt(data4, 10) : NaN;
  switch (filter3) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(num) ? num >= 0 ? num + 1 : Infinity : 0;
    case "lt":
      return isFinite(num) ? num >= 0 ? Math.min(num, partLimit) : Infinity : 0;
    case "gt":
      return isFinite(num) ? Infinity : 0;
    case "odd":
      return 2 * partLimit;
    case "even":
      return 2 * partLimit - 1;
    case "last":
    case "not":
      return Infinity;
  }
}
var filterNames = new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);

// node_modules/cheerio-select/lib/esm/helpers.js
function getDocumentRoot(node4) {
  while (node4.parent)
    node4 = node4.parent;
  return node4;
}
function groupSelectors(selectors) {
  const filteredSelectors = [];
  const plainSelectors = [];
  for (const selector of selectors) {
    if (selector.some(isFilter)) {
      filteredSelectors.push(selector);
    } else {
      plainSelectors.push(selector);
    }
  }
  return [plainSelectors, filteredSelectors];
}

// node_modules/cheerio-select/lib/esm/index.js
function is2(element, selector, options2 = {}) {
  return some([element], selector, options2);
}
function some(elements, selector, options2 = {}) {
  if (typeof selector === "function")
    return elements.some(selector);
  const [plain, filtered] = groupSelectors(parse(selector));
  return plain.length > 0 && elements.some(_compileToken(plain, options2)) || filtered.some((sel) => filterBySelector(sel, elements, options2).length > 0);
}
var filterByPosition = function(filter3, elems, data4, options2) {
  const num = typeof data4 === "string" ? parseInt(data4, 10) : NaN;
  switch (filter3) {
    case "first":
    case "lt":
      return elems;
    case "last":
      return elems.length > 0 ? [elems[elems.length - 1]] : elems;
    case "nth":
    case "eq":
      return isFinite(num) && Math.abs(num) < elems.length ? [num < 0 ? elems[elems.length + num] : elems[num]] : [];
    case "gt":
      return isFinite(num) ? elems.slice(num + 1) : [];
    case "even":
      return elems.filter((_, i) => i % 2 === 0);
    case "odd":
      return elems.filter((_, i) => i % 2 === 1);
    case "not": {
      const filtered = new Set(filterParsed(data4, elems, options2));
      return elems.filter((e) => !filtered.has(e));
    }
  }
};
function filter3(selector, elements, options2 = {}) {
  return filterParsed(parse(selector), elements, options2);
}
var filterParsed = function(selector, elements, options2) {
  if (elements.length === 0)
    return [];
  const [plainSelectors, filteredSelectors] = groupSelectors(selector);
  let found;
  if (plainSelectors.length) {
    const filtered = filterElements(elements, plainSelectors, options2);
    if (filteredSelectors.length === 0) {
      return filtered;
    }
    if (filtered.length) {
      found = new Set(filtered);
    }
  }
  for (let i = 0;i < filteredSelectors.length && (found === null || found === undefined ? undefined : found.size) !== elements.length; i++) {
    const filteredSelector = filteredSelectors[i];
    const missing = found ? elements.filter((e) => isTag2(e) && !found.has(e)) : elements;
    if (missing.length === 0)
      break;
    const filtered = filterBySelector(filteredSelector, elements, options2);
    if (filtered.length) {
      if (!found) {
        if (i === filteredSelectors.length - 1) {
          return filtered;
        }
        found = new Set(filtered);
      } else {
        filtered.forEach((el) => found.add(el));
      }
    }
  }
  return typeof found !== "undefined" ? found.size === elements.length ? elements : elements.filter((el) => found.has(el)) : [];
};
var filterBySelector = function(selector, elements, options2) {
  var _a2;
  if (selector.some(isTraversal)) {
    const root2 = (_a2 = options2.root) !== null && _a2 !== undefined ? _a2 : getDocumentRoot(elements[0]);
    const opts = { ...options2, context: elements, relativeSelector: false };
    selector.push(SCOPE_PSEUDO);
    return findFilterElements(root2, selector, opts, true, elements.length);
  }
  return findFilterElements(elements, selector, options2, false, elements.length);
};
function select(selector, root2, options2 = {}, limit = Infinity) {
  if (typeof selector === "function") {
    return find2(root2, selector);
  }
  const [plain, filtered] = groupSelectors(parse(selector));
  const results = filtered.map((sel) => findFilterElements(root2, sel, options2, true, limit));
  if (plain.length) {
    results.push(findElements(root2, plain, options2, limit));
  }
  if (results.length === 0) {
    return [];
  }
  if (results.length === 1) {
    return results[0];
  }
  return uniqueSort(results.reduce((a, b) => [...a, ...b]));
}
var findFilterElements = function(root2, selector, options2, queryForSelector, totalLimit) {
  const filterIndex = selector.findIndex(isFilter);
  const sub = selector.slice(0, filterIndex);
  const filter4 = selector[filterIndex];
  const partLimit = selector.length - 1 === filterIndex ? totalLimit : Infinity;
  const limit = getLimit(filter4.name, filter4.data, partLimit);
  if (limit === 0)
    return [];
  const elemsNoLimit = sub.length === 0 && !Array.isArray(root2) ? getChildren(root2).filter(isTag2) : sub.length === 0 ? (Array.isArray(root2) ? root2 : [root2]).filter(isTag2) : queryForSelector || sub.some(isTraversal) ? findElements(root2, [sub], options2, limit) : filterElements(root2, [sub], options2);
  const elems = elemsNoLimit.slice(0, limit);
  let result = filterByPosition(filter4.name, elems, filter4.data, options2);
  if (result.length === 0 || selector.length === filterIndex + 1) {
    return result;
  }
  const remainingSelector = selector.slice(filterIndex + 1);
  const remainingHasTraversal = remainingSelector.some(isTraversal);
  if (remainingHasTraversal) {
    if (isTraversal(remainingSelector[0])) {
      const { type } = remainingSelector[0];
      if (type === SelectorType.Sibling || type === SelectorType.Adjacent) {
        result = prepareContext(result, exports_esm2, true);
      }
      remainingSelector.unshift(UNIVERSAL_SELECTOR);
    }
    options2 = {
      ...options2,
      relativeSelector: false,
      rootFunc: (el) => result.includes(el)
    };
  } else if (options2.rootFunc && options2.rootFunc !== boolbase7.trueFunc) {
    options2 = { ...options2, rootFunc: boolbase7.trueFunc };
  }
  return remainingSelector.some(isFilter) ? findFilterElements(result, remainingSelector, options2, false, totalLimit) : remainingHasTraversal ? findElements(result, [remainingSelector], options2, totalLimit) : filterElements(result, [remainingSelector], options2);
};
var findElements = function(root2, sel, options2, limit) {
  const query = _compileToken(sel, options2, root2);
  return find2(root2, query, limit);
};
var find2 = function(root2, query, limit = Infinity) {
  const elems = prepareContext(root2, exports_esm2, query.shouldTestNextSiblings);
  return find((node4) => isTag2(node4) && query(node4), elems, true, limit);
};
var filterElements = function(elements, sel, options2) {
  const els = (Array.isArray(elements) ? elements : [elements]).filter(isTag2);
  if (els.length === 0)
    return els;
  const query = _compileToken(sel, options2);
  return query === boolbase7.trueFunc ? els : els.filter(query);
};
var UNIVERSAL_SELECTOR = {
  type: SelectorType.Universal,
  namespace: null
};
var SCOPE_PSEUDO = {
  type: SelectorType.Pseudo,
  name: "scope",
  data: null
};

// node_modules/cheerio/dist/browser/api/traversing.js
function find3(selectorOrHaystack) {
  if (!selectorOrHaystack) {
    return this._make([]);
  }
  if (typeof selectorOrHaystack !== "string") {
    const haystack = isCheerio(selectorOrHaystack) ? selectorOrHaystack.toArray() : [selectorOrHaystack];
    const context = this.toArray();
    return this._make(haystack.filter((elem) => context.some((node4) => contains(node4, elem))));
  }
  return this._findBySelector(selectorOrHaystack, Number.POSITIVE_INFINITY);
}
function _findBySelector(selector, limit) {
  var _a2;
  const context = this.toArray();
  const elems = reSiblingSelector.test(selector) ? context : this.children().toArray();
  const options2 = {
    context,
    root: (_a2 = this._root) === null || _a2 === undefined ? undefined : _a2[0],
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(select(selector, elems, options2, limit));
}
var _getMatcher = function(matchMap) {
  return function(fn, ...postFns) {
    return function(selector) {
      var _a2;
      let matched = matchMap(fn, this);
      if (selector) {
        matched = filterArray(matched, selector, this.options.xmlMode, (_a2 = this._root) === null || _a2 === undefined ? undefined : _a2[0]);
      }
      return this._make(this.length > 1 && matched.length > 1 ? postFns.reduce((elems, fn2) => fn2(elems), matched) : matched);
    };
  };
};
var _matchUntil = function(nextElem, ...postFns) {
  let matches = null;
  const innerMatcher = _getMatcher((nextElem2, elems) => {
    const matched = [];
    domEach(elems, (elem) => {
      for (let next;next = nextElem2(elem); elem = next) {
        if (matches === null || matches === undefined ? undefined : matches(next, matched.length))
          break;
        matched.push(next);
      }
    });
    return matched;
  })(nextElem, ...postFns);
  return function(selector, filterSelector) {
    matches = typeof selector === "string" ? (elem) => is2(elem, selector, this.options) : selector ? getFilterFn(selector) : null;
    const ret = innerMatcher.call(this, filterSelector);
    matches = null;
    return ret;
  };
};
var _removeDuplicates = function(elems) {
  return elems.length > 1 ? Array.from(new Set(elems)) : elems;
};
function closest(selector) {
  var _a2;
  const set = [];
  if (!selector) {
    return this._make(set);
  }
  const selectOpts = {
    xmlMode: this.options.xmlMode,
    root: (_a2 = this._root) === null || _a2 === undefined ? undefined : _a2[0]
  };
  const selectFn = typeof selector === "string" ? (elem) => is2(elem, selector, selectOpts) : getFilterFn(selector);
  domEach(this, (elem) => {
    if (elem && !isDocument(elem) && !isTag2(elem)) {
      elem = elem.parent;
    }
    while (elem && isTag2(elem)) {
      if (selectFn(elem, 0)) {
        if (!set.includes(elem)) {
          set.push(elem);
        }
        break;
      }
      elem = elem.parent;
    }
  });
  return this._make(set);
}
function contents() {
  const elems = this.toArray().reduce((newElems, elem) => hasChildren(elem) ? newElems.concat(elem.children) : newElems, []);
  return this._make(elems);
}
function each(fn) {
  let i = 0;
  const len = this.length;
  while (i < len && fn.call(this[i], i, this[i]) !== false)
    ++i;
  return this;
}
function map(fn) {
  let elems = [];
  for (let i = 0;i < this.length; i++) {
    const el = this[i];
    const val2 = fn.call(el, i, el);
    if (val2 != null) {
      elems = elems.concat(val2);
    }
  }
  return this._make(elems);
}
var getFilterFn = function(match) {
  if (typeof match === "function") {
    return (el, i) => match.call(el, i, el);
  }
  if (isCheerio(match)) {
    return (el) => Array.prototype.includes.call(match, el);
  }
  return function(el) {
    return match === el;
  };
};
function filter4(match) {
  var _a2;
  return this._make(filterArray(this.toArray(), match, this.options.xmlMode, (_a2 = this._root) === null || _a2 === undefined ? undefined : _a2[0]));
}
function filterArray(nodes, match, xmlMode, root2) {
  return typeof match === "string" ? filter3(match, nodes, { xmlMode, root: root2 }) : nodes.filter(getFilterFn(match));
}
function is3(selector) {
  const nodes = this.toArray();
  return typeof selector === "string" ? some(nodes.filter(isTag2), selector, this.options) : selector ? nodes.some(getFilterFn(selector)) : false;
}
function not(match) {
  let nodes = this.toArray();
  if (typeof match === "string") {
    const matches = new Set(filter3(match, nodes, this.options));
    nodes = nodes.filter((el) => !matches.has(el));
  } else {
    const filterFn = getFilterFn(match);
    nodes = nodes.filter((el, i) => !filterFn(el, i));
  }
  return this._make(nodes);
}
function has(selectorOrHaystack) {
  return this.filter(typeof selectorOrHaystack === "string" ? `:has(${selectorOrHaystack})` : (_, el) => this._make(el).find(selectorOrHaystack).length > 0);
}
function first() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function last() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function eq(i) {
  var _a2;
  i = +i;
  if (i === 0 && this.length <= 1)
    return this;
  if (i < 0)
    i = this.length + i;
  return this._make((_a2 = this[i]) !== null && _a2 !== undefined ? _a2 : []);
}
function get(i) {
  if (i == null) {
    return this.toArray();
  }
  return this[i < 0 ? this.length + i : i];
}
function toArray2() {
  return Array.prototype.slice.call(this);
}
function index(selectorOrNeedle) {
  let $haystack;
  let needle;
  if (selectorOrNeedle == null) {
    $haystack = this.parent().children();
    needle = this[0];
  } else if (typeof selectorOrNeedle === "string") {
    $haystack = this._make(selectorOrNeedle);
    needle = this[0];
  } else {
    $haystack = this;
    needle = isCheerio(selectorOrNeedle) ? selectorOrNeedle[0] : selectorOrNeedle;
  }
  return Array.prototype.indexOf.call($haystack, needle);
}
function slice(start, end) {
  return this._make(Array.prototype.slice.call(this, start, end));
}
function end() {
  var _a2;
  return (_a2 = this.prevObject) !== null && _a2 !== undefined ? _a2 : this._make([]);
}
function add(other, context) {
  const selection = this._make(other, context);
  const contents2 = uniqueSort([...this.get(), ...selection.get()]);
  return this._make(contents2);
}
function addBack(selector) {
  return this.prevObject ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject) : this;
}
var reSiblingSelector = /^\s*[+~]/;
var _matcher = _getMatcher((fn, elems) => {
  let ret = [];
  for (let i = 0;i < elems.length; i++) {
    const value = fn(elems[i]);
    if (value.length > 0)
      ret = ret.concat(value);
  }
  return ret;
});
var _singleMatcher = _getMatcher((fn, elems) => {
  const ret = [];
  for (let i = 0;i < elems.length; i++) {
    const value = fn(elems[i]);
    if (value !== null) {
      ret.push(value);
    }
  }
  return ret;
});
var parent = _singleMatcher(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, _removeDuplicates);
var parents = _matcher((elem) => {
  const matched = [];
  while (elem.parent && !isDocument(elem.parent)) {
    matched.push(elem.parent);
    elem = elem.parent;
  }
  return matched;
}, uniqueSort, (elems) => elems.reverse());
var parentsUntil = _matchUntil(({ parent: parent2 }) => parent2 && !isDocument(parent2) ? parent2 : null, uniqueSort, (elems) => elems.reverse());
var next = _singleMatcher((elem) => nextElementSibling(elem));
var nextAll = _matcher((elem) => {
  const matched = [];
  while (elem.next) {
    elem = elem.next;
    if (isTag2(elem))
      matched.push(elem);
  }
  return matched;
}, _removeDuplicates);
var nextUntil = _matchUntil((el) => nextElementSibling(el), _removeDuplicates);
var prev = _singleMatcher((elem) => prevElementSibling(elem));
var prevAll = _matcher((elem) => {
  const matched = [];
  while (elem.prev) {
    elem = elem.prev;
    if (isTag2(elem))
      matched.push(elem);
  }
  return matched;
}, _removeDuplicates);
var prevUntil = _matchUntil((el) => prevElementSibling(el), _removeDuplicates);
var siblings = _matcher((elem) => getSiblings(elem).filter((el) => isTag2(el) && el !== elem), uniqueSort);
var children = _matcher((elem) => getChildren(elem).filter(isTag2), _removeDuplicates);

// node_modules/cheerio/dist/browser/api/manipulation.js
var exports_manipulation = {};
__export(exports_manipulation, {
  wrapInner: () => {
    {
      return wrapInner;
    }
  },
  wrapAll: () => {
    {
      return wrapAll;
    }
  },
  wrap: () => {
    {
      return wrap;
    }
  },
  unwrap: () => {
    {
      return unwrap;
    }
  },
  toString: () => {
    {
      return toString3;
    }
  },
  text: () => {
    {
      return text2;
    }
  },
  replaceWith: () => {
    {
      return replaceWith;
    }
  },
  remove: () => {
    {
      return remove;
    }
  },
  prependTo: () => {
    {
      return prependTo;
    }
  },
  prepend: () => {
    {
      return prepend2;
    }
  },
  insertBefore: () => {
    {
      return insertBefore;
    }
  },
  insertAfter: () => {
    {
      return insertAfter;
    }
  },
  html: () => {
    {
      return html2;
    }
  },
  empty: () => {
    {
      return empty;
    }
  },
  clone: () => {
    {
      return clone;
    }
  },
  before: () => {
    {
      return before;
    }
  },
  appendTo: () => {
    {
      return appendTo;
    }
  },
  append: () => {
    {
      return append3;
    }
  },
  after: () => {
    {
      return after;
    }
  },
  _makeDomArray: () => {
    {
      return _makeDomArray;
    }
  }
});

// node_modules/cheerio/dist/browser/parse.js
function getParse(parser) {
  return function parse(content, options2, isDocument2, context) {
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(content)) {
      content = content.toString();
    }
    if (typeof content === "string") {
      return parser(content, options2, isDocument2, context);
    }
    const doc = content;
    if (!Array.isArray(doc) && isDocument(doc)) {
      return doc;
    }
    const root2 = new Document([]);
    update(doc, root2);
    return root2;
  };
}
function update(newChilds, parent2) {
  const arr = Array.isArray(newChilds) ? newChilds : [newChilds];
  if (parent2) {
    parent2.children = arr;
  } else {
    parent2 = null;
  }
  for (let i = 0;i < arr.length; i++) {
    const node4 = arr[i];
    if (node4.parent && node4.parent.children !== arr) {
      removeElement(node4);
    }
    if (parent2) {
      node4.prev = arr[i - 1] || null;
      node4.next = arr[i + 1] || null;
    } else {
      node4.prev = node4.next = null;
    }
    node4.parent = parent2;
  }
  return parent2;
}

// node_modules/cheerio/dist/browser/api/manipulation.js
function _makeDomArray(elem, clone) {
  if (elem == null) {
    return [];
  }
  if (typeof elem === "string") {
    return this._parse(elem, this.options, false, null).children.slice(0);
  }
  if ("length" in elem) {
    if (elem.length === 1) {
      return this._makeDomArray(elem[0], clone);
    }
    const result = [];
    for (let i = 0;i < elem.length; i++) {
      const el = elem[i];
      if (typeof el === "object") {
        if (el == null) {
          continue;
        }
        if (!("length" in el)) {
          result.push(clone ? cloneNode(el, true) : el);
          continue;
        }
      }
      result.push(...this._makeDomArray(el, clone));
    }
    return result;
  }
  return [clone ? cloneNode(elem, true) : elem];
}
var _insert = function(concatenator) {
  return function(...elems) {
    const lastIdx = this.length - 1;
    return domEach(this, (el, i) => {
      if (!hasChildren(el))
        return;
      const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
      const dom = this._makeDomArray(domSrc, i < lastIdx);
      concatenator(dom, el.children, el);
    });
  };
};
var uniqueSplice = function(array, spliceIdx, spliceCount, newElems, parent2) {
  var _a2, _b;
  const spliceArgs = [
    spliceIdx,
    spliceCount,
    ...newElems
  ];
  const prev2 = spliceIdx === 0 ? null : array[spliceIdx - 1];
  const next2 = spliceIdx + spliceCount >= array.length ? null : array[spliceIdx + spliceCount];
  for (let idx = 0;idx < newElems.length; ++idx) {
    const node4 = newElems[idx];
    const oldParent = node4.parent;
    if (oldParent) {
      const oldSiblings = oldParent.children;
      const prevIdx = oldSiblings.indexOf(node4);
      if (prevIdx > -1) {
        oldParent.children.splice(prevIdx, 1);
        if (parent2 === oldParent && spliceIdx > prevIdx) {
          spliceArgs[0]--;
        }
      }
    }
    node4.parent = parent2;
    if (node4.prev) {
      node4.prev.next = (_a2 = node4.next) !== null && _a2 !== undefined ? _a2 : null;
    }
    if (node4.next) {
      node4.next.prev = (_b = node4.prev) !== null && _b !== undefined ? _b : null;
    }
    node4.prev = idx === 0 ? prev2 : newElems[idx - 1];
    node4.next = idx === newElems.length - 1 ? next2 : newElems[idx + 1];
  }
  if (prev2) {
    prev2.next = newElems[0];
  }
  if (next2) {
    next2.prev = newElems[newElems.length - 1];
  }
  return array.splice(...spliceArgs);
};
function appendTo(target) {
  const appendTarget = isCheerio(target) ? target : this._make(target);
  appendTarget.append(this);
  return this;
}
function prependTo(target) {
  const prependTarget = isCheerio(target) ? target : this._make(target);
  prependTarget.prepend(this);
  return this;
}
var _wrap = function(insert) {
  return function(wrapper) {
    const lastIdx = this.length - 1;
    const lastParent = this.parents().last();
    for (let i = 0;i < this.length; i++) {
      const el = this[i];
      const wrap = typeof wrapper === "function" ? wrapper.call(el, i, el) : typeof wrapper === "string" && !isHtml(wrapper) ? lastParent.find(wrapper).clone() : wrapper;
      const [wrapperDom] = this._makeDomArray(wrap, i < lastIdx);
      if (!wrapperDom || !hasChildren(wrapperDom))
        continue;
      let elInsertLocation = wrapperDom;
      let j = 0;
      while (j < elInsertLocation.children.length) {
        const child = elInsertLocation.children[j];
        if (isTag2(child)) {
          elInsertLocation = child;
          j = 0;
        } else {
          j++;
        }
      }
      insert(el, elInsertLocation, [wrapperDom]);
    }
    return this;
  };
};
function unwrap(selector) {
  this.parent(selector).not("body").each((_, el) => {
    this._make(el).replaceWith(el.children);
  });
  return this;
}
function wrapAll(wrapper) {
  const el = this[0];
  if (el) {
    const wrap = this._make(typeof wrapper === "function" ? wrapper.call(el, 0, el) : wrapper).insertBefore(el);
    let elInsertLocation;
    for (let i = 0;i < wrap.length; i++) {
      if (wrap[i].type === "tag")
        elInsertLocation = wrap[i];
    }
    let j = 0;
    while (elInsertLocation && j < elInsertLocation.children.length) {
      const child = elInsertLocation.children[j];
      if (child.type === "tag") {
        elInsertLocation = child;
        j = 0;
      } else {
        j++;
      }
    }
    if (elInsertLocation)
      this._make(elInsertLocation).append(this);
  }
  return this;
}
function after(...elems) {
  const lastIdx = this.length - 1;
  return domEach(this, (el, i) => {
    if (!hasChildren(el) || !el.parent) {
      return;
    }
    const siblings2 = el.parent.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
    const dom = this._makeDomArray(domSrc, i < lastIdx);
    uniqueSplice(siblings2, index2 + 1, 0, dom, el.parent);
  });
}
function insertAfter(target) {
  if (typeof target === "string") {
    target = this._make(target);
  }
  this.remove();
  const clones = [];
  for (const el of this._makeDomArray(target)) {
    const clonedSelf = this.clone().toArray();
    const { parent: parent2 } = el;
    if (!parent2) {
      continue;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      continue;
    uniqueSplice(siblings2, index2 + 1, 0, clonedSelf, parent2);
    clones.push(...clonedSelf);
  }
  return this._make(clones);
}
function before(...elems) {
  const lastIdx = this.length - 1;
  return domEach(this, (el, i) => {
    if (!hasChildren(el) || !el.parent) {
      return;
    }
    const siblings2 = el.parent.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    const domSrc = typeof elems[0] === "function" ? elems[0].call(el, i, this._render(el.children)) : elems;
    const dom = this._makeDomArray(domSrc, i < lastIdx);
    uniqueSplice(siblings2, index2, 0, dom, el.parent);
  });
}
function insertBefore(target) {
  const targetArr = this._make(target);
  this.remove();
  const clones = [];
  domEach(targetArr, (el) => {
    const clonedSelf = this.clone().toArray();
    const { parent: parent2 } = el;
    if (!parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const index2 = siblings2.indexOf(el);
    if (index2 < 0)
      return;
    uniqueSplice(siblings2, index2, 0, clonedSelf, parent2);
    clones.push(...clonedSelf);
  });
  return this._make(clones);
}
function remove(selector) {
  const elems = selector ? this.filter(selector) : this;
  domEach(elems, (el) => {
    removeElement(el);
    el.prev = el.next = el.parent = null;
  });
  return this;
}
function replaceWith(content) {
  return domEach(this, (el, i) => {
    const { parent: parent2 } = el;
    if (!parent2) {
      return;
    }
    const siblings2 = parent2.children;
    const cont = typeof content === "function" ? content.call(el, i, el) : content;
    const dom = this._makeDomArray(cont);
    update(dom, null);
    const index2 = siblings2.indexOf(el);
    uniqueSplice(siblings2, index2, 1, dom, parent2);
    if (!dom.includes(el)) {
      el.parent = el.prev = el.next = null;
    }
  });
}
function empty() {
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    for (const child of el.children) {
      child.next = child.prev = child.parent = null;
    }
    el.children.length = 0;
  });
}
function html2(str) {
  if (str === undefined) {
    const el = this[0];
    if (!el || !hasChildren(el))
      return null;
    return this._render(el.children);
  }
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    for (const child of el.children) {
      child.next = child.prev = child.parent = null;
    }
    const content = isCheerio(str) ? str.toArray() : this._parse(`${str}`, this.options, false, el).children;
    update(content, el);
  });
}
function toString3() {
  return this._render(this);
}
function text2(str) {
  if (str === undefined) {
    return text(this);
  }
  if (typeof str === "function") {
    return domEach(this, (el, i) => this._make(el).text(str.call(el, i, text([el]))));
  }
  return domEach(this, (el) => {
    if (!hasChildren(el))
      return;
    for (const child of el.children) {
      child.next = child.prev = child.parent = null;
    }
    const textNode = new Text2(`${str}`);
    update(textNode, el);
  });
}
function clone() {
  const clone2 = Array.prototype.map.call(this.get(), (el) => cloneNode(el, true));
  const root2 = new Document(clone2);
  for (const node4 of clone2) {
    node4.parent = root2;
  }
  return this._make(clone2);
}
var append3 = _insert((dom, children2, parent2) => {
  uniqueSplice(children2, children2.length, 0, dom, parent2);
});
var prepend2 = _insert((dom, children2, parent2) => {
  uniqueSplice(children2, 0, 0, dom, parent2);
});
var wrap = _wrap((el, elInsertLocation, wrapperDom) => {
  const { parent: parent2 } = el;
  if (!parent2)
    return;
  const siblings2 = parent2.children;
  const index2 = siblings2.indexOf(el);
  update([el], elInsertLocation);
  uniqueSplice(siblings2, index2, 0, wrapperDom, parent2);
});
var wrapInner = _wrap((el, elInsertLocation, wrapperDom) => {
  if (!hasChildren(el))
    return;
  update(el.children, elInsertLocation);
  update(wrapperDom, el);
});

// node_modules/cheerio/dist/browser/api/css.js
var exports_css = {};
__export(exports_css, {
  css: () => {
    {
      return css;
    }
  }
});
function css(prop2, val2) {
  if (prop2 != null && val2 != null || typeof prop2 === "object" && !Array.isArray(prop2)) {
    return domEach(this, (el, i) => {
      if (isTag2(el)) {
        setCss(el, prop2, val2, i);
      }
    });
  }
  if (this.length === 0) {
    return;
  }
  return getCss(this[0], prop2);
}
var setCss = function(el, prop2, value, idx) {
  if (typeof prop2 === "string") {
    const styles = getCss(el);
    const val2 = typeof value === "function" ? value.call(el, idx, styles[prop2]) : value;
    if (val2 === "") {
      delete styles[prop2];
    } else if (val2 != null) {
      styles[prop2] = val2;
    }
    el.attribs["style"] = stringify3(styles);
  } else if (typeof prop2 === "object") {
    const keys = Object.keys(prop2);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
      setCss(el, k, prop2[k], i);
    }
  }
};
var getCss = function(el, prop2) {
  if (!el || !isTag2(el))
    return;
  const styles = parse5(el.attribs["style"]);
  if (typeof prop2 === "string") {
    return styles[prop2];
  }
  if (Array.isArray(prop2)) {
    const newStyles = {};
    for (const item of prop2) {
      if (styles[item] != null) {
        newStyles[item] = styles[item];
      }
    }
    return newStyles;
  }
  return styles;
};
var stringify3 = function(obj) {
  return Object.keys(obj).reduce((str, prop2) => `${str}${str ? " " : ""}${prop2}: ${obj[prop2]};`, "");
};
var parse5 = function(styles) {
  styles = (styles || "").trim();
  if (!styles)
    return {};
  const obj = {};
  let key;
  for (const str of styles.split(";")) {
    const n = str.indexOf(":");
    if (n < 1 || n === str.length - 1) {
      const trimmed = str.trimEnd();
      if (trimmed.length > 0 && key !== undefined) {
        obj[key] += `;${trimmed}`;
      }
    } else {
      key = str.slice(0, n).trim();
      obj[key] = str.slice(n + 1).trim();
    }
  }
  return obj;
};

// node_modules/cheerio/dist/browser/api/forms.js
var exports_forms = {};
__export(exports_forms, {
  serializeArray: () => {
    {
      return serializeArray;
    }
  },
  serialize: () => {
    {
      return serialize;
    }
  }
});
function serialize() {
  const arr = this.serializeArray();
  const retArr = arr.map((data4) => `${encodeURIComponent(data4.name)}=${encodeURIComponent(data4.value)}`);
  return retArr.join("&").replace(r20, "+");
}
function serializeArray() {
  return this.map((_, elem) => {
    const $elem = this._make(elem);
    if (isTag2(elem) && elem.name === "form") {
      return $elem.find(submittableSelector).toArray();
    }
    return $elem.filter(submittableSelector).toArray();
  }).filter('[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map((_, elem) => {
    var _a2;
    const $elem = this._make(elem);
    const name = $elem.attr("name");
    const value = (_a2 = $elem.val()) !== null && _a2 !== undefined ? _a2 : "";
    if (Array.isArray(value)) {
      return value.map((val2) => ({ name, value: val2.replace(rCRLF, "\r\n") }));
    }
    return { name, value: value.replace(rCRLF, "\r\n") };
  }).toArray();
}
var submittableSelector = "input,select,textarea,keygen";
var r20 = /%20/g;
var rCRLF = /\r?\n/g;

// node_modules/cheerio/dist/browser/api/extract.js
var exports_extract = {};
__export(exports_extract, {
  extract: () => {
    {
      return extract2;
    }
  }
});
var getExtractDescr = function(descr) {
  var _a2;
  if (typeof descr === "string") {
    return { selector: descr, value: "textContent" };
  }
  return {
    selector: descr.selector,
    value: (_a2 = descr.value) !== null && _a2 !== undefined ? _a2 : "textContent"
  };
};
function extract2(map2) {
  const ret = {};
  for (const key in map2) {
    const descr = map2[key];
    const isArray2 = Array.isArray(descr);
    const { selector, value } = getExtractDescr(isArray2 ? descr[0] : descr);
    const fn = typeof value === "function" ? value : typeof value === "string" ? (el) => this._make(el).prop(value) : (el) => this._make(el).extract(value);
    if (isArray2) {
      ret[key] = this._findBySelector(selector, Number.POSITIVE_INFINITY).map((_, el) => fn(el, key, ret)).get();
    } else {
      const $ = this._findBySelector(selector, 1);
      ret[key] = $.length > 0 ? fn($[0], key, ret) : undefined;
    }
  }
  return ret;
}

// node_modules/cheerio/dist/browser/cheerio.js
class Cheerio {
  constructor(elements, root2, options2) {
    this.length = 0;
    this.options = options2;
    this._root = root2;
    if (elements) {
      for (let idx = 0;idx < elements.length; idx++) {
        this[idx] = elements[idx];
      }
      this.length = elements.length;
    }
  }
}
Cheerio.prototype.cheerio = "[cheerio object]";
Cheerio.prototype.splice = Array.prototype.splice;
Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(Cheerio.prototype, exports_attributes, exports_traversing, exports_manipulation, exports_css, exports_forms, exports_extract);

// node_modules/cheerio/dist/browser/load.js
function getLoad(parse6, render3) {
  return function load(content, options3, isDocument2 = true) {
    if (content == null) {
      throw new Error("cheerio.load() expects a string");
    }
    const internalOpts = flattenOptions(options3);
    const initialRoot = parse6(content, internalOpts, isDocument2, null);

    class LoadedCheerio extends Cheerio {
      _make(selector, context) {
        const cheerio2 = initialize(selector, context);
        cheerio2.prevObject = this;
        return cheerio2;
      }
      _parse(content2, options4, isDocument3, context) {
        return parse6(content2, options4, isDocument3, context);
      }
      _render(dom) {
        return render3(dom, this.options);
      }
    }
    function initialize(selector, context, root2 = initialRoot, opts) {
      if (selector && isCheerio(selector))
        return selector;
      const options4 = flattenOptions(opts, internalOpts);
      const r = typeof root2 === "string" ? [parse6(root2, options4, false, null)] : ("length" in root2) ? root2 : [root2];
      const rootInstance = isCheerio(r) ? r : new LoadedCheerio(r, null, options4);
      rootInstance._root = rootInstance;
      if (!selector) {
        return new LoadedCheerio(undefined, rootInstance, options4);
      }
      const elements = typeof selector === "string" && isHtml(selector) ? parse6(selector, options4, false, null).children : isNode(selector) ? [selector] : Array.isArray(selector) ? selector : undefined;
      const instance = new LoadedCheerio(elements, rootInstance, options4);
      if (elements) {
        return instance;
      }
      if (typeof selector !== "string") {
        throw new TypeError("Unexpected type of selector");
      }
      let search = selector;
      const searchContext = context ? typeof context === "string" ? isHtml(context) ? new LoadedCheerio([parse6(context, options4, false, null)], rootInstance, options4) : (search = `${context} ${search}`, rootInstance) : isCheerio(context) ? context : new LoadedCheerio(Array.isArray(context) ? context : [context], rootInstance, options4) : rootInstance;
      if (!searchContext)
        return instance;
      return searchContext.find(search);
    }
    Object.assign(initialize, exports_static, {
      load,
      _root: initialRoot,
      _options: internalOpts,
      fn: LoadedCheerio.prototype,
      prototype: LoadedCheerio.prototype
    });
    return initialize;
  };
}
var isNode = function(obj) {
  return !!obj.name || obj.type === "root" || obj.type === "text" || obj.type === "comment";
};

// node_modules/parse5/dist/common/unicode.js
function isSurrogate(cp) {
  return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
  return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
  return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
  return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
  return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}
var UNDEFINED_CODE_POINTS = new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]);
var REPLACEMENT_CHARACTER = "\uFFFD";
var CODE_POINTS;
(function(CODE_POINTS2) {
  CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
  CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
  CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
  CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
  CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
  CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
  CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  CODE_POINTS2[CODE_POINTS2["NUMBER_SIGN"] = 35] = "NUMBER_SIGN";
  CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
  CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
  CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
  CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
  CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
  CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
  CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_F"] = 70] = "LATIN_CAPITAL_F";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_X"] = 88] = "LATIN_CAPITAL_X";
  CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_F"] = 102] = "LATIN_SMALL_F";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_X"] = 120] = "LATIN_SMALL_X";
  CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
  CODE_POINTS2[CODE_POINTS2["REPLACEMENT_CHARACTER"] = 65533] = "REPLACEMENT_CHARACTER";
})(CODE_POINTS = CODE_POINTS || (CODE_POINTS = {}));
var SEQUENCES = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};

// node_modules/parse5/dist/common/error-codes.js
var ERR;
(function(ERR2) {
  ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
  ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
  ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
  ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
  ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  ERR2["missingEndTagName"] = "missing-end-tag-name";
  ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  ERR2["eofBeforeTagName"] = "eof-before-tag-name";
  ERR2["eofInTag"] = "eof-in-tag";
  ERR2["missingAttributeValue"] = "missing-attribute-value";
  ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
  ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  ERR2["eofInDoctype"] = "eof-in-doctype";
  ERR2["nestedComment"] = "nested-comment";
  ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  ERR2["eofInComment"] = "eof-in-comment";
  ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  ERR2["eofInCdata"] = "eof-in-cdata";
  ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  ERR2["nullCharacterReference"] = "null-character-reference";
  ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
  ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  ERR2["controlCharacterReference"] = "control-character-reference";
  ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
  ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  ERR2["missingDoctypeName"] = "missing-doctype-name";
  ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  ERR2["duplicateAttribute"] = "duplicate-attribute";
  ERR2["nonConformingDoctype"] = "non-conforming-doctype";
  ERR2["missingDoctype"] = "missing-doctype";
  ERR2["misplacedDoctype"] = "misplaced-doctype";
  ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
  ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
  ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR = ERR || (ERR = {}));

// node_modules/parse5/dist/tokenizer/preprocessor.js
var DEFAULT_BUFFER_WATERLINE = 1 << 16;

class Preprocessor {
  constructor(handler) {
    this.handler = handler;
    this.html = "";
    this.pos = -1;
    this.lastGapPos = -2;
    this.gapStack = [];
    this.skipNextNewLine = false;
    this.lastChunkWritten = false;
    this.endOfChunkHit = false;
    this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
    this.isEol = false;
    this.lineStartPos = 0;
    this.droppedBufferSize = 0;
    this.line = 1;
    this.lastErrOffset = -1;
  }
  get col() {
    return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(code) {
    const { line, col, offset } = this;
    return {
      code,
      startLine: line,
      endLine: line,
      startCol: col,
      endCol: col,
      startOffset: offset,
      endOffset: offset
    };
  }
  _err(code) {
    if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
      this.lastErrOffset = this.offset;
      this.handler.onParseError(this.getError(code));
    }
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos);
    this.lastGapPos = this.pos;
  }
  _processSurrogate(cp) {
    if (this.pos !== this.html.length - 1) {
      const nextCp = this.html.charCodeAt(this.pos + 1);
      if (isSurrogatePair(nextCp)) {
        this.pos++;
        this._addGap();
        return getSurrogatePairCodePoint(cp, nextCp);
      }
    } else if (!this.lastChunkWritten) {
      this.endOfChunkHit = true;
      return CODE_POINTS.EOF;
    }
    this._err(ERR.surrogateInInputStream);
    return cp;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    if (this.willDropParsedChunk()) {
      this.html = this.html.substring(this.pos);
      this.lineStartPos -= this.pos;
      this.droppedBufferSize += this.pos;
      this.pos = 0;
      this.lastGapPos = -2;
      this.gapStack.length = 0;
    }
  }
  write(chunk, isLastChunk) {
    if (this.html.length > 0) {
      this.html += chunk;
    } else {
      this.html = chunk;
    }
    this.endOfChunkHit = false;
    this.lastChunkWritten = isLastChunk;
  }
  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
    this.endOfChunkHit = false;
  }
  startsWith(pattern, caseSensitive) {
    if (this.pos + pattern.length > this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return false;
    }
    if (caseSensitive) {
      return this.html.startsWith(pattern, this.pos);
    }
    for (let i = 0;i < pattern.length; i++) {
      const cp = this.html.charCodeAt(this.pos + i) | 32;
      if (cp !== pattern.charCodeAt(i)) {
        return false;
      }
    }
    return true;
  }
  peek(offset) {
    const pos = this.pos + offset;
    if (pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    const code = this.html.charCodeAt(pos);
    return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  }
  advance() {
    this.pos++;
    if (this.isEol) {
      this.isEol = false;
      this.line++;
      this.lineStartPos = this.pos;
    }
    if (this.pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    let cp = this.html.charCodeAt(this.pos);
    if (cp === CODE_POINTS.CARRIAGE_RETURN) {
      this.isEol = true;
      this.skipNextNewLine = true;
      return CODE_POINTS.LINE_FEED;
    }
    if (cp === CODE_POINTS.LINE_FEED) {
      this.isEol = true;
      if (this.skipNextNewLine) {
        this.line--;
        this.skipNextNewLine = false;
        this._addGap();
        return this.advance();
      }
    }
    this.skipNextNewLine = false;
    if (isSurrogate(cp)) {
      cp = this._processSurrogate(cp);
    }
    const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
    if (!isCommonValidRange) {
      this._checkForProblematicCharacters(cp);
    }
    return cp;
  }
  _checkForProblematicCharacters(cp) {
    if (isControlCodePoint(cp)) {
      this._err(ERR.controlCharacterInInputStream);
    } else if (isUndefinedCodePoint(cp)) {
      this._err(ERR.noncharacterInInputStream);
    }
  }
  retreat(count) {
    this.pos -= count;
    while (this.pos < this.lastGapPos) {
      this.lastGapPos = this.gapStack.pop();
      this.pos--;
    }
    this.isEol = false;
  }
}

// node_modules/parse5/dist/common/token.js
function getTokenAttr(token, attrName) {
  for (let i = token.attrs.length - 1;i >= 0; i--) {
    if (token.attrs[i].name === attrName) {
      return token.attrs[i].value;
    }
  }
  return null;
}
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
  TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
  TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
  TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
  TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
  TokenType2[TokenType2["EOF"] = 7] = "EOF";
  TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType = TokenType || (TokenType = {}));

// node_modules/parse5/dist/common/html.js
var exports_html = {};
__export(exports_html, {
  isNumberedHeader: () => {
    {
      return isNumberedHeader;
    }
  },
  hasUnescapedText: () => {
    {
      return hasUnescapedText;
    }
  },
  getTagID: () => {
    {
      return getTagID;
    }
  },
  TAG_NAMES: () => {
    {
      return TAG_NAMES;
    }
  },
  TAG_ID: () => {
    {
      return TAG_ID;
    }
  },
  SPECIAL_ELEMENTS: () => {
    {
      return SPECIAL_ELEMENTS;
    }
  },
  NS: () => {
    {
      return NS;
    }
  },
  DOCUMENT_MODE: () => {
    {
      return DOCUMENT_MODE;
    }
  },
  ATTRS: () => {
    {
      return ATTRS;
    }
  }
});
function getTagID(tagName) {
  var _a2;
  return (_a2 = TAG_NAME_TO_ID.get(tagName)) !== null && _a2 !== undefined ? _a2 : TAG_ID.UNKNOWN;
}
function isNumberedHeader(tn) {
  return tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6;
}
function hasUnescapedText(tn, scriptingEnabled) {
  return UNESCAPED_TEXT.has(tn) || scriptingEnabled && tn === TAG_NAMES.NOSCRIPT;
}
var NS;
(function(NS2) {
  NS2["HTML"] = "http://www.w3.org/1999/xhtml";
  NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  NS2["SVG"] = "http://www.w3.org/2000/svg";
  NS2["XLINK"] = "http://www.w3.org/1999/xlink";
  NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
  NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS = NS || (NS = {}));
var ATTRS;
(function(ATTRS2) {
  ATTRS2["TYPE"] = "type";
  ATTRS2["ACTION"] = "action";
  ATTRS2["ENCODING"] = "encoding";
  ATTRS2["PROMPT"] = "prompt";
  ATTRS2["NAME"] = "name";
  ATTRS2["COLOR"] = "color";
  ATTRS2["FACE"] = "face";
  ATTRS2["SIZE"] = "size";
})(ATTRS = ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE2) {
  DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
  DOCUMENT_MODE2["QUIRKS"] = "quirks";
  DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE = DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES2) {
  TAG_NAMES2["A"] = "a";
  TAG_NAMES2["ADDRESS"] = "address";
  TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
  TAG_NAMES2["APPLET"] = "applet";
  TAG_NAMES2["AREA"] = "area";
  TAG_NAMES2["ARTICLE"] = "article";
  TAG_NAMES2["ASIDE"] = "aside";
  TAG_NAMES2["B"] = "b";
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BASEFONT"] = "basefont";
  TAG_NAMES2["BGSOUND"] = "bgsound";
  TAG_NAMES2["BIG"] = "big";
  TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["BR"] = "br";
  TAG_NAMES2["BUTTON"] = "button";
  TAG_NAMES2["CAPTION"] = "caption";
  TAG_NAMES2["CENTER"] = "center";
  TAG_NAMES2["CODE"] = "code";
  TAG_NAMES2["COL"] = "col";
  TAG_NAMES2["COLGROUP"] = "colgroup";
  TAG_NAMES2["DD"] = "dd";
  TAG_NAMES2["DESC"] = "desc";
  TAG_NAMES2["DETAILS"] = "details";
  TAG_NAMES2["DIALOG"] = "dialog";
  TAG_NAMES2["DIR"] = "dir";
  TAG_NAMES2["DIV"] = "div";
  TAG_NAMES2["DL"] = "dl";
  TAG_NAMES2["DT"] = "dt";
  TAG_NAMES2["EM"] = "em";
  TAG_NAMES2["EMBED"] = "embed";
  TAG_NAMES2["FIELDSET"] = "fieldset";
  TAG_NAMES2["FIGCAPTION"] = "figcaption";
  TAG_NAMES2["FIGURE"] = "figure";
  TAG_NAMES2["FONT"] = "font";
  TAG_NAMES2["FOOTER"] = "footer";
  TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
  TAG_NAMES2["FORM"] = "form";
  TAG_NAMES2["FRAME"] = "frame";
  TAG_NAMES2["FRAMESET"] = "frameset";
  TAG_NAMES2["H1"] = "h1";
  TAG_NAMES2["H2"] = "h2";
  TAG_NAMES2["H3"] = "h3";
  TAG_NAMES2["H4"] = "h4";
  TAG_NAMES2["H5"] = "h5";
  TAG_NAMES2["H6"] = "h6";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HEADER"] = "header";
  TAG_NAMES2["HGROUP"] = "hgroup";
  TAG_NAMES2["HR"] = "hr";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["I"] = "i";
  TAG_NAMES2["IMG"] = "img";
  TAG_NAMES2["IMAGE"] = "image";
  TAG_NAMES2["INPUT"] = "input";
  TAG_NAMES2["IFRAME"] = "iframe";
  TAG_NAMES2["KEYGEN"] = "keygen";
  TAG_NAMES2["LABEL"] = "label";
  TAG_NAMES2["LI"] = "li";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["LISTING"] = "listing";
  TAG_NAMES2["MAIN"] = "main";
  TAG_NAMES2["MALIGNMARK"] = "malignmark";
  TAG_NAMES2["MARQUEE"] = "marquee";
  TAG_NAMES2["MATH"] = "math";
  TAG_NAMES2["MENU"] = "menu";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["MGLYPH"] = "mglyph";
  TAG_NAMES2["MI"] = "mi";
  TAG_NAMES2["MO"] = "mo";
  TAG_NAMES2["MN"] = "mn";
  TAG_NAMES2["MS"] = "ms";
  TAG_NAMES2["MTEXT"] = "mtext";
  TAG_NAMES2["NAV"] = "nav";
  TAG_NAMES2["NOBR"] = "nobr";
  TAG_NAMES2["NOFRAMES"] = "noframes";
  TAG_NAMES2["NOEMBED"] = "noembed";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["OBJECT"] = "object";
  TAG_NAMES2["OL"] = "ol";
  TAG_NAMES2["OPTGROUP"] = "optgroup";
  TAG_NAMES2["OPTION"] = "option";
  TAG_NAMES2["P"] = "p";
  TAG_NAMES2["PARAM"] = "param";
  TAG_NAMES2["PLAINTEXT"] = "plaintext";
  TAG_NAMES2["PRE"] = "pre";
  TAG_NAMES2["RB"] = "rb";
  TAG_NAMES2["RP"] = "rp";
  TAG_NAMES2["RT"] = "rt";
  TAG_NAMES2["RTC"] = "rtc";
  TAG_NAMES2["RUBY"] = "ruby";
  TAG_NAMES2["S"] = "s";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["SECTION"] = "section";
  TAG_NAMES2["SELECT"] = "select";
  TAG_NAMES2["SOURCE"] = "source";
  TAG_NAMES2["SMALL"] = "small";
  TAG_NAMES2["SPAN"] = "span";
  TAG_NAMES2["STRIKE"] = "strike";
  TAG_NAMES2["STRONG"] = "strong";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["SUB"] = "sub";
  TAG_NAMES2["SUMMARY"] = "summary";
  TAG_NAMES2["SUP"] = "sup";
  TAG_NAMES2["TABLE"] = "table";
  TAG_NAMES2["TBODY"] = "tbody";
  TAG_NAMES2["TEMPLATE"] = "template";
  TAG_NAMES2["TEXTAREA"] = "textarea";
  TAG_NAMES2["TFOOT"] = "tfoot";
  TAG_NAMES2["TD"] = "td";
  TAG_NAMES2["TH"] = "th";
  TAG_NAMES2["THEAD"] = "thead";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["TR"] = "tr";
  TAG_NAMES2["TRACK"] = "track";
  TAG_NAMES2["TT"] = "tt";
  TAG_NAMES2["U"] = "u";
  TAG_NAMES2["UL"] = "ul";
  TAG_NAMES2["SVG"] = "svg";
  TAG_NAMES2["VAR"] = "var";
  TAG_NAMES2["WBR"] = "wbr";
  TAG_NAMES2["XMP"] = "xmp";
})(TAG_NAMES = TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID2) {
  TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
  TAG_ID2[TAG_ID2["A"] = 1] = "A";
  TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
  TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
  TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
  TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
  TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
  TAG_ID2[TAG_ID2["B"] = 8] = "B";
  TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
  TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
  TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
  TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
  TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
  TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
  TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
  TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
  TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
  TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
  TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
  TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
  TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
  TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
  TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
  TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
  TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
  TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
  TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
  TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
  TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
  TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
  TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
  TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
  TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
  TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
  TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
  TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
  TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
  TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
  TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
  TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
  TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
  TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
  TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
  TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
  TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
  TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
  TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
  TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
  TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
  TAG_ID2[TAG_ID2["I"] = 52] = "I";
  TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
  TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
  TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
  TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
  TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
  TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
  TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
  TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
  TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
  TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
  TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
  TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
  TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
  TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
  TAG_ID2[TAG_ID2["META"] = 67] = "META";
  TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
  TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
  TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
  TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
  TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
  TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
  TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
  TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
  TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
  TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
  TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
  TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
  TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
  TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
  TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
  TAG_ID2[TAG_ID2["P"] = 83] = "P";
  TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
  TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
  TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
  TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
  TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
  TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
  TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
  TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
  TAG_ID2[TAG_ID2["S"] = 92] = "S";
  TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
  TAG_ID2[TAG_ID2["SECTION"] = 94] = "SECTION";
  TAG_ID2[TAG_ID2["SELECT"] = 95] = "SELECT";
  TAG_ID2[TAG_ID2["SOURCE"] = 96] = "SOURCE";
  TAG_ID2[TAG_ID2["SMALL"] = 97] = "SMALL";
  TAG_ID2[TAG_ID2["SPAN"] = 98] = "SPAN";
  TAG_ID2[TAG_ID2["STRIKE"] = 99] = "STRIKE";
  TAG_ID2[TAG_ID2["STRONG"] = 100] = "STRONG";
  TAG_ID2[TAG_ID2["STYLE"] = 101] = "STYLE";
  TAG_ID2[TAG_ID2["SUB"] = 102] = "SUB";
  TAG_ID2[TAG_ID2["SUMMARY"] = 103] = "SUMMARY";
  TAG_ID2[TAG_ID2["SUP"] = 104] = "SUP";
  TAG_ID2[TAG_ID2["TABLE"] = 105] = "TABLE";
  TAG_ID2[TAG_ID2["TBODY"] = 106] = "TBODY";
  TAG_ID2[TAG_ID2["TEMPLATE"] = 107] = "TEMPLATE";
  TAG_ID2[TAG_ID2["TEXTAREA"] = 108] = "TEXTAREA";
  TAG_ID2[TAG_ID2["TFOOT"] = 109] = "TFOOT";
  TAG_ID2[TAG_ID2["TD"] = 110] = "TD";
  TAG_ID2[TAG_ID2["TH"] = 111] = "TH";
  TAG_ID2[TAG_ID2["THEAD"] = 112] = "THEAD";
  TAG_ID2[TAG_ID2["TITLE"] = 113] = "TITLE";
  TAG_ID2[TAG_ID2["TR"] = 114] = "TR";
  TAG_ID2[TAG_ID2["TRACK"] = 115] = "TRACK";
  TAG_ID2[TAG_ID2["TT"] = 116] = "TT";
  TAG_ID2[TAG_ID2["U"] = 117] = "U";
  TAG_ID2[TAG_ID2["UL"] = 118] = "UL";
  TAG_ID2[TAG_ID2["SVG"] = 119] = "SVG";
  TAG_ID2[TAG_ID2["VAR"] = 120] = "VAR";
  TAG_ID2[TAG_ID2["WBR"] = 121] = "WBR";
  TAG_ID2[TAG_ID2["XMP"] = 122] = "XMP";
})(TAG_ID = TAG_ID || (TAG_ID = {}));
var TAG_NAME_TO_ID = new Map([
  [TAG_NAMES.A, TAG_ID.A],
  [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  [TAG_NAMES.APPLET, TAG_ID.APPLET],
  [TAG_NAMES.AREA, TAG_ID.AREA],
  [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  [TAG_NAMES.B, TAG_ID.B],
  [TAG_NAMES.BASE, TAG_ID.BASE],
  [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  [TAG_NAMES.BIG, TAG_ID.BIG],
  [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  [TAG_NAMES.BODY, TAG_ID.BODY],
  [TAG_NAMES.BR, TAG_ID.BR],
  [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  [TAG_NAMES.CENTER, TAG_ID.CENTER],
  [TAG_NAMES.CODE, TAG_ID.CODE],
  [TAG_NAMES.COL, TAG_ID.COL],
  [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  [TAG_NAMES.DD, TAG_ID.DD],
  [TAG_NAMES.DESC, TAG_ID.DESC],
  [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  [TAG_NAMES.DIR, TAG_ID.DIR],
  [TAG_NAMES.DIV, TAG_ID.DIV],
  [TAG_NAMES.DL, TAG_ID.DL],
  [TAG_NAMES.DT, TAG_ID.DT],
  [TAG_NAMES.EM, TAG_ID.EM],
  [TAG_NAMES.EMBED, TAG_ID.EMBED],
  [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  [TAG_NAMES.FONT, TAG_ID.FONT],
  [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  [TAG_NAMES.FORM, TAG_ID.FORM],
  [TAG_NAMES.FRAME, TAG_ID.FRAME],
  [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  [TAG_NAMES.H1, TAG_ID.H1],
  [TAG_NAMES.H2, TAG_ID.H2],
  [TAG_NAMES.H3, TAG_ID.H3],
  [TAG_NAMES.H4, TAG_ID.H4],
  [TAG_NAMES.H5, TAG_ID.H5],
  [TAG_NAMES.H6, TAG_ID.H6],
  [TAG_NAMES.HEAD, TAG_ID.HEAD],
  [TAG_NAMES.HEADER, TAG_ID.HEADER],
  [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  [TAG_NAMES.HR, TAG_ID.HR],
  [TAG_NAMES.HTML, TAG_ID.HTML],
  [TAG_NAMES.I, TAG_ID.I],
  [TAG_NAMES.IMG, TAG_ID.IMG],
  [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  [TAG_NAMES.INPUT, TAG_ID.INPUT],
  [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  [TAG_NAMES.LABEL, TAG_ID.LABEL],
  [TAG_NAMES.LI, TAG_ID.LI],
  [TAG_NAMES.LINK, TAG_ID.LINK],
  [TAG_NAMES.LISTING, TAG_ID.LISTING],
  [TAG_NAMES.MAIN, TAG_ID.MAIN],
  [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  [TAG_NAMES.MATH, TAG_ID.MATH],
  [TAG_NAMES.MENU, TAG_ID.MENU],
  [TAG_NAMES.META, TAG_ID.META],
  [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  [TAG_NAMES.MI, TAG_ID.MI],
  [TAG_NAMES.MO, TAG_ID.MO],
  [TAG_NAMES.MN, TAG_ID.MN],
  [TAG_NAMES.MS, TAG_ID.MS],
  [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  [TAG_NAMES.NAV, TAG_ID.NAV],
  [TAG_NAMES.NOBR, TAG_ID.NOBR],
  [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  [TAG_NAMES.OL, TAG_ID.OL],
  [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  [TAG_NAMES.OPTION, TAG_ID.OPTION],
  [TAG_NAMES.P, TAG_ID.P],
  [TAG_NAMES.PARAM, TAG_ID.PARAM],
  [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  [TAG_NAMES.PRE, TAG_ID.PRE],
  [TAG_NAMES.RB, TAG_ID.RB],
  [TAG_NAMES.RP, TAG_ID.RP],
  [TAG_NAMES.RT, TAG_ID.RT],
  [TAG_NAMES.RTC, TAG_ID.RTC],
  [TAG_NAMES.RUBY, TAG_ID.RUBY],
  [TAG_NAMES.S, TAG_ID.S],
  [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  [TAG_NAMES.SECTION, TAG_ID.SECTION],
  [TAG_NAMES.SELECT, TAG_ID.SELECT],
  [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  [TAG_NAMES.SMALL, TAG_ID.SMALL],
  [TAG_NAMES.SPAN, TAG_ID.SPAN],
  [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  [TAG_NAMES.STRONG, TAG_ID.STRONG],
  [TAG_NAMES.STYLE, TAG_ID.STYLE],
  [TAG_NAMES.SUB, TAG_ID.SUB],
  [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  [TAG_NAMES.SUP, TAG_ID.SUP],
  [TAG_NAMES.TABLE, TAG_ID.TABLE],
  [TAG_NAMES.TBODY, TAG_ID.TBODY],
  [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  [TAG_NAMES.TD, TAG_ID.TD],
  [TAG_NAMES.TH, TAG_ID.TH],
  [TAG_NAMES.THEAD, TAG_ID.THEAD],
  [TAG_NAMES.TITLE, TAG_ID.TITLE],
  [TAG_NAMES.TR, TAG_ID.TR],
  [TAG_NAMES.TRACK, TAG_ID.TRACK],
  [TAG_NAMES.TT, TAG_ID.TT],
  [TAG_NAMES.U, TAG_ID.U],
  [TAG_NAMES.UL, TAG_ID.UL],
  [TAG_NAMES.SVG, TAG_ID.SVG],
  [TAG_NAMES.VAR, TAG_ID.VAR],
  [TAG_NAMES.WBR, TAG_ID.WBR],
  [TAG_NAMES.XMP, TAG_ID.XMP]
]);
var $ = TAG_ID;
var SPECIAL_ELEMENTS = {
  [NS.HTML]: new Set([
    $.ADDRESS,
    $.APPLET,
    $.AREA,
    $.ARTICLE,
    $.ASIDE,
    $.BASE,
    $.BASEFONT,
    $.BGSOUND,
    $.BLOCKQUOTE,
    $.BODY,
    $.BR,
    $.BUTTON,
    $.CAPTION,
    $.CENTER,
    $.COL,
    $.COLGROUP,
    $.DD,
    $.DETAILS,
    $.DIR,
    $.DIV,
    $.DL,
    $.DT,
    $.EMBED,
    $.FIELDSET,
    $.FIGCAPTION,
    $.FIGURE,
    $.FOOTER,
    $.FORM,
    $.FRAME,
    $.FRAMESET,
    $.H1,
    $.H2,
    $.H3,
    $.H4,
    $.H5,
    $.H6,
    $.HEAD,
    $.HEADER,
    $.HGROUP,
    $.HR,
    $.HTML,
    $.IFRAME,
    $.IMG,
    $.INPUT,
    $.LI,
    $.LINK,
    $.LISTING,
    $.MAIN,
    $.MARQUEE,
    $.MENU,
    $.META,
    $.NAV,
    $.NOEMBED,
    $.NOFRAMES,
    $.NOSCRIPT,
    $.OBJECT,
    $.OL,
    $.P,
    $.PARAM,
    $.PLAINTEXT,
    $.PRE,
    $.SCRIPT,
    $.SECTION,
    $.SELECT,
    $.SOURCE,
    $.STYLE,
    $.SUMMARY,
    $.TABLE,
    $.TBODY,
    $.TD,
    $.TEMPLATE,
    $.TEXTAREA,
    $.TFOOT,
    $.TH,
    $.THEAD,
    $.TITLE,
    $.TR,
    $.TRACK,
    $.UL,
    $.WBR,
    $.XMP
  ]),
  [NS.MATHML]: new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
  [NS.SVG]: new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
  [NS.XLINK]: new Set,
  [NS.XML]: new Set,
  [NS.XMLNS]: new Set
};
var UNESCAPED_TEXT = new Set([
  TAG_NAMES.STYLE,
  TAG_NAMES.SCRIPT,
  TAG_NAMES.XMP,
  TAG_NAMES.IFRAME,
  TAG_NAMES.NOEMBED,
  TAG_NAMES.NOFRAMES,
  TAG_NAMES.PLAINTEXT
]);

// node_modules/parse5/dist/tokenizer/index.js
var isAsciiDigit = function(cp) {
  return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
};
var isAsciiUpper = function(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
};
var isAsciiLower = function(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
};
var isAsciiLetter = function(cp) {
  return isAsciiLower(cp) || isAsciiUpper(cp);
};
var isAsciiAlphaNumeric2 = function(cp) {
  return isAsciiLetter(cp) || isAsciiDigit(cp);
};
var isAsciiUpperHexDigit = function(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_F;
};
var isAsciiLowerHexDigit = function(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_F;
};
var isAsciiHexDigit = function(cp) {
  return isAsciiDigit(cp) || isAsciiUpperHexDigit(cp) || isAsciiLowerHexDigit(cp);
};
var toAsciiLower = function(cp) {
  return cp + 32;
};
var isWhitespace2 = function(cp) {
  return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
};
var isEntityInAttributeInvalidEnd2 = function(nextCp) {
  return nextCp === CODE_POINTS.EQUALS_SIGN || isAsciiAlphaNumeric2(nextCp);
};
var isScriptDataDoubleEscapeSequenceEnd = function(cp) {
  return isWhitespace2(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
};
var C1_CONTROLS_REFERENCE_REPLACEMENTS = new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var State;
(function(State2) {
  State2[State2["DATA"] = 0] = "DATA";
  State2[State2["RCDATA"] = 1] = "RCDATA";
  State2[State2["RAWTEXT"] = 2] = "RAWTEXT";
  State2[State2["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  State2[State2["PLAINTEXT"] = 4] = "PLAINTEXT";
  State2[State2["TAG_OPEN"] = 5] = "TAG_OPEN";
  State2[State2["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  State2[State2["TAG_NAME"] = 7] = "TAG_NAME";
  State2[State2["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  State2[State2["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  State2[State2["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  State2[State2["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  State2[State2["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  State2[State2["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  State2[State2["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  State2[State2["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  State2[State2["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  State2[State2["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  State2[State2["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  State2[State2["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  State2[State2["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  State2[State2["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  State2[State2["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  State2[State2["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  State2[State2["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  State2[State2["COMMENT_START"] = 42] = "COMMENT_START";
  State2[State2["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  State2[State2["COMMENT"] = 44] = "COMMENT";
  State2[State2["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  State2[State2["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  State2[State2["COMMENT_END"] = 50] = "COMMENT_END";
  State2[State2["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  State2[State2["DOCTYPE"] = 52] = "DOCTYPE";
  State2[State2["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  State2[State2["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  State2[State2["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  State2[State2["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  State2[State2["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  State2[State2["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  State2[State2["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  State2[State2["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  State2[State2["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  State2[State2["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  State2[State2["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  State2[State2["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  State2[State2["NAMED_CHARACTER_REFERENCE"] = 72] = "NAMED_CHARACTER_REFERENCE";
  State2[State2["AMBIGUOUS_AMPERSAND"] = 73] = "AMBIGUOUS_AMPERSAND";
  State2[State2["NUMERIC_CHARACTER_REFERENCE"] = 74] = "NUMERIC_CHARACTER_REFERENCE";
  State2[State2["HEXADEMICAL_CHARACTER_REFERENCE_START"] = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START";
  State2[State2["HEXADEMICAL_CHARACTER_REFERENCE"] = 76] = "HEXADEMICAL_CHARACTER_REFERENCE";
  State2[State2["DECIMAL_CHARACTER_REFERENCE"] = 77] = "DECIMAL_CHARACTER_REFERENCE";
  State2[State2["NUMERIC_CHARACTER_REFERENCE_END"] = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(State || (State = {}));
var TokenizerMode = {
  DATA: State.DATA,
  RCDATA: State.RCDATA,
  RAWTEXT: State.RAWTEXT,
  SCRIPT_DATA: State.SCRIPT_DATA,
  PLAINTEXT: State.PLAINTEXT,
  CDATA_SECTION: State.CDATA_SECTION
};

class Tokenizer {
  constructor(options3, handler) {
    this.options = options3;
    this.handler = handler;
    this.paused = false;
    this.inLoop = false;
    this.inForeignNode = false;
    this.lastStartTagName = "";
    this.active = false;
    this.state = State.DATA;
    this.returnState = State.DATA;
    this.charRefCode = -1;
    this.consumedAfterSnapshot = -1;
    this.currentCharacterToken = null;
    this.currentToken = null;
    this.currentAttr = { name: "", value: "" };
    this.preprocessor = new Preprocessor(handler);
    this.currentLocation = this.getCurrentLocation(-1);
  }
  _err(code) {
    var _a2, _b;
    (_b = (_a2 = this.handler).onParseError) === null || _b === undefined || _b.call(_a2, this.preprocessor.getError(code));
  }
  getCurrentLocation(offset) {
    if (!this.options.sourceCodeLocationInfo) {
      return null;
    }
    return {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - offset,
      startOffset: this.preprocessor.offset - offset,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };
  }
  _runParsingLoop() {
    if (this.inLoop)
      return;
    this.inLoop = true;
    while (this.active && !this.paused) {
      this.consumedAfterSnapshot = 0;
      const cp = this._consume();
      if (!this._ensureHibernation()) {
        this._callState(cp);
      }
    }
    this.inLoop = false;
  }
  pause() {
    this.paused = true;
  }
  resume(writeCallback) {
    if (!this.paused) {
      throw new Error("Parser was already resumed");
    }
    this.paused = false;
    if (this.inLoop)
      return;
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === undefined || writeCallback();
    }
  }
  write(chunk, isLastChunk, writeCallback) {
    this.active = true;
    this.preprocessor.write(chunk, isLastChunk);
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === undefined || writeCallback();
    }
  }
  insertHtmlAtCurrentPos(chunk) {
    this.active = true;
    this.preprocessor.insertHtmlAtCurrentPos(chunk);
    this._runParsingLoop();
  }
  _ensureHibernation() {
    if (this.preprocessor.endOfChunkHit) {
      this._unconsume(this.consumedAfterSnapshot);
      this.active = false;
      return true;
    }
    return false;
  }
  _consume() {
    this.consumedAfterSnapshot++;
    return this.preprocessor.advance();
  }
  _unconsume(count) {
    this.consumedAfterSnapshot -= count;
    this.preprocessor.retreat(count);
  }
  _reconsumeInState(state, cp) {
    this.state = state;
    this._callState(cp);
  }
  _advanceBy(count) {
    this.consumedAfterSnapshot += count;
    for (let i = 0;i < count; i++) {
      this.preprocessor.advance();
    }
  }
  _consumeSequenceIfMatch(pattern, caseSensitive) {
    if (this.preprocessor.startsWith(pattern, caseSensitive)) {
      this._advanceBy(pattern.length - 1);
      return true;
    }
    return false;
  }
  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(offset) {
    this.currentToken = {
      type: TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(offset)
    };
  }
  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: TokenType.DOCTYPE,
      name: initialName,
      forceQuirks: false,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(type, chars) {
    this.currentCharacterToken = {
      type,
      chars,
      location: this.currentLocation
    };
  }
  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ""
    };
    this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var _a2;
    var _b;
    const token2 = this.currentToken;
    if (getTokenAttr(token2, this.currentAttr.name) === null) {
      token2.attrs.push(this.currentAttr);
      if (token2.location && this.currentLocation) {
        const attrLocations = (_a2 = (_b = token2.location).attrs) !== null && _a2 !== undefined ? _a2 : _b.attrs = Object.create(null);
        attrLocations[this.currentAttr.name] = this.currentLocation;
        this._leaveAttrValue();
      }
    } else {
      this._err(ERR.duplicateAttribute);
    }
  }
  _leaveAttrValue() {
    if (this.currentLocation) {
      this.currentLocation.endLine = this.preprocessor.line;
      this.currentLocation.endCol = this.preprocessor.col;
      this.currentLocation.endOffset = this.preprocessor.offset;
    }
  }
  prepareToken(ct) {
    this._emitCurrentCharacterToken(ct.location);
    this.currentToken = null;
    if (ct.location) {
      ct.location.endLine = this.preprocessor.line;
      ct.location.endCol = this.preprocessor.col + 1;
      ct.location.endOffset = this.preprocessor.offset + 1;
    }
    this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const ct = this.currentToken;
    this.prepareToken(ct);
    ct.tagID = getTagID(ct.tagName);
    if (ct.type === TokenType.START_TAG) {
      this.lastStartTagName = ct.tagName;
      this.handler.onStartTag(ct);
    } else {
      if (ct.attrs.length > 0) {
        this._err(ERR.endTagWithAttributes);
      }
      if (ct.selfClosing) {
        this._err(ERR.endTagWithTrailingSolidus);
      }
      this.handler.onEndTag(ct);
    }
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(ct) {
    this.prepareToken(ct);
    this.handler.onComment(ct);
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(ct) {
    this.prepareToken(ct);
    this.handler.onDoctype(ct);
    this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(nextLocation) {
    if (this.currentCharacterToken) {
      if (nextLocation && this.currentCharacterToken.location) {
        this.currentCharacterToken.location.endLine = nextLocation.startLine;
        this.currentCharacterToken.location.endCol = nextLocation.startCol;
        this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
      }
      switch (this.currentCharacterToken.type) {
        case TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const location = this.getCurrentLocation(0);
    if (location) {
      location.endLine = location.startLine;
      location.endCol = location.startCol;
      location.endOffset = location.startOffset;
    }
    this._emitCurrentCharacterToken(location);
    this.handler.onEof({ type: TokenType.EOF, location });
    this.active = false;
  }
  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken) {
      if (this.currentCharacterToken.type !== type) {
        this.currentLocation = this.getCurrentLocation(0);
        this._emitCurrentCharacterToken(this.currentLocation);
        this.preprocessor.dropParsedChunk();
      } else {
        this.currentCharacterToken.chars += ch;
        return;
      }
    }
    this._createCharacterToken(type, ch);
  }
  _emitCodePoint(cp) {
    const type = isWhitespace2(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
  }
  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  }
  _matchNamedCharacterReference(cp) {
    let result = null;
    let excess = 0;
    let withoutSemicolon = false;
    for (let i = 0, current = decode_data_html_default[0];i >= 0; cp = this._consume()) {
      i = determineBranch(decode_data_html_default, current, i + 1, cp);
      if (i < 0)
        break;
      excess += 1;
      current = decode_data_html_default[i];
      const masked = current & BinTrieFlags.VALUE_LENGTH;
      if (masked) {
        const valueLength = (masked >> 14) - 1;
        if (cp !== CODE_POINTS.SEMICOLON && this._isCharacterReferenceInAttribute() && isEntityInAttributeInvalidEnd2(this.preprocessor.peek(1))) {
          result = [CODE_POINTS.AMPERSAND];
          i += valueLength;
        } else {
          result = valueLength === 0 ? [decode_data_html_default[i] & ~BinTrieFlags.VALUE_LENGTH] : valueLength === 1 ? [decode_data_html_default[++i]] : [decode_data_html_default[++i], decode_data_html_default[++i]];
          excess = 0;
          withoutSemicolon = cp !== CODE_POINTS.SEMICOLON;
        }
        if (valueLength === 0) {
          this._consume();
          break;
        }
      }
    }
    this._unconsume(excess);
    if (withoutSemicolon && !this.preprocessor.endOfChunkHit) {
      this._err(ERR.missingSemicolonAfterCharacterReference);
    }
    this._unconsume(1);
    return result;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(cp) {
    if (this._isCharacterReferenceInAttribute()) {
      this.currentAttr.value += String.fromCodePoint(cp);
    } else {
      this._emitCodePoint(cp);
    }
  }
  _callState(cp) {
    switch (this.state) {
      case State.DATA: {
        this._stateData(cp);
        break;
      }
      case State.RCDATA: {
        this._stateRcdata(cp);
        break;
      }
      case State.RAWTEXT: {
        this._stateRawtext(cp);
        break;
      }
      case State.SCRIPT_DATA: {
        this._stateScriptData(cp);
        break;
      }
      case State.PLAINTEXT: {
        this._statePlaintext(cp);
        break;
      }
      case State.TAG_OPEN: {
        this._stateTagOpen(cp);
        break;
      }
      case State.END_TAG_OPEN: {
        this._stateEndTagOpen(cp);
        break;
      }
      case State.TAG_NAME: {
        this._stateTagName(cp);
        break;
      }
      case State.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(cp);
        break;
      }
      case State.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(cp);
        break;
      }
      case State.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(cp);
        break;
      }
      case State.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(cp);
        break;
      }
      case State.ATTRIBUTE_NAME: {
        this._stateAttributeName(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(cp);
        break;
      }
      case State.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(cp);
        break;
      }
      case State.BOGUS_COMMENT: {
        this._stateBogusComment(cp);
        break;
      }
      case State.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(cp);
        break;
      }
      case State.COMMENT_START: {
        this._stateCommentStart(cp);
        break;
      }
      case State.COMMENT_START_DASH: {
        this._stateCommentStartDash(cp);
        break;
      }
      case State.COMMENT: {
        this._stateComment(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(cp);
        break;
      }
      case State.COMMENT_END_DASH: {
        this._stateCommentEndDash(cp);
        break;
      }
      case State.COMMENT_END: {
        this._stateCommentEnd(cp);
        break;
      }
      case State.COMMENT_END_BANG: {
        this._stateCommentEndBang(cp);
        break;
      }
      case State.DOCTYPE: {
        this._stateDoctype(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case State.DOCTYPE_NAME: {
        this._stateDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(cp);
        break;
      }
      case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(cp);
        break;
      }
      case State.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(cp);
        break;
      }
      case State.CDATA_SECTION: {
        this._stateCdataSection(cp);
        break;
      }
      case State.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(cp);
        break;
      }
      case State.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(cp);
        break;
      }
      case State.CHARACTER_REFERENCE: {
        this._stateCharacterReference(cp);
        break;
      }
      case State.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(cp);
        break;
      }
      case State.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(cp);
        break;
      }
      case State.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(cp);
        break;
      }
      case State.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(cp);
        break;
      }
      case State.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(cp);
        break;
      }
      case State.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(cp);
        break;
      }
      case State.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(cp);
        break;
      }
      default: {
        throw new Error("Unknown state");
      }
    }
  }
  _stateData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.TAG_OPEN;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State.DATA;
        this.state = State.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateRcdata(cp) {
    switch (cp) {
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State.RCDATA;
        this.state = State.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateRawtext(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _statePlaintext(cp) {
    switch (cp) {
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createStartTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.MARKUP_DECLARATION_OPEN;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.QUESTION_MARK: {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
          this._createCommentToken(1);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("<");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._emitChars("<");
          this.state = State.DATA;
          this._stateData(cp);
        }
      }
  }
  _stateEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingEndTagName);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("</");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._createCommentToken(2);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp);
        }
      }
  }
  _stateTagName(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.tagName += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  _stateRcdataLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.RCDATA_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  _stateRcdataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.RCDATA_END_TAG_NAME;
      this._stateRcdataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  handleSpecialEndTag(_cp) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
      return !this._ensureHibernation();
    }
    this._createEndTagToken();
    const token2 = this.currentToken;
    token2.tagName = this.lastStartTagName;
    const cp = this.preprocessor.peek(this.lastStartTagName.length);
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        return false;
      }
      case CODE_POINTS.SOLIDUS: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.SELF_CLOSING_START_TAG;
        return false;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._advanceBy(this.lastStartTagName.length);
        this.emitCurrentTagToken();
        this.state = State.DATA;
        return false;
      }
      default: {
        return !this._ensureHibernation();
      }
    }
  }
  _stateRcdataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  _stateRawtextLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.RAWTEXT_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  _stateRawtextEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.RAWTEXT_END_TAG_NAME;
      this._stateRawtextEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  _stateRawtextEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  _stateScriptDataLessThanSign(cp) {
    switch (cp) {
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.SCRIPT_DATA_ESCAPE_START;
        this._emitChars("<!");
        break;
      }
      default: {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
  }
  _stateScriptDataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.SCRIPT_DATA_END_TAG_NAME;
      this._stateScriptDataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  _stateScriptDataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  _stateScriptDataEscapeStart(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  _stateScriptDataEscapeStartDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  _stateScriptDataEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
    } else if (isAsciiLetter(cp)) {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
      this._stateScriptDataDoubleEscapeStart(cp);
    } else {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  _stateScriptDataEscapedEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
      this._stateScriptDataEscapedEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  _stateScriptDataEscapedEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  _stateScriptDataDoubleEscapeStart(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0;i < SEQUENCES.SCRIPT.length; i++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  _stateScriptDataDoubleEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataDoubleEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataDoubleEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  _stateScriptDataDoubleEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
      this._emitChars("/");
    } else {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  _stateScriptDataDoubleEscapeEnd(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i = 0;i < SEQUENCES.SCRIPT.length; i++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  _stateBeforeAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
        this._createAttr("=");
        this.state = State.ATTRIBUTE_NAME;
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  _stateAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this._leaveAttrName();
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName();
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN: {
        this._err(ERR.unexpectedCharacterInAttributeName);
        this.currentAttr.name += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.name += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  _stateAfterAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  _stateBeforeAttributeValue(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingAttributeValue);
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      default: {
        this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
        this._stateAttributeValueUnquoted(cp);
      }
    }
  }
  _stateAttributeValueDoubleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        this.state = State.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  _stateAttributeValueSingleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        this.state = State.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  _stateAttributeValueUnquoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this.returnState = State.ATTRIBUTE_VALUE_UNQUOTED;
        this.state = State.CHARACTER_REFERENCE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN:
      case CODE_POINTS.EQUALS_SIGN:
      case CODE_POINTS.GRAVE_ACCENT: {
        this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
        this.currentAttr.value += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  _stateAfterAttributeValueQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue();
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBetweenAttributes);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  _stateSelfClosingStartTag(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        const token2 = this.currentToken;
        token2.selfClosing = true;
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedSolidusInTag);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  _stateBogusComment(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.data += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        token2.data += String.fromCodePoint(cp);
      }
    }
  }
  _stateMarkupDeclarationOpen(cp) {
    if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
      this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
      this.state = State.COMMENT_START;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
      this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
      this.state = State.DOCTYPE;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
      if (this.inForeignNode) {
        this.state = State.CDATA_SECTION;
      } else {
        this._err(ERR.cdataInHtmlContent);
        this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
        this.currentToken.data = "[CDATA[";
        this.state = State.BOGUS_COMMENT;
      }
    } else if (!this._ensureHibernation()) {
      this._err(ERR.incorrectlyOpenedComment);
      this._createCommentToken(2);
      this.state = State.BOGUS_COMMENT;
      this._stateBogusComment(cp);
    }
  }
  _stateCommentStart(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_START_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        const token2 = this.currentToken;
        this.emitCurrentComment(token2);
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateCommentStartDash(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        this.emitCurrentComment(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateComment(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token2.data += "<";
        this.state = State.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.data += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.data += String.fromCodePoint(cp);
      }
    }
  }
  _stateCommentLessThanSign(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.EXCLAMATION_MARK: {
        token2.data += "!";
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token2.data += "<";
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateCommentLessThanSignBang(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
    } else {
      this.state = State.COMMENT;
      this._stateComment(cp);
    }
  }
  _stateCommentLessThanSignBangDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
    } else {
      this.state = State.COMMENT_END_DASH;
      this._stateCommentEndDash(cp);
    }
  }
  _stateCommentLessThanSignBangDashDash(cp) {
    if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
      this._err(ERR.nestedComment);
    }
    this.state = State.COMMENT_END;
    this._stateCommentEnd(cp);
  }
  _stateCommentEndDash(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateCommentEnd(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token2);
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.COMMENT_END_BANG;
        break;
      }
      case CODE_POINTS.HYPHEN_MINUS: {
        token2.data += "-";
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.data += "--";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateCommentEndBang(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        token2.data += "--!";
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.incorrectlyClosedComment);
        this.state = State.DATA;
        this.emitCurrentComment(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.data += "--!";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  _stateDoctype(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        this._createDoctypeToken(null);
        const token2 = this.currentToken;
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBeforeDoctypeName);
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
      }
    }
  }
  _stateBeforeDoctypeName(cp) {
    if (isAsciiUpper(cp)) {
      this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
      this.state = State.DOCTYPE_NAME;
    } else
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._createDoctypeToken(REPLACEMENT_CHARACTER);
          this.state = State.DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeName);
          this._createDoctypeToken(null);
          const token2 = this.currentToken;
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token2 = this.currentToken;
          token2.forceQuirks = true;
          this.emitCurrentDoctype(token2);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createDoctypeToken(String.fromCodePoint(cp));
          this.state = State.DOCTYPE_NAME;
        }
      }
  }
  _stateDoctypeName(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.AFTER_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.name += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  _stateAfterDoctypeName(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
          this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
        } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
          this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
        } else if (!this._ensureHibernation()) {
          this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
          token2.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
  }
  _stateAfterDoctypePublicKeyword(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token2.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token2.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateBeforeDoctypePublicIdentifier(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token2.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token2.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateDoctypePublicIdentifierDoubleQuoted(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.publicId += String.fromCodePoint(cp);
      }
    }
  }
  _stateDoctypePublicIdentifierSingleQuoted(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.publicId += String.fromCodePoint(cp);
      }
    }
  }
  _stateAfterDoctypePublicIdentifier(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateAfterDoctypeSystemKeyword(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateBeforeDoctypeSystemIdentifier(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token2.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token2);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.systemId += String.fromCodePoint(cp);
      }
    }
  }
  _stateDoctypeSystemIdentifierSingleQuoted(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token2.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        token2.systemId += String.fromCodePoint(cp);
      }
    }
  }
  _stateAfterDoctypeSystemIdentifier(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token2.forceQuirks = true;
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  _stateBogusDoctype(cp) {
    const token2 = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token2);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentDoctype(token2);
        this._emitEOFToken();
        break;
      }
      default:
    }
  }
  _stateCdataSection(cp) {
    switch (cp) {
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = State.CDATA_SECTION_BRACKET;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInCdata);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  _stateCdataSectionBracket(cp) {
    if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
      this.state = State.CDATA_SECTION_END;
    } else {
      this._emitChars("]");
      this.state = State.CDATA_SECTION;
      this._stateCdataSection(cp);
    }
  }
  _stateCdataSectionEnd(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default: {
        this._emitChars("]]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
  }
  _stateCharacterReference(cp) {
    if (cp === CODE_POINTS.NUMBER_SIGN) {
      this.state = State.NUMERIC_CHARACTER_REFERENCE;
    } else if (isAsciiAlphaNumeric2(cp)) {
      this.state = State.NAMED_CHARACTER_REFERENCE;
      this._stateNamedCharacterReference(cp);
    } else {
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._reconsumeInState(this.returnState, cp);
    }
  }
  _stateNamedCharacterReference(cp) {
    const matchResult = this._matchNamedCharacterReference(cp);
    if (this._ensureHibernation()) {
    } else if (matchResult) {
      for (let i = 0;i < matchResult.length; i++) {
        this._flushCodePointConsumedAsCharacterReference(matchResult[i]);
      }
      this.state = this.returnState;
    } else {
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this.state = State.AMBIGUOUS_AMPERSAND;
    }
  }
  _stateAmbiguousAmpersand(cp) {
    if (isAsciiAlphaNumeric2(cp)) {
      this._flushCodePointConsumedAsCharacterReference(cp);
    } else {
      if (cp === CODE_POINTS.SEMICOLON) {
        this._err(ERR.unknownNamedCharacterReference);
      }
      this._reconsumeInState(this.returnState, cp);
    }
  }
  _stateNumericCharacterReference(cp) {
    this.charRefCode = 0;
    if (cp === CODE_POINTS.LATIN_SMALL_X || cp === CODE_POINTS.LATIN_CAPITAL_X) {
      this.state = State.HEXADEMICAL_CHARACTER_REFERENCE_START;
    } else if (isAsciiDigit(cp)) {
      this.state = State.DECIMAL_CHARACTER_REFERENCE;
      this._stateDecimalCharacterReference(cp);
    } else {
      this._err(ERR.absenceOfDigitsInNumericCharacterReference);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.NUMBER_SIGN);
      this._reconsumeInState(this.returnState, cp);
    }
  }
  _stateHexademicalCharacterReferenceStart(cp) {
    if (isAsciiHexDigit(cp)) {
      this.state = State.HEXADEMICAL_CHARACTER_REFERENCE;
      this._stateHexademicalCharacterReference(cp);
    } else {
      this._err(ERR.absenceOfDigitsInNumericCharacterReference);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.NUMBER_SIGN);
      this._unconsume(2);
      this.state = this.returnState;
    }
  }
  _stateHexademicalCharacterReference(cp) {
    if (isAsciiUpperHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 55;
    } else if (isAsciiLowerHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 87;
    } else if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 48;
    } else if (cp === CODE_POINTS.SEMICOLON) {
      this.state = State.NUMERIC_CHARACTER_REFERENCE_END;
    } else {
      this._err(ERR.missingSemicolonAfterCharacterReference);
      this.state = State.NUMERIC_CHARACTER_REFERENCE_END;
      this._stateNumericCharacterReferenceEnd(cp);
    }
  }
  _stateDecimalCharacterReference(cp) {
    if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 10 + cp - 48;
    } else if (cp === CODE_POINTS.SEMICOLON) {
      this.state = State.NUMERIC_CHARACTER_REFERENCE_END;
    } else {
      this._err(ERR.missingSemicolonAfterCharacterReference);
      this.state = State.NUMERIC_CHARACTER_REFERENCE_END;
      this._stateNumericCharacterReferenceEnd(cp);
    }
  }
  _stateNumericCharacterReferenceEnd(cp) {
    if (this.charRefCode === CODE_POINTS.NULL) {
      this._err(ERR.nullCharacterReference);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (this.charRefCode > 1114111) {
      this._err(ERR.characterReferenceOutsideUnicodeRange);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (isSurrogate(this.charRefCode)) {
      this._err(ERR.surrogateCharacterReference);
      this.charRefCode = CODE_POINTS.REPLACEMENT_CHARACTER;
    } else if (isUndefinedCodePoint(this.charRefCode)) {
      this._err(ERR.noncharacterCharacterReference);
    } else if (isControlCodePoint(this.charRefCode) || this.charRefCode === CODE_POINTS.CARRIAGE_RETURN) {
      this._err(ERR.controlCharacterReference);
      const replacement = C1_CONTROLS_REFERENCE_REPLACEMENTS.get(this.charRefCode);
      if (replacement !== undefined) {
        this.charRefCode = replacement;
      }
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode);
    this._reconsumeInState(this.returnState, cp);
  }
}

// node_modules/parse5/dist/parser/open-element-stack.js
var IMPLICIT_END_TAG_REQUIRED = new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = new Set([
  ...IMPLICIT_END_TAG_REQUIRED,
  TAG_ID.CAPTION,
  TAG_ID.COLGROUP,
  TAG_ID.TBODY,
  TAG_ID.TD,
  TAG_ID.TFOOT,
  TAG_ID.TH,
  TAG_ID.THEAD,
  TAG_ID.TR
]);
var SCOPING_ELEMENT_NS = new Map([
  [TAG_ID.APPLET, NS.HTML],
  [TAG_ID.CAPTION, NS.HTML],
  [TAG_ID.HTML, NS.HTML],
  [TAG_ID.MARQUEE, NS.HTML],
  [TAG_ID.OBJECT, NS.HTML],
  [TAG_ID.TABLE, NS.HTML],
  [TAG_ID.TD, NS.HTML],
  [TAG_ID.TEMPLATE, NS.HTML],
  [TAG_ID.TH, NS.HTML],
  [TAG_ID.ANNOTATION_XML, NS.MATHML],
  [TAG_ID.MI, NS.MATHML],
  [TAG_ID.MN, NS.MATHML],
  [TAG_ID.MO, NS.MATHML],
  [TAG_ID.MS, NS.MATHML],
  [TAG_ID.MTEXT, NS.MATHML],
  [TAG_ID.DESC, NS.SVG],
  [TAG_ID.FOREIGN_OBJECT, NS.SVG],
  [TAG_ID.TITLE, NS.SVG]
]);
var NAMED_HEADERS = [TAG_ID.H1, TAG_ID.H2, TAG_ID.H3, TAG_ID.H4, TAG_ID.H5, TAG_ID.H6];
var TABLE_ROW_CONTEXT = [TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML];
var TABLE_BODY_CONTEXT = [TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML];
var TABLE_CONTEXT = [TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML];
var TABLE_CELLS = [TAG_ID.TD, TAG_ID.TH];

class OpenElementStack {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(document2, treeAdapter, handler) {
    this.treeAdapter = treeAdapter;
    this.handler = handler;
    this.items = [];
    this.tagIDs = [];
    this.stackTop = -1;
    this.tmplCount = 0;
    this.currentTagId = TAG_ID.UNKNOWN;
    this.current = document2;
  }
  _indexOf(element) {
    return this.items.lastIndexOf(element, this.stackTop);
  }
  _isInTemplate() {
    return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop];
    this.currentTagId = this.tagIDs[this.stackTop];
  }
  push(element, tagID) {
    this.stackTop++;
    this.items[this.stackTop] = element;
    this.current = element;
    this.tagIDs[this.stackTop] = tagID;
    this.currentTagId = tagID;
    if (this._isInTemplate()) {
      this.tmplCount++;
    }
    this.handler.onItemPush(element, tagID, true);
  }
  pop() {
    const popped = this.current;
    if (this.tmplCount > 0 && this._isInTemplate()) {
      this.tmplCount--;
    }
    this.stackTop--;
    this._updateCurrentElement();
    this.handler.onItemPop(popped, true);
  }
  replace(oldElement, newElement) {
    const idx = this._indexOf(oldElement);
    this.items[idx] = newElement;
    if (idx === this.stackTop) {
      this.current = newElement;
    }
  }
  insertAfter(referenceElement, newElement, newElementID) {
    const insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement);
    this.tagIDs.splice(insertionIdx, 0, newElementID);
    this.stackTop++;
    if (insertionIdx === this.stackTop) {
      this._updateCurrentElement();
    }
    this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
  }
  popUntilTagNamePopped(tagName) {
    let targetIdx = this.stackTop + 1;
    do {
      targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
    } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
    this.shortenToLength(targetIdx < 0 ? 0 : targetIdx);
  }
  shortenToLength(idx) {
    while (this.stackTop >= idx) {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount -= 1;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, this.stackTop < idx);
    }
  }
  popUntilElementPopped(element) {
    const idx = this._indexOf(element);
    this.shortenToLength(idx < 0 ? 0 : idx);
  }
  popUntilPopped(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx < 0 ? 0 : idx);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(NAMED_HEADERS, NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(TABLE_CELLS, NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0;
    this.shortenToLength(1);
  }
  _indexOfTagNames(tagNames, namespace) {
    for (let i = this.stackTop;i >= 0; i--) {
      if (tagNames.includes(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
        return i;
      }
    }
    return -1;
  }
  clearBackTo(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  }
  remove(element) {
    const idx = this._indexOf(element);
    if (idx >= 0) {
      if (idx === this.stackTop) {
        this.pop();
      } else {
        this.items.splice(idx, 1);
        this.tagIDs.splice(idx, 1);
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(element, false);
      }
    }
  }
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  }
  contains(element) {
    return this._indexOf(element) > -1;
  }
  getCommonAncestor(element) {
    const elementIdx = this._indexOf(element) - 1;
    return elementIdx >= 0 ? this.items[elementIdx] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  }
  hasInScope(tagName) {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if (SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasNumberedHeaderInScope() {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (isNumberedHeader(tn) && ns === NS.HTML) {
        return true;
      }
      if (SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInListItemScope(tagName) {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if ((tn === TAG_ID.UL || tn === TAG_ID.OL) && ns === NS.HTML || SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInButtonScope(tagName) {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (tn === tagName && ns === NS.HTML) {
        return true;
      }
      if (tn === TAG_ID.BUTTON && ns === NS.HTML || SCOPING_ELEMENT_NS.get(tn) === ns) {
        return false;
      }
    }
    return true;
  }
  hasInTableScope(tagName) {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === tagName) {
        return true;
      }
      if (tn === TAG_ID.TABLE || tn === TAG_ID.TEMPLATE || tn === TAG_ID.HTML) {
        return false;
      }
    }
    return true;
  }
  hasTableBodyContextInTableScope() {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === TAG_ID.TBODY || tn === TAG_ID.THEAD || tn === TAG_ID.TFOOT) {
        return true;
      }
      if (tn === TAG_ID.TABLE || tn === TAG_ID.HTML) {
        return false;
      }
    }
    return true;
  }
  hasInSelectScope(tagName) {
    for (let i = this.stackTop;i >= 0; i--) {
      const tn = this.tagIDs[i];
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
      if (ns !== NS.HTML) {
        continue;
      }
      if (tn === tagName) {
        return true;
      }
      if (tn !== TAG_ID.OPTION && tn !== TAG_ID.OPTGROUP) {
        return false;
      }
    }
    return true;
  }
  generateImpliedEndTags() {
    while (IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsThoroughly() {
    while (IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsWithExclusion(exclusionId) {
    while (this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
}

// node_modules/parse5/dist/parser/formatting-element-list.js
var NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType2) {
  EntryType2[EntryType2["Marker"] = 0] = "Marker";
  EntryType2[EntryType2["Element"] = 1] = "Element";
})(EntryType = EntryType || (EntryType = {}));
var MARKER = { type: EntryType.Marker };

class FormattingElementList {
  constructor(treeAdapter) {
    this.treeAdapter = treeAdapter;
    this.entries = [];
    this.bookmark = null;
  }
  _getNoahArkConditionCandidates(newElement, neAttrs) {
    const candidates = [];
    const neAttrsLength = neAttrs.length;
    const neTagName = this.treeAdapter.getTagName(newElement);
    const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
    for (let i = 0;i < this.entries.length; i++) {
      const entry = this.entries[i];
      if (entry.type === EntryType.Marker) {
        break;
      }
      const { element } = entry;
      if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
        const elementAttrs = this.treeAdapter.getAttrList(element);
        if (elementAttrs.length === neAttrsLength) {
          candidates.push({ idx: i, attrs: elementAttrs });
        }
      }
    }
    return candidates;
  }
  _ensureNoahArkCondition(newElement) {
    if (this.entries.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrs = this.treeAdapter.getAttrList(newElement);
    const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
    if (candidates.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
    let validCandidates = 0;
    for (let i = 0;i < candidates.length; i++) {
      const candidate = candidates[i];
      if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
        validCandidates += 1;
        if (validCandidates >= NOAH_ARK_CAPACITY) {
          this.entries.splice(candidate.idx, 1);
        }
      }
    }
  }
  insertMarker() {
    this.entries.unshift(MARKER);
  }
  pushElement(element, token2) {
    this._ensureNoahArkCondition(element);
    this.entries.unshift({
      type: EntryType.Element,
      element,
      token: token2
    });
  }
  insertElementAfterBookmark(element, token2) {
    const bookmarkIdx = this.entries.indexOf(this.bookmark);
    this.entries.splice(bookmarkIdx, 0, {
      type: EntryType.Element,
      element,
      token: token2
    });
  }
  removeEntry(entry) {
    const entryIndex = this.entries.indexOf(entry);
    if (entryIndex >= 0) {
      this.entries.splice(entryIndex, 1);
    }
  }
  clearToLastMarker() {
    const markerIdx = this.entries.indexOf(MARKER);
    if (markerIdx >= 0) {
      this.entries.splice(0, markerIdx + 1);
    } else {
      this.entries.length = 0;
    }
  }
  getElementEntryInScopeWithTagName(tagName) {
    const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
    return entry && entry.type === EntryType.Element ? entry : null;
  }
  getElementEntry(element) {
    return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
  }
}

// node_modules/parse5/dist/tree-adapters/default.js
var createTextNode = function(value) {
  return {
    nodeName: "#text",
    value,
    parentNode: null
  };
};
var defaultTreeAdapter = {
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data4) {
    return {
      nodeName: "#comment",
      data: data4,
      parentNode: null
    };
  },
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document2, name, publicId, systemId) {
    const doctypeNode = document2.childNodes.find((node4) => node4.nodeName === "#documentType");
    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      const node4 = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter.appendChild(document2, node4);
    }
  },
  setDocumentMode(document2, mode) {
    document2.mode = mode;
  },
  getDocumentMode(document2) {
    return document2.mode;
  },
  detachNode(node4) {
    if (node4.parentNode) {
      const idx = node4.parentNode.childNodes.indexOf(node4);
      node4.parentNode.childNodes.splice(idx, 1);
      node4.parentNode = null;
    }
  },
  insertText(parentNode, text3) {
    if (parentNode.childNodes.length > 0) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text3;
        return;
      }
    }
    defaultTreeAdapter.appendChild(parentNode, createTextNode(text3));
  },
  insertTextBefore(parentNode, text3, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
      prevNode.value += text3;
    } else {
      defaultTreeAdapter.insertBefore(parentNode, createTextNode(text3), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = new Set(recipient.attrs.map((attr2) => attr2.name));
    for (let j = 0;j < attrs.length; j++) {
      if (!recipientAttrsMap.has(attrs[j].name)) {
        recipient.attrs.push(attrs[j]);
      }
    }
  },
  getFirstChild(node4) {
    return node4.childNodes[0];
  },
  getChildNodes(node4) {
    return node4.childNodes;
  },
  getParentNode(node4) {
    return node4.parentNode;
  },
  getAttrList(element) {
    return element.attrs;
  },
  getTagName(element) {
    return element.tagName;
  },
  getNamespaceURI(element) {
    return element.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  isTextNode(node4) {
    return node4.nodeName === "#text";
  },
  isCommentNode(node4) {
    return node4.nodeName === "#comment";
  },
  isDocumentTypeNode(node4) {
    return node4.nodeName === "#documentType";
  },
  isElementNode(node4) {
    return Object.prototype.hasOwnProperty.call(node4, "tagName");
  },
  setNodeSourceCodeLocation(node4, location) {
    node4.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node4) {
    return node4.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node4, endLocation) {
    node4.sourceCodeLocation = { ...node4.sourceCodeLocation, ...endLocation };
  }
};

// node_modules/parse5/dist/common/doctype.js
var hasPrefix = function(publicId, prefixes) {
  return prefixes.some((prefix) => publicId.startsWith(prefix));
};
function isConforming(token2) {
  return token2.name === VALID_DOCTYPE_NAME && token2.publicId === null && (token2.systemId === null || token2.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token2) {
  if (token2.name !== VALID_DOCTYPE_NAME) {
    return DOCUMENT_MODE.QUIRKS;
  }
  const { systemId } = token2;
  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
    return DOCUMENT_MODE.QUIRKS;
  }
  let { publicId } = token2;
  if (publicId !== null) {
    publicId = publicId.toLowerCase();
    if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.LIMITED_QUIRKS;
    }
  }
  return DOCUMENT_MODE.NO_QUIRKS;
}
var VALID_DOCTYPE_NAME = "html";
var VALID_SYSTEM_ID = "about:legacy-compat";
var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
];
var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
var QUIRKS_MODE_PUBLIC_IDS = new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]);
var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];

// node_modules/parse5/dist/common/foreign-content.js
function causesExit(startTagToken) {
  const tn = startTagToken.tagID;
  const isFontWithAttrs = tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
  return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token2) {
  for (let i = 0;i < token2.attrs.length; i++) {
    if (token2.attrs[i].name === DEFINITION_URL_ATTR) {
      token2.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
}
function adjustTokenSVGAttrs(token2) {
  for (let i = 0;i < token2.attrs.length; i++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token2.attrs[i].name);
    if (adjustedAttrName != null) {
      token2.attrs[i].name = adjustedAttrName;
    }
  }
}
function adjustTokenXMLAttrs(token2) {
  for (let i = 0;i < token2.attrs.length; i++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token2.attrs[i].name);
    if (adjustedAttrEntry) {
      token2.attrs[i].prefix = adjustedAttrEntry.prefix;
      token2.attrs[i].name = adjustedAttrEntry.name;
      token2.attrs[i].namespace = adjustedAttrEntry.namespace;
    }
  }
}
function adjustTokenSVGTagName(token2) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token2.tagName);
  if (adjustedTagName != null) {
    token2.tagName = adjustedTagName;
    token2.tagID = getTagID(token2.tagName);
  }
}
var isMathMLTextIntegrationPoint = function(tn, ns) {
  return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
};
var isHtmlIntegrationPoint = function(tn, ns, attrs) {
  if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
    for (let i = 0;i < attrs.length; i++) {
      if (attrs[i].name === ATTRS.ENCODING) {
        const value = attrs[i].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }
  return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
};
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}
var MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
};
var DEFINITION_URL_ATTR = "definitionurl";
var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr2) => [attr2.toLowerCase(), attr2]));
var XML_ATTRS_ADJUSTMENT_MAP = new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
  ["xml:base", { prefix: "xml", name: "base", namespace: NS.XML }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
]);
var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn]));
var EXITS_FOREIGN_CONTENT = new Set([
  TAG_ID.B,
  TAG_ID.BIG,
  TAG_ID.BLOCKQUOTE,
  TAG_ID.BODY,
  TAG_ID.BR,
  TAG_ID.CENTER,
  TAG_ID.CODE,
  TAG_ID.DD,
  TAG_ID.DIV,
  TAG_ID.DL,
  TAG_ID.DT,
  TAG_ID.EM,
  TAG_ID.EMBED,
  TAG_ID.H1,
  TAG_ID.H2,
  TAG_ID.H3,
  TAG_ID.H4,
  TAG_ID.H5,
  TAG_ID.H6,
  TAG_ID.HEAD,
  TAG_ID.HR,
  TAG_ID.I,
  TAG_ID.IMG,
  TAG_ID.LI,
  TAG_ID.LISTING,
  TAG_ID.MENU,
  TAG_ID.META,
  TAG_ID.NOBR,
  TAG_ID.OL,
  TAG_ID.P,
  TAG_ID.PRE,
  TAG_ID.RUBY,
  TAG_ID.S,
  TAG_ID.SMALL,
  TAG_ID.SPAN,
  TAG_ID.STRONG,
  TAG_ID.STRIKE,
  TAG_ID.SUB,
  TAG_ID.SUP,
  TAG_ID.TABLE,
  TAG_ID.TT,
  TAG_ID.U,
  TAG_ID.UL,
  TAG_ID.VAR
]);

// node_modules/parse5/dist/parser/index.js
var aaObtainFormattingElementEntry = function(p, token3) {
  let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token3.tagName);
  if (formattingElementEntry) {
    if (!p.openElements.contains(formattingElementEntry.element)) {
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p.openElements.hasInScope(token3.tagID)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p, token3);
  }
  return formattingElementEntry;
};
var aaObtainFurthestBlock = function(p, formattingElementEntry) {
  let furthestBlock = null;
  let idx = p.openElements.stackTop;
  for (;idx >= 0; idx--) {
    const element = p.openElements.items[idx];
    if (element === formattingElementEntry.element) {
      break;
    }
    if (p._isSpecialElement(element, p.openElements.tagIDs[idx])) {
      furthestBlock = element;
    }
  }
  if (!furthestBlock) {
    p.openElements.shortenToLength(idx < 0 ? 0 : idx);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
  }
  return furthestBlock;
};
var aaInnerLoop = function(p, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p.openElements.getCommonAncestor(furthestBlock);
  for (let i = 0, element = nextElement;element !== formattingElement; i++, element = nextElement) {
    nextElement = p.openElements.getCommonAncestor(element);
    const elementEntry = p.activeFormattingElements.getElementEntry(element);
    const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p.activeFormattingElements.removeEntry(elementEntry);
      }
      p.openElements.remove(element);
    } else {
      element = aaRecreateElementFromEntry(p, elementEntry);
      if (lastElement === furthestBlock) {
        p.activeFormattingElements.bookmark = elementEntry;
      }
      p.treeAdapter.detachNode(lastElement);
      p.treeAdapter.appendChild(element, lastElement);
      lastElement = element;
    }
  }
  return lastElement;
};
var aaRecreateElementFromEntry = function(p, elementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  p.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
};
var aaInsertLastNodeInCommonAncestor = function(p, commonAncestor, lastElement) {
  const tn = p.treeAdapter.getTagName(commonAncestor);
  const tid = getTagID(tn);
  if (p._isElementCausesFosterParenting(tid)) {
    p._fosterParentElement(lastElement);
  } else {
    const ns = p.treeAdapter.getNamespaceURI(commonAncestor);
    if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
      commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
    }
    p.treeAdapter.appendChild(commonAncestor, lastElement);
  }
};
var aaReplaceFormattingElement = function(p, furthestBlock, formattingElementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const { token: token3 } = formattingElementEntry;
  const newElement = p.treeAdapter.createElement(token3.tagName, ns, token3.attrs);
  p._adoptNodes(furthestBlock, newElement);
  p.treeAdapter.appendChild(furthestBlock, newElement);
  p.activeFormattingElements.insertElementAfterBookmark(newElement, token3);
  p.activeFormattingElements.removeEntry(formattingElementEntry);
  p.openElements.remove(formattingElementEntry.element);
  p.openElements.insertAfter(furthestBlock, newElement, token3.tagID);
};
var callAdoptionAgency = function(p, token3) {
  for (let i = 0;i < AA_OUTER_LOOP_ITER; i++) {
    const formattingElementEntry = aaObtainFormattingElementEntry(p, token3);
    if (!formattingElementEntry) {
      break;
    }
    const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
    if (!furthestBlock) {
      break;
    }
    p.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
    p.treeAdapter.detachNode(lastElement);
    if (commonAncestor)
      aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
    aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  }
};
var appendComment = function(p, token3) {
  p._appendCommentNode(token3, p.openElements.currentTmplContentOrNode);
};
var appendCommentToRootHtmlElement = function(p, token3) {
  p._appendCommentNode(token3, p.openElements.items[0]);
};
var appendCommentToDocument = function(p, token3) {
  p._appendCommentNode(token3, p.document);
};
var stopParsing = function(p, token3) {
  p.stopped = true;
  if (token3.location) {
    const target = p.fragmentContext ? 0 : 2;
    for (let i = p.openElements.stackTop;i >= target; i--) {
      p._setEndLocation(p.openElements.items[i], token3);
    }
    if (!p.fragmentContext && p.openElements.stackTop >= 0) {
      const htmlElement = p.openElements.items[0];
      const htmlLocation = p.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag) {
        p._setEndLocation(htmlElement, token3);
        if (p.openElements.stackTop >= 1) {
          const bodyElement = p.openElements.items[1];
          const bodyLocation = p.treeAdapter.getNodeSourceCodeLocation(bodyElement);
          if (bodyLocation && !bodyLocation.endTag) {
            p._setEndLocation(bodyElement, token3);
          }
        }
      }
    }
  }
};
var doctypeInInitialMode = function(p, token3) {
  p._setDocumentType(token3);
  const mode = token3.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token3);
  if (!isConforming(token3)) {
    p._err(token3, ERR.nonConformingDoctype);
  }
  p.treeAdapter.setDocumentMode(p.document, mode);
  p.insertionMode = InsertionMode.BEFORE_HTML;
};
var tokenInInitialMode = function(p, token3) {
  p._err(token3, ERR.missingDoctype, true);
  p.treeAdapter.setDocumentMode(p.document, DOCUMENT_MODE.QUIRKS);
  p.insertionMode = InsertionMode.BEFORE_HTML;
  p._processToken(token3);
};
var startTagBeforeHtml = function(p, token3) {
  if (token3.tagID === TAG_ID.HTML) {
    p._insertElement(token3, NS.HTML);
    p.insertionMode = InsertionMode.BEFORE_HEAD;
  } else {
    tokenBeforeHtml(p, token3);
  }
};
var endTagBeforeHtml = function(p, token3) {
  const tn = token3.tagID;
  if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
    tokenBeforeHtml(p, token3);
  }
};
var tokenBeforeHtml = function(p, token3) {
  p._insertFakeRootElement();
  p.insertionMode = InsertionMode.BEFORE_HEAD;
  p._processToken(token3);
};
var startTagBeforeHead = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.HEAD: {
      p._insertElement(token3, NS.HTML);
      p.headElement = p.openElements.current;
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default: {
      tokenBeforeHead(p, token3);
    }
  }
};
var endTagBeforeHead = function(p, token3) {
  const tn = token3.tagID;
  if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
    tokenBeforeHead(p, token3);
  } else {
    p._err(token3, ERR.endTagWithoutMatchingOpenElement);
  }
};
var tokenBeforeHead = function(p, token3) {
  p._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
  p.headElement = p.openElements.current;
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token3);
};
var startTagInHead = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META: {
      p._appendElement(token3, NS.HTML);
      token3.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TITLE: {
      p._switchToTextParsing(token3, TokenizerMode.RCDATA);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        p._switchToTextParsing(token3, TokenizerMode.RAWTEXT);
      } else {
        p._insertElement(token3, NS.HTML);
        p.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
      }
      break;
    }
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      p._switchToTextParsing(token3, TokenizerMode.RAWTEXT);
      break;
    }
    case TAG_ID.SCRIPT: {
      p._switchToTextParsing(token3, TokenizerMode.SCRIPT_DATA);
      break;
    }
    case TAG_ID.TEMPLATE: {
      p._insertTemplate(token3);
      p.activeFormattingElements.insertMarker();
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_TEMPLATE;
      p.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token3, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenInHead(p, token3);
    }
  }
};
var endTagInHead = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HEAD: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.BR:
    case TAG_ID.HTML: {
      tokenInHead(p, token3);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    default: {
      p._err(token3, ERR.endTagWithoutMatchingOpenElement);
    }
  }
};
var templateEndTagInHead = function(p, token3) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.generateImpliedEndTagsThoroughly();
    if (p.openElements.currentTagId !== TAG_ID.TEMPLATE) {
      p._err(token3, ERR.closingOfElementWithOpenChildElements);
    }
    p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
  } else {
    p._err(token3, ERR.endTagWithoutMatchingOpenElement);
  }
};
var tokenInHead = function(p, token3) {
  p.openElements.pop();
  p.insertionMode = InsertionMode.AFTER_HEAD;
  p._processToken(token3);
};
var startTagInHeadNoScript = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.HEAD:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      startTagInHead(p, token3);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p._err(token3, ERR.nestedNoscriptInHead);
      break;
    }
    default: {
      tokenInHeadNoScript(p, token3);
    }
  }
};
var endTagInHeadNoScript = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.NOSCRIPT: {
      p.openElements.pop();
      p.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case TAG_ID.BR: {
      tokenInHeadNoScript(p, token3);
      break;
    }
    default: {
      p._err(token3, ERR.endTagWithoutMatchingOpenElement);
    }
  }
};
var tokenInHeadNoScript = function(p, token3) {
  const errCode = token3.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  p._err(token3, errCode);
  p.openElements.pop();
  p.insertionMode = InsertionMode.IN_HEAD;
  p._processToken(token3);
};
var startTagAfterHead = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.BODY: {
      p._insertElement(token3, NS.HTML);
      p.framesetOk = false;
      p.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token3, NS.HTML);
      p.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      p._err(token3, ERR.abandonedHeadElementChild);
      p.openElements.push(p.headElement, TAG_ID.HEAD);
      startTagInHead(p, token3);
      p.openElements.remove(p.headElement);
      break;
    }
    case TAG_ID.HEAD: {
      p._err(token3, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenAfterHead(p, token3);
    }
  }
};
var endTagAfterHead = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.BODY:
    case TAG_ID.HTML:
    case TAG_ID.BR: {
      tokenAfterHead(p, token3);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    default: {
      p._err(token3, ERR.endTagWithoutMatchingOpenElement);
    }
  }
};
var tokenAfterHead = function(p, token3) {
  p._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token3);
};
var modeInBody = function(p, token3) {
  switch (token3.type) {
    case TokenType.CHARACTER: {
      characterInBody(p, token3);
      break;
    }
    case TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p, token3);
      break;
    }
    case TokenType.COMMENT: {
      appendComment(p, token3);
      break;
    }
    case TokenType.START_TAG: {
      startTagInBody(p, token3);
      break;
    }
    case TokenType.END_TAG: {
      endTagInBody(p, token3);
      break;
    }
    case TokenType.EOF: {
      eofInBody(p, token3);
      break;
    }
    default:
  }
};
var whitespaceCharacterInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token3);
};
var characterInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertCharacters(token3);
  p.framesetOk = false;
};
var htmlStartTagInBody = function(p, token3) {
  if (p.openElements.tmplCount === 0) {
    p.treeAdapter.adoptAttributes(p.openElements.items[0], token3.attrs);
  }
};
var bodyStartTagInBody = function(p, token3) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (bodyElement && p.openElements.tmplCount === 0) {
    p.framesetOk = false;
    p.treeAdapter.adoptAttributes(bodyElement, token3.attrs);
  }
};
var framesetStartTagInBody = function(p, token3) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
  if (p.framesetOk && bodyElement) {
    p.treeAdapter.detachNode(bodyElement);
    p.openElements.popAllUpToHtmlElement();
    p._insertElement(token3, NS.HTML);
    p.insertionMode = InsertionMode.IN_FRAMESET;
  }
};
var addressStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token3, NS.HTML);
};
var numberedHeaderStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  if (isNumberedHeader(p.openElements.currentTagId)) {
    p.openElements.pop();
  }
  p._insertElement(token3, NS.HTML);
};
var preStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token3, NS.HTML);
  p.skipNextNewLine = true;
  p.framesetOk = false;
};
var formStartTagInBody = function(p, token3) {
  const inTemplate = p.openElements.tmplCount > 0;
  if (!p.formElement || inTemplate) {
    if (p.openElements.hasInButtonScope(TAG_ID.P)) {
      p._closePElement();
    }
    p._insertElement(token3, NS.HTML);
    if (!inTemplate) {
      p.formElement = p.openElements.current;
    }
  }
};
var listItemStartTagInBody = function(p, token3) {
  p.framesetOk = false;
  const tn = token3.tagID;
  for (let i = p.openElements.stackTop;i >= 0; i--) {
    const elementId = p.openElements.tagIDs[i];
    if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
      p.openElements.generateImpliedEndTagsWithExclusion(elementId);
      p.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p._isSpecialElement(p.openElements.items[i], elementId)) {
      break;
    }
  }
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token3, NS.HTML);
};
var plaintextStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token3, NS.HTML);
  p.tokenizer.state = TokenizerMode.PLAINTEXT;
};
var buttonStartTagInBody = function(p, token3) {
  if (p.openElements.hasInScope(TAG_ID.BUTTON)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
  p.framesetOk = false;
};
var aStartTagInBody = function(p, token3) {
  const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  if (activeElementEntry) {
    callAdoptionAgency(p, token3);
    p.openElements.remove(activeElementEntry.element);
    p.activeFormattingElements.removeEntry(activeElementEntry);
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token3);
};
var bStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token3);
};
var nobrStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  if (p.openElements.hasInScope(TAG_ID.NOBR)) {
    callAdoptionAgency(p, token3);
    p._reconstructActiveFormattingElements();
  }
  p._insertElement(token3, NS.HTML);
  p.activeFormattingElements.pushElement(p.openElements.current, token3);
};
var appletStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
  p.activeFormattingElements.insertMarker();
  p.framesetOk = false;
};
var tableStartTagInBody = function(p, token3) {
  if (p.treeAdapter.getDocumentMode(p.document) !== DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._insertElement(token3, NS.HTML);
  p.framesetOk = false;
  p.insertionMode = InsertionMode.IN_TABLE;
};
var areaStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token3, NS.HTML);
  p.framesetOk = false;
  token3.ackSelfClosing = true;
};
var isHiddenInput = function(token3) {
  const inputType = getTokenAttr(token3, ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
};
var inputStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._appendElement(token3, NS.HTML);
  if (!isHiddenInput(token3)) {
    p.framesetOk = false;
  }
  token3.ackSelfClosing = true;
};
var paramStartTagInBody = function(p, token3) {
  p._appendElement(token3, NS.HTML);
  token3.ackSelfClosing = true;
};
var hrStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._appendElement(token3, NS.HTML);
  p.framesetOk = false;
  token3.ackSelfClosing = true;
};
var imageStartTagInBody = function(p, token3) {
  token3.tagName = TAG_NAMES.IMG;
  token3.tagID = TAG_ID.IMG;
  areaStartTagInBody(p, token3);
};
var textareaStartTagInBody = function(p, token3) {
  p._insertElement(token3, NS.HTML);
  p.skipNextNewLine = true;
  p.tokenizer.state = TokenizerMode.RCDATA;
  p.originalInsertionMode = p.insertionMode;
  p.framesetOk = false;
  p.insertionMode = InsertionMode.TEXT;
};
var xmpStartTagInBody = function(p, token3) {
  if (p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._closePElement();
  }
  p._reconstructActiveFormattingElements();
  p.framesetOk = false;
  p._switchToTextParsing(token3, TokenizerMode.RAWTEXT);
};
var iframeStartTagInBody = function(p, token3) {
  p.framesetOk = false;
  p._switchToTextParsing(token3, TokenizerMode.RAWTEXT);
};
var noembedStartTagInBody = function(p, token3) {
  p._switchToTextParsing(token3, TokenizerMode.RAWTEXT);
};
var selectStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
  p.framesetOk = false;
  p.insertionMode = p.insertionMode === InsertionMode.IN_TABLE || p.insertionMode === InsertionMode.IN_CAPTION || p.insertionMode === InsertionMode.IN_TABLE_BODY || p.insertionMode === InsertionMode.IN_ROW || p.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
};
var optgroupStartTagInBody = function(p, token3) {
  if (p.openElements.currentTagId === TAG_ID.OPTION) {
    p.openElements.pop();
  }
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
};
var rbStartTagInBody = function(p, token3) {
  if (p.openElements.hasInScope(TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTags();
  }
  p._insertElement(token3, NS.HTML);
};
var rtStartTagInBody = function(p, token3) {
  if (p.openElements.hasInScope(TAG_ID.RUBY)) {
    p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
  }
  p._insertElement(token3, NS.HTML);
};
var mathStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  adjustTokenMathMLAttrs(token3);
  adjustTokenXMLAttrs(token3);
  if (token3.selfClosing) {
    p._appendElement(token3, NS.MATHML);
  } else {
    p._insertElement(token3, NS.MATHML);
  }
  token3.ackSelfClosing = true;
};
var svgStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  adjustTokenSVGAttrs(token3);
  adjustTokenXMLAttrs(token3);
  if (token3.selfClosing) {
    p._appendElement(token3, NS.SVG);
  } else {
    p._insertElement(token3, NS.SVG);
  }
  token3.ackSelfClosing = true;
};
var genericStartTagInBody = function(p, token3) {
  p._reconstructActiveFormattingElements();
  p._insertElement(token3, NS.HTML);
};
var startTagInBody = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.B:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      bStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.A: {
      aStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.P:
    case TAG_ID.DL:
    case TAG_ID.OL:
    case TAG_ID.UL:
    case TAG_ID.DIV:
    case TAG_ID.DIR:
    case TAG_ID.NAV:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.DETAILS:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.LI:
    case TAG_ID.DD:
    case TAG_ID.DT: {
      listItemStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.BR:
    case TAG_ID.IMG:
    case TAG_ID.WBR:
    case TAG_ID.AREA:
    case TAG_ID.EMBED:
    case TAG_ID.KEYGEN: {
      areaStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.HR: {
      hrStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.RB:
    case TAG_ID.RTC: {
      rbStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.RT:
    case TAG_ID.RP: {
      rtStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.PRE:
    case TAG_ID.LISTING: {
      preStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.XMP: {
      xmpStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.SVG: {
      svgStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.HTML: {
      htmlStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.STYLE:
    case TAG_ID.TITLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.BGSOUND:
    case TAG_ID.BASEFONT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token3);
      break;
    }
    case TAG_ID.BODY: {
      bodyStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.NOBR: {
      nobrStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.MATH: {
      mathStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.PARAM:
    case TAG_ID.TRACK:
    case TAG_ID.SOURCE: {
      paramStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.IMAGE: {
      imageStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.BUTTON: {
      buttonStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.IFRAME: {
      iframeStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.SELECT: {
      selectStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.OPTION:
    case TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.NOEMBED: {
      noembedStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.FRAMESET: {
      framesetStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p.options.scriptingEnabled) {
        noembedStartTagInBody(p, token3);
      } else {
        genericStartTagInBody(p, token3);
      }
      break;
    }
    case TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p, token3);
      break;
    }
    case TAG_ID.COL:
    case TAG_ID.TH:
    case TAG_ID.TD:
    case TAG_ID.TR:
    case TAG_ID.HEAD:
    case TAG_ID.FRAME:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP: {
      break;
    }
    default: {
      genericStartTagInBody(p, token3);
    }
  }
};
var bodyEndTagInBody = function(p, token3) {
  if (p.openElements.hasInScope(TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    if (p.options.sourceCodeLocationInfo) {
      const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement) {
        p._setEndLocation(bodyElement, token3);
      }
    }
  }
};
var htmlEndTagInBody = function(p, token3) {
  if (p.openElements.hasInScope(TAG_ID.BODY)) {
    p.insertionMode = InsertionMode.AFTER_BODY;
    endTagAfterBody(p, token3);
  }
};
var addressEndTagInBody = function(p, token3) {
  const tn = token3.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
  }
};
var formEndTagInBody = function(p) {
  const inTemplate = p.openElements.tmplCount > 0;
  const { formElement } = p;
  if (!inTemplate) {
    p.formElement = null;
  }
  if ((formElement || inTemplate) && p.openElements.hasInScope(TAG_ID.FORM)) {
    p.openElements.generateImpliedEndTags();
    if (inTemplate) {
      p.openElements.popUntilTagNamePopped(TAG_ID.FORM);
    } else if (formElement) {
      p.openElements.remove(formElement);
    }
  }
};
var pEndTagInBody = function(p) {
  if (!p.openElements.hasInButtonScope(TAG_ID.P)) {
    p._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
  }
  p._closePElement();
};
var liEndTagInBody = function(p) {
  if (p.openElements.hasInListItemScope(TAG_ID.LI)) {
    p.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
    p.openElements.popUntilTagNamePopped(TAG_ID.LI);
  }
};
var ddEndTagInBody = function(p, token3) {
  const tn = token3.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTagsWithExclusion(tn);
    p.openElements.popUntilTagNamePopped(tn);
  }
};
var numberedHeaderEndTagInBody = function(p) {
  if (p.openElements.hasNumberedHeaderInScope()) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilNumberedHeaderPopped();
  }
};
var appletEndTagInBody = function(p, token3) {
  const tn = token3.tagID;
  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
    p.activeFormattingElements.clearToLastMarker();
  }
};
var brEndTagInBody = function(p) {
  p._reconstructActiveFormattingElements();
  p._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
  p.openElements.pop();
  p.framesetOk = false;
};
var genericEndTagInBody = function(p, token3) {
  const tn = token3.tagName;
  const tid = token3.tagID;
  for (let i = p.openElements.stackTop;i > 0; i--) {
    const element = p.openElements.items[i];
    const elementId = p.openElements.tagIDs[i];
    if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p.treeAdapter.getTagName(element) === tn)) {
      p.openElements.generateImpliedEndTagsWithExclusion(tid);
      if (p.openElements.stackTop >= i)
        p.openElements.shortenToLength(i);
      break;
    }
    if (p._isSpecialElement(element, elementId)) {
      break;
    }
  }
};
var endTagInBody = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.A:
    case TAG_ID.B:
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.NOBR:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      callAdoptionAgency(p, token3);
      break;
    }
    case TAG_ID.P: {
      pEndTagInBody(p);
      break;
    }
    case TAG_ID.DL:
    case TAG_ID.UL:
    case TAG_ID.OL:
    case TAG_ID.DIR:
    case TAG_ID.DIV:
    case TAG_ID.NAV:
    case TAG_ID.PRE:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.BUTTON:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.DETAILS:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.LISTING:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p, token3);
      break;
    }
    case TAG_ID.LI: {
      liEndTagInBody(p);
      break;
    }
    case TAG_ID.DD:
    case TAG_ID.DT: {
      ddEndTagInBody(p, token3);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderEndTagInBody(p);
      break;
    }
    case TAG_ID.BR: {
      brEndTagInBody(p);
      break;
    }
    case TAG_ID.BODY: {
      bodyEndTagInBody(p, token3);
      break;
    }
    case TAG_ID.HTML: {
      htmlEndTagInBody(p, token3);
      break;
    }
    case TAG_ID.FORM: {
      formEndTagInBody(p);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletEndTagInBody(p, token3);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    default: {
      genericEndTagInBody(p, token3);
    }
  }
};
var eofInBody = function(p, token3) {
  if (p.tmplInsertionModeStack.length > 0) {
    eofInTemplate(p, token3);
  } else {
    stopParsing(p, token3);
  }
};
var endTagInText = function(p, token3) {
  var _a2;
  if (token3.tagID === TAG_ID.SCRIPT) {
    (_a2 = p.scriptHandler) === null || _a2 === undefined || _a2.call(p, p.openElements.current);
  }
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
};
var eofInText = function(p, token3) {
  p._err(token3, ERR.eofInElementThatCanContainOnlyText);
  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
  p.onEof(token3);
};
var characterInTable = function(p, token3) {
  if (TABLE_STRUCTURE_TAGS.has(p.openElements.currentTagId)) {
    p.pendingCharacterTokens.length = 0;
    p.hasNonWhitespacePendingCharacterToken = false;
    p.originalInsertionMode = p.insertionMode;
    p.insertionMode = InsertionMode.IN_TABLE_TEXT;
    switch (token3.type) {
      case TokenType.CHARACTER: {
        characterInTableText(p, token3);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p, token3);
        break;
      }
    }
  } else {
    tokenInTable(p, token3);
  }
};
var captionStartTagInTable = function(p, token3) {
  p.openElements.clearBackToTableContext();
  p.activeFormattingElements.insertMarker();
  p._insertElement(token3, NS.HTML);
  p.insertionMode = InsertionMode.IN_CAPTION;
};
var colgroupStartTagInTable = function(p, token3) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token3, NS.HTML);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
};
var colStartTagInTable = function(p, token3) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
  p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  startTagInColumnGroup(p, token3);
};
var tbodyStartTagInTable = function(p, token3) {
  p.openElements.clearBackToTableContext();
  p._insertElement(token3, NS.HTML);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
};
var tdStartTagInTable = function(p, token3) {
  p.openElements.clearBackToTableContext();
  p._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
  p.insertionMode = InsertionMode.IN_TABLE_BODY;
  startTagInTableBody(p, token3);
};
var tableStartTagInTable = function(p, token3) {
  if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
    p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
    p._resetInsertionMode();
    p._processStartTag(token3);
  }
};
var inputStartTagInTable = function(p, token3) {
  if (isHiddenInput(token3)) {
    p._appendElement(token3, NS.HTML);
  } else {
    tokenInTable(p, token3);
  }
  token3.ackSelfClosing = true;
};
var formStartTagInTable = function(p, token3) {
  if (!p.formElement && p.openElements.tmplCount === 0) {
    p._insertElement(token3, NS.HTML);
    p.formElement = p.openElements.current;
    p.openElements.pop();
  }
};
var startTagInTable = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      tdStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.STYLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token3);
      break;
    }
    case TAG_ID.COL: {
      colStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      tbodyStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.CAPTION: {
      captionStartTagInTable(p, token3);
      break;
    }
    case TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p, token3);
      break;
    }
    default: {
      tokenInTable(p, token3);
    }
  }
};
var endTagInTable = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.TABLE)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
        p._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      tokenInTable(p, token3);
    }
  }
};
var tokenInTable = function(p, token3) {
  const savedFosterParentingState = p.fosterParentingEnabled;
  p.fosterParentingEnabled = true;
  modeInBody(p, token3);
  p.fosterParentingEnabled = savedFosterParentingState;
};
var whitespaceCharacterInTableText = function(p, token3) {
  p.pendingCharacterTokens.push(token3);
};
var characterInTableText = function(p, token3) {
  p.pendingCharacterTokens.push(token3);
  p.hasNonWhitespacePendingCharacterToken = true;
};
var tokenInTableText = function(p, token3) {
  let i = 0;
  if (p.hasNonWhitespacePendingCharacterToken) {
    for (;i < p.pendingCharacterTokens.length; i++) {
      tokenInTable(p, p.pendingCharacterTokens[i]);
    }
  } else {
    for (;i < p.pendingCharacterTokens.length; i++) {
      p._insertCharacters(p.pendingCharacterTokens[i]);
    }
  }
  p.insertionMode = p.originalInsertionMode;
  p._processToken(token3);
};
var startTagInCaption = function(p, token3) {
  const tn = token3.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token3);
    }
  } else {
    startTagInBody(p, token3);
  }
};
var endTagInCaption = function(p, token3) {
  const tn = token3.tagID;
  switch (tn) {
    case TAG_ID.CAPTION:
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_TABLE;
        if (tn === TAG_ID.TABLE) {
          endTagInTable(p, token3);
        }
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInBody(p, token3);
    }
  }
};
var startTagInColumnGroup = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.COL: {
      p._appendElement(token3, NS.HTML);
      token3.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token3);
      break;
    }
    default: {
      tokenInColumnGroup(p, token3);
    }
  }
};
var endTagInColumnGroup = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.COLGROUP: {
      if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    case TAG_ID.COL: {
      break;
    }
    default: {
      tokenInColumnGroup(p, token3);
    }
  }
};
var tokenInColumnGroup = function(p, token3) {
  if (p.openElements.currentTagId === TAG_ID.COLGROUP) {
    p.openElements.pop();
    p.insertionMode = InsertionMode.IN_TABLE;
    p._processToken(token3);
  }
};
var startTagInTableBody = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.TR: {
      p.openElements.clearBackToTableBodyContext();
      p._insertElement(token3, NS.HTML);
      p.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableBodyContext();
      p._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token3);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p, token3);
      }
      break;
    }
    default: {
      startTagInTable(p, token3);
    }
  }
};
var endTagInTableBody = function(p, token3) {
  const tn = token3.tagID;
  switch (token3.tagID) {
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p.openElements.hasTableBodyContextInTableScope()) {
        p.openElements.clearBackToTableBodyContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE;
        endTagInTable(p, token3);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInTable(p, token3);
    }
  }
};
var startTagInRow = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p.openElements.clearBackToTableRowContext();
      p._insertElement(token3, NS.HTML);
      p.insertionMode = InsertionMode.IN_CELL;
      p.activeFormattingElements.insertMarker();
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p, token3);
      }
      break;
    }
    default: {
      startTagInTable(p, token3);
    }
  }
};
var endTagInRow = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token3);
      }
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p.openElements.hasInTableScope(token3.tagID) || p.openElements.hasInTableScope(TAG_ID.TR)) {
        p.openElements.clearBackToTableRowContext();
        p.openElements.pop();
        p.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p, token3);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH: {
      break;
    }
    default: {
      endTagInTable(p, token3);
    }
  }
};
var startTagInCell = function(p, token3) {
  const tn = token3.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p.openElements.hasInTableScope(TAG_ID.TD) || p.openElements.hasInTableScope(TAG_ID.TH)) {
      p._closeTableCell();
      startTagInRow(p, token3);
    }
  } else {
    startTagInBody(p, token3);
  }
};
var endTagInCell = function(p, token3) {
  const tn = token3.tagID;
  switch (tn) {
    case TAG_ID.TD:
    case TAG_ID.TH: {
      if (p.openElements.hasInTableScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
        p.activeFormattingElements.clearToLastMarker();
        p.insertionMode = InsertionMode.IN_ROW;
      }
      break;
    }
    case TAG_ID.TABLE:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p.openElements.hasInTableScope(tn)) {
        p._closeTableCell();
        endTagInRow(p, token3);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML: {
      break;
    }
    default: {
      endTagInBody(p, token3);
    }
  }
};
var startTagInSelect = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.OPTION: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      p._insertElement(token3, NS.HTML);
      break;
    }
    case TAG_ID.OPTGROUP: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      p._insertElement(token3, NS.HTML);
      break;
    }
    case TAG_ID.INPUT:
    case TAG_ID.KEYGEN:
    case TAG_ID.TEXTAREA:
    case TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p._resetInsertionMode();
        if (token3.tagID !== TAG_ID.SELECT) {
          p._processStartTag(token3);
        }
      }
      break;
    }
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p, token3);
      break;
    }
    default:
  }
};
var endTagInSelect = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.OPTGROUP: {
      if (p.openElements.stackTop > 0 && p.openElements.currentTagId === TAG_ID.OPTION && p.openElements.tagIDs[p.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      if (p.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p.openElements.pop();
      }
      break;
    }
    case TAG_ID.OPTION: {
      if (p.openElements.currentTagId === TAG_ID.OPTION) {
        p.openElements.pop();
      }
      break;
    }
    case TAG_ID.SELECT: {
      if (p.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p, token3);
      break;
    }
    default:
  }
};
var startTagInSelectInTable = function(p, token3) {
  const tn = token3.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
    p._resetInsertionMode();
    p._processStartTag(token3);
  } else {
    startTagInSelect(p, token3);
  }
};
var endTagInSelectInTable = function(p, token3) {
  const tn = token3.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p._resetInsertionMode();
      p.onEndTag(token3);
    }
  } else {
    endTagInSelect(p, token3);
  }
};
var startTagInTemplate = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      startTagInHead(p, token3);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
      p.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p, token3);
      break;
    }
    case TAG_ID.COL: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
      p.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p, token3);
      break;
    }
    case TAG_ID.TR: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
      p.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p, token3);
      break;
    }
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
      p.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p, token3);
      break;
    }
    default: {
      p.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
      p.insertionMode = InsertionMode.IN_BODY;
      startTagInBody(p, token3);
    }
  }
};
var endTagInTemplate = function(p, token3) {
  if (token3.tagID === TAG_ID.TEMPLATE) {
    templateEndTagInHead(p, token3);
  }
};
var eofInTemplate = function(p, token3) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();
    p.tmplInsertionModeStack.shift();
    p._resetInsertionMode();
    p.onEof(token3);
  } else {
    stopParsing(p, token3);
  }
};
var startTagAfterBody = function(p, token3) {
  if (token3.tagID === TAG_ID.HTML) {
    startTagInBody(p, token3);
  } else {
    tokenAfterBody(p, token3);
  }
};
var endTagAfterBody = function(p, token3) {
  var _a2;
  if (token3.tagID === TAG_ID.HTML) {
    if (!p.fragmentContext) {
      p.insertionMode = InsertionMode.AFTER_AFTER_BODY;
    }
    if (p.options.sourceCodeLocationInfo && p.openElements.tagIDs[0] === TAG_ID.HTML) {
      p._setEndLocation(p.openElements.items[0], token3);
      const bodyElement = p.openElements.items[1];
      if (bodyElement && !((_a2 = p.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a2 === undefined ? undefined : _a2.endTag)) {
        p._setEndLocation(bodyElement, token3);
      }
    }
  } else {
    tokenAfterBody(p, token3);
  }
};
var tokenAfterBody = function(p, token3) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token3);
};
var startTagInFrameset = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.FRAMESET: {
      p._insertElement(token3, NS.HTML);
      break;
    }
    case TAG_ID.FRAME: {
      p._appendElement(token3, NS.HTML);
      token3.ackSelfClosing = true;
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token3);
      break;
    }
    default:
  }
};
var endTagInFrameset = function(p, token3) {
  if (token3.tagID === TAG_ID.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
    p.openElements.pop();
    if (!p.fragmentContext && p.openElements.currentTagId !== TAG_ID.FRAMESET) {
      p.insertionMode = InsertionMode.AFTER_FRAMESET;
    }
  }
};
var startTagAfterFrameset = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token3);
      break;
    }
    default:
  }
};
var endTagAfterFrameset = function(p, token3) {
  if (token3.tagID === TAG_ID.HTML) {
    p.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
};
var startTagAfterAfterBody = function(p, token3) {
  if (token3.tagID === TAG_ID.HTML) {
    startTagInBody(p, token3);
  } else {
    tokenAfterAfterBody(p, token3);
  }
};
var tokenAfterAfterBody = function(p, token3) {
  p.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p, token3);
};
var startTagAfterAfterFrameset = function(p, token3) {
  switch (token3.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p, token3);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p, token3);
      break;
    }
    default:
  }
};
var nullCharacterInForeignContent = function(p, token3) {
  token3.chars = REPLACEMENT_CHARACTER;
  p._insertCharacters(token3);
};
var characterInForeignContent = function(p, token3) {
  p._insertCharacters(token3);
  p.framesetOk = false;
};
var popUntilHtmlOrIntegrationPoint = function(p) {
  while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && !p._isIntegrationPoint(p.openElements.currentTagId, p.openElements.current)) {
    p.openElements.pop();
  }
};
var startTagInForeignContent = function(p, token3) {
  if (causesExit(token3)) {
    popUntilHtmlOrIntegrationPoint(p);
    p._startTagOutsideForeignContent(token3);
  } else {
    const current = p._getAdjustedCurrentElement();
    const currentNs = p.treeAdapter.getNamespaceURI(current);
    if (currentNs === NS.MATHML) {
      adjustTokenMathMLAttrs(token3);
    } else if (currentNs === NS.SVG) {
      adjustTokenSVGTagName(token3);
      adjustTokenSVGAttrs(token3);
    }
    adjustTokenXMLAttrs(token3);
    if (token3.selfClosing) {
      p._appendElement(token3, currentNs);
    } else {
      p._insertElement(token3, currentNs);
    }
    token3.ackSelfClosing = true;
  }
};
var endTagInForeignContent = function(p, token3) {
  if (token3.tagID === TAG_ID.P || token3.tagID === TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p);
    p._endTagOutsideForeignContent(token3);
    return;
  }
  for (let i = p.openElements.stackTop;i > 0; i--) {
    const element = p.openElements.items[i];
    if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
      p._endTagOutsideForeignContent(token3);
      break;
    }
    const tagName = p.treeAdapter.getTagName(element);
    if (tagName.toLowerCase() === token3.tagName) {
      token3.tagName = tagName;
      p.openElements.shortenToLength(i);
      break;
    }
  }
};
var HIDDEN_INPUT_TYPE = "hidden";
var AA_OUTER_LOOP_ITER = 8;
var AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode2) {
  InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
  InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
  InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
var BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
};
var TABLE_STRUCTURE_TAGS = new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
var defaultParserOptions = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  treeAdapter: defaultTreeAdapter,
  onParseError: null
};

class Parser {
  constructor(options3, document2, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext;
    this.scriptHandler = scriptHandler;
    this.currentToken = null;
    this.stopped = false;
    this.insertionMode = InsertionMode.INITIAL;
    this.originalInsertionMode = InsertionMode.INITIAL;
    this.headElement = null;
    this.formElement = null;
    this.currentNotInHTML = false;
    this.tmplInsertionModeStack = [];
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
    this.options = {
      ...defaultParserOptions,
      ...options3
    };
    this.treeAdapter = this.options.treeAdapter;
    this.onParseError = this.options.onParseError;
    if (this.onParseError) {
      this.options.sourceCodeLocationInfo = true;
    }
    this.document = document2 !== null && document2 !== undefined ? document2 : this.treeAdapter.createDocument();
    this.tokenizer = new Tokenizer(this.options, this);
    this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
    this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
    this._setContextModes(fragmentContext !== null && fragmentContext !== undefined ? fragmentContext : this.document, this.fragmentContextID);
    this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  }
  static parse(html9, options3) {
    const parser = new this(options3);
    parser.tokenizer.write(html9, true);
    return parser.document;
  }
  static getFragmentParser(fragmentContext, options3) {
    const opts = {
      ...defaultParserOptions,
      ...options3
    };
    fragmentContext !== null && fragmentContext !== undefined || (fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []));
    const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
    const parser = new this(opts, documentMock, fragmentContext);
    if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
      parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
    }
    parser._initTokenizerForFragmentParsing();
    parser._insertFakeRootElement();
    parser._resetInsertionMode();
    parser._findFormInFragmentContext();
    return parser;
  }
  getFragment() {
    const rootElement = this.treeAdapter.getFirstChild(this.document);
    const fragment = this.treeAdapter.createDocumentFragment();
    this._adoptNodes(rootElement, fragment);
    return fragment;
  }
  _err(token3, code, beforeToken) {
    var _a2;
    if (!this.onParseError)
      return;
    const loc = (_a2 = token3.location) !== null && _a2 !== undefined ? _a2 : BASE_LOC;
    const err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  onItemPush(node4, tid, isTop) {
    var _a2, _b;
    (_b = (_a2 = this.treeAdapter).onItemPush) === null || _b === undefined || _b.call(_a2, node4);
    if (isTop && this.openElements.stackTop > 0)
      this._setContextModes(node4, tid);
  }
  onItemPop(node4, isTop) {
    var _a2, _b;
    if (this.options.sourceCodeLocationInfo) {
      this._setEndLocation(node4, this.currentToken);
    }
    (_b = (_a2 = this.treeAdapter).onItemPop) === null || _b === undefined || _b.call(_a2, node4, this.openElements.current);
    if (isTop) {
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    const isHTML = current === this.document || this.treeAdapter.getNamespaceURI(current) === NS.HTML;
    this.currentNotInHTML = !isHTML;
    this.tokenizer.inForeignNode = !isHTML && !this._isIntegrationPoint(tid, current);
  }
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML);
    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT;
    this.originalInsertionMode = InsertionMode.IN_BODY;
    this.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let node4 = this.fragmentContext;
    while (node4) {
      if (this.treeAdapter.getTagName(node4) === TAG_NAMES.FORM) {
        this.formElement = node4;
        break;
      }
      node4 = this.treeAdapter.getParentNode(node4);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
      return;
    }
    switch (this.fragmentContextID) {
      case TAG_ID.TITLE:
      case TAG_ID.TEXTAREA: {
        this.tokenizer.state = TokenizerMode.RCDATA;
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.XMP:
      case TAG_ID.IFRAME:
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES:
      case TAG_ID.NOSCRIPT: {
        this.tokenizer.state = TokenizerMode.RAWTEXT;
        break;
      }
      case TAG_ID.SCRIPT: {
        this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
        break;
      }
      case TAG_ID.PLAINTEXT: {
        this.tokenizer.state = TokenizerMode.PLAINTEXT;
        break;
      }
      default:
    }
  }
  _setDocumentType(token3) {
    const name = token3.name || "";
    const publicId = token3.publicId || "";
    const systemId = token3.systemId || "";
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
    if (token3.location) {
      const documentChildren = this.treeAdapter.getChildNodes(this.document);
      const docTypeNode = documentChildren.find((node4) => this.treeAdapter.isDocumentTypeNode(node4));
      if (docTypeNode) {
        this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token3.location);
      }
    }
  }
  _attachElementToTree(element, location) {
    if (this.options.sourceCodeLocationInfo) {
      const loc = location && {
        ...location,
        startTag: location
      };
      this.treeAdapter.setNodeSourceCodeLocation(element, loc);
    }
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element);
    } else {
      const parent2 = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent2, element);
    }
  }
  _appendElement(token3, namespaceURI) {
    const element = this.treeAdapter.createElement(token3.tagName, namespaceURI, token3.attrs);
    this._attachElementToTree(element, token3.location);
  }
  _insertElement(token3, namespaceURI) {
    const element = this.treeAdapter.createElement(token3.tagName, namespaceURI, token3.attrs);
    this._attachElementToTree(element, token3.location);
    this.openElements.push(element, token3.tagID);
  }
  _insertFakeElement(tagName, tagID) {
    const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
    this._attachElementToTree(element, null);
    this.openElements.push(element, tagID);
  }
  _insertTemplate(token3) {
    const tmpl = this.treeAdapter.createElement(token3.tagName, NS.HTML, token3.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);
    this._attachElementToTree(tmpl, token3.location);
    this.openElements.push(tmpl, token3.tagID);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  _insertFakeRootElement() {
    const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(element, null);
    this.treeAdapter.appendChild(this.openElements.current, element);
    this.openElements.push(element, TAG_ID.HTML);
  }
  _appendCommentNode(token3, parent2) {
    const commentNode = this.treeAdapter.createCommentNode(token3.data);
    this.treeAdapter.appendChild(parent2, commentNode);
    if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(commentNode, token3.location);
    }
  }
  _insertCharacters(token3) {
    let parent2;
    let beforeElement;
    if (this._shouldFosterParentOnInsertion()) {
      ({ parent: parent2, beforeElement } = this._findFosterParentingLocation());
      if (beforeElement) {
        this.treeAdapter.insertTextBefore(parent2, token3.chars, beforeElement);
      } else {
        this.treeAdapter.insertText(parent2, token3.chars);
      }
    } else {
      parent2 = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.insertText(parent2, token3.chars);
    }
    if (!token3.location)
      return;
    const siblings2 = this.treeAdapter.getChildNodes(parent2);
    const textNodeIdx = beforeElement ? siblings2.lastIndexOf(beforeElement) : siblings2.length;
    const textNode = siblings2[textNodeIdx - 1];
    const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
    if (tnLoc) {
      const { endLine, endCol, endOffset } = token3.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(textNode, token3.location);
    }
  }
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor);child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  }
  _setEndLocation(element, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
      const ctLoc = closingToken.location;
      const tn = this.treeAdapter.getTagName(element);
      const endLoc = closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
        endTag: { ...ctLoc },
        endLine: ctLoc.endLine,
        endCol: ctLoc.endCol,
        endOffset: ctLoc.endOffset
      } : {
        endLine: ctLoc.startLine,
        endCol: ctLoc.startCol,
        endOffset: ctLoc.startOffset
      };
      this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
    }
  }
  shouldProcessStartTagTokenInForeignContent(token3) {
    if (!this.currentNotInHTML)
      return false;
    let current;
    let currentTagId;
    if (this.openElements.stackTop === 0 && this.fragmentContext) {
      current = this.fragmentContext;
      currentTagId = this.fragmentContextID;
    } else {
      ({ current, currentTagId } = this.openElements);
    }
    if (token3.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
      return false;
    }
    return this.tokenizer.inForeignNode || (token3.tagID === TAG_ID.MGLYPH || token3.tagID === TAG_ID.MALIGNMARK) && !this._isIntegrationPoint(currentTagId, current, NS.HTML);
  }
  _processToken(token3) {
    switch (token3.type) {
      case TokenType.CHARACTER: {
        this.onCharacter(token3);
        break;
      }
      case TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token3);
        break;
      }
      case TokenType.COMMENT: {
        this.onComment(token3);
        break;
      }
      case TokenType.DOCTYPE: {
        this.onDoctype(token3);
        break;
      }
      case TokenType.START_TAG: {
        this._processStartTag(token3);
        break;
      }
      case TokenType.END_TAG: {
        this.onEndTag(token3);
        break;
      }
      case TokenType.EOF: {
        this.onEof(token3);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token3);
        break;
      }
    }
  }
  _isIntegrationPoint(tid, element, foreignNS) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    const attrs = this.treeAdapter.getAttrList(element);
    return isIntegrationPoint(tid, ns, attrs, foreignNS);
  }
  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
      const unopenIdx = endIndex < 0 ? listLength - 1 : endIndex - 1;
      for (let i = unopenIdx;i >= 0; i--) {
        const entry = this.activeFormattingElements.entries[i];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
        entry.element = this.openElements.current;
      }
    }
  }
  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = InsertionMode.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
    this.openElements.popUntilTagNamePopped(TAG_ID.P);
  }
  _resetInsertionMode() {
    for (let i = this.openElements.stackTop;i >= 0; i--) {
      switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
        case TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i);
          return;
        }
        case TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case TAG_ID.TD:
        case TAG_ID.TH: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case TAG_ID.HEAD: {
          if (i > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i = selectIdx - 1;i > 0; i--) {
        const tn = this.openElements.tagIDs[i];
        if (tn === TAG_ID.TEMPLATE) {
          break;
        } else if (tn === TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  _isElementCausesFosterParenting(tn) {
    return TABLE_STRUCTURE_TAGS.has(tn);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let i = this.openElements.stackTop;i >= 0; i--) {
      const openElement = this.openElements.items[i];
      switch (this.openElements.tagIDs[i]) {
        case TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          }
          break;
        }
        case TAG_ID.TABLE: {
          const parent2 = this.treeAdapter.getParentNode(openElement);
          if (parent2) {
            return { parent: parent2, beforeElement: openElement };
          }
          return { parent: this.openElements.items[i - 1], beforeElement: null };
        }
        default:
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(element) {
    const location = this._findFosterParentingLocation();
    if (location.beforeElement) {
      this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
    } else {
      this.treeAdapter.appendChild(location.parent, element);
    }
  }
  _isSpecialElement(element, id) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    return SPECIAL_ELEMENTS[ns].has(id);
  }
  onCharacter(token3) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token3);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token3);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token3);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token3);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token3);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token3);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token3);
        break;
      }
      default:
    }
  }
  onNullCharacter(token3) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token3);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token3);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token3);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token3);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token3);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token3);
        break;
      }
      default:
    }
  }
  onComment(token3) {
    this.skipNextNewLine = false;
    if (this.currentNotInHTML) {
      appendComment(this, token3);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token3);
        break;
      }
      default:
    }
  }
  onDoctype(token3) {
    this.skipNextNewLine = false;
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token3, ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token3);
        break;
      }
      default:
    }
  }
  onStartTag(token3) {
    this.skipNextNewLine = false;
    this.currentToken = token3;
    this._processStartTag(token3);
    if (token3.selfClosing && !token3.ackSelfClosing) {
      this._err(token3, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  }
  _processStartTag(token3) {
    if (this.shouldProcessStartTagTokenInForeignContent(token3)) {
      startTagInForeignContent(this, token3);
    } else {
      this._startTagOutsideForeignContent(token3);
    }
  }
  _startTagOutsideForeignContent(token3) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token3);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token3);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token3);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token3);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token3);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token3);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token3);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token3);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token3);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token3);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token3);
        break;
      }
      default:
    }
  }
  onEndTag(token3) {
    this.skipNextNewLine = false;
    this.currentToken = token3;
    if (this.currentNotInHTML) {
      endTagInForeignContent(this, token3);
    } else {
      this._endTagOutsideForeignContent(token3);
    }
  }
  _endTagOutsideForeignContent(token3) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token3);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token3);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token3);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token3);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token3);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token3);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token3);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token3);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token3);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token3);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token3);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token3);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token3);
        break;
      }
      default:
    }
  }
  onEof(token3) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token3);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token3);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token3);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token3);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token3);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token3);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token3);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token3);
        break;
      }
      default:
    }
  }
  onWhitespaceCharacter(token3) {
    if (this.skipNextNewLine) {
      this.skipNextNewLine = false;
      if (token3.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
        if (token3.chars.length === 1) {
          return;
        }
        token3.chars = token3.chars.substr(1);
      }
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token3);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token3);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token3);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token3);
        break;
      }
      default:
    }
  }
}
var TABLE_VOID_ELEMENTS = new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
// node_modules/parse5/dist/serializer/index.js
var isVoidElement = function(node4, options3) {
  return options3.treeAdapter.isElementNode(node4) && options3.treeAdapter.getNamespaceURI(node4) === NS.HTML && VOID_ELEMENTS.has(options3.treeAdapter.getTagName(node4));
};
function serializeOuter(node4, options3) {
  const opts = { ...defaultOpts3, ...options3 };
  return serializeNode(node4, opts);
}
var serializeChildNodes = function(parentNode, options3) {
  let html10 = "";
  const container = options3.treeAdapter.isElementNode(parentNode) && options3.treeAdapter.getTagName(parentNode) === TAG_NAMES.TEMPLATE && options3.treeAdapter.getNamespaceURI(parentNode) === NS.HTML ? options3.treeAdapter.getTemplateContent(parentNode) : parentNode;
  const childNodes = options3.treeAdapter.getChildNodes(container);
  if (childNodes) {
    for (const currentNode of childNodes) {
      html10 += serializeNode(currentNode, options3);
    }
  }
  return html10;
};
var serializeNode = function(node4, options3) {
  if (options3.treeAdapter.isElementNode(node4)) {
    return serializeElement(node4, options3);
  }
  if (options3.treeAdapter.isTextNode(node4)) {
    return serializeTextNode(node4, options3);
  }
  if (options3.treeAdapter.isCommentNode(node4)) {
    return serializeCommentNode(node4, options3);
  }
  if (options3.treeAdapter.isDocumentTypeNode(node4)) {
    return serializeDocumentTypeNode(node4, options3);
  }
  return "";
};
var serializeElement = function(node4, options3) {
  const tn = options3.treeAdapter.getTagName(node4);
  return `<${tn}${serializeAttributes(node4, options3)}>${isVoidElement(node4, options3) ? "" : `${serializeChildNodes(node4, options3)}</${tn}>`}`;
};
var serializeAttributes = function(node4, { treeAdapter }) {
  let html10 = "";
  for (const attr2 of treeAdapter.getAttrList(node4)) {
    html10 += " ";
    if (!attr2.namespace) {
      html10 += attr2.name;
    } else
      switch (attr2.namespace) {
        case NS.XML: {
          html10 += `xml:${attr2.name}`;
          break;
        }
        case NS.XMLNS: {
          if (attr2.name !== "xmlns") {
            html10 += "xmlns:";
          }
          html10 += attr2.name;
          break;
        }
        case NS.XLINK: {
          html10 += `xlink:${attr2.name}`;
          break;
        }
        default: {
          html10 += `${attr2.prefix}:${attr2.name}`;
        }
      }
    html10 += `="${escapeAttribute(attr2.value)}"`;
  }
  return html10;
};
var serializeTextNode = function(node4, options3) {
  const { treeAdapter } = options3;
  const content = treeAdapter.getTextNodeContent(node4);
  const parent2 = treeAdapter.getParentNode(node4);
  const parentTn = parent2 && treeAdapter.isElementNode(parent2) && treeAdapter.getTagName(parent2);
  return parentTn && treeAdapter.getNamespaceURI(parent2) === NS.HTML && hasUnescapedText(parentTn, options3.scriptingEnabled) ? content : escapeText(content);
};
var serializeCommentNode = function(node4, { treeAdapter }) {
  return `<!--${treeAdapter.getCommentNodeContent(node4)}-->`;
};
var serializeDocumentTypeNode = function(node4, { treeAdapter }) {
  return `<!DOCTYPE ${treeAdapter.getDocumentTypeNodeName(node4)}>`;
};
var VOID_ELEMENTS = new Set([
  TAG_NAMES.AREA,
  TAG_NAMES.BASE,
  TAG_NAMES.BASEFONT,
  TAG_NAMES.BGSOUND,
  TAG_NAMES.BR,
  TAG_NAMES.COL,
  TAG_NAMES.EMBED,
  TAG_NAMES.FRAME,
  TAG_NAMES.HR,
  TAG_NAMES.IMG,
  TAG_NAMES.INPUT,
  TAG_NAMES.KEYGEN,
  TAG_NAMES.LINK,
  TAG_NAMES.META,
  TAG_NAMES.PARAM,
  TAG_NAMES.SOURCE,
  TAG_NAMES.TRACK,
  TAG_NAMES.WBR
]);
var defaultOpts3 = { treeAdapter: defaultTreeAdapter, scriptingEnabled: true };

// node_modules/parse5/dist/index.js
function parse6(html10, options3) {
  return Parser.parse(html10, options3);
}
function parseFragment(fragmentContext, html10, options3) {
  if (typeof fragmentContext === "string") {
    options3 = html10;
    html10 = fragmentContext;
    fragmentContext = null;
  }
  const parser2 = Parser.getFragmentParser(fragmentContext, options3);
  parser2.tokenizer.write(html10, true);
  return parser2.getFragment();
}

// node_modules/parse5-htmlparser2-tree-adapter/dist/index.js
var createTextNode2 = function(value) {
  return new Text2(value);
};
var enquoteDoctypeId = function(id) {
  const quote = id.includes('"') ? "'" : '"';
  return quote + id + quote;
};
function serializeDoctypeContent(name, publicId, systemId) {
  let str = "!DOCTYPE ";
  if (name) {
    str += name;
  }
  if (publicId) {
    str += ` PUBLIC ${enquoteDoctypeId(publicId)}`;
  } else if (systemId) {
    str += " SYSTEM";
  }
  if (systemId) {
    str += ` ${enquoteDoctypeId(systemId)}`;
  }
  return str;
}
var adapter = {
  isCommentNode: isComment,
  isElementNode: isTag2,
  isTextNode: isText,
  createDocument() {
    const node4 = new Document([]);
    node4["x-mode"] = exports_html.DOCUMENT_MODE.NO_QUIRKS;
    return node4;
  },
  createDocumentFragment() {
    return new Document([]);
  },
  createElement(tagName, namespaceURI, attrs) {
    const attribs = Object.create(null);
    const attribsNamespace = Object.create(null);
    const attribsPrefix = Object.create(null);
    for (let i = 0;i < attrs.length; i++) {
      const attrName = attrs[i].name;
      attribs[attrName] = attrs[i].value;
      attribsNamespace[attrName] = attrs[i].namespace;
      attribsPrefix[attrName] = attrs[i].prefix;
    }
    const node4 = new Element(tagName, attribs, []);
    node4.namespace = namespaceURI;
    node4["x-attribsNamespace"] = attribsNamespace;
    node4["x-attribsPrefix"] = attribsPrefix;
    return node4;
  },
  createCommentNode(data4) {
    return new Comment2(data4);
  },
  appendChild(parentNode, newNode) {
    const prev2 = parentNode.children[parentNode.children.length - 1];
    if (prev2) {
      prev2.next = newNode;
      newNode.prev = prev2;
    }
    parentNode.children.push(newNode);
    newNode.parent = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.children.indexOf(referenceNode);
    const { prev: prev2 } = referenceNode;
    if (prev2) {
      prev2.next = newNode;
      newNode.prev = prev2;
    }
    referenceNode.prev = newNode;
    newNode.next = referenceNode;
    parentNode.children.splice(insertionIdx, 0, newNode);
    newNode.parent = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    adapter.appendChild(templateElement, contentElement);
  },
  getTemplateContent(templateElement) {
    return templateElement.children[0];
  },
  setDocumentType(document2, name, publicId, systemId) {
    const data4 = serializeDoctypeContent(name, publicId, systemId);
    let doctypeNode = document2.children.find((node4) => isDirective(node4) && node4.name === "!doctype");
    if (doctypeNode) {
      doctypeNode.data = data4 !== null && data4 !== undefined ? data4 : null;
    } else {
      doctypeNode = new ProcessingInstruction("!doctype", data4);
      adapter.appendChild(document2, doctypeNode);
    }
    doctypeNode["x-name"] = name !== null && name !== undefined ? name : undefined;
    doctypeNode["x-publicId"] = publicId !== null && publicId !== undefined ? publicId : undefined;
    doctypeNode["x-systemId"] = systemId !== null && systemId !== undefined ? systemId : undefined;
  },
  setDocumentMode(document2, mode) {
    document2["x-mode"] = mode;
  },
  getDocumentMode(document2) {
    return document2["x-mode"];
  },
  detachNode(node4) {
    if (node4.parent) {
      const idx = node4.parent.children.indexOf(node4);
      const { prev: prev2, next: next2 } = node4;
      node4.prev = null;
      node4.next = null;
      if (prev2) {
        prev2.next = next2;
      }
      if (next2) {
        next2.prev = prev2;
      }
      node4.parent.children.splice(idx, 1);
      node4.parent = null;
    }
  },
  insertText(parentNode, text3) {
    const lastChild = parentNode.children[parentNode.children.length - 1];
    if (lastChild && isText(lastChild)) {
      lastChild.data += text3;
    } else {
      adapter.appendChild(parentNode, createTextNode2(text3));
    }
  },
  insertTextBefore(parentNode, text3, referenceNode) {
    const prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];
    if (prevNode && isText(prevNode)) {
      prevNode.data += text3;
    } else {
      adapter.insertBefore(parentNode, createTextNode2(text3), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    for (let i = 0;i < attrs.length; i++) {
      const attrName = attrs[i].name;
      if (typeof recipient.attribs[attrName] === "undefined") {
        recipient.attribs[attrName] = attrs[i].value;
        recipient["x-attribsNamespace"][attrName] = attrs[i].namespace;
        recipient["x-attribsPrefix"][attrName] = attrs[i].prefix;
      }
    }
  },
  getFirstChild(node4) {
    return node4.children[0];
  },
  getChildNodes(node4) {
    return node4.children;
  },
  getParentNode(node4) {
    return node4.parent;
  },
  getAttrList(element) {
    return element.attributes;
  },
  getTagName(element) {
    return element.name;
  },
  getNamespaceURI(element) {
    return element.namespace;
  },
  getTextNodeContent(textNode) {
    return textNode.data;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    var _a2;
    return (_a2 = doctypeNode["x-name"]) !== null && _a2 !== undefined ? _a2 : "";
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    var _a2;
    return (_a2 = doctypeNode["x-publicId"]) !== null && _a2 !== undefined ? _a2 : "";
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    var _a2;
    return (_a2 = doctypeNode["x-systemId"]) !== null && _a2 !== undefined ? _a2 : "";
  },
  isDocumentTypeNode(node4) {
    return isDirective(node4) && node4.name === "!doctype";
  },
  setNodeSourceCodeLocation(node4, location) {
    if (location) {
      node4.startIndex = location.startOffset;
      node4.endIndex = location.endOffset;
    }
    node4.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node4) {
    return node4.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node4, endLocation) {
    if (endLocation.endOffset != null)
      node4.endIndex = endLocation.endOffset;
    node4.sourceCodeLocation = {
      ...node4.sourceCodeLocation,
      ...endLocation
    };
  }
};

// node_modules/cheerio/dist/browser/parsers/parse5-adapter.js
function parseWithParse5(content, options3, isDocument2, context) {
  var _a2;
  (_a2 = options3.treeAdapter) !== null && _a2 !== undefined || (options3.treeAdapter = adapter);
  if (options3.scriptingEnabled !== false) {
    options3.scriptingEnabled = true;
  }
  return isDocument2 ? parse6(content, options3) : parseFragment(context, content, options3);
}
function renderWithParse5(dom) {
  const nodes = "length" in dom ? dom : [dom];
  for (let index2 = 0;index2 < nodes.length; index2 += 1) {
    const node4 = nodes[index2];
    if (isDocument(node4)) {
      Array.prototype.splice.call(nodes, index2, 1, ...node4.children);
    }
  }
  let result = "";
  for (let index2 = 0;index2 < nodes.length; index2 += 1) {
    const node4 = nodes[index2];
    result += serializeOuter(node4, renderOpts);
  }
  return result;
}
var renderOpts = { treeAdapter: adapter };

// node_modules/htmlparser2/lib/esm/Tokenizer.js
var isWhitespace3 = function(c) {
  return c === CharCodes2.Space || c === CharCodes2.NewLine || c === CharCodes2.Tab || c === CharCodes2.FormFeed || c === CharCodes2.CarriageReturn;
};
var isEndOfTagSection = function(c) {
  return c === CharCodes2.Slash || c === CharCodes2.Gt || isWhitespace3(c);
};
var isASCIIAlpha = function(c) {
  return c >= CharCodes2.LowerA && c <= CharCodes2.LowerZ || c >= CharCodes2.UpperA && c <= CharCodes2.UpperZ;
};
var CharCodes2;
(function(CharCodes3) {
  CharCodes3[CharCodes3["Tab"] = 9] = "Tab";
  CharCodes3[CharCodes3["NewLine"] = 10] = "NewLine";
  CharCodes3[CharCodes3["FormFeed"] = 12] = "FormFeed";
  CharCodes3[CharCodes3["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes3[CharCodes3["Space"] = 32] = "Space";
  CharCodes3[CharCodes3["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes3[CharCodes3["Number"] = 35] = "Number";
  CharCodes3[CharCodes3["Amp"] = 38] = "Amp";
  CharCodes3[CharCodes3["SingleQuote"] = 39] = "SingleQuote";
  CharCodes3[CharCodes3["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes3[CharCodes3["Dash"] = 45] = "Dash";
  CharCodes3[CharCodes3["Slash"] = 47] = "Slash";
  CharCodes3[CharCodes3["Zero"] = 48] = "Zero";
  CharCodes3[CharCodes3["Nine"] = 57] = "Nine";
  CharCodes3[CharCodes3["Semi"] = 59] = "Semi";
  CharCodes3[CharCodes3["Lt"] = 60] = "Lt";
  CharCodes3[CharCodes3["Eq"] = 61] = "Eq";
  CharCodes3[CharCodes3["Gt"] = 62] = "Gt";
  CharCodes3[CharCodes3["Questionmark"] = 63] = "Questionmark";
  CharCodes3[CharCodes3["UpperA"] = 65] = "UpperA";
  CharCodes3[CharCodes3["LowerA"] = 97] = "LowerA";
  CharCodes3[CharCodes3["UpperF"] = 70] = "UpperF";
  CharCodes3[CharCodes3["LowerF"] = 102] = "LowerF";
  CharCodes3[CharCodes3["UpperZ"] = 90] = "UpperZ";
  CharCodes3[CharCodes3["LowerZ"] = 122] = "LowerZ";
  CharCodes3[CharCodes3["LowerX"] = 120] = "LowerX";
  CharCodes3[CharCodes3["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes2 || (CharCodes2 = {}));
var State2;
(function(State3) {
  State3[State3["Text"] = 1] = "Text";
  State3[State3["BeforeTagName"] = 2] = "BeforeTagName";
  State3[State3["InTagName"] = 3] = "InTagName";
  State3[State3["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State3[State3["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State3[State3["InClosingTagName"] = 6] = "InClosingTagName";
  State3[State3["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State3[State3["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State3[State3["InAttributeName"] = 9] = "InAttributeName";
  State3[State3["AfterAttributeName"] = 10] = "AfterAttributeName";
  State3[State3["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State3[State3["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State3[State3["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State3[State3["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State3[State3["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State3[State3["InDeclaration"] = 16] = "InDeclaration";
  State3[State3["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State3[State3["BeforeComment"] = 18] = "BeforeComment";
  State3[State3["CDATASequence"] = 19] = "CDATASequence";
  State3[State3["InSpecialComment"] = 20] = "InSpecialComment";
  State3[State3["InCommentLike"] = 21] = "InCommentLike";
  State3[State3["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State3[State3["BeforeSpecialT"] = 23] = "BeforeSpecialT";
  State3[State3["SpecialStartSequence"] = 24] = "SpecialStartSequence";
  State3[State3["InSpecialTag"] = 25] = "InSpecialTag";
  State3[State3["InEntity"] = 26] = "InEntity";
})(State2 || (State2 = {}));
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
};

class Tokenizer2 {
  constructor({ xmlMode = false, decodeEntities = true }, cbs) {
    this.cbs = cbs;
    this.state = State2.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.entityStart = 0;
    this.baseState = State2.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = undefined;
    this.sequenceIndex = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityDecoder = new EntityDecoder(xmlMode ? decode_data_xml_default : decode_data_html_default, (cp, consumed) => this.emitCodePoint(cp, consumed));
  }
  reset() {
    this.state = State2.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State2.Text;
    this.currentSequence = undefined;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  stateText(c) {
    if (c === CharCodes2.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes2.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State2.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c === CharCodes2.Amp) {
      this.startEntity();
    }
  }
  stateSpecialStartSequence(c) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? isEndOfTagSection(c) : (c | 32) === this.currentSequence[this.sequenceIndex];
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State2.InTagName;
    this.stateInTagName(c);
  }
  stateInSpecialTag(c) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c === CharCodes2.Gt || isWhitespace3(c)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c === CharCodes2.Amp) {
          this.startEntity();
        }
      } else if (this.fastForwardTo(CharCodes2.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c === CharCodes2.Lt);
    }
  }
  stateCDATASequence(c) {
    if (c === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State2.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State2.InDeclaration;
      this.stateInDeclaration(c);
    }
  }
  fastForwardTo(c) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  stateInCommentLike(c) {
    if (c === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State2.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  isTagStartChar(c) {
    return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State2.SpecialStartSequence;
  }
  stateBeforeTagName(c) {
    if (c === CharCodes2.ExclamationMark) {
      this.state = State2.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes2.Questionmark) {
      this.state = State2.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c)) {
      const lower = c | 32;
      this.sectionStart = this.index;
      if (this.xmlMode) {
        this.state = State2.InTagName;
      } else if (lower === Sequences.ScriptEnd[2]) {
        this.state = State2.BeforeSpecialS;
      } else if (lower === Sequences.TitleEnd[2]) {
        this.state = State2.BeforeSpecialT;
      } else {
        this.state = State2.InTagName;
      }
    } else if (c === CharCodes2.Slash) {
      this.state = State2.BeforeClosingTagName;
    } else {
      this.state = State2.Text;
      this.stateText(c);
    }
  }
  stateInTagName(c) {
    if (isEndOfTagSection(c)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State2.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateBeforeClosingTagName(c) {
    if (isWhitespace3(c)) {
    } else if (c === CharCodes2.Gt) {
      this.state = State2.Text;
    } else {
      this.state = this.isTagStartChar(c) ? State2.InClosingTagName : State2.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c) {
    if (c === CharCodes2.Gt || isWhitespace3(c)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State2.AfterClosingTagName;
      this.stateAfterClosingTagName(c);
    }
  }
  stateAfterClosingTagName(c) {
    if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.state = State2.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c) {
    if (c === CharCodes2.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State2.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State2.Text;
      }
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes2.Slash) {
      this.state = State2.InSelfClosingTag;
    } else if (!isWhitespace3(c)) {
      this.state = State2.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c) {
    if (c === CharCodes2.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State2.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace3(c)) {
      this.state = State2.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    }
  }
  stateInAttributeName(c) {
    if (c === CharCodes2.Eq || isEndOfTagSection(c)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = this.index;
      this.state = State2.AfterAttributeName;
      this.stateAfterAttributeName(c);
    }
  }
  stateAfterAttributeName(c) {
    if (c === CharCodes2.Eq) {
      this.state = State2.BeforeAttributeValue;
    } else if (c === CharCodes2.Slash || c === CharCodes2.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.sectionStart = -1;
      this.state = State2.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (!isWhitespace3(c)) {
      this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
      this.state = State2.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c) {
    if (c === CharCodes2.DoubleQuote) {
      this.state = State2.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c === CharCodes2.SingleQuote) {
      this.state = State2.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace3(c)) {
      this.sectionStart = this.index;
      this.state = State2.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c);
    }
  }
  handleInAttributeValue(c, quote) {
    if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes2.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
      this.state = State2.BeforeAttributeName;
    } else if (this.decodeEntities && c === CharCodes2.Amp) {
      this.startEntity();
    }
  }
  stateInAttributeValueDoubleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes2.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c) {
    this.handleInAttributeValue(c, CharCodes2.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c) {
    if (isWhitespace3(c) || c === CharCodes2.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State2.BeforeAttributeName;
      this.stateBeforeAttributeName(c);
    } else if (this.decodeEntities && c === CharCodes2.Amp) {
      this.startEntity();
    }
  }
  stateBeforeDeclaration(c) {
    if (c === CharCodes2.OpeningSquareBracket) {
      this.state = State2.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c === CharCodes2.Dash ? State2.BeforeComment : State2.InDeclaration;
    }
  }
  stateInDeclaration(c) {
    if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State2.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c) {
    if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State2.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c) {
    if (c === CharCodes2.Dash) {
      this.state = State2.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State2.InDeclaration;
    }
  }
  stateInSpecialComment(c) {
    if (c === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State2.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c) {
    const lower = c | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State2.InTagName;
      this.stateInTagName(c);
    }
  }
  stateBeforeSpecialT(c) {
    const lower = c | 32;
    if (lower === Sequences.TitleEnd[3]) {
      this.startSpecial(Sequences.TitleEnd, 4);
    } else if (lower === Sequences.TextareaEnd[3]) {
      this.startSpecial(Sequences.TextareaEnd, 4);
    } else {
      this.state = State2.InTagName;
      this.stateInTagName(c);
    }
  }
  startEntity() {
    this.baseState = this.state;
    this.state = State2.InEntity;
    this.entityStart = this.index;
    this.entityDecoder.startEntity(this.xmlMode ? DecodingMode.Strict : this.baseState === State2.Text || this.baseState === State2.InSpecialTag ? DecodingMode.Legacy : DecodingMode.Attribute);
  }
  stateInEntity() {
    const length = this.entityDecoder.write(this.buffer, this.index - this.offset);
    if (length >= 0) {
      this.state = this.baseState;
      if (length === 0) {
        this.index = this.entityStart;
      }
    } else {
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State2.Text || this.state === State2.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State2.InAttributeValueDq || this.state === State2.InAttributeValueSq || this.state === State2.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  parse() {
    while (this.shouldContinue()) {
      const c = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State2.Text: {
          this.stateText(c);
          break;
        }
        case State2.SpecialStartSequence: {
          this.stateSpecialStartSequence(c);
          break;
        }
        case State2.InSpecialTag: {
          this.stateInSpecialTag(c);
          break;
        }
        case State2.CDATASequence: {
          this.stateCDATASequence(c);
          break;
        }
        case State2.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c);
          break;
        }
        case State2.InAttributeName: {
          this.stateInAttributeName(c);
          break;
        }
        case State2.InCommentLike: {
          this.stateInCommentLike(c);
          break;
        }
        case State2.InSpecialComment: {
          this.stateInSpecialComment(c);
          break;
        }
        case State2.BeforeAttributeName: {
          this.stateBeforeAttributeName(c);
          break;
        }
        case State2.InTagName: {
          this.stateInTagName(c);
          break;
        }
        case State2.InClosingTagName: {
          this.stateInClosingTagName(c);
          break;
        }
        case State2.BeforeTagName: {
          this.stateBeforeTagName(c);
          break;
        }
        case State2.AfterAttributeName: {
          this.stateAfterAttributeName(c);
          break;
        }
        case State2.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c);
          break;
        }
        case State2.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c);
          break;
        }
        case State2.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c);
          break;
        }
        case State2.AfterClosingTagName: {
          this.stateAfterClosingTagName(c);
          break;
        }
        case State2.BeforeSpecialS: {
          this.stateBeforeSpecialS(c);
          break;
        }
        case State2.BeforeSpecialT: {
          this.stateBeforeSpecialT(c);
          break;
        }
        case State2.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c);
          break;
        }
        case State2.InSelfClosingTag: {
          this.stateInSelfClosingTag(c);
          break;
        }
        case State2.InDeclaration: {
          this.stateInDeclaration(c);
          break;
        }
        case State2.BeforeDeclaration: {
          this.stateBeforeDeclaration(c);
          break;
        }
        case State2.BeforeComment: {
          this.stateBeforeComment(c);
          break;
        }
        case State2.InProcessingInstruction: {
          this.stateInProcessingInstruction(c);
          break;
        }
        case State2.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State2.InEntity) {
      this.entityDecoder.end();
      this.state = this.baseState;
    }
    this.handleTrailingData();
    this.cbs.onend();
  }
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.sectionStart >= endIndex) {
      return;
    }
    if (this.state === State2.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State2.InTagName || this.state === State2.BeforeAttributeName || this.state === State2.BeforeAttributeValue || this.state === State2.AfterAttributeName || this.state === State2.InAttributeName || this.state === State2.InAttributeValueSq || this.state === State2.InAttributeValueDq || this.state === State2.InAttributeValueNq || this.state === State2.InClosingTagName) {
    } else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitCodePoint(cp, consumed) {
    if (this.baseState !== State2.Text && this.baseState !== State2.InSpecialTag) {
      if (this.sectionStart < this.entityStart) {
        this.cbs.onattribdata(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.onattribentity(cp);
    } else {
      if (this.sectionStart < this.entityStart) {
        this.cbs.ontext(this.sectionStart, this.entityStart);
      }
      this.sectionStart = this.entityStart + consumed;
      this.index = this.sectionStart - 1;
      this.cbs.ontextentity(cp, this.sectionStart);
    }
  }
}

// node_modules/htmlparser2/lib/esm/Parser.js
var formTags = new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
var pTag = new Set(["p"]);
var tableSectionTags = new Set(["thead", "tbody"]);
var ddtTags = new Set(["dd", "dt"]);
var rtpTags = new Set(["rt", "rp"]);
var openImpliesClose = new Map([
  ["tr", new Set(["tr", "th", "td"])],
  ["th", new Set(["th"])],
  ["td", new Set(["thead", "th", "td"])],
  ["body", new Set(["head", "link", "script"])],
  ["li", new Set(["li"])],
  ["p", pTag],
  ["h1", pTag],
  ["h2", pTag],
  ["h3", pTag],
  ["h4", pTag],
  ["h5", pTag],
  ["h6", pTag],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", new Set(["option"])],
  ["optgroup", new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
var voidElements = new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]);
var reNameEnd = /\s|\//;

class Parser2 {
  constructor(cbs, options3 = {}) {
    var _a2, _b, _c, _d, _e, _f;
    this.options = options3;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== undefined ? cbs : {};
    this.htmlMode = !this.options.xmlMode;
    this.lowerCaseTagNames = (_a2 = options3.lowerCaseTags) !== null && _a2 !== undefined ? _a2 : this.htmlMode;
    this.lowerCaseAttributeNames = (_b = options3.lowerCaseAttributeNames) !== null && _b !== undefined ? _b : this.htmlMode;
    this.recognizeSelfClosing = (_c = options3.recognizeSelfClosing) !== null && _c !== undefined ? _c : !this.htmlMode;
    this.tokenizer = new ((_d = options3.Tokenizer) !== null && _d !== undefined ? _d : Tokenizer2)(this.options, this);
    this.foreignContext = [!this.htmlMode];
    (_f = (_e = this.cbs).onparserinit) === null || _f === undefined || _f.call(_e, this);
  }
  ontext(start, endIndex) {
    var _a2, _b;
    const data4 = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === undefined || _b.call(_a2, data4);
    this.startIndex = endIndex;
  }
  ontextentity(cp, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex - 1;
    (_b = (_a2 = this.cbs).ontext) === null || _b === undefined || _b.call(_a2, fromCodePoint(cp));
    this.startIndex = endIndex;
  }
  isVoidElement(name) {
    return this.htmlMode && voidElements.has(name);
  }
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    this.emitOpenTag(name);
  }
  emitOpenTag(name) {
    var _a2, _b, _c, _d;
    this.openTagStart = this.startIndex;
    this.tagname = name;
    const impliesClose = this.htmlMode && openImpliesClose.get(name);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
        const element = this.stack.shift();
        (_b = (_a2 = this.cbs).onclosetag) === null || _b === undefined || _b.call(_a2, element, true);
      }
    }
    if (!this.isVoidElement(name)) {
      this.stack.unshift(name);
      if (this.htmlMode) {
        if (foreignContextElements.has(name)) {
          this.foreignContext.unshift(true);
        } else if (htmlIntegrationElements.has(name)) {
          this.foreignContext.unshift(false);
        }
      }
    }
    (_d = (_c = this.cbs).onopentagname) === null || _d === undefined || _d.call(_c, name);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a2, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a2 = this.cbs).onopentag) === null || _b === undefined || _b.call(_a2, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  onclosetag(start, endIndex) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    this.endIndex = endIndex;
    let name = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) {
      this.foreignContext.shift();
    }
    if (!this.isVoidElement(name)) {
      const pos = this.stack.indexOf(name);
      if (pos !== -1) {
        for (let index2 = 0;index2 <= pos; index2++) {
          const element = this.stack.shift();
          (_b = (_a2 = this.cbs).onclosetag) === null || _b === undefined || _b.call(_a2, element, index2 !== pos);
        }
      } else if (this.htmlMode && name === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (this.htmlMode && name === "br") {
      (_d = (_c = this.cbs).onopentagname) === null || _d === undefined || _d.call(_c, "br");
      (_f = (_e = this.cbs).onopentag) === null || _f === undefined || _f.call(_e, "br", {}, true);
      (_h = (_g = this.cbs).onclosetag) === null || _h === undefined || _h.call(_g, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.recognizeSelfClosing || this.foreignContext[0]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a2, _b;
    const name = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[0] === name) {
      (_b = (_a2 = this.cbs).onclosetag) === null || _b === undefined || _b.call(_a2, name, !isOpenImplied);
      this.stack.shift();
    }
  }
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
  }
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  onattribentity(cp) {
    this.attribvalue += fromCodePoint(cp);
  }
  onattribend(quote, endIndex) {
    var _a2, _b;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).onattribute) === null || _b === undefined || _b.call(_a2, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? undefined : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index2 = value.search(reNameEnd);
    let name = index2 < 0 ? value : value.substr(0, index2);
    if (this.lowerCaseTagNames) {
      name = name.toLowerCase();
    }
    return name;
  }
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  oncomment(start, endIndex, offset) {
    var _a2, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a2 = this.cbs).oncomment) === null || _b === undefined || _b.call(_a2, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) === null || _d === undefined || _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  oncdata(start, endIndex, offset) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (!this.htmlMode || this.options.recognizeCDATA) {
      (_b = (_a2 = this.cbs).oncdatastart) === null || _b === undefined || _b.call(_a2);
      (_d = (_c = this.cbs).ontext) === null || _d === undefined || _d.call(_c, value);
      (_f = (_e = this.cbs).oncdataend) === null || _f === undefined || _f.call(_e);
    } else {
      (_h = (_g = this.cbs).oncomment) === null || _h === undefined || _h.call(_g, `[CDATA[${value}]]`);
      (_k = (_j = this.cbs).oncommentend) === null || _k === undefined || _k.call(_j);
    }
    this.startIndex = endIndex + 1;
  }
  onend() {
    var _a2, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index2 = 0;index2 < this.stack.length; index2++) {
        this.cbs.onclosetag(this.stack[index2], true);
      }
    }
    (_b = (_a2 = this.cbs).onend) === null || _b === undefined || _b.call(_a2);
  }
  reset() {
    var _a2, _b, _c, _d;
    (_b = (_a2 = this.cbs).onreset) === null || _b === undefined || _b.call(_a2);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) === null || _d === undefined || _d.call(_c, this);
    this.buffers.length = 0;
    this.foreignContext.length = 0;
    this.foreignContext.unshift(!this.htmlMode);
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  parseComplete(data4) {
    this.reset();
    this.end(data4);
  }
  getSlice(start, end2) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice2 = this.buffers[0].slice(start - this.bufferOffset, end2 - this.bufferOffset);
    while (end2 - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice2 += this.buffers[0].slice(0, end2 - this.bufferOffset);
    }
    return slice2;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  write(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === undefined || _b.call(_a2, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  end(chunk) {
    var _a2, _b;
    if (this.ended) {
      (_b = (_a2 = this.cbs).onerror) === null || _b === undefined || _b.call(_a2, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  pause() {
    this.tokenizer.pause();
  }
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
  parseChunk(chunk) {
    this.write(chunk);
  }
  done(chunk) {
    this.end(chunk);
  }
}

// node_modules/htmlparser2/lib/esm/index.js
function parseDocument(data4, options3) {
  const handler = new DomHandler(undefined, options3);
  new Parser2(handler, options3).end(data4);
  return handler.root;
}
// node_modules/cheerio/dist/browser/load-parse.js
var parse8 = getParse((content, options3, isDocument2, context) => options3._useHtmlParser2 ? parseDocument(content, options3) : parseWithParse5(content, options3, isDocument2, context));
var load2 = getLoad(parse8, (dom, options3) => options3._useHtmlParser2 ? esm_default(dom, options3) : renderWithParse5(dom));
// index.ts
async function scrapeWebsite(url, linkClass, regex) {
  const result = {};
  try {
    const { data: mainPageHtml } = await axios_default.get(url);
    const $2 = load2(mainPageHtml);
    $2(`a.${linkClass}`).each((_, element) => {
      const linkText = $2(element).text();
      if (linkText.startsWith(" ")) {
        return;
      }
      const href = $2(element).attr("href");
      if (href) {
        console.log("scriping " + href);
        axios_default.get(href).then(({ data: pageHtml }) => {
          const pageContent = pageHtml;
          const match = regex.exec(pageContent);
          const value = match ? match[0] : "";
          result[linkText] = value;
        }).catch((err) => {
          console.error(`Error fetching or processing ${href}: ${err.message}`);
        });
      }
    });
  } catch (err) {
    console.error(`Error fetching main page ${url}: ${err.message}`);
  }
  return result;
}
(async () => {
  const url = "https://upcfoodsearch.com/food-ingredients";
  const linkClass = "a.list-group-item";
  const regex = /some-regex-pattern/g;
  const data4 = await scrapeWebsite(url, linkClass, regex);
  console.log(data4);
})();