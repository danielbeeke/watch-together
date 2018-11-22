(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("debug"), require("fs"), require("purdy"), require("request-promise"), require("tough-cookie"));
	else if(typeof define === 'function' && define.amd)
		define(["debug", "fs", "purdy", "request-promise", "tough-cookie"], factory);
	else if(typeof exports === 'object')
		exports["chromecast-discover"] = factory(require("debug"), require("fs"), require("purdy"), require("request-promise"), require("tough-cookie"));
	else
		root["chromecast-discover"] = factory(root["debug"], root["fs"], root["purdy"], root["request-promise"], root["tough-cookie"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("purdy");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

module.exports = require("tough-cookie");

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(1);

var _fs2 = _interopRequireDefault(_fs);

var _requestPromise = __webpack_require__(3);

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _toughCookie = __webpack_require__(5);

var _toughCookie2 = _interopRequireDefault(_toughCookie);

var _purdy = __webpack_require__(2);

var _purdy2 = _interopRequireDefault(_purdy);

var _debug = __webpack_require__(0);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('netflix-login');

var baseOptions = {
  uri: 'https://www.netflix.com/Login',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'
  },
  jar: _requestPromise2.default.jar()
};

var saveToCache = function saveToCache(authData, filename) {
  debug('saving to cache');

  var data = {
    // FIXME why are we accessing something private?
    cookieJSON: authData.cookieJar._jar.toJSON(), // eslint-disable-line no-underscore-dangle
    esn: authData.esn
  };
  var dataJSON = JSON.stringify(data);

  _fs2.default.writeFileSync(filename, dataJSON);
};

var loadFromCache = function loadFromCache(filename) {
  debug('loading from cache');

  var dataJSON = _fs2.default.readFileSync(filename);
  var data = JSON.parse(dataJSON);

  var cookieJar = new _toughCookie2.default.CookieJar.fromJSON(data.cookieJSON); // eslint-disable-line new-cap
  var authData = {
    cookieJar: _requestPromise2.default.jar(cookieJar.store),
    esn: data.esn
  };

  return authData;
};

var cookieJar = function cookieJar() {
  return baseOptions.jar;
};

var cookies = function cookies() {
  return cookieJar().getCookies(baseOptions.uri);
};

var cookiesMissing = function cookiesMissing() {
  var result = 0;

  cookies().forEach(function (cookie) {
    if (cookie.key === 'NetflixId' || cookie.key === 'SecureNetflixId') {
      result += 1;
    }
  });

  return result !== 2;
};

var getAuthURL = function getAuthURL() {
  return (0, _requestPromise2.default)(baseOptions).then(function (body) {
    var authURL = body.match(/name="authURL" value="(.+?)"/)[1];
    debug('authURL: ' + authURL);

    return authURL;
  }).catch(function (err) {
    throw new Error('netflix-login: Couldn\'t retrieve authURL ' + err);
  });
};

var postLogin = function postLogin(authURL, email, password) {
  var options = _extends({}, baseOptions, {
    method: 'POST',
    simple: false,
    resolveWithFullResponse: true,
    form: {
      authURL: authURL,
      email: email,
      password: password,
      rememberMeCheckbox: 'true',
      flow: 'websiteSignUp',
      mode: 'login',
      action: 'loginAction',
      withFields: 'email,password,rememberMe,nextPage',
      nextPage: ''
    }
  });

  return (0, _requestPromise2.default)(options).then(function (response) {
    if (response.statusCode !== 302) {
      throw new Error('netflix-login: Login POST didn\'t redirect. Bad password? status code: ' + response.statusCode);
    }

    var location = response.headers.location;
    debug('redirected to ' + location);

    return location;
  }).catch(function (err) {
    throw new Error('netflix-login: postLogin failed ' + _purdy2.default.stringify(err));
  });
};

var getLogin = function getLogin() {
  return (/* location */(0, _requestPromise2.default)(baseOptions).then(function (body) {
      var authData = {
        cookieJar: cookieJar()
      };

      cookies().forEach(function (cookie) {
        if (cookie.key === 'NetflixId') {
          authData.netflixId = cookie.value;
        }
        if (cookie.key === 'SecureNetflixId') {
          authData.secureNetflixId = cookie.value;
        }
      });

      authData.esn = body.match(/"esn":"([^"]+)"/)[1];

      debug('authData: ' + _purdy2.default.stringify(authData));

      return authData;
    }).catch(function (err) {
      throw new Error('netflix-login: getLogin failed ' + err.stack);
    })
  );
};

var NetflixLogin = function () {
  function NetflixLogin() {
    _classCallCheck(this, NetflixLogin);
  }

  _createClass(NetflixLogin, null, [{
    key: 'login',
    value: function login(email, password) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var authDataFilename = options.cachePath + '/authData.json';

      if (options.useCache && _fs2.default.existsSync(authDataFilename)) {
        return Promise.resolve(loadFromCache(authDataFilename));
      }

      return getAuthURL().then(function (authURL) {
        return postLogin(authURL, email, password);
      }).then(function (location) {
        return getLogin(location);
      }).then(function (authData) {
        if (options.useCache) {
          saveToCache(authData, authDataFilename);
        }

        return authData;
      });
    }
  }, {
    key: 'expired',
    value: function expired() {
      var result = false;

      if (cookiesMissing()) {
        return true;
      }

      cookies().forEach(function (cookie) {
        if (cookie.key !== 'NetflixId' && cookie.key !== 'SecureNetflixId') {
          return;
        }

        if (cookie.TTL() === 0) {
          result = true;
        }
      });

      return result;
    }
  }, {
    key: 'privateReset',
    value: function privateReset() {
      baseOptions.jar = _requestPromise2.default.jar();
    }
  }]);

  return NetflixLogin;
}();

exports.default = NetflixLogin;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=login.js.map