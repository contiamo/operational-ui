'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _react = require('react');
var _react__default = _interopDefault(_react);

function unwrapExports$1 (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var sheet = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSheet = StyleSheet;



var _objectAssign2 = _interopRequireDefault(objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
- 'polyfills' on server side


// usage

import StyleSheet from 'glamor/lib/sheet'
let styleSheet = new StyleSheet()

styleSheet.inject()
- 'injects' the stylesheet into the page (or into memory if on server)

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents


*/

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }

  // this weirdness brought to you by firefox
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isBrowser = typeof window !== 'undefined';
var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
var isTest = process.env.NODE_ENV === 'test';

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.setAttribute('data-glamor', '');
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

function StyleSheet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$speedy = _ref.speedy,
      speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

  this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
  this.sheet = undefined;
  this.tags = [];
  this.maxLength = maxLength;
  this.ctr = 0;
}

(0, _objectAssign2.default)(StyleSheet.prototype, {
  getSheet: function getSheet() {
    return sheetForTag(last(this.tags));
  },
  inject: function inject() {
    var _this = this;

    if (this.injected) {
      throw new Error('already injected stylesheet!');
    }
    if (isBrowser) {
      this.tags[0] = makeStyleTag();
    } else {
      // server side 'polyfill'. just enough behavior to be useful.
      this.sheet = {
        cssRules: [],
        insertRule: function insertRule(rule) {
          // enough 'spec compliance' to be able to extract the rules later
          // in other words, just the cssText field
          _this.sheet.cssRules.push({ cssText: rule });
        }
      };
    }
    this.injected = true;
  },
  speedy: function speedy(bool) {
    if (this.ctr !== 0) {
      throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
    }
    this.isSpeedy = !!bool;
  },
  _insert: function _insert(rule) {
    // this weirdness for perf, and chrome's weird bug
    // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
    try {
      var sheet = this.getSheet();
      sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length);
    } catch (e) {
      if (isDev) {
        // might need beter dx for this
        console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
      }
    }
  },
  insert: function insert(rule) {

    if (isBrowser) {
      // this is the ultrafast version, works across browsers
      if (this.isSpeedy && this.getSheet().insertRule) {
        this._insert(rule);
      }
      // more browser weirdness. I don't even know
      // else if(this.tags.length > 0 && this.tags::last().styleSheet) {
      //   this.tags::last().styleSheet.cssText+= rule
      // }
      else {
          if (rule.indexOf('@import') !== -1) {
            var tag = last(this.tags);
            tag.insertBefore(document.createTextNode(rule), tag.firstChild);
          } else {
            last(this.tags).appendChild(document.createTextNode(rule));
          }
        }
    } else {
      // server side is pretty simple
      this.sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : this.sheet.cssRules.length);
    }

    this.ctr++;
    if (isBrowser && this.ctr % this.maxLength === 0) {
      this.tags.push(makeStyleTag());
    }
    return this.ctr - 1;
  },

  // commenting this out till we decide on v3's decision
  // _replace(index, rule) {
  //   // this weirdness for perf, and chrome's weird bug
  //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
  //   try {
  //     let sheet = this.getSheet()
  //     sheet.deleteRule(index) // todo - correct index here
  //     sheet.insertRule(rule, index)
  //   }
  //   catch(e) {
  //     if(isDev) {
  //       // might need beter dx for this
  //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
  //     }
  //   }

  // }
  // replace(index, rule) {
  //   if(isBrowser) {
  //     if(this.isSpeedy && this.getSheet().insertRule) {
  //       this._replace(index, rule)
  //     }
  //     else {
  //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1
  //       let _index = (index % this.maxLength) + 1
  //       let tag = this.tags[_slot]
  //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
  //     }
  //   }
  //   else {
  //     let rules = this.sheet.cssRules
  //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
  //   }
  // }
  delete: function _delete(index) {
    // we insert a blank rule when 'deleting' so previously returned indexes remain stable
    return this.replace(index, '');
  },
  flush: function flush() {
    if (isBrowser) {
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.sheet = null;
      this.ctr = 0;
      // todo - look for remnants in document.styleSheets
    } else {
      // simpler on server
      this.sheet.cssRules = [];
    }
    this.injected = false;
  },
  rules: function rules() {
    if (!isBrowser) {
      return this.sheet.cssRules;
    }
    var arr = [];
    this.tags.forEach(function (tag) {
      return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
    });
    return arr;
  }
});
});

unwrapExports$1(sheet);

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

var camelize_1 = camelize;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';



var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize_1(string.replace(msPattern, 'ms-'));
}

var camelizeStyleName_1 = camelizeStyleName;

var CSSProperty_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridColumn: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true

  /**
   * @param {string} prefix vendor-specific prefix, eg: Webkit
   * @param {string} key style name, eg: transitionDuration
   * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
   * WebkitTransitionDuration
   */
};function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

exports.default = CSSProperty;
});

unwrapExports$1(CSSProperty_1);

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1$1 = warning;

var dangerousStyleValue_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _CSSProperty2 = _interopRequireDefault(CSSProperty_1);



var _warning2 = _interopRequireDefault(warning_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule dangerousStyleValue
 */

var isUnitlessNumber = _CSSProperty2.default.isUnitlessNumber;
var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

exports.default = dangerousStyleValue;
});

unwrapExports$1(dangerousStyleValue_1);

'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

'use strict';



var msPattern$1 = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate_1(string).replace(msPattern$1, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 * @typechecks static-only
 */

'use strict';

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

var memoizeStringOnly_1 = memoizeStringOnly;

var CSSPropertyOperations = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processStyleName = undefined;
exports.createMarkupForStyles = createMarkupForStyles;



var _camelizeStyleName2 = _interopRequireDefault(camelizeStyleName_1);



var _dangerousStyleValue2 = _interopRequireDefault(dangerousStyleValue_1);



var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1);



var _memoizeStringOnly2 = _interopRequireDefault(memoizeStringOnly_1);



var _warning2 = _interopRequireDefault(warning_1$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processStyleName = exports.processStyleName = (0, _memoizeStringOnly2.default)(_hyphenateStyleName2.default); /**
                                                                                                                   * Copyright 2013-present, Facebook, Inc.
                                                                                                                   * All rights reserved.
                                                                                                                   *
                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                   *
                                                                                                                   * @providesModule CSSPropertyOperations
                                                                                                                   */

if (process.env.NODE_ENV !== 'production') {
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;

  var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported style property %s. Did you mean %s?%s', name, (0, _camelizeStyleName2.default)(name), checkRenderMessage(owner)) : void 0;
  };

  var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
  };

  var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
  };

  var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
  };

  var checkRenderMessage = function checkRenderMessage(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function warnValidStyle(name, value, component) {
    //eslint-disable-line no-var
    var owner = void 0;
    if (component) {
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner);
    }
  };
}

/**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */

function createMarkupForStyles(styles, component) {
  var serialized = '';
  for (var styleName in styles) {
    var isCustomProp = styleName.indexOf('--') === 0;
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    if (styleName === 'label') {
      continue;
    }
    var styleValue = styles[styleName];
    if (process.env.NODE_ENV !== 'production' && !isCustomProp) {
      warnValidStyle(styleName, styleValue, component);
    }
    if (styleValue != null) {
      if (isCustomProp) {
        serialized += styleName + ':' + styleValue + ';';
      } else {
        serialized += processStyleName(styleName) + ':';
        serialized += (0, _dangerousStyleValue2.default)(styleName, styleValue, component) + ';';
      }
    }
  }
  return serialized || null;
}
});

unwrapExports$1(CSSPropertyOperations);

var clean_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = clean;
// Returns true for null, false, undefined and {}
function isFalsy(value) {
  return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
}

function cleanObject(object) {
  if (isFalsy(object)) return null;
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

  var acc = {},
      keys = Object.keys(object),
      hasFalsy = false;
  for (var i = 0; i < keys.length; i++) {
    var value = object[keys[i]];
    var filteredValue = clean(value);
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true;
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue;
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
}

function cleanArray(rules) {
  var hasFalsy = false;
  var filtered = [];
  rules.forEach(function (rule) {
    var filteredRule = clean(rule);
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true;
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule);
    }
  });
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
}

// Takes style array or object provided by user and clears all the falsy data
// If there is no styles left after filtration returns null
function clean(input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
}
});

unwrapExports$1(clean_1);

var staticData = createCommonjsModule$1(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var w = ["Webkit"];
var m = ["Moz"];
var ms = ["ms"];
var wm = ["Webkit", "Moz"];
var wms = ["Webkit", "ms"];
var wmms = ["Webkit", "Moz", "ms"];

exports.default = {
  plugins: [],
  prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
};
module.exports = exports["default"];
});

unwrapExports$1(staticData);

var capitalizeString_1 = createCommonjsModule$1(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeString;
function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = exports["default"];
});

unwrapExports$1(capitalizeString_1);

var prefixProperty_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (prefixProperties.hasOwnProperty(property)) {
    var requiredPrefixes = prefixProperties[property];
    for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
      style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
    }
  }
}
module.exports = exports['default'];
});

unwrapExports$1(prefixProperty_1);

var prefixValue_1 = createCommonjsModule$1(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixValue;
function prefixValue(plugins, property, value, style, metaData) {
  for (var i = 0, len = plugins.length; i < len; ++i) {
    var processedValue = plugins[i](property, value, style, metaData

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    );if (processedValue) {
      return processedValue;
    }
  }
}
module.exports = exports["default"];
});

unwrapExports$1(prefixValue_1);

var cursor_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;
var prefixes = ['-webkit-', '-moz-', ''];

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(cursor_1);

var isPrefixedValue_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;

var regex = /-webkit-|-moz-|-ms-/;

function isPrefixedValue(value) {
  return typeof value === 'string' && regex.test(value);
}
module.exports = exports['default'];
});

unwrapExports$1(isPrefixedValue_1);

var crossFade_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = crossFade;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#search=cross-fade
var prefixes = ['-webkit-', ''];
function crossFade(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(crossFade_1);

var filter_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-filter-function
var prefixes = ['-webkit-', ''];
function filter(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/filter\(/g, prefix + 'filter(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(filter_1);

var flex_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
  'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value];
  }
}
module.exports = exports['default'];
});

unwrapExports$1(flex_1);

var flexboxOld_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;
var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical';
    } else {
      style.WebkitBoxOrient = 'horizontal';
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse';
    } else {
      style.WebkitBoxDirection = 'normal';
    }
  }
  if (alternativeProps.hasOwnProperty(property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value;
  }
}
module.exports = exports['default'];
});

unwrapExports$1(flexboxOld_1);

var gradient_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ['-webkit-', '-moz-', ''];

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(gradient_1);

var imageSet_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = imageSet;



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://caniuse.com/#feat=css-image-set
var prefixes = ['-webkit-', ''];
function imageSet(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
    return prefixes.map(function (prefix) {
      return value.replace(/image-set\(/g, prefix + 'image-set(');
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(imageSet_1);

var position_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];
});

unwrapExports$1(position_1);

var sizing_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;
var prefixes = ['-webkit-', '-moz-', ''];

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
    return prefixes.map(function (prefix) {
      return prefix + value;
    });
  }
}
module.exports = exports['default'];
});

unwrapExports$1(sizing_1);

'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern$2 = /^ms-/;
var cache = {};

function hyphenateStyleName$1(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern$2, '-ms-');
}

var hyphenateStyleName_1$2 = hyphenateStyleName$1;

var hyphenateProperty_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;



var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

unwrapExports$1(hyphenateProperty_1);

var transition_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);



var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);



var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true
};


var prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
};

function prefixValue(value, propertyPrefixMap) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  for (var i = 0, len = multipleValues.length; i < len; ++i) {
    var singleValue = multipleValues[i];
    var values = [singleValue];
    for (var property in propertyPrefixMap) {
      var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        var prefixes = propertyPrefixMap[property];
        for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
        }
      }
    }

    multipleValues[i] = values.join(',');
  }

  return multipleValues.join(',');
}

function transition(property, value, style, propertyPrefixMap) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    var outputValue = prefixValue(value, propertyPrefixMap
    // if the property is already prefixed
    );var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-moz-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput;
    }

    var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
      return !/-webkit-|-ms-/.test(val);
    }).join(',');

    if (property.indexOf('Moz') > -1) {
      return mozOutput;
    }

    style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
    style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
    return outputValue;
  }
}
module.exports = exports['default'];
});

unwrapExports$1(transition_1);

var prefixer_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixer;



var _staticData2 = _interopRequireDefault(staticData);



var _prefixProperty2 = _interopRequireDefault(prefixProperty_1);



var _prefixValue2 = _interopRequireDefault(prefixValue_1);



var _cursor2 = _interopRequireDefault(cursor_1);



var _crossFade2 = _interopRequireDefault(crossFade_1);



var _filter2 = _interopRequireDefault(filter_1);



var _flex2 = _interopRequireDefault(flex_1);



var _flexboxOld2 = _interopRequireDefault(flexboxOld_1);



var _gradient2 = _interopRequireDefault(gradient_1);



var _imageSet2 = _interopRequireDefault(imageSet_1);



var _position2 = _interopRequireDefault(position_1);



var _sizing2 = _interopRequireDefault(sizing_1);



var _transition2 = _interopRequireDefault(transition_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default]; // custom facade for inline-style-prefixer

var prefixMap = _staticData2.default.prefixMap;

function prefixer(style) {
  for (var property in style) {
    var value = style[property];

    var processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

    // only modify the value if it was touched
    // by any plugin to prevent unnecessary mutations
    if (processedValue) {
      style[property] = processedValue;
    }

    (0, _prefixProperty2.default)(prefixMap, property, style);
  }
  return style;
}
});

unwrapExports$1(prefixer_1);

var plugins = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.PluginSet = PluginSet;
exports.fallbacks = fallbacks;
exports.contentWrap = contentWrap;
exports.prefixes = prefixes;



var _objectAssign2 = _interopRequireDefault(objectAssign);





var _prefixer2 = _interopRequireDefault(prefixer_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = function (x) {
  return x === 'development' || !x;
}(process.env.NODE_ENV);

function PluginSet(initial) {
  this.fns = initial || [];
}

(0, _objectAssign2.default)(PluginSet.prototype, {
  add: function add() {
    var _this = this;

    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    fns.forEach(function (fn) {
      if (_this.fns.indexOf(fn) >= 0) {
        if (isDev) {
          console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
        }
      } else {
        _this.fns = [fn].concat(_this.fns);
      }
    });
  },
  remove: function remove(fn) {
    this.fns = this.fns.filter(function (x) {
      return x !== fn;
    });
  },
  clear: function clear() {
    this.fns = [];
  },
  transform: function transform(o) {
    return this.fns.reduce(function (o, fn) {
      return fn(o);
    }, o);
  }
});

function fallbacks(node) {
  var hasArray = Object.keys(node.style).map(function (x) {
    return Array.isArray(node.style[x]);
  }).indexOf(true) >= 0;
  if (hasArray) {
    var style = node.style;

    var flattened = Object.keys(style).reduce(function (o, key) {
      o[key] = Array.isArray(style[key]) ? style[key].join('; ' + (0, CSSPropertyOperations.processStyleName)(key) + ': ') : style[key];
      return o;
    }, {});
    // todo -
    // flatten arrays which haven't been flattened yet
    return (0, _objectAssign2.default)({}, node, { style: flattened });
  }
  return node;
}

var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit'];

function contentWrap(node) {
  if (node.style.content) {
    var cont = node.style.content;
    if (contentValues.indexOf(cont) >= 0) {
      return node;
    }
    if (/^(attr|calc|counters?|url)\(/.test(cont)) {
      return node;
    }
    if (cont.charAt(0) === cont.charAt(cont.length - 1) && (cont.charAt(0) === '"' || cont.charAt(0) === "'")) {
      return node;
    }
    return _extends({}, node, { style: _extends({}, node.style, { content: '"' + cont + '"' }) });
  }
  return node;
}

function prefixes(node) {
  return (0, _objectAssign2.default)({}, node, { style: (0, _prefixer2.default)(_extends({}, node.style)) });
}
});

unwrapExports$1(plugins);

var hash = createCommonjsModule$1(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doHash;
// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}
});

unwrapExports$1(hash);

var lib = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.merge = exports.$ = exports.style = exports.presets = exports.keyframes = exports.fontFace = exports.insertGlobal = exports.insertRule = exports.plugins = exports.styleSheet = undefined;
exports.speedy = speedy;
exports.simulations = simulations;
exports.simulate = simulate;
exports.cssLabels = cssLabels;
exports.isLikeRule = isLikeRule;
exports.idFor = idFor;
exports.css = css;
exports.rehydrate = rehydrate;
exports.flush = flush;
exports.select = select;
exports.parent = parent;
exports.media = media;
exports.pseudo = pseudo;
exports.active = active;
exports.any = any;
exports.checked = checked;
exports.disabled = disabled;
exports.empty = empty;
exports.enabled = enabled;
exports._default = _default;
exports.first = first;
exports.firstChild = firstChild;
exports.firstOfType = firstOfType;
exports.fullscreen = fullscreen;
exports.focus = focus;
exports.hover = hover;
exports.indeterminate = indeterminate;
exports.inRange = inRange;
exports.invalid = invalid;
exports.lastChild = lastChild;
exports.lastOfType = lastOfType;
exports.left = left;
exports.link = link;
exports.onlyChild = onlyChild;
exports.onlyOfType = onlyOfType;
exports.optional = optional;
exports.outOfRange = outOfRange;
exports.readOnly = readOnly;
exports.readWrite = readWrite;
exports.required = required;
exports.right = right;
exports.root = root;
exports.scope = scope;
exports.target = target;
exports.valid = valid;
exports.visited = visited;
exports.dir = dir;
exports.lang = lang;
exports.not = not;
exports.nthChild = nthChild;
exports.nthLastChild = nthLastChild;
exports.nthLastOfType = nthLastOfType;
exports.nthOfType = nthOfType;
exports.after = after;
exports.before = before;
exports.firstLetter = firstLetter;
exports.firstLine = firstLine;
exports.selection = selection;
exports.backdrop = backdrop;
exports.placeholder = placeholder;
exports.cssFor = cssFor;
exports.attribsFor = attribsFor;



var _objectAssign2 = _interopRequireDefault(objectAssign);







var _clean2 = _interopRequireDefault(clean_1);





var _hash2 = _interopRequireDefault(hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* stylesheet */


var styleSheet = exports.styleSheet = new sheet.StyleSheet();
// an isomorphic StyleSheet shim. hides all the nitty gritty.

// /**************** LIFTOFF IN 3... 2... 1... ****************/
styleSheet.inject(); //eslint-disable-line indent
// /****************      TO THE MOOOOOOON     ****************/

// convenience function to toggle speedy
function speedy(bool) {
  return styleSheet.speedy(bool);
}

// plugins
// we include these by default
var plugins$$1 = exports.plugins = styleSheet.plugins = new plugins.PluginSet([plugins.prefixes, plugins.contentWrap, plugins.fallbacks]);
plugins$$1.media = new plugins.PluginSet(); // neat! media, font-face, keyframes
plugins$$1.fontFace = new plugins.PluginSet();
plugins$$1.keyframes = new plugins.PluginSet([plugins.prefixes, plugins.fallbacks]);

// define some constants

var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
var isTest = process.env.NODE_ENV === 'test';
var isBrowser = typeof window !== 'undefined';

/**** simulations  ****/

// a flag to enable simulation meta tags on dom nodes
// defaults to true in dev mode. recommend *not* to
// toggle often.
var canSimulate = isDev;

// we use these flags for issuing warnings when simulate is called
// in prod / in incorrect order
var warned1 = false,
    warned2 = false;

// toggles simulation activity. shouldn't be needed in most cases
function simulations() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  canSimulate = !!bool;
}

// use this on dom nodes to 'simulate' pseudoclasses
// <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
// you can even send in some weird ones, as long as it's in simple format
// and matches an existing rule on the element
// eg simulate('nthChild2', ':hover:active') etc
function simulate() {
  for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
    pseudos[_key] = arguments[_key];
  }

  pseudos = (0, _clean2.default)(pseudos);
  if (!pseudos) return {};
  if (!canSimulate) {
    if (!warned1) {
      console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
      warned1 = true;
    }
    if (!isDev && !isTest && !warned2) {
      console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
      warned2 = true;
    }
    return {};
  }
  return pseudos.reduce(function (o, p) {
    return o['data-simulate-' + simple(p)] = '', o;
  }, {});
}

/**** labels ****/
// toggle for debug labels.
// *shouldn't* have to mess with this manually
var hasLabels = isDev;

function cssLabels(bool) {
  hasLabels = !!bool;
}

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple(str) {
  var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return str.toLowerCase().replace(/[^a-z0-9]/g, char);
}

// hashes a string to something 'unique'
// we use this to generate ids for styles


function hashify(obj) {
  var str = JSON.stringify(obj);
  var toRet = (0, _hash2.default)(str).toString(36);
  if (obj.label && obj.label.length > 0 && isDev) {
    return simple(obj.label.join('.'), '-') + '-' + toRet;
  }
  return toRet;
}

// of shape { 'data-css-<id>': '' }
function isLikeRule(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) {
    return false;
  }
  return !!/data\-css\-([a-zA-Z0-9\-_]+)/.exec(keys[0]);
}

// extracts id from a { 'data-css-<id>': ''} like object
function idFor(rule) {
  var keys = Object.keys(rule).filter(function (x) {
    return x !== 'toString';
  });
  if (keys.length !== 1) throw new Error('not a rule');
  var regex = /data\-css\-([a-zA-Z0-9\-_]+)/;
  var match = regex.exec(keys[0]);
  if (!match) throw new Error('not a rule');
  return match[1];
}

// from https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61

// "Tokenizes" the selectors into parts relevant for the next function.
// Strings and comments are matched, but ignored afterwards.
// This is not a full tokenizers. It only recognizes comas, parentheses,
// strings and comments.
// regexp generated by scripts/regexps.js then trimmed by hand
var selectorTokenizer = /[(),]|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\//g;

/**
 * This will split a coma-separated selector list into individual selectors,
 * ignoring comas in strings, comments and in :pseudo-selectors(parameter, lists).
 *
 * @param {string} selector
 * @return {string[]}
 */

function splitSelector(selector) {
  if (selector.indexOf(',') === -1) {
    return [selector];
  }

  var indices = [],
      res = [],
      inParen = 0,
      o;
  /*eslint-disable no-cond-assign*/
  while (o = selectorTokenizer.exec(selector)) {
    /*eslint-enable no-cond-assign*/
    switch (o[0]) {
      case '(':
        inParen++;break;
      case ')':
        inParen--;break;
      case ',':
        if (inParen) break;indices.push(o.index);
    }
  }
  for (o = indices.length; o--;) {
    res.unshift(selector.slice(indices[o] + 1));
    selector = selector.slice(0, indices[o]);
  }
  res.unshift(selector);
  return res;
}

function selector(id, path) {
  if (!id) {
    return path.replace(/\&/g, '');
  }
  if (!path) return '.css-' + id + ',[data-css-' + id + ']';

  var x = splitSelector(path).map(function (x) {
    return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
    : '.css-' + id + x + ',[data-css-' + id + ']' + x;
  }).join(',');

  if (canSimulate && /^\&\:/.exec(path) && !/\s/.exec(path)) {
    x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
  }
  return x;
}

// end https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61


function toCSS(_ref) {
  var selector = _ref.selector,
      style = _ref.style;

  var result = plugins$$1.transform({ selector: selector, style: style });
  return result.selector + '{' + (0, CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
}

function deconstruct(style) {
  // we can be sure it's not infinitely nested here
  var plain = void 0,
      selects = void 0,
      medias = void 0,
      supports = void 0;
  Object.keys(style).forEach(function (key) {
    if (key.indexOf('&') >= 0) {
      selects = selects || {};
      selects[key] = style[key];
    } else if (key.indexOf('@media') === 0) {
      medias = medias || {};
      medias[key] = deconstruct(style[key]);
    } else if (key.indexOf('@supports') === 0) {
      supports = supports || {};
      supports[key] = deconstruct(style[key]);
    } else if (key === 'label') {
      if (style.label.length > 0) {
        plain = plain || {};
        plain.label = hasLabels ? style.label.join('.') : '';
      }
    } else {
      plain = plain || {};
      plain[key] = style[key];
    }
  });
  return { plain: plain, selects: selects, medias: medias, supports: supports };
}

function deconstructedStyleToCSS(id, style) {
  var css = [];

  // plugins here
  var plain = style.plain,
      selects = style.selects,
      medias = style.medias,
      supports = style.supports;

  if (plain) {
    css.push(toCSS({ style: plain, selector: selector(id) }));
  }
  if (selects) {
    Object.keys(selects).forEach(function (key) {
      return css.push(toCSS({ style: selects[key], selector: selector(id, key) }));
    });
  }
  if (medias) {
    Object.keys(medias).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, medias[key]).join('') + '}');
    });
  }
  if (supports) {
    Object.keys(supports).forEach(function (key) {
      return css.push(key + '{' + deconstructedStyleToCSS(id, supports[key]).join('') + '}');
    });
  }
  return css;
}

// this cache to track which rules have
// been inserted into the stylesheet
var inserted = styleSheet.inserted = {};

// and helpers to insert rules into said styleSheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true;
    var deconstructed = deconstruct(spec.style);
    var rules = deconstructedStyleToCSS(spec.id, deconstructed);
    inserted[spec.id] = isBrowser ? true : rules;
    rules.forEach(function (cssRule) {
      return styleSheet.insert(cssRule);
    });
  }
}

// a simple cache to store generated rules
var registered = styleSheet.registered = {};
function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec;
  }
}

function _getRegistered(rule) {
  if (isLikeRule(rule)) {
    var ret = registered[idFor(rule)];
    if (ret == null) {
      throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
    }
    return ret;
  }
  return rule;
}

// todo - perf
var ruleCache = {};
function toRule(spec) {
  register(spec);
  insert(spec);

  if (ruleCache[spec.id]) {
    return ruleCache[spec.id];
  }

  var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
  Object.defineProperty(ret, 'toString', {
    enumerable: false, value: function value() {
      return 'css-' + spec.id;
    }
  });
  ruleCache[spec.id] = ret;
  return ret;
}

function isSelector(key) {
  var possibles = [':', '.', '[', '>', ' '],
      found = false,
      ch = key.charAt(0);
  for (var i = 0; i < possibles.length; i++) {
    if (ch === possibles[i]) {
      found = true;
      break;
    }
  }
  return found || key.indexOf('&') >= 0;
}

function joinSelectors(a, b) {
  var as = splitSelector(a).map(function (a) {
    return !(a.indexOf('&') >= 0) ? '&' + a : a;
  });
  var bs = splitSelector(b).map(function (b) {
    return !(b.indexOf('&') >= 0) ? '&' + b : b;
  });

  return bs.reduce(function (arr, b) {
    return arr.concat(as.map(function (a) {
      return b.replace(/\&/g, a);
    }));
  }, []).join(',');
}

function joinMediaQueries(a, b) {
  return a ? '@media ' + a.substring(6) + ' and ' + b.substring(6) : b;
}

function isMediaQuery(key) {
  return key.indexOf('@media') === 0;
}

function isSupports(key) {
  return key.indexOf('@supports') === 0;
}

function joinSupports(a, b) {
  return a ? '@supports ' + a.substring(9) + ' and ' + b.substring(9) : b;
}

// flatten a nested array
function flatten(inArr) {
  var arr = [];
  for (var i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
  }
  return arr;
}

var prefixedPseudoSelectors = {
  '::placeholder': ['::-webkit-input-placeholder', '::-moz-placeholder', '::-ms-input-placeholder'],
  ':fullscreen': [':-webkit-full-screen', ':-moz-full-screen', ':-ms-fullscreen']

  // mutable! modifies dest.
};function build(dest, _ref2) {
  var _ref2$selector = _ref2.selector,
      selector = _ref2$selector === undefined ? '' : _ref2$selector,
      _ref2$mq = _ref2.mq,
      mq = _ref2$mq === undefined ? '' : _ref2$mq,
      _ref2$supp = _ref2.supp,
      supp = _ref2$supp === undefined ? '' : _ref2$supp,
      _ref2$src = _ref2.src,
      src = _ref2$src === undefined ? {} : _ref2$src;


  if (!Array.isArray(src)) {
    src = [src];
  }
  src = flatten(src);

  src.forEach(function (_src) {
    if (isLikeRule(_src)) {
      var reg = _getRegistered(_src);
      if (reg.type !== 'css') {
        throw new Error('cannot merge this rule');
      }
      _src = reg.style;
    }
    _src = (0, _clean2.default)(_src);
    if (_src && _src.composes) {
      build(dest, { selector: selector, mq: mq, supp: supp, src: _src.composes });
    }
    Object.keys(_src || {}).forEach(function (key) {
      if (isSelector(key)) {

        if (prefixedPseudoSelectors[key]) {
          prefixedPseudoSelectors[key].forEach(function (p) {
            return build(dest, { selector: joinSelectors(selector, p), mq: mq, supp: supp, src: _src[key] });
          });
        }

        build(dest, { selector: joinSelectors(selector, key), mq: mq, supp: supp, src: _src[key] });
      } else if (isMediaQuery(key)) {
        build(dest, { selector: selector, mq: joinMediaQueries(mq, key), supp: supp, src: _src[key] });
      } else if (isSupports(key)) {
        build(dest, { selector: selector, mq: mq, supp: joinSupports(supp, key), src: _src[key] });
      } else if (key === 'composes') {
        // ignore, we already dealth with it
      } else {
        var _dest = dest;
        if (supp) {
          _dest[supp] = _dest[supp] || {};
          _dest = _dest[supp];
        }
        if (mq) {
          _dest[mq] = _dest[mq] || {};
          _dest = _dest[mq];
        }
        if (selector) {
          _dest[selector] = _dest[selector] || {};
          _dest = _dest[selector];
        }

        if (key === 'label') {
          if (hasLabels) {
            dest.label = dest.label.concat(_src.label);
          }
        } else {
          _dest[key] = _src[key];
        }
      }
    });
  });
}

function _css(rules) {
  var style = { label: [] };
  build(style, { src: rules }); // mutative! but worth it.

  var spec = {
    id: hashify(style),
    style: style, label: hasLabels ? style.label.join('.') : '',
    type: 'css'
  };
  return toRule(spec);
}

var nullrule = {
  // 'data-css-nil': ''
};
Object.defineProperty(nullrule, 'toString', {
  enumerable: false, value: function value() {
    return 'css-nil';
  }
});

var inputCaches = typeof WeakMap !== 'undefined' ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()] : [nullrule];

var warnedWeakMapError = false;
function multiIndexCache(fn) {
  return function (args) {
    if (inputCaches[args.length]) {
      var coi = inputCaches[args.length];
      var ctr = 0;
      while (ctr < args.length - 1) {
        if (!coi.has(args[ctr])) {
          coi.set(args[ctr], new WeakMap());
        }
        coi = coi.get(args[ctr]);
        ctr++;
      }
      if (coi.has(args[args.length - 1])) {
        var ret = coi.get(args[ctr]);

        if (registered[ret.toString().substring(4)]) {
          // make sure it hasn't been flushed
          return ret;
        }
      }
    }
    var value = fn(args);
    if (inputCaches[args.length]) {
      var _ctr = 0,
          _coi = inputCaches[args.length];
      while (_ctr < args.length - 1) {
        _coi = _coi.get(args[_ctr]);
        _ctr++;
      }
      try {
        _coi.set(args[_ctr], value);
      } catch (err) {
        if (isDev && !warnedWeakMapError) {
          var _console;

          warnedWeakMapError = true;
          (_console = console).warn.apply(_console, ['failed setting the WeakMap cache for args:'].concat(_toConsumableArray(args))); // eslint-disable-line no-console
          console.warn('this should NOT happen, please file a bug on the github repo.'); // eslint-disable-line no-console
        }
      }
    }
    return value;
  };
}

var cachedCss = typeof WeakMap !== 'undefined' ? multiIndexCache(_css) : _css;

function css() {
  for (var _len2 = arguments.length, rules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rules[_key2] = arguments[_key2];
  }

  if (rules[0] && rules[0].length && rules[0].raw) {
    throw new Error('you forgot to include glamor/babel in your babel plugins.');
  }

  rules = (0, _clean2.default)(rules);
  if (!rules) {
    return nullrule;
  }

  return cachedCss(rules);
}

css.insert = function (css) {
  var spec = {
    id: hashify(css),
    css: css,
    type: 'raw'
  };
  register(spec);
  if (!inserted[spec.id]) {
    styleSheet.insert(spec.css);
    inserted[spec.id] = isBrowser ? true : [spec.css];
  }
};

var insertRule = exports.insertRule = css.insert;

css.global = function (selector, style) {
  style = (0, _clean2.default)(style);
  if (style) {
    return css.insert(toCSS({ selector: selector, style: style }));
  }
};

var insertGlobal = exports.insertGlobal = css.global;

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    var inner = Object.keys(spec.keyframes).map(function (kf) {
      var result = plugins$$1.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
      return result.name + '{' + (0, CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
    }).join('');

    var rules = ['-webkit-', '-moz-', '-o-', ''].map(function (prefix) {
      return '@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}';
    });
    rules.forEach(function (rule) {
      return styleSheet.insert(rule);
    });

    inserted[spec.id] = isBrowser ? true : rules;
  }
}
css.keyframes = function (name, kfs) {
  if (!kfs) {
    kfs = name, name = 'animation';
  }

  // do not ignore empty keyframe definitions for now.
  kfs = (0, _clean2.default)(kfs) || {};
  var spec = {
    id: hashify({ name: name, kfs: kfs }),
    type: 'keyframes',
    name: name,
    keyframes: kfs
  };
  register(spec);
  insertKeyframe(spec);
  return name + '_' + spec.id;
};

// we don't go all out for fonts as much, giving a simple font loading strategy
// use a fancier lib if you need moar power
css.fontFace = function (font) {
  font = (0, _clean2.default)(font);
  var spec = {
    id: hashify(font),
    type: 'font-face',
    font: font
  };
  register(spec);
  insertFontFace(spec);

  return font.fontFamily;
};

var fontFace = exports.fontFace = css.fontFace;
var keyframes = exports.keyframes = css.keyframes;

function insertFontFace(spec) {
  if (!inserted[spec.id]) {
    var rule = '@font-face{' + (0, CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}';
    styleSheet.insert(rule);
    inserted[spec.id] = isBrowser ? true : [rule];
  }
}

// rehydrate the insertion cache with ids sent from
// renderStatic / renderStaticOptimized
function rehydrate(ids) {
  // load up ids
  (0, _objectAssign2.default)(inserted, ids.reduce(function (o, i) {
    return o[i] = true, o;
  }, {}));
  // assume css loaded separately
}

// clears out the cache and empties the stylesheet
// best for tests, though there might be some value for SSR.

function flush() {
  inserted = styleSheet.inserted = {};
  registered = styleSheet.registered = {};
  ruleCache = {};
  styleSheet.flush();
  styleSheet.inject();
}

var presets = exports.presets = {
  mobile: '(min-width: 400px)',
  Mobile: '@media (min-width: 400px)',
  phablet: '(min-width: 550px)',
  Phablet: '@media (min-width: 550px)',
  tablet: '(min-width: 750px)',
  Tablet: '@media (min-width: 750px)',
  desktop: '(min-width: 1000px)',
  Desktop: '@media (min-width: 1000px)',
  hd: '(min-width: 1200px)',
  Hd: '@media (min-width: 1200px)'
};

var style = exports.style = css;

function select(selector) {
  for (var _len3 = arguments.length, styles = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    styles[_key3 - 1] = arguments[_key3];
  }

  if (!selector) {
    return style(styles);
  }
  return css(_defineProperty({}, selector, styles));
}
var $ = exports.$ = select;

function parent(selector) {
  for (var _len4 = arguments.length, styles = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    styles[_key4 - 1] = arguments[_key4];
  }

  return css(_defineProperty({}, selector + ' &', styles));
}

var merge = exports.merge = css;
var compose = exports.compose = css;

function media(query) {
  for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    rules[_key5 - 1] = arguments[_key5];
  }

  return css(_defineProperty({}, '@media ' + query, rules));
}

function pseudo(selector) {
  for (var _len6 = arguments.length, styles = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    styles[_key6 - 1] = arguments[_key6];
  }

  return css(_defineProperty({}, selector, styles));
}

// allllll the pseudoclasses

function active(x) {
  return pseudo(':active', x);
}

function any(x) {
  return pseudo(':any', x);
}

function checked(x) {
  return pseudo(':checked', x);
}

function disabled(x) {
  return pseudo(':disabled', x);
}

function empty(x) {
  return pseudo(':empty', x);
}

function enabled(x) {
  return pseudo(':enabled', x);
}

function _default(x) {
  return pseudo(':default', x); // note '_default' name
}

function first(x) {
  return pseudo(':first', x);
}

function firstChild(x) {
  return pseudo(':first-child', x);
}

function firstOfType(x) {
  return pseudo(':first-of-type', x);
}

function fullscreen(x) {
  return pseudo(':fullscreen', x);
}

function focus(x) {
  return pseudo(':focus', x);
}

function hover(x) {
  return pseudo(':hover', x);
}

function indeterminate(x) {
  return pseudo(':indeterminate', x);
}

function inRange(x) {
  return pseudo(':in-range', x);
}

function invalid(x) {
  return pseudo(':invalid', x);
}

function lastChild(x) {
  return pseudo(':last-child', x);
}

function lastOfType(x) {
  return pseudo(':last-of-type', x);
}

function left(x) {
  return pseudo(':left', x);
}

function link(x) {
  return pseudo(':link', x);
}

function onlyChild(x) {
  return pseudo(':only-child', x);
}

function onlyOfType(x) {
  return pseudo(':only-of-type', x);
}

function optional(x) {
  return pseudo(':optional', x);
}

function outOfRange(x) {
  return pseudo(':out-of-range', x);
}

function readOnly(x) {
  return pseudo(':read-only', x);
}

function readWrite(x) {
  return pseudo(':read-write', x);
}

function required(x) {
  return pseudo(':required', x);
}

function right(x) {
  return pseudo(':right', x);
}

function root(x) {
  return pseudo(':root', x);
}

function scope(x) {
  return pseudo(':scope', x);
}

function target(x) {
  return pseudo(':target', x);
}

function valid(x) {
  return pseudo(':valid', x);
}

function visited(x) {
  return pseudo(':visited', x);
}

// parameterized pseudoclasses
function dir(p, x) {
  return pseudo(':dir(' + p + ')', x);
}
function lang(p, x) {
  return pseudo(':lang(' + p + ')', x);
}
function not(p, x) {
  // should this be a plugin?
  var selector = p.split(',').map(function (x) {
    return x.trim();
  }).map(function (x) {
    return ':not(' + x + ')';
  });
  if (selector.length === 1) {
    return pseudo(':not(' + p + ')', x);
  }
  return select(selector.join(''), x);
}
function nthChild(p, x) {
  return pseudo(':nth-child(' + p + ')', x);
}
function nthLastChild(p, x) {
  return pseudo(':nth-last-child(' + p + ')', x);
}
function nthLastOfType(p, x) {
  return pseudo(':nth-last-of-type(' + p + ')', x);
}
function nthOfType(p, x) {
  return pseudo(':nth-of-type(' + p + ')', x);
}

// pseudoelements
function after(x) {
  return pseudo('::after', x);
}
function before(x) {
  return pseudo('::before', x);
}
function firstLetter(x) {
  return pseudo('::first-letter', x);
}
function firstLine(x) {
  return pseudo('::first-line', x);
}
function selection(x) {
  return pseudo('::selection', x);
}
function backdrop(x) {
  return pseudo('::backdrop', x);
}
function placeholder(x) {
  // https://github.com/threepointone/glamor/issues/14
  return css({ '::placeholder': x });
}

