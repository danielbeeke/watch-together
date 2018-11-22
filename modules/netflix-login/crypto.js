(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("debug"), require("fs"), require("purdy"), require("request-promise"), require("node-forge"), require("util"), require("zlib"));
	else if(typeof define === 'function' && define.amd)
		define(["debug", "fs", "purdy", "request-promise", "node-forge", "util", "zlib"], factory);
	else if(typeof exports === 'object')
		exports["chromecast-discover"] = factory(require("debug"), require("fs"), require("purdy"), require("request-promise"), require("node-forge"), require("util"), require("zlib"));
	else
		root["chromecast-discover"] = factory(root["debug"], root["fs"], root["purdy"], root["request-promise"], root["node-forge"], root["util"], root["zlib"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("node-forge");

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCryptoKeys = exports.sign = exports.decrypt = exports.encrypt = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(1);

var _fs2 = _interopRequireDefault(_fs);

var _nodeForge = __webpack_require__(4);

var _nodeForge2 = _interopRequireDefault(_nodeForge);

var _requestPromise = __webpack_require__(3);

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _zlib = __webpack_require__(7);

var _zlib2 = _interopRequireDefault(_zlib);

var _debug = __webpack_require__(0);

var _debug2 = _interopRequireDefault(_debug);

var _purdy = __webpack_require__(2);

var _purdy2 = _interopRequireDefault(_purdy);

var _util = __webpack_require__(6);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_util2.default.inspect.defaultOptions.depth = null;

var debug = (0, _debug2.default)('netflix-login:crypto');

var netflixPublicKey64 = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlibeiUhffUDs6QqZiB+jXH/MNgITf7OOcMzuSv4G3JysWkc0aPbT3vkCVaxdjNtw50zo2Si8I24z3/ggS3wZaF//lJ/jgA70siIL6J8kBt8zy3x+tup4Dc0QZH0k1oxzQxM90  FB5x+UP0hORqQEUYZCGZ9RbZ/WNV70TAmFkjmckutWN9DtR6WUdAQWr0HxsxI9R05nz5qU2530AfQ95h+WGZqnRoG0W6xO1X05scyscNQg0PNCy3nfKBG+E6uIl5JB4dpc9cgSNgkfAIeuPURhpD0jHkJ/+4ytpdsXAGmwYmoJcCSE1TJyYYoExuoaE8gLFeM01xXK5VIN  U7/eWjQIDAQAB'; // eslint-disable-line max-len

var encrypt = exports.encrypt = function encrypt(cleartext, keys) {
  debug('encrypt');

  var algorithm = keys.encryptionKey.algorithm;
  var key = _nodeForge2.default.util.decode64(keys.encryptionKey.key64);
  var iv = _nodeForge2.default.random.getBytesSync(16);

  var buffer = _nodeForge2.default.util.createBuffer(cleartext);

  var cipher = _nodeForge2.default.cipher.createCipher(algorithm, key);
  cipher.start({ iv: iv });
  cipher.update(buffer);
  cipher.finish();

  var encrypted = cipher.output.getBytes();
  var encrypted64 = _nodeForge2.default.util.encode64(encrypted);

  var iv64 = _nodeForge2.default.util.encode64(iv);

  return {
    ciphertext64: encrypted64,
    iv64: iv64
  };
};

var decrypt = exports.decrypt = function decrypt(ciphertext64, iv64, keys) {
  debug('encrypt json');

  var algorithm = keys.encryptionKey.algorithm;
  var key = _nodeForge2.default.util.decode64(keys.encryptionKey.key64);
  var iv = _nodeForge2.default.util.decode64(iv64);
  var ciphertext = _nodeForge2.default.util.decode64(ciphertext64);

  var decipher = _nodeForge2.default.cipher.createDecipher(algorithm, key);
  decipher.start({ iv: iv });
  decipher.update(_nodeForge2.default.util.createBuffer(ciphertext));
  decipher.finish();

  var decrypted = decipher.output.getBytes();

  return decrypted;
};

var sign = exports.sign = function sign(text2sign, keys) {
  debug('sign');

  var algorithm = keys.hmacKey.algorithm;
  var key = _nodeForge2.default.util.decode64(keys.hmacKey.key64);

  var hmac = _nodeForge2.default.hmac.create();
  hmac.start(algorithm, key);
  hmac.update(text2sign);

  var digest = hmac.digest();
  var signature = digest.bytes();
  var signature64 = _nodeForge2.default.util.encode64(signature);

  return signature64;
};

var verify = function verify(text2verify, signature, keys) {
  debug('verify');

  var mySignature = sign(text2verify, keys);

  return mySignature === signature;
};

var unwrapKey = function unwrapKey(data, cryptoKeys) {
  debug('unwrap key');

  var wrappedKey = _nodeForge2.default.util.decode64(data);

  var unwrappedKeyJSON = cryptoKeys.rsaKeyPair.privateKey.decrypt(wrappedKey, 'RSA-OAEP');
  var unwrappedKey = JSON.parse(unwrappedKeyJSON);

  // JWK Keys are Base64URL encoded
  var key = unwrappedKey.k;
  key = key.replace(/-/g, '+');
  key = key.replace(/_/g, '/');
  switch (key.length % 4) {
    case 0:
      break;
    case 2:
      key += '==';
      break;
    case 3:
      key += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }
  key = _nodeForge2.default.util.decode64(key);

  var keyData = {
    key: key
  };

  switch (unwrappedKey.alg) {
    case 'A128CBC':
      keyData.algorithm = 'AES-CBC';
      break;
    case 'HS256':
      keyData.algorithm = 'SHA256';
      break;
    default:
      throw new Error('Unsupported algorithm: ' + unwrappedKey.alg);
  }

  return keyData;
};

var compress = function compress(data) {
  debug('compress');

  var compressed = _zlib2.default.gzipSync(data);
  var compressed64 = compressed.toString('base64');

  return compressed64;
};

var saveToCache = function saveToCache(filename, cryptoKeys) {
  debug('saving to cache');

  var rsaPublicKeyPem = _nodeForge2.default.pki.publicKeyToPem(cryptoKeys.rsaKeyPair.publicKey);
  var rsaPrivateKeyPem = _nodeForge2.default.pki.privateKeyToPem(cryptoKeys.rsaKeyPair.privateKey);

  var data = _extends({}, cryptoKeys, {
    rsaPublicKeyPemStripped: cryptoKeys.rsaKeyPair.publicKeyPem,
    rsaPublicKeyPem: rsaPublicKeyPem,
    rsaPrivateKeyPem: rsaPrivateKeyPem
  });

  delete data.rsaKeyPair;
  delete data.netflixPublicKey;
  delete data.authData;

  var dataJSON = JSON.stringify(data);

  _fs2.default.writeFileSync(filename, dataJSON);
};

var loadFromCache = function loadFromCache(filename) {
  debug('loading from cache');

  var dataJSON = _fs2.default.readFileSync(filename);
  var data = JSON.parse(dataJSON);

  var publicKey = _nodeForge2.default.pki.publicKeyFromPem(data.rsaPublicKeyPem);
  var privateKey = _nodeForge2.default.pki.privateKeyFromPem(data.rsaPrivateKeyPem);
  var publicKeyPem = data.rsaPublicKeyPemStripped;
  delete data.rsaPublicKeyPem;
  delete data.rsaPrivateKeyPem;
  delete data.rsaPublicKeyPemStripped;

  return _extends({}, data, {
    rsaKeyPair: {
      publicKey: publicKey,
      privateKey: privateKey,
      publicKeyPem: publicKeyPem
    }
  });
};

var importNetflixKey = function importNetflixKey() {
  debug('importing netflix public key');

  var netflixPublicKeyBin = _nodeForge2.default.util.decode64(netflixPublicKey64);
  var netflixPublicKeyASN1 = _nodeForge2.default.asn1.fromDer(netflixPublicKeyBin);
  var netflixPublicKey = _nodeForge2.default.pki.publicKeyFromAsn1(netflixPublicKeyASN1);

  return netflixPublicKey;
};

var forgePromisegenerateKeyPair = function forgePromisegenerateKeyPair(options) {
  return new Promise(function (resolve, reject) {
    _nodeForge2.default.pki.rsa.generateKeyPair(options, function (err, rsaKeyPair) {
      if (err) {
        return reject(err);
      }

      return resolve(rsaKeyPair);
    });
  });
};

var generateRSAKeyPair = function generateRSAKeyPair() {
  debug('generating RSA key pair');

  var options = {
    bits: 2048,
    e: 65537
  };

  return forgePromisegenerateKeyPair(options).then(function (rsaKeyPair) {
    var publicKeyPem = _nodeForge2.default.pki.publicKeyToPem(rsaKeyPair.publicKey);
    publicKeyPem = publicKeyPem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/\r\n/g, '');

    return _extends({}, rsaKeyPair, {
      publicKeyPem: publicKeyPem
    });
  });
};

var sendFirstManifest = function sendFirstManifest(requestOptions, cryptoKeys) {
  debug('sending first manifest');

  // FIXME: We are hardcoding this at the moment, where should this come from?
  var messageId = 6926246924684790;
  var sequenceNumber = 1;

  var headerdata = {
    messageid: messageId,
    renewable: true,
    capabilities: {
      compressionalgos: ['GZIP'],
      languages: []
    },
    keyrequestdata: [{
      scheme: 'ASYMMETRIC_WRAPPED',
      keydata: {
        keypairid: 'rsaKeypairId',
        mechanism: 'JWK_RSA',
        publickey: cryptoKeys.rsaKeyPair.publicKeyPem
      }
    }]
  };

  var headerdataJSON = JSON.stringify(headerdata);
  var headerdata64 = _nodeForge2.default.util.encode64(headerdataJSON);

  var payload = {
    sequencenumber: sequenceNumber,
    messageid: messageId,
    endofmsg: true,
    compressionalgo: 'GZIP',
    data: ''
  };
  var payloadJSON = JSON.stringify(payload);
  var payload64 = _nodeForge2.default.util.encode64(payloadJSON);

  var firstBody = {
    entityauthdata: {
      scheme: 'NONE',
      authdata: {
        identity: cryptoKeys.authData.esn
      }
    },
    headerdata: headerdata64,
    signature: ''
  };
  var firstBodyJSON = JSON.stringify(firstBody);

  var secondBody = {
    payload: payload64,
    signature: ''
  };
  var secondBodyJSON = JSON.stringify(secondBody);

  var bodyJSON = firstBodyJSON + secondBodyJSON;

  var options = _extends({}, requestOptions, {
    body: bodyJSON
  });

  return (0, _requestPromise2.default)(options);
};

var verifyManifestCommon = function verifyManifestCommon(response) {
  debug('verify manifest common');

  if (response.errordata) {
    var errorJSON = _nodeForge2.default.util.decode64(response.errordata);
    var error = JSON.parse(errorJSON);

    throw new Error('Error: ' + _purdy2.default.stringify(error));
  }

  if (response.errormsg) {
    throw new Error('Error: ' + response.errormsg);
  }
};

var verifyFirstManifest = function verifyFirstManifest(response, cryptoKeys) {
  debug('verify first manifest');

  verifyManifestCommon(response);

  var messageText = _nodeForge2.default.util.decode64(response.headerdata);
  var signature = _nodeForge2.default.util.decode64(response.signature);

  var messageDigest = _nodeForge2.default.md.sha256.create();
  messageDigest.update(messageText, 'binary');

  var digest = messageDigest.digest().bytes();

  var validSignature = cryptoKeys.netflixPublicKey.verify(digest, signature, 'RSASSA-PKCS1-V1_5');

  if (!validSignature) {
    throw new Error('Couldn\'t verify Netflix Signature');
  }
};

var processFirstManifestResponse = function processFirstManifestResponse(response, cryptoKeys) {
  debug('processing first manifest response');

  var headerdataJSON = _nodeForge2.default.util.decode64(response.headerdata);
  var headerdata = JSON.parse(headerdataJSON);

  var keydata = headerdata.keyresponsedata.keydata;

  var encryptionKey = unwrapKey(keydata.encryptionkey, cryptoKeys);
  var hmacKey = unwrapKey(keydata.hmackey, cryptoKeys);
  encryptionKey.key64 = _nodeForge2.default.util.encode64(encryptionKey.key);
  delete encryptionKey.key;
  hmacKey.key64 = _nodeForge2.default.util.encode64(hmacKey.key);
  delete hmacKey.key;

  // TODO: Verify the mastertoken signature
  var mastertokenJSON = _nodeForge2.default.util.decode64(headerdata.keyresponsedata.mastertoken.tokendata);
  var mastertoken = JSON.parse(mastertokenJSON);

  return {
    mastertoken64: headerdata.keyresponsedata.mastertoken,
    mastertoken: mastertoken,
    keydata: keydata,
    keys: {
      browser: {
        encryptionKey: encryptionKey,
        hmacKey: hmacKey
      }
    }
  };
};

var sendSecondManifest = function sendSecondManifest(requestOptions, cryptoKeys) {
  debug('sending second manifest');

  // FIXME: Set messageid
  var messageId = 6926246924684792;

  var firstCleartext = {
    sender: cryptoKeys.authData.esn,
    messageid: messageId,
    renewable: true,
    capabilities: {
      compressionalgos: ['GZIP'],
      languages: []
    },
    keyrequestdata: [{
      scheme: 'ASYMMETRIC_WRAPPED',
      keydata: {
        keypairid: 'rsaKeypairId',
        mechanism: 'JWK_RSA',
        publickey: cryptoKeys.rsaKeyPair.publicKeyPem
      }
    }],
    userauthdata: {
      scheme: 'NETFLIXID',
      authdata: {}
    }
  };

  var firstCleartextJSON = JSON.stringify(firstCleartext);
  var firstEncrypted = encrypt(firstCleartextJSON, cryptoKeys.keys.browser);

  var keyId = cryptoKeys.authData.esn + '_' + cryptoKeys.mastertoken.sequencenumber;

  var headerdata = {
    keyid: keyId,
    iv: firstEncrypted.iv64,
    ciphertext: firstEncrypted.ciphertext64,
    sha256: 'AA==' // FIXME Where does this come from?
  };
  var headerdataJSON = JSON.stringify(headerdata);
  var headerdata64 = _nodeForge2.default.util.encode64(headerdataJSON);
  var signature64 = sign(headerdataJSON, cryptoKeys.keys.browser);

  var firstBody = {
    mastertoken: cryptoKeys.mastertoken64,
    headerdata: headerdata64,
    signature: signature64
  };
  var firstBodyJSON = JSON.stringify(firstBody);

  // const uiPlayContext = {
  //   row: -97,
  //   rank: -97,
  //   location: 'WATCHNOW',
  //   request_id: '2f4d7448-a81f-46a3-b90e-77150ea9e3ec',
  // };
  // const uiPlayContextJSON = JSON.stringify(uiPlayContext);

  var subData = {
    method: 'manifest',
    lookupType: 'PREPARE',
    viewableIds: [80018191],
    profiles: ['playready-h264mpl30-dash', 'playready-h264mpl31-dash', 'heaac-2-dash', 'heaac-2-dash-enc', 'dfxp-ls-sdh', 'simplesdh', 'nflx-cmisc', 'dfxp-ls-sdh-enc', 'simplesdh-enc', 'nflx-cmisc-enc', 'BIF240', 'BIF320'],
    drmSystem: 'widevine',
    appId: '146694622769522927',
    sessionParams: {
      pinCapableClient: 'false',
      uiplaycontext: null // uiPlayContextJSON,
    },
    sessionId: '14880682902052', // time_t * 10000
    trackId: 0,
    flavor: 'PRE_FETCH',
    secureUrls: true,
    supportPreviewContent: true,
    forceClearStreams: false,
    validatePinProtection: false,
    usePlayReadyHeaderObject: false,
    showAllSubDubTracks: false,
    languages: ['en-AU'],
    clientVersion: '4.0006.237.011',
    uiVersion: 'akira'
  };
  var subDataJSON = JSON.stringify(subData);

  var data = [{}, {
    headers: {},
    path: '/cbp/cadmium-13',
    payload: {
      data: subDataJSON
    },
    query: ''
  }];

  var dataJSON = JSON.stringify(data);
  var compressed64 = compress(dataJSON);

  // Body B
  var secondCleartext = {
    sequencenumber: 1,
    messageid: messageId,
    compressionalgo: 'GZIP',
    data: compressed64
  };

  var secondCleartextJSON = JSON.stringify(secondCleartext);
  var secondEncrypted = encrypt(secondCleartextJSON, cryptoKeys.keys.browser);

  var firstPayload = {
    keyid: keyId,
    iv: secondEncrypted.iv64,
    ciphertext: secondEncrypted.ciphertext64,
    sha256: 'AA==' // FIXME Where does this come from?
  };
  var firstPayloadJSON = JSON.stringify(firstPayload);
  var firstPayload64 = _nodeForge2.default.util.encode64(firstPayloadJSON);
  var secondSignature64 = sign(firstPayloadJSON, cryptoKeys.keys.browser);

  var secondBody = {
    payload: firstPayload64,
    signature: secondSignature64
  };
  var secondBodyJSON = JSON.stringify(secondBody);

  // Body C
  var thirdCleartext = {
    sequencenumber: 2,
    messageid: messageId,
    endofmsg: true,
    compressionalgo: 'GZIP',
    data: ''
  };

  var thirdEncryptedJSON = JSON.stringify(thirdCleartext);
  var thirdEncrypted = encrypt(thirdEncryptedJSON, cryptoKeys.keys.browser);

  var secondPayload = {
    keyid: keyId,
    iv: thirdEncrypted.iv64,
    ciphertext: thirdEncrypted.ciphertext64,
    sha256: 'AA==' // FIXME Where does this come from?
  };
  var secondPayloadJSON = JSON.stringify(secondPayload);
  var secondPayload64 = _nodeForge2.default.util.encode64(secondPayloadJSON);
  var thirdSignature64 = sign(secondPayloadJSON, cryptoKeys.keys.browser);

  var thirdBody = {
    payload: secondPayload64,
    signature: thirdSignature64
  };
  var thirdBodyJSON = JSON.stringify(thirdBody);

  var bodyJSON = firstBodyJSON + secondBodyJSON + thirdBodyJSON;

  var options = _extends({}, requestOptions, {
    body: bodyJSON
  });

  return (0, _requestPromise2.default)(options);
};

var verifySecondManifest = function verifySecondManifest(response, cryptoKeys) {
  debug('verify manifest second');

  verifyManifestCommon(response);

  var messageText = _nodeForge2.default.util.decode64(response.headerdata);
  var signature64 = response.signature;

  var validSignature = verify(messageText, signature64, cryptoKeys.keys.browser);

  if (!validSignature) {
    throw new Error('Couldn\'t verify Netflix Signature');
  }
};

var processSecondManifestResponse = function processSecondManifestResponse(response, cryptoKeys) {
  debug('processing manifest second');

  var headerdataJSON = _nodeForge2.default.util.decode64(response.headerdata);
  var headerdata = JSON.parse(headerdataJSON);

  var keyresponsedataJSON = decrypt(headerdata.ciphertext, headerdata.iv, cryptoKeys.keys.browser);
  var keyresponsedata = JSON.parse(keyresponsedataJSON);

  var useridtokenJSON = _nodeForge2.default.util.decode64(keyresponsedata.useridtoken.tokendata);
  var useridtoken = JSON.parse(useridtokenJSON);

  return {
    useridtoken64: keyresponsedata.useridtoken,
    useridtoken: useridtoken
  };
};

var fetchCryptoKeys = exports.fetchCryptoKeys = function fetchCryptoKeys(authData) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  debug('fetching crypto keys');

  var cryptoKeys = {};
  var cryptoDataFilename = options.cachePath + '/cryptoData.json';

  var requestOptions = {
    method: 'POST',
    uri: 'https://www.netflix.com/api/msl/NFCDCH-LX-/cadmium/manifest',
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3004.3 Safari/537.36'
    },
    jar: authData.cookieJar
  };

  debug(authData);

  cryptoKeys.netflixPublicKey = importNetflixKey();
  cryptoKeys.authData = authData;

  if (options.useCache && _fs2.default.existsSync(cryptoDataFilename)) {
    var cryptoData = loadFromCache(cryptoDataFilename);
    return _extends({}, cryptoKeys, cryptoData);
  }

  return generateRSAKeyPair().then(function (rsaKeyPair) {
    cryptoKeys.rsaKeyPair = rsaKeyPair;
    debug(cryptoKeys);
    return sendFirstManifest(requestOptions, cryptoKeys);
  }).then(function (responseJSON) {
    var response = JSON.parse(responseJSON);

    verifyFirstManifest(response, cryptoKeys);
    return processFirstManifestResponse(response, cryptoKeys);
  }).then(function (data) {
    cryptoKeys = _extends({}, cryptoKeys, data);

    return sendSecondManifest(requestOptions, cryptoKeys);
  }).then(function (responseJSON) {
    var myResponseJSON = responseJSON.replace(/^{/, '').replace(/}$/, '');
    var parts = myResponseJSON.split(/}{/);
    parts = parts.map(function (part) {
      return '{' + part + '}';
    });

    var header = JSON.parse(parts[0]);
    // FIXME why do we ignore the payload?
    // const payload = JSON.parse(parts[1]);

    verifySecondManifest(header, cryptoKeys);
    return processSecondManifestResponse(header, cryptoKeys);
  }).then(function (data) {
    cryptoKeys = _extends({}, cryptoKeys, data);

    if (options.useCache) {
      saveToCache(cryptoDataFilename, cryptoKeys);
    }

    return cryptoKeys;
  }).catch(function (error) {
    console.error(error.stack);
  });
};

exports.default = { fetchCryptoKeys: fetchCryptoKeys };

/***/ })
/******/ ]);
});
//# sourceMappingURL=crypto.js.map