/*** helpers for web components ***/
// https://github.com/threepointone/glamor/issues/16

function cssFor() {
  for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    rules[_key7] = arguments[_key7];
  }

  rules = (0, _clean2.default)(rules);
  return rules ? rules.map(function (r) {
    var style = { label: [] };
    build(style, { src: r }); // mutative! but worth it.
    return deconstructedStyleToCSS(hashify(style), deconstruct(style)).join('');
  }).join('') : '';
}

function attribsFor() {
  for (var _len8 = arguments.length, rules = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    rules[_key8] = arguments[_key8];
  }

  rules = (0, _clean2.default)(rules);
  var htmlAttributes = rules ? rules.map(function (rule) {
    idFor(rule); // throwaway check for rule
    var key = Object.keys(rule)[0],
        value = rule[key];
    return key + '="' + (value || '') + '"';
  }).join(' ') : '';

  return htmlAttributes;
}
});

unwrapExports$1(lib);
var lib_18 = lib.css;

var htmlTagNames = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "bgsound",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "command",
  "content",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "image",
  "img",
  "input",
  "ins",
  "isindex",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "listing",
  "main",
  "map",
  "mark",
  "marquee",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "multicol",
  "nav",
  "nextid",
  "nobr",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "plaintext",
  "pre",
  "progress",
  "q",
  "rb",
  "rbc",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "shadow",
  "slot",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "xmp"
];

var svgTagNames = [
  "a",
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "animation",
  "audio",
  "canvas",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "discard",
  "ellipse",
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
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "handler",
  "hatch",
  "hatchpath",
  "hkern",
  "iframe",
  "image",
  "line",
  "linearGradient",
  "listener",
  "marker",
  "mask",
  "mesh",
  "meshgradient",
  "meshpatch",
  "meshrow",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "prefetch",
  "radialGradient",
  "rect",
  "script",
  "set",
  "solidColor",
  "solidcolor",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "tbreak",
  "text",
  "textArea",
  "textPath",
  "title",
  "tref",
  "tspan",
  "unknown",
  "use",
  "video",
  "view",
  "vkern"
];

var domElements = htmlTagNames.concat(svgTagNames).filter(function (tag, index$$1, array) {
  return array.indexOf(tag) === index$$1;
});

var CHANNEL = '__glamorous__';

var PropTypes = void 0;

/* istanbul ignore next */
if (parseFloat(_react__default.version.slice(0, 4)) >= 15.5) {
  /* istanbul ignore next */
  try {
    PropTypes = require('prop-types');
    /* istanbul ignore next */
  } catch (error) {
    // ignore
  }
}
/* istanbul ignore next */
PropTypes = PropTypes || _react__default.PropTypes;



/*
eslint
  import/no-mutable-exports:0,
  import/prefer-default-export:0,
  react/no-deprecated:0
 */

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function generateWarningMessage(Comp) {
  var componentName = Comp.displayName || Comp.name || 'FunctionComponent';
  // eslint-disable-next-line max-len
  return 'glamorous warning: Expected component called "' + componentName + '" which uses withTheme to be within a ThemeProvider but none was found.';
}

function withTheme(ComponentToTheme) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$noWarn = _ref.noWarn,
      noWarn = _ref$noWarn === undefined ? false : _ref$noWarn,
      _ref$createElement = _ref.createElement,
      createElement = _ref$createElement === undefined ? true : _ref$createElement;

  var ThemedComponent = function (_Component) {
    inherits(ThemedComponent, _Component);

    function ThemedComponent() {
      var _ref2;

      var _temp, _this, _ret;

      classCallCheck(this, ThemedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = ThemedComponent.__proto__ || Object.getPrototypeOf(ThemedComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.warned = noWarn, _this.state = { theme: {} }, _this.setTheme = function (theme) {
        return _this.setState({ theme: theme });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(ThemedComponent, [{
      key: 'componentWillMount',


      // eslint-disable-next-line complexity
      value: function componentWillMount() {
        if (!this.context[CHANNEL]) {
          if (process.env.NODE_ENV !== 'production' && !this.warned) {
            this.warned = true;
            // eslint-disable-next-line no-console
            console.warn(generateWarningMessage(ComponentToTheme));
          }
        }
        var theme = this.props.theme;

        if (this.context[CHANNEL]) {
          // if a theme is provided via props,
          // it takes precedence over context
          this.setTheme(theme ? theme : this.context[CHANNEL].getState());
        } else {
          this.setTheme(theme || {});
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.theme !== nextProps.theme) {
          this.setTheme(nextProps.theme);
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.context[CHANNEL] && !this.props.theme) {
          // subscribe to future theme changes
          this.subscriptionId = this.context[CHANNEL].subscribe(this.setTheme);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // cleanup subscription
        this.subscriptionId && this.context[CHANNEL].unsubscribe(this.subscriptionId);
      }
    }, {
      key: 'render',
      value: function render() {
        if (createElement) {
          return _react__default.createElement(ComponentToTheme, _extends({}, this.props, this.state));
        } else {
          // this allows us to effectively use the GlamorousComponent
          // as our `render` method without going through lifecycle hooks.
          // Also allows us to forward the context in the scenario where
          // a user wants to add more context.
          // eslint-disable-next-line babel/new-cap
          return ComponentToTheme.call(this, _extends({}, this.props, this.state), this.context);
        }
      }
    }]);
    return ThemedComponent;
  }(_react.Component);

  ThemedComponent.propTypes = {
    theme: PropTypes.object
  };


  var defaultContextTypes = defineProperty({}, CHANNEL, PropTypes.object);

  var userDefinedContextTypes = null;

  // configure the contextTypes to be settable by the user,
  // however also retaining the glamorous channel.
  Object.defineProperty(ThemedComponent, 'contextTypes', {
    enumerable: true,
    configurable: true,
    set: function set$$1(value) {
      userDefinedContextTypes = value;
    },
    get: function get$$1() {
      // if the user has provided a contextTypes definition,
      // merge the default context types with the provided ones.
      if (userDefinedContextTypes) {
        return _extends({}, defaultContextTypes, userDefinedContextTypes);
      }
      return defaultContextTypes;
    }
  });

  return ThemedComponent;
}

var index$1 = isFunction;

var toString = Object.prototype.toString;

function isFunction (fn) {
  var string = toString.call(fn);
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
}

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var index$3 = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return index$3(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var index$2 = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

function createBroadcast (initialState) {
  var listeners = {};
  var id = 1;
  var _state = initialState;

  function getState () {
    return _state
  }

  function setState (state) {
    _state = state;
    var keys = Object.keys(listeners);
    var i = 0;
    var len = keys.length;
    for (; i < len; i++) {
      // if a listener gets unsubscribed during setState we just skip it
      if (listeners[keys[i]]) { listeners[keys[i]](state); }
    }
  }

  // subscribe to changes and return the subscriptionId
  function subscribe (listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener must be a function.')
    }
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    return currentId
  }

  // remove subscription by removing the listener function
  function unsubscribe (id) {
    listeners[id] = undefined;
  }

  return { getState: getState, setState: setState, subscribe: subscribe, unsubscribe: unsubscribe }
}

/**
 * This is a component which will provide a theme to the entire tree
 * via context and event listener
 * (because pure components block context updates)
 * inspired by the styled-components implementation
 * https://github.com/styled-components/styled-components
 * @param {Object} theme the theme object..
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ThemeProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call.apply(_ref, [this].concat(args))), _this), _this.broadcast = createBroadcast(_this.props.theme), _this.setOuterTheme = function (theme) {
      _this.outerTheme = theme;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ThemeProvider, [{
    key: 'getTheme',


    // create theme, by merging with outer theme, if present
    value: function getTheme(passedTheme) {
      var theme = passedTheme || this.props.theme;
      if (index$1(theme)) {
        var mergedTheme = theme(this.outerTheme);
        if (!index$2(mergedTheme)) {
          throw new Error('[ThemeProvider] Please return an object from your theme function, ' + 'i.e. theme={() => ({})}!');
        }
        return mergedTheme;
      }
      return _extends({}, this.outerTheme, theme);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return defineProperty({}, CHANNEL, this.broadcast);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // create a new subscription for keeping track of outer theme, if present
      if (this.context[CHANNEL]) {
        this.subscriptionId = this.context[CHANNEL].subscribe(this.setOuterTheme);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // set broadcast state by merging outer theme with own
      if (this.context[CHANNEL]) {
        this.setOuterTheme(this.context[CHANNEL].getState());
        this.broadcast.setState(this.getTheme());
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.broadcast.setState(this.getTheme(nextProps.theme));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.subscriptionId && this.context[CHANNEL].unsubscribe(this.subscriptionId);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children ? _react__default.Children.only(this.props.children) : null;
    }
  }]);
  return ThemeProvider;
}(_react.Component);

ThemeProvider.childContextTypes = defineProperty({}, CHANNEL, PropTypes.object.isRequired);

ThemeProvider.contextTypes = defineProperty({}, CHANNEL, PropTypes.object);

ThemeProvider.propTypes = {
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  children: PropTypes.node
};

/**
 * This function takes a className string and gets all the
 * associated glamor styles. It's used to merge glamor styles
 * from a className to make sure that specificity is not
 * a problem when passing a className to a component.
 * @param {String} [className=''] the className string
 * @return {Object} { glamorStyles, glamorlessClassName }
 *   - glamorStyles is an array of all the glamor styles objects
 *   - glamorlessClassName is the rest of the className string
 *     without the glamor classNames
 */
function extractGlamorStyles(className) {
  var glamorlessClassName = [];
  var glamorStyles = [];
  className.toString().split(' ').forEach(function (name) {
    if (name.indexOf('css-') === 0) {
      var style = buildGlamorSrcFromClassName(name);
      glamorStyles.push(style);
    } else {
      glamorlessClassName.push(name);
    }
  });

  return { glamorlessClassName: glamorlessClassName, glamorStyles: glamorStyles };
}

/** Glamor's css function returns an object with the shape
 *
 * {
 *   [`data-css-${hash}`]: '',
 *   toString() { return `css-${hash}` }
 * }
 *
 * Whenever glamor's build function encounters an object with
 * this shape it just pulls the resulting styles from the cache.
 *
 * note: the toString method is not needed to qualify the shape
**/
function buildGlamorSrcFromClassName(className) {
  return defineProperty({}, 'data-' + className, '');
}

function getGlamorClassName$1(_ref2) {
  var styles = _ref2.styles,
      props = _ref2.props,
      cssOverrides = _ref2.cssOverrides,
      cssProp = _ref2.cssProp,
      context = _ref2.context,
      displayName = _ref2.displayName;

  var _handleStyles = handleStyles([].concat(toConsumableArray(styles), [props.className, cssOverrides, cssProp]), props, context),
      mappedArgs = _handleStyles.mappedArgs,
      nonGlamorClassNames = _handleStyles.nonGlamorClassNames;
  // eslint-disable-next-line max-len


  var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  var devRules = isDev ? { label: displayName } : null;
  var glamorClassName = lib_18.apply(undefined, [devRules].concat(toConsumableArray(mappedArgs))).toString();
  var extras = nonGlamorClassNames.join(' ').trim();
  return (glamorClassName + ' ' + extras).trim();
}

// this next function is on a "hot" code-path
// so it's pretty complex to make sure it's fast.
// eslint-disable-next-line complexity
function handleStyles(styles, props, context) {
  var current = void 0;
  var mappedArgs = [];
  var nonGlamorClassNames = [];
  for (var i = 0; i < styles.length; i++) {
    current = styles[i];
    if (typeof current === 'function') {
      var result = current(props, context);
      if (typeof result === 'string') {
        var _extractGlamorStyles = extractGlamorStyles(result),
            glamorStyles = _extractGlamorStyles.glamorStyles,
            glamorlessClassName = _extractGlamorStyles.glamorlessClassName;

        mappedArgs.push.apply(mappedArgs, toConsumableArray(glamorStyles));
        nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(glamorlessClassName));
      } else {
        mappedArgs.push(result);
      }
    } else if (typeof current === 'string') {
      var _extractGlamorStyles2 = extractGlamorStyles(current),
          _glamorStyles = _extractGlamorStyles2.glamorStyles,
          _glamorlessClassName = _extractGlamorStyles2.glamorlessClassName;

      mappedArgs.push.apply(mappedArgs, toConsumableArray(_glamorStyles));
      nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(_glamorlessClassName));
    } else if (Array.isArray(current)) {
      var recursed = handleStyles(current, props, context);
      mappedArgs.push.apply(mappedArgs, toConsumableArray(recursed.mappedArgs));
      nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(recursed.nonGlamorClassNames));
    } else {
      mappedArgs.push(current);
    }
  }
  return { mappedArgs: mappedArgs, nonGlamorClassNames: nonGlamorClassNames };
}

/*
 * This is a relatively small abstraction that's ripe for open sourcing.
 * Documentation is in the README.md
 */
function createGlamorous$1(splitProps) {
  return glamorous;

  /**
  * This is the main export and the function that people
  * interact with most directly.
  *
  * It accepts a component which can be a string or
  * a React Component and returns
  * a "glamorousComponentFactory"
  * @param {String|ReactComponent} comp the component to render
  * @param {Object} options helpful info for the GlamorousComponents
  * @return {Function} the glamorousComponentFactory
  */
  function glamorous(comp) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootEl = config.rootEl,
        displayName = config.displayName,
        shouldClassNameUpdate = config.shouldClassNameUpdate,
        _config$filterProps = config.filterProps,
        filterProps = _config$filterProps === undefined ? [] : _config$filterProps,
        _config$forwardProps = config.forwardProps,
        forwardProps = _config$forwardProps === undefined ? [] : _config$forwardProps,
        _config$propsAreCssOv = config.propsAreCssOverrides,
        propsAreCssOverrides = _config$propsAreCssOv === undefined ? comp.propsAreCssOverrides : _config$propsAreCssOv,
        basePropsToApply = config.withProps;

    Object.assign(glamorousComponentFactory, { withConfig: withConfig });
    return glamorousComponentFactory;

    function withConfig(newConfig) {
      return glamorous(comp, _extends({}, config, newConfig));
    }

    /**
     * This returns a React Component that renders the comp (closure)
     * with a className based on the given glamor styles object(s)
     * @param {...Object|Function} styles the styles to create with glamor.
     *   If any of these are functions, they are invoked with the component
     *   props and the return value is used.
     * @return {ReactComponent} the ReactComponent function
     */
    function glamorousComponentFactory() {
      for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      /**
       * This is a component which will render the comp (closure)
       * with the glamorous styles (closure). Forwards any valid
       * props to the underlying component.
       */
      var GlamorousComponent = withTheme(function GlamorousInnerComponent(props, context) {
        props = getPropsToApply(GlamorousComponent.propsToApply, {}, props, context);
        var updateClassName = shouldUpdate(props, context, this.previous);

        if (shouldClassNameUpdate) {
          this.previous = { props: props, context: context };
        }

        var _splitProps = splitProps(props, GlamorousComponent),
            toForward = _splitProps.toForward,
            cssOverrides = _splitProps.cssOverrides,
            cssProp = _splitProps.cssProp;

        // create className to apply


        this.className = updateClassName ? getGlamorClassName$1({
          styles: GlamorousComponent.styles,
          props: props,
          cssOverrides: cssOverrides,
          cssProp: cssProp,
          context: context,
          displayName: GlamorousComponent.displayName
        }) : this.className;

        return _react__default.createElement(GlamorousComponent.comp, _extends({
          ref: props.innerRef
        }, toForward, {
          className: this.className
        }));
      }, { noWarn: true, createElement: false });

      GlamorousComponent.propTypes = {
        className: PropTypes.string,
        cssOverrides: PropTypes.object,
        innerRef: PropTypes.func,
        glam: PropTypes.object
      };

      function withComponent(newComp) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var fwp = GlamorousComponent.forwardProps,
            flp = GlamorousComponent.filterProps,
            componentProperties = objectWithoutProperties(GlamorousComponent, ['forwardProps', 'filterProps']);

        return glamorous(_extends({}, componentProperties, {
          comp: newComp
        }), _extends({
          // allows the forwardProps and filterProps to be overridden
          forwardProps: fwp,
          filterProps: flp
        }, options))();
      }

      function withProps() {
        for (var _len2 = arguments.length, propsToApply = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          propsToApply[_key2] = arguments[_key2];
        }

        return glamorous(GlamorousComponent, { withProps: propsToApply })();
      }

      function shouldUpdate(props, context, previous) {
        // exiting early so components which do not use this
        // optimization are not penalized by hanging onto
        // references to previous props and context
        if (!shouldClassNameUpdate) {
          return true;
        }
        var update = true;
        if (previous) {
          if (!shouldClassNameUpdate(previous.props, props, previous.context, context)) {
            update = false;
          }
        }

        return update;
      }

      Object.assign(GlamorousComponent, getGlamorousComponentMetadata({
        comp: comp,
        styles: styles,
        rootEl: rootEl,
        filterProps: filterProps,
        forwardProps: forwardProps,
        displayName: displayName,
        propsToApply: basePropsToApply
      }), {
        isGlamorousComponent: true,
        propsAreCssOverrides: propsAreCssOverrides,
        withComponent: withComponent,
        withProps: withProps,
        withConfig: withConfig
      });
      return GlamorousComponent;
    }
  }

  function getGlamorousComponentMetadata(_ref) {
    var comp = _ref.comp,
        styles = _ref.styles,
        rootEl = _ref.rootEl,
        filterProps = _ref.filterProps,
        forwardProps = _ref.forwardProps,
        displayName = _ref.displayName,
        basePropsToApply = _ref.propsToApply;

    var componentsComp = comp.comp ? comp.comp : comp;
    var propsToApply = comp.propsToApply ? [].concat(toConsumableArray(comp.propsToApply), toConsumableArray(arrayify(basePropsToApply))) : arrayify(basePropsToApply);
    return {
      // join styles together (for anyone doing: glamorous(glamorous.a({}), {}))
      styles: when(comp.styles, styles),
      // keep track of the ultimate rootEl to render (we never
      // actually render anything but
      // the base component, even when people wrap a glamorous
      // component in glamorous
      comp: componentsComp,
      rootEl: rootEl || componentsComp,
      // join forwardProps and filterProps
      // (for anyone doing: glamorous(glamorous.a({}), {}))
      forwardProps: when(comp.forwardProps, forwardProps),
      filterProps: when(comp.filterProps, filterProps),
      // set the displayName to something that's slightly more
      // helpful than `GlamorousComponent` :)
      displayName: displayName || 'glamorous(' + getDisplayName(comp) + ')',
      // these are props that should be applied to the component at render time
      propsToApply: propsToApply
    };
  }
}

/**
 * reduces the propsToApply given to a single props object
 * @param {Array} propsToApply an array of propsToApply objects:
 *   - object
 *   - array of propsToApply items
 *   - function that accepts the accumulated props and the context
 * @param {Object} accumulator an object to apply props onto
 * @param {Object} props the props that should ultimately take precedence
 * @param {*} context the context object
 * @return {Object} the reduced props
 */
function getPropsToApply(propsToApply, accumulator, props, context) {
  // using forEach rather than reduce here because the reduce solution
  // effectively did the same thing because we manipulate the `accumulator`
  propsToApply.forEach(function (propsToApplyItem) {
    if (typeof propsToApplyItem === 'function') {
      return Object.assign(accumulator, propsToApplyItem(Object.assign({}, accumulator, props), context));
    } else if (Array.isArray(propsToApplyItem)) {
      return Object.assign(accumulator, getPropsToApply(propsToApplyItem, accumulator, props, context));
    }
    return Object.assign(accumulator, propsToApplyItem);
  });
  // props wins
  return Object.assign(accumulator, props);
}

function arrayify() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return Array.isArray(x) ? x : [x];
}

function when(comp, prop) {
  return comp ? comp.concat(prop) : prop;
}

function getDisplayName(comp) {
  return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}

//
// Main
//

function memoize (fn, options) {
  var cache = options && options.cache
    ? options.cache
    : cacheDefault;

  var serializer = options && options.serializer
    ? options.serializer
    : serializerDefault;

  var strategy = options && options.strategy
    ? options.strategy
    : strategyDefault;

  return strategy(fn, {
    cache: cache,
    serializer: serializer
  })
}

//
// Strategy
//

function isPrimitive (value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object')
}

function monadic (fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);

  if (!cache.has(cacheKey)) {
    var computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
    return computedValue
  }

  return cache.get(cacheKey)
}

function variadic (fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);

  if (!cache.has(cacheKey)) {
    var computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
    return computedValue
  }

  return cache.get(cacheKey)
}

function assemble (fn, context, strategy, cache, serialize) {
  return strategy.bind(
    context,
    fn,
    cache,
    serialize
  )
}

function strategyDefault (fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyVariadic (fn, options) {
  var strategy = variadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

function strategyMonadic (fn, options) {
  var strategy = monadic;

  return assemble(
    fn,
    this,
    strategy,
    options.cache.create(),
    options.serializer
  )
}

//
// Serializer
//

function serializerDefault () {
  return JSON.stringify(arguments)
}

//
// Cache
//

function ObjectWithoutPrototypeCache () {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function (key) {
  return (key in this.cache)
};

ObjectWithoutPrototypeCache.prototype.get = function (key) {
  return this.cache[key]
};

ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
  this.cache[key] = value;
};

var cacheDefault = {
  create: function create () {
    return new ObjectWithoutPrototypeCache()
  }
};

//
// API
//

var index$5 = memoize;
var strategies = {
  variadic: strategyVariadic,
  monadic: strategyMonadic
};

index$5.strategies = strategies;

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var a = ["coords","download","href","name","rel","shape","target","type"];
var abbr = ["title"];
var applet = ["alt","height","name","width"];
var area = ["alt","coords","download","href","rel","shape","target","type"];
var audio = ["controls","loop","muted","preload","src"];
var base = ["href","target"];
var basefont = ["size"];
var bdo = ["dir"];
var blockquote = ["cite"];
var button = ["disabled","form","name","type","value"];
var canvas = ["height","width"];
var col = ["span","width"];
var colgroup = ["span","width"];
var data = ["value"];
var del = ["cite"];
var details = ["open"];
var dfn = ["title"];
var dialog = ["open"];
var embed = ["height","src","type","width"];
var fieldset = ["disabled","form","name"];
var font = ["size"];
var form = ["accept","action","method","name","target"];
var frame = ["name","scrolling","src"];
var frameset = ["cols","rows"];
var head = ["profile"];
var hr = ["size","width"];
var html = ["manifest"];
var iframe = ["height","name","sandbox","scrolling","src","width"];
var img = ["alt","height","name","sizes","src","width"];
var input = ["accept","alt","autoCapitalize","autoCorrect","autoSave","checked","defaultChecked","defaultValue","disabled","form","height","list","max","min","multiple","name","onChange","pattern","placeholder","required","results","size","src","step","title","type","value","width"];
var ins = ["cite"];
var keygen = ["challenge","disabled","form","name"];
var label = ["form"];
var li = ["type","value"];
var link = ["color","href","integrity","media","nonce","rel","scope","sizes","target","title","type"];
var map = ["name"];
var meta = ["content","name"];
var meter = ["high","low","max","min","optimum","value"];
var object = ["data","form","height","name","type","width"];
var ol = ["reversed","start","type"];
var optgroup = ["disabled","label"];
var option = ["disabled","label","selected","value"];
var output = ["form","name"];
var param = ["name","type","value"];
var pre = ["width"];
var progress = ["max","value"];
var q = ["cite"];
var script = ["async","defer","integrity","nonce","src","type"];
var select = ["defaultValue","disabled","form","multiple","name","onChange","required","size","value"];
var slot = ["name"];
var source = ["media","sizes","src","type"];
var style$1 = ["media","nonce","title","type"];
var table = ["summary","width"];
var td = ["headers","height","scope","width"];
var textarea = ["autoCapitalize","autoCorrect","cols","defaultValue","disabled","form","name","onChange","placeholder","required","rows","value","wrap"];
var th = ["headers","height","scope","width"];
var track = ["default","kind","label","src"];
var ul = ["type"];
var video = ["controls","height","loop","muted","poster","preload","src","width"];
var svg = ["accentHeight","accumulate","additive","alignmentBaseline","allowReorder","alphabetic","amplitude","arabicForm","ascent","attributeName","attributeType","autoReverse","azimuth","baseFrequency","baseProfile","baselineShift","bbox","begin","bias","by","calcMode","capHeight","clip","clipPath","clipPathUnits","clipRule","color","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","contentScriptType","contentStyleType","cursor","cx","cy","d","decelerate","descent","diffuseConstant","direction","display","divisor","dominantBaseline","dur","dx","dy","edgeMode","elevation","enableBackground","end","exponent","externalResourcesRequired","fill","fillOpacity","fillRule","filter","filterRes","filterUnits","floodColor","floodOpacity","focusable","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","format","from","fx","fy","g1","g2","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","gradientTransform","gradientUnits","hanging","height","horizAdvX","horizOriginX","ideographic","imageRendering","in","in2","intercept","k","k1","k2","k3","k4","kernelMatrix","kernelUnitLength","kerning","keyPoints","keySplines","keyTimes","lengthAdjust","letterSpacing","lightingColor","limitingConeAngle","local","markerEnd","markerHeight","markerMid","markerStart","markerUnits","markerWidth","mask","maskContentUnits","maskUnits","mathematical","mode","numOctaves","offset","opacity","operator","order","orient","orientation","origin","overflow","overlinePosition","overlineThickness","paintOrder","panose1","pathLength","patternContentUnits","patternTransform","patternUnits","pointerEvents","points","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","r","radius","refX","refY","renderingIntent","repeatCount","repeatDur","requiredExtensions","requiredFeatures","restart","result","rotate","rx","ry","scale","seed","shapeRendering","slope","spacing","specularConstant","specularExponent","speed","spreadMethod","startOffset","stdDeviation","stemh","stemv","stitchTiles","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","string","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","surfaceScale","systemLanguage","tableValues","targetX","targetY","textAnchor","textDecoration","textLength","textRendering","to","transform","u1","u2","underlinePosition","underlineThickness","unicode","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","vHanging","vIdeographic","vMathematical","values","vectorEffect","version","vertAdvY","vertOriginX","vertOriginY","viewBox","viewTarget","visibility","width","widths","wordSpacing","writingMode","x","x1","x2","xChannelSelector","xHeight","xlinkActuate","xlinkArcrole","xlinkHref","xlinkRole","xlinkShow","xlinkTitle","xlinkType","xmlBase","xmlLang","xmlSpace","xmlns","xmlnsXlink","y","y1","y2","yChannelSelector","z","zoomAndPan"];
var elements = {"html":["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],"svg":["a","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"]};
var reactHtmlAttributes = {
	a: a,
	abbr: abbr,
	applet: applet,
	area: area,
	audio: audio,
	base: base,
	basefont: basefont,
	bdo: bdo,
	blockquote: blockquote,
	button: button,
	canvas: canvas,
	col: col,
	colgroup: colgroup,
	data: data,
	del: del,
	details: details,
	dfn: dfn,
	dialog: dialog,
	embed: embed,
	fieldset: fieldset,
	font: font,
	form: form,
	frame: frame,
	frameset: frameset,
	head: head,
	hr: hr,
	html: html,
	iframe: iframe,
	img: img,
	input: input,
	ins: ins,
	keygen: keygen,
	label: label,
	li: li,
	link: link,
	map: map,
	meta: meta,
	meter: meter,
	object: object,
	ol: ol,
	optgroup: optgroup,
	option: option,
	output: output,
	param: param,
	pre: pre,
	progress: progress,
	q: q,
	script: script,
	select: select,
	slot: slot,
	source: source,
	style: style$1,
	table: table,
	td: td,
	textarea: textarea,
	th: th,
	track: track,
	ul: ul,
	video: video,
	svg: svg,
	elements: elements,
	"*": ["about","acceptCharset","accessKey","allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","capture","cellPadding","cellSpacing","charSet","classID","className","colSpan","contentEditable","contextMenu","crossOrigin","dangerouslySetInnerHTML","datatype","dateTime","dir","draggable","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hidden","hrefLang","htmlFor","httpEquiv","icon","id","inlist","inputMode","is","itemID","itemProp","itemRef","itemScope","itemType","keyParams","keyType","lang","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","prefix","property","radioGroup","readOnly","resource","role","rowSpan","scoped","seamless","security","spellCheck","srcDoc","srcLang","srcSet","style","suppressContentEditableWarning","tabIndex","title","typeof","unselectable","useMap","vocab","wmode"]
};

var reactHtmlAttributes$1 = Object.freeze({
	a: a,
	abbr: abbr,
	applet: applet,
	area: area,
	audio: audio,
	base: base,
	basefont: basefont,
	bdo: bdo,
	blockquote: blockquote,
	button: button,
	canvas: canvas,
	col: col,
	colgroup: colgroup,
	data: data,
	del: del,
	details: details,
	dfn: dfn,
	dialog: dialog,
	embed: embed,
	fieldset: fieldset,
	font: font,
	form: form,
	frame: frame,
	frameset: frameset,
	head: head,
	hr: hr,
	html: html,
	iframe: iframe,
	img: img,
	input: input,
	ins: ins,
	keygen: keygen,
	label: label,
	li: li,
	link: link,
	map: map,
	meta: meta,
	meter: meter,
	object: object,
	ol: ol,
	optgroup: optgroup,
	option: option,
	output: output,
	param: param,
	pre: pre,
	progress: progress,
	q: q,
	script: script,
	select: select,
	slot: slot,
	source: source,
	style: style$1,
	table: table,
	td: td,
	textarea: textarea,
	th: th,
	track: track,
	ul: ul,
	video: video,
	svg: svg,
	elements: elements,
	default: reactHtmlAttributes
});

var reactHtmlAttributes$2 = ( reactHtmlAttributes$1 && reactHtmlAttributes ) || reactHtmlAttributes$1;

var index$6 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


exports.default = reactHtmlAttributes$2;

module.exports = reactHtmlAttributes$2; // for CommonJS compatibility
});

var reactHTMLAttributes = unwrapExports(index$6);

/*
 * This is used to check if a property name is one of the React-specific
 * properties and determine if that property should be forwarded
 * to the React component
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = ['children', 'dangerouslySetInnerHTML', 'key', 'ref', 'autoFocus', 'defaultValue', 'valueLink', 'defaultChecked', 'checkedLink', 'innerHTML', 'suppressContentEditableWarning', 'onFocusIn', 'onFocusOut', 'className',

/* List copied from https://facebook.github.io/react/docs/events.html */
'onCopy', 'onCut', 'onPaste', 'onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onFocus', 'onBlur', 'onChange', 'onInput', 'onSubmit', 'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onLoad', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onCopyCapture', 'onCutCapture', 'onPasteCapture', 'onCompositionEndCapture', 'onCompositionStartCapture', 'onCompositionUpdateCapture', 'onKeyDownCapture', 'onKeyPressCapture', 'onKeyUpCapture', 'onFocusCapture', 'onBlurCapture', 'onChangeCapture', 'onInputCapture', 'onSubmitCapture', 'onClickCapture', 'onContextMenuCapture', 'onDoubleClickCapture', 'onDragCapture', 'onDragEndCapture', 'onDragEnterCapture', 'onDragExitCapture', 'onDragLeaveCapture', 'onDragOverCapture', 'onDragStartCapture', 'onDropCapture', 'onMouseDownCapture', 'onMouseEnterCapture', 'onMouseLeaveCapture', 'onMouseMoveCapture', 'onMouseOutCapture', 'onMouseOverCapture', 'onMouseUpCapture', 'onSelectCapture', 'onTouchCancelCapture', 'onTouchEndCapture', 'onTouchMoveCapture', 'onTouchStartCapture', 'onScrollCapture', 'onWheelCapture', 'onAbortCapture', 'onCanPlayCapture', 'onCanPlayThroughCapture', 'onDurationChangeCapture', 'onEmptiedCapture', 'onEncryptedCapture', 'onEndedCapture', 'onErrorCapture', 'onLoadedDataCapture', 'onLoadedMetadataCapture', 'onLoadStartCapture', 'onPauseCapture', 'onPlayCapture', 'onPlayingCapture', 'onProgressCapture', 'onRateChangeCapture', 'onSeekedCapture', 'onSeekingCapture', 'onStalledCapture', 'onSuspendCapture', 'onTimeUpdateCapture', 'onVolumeChangeCapture', 'onWaitingCapture', 'onLoadCapture', 'onAnimationStartCapture', 'onAnimationEndCapture', 'onAnimationIterationCapture', 'onTransitionEndCapture'];

/* eslint max-lines:0, func-style:0 */
// copied from:
// https://github.com/styled-components/styled-components/tree/
// 956e8210b6277860c89404f9cb08735f97eaa7e1/src/utils/validAttr.js
/* Trying to avoid the unknown-prop errors on glamorous components
 by filtering by React's attribute whitelist.
 */

var globalReactHtmlProps = reactHTMLAttributes['*'];
var supportedSVGTagNames = reactHTMLAttributes.elements.svg;
var supportedHtmlTagNames = reactHTMLAttributes.elements.html;

// these are valid attributes that have the
// same name as CSS properties, and is used
// for css overrides API
var cssProps = ['color', 'height', 'width'];

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR =
// eslint-disable-next-line max-len
':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
// eslint-disable-next-line max-len
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var isSvgTag = function isSvgTag(tagName) {
  return (
    // in our context, we only say that SVG tags are SVG
    // if they are not also HTML.
    // See https://github.com/paypal/glamorous/issues/245
    // the svg tag will always be treated as svg for
    // er... obvious reasons
    tagName === 'svg' || supportedHtmlTagNames.indexOf(tagName) === -1 && supportedSVGTagNames.indexOf(tagName) !== -1
  );
};
var isHtmlProp = function isHtmlProp(name, tagName) {
  var elementAttributes = void 0;

  if (isSvgTag(tagName)) {
    // all SVG attributes supported by React are grouped under 'svg'
    elementAttributes = reactHTMLAttributes.svg;
  } else {
    elementAttributes = reactHTMLAttributes[tagName] || [];
  }

  return globalReactHtmlProps.indexOf(name) !== -1 || elementAttributes.indexOf(name) !== -1;
};
var isCssProp = function isCssProp(name) {
  return cssProps.indexOf(name) !== -1;
};
var isReactProp = function isReactProp(name) {
  return reactProps.indexOf(name) !== -1;
};

// eslint-disable-next-line complexity
var shouldForwardProperty = function shouldForwardProperty(tagName, name) {
  return typeof tagName !== 'string' || (isHtmlProp(name, tagName) || isReactProp(name) || isCustomAttribute(name.toLowerCase())) && (!isCssProp(name) || isSvgTag(tagName));
};

var shouldForwardProperty$1 = index$5(shouldForwardProperty);

function splitProps(_ref, _ref2) {
  var propsAreCssOverrides = _ref2.propsAreCssOverrides,
      rootEl = _ref2.rootEl,
      filterProps = _ref2.filterProps,
      forwardProps = _ref2.forwardProps;
  var cssProp = _ref.css,
      theme = _ref.theme,
      className = _ref.className,
      innerRef = _ref.innerRef,
      glam = _ref.glam,
      rest = objectWithoutProperties(_ref, ['css', 'theme', 'className', 'innerRef', 'glam']);

  var returnValue = { toForward: {}, cssProp: cssProp, cssOverrides: {} };
  if (!propsAreCssOverrides) {
    if (typeof rootEl !== 'string' && filterProps.length === 0) {
      // if it's not a string and filterProps is empty,
      // then we can forward everything (because it's a component)
      returnValue.toForward = rest;
      return returnValue;
    }
  }
  return Object.keys(rest).reduce(function (split, propName) {
    if (filterProps.indexOf(propName) !== -1) {
      return split;
    } else if (forwardProps.indexOf(propName) !== -1 || shouldForwardProperty$1(rootEl, propName)) {
      split.toForward[propName] = rest[propName];
    } else if (propsAreCssOverrides) {
      split.cssOverrides[propName] = rest[propName];
    }
    return split;
  }, returnValue);
}

/* eslint no-unused-vars:0 */

var glamorous = createGlamorous$1(splitProps);

/*
 * This creates a glamorousComponentFactory for every DOM element so you can
 * simply do:
 * const GreenButton = glamorous.button({
 *   backgroundColor: 'green',
 *   padding: 20,
 * })
 * <GreenButton>Click Me!</GreenButton>
 */
Object.assign(glamorous, domElements.reduce(function (getters, tag) {
  // TODO: next breaking change, let's make
  // the `displayName` be: `glamorous.${tag}`
  getters[tag] = glamorous(tag);
  return getters;
}, {}));

/*
 * This creates a glamorous component for each DOM element so you can
 * simply do:
 * <glamorous.Div
 *   color="green"
 *   marginLeft={20}
 * >
 *   I'm green!
 * </glamorous.Div>
 */
Object.assign(glamorous, domElements.reduce(function (comps, tag) {
  var capitalTag = capitalize(tag);
  comps[capitalTag] = glamorous[tag]();
  comps[capitalTag].displayName = 'glamorous.' + capitalTag;
  comps[capitalTag].propsAreCssOverrides = true;
  return comps;
}, {}));

function capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

/*
 * Fix importing in typescript after rollup compilation
 * https://github.com/rollup/rollup/issues/1156
 * https://github.com/Microsoft/TypeScript/issues/13017#issuecomment-268657860
 */
glamorous.default = glamorous;

var Div = glamorous['Div'];

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = createCommonjsModule$1(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', { value: true });

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  'use strict';
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var sheet = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StyleSheet = StyleSheet;

    var _objectAssign2 = _interopRequireDefault(objectAssign);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }return arr2;
      } else {
        return Array.from(arr);
      }
    }

    /*

    high performance StyleSheet for css-in-js systems

    - uses multiple style tags behind the scenes for millions of rules
    - uses `insertRule` for appending in production for *much* faster performance
    - 'polyfills' on server side


    // usage

    import StyleSheet from 'glamor/lib/sheet'
    let styleSheet = new StyleSheet()

    styleSheet.inject()
    - 'injects' the stylesheet into the page (or into memory if on server)

    styleSheet.insert('#box { border: 1px solid red; }')
    - appends a css rule into the stylesheet

    styleSheet.flush()
    - empties the stylesheet of all its contents


    */

    function last(arr) {
      return arr[arr.length - 1];
    }

    function sheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }

      // this weirdness brought to you by firefox
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }

    var isBrowser = typeof window !== 'undefined';
    var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV; //(x => (x === 'development') || !x)(process.env.NODE_ENV)
    var isTest = process.env.NODE_ENV === 'test';

    var oldIE = function () {
      if (isBrowser) {
        var div = document.createElement('div');
        div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
        return div.getElementsByTagName('i').length === 1;
      }
    }();

    function makeStyleTag() {
      var tag = document.createElement('style');
      tag.type = 'text/css';
      tag.setAttribute('data-glamor', '');
      tag.appendChild(document.createTextNode(''));
      (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
      return tag;
    }

    function StyleSheet() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$speedy = _ref.speedy,
          speedy = _ref$speedy === undefined ? !isDev && !isTest : _ref$speedy,
          _ref$maxLength = _ref.maxLength,
          maxLength = _ref$maxLength === undefined ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

      this.isSpeedy = speedy; // the big drawback here is that the css won't be editable in devtools
      this.sheet = undefined;
      this.tags = [];
      this.maxLength = maxLength;
      this.ctr = 0;
    }

    (0, _objectAssign2.default)(StyleSheet.prototype, {
      getSheet: function getSheet() {
        return sheetForTag(last(this.tags));
      },
      inject: function inject() {
        var _this = this;

        if (this.injected) {
          throw new Error('already injected stylesheet!');
        }
        if (isBrowser) {
          this.tags[0] = makeStyleTag();
        } else {
          // server side 'polyfill'. just enough behavior to be useful.
          this.sheet = {
            cssRules: [],
            insertRule: function insertRule(rule) {
              // enough 'spec compliance' to be able to extract the rules later
              // in other words, just the cssText field
              _this.sheet.cssRules.push({ cssText: rule });
            }
          };
        }
        this.injected = true;
      },
      speedy: function speedy(bool) {
        if (this.ctr !== 0) {
          throw new Error('cannot change speedy mode after inserting any rule to sheet. Either call speedy(' + bool + ') earlier in your app, or call flush() before speedy(' + bool + ')');
        }
        this.isSpeedy = !!bool;
      },
      _insert: function _insert(rule) {
        // this weirdness for perf, and chrome's weird bug
        // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
        try {
          var sheet = this.getSheet();
          sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : sheet.cssRules.length);
        } catch (e) {
          if (isDev) {
            // might need beter dx for this
            console.warn('whoops, illegal rule inserted', rule); //eslint-disable-line no-console
          }
        }
      },
      insert: function insert(rule) {

        if (isBrowser) {
          // this is the ultrafast version, works across browsers
          if (this.isSpeedy && this.getSheet().insertRule) {
            this._insert(rule);
          }
          // more browser weirdness. I don't even know
          // else if(this.tags.length > 0 && this.tags::last().styleSheet) {
          //   this.tags::last().styleSheet.cssText+= rule
          // }
          else {
              if (rule.indexOf('@import') !== -1) {
                var tag = last(this.tags);
                tag.insertBefore(document.createTextNode(rule), tag.firstChild);
              } else {
                last(this.tags).appendChild(document.createTextNode(rule));
              }
            }
        } else {
          // server side is pretty simple
          this.sheet.insertRule(rule, rule.indexOf('@import') !== -1 ? 0 : this.sheet.cssRules.length);
        }

        this.ctr++;
        if (isBrowser && this.ctr % this.maxLength === 0) {
          this.tags.push(makeStyleTag());
        }
        return this.ctr - 1;
      },

      // commenting this out till we decide on v3's decision
      // _replace(index, rule) {
      //   // this weirdness for perf, and chrome's weird bug
      //   // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      //   try {
      //     let sheet = this.getSheet()
      //     sheet.deleteRule(index) // todo - correct index here
      //     sheet.insertRule(rule, index)
      //   }
      //   catch(e) {
      //     if(isDev) {
      //       // might need beter dx for this
      //       console.warn('whoops, problem replacing rule', rule) //eslint-disable-line no-console
      //     }
      //   }

      // }
      // replace(index, rule) {
      //   if(isBrowser) {
      //     if(this.isSpeedy && this.getSheet().insertRule) {
      //       this._replace(index, rule)
      //     }
      //     else {
      //       let _slot = Math.floor((index  + this.maxLength) / this.maxLength) - 1
      //       let _index = (index % this.maxLength) + 1
      //       let tag = this.tags[_slot]
      //       tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
      //     }
      //   }
      //   else {
      //     let rules = this.sheet.cssRules
      //     this.sheet.cssRules = [ ...rules.slice(0, index), { cssText: rule }, ...rules.slice(index + 1) ]
      //   }
      // }
      delete: function _delete(index) {
        // we insert a blank rule when 'deleting' so previously returned indexes remain stable
        return this.replace(index, '');
      },
      flush: function flush() {
        if (isBrowser) {
          this.tags.forEach(function (tag) {
            return tag.parentNode.removeChild(tag);
          });
          this.tags = [];
          this.sheet = null;
          this.ctr = 0;
          // todo - look for remnants in document.styleSheets
        } else {
          // simpler on server
          this.sheet.cssRules = [];
        }
        this.injected = false;
      },
      rules: function rules() {
        if (!isBrowser) {
          return this.sheet.cssRules;
        }
        var arr = [];
        this.tags.forEach(function (tag) {
          return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
        });
        return arr;
      }
    });
  });

  "use strict";

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */

  var _hyphenPattern = /-(.)/g;

  /**
   * Camelcases a hyphenated string, for example:
   *
   *   > camelize('background-color')
   *   < "backgroundColor"
   *
   * @param {string} string
   * @return {string}
   */
  function camelize(string) {
    return string.replace(_hyphenPattern, function (_, character) {
      return character.toUpperCase();
    });
  }

  var camelize_1 = camelize;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */

  'use strict';

  var msPattern = /^-ms-/;

  /**
   * Camelcases a hyphenated CSS property name, for example:
   *
   *   > camelizeStyleName('background-color')
   *   < "backgroundColor"
   *   > camelizeStyleName('-moz-transition')
   *   < "MozTransition"
   *   > camelizeStyleName('-ms-transition')
   *   < "msTransition"
   *
   * As Andi Smith suggests
   * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
   * is converted to lowercase `ms`.
   *
   * @param {string} string
   * @return {string}
   */
  function camelizeStyleName(string) {
    return camelize_1(string.replace(msPattern, 'ms-'));
  }

  var camelizeStyleName_1 = camelizeStyleName;

  var CSSProperty_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Copyright 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * @providesModule CSSProperty
     */

    /**
     * CSS properties which accept numbers but are not in units of "px".
     */

    var isUnitlessNumber = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridRowStart: true,
      gridRowEnd: true,
      gridColumn: true,
      gridColumnStart: true,
      gridColumnEnd: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,

      // SVG-related properties
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true

      /**
       * @param {string} prefix vendor-specific prefix, eg: Webkit
       * @param {string} key style name, eg: transitionDuration
       * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
       * WebkitTransitionDuration
       */
    };function prefixKey(prefix, key) {
      return prefix + key.charAt(0).toUpperCase() + key.substring(1);
    }

    /**
     * Support style names that may come passed in prefixed by adding permutations
     * of vendor prefixes.
     */
    var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

    // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
    // infinite loop, because it iterates over the newly added props too.
    Object.keys(isUnitlessNumber).forEach(function (prop) {
      prefixes.forEach(function (prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
      });
    });

    /**
     * Most style properties can be unset by doing .style[prop] = '' but IE8
     * doesn't like doing that with shorthand properties so for the properties that
     * IE8 breaks on, which are listed here, we instead unset each of the
     * individual properties. See http://bugs.jquery.com/ticket/12385.
     * The 4-value 'clock' properties like margin, padding, border-width seem to
     * behave without any problems. Curiously, list-style works too without any
     * special prodding.
     */
    var shorthandPropertyExpansions = {
      background: {
        backgroundAttachment: true,
        backgroundColor: true,
        backgroundImage: true,
        backgroundPositionX: true,
        backgroundPositionY: true,
        backgroundRepeat: true
      },
      backgroundPosition: {
        backgroundPositionX: true,
        backgroundPositionY: true
      },
      border: {
        borderWidth: true,
        borderStyle: true,
        borderColor: true
      },
      borderBottom: {
        borderBottomWidth: true,
        borderBottomStyle: true,
        borderBottomColor: true
      },
      borderLeft: {
        borderLeftWidth: true,
        borderLeftStyle: true,
        borderLeftColor: true
      },
      borderRight: {
        borderRightWidth: true,
        borderRightStyle: true,
        borderRightColor: true
      },
      borderTop: {
        borderTopWidth: true,
        borderTopStyle: true,
        borderTopColor: true
      },
      font: {
        fontStyle: true,
        fontVariant: true,
        fontWeight: true,
        fontSize: true,
        lineHeight: true,
        fontFamily: true
      },
      outline: {
        outlineWidth: true,
        outlineStyle: true,
        outlineColor: true
      }
    };

    var CSSProperty = {
      isUnitlessNumber: isUnitlessNumber,
      shorthandPropertyExpansions: shorthandPropertyExpansions
    };

    exports.default = CSSProperty;
  });

  "use strict";

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   *
   */

  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  var emptyFunction_1 = emptyFunction;

  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */

  'use strict';

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction_1;

  if (process.env.NODE_ENV !== 'production') {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  var warning_1 = warning;

  var dangerousStyleValue_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _CSSProperty2 = _interopRequireDefault(CSSProperty_1);

    var _warning2 = _interopRequireDefault(warning_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    /**
     * Copyright 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * @providesModule dangerousStyleValue
     */

    var isUnitlessNumber = _CSSProperty2.default.isUnitlessNumber;
    var styleWarnings = {};

    /**
     * Convert a value into the proper css writable value. The style name `name`
     * should be logical (no hyphens), as specified
     * in `CSSProperty.isUnitlessNumber`.
     *
     * @param {string} name CSS property name such as `topMargin`.
     * @param {*} value CSS property value such as `10px`.
     * @param {ReactDOMComponent} component
     * @return {string} Normalized style value with dimensions applied.
     */
    function dangerousStyleValue(name, value, component) {
      // Note that we've removed escapeTextForBrowser() calls here since the
      // whole string will be escaped when the attribute is injected into
      // the markup. If you provide unsafe user data here they can inject
      // arbitrary CSS which may be problematic (I couldn't repro this):
      // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
      // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
      // This is not an XSS hole but instead a potential CSS injection issue
      // which has lead to a greater discussion about how we're going to
      // trust URLs moving forward. See #2115901

      var isEmpty = value == null || typeof value === 'boolean' || value === '';
      if (isEmpty) {
        return '';
      }

      var isNonNumeric = isNaN(value);
      if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
        return '' + value; // cast to string
      }

      if (typeof value === 'string') {
        if (process.env.NODE_ENV !== 'production') {
          // Allow '0' to pass through without warning. 0 is already special and
          // doesn't require units, so we don't need to warn about it.
          if (component && value !== '0') {
            var owner = component._currentElement._owner;
            var ownerName = owner ? owner.getName() : null;
            if (ownerName && !styleWarnings[ownerName]) {
              styleWarnings[ownerName] = {};
            }
            var warned = false;
            if (ownerName) {
              var warnings = styleWarnings[ownerName];
              warned = warnings[name];
              if (!warned) {
                warnings[name] = true;
              }
            }
            if (!warned) {
              process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
            }
          }
        }
        value = value.trim();
      }
      return value + 'px';
    }

    exports.default = dangerousStyleValue;
  });

  'use strict';

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */

  var _uppercasePattern = /([A-Z])/g;

  /**
   * Hyphenates a camelcased string, for example:
   *
   *   > hyphenate('backgroundColor')
   *   < "background-color"
   *
   * For CSS style names, use `hyphenateStyleName` instead which works properly
   * with all vendor prefixes, including `ms`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }

  var hyphenate_1 = hyphenate;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @typechecks
   */

  'use strict';

  var msPattern$1 = /^ms-/;

  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */
  function hyphenateStyleName(string) {
    return hyphenate_1(string).replace(msPattern$1, '-ms-');
  }

  var hyphenateStyleName_1 = hyphenateStyleName;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   *
   * @typechecks static-only
   */

  'use strict';

  /**
   * Memoizes the return value of a function that accepts one string argument.
   */

  function memoizeStringOnly(callback) {
    var cache = {};
    return function (string) {
      if (!cache.hasOwnProperty(string)) {
        cache[string] = callback.call(this, string);
      }
      return cache[string];
    };
  }

  var memoizeStringOnly_1 = memoizeStringOnly;

  var CSSPropertyOperations = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.processStyleName = undefined;
    exports.createMarkupForStyles = createMarkupForStyles;

    var _camelizeStyleName2 = _interopRequireDefault(camelizeStyleName_1);

    var _dangerousStyleValue2 = _interopRequireDefault(dangerousStyleValue_1);

    var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1);

    var _memoizeStringOnly2 = _interopRequireDefault(memoizeStringOnly_1);

    var _warning2 = _interopRequireDefault(warning_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var processStyleName = exports.processStyleName = (0, _memoizeStringOnly2.default)(_hyphenateStyleName2.default); /**
                                                                                                                       * Copyright 2013-present, Facebook, Inc.
                                                                                                                       * All rights reserved.
                                                                                                                       *
                                                                                                                       * This source code is licensed under the BSD-style license found in the
                                                                                                                       * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                       * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                       *
                                                                                                                       * @providesModule CSSPropertyOperations
                                                                                                                       */

    if (process.env.NODE_ENV !== 'production') {
      // 'msTransform' is correct, but the other prefixes should be capitalized
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

      // style values shouldn't contain a semicolon
      var badStyleValueWithSemicolonPattern = /;\s*$/;

      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnedForNaNValue = false;

      var warnHyphenatedStyleName = function warnHyphenatedStyleName(name, owner) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported style property %s. Did you mean %s?%s', name, (0, _camelizeStyleName2.default)(name), checkRenderMessage(owner)) : void 0;
      };

      var warnBadVendoredStyleName = function warnBadVendoredStyleName(name, owner) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
      };

      var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value, owner) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return;
        }

        warnedStyleValues[value] = true;
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
      };

      var warnStyleValueIsNaN = function warnStyleValueIsNaN(name, value, owner) {
        if (warnedForNaNValue) {
          return;
        }

        warnedForNaNValue = true;
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
      };

      var checkRenderMessage = function checkRenderMessage(owner) {
        if (owner) {
          var name = owner.getName();
          if (name) {
            return ' Check the render method of `' + name + '`.';
          }
        }
        return '';
      };

      /**
       * @param {string} name
       * @param {*} value
       * @param {ReactDOMComponent} component
       */
      var warnValidStyle = function warnValidStyle(name, value, component) {
        //eslint-disable-line no-var
        var owner = void 0;
        if (component) {
          owner = component._currentElement._owner;
        }
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name, owner);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name, owner);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value, owner);
        }

        if (typeof value === 'number' && isNaN(value)) {
          warnStyleValueIsNaN(name, value, owner);
        }
      };
    }

    /**
       * Serializes a mapping of style properties for use as inline styles:
       *
       *   > createMarkupForStyles({width: '200px', height: 0})
       *   "width:200px;height:0;"
       *
       * Undefined values are ignored so that declarative programming is easier.
       * The result should be HTML-escaped before insertion into the DOM.
       *
       * @param {object} styles
       * @param {ReactDOMComponent} component
       * @return {?string}
       */

    function createMarkupForStyles(styles, component) {
      var serialized = '';
      for (var styleName in styles) {
        var isCustomProp = styleName.indexOf('--') === 0;
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        if (styleName === 'label') {
          continue;
        }
        var styleValue = styles[styleName];
        if (process.env.NODE_ENV !== 'production' && !isCustomProp) {
          warnValidStyle(styleName, styleValue, component);
        }
        if (styleValue != null) {
          if (isCustomProp) {
            serialized += styleName + ':' + styleValue + ';';
          } else {
            serialized += processStyleName(styleName) + ':';
            serialized += (0, _dangerousStyleValue2.default)(styleName, styleValue, component) + ';';
          }
        }
      }
      return serialized || null;
    }
  });

  var clean_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
    };

    exports.default = clean;
    // Returns true for null, false, undefined and {}
    function isFalsy(value) {
      return value === null || value === undefined || value === false || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0;
    }

    function cleanObject(object) {
      if (isFalsy(object)) return null;
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return object;

      var acc = {},
          keys = Object.keys(object),
          hasFalsy = false;
      for (var i = 0; i < keys.length; i++) {
        var value = object[keys[i]];
        var filteredValue = clean(value);
        if (filteredValue === null || filteredValue !== value) {
          hasFalsy = true;
        }
        if (filteredValue !== null) {
          acc[keys[i]] = filteredValue;
        }
      }
      return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object;
    }

    function cleanArray(rules) {
      var hasFalsy = false;
      var filtered = [];
      rules.forEach(function (rule) {
        var filteredRule = clean(rule);
        if (filteredRule === null || filteredRule !== rule) {
          hasFalsy = true;
        }
        if (filteredRule !== null) {
          filtered.push(filteredRule);
        }
      });
      return filtered.length == 0 ? null : hasFalsy ? filtered : rules;
    }

    // Takes style array or object provided by user and clears all the falsy data
    // If there is no styles left after filtration returns null
    function clean(input) {
      return Array.isArray(input) ? cleanArray(input) : cleanObject(input);
    }
  });

  var staticData = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var w = ["Webkit"];
    var m = ["Moz"];
    var ms = ["ms"];
    var wm = ["Webkit", "Moz"];
    var wms = ["Webkit", "ms"];
    var wmms = ["Webkit", "Moz", "ms"];

    exports.default = {
      plugins: [],
      prefixMap: { "appearance": wm, "userSelect": wmms, "textEmphasisPosition": w, "textEmphasis": w, "textEmphasisStyle": w, "textEmphasisColor": w, "boxDecorationBreak": w, "clipPath": w, "maskImage": w, "maskMode": w, "maskRepeat": w, "maskPosition": w, "maskClip": w, "maskOrigin": w, "maskSize": w, "maskComposite": w, "mask": w, "maskBorderSource": w, "maskBorderMode": w, "maskBorderSlice": w, "maskBorderWidth": w, "maskBorderOutset": w, "maskBorderRepeat": w, "maskBorder": w, "maskType": w, "textDecorationStyle": w, "textDecorationSkip": w, "textDecorationLine": w, "textDecorationColor": w, "filter": w, "fontFeatureSettings": w, "breakAfter": wmms, "breakBefore": wmms, "breakInside": wmms, "columnCount": wm, "columnFill": wm, "columnGap": wm, "columnRule": wm, "columnRuleColor": wm, "columnRuleStyle": wm, "columnRuleWidth": wm, "columns": wm, "columnSpan": wm, "columnWidth": wm, "flex": w, "flexBasis": w, "flexDirection": w, "flexGrow": w, "flexFlow": w, "flexShrink": w, "flexWrap": w, "alignContent": w, "alignItems": w, "alignSelf": w, "justifyContent": w, "order": w, "transform": w, "transformOrigin": w, "transformOriginX": w, "transformOriginY": w, "backfaceVisibility": w, "perspective": w, "perspectiveOrigin": w, "transformStyle": w, "transformOriginZ": w, "animation": w, "animationDelay": w, "animationDirection": w, "animationFillMode": w, "animationDuration": w, "animationIterationCount": w, "animationName": w, "animationPlayState": w, "animationTimingFunction": w, "backdropFilter": w, "fontKerning": w, "scrollSnapType": wms, "scrollSnapPointsX": wms, "scrollSnapPointsY": wms, "scrollSnapDestination": wms, "scrollSnapCoordinate": wms, "shapeImageThreshold": w, "shapeImageMargin": w, "shapeImageOutside": w, "hyphens": wmms, "flowInto": wms, "flowFrom": wms, "regionFragment": wms, "textAlignLast": m, "tabSize": m, "wrapFlow": ms, "wrapThrough": ms, "wrapMargin": ms, "gridTemplateColumns": ms, "gridTemplateRows": ms, "gridTemplateAreas": ms, "gridTemplate": ms, "gridAutoColumns": ms, "gridAutoRows": ms, "gridAutoFlow": ms, "grid": ms, "gridRowStart": ms, "gridColumnStart": ms, "gridRowEnd": ms, "gridRow": ms, "gridColumn": ms, "gridColumnEnd": ms, "gridColumnGap": ms, "gridRowGap": ms, "gridArea": ms, "gridGap": ms, "textSizeAdjust": wms, "borderImage": w, "borderImageOutset": w, "borderImageRepeat": w, "borderImageSlice": w, "borderImageSource": w, "borderImageWidth": w, "transitionDelay": w, "transitionDuration": w, "transitionProperty": w, "transitionTimingFunction": w }
    };
    module.exports = exports["default"];
  });

  var capitalizeString_1 = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = capitalizeString;
    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    module.exports = exports["default"];
  });

  var prefixProperty_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = prefixProperty;

    var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function prefixProperty(prefixProperties, property, style) {
      if (prefixProperties.hasOwnProperty(property)) {
        var requiredPrefixes = prefixProperties[property];
        for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
          style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
        }
      }
    }
    module.exports = exports['default'];
  });

  var prefixValue_1 = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = prefixValue;
    function prefixValue(plugins, property, value, style, metaData) {
      for (var i = 0, len = plugins.length; i < len; ++i) {
        var processedValue = plugins[i](property, value, style, metaData

        // we can stop processing if a value is returned
        // as all plugin criteria are unique
        );if (processedValue) {
          return processedValue;
        }
      }
    }
    module.exports = exports["default"];
  });

  var cursor_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cursor;
    var prefixes = ['-webkit-', '-moz-', ''];

    var values = {
      'zoom-in': true,
      'zoom-out': true,
      grab: true,
      grabbing: true
    };

    function cursor(property, value) {
      if (property === 'cursor' && values.hasOwnProperty(value)) {
        return prefixes.map(function (prefix) {
          return prefix + value;
        });
      }
    }
    module.exports = exports['default'];
  });

  var isPrefixedValue_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isPrefixedValue;

    var regex = /-webkit-|-moz-|-ms-/;

    function isPrefixedValue(value) {
      return typeof value === 'string' && regex.test(value);
    }
    module.exports = exports['default'];
  });

  var crossFade_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = crossFade;

    var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    // http://caniuse.com/#search=cross-fade
    var prefixes = ['-webkit-', ''];
    function crossFade(property, value) {
      if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
        return prefixes.map(function (prefix) {
          return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
        });
      }
    }
    module.exports = exports['default'];
  });

  var filter_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = filter;

    var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    // http://caniuse.com/#feat=css-filter-function
    var prefixes = ['-webkit-', ''];
    function filter(property, value) {
      if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
        return prefixes.map(function (prefix) {
          return value.replace(/filter\(/g, prefix + 'filter(');
        });
      }
    }
    module.exports = exports['default'];
  });

  var flex_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = flex;
    var values = {
      flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex'],
      'inline-flex': ['-webkit-inline-box', '-moz-inline-box', '-ms-inline-flexbox', '-webkit-inline-flex', 'inline-flex']
    };

    function flex(property, value) {
      if (property === 'display' && values.hasOwnProperty(value)) {
        return values[value];
      }
    }
    module.exports = exports['default'];
  });

  var flexboxOld_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = flexboxOld;
    var alternativeValues = {
      'space-around': 'justify',
      'space-between': 'justify',
      'flex-start': 'start',
      'flex-end': 'end',
      'wrap-reverse': 'multiple',
      wrap: 'multiple'
    };

    var alternativeProps = {
      alignItems: 'WebkitBoxAlign',
      justifyContent: 'WebkitBoxPack',
      flexWrap: 'WebkitBoxLines'
    };

    function flexboxOld(property, value, style) {
      if (property === 'flexDirection' && typeof value === 'string') {
        if (value.indexOf('column') > -1) {
          style.WebkitBoxOrient = 'vertical';
        } else {
          style.WebkitBoxOrient = 'horizontal';
        }
        if (value.indexOf('reverse') > -1) {
          style.WebkitBoxDirection = 'reverse';
        } else {
          style.WebkitBoxDirection = 'normal';
        }
      }
      if (alternativeProps.hasOwnProperty(property)) {
        style[alternativeProps[property]] = alternativeValues[value] || value;
      }
    }
    module.exports = exports['default'];
  });

  var gradient_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = gradient;

    var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var prefixes = ['-webkit-', '-moz-', ''];

    var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

    function gradient(property, value) {
      if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
        return prefixes.map(function (prefix) {
          return prefix + value;
        });
      }
    }
    module.exports = exports['default'];
  });

  var imageSet_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = imageSet;

    var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    // http://caniuse.com/#feat=css-image-set
    var prefixes = ['-webkit-', ''];
    function imageSet(property, value) {
      if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
        return prefixes.map(function (prefix) {
          return value.replace(/image-set\(/g, prefix + 'image-set(');
        });
      }
    }
    module.exports = exports['default'];
  });

  var position_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = position;
    function position(property, value) {
      if (property === 'position' && value === 'sticky') {
        return ['-webkit-sticky', 'sticky'];
      }
    }
    module.exports = exports['default'];
  });

  var sizing_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = sizing;
    var prefixes = ['-webkit-', '-moz-', ''];

    var properties = {
      maxHeight: true,
      maxWidth: true,
      width: true,
      height: true,
      columnWidth: true,
      minWidth: true,
      minHeight: true
    };
    var values = {
      'min-content': true,
      'max-content': true,
      'fill-available': true,
      'fit-content': true,
      'contain-floats': true
    };

    function sizing(property, value) {
      if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
        return prefixes.map(function (prefix) {
          return prefix + value;
        });
      }
    }
    module.exports = exports['default'];
  });

  'use strict';

  var uppercasePattern = /[A-Z]/g;
  var msPattern$2 = /^ms-/;
  var cache = {};

  function hyphenateStyleName$1(string) {
    return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern$2, '-ms-');
  }

  var hyphenateStyleName_1$2 = hyphenateStyleName$1;

  var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = hyphenateProperty;

    var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1$2);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function hyphenateProperty(property) {
      return (0, _hyphenateStyleName2.default)(property);
    }
    module.exports = exports['default'];
  });

  var transition_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = transition;

    var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);

    var _isPrefixedValue2 = _interopRequireDefault(isPrefixedValue_1);

    var _capitalizeString2 = _interopRequireDefault(capitalizeString_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var properties = {
      transition: true,
      transitionProperty: true,
      WebkitTransition: true,
      WebkitTransitionProperty: true,
      MozTransition: true,
      MozTransitionProperty: true
    };

    var prefixMapping = {
      Webkit: '-webkit-',
      Moz: '-moz-',
      ms: '-ms-'
    };

    function prefixValue(value, propertyPrefixMap) {
      if ((0, _isPrefixedValue2.default)(value)) {
        return value;
      }

      // only split multi values, not cubic beziers
      var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

      for (var i = 0, len = multipleValues.length; i < len; ++i) {
        var singleValue = multipleValues[i];
        var values = [singleValue];
        for (var property in propertyPrefixMap) {
          var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

          if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
            var prefixes = propertyPrefixMap[property];
            for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
              // join all prefixes and create a new value
              values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
            }
          }
        }

        multipleValues[i] = values.join(',');
      }

      return multipleValues.join(',');
    }

    function transition(property, value, style, propertyPrefixMap) {
      // also check for already prefixed transitions
      if (typeof value === 'string' && properties.hasOwnProperty(property)) {
        var outputValue = prefixValue(value, propertyPrefixMap
        // if the property is already prefixed
        );var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
          return !/-moz-|-ms-/.test(val);
        }).join(',');

        if (property.indexOf('Webkit') > -1) {
          return webkitOutput;
        }

        var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
          return !/-webkit-|-ms-/.test(val);
        }).join(',');

        if (property.indexOf('Moz') > -1) {
          return mozOutput;
        }

        style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
        style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
        return outputValue;
      }
    }
    module.exports = exports['default'];
  });

  var prefixer_1 = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = prefixer;

    var _staticData2 = _interopRequireDefault(staticData);

    var _prefixProperty2 = _interopRequireDefault(prefixProperty_1);

    var _prefixValue2 = _interopRequireDefault(prefixValue_1);

    var _cursor2 = _interopRequireDefault(cursor_1);

    var _crossFade2 = _interopRequireDefault(crossFade_1);

    var _filter2 = _interopRequireDefault(filter_1);

    var _flex2 = _interopRequireDefault(flex_1);

    var _flexboxOld2 = _interopRequireDefault(flexboxOld_1);

    var _gradient2 = _interopRequireDefault(gradient_1);

    var _imageSet2 = _interopRequireDefault(imageSet_1);

    var _position2 = _interopRequireDefault(position_1);

    var _sizing2 = _interopRequireDefault(sizing_1);

    var _transition2 = _interopRequireDefault(transition_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default]; // custom facade for inline-style-prefixer

    var prefixMap = _staticData2.default.prefixMap;

    function prefixer(style) {
      for (var property in style) {
        var value = style[property];

        var processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (processedValue) {
          style[property] = processedValue;
        }

        (0, _prefixProperty2.default)(prefixMap, property, style);
      }
      return style;
    }
  });

  var plugins = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };

    exports.PluginSet = PluginSet;
    exports.fallbacks = fallbacks;
    exports.contentWrap = contentWrap;
    exports.prefixes = prefixes;

    var _objectAssign2 = _interopRequireDefault(objectAssign);

    var _prefixer2 = _interopRequireDefault(prefixer_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var isDev = function (x) {
      return x === 'development' || !x;
    }(process.env.NODE_ENV);

    function PluginSet(initial) {
      this.fns = initial || [];
    }

    (0, _objectAssign2.default)(PluginSet.prototype, {
      add: function add() {
        var _this = this;

        for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
          fns[_key] = arguments[_key];
        }

        fns.forEach(function (fn) {
          if (_this.fns.indexOf(fn) >= 0) {
            if (isDev) {
              console.warn('adding the same plugin again, ignoring'); //eslint-disable-line no-console
            }
          } else {
            _this.fns = [fn].concat(_this.fns);
          }
        });
      },
      remove: function remove(fn) {
        this.fns = this.fns.filter(function (x) {
          return x !== fn;
        });
      },
      clear: function clear() {
        this.fns = [];
      },
      transform: function transform(o) {
        return this.fns.reduce(function (o, fn) {
          return fn(o);
        }, o);
      }
    });

    function fallbacks(node) {
      var hasArray = Object.keys(node.style).map(function (x) {
        return Array.isArray(node.style[x]);
      }).indexOf(true) >= 0;
      if (hasArray) {
        var style = node.style;

        var flattened = Object.keys(style).reduce(function (o, key) {
          o[key] = Array.isArray(style[key]) ? style[key].join('; ' + (0, CSSPropertyOperations.processStyleName)(key) + ': ') : style[key];
          return o;
        }, {});
        // todo -
        // flatten arrays which haven't been flattened yet
        return (0, _objectAssign2.default)({}, node, { style: flattened });
      }
      return node;
    }

    var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit'];

    function contentWrap(node) {
      if (node.style.content) {
        var cont = node.style.content;
        if (contentValues.indexOf(cont) >= 0) {
          return node;
        }
        if (/^(attr|calc|counters?|url)\(/.test(cont)) {
          return node;
        }
        if (cont.charAt(0) === cont.charAt(cont.length - 1) && (cont.charAt(0) === '"' || cont.charAt(0) === "'")) {
          return node;
        }
        return _extends({}, node, { style: _extends({}, node.style, { content: '"' + cont + '"' }) });
      }
      return node;
    }

    function prefixes(node) {
      return (0, _objectAssign2.default)({}, node, { style: (0, _prefixer2.default)(_extends({}, node.style)) });
    }
  });

  var hash = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = doHash;
    // murmurhash2 via https://gist.github.com/raycmorgan/588423

    function doHash(str, seed) {
      var m = 0x5bd1e995;
      var r = 24;
      var h = seed ^ str.length;
      var length = str.length;
      var currentIndex = 0;

      while (length >= 4) {
        var k = UInt32(str, currentIndex);

        k = Umul32(k, m);
        k ^= k >>> r;
        k = Umul32(k, m);

        h = Umul32(h, m);
        h ^= k;

        currentIndex += 4;
        length -= 4;
      }

      switch (length) {
        case 3:
          h ^= UInt16(str, currentIndex);
          h ^= str.charCodeAt(currentIndex + 2) << 16;
          h = Umul32(h, m);
          break;

        case 2:
          h ^= UInt16(str, currentIndex);
          h = Umul32(h, m);
          break;

        case 1:
          h ^= str.charCodeAt(currentIndex);
          h = Umul32(h, m);
          break;
      }

      h ^= h >>> 13;
      h = Umul32(h, m);
      h ^= h >>> 15;

      return h >>> 0;
    }

    function UInt32(str, pos) {
      return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
    }

    function UInt16(str, pos) {
      return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
    }

    function Umul32(n, m) {
      n = n | 0;
      m = m | 0;
      var nlo = n & 0xffff;
      var nhi = n >>> 16;
      var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
      return res;
    }
  });

  var lib = createCommonjsModule(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.compose = exports.merge = exports.$ = exports.style = exports.presets = exports.keyframes = exports.fontFace = exports.insertGlobal = exports.insertRule = exports.plugins = exports.styleSheet = undefined;
    exports.speedy = speedy;
    exports.simulations = simulations;
    exports.simulate = simulate;
    exports.cssLabels = cssLabels;
    exports.isLikeRule = isLikeRule;
    exports.idFor = idFor;
    exports.css = css;
    exports.rehydrate = rehydrate;
    exports.flush = flush;
    exports.select = select;
    exports.parent = parent;
    exports.media = media;
    exports.pseudo = pseudo;
    exports.active = active;
    exports.any = any;
    exports.checked = checked;
    exports.disabled = disabled;
    exports.empty = empty;
    exports.enabled = enabled;
    exports._default = _default;
    exports.first = first;
    exports.firstChild = firstChild;
    exports.firstOfType = firstOfType;
    exports.fullscreen = fullscreen;
    exports.focus = focus;
    exports.hover = hover;
    exports.indeterminate = indeterminate;
    exports.inRange = inRange;
    exports.invalid = invalid;
    exports.lastChild = lastChild;
    exports.lastOfType = lastOfType;
    exports.left = left;
    exports.link = link;
    exports.onlyChild = onlyChild;
    exports.onlyOfType = onlyOfType;
    exports.optional = optional;
    exports.outOfRange = outOfRange;
    exports.readOnly = readOnly;
    exports.readWrite = readWrite;
    exports.required = required;
    exports.right = right;
    exports.root = root;
    exports.scope = scope;
    exports.target = target;
    exports.valid = valid;
    exports.visited = visited;
    exports.dir = dir;
    exports.lang = lang;
    exports.not = not;
    exports.nthChild = nthChild;
    exports.nthLastChild = nthLastChild;
    exports.nthLastOfType = nthLastOfType;
    exports.nthOfType = nthOfType;
    exports.after = after;
    exports.before = before;
    exports.firstLetter = firstLetter;
    exports.firstLine = firstLine;
    exports.selection = selection;
    exports.backdrop = backdrop;
    exports.placeholder = placeholder;
    exports.cssFor = cssFor;
    exports.attribsFor = attribsFor;

    var _objectAssign2 = _interopRequireDefault(objectAssign);

    var _clean2 = _interopRequireDefault(clean_1);

    var _hash2 = _interopRequireDefault(hash);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }return arr2;
      } else {
        return Array.from(arr);
      }
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }return obj;
    }
    /* stylesheet */

    var styleSheet = exports.styleSheet = new sheet.StyleSheet();
    // an isomorphic StyleSheet shim. hides all the nitty gritty.

    // /**************** LIFTOFF IN 3... 2... 1... ****************/
    styleSheet.inject(); //eslint-disable-line indent
    // /****************      TO THE MOOOOOOON     ****************/

    // convenience function to toggle speedy
    function speedy(bool) {
      return styleSheet.speedy(bool);
    }

    // plugins
    // we include these by default
    var plugins$$1 = exports.plugins = styleSheet.plugins = new plugins.PluginSet([plugins.prefixes, plugins.contentWrap, plugins.fallbacks]);
    plugins$$1.media = new plugins.PluginSet(); // neat! media, font-face, keyframes
    plugins$$1.fontFace = new plugins.PluginSet();
    plugins$$1.keyframes = new plugins.PluginSet([plugins.prefixes, plugins.fallbacks]);

    // define some constants

    var isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    var isTest = process.env.NODE_ENV === 'test';
    var isBrowser = typeof window !== 'undefined';

    /**** simulations  ****/

    // a flag to enable simulation meta tags on dom nodes
    // defaults to true in dev mode. recommend *not* to
    // toggle often.
    var canSimulate = isDev;

    // we use these flags for issuing warnings when simulate is called
    // in prod / in incorrect order
    var warned1 = false,
        warned2 = false;

    // toggles simulation activity. shouldn't be needed in most cases
    function simulations() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      canSimulate = !!bool;
    }

    // use this on dom nodes to 'simulate' pseudoclasses
    // <div {...hover({ color: 'red' })} {...simulate('hover', 'visited')}>...</div>
    // you can even send in some weird ones, as long as it's in simple format
    // and matches an existing rule on the element
    // eg simulate('nthChild2', ':hover:active') etc
    function simulate() {
      for (var _len = arguments.length, pseudos = Array(_len), _key = 0; _key < _len; _key++) {
        pseudos[_key] = arguments[_key];
      }

      pseudos = (0, _clean2.default)(pseudos);
      if (!pseudos) return {};
      if (!canSimulate) {
        if (!warned1) {
          console.warn('can\'t simulate without once calling simulations(true)'); //eslint-disable-line no-console
          warned1 = true;
        }
        if (!isDev && !isTest && !warned2) {
          console.warn('don\'t use simulation outside dev'); //eslint-disable-line no-console
          warned2 = true;
        }
        return {};
      }
      return pseudos.reduce(function (o, p) {
        return o['data-simulate-' + simple(p)] = '', o;
      }, {});
    }

    /**** labels ****/
    // toggle for debug labels.
    // *shouldn't* have to mess with this manually
    var hasLabels = isDev;

    function cssLabels(bool) {
      hasLabels = !!bool;
    }

    // takes a string, converts to lowercase, strips out nonalphanumeric.
    function simple(str) {
      var char = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return str.toLowerCase().replace(/[^a-z0-9]/g, char);
    }

    // hashes a string to something 'unique'
    // we use this to generate ids for styles


    function hashify(obj) {
      var str = JSON.stringify(obj);
      var toRet = (0, _hash2.default)(str).toString(36);
      if (obj.label && obj.label.length > 0 && isDev) {
        return simple(obj.label.join('.'), '-') + '-' + toRet;
      }
      return toRet;
    }

    // of shape { 'data-css-<id>': '' }
    function isLikeRule(rule) {
      var keys = Object.keys(rule).filter(function (x) {
        return x !== 'toString';
      });
      if (keys.length !== 1) {
        return false;
      }
      return !!/data\-css\-([a-zA-Z0-9\-_]+)/.exec(keys[0]);
    }

    // extracts id from a { 'data-css-<id>': ''} like object
    function idFor(rule) {
      var keys = Object.keys(rule).filter(function (x) {
        return x !== 'toString';
      });
      if (keys.length !== 1) throw new Error('not a rule');
      var regex = /data\-css\-([a-zA-Z0-9\-_]+)/;
      var match = regex.exec(keys[0]);
      if (!match) throw new Error('not a rule');
      return match[1];
    }

    // from https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61

    // "Tokenizes" the selectors into parts relevant for the next function.
    // Strings and comments are matched, but ignored afterwards.
    // This is not a full tokenizers. It only recognizes comas, parentheses,
    // strings and comments.
    // regexp generated by scripts/regexps.js then trimmed by hand
    var selectorTokenizer = /[(),]|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\/\*[\s\S]*?\*\//g;

    /**
     * This will split a coma-separated selector list into individual selectors,
     * ignoring comas in strings, comments and in :pseudo-selectors(parameter, lists).
     *
     * @param {string} selector
     * @return {string[]}
     */

    function splitSelector(selector) {
      if (selector.indexOf(',') === -1) {
        return [selector];
      }

      var indices = [],
          res = [],
          inParen = 0,
          o;
      /*eslint-disable no-cond-assign*/
      while (o = selectorTokenizer.exec(selector)) {
        /*eslint-enable no-cond-assign*/
        switch (o[0]) {
          case '(':
            inParen++;break;
          case ')':
            inParen--;break;
          case ',':
            if (inParen) break;indices.push(o.index);
        }
      }
      for (o = indices.length; o--;) {
        res.unshift(selector.slice(indices[o] + 1));
        selector = selector.slice(0, indices[o]);
      }
      res.unshift(selector);
      return res;
    }

    function selector(id, path) {
      if (!id) {
        return path.replace(/\&/g, '');
      }
      if (!path) return '.css-' + id + ',[data-css-' + id + ']';

      var x = splitSelector(path).map(function (x) {
        return x.indexOf('&') >= 0 ? [x.replace(/\&/mg, '.css-' + id), x.replace(/\&/mg, '[data-css-' + id + ']')].join(',') // todo - make sure each sub selector has an &
        : '.css-' + id + x + ',[data-css-' + id + ']' + x;
      }).join(',');

      if (canSimulate && /^\&\:/.exec(path) && !/\s/.exec(path)) {
        x += ',.css-' + id + '[data-simulate-' + simple(path) + '],[data-css-' + id + '][data-simulate-' + simple(path) + ']';
      }
      return x;
    }

    // end https://github.com/j2css/j2c/blob/5d381c2d721d04b54fabe6a165d587247c3087cb/src/helpers.js#L28-L61


    function toCSS(_ref) {
      var selector = _ref.selector,
          style = _ref.style;

      var result = plugins$$1.transform({ selector: selector, style: style });
      return result.selector + '{' + (0, CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
    }

    function deconstruct(style) {
      // we can be sure it's not infinitely nested here
      var plain = void 0,
          selects = void 0,
          medias = void 0,
          supports = void 0;
      Object.keys(style).forEach(function (key) {
        if (key.indexOf('&') >= 0) {
          selects = selects || {};
          selects[key] = style[key];
        } else if (key.indexOf('@media') === 0) {
          medias = medias || {};
          medias[key] = deconstruct(style[key]);
        } else if (key.indexOf('@supports') === 0) {
          supports = supports || {};
          supports[key] = deconstruct(style[key]);
        } else if (key === 'label') {
          if (style.label.length > 0) {
            plain = plain || {};
            plain.label = hasLabels ? style.label.join('.') : '';
          }
        } else {
          plain = plain || {};
          plain[key] = style[key];
        }
      });
      return { plain: plain, selects: selects, medias: medias, supports: supports };
    }

    function deconstructedStyleToCSS(id, style) {
      var css = [];

      // plugins here
      var plain = style.plain,
          selects = style.selects,
          medias = style.medias,
          supports = style.supports;

      if (plain) {
        css.push(toCSS({ style: plain, selector: selector(id) }));
      }
      if (selects) {
        Object.keys(selects).forEach(function (key) {
          return css.push(toCSS({ style: selects[key], selector: selector(id, key) }));
        });
      }
      if (medias) {
        Object.keys(medias).forEach(function (key) {
          return css.push(key + '{' + deconstructedStyleToCSS(id, medias[key]).join('') + '}');
        });
      }
      if (supports) {
        Object.keys(supports).forEach(function (key) {
          return css.push(key + '{' + deconstructedStyleToCSS(id, supports[key]).join('') + '}');
        });
      }
      return css;
    }

    // this cache to track which rules have
    // been inserted into the stylesheet
    var inserted = styleSheet.inserted = {};

    // and helpers to insert rules into said styleSheet
    function insert(spec) {
      if (!inserted[spec.id]) {
        inserted[spec.id] = true;
        var deconstructed = deconstruct(spec.style);
        var rules = deconstructedStyleToCSS(spec.id, deconstructed);
        inserted[spec.id] = isBrowser ? true : rules;
        rules.forEach(function (cssRule) {
          return styleSheet.insert(cssRule);
        });
      }
    }

    // a simple cache to store generated rules
    var registered = styleSheet.registered = {};
    function register(spec) {
      if (!registered[spec.id]) {
        registered[spec.id] = spec;
      }
    }

    function _getRegistered(rule) {
      if (isLikeRule(rule)) {
        var ret = registered[idFor(rule)];
        if (ret == null) {
          throw new Error('[glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79');
        }
        return ret;
      }
      return rule;
    }

    // todo - perf
    var ruleCache = {};
    function toRule(spec) {
      register(spec);
      insert(spec);

      if (ruleCache[spec.id]) {
        return ruleCache[spec.id];
      }

      var ret = _defineProperty({}, 'data-css-' + spec.id, hasLabels ? spec.label || '' : '');
      Object.defineProperty(ret, 'toString', {
        enumerable: false, value: function value() {
          return 'css-' + spec.id;
        }
      });
      ruleCache[spec.id] = ret;
      return ret;
    }

    function isSelector(key) {
      var possibles = [':', '.', '[', '>', ' '],
          found = false,
          ch = key.charAt(0);
      for (var i = 0; i < possibles.length; i++) {
        if (ch === possibles[i]) {
          found = true;
          break;
        }
      }
      return found || key.indexOf('&') >= 0;
    }

    function joinSelectors(a, b) {
      var as = splitSelector(a).map(function (a) {
        return !(a.indexOf('&') >= 0) ? '&' + a : a;
      });
      var bs = splitSelector(b).map(function (b) {
        return !(b.indexOf('&') >= 0) ? '&' + b : b;
      });

      return bs.reduce(function (arr, b) {
        return arr.concat(as.map(function (a) {
          return b.replace(/\&/g, a);
        }));
      }, []).join(',');
    }

    function joinMediaQueries(a, b) {
      return a ? '@media ' + a.substring(6) + ' and ' + b.substring(6) : b;
    }

    function isMediaQuery(key) {
      return key.indexOf('@media') === 0;
    }

    function isSupports(key) {
      return key.indexOf('@supports') === 0;
    }

    function joinSupports(a, b) {
      return a ? '@supports ' + a.substring(9) + ' and ' + b.substring(9) : b;
    }

    // flatten a nested array
    function flatten(inArr) {
      var arr = [];
      for (var i = 0; i < inArr.length; i++) {
        if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]));else arr = arr.concat(inArr[i]);
      }
      return arr;
    }

    var prefixedPseudoSelectors = {
      '::placeholder': ['::-webkit-input-placeholder', '::-moz-placeholder', '::-ms-input-placeholder'],
      ':fullscreen': [':-webkit-full-screen', ':-moz-full-screen', ':-ms-fullscreen']

      // mutable! modifies dest.
    };function build(dest, _ref2) {
      var _ref2$selector = _ref2.selector,
          selector = _ref2$selector === undefined ? '' : _ref2$selector,
          _ref2$mq = _ref2.mq,
          mq = _ref2$mq === undefined ? '' : _ref2$mq,
          _ref2$supp = _ref2.supp,
          supp = _ref2$supp === undefined ? '' : _ref2$supp,
          _ref2$src = _ref2.src,
          src = _ref2$src === undefined ? {} : _ref2$src;

      if (!Array.isArray(src)) {
        src = [src];
      }
      src = flatten(src);

      src.forEach(function (_src) {
        if (isLikeRule(_src)) {
          var reg = _getRegistered(_src);
          if (reg.type !== 'css') {
            throw new Error('cannot merge this rule');
          }
          _src = reg.style;
        }
        _src = (0, _clean2.default)(_src);
        if (_src && _src.composes) {
          build(dest, { selector: selector, mq: mq, supp: supp, src: _src.composes });
        }
        Object.keys(_src || {}).forEach(function (key) {
          if (isSelector(key)) {

            if (prefixedPseudoSelectors[key]) {
              prefixedPseudoSelectors[key].forEach(function (p) {
                return build(dest, { selector: joinSelectors(selector, p), mq: mq, supp: supp, src: _src[key] });
              });
            }

            build(dest, { selector: joinSelectors(selector, key), mq: mq, supp: supp, src: _src[key] });
          } else if (isMediaQuery(key)) {
            build(dest, { selector: selector, mq: joinMediaQueries(mq, key), supp: supp, src: _src[key] });
          } else if (isSupports(key)) {
            build(dest, { selector: selector, mq: mq, supp: joinSupports(supp, key), src: _src[key] });
          } else if (key === 'composes') {
            // ignore, we already dealth with it
          } else {
            var _dest = dest;
            if (supp) {
              _dest[supp] = _dest[supp] || {};
              _dest = _dest[supp];
            }
            if (mq) {
              _dest[mq] = _dest[mq] || {};
              _dest = _dest[mq];
            }
            if (selector) {
              _dest[selector] = _dest[selector] || {};
              _dest = _dest[selector];
            }

            if (key === 'label') {
              if (hasLabels) {
                dest.label = dest.label.concat(_src.label);
              }
            } else {
              _dest[key] = _src[key];
            }
          }
        });
      });
    }

    function _css(rules) {
      var style = { label: [] };
      build(style, { src: rules }); // mutative! but worth it.

      var spec = {
        id: hashify(style),
        style: style, label: hasLabels ? style.label.join('.') : '',
        type: 'css'
      };
      return toRule(spec);
    }

    var nullrule = {
      // 'data-css-nil': ''
    };
    Object.defineProperty(nullrule, 'toString', {
      enumerable: false, value: function value() {
        return 'css-nil';
      }
    });

    var inputCaches = typeof WeakMap !== 'undefined' ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()] : [nullrule];

    var warnedWeakMapError = false;
    function multiIndexCache(fn) {
      return function (args) {
        if (inputCaches[args.length]) {
          var coi = inputCaches[args.length];
          var ctr = 0;
          while (ctr < args.length - 1) {
            if (!coi.has(args[ctr])) {
              coi.set(args[ctr], new WeakMap());
            }
            coi = coi.get(args[ctr]);
            ctr++;
          }
          if (coi.has(args[args.length - 1])) {
            var ret = coi.get(args[ctr]);

            if (registered[ret.toString().substring(4)]) {
              // make sure it hasn't been flushed
              return ret;
            }
          }
        }
        var value = fn(args);
        if (inputCaches[args.length]) {
          var _ctr = 0,
              _coi = inputCaches[args.length];
          while (_ctr < args.length - 1) {
            _coi = _coi.get(args[_ctr]);
            _ctr++;
          }
          try {
            _coi.set(args[_ctr], value);
          } catch (err) {
            if (isDev && !warnedWeakMapError) {
              var _console;

              warnedWeakMapError = true;
              (_console = console).warn.apply(_console, ['failed setting the WeakMap cache for args:'].concat(_toConsumableArray(args))); // eslint-disable-line no-console
              console.warn('this should NOT happen, please file a bug on the github repo.'); // eslint-disable-line no-console
            }
          }
        }
        return value;
      };
    }

    var cachedCss = typeof WeakMap !== 'undefined' ? multiIndexCache(_css) : _css;

    function css() {
      for (var _len2 = arguments.length, rules = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rules[_key2] = arguments[_key2];
      }

      if (rules[0] && rules[0].length && rules[0].raw) {
        throw new Error('you forgot to include glamor/babel in your babel plugins.');
      }

      rules = (0, _clean2.default)(rules);
      if (!rules) {
        return nullrule;
      }

      return cachedCss(rules);
    }

    css.insert = function (css) {
      var spec = {
        id: hashify(css),
        css: css,
        type: 'raw'
      };
      register(spec);
      if (!inserted[spec.id]) {
        styleSheet.insert(spec.css);
        inserted[spec.id] = isBrowser ? true : [spec.css];
      }
    };

    var insertRule = exports.insertRule = css.insert;

    css.global = function (selector, style) {
      style = (0, _clean2.default)(style);
      if (style) {
        return css.insert(toCSS({ selector: selector, style: style }));
      }
    };

    var insertGlobal = exports.insertGlobal = css.global;

    function insertKeyframe(spec) {
      if (!inserted[spec.id]) {
        var inner = Object.keys(spec.keyframes).map(function (kf) {
          var result = plugins$$1.keyframes.transform({ id: spec.id, name: kf, style: spec.keyframes[kf] });
          return result.name + '{' + (0, CSSPropertyOperations.createMarkupForStyles)(result.style) + '}';
        }).join('');

        var rules = ['-webkit-', '-moz-', '-o-', ''].map(function (prefix) {
          return '@' + prefix + 'keyframes ' + (spec.name + '_' + spec.id) + '{' + inner + '}';
        });
        rules.forEach(function (rule) {
          return styleSheet.insert(rule);
        });

        inserted[spec.id] = isBrowser ? true : rules;
      }
    }
    css.keyframes = function (name, kfs) {
      if (!kfs) {
        kfs = name, name = 'animation';
      }

      // do not ignore empty keyframe definitions for now.
      kfs = (0, _clean2.default)(kfs) || {};
      var spec = {
        id: hashify({ name: name, kfs: kfs }),
        type: 'keyframes',
        name: name,
        keyframes: kfs
      };
      register(spec);
      insertKeyframe(spec);
      return name + '_' + spec.id;
    };

    // we don't go all out for fonts as much, giving a simple font loading strategy
    // use a fancier lib if you need moar power
    css.fontFace = function (font) {
      font = (0, _clean2.default)(font);
      var spec = {
        id: hashify(font),
        type: 'font-face',
        font: font
      };
      register(spec);
      insertFontFace(spec);

      return font.fontFamily;
    };

    var fontFace = exports.fontFace = css.fontFace;
    var keyframes = exports.keyframes = css.keyframes;

    function insertFontFace(spec) {
      if (!inserted[spec.id]) {
        var rule = '@font-face{' + (0, CSSPropertyOperations.createMarkupForStyles)(spec.font) + '}';
        styleSheet.insert(rule);
        inserted[spec.id] = isBrowser ? true : [rule];
      }
    }

    // rehydrate the insertion cache with ids sent from
    // renderStatic / renderStaticOptimized
    function rehydrate(ids) {
      // load up ids
      (0, _objectAssign2.default)(inserted, ids.reduce(function (o, i) {
        return o[i] = true, o;
      }, {}));
      // assume css loaded separately
    }

    // clears out the cache and empties the stylesheet
    // best for tests, though there might be some value for SSR.

    function flush() {
      inserted = styleSheet.inserted = {};
      registered = styleSheet.registered = {};
      ruleCache = {};
      styleSheet.flush();
      styleSheet.inject();
    }

    var presets = exports.presets = {
      mobile: '(min-width: 400px)',
      Mobile: '@media (min-width: 400px)',
      phablet: '(min-width: 550px)',
      Phablet: '@media (min-width: 550px)',
      tablet: '(min-width: 750px)',
      Tablet: '@media (min-width: 750px)',
      desktop: '(min-width: 1000px)',
      Desktop: '@media (min-width: 1000px)',
      hd: '(min-width: 1200px)',
      Hd: '@media (min-width: 1200px)'
    };

    var style = exports.style = css;

    function select(selector) {
      for (var _len3 = arguments.length, styles = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        styles[_key3 - 1] = arguments[_key3];
      }

      if (!selector) {
        return style(styles);
      }
      return css(_defineProperty({}, selector, styles));
    }
    var $ = exports.$ = select;

    function parent(selector) {
      for (var _len4 = arguments.length, styles = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        styles[_key4 - 1] = arguments[_key4];
      }

      return css(_defineProperty({}, selector + ' &', styles));
    }

    var merge = exports.merge = css;
    var compose = exports.compose = css;

    function media(query) {
      for (var _len5 = arguments.length, rules = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        rules[_key5 - 1] = arguments[_key5];
      }

      return css(_defineProperty({}, '@media ' + query, rules));
    }

    function pseudo(selector) {
      for (var _len6 = arguments.length, styles = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        styles[_key6 - 1] = arguments[_key6];
      }

      return css(_defineProperty({}, selector, styles));
    }

    // allllll the pseudoclasses

    function active(x) {
      return pseudo(':active', x);
    }

    function any(x) {
      return pseudo(':any', x);
    }

    function checked(x) {
      return pseudo(':checked', x);
    }

    function disabled(x) {
      return pseudo(':disabled', x);
    }

    function empty(x) {
      return pseudo(':empty', x);
    }

    function enabled(x) {
      return pseudo(':enabled', x);
    }

    function _default(x) {
      return pseudo(':default', x); // note '_default' name
    }

    function first(x) {
      return pseudo(':first', x);
    }

    function firstChild(x) {
      return pseudo(':first-child', x);
    }

    function firstOfType(x) {
      return pseudo(':first-of-type', x);
    }

    function fullscreen(x) {
      return pseudo(':fullscreen', x);
    }

    function focus(x) {
      return pseudo(':focus', x);
    }

    function hover(x) {
      return pseudo(':hover', x);
    }

    function indeterminate(x) {
      return pseudo(':indeterminate', x);
    }

    function inRange(x) {
      return pseudo(':in-range', x);
    }

    function invalid(x) {
      return pseudo(':invalid', x);
    }

    function lastChild(x) {
      return pseudo(':last-child', x);
    }

    function lastOfType(x) {
      return pseudo(':last-of-type', x);
    }

    function left(x) {
      return pseudo(':left', x);
    }

    function link(x) {
      return pseudo(':link', x);
    }

    function onlyChild(x) {
      return pseudo(':only-child', x);
    }

    function onlyOfType(x) {
      return pseudo(':only-of-type', x);
    }

    function optional(x) {
      return pseudo(':optional', x);
    }

    function outOfRange(x) {
      return pseudo(':out-of-range', x);
    }

    function readOnly(x) {
      return pseudo(':read-only', x);
    }

    function readWrite(x) {
      return pseudo(':read-write', x);
    }

    function required(x) {
      return pseudo(':required', x);
    }

    function right(x) {
      return pseudo(':right', x);
    }

    function root(x) {
      return pseudo(':root', x);
    }

    function scope(x) {
      return pseudo(':scope', x);
    }

    function target(x) {
      return pseudo(':target', x);
    }

    function valid(x) {
      return pseudo(':valid', x);
    }

    function visited(x) {
      return pseudo(':visited', x);
    }

    // parameterized pseudoclasses
    function dir(p, x) {
      return pseudo(':dir(' + p + ')', x);
    }
    function lang(p, x) {
      return pseudo(':lang(' + p + ')', x);
    }
    function not(p, x) {
      // should this be a plugin?
      var selector = p.split(',').map(function (x) {
        return x.trim();
      }).map(function (x) {
        return ':not(' + x + ')';
      });
      if (selector.length === 1) {
        return pseudo(':not(' + p + ')', x);
      }
      return select(selector.join(''), x);
    }
    function nthChild(p, x) {
      return pseudo(':nth-child(' + p + ')', x);
    }
    function nthLastChild(p, x) {
      return pseudo(':nth-last-child(' + p + ')', x);
    }
    function nthLastOfType(p, x) {
      return pseudo(':nth-last-of-type(' + p + ')', x);
    }
    function nthOfType(p, x) {
      return pseudo(':nth-of-type(' + p + ')', x);
    }

    // pseudoelements
    function after(x) {
      return pseudo('::after', x);
    }
    function before(x) {
      return pseudo('::before', x);
    }
    function firstLetter(x) {
      return pseudo('::first-letter', x);
    }
    function firstLine(x) {
      return pseudo('::first-line', x);
    }
    function selection(x) {
      return pseudo('::selection', x);
    }
    function backdrop(x) {
      return pseudo('::backdrop', x);
    }
    function placeholder(x) {
      // https://github.com/threepointone/glamor/issues/14
      return css({ '::placeholder': x });
    }

    /*** helpers for web components ***/
    // https://github.com/threepointone/glamor/issues/16

    function cssFor() {
      for (var _len7 = arguments.length, rules = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        rules[_key7] = arguments[_key7];
      }

      rules = (0, _clean2.default)(rules);
      return rules ? rules.map(function (r) {
        var style = { label: [] };
        build(style, { src: r }); // mutative! but worth it.
        return deconstructedStyleToCSS(hashify(style), deconstruct(style)).join('');
      }).join('') : '';
    }

    function attribsFor() {
      for (var _len8 = arguments.length, rules = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        rules[_key8] = arguments[_key8];
      }

      rules = (0, _clean2.default)(rules);
      var htmlAttributes = rules ? rules.map(function (rule) {
        idFor(rule); // throwaway check for rule
        var key = Object.keys(rule)[0],
            value = rule[key];
        return key + '="' + (value || '') + '"';
      }).join(' ') : '';

      return htmlAttributes;
    }
  });

  var lib_18 = lib.css;

  var fadeIn = lib_18.keyframes({
    to: {
      opacity: 1
    }
  });
  var resetTransform = lib_18.keyframes({
    to: {
      transform: "none"
    }
  });
  var spin = lib_18.keyframes({
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  });

  var tinycolor = createCommonjsModule(function (module) {
    // TinyColor v1.4.1
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function (Math) {

      var trimLeft = /^\s+/,
          trimRight = /\s+$/,
          tinyCounter = 0,
          mathRound = Math.round,
          mathMin = Math.min,
          mathMax = Math.max,
          mathRandom = Math.random;

      function tinycolor(color, opts) {

        color = color ? color : '';
        opts = opts || {};

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
          return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) {
          this._r = mathRound(this._r);
        }
        if (this._g < 1) {
          this._g = mathRound(this._g);
        }
        if (this._b < 1) {
          this._b = mathRound(this._b);
        }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
      }

      tinycolor.prototype = {
        isDark: function isDark() {
          return this.getBrightness() < 128;
        },
        isLight: function isLight() {
          return !this.isDark();
        },
        isValid: function isValid() {
          return this._ok;
        },
        getOriginalInput: function getOriginalInput() {
          return this._originalInput;
        },
        getFormat: function getFormat() {
          return this._format;
        },
        getAlpha: function getAlpha() {
          return this._a;
        },
        getBrightness: function getBrightness() {
          //http://www.w3.org/TR/AERT#color-contrast
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function getLuminance() {
          //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
          var rgb = this.toRgb();
          var RsRGB, GsRGB, BsRGB, R, G, B;
          RsRGB = rgb.r / 255;
          GsRGB = rgb.g / 255;
          BsRGB = rgb.b / 255;

          if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
          } else {
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
          }
          if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
          } else {
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
          }
          if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
          } else {
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function setAlpha(value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100 * this._a) / 100;
          return this;
        },
        toHsv: function toHsv() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function toHsvString() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360),
              s = mathRound(hsv.s * 100),
              v = mathRound(hsv.v * 100);
          return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function toHsl() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function toHslString() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360),
              s = mathRound(hsl.s * 100),
              l = mathRound(hsl.l * 100);
          return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function toHex(allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function toHexString(allow3Char) {
          return '#' + this.toHex(allow3Char);
        },
        toHex8: function toHex8(allow4Char) {
          return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function toHex8String(allow4Char) {
          return '#' + this.toHex8(allow4Char);
        },
        toRgb: function toRgb() {
          return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function toRgbString() {
          return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function toPercentageRgb() {
          return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function toPercentageRgbString() {
          return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function toName() {
          if (this._a === 0) {
            return "transparent";
          }

          if (this._a < 1) {
            return false;
          }

          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function toFilter(secondColor) {
          var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? "GradientType = 1, " : "";

          if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
          }

          return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function toString(format) {
          var formatSet = !!format;
          format = format || this._format;

          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

          if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
              return this.toName();
            }
            return this.toRgbString();
          }
          if (format === "rgb") {
            formattedString = this.toRgbString();
          }
          if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
          }
          if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
          }
          if (format === "hex3") {
            formattedString = this.toHexString(true);
          }
          if (format === "hex4") {
            formattedString = this.toHex8String(true);
          }
          if (format === "hex8") {
            formattedString = this.toHex8String();
          }
          if (format === "name") {
            formattedString = this.toName();
          }
          if (format === "hsl") {
            formattedString = this.toHslString();
          }
          if (format === "hsv") {
            formattedString = this.toHsvString();
          }

          return formattedString || this.toHexString();
        },
        clone: function clone() {
          return tinycolor(this.toString());
        },

        _applyModification: function _applyModification(fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
        },
        lighten: function lighten() {
          return this._applyModification(_lighten, arguments);
        },
        brighten: function brighten() {
          return this._applyModification(_brighten, arguments);
        },
        darken: function darken() {
          return this._applyModification(_darken, arguments);
        },
        desaturate: function desaturate() {
          return this._applyModification(_desaturate, arguments);
        },
        saturate: function saturate() {
          return this._applyModification(_saturate, arguments);
        },
        greyscale: function greyscale() {
          return this._applyModification(_greyscale, arguments);
        },
        spin: function spin() {
          return this._applyModification(_spin, arguments);
        },

        _applyCombination: function _applyCombination(fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function analogous() {
          return this._applyCombination(_analogous, arguments);
        },
        complement: function complement() {
          return this._applyCombination(_complement, arguments);
        },
        monochromatic: function monochromatic() {
          return this._applyCombination(_monochromatic, arguments);
        },
        splitcomplement: function splitcomplement() {
          return this._applyCombination(_splitcomplement, arguments);
        },
        triad: function triad() {
          return this._applyCombination(_triad, arguments);
        },
        tetrad: function tetrad() {
          return this._applyCombination(_tetrad, arguments);
        }
      };

      // If input is an object, force 1 into "1.0" to handle ratios properly
      // String input requires "1.0" as input, so 1 will be treated as 1
      tinycolor.fromRatio = function (color, opts) {
        if ((typeof color === 'undefined' ? 'undefined' : _typeof2(color)) == "object") {
          var newColor = {};
          for (var i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === "a") {
                newColor[i] = color[i];
              } else {
                newColor[i] = convertToPercentage(color[i]);
              }
            }
          }
          color = newColor;
        }

        return tinycolor(color, opts);
      };

      // Given a string or object, convert that input to RGB
      // Possible string inputs:
      //
      //     "red"
      //     "#f00" or "f00"
      //     "#ff0000" or "ff0000"
      //     "#ff000000" or "ff000000"
      //     "rgb 255 0 0" or "rgb (255, 0, 0)"
      //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
      //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
      //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
      //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
      //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
      //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
      //
      function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
          color = stringInputToObject(color);
        }

        if ((typeof color === 'undefined' ? 'undefined' : _typeof2(color)) == "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
          }

          if (color.hasOwnProperty("a")) {
            a = color.a;
          }
        }

        a = boundAlpha(a);

        return {
          ok: ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a: a
        };
      }

      // Conversion Functions
      // --------------------

      // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
      // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

      // `rgbToRgb`
      // Handle bounds / percentage checking to conform to CSS color spec
      // <http://www.w3.org/TR/css3-color/>
      // *Assumes:* r, g, b in [0, 255] or [0, 1]
      // *Returns:* { r, g, b } in [0, 255]
      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }

      // `rgbToHsl`
      // Converts an RGB color value to HSL.
      // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
      // *Returns:* { h, s, l } in [0,1]
      function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            l = (max + min) / 2;

        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
              h = (b - r) / d + 2;break;
            case b:
              h = (r - g) / d + 4;break;
          }

          h /= 6;
        }

        return { h: h, s: s, l: l };
      }

      // `hslToRgb`
      // Converts an HSL color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }

        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
      }

      // `rgbToHsv`
      // Converts an RGB color value to HSV
      // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
      // *Returns:* { h, s, v } in [0,1]
      function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b),
            min = mathMin(r, g, b);
        var h,
            s,
            v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max == min) {
          h = 0; // achromatic
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
              h = (b - r) / d + 2;break;
            case b:
              h = (r - g) / d + 4;break;
          }
          h /= 6;
        }
        return { h: h, s: s, v: v };
      }

      // `hsvToRgb`
      // Converts an HSV color value to RGB.
      // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
      // *Returns:* { r, g, b } in the set [0, 255]
      function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
      }

      // `rgbToHex`
      // Converts an RGB color to hex
      // Assumes r, g, and b are contained in the set [0, 255]
      // Returns a 3 or 6 character hex
      function rgbToHex(r, g, b, allow3Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
      }

      // `rgbaToHex`
      // Converts an RGBA color plus alpha transparency to hex
      // Assumes r, g, b are contained in the set [0, 255] and
      // a in [0, 1]. Returns a 4 or 8 character rgba hex
      function rgbaToHex(r, g, b, a, allow4Char) {

        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];

        // Return a 4 character hex if possible
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }

        return hex.join("");
      }

      // `rgbaToArgbHex`
      // Converts an RGBA color to an ARGB Hex8 string
      // Rarely used, but required for "toFilter()"
      function rgbaToArgbHex(r, g, b, a) {

        var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

        return hex.join("");
      }

      // `equals`
      // Can be called with any tinycolor input
      tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) {
          return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
      };

      tinycolor.random = function () {
        return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
        });
      };

      // Modification Functions
      // ----------------------
      // Thanks to less.js for some of the basics here
      // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

      function _desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }

      function _saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }

      function _greyscale(color) {
        return tinycolor(color).desaturate(100);
      }

      function _lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }

      function _brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
      }

      function _darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }

      // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
      // Values outside of this range will be wrapped into this range.
      function _spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
      }

      // Combination Functions
      // ---------------------
      // Thanks to jQuery xColor for some of the ideas behind these
      // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

      function _complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
      }

      function _triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
      }

      function _tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
      }

      function _splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
      }

      function _analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
        }
        return ret;
      }

      function _monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h,
            s = hsv.s,
            v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
          ret.push(tinycolor({ h: h, s: s, v: v }));
          v = (v + modification) % 1;
        }

        return ret;
      }

      // Utility Functions
      // ---------------------

      tinycolor.mix = function (color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;

        var rgba = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b,
          a: (rgb2.a - rgb1.a) * p + rgb1.a
        };

        return tinycolor(rgba);
      };

      // Readability Functions
      // ---------------------
      // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

      // `contrast`
      // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
      tinycolor.readability = function (color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
      };

      // `isReadable`
      // Ensure that foreground and background color combinations meet WCAG2 guidelines.
      // The third argument is an optional Object.
      //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
      //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
      // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

      // *Example*
      //    tinycolor.isReadable("#000", "#111") => false
      //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
      tinycolor.isReadable = function (color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;

        out = false;

        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
          case "AAsmall":
          case "AAAlarge":
            out = readability >= 4.5;
            break;
          case "AAlarge":
            out = readability >= 3;
            break;
          case "AAAsmall":
            out = readability >= 7;
            break;
        }
        return out;
      };

      // `mostReadable`
      // Given a base color and a list of possible foreground or background
      // colors for that base, returns the most readable color.
      // Optionally returns Black or White if the most readable color is unreadable.
      // *Example*
      //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
      //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
      //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
      //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
      tinycolor.mostReadable = function (baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;

        for (var i = 0; i < colorList.length; i++) {
          readability = tinycolor.readability(baseColor, colorList[i]);
          if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
          }
        }

        if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
          return bestColor;
        } else {
          args.includeFallbackColors = false;
          return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
      };

      // Big List of Colors
      // ------------------
      // <http://www.w3.org/TR/css3-color/#svg-color>
      var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
      };

      // Make it easy to access colors via `hexNames[hex]`
      var hexNames = tinycolor.hexNames = flip(names);

      // Utilities
      // ---------

      // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
      function flip(o) {
        var flipped = {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }
        return flipped;
      }

      // Return a valid alpha value [0,1] with all invalid values being set to 1
      function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }

        return a;
      }

      // Take input from [0, n] and return it as [0, 1]
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = "100%";
        }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) {
          return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return n % max / parseFloat(max);
      }

      // Force a number between 0 and 1
      function clamp01(val) {
        return mathMin(1, mathMax(0, val));
      }

      // Parse a base-16 hex value into a base-10 integer
      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }

      // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
      // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
      function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
      }

      // Check to see if string passed in is a percentage
      function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
      }

      // Force a hex value to have 2 characters
      function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
      }

      // Replace a decimal with it's percentage value
      function convertToPercentage(n) {
        if (n <= 1) {
          n = n * 100 + "%";
        }

        return n;
      }

      // Converts a decimal to a hex value
      function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
      }
      // Converts a hex value to a decimal
      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }

      var matchers = function () {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
          CSS_UNIT: new RegExp(CSS_UNIT),
          rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
          rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
          hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
          hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
          hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
          hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
          hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
      }();

      // `isValidCSSUnit`
      // Take in a single string / number and check to see if it looks like a CSS unit
      // (see `matchers` above for definition).
      function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
      }

      // `stringInputToObject`
      // Permissive string parsing.  Take in a number of formats, and output an object
      // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
      function stringInputToObject(color) {

        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color == 'transparent') {
          return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if (match = matchers.rgb.exec(color)) {
          return { r: match[1], g: match[2], b: match[3] };
        }
        if (match = matchers.rgba.exec(color)) {
          return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if (match = matchers.hsl.exec(color)) {
          return { h: match[1], s: match[2], l: match[3] };
        }
        if (match = matchers.hsla.exec(color)) {
          return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if (match = matchers.hsv.exec(color)) {
          return { h: match[1], s: match[2], v: match[3] };
        }
        if (match = matchers.hsva.exec(color)) {
          return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if (match = matchers.hex8.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex6.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
          };
        }
        if (match = matchers.hex4.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex3.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
          };
        }

        return false;
      }

      function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || { "level": "AA", "size": "small" };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
          level = "AA";
        }
        if (size !== "small" && size !== "large") {
          size = "small";
        }
        return { "level": level, "size": size };
      }

      // Node: Export function
      if ('object' !== "undefined" && module.exports) {
        module.exports = tinycolor;
      }
      // AMD/requirejs: Define the module
      else if (typeof undefined === 'function' && undefined.amd) {
          undefined(function () {
            return tinycolor;
          });
        }
        // Browser: Expose to window
        else {
            window.tinycolor = tinycolor;
          }
    })(Math);
  });

  var hexOrColor = function hexOrColor(color) {
    /*
      Allow for named colors from the theme, AND hex codes.
      Test for #f00b4r, or just #foo. If it doesn't match,
      check for a named color in the theme.
    */
    var hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
        isColorACodeOrHex = hexRegEx.test(color);

    return function (fallback) {
      return isColorACodeOrHex ? color : fallback;
    };
  };
  var readableTextColor = function readableTextColor(background) {
    return function (workingColors) {
      return tinycolor.mostReadable(background, workingColors).toHexString();
    };
  };
  var darken = function darken(color) {
    return function (percentage) {
      return tinycolor(color).darken(percentage).toString();
    };
  };

  exports.fadeIn = fadeIn;
  exports.resetTransform = resetTransform;
  exports.spin = spin;
  exports.hexOrColor = hexOrColor;
  exports.readableTextColor = readableTextColor;
  exports.darken = darken;
});

unwrapExports$1(utils);
var utils_1 = utils.fadeIn;
var utils_2 = utils.resetTransform;
var utils_3 = utils.spin;
var utils_4 = utils.hexOrColor;
var utils_5 = utils.readableTextColor;
var utils_6 = utils.darken;

var HeaderItem = function HeaderItem(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick;
  return _react__default.createElement(
    "div",
    { tabIndex: "-1", role: "button", onClick: onClick, className: className },
    children
  );
};
var style$2 = function style(_ref2) {
  var theme = _ref2.theme,
      active = _ref2.active;

  var opacity = 0.1,
      activeBackground = "rgba(0, 0, 0, " + opacity * 2 + ")";

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: (theme.spacing ? theme.spacing / 4 : 4) + "px " + (theme.spacing ? theme.spacing / 2 : 8) + "px",
    minHeight: 32,
    borderRadius: 2,
    cursor: "pointer",
    transition: ".1s background-color ease, .05s transform ease",
    userSelect: "none",
    backgroundColor: active ? activeBackground : "transparent",

    ":hover": {
      backgroundColor: "rgba(0, 0, 0, " + opacity + ")"
    },

    ":not(.active):active": {
      transform: "scale(0.95)",
      backgroundColor: "rgba(0, 0, 0, " + opacity * 2 + ")"
    },

    "&.active": {
      backgroundColor: activeBackground
    },

    "& + &": {
      marginLeft: theme.spacing && theme.spacing / 2
    },

    "& > svg": {
      width: 16,
      marginRight: theme.spacing && theme.spacing / 2
    }
  };
};

var HeaderItem$1 = glamorous(HeaderItem)(style$2);

var HeaderTitle = function HeaderTitle(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className },
    children
  );
};
var style$3 = function style(_ref2) {
  var theme = _ref2.theme;
  return {
    marginRight: theme.spacing,
    fontSize: "1.7rem",
    fontWeight: 600
  };
};

var HeaderTitle$1 = glamorous(HeaderTitle)(style$3);

var HeaderSeparator = function HeaderSeparator(_ref) {
  var className = _ref.className;
  return _react__default.createElement("div", { className: className });
};
var style$4 = function style(_ref2) {
  var theme = _ref2.theme;
  return {
    width: 5,
    height: 5,
    margin: "0 " + theme.spacing + "px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  };
};

var HeaderSeparator$1 = glamorous(HeaderSeparator)(style$4);

var Header = function Header(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className },
    children
  );
};
var style = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;

  var backgroundColor = color ? utils_4(color)(theme.colors ? theme.colors[color] : "white") : "white";

  return {
    display: "flex",
    minHeight: 50,
    alignItems: "center",
    padding: theme.spacing / 2 + "px " + theme.spacing + "px",
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"])
  };
};

var Header$1 = glamorous(Header)(style);

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getTooltipPosition = function getTooltipPosition(anchor) {
  var position = {};
  switch (anchor) {
    case "bottom":
      position.bottom = 0;
      break;
    default:
      position.top = "50%";
      position.transform = "translateY(-50%)";
      break;
  }
  return position;
};
var getCaretPosition = function getCaretPosition(anchor) {
  return function (theme) {
    var size = 5,
        caret = { left: size * -2, borderWidth: size };

    switch (anchor) {
      case "bottom":
        caret.bottom = theme.spacing;
        break;
      case "middle":
      default:
        caret.top = "50%";
        caret.transform = "translateY(-50%)";
        break;
    }
    return caret;
  };
};

var style$7 = (function (_ref) {
  var theme = _ref.theme,
      color = _ref.color,
      anchor = _ref.anchor;

  var backgroundColor = color ? utils_4(color)(theme.colors && theme.colors[color]) : "black";

  return _extends$3({
    position: "absolute"
  }, getTooltipPosition(anchor), {
    left: "calc(100% + " + (theme.spacing || 0) + "px)",
    zIndex: (theme.baseZIndex || 0) + 1000,
    width: "fit-content",
    maxWidth: 200,
    opacity: 0, // Initially, they're hidden...
    transition: ".07s opacity ease", // ...for 0.07 seconds.
    padding: theme.spacing ? theme.spacing / 2 : 8,
    borderRadius: 4,
    wordWrap: "break-word",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),

    // This pseudo-element extends the clickable area of the far-away tooltip.
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: theme.spacing && theme.spacing * -2,
      display: "block",
      width: theme.spacing && theme.spacing * 2,
      height: "100%"
    },

    // They say behind every great tooltip is a great caret.
    "&::before": _extends$3({
      content: "''",
      position: "absolute"
    }, getCaretPosition(anchor || "top")(theme), {
      zIndex: (theme.baseZIndex || 0) * -1,
      width: 0,
      height: 0,
      borderColor: "transparent",
      borderStyle: "solid",
      borderRightColor: backgroundColor
    }),

    "&.active": {
      opacity: 1
    }
  });
});

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  The <Tooltip /> component.

  The problem:
  Say you have a container with `overflow: hidden`.
  Say this container has items that need to show tooltips, that appear
  _outside_ of page flow, and are not clipped by the overflow.

  The solution is to use `position: fixed`, with dynamically calculated
  positions at the time of mounting, but React makes this a little
  tricky, especially if you want a simple API.

  This solution:
  A tooltip is placed in an absolute position, relative to its parent,
  even risking getting cut off to overflow.

  At the time of mounting, this _perfect_ position of the tooltip is captured
  relative to `document`. These coordinates are then set as CSS properties
  on the tooltip, along with `position: fixed` and all is well with the
  world. 🌈
*/
var Tooltip = function (_Component) {
  _inherits$1(Tooltip, _Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$1(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$1(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = { position: {} }, _temp), _possibleConstructorReturn$1(_this, _ret);
  }

  _createClass$1(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var position = this.getPosition();
      this.setState(function () {
        return {
          position: position
        };
      });
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var rect = this.tooltip.getBoundingClientRect(),
          top = rect.top,

      /**
      The following style properties can only properly be set
      after the component mounts.
       Please read the description of this component at the top of the file
      if you haven't already to find out why.
      */position = {
        position: "fixed",
        transform: "none",
        top: top,
        left: rect && rect.left || 0
      };
      if (this.props.anchor === "bottom") {
        position.bottom = "auto";
      }
      return position;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react__default.createElement(
        "div",
        {
          ref: function ref(tooltip) {
            return _this2.tooltip = tooltip || document.createElement("div");
          },
          className: this.props.className + " Tooltip" + (this.props.active ? " active" : ""),
          style: this.state.position
        },
        this.props.children ? this.props.children : ""
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.defaultProps = {
  anchor: "top",
  active: false
};

var Tooltip$1 = glamorous(Tooltip)(style$7);
 // for testing.

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  A simple Higher-Order Component (HOC) that you can wrap with any custom
  component in order to make it Tooltippable. This should JustWork™.

  USAGE:
  import withTooltip from './withTooltip'
  const MyComponentWithTooltip = withTooltip(MyComponent)
  <MyComponentWithTooltip
    tooltip={<div>ANYTHING</div>}
    tooltipAnchor={'top'||'bottom'}
  />
*/

var withTooltip = function withTooltip(InputComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        isTooltipActive: false
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
      key: "showTooltip",
      value: function showTooltip() {
        this.setState(function () {
          return { isTooltipActive: true };
        });
      }
    }, {
      key: "hideTooltip",
      value: function hideTooltip() {
        this.setState(function () {
          return { isTooltipActive: false };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return _react__default.createElement(
          InputComponent,
          _extends$2({}, this.props, {
            onMouseEnter: function onMouseEnter() {
              return _this2.showTooltip();
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hideTooltip();
            },
            role: this.props.role || "status",
            tabIndex: this.props.tabIndex || -1
          }),
          this.props.children ? this.props.children : "",
          this.props.tooltip && this.state.isTooltipActive ? _react__default.createElement(
            Tooltip$1,
            { active: true, color: this.props.tooltipColor, anchor: this.props.tooltipAnchor },
            this.props.tooltip
          ) : ""
        );
      }
    }]);

    return _class;
  }(_react.Component), _class.defaultProps = {
    tooltipAnchor: "top"
  }, _temp2;
};

var SideNavigationItem = function SideNavigationItem(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick;
  return _react__default.createElement(
    "div",
    { className: className + " SideNavigationItem", onClick: onClick, role: "button", tabIndex: "-1" },
    children
  );
};
var style$6 = function style(_ref2) {
  var theme = _ref2.theme;
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    cursor: "pointer",

    "&_has-tooltip + &_has-tooltip ": {
      marginTop: theme.spacing ? theme.spacing * 2 : 16
    },

    ":first-child": {
      marginTop: 0,
      marginBottom: theme.spacing ? theme.spacing * 2 : 16
    }
  };
};

var SideNavigationItem$1 = glamorous(withTooltip(SideNavigationItem))(style$6);

var SideNavigationLink = function SideNavigationLink(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick;
  return _react__default.createElement(
    "div",
    { className: className, onClick: onClick, role: "button", tabIndex: "-1" },
    children
  );
};
var style$8 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;

  var backgroundColor = color ? utils_4(color)(theme.colors[color]) : theme.greys && theme.greys["100"];

  return {
    position: "relative",
    zIndex: (theme.baseZIndex || 0) + 1,
    margin: "0 " + theme.spacing * -0.5 + "px",
    padding: theme.spacing + "px",
    minWidth: 200,
    borderRadius: 2,
    transition: ".1s background-color ease",
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),

    "& + &": {
      borderTop: "1px solid " + (theme.greys && theme.greys["100"])
    },

    ":hover": {
      backgroundColor: utils_6(backgroundColor)(10)
    },

    ":first-child": {
      marginTop: theme.spacing * -0.5 + "px"
    },

    ":last-child": {
      marginBottom: theme.spacing * -0.5 + "px"
    }
  };
};

var SideNavigationLink$1 = glamorous(SideNavigationLink)(style$8);
 // for testing.

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var SideNavigation = function SideNavigation(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className },
    children
  );
};
var style$5 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      fix = _ref2.fix,
      expandOnHover = _ref2.expandOnHover,
      _ref2$expandedWidth = _ref2.expandedWidth,
      expandedWidth = _ref2$expandedWidth === undefined ? 280 : _ref2$expandedWidth,
      _ref2$width = _ref2.width,
      width = _ref2$width === undefined ? 64 : _ref2$width;

  var backgroundColor = color ? utils_4(color)(theme.colors ? theme.colors[color] : "white") : theme.colors && theme.colors.primary,
      hoverWidth = expandOnHover ? {
    transition: ".3s width ease",
    willChange: "width",
    "&:hover": {
      width: expandedWidth
    },
    "&:hover .Tooltip": {
      display: "none"
    }
  } : {};

  return _extends$1({
    position: fix ? "fixed" : "relative",
    zIndex: (theme.baseZIndex || 0) + 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: width,
    height: "100vh",
    overflow: "hidden",
    padding: theme.spacing * 1.3 || 0,
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"])
  }, hoverWidth);
};

SideNavigation.defaultProps = {
  expandOnHover: false,
  expandedWidth: 280,
  width: 64,
  fix: false
};

var SideNavigation$1 = glamorous(SideNavigation)(style$5);

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var style$10 = (function (_ref) {
  var theme = _ref.theme,
      children = _ref.children;

  // If we have children, style a caret.
  var caret = children ? {
    content: "\"\"",
    display: "block",
    width: 0,
    height: 0,
    marginLeft: "auto",
    border: "4px solid transparent",
    borderLeftColor: theme.greys ? theme.greys["30"] : "#ccc",
    transition: ".15s transform ease"
  } : {};

  return {
    position: "relative",

    "& .header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: theme.spacing >= 0 ? theme.spacing / 2 : 8,
      borderTop: "1px solid",
      borderTopColor: theme.greys ? theme.greys["20"] : "#eee",
      cursor: "pointer",
      backgroundColor: theme.greys ? theme.greys.white : "white"
    },

    "& .header:hover": {
      backgroundColor: theme.greys && theme.greys["10"]
    },

    "&.open .header": {
      borderBottom: "1px solid",
      borderBottomColor: theme.greys ? theme.greys["30"] : "#ccc"
    },

    // Caret styles begin here.
    "& .header::after": _extends$4({}, caret),

    "&.open .header.open::after": {
      // rotate the caret to face down when an item is open.
      transform: "translateX(-2px) rotate(90deg)"
    },

    // Spinner for async items replaces a caret.
    "&.updating .header::after": {
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: "1px 0px 0px 0px " + (theme.greys ? theme.greys["70"] : "#666") + " inset",
      animation: ".7s " + utils_3 + " linear infinite"
    },

    "& .content": {
      position: "relative",
      paddingLeft: theme.spacing
    },

    // This pseudo-element creates a visible indent for structure clarity.
    "& .content::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: theme.spacing,
      height: "100%",
      borderRight: "1px solid " + (theme.greys ? theme.greys["30"] : "#ccc"),
      backgroundColor: theme.greys ? theme.greys["10"] : "#eee"
    }
  };
});

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarItem = function (_Component) {
  _inherits$2(SidebarItem, _Component);

  function SidebarItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$2(this, SidebarItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, (_ref = SidebarItem.__proto__ || Object.getPrototypeOf(SidebarItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: _this.props && _this.props.open,
      updating: false
    }, _temp), _possibleConstructorReturn$2(_this, _ret);
  }

  _createClass$2(SidebarItem, [{
    key: "toggle",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.props.children) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                this.setState(function () {
                  return { updating: true };
                });
                // If it is closed,

                if (!(this.props.onClick && !this.state.open)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return this.props.onClick();

              case 6:
                this.setState(function (prevState) {
                  return {
                    open: !prevState.open,
                    updating: false
                  };
                });
                return _context.abrupt("return", true);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggle() {
        return _ref2.apply(this, arguments);
      }

      return toggle;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      /**
        Only the header should have a tooltip, else the tooltip will show
        even when the cursor is over the children... who may also have their
        own tooltips.
      */
      var HeaderWithTooltip = withTooltip(Div);
      return _react__default.createElement(
        "div",
        {
          className: this.props.className + " " + (this.state.updating ? "updating" : "") + " " + (this.state.open ? "open" : "")
        },
        _react__default.createElement(
          HeaderWithTooltip,
          {
            className: "header " + (this.state.open ? "open" : ""),
            tooltip: this.props.tooltip,
            onClick: function onClick() {
              return _this2.toggle();
            }
          },
          this.props.label
        ),
        this.state.open ? _react__default.createElement(
          "div",
          { className: "content" },
          this.props.children
        ) : ""
      );
    }
  }]);

  return SidebarItem;
}(_react.Component);

SidebarItem.defaultProps = {
  children: "",
  open: false,
  tooltip: false
};


var SidebarItem$1 = glamorous(SidebarItem)(style$10);

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning$1 = function() {};

if (__DEV__) {
  warning$1 = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

var warning_1$3 = warning$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1$1 = invariant;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant$1 = invariant_1$1;
  var warning$3 = warning_1$1;
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        warning$3(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$3(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';








var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1$1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1$1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning_1$1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning_1$1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1$1(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';





var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1$1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule$1(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant$3 = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1$3 = invariant$3;

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}



var resolvePathname$2 = Object.freeze({
	default: resolvePathname
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}



var valueEqual$2 = Object.freeze({
	default: valueEqual
});

var PathUtils$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};
});

unwrapExports$1(PathUtils$1);
var PathUtils_1 = PathUtils$1.addLeadingSlash;
var PathUtils_6 = PathUtils$1.parsePath;
var PathUtils_7 = PathUtils$1.createPath;

var _resolvePathname = ( resolvePathname$2 && resolvePathname ) || resolvePathname$2;

var _valueEqual = ( valueEqual$2 && valueEqual ) || valueEqual$2;

var LocationUtils = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _resolvePathname2 = _interopRequireDefault(_resolvePathname);



var _valueEqual2 = _interopRequireDefault(_valueEqual);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, PathUtils$1.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};
});

unwrapExports$1(LocationUtils);

var createTransitionManager_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;



var _warning2 = _interopRequireDefault(warning_1$3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;
});

unwrapExports$1(createTransitionManager_1);

var DOMUtils = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};
});

unwrapExports$1(DOMUtils);

var createBrowserHistory_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _warning2 = _interopRequireDefault(warning_1$3);



var _invariant2 = _interopRequireDefault(invariant_1$3);







var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, PathUtils$1.stripTrailingSlash)((0, PathUtils$1.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    (0, _warning2.default)(!basename || (0, PathUtils$1.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, PathUtils$1.stripBasename)(path, basename);

    return (0, LocationUtils.createLocation)(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, PathUtils$1.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;
});

var createHistory = unwrapExports$1(createBrowserHistory_1);

var _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for putting history on context.
 */

var Router$1 = function (_React$Component) {
  _inherits$4(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck$4(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$4(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn$4(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends$6({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;


    invariant_1$3(children == null || _react__default.Children.count(children) === 1, 'A <Router> may have only one child element');

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning_1$3(this.props.history === nextProps.history, 'You cannot change <Router history>');
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? _react__default.Children.only(children) : null;
  };

  return Router;
}(_react__default.Component);

Router$1.propTypes = {
  history: propTypes.object.isRequired,
  children: propTypes.node
};
Router$1.contextTypes = {
  router: propTypes.object
};
Router$1.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits$3(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck$3(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$3(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createHistory(_this.props), _temp), _possibleConstructorReturn$3(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$3(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
  };

  BrowserRouter.prototype.render = function render() {
    return _react__default.createElement(Router$1, { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(_react__default.Component);

BrowserRouter.propTypes = {
  basename: propTypes.string,
  forceRefresh: propTypes.bool,
  getUserConfirmation: propTypes.func,
  keyLength: propTypes.number,
  children: propTypes.node
};

var createHashHistory_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _warning2 = _interopRequireDefault(warning_1$3);



var _invariant2 = _interopRequireDefault(invariant_1$3);







var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, PathUtils$1.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: PathUtils$1.stripLeadingSlash,
    decodePath: PathUtils$1.addLeadingSlash
  },
  slash: {
    encodePath: PathUtils$1.addLeadingSlash,
    decodePath: PathUtils$1.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, PathUtils$1.stripTrailingSlash)((0, PathUtils$1.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, PathUtils$1.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, PathUtils$1.stripBasename)(path, basename);

    return (0, LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, PathUtils$1.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, PathUtils$1.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, PathUtils$1.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, PathUtils$1.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, PathUtils$1.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, PathUtils$1.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, PathUtils$1.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, PathUtils$1.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, PathUtils$1.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;
});

var createHistory$1 = unwrapExports$1(createHashHistory_1);

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits$5(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck$5(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$5(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createHistory$1(_this.props), _temp), _possibleConstructorReturn$5(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$3(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
  };

  HashRouter.prototype.render = function render() {
    return _react__default.createElement(Router$1, { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(_react__default.Component);

HashRouter.propTypes = {
  basename: propTypes.string,
  getUserConfirmation: propTypes.func,
  hashType: propTypes.oneOf(['hashbang', 'noslash', 'slash']),
  children: propTypes.node
};

var _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link$1 = function (_React$Component) {
  _inherits$6(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck$6(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$6(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn$6(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ['replace', 'to', 'innerRef']); // eslint-disable-line no-unused-vars

    invariant_1$3(this.context.router, 'You should not use <Link> outside a <Router>');

    var href = this.context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);

    return _react__default.createElement('a', _extends$7({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(_react__default.Component);

Link$1.propTypes = {
  onClick: propTypes.func,
  target: propTypes.string,
  replace: propTypes.bool,
  to: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
  innerRef: propTypes.oneOfType([propTypes.string, propTypes.func])
};
Link$1.defaultProps = {
  replace: false
};
Link$1.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      push: propTypes.func.isRequired,
      replace: propTypes.func.isRequired,
      createHref: propTypes.func.isRequired
    }).isRequired
  }).isRequired
};

var createMemoryHistory_1 = createCommonjsModule$1(function (module, exports) {
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _warning2 = _interopRequireDefault(warning_1$3);







var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? (0, LocationUtils.createLocation)(entry, undefined, createKey()) : (0, LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = PathUtils$1.createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;
});

var createHistory$2 = unwrapExports$1(createMemoryHistory_1);

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter$1 = function (_React$Component) {
  _inherits$7(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck$7(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$7(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createHistory$2(_this.props), _temp), _possibleConstructorReturn$7(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$3(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
  };

  MemoryRouter.prototype.render = function render() {
    return _react__default.createElement(Router$1, { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(_react__default.Component);

MemoryRouter$1.propTypes = {
  initialEntries: propTypes.array,
  initialIndex: propTypes.number,
  getUserConfirmation: propTypes.func,
  keyLength: propTypes.number,
  children: propTypes.node
};

// Written in this round about way for babel-transform-imports

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1$1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1$1.parse = parse_1;
pathToRegexp_1$1.compile = compile_1;
pathToRegexp_1$1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1$1.tokensToRegExp = tokensToRegExp_1;

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = pathToRegexp_1$1(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof options === 'string') options = { path: options };

  var _options = options,
      _options$path = _options.path,
      path = _options$path === undefined ? '/' : _options$path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

var _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isEmptyChildren = function isEmptyChildren(children) {
  return _react__default.Children.count(children) === 0;
};

/**
 * The public API for matching a single path and rendering.
 */

var Route$1 = function (_React$Component) {
  _inherits$8(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck$8(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$8(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn$8(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends$9({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    invariant_1$3(router, 'You should not use <Route> or withRouter() outside a <Router>');

    var route = router.route;

    var pathname = (location || route.location).pathname;

    return path ? matchPath(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }) : route.match;
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    warning_1$3(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');

    warning_1$3(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');

    warning_1$3(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    warning_1$3(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning_1$3(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    return component ? // component prop gets first priority, only called if there's a match
    match ? _react__default.createElement(component, props) : null : render ? // render prop is next, only called if there's a match
    match ? render(props) : null : children ? // children come last, always called
    typeof children === 'function' ? children(props) : !isEmptyChildren(children) ? _react__default.Children.only(children) : null : null;
  };

  return Route;
}(_react__default.Component);

Route$1.propTypes = {
  computedMatch: propTypes.object, // private, from <Switch>
  path: propTypes.string,
  exact: propTypes.bool,
  strict: propTypes.bool,
  sensitive: propTypes.bool,
  component: propTypes.func,
  render: propTypes.func,
  children: propTypes.oneOfType([propTypes.func, propTypes.node]),
  location: propTypes.object
};
Route$1.contextTypes = {
  router: propTypes.shape({
    history: propTypes.object.isRequired,
    route: propTypes.object.isRequired,
    staticContext: propTypes.object
  })
};
Route$1.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

var _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties$1(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref.ariaCurrent,
      rest = _objectWithoutProperties$1(_ref, ['to', 'exact', 'strict', 'location', 'activeClassName', 'className', 'activeStyle', 'style', 'isActive', 'ariaCurrent']);

  return _react__default.createElement(Route$1, {
    path: (typeof to === 'undefined' ? 'undefined' : _typeof$1(to)) === 'object' ? to.pathname : to,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return _react__default.createElement(Link$1, _extends$8({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(' ') : className,
        style: isActive ? _extends$8({}, style, activeStyle) : style,
        'aria-current': isActive && ariaCurrent
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: Link$1.propTypes.to,
  exact: propTypes.bool,
  strict: propTypes.bool,
  location: propTypes.object,
  activeClassName: propTypes.string,
  className: propTypes.string,
  activeStyle: propTypes.object,
  style: propTypes.object,
  isActive: propTypes.func,
  ariaCurrent: propTypes.oneOf(['page', 'step', 'location', 'true'])
};

NavLink.defaultProps = {
  activeClassName: 'active',
  ariaCurrent: 'true'
};

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt$1 = function (_React$Component) {
  _inherits$9(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck$9(this, Prompt);

    return _possibleConstructorReturn$9(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    invariant_1$3(this.context.router, 'You should not use <Prompt> outside a <Router>');

    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(_react__default.Component);

Prompt$1.propTypes = {
  when: propTypes.bool,
  message: propTypes.oneOfType([propTypes.func, propTypes.string]).isRequired
};
Prompt$1.defaultProps = {
  when: true
};
Prompt$1.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      block: propTypes.func.isRequired
    }).isRequired
  }).isRequired
};

// Written in this round about way for babel-transform-imports

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var _extends$11 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends$11({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
};

// eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */


/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */


/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */


/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$10(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$10(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect$1 = function (_React$Component) {
  _inherits$10(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck$10(this, Redirect);

    return _possibleConstructorReturn$10(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    invariant_1$3(this.context.router, 'You should not use <Redirect> outside a <Router>');

    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = createLocation(prevProps.to);
    var nextTo = createLocation(this.props.to);

    if (locationsAreEqual(prevTo, nextTo)) {
      warning_1$3(false, 'You tried to redirect to the same route you\'re currently on: ' + ('"' + nextTo.pathname + nextTo.search + '"'));
      return;
    }

    this.perform();
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var _props = this.props,
        push = _props.push,
        to = _props.to;


    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(_react__default.Component);

Redirect$1.propTypes = {
  push: propTypes.bool,
  from: propTypes.string,
  to: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired
};
Redirect$1.defaultProps = {
  push: false
};
Redirect$1.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      push: propTypes.func.isRequired,
      replace: propTypes.func.isRequired
    }).isRequired,
    staticContext: propTypes.object
  }).isRequired
};

// Written in this round about way for babel-transform-imports

var _extends$14 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$2(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$11(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$11(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var normalizeLocation = function normalizeLocation(object) {
  var _object$pathname = object.pathname,
      pathname = _object$pathname === undefined ? '/' : _object$pathname,
      _object$search = object.search,
      search = _object$search === undefined ? '' : _object$search,
      _object$hash = object.hash,
      hash = _object$hash === undefined ? '' : _object$hash;


  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends$14({}, location, {
    pathname: PathUtils_1(basename) + location.pathname
  });
};

var stripBasename$1 = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = PathUtils_1(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends$14({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createLocation$1 = function createLocation(location) {
  return typeof location === 'string' ? PathUtils_6(location) : normalizeLocation(location);
};

var createURL = function createURL(location) {
  return typeof location === 'string' ? location : PathUtils_7(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    invariant_1$3(false, 'You cannot %s with <StaticRouter>', methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter$1 = function (_React$Component) {
  _inherits$11(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck$11(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$11(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return PathUtils_1(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = 'PUSH';
      context.location = addBasename(basename, createLocation$1(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = 'REPLACE';
      context.location = addBasename(basename, createLocation$1(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn$11(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$3(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties$2(_props, ['basename', 'context', 'location']);

    var history = {
      createHref: this.createHref,
      action: 'POP',
      location: stripBasename$1(basename, createLocation$1(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler('go'),
      goBack: staticHandler('goBack'),
      goForward: staticHandler('goForward'),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return _react__default.createElement(Router$1, _extends$14({}, props, { history: history }));
  };

  return StaticRouter;
}(_react__default.Component);

StaticRouter$1.propTypes = {
  basename: propTypes.string,
  context: propTypes.object.isRequired,
  location: propTypes.oneOfType([propTypes.string, propTypes.object])
};
StaticRouter$1.defaultProps = {
  basename: '',
  location: '/'
};
StaticRouter$1.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

function _classCallCheck$12(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$12(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$12(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch$2 = function (_React$Component) {
  _inherits$12(Switch, _React$Component);

  function Switch() {
    _classCallCheck$12(this, Switch);

    return _possibleConstructorReturn$12(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    invariant_1$3(this.context.router, 'You should not use <Switch> outside a <Router>');
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning_1$3(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning_1$3(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    _react__default.Children.forEach(children, function (element) {
      if (!_react__default.isValidElement(element)) return;

      var _element$props = element.props,
          pathProp = _element$props.path,
          exact = _element$props.exact,
          strict = _element$props.strict,
          sensitive = _element$props.sensitive,
          from = _element$props.from;

      var path = pathProp || from;

      if (match == null) {
        child = element;
        match = path ? matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }) : route.match;
      }
    });

    return match ? _react__default.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(_react__default.Component);

Switch$2.contextTypes = {
  router: propTypes.shape({
    route: propTypes.object.isRequired
  }).isRequired
};
Switch$2.propTypes = {
  children: propTypes.node,
  location: propTypes.object
};

// Written in this round about way for babel-transform-imports

// Written in this round about way for babel-transform-imports

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

// Written in this round about way for babel-transform-imports

var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var SidebarLink = function SidebarLink(_ref) {
  var className = _ref.className,
      children = _ref.children,
      to = _ref.to,
      onClick = _ref.onClick,
      symbol = _ref.symbol;

  var Component$$1 = Div; // By default, use a standard styled div.

  // if this is expected to work with react-router,
  if (to) {
    Component$$1 = Link$1; // use a <Link /> since it supports props.to.
  }

  return _react__default.createElement(
    Component$$1,
    { to: to ? to : "", onClick: onClick, className: className + " SideNavigationLink" },
    children,
    symbol ? _react__default.createElement(
      "div",
      { className: "symbol" },
      symbol
    ) : ""
  );
};
var style$11 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      disabled = _ref2.disabled;

  var backgroundColor = color ? utils_4(color)(theme.colors && theme.colors[color]) : "#fff",
      textColor = utils_5(backgroundColor)(["black", "white"]),
      disabledStyle = disabled ? { opacity: 0.25 } : { opacity: 1 };

  return _extends$5({
    position: "relative",
    display: "flex",
    padding: theme.spacing >= 0 ? theme.spacing / 2 : 8,
    transition: "background-color .1s ease",
    cursor: "pointer",

    // react-router <Link /> wraps an <a> which can be underlined by default so
    textDecoration: "none",

    color: textColor,
    backgroundColor: backgroundColor
  }, disabledStyle, {

    "&:link, &:visited": {
      color: textColor
    },

    "&.SideNavigationLink + .SideNavigationLink": {
      borderTop: "1px solid #eee"
    },

    ":hover": {
      backgroundColor: utils_6(backgroundColor)(5),

      // The text color needs to change too if it gets too dark 😁
      // Also, here's a prime benefit of functional JS: function composition!
      color: utils_5(utils_6(backgroundColor)(5))(["black", "white"])
    },
    // Symbol goes on the right.
    "& > .symbol": {
      marginLeft: "auto"
    }
  });
};
var SidebarLink$1 = glamorous(withTooltip(SidebarLink))(style$11);

var Sidebar = function Sidebar(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className },
    children
  );
};
var style$9 = function style(_ref2) {
  var theme = _ref2.theme;
  return {
    width: "100%",
    maxWidth: 280,
    maxHeight: "100%",
    borderRadius: 2,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    scrollBehavior: "smooth", // future-proof
    backgroundColor: theme.greys && theme.greys.white
  };
};

var Sidebar$1 = glamorous(Sidebar)(style$9);

var Button$1 = function Button$$1(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      onClick = _ref.onClick,
      children = _ref.children,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === undefined ? [] : _ref$modifiers;
  return _react__default.createElement(
    "div",
    {
      tabIndex: "-1",
      role: "button",
      className: className + " Button" + modifiers.map(function (mod) {
        return (modifiers.length > 0 ? " " : "") + "Button_" + mod;
      }).join(" "),
      onClick: onClick
    },
    children
  );
};
var style$12 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      active = _ref2.active;

  var backgroundColor = color ? utils_4(color)(theme.colors ? theme.colors[color] : "white") : "white",
      activeBackgroundColor = utils_6(backgroundColor)(5),
      textColor = utils_5(backgroundColor)(["black", "white"]),
      activeBoxShadow = "2px 2px 4px rgba(0, 0, 0, 0.14) inset";

  return {
    display: "inline-block",
    padding: theme.spacing ? theme.spacing / 2 : 8,
    border: "1px solid rgba(0, 0, 0, .2)",
    cursor: "pointer",
    boxShadow: active ? activeBoxShadow : "none",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,
    color: textColor,

    ":hover": {
      backgroundColor: activeBackgroundColor,
      color: utils_5(activeBackgroundColor)(["white", "black"])
    },

    ":active": {
      boxShadow: activeBoxShadow
    },

    "&.Button_group": {
      marginLeft: -1
    },

    "&.Button_space": {
      marginLeft: theme.spacing ? theme.spacing / 2 : 8
    }
  };
};

var Button$2 = glamorous(Button$1)(style$12);

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1$2 = ReactPropTypesSecret$3;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant$5 = invariant_1$1;
  var warning$4 = warning_1$1;
  var ReactPropTypesSecret$4 = ReactPropTypesSecret_1$2;
  var loggedTypeFailures$1 = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$2(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$5(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$4);
        } catch (ex) {
          error = ex;
        }
        warning$4(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures$1)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures$1[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$4(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1$2 = checkPropTypes$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';








var factoryWithTypeCheckers$2 = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1$2) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1$1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1$1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1$2);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning_1$1(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1$2);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning_1$1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1$2) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1$2);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1$2;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';




var factoryWithThrowingShims$2 = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant_1$1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes$1 = createCommonjsModule$1(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers$2(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims$2();
}
});

var lib$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var IconBase = function IconBase(_ref, _ref2) {
  var children = _ref.children;
  var color = _ref.color;
  var size = _ref.size;
  var style = _ref.style;

  var props = _objectWithoutProperties(_ref, ['children', 'color', 'size', 'style']);

  var _ref2$reactIconBase = _ref2.reactIconBase;
  var reactIconBase = _ref2$reactIconBase === undefined ? {} : _ref2$reactIconBase;

  var computedSize = size || reactIconBase.size || '1em';
  return _react2.default.createElement('svg', _extends({
    children: children,
    fill: 'currentColor',
    preserveAspectRatio: 'xMidYMid meet',
    height: computedSize,
    width: computedSize
  }, reactIconBase, props, {
    style: _extends({
      verticalAlign: 'middle',
      color: color || reactIconBase.color
    }, reactIconBase.style || {}, style)
  }));
};

IconBase.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  style: _propTypes2.default.object
};

IconBase.contextTypes = {
  reactIconBase: _propTypes2.default.shape(IconBase.propTypes)
};

exports.default = IconBase;
module.exports = exports['default'];
});

unwrapExports$1(lib$1);

var x = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _reactIconBase2 = _interopRequireDefault(lib$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoX = function GoX(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm32.5 12.5l-5-5-7.5 7.5-7.5-7.5-5 5 7.5 7.5-7.5 7.5 5 5 7.5-7.5 7.5 7.5 5-5-7.5-7.5 7.5-7.5z' })
        )
    );
};

exports.default = GoX;
module.exports = exports['default'];
});

var GoX = unwrapExports$1(x);

var _extends$16 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Chip = function Chip(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick,
      symbol = _ref.symbol;
  return _react__default.createElement(
    "div",
    { className: className + " chip" },
    children,
    onClick && _react__default.createElement(
      "div",
      { tabIndex: "-1", role: "button", className: "action", onClick: onClick },
      symbol || _react__default.createElement(GoX, null)
    )
  );
};
var style$13 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      onClick = _ref2.onClick;

  var backgroundColor = utils_4(color)(theme.colors ? theme.colors[color] || theme.colors.primary : "black"),
      actionStyles = onClick ? {
    "& .action": {
      position: "absolute",
      top: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "0 " + (theme.spacing >= 0 ? theme.spacing / 4 : 4) + "px",
      width: "fit-content",
      opacity: 0,
      transform: "translateX(10px)",
      transition: ".3s transform ease, .3s opacity ease",
      backgroundColor: backgroundColor
    },

    "& .action::before": {
      content: "\"\"",
      position: "absolute",
      top: 0,
      left: "-100%",
      display: "block",
      width: "100%",
      height: "100%",
      backgroundImage: "linear-gradient(90deg, transparent 0%, " + backgroundColor + " 100%)"
    }
  } : {};

  return _extends$16({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    padding: theme.spacing >= 0 ? theme.spacing / 4 : 4,
    cursor: "pointer",
    overflow: "hidden",
    fontSize: ".8rem",
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),

    "&.chip + .chip": {
      marginLeft: theme.spacing >= 0 ? theme.spacing / 4 : 4
    },

    ":hover .action": {
      opacity: 1,
      transform: "none"
    }

  }, actionStyles);
};

var Chip$1 = glamorous(Chip)(style$13);

var plus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _reactIconBase2 = _interopRequireDefault(lib$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoPlus = function GoPlus(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm22.5 17.5v-10h-5v10h-10v5h10v10h5v-10h10v-5h-10z' })
        )
    );
};

exports.default = GoPlus;
module.exports = exports['default'];
});

var GoPlus = unwrapExports$1(plus);

var PlusChip = function PlusChip(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick;
  return _react__default.createElement(
    "div",
    { className: className + " plus-chip", onClick: onClick, tabIndex: "-1", role: "button" },
    children || _react__default.createElement(GoPlus, null)
  );
};
var style$14 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      size = _ref2.size;

  var borderColor = color ? utils_4(color)(theme.colors && theme.colors[color] || "white") : "black";

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    border: "1px solid",
    cursor: "pointer",
    color: borderColor,

    "&.plus-chip + .plus-chip": {
      marginLeft: theme.spacing >= 0 ? theme.spacing && theme.spacing / 2 : 8
    }
  };
};

PlusChip.defaultProps = {
  size: 15
};

var PlusChip$1 = glamorous(PlusChip)(style$14);

var Card = function Card(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className },
    children
  );
};
var style$15 = function style(_ref2) {
  var width = _ref2.width,
      padding = _ref2.padding;
  return {
    width: width,
    padding: padding,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
    backgroundColor: "white",

    "& > img": {
      maxWidth: "100%"
    }
  };
};

var Card$1 = glamorous(Card)(style$15);

var Stat = function Stat(_ref) {
  var className = _ref.className,
      label = _ref.label,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    { className: className + " Stat" },
    _react__default.createElement(
      "small",
      { className: "Stat__label" },
      label
    ),
    _react__default.createElement(
      "span",
      { className: "Stat__value" },
      children
    )
  );
};
var style$16 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;

  var backgroundColor = color ? utils_4(color)(theme.colors && theme.colors[color] || "white") : "white";

  return {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: theme.spacing >= 0 ? theme.spacing && theme.spacing / 2 : 8,
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),

    "&.Stat + .Stat": {
      borderLeft: "1px solid",
      borderLeftColor: utils_6(backgroundColor)(10)
    },

    "& .Stat__label": {
      marginBottom: 3,
      fontSize: ".6rem",
      fontWeight: 600,
      color: utils_5(backgroundColor)([theme.greys ? theme.greys["60"] : "#eee", theme.greys ? theme.greys["10"] : "#aaa"])
    }
  };
};

var Stat$1 = glamorous(Stat)(style$16);

var activity = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Activity = function Activity(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' })
  );
};

Activity.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Activity.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Activity;
});

unwrapExports$1(activity);

var airplay = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Airplay = function Airplay(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1' }),
    _react2.default.createElement('polygon', { points: '12 15 17 21 7 21 12 15' })
  );
};

Airplay.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Airplay.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Airplay;
});

unwrapExports$1(airplay);

var alertCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlertCircle = function AlertCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '16' })
  );
};

AlertCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlertCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlertCircle;
});

unwrapExports$1(alertCircle);

var alertOctagon = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlertOctagon = function AlertOctagon(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '16' })
  );
};

AlertOctagon.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlertOctagon.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlertOctagon;
});

unwrapExports$1(alertOctagon);

var alertTriangle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlertTriangle = function AlertTriangle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
    _react2.default.createElement('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
    _react2.default.createElement('line', { x1: '12', y1: '17', x2: '12', y2: '17' })
  );
};

AlertTriangle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlertTriangle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlertTriangle;
});

unwrapExports$1(alertTriangle);

var alignCenter = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlignCenter = function AlignCenter(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '18', y1: '10', x2: '6', y2: '10' }),
    _react2.default.createElement('line', { x1: '21', y1: '6', x2: '3', y2: '6' }),
    _react2.default.createElement('line', { x1: '21', y1: '14', x2: '3', y2: '14' }),
    _react2.default.createElement('line', { x1: '18', y1: '18', x2: '6', y2: '18' })
  );
};

AlignCenter.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlignCenter.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlignCenter;
});

unwrapExports$1(alignCenter);

var alignJustify = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlignJustify = function AlignJustify(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '21', y1: '10', x2: '3', y2: '10' }),
    _react2.default.createElement('line', { x1: '21', y1: '6', x2: '3', y2: '6' }),
    _react2.default.createElement('line', { x1: '21', y1: '14', x2: '3', y2: '14' }),
    _react2.default.createElement('line', { x1: '21', y1: '18', x2: '3', y2: '18' })
  );
};

AlignJustify.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlignJustify.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlignJustify;
});

unwrapExports$1(alignJustify);

var alignLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlignLeft = function AlignLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '17', y1: '10', x2: '3', y2: '10' }),
    _react2.default.createElement('line', { x1: '21', y1: '6', x2: '3', y2: '6' }),
    _react2.default.createElement('line', { x1: '21', y1: '14', x2: '3', y2: '14' }),
    _react2.default.createElement('line', { x1: '17', y1: '18', x2: '3', y2: '18' })
  );
};

AlignLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlignLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlignLeft;
});

unwrapExports$1(alignLeft);

var alignRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AlignRight = function AlignRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '21', y1: '10', x2: '7', y2: '10' }),
    _react2.default.createElement('line', { x1: '21', y1: '6', x2: '3', y2: '6' }),
    _react2.default.createElement('line', { x1: '21', y1: '14', x2: '3', y2: '14' }),
    _react2.default.createElement('line', { x1: '21', y1: '18', x2: '7', y2: '18' })
  );
};

AlignRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AlignRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AlignRight;
});

unwrapExports$1(alignRight);

var anchor = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Anchor = function Anchor(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '5', r: '3' }),
    _react2.default.createElement('line', { x1: '12', y1: '22', x2: '12', y2: '8' }),
    _react2.default.createElement('path', { d: 'M5 12H2a10 10 0 0 0 20 0h-3' })
  );
};

Anchor.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Anchor.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Anchor;
});

unwrapExports$1(anchor);

var aperture = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Aperture = function Aperture(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '14.31', y1: '8', x2: '20.05', y2: '17.94' }),
    _react2.default.createElement('line', { x1: '9.69', y1: '8', x2: '21.17', y2: '8' }),
    _react2.default.createElement('line', { x1: '7.38', y1: '12', x2: '13.12', y2: '2.06' }),
    _react2.default.createElement('line', { x1: '9.69', y1: '16', x2: '3.95', y2: '6.06' }),
    _react2.default.createElement('line', { x1: '14.31', y1: '16', x2: '2.83', y2: '16' }),
    _react2.default.createElement('line', { x1: '16.62', y1: '12', x2: '10.88', y2: '21.94' })
  );
};

Aperture.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Aperture.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Aperture;
});

unwrapExports$1(aperture);

var arrowDownLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowDownLeft = function ArrowDownLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '18',
      y1: '6',
      x2: '6',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '15 18 6 18 6 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ArrowDownLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowDownLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowDownLeft;
});

unwrapExports$1(arrowDownLeft);

var arrowDownRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowDownRight = function ArrowDownRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '6',
      y1: '6',
      x2: '18',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '9 18 18 18 18 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ArrowDownRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowDownRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowDownRight;
});

unwrapExports$1(arrowDownRight);

var arrowDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowDown = function ArrowDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '12', y1: '4', x2: '12', y2: '20' }),
    _react2.default.createElement('polyline', { points: '18 14 12 20 6 14' })
  );
};

ArrowDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowDown;
});

unwrapExports$1(arrowDown);

var arrowLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowLeft = function ArrowLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '20', y1: '12', x2: '4', y2: '12' }),
    _react2.default.createElement('polyline', { points: '10 18 4 12 10 6' })
  );
};

ArrowLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowLeft;
});

unwrapExports$1(arrowLeft);

var arrowRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowRight = function ArrowRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '4', y1: '12', x2: '20', y2: '12' }),
    _react2.default.createElement('polyline', { points: '14 6 20 12 14 18' })
  );
};

ArrowRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowRight;
});

unwrapExports$1(arrowRight);

var arrowUpLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowUpLeft = function ArrowUpLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '18',
      y1: '18',
      x2: '6',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '15 6 6 6 6 15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ArrowUpLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowUpLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowUpLeft;
});

unwrapExports$1(arrowUpLeft);

var arrowUpRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowUpRight = function ArrowUpRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '6',
      y1: '18',
      x2: '18',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '9 6 18 6 18 15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ArrowUpRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowUpRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowUpRight;
});

unwrapExports$1(arrowUpRight);

var arrowUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ArrowUp = function ArrowUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
    _react2.default.createElement('polyline', { points: '6 10 12 4 18 10' })
  );
};

ArrowUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ArrowUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ArrowUp;
});

unwrapExports$1(arrowUp);

var atSign = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var AtSign = function AtSign(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '4' }),
    _react2.default.createElement('path', { d: 'M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94' })
  );
};

AtSign.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

AtSign.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = AtSign;
});

unwrapExports$1(atSign);

var award = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Award = function Award(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '8', r: '7' }),
    _react2.default.createElement('polyline', { points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' })
  );
};

Award.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Award.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Award;
});

unwrapExports$1(award);

var barChart2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BarChart2 = function BarChart2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '10',
      y: '3',
      width: '4',
      height: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '18',
      y: '8',
      width: '4',
      height: '13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '2',
      y: '13',
      width: '4',
      height: '8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

BarChart2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

BarChart2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = BarChart2;
});

unwrapExports$1(barChart2);

var barChart = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BarChart = function BarChart(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '18',
      y: '3',
      width: '4',
      height: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '10',
      y: '8',
      width: '4',
      height: '13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '2',
      y: '13',
      width: '4',
      height: '8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

BarChart.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

BarChart.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = BarChart;
});

unwrapExports$1(barChart);

var batteryCharging = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BatteryCharging = function BatteryCharging(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '23',
      y1: '13',
      x2: '23',
      y2: '11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '11 6 7 12 13 12 9 18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

BatteryCharging.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

BatteryCharging.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = BatteryCharging;
});

unwrapExports$1(batteryCharging);

var battery = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Battery = function Battery(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '1', y: '6', width: '18', height: '12', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '23', y1: '13', x2: '23', y2: '11' })
  );
};

Battery.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Battery.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Battery;
});

unwrapExports$1(battery);

var bellOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BellOff = function BellOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0' }),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' })
  );
};

BellOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

BellOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = BellOff;
});

unwrapExports$1(bellOff);

var bell = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Bell = function Bell(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0' })
  );
};

Bell.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Bell.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Bell;
});

unwrapExports$1(bell);

var bluetooth = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Bluetooth = function Bluetooth(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5' })
  );
};

Bluetooth.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Bluetooth.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Bluetooth;
});

unwrapExports$1(bluetooth);

var bold = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Bold = function Bold(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M6,4h8a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M6,12h9a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Bold.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Bold.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Bold;
});

unwrapExports$1(bold);

var book = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Book = function Book(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
    _react2.default.createElement('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
  );
};

Book.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Book.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Book;
});

unwrapExports$1(book);

var bookmark = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Bookmark = function Bookmark(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' })
  );
};

Bookmark.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Bookmark.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Bookmark;
});

unwrapExports$1(bookmark);

var box = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Box = function Box(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '2.32 6.16 12 11 21.68 6.16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '22.76',
      x2: '12',
      y2: '11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Box.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Box.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Box;
});

unwrapExports$1(box);

var briefcase = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Briefcase = function Briefcase(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }),
    _react2.default.createElement('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })
  );
};

Briefcase.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Briefcase.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Briefcase;
});

unwrapExports$1(briefcase);

var calendar = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Calendar = function Calendar(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
    _react2.default.createElement('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
    _react2.default.createElement('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
  );
};

Calendar.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Calendar.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Calendar;
});

unwrapExports$1(calendar);

var cameraOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CameraOff = function CameraOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' }),
    _react2.default.createElement('path', { d: 'M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56' })
  );
};

CameraOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CameraOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CameraOff;
});

unwrapExports$1(cameraOff);

var camera = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Camera = function Camera(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' }),
    _react2.default.createElement('circle', { cx: '12', cy: '13', r: '4' })
  );
};

Camera.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Camera.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Camera;
});

unwrapExports$1(camera);

var cast = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Cast = function Cast(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '2',
      y1: '20',
      x2: '2',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Cast.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Cast.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Cast;
});

unwrapExports$1(cast);

var checkCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CheckCircle = function CheckCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M22 11.07V12a10 10 0 1 1-5.93-9.14' }),
    _react2.default.createElement('polyline', { points: '23 3 12 14 9 11' })
  );
};

CheckCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CheckCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CheckCircle;
});

unwrapExports$1(checkCircle);

var checkSquare = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CheckSquare = function CheckSquare(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '9 11 12 14 23 3' }),
    _react2.default.createElement('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' })
  );
};

CheckSquare.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CheckSquare.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CheckSquare;
});

unwrapExports$1(checkSquare);

var check = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Check = function Check(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '20 6 9 17 4 12' })
  );
};

Check.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Check.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Check;
});

unwrapExports$1(check);

var chevronDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronDown = function ChevronDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '6 9 12 15 18 9' })
  );
};

ChevronDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronDown;
});

unwrapExports$1(chevronDown);

var chevronLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronLeft = function ChevronLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '15 18 9 12 15 6' })
  );
};

ChevronLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronLeft;
});

unwrapExports$1(chevronLeft);

var chevronRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronRight = function ChevronRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '9 18 15 12 9 6' })
  );
};

ChevronRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronRight;
});

unwrapExports$1(chevronRight);

var chevronUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronUp = function ChevronUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '18 15 12 9 6 15' })
  );
};

ChevronUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronUp;
});

unwrapExports$1(chevronUp);

var chevronsDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronsDown = function ChevronsDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '7 13 12 18 17 13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '7 6 12 11 17 6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ChevronsDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronsDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronsDown;
});

unwrapExports$1(chevronsDown);

var chevronsLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronsLeft = function ChevronsLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '11 17 6 12 11 7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '18 17 13 12 18 7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ChevronsLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronsLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronsLeft;
});

unwrapExports$1(chevronsLeft);

var chevronsRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronsRight = function ChevronsRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '13 17 18 12 13 7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '6 17 11 12 6 7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ChevronsRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronsRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronsRight;
});

unwrapExports$1(chevronsRight);

var chevronsUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ChevronsUp = function ChevronsUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '17 11 12 6 7 11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 18 12 13 7 18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ChevronsUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ChevronsUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ChevronsUp;
});

unwrapExports$1(chevronsUp);

var chrome = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Chrome = function Chrome(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '4' }),
    _react2.default.createElement('line', { x1: '21.17', y1: '8', x2: '12', y2: '8' }),
    _react2.default.createElement('line', { x1: '3.95', y1: '6.06', x2: '8.54', y2: '14' }),
    _react2.default.createElement('line', { x1: '10.88', y1: '21.94', x2: '15.46', y2: '14' })
  );
};

Chrome.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Chrome.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Chrome;
});

unwrapExports$1(chrome);

var circle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Circle = function Circle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' })
  );
};

Circle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Circle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Circle;
});

unwrapExports$1(circle);

var clipboard = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Clipboard = function Clipboard(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
    _react2.default.createElement('rect', { x: '8', y: '2', width: '8', height: '4', rx: '1', ry: '1' })
  );
};

Clipboard.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Clipboard.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Clipboard;
});

unwrapExports$1(clipboard);

var clock = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Clock = function Clock(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('polyline', { points: '12 6 12 12 15 15' })
  );
};

Clock.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Clock.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Clock;
});

unwrapExports$1(clock);

var cloudDrizzle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CloudDrizzle = function CloudDrizzle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '19',
      x2: '8',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '13',
      x2: '8',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '19',
      x2: '16',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '13',
      x2: '16',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '21',
      x2: '12',
      y2: '23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '15',
      x2: '12',
      y2: '17',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CloudDrizzle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CloudDrizzle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CloudDrizzle;
});

unwrapExports$1(cloudDrizzle);

var cloudLightning = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CloudLightning = function CloudLightning(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '13 11 9 17 15 17 11 23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CloudLightning.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CloudLightning.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CloudLightning;
});

unwrapExports$1(cloudLightning);

var cloudOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CloudOff = function CloudOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3' }),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' })
  );
};

CloudOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CloudOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CloudOff;
});

unwrapExports$1(cloudOff);

var cloudRain = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CloudRain = function CloudRain(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '13',
      x2: '16',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '13',
      x2: '8',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '15',
      x2: '12',
      y2: '23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CloudRain.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CloudRain.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CloudRain;
});

unwrapExports$1(cloudRain);

var cloudSnow = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CloudSnow = function CloudSnow(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '16',
      x2: '8',
      y2: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '20',
      x2: '8',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '18',
      x2: '12',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '22',
      x2: '12',
      y2: '22',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '16',
      x2: '16',
      y2: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '20',
      x2: '16',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CloudSnow.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CloudSnow.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CloudSnow;
});

unwrapExports$1(cloudSnow);

var cloud = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Cloud = function Cloud(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' })
  );
};

Cloud.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Cloud.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Cloud;
});

unwrapExports$1(cloud);

var codepen = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Codepen = function Codepen(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '22',
      x2: '12',
      y2: '15.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '22 8.5 12 15.5 2 8.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '2 15.5 12 8.5 22 15.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '2',
      x2: '12',
      y2: '8.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Codepen.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Codepen.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Codepen;
});

unwrapExports$1(codepen);

var command = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Command = function Command(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z' })
  );
};

Command.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Command.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Command;
});

unwrapExports$1(command);

var compass = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Compass = function Compass(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polygon', {
      points: '16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Compass.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Compass.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Compass;
});

unwrapExports$1(compass);

var copy = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Copy = function Copy(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '9',
      y: '9',
      width: '13',
      height: '13',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Copy.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Copy.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Copy;
});

unwrapExports$1(copy);

var cornerDownLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerDownLeft = function CornerDownLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '9 10 4 15 9 20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 4v7a4 4 0 0 1-4 4H4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerDownLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerDownLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerDownLeft;
});

unwrapExports$1(cornerDownLeft);

var cornerDownRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerDownRight = function CornerDownRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '15 10 20 15 15 20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M4 4v7a4 4 0 0 0 4 4h12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerDownRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerDownRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerDownRight;
});

unwrapExports$1(cornerDownRight);

var cornerLeftDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerLeftDown = function CornerLeftDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '14 15 9 20 4 15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 4h-7a4 4 0 0 0-4 4v12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerLeftDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerLeftDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerLeftDown;
});

unwrapExports$1(cornerLeftDown);

var cornerLeftUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerLeftUp = function CornerLeftUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '14 9 9 4 4 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 20h-7a4 4 0 0 1-4-4V4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerLeftUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerLeftUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerLeftUp;
});

unwrapExports$1(cornerLeftUp);

var cornerRightDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerRightDown = function CornerRightDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '10 15 15 20 20 15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M4 4h7a4 4 0 0 1 4 4v12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerRightDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerRightDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerRightDown;
});

unwrapExports$1(cornerRightDown);

var cornerRightUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerRightUp = function CornerRightUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '10 9 15 4 20 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M4 20h7a4 4 0 0 0 4-4V4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerRightUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerRightUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerRightUp;
});

unwrapExports$1(cornerRightUp);

var cornerUpLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerUpLeft = function CornerUpLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '9 14 4 9 9 4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20 20v-7a4 4 0 0 0-4-4H4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerUpLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerUpLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerUpLeft;
});

unwrapExports$1(cornerUpLeft);

var cornerUpRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CornerUpRight = function CornerUpRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '15 14 20 9 15 4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M4 20v-7a4 4 0 0 1 4-4h12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CornerUpRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CornerUpRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CornerUpRight;
});

unwrapExports$1(cornerUpRight);

var cpu = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Cpu = function Cpu(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2', ry: '2' }),
    _react2.default.createElement('rect', { x: '9', y: '9', width: '6', height: '6' }),
    _react2.default.createElement('line', { x1: '9', y1: '1', x2: '9', y2: '4' }),
    _react2.default.createElement('line', { x1: '15', y1: '1', x2: '15', y2: '4' }),
    _react2.default.createElement('line', { x1: '9', y1: '20', x2: '9', y2: '23' }),
    _react2.default.createElement('line', { x1: '15', y1: '20', x2: '15', y2: '23' }),
    _react2.default.createElement('line', { x1: '20', y1: '9', x2: '23', y2: '9' }),
    _react2.default.createElement('line', { x1: '20', y1: '14', x2: '23', y2: '14' }),
    _react2.default.createElement('line', { x1: '1', y1: '9', x2: '4', y2: '9' }),
    _react2.default.createElement('line', { x1: '1', y1: '14', x2: '4', y2: '14' })
  );
};

Cpu.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Cpu.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Cpu;
});

unwrapExports$1(cpu);

var creditCard = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CreditCard = function CreditCard(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '1',
      y: '4',
      width: '22',
      height: '16',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '1',
      y1: '10',
      x2: '23',
      y2: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

CreditCard.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

CreditCard.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = CreditCard;
});

unwrapExports$1(creditCard);

var crop = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Crop = function Crop(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M6.13,1,6,16a2,2,0,0,0,2,2H23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M1,6.13,16,6a2,2,0,0,1,2,2V23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Crop.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Crop.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Crop;
});

unwrapExports$1(crop);

var crosshair = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Crosshair = function Crosshair(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '22', y1: '12', x2: '18', y2: '12' }),
    _react2.default.createElement('line', { x1: '6', y1: '12', x2: '2', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '6', x2: '12', y2: '2' }),
    _react2.default.createElement('line', { x1: '12', y1: '22', x2: '12', y2: '18' })
  );
};

Crosshair.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Crosshair.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Crosshair;
});

unwrapExports$1(crosshair);

var _delete = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Delete = function Delete(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z' }),
    _react2.default.createElement('line', { x1: '18', y1: '9', x2: '12', y2: '15' }),
    _react2.default.createElement('line', { x1: '12', y1: '9', x2: '18', y2: '15' })
  );
};

Delete.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Delete.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Delete;
});

unwrapExports$1(_delete);

var disc = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Disc = function Disc(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '3' })
  );
};

Disc.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Disc.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Disc;
});

unwrapExports$1(disc);

var downloadCloud = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DownloadCloud = function DownloadCloud(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '8 17 12 21 16 17' }),
    _react2.default.createElement('line', { x1: '12', y1: '12', x2: '12', y2: '21' }),
    _react2.default.createElement('path', { d: 'M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29' })
  );
};

DownloadCloud.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

DownloadCloud.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = DownloadCloud;
});

unwrapExports$1(downloadCloud);

var download = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Download = function Download(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3' }),
    _react2.default.createElement('polyline', { points: '8 12 12 16 16 12' }),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '16' })
  );
};

Download.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Download.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Download;
});

unwrapExports$1(download);

var droplet = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Droplet = function Droplet(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
      fill: 'none',
      stroke: color,
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Droplet.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Droplet.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Droplet;
});

unwrapExports$1(droplet);

var edit2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Edit2 = function Edit2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '16 3 21 8 8 21 3 21 3 16 16 3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Edit2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Edit2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Edit2;
});

unwrapExports$1(edit2);

var edit3 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Edit3 = function Edit3(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '14 2 18 6 7 17 3 17 3 13 14 2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '3',
      y1: '22',
      x2: '21',
      y2: '22',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Edit3.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Edit3.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Edit3;
});

unwrapExports$1(edit3);

var edit = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Edit = function Edit(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34' }),
    _react2.default.createElement('polygon', { points: '18 2 22 6 12 16 8 16 8 12 18 2' })
  );
};

Edit.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Edit.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Edit;
});

unwrapExports$1(edit);

var externalLink = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ExternalLink = function ExternalLink(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    _react2.default.createElement('polyline', { points: '15 3 21 3 21 9' }),
    _react2.default.createElement('line', { x1: '10', y1: '14', x2: '21', y2: '3' })
  );
};

ExternalLink.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ExternalLink.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ExternalLink;
});

unwrapExports$1(externalLink);

var eyeOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EyeOff = function EyeOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' }),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' })
  );
};

EyeOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

EyeOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = EyeOff;
});

unwrapExports$1(eyeOff);

var eye = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Eye = function Eye(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '3' })
  );
};

Eye.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Eye.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Eye;
});

unwrapExports$1(eye);

var facebook = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Facebook = function Facebook(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' })
  );
};

Facebook.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Facebook.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Facebook;
});

unwrapExports$1(facebook);

var fastForward = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FastForward = function FastForward(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '13 19 22 12 13 5 13 19' }),
    _react2.default.createElement('polygon', { points: '2 19 11 12 2 5 2 19' })
  );
};

FastForward.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

FastForward.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = FastForward;
});

unwrapExports$1(fastForward);

var feather = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Feather = function Feather(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z' }),
    _react2.default.createElement('line', { x1: '16', y1: '8', x2: '2', y2: '22' }),
    _react2.default.createElement('line', { x1: '17', y1: '15', x2: '9', y2: '15' })
  );
};

Feather.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Feather.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Feather;
});

unwrapExports$1(feather);

var fileMinus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FileMinus = function FileMinus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '14 2 14 8 20 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '9',
      y1: '15',
      x2: '15',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

FileMinus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

FileMinus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = FileMinus;
});

unwrapExports$1(fileMinus);

var filePlus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FilePlus = function FilePlus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '14 2 14 8 20 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '18',
      x2: '12',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '9',
      y1: '15',
      x2: '15',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

FilePlus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

FilePlus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = FilePlus;
});

unwrapExports$1(filePlus);

var fileText = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FileText = function FileText(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '14 2 14 8 20 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '13',
      x2: '8',
      y2: '13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16',
      y1: '17',
      x2: '8',
      y2: '17',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '10 9 9 9 8 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

FileText.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

FileText.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = FileText;
});

unwrapExports$1(fileText);

var file = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var File = function File(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' }),
    _react2.default.createElement('polyline', { points: '13 2 13 9 20 9' })
  );
};

File.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

File.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = File;
});

unwrapExports$1(file);

var film = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Film = function Film(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '2',
      y: '2',
      width: '20',
      height: '20',
      rx: '2.18',
      ry: '2.18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '7',
      y1: '2',
      x2: '7',
      y2: '22',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '17',
      y1: '2',
      x2: '17',
      y2: '22',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '2',
      y1: '12',
      x2: '22',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '2',
      y1: '7',
      x2: '7',
      y2: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '2',
      y1: '17',
      x2: '7',
      y2: '17',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '17',
      y1: '17',
      x2: '22',
      y2: '17',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '17',
      y1: '7',
      x2: '22',
      y2: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Film.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Film.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Film;
});

unwrapExports$1(film);

var filter$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Filter = function Filter(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' })
  );
};

Filter.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Filter.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Filter;
});

unwrapExports$1(filter$1);

var flag = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Flag = function Flag(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z' }),
    _react2.default.createElement('line', { x1: '4', y1: '22', x2: '4', y2: '15' })
  );
};

Flag.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Flag.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Flag;
});

unwrapExports$1(flag);

var folder = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Folder = function Folder(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' })
  );
};

Folder.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Folder.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Folder;
});

unwrapExports$1(folder);

var github = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Github = function Github(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Github.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Github.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Github;
});

unwrapExports$1(github);

var gitlab = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Gitlab = function Gitlab(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M22.65,14.39,12,22.13,1.35,14.39a.84.84,0,0,1-.3-.94L2.27,9.67,4.71,2.16A.42.42,0,0,1,4.82,2,.43.43,0,0,1,5.4,2a.42.42,0,0,1,.11.18L7.95,9.67h8.1l2.44-7.51A.42.42,0,0,1,18.6,2a.43.43,0,0,1,.58,0,.42.42,0,0,1,.11.18l2.44,7.51L23,13.45A.84.84,0,0,1,22.65,14.39Z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Gitlab.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Gitlab.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Gitlab;
});

unwrapExports$1(gitlab);

var globe = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Globe = function Globe(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '2', y1: '12', x2: '22', y2: '12' }),
    _react2.default.createElement('path', { d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' })
  );
};

Globe.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Globe.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Globe;
});

unwrapExports$1(globe);

var grid = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Grid = function Grid(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '3',
      y: '3',
      width: '7',
      height: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '14',
      y: '3',
      width: '7',
      height: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '14',
      y: '14',
      width: '7',
      height: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '3',
      y: '14',
      width: '7',
      height: '7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Grid.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Grid.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Grid;
});

unwrapExports$1(grid);

var hash$2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Hash = function Hash(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '4', y1: '9', x2: '20', y2: '9' }),
    _react2.default.createElement('line', { x1: '4', y1: '15', x2: '20', y2: '15' }),
    _react2.default.createElement('line', { x1: '10', y1: '3', x2: '8', y2: '21' }),
    _react2.default.createElement('line', { x1: '16', y1: '3', x2: '14', y2: '21' })
  );
};

Hash.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Hash.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Hash;
});

unwrapExports$1(hash$2);

var headphones = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Headphones = function Headphones(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M3 18v-6a9 9 0 0 1 18 0v6' }),
    _react2.default.createElement('path', { d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' })
  );
};

Headphones.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Headphones.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Headphones;
});

unwrapExports$1(headphones);

var heart = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Heart = function Heart(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })
  );
};

Heart.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Heart.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Heart;
});

unwrapExports$1(heart);

var helpCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var HelpCircle = function HelpCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M9.09,9a3,3,0,0,1,5.83,1c0,2-3,3-3,3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '17',
      x2: '12',
      y2: '17',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

HelpCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

HelpCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = HelpCircle;
});

unwrapExports$1(helpCircle);

var home = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Home = function Home(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
    _react2.default.createElement('polyline', { points: '9 22 9 12 15 12 15 22' })
  );
};

Home.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Home.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Home;
});

unwrapExports$1(home);

var image = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Image = function Image(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('circle', { cx: '8.5', cy: '8.5', r: '1.5' }),
    _react2.default.createElement('polyline', { points: '21 15 16 10 5 21' })
  );
};

Image.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Image.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Image;
});

unwrapExports$1(image);

var inbox = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Inbox = function Inbox(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '22 13 16 13 14 16 10 16 8 13 2 13' }),
    _react2.default.createElement('path', { d: 'M5.47 5.19L2 13v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5l-3.47-7.81A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.83 1.19z' })
  );
};

Inbox.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Inbox.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Inbox;
});

unwrapExports$1(inbox);

var info = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Info = function Info(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '8' })
  );
};

Info.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Info.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Info;
});

unwrapExports$1(info);

var instagram = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Instagram = function Instagram(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }),
    _react2.default.createElement('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
    _react2.default.createElement('line', { x1: '17.5', y1: '6.5', x2: '17.5', y2: '6.5' })
  );
};

Instagram.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Instagram.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Instagram;
});

unwrapExports$1(instagram);

var italic = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Italic = function Italic(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '19',
      y1: '4',
      x2: '10',
      y2: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '14',
      y1: '20',
      x2: '5',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '15',
      y1: '4',
      x2: '9',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Italic.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Italic.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Italic;
});

unwrapExports$1(italic);

var layers = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Layers = function Layers(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }),
    _react2.default.createElement('polyline', { points: '2 17 12 22 22 17' }),
    _react2.default.createElement('polyline', { points: '2 12 12 17 22 12' })
  );
};

Layers.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Layers.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Layers;
});

unwrapExports$1(layers);

var layout = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Layout = function Layout(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '3', y1: '9', x2: '21', y2: '9' }),
    _react2.default.createElement('line', { x1: '9', y1: '21', x2: '9', y2: '9' })
  );
};

Layout.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Layout.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Layout;
});

unwrapExports$1(layout);

var lifeBuoy = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LifeBuoy = function LifeBuoy(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '4' }),
    _react2.default.createElement('line', { x1: '4.93', y1: '4.93', x2: '9.17', y2: '9.17' }),
    _react2.default.createElement('line', { x1: '14.83', y1: '14.83', x2: '19.07', y2: '19.07' }),
    _react2.default.createElement('line', { x1: '14.83', y1: '9.17', x2: '19.07', y2: '4.93' }),
    _react2.default.createElement('line', { x1: '14.83', y1: '9.17', x2: '18.36', y2: '5.64' }),
    _react2.default.createElement('line', { x1: '4.93', y1: '19.07', x2: '9.17', y2: '14.83' })
  );
};

LifeBuoy.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

LifeBuoy.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = LifeBuoy;
});

unwrapExports$1(lifeBuoy);

var link2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Link2 = function Link2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '12',
      x2: '16',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Link2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Link2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Link2;
});

unwrapExports$1(link2);

var link$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Link = function Link(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

Link.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Link.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Link;
});

unwrapExports$1(link$1);

var list = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var List = function List(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '6',
      x2: '21',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '12',
      x2: '21',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8',
      y1: '18',
      x2: '21',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '3',
      y1: '6',
      x2: '3',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '3',
      y1: '12',
      x2: '3',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '3',
      y1: '18',
      x2: '3',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

List.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

List.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = List;
});

unwrapExports$1(list);

var loader = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Loader = function Loader(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '6' }),
    _react2.default.createElement('line', { x1: '12', y1: '18', x2: '12', y2: '22' }),
    _react2.default.createElement('line', { x1: '4.93', y1: '4.93', x2: '7.76', y2: '7.76' }),
    _react2.default.createElement('line', { x1: '16.24', y1: '16.24', x2: '19.07', y2: '19.07' }),
    _react2.default.createElement('line', { x1: '2', y1: '12', x2: '6', y2: '12' }),
    _react2.default.createElement('line', { x1: '18', y1: '12', x2: '22', y2: '12' }),
    _react2.default.createElement('line', { x1: '4.93', y1: '19.07', x2: '7.76', y2: '16.24' }),
    _react2.default.createElement('line', { x1: '16.24', y1: '7.76', x2: '19.07', y2: '4.93' })
  );
};

Loader.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Loader.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Loader;
});

unwrapExports$1(loader);

var lock = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Lock = function Lock(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    _react2.default.createElement('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
  );
};

Lock.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Lock.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Lock;
});

unwrapExports$1(lock);

var logIn = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LogIn = function LogIn(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M14 22h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '11 16 15 12 11 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '15',
      y1: '12',
      x2: '3',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

LogIn.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

LogIn.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = LogIn;
});

unwrapExports$1(logIn);

var logOut = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LogOut = function LogOut(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 16 21 12 17 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '21',
      y1: '12',
      x2: '9',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

LogOut.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

LogOut.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = LogOut;
});

unwrapExports$1(logOut);

var mail = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Mail = function Mail(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
    _react2.default.createElement('polyline', { points: '22,6 12,13 2,6' })
  );
};

Mail.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Mail.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Mail;
});

unwrapExports$1(mail);

var mapPin = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MapPin = function MapPin(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
    _react2.default.createElement('circle', { cx: '12', cy: '10', r: '3' })
  );
};

MapPin.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MapPin.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MapPin;
});

unwrapExports$1(mapPin);

var map$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Map = function Map(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' }),
    _react2.default.createElement('line', { x1: '8', y1: '2', x2: '8', y2: '18' }),
    _react2.default.createElement('line', { x1: '16', y1: '6', x2: '16', y2: '22' })
  );
};

Map.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Map.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Map;
});

unwrapExports$1(map$1);

var maximize2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Maximize2 = function Maximize2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '15 3 21 3 21 9' }),
    _react2.default.createElement('polyline', { points: '9 21 3 21 3 15' }),
    _react2.default.createElement('line', { x1: '21', y1: '3', x2: '14', y2: '10' }),
    _react2.default.createElement('line', { x1: '3', y1: '21', x2: '10', y2: '14' })
  );
};

Maximize2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Maximize2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Maximize2;
});

unwrapExports$1(maximize2);

var maximize = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Maximize = function Maximize(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' })
  );
};

Maximize.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Maximize.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Maximize;
});

unwrapExports$1(maximize);

var menu = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Menu = function Menu(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
    _react2.default.createElement('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
    _react2.default.createElement('line', { x1: '3', y1: '18', x2: '21', y2: '18' })
  );
};

Menu.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Menu.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Menu;
});

unwrapExports$1(menu);

var messageCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MessageCircle = function MessageCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })
  );
};

MessageCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MessageCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MessageCircle;
});

unwrapExports$1(messageCircle);

var messageSquare = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MessageSquare = function MessageSquare(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
  );
};

MessageSquare.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MessageSquare.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MessageSquare;
});

unwrapExports$1(messageSquare);

var micOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MicOff = function MicOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' }),
    _react2.default.createElement('path', { d: 'M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6' }),
    _react2.default.createElement('path', { d: 'M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23' }),
    _react2.default.createElement('line', { x1: '12', y1: '19', x2: '12', y2: '23' }),
    _react2.default.createElement('line', { x1: '8', y1: '23', x2: '16', y2: '23' })
  );
};

MicOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MicOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MicOff;
});

unwrapExports$1(micOff);

var mic = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Mic = function Mic(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' }),
    _react2.default.createElement('path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }),
    _react2.default.createElement('line', { x1: '12', y1: '19', x2: '12', y2: '23' }),
    _react2.default.createElement('line', { x1: '8', y1: '23', x2: '16', y2: '23' })
  );
};

Mic.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Mic.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Mic;
});

unwrapExports$1(mic);

var minimize2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Minimize2 = function Minimize2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '4 14 10 14 10 20' }),
    _react2.default.createElement('polyline', { points: '20 10 14 10 14 4' }),
    _react2.default.createElement('line', { x1: '14', y1: '10', x2: '21', y2: '3' }),
    _react2.default.createElement('line', { x1: '3', y1: '21', x2: '10', y2: '14' })
  );
};

Minimize2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Minimize2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Minimize2;
});

unwrapExports$1(minimize2);

var minimize = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Minimize = function Minimize(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3' })
  );
};

Minimize.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Minimize.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Minimize;
});

unwrapExports$1(minimize);

var minusCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MinusCircle = function MinusCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '8', y1: '12', x2: '16', y2: '12' })
  );
};

MinusCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MinusCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MinusCircle;
});

unwrapExports$1(minusCircle);

var minusSquare = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MinusSquare = function MinusSquare(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '8', y1: '12', x2: '16', y2: '12' })
  );
};

MinusSquare.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MinusSquare.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MinusSquare;
});

unwrapExports$1(minusSquare);

var minus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Minus = function Minus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
  );
};

Minus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Minus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Minus;
});

unwrapExports$1(minus);

var monitor = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Monitor = function Monitor(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '8', y1: '21', x2: '16', y2: '21' }),
    _react2.default.createElement('line', { x1: '12', y1: '17', x2: '12', y2: '21' })
  );
};

Monitor.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Monitor.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Monitor;
});

unwrapExports$1(monitor);

var moon = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Moon = function Moon(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
  );
};

Moon.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Moon.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Moon;
});

unwrapExports$1(moon);

var moreHorizontal = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MoreHorizontal = function MoreHorizontal(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '2' }),
    _react2.default.createElement('circle', { cx: '20', cy: '12', r: '2' }),
    _react2.default.createElement('circle', { cx: '4', cy: '12', r: '2' })
  );
};

MoreHorizontal.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MoreHorizontal.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MoreHorizontal;
});

unwrapExports$1(moreHorizontal);

var moreVertical = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MoreVertical = function MoreVertical(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '2' }),
    _react2.default.createElement('circle', { cx: '12', cy: '4', r: '2' }),
    _react2.default.createElement('circle', { cx: '12', cy: '20', r: '2' })
  );
};

MoreVertical.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

MoreVertical.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = MoreVertical;
});

unwrapExports$1(moreVertical);

var move = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Move = function Move(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '5 9 2 12 5 15' }),
    _react2.default.createElement('polyline', { points: '9 5 12 2 15 5' }),
    _react2.default.createElement('polyline', { points: '15 19 12 22 9 19' }),
    _react2.default.createElement('polyline', { points: '19 9 22 12 19 15' }),
    _react2.default.createElement('line', { x1: '2', y1: '12', x2: '22', y2: '12' }),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '22' })
  );
};

Move.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Move.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Move;
});

unwrapExports$1(move);

var music = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Music = function Music(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z' }),
    _react2.default.createElement('polyline', { points: '9 17 9 5 21 3 21 15' })
  );
};

Music.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Music.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Music;
});

unwrapExports$1(music);

var navigation2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Navigation2 = function Navigation2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '12 2 19 21 12 17 5 21 12 2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Navigation2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Navigation2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Navigation2;
});

unwrapExports$1(navigation2);

var navigation = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Navigation = function Navigation(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '3 11 22 2 13 21 11 13 3 11',
      fill: 'none',
      stroke: color,
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Navigation.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Navigation.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Navigation;
});

unwrapExports$1(navigation);

var octagon = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Octagon = function Octagon(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2' })
  );
};

Octagon.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Octagon.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Octagon;
});

unwrapExports$1(octagon);

var _package = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Package = function Package(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '2.32 6.16 12 11 21.68 6.16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '22.76',
      x2: '12',
      y2: '11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '7',
      y1: '3.5',
      x2: '17',
      y2: '8.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Package.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Package.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Package;
});

unwrapExports$1(_package);

var paperclip = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Paperclip = function Paperclip(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M21.44,11.05l-9.19,9.19a6,6,0,0,1-8.49-8.49l9.19-9.19a4,4,0,0,1,5.66,5.66L9.41,17.41a2,2,0,0,1-2.83-2.83L15.07,6.1',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Paperclip.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Paperclip.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Paperclip;
});

unwrapExports$1(paperclip);

var pauseCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PauseCircle = function PauseCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '10',
      y1: '15',
      x2: '10',
      y2: '9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '14',
      y1: '15',
      x2: '14',
      y2: '9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

PauseCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PauseCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PauseCircle;
});

unwrapExports$1(pauseCircle);

var pause = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Pause = function Pause(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '6',
      y: '4',
      width: '4',
      height: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '14',
      y: '4',
      width: '4',
      height: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Pause.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Pause.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Pause;
});

unwrapExports$1(pause);

var percent = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Percent = function Percent(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '19',
      y1: '5',
      x2: '5',
      y2: '19',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '6.5',
      cy: '6.5',
      r: '2.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '17.5',
      cy: '17.5',
      r: '2.5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Percent.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Percent.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Percent;
});

unwrapExports$1(percent);

var phoneCall = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneCall = function PhoneCall(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

PhoneCall.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneCall.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneCall;
});

unwrapExports$1(phoneCall);

var phoneForwarded = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneForwarded = function PhoneForwarded(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '19 1 23 5 19 9' }),
    _react2.default.createElement('line', { x1: '15', y1: '5', x2: '23', y2: '5' }),
    _react2.default.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

PhoneForwarded.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneForwarded.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneForwarded;
});

unwrapExports$1(phoneForwarded);

var phoneIncoming = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneIncoming = function PhoneIncoming(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '16 2 16 8 22 8' }),
    _react2.default.createElement('line', { x1: '23', y1: '1', x2: '16', y2: '8' }),
    _react2.default.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

PhoneIncoming.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneIncoming.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneIncoming;
});

unwrapExports$1(phoneIncoming);

var phoneMissed = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneMissed = function PhoneMissed(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '23', y1: '1', x2: '17', y2: '7' }),
    _react2.default.createElement('line', { x1: '17', y1: '1', x2: '23', y2: '7' }),
    _react2.default.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

PhoneMissed.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneMissed.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneMissed;
});

unwrapExports$1(phoneMissed);

var phoneOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneOff = function PhoneOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91' }),
    _react2.default.createElement('line', { x1: '23', y1: '1', x2: '1', y2: '23' })
  );
};

PhoneOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneOff;
});

unwrapExports$1(phoneOff);

var phoneOutgoing = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PhoneOutgoing = function PhoneOutgoing(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '23 7 23 1 17 1' }),
    _react2.default.createElement('line', { x1: '16', y1: '8', x2: '23', y2: '1' }),
    _react2.default.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

PhoneOutgoing.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PhoneOutgoing.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PhoneOutgoing;
});

unwrapExports$1(phoneOutgoing);

var phone = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Phone = function Phone(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
  );
};

Phone.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Phone.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Phone;
});

unwrapExports$1(phone);

var pieChart = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PieChart = function PieChart(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M21.21 15.89A10 10 0 1 1 8 2.83',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M22 12A10 10 0 0 0 12 2v10z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

PieChart.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PieChart.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PieChart;
});

unwrapExports$1(pieChart);

var playCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PlayCircle = function PlayCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polygon', {
      points: '10 8 16 12 10 16 10 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

PlayCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PlayCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PlayCircle;
});

unwrapExports$1(playCircle);

var play = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Play = function Play(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '5 3 19 12 5 21 5 3' })
  );
};

Play.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Play.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Play;
});

unwrapExports$1(play);

var plusCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PlusCircle = function PlusCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '16' }),
    _react2.default.createElement('line', { x1: '8', y1: '12', x2: '16', y2: '12' })
  );
};

PlusCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PlusCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PlusCircle;
});

unwrapExports$1(plusCircle);

var plusSquare = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PlusSquare = function PlusSquare(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '16' }),
    _react2.default.createElement('line', { x1: '8', y1: '12', x2: '16', y2: '12' })
  );
};

PlusSquare.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

PlusSquare.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = PlusSquare;
});

unwrapExports$1(plusSquare);

var plus$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Plus = function Plus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
    _react2.default.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
  );
};

Plus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Plus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Plus;
});

unwrapExports$1(plus$1);

var pocket = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Pocket = function Pocket(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z' }),
    _react2.default.createElement('polyline', { points: '8 10 12 14 16 10' })
  );
};

Pocket.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Pocket.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Pocket;
});

unwrapExports$1(pocket);

var power = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Power = function Power(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M18.36 6.64a9 9 0 1 1-12.73 0' }),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '12' })
  );
};

Power.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Power.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Power;
});

unwrapExports$1(power);

var printer = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Printer = function Printer(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '6 9 6 2 18 2 18 9' }),
    _react2.default.createElement('path', { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }),
    _react2.default.createElement('rect', { x: '6', y: '14', width: '12', height: '8' })
  );
};

Printer.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Printer.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Printer;
});

unwrapExports$1(printer);

var radio = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Radio = function Radio(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '2' }),
    _react2.default.createElement('path', { d: 'M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14' })
  );
};

Radio.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Radio.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Radio;
});

unwrapExports$1(radio);

var refreshCcw = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RefreshCcw = function RefreshCcw(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '1 4 1 10 7 10' }),
    _react2.default.createElement('polyline', { points: '23 20 23 14 17 14' }),
    _react2.default.createElement('path', { d: 'M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15' })
  );
};

RefreshCcw.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

RefreshCcw.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = RefreshCcw;
});

unwrapExports$1(refreshCcw);

var refreshCw = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RefreshCw = function RefreshCw(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '23 4 23 10 17 10' }),
    _react2.default.createElement('polyline', { points: '1 20 1 14 7 14' }),
    _react2.default.createElement('path', { d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' })
  );
};

RefreshCw.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

RefreshCw.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = RefreshCw;
});

unwrapExports$1(refreshCw);

var repeat = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Repeat = function Repeat(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '17 1 21 5 17 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M3 11V9a4 4 0 0 1 4-4h14',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '7 23 3 19 7 15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M21 13v2a4 4 0 0 1-4 4H3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Repeat.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Repeat.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Repeat;
});

unwrapExports$1(repeat);

var rewind = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Rewind = function Rewind(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '11 19 2 12 11 5 11 19' }),
    _react2.default.createElement('polygon', { points: '22 19 13 12 22 5 22 19' })
  );
};

Rewind.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Rewind.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Rewind;
});

unwrapExports$1(rewind);

var rotateCcw = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RotateCcw = function RotateCcw(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '1 4 1 10 7 10' }),
    _react2.default.createElement('path', { d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' })
  );
};

RotateCcw.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

RotateCcw.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = RotateCcw;
});

unwrapExports$1(rotateCcw);

var rotateCw = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RotateCw = function RotateCw(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '23 4 23 10 17 10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M20.49 15a9 9 0 1 1-2.12-9.36L23 10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

RotateCw.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

RotateCw.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = RotateCw;
});

unwrapExports$1(rotateCw);

var save = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Save = function Save(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 21 17 13 7 13 7 21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '7 3 7 8 15 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Save.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Save.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Save;
});

unwrapExports$1(save);

var scissors = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Scissors = function Scissors(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '6',
      cy: '6',
      r: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '6',
      cy: '18',
      r: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '20',
      y1: '4',
      x2: '8.12',
      y2: '15.88',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '14.47',
      y1: '14.48',
      x2: '20',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '8.12',
      y1: '8.12',
      x2: '12',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Scissors.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Scissors.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Scissors;
});

unwrapExports$1(scissors);

var search = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Search = function Search(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '10.5', cy: '10.5', r: '7.5' }),
    _react2.default.createElement('line', { x1: '21', y1: '21', x2: '15.8', y2: '15.8' })
  );
};

Search.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Search.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Search;
});

unwrapExports$1(search);

var server = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Server = function Server(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '2',
      y: '2',
      width: '20',
      height: '8',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '2',
      y: '14',
      width: '20',
      height: '8',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '6',
      y1: '6',
      x2: '6',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '6',
      y1: '18',
      x2: '6',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Server.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Server.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Server;
});

unwrapExports$1(server);

var settings = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Settings = function Settings(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
      fill: 'none',
      stroke: color,
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

Settings.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Settings.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Settings;
});

unwrapExports$1(settings);

var share2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Share2 = function Share2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '18', cy: '5', r: '3' }),
    _react2.default.createElement('circle', { cx: '6', cy: '12', r: '3' }),
    _react2.default.createElement('circle', { cx: '18', cy: '19', r: '3' }),
    _react2.default.createElement('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }),
    _react2.default.createElement('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' })
  );
};

Share2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Share2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Share2;
});

unwrapExports$1(share2);

var share = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Share = function Share(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '16 6 12 2 8 6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '2',
      x2: '12',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Share.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Share.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Share;
});

unwrapExports$1(share);

var shield = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Shield = function Shield(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Shield.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Shield.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Shield;
});

unwrapExports$1(shield);

var shoppingCart = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ShoppingCart = function ShoppingCart(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '8',
      cy: '21',
      r: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '20',
      cy: '21',
      r: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M5.67,6H23l-1.68,8.39a2,2,0,0,1-2,1.61H8.75a2,2,0,0,1-2-1.74L5.23,2.74A2,2,0,0,0,3.25,1H1',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

ShoppingCart.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ShoppingCart.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ShoppingCart;
});

unwrapExports$1(shoppingCart);

var shuffle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Shuffle = function Shuffle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '16 3 21 3 21 8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '4',
      y1: '20',
      x2: '21',
      y2: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '21 16 21 21 16 21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '15',
      y1: '15',
      x2: '21',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '4',
      y1: '4',
      x2: '9',
      y2: '9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Shuffle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Shuffle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Shuffle;
});

unwrapExports$1(shuffle);

var sidebar = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sidebar = function Sidebar(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '3',
      y: '3',
      width: '18',
      height: '18',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '9',
      y1: '3',
      x2: '9',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Sidebar.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Sidebar.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Sidebar;
});

unwrapExports$1(sidebar);

var skipBack = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SkipBack = function SkipBack(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '19 20 9 12 19 4 19 20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '5',
      y1: '19',
      x2: '5',
      y2: '5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

SkipBack.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

SkipBack.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = SkipBack;
});

unwrapExports$1(skipBack);

var skipForward = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SkipForward = function SkipForward(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '5 4 15 12 5 20 5 4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '19',
      y1: '5',
      x2: '19',
      y2: '19',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

SkipForward.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

SkipForward.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = SkipForward;
});

unwrapExports$1(skipForward);

var slack = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Slack = function Slack(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z',
      fill: 'none',
      stroke: color,
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12.57',
      y1: '5.99',
      x2: '16.15',
      y2: '16.39',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '7.85',
      y1: '7.61',
      x2: '11.43',
      y2: '18.01',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '16.39',
      y1: '7.85',
      x2: '5.99',
      y2: '11.43',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '18.01',
      y1: '12.57',
      x2: '7.61',
      y2: '16.15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

Slack.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Slack.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Slack;
});

unwrapExports$1(slack);

var slash = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Slash = function Slash(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '4.93', y1: '4.93', x2: '19.07', y2: '19.07' })
  );
};

Slash.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Slash.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Slash;
});

unwrapExports$1(slash);

var sliders = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sliders = function Sliders(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '4',
      y1: '21',
      x2: '4',
      y2: '14',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '4',
      y1: '10',
      x2: '4',
      y2: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '21',
      x2: '12',
      y2: '12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '8',
      x2: '12',
      y2: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '20',
      y1: '21',
      x2: '20',
      y2: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '20',
      y1: '12',
      x2: '20',
      y2: '3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '1',
      y1: '14',
      x2: '7',
      y2: '14',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '9',
      y1: '8',
      x2: '15',
      y2: '8',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '17',
      y1: '16',
      x2: '23',
      y2: '16',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Sliders.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Sliders.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Sliders;
});

unwrapExports$1(sliders);

var smartphone = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Smartphone = function Smartphone(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '5',
      y: '2',
      width: '14',
      height: '20',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '18',
      x2: '12',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Smartphone.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Smartphone.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Smartphone;
});

unwrapExports$1(smartphone);

var speaker = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Speaker = function Speaker(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '4',
      y: '2',
      width: '16',
      height: '20',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '14',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '6',
      x2: '12',
      y2: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Speaker.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Speaker.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Speaker;
});

unwrapExports$1(speaker);

var square = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Square = function Square(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' })
  );
};

Square.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Square.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Square;
});

unwrapExports$1(square);

var star = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Star = function Star(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
  );
};

Star.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Star.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Star;
});

unwrapExports$1(star);

var stopCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var StopCircle = function StopCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('rect', {
      x: '9',
      y: '9',
      width: '6',
      height: '6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

StopCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

StopCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = StopCircle;
});

unwrapExports$1(stopCircle);

var sun = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sun = function Sun(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '5' }),
    _react2.default.createElement('line', { x1: '12', y1: '1', x2: '12', y2: '3' }),
    _react2.default.createElement('line', { x1: '12', y1: '21', x2: '12', y2: '23' }),
    _react2.default.createElement('line', { x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64' }),
    _react2.default.createElement('line', { x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78' }),
    _react2.default.createElement('line', { x1: '1', y1: '12', x2: '3', y2: '12' }),
    _react2.default.createElement('line', { x1: '21', y1: '12', x2: '23', y2: '12' }),
    _react2.default.createElement('line', { x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36' }),
    _react2.default.createElement('line', { x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22' })
  );
};

Sun.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Sun.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Sun;
});

unwrapExports$1(sun);

var sunrise = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sunrise = function Sunrise(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M17 18a5 5 0 0 0-10 0' }),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '9' }),
    _react2.default.createElement('line', { x1: '4.22', y1: '10.22', x2: '5.64', y2: '11.64' }),
    _react2.default.createElement('line', { x1: '1', y1: '18', x2: '3', y2: '18' }),
    _react2.default.createElement('line', { x1: '21', y1: '18', x2: '23', y2: '18' }),
    _react2.default.createElement('line', { x1: '18.36', y1: '11.64', x2: '19.78', y2: '10.22' }),
    _react2.default.createElement('line', { x1: '23', y1: '22', x2: '1', y2: '22' }),
    _react2.default.createElement('polyline', { points: '8 6 12 2 16 6' })
  );
};

Sunrise.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Sunrise.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Sunrise;
});

unwrapExports$1(sunrise);

var sunset = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Sunset = function Sunset(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M17 18a5 5 0 0 0-10 0' }),
    _react2.default.createElement('line', { x1: '12', y1: '9', x2: '12', y2: '2' }),
    _react2.default.createElement('line', { x1: '4.22', y1: '10.22', x2: '5.64', y2: '11.64' }),
    _react2.default.createElement('line', { x1: '1', y1: '18', x2: '3', y2: '18' }),
    _react2.default.createElement('line', { x1: '21', y1: '18', x2: '23', y2: '18' }),
    _react2.default.createElement('line', { x1: '18.36', y1: '11.64', x2: '19.78', y2: '10.22' }),
    _react2.default.createElement('line', { x1: '23', y1: '22', x2: '1', y2: '22' }),
    _react2.default.createElement('polyline', { points: '16 5 12 9 8 5' })
  );
};

Sunset.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Sunset.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Sunset;
});

unwrapExports$1(sunset);

var tablet = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tablet = function Tablet(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '4',
      y: '2',
      width: '16',
      height: '20',
      rx: '2',
      ry: '2',
      transform: 'rotate(180 12 12)',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '18',
      x2: '12',
      y2: '18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Tablet.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Tablet.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Tablet;
});

unwrapExports$1(tablet);

var tag = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tag = function Tag(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z' }),
    _react2.default.createElement('line', { x1: '7', y1: '7', x2: '7', y2: '7' })
  );
};

Tag.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Tag.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Tag;
});

unwrapExports$1(tag);

var target = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Target = function Target(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '6' }),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '2' })
  );
};

Target.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Target.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Target;
});

unwrapExports$1(target);

var thermometer = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Thermometer = function Thermometer(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z' })
  );
};

Thermometer.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Thermometer.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Thermometer;
});

unwrapExports$1(thermometer);

var thumbsDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ThumbsDown = function ThumbsDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17' })
  );
};

ThumbsDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ThumbsDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ThumbsDown;
});

unwrapExports$1(thumbsDown);

var thumbsUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ThumbsUp = function ThumbsUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3' })
  );
};

ThumbsUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ThumbsUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ThumbsUp;
});

unwrapExports$1(thumbsUp);

var toggleLeft = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ToggleLeft = function ToggleLeft(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '1', y: '5', width: '22', height: '14', rx: '7', ry: '7' }),
    _react2.default.createElement('circle', { cx: '8', cy: '12', r: '3' })
  );
};

ToggleLeft.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ToggleLeft.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ToggleLeft;
});

unwrapExports$1(toggleLeft);

var toggleRight = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ToggleRight = function ToggleRight(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '1', y: '5', width: '22', height: '14', rx: '7', ry: '7' }),
    _react2.default.createElement('circle', { cx: '16', cy: '12', r: '3' })
  );
};

ToggleRight.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ToggleRight.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ToggleRight;
});

unwrapExports$1(toggleRight);

var trash2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Trash2 = function Trash2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '3 6 5 6 21 6' }),
    _react2.default.createElement('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }),
    _react2.default.createElement('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
    _react2.default.createElement('line', { x1: '14', y1: '11', x2: '14', y2: '17' })
  );
};

Trash2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Trash2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Trash2;
});

unwrapExports$1(trash2);

var trash = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Trash = function Trash(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '3 6 5 6 21 6' }),
    _react2.default.createElement('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' })
  );
};

Trash.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Trash.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Trash;
});

unwrapExports$1(trash);

var trendingDown = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TrendingDown = function TrendingDown(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '23 18 13.5 8.5 8.5 13.5 1 6',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 18 23 18 23 12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

TrendingDown.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

TrendingDown.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = TrendingDown;
});

unwrapExports$1(trendingDown);

var trendingUp = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TrendingUp = function TrendingUp(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '23 6 13.5 15.5 8.5 10.5 1 18',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 6 23 6 23 12',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

TrendingUp.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

TrendingUp.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = TrendingUp;
});

unwrapExports$1(trendingUp);

var triangle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Triangle = function Triangle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' })
  );
};

Triangle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Triangle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Triangle;
});

unwrapExports$1(triangle);

var tv = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tv = function Tv(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('rect', {
      x: '2',
      y: '7',
      width: '20',
      height: '15',
      rx: '2',
      ry: '2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 2 12 7 7 2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Tv.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Tv.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Tv;
});

unwrapExports$1(tv);

var twitter = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Twitter = function Twitter(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Twitter.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Twitter.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Twitter;
});

unwrapExports$1(twitter);

var type = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Type = function Type(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polyline', {
      points: '4 7 4 4 20 4 20 7',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '9',
      y1: '20',
      x2: '15',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '4',
      x2: '12',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Type.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Type.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Type;
});

unwrapExports$1(type);

var umbrella = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Umbrella = function Umbrella(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7' })
  );
};

Umbrella.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Umbrella.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Umbrella;
});

unwrapExports$1(umbrella);

var underline = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Underline = function Underline(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M6,3v7a6,6,0,0,0,6,6h0a6,6,0,0,0,6-6V3',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '4',
      y1: '21',
      x2: '20',
      y2: '21',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Underline.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Underline.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Underline;
});

unwrapExports$1(underline);

var unlock = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Unlock = function Unlock(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    _react2.default.createElement('path', { d: 'M7 11V7a5 5 0 0 1 9.9-1' })
  );
};

Unlock.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Unlock.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Unlock;
});

unwrapExports$1(unlock);

var uploadCloud = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UploadCloud = function UploadCloud(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polyline', { points: '16 16 12 12 8 16' }),
    _react2.default.createElement('line', { x1: '12', y1: '12', x2: '12', y2: '21' }),
    _react2.default.createElement('path', { d: 'M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' }),
    _react2.default.createElement('polyline', { points: '16 16 12 12 8 16' })
  );
};

UploadCloud.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

UploadCloud.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = UploadCloud;
});

unwrapExports$1(uploadCloud);

var upload = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Upload = function Upload(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3' }),
    _react2.default.createElement('polyline', { points: '16 6 12 2 8 6' }),
    _react2.default.createElement('line', { x1: '12', y1: '2', x2: '12', y2: '16' })
  );
};

Upload.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Upload.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Upload;
});

unwrapExports$1(upload);

var userCheck = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UserCheck = function UserCheck(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '8.5',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('polyline', {
      points: '17 11 19 13 23 9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

UserCheck.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

UserCheck.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = UserCheck;
});

unwrapExports$1(userCheck);

var userMinus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UserMinus = function UserMinus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '8.5',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '23',
      y1: '11',
      x2: '17',
      y2: '11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

UserMinus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

UserMinus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = UserMinus;
});

unwrapExports$1(userMinus);

var userPlus = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UserPlus = function UserPlus(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '8.5',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '20',
      y1: '8',
      x2: '20',
      y2: '14',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '23',
      y1: '11',
      x2: '17',
      y2: '11',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

UserPlus.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

UserPlus.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = UserPlus;
});

unwrapExports$1(userPlus);

var userX = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UserX = function UserX(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '8.5',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '18',
      y1: '8',
      x2: '23',
      y2: '13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '23',
      y1: '8',
      x2: '18',
      y2: '13',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

UserX.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

UserX.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = UserX;
});

unwrapExports$1(userX);

var user = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var User = function User(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '12',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

User.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

User.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = User;
});

unwrapExports$1(user);

var users = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Users = function Users(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '9',
      cy: '7',
      r: '4',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M23 21v-2a4 4 0 0 0-3-3.87',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M16 3.13a4 4 0 0 1 0 7.75',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Users.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Users.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Users;
});

unwrapExports$1(users);

var videoOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var VideoOff = function VideoOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10' }),
    _react2.default.createElement('line', { x1: '1', y1: '1', x2: '23', y2: '23' })
  );
};

VideoOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

VideoOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = VideoOff;
});

unwrapExports$1(videoOff);

var video$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Video = function Video(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '23 7 16 12 23 17 23 7' }),
    _react2.default.createElement('rect', { x: '1', y: '5', width: '15', height: '14', rx: '2', ry: '2' })
  );
};

Video.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Video.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Video;
});

unwrapExports$1(video$1);

var voicemail = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Voicemail = function Voicemail(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('circle', {
      cx: '5.5',
      cy: '11.5',
      r: '4.5',
      fill: 'none',
      stroke: color,
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('circle', {
      cx: '18.5',
      cy: '11.5',
      r: '4.5',
      fill: 'none',
      stroke: color,
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '5.5',
      y1: '16',
      x2: '18.5',
      y2: '16',
      fill: 'none',
      stroke: color,
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

Voicemail.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Voicemail.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Voicemail;
});

unwrapExports$1(voicemail);

var volume1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Volume1 = function Volume1(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M15.54 8.46a5 5 0 0 1 0 7.07',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Volume1.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Volume1.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Volume1;
});

unwrapExports$1(volume1);

var volume2 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Volume2 = function Volume2(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Volume2.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Volume2.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Volume2;
});

unwrapExports$1(volume2);

var volumeX = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var VolumeX = function VolumeX(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '23',
      y1: '9',
      x2: '17',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '17',
      y1: '9',
      x2: '23',
      y2: '15',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

VolumeX.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

VolumeX.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = VolumeX;
});

unwrapExports$1(volumeX);

var volume = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Volume = function Volume(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('polygon', {
      points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2'
    })
  );
};

Volume.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Volume.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Volume;
});

unwrapExports$1(volume);

var watch = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Watch = function Watch(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '7' }),
    _react2.default.createElement('polyline', { points: '12 9 12 12 13.5 13.5' }),
    _react2.default.createElement('path', { d: 'M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83' })
  );
};

Watch.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Watch.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Watch;
});

unwrapExports$1(watch);

var wifiOff = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var WifiOff = function WifiOff(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('line', {
      x1: '1',
      y1: '1',
      x2: '23',
      y2: '23',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M16.72,11.06A10.94,10.94,0,0,1,19,12.55',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M5,12.55a10.94,10.94,0,0,1,5.17-2.39',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M10.71,5.05A16,16,0,0,1,22.58,9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M1.42,9a15.91,15.91,0,0,1,4.7-2.88',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M8.53,16.11a6,6,0,0,1,6.95,0',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '20',
      x2: '12',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

WifiOff.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

WifiOff.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = WifiOff;
});

unwrapExports$1(wifiOff);

var wifi = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Wifi = function Wifi(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24'
    }, otherProps),
    _react2.default.createElement('path', {
      d: 'M5,12.55a11,11,0,0,1,14.08,0',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M1.42,9A16,16,0,0,1,22.58,9',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: 'M8.53,16.11a6,6,0,0,1,6.95,0',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('line', {
      x1: '12',
      y1: '20',
      x2: '12',
      y2: '20',
      fill: 'none',
      stroke: color,
      strokeLinecap: 'round',
      strokeMiterlimit: '10',
      strokeWidth: '2'
    })
  );
};

Wifi.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Wifi.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Wifi;
});

unwrapExports$1(wifi);

var wind = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Wind = function Wind(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('path', { d: 'M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2' })
  );
};

Wind.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Wind.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Wind;
});

unwrapExports$1(wind);

var xCircle = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var XCircle = function XCircle(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' }),
    _react2.default.createElement('line', { x1: '15', y1: '9', x2: '9', y2: '15' }),
    _react2.default.createElement('line', { x1: '9', y1: '9', x2: '15', y2: '15' })
  );
};

XCircle.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

XCircle.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = XCircle;
});

unwrapExports$1(xCircle);

var xSquare = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var XSquare = function XSquare(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
    _react2.default.createElement('line', { x1: '9', y1: '9', x2: '15', y2: '15' }),
    _react2.default.createElement('line', { x1: '15', y1: '9', x2: '9', y2: '15' })
  );
};

XSquare.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

XSquare.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = XSquare;
});

unwrapExports$1(xSquare);

var x$1 = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var X = function X(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
    _react2.default.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
  );
};

X.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

X.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = X;
});

unwrapExports$1(x$1);

var zap = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Zap = function Zap(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })
  );
};

Zap.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Zap.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = Zap;
});

unwrapExports$1(zap);

var zoomIn = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ZoomIn = function ZoomIn(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '11', cy: '11', r: '8' }),
    _react2.default.createElement('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
    _react2.default.createElement('line', { x1: '11', y1: '8', x2: '11', y2: '14' }),
    _react2.default.createElement('line', { x1: '8', y1: '11', x2: '14', y2: '11' })
  );
};

ZoomIn.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ZoomIn.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ZoomIn;
});

unwrapExports$1(zoomIn);

var zoomOut = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var _react2 = _interopRequireDefault(_react__default);



var _propTypes2 = _interopRequireDefault(propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ZoomOut = function ZoomOut(props) {
  var color = props.color,
      size = props.size,
      otherProps = _objectWithoutProperties(props, ['color', 'size']);

  return _react2.default.createElement(
    'svg',
    _extends({
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, otherProps),
    _react2.default.createElement('circle', { cx: '11', cy: '11', r: '8' }),
    _react2.default.createElement('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' }),
    _react2.default.createElement('line', { x1: '8', y1: '11', x2: '14', y2: '11' })
  );
};

ZoomOut.propTypes = {
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

ZoomOut.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = ZoomOut;
});

unwrapExports$1(zoomOut);

var dist = createCommonjsModule$1(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoomOut = exports.ZoomIn = exports.Zap = exports.X = exports.XSquare = exports.XCircle = exports.Wind = exports.Wifi = exports.WifiOff = exports.Watch = exports.Volume = exports.VolumeX = exports.Volume2 = exports.Volume1 = exports.Voicemail = exports.Video = exports.VideoOff = exports.Users = exports.User = exports.UserX = exports.UserPlus = exports.UserMinus = exports.UserCheck = exports.Upload = exports.UploadCloud = exports.Unlock = exports.Underline = exports.Umbrella = exports.Type = exports.Twitter = exports.Tv = exports.Triangle = exports.TrendingUp = exports.TrendingDown = exports.Trash = exports.Trash2 = exports.ToggleRight = exports.ToggleLeft = exports.ThumbsUp = exports.ThumbsDown = undefined;
exports.Thermometer = exports.Target = exports.Tag = exports.Tablet = exports.Sunset = exports.Sunrise = exports.Sun = exports.StopCircle = exports.Star = exports.Square = exports.Speaker = exports.Smartphone = exports.Sliders = exports.Slash = exports.Slack = exports.SkipForward = exports.SkipBack = exports.Sidebar = exports.Shuffle = exports.ShoppingCart = exports.Shield = exports.Share = exports.Share2 = exports.Settings = exports.Server = exports.Search = exports.Scissors = exports.Save = exports.RotateCw = exports.RotateCcw = exports.Rewind = exports.Repeat = exports.RefreshCw = exports.RefreshCcw = exports.Radio = exports.Printer = exports.Power = exports.Pocket = exports.Plus = exports.PlusSquare = exports.PlusCircle = exports.Play = exports.PlayCircle = exports.PieChart = exports.Phone = exports.PhoneOutgoing = exports.PhoneOff = exports.PhoneMissed = exports.PhoneIncoming = exports.PhoneForwarded = exports.PhoneCall = exports.Percent = exports.Pause = exports.PauseCircle = exports.Paperclip = exports.Package = exports.Octagon = exports.Navigation = exports.Navigation2 = exports.Music = exports.Move = exports.MoreVertical = exports.MoreHorizontal = exports.Moon = exports.Monitor = exports.Minus = exports.MinusSquare = exports.MinusCircle = exports.Minimize = exports.Minimize2 = exports.Mic = exports.MicOff = exports.MessageSquare = exports.MessageCircle = exports.Menu = exports.Maximize = exports.Maximize2 = exports.Map = exports.MapPin = exports.Mail = exports.LogOut = exports.LogIn = exports.Lock = exports.Loader = exports.List = exports.Link = exports.Link2 = exports.LifeBuoy = exports.Layout = exports.Layers = exports.Italic = exports.Instagram = exports.Info = exports.Inbox = exports.Image = exports.Home = exports.HelpCircle = exports.Heart = exports.Headphones = exports.Hash = undefined;
exports.Grid = exports.Globe = exports.Gitlab = exports.Github = exports.Folder = exports.Flag = exports.Filter = exports.Film = exports.File = exports.FileText = exports.FilePlus = exports.FileMinus = exports.Feather = exports.FastForward = exports.Facebook = exports.Eye = exports.EyeOff = exports.ExternalLink = exports.Edit = exports.Edit3 = exports.Edit2 = exports.Droplet = exports.Download = exports.DownloadCloud = exports.Disc = exports.Delete = exports.Crosshair = exports.Crop = exports.CreditCard = exports.Cpu = exports.CornerUpRight = exports.CornerUpLeft = exports.CornerRightUp = exports.CornerRightDown = exports.CornerLeftUp = exports.CornerLeftDown = exports.CornerDownRight = exports.CornerDownLeft = exports.Copy = exports.Compass = exports.Command = exports.Codepen = exports.Cloud = exports.CloudSnow = exports.CloudRain = exports.CloudOff = exports.CloudLightning = exports.CloudDrizzle = exports.Clock = exports.Clipboard = exports.Circle = exports.Chrome = exports.ChevronsUp = exports.ChevronsRight = exports.ChevronsLeft = exports.ChevronsDown = exports.ChevronUp = exports.ChevronRight = exports.ChevronLeft = exports.ChevronDown = exports.Check = exports.CheckSquare = exports.CheckCircle = exports.Cast = exports.Camera = exports.CameraOff = exports.Calendar = exports.Briefcase = exports.Box = exports.Bookmark = exports.Book = exports.Bold = exports.Bluetooth = exports.Bell = exports.BellOff = exports.Battery = exports.BatteryCharging = exports.BarChart = exports.BarChart2 = exports.Award = exports.AtSign = exports.ArrowUp = exports.ArrowUpRight = exports.ArrowUpLeft = exports.ArrowRight = exports.ArrowLeft = exports.ArrowDown = exports.ArrowDownRight = exports.ArrowDownLeft = exports.Aperture = exports.Anchor = exports.AlignRight = exports.AlignLeft = exports.AlignJustify = exports.AlignCenter = exports.AlertTriangle = exports.AlertOctagon = exports.AlertCircle = exports.Airplay = exports.Activity = undefined;



var _activity2 = _interopRequireDefault(activity);



var _airplay2 = _interopRequireDefault(airplay);



var _alertCircle2 = _interopRequireDefault(alertCircle);



var _alertOctagon2 = _interopRequireDefault(alertOctagon);



var _alertTriangle2 = _interopRequireDefault(alertTriangle);



var _alignCenter2 = _interopRequireDefault(alignCenter);



var _alignJustify2 = _interopRequireDefault(alignJustify);



var _alignLeft2 = _interopRequireDefault(alignLeft);



var _alignRight2 = _interopRequireDefault(alignRight);



var _anchor2 = _interopRequireDefault(anchor);



var _aperture2 = _interopRequireDefault(aperture);



var _arrowDownLeft2 = _interopRequireDefault(arrowDownLeft);



var _arrowDownRight2 = _interopRequireDefault(arrowDownRight);



var _arrowDown2 = _interopRequireDefault(arrowDown);



var _arrowLeft2 = _interopRequireDefault(arrowLeft);



var _arrowRight2 = _interopRequireDefault(arrowRight);



var _arrowUpLeft2 = _interopRequireDefault(arrowUpLeft);



var _arrowUpRight2 = _interopRequireDefault(arrowUpRight);



var _arrowUp2 = _interopRequireDefault(arrowUp);



var _atSign2 = _interopRequireDefault(atSign);



var _award2 = _interopRequireDefault(award);



var _barChart2 = _interopRequireDefault(barChart2);



var _barChart4 = _interopRequireDefault(barChart);



var _batteryCharging2 = _interopRequireDefault(batteryCharging);



var _battery2 = _interopRequireDefault(battery);



var _bellOff2 = _interopRequireDefault(bellOff);



var _bell2 = _interopRequireDefault(bell);



var _bluetooth2 = _interopRequireDefault(bluetooth);



var _bold2 = _interopRequireDefault(bold);



var _book2 = _interopRequireDefault(book);



var _bookmark2 = _interopRequireDefault(bookmark);



var _box2 = _interopRequireDefault(box);



var _briefcase2 = _interopRequireDefault(briefcase);



var _calendar2 = _interopRequireDefault(calendar);



var _cameraOff2 = _interopRequireDefault(cameraOff);



var _camera2 = _interopRequireDefault(camera);



var _cast2 = _interopRequireDefault(cast);



var _checkCircle2 = _interopRequireDefault(checkCircle);



var _checkSquare2 = _interopRequireDefault(checkSquare);



var _check2 = _interopRequireDefault(check);



var _chevronDown2 = _interopRequireDefault(chevronDown);



var _chevronLeft2 = _interopRequireDefault(chevronLeft);



var _chevronRight2 = _interopRequireDefault(chevronRight);



var _chevronUp2 = _interopRequireDefault(chevronUp);



var _chevronsDown2 = _interopRequireDefault(chevronsDown);



var _chevronsLeft2 = _interopRequireDefault(chevronsLeft);



var _chevronsRight2 = _interopRequireDefault(chevronsRight);



var _chevronsUp2 = _interopRequireDefault(chevronsUp);



var _chrome2 = _interopRequireDefault(chrome);



var _circle2 = _interopRequireDefault(circle);



var _clipboard2 = _interopRequireDefault(clipboard);



var _clock2 = _interopRequireDefault(clock);



var _cloudDrizzle2 = _interopRequireDefault(cloudDrizzle);



var _cloudLightning2 = _interopRequireDefault(cloudLightning);



var _cloudOff2 = _interopRequireDefault(cloudOff);



var _cloudRain2 = _interopRequireDefault(cloudRain);



var _cloudSnow2 = _interopRequireDefault(cloudSnow);



var _cloud2 = _interopRequireDefault(cloud);



var _codepen2 = _interopRequireDefault(codepen);



var _command2 = _interopRequireDefault(command);



var _compass2 = _interopRequireDefault(compass);



var _copy2 = _interopRequireDefault(copy);



var _cornerDownLeft2 = _interopRequireDefault(cornerDownLeft);



var _cornerDownRight2 = _interopRequireDefault(cornerDownRight);



var _cornerLeftDown2 = _interopRequireDefault(cornerLeftDown);



var _cornerLeftUp2 = _interopRequireDefault(cornerLeftUp);



var _cornerRightDown2 = _interopRequireDefault(cornerRightDown);



var _cornerRightUp2 = _interopRequireDefault(cornerRightUp);



var _cornerUpLeft2 = _interopRequireDefault(cornerUpLeft);



var _cornerUpRight2 = _interopRequireDefault(cornerUpRight);



var _cpu2 = _interopRequireDefault(cpu);



var _creditCard2 = _interopRequireDefault(creditCard);



var _crop2 = _interopRequireDefault(crop);



var _crosshair2 = _interopRequireDefault(crosshair);



var _delete2 = _interopRequireDefault(_delete);



var _disc2 = _interopRequireDefault(disc);



var _downloadCloud2 = _interopRequireDefault(downloadCloud);



var _download2 = _interopRequireDefault(download);



var _droplet2 = _interopRequireDefault(droplet);



var _edit2 = _interopRequireDefault(edit2);



var _edit4 = _interopRequireDefault(edit3);



var _edit6 = _interopRequireDefault(edit);



var _externalLink2 = _interopRequireDefault(externalLink);



var _eyeOff2 = _interopRequireDefault(eyeOff);



var _eye2 = _interopRequireDefault(eye);



var _facebook2 = _interopRequireDefault(facebook);



var _fastForward2 = _interopRequireDefault(fastForward);



var _feather2 = _interopRequireDefault(feather);



var _fileMinus2 = _interopRequireDefault(fileMinus);



var _filePlus2 = _interopRequireDefault(filePlus);



var _fileText2 = _interopRequireDefault(fileText);



var _file2 = _interopRequireDefault(file);



var _film2 = _interopRequireDefault(film);



var _filter2 = _interopRequireDefault(filter$1);



var _flag2 = _interopRequireDefault(flag);



var _folder2 = _interopRequireDefault(folder);



var _github2 = _interopRequireDefault(github);



var _gitlab2 = _interopRequireDefault(gitlab);



var _globe2 = _interopRequireDefault(globe);



var _grid2 = _interopRequireDefault(grid);



var _hash2 = _interopRequireDefault(hash$2);



var _headphones2 = _interopRequireDefault(headphones);



var _heart2 = _interopRequireDefault(heart);



var _helpCircle2 = _interopRequireDefault(helpCircle);



var _home2 = _interopRequireDefault(home);



var _image2 = _interopRequireDefault(image);



var _inbox2 = _interopRequireDefault(inbox);



var _info2 = _interopRequireDefault(info);



var _instagram2 = _interopRequireDefault(instagram);



var _italic2 = _interopRequireDefault(italic);



var _layers2 = _interopRequireDefault(layers);



var _layout2 = _interopRequireDefault(layout);



var _lifeBuoy2 = _interopRequireDefault(lifeBuoy);



var _link2 = _interopRequireDefault(link2);



var _link4 = _interopRequireDefault(link$1);



var _list2 = _interopRequireDefault(list);



var _loader2 = _interopRequireDefault(loader);



var _lock2 = _interopRequireDefault(lock);



var _logIn2 = _interopRequireDefault(logIn);



var _logOut2 = _interopRequireDefault(logOut);



var _mail2 = _interopRequireDefault(mail);



var _mapPin2 = _interopRequireDefault(mapPin);



var _map2 = _interopRequireDefault(map$1);



var _maximize2 = _interopRequireDefault(maximize2);



var _maximize4 = _interopRequireDefault(maximize);



var _menu2 = _interopRequireDefault(menu);



var _messageCircle2 = _interopRequireDefault(messageCircle);



var _messageSquare2 = _interopRequireDefault(messageSquare);



var _micOff2 = _interopRequireDefault(micOff);



var _mic2 = _interopRequireDefault(mic);



var _minimize2 = _interopRequireDefault(minimize2);



var _minimize4 = _interopRequireDefault(minimize);



var _minusCircle2 = _interopRequireDefault(minusCircle);



var _minusSquare2 = _interopRequireDefault(minusSquare);



var _minus2 = _interopRequireDefault(minus);



var _monitor2 = _interopRequireDefault(monitor);



var _moon2 = _interopRequireDefault(moon);



var _moreHorizontal2 = _interopRequireDefault(moreHorizontal);



var _moreVertical2 = _interopRequireDefault(moreVertical);



var _move2 = _interopRequireDefault(move);



var _music2 = _interopRequireDefault(music);



var _navigation2 = _interopRequireDefault(navigation2);



var _navigation4 = _interopRequireDefault(navigation);



var _octagon2 = _interopRequireDefault(octagon);



var _package2 = _interopRequireDefault(_package);



var _paperclip2 = _interopRequireDefault(paperclip);



var _pauseCircle2 = _interopRequireDefault(pauseCircle);



var _pause2 = _interopRequireDefault(pause);



var _percent2 = _interopRequireDefault(percent);



var _phoneCall2 = _interopRequireDefault(phoneCall);



var _phoneForwarded2 = _interopRequireDefault(phoneForwarded);



var _phoneIncoming2 = _interopRequireDefault(phoneIncoming);



var _phoneMissed2 = _interopRequireDefault(phoneMissed);



var _phoneOff2 = _interopRequireDefault(phoneOff);



var _phoneOutgoing2 = _interopRequireDefault(phoneOutgoing);



var _phone2 = _interopRequireDefault(phone);



var _pieChart2 = _interopRequireDefault(pieChart);



var _playCircle2 = _interopRequireDefault(playCircle);



var _play2 = _interopRequireDefault(play);



var _plusCircle2 = _interopRequireDefault(plusCircle);



var _plusSquare2 = _interopRequireDefault(plusSquare);



var _plus2 = _interopRequireDefault(plus$1);



var _pocket2 = _interopRequireDefault(pocket);



var _power2 = _interopRequireDefault(power);



var _printer2 = _interopRequireDefault(printer);



var _radio2 = _interopRequireDefault(radio);



var _refreshCcw2 = _interopRequireDefault(refreshCcw);



var _refreshCw2 = _interopRequireDefault(refreshCw);



var _repeat2 = _interopRequireDefault(repeat);



var _rewind2 = _interopRequireDefault(rewind);



var _rotateCcw2 = _interopRequireDefault(rotateCcw);



var _rotateCw2 = _interopRequireDefault(rotateCw);



var _save2 = _interopRequireDefault(save);



var _scissors2 = _interopRequireDefault(scissors);



var _search2 = _interopRequireDefault(search);



var _server2 = _interopRequireDefault(server);



var _settings2 = _interopRequireDefault(settings);



var _share2 = _interopRequireDefault(share2);



var _share4 = _interopRequireDefault(share);



var _shield2 = _interopRequireDefault(shield);



var _shoppingCart2 = _interopRequireDefault(shoppingCart);



var _shuffle2 = _interopRequireDefault(shuffle);



var _sidebar2 = _interopRequireDefault(sidebar);



var _skipBack2 = _interopRequireDefault(skipBack);



var _skipForward2 = _interopRequireDefault(skipForward);



var _slack2 = _interopRequireDefault(slack);



var _slash2 = _interopRequireDefault(slash);



var _sliders2 = _interopRequireDefault(sliders);



var _smartphone2 = _interopRequireDefault(smartphone);



var _speaker2 = _interopRequireDefault(speaker);



var _square2 = _interopRequireDefault(square);



var _star2 = _interopRequireDefault(star);



var _stopCircle2 = _interopRequireDefault(stopCircle);



var _sun2 = _interopRequireDefault(sun);



var _sunrise2 = _interopRequireDefault(sunrise);



var _sunset2 = _interopRequireDefault(sunset);



var _tablet2 = _interopRequireDefault(tablet);



var _tag2 = _interopRequireDefault(tag);



var _target2 = _interopRequireDefault(target);



var _thermometer2 = _interopRequireDefault(thermometer);



var _thumbsDown2 = _interopRequireDefault(thumbsDown);



var _thumbsUp2 = _interopRequireDefault(thumbsUp);



var _toggleLeft2 = _interopRequireDefault(toggleLeft);



var _toggleRight2 = _interopRequireDefault(toggleRight);



var _trash2 = _interopRequireDefault(trash2);



var _trash4 = _interopRequireDefault(trash);



var _trendingDown2 = _interopRequireDefault(trendingDown);



var _trendingUp2 = _interopRequireDefault(trendingUp);



var _triangle2 = _interopRequireDefault(triangle);



var _tv2 = _interopRequireDefault(tv);



var _twitter2 = _interopRequireDefault(twitter);



var _type2 = _interopRequireDefault(type);



var _umbrella2 = _interopRequireDefault(umbrella);



var _underline2 = _interopRequireDefault(underline);



var _unlock2 = _interopRequireDefault(unlock);



var _uploadCloud2 = _interopRequireDefault(uploadCloud);



var _upload2 = _interopRequireDefault(upload);



var _userCheck2 = _interopRequireDefault(userCheck);



var _userMinus2 = _interopRequireDefault(userMinus);



var _userPlus2 = _interopRequireDefault(userPlus);



var _userX2 = _interopRequireDefault(userX);



var _user2 = _interopRequireDefault(user);



var _users2 = _interopRequireDefault(users);



var _videoOff2 = _interopRequireDefault(videoOff);



var _video2 = _interopRequireDefault(video$1);



var _voicemail2 = _interopRequireDefault(voicemail);



var _volume2 = _interopRequireDefault(volume1);



var _volume4 = _interopRequireDefault(volume2);



var _volumeX2 = _interopRequireDefault(volumeX);



var _volume6 = _interopRequireDefault(volume);



var _watch2 = _interopRequireDefault(watch);



var _wifiOff2 = _interopRequireDefault(wifiOff);



var _wifi2 = _interopRequireDefault(wifi);



var _wind2 = _interopRequireDefault(wind);



var _xCircle2 = _interopRequireDefault(xCircle);



var _xSquare2 = _interopRequireDefault(xSquare);



var _x2 = _interopRequireDefault(x$1);



var _zap2 = _interopRequireDefault(zap);



var _zoomIn2 = _interopRequireDefault(zoomIn);



var _zoomOut2 = _interopRequireDefault(zoomOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Activity = _activity2.default;
exports.Airplay = _airplay2.default;
exports.AlertCircle = _alertCircle2.default;
exports.AlertOctagon = _alertOctagon2.default;
exports.AlertTriangle = _alertTriangle2.default;
exports.AlignCenter = _alignCenter2.default;
exports.AlignJustify = _alignJustify2.default;
exports.AlignLeft = _alignLeft2.default;
exports.AlignRight = _alignRight2.default;
exports.Anchor = _anchor2.default;
exports.Aperture = _aperture2.default;
exports.ArrowDownLeft = _arrowDownLeft2.default;
exports.ArrowDownRight = _arrowDownRight2.default;
exports.ArrowDown = _arrowDown2.default;
exports.ArrowLeft = _arrowLeft2.default;
exports.ArrowRight = _arrowRight2.default;
exports.ArrowUpLeft = _arrowUpLeft2.default;
exports.ArrowUpRight = _arrowUpRight2.default;
exports.ArrowUp = _arrowUp2.default;
exports.AtSign = _atSign2.default;
exports.Award = _award2.default;
exports.BarChart2 = _barChart2.default;
exports.BarChart = _barChart4.default;
exports.BatteryCharging = _batteryCharging2.default;
exports.Battery = _battery2.default;
exports.BellOff = _bellOff2.default;
exports.Bell = _bell2.default;
exports.Bluetooth = _bluetooth2.default;
exports.Bold = _bold2.default;
exports.Book = _book2.default;
exports.Bookmark = _bookmark2.default;
exports.Box = _box2.default;
exports.Briefcase = _briefcase2.default;
exports.Calendar = _calendar2.default;
exports.CameraOff = _cameraOff2.default;
exports.Camera = _camera2.default;
exports.Cast = _cast2.default;
exports.CheckCircle = _checkCircle2.default;
exports.CheckSquare = _checkSquare2.default;
exports.Check = _check2.default;
exports.ChevronDown = _chevronDown2.default;
exports.ChevronLeft = _chevronLeft2.default;
exports.ChevronRight = _chevronRight2.default;
exports.ChevronUp = _chevronUp2.default;
exports.ChevronsDown = _chevronsDown2.default;
exports.ChevronsLeft = _chevronsLeft2.default;
exports.ChevronsRight = _chevronsRight2.default;
exports.ChevronsUp = _chevronsUp2.default;
exports.Chrome = _chrome2.default;
exports.Circle = _circle2.default;
exports.Clipboard = _clipboard2.default;
exports.Clock = _clock2.default;
exports.CloudDrizzle = _cloudDrizzle2.default;
exports.CloudLightning = _cloudLightning2.default;
exports.CloudOff = _cloudOff2.default;
exports.CloudRain = _cloudRain2.default;
exports.CloudSnow = _cloudSnow2.default;
exports.Cloud = _cloud2.default;
exports.Codepen = _codepen2.default;
exports.Command = _command2.default;
exports.Compass = _compass2.default;
exports.Copy = _copy2.default;
exports.CornerDownLeft = _cornerDownLeft2.default;
exports.CornerDownRight = _cornerDownRight2.default;
exports.CornerLeftDown = _cornerLeftDown2.default;
exports.CornerLeftUp = _cornerLeftUp2.default;
exports.CornerRightDown = _cornerRightDown2.default;
exports.CornerRightUp = _cornerRightUp2.default;
exports.CornerUpLeft = _cornerUpLeft2.default;
exports.CornerUpRight = _cornerUpRight2.default;
exports.Cpu = _cpu2.default;
exports.CreditCard = _creditCard2.default;
exports.Crop = _crop2.default;
exports.Crosshair = _crosshair2.default;
exports.Delete = _delete2.default;
exports.Disc = _disc2.default;
exports.DownloadCloud = _downloadCloud2.default;
exports.Download = _download2.default;
exports.Droplet = _droplet2.default;
exports.Edit2 = _edit2.default;
exports.Edit3 = _edit4.default;
exports.Edit = _edit6.default;
exports.ExternalLink = _externalLink2.default;
exports.EyeOff = _eyeOff2.default;
exports.Eye = _eye2.default;
exports.Facebook = _facebook2.default;
exports.FastForward = _fastForward2.default;
exports.Feather = _feather2.default;
exports.FileMinus = _fileMinus2.default;
exports.FilePlus = _filePlus2.default;
exports.FileText = _fileText2.default;
exports.File = _file2.default;
exports.Film = _film2.default;
exports.Filter = _filter2.default;
exports.Flag = _flag2.default;
exports.Folder = _folder2.default;
exports.Github = _github2.default;
exports.Gitlab = _gitlab2.default;
exports.Globe = _globe2.default;
exports.Grid = _grid2.default;
exports.Hash = _hash2.default;
exports.Headphones = _headphones2.default;
exports.Heart = _heart2.default;
exports.HelpCircle = _helpCircle2.default;
exports.Home = _home2.default;
exports.Image = _image2.default;
exports.Inbox = _inbox2.default;
exports.Info = _info2.default;
exports.Instagram = _instagram2.default;
exports.Italic = _italic2.default;
exports.Layers = _layers2.default;
exports.Layout = _layout2.default;
exports.LifeBuoy = _lifeBuoy2.default;
exports.Link2 = _link2.default;
exports.Link = _link4.default;
exports.List = _list2.default;
exports.Loader = _loader2.default;
exports.Lock = _lock2.default;
exports.LogIn = _logIn2.default;
exports.LogOut = _logOut2.default;
exports.Mail = _mail2.default;
exports.MapPin = _mapPin2.default;
exports.Map = _map2.default;
exports.Maximize2 = _maximize2.default;
exports.Maximize = _maximize4.default;
exports.Menu = _menu2.default;
exports.MessageCircle = _messageCircle2.default;
exports.MessageSquare = _messageSquare2.default;
exports.MicOff = _micOff2.default;
exports.Mic = _mic2.default;
exports.Minimize2 = _minimize2.default;
exports.Minimize = _minimize4.default;
exports.MinusCircle = _minusCircle2.default;
exports.MinusSquare = _minusSquare2.default;
exports.Minus = _minus2.default;
exports.Monitor = _monitor2.default;
exports.Moon = _moon2.default;
exports.MoreHorizontal = _moreHorizontal2.default;
exports.MoreVertical = _moreVertical2.default;
exports.Move = _move2.default;
exports.Music = _music2.default;
exports.Navigation2 = _navigation2.default;
exports.Navigation = _navigation4.default;
exports.Octagon = _octagon2.default;
exports.Package = _package2.default;
exports.Paperclip = _paperclip2.default;
exports.PauseCircle = _pauseCircle2.default;
exports.Pause = _pause2.default;
exports.Percent = _percent2.default;
exports.PhoneCall = _phoneCall2.default;
exports.PhoneForwarded = _phoneForwarded2.default;
exports.PhoneIncoming = _phoneIncoming2.default;
exports.PhoneMissed = _phoneMissed2.default;
exports.PhoneOff = _phoneOff2.default;
exports.PhoneOutgoing = _phoneOutgoing2.default;
exports.Phone = _phone2.default;
exports.PieChart = _pieChart2.default;
exports.PlayCircle = _playCircle2.default;
exports.Play = _play2.default;
exports.PlusCircle = _plusCircle2.default;
exports.PlusSquare = _plusSquare2.default;
exports.Plus = _plus2.default;
exports.Pocket = _pocket2.default;
exports.Power = _power2.default;
exports.Printer = _printer2.default;
exports.Radio = _radio2.default;
exports.RefreshCcw = _refreshCcw2.default;
exports.RefreshCw = _refreshCw2.default;
exports.Repeat = _repeat2.default;
exports.Rewind = _rewind2.default;
exports.RotateCcw = _rotateCcw2.default;
exports.RotateCw = _rotateCw2.default;
exports.Save = _save2.default;
exports.Scissors = _scissors2.default;
exports.Search = _search2.default;
exports.Server = _server2.default;
exports.Settings = _settings2.default;
exports.Share2 = _share2.default;
exports.Share = _share4.default;
exports.Shield = _shield2.default;
exports.ShoppingCart = _shoppingCart2.default;
exports.Shuffle = _shuffle2.default;
exports.Sidebar = _sidebar2.default;
exports.SkipBack = _skipBack2.default;
exports.SkipForward = _skipForward2.default;
exports.Slack = _slack2.default;
exports.Slash = _slash2.default;
exports.Sliders = _sliders2.default;
exports.Smartphone = _smartphone2.default;
exports.Speaker = _speaker2.default;
exports.Square = _square2.default;
exports.Star = _star2.default;
exports.StopCircle = _stopCircle2.default;
exports.Sun = _sun2.default;
exports.Sunrise = _sunrise2.default;
exports.Sunset = _sunset2.default;
exports.Tablet = _tablet2.default;
exports.Tag = _tag2.default;
exports.Target = _target2.default;
exports.Thermometer = _thermometer2.default;
exports.ThumbsDown = _thumbsDown2.default;
exports.ThumbsUp = _thumbsUp2.default;
exports.ToggleLeft = _toggleLeft2.default;
exports.ToggleRight = _toggleRight2.default;
exports.Trash2 = _trash2.default;
exports.Trash = _trash4.default;
exports.TrendingDown = _trendingDown2.default;
exports.TrendingUp = _trendingUp2.default;
exports.Triangle = _triangle2.default;
exports.Tv = _tv2.default;
exports.Twitter = _twitter2.default;
exports.Type = _type2.default;
exports.Umbrella = _umbrella2.default;
exports.Underline = _underline2.default;
exports.Unlock = _unlock2.default;
exports.UploadCloud = _uploadCloud2.default;
exports.Upload = _upload2.default;
exports.UserCheck = _userCheck2.default;
exports.UserMinus = _userMinus2.default;
exports.UserPlus = _userPlus2.default;
exports.UserX = _userX2.default;
exports.User = _user2.default;
exports.Users = _users2.default;
exports.VideoOff = _videoOff2.default;
exports.Video = _video2.default;
exports.Voicemail = _voicemail2.default;
exports.Volume1 = _volume2.default;
exports.Volume2 = _volume4.default;
exports.VolumeX = _volumeX2.default;
exports.Volume = _volume6.default;
exports.Watch = _watch2.default;
exports.WifiOff = _wifiOff2.default;
exports.Wifi = _wifi2.default;
exports.Wind = _wind2.default;
exports.XCircle = _xCircle2.default;
exports.XSquare = _xSquare2.default;
exports.X = _x2.default;
exports.Zap = _zap2.default;
exports.ZoomIn = _zoomIn2.default;
exports.ZoomOut = _zoomOut2.default;
});

var index$3$1 = unwrapExports$1(dist);
var dist_1 = dist.ZoomOut;
var dist_2 = dist.ZoomIn;
var dist_3 = dist.Zap;
var dist_4 = dist.X;
var dist_5 = dist.XSquare;
var dist_6 = dist.XCircle;
var dist_7 = dist.Wind;
var dist_8 = dist.Wifi;
var dist_9 = dist.WifiOff;
var dist_10 = dist.Watch;
var dist_11 = dist.Volume;
var dist_12 = dist.VolumeX;
var dist_13 = dist.Volume2;
var dist_14 = dist.Volume1;
var dist_15 = dist.Voicemail;
var dist_16 = dist.Video;
var dist_17 = dist.VideoOff;
var dist_18 = dist.Users;
var dist_19 = dist.User;
var dist_20 = dist.UserX;
var dist_21 = dist.UserPlus;
var dist_22 = dist.UserMinus;
var dist_23 = dist.UserCheck;
var dist_24 = dist.Upload;
var dist_25 = dist.UploadCloud;
var dist_26 = dist.Unlock;
var dist_27 = dist.Underline;
var dist_28 = dist.Umbrella;
var dist_29 = dist.Type;
var dist_30 = dist.Twitter;
var dist_31 = dist.Tv;
var dist_32 = dist.Triangle;
var dist_33 = dist.TrendingUp;
var dist_34 = dist.TrendingDown;
var dist_35 = dist.Trash;
var dist_36 = dist.Trash2;
var dist_37 = dist.ToggleRight;
var dist_38 = dist.ToggleLeft;
var dist_39 = dist.ThumbsUp;
var dist_40 = dist.ThumbsDown;
var dist_41 = dist.Thermometer;
var dist_42 = dist.Target;
var dist_43 = dist.Tag;
var dist_44 = dist.Tablet;
var dist_45 = dist.Sunset;
var dist_46 = dist.Sunrise;
var dist_47 = dist.Sun;
var dist_48 = dist.StopCircle;
var dist_49 = dist.Star;
var dist_50 = dist.Square;
var dist_51 = dist.Speaker;
var dist_52 = dist.Smartphone;
var dist_53 = dist.Sliders;
var dist_54 = dist.Slash;
var dist_55 = dist.Slack;
var dist_56 = dist.SkipForward;
var dist_57 = dist.SkipBack;
var dist_58 = dist.Sidebar;
var dist_59 = dist.Shuffle;
var dist_60 = dist.ShoppingCart;
var dist_61 = dist.Shield;
var dist_62 = dist.Share;
var dist_63 = dist.Share2;
var dist_64 = dist.Settings;
var dist_65 = dist.Server;
var dist_66 = dist.Search;
var dist_67 = dist.Scissors;
var dist_68 = dist.Save;
var dist_69 = dist.RotateCw;
var dist_70 = dist.RotateCcw;
var dist_71 = dist.Rewind;
var dist_72 = dist.Repeat;
var dist_73 = dist.RefreshCw;
var dist_74 = dist.RefreshCcw;
var dist_75 = dist.Radio;
var dist_76 = dist.Printer;
var dist_77 = dist.Power;
var dist_78 = dist.Pocket;
var dist_79 = dist.Plus;
var dist_80 = dist.PlusSquare;
var dist_81 = dist.PlusCircle;
var dist_82 = dist.Play;
var dist_83 = dist.PlayCircle;
var dist_84 = dist.PieChart;
var dist_85 = dist.Phone;
var dist_86 = dist.PhoneOutgoing;
var dist_87 = dist.PhoneOff;
var dist_88 = dist.PhoneMissed;
var dist_89 = dist.PhoneIncoming;
var dist_90 = dist.PhoneForwarded;
var dist_91 = dist.PhoneCall;
var dist_92 = dist.Percent;
var dist_93 = dist.Pause;
var dist_94 = dist.PauseCircle;
var dist_95 = dist.Paperclip;
var dist_96 = dist.Package;
var dist_97 = dist.Octagon;
var dist_98 = dist.Navigation;
var dist_99 = dist.Navigation2;
var dist_100 = dist.Music;
var dist_101 = dist.Move;
var dist_102 = dist.MoreVertical;
var dist_103 = dist.MoreHorizontal;
var dist_104 = dist.Moon;
var dist_105 = dist.Monitor;
var dist_106 = dist.Minus;
var dist_107 = dist.MinusSquare;
var dist_108 = dist.MinusCircle;
var dist_109 = dist.Minimize;
var dist_110 = dist.Minimize2;
var dist_111 = dist.Mic;
var dist_112 = dist.MicOff;
var dist_113 = dist.MessageSquare;
var dist_114 = dist.MessageCircle;
var dist_115 = dist.Menu;
var dist_116 = dist.Maximize;
var dist_117 = dist.Maximize2;
var dist_118 = dist.Map;
var dist_119 = dist.MapPin;
var dist_120 = dist.Mail;
var dist_121 = dist.LogOut;
var dist_122 = dist.LogIn;
var dist_123 = dist.Lock;
var dist_124 = dist.Loader;
var dist_125 = dist.List;
var dist_126 = dist.Link;
var dist_127 = dist.Link2;
var dist_128 = dist.LifeBuoy;
var dist_129 = dist.Layout;
var dist_130 = dist.Layers;
var dist_131 = dist.Italic;
var dist_132 = dist.Instagram;
var dist_133 = dist.Info;
var dist_134 = dist.Inbox;
var dist_135 = dist.Image;
var dist_136 = dist.Home;
var dist_137 = dist.HelpCircle;
var dist_138 = dist.Heart;
var dist_139 = dist.Headphones;
var dist_140 = dist.Hash;
var dist_141 = dist.Grid;
var dist_142 = dist.Globe;
var dist_143 = dist.Gitlab;
var dist_144 = dist.Github;
var dist_145 = dist.Folder;
var dist_146 = dist.Flag;
var dist_147 = dist.Filter;
var dist_148 = dist.Film;
var dist_149 = dist.File;
var dist_150 = dist.FileText;
var dist_151 = dist.FilePlus;
var dist_152 = dist.FileMinus;
var dist_153 = dist.Feather;
var dist_154 = dist.FastForward;
var dist_155 = dist.Facebook;
var dist_156 = dist.Eye;
var dist_157 = dist.EyeOff;
var dist_158 = dist.ExternalLink;
var dist_159 = dist.Edit;
var dist_160 = dist.Edit3;
var dist_161 = dist.Edit2;
var dist_162 = dist.Droplet;
var dist_163 = dist.Download;
var dist_164 = dist.DownloadCloud;
var dist_165 = dist.Disc;
var dist_166 = dist.Delete;
var dist_167 = dist.Crosshair;
var dist_168 = dist.Crop;
var dist_169 = dist.CreditCard;
var dist_170 = dist.Cpu;
var dist_171 = dist.CornerUpRight;
var dist_172 = dist.CornerUpLeft;
var dist_173 = dist.CornerRightUp;
var dist_174 = dist.CornerRightDown;
var dist_175 = dist.CornerLeftUp;
var dist_176 = dist.CornerLeftDown;
var dist_177 = dist.CornerDownRight;
var dist_178 = dist.CornerDownLeft;
var dist_179 = dist.Copy;
var dist_180 = dist.Compass;
var dist_181 = dist.Command;
var dist_182 = dist.Codepen;
var dist_183 = dist.Cloud;
var dist_184 = dist.CloudSnow;
var dist_185 = dist.CloudRain;
var dist_186 = dist.CloudOff;
var dist_187 = dist.CloudLightning;
var dist_188 = dist.CloudDrizzle;
var dist_189 = dist.Clock;
var dist_190 = dist.Clipboard;
var dist_191 = dist.Circle;
var dist_192 = dist.Chrome;
var dist_193 = dist.ChevronsUp;
var dist_194 = dist.ChevronsRight;
var dist_195 = dist.ChevronsLeft;
var dist_196 = dist.ChevronsDown;
var dist_197 = dist.ChevronUp;
var dist_198 = dist.ChevronRight;
var dist_199 = dist.ChevronLeft;
var dist_200 = dist.ChevronDown;
var dist_201 = dist.Check;
var dist_202 = dist.CheckSquare;
var dist_203 = dist.CheckCircle;
var dist_204 = dist.Cast;
var dist_205 = dist.Camera;
var dist_206 = dist.CameraOff;
var dist_207 = dist.Calendar;
var dist_208 = dist.Briefcase;
var dist_209 = dist.Box;
var dist_210 = dist.Bookmark;
var dist_211 = dist.Book;
var dist_212 = dist.Bold;
var dist_213 = dist.Bluetooth;
var dist_214 = dist.Bell;
var dist_215 = dist.BellOff;
var dist_216 = dist.Battery;
var dist_217 = dist.BatteryCharging;
var dist_218 = dist.BarChart;
var dist_219 = dist.BarChart2;
var dist_220 = dist.Award;
var dist_221 = dist.AtSign;
var dist_222 = dist.ArrowUp;
var dist_223 = dist.ArrowUpRight;
var dist_224 = dist.ArrowUpLeft;
var dist_225 = dist.ArrowRight;
var dist_226 = dist.ArrowLeft;
var dist_227 = dist.ArrowDown;
var dist_228 = dist.ArrowDownRight;
var dist_229 = dist.ArrowDownLeft;
var dist_230 = dist.Aperture;
var dist_231 = dist.Anchor;
var dist_232 = dist.AlignRight;
var dist_233 = dist.AlignLeft;
var dist_234 = dist.AlignJustify;
var dist_235 = dist.AlignCenter;
var dist_236 = dist.AlertTriangle;
var dist_237 = dist.AlertOctagon;
var dist_238 = dist.AlertCircle;
var dist_239 = dist.Airplay;
var dist_240 = dist.Activity;


var ReactFeather = Object.freeze({
	default: index$3$1,
	__moduleExports: dist,
	ZoomOut: dist_1,
	ZoomIn: dist_2,
	Zap: dist_3,
	X: dist_4,
	XSquare: dist_5,
	XCircle: dist_6,
	Wind: dist_7,
	Wifi: dist_8,
	WifiOff: dist_9,
	Watch: dist_10,
	Volume: dist_11,
	VolumeX: dist_12,
	Volume2: dist_13,
	Volume1: dist_14,
	Voicemail: dist_15,
	Video: dist_16,
	VideoOff: dist_17,
	Users: dist_18,
	User: dist_19,
	UserX: dist_20,
	UserPlus: dist_21,
	UserMinus: dist_22,
	UserCheck: dist_23,
	Upload: dist_24,
	UploadCloud: dist_25,
	Unlock: dist_26,
	Underline: dist_27,
	Umbrella: dist_28,
	Type: dist_29,
	Twitter: dist_30,
	Tv: dist_31,
	Triangle: dist_32,
	TrendingUp: dist_33,
	TrendingDown: dist_34,
	Trash: dist_35,
	Trash2: dist_36,
	ToggleRight: dist_37,
	ToggleLeft: dist_38,
	ThumbsUp: dist_39,
	ThumbsDown: dist_40,
	Thermometer: dist_41,
	Target: dist_42,
	Tag: dist_43,
	Tablet: dist_44,
	Sunset: dist_45,
	Sunrise: dist_46,
	Sun: dist_47,
	StopCircle: dist_48,
	Star: dist_49,
	Square: dist_50,
	Speaker: dist_51,
	Smartphone: dist_52,
	Sliders: dist_53,
	Slash: dist_54,
	Slack: dist_55,
	SkipForward: dist_56,
	SkipBack: dist_57,
	Sidebar: dist_58,
	Shuffle: dist_59,
	ShoppingCart: dist_60,
	Shield: dist_61,
	Share: dist_62,
	Share2: dist_63,
	Settings: dist_64,
	Server: dist_65,
	Search: dist_66,
	Scissors: dist_67,
	Save: dist_68,
	RotateCw: dist_69,
	RotateCcw: dist_70,
	Rewind: dist_71,
	Repeat: dist_72,
	RefreshCw: dist_73,
	RefreshCcw: dist_74,
	Radio: dist_75,
	Printer: dist_76,
	Power: dist_77,
	Pocket: dist_78,
	Plus: dist_79,
	PlusSquare: dist_80,
	PlusCircle: dist_81,
	Play: dist_82,
	PlayCircle: dist_83,
	PieChart: dist_84,
	Phone: dist_85,
	PhoneOutgoing: dist_86,
	PhoneOff: dist_87,
	PhoneMissed: dist_88,
	PhoneIncoming: dist_89,
	PhoneForwarded: dist_90,
	PhoneCall: dist_91,
	Percent: dist_92,
	Pause: dist_93,
	PauseCircle: dist_94,
	Paperclip: dist_95,
	Package: dist_96,
	Octagon: dist_97,
	Navigation: dist_98,
	Navigation2: dist_99,
	Music: dist_100,
	Move: dist_101,
	MoreVertical: dist_102,
	MoreHorizontal: dist_103,
	Moon: dist_104,
	Monitor: dist_105,
	Minus: dist_106,
	MinusSquare: dist_107,
	MinusCircle: dist_108,
	Minimize: dist_109,
	Minimize2: dist_110,
	Mic: dist_111,
	MicOff: dist_112,
	MessageSquare: dist_113,
	MessageCircle: dist_114,
	Menu: dist_115,
	Maximize: dist_116,
	Maximize2: dist_117,
	Map: dist_118,
	MapPin: dist_119,
	Mail: dist_120,
	LogOut: dist_121,
	LogIn: dist_122,
	Lock: dist_123,
	Loader: dist_124,
	List: dist_125,
	Link: dist_126,
	Link2: dist_127,
	LifeBuoy: dist_128,
	Layout: dist_129,
	Layers: dist_130,
	Italic: dist_131,
	Instagram: dist_132,
	Info: dist_133,
	Inbox: dist_134,
	Image: dist_135,
	Home: dist_136,
	HelpCircle: dist_137,
	Heart: dist_138,
	Headphones: dist_139,
	Hash: dist_140,
	Grid: dist_141,
	Globe: dist_142,
	Gitlab: dist_143,
	Github: dist_144,
	Folder: dist_145,
	Flag: dist_146,
	Filter: dist_147,
	Film: dist_148,
	File: dist_149,
	FileText: dist_150,
	FilePlus: dist_151,
	FileMinus: dist_152,
	Feather: dist_153,
	FastForward: dist_154,
	Facebook: dist_155,
	Eye: dist_156,
	EyeOff: dist_157,
	ExternalLink: dist_158,
	Edit: dist_159,
	Edit3: dist_160,
	Edit2: dist_161,
	Droplet: dist_162,
	Download: dist_163,
	DownloadCloud: dist_164,
	Disc: dist_165,
	Delete: dist_166,
	Crosshair: dist_167,
	Crop: dist_168,
	CreditCard: dist_169,
	Cpu: dist_170,
	CornerUpRight: dist_171,
	CornerUpLeft: dist_172,
	CornerRightUp: dist_173,
	CornerRightDown: dist_174,
	CornerLeftUp: dist_175,
	CornerLeftDown: dist_176,
	CornerDownRight: dist_177,
	CornerDownLeft: dist_178,
	Copy: dist_179,
	Compass: dist_180,
	Command: dist_181,
	Codepen: dist_182,
	Cloud: dist_183,
	CloudSnow: dist_184,
	CloudRain: dist_185,
	CloudOff: dist_186,
	CloudLightning: dist_187,
	CloudDrizzle: dist_188,
	Clock: dist_189,
	Clipboard: dist_190,
	Circle: dist_191,
	Chrome: dist_192,
	ChevronsUp: dist_193,
	ChevronsRight: dist_194,
	ChevronsLeft: dist_195,
	ChevronsDown: dist_196,
	ChevronUp: dist_197,
	ChevronRight: dist_198,
	ChevronLeft: dist_199,
	ChevronDown: dist_200,
	Check: dist_201,
	CheckSquare: dist_202,
	CheckCircle: dist_203,
	Cast: dist_204,
	Camera: dist_205,
	CameraOff: dist_206,
	Calendar: dist_207,
	Briefcase: dist_208,
	Box: dist_209,
	Bookmark: dist_210,
	Book: dist_211,
	Bold: dist_212,
	Bluetooth: dist_213,
	Bell: dist_214,
	BellOff: dist_215,
	Battery: dist_216,
	BatteryCharging: dist_217,
	BarChart: dist_218,
	BarChart2: dist_219,
	Award: dist_220,
	AtSign: dist_221,
	ArrowUp: dist_222,
	ArrowUpRight: dist_223,
	ArrowUpLeft: dist_224,
	ArrowRight: dist_225,
	ArrowLeft: dist_226,
	ArrowDown: dist_227,
	ArrowDownRight: dist_228,
	ArrowDownLeft: dist_229,
	Aperture: dist_230,
	Anchor: dist_231,
	AlignRight: dist_232,
	AlignLeft: dist_233,
	AlignJustify: dist_234,
	AlignCenter: dist_235,
	AlertTriangle: dist_236,
	AlertOctagon: dist_237,
	AlertCircle: dist_238,
	Airplay: dist_239,
	Activity: dist_240
});

var sizeFactors = {
  small: 0.5,
  medium: 1,
  large: 2
}; // any key from sizeFactors object

var Icon = function Icon(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === undefined ? "Play" : _ref$name,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? "medium" : _ref$size,
      sizeOverride = _ref.sizeOverride,
      theme = _ref.theme;

  var themeSpacing = theme ? theme.spacing : 16;

  var pixelSize = sizeOverride || themeSpacing * sizeFactors[size];

  var props = {
    size: pixelSize
  };

  var Comp = ReactFeather[name];

  return _react__default.createElement(Comp, props);
};

var _extends$17 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$13(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$13(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$13(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input$1 = function (_Component) {
  _inherits$13(Input$$1, _Component);

  function Input$$1() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$13(this, Input$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$13(this, (_ref = Input$$1.__proto__ || Object.getPrototypeOf(Input$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: _this.props.children || ""
    }, _this.updateValue = function (e) {
      var _e$target = _extends$17({}, e.target),
          value = _e$target.value;

      _this.setState(function () {
        return { value: value };
      });
    }, _temp), _possibleConstructorReturn$13(_this, _ret);
  }

  _createClass$3(Input$$1, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react__default.createElement("input", {
        className: this.props.className,
        name: this.props.name,
        placeholder: this.props.placeholder,
        value: this.state.value,
        onChange: function onChange(e) {
          return _this2.updateValue(e);
        }
      });
    }
  }]);

  return Input$$1;
}(_react.Component);

Input$1.defaultProps = {
  className: ""
};


var style$17 = function style(_ref2) {
  var theme = _ref2.theme;
  return {
    padding: theme.spacing ? theme.spacing / 2 : 8,
    border: "1px solid",
    borderColor: theme.greys ? theme.greys[30] : "#ccc",
    font: "inherit",
    WebkitAppearance: "none"
  };
};

var Input$2 = glamorous(Input$1)(style$17);

var SelectOption = function SelectOption(_ref) {
  var className = _ref.className,
      selected = _ref.selected,
      onClick = _ref.onClick,
      children = _ref.children;
  return _react__default.createElement(
    "div",
    {
      className: className + " Select__option" + (selected ? " Select__option_selected" : ""),
      tabIndex: "-2",
      role: "option",
      "aria-selected": selected,
      onClick: onClick
    },
    children
  );
};
var style$18 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;

  var backgroundColor = color && theme.colors ? utils_4(color)(theme.colors[color]) : "white";

  return {
    padding: theme.spacing ? theme.spacing / 2 : 8,
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),
    outline: "none",

    ":hover": {
      backgroundColor: utils_6(backgroundColor)(5),
      color: utils_5(utils_6(backgroundColor)(5))(["black", "white"])
    },

    "& + .Select__option": {
      borderTop: "1px solid",
      borderColor: utils_6(backgroundColor)(10)
    },

    "&.Select__option_selected": {
      color: utils_5(backgroundColor)(["#aaa"])
    }
  };
};

SelectOption.defaultProps = {
  selected: false
};

var SelectOption$1 = glamorous(SelectOption)(style$18);

var SelectFilter = function SelectFilter(_ref) {
  var className = _ref.className,
      placeholder = _ref.placeholder,
      onChange = _ref.onChange;
  return _react__default.createElement(
    "div",
    { className: className },
    _react__default.createElement("input", {
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      onChange: onChange,
      className: "Select__filter",
      placeholder: placeholder
    })
  );
};
var style$19 = function style(_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color;

  var backgroundColor = color && theme.colors ? utils_4(color)(theme.colors[color]) : "white";

  return {
    padding: 0,
    borderBottom: "1px solid",
    borderColor: utils_6(backgroundColor)(10),

    "& .Select__filter": {
      width: "100%",
      padding: theme.spacing ? theme.spacing / 2 : 8,
      border: 0,
      outline: "none",
      font: "inherit"
    }
  };
};

SelectFilter.defaultProps = {
  placeholder: "Filter..."
};

var SelectFilter$1 = glamorous(SelectFilter)(style$19);

var style$20 = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      theme = _ref.theme,
      color = _ref.color,
      disabled = _ref.disabled;

  var backgroundColor = color && theme.colors ? utils_4(color)(theme.colors[color]) : "white";

  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing ? theme.spacing / 2 : 8,
    paddingRight: theme.spacing ? theme.spacing / 2 + 40 : 48,
    width: "fit-content",
    minHeight: 20,
    border: "1px solid",
    borderColor: theme.greys ? theme.greys[30] : "#ccc",
    opacity: disabled ? 0.5 : 1,
    cursor: "pointer",
    backgroundColor: backgroundColor,
    color: utils_5(backgroundColor)(["black", "white"]),
    outline: "none",
    pointerEvents: disabled ? "none" : "all",

    // downward caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: theme.spacing ? theme.spacing / 2 : 8,
      width: 0,
      height: 0,
      border: "4px solid transparent",
      borderTopColor: theme.greys ? theme.greys[70] : "#888",
      transform: "translateY(calc(-50% + 2px))"
    },

    // spinner when loading.
    "&.Select_updating::after": {
      top: 6,
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: "1px 0px 0px 0px " + (theme.greys ? theme.greys["70"] : "#666") + " inset",
      animation: ".7s " + utils_3 + " linear infinite"
    },

    "& .Select__options": {
      position: "absolute",
      top: "calc(100% + 1px)",
      left: 0,
      zIndex: theme.baseZIndex ? theme.baseZIndex * 1000 : 1000,
      width: "100%",
      boxShadow: "0 2px 7px 2px rgba(0, 0, 0, .14)",
      opacity: 0,
      transform: "translateY(-10px)",
      animation: utils_1 + " .15s forwards ease,\n        " + utils_2 + " .15s forwards ease"
    },

    "& .Select__options_list": {
      maxHeight: "50vh"
    }
  };
});

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator$1(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck$14(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$14(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$14(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select$1 = function (_Component) {
  _inherits$14(Select$$1, _Component);

  function Select$$1() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck$14(this, Select$$1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$14(this, (_ref = Select$$1.__proto__ || Object.getPrototypeOf(Select$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      updating: false,
      value: _this.getInitialValue(),
      filter: new RegExp(/./)

      // flow complains if this isn't initialized sooo...
    }, _this.handleClick = function (e) {
      var el = _this.container;

      // if we're somehow not working with a DOM node (flowtype is fun!)
      if (!(e.target instanceof Node)) {
        return;
      }
      // if we're clicking on the Select itself,
      if (el && el.contains(e.target)) {
        return;
      }

      // if we're clicking outside,
      _this.close();
    }, _this.handleEsc = function (e) {
      if (e.keyCode === 27) {
        _this.close();
      }
    }, _temp), _possibleConstructorReturn$14(_this, _ret);
  }

  // This implements "click outside to close" behavior


  _createClass$4(Select$$1, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("click", this.handleClick, true);
      window.addEventListener("keyup", this.handleEsc, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.handleClick, true);
      window.removeEventListener("keyup", this.handleEsc, true);
    }
  }, {
    key: "getInitialValue",
    value: function getInitialValue() {
      if (!this.props.multiple) {
        return this.props.placeholder ? { label: this.props.placeholder } : { label: "" };
      }

      return [this.props.placeholder ? { placeholder: true, label: this.props.placeholder } : { placeholder: true, label: "" }];
    }
  }, {
    key: "getDisplayValue",
    value: function getDisplayValue() {
      if (!this.props.multiple) {
        // Ugh, flowtype...
        if (typeof this.state.value.label === "string") {
          return this.state.value.label;
        } else {
          return this.props.placeholder || "";
        }
      }

      if (!(this.state.value instanceof Array)) {
        throw new Error("<Select>: Strings are not allowed to be values of a Select component with the multiple attribute");
      }

      return [].concat(_toConsumableArray(this.state.value.map(function (option) {
        return option.label;
      }))).join(", ");
    }
  }, {
    key: "selectOption",
    value: function selectOption(option) {
      if (!this.props.multiple) {
        this.setState(function () {
          return { value: option };
        });
        return;
      }

      if (!(this.state.value instanceof Array)) {
        throw new Error("<Select>: Strings are not allowed to be values of a Select component with the multiple attribute");
      }

      var optionIndex = this.state.value.indexOf(option);

      if (optionIndex < 0) {
        this.setState(function (prevState) {
          if (prevState instanceof Object) {
            return {
              value: [].concat(_toConsumableArray(prevState.value), [option]).filter(function (item) {
                return !item.placeholder;
              })
            };
          } else {
            throw new Error("<Select>: Strings are not allowed to be values of a Select component with the multiple attribute");
          }
        });
      } else {
        this.setState(function (prevState) {
          if (prevState instanceof Object) {
            return {
              value: [].concat(_toConsumableArray(prevState.value.slice(0, optionIndex)), _toConsumableArray(prevState.value.slice(optionIndex + 1)))
            };
          } else {
            throw new Error("<Select>: Strings are not allowed to be values of a Select component with the multiple attribute");
          }
        });
      }
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option) {
      if (!this.props.multiple) {
        return this.state.value === option;
      }

      if (!(this.state.value instanceof Array)) {
        throw new Error("<Select>: Strings are not allowed to be values of a Select component with the multiple attribute");
      }

      return this.state.value.indexOf(option) > -1;
    }
  }, {
    key: "updateFilter",
    value: function () {
      var _ref2 = _asyncToGenerator$1( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var filter;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.persist();

                if (event.target instanceof HTMLInputElement) {
                  _context.next = 3;
                  break;
                }

                throw new Error("<Select>: Your filter field is _not_ an input element and therefore has an unreadable value.");

              case 3:
                if (!this.props.onFilter) {
                  _context.next = 7;
                  break;
                }

                this.setState(function () {
                  return { updating: true };
                });
                _context.next = 7;
                return this.props.onFilter();

              case 7:
                filter = new RegExp(event.target.value, "i");

                this.setState(function () {
                  return { updating: false, filter: filter };
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateFilter(_x) {
        return _ref2.apply(this, arguments);
      }

      return updateFilter;
    }()
  }, {
    key: "toggle",
    value: function () {
      var _ref3 = _asyncToGenerator$1( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.state.open && this.props.onClick)) {
                  _context2.next = 4;
                  break;
                }

                this.setState(function () {
                  return { updating: true };
                });
                _context2.next = 4;
                return this.props.onClick();

              case 4:
                this.setState(function (prevState) {
                  return { updating: false, open: !prevState.open };
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function toggle() {
        return _ref3.apply(this, arguments);
      }

      return toggle;
    }()
  }, {
    key: "close",
    value: function close() {
      this.setState(function () {
        return {
          open: false
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react__default.createElement(
        "div",
        {
          ref: function ref(container) {
            return _this2.container = container;
          },
          className: this.props.className + " Select" + (this.state.open ? " Select_open" : "") + (this.state.updating ? " Select_updating" : ""),
          role: "listbox",
          tabIndex: "-2",
          onClick: function onClick() {
            return _this2.toggle();
          }
        },
        _react__default.createElement(
          "div",
          { className: "Select__value" },
          this.getDisplayValue() || this.props.placeholder
        ),
        this.props.options.length && this.state.open ? _react__default.createElement(
          "div",
          { className: "Select__options" },
          this.props.filterable && _react__default.createElement(SelectFilter$1, { onChange: function onChange(e) {
              return _this2.updateFilter(e);
            } }),
          _react__default.createElement(
            "div",
            { className: "Select__options_list" },
            this.props.options.map(function (option) {
              return option.label.match(_this2.state.filter) && _react__default.createElement(
                SelectOption$1,
                {
                  key: option.id,
                  onClick: function onClick() {
                    return _this2.selectOption(option);
                  },
                  selected: _this2.isOptionSelected(option)
                },
                option.label
              );
            })
          )
        ) : ""
      );
    }
  }]);

  return Select$$1;
}(_react.Component);

Select$1.defaultProps = {
  className: "",
  filterable: false,
  disabled: false,
  multiple: false,
  options: []
};


var Select$2 = glamorous(Select$1)(style$20);

var THEME_COLORS = {
  primary: "#22205F",
  accent: "#3333FF",
  secondary: "#00CB98",
  tertiary: "#FFFF98",
  warn: "#DE1A1A"
};

var THEME_GREYS = {
  "10": "#EFF1F5",
  "20": "#DFE5EC",
  "30": "#D0D9E5",
  "40": "#C6D1E1",
  "50": "#BBCADC",
  "60": "#A1B3CA",
  "70": "#8092B0",
  "80": "#67809F",
  "90": "#445873",
  "100": "#2D3842",
  white: "#FFFFFF"
};

var DEFAULT_THEME = {
  colors: THEME_COLORS,
  greys: THEME_GREYS,
  fonts: {
    fontFamily: "Proxima Nova",
    fontSize: 13,
    WebkitFontSmoothing: "subpixel-antialiased",
    textRendering: "optimizeLegibility"
  },
  spacing: 16,
  baseZIndex: 0
};

// Simple imports n' exports for consumers of the library.

exports.Header = Header$1;
exports.HeaderItem = HeaderItem$1;
exports.HeaderSeparator = HeaderSeparator$1;
exports.HeaderTitle = HeaderTitle$1;
exports.SideNavigation = SideNavigation$1;
exports.SideNavigationItem = SideNavigationItem$1;
exports.SideNavigationLink = SideNavigationLink$1;
exports.Sidebar = Sidebar$1;
exports.SidebarItem = SidebarItem$1;
exports.SidebarLink = SidebarLink$1;
exports.Button = Button$2;
exports.Tooltip = Tooltip$1;
exports.withTooltip = withTooltip;
exports.Chip = Chip$1;
exports.PlusChip = PlusChip$1;
exports.Card = Card$1;
exports.Stat = Stat$1;
exports.Input = Input$2;
exports.Icon = Icon;
exports.Select = Select$2;
exports.contiamoTheme = DEFAULT_THEME;
exports.ThemeProvider = ThemeProvider;
