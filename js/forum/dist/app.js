(function (global) {
  var babelHelpers = global.babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.jsx = function () {
    var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
    return function createRawReactElement(type, props, key, children) {
      var defaultProps = type && type.defaultProps;
      var childrenLength = arguments.length - 3;

      if (!props && childrenLength !== 0) {
        props = {};
      }

      if (props && defaultProps) {
        for (var propName in defaultProps) {
          if (props[propName] === void 0) {
            props[propName] = defaultProps[propName];
          }
        }
      } else if (!props) {
        props = defaultProps || {};
      }

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 3];
        }

        props.children = childArray;
      }

      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
      };
    };
  }();

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
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

  babelHelpers.defineEnumerableProperties = function (obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    return obj;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.defineProperty = function (obj, key, value) {
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

  babelHelpers.extends = Object.assign || function (target) {
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

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
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

  babelHelpers.instanceof = function (left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.temporalRef = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    } else {
      return val;
    }
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };
})(typeof global === "undefined" ? self : global);;
(function(exports) {

'use strict';

var headEl = document.getElementsByTagName('head')[0],
    ie = /MSIE/.test(navigator.userAgent);

/*
  normalizeName() is inspired by Ember's loader:
  https://github.com/emberjs/ember.js/blob/0591740685ee2c444f2cfdbcebad0bebd89d1303/packages/loader/lib/main.js#L39-L53
 */
function normalizeName(child, parentBase) {
    if (child.charAt(0) === '/') {
        child = child.slice(1);
    }
    if (child.charAt(0) !== '.') {
        return child;
    }
    var parts = child.split('/');
    while (parts[0] === '.' || parts[0] === '..') {
        if (parts.shift() === '..') {
            parentBase.pop();
        }
    }
    return parentBase.concat(parts).join('/');
}

var seen = Object.create(null);
var internalRegistry = Object.create(null);
var externalRegistry = Object.create(null);
var anonymousEntry;

function ensuredExecute(name) {
    var mod = internalRegistry[name];
    if (mod && !seen[name]) {
        seen[name] = true;
        // one time operation to execute the module body
        mod.execute();
    }
    return mod && mod.proxy;
}

function set(name, values) {
    externalRegistry[name] = values;
}

function get(name) {
    return externalRegistry[name] || ensuredExecute(name);
}

function has(name) {
    return !!externalRegistry[name] || !!internalRegistry[name];
}

function createScriptNode(src, callback) {
    var node = document.createElement('script');
    // use async=false for ordered async?
    // parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
    if (node.async) {
        node.async = false;
    }
    if (ie) {
        node.onreadystatechange = function() {
            if (/loaded|complete/.test(this.readyState)) {
                this.onreadystatechange = null;
                callback();
            }
        };
    } else {
        node.onload = node.onerror = callback;
    }
    node.setAttribute('src', src);
    headEl.appendChild(node);
}

function load(name) {
    return new Promise(function(resolve, reject) {
        createScriptNode((System.baseURL || '/') + name + '.js', function(err) {
            if (anonymousEntry) {
                System.register(name, anonymousEntry[0], anonymousEntry[1]);
                anonymousEntry = undefined;
            }
            var mod = internalRegistry[name];
            if (!mod) {
                reject(new Error('Error loading module ' + name));
                return;
            }
            Promise.all(mod.deps.map(function (dep) {
                if (externalRegistry[dep] || internalRegistry[dep]) {
                    return Promise.resolve();
                }
                return load(dep);
            })).then(resolve, reject);
        });
    });
}


var System = {
    set: set,
    get: get,
    has: has,
    import: function(name) {
        return new Promise(function(resolve, reject) {
            var normalizedName = normalizeName(name, []);
            var mod = get(normalizedName);
            return mod ? resolve(mod) : load(name).then(function () {
                return get(normalizedName);
            });
        });
    },
    register: function(name, deps, wrapper) {
        if (Array.isArray(name)) {
            // anounymous module
            anonymousEntry = [];
            anonymousEntry.push.apply(anonymousEntry, arguments);
            return; // breaking to let the script tag to name it.
        }
        var proxy = Object.create(null),
            values = Object.create(null),
            mod, meta;
        // creating a new entry in the internal registry
        internalRegistry[name] = mod = {
            // live bindings
            proxy: proxy,
            // exported values
            values: values,
            // normalized deps
            deps: deps.map(function(dep) {
                return normalizeName(dep, name.split('/').slice(0, -1));
            }),
            // other modules that depends on this so we can push updates into those modules
            dependants: [],
            // method used to push updates of deps into the module body
            update: function(moduleName, moduleObj) {
                meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
            },
            execute: function() {
                mod.deps.map(function(dep) {
                    var imports = externalRegistry[dep];
                    if (imports) {
                        mod.update(dep, imports);
                    } else {
                        imports = get(dep) && internalRegistry[dep].values; // optimization to pass plain values instead of bindings
                        if (imports) {
                            internalRegistry[dep].dependants.push(name);
                            mod.update(dep, imports);
                        }
                    }
                });
                meta.execute();
            }
        };
        // collecting execute() and setters[]
        meta = wrapper(function(identifier, value) {
            values[identifier] = value;
            mod.lock = true; // locking down the updates on the module to avoid infinite loop
            mod.dependants.forEach(function(moduleName) {
                if (internalRegistry[moduleName] && !internalRegistry[moduleName].lock) {
                    internalRegistry[moduleName].update(name, values);
                }
            });
            mod.lock = false;
            if (!Object.getOwnPropertyDescriptor(proxy, identifier)) {
                Object.defineProperty(proxy, identifier, {
                    enumerable: true,
                    get: function() {
                        return values[identifier];
                    }
                });
            }
            return value;
        });
    }
};

// exporting the System object
exports.System = System;

})(window);
;
;(function (global, factory) { // eslint-disable-line
	"use strict"
	/* eslint-disable no-undef */
	var m = factory(global)
	if (typeof module === "object" && module != null && module.exports) {
		module.exports = m
	} else if (typeof define === "function" && define.amd) {
		define(function () { return m })
	} else {
		global.m = m
	}
	/* eslint-enable no-undef */
})(typeof window !== "undefined" ? window : {}, function (global, undefined) { // eslint-disable-line
	"use strict"

	m.version = function () {
		return "v0.2.3"
	}

	var hasOwn = {}.hasOwnProperty
	var type = {}.toString

	function isFunction(object) {
		return typeof object === "function"
	}

	function isObject(object) {
		return type.call(object) === "[object Object]"
	}

	function isString(object) {
		return type.call(object) === "[object String]"
	}

	var isArray = Array.isArray || function (object) {
		return type.call(object) === "[object Array]"
	}

	function noop() {}

	var voidElements = {
		AREA: 1,
		BASE: 1,
		BR: 1,
		COL: 1,
		COMMAND: 1,
		EMBED: 1,
		HR: 1,
		IMG: 1,
		INPUT: 1,
		KEYGEN: 1,
		LINK: 1,
		META: 1,
		PARAM: 1,
		SOURCE: 1,
		TRACK: 1,
		WBR: 1
	}

	// caching commonly used variables
	var $document, $location, $requestAnimationFrame, $cancelAnimationFrame

	// self invoking function needed because of the way mocks work
	function initialize(mock) {
		$document = mock.document
		$location = mock.location
		$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
		$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
	}

	// testing API
	m.deps = function (mock) {
		initialize(global = mock || window)
		return global
	}

	m.deps(global)

	/**
	 * @typedef {String} Tag
	 * A string that looks like -> div.classname#id[param=one][param2=two]
	 * Which describes a DOM node
	 */

	function parseTagAttrs(cell, tag) {
		var classes = []
		var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
		var match

		while ((match = parser.exec(tag))) {
			if (match[1] === "" && match[2]) {
				cell.tag = match[2]
			} else if (match[1] === "#") {
				cell.attrs.id = match[2]
			} else if (match[1] === ".") {
				classes.push(match[2])
			} else if (match[3][0] === "[") {
				var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
				cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" : true)
			}
		}

		return classes
	}

	function getVirtualChildren(args, hasAttrs) {
		var children = hasAttrs ? args.slice(1) : args

		if (children.length === 1 && isArray(children[0])) {
			return children[0]
		} else {
			return children
		}
	}

	function assignAttrs(target, attrs, classes) {
		var classAttr = "class" in attrs ? "class" : "className"

		for (var attrName in attrs) {
			if (hasOwn.call(attrs, attrName)) {
				if (attrName === classAttr &&
						attrs[attrName] != null &&
						attrs[attrName] !== "") {
					classes.push(attrs[attrName])
					// create key in correct iteration order
					target[attrName] = ""
				} else {
					target[attrName] = attrs[attrName]
				}
			}
		}

		if (classes.length) target[classAttr] = classes.join(" ")
	}

	/**
	 *
	 * @param {Tag} The DOM node tag
	 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
	 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
	 *                      or splat (optional)
	 */
	function m(tag, pairs) {
		var args = [].slice.call(arguments, 1)

		if (isObject(tag)) return parameterize(tag, args)

		if (!isString(tag)) {
			throw new Error("selector in m(selector, attrs, children) should " +
				"be a string")
		}

		var hasAttrs = pairs != null && isObject(pairs) &&
			!("tag" in pairs || "view" in pairs || "subtree" in pairs)

		var attrs = hasAttrs ? pairs : {}
		var cell = {
			tag: "div",
			attrs: {},
			children: getVirtualChildren(args, hasAttrs)
		}

		assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
		return cell
	}

	function forEach(list, f) {
		for (var i = 0; i < list.length && !f(list[i], i++);) {
			// function called in condition
		}
	}

	function forKeys(list, f) {
		forEach(list, function (attrs, i) {
			return (attrs = attrs && attrs.attrs) &&
				attrs.key != null &&
				f(attrs, i)
		})
	}
	// This function was causing deopts in Chrome.
	function dataToString(data) {
		// data.toString() might throw or return null if data is the return
		// value of Console.log in some versions of Firefox (behavior depends on
		// version)
		try {
			if (data != null && data.toString() != null) return data
		} catch (e) {
			// silently ignore errors
		}
		return ""
	}

	// This function was causing deopts in Chrome.
	function injectTextNode(parentElement, first, index, data) {
		try {
			insertNode(parentElement, first, index)
			first.nodeValue = data
		} catch (e) {
			// IE erroneously throws error when appending an empty text node
			// after a null
		}
	}

	function flatten(list) {
		// recursively flatten array
		for (var i = 0; i < list.length; i++) {
			if (isArray(list[i])) {
				list = list.concat.apply([], list)
				// check current index again and flatten until there are no more
				// nested arrays at that index
				i--
			}
		}
		return list
	}

	function insertNode(parentElement, node, index) {
		parentElement.insertBefore(node,
			parentElement.childNodes[index] || null)
	}

	var DELETION = 1
	var INSERTION = 2
	var MOVE = 3

	function handleKeysDiffer(data, existing, cached, parentElement) {
		forKeys(data, function (key, i) {
			existing[key = key.key] = existing[key] ? {
				action: MOVE,
				index: i,
				from: existing[key].index,
				element: cached.nodes[existing[key].index] ||
					$document.createElement("div")
			} : {action: INSERTION, index: i}
		})

		var actions = []
		for (var prop in existing) if (hasOwn.call(existing, prop)) {
			actions.push(existing[prop])
		}

		var changes = actions.sort(sortChanges)
		var newCached = new Array(cached.length)

		newCached.nodes = cached.nodes.slice()

		forEach(changes, function (change) {
			var index = change.index
			if (change.action === DELETION) {
				clear(cached[index].nodes, cached[index])
				newCached.splice(index, 1)
			}
			if (change.action === INSERTION) {
				var dummy = $document.createElement("div")
				dummy.key = data[index].attrs.key
				insertNode(parentElement, dummy, index)
				newCached.splice(index, 0, {
					attrs: {key: data[index].attrs.key},
					nodes: [dummy]
				})
				newCached.nodes[index] = dummy
			}

			if (change.action === MOVE) {
				var changeElement = change.element
				var maybeChanged = parentElement.childNodes[index]
				if (maybeChanged !== changeElement && changeElement !== null) {
					parentElement.insertBefore(changeElement,
						maybeChanged || null)
				}
				newCached[index] = cached[change.from]
				newCached.nodes[index] = changeElement
			}
		})

		return newCached
	}

	function diffKeys(data, cached, existing, parentElement) {
		var keysDiffer = data.length !== cached.length

		if (!keysDiffer) {
			forKeys(data, function (attrs, i) {
				var cachedCell = cached[i]
				return keysDiffer = cachedCell &&
					cachedCell.attrs &&
					cachedCell.attrs.key !== attrs.key
			})
		}

		if (keysDiffer) {
			return handleKeysDiffer(data, existing, cached, parentElement)
		} else {
			return cached
		}
	}

	function diffArray(data, cached, nodes) {
		// diff the array itself

		// update the list of DOM nodes by collecting the nodes from each item
		forEach(data, function (_, i) {
			if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
		})
		// remove items from the end of the array if the new array is shorter
		// than the old one. if errors ever happen here, the issue is most
		// likely a bug in the construction of the `cached` data structure
		// somewhere earlier in the program
		forEach(cached.nodes, function (node, i) {
			if (node.parentNode != null && nodes.indexOf(node) < 0) {
				clear([node], [cached[i]])
			}
		})

		if (data.length < cached.length) cached.length = data.length
		cached.nodes = nodes
	}

	function buildArrayKeys(data) {
		var guid = 0
		forKeys(data, function () {
			forEach(data, function (attrs) {
				if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
					attrs.key = "__mithril__" + guid++
				}
			})
			return 1
		})
	}

	function isDifferentEnough(data, cached, dataAttrKeys) {
		if (data.tag !== cached.tag) return true

		if (dataAttrKeys.sort().join() !==
				Object.keys(cached.attrs).sort().join()) {
			return true
		}

		if (data.attrs.id !== cached.attrs.id) {
			return true
		}

		if (data.attrs.key !== cached.attrs.key) {
			return true
		}

		if (m.redraw.strategy() === "all") {
			return !cached.configContext || cached.configContext.retain !== true
		}

		if (m.redraw.strategy() === "diff") {
			return cached.configContext && cached.configContext.retain === false
		}

		return false
	}

	function maybeRecreateObject(data, cached, dataAttrKeys) {
		// if an element is different enough from the one in cache, recreate it
		if (isDifferentEnough(data, cached, dataAttrKeys)) {
			if (cached.nodes.length) clear(cached.nodes)

			if (cached.configContext &&
					isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
			}

			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (controller.onunload) controller.onunload({preventDefault: noop});
				});
			}
		}
	}

	function getObjectNamespace(data, namespace) {
		if (data.attrs.xmlns) return data.attrs.xmlns
		if (data.tag === "svg") return "http://www.w3.org/2000/svg"
		if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
		return namespace
	}

	var pendingRequests = 0
	m.startComputation = function () { pendingRequests++ }
	m.endComputation = function () {
		if (pendingRequests > 1) {
			pendingRequests--
		} else {
			pendingRequests = 0
			m.redraw()
		}
	}

	function unloadCachedControllers(cached, views, controllers) {
		if (controllers.length) {
			cached.views = views
			cached.controllers = controllers
			forEach(controllers, function (controller) {
				if (controller.onunload && controller.onunload.$old) {
					controller.onunload = controller.onunload.$old
				}

				if (pendingRequests && controller.onunload) {
					var onunload = controller.onunload
					controller.onunload = noop
					controller.onunload.$old = onunload
				}
			})
		}
	}

	function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
		// schedule configs to be called. They are called after `build` finishes
		// running
		if (isFunction(data.attrs.config)) {
			var context = cached.configContext = cached.configContext || {}

			// bind
			configs.push(function () {
				return data.attrs.config.call(data, node, !isNew, context,
					cached)
			})
		}
	}

	function buildUpdatedNode(
		cached,
		data,
		editable,
		hasKeys,
		namespace,
		views,
		configs,
		controllers
	) {
		var node = cached.nodes[0]

		if (hasKeys) {
			setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
		}

		cached.children = build(
			node,
			data.tag,
			undefined,
			undefined,
			data.children,
			cached.children,
			false,
			0,
			data.attrs.contenteditable ? node : editable,
			namespace,
			configs
		)

		cached.nodes.intact = true

		if (controllers.length) {
			cached.views = views
			cached.controllers = controllers
		}

		return node
	}

	function handleNonexistentNodes(data, parentElement, index) {
		var nodes
		if (data.$trusted) {
			nodes = injectHTML(parentElement, index, data)
		} else {
			nodes = [$document.createTextNode(data)]
			if (!(parentElement.nodeName in voidElements)) {
				insertNode(parentElement, nodes[0], index)
			}
		}

		var cached

		if (typeof data === "string" ||
				typeof data === "number" ||
				typeof data === "boolean") {
			cached = new data.constructor(data)
		} else {
			cached = data
		}

		cached.nodes = nodes
		return cached
	}

	function reattachNodes(
		data,
		cached,
		parentElement,
		editable,
		index,
		parentTag
	) {
		var nodes = cached.nodes
		if (!editable || editable !== $document.activeElement) {
			if (data.$trusted) {
				clear(nodes, cached)
				nodes = injectHTML(parentElement, index, data)
			} else if (parentTag === "textarea") {
				// <textarea> uses `value` instead of `nodeValue`.
				parentElement.value = data
			} else if (editable) {
				// contenteditable nodes use `innerHTML` instead of `nodeValue`.
				editable.innerHTML = data
			} else {
				// was a trusted string
				if (nodes[0].nodeType === 1 || nodes.length > 1 ||
						(nodes[0].nodeValue.trim &&
							!nodes[0].nodeValue.trim())) {
					clear(cached.nodes, cached)
					nodes = [$document.createTextNode(data)]
				}

				injectTextNode(parentElement, nodes[0], index, data)
			}
		}
		cached = new data.constructor(data)
		cached.nodes = nodes
		return cached
	}

	function handleTextNode(
		cached,
		data,
		index,
		parentElement,
		shouldReattach,
		editable,
		parentTag
	) {
		if (!cached.nodes.length) {
			return handleNonexistentNodes(data, parentElement, index)
		} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
			return reattachNodes(data, cached, parentElement, editable, index,
				parentTag)
		} else {
			return (cached.nodes.intact = true, cached)
		}
	}

	function getSubArrayCount(item) {
		if (item.$trusted) {
			// fix offset of next element if item was a trusted string w/ more
			// than one html element
			// the first clause in the regexp matches elements
			// the second clause (after the pipe) matches text nodes
			var match = item.match(/<[^\/]|\>\s*[^<]/g)
			if (match != null) return match.length
		} else if (isArray(item)) {
			return item.length
		}
		return 1
	}

	function buildArray(
		data,
		cached,
		parentElement,
		index,
		parentTag,
		shouldReattach,
		editable,
		namespace,
		configs
	) {
		data = flatten(data)
		var nodes = []
		var intact = cached.length === data.length
		var subArrayCount = 0

		// keys algorithm: sort elements without recreating them if keys are
		// present
		//
		// 1) create a map of all existing keys, and mark all for deletion
		// 2) add new keys to map and mark them for addition
		// 3) if key exists in new list, change action from deletion to a move
		// 4) for each key, handle its corresponding action as marked in
		//    previous steps

		var existing = {}
		var shouldMaintainIdentities = false

		forKeys(cached, function (attrs, i) {
			shouldMaintainIdentities = true
			existing[cached[i].attrs.key] = {action: DELETION, index: i}
		})

		buildArrayKeys(data)
		if (shouldMaintainIdentities) {
			cached = diffKeys(data, cached, existing, parentElement)
		}
		// end key algorithm

		var cacheCount = 0
		// faster explicitly written
		for (var i = 0, len = data.length; i < len; i++) {
			// diff each item in the array
			var item = build(
				parentElement,
				parentTag,
				cached,
				index,
				data[i],
				cached[cacheCount],
				shouldReattach,
				index + subArrayCount || subArrayCount,
				editable,
				namespace,
				configs)

			if (item !== undefined) {
				intact = intact && item.nodes.intact
				subArrayCount += getSubArrayCount(item)
				cached[cacheCount++] = item
			}
		}

		if (!intact) diffArray(data, cached, nodes)
		return cached
	}

	function makeCache(data, cached, index, parentIndex, parentCache) {
		if (cached != null) {
			if (type.call(cached) === type.call(data)) return cached

			if (parentCache && parentCache.nodes) {
				var offset = index - parentIndex
				var end = offset + (isArray(data) ? data : cached.nodes).length
				clear(
					parentCache.nodes.slice(offset, end),
					parentCache.slice(offset, end))
			} else if (cached.nodes) {
				clear(cached.nodes, cached)
			}
		}

		cached = new data.constructor()
		// if constructor creates a virtual dom element, use a blank object as
		// the base cached node instead of copying the virtual el (#277)
		if (cached.tag) cached = {}
		cached.nodes = []
		return cached
	}

	function constructNode(data, namespace) {
		if (data.attrs.is) {
			if (namespace == null) {
				return $document.createElement(data.tag, data.attrs.is)
			} else {
				return $document.createElementNS(namespace, data.tag,
					data.attrs.is)
			}
		} else if (namespace == null) {
			return $document.createElement(data.tag)
		} else {
			return $document.createElementNS(namespace, data.tag)
		}
	}

	function constructAttrs(data, node, namespace, hasKeys) {
		if (hasKeys) {
			return setAttributes(node, data.tag, data.attrs, {}, namespace)
		} else {
			return data.attrs
		}
	}

	function constructChildren(
		data,
		node,
		cached,
		editable,
		namespace,
		configs
	) {
		if (data.children != null && data.children.length > 0) {
			return build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				true,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs)
		} else {
			return data.children
		}
	}

	function reconstructCached(
		data,
		attrs,
		children,
		node,
		namespace,
		views,
		controllers
	) {
		var cached = {
			tag: data.tag,
			attrs: attrs,
			children: children,
			nodes: [node]
		}

		unloadCachedControllers(cached, views, controllers)

		if (cached.children && !cached.children.nodes) {
			cached.children.nodes = []
		}

		// edge case: setting value on <select> doesn't work before children
		// exist, so set it again after children have been created
		if (data.tag === "select" && "value" in data.attrs) {
			setAttributes(node, data.tag, {value: data.attrs.value}, {},
				namespace)
		}

		return cached
	}

	function getController(views, view, cachedControllers, controller) {
		var controllerIndex

		if (m.redraw.strategy() === "diff" && views) {
			controllerIndex = views.indexOf(view)
		} else {
			controllerIndex = -1
		}

		if (controllerIndex > -1) {
			return cachedControllers[controllerIndex]
		} else if (isFunction(controller)) {
			return new controller()
		} else {
			return {}
		}
	}

	var unloaders = []

	function updateLists(views, controllers, view, controller) {
		if (controller.onunload != null && unloaders.map(function(u) {return u.handler}).indexOf(controller.onunload) < 0) {
			unloaders.push({
				controller: controller,
				handler: controller.onunload
			})
		}

		views.push(view)
		controllers.push(controller)
	}

	var forcing = false
	function checkView(data, view, cached, cachedControllers, controllers, views) {
		var controller = getController(cached.views, view, cachedControllers, data.controller)
		var key = data && data.attrs && data.attrs.key
		data = pendingRequests === 0 || forcing || cachedControllers && cachedControllers.indexOf(controller) > -1 ? data.view(controller) : {tag: "placeholder"}
		if (data.subtree === "retain") return data;
		data.attrs = data.attrs || {}
		data.attrs.key = key
		updateLists(views, controllers, view, controller)
		return data
	}

	function markViews(data, cached, views, controllers) {
		var cachedControllers = cached && cached.controllers

		while (data.view != null) {
			data = checkView(
				data,
				data.view.$original || data.view,
				cached,
				cachedControllers,
				controllers,
				views)
		}

		return data
	}

	function buildObject( // eslint-disable-line max-statements
		data,
		cached,
		editable,
		parentElement,
		index,
		shouldReattach,
		namespace,
		configs
	) {
		var views = []
		var controllers = []

		data = markViews(data, cached, views, controllers)

		if (data.subtree === "retain") return cached

		if (!data.tag && controllers.length) {
			throw new Error("Component template must return a virtual " +
				"element, not an array, string, etc.")
		}

		data.attrs = data.attrs || {}
		cached.attrs = cached.attrs || {}

		var dataAttrKeys = Object.keys(data.attrs)
		var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)

		maybeRecreateObject(data, cached, dataAttrKeys)

		if (!isString(data.tag)) return

		var isNew = cached.nodes.length === 0

		namespace = getObjectNamespace(data, namespace)

		var node
		if (isNew) {
			node = constructNode(data, namespace)
			// set attributes first, then create children
			var attrs = constructAttrs(data, node, namespace, hasKeys)

			var children = constructChildren(data, node, cached, editable,
				namespace, configs)

			cached = reconstructCached(
				data,
				attrs,
				children,
				node,
				namespace,
				views,
				controllers)
		} else {
			node = buildUpdatedNode(
				cached,
				data,
				editable,
				hasKeys,
				namespace,
				views,
				configs,
				controllers)
		}

		if (isNew || shouldReattach === true && node != null) {
			insertNode(parentElement, node, index)
		}

		// The configs are called after `build` finishes running
		scheduleConfigsToBeCalled(configs, data, node, isNew, cached)

		return cached
	}

	function build(
		parentElement,
		parentTag,
		parentCache,
		parentIndex,
		data,
		cached,
		shouldReattach,
		index,
		editable,
		namespace,
		configs
	) {
		/*
		 * `build` is a recursive function that manages creation/diffing/removal
		 * of DOM elements based on comparison between `data` and `cached` the
		 * diff algorithm can be summarized as this:
		 *
		 * 1 - compare `data` and `cached`
		 * 2 - if they are different, copy `data` to `cached` and update the DOM
		 *     based on what the difference is
		 * 3 - recursively apply this algorithm for every array and for the
		 *     children of every virtual element
		 *
		 * The `cached` data structure is essentially the same as the previous
		 * redraw's `data` data structure, with a few additions:
		 * - `cached` always has a property called `nodes`, which is a list of
		 *    DOM elements that correspond to the data represented by the
		 *    respective virtual element
		 * - in order to support attaching `nodes` as a property of `cached`,
		 *    `cached` is *always* a non-primitive object, i.e. if the data was
		 *    a string, then cached is a String instance. If data was `null` or
		 *    `undefined`, cached is `new String("")`
		 * - `cached also has a `configContext` property, which is the state
		 *    storage object exposed by config(element, isInitialized, context)
		 * - when `cached` is an Object, it represents a virtual element; when
		 *    it's an Array, it represents a list of elements; when it's a
		 *    String, Number or Boolean, it represents a text node
		 *
		 * `parentElement` is a DOM element used for W3C DOM API calls
		 * `parentTag` is only used for handling a corner case for textarea
		 * values
		 * `parentCache` is used to remove nodes in some multi-node cases
		 * `parentIndex` and `index` are used to figure out the offset of nodes.
		 * They're artifacts from before arrays started being flattened and are
		 * likely refactorable
		 * `data` and `cached` are, respectively, the new and old nodes being
		 * diffed
		 * `shouldReattach` is a flag indicating whether a parent node was
		 * recreated (if so, and if this node is reused, then this node must
		 * reattach itself to the new parent)
		 * `editable` is a flag that indicates whether an ancestor is
		 * contenteditable
		 * `namespace` indicates the closest HTML namespace as it cascades down
		 * from an ancestor
		 * `configs` is a list of config functions to run after the topmost
		 * `build` call finishes running
		 *
		 * there's logic that relies on the assumption that null and undefined
		 * data are equivalent to empty strings
		 * - this prevents lifecycle surprises from procedural helpers that mix
		 *   implicit and explicit return statements (e.g.
		 *   function foo() {if (cond) return m("div")}
		 * - it simplifies diffing code
		 */
		data = dataToString(data)
		if (data.subtree === "retain") return cached
		cached = makeCache(data, cached, index, parentIndex, parentCache)

		if (isArray(data)) {
			return buildArray(
				data,
				cached,
				parentElement,
				index,
				parentTag,
				shouldReattach,
				editable,
				namespace,
				configs)
		} else if (data != null && isObject(data)) {
			return buildObject(
				data,
				cached,
				editable,
				parentElement,
				index,
				shouldReattach,
				namespace,
				configs)
		} else if (!isFunction(data)) {
			return handleTextNode(
				cached,
				data,
				index,
				parentElement,
				shouldReattach,
				editable,
				parentTag)
		} else {
			return cached
		}
	}

	function sortChanges(a, b) {
		return a.action - b.action || a.index - b.index
	}

	function copyStyleAttrs(node, dataAttr, cachedAttr) {
		for (var rule in dataAttr) if (hasOwn.call(dataAttr, rule)) {
			if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
				node.style[rule] = dataAttr[rule]
			}
		}

		for (rule in cachedAttr) if (hasOwn.call(cachedAttr, rule)) {
			if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
		}
	}

	var shouldUseSetAttribute = {
		list: 1,
		style: 1,
		form: 1,
		type: 1,
		width: 1,
		height: 1
	}

	function setSingleAttr(
		node,
		attrName,
		dataAttr,
		cachedAttr,
		tag,
		namespace
	) {
		if (attrName === "config" || attrName === "key") {
			// `config` isn't a real attribute, so ignore it
			return true
		} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
			// hook event handlers to the auto-redrawing system
			node[attrName] = autoredraw(dataAttr, node)
		} else if (attrName === "style" && dataAttr != null &&
				isObject(dataAttr)) {
			// handle `style: {...}`
			copyStyleAttrs(node, dataAttr, cachedAttr)
		} else if (namespace != null) {
			// handle SVG
			if (attrName === "href") {
				node.setAttributeNS("http://www.w3.org/1999/xlink",
					"href", dataAttr)
			} else {
				node.setAttribute(
					attrName === "className" ? "class" : attrName,
					dataAttr)
			}
		} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
			// handle cases that are properties (but ignore cases where we
			// should use setAttribute instead)
			//
			// - list and form are typically used as strings, but are DOM
			//   element references in js
			//
			// - when using CSS selectors (e.g. `m("[style='']")`), style is
			//   used as a string, but it's an object in js
			//
			// #348 don't set the value if not needed - otherwise, cursor
			// placement breaks in Chrome
			try {
				if (tag !== "input" || node[attrName] !== dataAttr) {
					node[attrName] = dataAttr
				}
			} catch (e) {
				node.setAttribute(attrName, dataAttr)
			}
		}
		else node.setAttribute(attrName, dataAttr)
	}

	function trySetAttr(
		node,
		attrName,
		dataAttr,
		cachedAttr,
		cachedAttrs,
		tag,
		namespace
	) {
		if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
			cachedAttrs[attrName] = dataAttr
			try {
				return setSingleAttr(
					node,
					attrName,
					dataAttr,
					cachedAttr,
					tag,
					namespace)
			} catch (e) {
				// swallow IE's invalid argument errors to mimic HTML's
				// fallback-to-doing-nothing-on-invalid-attributes behavior
				if (e.message.indexOf("Invalid argument") < 0) throw e
			}
		} else if (attrName === "value" && tag === "input" &&
				node.value !== dataAttr) {
			// #348 dataAttr may not be a string, so use loose comparison
			node.value = dataAttr
		}
	}

	function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
		for (var attrName in dataAttrs) if (hasOwn.call(dataAttrs, attrName)) {
			if (trySetAttr(
					node,
					attrName,
					dataAttrs[attrName],
					cachedAttrs[attrName],
					cachedAttrs,
					tag,
					namespace)) {
				continue
			}
		}
		return cachedAttrs
	}

	function clear(nodes, cached) {
		for (var i = nodes.length - 1; i > -1; i--) {
			if (nodes[i] && nodes[i].parentNode) {
				try {
					nodes[i].parentNode.removeChild(nodes[i])
				} catch (e) {
					/* eslint-disable max-len */
					// ignore if this fails due to order of events (see
					// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
					/* eslint-enable max-len */
				}
				cached = [].concat(cached)
				if (cached[i]) unload(cached[i])
			}
		}
		// release memory if nodes is an array. This check should fail if nodes
		// is a NodeList (see loop above)
		if (nodes.length) {
			nodes.length = 0
		}
	}

	function unload(cached) {
		if (cached.configContext && isFunction(cached.configContext.onunload)) {
			cached.configContext.onunload()
			cached.configContext.onunload = null
		}
		if (cached.controllers) {
			forEach(cached.controllers, function (controller) {
				if (isFunction(controller.onunload)) {
					controller.onunload({preventDefault: noop})
				}
			})
		}
		if (cached.children) {
			if (isArray(cached.children)) forEach(cached.children, unload)
			else if (cached.children.tag) unload(cached.children)
		}
	}

	function appendTextFragment(parentElement, data) {
		try {
			parentElement.appendChild(
				$document.createRange().createContextualFragment(data))
		} catch (e) {
			parentElement.insertAdjacentHTML("beforeend", data)
		}
	}

	function injectHTML(parentElement, index, data) {
		var nextSibling = parentElement.childNodes[index]
		if (nextSibling) {
			var isElement = nextSibling.nodeType !== 1
			var placeholder = $document.createElement("span")
			if (isElement) {
				parentElement.insertBefore(placeholder, nextSibling || null)
				placeholder.insertAdjacentHTML("beforebegin", data)
				parentElement.removeChild(placeholder)
			} else {
				nextSibling.insertAdjacentHTML("beforebegin", data)
			}
		} else {
			appendTextFragment(parentElement, data)
		}

		var nodes = []

		while (parentElement.childNodes[index] !== nextSibling) {
			nodes.push(parentElement.childNodes[index])
			index++
		}

		return nodes
	}

	function autoredraw(callback, object) {
		return function (e) {
			e = e || event
			m.redraw.strategy("diff")
			m.startComputation()
			try {
				return callback.call(object, e)
			} finally {
				endFirstComputation()
			}
		}
	}

	var html
	var documentNode = {
		appendChild: function (node) {
			if (html === undefined) html = $document.createElement("html")
			if ($document.documentElement &&
					$document.documentElement !== node) {
				$document.replaceChild(node, $document.documentElement)
			} else {
				$document.appendChild(node)
			}

			this.childNodes = $document.childNodes
		},

		insertBefore: function (node) {
			this.appendChild(node)
		},

		childNodes: []
	}

	var nodeCache = []
	var cellCache = {}

	m.render = function (root, cell, forceRecreation) {
		if (!root) {
			throw new Error("Ensure the DOM element being passed to " +
				"m.route/m.mount/m.render is not undefined.")
		}
		var configs = []
		var id = getCellCacheKey(root)
		var isDocumentRoot = root === $document
		var node

		if (isDocumentRoot || root === $document.documentElement) {
			node = documentNode
		} else {
			node = root
		}

		if (isDocumentRoot && cell.tag !== "html") {
			cell = {tag: "html", attrs: {}, children: cell}
		}

		if (cellCache[id] === undefined) clear(node.childNodes)
		if (forceRecreation === true) reset(root)

		cellCache[id] = build(
			node,
			null,
			undefined,
			undefined,
			cell,
			cellCache[id],
			false,
			0,
			null,
			undefined,
			configs)

		forEach(configs, function (config) { config() })
	}

	function getCellCacheKey(element) {
		var index = nodeCache.indexOf(element)
		return index < 0 ? nodeCache.push(element) - 1 : index
	}

	m.trust = function (value) {
		value = new String(value) // eslint-disable-line no-new-wrappers
		value.$trusted = true
		return value
	}

	function gettersetter(store) {
		function prop() {
			if (arguments.length) store = arguments[0]
			return store
		}

		prop.toJSON = function () {
			return store
		}

		return prop
	}

	m.prop = function (store) {
		if ((store != null && isObject(store) || isFunction(store)) &&
				isFunction(store.then)) {
			return propify(store)
		}

		return gettersetter(store)
	}

	var roots = []
	var components = []
	var controllers = []
	var lastRedrawId = null
	var lastRedrawCallTime = 0
	var computePreRedrawHook = null
	var computePostRedrawHook = null
	var topComponent
	var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms

	function parameterize(component, args) {
		function controller() {
			/* eslint-disable no-invalid-this */
			return (component.controller || noop).apply(this, args) || this
			/* eslint-enable no-invalid-this */
		}

		if (component.controller) {
			controller.prototype = component.controller.prototype
		}

		function view(ctrl) {
			var currentArgs = [ctrl].concat(args)
			for (var i = 1; i < arguments.length; i++) {
				currentArgs.push(arguments[i])
			}

			return component.view.apply(component, currentArgs)
		}

		view.$original = component.view
		var output = {controller: controller, view: view}
		if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
		return output
	}

	m.component = function (component) {
		var args = [].slice.call(arguments, 1)

		return parameterize(component, args)
	}

	function checkPrevented(component, root, index, isPrevented) {
		if (!isPrevented) {
			m.redraw.strategy("all")
			m.startComputation()
			roots[index] = root
			var currentComponent

			if (component) {
				currentComponent = topComponent = component
			} else {
				currentComponent = topComponent = component = {controller: noop}
			}

			var controller = new (component.controller || noop)()

			// controllers may call m.mount recursively (via m.route redirects,
			// for example)
			// this conditional ensures only the last recursive m.mount call is
			// applied
			if (currentComponent === topComponent) {
				controllers[index] = controller
				components[index] = component
			}
			endFirstComputation()
			if (component === null) {
				removeRootElement(root, index)
			}
			return controllers[index]
		} else if (component == null) {
			removeRootElement(root, index)
		}
	}

	m.mount = m.module = function (root, component) {
		if (!root) {
			throw new Error("Please ensure the DOM element exists before " +
				"rendering a template into it.")
		}

		var index = roots.indexOf(root)
		if (index < 0) index = roots.length

		var isPrevented = false
		var event = {
			preventDefault: function () {
				isPrevented = true
				computePreRedrawHook = computePostRedrawHook = null
			}
		}

		forEach(unloaders, function (unloader) {
			unloader.handler.call(unloader.controller, event)
			unloader.controller.onunload = null
		})

		if (isPrevented) {
			forEach(unloaders, function (unloader) {
				unloader.controller.onunload = unloader.handler
			})
		} else {
			unloaders = []
		}

		if (controllers[index] && isFunction(controllers[index].onunload)) {
			controllers[index].onunload(event)
		}

		return checkPrevented(component, root, index, isPrevented)
	}

	function removeRootElement(root, index) {
		roots.splice(index, 1)
		controllers.splice(index, 1)
		components.splice(index, 1)
		reset(root)
		nodeCache.splice(getCellCacheKey(root), 1)
	}

	var redrawing = false
	m.redraw = function (force) {
		if (redrawing) return
		redrawing = true
		if (force) forcing = true

		try {
			// lastRedrawId is a positive number if a second redraw is requested
			// before the next animation frame
			// lastRedrawID is null if it's the first redraw and not an event
			// handler
			if (lastRedrawId && !force) {
				// when setTimeout: only reschedule redraw if time between now
				// and previous redraw is bigger than a frame, otherwise keep
				// currently scheduled timeout
				// when rAF: always reschedule redraw
				if ($requestAnimationFrame === global.requestAnimationFrame ||
						new Date() - lastRedrawCallTime > FRAME_BUDGET) {
					if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
					lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
				}
			} else {
				redraw()
				lastRedrawId = $requestAnimationFrame(function () {
					lastRedrawId = null
				}, FRAME_BUDGET)
			}
		} finally {
			redrawing = forcing = false
		}
	}

	m.redraw.strategy = m.prop()
	function redraw() {
		if (computePreRedrawHook) {
			computePreRedrawHook()
			computePreRedrawHook = null
		}
		forEach(roots, function (root, i) {
			var component = components[i]
			if (controllers[i]) {
				var args = [controllers[i]]
				m.render(root,
					component.view ? component.view(controllers[i], args) : "")
			}
		})
		// after rendering within a routed context, we need to scroll back to
		// the top, and fetch the document title for history.pushState
		if (computePostRedrawHook) {
			computePostRedrawHook()
			computePostRedrawHook = null
		}
		lastRedrawId = null
		lastRedrawCallTime = new Date()
		m.redraw.strategy("diff")
	}

	function endFirstComputation() {
		if (m.redraw.strategy() === "none") {
			pendingRequests--
			m.redraw.strategy("diff")
		} else {
			m.endComputation()
		}
	}

	m.withAttr = function (prop, withAttrCallback, callbackThis) {
		return function (e) {
			e = e || event
			/* eslint-disable no-invalid-this */
			var currentTarget = e.currentTarget || this
			var _this = callbackThis || this
			/* eslint-enable no-invalid-this */
			var target = prop in currentTarget ?
				currentTarget[prop] :
				currentTarget.getAttribute(prop)
			withAttrCallback.call(_this, target)
		}
	}

	// routing
	var modes = {pathname: "", hash: "#", search: "?"}
	var redirect = noop
	var isDefaultRoute = false
	var routeParams, currentRoute

	m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
		// m.route()
		if (arguments.length === 0) return currentRoute
		// m.route(el, defaultRoute, routes)
		if (arguments.length === 3 && isString(arg1)) {
			redirect = function (source) {
				var path = currentRoute = normalizeRoute(source)
				if (!routeByValue(root, arg2, path)) {
					if (isDefaultRoute) {
						throw new Error("Ensure the default route matches " +
							"one of the routes defined in m.route")
					}

					isDefaultRoute = true
					m.route(arg1, true)
					isDefaultRoute = false
				}
			}

			var listener = m.route.mode === "hash" ?
				"onhashchange" :
				"onpopstate"

			global[listener] = function () {
				var path = $location[m.route.mode]
				if (m.route.mode === "pathname") path += $location.search
				if (currentRoute !== normalizeRoute(path)) redirect(path)
			}

			computePreRedrawHook = setScroll
			global[listener]()

			return
		}

		// config: m.route
		if (root.addEventListener || root.attachEvent) {
			var base = m.route.mode !== "pathname" ? $location.pathname : ""
			root.href = base + modes[m.route.mode] + vdom.attrs.href
			if (root.addEventListener) {
				root.removeEventListener("click", routeUnobtrusive)
				root.addEventListener("click", routeUnobtrusive)
			} else {
				root.detachEvent("onclick", routeUnobtrusive)
				root.attachEvent("onclick", routeUnobtrusive)
			}

			return
		}
		// m.route(route, params, shouldReplaceHistoryEntry)
		if (isString(root)) {
			var oldRoute = currentRoute
			currentRoute = root

			var args = arg1 || {}
			var queryIndex = currentRoute.indexOf("?")
			var params

			if (queryIndex > -1) {
				params = parseQueryString(currentRoute.slice(queryIndex + 1))
			} else {
				params = {}
			}

			for (var i in args) if (hasOwn.call(args, i)) {
				params[i] = args[i]
			}

			var querystring = buildQueryString(params)
			var currentPath

			if (queryIndex > -1) {
				currentPath = currentRoute.slice(0, queryIndex)
			} else {
				currentPath = currentRoute
			}

			if (querystring) {
				currentRoute = currentPath +
					(currentPath.indexOf("?") === -1 ? "?" : "&") +
					querystring
			}

			var replaceHistory =
				(arguments.length === 3 ? arg2 : arg1) === true ||
				oldRoute === root

			if (global.history.pushState) {
				var method = replaceHistory ? "replaceState" : "pushState"
				computePreRedrawHook = setScroll
				computePostRedrawHook = function () {
					global.history[method](null, $document.title,
						modes[m.route.mode] + currentRoute)
				}
				redirect(modes[m.route.mode] + currentRoute)
			} else {
				$location[m.route.mode] = currentRoute
				redirect(modes[m.route.mode] + currentRoute)
			}
		}
	}

	m.route.param = function (key) {
		if (!routeParams) {
			throw new Error("You must call m.route(element, defaultRoute, " +
				"routes) before calling m.route.param()")
		}

		if (!key) {
			return routeParams
		}

		return routeParams[key]
	}

	m.route.mode = "search"

	function normalizeRoute(route) {
		return route.slice(modes[m.route.mode].length)
	}

	function routeByValue(root, router, path) {
		routeParams = {}

		var queryStart = path.indexOf("?")
		if (queryStart !== -1) {
			routeParams = parseQueryString(
				path.substr(queryStart + 1, path.length))
			path = path.substr(0, queryStart)
		}

		// Get all routes and check if there's
		// an exact match for the current path
		var keys = Object.keys(router)
		var index = keys.indexOf(path)

		if (index !== -1){
			m.mount(root, router[keys [index]])
			return true
		}

		for (var route in router) if (hasOwn.call(router, route)) {
			if (route === path) {
				m.mount(root, router[route])
				return true
			}

			var matcher = new RegExp("^" + route
				.replace(/:[^\/]+?\.{3}/g, "(.*?)")
				.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

			if (matcher.test(path)) {
				/* eslint-disable no-loop-func */
				path.replace(matcher, function () {
					var keys = route.match(/:[^\/]+/g) || []
					var values = [].slice.call(arguments, 1, -2)
					forEach(keys, function (key, i) {
						routeParams[key.replace(/:|\./g, "")] =
							decodeURIComponent(values[i])
					})
					m.mount(root, router[route])
				})
				/* eslint-enable no-loop-func */
				return true
			}
		}
	}

	function routeUnobtrusive(e) {
		e = e || event
		if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return

		if (e.preventDefault) {
			e.preventDefault()
		} else {
			e.returnValue = false
		}

		var currentTarget = e.currentTarget || e.srcElement
		var args

		if (m.route.mode === "pathname" && currentTarget.search) {
			args = parseQueryString(currentTarget.search.slice(1))
		} else {
			args = {}
		}

		while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
			currentTarget = currentTarget.parentNode
		}

		// clear pendingRequests because we want an immediate route change
		pendingRequests = 0
		m.route(currentTarget[m.route.mode]
			.slice(modes[m.route.mode].length), args)
	}

	function setScroll() {
		if (m.route.mode !== "hash" && $location.hash) {
			$location.hash = $location.hash
		} else {
			global.scrollTo(0, 0)
		}
	}

	function buildQueryString(object, prefix) {
		var duplicates = {}
		var str = []

		for (var prop in object) if (hasOwn.call(object, prop)) {
			var key = prefix ? prefix + "[" + prop + "]" : prop
			var value = object[prop]

			if (value === null) {
				str.push(encodeURIComponent(key))
			} else if (isObject(value)) {
				str.push(buildQueryString(value, key))
			} else if (isArray(value)) {
				var keys = []
				duplicates[key] = duplicates[key] || {}
				/* eslint-disable no-loop-func */
				forEach(value, function (item) {
					/* eslint-enable no-loop-func */
					if (!duplicates[key][item]) {
						duplicates[key][item] = true
						keys.push(encodeURIComponent(key) + "=" +
							encodeURIComponent(item))
					}
				})
				str.push(keys.join("&"))
			} else if (value !== undefined) {
				str.push(encodeURIComponent(key) + "=" +
					encodeURIComponent(value))
			}
		}
		return str.join("&")
	}

	function parseQueryString(str) {
		if (str === "" || str == null) return {}
		if (str.charAt(0) === "?") str = str.slice(1)

		var pairs = str.split("&")
		var params = {}

		forEach(pairs, function (string) {
			var pair = string.split("=")
			var key = decodeURIComponent(pair[0])
			var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
			if (params[key] != null) {
				if (!isArray(params[key])) params[key] = [params[key]]
				params[key].push(value)
			}
			else params[key] = value
		})

		return params
	}

	m.route.buildQueryString = buildQueryString
	m.route.parseQueryString = parseQueryString

	function reset(root) {
		var cacheKey = getCellCacheKey(root)
		clear(root.childNodes, cellCache[cacheKey])
		cellCache[cacheKey] = undefined
	}

	m.deferred = function () {
		var deferred = new Deferred()
		deferred.promise = propify(deferred.promise)
		return deferred
	}

	function propify(promise, initialValue) {
		var prop = m.prop(initialValue)
		promise.then(prop)
		prop.then = function (resolve, reject) {
			return propify(promise.then(resolve, reject), initialValue)
		}

		prop.catch = prop.then.bind(null, null)
		return prop
	}
	// Promiz.mithril.js | Zolmeister | MIT
	// a modified version of Promiz.js, which does not conform to Promises/A+
	// for two reasons:
	//
	// 1) `then` callbacks are called synchronously (because setTimeout is too
	//    slow, and the setImmediate polyfill is too big
	//
	// 2) throwing subclasses of Error cause the error to be bubbled up instead
	//    of triggering rejection (because the spec does not account for the
	//    important use case of default browser error handling, i.e. message w/
	//    line number)

	var RESOLVING = 1
	var REJECTING = 2
	var RESOLVED = 3
	var REJECTED = 4

	function Deferred(onSuccess, onFailure) {
		var self = this
		var state = 0
		var promiseValue = 0
		var next = []

		self.promise = {}

		self.resolve = function (value) {
			if (!state) {
				promiseValue = value
				state = RESOLVING

				fire()
			}

			return self
		}

		self.reject = function (value) {
			if (!state) {
				promiseValue = value
				state = REJECTING

				fire()
			}

			return self
		}

		self.promise.then = function (onSuccess, onFailure) {
			var deferred = new Deferred(onSuccess, onFailure)

			if (state === RESOLVED) {
				deferred.resolve(promiseValue)
			} else if (state === REJECTED) {
				deferred.reject(promiseValue)
			} else {
				next.push(deferred)
			}

			return deferred.promise
		}

		function finish(type) {
			state = type || REJECTED
			next.map(function (deferred) {
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else {
					deferred.reject(promiseValue)
				}
			})
		}

		function thennable(then, success, failure, notThennable) {
			if (((promiseValue != null && isObject(promiseValue)) ||
					isFunction(promiseValue)) && isFunction(then)) {
				try {
					// count protects against abuse calls from spec checker
					var count = 0
					then.call(promiseValue, function (value) {
						if (count++) return
						promiseValue = value
						success()
					}, function (value) {
						if (count++) return
						promiseValue = value
						failure()
					})
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					failure()
				}
			} else {
				notThennable()
			}
		}

		function fire() {
			// check if it's a thenable
			var then
			try {
				then = promiseValue && promiseValue.then
			} catch (e) {
				m.deferred.onerror(e)
				promiseValue = e
				state = REJECTING
				return fire()
			}

			if (state === REJECTING) {
				m.deferred.onerror(promiseValue)
			}

			thennable(then, function () {
				state = RESOLVING
				fire()
			}, function () {
				state = REJECTING
				fire()
			}, function () {
				try {
					if (state === RESOLVING && isFunction(onSuccess)) {
						promiseValue = onSuccess(promiseValue)
					} else if (state === REJECTING && isFunction(onFailure)) {
						promiseValue = onFailure(promiseValue)
						state = RESOLVING
					}
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					return finish()
				}

				if (promiseValue === self) {
					promiseValue = TypeError()
					finish()
				} else {
					thennable(then, function () {
						finish(RESOLVED)
					}, finish, function () {
						finish(state === RESOLVING && RESOLVED)
					})
				}
			})
		}
	}

	m.deferred.onerror = function (e) {
		if (type.call(e) === "[object Error]" &&
				!/ Error/.test(e.constructor.toString())) {
			pendingRequests = 0
			throw e
		}
	}

	m.sync = function (args) {
		var deferred = m.deferred()
		var outstanding = args.length
		var results = new Array(outstanding)
		var method = "resolve"

		function synchronizer(pos, resolved) {
			return function (value) {
				results[pos] = value
				if (!resolved) method = "reject"
				if (--outstanding === 0) {
					deferred.promise(results)
					deferred[method](results)
				}
				return value
			}
		}

		if (args.length > 0) {
			forEach(args, function (arg, i) {
				arg.then(synchronizer(i, true), synchronizer(i, false))
			})
		} else {
			deferred.resolve([])
		}

		return deferred.promise
	}

	function identity(value) { return value }

	function handleJsonp(options) {
		var callbackKey = "mithril_callback_" +
			new Date().getTime() + "_" +
			(Math.round(Math.random() * 1e16)).toString(36)

		var script = $document.createElement("script")

		global[callbackKey] = function (resp) {
			script.parentNode.removeChild(script)
			options.onload({
				type: "load",
				target: {
					responseText: resp
				}
			})
			global[callbackKey] = undefined
		}

		script.onerror = function () {
			script.parentNode.removeChild(script)

			options.onerror({
				type: "error",
				target: {
					status: 500,
					responseText: JSON.stringify({
						error: "Error making jsonp request"
					})
				}
			})
			global[callbackKey] = undefined

			return false
		}

		script.onload = function () {
			return false
		}

		script.src = options.url +
			(options.url.indexOf("?") > 0 ? "&" : "?") +
			(options.callbackKey ? options.callbackKey : "callback") +
			"=" + callbackKey +
			"&" + buildQueryString(options.data || {})

		$document.body.appendChild(script)
	}

	function createXhr(options) {
		var xhr = new global.XMLHttpRequest()
		xhr.open(options.method, options.url, true, options.user,
			options.password)

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					options.onload({type: "load", target: xhr})
				} else {
					options.onerror({type: "error", target: xhr})
				}
			}
		}

		if (options.serialize === JSON.stringify &&
				options.data &&
				options.method !== "GET") {
			xhr.setRequestHeader("Content-Type",
				"application/json; charset=utf-8")
		}

		if (options.deserialize === JSON.parse) {
			xhr.setRequestHeader("Accept", "application/json, text/*")
		}

		if (isFunction(options.config)) {
			var maybeXhr = options.config(xhr, options)
			if (maybeXhr != null) xhr = maybeXhr
		}

		var data = options.method === "GET" || !options.data ? "" : options.data

		if (data && !isString(data) && data.constructor !== global.FormData) {
			throw new Error("Request data should be either be a string or " +
				"FormData. Check the `serialize` option in `m.request`")
		}

		xhr.send(data)
		return xhr
	}

	function ajax(options) {
		if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
			return handleJsonp(options)
		} else {
			return createXhr(options)
		}
	}

	function bindData(options, data, serialize) {
		if (options.method === "GET" && options.dataType !== "jsonp") {
			var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
			var querystring = buildQueryString(data)
			options.url += (querystring ? prefix + querystring : "")
		} else {
			options.data = serialize(data)
		}
	}

	function parameterizeUrl(url, data) {
		if (data) {
			url = url.replace(/:[a-z]\w+/gi, function(token){
				var key = token.slice(1)
				var value = data[key]
				delete data[key]
				return value
			})
		}
		return url
	}

	m.request = function (options) {
		if (options.background !== true) m.startComputation()
		var deferred = new Deferred()
		var isJSONP = options.dataType &&
			options.dataType.toLowerCase() === "jsonp"

		var serialize, deserialize, extract

		if (isJSONP) {
			serialize = options.serialize =
			deserialize = options.deserialize = identity

			extract = function (jsonp) { return jsonp.responseText }
		} else {
			serialize = options.serialize = options.serialize || JSON.stringify

			deserialize = options.deserialize =
				options.deserialize || JSON.parse
			extract = options.extract || function (xhr) {
				if (xhr.responseText.length || deserialize !== JSON.parse) {
					return xhr.responseText
				} else {
					return null
				}
			}
		}

		options.method = (options.method || "GET").toUpperCase()
		options.url = parameterizeUrl(options.url, options.data)
		bindData(options, options.data, serialize)
		options.onload = options.onerror = function (ev) {
			try {
				ev = ev || event
				var response = deserialize(extract(ev.target, options))
				if (ev.type === "load") {
					if (options.unwrapSuccess) {
						response = options.unwrapSuccess(response, ev.target)
					}

					if (isArray(response) && options.type) {
						forEach(response, function (res, i) {
							response[i] = new options.type(res)
						})
					} else if (options.type) {
						response = new options.type(response)
					}

					deferred.resolve(response)
				} else {
					if (options.unwrapError) {
						response = options.unwrapError(response, ev.target)
					}

					deferred.reject(response)
				}
			} catch (e) {
				deferred.reject(e)
			} finally {
				if (options.background !== true) m.endComputation()
			}
		}

		ajax(options)
		deferred.promise = propify(deferred.promise, options.initialValue)
		return deferred.promise
	}

	return m
})
;
( function _package( factory ){
	if( typeof define === 'function' && define.amd ){
		define( [ 'mithril' ], factory )
	}
	else if( typeof exports === 'object' ){
		module.exports = factory( require( 'mithril' ) )
	}
	else{
		factory( m )
	}
}( function define( m ){
	function bidi( node, prop ){
		var type = node.tag === 'select'
			? node.attrs.multi
				? 'multi'
				: 'select'
			: node.attrs.type

		// Setup: bind listeners
		if( type === 'multi' ){
			node.attrs.onchange = function(){
				prop( [].slice.call( this.selectedOptions, function( x ){
					return x.value
				} ) )
			}
		}
		else if( type === 'select' ){
			node.attrs.onchange = function( e ){
				prop( this.selectedOptions[ 0 ].value )
			}
		}
		else if( type === 'checkbox' ){
			node.attrs.onchange = function( e ){
				prop( this.checked )
			}
		}
		else {
			node.attrs.onchange = node.attrs.oninput = function( e ){
				prop( this.value )
			}
		}

		if( node.tag === 'select' ){
			node.children.forEach( function( option ){
				if( option.attrs.value === prop() || option.children[ 0 ] === prop() ){
					option.attrs.selected = true
				}
			} )
		}
		else if( type === 'checkbox' ){
			node.attrs.checked = prop()
		}
		else if( type === 'radio' ){
			node.attrs.checked = prop() === node.attrs.value
		}
		else {
			node.attrs.value   = prop()
		}

		return node
	}

	bidi.view = function( ctrl, node, prop ){
	  return bidi( node, node.attrs.bidi )
	}

	if( m.attrs ) m.attrs.bidi = bidi
	
	m.bidi = bidi

	return bidi
} ) )
;
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;
/*jslint browser: true*/
/*jslint jquery: true*/

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

/*
 * One small change is: now keys are passed by object { keys: '...' }
 * Might be useful, when you want to pass some other data to your handler
 */

(function(jQuery) {

  jQuery.hotkeys = {
    version: "0.8",

    specialKeys: {
      8: "backspace",
      9: "tab",
      10: "return",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      59: ";",
      61: "=",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    },

    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    },

    // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
    textAcceptingInputTypes: [
      "text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime",
      "datetime-local", "search", "color", "tel"],

    options: {
      filterTextInputs: true
    }
  };

  function keyHandler(handleObj) {
    if (typeof handleObj.data === "string") {
      handleObj.data = {
        keys: handleObj.data
      };
    }

    // Only care when a possible input has been specified
    if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
      return;
    }

    var origHandler = handleObj.handler,
      keys = handleObj.data.keys.toLowerCase().split(" ");

    handleObj.handler = function(event) {
      //      Don't fire in text-accepting inputs that we didn't directly bind to
      if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||
          (jQuery.hotkeys.options.filterTextInputs &&
            jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {
        return;
      }

      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
        character = String.fromCharCode(event.which).toLowerCase(),
        modif = "",
        possible = {};

      jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {

        if (event[specialKey + 'Key'] && special !== specialKey) {
          modif += specialKey + '+';
        }
      });

      // metaKey is triggered off ctrlKey erronously
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }

      if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
        modif = modif.replace("alt+ctrl+shift+", "hyper+");
      }

      if (special) {
        possible[modif + special] = true;
      }
      else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;

        // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }

      for (var i = 0, l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }

  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {
      add: keyHandler
    };
  });

})(jQuery || this.jQuery || window.jQuery);
;
/*!
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 */


/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.
*/
var CanvasImage = function (image) {
    this.canvas  = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.width  = this.canvas.width  = image.width;
    this.height = this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0, this.width, this.height);
};

CanvasImage.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function (imageData) {
    this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function () {
    return this.width * this.height;
};

CanvasImage.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function () {
    this.canvas.parentNode.removeChild(this.canvas);
};


var ColorThief = function () {};

/*
 * getColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar
 * colors and return the base color from the largest cluster.
 *
 * Quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster a color will be returned but the greater the likelihood that it will not be the visually
 * most dominant color.
 *
 * */
ColorThief.prototype.getColor = function(sourceImage, quality) {
    var palette       = this.getPalette(sourceImage, 5, quality);
    var dominantColor = palette[0];
    return dominantColor;
};


/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns array[ {r: num, g: num, b: num}, {r: num, g: num, b: num}, ...]
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar colors.
 *
 * colorCount determines the size of the palette; the number of colors returned. If not set, it
 * defaults to 10.
 *
 * BUGGY: Function does not always return the requested amount of colors. It can be +/- 2.
 *
 * quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster the palette generation but the greater the likelihood that colors will be missed.
 *
 *
 */
ColorThief.prototype.getPalette = function(sourceImage, colorCount, quality) {

    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    }
    if (typeof quality === 'undefined' || quality < 1) {
        quality = 10;
    }

    // Create custom CanvasImage object
    var image      = new CanvasImage(sourceImage);
    var imageData  = image.getImageData();
    var pixels     = imageData.data;
    var pixelCount = image.getPixelCount();

    // Store the RGB values in an array format suitable for quantize function
    var pixelArray = [];
    for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        // If pixel is mostly opaque and not white
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }

    // Send array to quantize function which clusters values
    // using median cut algorithm
    var cmap    = MMCQ.quantize(pixelArray, colorCount);
    var palette = cmap? cmap.palette() : null;

    // Clean up
    image.removeCanvas();

    return palette;
};




/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

// fill out a couple protovis dependencies
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if (!pv) {
    var pv = {
        map: function(array, f) {
          var o = {};
          return f ? array.map(function(d, i) { o.index = i; return f.call(o, d); }) : array.slice();
        },
        naturalOrder: function(a, b) {
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        },
        sum: function(array, f) {
          var o = {};
          return array.reduce(f ? function(p, d, i) { o.index = i; return p + f.call(o, d); } : function(p, d) { return p + d; }, 0);
        },
        max: function(array, f) {
          return Math.max.apply(null, f ? pv.map(array, f) : array);
        }
    };
}



/**
 * Basic Javascript port of the MMCQ (modified median cut quantization)
 * algorithm from the Leptonica library (http://www.leptonica.com/).
 * Returns a color map you can use to map original pixels to the reduced
 * palette. Still a work in progress.
 *
 * @author Nick Rabinowitz
 * @example

// array of pixels as [R,G,B] arrays
var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
                // etc
                ];
var maxColors = 4;

var cmap = MMCQ.quantize(myPixels, maxColors);
var newPalette = cmap.palette();
var newPixels = myPixels.map(function(p) {
    return cmap.map(p);
});

 */
var MMCQ = (function() {
    // private constants
    var sigbits = 5,
        rshift = 8 - sigbits,
        maxIterations = 1000,
        fractByPopulations = 0.75;

    // get reduced-space color index for a pixel
    function getColorIndex(r, g, b) {
        return (r << (2 * sigbits)) + (g << sigbits) + b;
    }

    // Simple priority queue
    function PQueue(comparator) {
        var contents = [],
            sorted = false;

        function sort() {
            contents.sort(comparator);
            sorted = true;
        }

        return {
            push: function(o) {
                contents.push(o);
                sorted = false;
            },
            peek: function(index) {
                if (!sorted) sort();
                if (index===undefined) index = contents.length - 1;
                return contents[index];
            },
            pop: function() {
                if (!sorted) sort();
                return contents.pop();
            },
            size: function() {
                return contents.length;
            },
            map: function(f) {
                return contents.map(f);
            },
            debug: function() {
                if (!sorted) sort();
                return contents;
            }
        };
    }

    // 3d color space box
    function VBox(r1, r2, g1, g2, b1, b2, histo) {
        var vbox = this;
        vbox.r1 = r1;
        vbox.r2 = r2;
        vbox.g1 = g1;
        vbox.g2 = g2;
        vbox.b1 = b1;
        vbox.b2 = b2;
        vbox.histo = histo;
    }
    VBox.prototype = {
        volume: function(force) {
            var vbox = this;
            if (!vbox._volume || force) {
                vbox._volume = ((vbox.r2 - vbox.r1 + 1) * (vbox.g2 - vbox.g1 + 1) * (vbox.b2 - vbox.b1 + 1));
            }
            return vbox._volume;
        },
        count: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._count_set || force) {
                var npix = 0,
                    i, j, k;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                             index = getColorIndex(i,j,k);
                             npix += (histo[index] || 0);
                        }
                    }
                }
                vbox._count = npix;
                vbox._count_set = true;
            }
            return vbox._count;
        },
        copy: function() {
            var vbox = this;
            return new VBox(vbox.r1, vbox.r2, vbox.g1, vbox.g2, vbox.b1, vbox.b2, vbox.histo);
        },
        avg: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._avg || force) {
                var ntot = 0,
                    mult = 1 << (8 - sigbits),
                    rsum = 0,
                    gsum = 0,
                    bsum = 0,
                    hval,
                    i, j, k, histoindex;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                             histoindex = getColorIndex(i,j,k);
                             hval = histo[histoindex] || 0;
                             ntot += hval;
                             rsum += (hval * (i + 0.5) * mult);
                             gsum += (hval * (j + 0.5) * mult);
                             bsum += (hval * (k + 0.5) * mult);
                        }
                    }
                }
                if (ntot) {
                    vbox._avg = [~~(rsum/ntot), ~~(gsum/ntot), ~~(bsum/ntot)];
                } else {
//                    console.log('empty box');
                    vbox._avg = [
                        ~~(mult * (vbox.r1 + vbox.r2 + 1) / 2),
                        ~~(mult * (vbox.g1 + vbox.g2 + 1) / 2),
                        ~~(mult * (vbox.b1 + vbox.b2 + 1) / 2)
                    ];
                }
            }
            return vbox._avg;
        },
        contains: function(pixel) {
            var vbox = this,
                rval = pixel[0] >> rshift;
                gval = pixel[1] >> rshift;
                bval = pixel[2] >> rshift;
            return (rval >= vbox.r1 && rval <= vbox.r2 &&
                    gval >= vbox.g1 && gval <= vbox.g2 &&
                    bval >= vbox.b1 && bval <= vbox.b2);
        }
    };

    // Color map
    function CMap() {
        this.vboxes = new PQueue(function(a,b) {
            return pv.naturalOrder(
                a.vbox.count()*a.vbox.volume(),
                b.vbox.count()*b.vbox.volume()
            );
        });
    }
    CMap.prototype = {
        push: function(vbox) {
            this.vboxes.push({
                vbox: vbox,
                color: vbox.avg()
            });
        },
        palette: function() {
            return this.vboxes.map(function(vb) { return vb.color; });
        },
        size: function() {
            return this.vboxes.size();
        },
        map: function(color) {
            var vboxes = this.vboxes;
            for (var i=0; i<vboxes.size(); i++) {
                if (vboxes.peek(i).vbox.contains(color)) {
                    return vboxes.peek(i).color;
                }
            }
            return this.nearest(color);
        },
        nearest: function(color) {
            var vboxes = this.vboxes,
                d1, d2, pColor;
            for (var i=0; i<vboxes.size(); i++) {
                d2 = Math.sqrt(
                    Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
                    Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
                    Math.pow(color[2] - vboxes.peek(i).color[2], 2)
                );
                if (d2 < d1 || d1 === undefined) {
                    d1 = d2;
                    pColor = vboxes.peek(i).color;
                }
            }
            return pColor;
        },
        forcebw: function() {
            // XXX: won't  work yet
            var vboxes = this.vboxes;
            vboxes.sort(function(a,b) { return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color));});

            // force darkest color to black if everything < 5
            var lowest = vboxes[0].color;
            if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
                vboxes[0].color = [0,0,0];

            // force lightest color to white if everything > 251
            var idx = vboxes.length-1,
                highest = vboxes[idx].color;
            if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
                vboxes[idx].color = [255,255,255];
        }
    };

    // histo (1-d array, giving the number of pixels in
    // each quantized region of color space), or null on error
    function getHisto(pixels) {
        var histosize = 1 << (3 * sigbits),
            histo = new Array(histosize),
            index, rval, gval, bval;
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            index = getColorIndex(rval, gval, bval);
            histo[index] = (histo[index] || 0) + 1;
        });
        return histo;
    }

    function vboxFromPixels(pixels, histo) {
        var rmin=1000000, rmax=0,
            gmin=1000000, gmax=0,
            bmin=1000000, bmax=0,
            rval, gval, bval;
        // find min/max
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            if (rval < rmin) rmin = rval;
            else if (rval > rmax) rmax = rval;
            if (gval < gmin) gmin = gval;
            else if (gval > gmax) gmax = gval;
            if (bval < bmin) bmin = bval;
            else if (bval > bmax)  bmax = bval;
        });
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
    }

    function medianCutApply(histo, vbox) {
        if (!vbox.count()) return;

        var rw = vbox.r2 - vbox.r1 + 1,
            gw = vbox.g2 - vbox.g1 + 1,
            bw = vbox.b2 - vbox.b1 + 1,
            maxw = pv.max([rw, gw, bw]);
        // only one pixel, no split
        if (vbox.count() == 1) {
            return [vbox.copy()];
        }
        /* Find the partial sum arrays along the selected axis. */
        var total = 0,
            partialsum = [],
            lookaheadsum = [],
            i, j, k, sum, index;
        if (maxw == rw) {
            for (i = vbox.r1; i <= vbox.r2; i++) {
                sum = 0;
                for (j = vbox.g1; j <= vbox.g2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(i,j,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else if (maxw == gw) {
            for (i = vbox.g1; i <= vbox.g2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(j,i,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else {  /* maxw == bw */
            for (i = vbox.b1; i <= vbox.b2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.g1; k <= vbox.g2; k++) {
                        index = getColorIndex(j,k,i);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        partialsum.forEach(function(d,i) {
            lookaheadsum[i] = total-d;
        });
        function doCut(color) {
            var dim1 = color + '1',
                dim2 = color + '2',
                left, right, vbox1, vbox2, d2, count2=0;
            for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
                if (partialsum[i] > total / 2) {
                    vbox1 = vbox.copy();
                    vbox2 = vbox.copy();
                    left = i - vbox[dim1];
                    right = vbox[dim2] - i;
                    if (left <= right)
                        d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
                    else d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
                    // avoid 0-count boxes
                    while (!partialsum[d2]) d2++;
                    count2 = lookaheadsum[d2];
                    while (!count2 && partialsum[d2-1]) count2 = lookaheadsum[--d2];
                    // set dimensions
                    vbox1[dim2] = d2;
                    vbox2[dim1] = vbox1[dim2] + 1;
//                    console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
                    return [vbox1, vbox2];
                }
            }

        }
        // determine the cut planes
        return maxw == rw ? doCut('r') :
            maxw == gw ? doCut('g') :
            doCut('b');
    }

    function quantize(pixels, maxcolors) {
        // short-circuit
        if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
//            console.log('wrong number of maxcolors');
            return false;
        }

        // XXX: check color content and convert to grayscale if insufficient

        var histo = getHisto(pixels),
            histosize = 1 << (3 * sigbits);

        // check that we aren't below maxcolors already
        var nColors = 0;
        histo.forEach(function() { nColors++; });
        if (nColors <= maxcolors) {
            // XXX: generate the new colors from the histo and return
        }

        // get the beginning vbox from the colors
        var vbox = vboxFromPixels(pixels, histo),
            pq = new PQueue(function(a,b) { return pv.naturalOrder(a.count(), b.count()); });
        pq.push(vbox);

        // inner function to do the iteration
        function iter(lh, target) {
            var ncolors = 1,
                niters = 0,
                vbox;
            while (niters < maxIterations) {
                vbox = lh.pop();
                if (!vbox.count())  { /* just put it back */
                    lh.push(vbox);
                    niters++;
                    continue;
                }
                // do the cut
                var vboxes = medianCutApply(histo, vbox),
                    vbox1 = vboxes[0],
                    vbox2 = vboxes[1];

                if (!vbox1) {
//                    console.log("vbox1 not defined; shouldn't happen!");
                    return;
                }
                lh.push(vbox1);
                if (vbox2) {  /* vbox2 can be null */
                    lh.push(vbox2);
                    ncolors++;
                }
                if (ncolors >= target) return;
                if (niters++ > maxIterations) {
//                    console.log("infinite loop; perhaps too few pixels!");
                    return;
                }
            }
        }

        // first set of colors, sorted by population
        iter(pq, fractByPopulations * maxcolors);

        // Re-sort by the product of pixel occupancy times the size in color space.
        var pq2 = new PQueue(function(a,b) {
            return pv.naturalOrder(a.count()*a.volume(), b.count()*b.volume());
        });
        while (pq.size()) {
            pq2.push(pq.pop());
        }

        // next set - generate the median cuts using the (npix * vol) sorting.
        iter(pq2, maxcolors - pq2.size());

        // calculate the actual colors
        var cmap = new CMap();
        while (pq2.size()) {
            cmap.push(pq2.pop());
        }

        return cmap;
    }

    return {
        quantize: quantize
    };
})();
;
//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.4',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            x    : function () {
                return this.valueOf();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                           m._a[SECOND] !== 0 ||
                                           m._a[MILLISECOND] !== 0)) ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                    +input : +moment(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName, format, strict) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',
        _ordinalParse : /\d{1,2}/,

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'x':
            return parseTokenOffsetMs;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(
                            input.match(/\d{1,2}/)[0], 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = config._locale.isPM(input);
            break;
        // HOUR
        case 'h' : // fall through to hh
        case 'hh' :
            config._pf.bigHour = true;
            /* falls through */
        case 'H' : // fall through to HH
        case 'HH' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX OFFSET (MILLISECONDS)
        case 'x':
            config._d = new Date(toInt(input));
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        res = new Moment(config);
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.zone(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.zone(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.add(this._dateTzOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                daysAdjust = (this - moment(this).startOf('month')) -
                    (that - moment(that).startOf('month'));
                // same as above but with zones, to negate all dst
                daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4;
                output += daysAdjust / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },

        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },

        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateTzOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.subtract(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._dateTzOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateTzOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);
;
(function(){var h=[].slice;String.prototype.autoLink=function(){var b,f,d,a,e,g;a=1<=arguments.length?h.call(arguments,0):[];e=/(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;if(!(0<a.length))return this.replace(e,"$1<a href='$2'>$2</a>");d=a[0];f=function(){var c;c=[];for(b in d)g=d[b],"callback"!==b&&c.push(" "+b+"='"+g+"'");return c}().join("");return this.replace(e,function(c,b,a){c=("function"===typeof d.callback?d.callback(a):void 0)||"<a href='"+
a+"'"+f+">"+a+"</a>";return""+b+c})}}).call(this);
;
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
;
/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
;
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
;
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: '50%',           // center vertically
    left: '50%',          // center horizontally
    position: 'absolute'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})

      css(el, {
        left: o.left,
        top: o.top
      })
        
      if (target) {
        target.insertBefore(el, target.firstChild||null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));
;
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */

/*

Basic Usage:
============

$('#el').spin(); // Creates a default Spinner using the text color of #el.
$('#el').spin({ ... }); // Creates a Spinner using the provided options.

$('#el').spin(false); // Stops and removes the spinner.

Using Presets:
==============

$('#el').spin('small'); // Creates a 'small' Spinner using the text color of #el.
$('#el').spin('large', '#fff'); // Creates a 'large' white Spinner.

Adding a custom preset:
=======================

$.fn.spin.presets.flower = {
  lines: 9,
  length: 10,
  width: 20,
  radius: 0
}

$('#el').spin('flower', 'red');

*/

(function(factory) {

  if (typeof exports == 'object') {
    // CommonJS
    factory(require('jquery'), require('spin.js'))
  }
  else if (typeof define == 'function' && define.amd) {
    // AMD, register as anonymous module
    define(['jquery', 'spin'], factory)
  }
  else {
    // Browser globals
    if (!window.Spinner) throw new Error('Spin.js not present')
    factory(window.jQuery, window.Spinner)
  }

}(function($, Spinner) {

  $.fn.spin = function(opts, color) {

    return this.each(function() {
      var $this = $(this),
        data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        opts = $.extend(
          { color: color || $this.css('color') },
          $.fn.spin.presets[opts] || opts
        )
        data.spinner = new Spinner(opts).spin(this)
      }
    })
  }

  $.fn.spin.presets = {
    tiny: { lines: 8, length: 2, width: 2, radius: 3 },
    small: { lines: 8, length: 4, width: 3, radius: 5 },
    large: { lines: 10, length: 8, width: 4, radius: 8 }
  }

}));
;
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());
;
'use strict';

System.register('flarum/app', ['flarum/ForumApp', 'flarum/initializers/store', 'flarum/initializers/preload', 'flarum/initializers/routes', 'flarum/initializers/components', 'flarum/initializers/humanTime', 'flarum/initializers/boot', 'flarum/initializers/alertEmailConfirmation'], function (_export, _context) {
  var ForumApp, store, preload, routes, components, humanTime, boot, alertEmailConfirmation, app;
  return {
    setters: [function (_flarumForumApp) {
      ForumApp = _flarumForumApp.default;
    }, function (_flarumInitializersStore) {
      store = _flarumInitializersStore.default;
    }, function (_flarumInitializersPreload) {
      preload = _flarumInitializersPreload.default;
    }, function (_flarumInitializersRoutes) {
      routes = _flarumInitializersRoutes.default;
    }, function (_flarumInitializersComponents) {
      components = _flarumInitializersComponents.default;
    }, function (_flarumInitializersHumanTime) {
      humanTime = _flarumInitializersHumanTime.default;
    }, function (_flarumInitializersBoot) {
      boot = _flarumInitializersBoot.default;
    }, function (_flarumInitializersAlertEmailConfirmation) {
      alertEmailConfirmation = _flarumInitializersAlertEmailConfirmation.default;
    }],
    execute: function () {
      app = new ForumApp();


      app.initializers.add('store', store);
      app.initializers.add('routes', routes);
      app.initializers.add('components', components);
      app.initializers.add('humanTime', humanTime);

      app.initializers.add('preload', preload, -100);
      app.initializers.add('boot', boot, -100);
      app.initializers.add('alertEmailConfirmation', alertEmailConfirmation, -100);

      _export('default', app);
    }
  };
});;
'use strict';

System.register('flarum/App', ['flarum/utils/ItemList', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/RequestErrorModal', 'flarum/components/ConfirmPasswordModal', 'flarum/Translator', 'flarum/utils/extract', 'flarum/utils/patchMithril', 'flarum/utils/RequestError', 'flarum/extend'], function (_export, _context) {
  var ItemList, Alert, Button, RequestErrorModal, ConfirmPasswordModal, Translator, extract, patchMithril, RequestError, extend, App;
  return {
    setters: [function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsRequestErrorModal) {
      RequestErrorModal = _flarumComponentsRequestErrorModal.default;
    }, function (_flarumComponentsConfirmPasswordModal) {
      ConfirmPasswordModal = _flarumComponentsConfirmPasswordModal.default;
    }, function (_flarumTranslator) {
      Translator = _flarumTranslator.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }, function (_flarumUtilsPatchMithril) {
      patchMithril = _flarumUtilsPatchMithril.default;
    }, function (_flarumUtilsRequestError) {
      RequestError = _flarumUtilsRequestError.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }],
    execute: function () {
      App = function () {
        function App() {
          babelHelpers.classCallCheck(this, App);

          patchMithril(window);

          /**
           * The forum model for this application.
           *
           * @type {Forum}
           * @public
           */
          this.forum = null;

          /**
           * A map of routes, keyed by a unique route name. Each route is an object
           * containing the following properties:
           *
           * - `path` The path that the route is accessed at.
           * - `component` The Mithril component to render when this route is active.
           *
           * @example
           * app.routes.discussion = {path: '/d/:id', component: DiscussionPage.component()};
           *
           * @type {Object}
           * @public
           */
          this.routes = {};

          /**
           * An object containing data to preload into the application.
           *
           * @type {Object}
           * @property {Object} preload.data An array of resource objects to preload
           *     into the data store.
           * @property {Object} preload.document An API response document to be used
           *     by the route that is first activated.
           * @property {Object} preload.session A response from the /api/token
           *     endpoint containing the session's authentication token and user ID.
           * @public
           */
          this.preload = {
            data: null,
            document: null,
            session: null
          };

          /**
           * An ordered list of initializers to bootstrap the application.
           *
           * @type {ItemList}
           * @public
           */
          this.initializers = new ItemList();

          /**
           * The app's session.
           *
           * @type {Session}
           * @public
           */
          this.session = null;

          /**
           * The app's translator.
           *
           * @type {Translator}
           * @public
           */
          this.translator = new Translator();

          /**
           * The app's data store.
           *
           * @type {Store}
           * @public
           */
          this.store = null;

          /**
           * A local cache that can be used to store data at the application level, so
           * that is persists between different routes.
           *
           * @type {Object}
           * @public
           */
          this.cache = {};

          /**
           * Whether or not the app has been booted.
           *
           * @type {Boolean}
           * @public
           */
          this.booted = false;

          /**
           * An Alert that was shown as a result of an AJAX request error. If present,
           * it will be dismissed on the next successful request.
           *
           * @type {null|Alert}
           * @private
           */
          this.requestError = null;

          this.title = '';
          this.titleCount = 0;
        }

        /**
         * Boot the application by running all of the registered initializers.
         *
         * @public
         */


        babelHelpers.createClass(App, [{
          key: 'boot',
          value: function boot() {
            var _this = this;

            this.translator.locale = this.locale;

            this.initializers.toArray().forEach(function (initializer) {
              return initializer(_this);
            });
          }
        }, {
          key: 'preloadedDocument',
          value: function preloadedDocument() {
            if (app.preload.document) {
              var results = app.store.pushPayload(app.preload.document);
              app.preload.document = null;

              return results;
            }

            return null;
          }
        }, {
          key: 'setTitle',
          value: function setTitle(title) {
            this.title = title;
            this.updateTitle();
          }
        }, {
          key: 'setTitleCount',
          value: function setTitleCount(count) {
            this.titleCount = count;
            this.updateTitle();
          }
        }, {
          key: 'updateTitle',
          value: function updateTitle() {
            document.title = (this.titleCount ? '(' + this.titleCount + ') ' : '') + (this.title ? this.title + ' - ' : '') + this.forum.attribute('title');
          }
        }, {
          key: 'request',
          value: function request(originalOptions) {
            var _this2 = this;

            var options = babelHelpers.extends({}, originalOptions);

            // Set some default options if they haven't been overridden. We want to
            // authenticate all requests with the session token. We also want all
            // requests to run asynchronously in the background, so that they don't
            // prevent redraws from occurring.
            options.background = options.background || true;

            extend(options, 'config', function (result, xhr) {
              return xhr.setRequestHeader('X-CSRF-Token', _this2.session.csrfToken);
            });

            // If the method is something like PATCH or DELETE, which not all servers
            // and clients support, then we'll send it as a POST request with the
            // intended method specified in the X-HTTP-Method-Override header.
            if (options.method !== 'GET' && options.method !== 'POST') {
              (function () {
                var method = options.method;
                extend(options, 'config', function (result, xhr) {
                  return xhr.setRequestHeader('X-HTTP-Method-Override', method);
                });
                options.method = 'POST';
              })();
            }

            // When we deserialize JSON data, if for some reason the server has provided
            // a dud response, we don't want the application to crash. We'll show an
            // error message to the user instead.
            options.deserialize = options.deserialize || function (responseText) {
              return responseText;
            };

            options.errorHandler = options.errorHandler || function (error) {
              throw error;
            };

            // When extracting the data from the response, we can check the server
            // response code and show an error message to the user if something's gone
            // awry.
            var original = options.extract;
            options.extract = function (xhr) {
              var responseText = void 0;

              if (original) {
                responseText = original(xhr.responseText);
              } else {
                responseText = xhr.responseText || null;
              }

              var status = xhr.status;

              if (status < 200 || status > 299) {
                throw new RequestError(status, responseText, options, xhr);
              }

              if (xhr.getResponseHeader) {
                var csrfToken = xhr.getResponseHeader('X-CSRF-Token');
                if (csrfToken) app.session.csrfToken = csrfToken;
              }

              try {
                return JSON.parse(responseText);
              } catch (e) {
                throw new RequestError(500, responseText, options, xhr);
              }
            };

            if (this.requestError) this.alerts.dismiss(this.requestError.alert);

            // Now make the request. If it's a failure, inspect the error that was
            // returned and show an alert containing its contents.
            var deferred = m.deferred();

            m.request(options).then(function (response) {
              return deferred.resolve(response);
            }, function (error) {
              _this2.requestError = error;

              var children = void 0;

              switch (error.status) {
                case 422:
                  children = error.response.errors.map(function (error) {
                    return [error.detail, m('br', null)];
                  }).reduce(function (a, b) {
                    return a.concat(b);
                  }, []).slice(0, -1);
                  break;

                case 401:
                case 403:
                  children = app.translator.trans('core.lib.error.permission_denied_message');
                  break;

                case 404:
                case 410:
                  children = app.translator.trans('core.lib.error.not_found_message');
                  break;

                case 429:
                  children = app.translator.trans('core.lib.error.rate_limit_exceeded_message');
                  break;

                default:
                  children = app.translator.trans('core.lib.error.generic_message');
              }

              error.alert = new Alert({
                type: 'error',
                children: children,
                controls: app.forum.attribute('debug') ? [m(
                  Button,
                  { className: 'Button Button--link', onclick: _this2.showDebug.bind(_this2, error) },
                  'Debug'
                )] : undefined
              });

              try {
                options.errorHandler(error);
              } catch (error) {
                _this2.alerts.show(error.alert);
              }

              deferred.reject(error);
            });

            return deferred.promise;
          }
        }, {
          key: 'showDebug',
          value: function showDebug(error) {
            this.alerts.dismiss(this.requestErrorAlert);

            this.modal.show(new RequestErrorModal({ error: error }));
          }
        }, {
          key: 'route',
          value: function route(name) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var url = this.routes[name].path.replace(/:([^\/]+)/g, function (m, key) {
              return extract(params, key);
            });
            var queryString = m.route.buildQueryString(params);
            var prefix = m.route.mode === 'pathname' ? app.forum.attribute('basePath') : '';

            return prefix + url + (queryString ? '?' + queryString : '');
          }
        }]);
        return App;
      }();

      _export('default', App);
    }
  };
});;
'use strict';

System.register('flarum/Component', [], function (_export, _context) {
  var Component;
  return {
    setters: [],
    execute: function () {
      Component = function () {
        /**
         * @param {Object} props
         * @param {Array|Object} children
         * @public
         */

        function Component() {
          var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          var children = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          babelHelpers.classCallCheck(this, Component);

          if (children) props.children = children;

          this.constructor.initProps(props);

          /**
           * The properties passed into the component.
           *
           * @type {Object}
           */
          this.props = props;

          /**
           * The root DOM element for the component.
           *
           * @type DOMElement
           * @public
           */
          this.element = null;

          /**
           * Whether or not to retain the component's subtree on redraw.
           *
           * @type {boolean}
           * @public
           */
          this.retain = false;

          this.init();
        }

        /**
         * Called when the component is constructed.
         *
         * @protected
         */


        babelHelpers.createClass(Component, [{
          key: 'init',
          value: function init() {}
        }, {
          key: 'onunload',
          value: function onunload() {}
        }, {
          key: 'render',
          value: function render() {
            var _this = this;

            var vdom = this.retain ? { subtree: 'retain' } : this.view();

            // Override the root element's config attribute with our own function, which
            // will set the component instance's element property to the root DOM
            // element, and then run the component class' config method.
            vdom.attrs = vdom.attrs || {};

            var originalConfig = vdom.attrs.config;

            vdom.attrs.config = function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              _this.element = args[0];
              _this.config.apply(_this, args.slice(1));
              if (originalConfig) originalConfig.apply(_this, args);
            };

            return vdom;
          }
        }, {
          key: '$',
          value: function (_$) {
            function $(_x) {
              return _$.apply(this, arguments);
            }

            $.toString = function () {
              return _$.toString();
            };

            return $;
          }(function (selector) {
            var $element = $(this.element);

            return selector ? $element.find(selector) : $element;
          })
        }, {
          key: 'config',
          value: function config() {}
        }, {
          key: 'view',
          value: function view() {
            throw new Error('Component#view must be implemented by subclass');
          }
        }], [{
          key: 'component',
          value: function component() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var children = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var componentProps = babelHelpers.extends({}, props);

            if (children) componentProps.children = children;

            this.initProps(componentProps);

            // Set up a function for Mithril to get the component's view. It will accept
            // the component's controller (which happens to be the component itself, in
            // our case), update its props with the ones supplied, and then render the view.
            var view = function view(component) {
              component.props = componentProps;
              return component.render();
            };

            // Mithril uses this property on the view function to cache component
            // controllers between redraws, thus persisting component state.
            view.$original = this.prototype.view;

            // Our output object consists of a controller constructor + a view function
            // which Mithril will use to instantiate and render the component. We also
            // attach a reference to the props that were passed through and the
            // component's class for reference.
            var output = {
              controller: this.bind(undefined, componentProps),
              view: view,
              props: componentProps,
              component: this
            };

            // If a `key` prop was set, then we'll assume that we want that to actually
            // show up as an attribute on the component object so that Mithril's key
            // algorithm can be applied.
            if (componentProps.key) {
              output.attrs = { key: componentProps.key };
            }

            return output;
          }
        }, {
          key: 'initProps',
          value: function initProps(props) {}
        }]);
        return Component;
      }();

      _export('default', Component);
    }
  };
});;
'use strict';

System.register('flarum/components/Alert', ['flarum/Component', 'flarum/components/Button', 'flarum/helpers/listItems', 'flarum/utils/extract'], function (_export, _context) {
  var Component, Button, listItems, extract, Alert;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }],
    execute: function () {
      Alert = function (_Component) {
        babelHelpers.inherits(Alert, _Component);

        function Alert() {
          babelHelpers.classCallCheck(this, Alert);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Alert).apply(this, arguments));
        }

        babelHelpers.createClass(Alert, [{
          key: 'view',
          value: function view() {
            var attrs = babelHelpers.extends({}, this.props);

            var type = extract(attrs, 'type');
            attrs.className = 'Alert Alert--' + type + ' ' + (attrs.className || '');

            var children = extract(attrs, 'children');
            var controls = extract(attrs, 'controls') || [];

            // If the alert is meant to be dismissible (which is the case by default),
            // then we will create a dismiss button to append as the final control in
            // the alert.
            var dismissible = extract(attrs, 'dismissible');
            var ondismiss = extract(attrs, 'ondismiss');
            var dismissControl = [];

            if (dismissible || dismissible === undefined) {
              dismissControl.push(m(Button, {
                icon: 'times',
                className: 'Button Button--link Button--icon Alert-dismiss',
                onclick: ondismiss }));
            }

            return m(
              'div',
              attrs,
              m(
                'span',
                { className: 'Alert-body' },
                children
              ),
              m(
                'ul',
                { className: 'Alert-controls' },
                listItems(controls.concat(dismissControl))
              )
            );
          }
        }]);
        return Alert;
      }(Component);

      _export('default', Alert);
    }
  };
});;
'use strict';

System.register('flarum/components/AlertManager', ['flarum/Component', 'flarum/components/Alert'], function (_export, _context) {
  var Component, Alert, AlertManager;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }],
    execute: function () {
      AlertManager = function (_Component) {
        babelHelpers.inherits(AlertManager, _Component);

        function AlertManager() {
          babelHelpers.classCallCheck(this, AlertManager);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AlertManager).apply(this, arguments));
        }

        babelHelpers.createClass(AlertManager, [{
          key: 'init',
          value: function init() {
            /**
             * An array of Alert components which are currently showing.
             *
             * @type {Alert[]}
             * @protected
             */
            this.components = [];
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'AlertManager' },
              this.components.map(function (component) {
                return m(
                  'div',
                  { className: 'AlertManager-alert' },
                  component
                );
              })
            );
          }
        }, {
          key: 'show',
          value: function show(component) {
            if (!(component instanceof Alert)) {
              throw new Error('The AlertManager component can only show Alert components');
            }

            component.props.ondismiss = this.dismiss.bind(this, component);

            this.components.push(component);
            m.redraw();
          }
        }, {
          key: 'dismiss',
          value: function dismiss(component) {
            var index = this.components.indexOf(component);

            if (index !== -1) {
              this.components.splice(index, 1);
              m.redraw();
            }
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.components = [];
            m.redraw();
          }
        }]);
        return AlertManager;
      }(Component);

      _export('default', AlertManager);
    }
  };
});;
'use strict';

System.register('flarum/components/AvatarEditor', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/icon', 'flarum/helpers/listItems', 'flarum/utils/ItemList', 'flarum/components/Button', 'flarum/components/LoadingIndicator'], function (_export, _context) {
  var Component, avatar, icon, listItems, ItemList, Button, LoadingIndicator, AvatarEditor;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }],
    execute: function () {
      AvatarEditor = function (_Component) {
        babelHelpers.inherits(AvatarEditor, _Component);

        function AvatarEditor() {
          babelHelpers.classCallCheck(this, AvatarEditor);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AvatarEditor).apply(this, arguments));
        }

        babelHelpers.createClass(AvatarEditor, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not an avatar upload is in progress.
             *
             * @type {Boolean}
             */
            this.loading = false;
          }
        }, {
          key: 'view',
          value: function view() {
            var user = this.props.user;

            return m(
              'div',
              { className: 'AvatarEditor Dropdown ' + this.props.className + (this.loading ? ' loading' : '') },
              avatar(user),
              m(
                'a',
                { className: 'Dropdown-toggle',
                  'data-toggle': 'dropdown',
                  onclick: this.quickUpload.bind(this) },
                this.loading ? LoadingIndicator.component() : icon('pencil')
              ),
              m(
                'ul',
                { className: 'Dropdown-menu Menu' },
                listItems(this.controlItems().toArray())
              )
            );
          }
        }, {
          key: 'controlItems',
          value: function controlItems() {
            var items = new ItemList();

            items.add('upload', Button.component({
              icon: 'upload',
              children: app.translator.trans('core.forum.user.avatar_upload_button'),
              onclick: this.upload.bind(this)
            }));

            items.add('remove', Button.component({
              icon: 'times',
              children: app.translator.trans('core.forum.user.avatar_remove_button'),
              onclick: this.remove.bind(this)
            }));

            return items;
          }
        }, {
          key: 'quickUpload',
          value: function quickUpload(e) {
            if (!this.props.user.avatarUrl()) {
              e.preventDefault();
              e.stopPropagation();
              this.upload();
            }
          }
        }, {
          key: 'upload',
          value: function upload() {
            var _this2 = this;

            if (this.loading) return;

            // Create a hidden HTML input element and click on it so the user can select
            // an avatar file. Once they have, we will upload it via the API.
            var user = this.props.user;
            var $input = $('<input type="file">');

            $input.appendTo('body').hide().click().on('change', function (e) {
              var data = new FormData();
              data.append('avatar', $(e.target)[0].files[0]);

              _this2.loading = true;
              m.redraw();

              app.request({
                method: 'POST',
                url: app.forum.attribute('apiUrl') + '/users/' + user.id() + '/avatar',
                serialize: function serialize(raw) {
                  return raw;
                },
                data: data
              }).then(_this2.success.bind(_this2), _this2.failure.bind(_this2));
            });
          }
        }, {
          key: 'remove',
          value: function remove() {
            var user = this.props.user;

            this.loading = true;
            m.redraw();

            app.request({
              method: 'DELETE',
              url: app.forum.attribute('apiUrl') + '/users/' + user.id() + '/avatar'
            }).then(this.success.bind(this), this.failure.bind(this));
          }
        }, {
          key: 'success',
          value: function success(response) {
            app.store.pushPayload(response);
            delete this.props.user.avatarColor;

            this.loading = false;
            m.redraw();
          }
        }, {
          key: 'failure',
          value: function failure() {
            this.loading = false;
            m.redraw();
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(AvatarEditor), 'initProps', this).call(this, props);

            props.className = props.className || '';
          }
        }]);
        return AvatarEditor;
      }(Component);

      _export('default', AvatarEditor);
    }
  };
});;
'use strict';

System.register('flarum/components/Badge', ['flarum/Component', 'flarum/helpers/icon', 'flarum/utils/extract'], function (_export, _context) {
  var Component, icon, extract, Badge;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }],
    execute: function () {
      Badge = function (_Component) {
        babelHelpers.inherits(Badge, _Component);

        function Badge() {
          babelHelpers.classCallCheck(this, Badge);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Badge).apply(this, arguments));
        }

        babelHelpers.createClass(Badge, [{
          key: 'view',
          value: function view() {
            var attrs = babelHelpers.extends({}, this.props);
            var type = extract(attrs, 'type');
            var iconName = extract(attrs, 'icon');

            attrs.className = 'Badge ' + (type ? 'Badge--' + type : '') + ' ' + (attrs.className || '');
            attrs.title = extract(attrs, 'label') || '';

            return m(
              'span',
              attrs,
              iconName ? icon(iconName, { className: 'Badge-icon' }) : m.trust('&nbsp;')
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            if (isInitialized) return;

            if (this.props.label) this.$().tooltip({ container: 'body' });
          }
        }]);
        return Badge;
      }(Component);

      _export('default', Badge);
    }
  };
});;
'use strict';

System.register('flarum/components/Button', ['flarum/Component', 'flarum/helpers/icon', 'flarum/utils/extract', 'flarum/utils/extractText', 'flarum/components/LoadingIndicator'], function (_export, _context) {
  var Component, icon, extract, extractText, LoadingIndicator, Button;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }],
    execute: function () {
      Button = function (_Component) {
        babelHelpers.inherits(Button, _Component);

        function Button() {
          babelHelpers.classCallCheck(this, Button);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
        }

        babelHelpers.createClass(Button, [{
          key: 'view',
          value: function view() {
            var attrs = babelHelpers.extends({}, this.props);

            delete attrs.children;

            attrs.className = attrs.className || '';
            attrs.type = attrs.type || 'button';
            attrs.title = attrs.title || this.getDefaultTitle();

            var iconName = extract(attrs, 'icon');
            if (iconName) attrs.className += ' hasIcon';

            var loading = extract(attrs, 'loading');
            if (attrs.disabled || loading) {
              attrs.className += ' disabled' + (loading ? ' loading' : '');
              delete attrs.onclick;
            }

            return m(
              'button',
              attrs,
              this.getButtonContent()
            );
          }
        }, {
          key: 'getDefaultTitle',
          value: function getDefaultTitle() {
            return extractText(this.props.children);
          }
        }, {
          key: 'getButtonContent',
          value: function getButtonContent() {
            var iconName = this.props.icon;

            return [iconName && iconName !== true ? icon(iconName, { className: 'Button-icon' }) : '', this.props.children ? m(
              'span',
              { className: 'Button-label' },
              this.props.children
            ) : '', this.props.loading ? LoadingIndicator.component({ size: 'tiny', className: 'LoadingIndicator--inline' }) : ''];
          }
        }]);
        return Button;
      }(Component);

      _export('default', Button);
    }
  };
});;
'use strict';

System.register('flarum/components/ChangeEmailModal', ['flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
  var Modal, Button, ChangeEmailModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      ChangeEmailModal = function (_Modal) {
        babelHelpers.inherits(ChangeEmailModal, _Modal);

        function ChangeEmailModal() {
          babelHelpers.classCallCheck(this, ChangeEmailModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ChangeEmailModal).apply(this, arguments));
        }

        babelHelpers.createClass(ChangeEmailModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(ChangeEmailModal.prototype), 'init', this).call(this);

            /**
             * Whether or not the email has been changed successfully.
             *
             * @type {Boolean}
             */
            this.success = false;

            /**
             * The value of the email input.
             *
             * @type {function}
             */
            this.email = m.prop(app.session.user.email());

            /**
             * The value of the password input.
             *
             * @type {function}
             */
            this.password = m.prop('');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'ChangeEmailModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.change_email.title');
          }
        }, {
          key: 'content',
          value: function content() {
            if (this.success) {
              return m(
                'div',
                { className: 'Modal-body' },
                m(
                  'div',
                  { className: 'Form Form--centered' },
                  m(
                    'p',
                    { className: 'helpText' },
                    app.translator.trans('core.forum.change_email.confirmation_message', { email: m(
                        'strong',
                        null,
                        this.email()
                      ) })
                  ),
                  m(
                    'div',
                    { className: 'Form-group' },
                    m(
                      Button,
                      { className: 'Button Button--primary Button--block', onclick: this.hide.bind(this) },
                      app.translator.trans('core.forum.change_email.dismiss_button')
                    )
                  )
                )
              );
            }

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { type: 'email', name: 'email', className: 'FormControl',
                    placeholder: app.session.user.email(),
                    bidi: this.email,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { type: 'password', name: 'password', className: 'FormControl',
                    placeholder: app.translator.trans('core.forum.change_email.confirm_password_label'),
                    bidi: this.password,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.change_email.submit_button')
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            // If the user hasn't actually entered a different email address, we don't
            // need to do anything. Woot!
            if (this.email() === app.session.user.email()) {
              this.hide();
              return;
            }

            var oldEmail = app.session.user.email();

            this.loading = true;

            app.session.user.save({ email: this.email() }, {
              errorHandler: this.onerror.bind(this),
              meta: { password: this.password() }
            }).then(function () {
              return _this2.success = true;
            }).catch(function () {}).then(this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              error.alert.props.children = app.translator.trans('core.forum.change_email.incorrect_password_message');
            }

            babelHelpers.get(Object.getPrototypeOf(ChangeEmailModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return ChangeEmailModal;
      }(Modal);

      _export('default', ChangeEmailModal);
    }
  };
});;
'use strict';

System.register('flarum/components/ChangePasswordModal', ['flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
  var Modal, Button, ChangePasswordModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      ChangePasswordModal = function (_Modal) {
        babelHelpers.inherits(ChangePasswordModal, _Modal);

        function ChangePasswordModal() {
          babelHelpers.classCallCheck(this, ChangePasswordModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ChangePasswordModal).apply(this, arguments));
        }

        babelHelpers.createClass(ChangePasswordModal, [{
          key: 'className',
          value: function className() {
            return 'ChangePasswordModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.change_password.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'p',
                  { className: 'helpText' },
                  app.translator.trans('core.forum.change_password.text')
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.change_password.send_button')
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/forgot',
              data: { email: app.session.user.email() }
            }).then(this.hide.bind(this), this.loaded.bind(this));
          }
        }]);
        return ChangePasswordModal;
      }(Modal);

      _export('default', ChangePasswordModal);
    }
  };
});;
'use strict';

System.register('flarum/components/Checkbox', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/helpers/icon'], function (_export, _context) {
  var Component, LoadingIndicator, icon, Checkbox;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      Checkbox = function (_Component) {
        babelHelpers.inherits(Checkbox, _Component);

        function Checkbox() {
          babelHelpers.classCallCheck(this, Checkbox);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
        }

        babelHelpers.createClass(Checkbox, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not the checkbox's value is in the process of being saved.
             *
             * @type {Boolean}
             * @public
             */
            this.loading = false;
          }
        }, {
          key: 'view',
          value: function view() {
            var className = 'Checkbox ' + (this.props.state ? 'on' : 'off') + ' ' + (this.props.className || '');
            if (this.loading) className += ' loading';
            if (this.props.disabled) className += ' disabled';

            return m(
              'label',
              { className: className },
              m('input', { type: 'checkbox',
                checked: this.props.state,
                disabled: this.props.disabled,
                onchange: m.withAttr('checked', this.onchange.bind(this)) }),
              m(
                'div',
                { className: 'Checkbox-display' },
                this.getDisplay()
              ),
              this.props.children
            );
          }
        }, {
          key: 'getDisplay',
          value: function getDisplay() {
            return this.loading ? LoadingIndicator.component({ size: 'tiny' }) : icon(this.props.state ? 'check' : 'times');
          }
        }, {
          key: 'onchange',
          value: function onchange(checked) {
            if (this.props.onchange) this.props.onchange(checked, this);
          }
        }]);
        return Checkbox;
      }(Component);

      _export('default', Checkbox);
    }
  };
});;
'use strict';

System.register('flarum/components/CommentPost', ['flarum/components/Post', 'flarum/utils/classList', 'flarum/components/PostUser', 'flarum/components/PostMeta', 'flarum/components/PostEdited', 'flarum/components/EditPostComposer', 'flarum/components/Composer', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/Button'], function (_export, _context) {
  var Post, classList, PostUser, PostMeta, PostEdited, EditPostComposer, Composer, ItemList, listItems, Button, CommentPost;
  return {
    setters: [function (_flarumComponentsPost) {
      Post = _flarumComponentsPost.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }, function (_flarumComponentsPostUser) {
      PostUser = _flarumComponentsPostUser.default;
    }, function (_flarumComponentsPostMeta) {
      PostMeta = _flarumComponentsPostMeta.default;
    }, function (_flarumComponentsPostEdited) {
      PostEdited = _flarumComponentsPostEdited.default;
    }, function (_flarumComponentsEditPostComposer) {
      EditPostComposer = _flarumComponentsEditPostComposer.default;
    }, function (_flarumComponentsComposer) {
      Composer = _flarumComponentsComposer.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      CommentPost = function (_Post) {
        babelHelpers.inherits(CommentPost, _Post);

        function CommentPost() {
          babelHelpers.classCallCheck(this, CommentPost);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CommentPost).apply(this, arguments));
        }

        babelHelpers.createClass(CommentPost, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(CommentPost.prototype), 'init', this).call(this);

            /**
             * If the post has been hidden, then this flag determines whether or not its
             * content has been expanded.
             *
             * @type {Boolean}
             */
            this.revealContent = false;

            // Create an instance of the component that displays the post's author so
            // that we can force the post to rerender when the user card is shown.
            this.postUser = new PostUser({ post: this.props.post });
            this.subtree.check(function () {
              return _this2.postUser.cardVisible;
            }, function () {
              return _this2.isEditing();
            });
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'header',
              { className: 'Post-header' },
              m(
                'ul',
                null,
                listItems(this.headerItems().toArray())
              )
            ), m(
              'div',
              { className: 'Post-body' },
              this.isEditing() ? m('div', { className: 'Post-preview', config: this.configPreview.bind(this) }) : m.trust(this.props.post.contentHtml())
            )];
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            babelHelpers.get(Object.getPrototypeOf(CommentPost.prototype), 'config', this).apply(this, arguments);

            var contentHtml = this.isEditing() ? '' : this.props.post.contentHtml();

            // If the post content has changed since the last render, we'll run through
            // all of the <script> tags in the content and evaluate them. This is
            // necessary because TextFormatter outputs them for e.g. syntax highlighting.
            if (context.contentHtml !== contentHtml) {
              this.$('.Post-body script').each(function () {
                eval.call(window, $(this).text());
              });
            }

            context.contentHtml = contentHtml;
          }
        }, {
          key: 'isEditing',
          value: function isEditing() {
            return app.composer.component instanceof EditPostComposer && app.composer.component.props.post === this.props.post;
          }
        }, {
          key: 'attrs',
          value: function attrs() {
            var post = this.props.post;

            return {
              className: classList({
                'CommentPost': true,
                'Post--hidden': post.isHidden(),
                'Post--edited': post.isEdited(),
                'revealContent': this.revealContent,
                'editing': this.isEditing()
              })
            };
          }
        }, {
          key: 'configPreview',
          value: function configPreview(element, isInitialized, context) {
            if (isInitialized) return;

            // Every 50ms, if the composer content has changed, then update the post's
            // body with a preview.
            var preview = void 0;
            var updatePreview = function updatePreview() {
              var content = app.composer.component.content();

              if (preview === content) return;

              preview = content;

              s9e.TextFormatter.preview(preview || '', element);
            };
            updatePreview();

            var updateInterval = setInterval(updatePreview, 50);
            context.onunload = function () {
              return clearInterval(updateInterval);
            };
          }
        }, {
          key: 'toggleContent',
          value: function toggleContent() {
            this.revealContent = !this.revealContent;
          }
        }, {
          key: 'headerItems',
          value: function headerItems() {
            var items = new ItemList();
            var post = this.props.post;
            var props = { post: post };

            items.add('user', this.postUser.render(), 100);
            items.add('meta', PostMeta.component(props));

            if (post.isEdited() && !post.isHidden()) {
              items.add('edited', PostEdited.component(props));
            }

            // If the post is hidden, add a button that allows toggling the visibility
            // of the post's content.
            if (post.isHidden()) {
              items.add('toggle', Button.component({
                className: 'Button Button--default Button--more',
                icon: 'ellipsis-h',
                onclick: this.toggleContent.bind(this)
              }));
            }

            return items;
          }
        }]);
        return CommentPost;
      }(Post);

      _export('default', CommentPost);
    }
  };
});;
'use strict';

System.register('flarum/components/Composer', ['flarum/Component', 'flarum/utils/ItemList', 'flarum/components/ComposerButton', 'flarum/helpers/listItems', 'flarum/utils/classList', 'flarum/utils/computed'], function (_export, _context) {
  var Component, ItemList, ComposerButton, listItems, classList, computed, Composer;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsComposerButton) {
      ComposerButton = _flarumComponentsComposerButton.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }],
    execute: function () {
      Composer = function (_Component) {
        babelHelpers.inherits(Composer, _Component);

        function Composer() {
          babelHelpers.classCallCheck(this, Composer);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Composer).apply(this, arguments));
        }

        babelHelpers.createClass(Composer, [{
          key: 'init',
          value: function init() {
            /**
             * The composer's current position.
             *
             * @type {Composer.PositionEnum}
             */
            this.position = Composer.PositionEnum.HIDDEN;

            /**
             * The composer's intended height, which can be modified by the user
             * (by dragging the composer handle).
             *
             * @type {Integer}
             */
            this.height = null;

            /**
             * Whether or not the composer currently has focus.
             *
             * @type {Boolean}
             */
            this.active = false;

            /**
             * Computed the composer's current height, based on the intended height, and
             * the composer's current state. This will be applied to the composer's
             * content's DOM element.
             *
             * @return {Integer}
             */
            this.computedHeight = computed('height', 'position', function (height, position) {
              // If the composer is minimized, then we don't want to set a height; we'll
              // let the CSS decide how high it is. If it's fullscreen, then we need to
              // make it as high as the window.
              if (position === Composer.PositionEnum.MINIMIZED) {
                return '';
              } else if (position === Composer.PositionEnum.FULLSCREEN) {
                return $(window).height();
              }

              // Otherwise, if it's normal or hidden, then we use the intended height.
              // We don't let the composer get too small or too big, though.
              return Math.max(200, Math.min(height, $(window).height() - $('#header').outerHeight()));
            });
          }
        }, {
          key: 'view',
          value: function view() {
            var classes = {
              'normal': this.position === Composer.PositionEnum.NORMAL,
              'minimized': this.position === Composer.PositionEnum.MINIMIZED,
              'fullScreen': this.position === Composer.PositionEnum.FULLSCREEN,
              'active': this.active
            };
            classes.visible = classes.normal || classes.minimized || classes.fullScreen;

            // If the composer is minimized, tell the composer's content component that
            // it shouldn't let the user interact with it. Set up a handler so that if
            // the content IS clicked, the composer will be shown.
            if (this.component) this.component.props.disabled = classes.minimized;

            var showIfMinimized = this.position === Composer.PositionEnum.MINIMIZED ? this.show.bind(this) : undefined;

            return m(
              'div',
              { className: 'Composer ' + classList(classes) },
              m('div', { className: 'Composer-handle', config: this.configHandle.bind(this) }),
              m(
                'ul',
                { className: 'Composer-controls' },
                listItems(this.controlItems().toArray())
              ),
              m(
                'div',
                { className: 'Composer-content', onclick: showIfMinimized },
                this.component ? this.component.render() : ''
              )
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            var _this2 = this;

            var defaultHeight = void 0;

            if (!isInitialized) {
              defaultHeight = this.$().height();
            }

            if (isInitialized) return;

            // Since this component is a part of the global UI that persists between
            // routes, we will flag the DOM to be retained across route changes.
            context.retain = true;

            // Initialize the composer's intended height based on what the user has set
            // it at previously, or otherwise the composer's default height. After that,
            // we'll hide the composer.
            this.height = localStorage.getItem('composerHeight') || defaultHeight;
            this.$().hide().css('bottom', -this.height);

            // Whenever any of the inputs inside the composer are have focus, we want to
            // add a class to the composer to draw attention to it.
            this.$().on('focus blur', ':input', function (e) {
              _this2.active = e.type === 'focusin';
              m.redraw();
            });

            // When the escape key is pressed on any inputs, close the composer.
            this.$().on('keydown', ':input', 'esc', function () {
              return _this2.close();
            });

            // Don't let the user leave the page without first giving the composer's
            // component a chance to scream at the user to make sure they don't
            // unintentionally lose any contnet.
            window.onbeforeunload = function () {
              return _this2.component && _this2.component.preventExit() || undefined;
            };

            var handlers = {};

            $(window).on('resize', handlers.onresize = this.updateHeight.bind(this)).resize();

            $(document).on('mousemove', handlers.onmousemove = this.onmousemove.bind(this)).on('mouseup', handlers.onmouseup = this.onmouseup.bind(this));

            context.onunload = function () {
              $(window).off('resize', handlers.onresize);

              $(document).off('mousemove', handlers.onmousemove).off('mouseup', handlers.onmouseup);
            };
          }
        }, {
          key: 'configHandle',
          value: function configHandle(element, isInitialized) {
            if (isInitialized) return;

            var composer = this;

            $(element).css('cursor', 'row-resize').bind('dragstart mousedown', function (e) {
              return e.preventDefault();
            }).mousedown(function (e) {
              composer.mouseStart = e.clientY;
              composer.heightStart = composer.$().height();
              composer.handle = $(this);
              $('body').css('cursor', 'row-resize');
            });
          }
        }, {
          key: 'onmousemove',
          value: function onmousemove(e) {
            if (!this.handle) return;

            // Work out how much the mouse has been moved, and set the height
            // relative to the old one based on that. Then update the content's
            // height so that it fills the height of the composer, and update the
            // body's padding.
            var deltaPixels = this.mouseStart - e.clientY;
            this.height = this.heightStart + deltaPixels;
            this.updateHeight();

            // Update the body's padding-bottom so that no content on the page will ever
            // get permanently hidden behind the composer. If the user is already
            // scrolled to the bottom of the page, then we will keep them scrolled to
            // the bottom after the padding has been updated.
            var scrollTop = $(window).scrollTop();
            var anchorToBottom = scrollTop > 0 && scrollTop + $(window).height() >= $(document).height();
            this.updateBodyPadding(anchorToBottom);

            localStorage.setItem('composerHeight', this.height);
          }
        }, {
          key: 'onmouseup',
          value: function onmouseup() {
            if (!this.handle) return;

            this.handle = null;
            $('body').css('cursor', '');
          }
        }, {
          key: 'updateHeight',
          value: function updateHeight() {
            var height = this.computedHeight();
            var $flexible = this.$('.Composer-flexible');

            this.$().height(height);

            if ($flexible.length) {
              var headerHeight = $flexible.offset().top - this.$().offset().top;
              var paddingBottom = parseInt($flexible.css('padding-bottom'), 10);
              var footerHeight = this.$('.Composer-footer').outerHeight(true);

              $flexible.height(this.$().outerHeight() - headerHeight - paddingBottom - footerHeight);
            }
          }
        }, {
          key: 'updateBodyPadding',
          value: function updateBodyPadding() {
            var visible = this.position !== Composer.PositionEnum.HIDDEN && this.position !== Composer.PositionEnum.MINIMIZED && this.$().css('position') !== 'absolute';

            var paddingBottom = visible ? this.computedHeight() - parseInt($('#app').css('padding-bottom'), 10) : 0;

            $('#content').css({ paddingBottom: paddingBottom });
          }
        }, {
          key: 'isFullScreen',
          value: function isFullScreen() {
            return this.position === Composer.PositionEnum.FULLSCREEN || this.$().css('position') === 'absolute';
          }
        }, {
          key: 'preventExit',
          value: function preventExit() {
            if (this.component) {
              var preventExit = this.component.preventExit();

              if (preventExit) {
                return !confirm(preventExit);
              }
            }
          }
        }, {
          key: 'load',
          value: function load(component) {
            if (this.preventExit()) return;

            // If we load a similar component into the composer, then Mithril will be
            // able to diff the old/new contents and some DOM-related state from the
            // old composer will remain. To prevent this from happening, we clear the
            // component and force a redraw, so that the new component will be working
            // on a blank slate.
            if (this.component) {
              this.clear();
              m.redraw(true);
            }

            this.component = component;
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.component = null;
          }
        }, {
          key: 'animateToPosition',
          value: function animateToPosition(position) {
            var _this3 = this;

            // Before we redraw the composer to its new state, we need to save the
            // current height of the composer, as well as the page's scroll position, so
            // that we can smoothly transition from the old to the new state.
            var oldPosition = this.position;
            var $composer = this.$().stop(true);
            var oldHeight = $composer.outerHeight();
            var scrollTop = $(window).scrollTop();

            this.position = position;

            m.redraw(true);

            // Now that we've redrawn and the composer's DOM has been updated, we want
            // to update the composer's height. Once we've done that, we'll capture the
            // real value to use as the end point for our animation later on.
            $composer.show();
            this.updateHeight();

            var newHeight = $composer.outerHeight();

            if (oldPosition === Composer.PositionEnum.HIDDEN) {
              $composer.css({ bottom: -newHeight, height: newHeight });
            } else {
              $composer.css({ height: oldHeight });
            }

            $composer.animate({ bottom: 0, height: newHeight }, 'fast', function () {
              return _this3.component.focus();
            });

            this.updateBodyPadding();
            $(window).scrollTop(scrollTop);
          }
        }, {
          key: 'showBackdrop',
          value: function showBackdrop() {
            this.$backdrop = $('<div/>').addClass('composer-backdrop').appendTo('body');
          }
        }, {
          key: 'hideBackdrop',
          value: function hideBackdrop() {
            if (this.$backdrop) this.$backdrop.remove();
          }
        }, {
          key: 'show',
          value: function show() {
            if (this.position === Composer.PositionEnum.NORMAL || this.position === Composer.PositionEnum.FULLSCREEN) {
              return;
            }

            this.animateToPosition(Composer.PositionEnum.NORMAL);

            if (this.isFullScreen()) {
              this.$().css('top', $(window).scrollTop());
              this.showBackdrop();
            }
          }
        }, {
          key: 'hide',
          value: function hide() {
            var _this4 = this;

            var $composer = this.$();

            // Animate the composer sliding down off the bottom edge of the viewport.
            // Only when the animation is completed, update the Composer state flag and
            // other elements on the page.
            $composer.stop(true).animate({ bottom: -$composer.height() }, 'fast', function () {
              _this4.position = Composer.PositionEnum.HIDDEN;
              _this4.clear();
              m.redraw();

              $composer.hide();
              _this4.hideBackdrop();
              _this4.updateBodyPadding();
            });
          }
        }, {
          key: 'close',
          value: function close() {
            if (!this.preventExit()) {
              this.hide();
            }
          }
        }, {
          key: 'minimize',
          value: function minimize() {
            if (this.position === Composer.PositionEnum.HIDDEN) return;

            this.animateToPosition(Composer.PositionEnum.MINIMIZED);

            this.$().css('top', 'auto');
            this.hideBackdrop();
          }
        }, {
          key: 'fullScreen',
          value: function fullScreen() {
            if (this.position !== Composer.PositionEnum.HIDDEN) {
              this.position = Composer.PositionEnum.FULLSCREEN;
              m.redraw();
              this.updateHeight();
              this.component.focus();
            }
          }
        }, {
          key: 'exitFullScreen',
          value: function exitFullScreen() {
            if (this.position === Composer.PositionEnum.FULLSCREEN) {
              this.position = Composer.PositionEnum.NORMAL;
              m.redraw();
              this.updateHeight();
              this.component.focus();
            }
          }
        }, {
          key: 'controlItems',
          value: function controlItems() {
            var items = new ItemList();

            if (this.position === Composer.PositionEnum.FULLSCREEN) {
              items.add('exitFullScreen', ComposerButton.component({
                icon: 'compress',
                title: app.translator.trans('core.forum.composer.exit_full_screen_tooltip'),
                onclick: this.exitFullScreen.bind(this)
              }));
            } else {
              if (this.position !== Composer.PositionEnum.MINIMIZED) {
                items.add('minimize', ComposerButton.component({
                  icon: 'minus minimize',
                  title: app.translator.trans('core.forum.composer.minimize_tooltip'),
                  onclick: this.minimize.bind(this),
                  itemClassName: 'App-backControl'
                }));

                items.add('fullScreen', ComposerButton.component({
                  icon: 'expand',
                  title: app.translator.trans('core.forum.composer.full_screen_tooltip'),
                  onclick: this.fullScreen.bind(this)
                }));
              }

              items.add('close', ComposerButton.component({
                icon: 'times',
                title: app.translator.trans('core.forum.composer.close_tooltip'),
                onclick: this.close.bind(this)
              }));
            }

            return items;
          }
        }]);
        return Composer;
      }(Component);

      Composer.PositionEnum = {
        HIDDEN: 'hidden',
        NORMAL: 'normal',
        MINIMIZED: 'minimized',
        FULLSCREEN: 'fullScreen'
      };

      _export('default', Composer);
    }
  };
});;
'use strict';

System.register('flarum/components/ComposerBody', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/components/TextEditor', 'flarum/helpers/avatar', 'flarum/helpers/listItems', 'flarum/utils/ItemList'], function (_export, _context) {
  var Component, LoadingIndicator, TextEditor, avatar, listItems, ItemList, ComposerBody;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsTextEditor) {
      TextEditor = _flarumComponentsTextEditor.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      ComposerBody = function (_Component) {
        babelHelpers.inherits(ComposerBody, _Component);

        function ComposerBody() {
          babelHelpers.classCallCheck(this, ComposerBody);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ComposerBody).apply(this, arguments));
        }

        babelHelpers.createClass(ComposerBody, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not the component is loading.
             *
             * @type {Boolean}
             */
            this.loading = false;

            /**
             * The content of the text editor.
             *
             * @type {Function}
             */
            this.content = m.prop(this.props.originalContent);

            /**
             * The text editor component instance.
             *
             * @type {TextEditor}
             */
            this.editor = new TextEditor({
              submitLabel: this.props.submitLabel,
              placeholder: this.props.placeholder,
              onchange: this.content,
              onsubmit: this.onsubmit.bind(this),
              value: this.content()
            });
          }
        }, {
          key: 'view',
          value: function view() {
            // If the component is loading, we should disable the text editor.
            this.editor.props.disabled = this.loading;

            return m(
              'div',
              { className: 'ComposerBody ' + (this.props.className || '') },
              avatar(this.props.user, { className: 'ComposerBody-avatar' }),
              m(
                'div',
                { className: 'ComposerBody-content' },
                m(
                  'ul',
                  { className: 'ComposerBody-header' },
                  listItems(this.headerItems().toArray())
                ),
                m(
                  'div',
                  { className: 'ComposerBody-editor' },
                  this.editor.render()
                )
              ),
              LoadingIndicator.component({ className: 'ComposerBody-loading' + (this.loading ? ' active' : '') })
            );
          }
        }, {
          key: 'focus',
          value: function focus() {
            this.$(':input:enabled:visible:first').focus();
          }
        }, {
          key: 'preventExit',
          value: function preventExit() {
            var content = this.content();

            return content && content !== this.props.originalContent && this.props.confirmExit;
          }
        }, {
          key: 'headerItems',
          value: function headerItems() {
            return new ItemList();
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {}
        }, {
          key: 'loaded',
          value: function loaded() {
            this.loading = false;
            m.redraw();
          }
        }]);
        return ComposerBody;
      }(Component);

      _export('default', ComposerBody);
    }
  };
});;
'use strict';

System.register('flarum/components/ComposerButton', ['flarum/components/Button'], function (_export, _context) {
  var Button, ComposerButton;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      ComposerButton = function (_Button) {
        babelHelpers.inherits(ComposerButton, _Button);

        function ComposerButton() {
          babelHelpers.classCallCheck(this, ComposerButton);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ComposerButton).apply(this, arguments));
        }

        babelHelpers.createClass(ComposerButton, null, [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(ComposerButton), 'initProps', this).call(this, props);

            props.className = props.className || 'Button Button--icon Button--link';
          }
        }]);
        return ComposerButton;
      }(Button);

      _export('default', ComposerButton);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionComposer', ['flarum/components/ComposerBody', 'flarum/utils/extractText'], function (_export, _context) {
  var ComposerBody, extractText, DiscussionComposer;
  return {
    setters: [function (_flarumComponentsComposerBody) {
      ComposerBody = _flarumComponentsComposerBody.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      DiscussionComposer = function (_ComposerBody) {
        babelHelpers.inherits(DiscussionComposer, _ComposerBody);

        function DiscussionComposer() {
          babelHelpers.classCallCheck(this, DiscussionComposer);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionComposer).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionComposer, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(DiscussionComposer.prototype), 'init', this).call(this);

            /**
             * The value of the title input.
             *
             * @type {Function}
             */
            this.title = m.prop('');
          }
        }, {
          key: 'headerItems',
          value: function headerItems() {
            var items = babelHelpers.get(Object.getPrototypeOf(DiscussionComposer.prototype), 'headerItems', this).call(this);

            items.add('title', m(
              'h3',
              null,
              app.translator.trans('core.forum.composer_discussion.title')
            ), 100);

            items.add('discussionTitle', m(
              'h3',
              null,
              m('input', { className: 'FormControl',
                value: this.title(),
                oninput: m.withAttr('value', this.title),
                placeholder: this.props.titlePlaceholder,
                disabled: !!this.props.disabled,
                onkeydown: this.onkeydown.bind(this) })
            ));

            return items;
          }
        }, {
          key: 'onkeydown',
          value: function onkeydown(e) {
            if (e.which === 13) {
              // Return
              e.preventDefault();
              this.editor.setSelectionRange(0, 0);
            }

            m.redraw.strategy('none');
          }
        }, {
          key: 'preventExit',
          value: function preventExit() {
            return (this.title() || this.content()) && this.props.confirmExit;
          }
        }, {
          key: 'data',
          value: function data() {
            return {
              title: this.title(),
              content: this.content()
            };
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {
            this.loading = true;

            var data = this.data();

            app.store.createRecord('discussions').save(data).then(function (discussion) {
              app.composer.hide();
              app.cache.discussionList.addDiscussion(discussion);
              m.route(app.route.discussion(discussion));
            }, this.loaded.bind(this));
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(DiscussionComposer), 'initProps', this).call(this, props);

            props.placeholder = props.placeholder || extractText(app.translator.trans('core.forum.composer_discussion.body_placeholder'));
            props.submitLabel = props.submitLabel || app.translator.trans('core.forum.composer_discussion.submit_button');
            props.confirmExit = props.confirmExit || extractText(app.translator.trans('core.forum.composer_discussion.discard_confirmation'));
            props.titlePlaceholder = props.titlePlaceholder || extractText(app.translator.trans('core.forum.composer_discussion.title_placeholder'));
            props.className = 'ComposerBody--discussion';
          }
        }]);
        return DiscussionComposer;
      }(ComposerBody);

      _export('default', DiscussionComposer);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionHero', ['flarum/Component', 'flarum/utils/ItemList', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, ItemList, listItems, DiscussionHero;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      DiscussionHero = function (_Component) {
        babelHelpers.inherits(DiscussionHero, _Component);

        function DiscussionHero() {
          babelHelpers.classCallCheck(this, DiscussionHero);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionHero).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionHero, [{
          key: 'view',
          value: function view() {
            return m(
              'header',
              { className: 'Hero DiscussionHero' },
              m(
                'div',
                { className: 'container' },
                m(
                  'ul',
                  { className: 'DiscussionHero-items' },
                  listItems(this.items().toArray())
                )
              )
            );
          }
        }, {
          key: 'items',
          value: function items() {
            var items = new ItemList();
            var discussion = this.props.discussion;
            var badges = discussion.badges().toArray();

            if (badges.length) {
              items.add('badges', m(
                'ul',
                { className: 'DiscussionHero-badges badges' },
                listItems(badges)
              ), 10);
            }

            items.add('title', m(
              'h2',
              { className: 'DiscussionHero-title' },
              discussion.title()
            ));

            return items;
          }
        }]);
        return DiscussionHero;
      }(Component);

      _export('default', DiscussionHero);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionList', ['flarum/Component', 'flarum/components/DiscussionListItem', 'flarum/components/Button', 'flarum/components/LoadingIndicator', 'flarum/components/Placeholder'], function (_export, _context) {
  var Component, DiscussionListItem, Button, LoadingIndicator, Placeholder, DiscussionList;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsDiscussionListItem) {
      DiscussionListItem = _flarumComponentsDiscussionListItem.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsPlaceholder) {
      Placeholder = _flarumComponentsPlaceholder.default;
    }],
    execute: function () {
      DiscussionList = function (_Component) {
        babelHelpers.inherits(DiscussionList, _Component);

        function DiscussionList() {
          babelHelpers.classCallCheck(this, DiscussionList);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionList).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionList, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not discussion results are loading.
             *
             * @type {Boolean}
             */
            this.loading = true;

            /**
             * Whether or not there are more results that can be loaded.
             *
             * @type {Boolean}
             */
            this.moreResults = false;

            /**
             * The discussions in the discussion list.
             *
             * @type {Discussion[]}
             */
            this.discussions = [];

            this.refresh();
          }
        }, {
          key: 'view',
          value: function view() {
            var params = this.props.params;
            var loading = void 0;

            if (this.loading) {
              loading = LoadingIndicator.component();
            } else if (this.moreResults) {
              loading = Button.component({
                children: app.translator.trans('core.forum.discussion_list.load_more_button'),
                className: 'Button',
                onclick: this.loadMore.bind(this)
              });
            }

            if (this.discussions.length === 0 && !this.loading) {
              var text = app.translator.trans('core.forum.discussion_list.empty_text');
              return m(
                'div',
                { className: 'DiscussionList' },
                Placeholder.component({ text: text })
              );
            }

            return m(
              'div',
              { className: 'DiscussionList' },
              m(
                'ul',
                { className: 'DiscussionList-discussions' },
                this.discussions.map(function (discussion) {
                  return m(
                    'li',
                    { key: discussion.id(), 'data-id': discussion.id() },
                    DiscussionListItem.component({ discussion: discussion, params: params })
                  );
                })
              ),
              m(
                'div',
                { className: 'DiscussionList-loadMore' },
                loading
              )
            );
          }
        }, {
          key: 'requestParams',
          value: function requestParams() {
            var params = { include: ['startUser', 'lastUser'], filter: {} };

            params.sort = this.sortMap()[this.props.params.sort];

            if (this.props.params.q) {
              params.filter.q = this.props.params.q;

              params.include.push('relevantPosts', 'relevantPosts.discussion', 'relevantPosts.user');
            }

            return params;
          }
        }, {
          key: 'sortMap',
          value: function sortMap() {
            var map = {};

            if (this.props.params.q) {
              map.relevance = '';
            }
            map.latest = '-lastTime';
            map.top = '-commentsCount';
            map.newest = '-startTime';
            map.oldest = 'startTime';

            return map;
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            var _this2 = this;

            var clear = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            if (clear) {
              this.loading = true;
              this.discussions = [];
            }

            return this.loadResults().then(function (results) {
              _this2.discussions = [];
              _this2.parseResults(results);
            }, function () {
              _this2.loading = false;
              m.redraw();
            });
          }
        }, {
          key: 'loadResults',
          value: function loadResults(offset) {
            var preloadedDiscussions = app.preloadedDocument();

            if (preloadedDiscussions) {
              return m.deferred().resolve(preloadedDiscussions).promise;
            }

            var params = this.requestParams();
            params.page = { offset: offset };
            params.include = params.include.join(',');

            return app.store.find('discussions', params);
          }
        }, {
          key: 'loadMore',
          value: function loadMore() {
            this.loading = true;

            this.loadResults(this.discussions.length).then(this.parseResults.bind(this));
          }
        }, {
          key: 'parseResults',
          value: function parseResults(results) {
            [].push.apply(this.discussions, results);

            this.loading = false;
            this.moreResults = !!results.payload.links.next;

            m.lazyRedraw();

            return results;
          }
        }, {
          key: 'removeDiscussion',
          value: function removeDiscussion(discussion) {
            var index = this.discussions.indexOf(discussion);

            if (index !== -1) {
              this.discussions.splice(index, 1);
            }
          }
        }, {
          key: 'addDiscussion',
          value: function addDiscussion(discussion) {
            this.discussions.unshift(discussion);
          }
        }]);
        return DiscussionList;
      }(Component);

      _export('default', DiscussionList);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionListItem', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/listItems', 'flarum/helpers/highlight', 'flarum/helpers/icon', 'flarum/utils/humanTime', 'flarum/utils/ItemList', 'flarum/utils/abbreviateNumber', 'flarum/components/Dropdown', 'flarum/components/TerminalPost', 'flarum/components/PostPreview', 'flarum/utils/SubtreeRetainer', 'flarum/utils/DiscussionControls', 'flarum/utils/slidable', 'flarum/utils/extractText', 'flarum/utils/classList'], function (_export, _context) {
  var Component, avatar, listItems, highlight, icon, humanTime, ItemList, abbreviateNumber, Dropdown, TerminalPost, PostPreview, SubtreeRetainer, DiscussionControls, slidable, extractText, classList, DiscussionListItem;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumHelpersHighlight) {
      highlight = _flarumHelpersHighlight.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsHumanTime) {
      humanTime = _flarumUtilsHumanTime.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsAbbreviateNumber) {
      abbreviateNumber = _flarumUtilsAbbreviateNumber.default;
    }, function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumComponentsTerminalPost) {
      TerminalPost = _flarumComponentsTerminalPost.default;
    }, function (_flarumComponentsPostPreview) {
      PostPreview = _flarumComponentsPostPreview.default;
    }, function (_flarumUtilsSubtreeRetainer) {
      SubtreeRetainer = _flarumUtilsSubtreeRetainer.default;
    }, function (_flarumUtilsDiscussionControls) {
      DiscussionControls = _flarumUtilsDiscussionControls.default;
    }, function (_flarumUtilsSlidable) {
      slidable = _flarumUtilsSlidable.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }],
    execute: function () {
      DiscussionListItem = function (_Component) {
        babelHelpers.inherits(DiscussionListItem, _Component);

        function DiscussionListItem() {
          babelHelpers.classCallCheck(this, DiscussionListItem);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionListItem).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionListItem, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            /**
             * Set up a subtree retainer so that the discussion will not be redrawn
             * unless new data comes in.
             *
             * @type {SubtreeRetainer}
             */
            this.subtree = new SubtreeRetainer(function () {
              return _this2.props.discussion.freshness;
            }, function () {
              var time = app.session.user && app.session.user.readTime();
              return time && time.getTime();
            }, function () {
              return _this2.active();
            });
          }
        }, {
          key: 'attrs',
          value: function attrs() {
            return {
              className: classList(['DiscussionListItem', this.active() ? 'active' : '', this.props.discussion.isHidden() ? 'DiscussionListItem--hidden' : ''])
            };
          }
        }, {
          key: 'view',
          value: function view() {
            var _this3 = this;

            var retain = this.subtree.retain();

            if (retain) return retain;

            var discussion = this.props.discussion;
            var startUser = discussion.startUser();
            var isUnread = discussion.isUnread();
            var isRead = discussion.isRead();
            var showUnread = !this.showRepliesCount() && isUnread;
            var jumpTo = Math.min(discussion.lastPostNumber(), (discussion.readNumber() || 0) + 1);
            var relevantPosts = this.props.params.q ? discussion.relevantPosts() : [];
            var controls = DiscussionControls.controls(discussion, this).toArray();
            var attrs = this.attrs();

            return m(
              'div',
              attrs,
              controls.length ? Dropdown.component({
                icon: 'ellipsis-v',
                children: controls,
                className: 'DiscussionListItem-controls',
                buttonClassName: 'Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right'
              }) : '',
              m(
                'a',
                { className: 'Slidable-underneath Slidable-underneath--left Slidable-underneath--elastic' + (isUnread ? '' : ' disabled'),
                  onclick: this.markAsRead.bind(this) },
                icon('check')
              ),
              m(
                'div',
                { className: 'DiscussionListItem-content Slidable-content' + (isUnread ? ' unread' : '') + (isRead ? ' read' : '') },
                m(
                  'a',
                  { href: startUser ? app.route.user(startUser) : '#',
                    className: 'DiscussionListItem-author',
                    title: extractText(app.translator.trans('core.forum.discussion_list.started_text', { user: startUser, ago: humanTime(discussion.startTime()) })),
                    config: function config(element) {
                      $(element).tooltip({ placement: 'right' });
                      m.route.apply(this, arguments);
                    } },
                  avatar(startUser, { title: '' })
                ),
                m(
                  'ul',
                  { className: 'DiscussionListItem-badges badges' },
                  listItems(discussion.badges().toArray())
                ),
                m(
                  'a',
                  { href: app.route.discussion(discussion, jumpTo),
                    config: m.route,
                    className: 'DiscussionListItem-main' },
                  m(
                    'h3',
                    { className: 'DiscussionListItem-title' },
                    highlight(discussion.title(), this.props.params.q)
                  ),
                  m(
                    'ul',
                    { className: 'DiscussionListItem-info' },
                    listItems(this.infoItems().toArray())
                  )
                ),
                m(
                  'span',
                  { className: 'DiscussionListItem-count',
                    onclick: this.markAsRead.bind(this),
                    title: showUnread ? app.translator.trans('core.forum.discussion_list.mark_as_read_tooltip') : '' },
                  abbreviateNumber(discussion[showUnread ? 'unreadCount' : 'repliesCount']())
                ),
                relevantPosts && relevantPosts.length ? m(
                  'div',
                  { className: 'DiscussionListItem-relevantPosts' },
                  relevantPosts.map(function (post) {
                    return PostPreview.component({ post: post, highlight: _this3.props.params.q });
                  })
                ) : ''
              )
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            var _this4 = this;

            if (isInitialized) return;

            // If we're on a touch device, set up the discussion row to be slidable.
            // This allows the user to drag the row to either side of the screen to
            // reveal controls.
            if ('ontouchstart' in window) {
              (function () {
                var slidableInstance = slidable(_this4.$().addClass('Slidable'));

                _this4.$('.DiscussionListItem-controls').on('hidden.bs.dropdown', function () {
                  return slidableInstance.reset();
                });
              })();
            }
          }
        }, {
          key: 'active',
          value: function active() {
            var idParam = m.route.param('id');

            return idParam && idParam.split('-')[0] === this.props.discussion.id();
          }
        }, {
          key: 'showStartPost',
          value: function showStartPost() {
            return ['newest', 'oldest'].indexOf(this.props.params.sort) !== -1;
          }
        }, {
          key: 'showRepliesCount',
          value: function showRepliesCount() {
            return this.props.params.sort === 'replies';
          }
        }, {
          key: 'markAsRead',
          value: function markAsRead() {
            var discussion = this.props.discussion;

            if (discussion.isUnread()) {
              discussion.save({ readNumber: discussion.lastPostNumber() });
              m.redraw();
            }
          }
        }, {
          key: 'infoItems',
          value: function infoItems() {
            var items = new ItemList();

            items.add('terminalPost', TerminalPost.component({
              discussion: this.props.discussion,
              lastPost: !this.showStartPost()
            }));

            return items;
          }
        }]);
        return DiscussionListItem;
      }(Component);

      _export('default', DiscussionListItem);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionPage', ['flarum/components/Page', 'flarum/utils/ItemList', 'flarum/components/DiscussionHero', 'flarum/components/PostStream', 'flarum/components/PostStreamScrubber', 'flarum/components/LoadingIndicator', 'flarum/components/SplitDropdown', 'flarum/helpers/listItems', 'flarum/utils/DiscussionControls'], function (_export, _context) {
  var Page, ItemList, DiscussionHero, PostStream, PostStreamScrubber, LoadingIndicator, SplitDropdown, listItems, DiscussionControls, DiscussionPage;
  return {
    setters: [function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsDiscussionHero) {
      DiscussionHero = _flarumComponentsDiscussionHero.default;
    }, function (_flarumComponentsPostStream) {
      PostStream = _flarumComponentsPostStream.default;
    }, function (_flarumComponentsPostStreamScrubber) {
      PostStreamScrubber = _flarumComponentsPostStreamScrubber.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsSplitDropdown) {
      SplitDropdown = _flarumComponentsSplitDropdown.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsDiscussionControls) {
      DiscussionControls = _flarumUtilsDiscussionControls.default;
    }],
    execute: function () {
      DiscussionPage = function (_Page) {
        babelHelpers.inherits(DiscussionPage, _Page);

        function DiscussionPage() {
          babelHelpers.classCallCheck(this, DiscussionPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionPage).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(DiscussionPage.prototype), 'init', this).call(this);

            /**
             * The discussion that is being viewed.
             *
             * @type {Discussion}
             */
            this.discussion = null;

            /**
             * The number of the first post that is currently visible in the viewport.
             *
             * @type {Integer}
             */
            this.near = null;

            this.refresh();

            // If the discussion list has been loaded, then we'll enable the pane (and
            // hide it by default). Also, if we've just come from another discussion
            // page, then we don't want Mithril to redraw the whole page – if it did,
            // then the pane would which would be slow and would cause problems with
            // event handlers.
            if (app.cache.discussionList) {
              app.pane.enable();
              app.pane.hide();

              if (app.previous instanceof DiscussionPage) {
                m.redraw.strategy('diff');
              }
            }

            app.history.push('discussion');

            this.bodyClass = 'App--discussion';
          }
        }, {
          key: 'onunload',
          value: function onunload(e) {
            // If we have routed to the same discussion as we were viewing previously,
            // cancel the unloading of this controller and instead prompt the post
            // stream to jump to the new 'near' param.
            if (this.discussion) {
              var idParam = m.route.param('id');

              if (idParam && idParam.split('-')[0] === this.discussion.id()) {
                e.preventDefault();

                var near = m.route.param('near') || '1';

                if (near !== String(this.near)) {
                  this.stream.goToNumber(near);
                }

                this.near = null;
                return;
              }
            }

            // If we are indeed navigating away from this discussion, then disable the
            // discussion list pane. Also, if we're composing a reply to this
            // discussion, minimize the composer – unless it's empty, in which case
            // we'll just close it.
            app.pane.disable();

            if (app.composingReplyTo(this.discussion) && !app.composer.component.content()) {
              app.composer.hide();
            } else {
              app.composer.minimize();
            }
          }
        }, {
          key: 'view',
          value: function view() {
            var discussion = this.discussion;

            return m(
              'div',
              { className: 'DiscussionPage' },
              app.cache.discussionList ? m(
                'div',
                { className: 'DiscussionPage-list', config: this.configPane.bind(this) },
                !$('.App-navigation').is(':visible') ? app.cache.discussionList.render() : ''
              ) : '',
              m(
                'div',
                { className: 'DiscussionPage-discussion' },
                discussion ? [DiscussionHero.component({ discussion: discussion }), m(
                  'div',
                  { className: 'container' },
                  m(
                    'nav',
                    { className: 'DiscussionPage-nav' },
                    m(
                      'ul',
                      null,
                      listItems(this.sidebarItems().toArray())
                    )
                  ),
                  m(
                    'div',
                    { className: 'DiscussionPage-stream' },
                    this.stream.render()
                  )
                )] : LoadingIndicator.component({ className: 'LoadingIndicator--block' })
              )
            );
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            this.near = m.route.param('near') || 0;
            this.discussion = null;

            var preloadedDiscussion = app.preloadedDocument();
            if (preloadedDiscussion) {
              // We must wrap this in a setTimeout because if we are mounting this
              // component for the first time on page load, then any calls to m.redraw
              // will be ineffective and thus any configs (scroll code) will be run
              // before stuff is drawn to the page.
              setTimeout(this.show.bind(this, preloadedDiscussion), 0);
            } else {
              var params = this.requestParams();

              app.store.find('discussions', m.route.param('id').split('-')[0], params).then(this.show.bind(this));
            }

            m.lazyRedraw();
          }
        }, {
          key: 'requestParams',
          value: function requestParams() {
            return {
              page: { near: this.near }
            };
          }
        }, {
          key: 'show',
          value: function show(discussion) {
            this.discussion = discussion;

            app.history.push('discussion', discussion.title());
            app.setTitle(discussion.title());
            app.setTitleCount(0);

            // When the API responds with a discussion, it will also include a number of
            // posts. Some of these posts are included because they are on the first
            // page of posts we want to display (determined by the `near` parameter) –
            // others may be included because due to other relationships introduced by
            // extensions. We need to distinguish the two so we don't end up displaying
            // the wrong posts. We do so by filtering out the posts that don't have
            // the 'discussion' relationship linked, then sorting and splicing.
            var includedPosts = [];
            if (discussion.payload && discussion.payload.included) {
              includedPosts = discussion.payload.included.filter(function (record) {
                return record.type === 'posts' && record.relationships && record.relationships.discussion;
              }).map(function (record) {
                return app.store.getById('posts', record.id);
              }).sort(function (a, b) {
                return a.id() - b.id();
              }).slice(0, 20);
            }

            // Set up the post stream for this discussion, along with the first page of
            // posts we want to display. Tell the stream to scroll down and highlight
            // the specific post that was routed to.
            this.stream = new PostStream({ discussion: discussion, includedPosts: includedPosts });
            this.stream.on('positionChanged', this.positionChanged.bind(this));
            this.stream.goToNumber(m.route.param('near') || includedPosts[0] && includedPosts[0].number(), true);
          }
        }, {
          key: 'configPane',
          value: function configPane(element, isInitialized, context) {
            if (isInitialized) return;

            context.retain = true;

            var $list = $(element);

            // When the mouse enters and leaves the discussions pane, we want to show
            // and hide the pane respectively. We also create a 10px 'hot edge' on the
            // left of the screen to activate the pane.
            var pane = app.pane;
            $list.hover(pane.show.bind(pane), pane.onmouseleave.bind(pane));

            var hotEdge = function hotEdge(e) {
              if (e.pageX < 10) pane.show();
            };
            $(document).on('mousemove', hotEdge);
            context.onunload = function () {
              return $(document).off('mousemove', hotEdge);
            };

            // If the discussion we are viewing is listed in the discussion list, then
            // we will make sure it is visible in the viewport – if it is not we will
            // scroll the list down to it.
            var $discussion = $list.find('.DiscussionListItem.active');
            if ($discussion.length) {
              var listTop = $list.offset().top;
              var listBottom = listTop + $list.outerHeight();
              var discussionTop = $discussion.offset().top;
              var discussionBottom = discussionTop + $discussion.outerHeight();

              if (discussionTop < listTop || discussionBottom > listBottom) {
                $list.scrollTop($list.scrollTop() - listTop + discussionTop);
              }
            }
          }
        }, {
          key: 'sidebarItems',
          value: function sidebarItems() {
            var items = new ItemList();

            items.add('controls', SplitDropdown.component({
              children: DiscussionControls.controls(this.discussion, this).toArray(),
              icon: 'ellipsis-v',
              className: 'App-primaryControl',
              buttonClassName: 'Button--primary'
            }));

            items.add('scrubber', PostStreamScrubber.component({
              stream: this.stream,
              className: 'App-titleControl'
            }), -100);

            return items;
          }
        }, {
          key: 'positionChanged',
          value: function positionChanged(startNumber, endNumber) {
            var discussion = this.discussion;

            // Construct a URL to this discussion with the updated position, then
            // replace it into the window's history and our own history stack.
            var url = app.route.discussion(discussion, this.near = startNumber);

            m.route(url, true);
            window.history.replaceState(null, document.title, url);

            app.history.push('discussion', discussion.title());

            // If the user hasn't read past here before, then we'll update their read
            // state and redraw.
            if (app.session.user && endNumber > (discussion.readNumber() || 0)) {
              discussion.save({ readNumber: endNumber });
              m.redraw();
            }
          }
        }]);
        return DiscussionPage;
      }(Page);

      _export('default', DiscussionPage);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionRenamedNotification', ['flarum/components/Notification'], function (_export, _context) {
  var Notification, DiscussionRenamedNotification;
  return {
    setters: [function (_flarumComponentsNotification) {
      Notification = _flarumComponentsNotification.default;
    }],
    execute: function () {
      DiscussionRenamedNotification = function (_Notification) {
        babelHelpers.inherits(DiscussionRenamedNotification, _Notification);

        function DiscussionRenamedNotification() {
          babelHelpers.classCallCheck(this, DiscussionRenamedNotification);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionRenamedNotification).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionRenamedNotification, [{
          key: 'icon',
          value: function icon() {
            return 'pencil';
          }
        }, {
          key: 'href',
          value: function href() {
            var notification = this.props.notification;

            return app.route.discussion(notification.subject(), notification.content().postNumber);
          }
        }, {
          key: 'content',
          value: function content() {
            return app.translator.trans('core.forum.notifications.discussion_renamed_text', { user: this.props.notification.sender() });
          }
        }]);
        return DiscussionRenamedNotification;
      }(Notification);

      _export('default', DiscussionRenamedNotification);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionRenamedPost', ['flarum/components/Button', 'flarum/components/EventPost'], function (_export, _context) {
  var Button, EventPost, DiscussionRenamedPost;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsEventPost) {
      EventPost = _flarumComponentsEventPost.default;
    }],
    execute: function () {
      DiscussionRenamedPost = function (_EventPost) {
        babelHelpers.inherits(DiscussionRenamedPost, _EventPost);

        function DiscussionRenamedPost() {
          babelHelpers.classCallCheck(this, DiscussionRenamedPost);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionRenamedPost).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionRenamedPost, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(DiscussionRenamedPost.prototype), 'init', this).call(this);

            this.expanded = false;

            // Rerender the post content when we toggle the details.
            this.subtree.check(function () {
              return _this2.expanded;
            });
          }
        }, {
          key: 'icon',
          value: function icon() {
            return 'pencil';
          }
        }, {
          key: 'description',
          value: function description(data) {
            return [app.translator.trans('core.forum.post_stream.discussion_renamed_text', data), this.toggleButton(), this.expanded ? this.full(data) : null];
          }
        }, {
          key: 'descriptionData',
          value: function descriptionData() {
            var post = this.props.post;
            var oldTitle = post.content()[0];
            var newTitle = post.content()[1];

            return {
              'old': m(
                'strong',
                { className: 'DiscussionRenamedPost-old' },
                oldTitle
              ),
              'new': m(
                'strong',
                { className: 'DiscussionRenamedPost-new' },
                newTitle
              )
            };
          }
        }, {
          key: 'full',
          value: function full(data) {
            return [m('br', null), app.translator.trans('core.forum.post_stream.discussion_renamed_old_text', data), m('br', null), app.translator.trans('core.forum.post_stream.discussion_renamed_new_text', data)];
          }
        }, {
          key: 'toggle',
          value: function toggle() {
            this.expanded = !this.expanded;
          }
        }, {
          key: 'toggleButton',
          value: function toggleButton() {
            return Button.component({
              className: 'Button Button--default Button--more',
              icon: 'ellipsis-h',
              onclick: this.toggle.bind(this)
            });
          }
        }]);
        return DiscussionRenamedPost;
      }(EventPost);

      _export('default', DiscussionRenamedPost);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionsSearchSource', ['flarum/helpers/highlight', 'flarum/components/LinkButton'], function (_export, _context) {
  var highlight, LinkButton, DiscussionsSearchSource;
  return {
    setters: [function (_flarumHelpersHighlight) {
      highlight = _flarumHelpersHighlight.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }],
    execute: function () {
      DiscussionsSearchSource = function () {
        function DiscussionsSearchSource() {
          babelHelpers.classCallCheck(this, DiscussionsSearchSource);

          this.results = {};
        }

        babelHelpers.createClass(DiscussionsSearchSource, [{
          key: 'search',
          value: function search(query) {
            var _this = this;

            this.results[query] = [];

            var params = {
              filter: { q: query },
              page: { limit: 3 },
              include: 'relevantPosts,relevantPosts.discussion,relevantPosts.user'
            };

            return app.store.find('discussions', params).then(function (results) {
              return _this.results[query] = results;
            });
          }
        }, {
          key: 'view',
          value: function view(query) {
            var results = this.results[query] || [];

            return [m(
              'li',
              { className: 'Dropdown-header' },
              app.translator.trans('core.forum.search.discussions_heading')
            ), m(
              'li',
              null,
              LinkButton.component({
                icon: 'search',
                children: app.translator.trans('core.forum.search.all_discussions_button', { query: query }),
                href: app.route('index', { q: query })
              })
            ), results.map(function (discussion) {
              var relevantPosts = discussion.relevantPosts();
              var post = relevantPosts && relevantPosts[0];

              return m(
                'li',
                { className: 'DiscussionSearchResult', 'data-index': 'discussions' + discussion.id() },
                m(
                  'a',
                  { href: app.route.discussion(discussion, post && post.number()), config: m.route },
                  m(
                    'div',
                    { className: 'DiscussionSearchResult-title' },
                    highlight(discussion.title(), query)
                  ),
                  post ? m(
                    'div',
                    { className: 'DiscussionSearchResult-excerpt' },
                    highlight(post.contentPlain(), query, 100)
                  ) : ''
                )
              );
            })];
          }
        }]);
        return DiscussionsSearchSource;
      }();

      _export('default', DiscussionsSearchSource);
    }
  };
});;
'use strict';

System.register('flarum/components/DiscussionsUserPage', ['flarum/components/UserPage', 'flarum/components/DiscussionList'], function (_export, _context) {
  var UserPage, DiscussionList, DiscussionsUserPage;
  return {
    setters: [function (_flarumComponentsUserPage) {
      UserPage = _flarumComponentsUserPage.default;
    }, function (_flarumComponentsDiscussionList) {
      DiscussionList = _flarumComponentsDiscussionList.default;
    }],
    execute: function () {
      DiscussionsUserPage = function (_UserPage) {
        babelHelpers.inherits(DiscussionsUserPage, _UserPage);

        function DiscussionsUserPage() {
          babelHelpers.classCallCheck(this, DiscussionsUserPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(DiscussionsUserPage).apply(this, arguments));
        }

        babelHelpers.createClass(DiscussionsUserPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(DiscussionsUserPage.prototype), 'init', this).call(this);

            this.loadUser(m.route.param('username'));
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'DiscussionsUserPage' },
              DiscussionList.component({
                params: {
                  q: 'author:' + this.user.username()
                }
              })
            );
          }
        }]);
        return DiscussionsUserPage;
      }(UserPage);

      _export('default', DiscussionsUserPage);
    }
  };
});;
'use strict';

System.register('flarum/components/Dropdown', ['flarum/Component', 'flarum/helpers/icon', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, icon, listItems, Dropdown;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      Dropdown = function (_Component) {
        babelHelpers.inherits(Dropdown, _Component);

        function Dropdown() {
          babelHelpers.classCallCheck(this, Dropdown);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).apply(this, arguments));
        }

        babelHelpers.createClass(Dropdown, [{
          key: 'view',
          value: function view() {
            var items = this.props.children ? listItems(this.props.children) : [];

            return m(
              'div',
              { className: 'ButtonGroup Dropdown dropdown ' + this.props.className + ' itemCount' + items.length },
              this.getButton(),
              this.getMenu(items)
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            var _this2 = this;

            if (isInitialized) return;

            // When opening the dropdown menu, work out if the menu goes beyond the
            // bottom of the viewport. If it does, we will apply class to make it show
            // above the toggle button instead of below it.
            this.$().on('shown.bs.dropdown', function () {
              var $menu = _this2.$('.Dropdown-menu');
              var isRight = $menu.hasClass('Dropdown-menu--right');
              $menu.removeClass('Dropdown-menu--top Dropdown-menu--right');

              $menu.toggleClass('Dropdown-menu--top', $menu.offset().top + $menu.height() > $(window).scrollTop() + $(window).height());

              $menu.toggleClass('Dropdown-menu--right', isRight || $menu.offset().left + $menu.width() > $(window).scrollLeft() + $(window).width());

              if (_this2.props.onshow) {
                _this2.props.onshow();
                m.redraw();
              }
            });

            this.$().on('hidden.bs.dropdown', function () {
              if (_this2.props.onhide) {
                _this2.props.onhide();
                m.redraw();
              }
            });
          }
        }, {
          key: 'getButton',
          value: function getButton() {
            return m(
              'button',
              {
                className: 'Dropdown-toggle ' + this.props.buttonClassName,
                'data-toggle': 'dropdown',
                onclick: this.props.onclick },
              this.getButtonContent()
            );
          }
        }, {
          key: 'getButtonContent',
          value: function getButtonContent() {
            return [this.props.icon ? icon(this.props.icon, { className: 'Button-icon' }) : '', m(
              'span',
              { className: 'Button-label' },
              this.props.label
            ), this.props.caretIcon ? icon(this.props.caretIcon, { className: 'Button-caret' }) : ''];
          }
        }, {
          key: 'getMenu',
          value: function getMenu(items) {
            return m(
              'ul',
              { className: 'Dropdown-menu dropdown-menu ' + this.props.menuClassName },
              items
            );
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(Dropdown), 'initProps', this).call(this, props);

            props.className = props.className || '';
            props.buttonClassName = props.buttonClassName || '';
            props.menuClassName = props.menuClassName || '';
            props.label = props.label || '';
            props.caretIcon = typeof props.caretIcon !== 'undefined' ? props.caretIcon : 'caret-down';
          }
        }]);
        return Dropdown;
      }(Component);

      _export('default', Dropdown);
    }
  };
});;
'use strict';

System.register('flarum/components/EditPostComposer', ['flarum/components/ComposerBody', 'flarum/helpers/icon'], function (_export, _context) {
  var ComposerBody, icon, EditPostComposer;


  function minimizeComposerIfFullScreen(e) {
    if (app.composer.isFullScreen()) {
      app.composer.minimize();
      e.stopPropagation();
    }
  }

  /**
   * The `EditPostComposer` component displays the composer content for editing a
   * post. It sets the initial content to the content of the post that is being
   * edited, and adds a header control to indicate which post is being edited.
   *
   * ### Props
   *
   * - All of the props for ComposerBody
   * - `post`
   */
  return {
    setters: [function (_flarumComponentsComposerBody) {
      ComposerBody = _flarumComponentsComposerBody.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      EditPostComposer = function (_ComposerBody) {
        babelHelpers.inherits(EditPostComposer, _ComposerBody);

        function EditPostComposer() {
          babelHelpers.classCallCheck(this, EditPostComposer);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EditPostComposer).apply(this, arguments));
        }

        babelHelpers.createClass(EditPostComposer, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(EditPostComposer.prototype), 'init', this).call(this);

            this.editor.props.preview = function (e) {
              minimizeComposerIfFullScreen(e);

              m.route(app.route.post(_this2.props.post));
            };
          }
        }, {
          key: 'headerItems',
          value: function headerItems() {
            var items = babelHelpers.get(Object.getPrototypeOf(EditPostComposer.prototype), 'headerItems', this).call(this);
            var post = this.props.post;

            var routeAndMinimize = function routeAndMinimize(element, isInitialized) {
              if (isInitialized) return;
              $(element).on('click', minimizeComposerIfFullScreen);
              m.route.apply(this, arguments);
            };

            items.add('title', m(
              'h3',
              null,
              icon('pencil'),
              ' ',
              ' ',
              m(
                'a',
                { href: app.route.discussion(post.discussion(), post.number()), config: routeAndMinimize },
                app.translator.trans('core.forum.composer_edit.post_link', { number: post.number(), discussion: post.discussion().title() })
              )
            ));

            return items;
          }
        }, {
          key: 'data',
          value: function data() {
            return {
              content: this.content()
            };
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {
            this.loading = true;

            var data = this.data();

            this.props.post.save(data).then(function () {
              return app.composer.hide();
            }, this.loaded.bind(this));
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(EditPostComposer), 'initProps', this).call(this, props);

            props.submitLabel = props.submitLabel || app.translator.trans('core.forum.composer_edit.submit_button');
            props.confirmExit = props.confirmExit || app.translator.trans('core.forum.composer_edit.discard_confirmation');
            props.originalContent = props.originalContent || props.post.content();
            props.user = props.user || props.post.user();

            props.post.editedContent = props.originalContent;
          }
        }]);
        return EditPostComposer;
      }(ComposerBody);

      _export('default', EditPostComposer);
    }
  };
});;
'use strict';

System.register('flarum/components/EditUserModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/components/GroupBadge', 'flarum/models/Group', 'flarum/utils/extractText'], function (_export, _context) {
  var Modal, Button, GroupBadge, Group, extractText, EditUserModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsGroupBadge) {
      GroupBadge = _flarumComponentsGroupBadge.default;
    }, function (_flarumModelsGroup) {
      Group = _flarumModelsGroup.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      EditUserModal = function (_Modal) {
        babelHelpers.inherits(EditUserModal, _Modal);

        function EditUserModal() {
          babelHelpers.classCallCheck(this, EditUserModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EditUserModal).apply(this, arguments));
        }

        babelHelpers.createClass(EditUserModal, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(EditUserModal.prototype), 'init', this).call(this);

            var user = this.props.user;

            this.username = m.prop(user.username() || '');
            this.email = m.prop(user.email() || '');
            this.setPassword = m.prop(false);
            this.password = m.prop(user.password() || '');
            this.groups = {};

            app.store.all('groups').filter(function (group) {
              return [Group.GUEST_ID, Group.MEMBER_ID].indexOf(group.id()) === -1;
            }).forEach(function (group) {
              return _this2.groups[group.id()] = m.prop(user.groups().indexOf(group) !== -1);
            });
          }
        }, {
          key: 'className',
          value: function className() {
            return 'EditUserModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Edit User';
          }
        }, {
          key: 'content',
          value: function content() {
            var _this3 = this;

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Username'
                  ),
                  m('input', { className: 'FormControl', placeholder: extractText(app.translator.trans('core.forum.edit_user.username_label')),
                    value: this.username(),
                    onchange: m.withAttr('value', this.username) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Email'
                  ),
                  m(
                    'div',
                    null,
                    m('input', { className: 'FormControl', placeholder: extractText(app.translator.trans('core.forum.edit_user.email_label')),
                      value: this.email(),
                      onchange: m.withAttr('value', this.email) })
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Password'
                  ),
                  m(
                    'div',
                    null,
                    m(
                      'label',
                      { className: 'checkbox' },
                      m('input', { type: 'checkbox', checked: this.setPassword(), onchange: function onchange(e) {
                          _this3.setPassword(e.target.checked);
                          m.redraw(true);
                          if (e.target.checked) _this3.$('[name=password]').select();
                          m.redraw.strategy('none');
                        } }),
                      'Set new password'
                    ),
                    this.setPassword() ? m('input', { className: 'FormControl', type: 'password', name: 'password', placeholder: extractText(app.translator.trans('core.forum.edit_user.password_label')),
                      value: this.password(),
                      onchange: m.withAttr('value', this.password) }) : ''
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group EditUserModal-groups' },
                  m(
                    'label',
                    null,
                    'Groups'
                  ),
                  m(
                    'div',
                    null,
                    Object.keys(this.groups).map(function (id) {
                      return app.store.getById('groups', id);
                    }).map(function (group) {
                      return m(
                        'label',
                        { className: 'checkbox' },
                        m('input', { type: 'checkbox',
                          checked: _this3.groups[group.id()](),
                          disabled: _this3.props.user.id() === '1' && group.id() === Group.ADMINISTRATOR_ID,
                          onchange: m.withAttr('checked', _this3.groups[group.id()]) }),
                        GroupBadge.component({ group: group, label: '' }),
                        ' ',
                        group.nameSingular()
                      );
                    })
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.edit_user.submit_button')
                  })
                )
              )
            );
          }
        }, {
          key: 'data',
          value: function data() {
            var _this4 = this;

            var groups = Object.keys(this.groups).filter(function (id) {
              return _this4.groups[id]();
            }).map(function (id) {
              return app.store.getById('groups', id);
            });

            var data = {
              username: this.username(),
              email: this.email(),
              relationships: { groups: groups }
            };

            if (this.setPassword()) {
              data.password = this.password();
            }

            return data;
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this5 = this;

            e.preventDefault();

            this.loading = true;

            this.props.user.save(this.data(), { errorHandler: this.onerror.bind(this) }).then(this.hide.bind(this)).catch(function () {
              _this5.loading = false;
              m.redraw();
            });
          }
        }]);
        return EditUserModal;
      }(Modal);

      _export('default', EditUserModal);
    }
  };
});;
'use strict';

System.register('flarum/components/EventPost', ['flarum/components/Post', 'flarum/utils/string', 'flarum/helpers/username', 'flarum/helpers/icon'], function (_export, _context) {
  var Post, ucfirst, usernameHelper, icon, EventPost;
  return {
    setters: [function (_flarumComponentsPost) {
      Post = _flarumComponentsPost.default;
    }, function (_flarumUtilsString) {
      ucfirst = _flarumUtilsString.ucfirst;
    }, function (_flarumHelpersUsername) {
      usernameHelper = _flarumHelpersUsername.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      EventPost = function (_Post) {
        babelHelpers.inherits(EventPost, _Post);

        function EventPost() {
          babelHelpers.classCallCheck(this, EventPost);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EventPost).apply(this, arguments));
        }

        babelHelpers.createClass(EventPost, [{
          key: 'attrs',
          value: function attrs() {
            return {
              className: 'EventPost ' + ucfirst(this.props.post.contentType()) + 'Post'
            };
          }
        }, {
          key: 'content',
          value: function content() {
            var user = this.props.post.user();
            var username = usernameHelper(user);
            var data = babelHelpers.extends(this.descriptionData(), {
              user: user,
              username: user ? m(
                'a',
                { className: 'EventPost-user', href: app.route.user(user), config: m.route },
                username
              ) : username
            });

            return [icon(this.icon(), { className: 'EventPost-icon' }), m(
              'div',
              { 'class': 'EventPost-info' },
              this.description(data)
            )];
          }
        }, {
          key: 'icon',
          value: function icon() {
            return '';
          }
        }, {
          key: 'description',
          value: function description(data) {
            return app.translator.transChoice(this.descriptionKey(), data.count, data);
          }
        }, {
          key: 'descriptionKey',
          value: function descriptionKey() {
            return '';
          }
        }, {
          key: 'descriptionData',
          value: function descriptionData() {
            return {};
          }
        }]);
        return EventPost;
      }(Post);

      _export('default', EventPost);
    }
  };
});;
'use strict';

System.register('flarum/components/FieldSet', ['flarum/Component', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, listItems, FieldSet;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      FieldSet = function (_Component) {
        babelHelpers.inherits(FieldSet, _Component);

        function FieldSet() {
          babelHelpers.classCallCheck(this, FieldSet);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(FieldSet).apply(this, arguments));
        }

        babelHelpers.createClass(FieldSet, [{
          key: 'view',
          value: function view() {
            return m(
              'fieldset',
              { className: this.props.className },
              m(
                'legend',
                null,
                this.props.label
              ),
              m(
                'ul',
                null,
                listItems(this.props.children)
              )
            );
          }
        }]);
        return FieldSet;
      }(Component);

      _export('default', FieldSet);
    }
  };
});;
'use strict';

System.register('flarum/components/ForgotPasswordModal', ['flarum/components/Modal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/utils/extractText'], function (_export, _context) {
  var Modal, Alert, Button, extractText, ForgotPasswordModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      ForgotPasswordModal = function (_Modal) {
        babelHelpers.inherits(ForgotPasswordModal, _Modal);

        function ForgotPasswordModal() {
          babelHelpers.classCallCheck(this, ForgotPasswordModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ForgotPasswordModal).apply(this, arguments));
        }

        babelHelpers.createClass(ForgotPasswordModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(ForgotPasswordModal.prototype), 'init', this).call(this);

            /**
             * The value of the email input.
             *
             * @type {Function}
             */
            this.email = m.prop(this.props.email || '');

            /**
             * Whether or not the password reset email was sent successfully.
             *
             * @type {Boolean}
             */
            this.success = false;
          }
        }, {
          key: 'className',
          value: function className() {
            return 'ForgotPasswordModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.forgot_password.title');
          }
        }, {
          key: 'content',
          value: function content() {
            if (this.success) {
              return m(
                'div',
                { className: 'Modal-body' },
                m(
                  'div',
                  { className: 'Form Form--centered' },
                  m(
                    'p',
                    { className: 'helpText' },
                    app.translator.trans('core.forum.forgot_password.email_sent_message')
                  ),
                  m(
                    'div',
                    { className: 'Form-group' },
                    m(
                      Button,
                      { className: 'Button Button--primary Button--block', onclick: this.hide.bind(this) },
                      app.translator.trans('core.forum.forgot_password.dismiss_button')
                    )
                  )
                )
              );
            }

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'p',
                  { className: 'helpText' },
                  app.translator.trans('core.forum.forgot_password.text')
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'email', type: 'email', placeholder: extractText(app.translator.trans('core.forum.forgot_password.email_placeholder')),
                    value: this.email(),
                    onchange: m.withAttr('value', this.email),
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.forgot_password.submit_button')
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            this.loading = true;

            app.request({
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/forgot',
              data: { email: this.email() },
              errorHandler: this.onerror.bind(this)
            }).then(function () {
              _this2.success = true;
              _this2.alert = null;
            }).catch(function () {}).then(this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 404) {
              error.alert.props.children = app.translator.trans('core.forum.forgot_password.not_found_message');
            }

            babelHelpers.get(Object.getPrototypeOf(ForgotPasswordModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return ForgotPasswordModal;
      }(Modal);

      _export('default', ForgotPasswordModal);
    }
  };
});;
'use strict';

System.register('flarum/components/GroupBadge', ['flarum/components/Badge'], function (_export, _context) {
  var Badge, GroupBadge;
  return {
    setters: [function (_flarumComponentsBadge) {
      Badge = _flarumComponentsBadge.default;
    }],
    execute: function () {
      GroupBadge = function (_Badge) {
        babelHelpers.inherits(GroupBadge, _Badge);

        function GroupBadge() {
          babelHelpers.classCallCheck(this, GroupBadge);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(GroupBadge).apply(this, arguments));
        }

        babelHelpers.createClass(GroupBadge, null, [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(GroupBadge), 'initProps', this).call(this, props);

            if (props.group) {
              props.icon = props.group.icon();
              props.style = { backgroundColor: props.group.color() };
              props.label = typeof props.label === 'undefined' ? props.group.nameSingular() : props.label;
              props.type = 'group--' + props.group.id();

              delete props.group;
            }
          }
        }]);
        return GroupBadge;
      }(Badge);

      _export('default', GroupBadge);
    }
  };
});;
'use strict';

System.register('flarum/components/HeaderPrimary', ['flarum/Component', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/SelectDropdown', 'flarum/components/Button'], function (_export, _context) {
  var Component, ItemList, listItems, SelectDropdown, Button, HeaderPrimary;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumComponentsSelectDropdown) {
      SelectDropdown = _flarumComponentsSelectDropdown.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      HeaderPrimary = function (_Component) {
        babelHelpers.inherits(HeaderPrimary, _Component);

        function HeaderPrimary() {
          babelHelpers.classCallCheck(this, HeaderPrimary);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(HeaderPrimary).apply(this, arguments));
        }

        babelHelpers.createClass(HeaderPrimary, [{
          key: 'view',
          value: function view() {
            return m(
              'ul',
              { className: 'Header-controls' },
              listItems(this.items().toArray())
            );
          }
        }, {
          key: 'items',
          value: function items() {
            return new ItemList();
          }
        }]);
        return HeaderPrimary;
      }(Component);

      _export('default', HeaderPrimary);
    }
  };
});;
'use strict';

System.register('flarum/components/HeaderSecondary', ['flarum/Component', 'flarum/components/Button', 'flarum/components/LogInModal', 'flarum/components/SignUpModal', 'flarum/components/SessionDropdown', 'flarum/components/SelectDropdown', 'flarum/components/NotificationsDropdown', 'flarum/utils/ItemList', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, Button, LogInModal, SignUpModal, SessionDropdown, SelectDropdown, NotificationsDropdown, ItemList, listItems, HeaderSecondary;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsSelectDropdown) {
      SelectDropdown = _flarumComponentsSelectDropdown.default;
    }, function (_flarumComponentsNotificationsDropdown) {
      NotificationsDropdown = _flarumComponentsNotificationsDropdown.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      HeaderSecondary = function (_Component) {
        babelHelpers.inherits(HeaderSecondary, _Component);

        function HeaderSecondary() {
          babelHelpers.classCallCheck(this, HeaderSecondary);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(HeaderSecondary).apply(this, arguments));
        }

        babelHelpers.createClass(HeaderSecondary, [{
          key: 'view',
          value: function view() {
            return m(
              'ul',
              { className: 'Header-controls' },
              listItems(this.items().toArray())
            );
          }
        }, {
          key: 'items',
          value: function items() {
            var items = new ItemList();

            items.add('search', app.search.render(), 30);

            if (Object.keys(app.locales).length > 1) {
              var locales = [];

              var _loop = function _loop(locale) {
                locales.push(Button.component({
                  active: app.locale === locale,
                  children: app.locales[locale],
                  icon: app.locale === locale ? 'check' : true,
                  onclick: function onclick() {
                    if (app.session.user) {
                      app.session.user.savePreferences({ locale: locale }).then(function () {
                        return window.location.reload();
                      });
                    } else {
                      document.cookie = 'locale=' + locale + '; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
                      window.location.reload();
                    }
                  }
                }));
              };

              for (var locale in app.locales) {
                _loop(locale);
              }

              items.add('locale', SelectDropdown.component({
                children: locales,
                buttonClassName: 'Button Button--link'
              }), 20);
            }

            if (app.session.user) {
              items.add('notifications', NotificationsDropdown.component(), 10);
              items.add('session', SessionDropdown.component(), 0);
            } else {
              if (app.forum.attribute('allowSignUp')) {
                items.add('signUp', Button.component({
                  children: app.translator.trans('core.forum.header.sign_up_link'),
                  className: 'Button Button--link',
                  onclick: function onclick() {
                    return app.modal.show(new SignUpModal());
                  }
                }), 10);
              }

              items.add('logIn', Button.component({
                children: app.translator.trans('core.forum.header.log_in_link'),
                className: 'Button Button--link',
                onclick: function onclick() {
                  return app.modal.show(new LogInModal());
                }
              }), 0);
            }

            return items;
          }
        }]);
        return HeaderSecondary;
      }(Component);

      _export('default', HeaderSecondary);
    }
  };
});;
'use strict';

System.register('flarum/components/IndexPage', ['flarum/extend', 'flarum/components/Page', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/helpers/icon', 'flarum/components/DiscussionList', 'flarum/components/WelcomeHero', 'flarum/components/DiscussionComposer', 'flarum/components/LogInModal', 'flarum/components/DiscussionPage', 'flarum/components/Select', 'flarum/components/Button', 'flarum/components/LinkButton', 'flarum/components/SelectDropdown'], function (_export, _context) {
  var extend, Page, ItemList, listItems, icon, DiscussionList, WelcomeHero, DiscussionComposer, LogInModal, DiscussionPage, Select, Button, LinkButton, SelectDropdown, IndexPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumComponentsDiscussionList) {
      DiscussionList = _flarumComponentsDiscussionList.default;
    }, function (_flarumComponentsWelcomeHero) {
      WelcomeHero = _flarumComponentsWelcomeHero.default;
    }, function (_flarumComponentsDiscussionComposer) {
      DiscussionComposer = _flarumComponentsDiscussionComposer.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }, function (_flarumComponentsDiscussionPage) {
      DiscussionPage = _flarumComponentsDiscussionPage.default;
    }, function (_flarumComponentsSelect) {
      Select = _flarumComponentsSelect.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumComponentsSelectDropdown) {
      SelectDropdown = _flarumComponentsSelectDropdown.default;
    }],
    execute: function () {
      IndexPage = function (_Page) {
        babelHelpers.inherits(IndexPage, _Page);

        function IndexPage() {
          babelHelpers.classCallCheck(this, IndexPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(IndexPage).apply(this, arguments));
        }

        babelHelpers.createClass(IndexPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(IndexPage.prototype), 'init', this).call(this);

            // If the user is returning from a discussion page, then take note of which
            // discussion they have just visited. After the view is rendered, we will
            // scroll down so that this discussion is in view.
            if (app.previous instanceof DiscussionPage) {
              this.lastDiscussion = app.previous.discussion;
            }

            // If the user is coming from the discussion list, then they have either
            // just switched one of the parameters (filter, sort, search) or they
            // probably want to refresh the results. We will clear the discussion list
            // cache so that results are reloaded.
            if (app.previous instanceof IndexPage) {
              app.cache.discussionList = null;
            }

            var params = this.params();

            if (app.cache.discussionList) {
              // Compare the requested parameters (sort, search query) to the ones that
              // are currently present in the cached discussion list. If they differ, we
              // will clear the cache and set up a new discussion list component with
              // the new parameters.
              Object.keys(params).some(function (key) {
                if (app.cache.discussionList.props.params[key] !== params[key]) {
                  app.cache.discussionList = null;
                  return true;
                }
              });
            }

            if (!app.cache.discussionList) {
              app.cache.discussionList = new DiscussionList({ params: params });
            }

            app.history.push('index', icon('bars'));

            this.bodyClass = 'App--index';
          }
        }, {
          key: 'onunload',
          value: function onunload() {
            // Save the scroll position so we can restore it when we return to the
            // discussion list.
            app.cache.scrollTop = $(window).scrollTop();
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'IndexPage' },
              this.hero(),
              m(
                'div',
                { className: 'container' },
                m(
                  'nav',
                  { className: 'IndexPage-nav sideNav' },
                  m(
                    'ul',
                    null,
                    listItems(this.sidebarItems().toArray())
                  )
                ),
                m(
                  'div',
                  { className: 'IndexPage-results sideNavOffset' },
                  m(
                    'div',
                    { className: 'IndexPage-toolbar' },
                    m(
                      'ul',
                      { className: 'IndexPage-toolbar-view' },
                      listItems(this.viewItems().toArray())
                    ),
                    m(
                      'ul',
                      { className: 'IndexPage-toolbar-action' },
                      listItems(this.actionItems().toArray())
                    )
                  ),
                  app.cache.discussionList.render()
                )
              )
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            babelHelpers.get(Object.getPrototypeOf(IndexPage.prototype), 'config', this).apply(this, arguments);

            if (isInitialized) return;

            extend(context, 'onunload', function () {
              return $('#app').css('min-height', '');
            });

            app.setTitle('');
            app.setTitleCount(0);

            // Work out the difference between the height of this hero and that of the
            // previous hero. Maintain the same scroll position relative to the bottom
            // of the hero so that the sidebar doesn't jump around.
            var oldHeroHeight = app.cache.heroHeight;
            var heroHeight = app.cache.heroHeight = this.$('.Hero').outerHeight();
            var scrollTop = app.cache.scrollTop;

            $('#app').css('min-height', $(window).height() + heroHeight);

            // Scroll to the remembered position. We do this after a short delay so that
            // it happens after the browser has done its own "back button" scrolling,
            // which isn't right. https://github.com/flarum/core/issues/835
            var scroll = function scroll() {
              return $(window).scrollTop(scrollTop - oldHeroHeight + heroHeight);
            };
            scroll();
            setTimeout(scroll, 1);

            // If we've just returned from a discussion page, then the constructor will
            // have set the `lastDiscussion` property. If this is the case, we want to
            // scroll down to that discussion so that it's in view.
            if (this.lastDiscussion) {
              var $discussion = this.$('.DiscussionListItem[data-id="' + this.lastDiscussion.id() + '"]');

              if ($discussion.length) {
                var indexTop = $('#header').outerHeight();
                var indexBottom = $(window).height();
                var discussionTop = $discussion.offset().top;
                var discussionBottom = discussionTop + $discussion.outerHeight();

                if (discussionTop < scrollTop + indexTop || discussionBottom > scrollTop + indexBottom) {
                  $(window).scrollTop(discussionTop - indexTop);
                }
              }
            }
          }
        }, {
          key: 'hero',
          value: function hero() {
            return WelcomeHero.component();
          }
        }, {
          key: 'sidebarItems',
          value: function sidebarItems() {
            var items = new ItemList();
            var canStartDiscussion = app.forum.attribute('canStartDiscussion') || !app.session.user;

            items.add('newDiscussion', Button.component({
              children: app.translator.trans(canStartDiscussion ? 'core.forum.index.start_discussion_button' : 'core.forum.index.cannot_start_discussion_button'),
              icon: 'edit',
              className: 'Button Button--primary IndexPage-newDiscussion',
              itemClassName: 'App-primaryControl',
              onclick: this.newDiscussion.bind(this),
              disabled: !canStartDiscussion
            }));

            items.add('nav', SelectDropdown.component({
              children: this.navItems(this).toArray(),
              buttonClassName: 'Button',
              className: 'App-titleControl'
            }));

            return items;
          }
        }, {
          key: 'navItems',
          value: function navItems() {
            var items = new ItemList();
            var params = this.stickyParams();

            items.add('allDiscussions', LinkButton.component({
              href: app.route('index', params),
              children: app.translator.trans('core.forum.index.all_discussions_link'),
              icon: 'comments-o'
            }), 100);

            return items;
          }
        }, {
          key: 'viewItems',
          value: function viewItems() {
            var items = new ItemList();
            var sortMap = app.cache.discussionList.sortMap();

            var sortOptions = {};
            for (var i in sortMap) {
              sortOptions[i] = app.translator.trans('core.forum.index_sort.' + i + '_button');
            }

            items.add('sort', Select.component({
              options: sortOptions,
              value: this.params().sort || Object.keys(sortMap)[0],
              onchange: this.changeSort.bind(this)
            }));

            return items;
          }
        }, {
          key: 'actionItems',
          value: function actionItems() {
            var items = new ItemList();

            items.add('refresh', Button.component({
              title: app.translator.trans('core.forum.index.refresh_tooltip'),
              icon: 'refresh',
              className: 'Button Button--icon',
              onclick: function onclick() {
                return app.cache.discussionList.refresh();
              }
            }));

            if (app.session.user) {
              items.add('markAllAsRead', Button.component({
                title: app.translator.trans('core.forum.index.mark_all_as_read_tooltip'),
                icon: 'check',
                className: 'Button Button--icon',
                onclick: this.markAllAsRead.bind(this)
              }));
            }

            return items;
          }
        }, {
          key: 'searching',
          value: function searching() {
            return this.params().q;
          }
        }, {
          key: 'clearSearch',
          value: function clearSearch() {
            var params = this.params();
            delete params.q;

            m.route(app.route(this.props.routeName, params));
          }
        }, {
          key: 'changeSort',
          value: function changeSort(sort) {
            var params = this.params();

            if (sort === Object.keys(app.cache.discussionList.sortMap())[0]) {
              delete params.sort;
            } else {
              params.sort = sort;
            }

            m.route(app.route(this.props.routeName, params));
          }
        }, {
          key: 'stickyParams',
          value: function stickyParams() {
            return {
              sort: m.route.param('sort'),
              q: m.route.param('q')
            };
          }
        }, {
          key: 'params',
          value: function params() {
            var params = this.stickyParams();

            params.filter = m.route.param('filter');

            return params;
          }
        }, {
          key: 'newDiscussion',
          value: function newDiscussion() {
            var deferred = m.deferred();

            if (app.session.user) {
              this.composeNewDiscussion(deferred);
            } else {
              app.modal.show(new LogInModal({
                onlogin: this.composeNewDiscussion.bind(this, deferred)
              }));
            }

            return deferred.promise;
          }
        }, {
          key: 'composeNewDiscussion',
          value: function composeNewDiscussion(deferred) {
            var component = new DiscussionComposer({ user: app.session.user });

            app.composer.load(component);
            app.composer.show();

            deferred.resolve(component);

            return deferred.promise;
          }
        }, {
          key: 'markAllAsRead',
          value: function markAllAsRead() {
            var confirmation = confirm(app.translator.trans('core.forum.index.mark_all_as_read_confirmation'));

            if (confirmation) {
              app.session.user.save({ readTime: new Date() });
            }
          }
        }]);
        return IndexPage;
      }(Page);

      _export('default', IndexPage);
    }
  };
});;
'use strict';

System.register('flarum/components/LinkButton', ['flarum/components/Button'], function (_export, _context) {
  var Button, LinkButton;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      LinkButton = function (_Button) {
        babelHelpers.inherits(LinkButton, _Button);

        function LinkButton() {
          babelHelpers.classCallCheck(this, LinkButton);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LinkButton).apply(this, arguments));
        }

        babelHelpers.createClass(LinkButton, [{
          key: 'view',
          value: function view() {
            var vdom = babelHelpers.get(Object.getPrototypeOf(LinkButton.prototype), 'view', this).call(this);

            vdom.tag = 'a';

            return vdom;
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            props.active = this.isActive(props);
            props.config = props.config || m.route;
          }
        }, {
          key: 'isActive',
          value: function isActive(props) {
            return typeof props.active !== 'undefined' ? props.active : m.route() === props.href;
          }
        }]);
        return LinkButton;
      }(Button);

      _export('default', LinkButton);
    }
  };
});;
'use strict';

System.register('flarum/components/LoadingIndicator', ['flarum/Component'], function (_export, _context) {
  var Component, LoadingIndicator;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }],
    execute: function () {
      LoadingIndicator = function (_Component) {
        babelHelpers.inherits(LoadingIndicator, _Component);

        function LoadingIndicator() {
          babelHelpers.classCallCheck(this, LoadingIndicator);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LoadingIndicator).apply(this, arguments));
        }

        babelHelpers.createClass(LoadingIndicator, [{
          key: 'view',
          value: function view() {
            var attrs = babelHelpers.extends({}, this.props);

            attrs.className = 'LoadingIndicator ' + (attrs.className || '');
            delete attrs.size;

            return m(
              'div',
              attrs,
              m.trust('&nbsp;')
            );
          }
        }, {
          key: 'config',
          value: function config() {
            var size = this.props.size || 'small';

            $.fn.spin.presets[size].zIndex = 'auto';
            this.$().spin(size);
          }
        }]);
        return LoadingIndicator;
      }(Component);

      _export('default', LoadingIndicator);
    }
  };
});;
'use strict';

System.register('flarum/components/LoadingPost', ['flarum/Component', 'flarum/helpers/avatar'], function (_export, _context) {
  var Component, avatar, LoadingPost;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }],
    execute: function () {
      LoadingPost = function (_Component) {
        babelHelpers.inherits(LoadingPost, _Component);

        function LoadingPost() {
          babelHelpers.classCallCheck(this, LoadingPost);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LoadingPost).apply(this, arguments));
        }

        babelHelpers.createClass(LoadingPost, [{
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'Post CommentPost LoadingPost' },
              m(
                'header',
                { className: 'Post-header' },
                avatar(null, { className: 'PostUser-avatar' }),
                m('div', { className: 'fakeText' })
              ),
              m(
                'div',
                { className: 'Post-body' },
                m('div', { className: 'fakeText' }),
                m('div', { className: 'fakeText' }),
                m('div', { className: 'fakeText' })
              )
            );
          }
        }]);
        return LoadingPost;
      }(Component);

      _export('default', LoadingPost);
    }
  };
});;
'use strict';

System.register('flarum/components/LogInButton', ['flarum/components/Button'], function (_export, _context) {
  var Button, LogInButton;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      LogInButton = function (_Button) {
        babelHelpers.inherits(LogInButton, _Button);

        function LogInButton() {
          babelHelpers.classCallCheck(this, LogInButton);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LogInButton).apply(this, arguments));
        }

        babelHelpers.createClass(LogInButton, null, [{
          key: 'initProps',
          value: function initProps(props) {
            props.className = (props.className || '') + ' LogInButton';

            props.onclick = function () {
              var width = 600;
              var height = 400;
              var $window = $(window);

              window.open(app.forum.attribute('baseUrl') + props.path, 'logInPopup', 'width=' + width + ',' + ('height=' + height + ',') + ('top=' + ($window.height() / 2 - height / 2) + ',') + ('left=' + ($window.width() / 2 - width / 2) + ',') + 'status=no,scrollbars=no,resizable=no');
            };

            babelHelpers.get(Object.getPrototypeOf(LogInButton), 'initProps', this).call(this, props);
          }
        }]);
        return LogInButton;
      }(Button);

      _export('default', LogInButton);
    }
  };
});;
'use strict';

System.register('flarum/components/LogInButtons', ['flarum/Component', 'flarum/utils/ItemList'], function (_export, _context) {
  var Component, ItemList, LogInButtons;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      LogInButtons = function (_Component) {
        babelHelpers.inherits(LogInButtons, _Component);

        function LogInButtons() {
          babelHelpers.classCallCheck(this, LogInButtons);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LogInButtons).apply(this, arguments));
        }

        babelHelpers.createClass(LogInButtons, [{
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'LogInButtons' },
              this.items().toArray()
            );
          }
        }, {
          key: 'items',
          value: function items() {
            return new ItemList();
          }
        }]);
        return LogInButtons;
      }(Component);

      _export('default', LogInButtons);
    }
  };
});;
'use strict';

System.register('flarum/components/LogInModal', ['flarum/components/Modal', 'flarum/components/ForgotPasswordModal', 'flarum/components/SignUpModal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
  var Modal, ForgotPasswordModal, SignUpModal, Alert, Button, LogInButtons, extractText, LogInModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default;
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      LogInModal = function (_Modal) {
        babelHelpers.inherits(LogInModal, _Modal);

        function LogInModal() {
          babelHelpers.classCallCheck(this, LogInModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LogInModal).apply(this, arguments));
        }

        babelHelpers.createClass(LogInModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(LogInModal.prototype), 'init', this).call(this);

            /**
             * The value of the email input.
             *
             * @type {Function}
             */
            this.email = m.prop(this.props.email || '');

            /**
             * The value of the password input.
             *
             * @type {Function}
             */
            this.password = m.prop(this.props.password || '');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'LogInModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.log_in.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(LogInButtons, null),
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'email', type: 'text', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                    bidi: this.email,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                    bidi: this.password,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.log_in.submit_button')
                  })
                )
              )
            ), m(
              'div',
              { className: 'Modal-footer' },
              m(
                'p',
                { className: 'LogInModal-forgotPassword' },
                m(
                  'a',
                  { onclick: this.forgotPassword.bind(this) },
                  app.translator.trans('core.forum.log_in.forgot_password_link')
                )
              ),
              app.forum.attribute('allowSignUp') ? m(
                'p',
                { className: 'LogInModal-signUp' },
                app.translator.trans('core.forum.log_in.sign_up_text', { a: m('a', { onclick: this.signUp.bind(this) }) })
              ) : ''
            )];
          }
        }, {
          key: 'forgotPassword',
          value: function forgotPassword() {
            var email = this.email();
            var props = email.indexOf('@') !== -1 ? { email: email } : undefined;

            app.modal.show(new ForgotPasswordModal(props));
          }
        }, {
          key: 'signUp',
          value: function signUp() {
            var props = { password: this.password() };
            var email = this.email();
            props[email.indexOf('@') !== -1 ? 'email' : 'username'] = email;

            app.modal.show(new SignUpModal(props));
          }
        }, {
          key: 'onready',
          value: function onready() {
            this.$('[name=' + (this.email() ? 'password' : 'email') + ']').select();
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            var email = this.email();
            var password = this.password();

            app.session.login(email, password, { errorHandler: this.onerror.bind(this) }).then(function () {
              return window.location.reload();
            }, this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
            }

            babelHelpers.get(Object.getPrototypeOf(LogInModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return LogInModal;
      }(Modal);

      _export('default', LogInModal);
    }
  };
});;
'use strict';

System.register('flarum/components/Modal', ['flarum/Component', 'flarum/components/Alert', 'flarum/components/Button'], function (_export, _context) {
  var Component, Alert, Button, Modal;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      Modal = function (_Component) {
        babelHelpers.inherits(Modal, _Component);

        function Modal() {
          babelHelpers.classCallCheck(this, Modal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Modal).apply(this, arguments));
        }

        babelHelpers.createClass(Modal, [{
          key: 'init',
          value: function init() {
            /**
             * An alert component to show below the header.
             *
             * @type {Alert}
             */
            this.alert = null;
          }
        }, {
          key: 'view',
          value: function view() {
            if (this.alert) {
              this.alert.props.dismissible = false;
            }

            return m(
              'div',
              { className: 'Modal modal-dialog ' + this.className() },
              m(
                'div',
                { className: 'Modal-content' },
                this.isDismissible() ? m(
                  'div',
                  { className: 'Modal-close App-backControl' },
                  Button.component({
                    icon: 'times',
                    onclick: this.hide.bind(this),
                    className: 'Button Button--icon Button--link'
                  })
                ) : '',
                m(
                  'form',
                  { onsubmit: this.onsubmit.bind(this) },
                  m(
                    'div',
                    { className: 'Modal-header' },
                    m(
                      'h3',
                      { className: 'App-titleControl App-titleControl--text' },
                      this.title()
                    )
                  ),
                  alert ? m(
                    'div',
                    { className: 'Modal-alert' },
                    this.alert
                  ) : '',
                  this.content()
                )
              )
            );
          }
        }, {
          key: 'isDismissible',
          value: function isDismissible() {
            return true;
          }
        }, {
          key: 'className',
          value: function className() {}
        }, {
          key: 'title',
          value: function title() {}
        }, {
          key: 'content',
          value: function content() {}
        }, {
          key: 'onsubmit',
          value: function onsubmit() {}
        }, {
          key: 'onready',
          value: function onready() {
            this.$('form').find('input, select, textarea').first().focus().select();
          }
        }, {
          key: 'onhide',
          value: function onhide() {}
        }, {
          key: 'hide',
          value: function hide() {
            app.modal.close();
          }
        }, {
          key: 'loaded',
          value: function loaded() {
            this.loading = false;
            m.redraw();
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            this.alert = error.alert;

            m.redraw();

            if (error.status === 422 && error.response.errors) {
              this.$('form [name=' + error.response.errors[0].source.pointer.replace('/data/attributes/', '') + ']').select();
            } else {
              this.onready();
            }
          }
        }]);
        return Modal;
      }(Component);

      _export('default', Modal);
    }
  };
});;
'use strict';

System.register('flarum/components/ModalManager', ['flarum/Component', 'flarum/components/Modal'], function (_export, _context) {
  var Component, Modal, ModalManager;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }],
    execute: function () {
      ModalManager = function (_Component) {
        babelHelpers.inherits(ModalManager, _Component);

        function ModalManager() {
          babelHelpers.classCallCheck(this, ModalManager);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ModalManager).apply(this, arguments));
        }

        babelHelpers.createClass(ModalManager, [{
          key: 'init',
          value: function init() {
            this.showing = false;
            this.component = null;
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'ModalManager modal fade' },
              this.component && this.component.render()
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            if (isInitialized) return;

            context.retain = true;

            this.$().on('hidden.bs.modal', this.clear.bind(this)).on('shown.bs.modal', this.onready.bind(this));
          }
        }, {
          key: 'show',
          value: function show(component) {
            if (!(component instanceof Modal)) {
              throw new Error('The ModalManager component can only show Modal components');
            }

            clearTimeout(this.hideTimeout);

            this.showing = true;
            this.component = component;

            app.current.retain = true;

            m.redraw(true);

            this.$().modal({ backdrop: this.component.isDismissible() ? true : 'static' }).modal('show');
            this.onready();
          }
        }, {
          key: 'close',
          value: function close() {
            var _this2 = this;

            if (!this.showing) return;

            // Don't hide the modal immediately, because if the consumer happens to call
            // the `show` method straight after to show another modal dialog, it will
            // cause Bootstrap's modal JS to misbehave. Instead we will wait for a tiny
            // bit to give the `show` method the opportunity to prevent this from going
            // ahead.
            this.hideTimeout = setTimeout(function () {
              _this2.$().modal('hide');
              _this2.showing = false;
            });
          }
        }, {
          key: 'clear',
          value: function clear() {
            if (this.component) {
              this.component.onhide();
            }

            this.component = null;

            app.current.retain = false;

            m.lazyRedraw();
          }
        }, {
          key: 'onready',
          value: function onready() {
            if (this.component && this.component.onready) {
              this.component.onready(this.$());
            }
          }
        }]);
        return ModalManager;
      }(Component);

      _export('default', ModalManager);
    }
  };
});;
'use strict';

System.register('flarum/components/Navigation', ['flarum/Component', 'flarum/components/Button', 'flarum/components/LinkButton'], function (_export, _context) {
  var Component, Button, LinkButton, Navigation;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }],
    execute: function () {
      Navigation = function (_Component) {
        babelHelpers.inherits(Navigation, _Component);

        function Navigation() {
          babelHelpers.classCallCheck(this, Navigation);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).apply(this, arguments));
        }

        babelHelpers.createClass(Navigation, [{
          key: 'view',
          value: function view() {
            var _app = app;
            var history = _app.history;
            var pane = _app.pane;


            return m(
              'div',
              { className: 'Navigation ButtonGroup ' + (this.props.className || ''),
                onmouseenter: pane && pane.show.bind(pane),
                onmouseleave: pane && pane.onmouseleave.bind(pane) },
              history.canGoBack() ? [this.getBackButton(), this.getPaneButton()] : this.getDrawerButton()
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            // Since this component is 'above' the content of the page (that is, it is a
            // part of the global UI that persists between routes), we will flag the DOM
            // to be retained across route changes.
            context.retain = true;
          }
        }, {
          key: 'getBackButton',
          value: function getBackButton() {
            var _app2 = app;
            var history = _app2.history;

            var previous = history.getPrevious() || {};

            return LinkButton.component({
              className: 'Button Navigation-back ' + (previous.title ? '' : 'Button--icon'),
              href: history.backUrl(),
              icon: 'chevron-left',
              children: previous.title,
              config: function config() {},
              onclick: function onclick(e) {
                if (e.shiftKey || e.ctrlKey || e.metaKey || e.which === 2) return;
                e.preventDefault();
                history.back();
              }
            });
          }
        }, {
          key: 'getPaneButton',
          value: function getPaneButton() {
            var _app3 = app;
            var pane = _app3.pane;


            if (!pane || !pane.active) return '';

            return Button.component({
              className: 'Button Button--icon Navigation-pin' + (pane.pinned ? ' active' : ''),
              onclick: pane.togglePinned.bind(pane),
              icon: 'thumb-tack'
            });
          }
        }, {
          key: 'getDrawerButton',
          value: function getDrawerButton() {
            if (!this.props.drawer) return '';

            var _app4 = app;
            var drawer = _app4.drawer;

            var user = app.session.user;

            return Button.component({
              className: 'Button Button--icon Navigation-drawer' + (user && user.newNotificationsCount() ? ' new' : ''),
              onclick: function onclick(e) {
                e.stopPropagation();
                drawer.show();
              },
              icon: 'reorder'
            });
          }
        }]);
        return Navigation;
      }(Component);

      _export('default', Navigation);
    }
  };
});;
'use strict';

System.register('flarum/components/Notification', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/icon', 'flarum/helpers/humanTime'], function (_export, _context) {
  var Component, avatar, icon, humanTime, Notification;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumHelpersHumanTime) {
      humanTime = _flarumHelpersHumanTime.default;
    }],
    execute: function () {
      Notification = function (_Component) {
        babelHelpers.inherits(Notification, _Component);

        function Notification() {
          babelHelpers.classCallCheck(this, Notification);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Notification).apply(this, arguments));
        }

        babelHelpers.createClass(Notification, [{
          key: 'view',
          value: function view() {
            var notification = this.props.notification;
            var href = this.href();

            return m(
              'a',
              { className: 'Notification Notification--' + notification.contentType() + ' ' + (!notification.isRead() ? 'unread' : ''),
                href: href,
                config: function config(element, isInitialized) {
                  if (href.indexOf('://') === -1) m.route.apply(this, arguments);

                  if (!isInitialized) $(element).click(this.markAsRead.bind(this));
                } },
              avatar(notification.sender()),
              icon(this.icon(), { className: 'Notification-icon' }),
              m(
                'span',
                { className: 'Notification-content' },
                this.content()
              ),
              humanTime(notification.time()),
              m(
                'div',
                { className: 'Notification-excerpt' },
                this.excerpt()
              )
            );
          }
        }, {
          key: 'icon',
          value: function icon() {}
        }, {
          key: 'href',
          value: function href() {}
        }, {
          key: 'content',
          value: function content() {}
        }, {
          key: 'excerpt',
          value: function excerpt() {}
        }, {
          key: 'markAsRead',
          value: function markAsRead() {
            if (this.props.notification.isRead()) return;

            app.session.user.pushAttributes({ unreadNotificationsCount: app.session.user.unreadNotificationsCount() - 1 });

            this.props.notification.save({ isRead: true });
          }
        }]);
        return Notification;
      }(Component);

      _export('default', Notification);
    }
  };
});;
'use strict';

System.register('flarum/components/NotificationGrid', ['flarum/Component', 'flarum/components/Checkbox', 'flarum/helpers/icon', 'flarum/utils/ItemList'], function (_export, _context) {
  var Component, Checkbox, icon, ItemList, NotificationGrid;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsCheckbox) {
      Checkbox = _flarumComponentsCheckbox.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      NotificationGrid = function (_Component) {
        babelHelpers.inherits(NotificationGrid, _Component);

        function NotificationGrid() {
          babelHelpers.classCallCheck(this, NotificationGrid);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NotificationGrid).apply(this, arguments));
        }

        babelHelpers.createClass(NotificationGrid, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            /**
             * Information about the available notification methods.
             *
             * @type {Array}
             */
            this.methods = [{ name: 'alert', icon: 'bell', label: app.translator.trans('core.forum.settings.notify_by_web_heading') }, { name: 'email', icon: 'envelope-o', label: app.translator.trans('core.forum.settings.notify_by_email_heading') }];

            /**
             * A map of notification type-method combinations to the checkbox instances
             * that represent them.
             *
             * @type {Object}
             */
            this.inputs = {};

            /**
             * Information about the available notification types.
             *
             * @type {Object}
             */
            this.types = this.notificationTypes().toArray();

            // For each of the notification type-method combinations, create and store a
            // new checkbox component instance, which we will render in the view.
            this.types.forEach(function (type) {
              _this2.methods.forEach(function (method) {
                var key = _this2.preferenceKey(type.name, method.name);
                var preference = _this2.props.user.preferences()[key];

                _this2.inputs[key] = new Checkbox({
                  state: !!preference,
                  disabled: typeof preference === 'undefined',
                  onchange: function onchange() {
                    return _this2.toggle([key]);
                  }
                });
              });
            });
          }
        }, {
          key: 'view',
          value: function view() {
            var _this3 = this;

            return m(
              'table',
              { className: 'NotificationGrid' },
              m(
                'thead',
                null,
                m(
                  'tr',
                  null,
                  m('td', null),
                  this.methods.map(function (method) {
                    return m(
                      'th',
                      { className: 'NotificationGrid-groupToggle', onclick: _this3.toggleMethod.bind(_this3, method.name) },
                      icon(method.icon),
                      ' ',
                      method.label
                    );
                  })
                )
              ),
              m(
                'tbody',
                null,
                this.types.map(function (type) {
                  return m(
                    'tr',
                    null,
                    m(
                      'td',
                      { className: 'NotificationGrid-groupToggle', onclick: _this3.toggleType.bind(_this3, type.name) },
                      icon(type.icon),
                      ' ',
                      type.label
                    ),
                    _this3.methods.map(function (method) {
                      return m(
                        'td',
                        { className: 'NotificationGrid-checkbox' },
                        _this3.inputs[_this3.preferenceKey(type.name, method.name)].render()
                      );
                    })
                  );
                })
              )
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            if (isInitialized) return;

            this.$('thead .NotificationGrid-groupToggle').bind('mouseenter mouseleave', function (e) {
              var i = parseInt($(this).index(), 10) + 1;
              $(this).parents('table').find('td:nth-child(' + i + ')').toggleClass('highlighted', e.type === 'mouseenter');
            });

            this.$('tbody .NotificationGrid-groupToggle').bind('mouseenter mouseleave', function (e) {
              $(this).parent().find('td').toggleClass('highlighted', e.type === 'mouseenter');
            });
          }
        }, {
          key: 'toggle',
          value: function toggle(keys) {
            var _this4 = this;

            var user = this.props.user;
            var preferences = user.preferences();
            var enabled = !preferences[keys[0]];

            keys.forEach(function (key) {
              var control = _this4.inputs[key];

              control.loading = true;
              preferences[key] = control.props.state = enabled;
            });

            m.redraw();

            user.save({ preferences: preferences }).then(function () {
              keys.forEach(function (key) {
                return _this4.inputs[key].loading = false;
              });

              m.redraw();
            });
          }
        }, {
          key: 'toggleMethod',
          value: function toggleMethod(method) {
            var _this5 = this;

            var keys = this.types.map(function (type) {
              return _this5.preferenceKey(type.name, method);
            }).filter(function (key) {
              return !_this5.inputs[key].props.disabled;
            });

            this.toggle(keys);
          }
        }, {
          key: 'toggleType',
          value: function toggleType(type) {
            var _this6 = this;

            var keys = this.methods.map(function (method) {
              return _this6.preferenceKey(type, method.name);
            }).filter(function (key) {
              return !_this6.inputs[key].props.disabled;
            });

            this.toggle(keys);
          }
        }, {
          key: 'preferenceKey',
          value: function preferenceKey(type, method) {
            return 'notify_' + type + '_' + method;
          }
        }, {
          key: 'notificationTypes',
          value: function notificationTypes() {
            var items = new ItemList();

            items.add('discussionRenamed', {
              name: 'discussionRenamed',
              icon: 'pencil',
              label: app.translator.trans('core.forum.settings.notify_discussion_renamed_label')
            });

            return items;
          }
        }]);
        return NotificationGrid;
      }(Component);

      _export('default', NotificationGrid);
    }
  };
});;
'use strict';

System.register('flarum/components/NotificationList', ['flarum/Component', 'flarum/helpers/listItems', 'flarum/components/Button', 'flarum/components/LoadingIndicator', 'flarum/models/Discussion'], function (_export, _context) {
  var Component, listItems, Button, LoadingIndicator, Discussion, NotificationList;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumModelsDiscussion) {
      Discussion = _flarumModelsDiscussion.default;
    }],
    execute: function () {
      NotificationList = function (_Component) {
        babelHelpers.inherits(NotificationList, _Component);

        function NotificationList() {
          babelHelpers.classCallCheck(this, NotificationList);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NotificationList).apply(this, arguments));
        }

        babelHelpers.createClass(NotificationList, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not the notifications are loading.
             *
             * @type {Boolean}
             */
            this.loading = false;
          }
        }, {
          key: 'view',
          value: function view() {
            var groups = [];

            if (app.cache.notifications) {
              (function () {
                var discussions = {};

                // Build an array of discussions which the notifications are related to,
                // and add the notifications as children.
                app.cache.notifications.forEach(function (notification) {
                  var subject = notification.subject();

                  if (typeof subject === 'undefined') return;

                  // Get the discussion that this notification is related to. If it's not
                  // directly related to a discussion, it may be related to a post or
                  // other entity which is related to a discussion.
                  var discussion = false;
                  if (subject instanceof Discussion) discussion = subject;else if (subject && subject.discussion) discussion = subject.discussion();

                  // If the notification is not related to a discussion directly or
                  // indirectly, then we will assign it to a neutral group.
                  var key = discussion ? discussion.id() : 0;
                  discussions[key] = discussions[key] || { discussion: discussion, notifications: [] };
                  discussions[key].notifications.push(notification);

                  if (groups.indexOf(discussions[key]) === -1) {
                    groups.push(discussions[key]);
                  }
                });
              })();
            }

            return m(
              'div',
              { className: 'NotificationList' },
              m(
                'div',
                { className: 'NotificationList-header' },
                m(
                  'div',
                  { className: 'App-primaryControl' },
                  Button.component({
                    className: 'Button Button--icon Button--link',
                    icon: 'check',
                    title: app.translator.trans('core.forum.notifications.mark_all_as_read_tooltip'),
                    onclick: this.markAllAsRead.bind(this)
                  })
                ),
                m(
                  'h4',
                  { className: 'App-titleControl App-titleControl--text' },
                  app.translator.trans('core.forum.notifications.title')
                )
              ),
              m(
                'div',
                { className: 'NotificationList-content' },
                groups.length ? groups.map(function (group) {
                  var badges = group.discussion && group.discussion.badges().toArray();

                  return m(
                    'div',
                    { className: 'NotificationGroup' },
                    group.discussion ? m(
                      'a',
                      { className: 'NotificationGroup-header',
                        href: app.route.discussion(group.discussion),
                        config: m.route },
                      badges && badges.length ? m(
                        'ul',
                        { className: 'NotificationGroup-badges badges' },
                        listItems(badges)
                      ) : '',
                      group.discussion.title()
                    ) : m(
                      'div',
                      { className: 'NotificationGroup-header' },
                      app.forum.attribute('title')
                    ),
                    m(
                      'ul',
                      { className: 'NotificationGroup-content' },
                      group.notifications.map(function (notification) {
                        var NotificationComponent = app.notificationComponents[notification.contentType()];
                        return NotificationComponent ? m(
                          'li',
                          null,
                          NotificationComponent.component({ notification: notification })
                        ) : '';
                      })
                    )
                  );
                }) : !this.loading ? m(
                  'div',
                  { className: 'NotificationList-empty' },
                  app.translator.trans('core.forum.notifications.empty_text')
                ) : LoadingIndicator.component({ className: 'LoadingIndicator--block' })
              )
            );
          }
        }, {
          key: 'load',
          value: function load() {
            var _this2 = this;

            if (app.cache.notifications && !app.session.user.newNotificationsCount()) {
              return;
            }

            this.loading = true;
            m.redraw();

            app.store.find('notifications').then(function (notifications) {
              app.session.user.pushAttributes({ newNotificationsCount: 0 });
              app.cache.notifications = notifications.sort(function (a, b) {
                return b.time() - a.time();
              });
            }).catch(function () {}).then(function () {
              _this2.loading = false;
              m.redraw();
            });
          }
        }, {
          key: 'markAllAsRead',
          value: function markAllAsRead() {
            if (!app.cache.notifications) return;

            app.session.user.pushAttributes({ unreadNotificationsCount: 0 });

            app.cache.notifications.forEach(function (notification) {
              return notification.pushAttributes({ isRead: true });
            });

            app.request({
              url: app.forum.attribute('apiUrl') + '/notifications/read',
              method: 'POST'
            });
          }
        }]);
        return NotificationList;
      }(Component);

      _export('default', NotificationList);
    }
  };
});;
'use strict';

System.register('flarum/components/NotificationsDropdown', ['flarum/components/Dropdown', 'flarum/helpers/icon', 'flarum/components/NotificationList'], function (_export, _context) {
  var Dropdown, icon, NotificationList, NotificationsDropdown;
  return {
    setters: [function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumComponentsNotificationList) {
      NotificationList = _flarumComponentsNotificationList.default;
    }],
    execute: function () {
      NotificationsDropdown = function (_Dropdown) {
        babelHelpers.inherits(NotificationsDropdown, _Dropdown);

        function NotificationsDropdown() {
          babelHelpers.classCallCheck(this, NotificationsDropdown);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NotificationsDropdown).apply(this, arguments));
        }

        babelHelpers.createClass(NotificationsDropdown, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(NotificationsDropdown.prototype), 'init', this).call(this);

            /**
             * Whether or not the notifications dropdown is visible.
             *
             * @type {Boolean}
             */
            this.showing = false;

            this.list = new NotificationList();
          }
        }, {
          key: 'getButton',
          value: function getButton() {
            var newNotifications = this.getNewCount();
            var vdom = babelHelpers.get(Object.getPrototypeOf(NotificationsDropdown.prototype), 'getButton', this).call(this);

            vdom.attrs.title = this.props.label;

            vdom.attrs.className += newNotifications ? ' new' : '';
            vdom.attrs.onclick = this.onclick.bind(this);

            return vdom;
          }
        }, {
          key: 'getButtonContent',
          value: function getButtonContent() {
            var unread = this.getUnreadCount();

            return [icon(this.props.icon, { className: 'Button-icon' }), unread ? m(
              'span',
              { className: 'NotificationsDropdown-unread' },
              unread
            ) : '', m(
              'span',
              { className: 'Button-label' },
              this.props.label
            )];
          }
        }, {
          key: 'getMenu',
          value: function getMenu() {
            return m(
              'div',
              { className: 'Dropdown-menu ' + this.props.menuClassName, onclick: this.menuClick.bind(this) },
              this.showing ? this.list.render() : ''
            );
          }
        }, {
          key: 'onclick',
          value: function onclick() {
            if (app.drawer.isOpen()) {
              this.goToRoute();
            } else {
              this.showing = true;
              this.list.load();
            }
          }
        }, {
          key: 'goToRoute',
          value: function goToRoute() {
            m.route(app.route('notifications'));
          }
        }, {
          key: 'getUnreadCount',
          value: function getUnreadCount() {
            return app.session.user.unreadNotificationsCount();
          }
        }, {
          key: 'getNewCount',
          value: function getNewCount() {
            return app.session.user.newNotificationsCount();
          }
        }, {
          key: 'menuClick',
          value: function menuClick(e) {
            // Don't close the notifications dropdown if the user is opening a link in a
            // new tab or window.
            if (e.shiftKey || e.metaKey || e.ctrlKey || e.which === 2) e.stopPropagation();
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            props.className = props.className || 'NotificationsDropdown';
            props.buttonClassName = props.buttonClassName || 'Button Button--flat';
            props.menuClassName = props.menuClassName || 'Dropdown-menu--right';
            props.label = props.label || app.translator.trans('core.forum.notifications.tooltip');
            props.icon = props.icon || 'bell';

            babelHelpers.get(Object.getPrototypeOf(NotificationsDropdown), 'initProps', this).call(this, props);
          }
        }]);
        return NotificationsDropdown;
      }(Dropdown);

      _export('default', NotificationsDropdown);
    }
  };
});;
'use strict';

System.register('flarum/components/NotificationsPage', ['flarum/components/Page', 'flarum/components/NotificationList'], function (_export, _context) {
  var Page, NotificationList, NotificationsPage;
  return {
    setters: [function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }, function (_flarumComponentsNotificationList) {
      NotificationList = _flarumComponentsNotificationList.default;
    }],
    execute: function () {
      NotificationsPage = function (_Page) {
        babelHelpers.inherits(NotificationsPage, _Page);

        function NotificationsPage() {
          babelHelpers.classCallCheck(this, NotificationsPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NotificationsPage).apply(this, arguments));
        }

        babelHelpers.createClass(NotificationsPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(NotificationsPage.prototype), 'init', this).call(this);

            app.history.push('notifications');

            this.list = new NotificationList();
            this.list.load();

            this.bodyClass = 'App--notifications';
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'NotificationsPage' },
              this.list.render()
            );
          }
        }]);
        return NotificationsPage;
      }(Page);

      _export('default', NotificationsPage);
    }
  };
});;
'use strict';

System.register('flarum/components/Page', ['flarum/Component'], function (_export, _context) {
  var Component, Page;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }],
    execute: function () {
      Page = function (_Component) {
        babelHelpers.inherits(Page, _Component);

        function Page() {
          babelHelpers.classCallCheck(this, Page);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
        }

        babelHelpers.createClass(Page, [{
          key: 'init',
          value: function init() {
            app.previous = app.current;
            app.current = this;

            app.drawer.hide();
            app.modal.close();

            /**
             * A class name to apply to the body while the route is active.
             *
             * @type {String}
             */
            this.bodyClass = '';
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            var _this2 = this;

            if (isInitialized) return;

            if (this.bodyClass) {
              $('#app').addClass(this.bodyClass);

              context.onunload = function () {
                return $('#app').removeClass(_this2.bodyClass);
              };
            }
          }
        }]);
        return Page;
      }(Component);

      _export('default', Page);
    }
  };
});;
"use strict";

System.register("flarum/components/Placeholder", ["flarum/Component"], function (_export, _context) {
  var Component, Placeholder;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }],
    execute: function () {
      Placeholder = function (_Component) {
        babelHelpers.inherits(Placeholder, _Component);

        function Placeholder() {
          babelHelpers.classCallCheck(this, Placeholder);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Placeholder).apply(this, arguments));
        }

        babelHelpers.createClass(Placeholder, [{
          key: "view",
          value: function view() {
            return m(
              "div",
              { className: "Placeholder" },
              m(
                "p",
                null,
                this.props.text
              )
            );
          }
        }]);
        return Placeholder;
      }(Component);

      _export("default", Placeholder);
    }
  };
});;
'use strict';

System.register('flarum/components/Post', ['flarum/Component', 'flarum/utils/SubtreeRetainer', 'flarum/components/Dropdown', 'flarum/utils/PostControls', 'flarum/helpers/listItems', 'flarum/utils/ItemList'], function (_export, _context) {
  var Component, SubtreeRetainer, Dropdown, PostControls, listItems, ItemList, Post;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsSubtreeRetainer) {
      SubtreeRetainer = _flarumUtilsSubtreeRetainer.default;
    }, function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumUtilsPostControls) {
      PostControls = _flarumUtilsPostControls.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      Post = function (_Component) {
        babelHelpers.inherits(Post, _Component);

        function Post() {
          babelHelpers.classCallCheck(this, Post);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Post).apply(this, arguments));
        }

        babelHelpers.createClass(Post, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            this.loading = false;

            /**
             * Set up a subtree retainer so that the post will not be redrawn
             * unless new data comes in.
             *
             * @type {SubtreeRetainer}
             */
            this.subtree = new SubtreeRetainer(function () {
              return _this2.props.post.freshness;
            }, function () {
              var user = _this2.props.post.user();
              return user && user.freshness;
            }, function () {
              return _this2.controlsOpen;
            });
          }
        }, {
          key: 'view',
          value: function view() {
            var _this3 = this;

            var attrs = this.attrs();

            attrs.className = 'Post ' + (this.loading ? 'Post--loading ' : '') + (attrs.className || '');

            return m(
              'article',
              attrs,
              this.subtree.retain() || function () {
                var controls = PostControls.controls(_this3.props.post, _this3).toArray();

                return m(
                  'div',
                  null,
                  _this3.content(),
                  m(
                    'aside',
                    { className: 'Post-actions' },
                    m(
                      'ul',
                      null,
                      listItems(_this3.actionItems().toArray()),
                      controls.length ? m(
                        'li',
                        null,
                        m(
                          Dropdown,
                          {
                            className: 'Post-controls',
                            buttonClassName: 'Button Button--icon Button--flat',
                            menuClassName: 'Dropdown-menu--right',
                            icon: 'ellipsis-h',
                            onshow: function onshow() {
                              return _this3.$('.Post-actions').addClass('open');
                            },
                            onhide: function onhide() {
                              return _this3.$('.Post-actions').removeClass('open');
                            } },
                          controls
                        )
                      ) : ''
                    )
                  ),
                  m(
                    'footer',
                    { className: 'Post-footer' },
                    m(
                      'ul',
                      null,
                      listItems(_this3.footerItems().toArray())
                    )
                  )
                );
              }()
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            var $actions = this.$('.Post-actions');
            var $controls = this.$('.Post-controls');

            $actions.toggleClass('open', $controls.hasClass('open'));
          }
        }, {
          key: 'attrs',
          value: function attrs() {
            return {};
          }
        }, {
          key: 'content',
          value: function content() {
            return '';
          }
        }, {
          key: 'actionItems',
          value: function actionItems() {
            return new ItemList();
          }
        }, {
          key: 'footerItems',
          value: function footerItems() {
            return new ItemList();
          }
        }]);
        return Post;
      }(Component);

      _export('default', Post);
    }
  };
});;
'use strict';

System.register('flarum/components/PostEdited', ['flarum/Component', 'flarum/helpers/icon', 'flarum/utils/humanTime', 'flarum/utils/extractText'], function (_export, _context) {
  var Component, icon, humanTime, extractText, PostEdited;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsHumanTime) {
      humanTime = _flarumUtilsHumanTime.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      PostEdited = function (_Component) {
        babelHelpers.inherits(PostEdited, _Component);

        function PostEdited() {
          babelHelpers.classCallCheck(this, PostEdited);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostEdited).apply(this, arguments));
        }

        babelHelpers.createClass(PostEdited, [{
          key: 'view',
          value: function view() {
            var post = this.props.post;
            var editUser = post.editUser();
            var title = extractText(app.translator.trans('core.forum.post.edited_tooltip', { user: editUser, ago: humanTime(post.editTime()) }));

            return m(
              'span',
              { className: 'PostEdited', title: title },
              icon('pencil')
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            if (isInitialized) return;

            this.$().tooltip();
          }
        }]);
        return PostEdited;
      }(Component);

      _export('default', PostEdited);
    }
  };
});;
'use strict';

System.register('flarum/components/PostMeta', ['flarum/Component', 'flarum/helpers/humanTime', 'flarum/helpers/fullTime'], function (_export, _context) {
  var Component, humanTime, fullTime, PostMeta;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersHumanTime) {
      humanTime = _flarumHelpersHumanTime.default;
    }, function (_flarumHelpersFullTime) {
      fullTime = _flarumHelpersFullTime.default;
    }],
    execute: function () {
      PostMeta = function (_Component) {
        babelHelpers.inherits(PostMeta, _Component);

        function PostMeta() {
          babelHelpers.classCallCheck(this, PostMeta);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostMeta).apply(this, arguments));
        }

        babelHelpers.createClass(PostMeta, [{
          key: 'view',
          value: function view() {
            var post = this.props.post;
            var time = post.time();
            var permalink = this.getPermalink(post);
            var touch = 'ontouchstart' in document.documentElement;

            // When the dropdown menu is shown, select the contents of the permalink
            // input so that the user can quickly copy the URL.
            var selectPermalink = function selectPermalink() {
              var _this2 = this;

              setTimeout(function () {
                return $(_this2).parent().find('.PostMeta-permalink').select();
              });

              m.redraw.strategy('none');
            };

            return m(
              'div',
              { className: 'Dropdown PostMeta' },
              m(
                'a',
                { className: 'Dropdown-toggle', onclick: selectPermalink, 'data-toggle': 'dropdown' },
                humanTime(time)
              ),
              m(
                'div',
                { className: 'Dropdown-menu dropdown-menu' },
                m(
                  'span',
                  { className: 'PostMeta-number' },
                  app.translator.trans('core.forum.post.number_tooltip', { number: post.number() })
                ),
                ' ',
                fullTime(time),
                touch ? m(
                  'a',
                  { className: 'Button PostMeta-permalink', href: permalink },
                  permalink
                ) : m('input', { className: 'FormControl PostMeta-permalink', value: permalink, onclick: function onclick(e) {
                    return e.stopPropagation();
                  } })
              )
            );
          }
        }, {
          key: 'getPermalink',
          value: function getPermalink(post) {
            return window.location.origin + app.route.post(post);
          }
        }]);
        return PostMeta;
      }(Component);

      _export('default', PostMeta);
    }
  };
});;
'use strict';

System.register('flarum/components/PostPreview', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/highlight'], function (_export, _context) {
  var Component, avatar, username, highlight, PostPreview;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumHelpersHighlight) {
      highlight = _flarumHelpersHighlight.default;
    }],
    execute: function () {
      PostPreview = function (_Component) {
        babelHelpers.inherits(PostPreview, _Component);

        function PostPreview() {
          babelHelpers.classCallCheck(this, PostPreview);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostPreview).apply(this, arguments));
        }

        babelHelpers.createClass(PostPreview, [{
          key: 'view',
          value: function view() {
            var post = this.props.post;
            var user = post.user();
            var excerpt = highlight(post.contentPlain(), this.props.highlight, 300);

            return m(
              'a',
              { className: 'PostPreview', href: app.route.post(post), config: m.route, onclick: this.props.onclick },
              m(
                'span',
                { className: 'PostPreview-content' },
                avatar(user),
                username(user),
                ' ',
                m(
                  'span',
                  { className: 'PostPreview-excerpt' },
                  excerpt
                )
              )
            );
          }
        }]);
        return PostPreview;
      }(Component);

      _export('default', PostPreview);
    }
  };
});;
'use strict';

System.register('flarum/components/PostStream', ['flarum/Component', 'flarum/utils/ScrollListener', 'flarum/components/LoadingPost', 'flarum/utils/anchorScroll', 'flarum/utils/mixin', 'flarum/utils/evented', 'flarum/components/ReplyPlaceholder', 'flarum/components/Button'], function (_export, _context) {
  var Component, ScrollListener, PostLoading, anchorScroll, mixin, evented, ReplyPlaceholder, Button, PostStream;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsScrollListener) {
      ScrollListener = _flarumUtilsScrollListener.default;
    }, function (_flarumComponentsLoadingPost) {
      PostLoading = _flarumComponentsLoadingPost.default;
    }, function (_flarumUtilsAnchorScroll) {
      anchorScroll = _flarumUtilsAnchorScroll.default;
    }, function (_flarumUtilsMixin) {
      mixin = _flarumUtilsMixin.default;
    }, function (_flarumUtilsEvented) {
      evented = _flarumUtilsEvented.default;
    }, function (_flarumComponentsReplyPlaceholder) {
      ReplyPlaceholder = _flarumComponentsReplyPlaceholder.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      PostStream = function (_Component) {
        babelHelpers.inherits(PostStream, _Component);

        function PostStream() {
          babelHelpers.classCallCheck(this, PostStream);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostStream).apply(this, arguments));
        }

        babelHelpers.createClass(PostStream, [{
          key: 'init',
          value: function init() {
            /**
             * The discussion to display the post stream for.
             *
             * @type {Discussion}
             */
            this.discussion = this.props.discussion;

            /**
             * Whether or not the infinite-scrolling auto-load functionality is
             * disabled.
             *
             * @type {Boolean}
             */
            this.paused = false;

            this.scrollListener = new ScrollListener(this.onscroll.bind(this));
            this.loadPageTimeouts = {};
            this.pagesLoading = 0;

            this.show(this.props.includedPosts);
          }
        }, {
          key: 'goToNumber',
          value: function goToNumber(number, noAnimation) {
            var _this2 = this;

            // If we want to go to the reply preview, then we will go to the end of the
            // discussion and then scroll to the very bottom of the page.
            if (number === 'reply') {
              return this.goToLast().then(function () {
                $('html,body').stop(true).animate({
                  scrollTop: $(document).height() - $(window).height()
                }, 'fast', function () {
                  _this2.flashItem(_this2.$('.PostStream-item:last-child'));
                });
              });
            }

            this.paused = true;

            var promise = this.loadNearNumber(number);

            m.redraw(true);

            return promise.then(function () {
              m.redraw(true);

              _this2.scrollToNumber(number, noAnimation).done(_this2.unpause.bind(_this2));
            });
          }
        }, {
          key: 'goToIndex',
          value: function goToIndex(index, backwards, noAnimation) {
            var _this3 = this;

            this.paused = true;

            var promise = this.loadNearIndex(index);

            m.redraw(true);

            return promise.then(function () {
              anchorScroll(_this3.$('.PostStream-item:' + (backwards ? 'last' : 'first')), function () {
                return m.redraw(true);
              });

              _this3.scrollToIndex(index, noAnimation, backwards).done(_this3.unpause.bind(_this3));
            });
          }
        }, {
          key: 'goToFirst',
          value: function goToFirst() {
            return this.goToIndex(0);
          }
        }, {
          key: 'goToLast',
          value: function goToLast() {
            return this.goToIndex(this.count() - 1, true);
          }
        }, {
          key: 'update',
          value: function update() {
            if (!this.viewingEnd) return;

            this.visibleEnd = this.count();

            this.loadRange(this.visibleStart, this.visibleEnd).then(function () {
              return m.redraw();
            });
          }
        }, {
          key: 'count',
          value: function count() {
            return this.discussion.postIds().length;
          }
        }, {
          key: 'sanitizeIndex',
          value: function sanitizeIndex(index) {
            return Math.max(0, Math.min(this.count(), index));
          }
        }, {
          key: 'show',
          value: function show(posts) {
            this.visibleStart = posts.length ? this.discussion.postIds().indexOf(posts[0].id()) : 0;
            this.visibleEnd = this.visibleStart + posts.length;
          }
        }, {
          key: 'reset',
          value: function reset(start, end) {
            this.visibleStart = start || 0;
            this.visibleEnd = this.sanitizeIndex(end || this.constructor.loadCount);
          }
        }, {
          key: 'posts',
          value: function posts() {
            return this.discussion.postIds().slice(this.visibleStart, this.visibleEnd).map(function (id) {
              var post = app.store.getById('posts', id);

              return post && post.discussion() && typeof post.canEdit() !== 'undefined' ? post : null;
            });
          }
        }, {
          key: 'view',
          value: function view() {
            var _this4 = this;

            function fadeIn(element, isInitialized, context) {
              if (!context.fadedIn) $(element).hide().fadeIn();
              context.fadedIn = true;
            }

            var lastTime = void 0;

            this.visibleEnd = this.sanitizeIndex(this.visibleEnd);
            this.viewingEnd = this.visibleEnd === this.count();

            var posts = this.posts();
            var postIds = this.discussion.postIds();

            var items = posts.map(function (post, i) {
              var content = void 0;
              var attrs = { 'data-index': _this4.visibleStart + i };

              if (post) {
                var time = post.time();
                var PostComponent = app.postComponents[post.contentType()];
                content = PostComponent ? PostComponent.component({ post: post }) : '';

                attrs.key = 'post' + post.id();
                attrs.config = fadeIn;
                attrs['data-time'] = time.toISOString();
                attrs['data-number'] = post.number();
                attrs['data-id'] = post.id();
                attrs['data-type'] = post.contentType();

                // If the post before this one was more than 4 hours ago, we will
                // display a 'time gap' indicating how long it has been in between
                // the posts.
                var dt = time - lastTime;

                if (dt > 1000 * 60 * 60 * 24 * 4) {
                  content = [m(
                    'div',
                    { className: 'PostStream-timeGap' },
                    m(
                      'span',
                      null,
                      app.translator.trans('core.forum.post_stream.time_lapsed_text', { period: moment.duration(dt).humanize() })
                    )
                  ), content];
                }

                lastTime = time;
              } else {
                attrs.key = 'post' + postIds[_this4.visibleStart + i];

                content = PostLoading.component();
              }

              return m(
                'div',
                babelHelpers.extends({ className: 'PostStream-item' }, attrs),
                content
              );
            });

            if (!this.viewingEnd && posts[this.visibleEnd - this.visibleStart - 1]) {
              items.push(m(
                'div',
                { className: 'PostStream-loadMore', key: 'loadMore' },
                m(
                  Button,
                  { className: 'Button', onclick: this.loadNext.bind(this) },
                  app.translator.trans('core.forum.post_stream.load_more_button')
                )
              ));
            }

            // If we're viewing the end of the discussion, the user can reply, and
            // is not already doing so, then show a 'write a reply' placeholder.
            if (this.viewingEnd && (!app.session.user || this.discussion.canReply())) {
              items.push(m(
                'div',
                { className: 'PostStream-item', key: 'reply' },
                ReplyPlaceholder.component({ discussion: this.discussion })
              ));
            }

            return m(
              'div',
              { className: 'PostStream' },
              items
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            var _this5 = this;

            if (isInitialized) return;

            // This is wrapped in setTimeout due to the following Mithril issue:
            // https://github.com/lhorie/mithril.js/issues/637
            setTimeout(function () {
              return _this5.scrollListener.start();
            });

            context.onunload = function () {
              _this5.scrollListener.stop();
              clearTimeout(_this5.calculatePositionTimeout);
            };
          }
        }, {
          key: 'onscroll',
          value: function onscroll(top) {
            if (this.paused) return;

            var marginTop = this.getMarginTop();
            var viewportHeight = $(window).height() - marginTop;
            var viewportTop = top + marginTop;
            var loadAheadDistance = 300;

            if (this.visibleStart > 0) {
              var $item = this.$('.PostStream-item[data-index=' + this.visibleStart + ']');

              if ($item.length && $item.offset().top > viewportTop - loadAheadDistance) {
                this.loadPrevious();
              }
            }

            if (this.visibleEnd < this.count()) {
              var _$item = this.$('.PostStream-item[data-index=' + (this.visibleEnd - 1) + ']');

              if (_$item.length && _$item.offset().top + _$item.outerHeight(true) < viewportTop + viewportHeight + loadAheadDistance) {
                this.loadNext();
              }
            }

            // Throttle calculation of our position (start/end numbers of posts in the
            // viewport) to 100ms.
            clearTimeout(this.calculatePositionTimeout);
            this.calculatePositionTimeout = setTimeout(this.calculatePosition.bind(this), 100);
          }
        }, {
          key: 'loadNext',
          value: function loadNext() {
            var start = this.visibleEnd;
            var end = this.visibleEnd = this.sanitizeIndex(this.visibleEnd + this.constructor.loadCount);

            // Unload the posts which are two pages back from the page we're currently
            // loading.
            var twoPagesAway = start - this.constructor.loadCount * 2;
            if (twoPagesAway > this.visibleStart && twoPagesAway >= 0) {
              this.visibleStart = twoPagesAway + this.constructor.loadCount + 1;

              if (this.loadPageTimeouts[twoPagesAway]) {
                clearTimeout(this.loadPageTimeouts[twoPagesAway]);
                this.loadPageTimeouts[twoPagesAway] = null;
                this.pagesLoading--;
              }
            }

            this.loadPage(start, end);
          }
        }, {
          key: 'loadPrevious',
          value: function loadPrevious() {
            var end = this.visibleStart;
            var start = this.visibleStart = this.sanitizeIndex(this.visibleStart - this.constructor.loadCount);

            // Unload the posts which are two pages back from the page we're currently
            // loading.
            var twoPagesAway = start + this.constructor.loadCount * 2;
            if (twoPagesAway < this.visibleEnd && twoPagesAway <= this.count()) {
              this.visibleEnd = twoPagesAway;

              if (this.loadPageTimeouts[twoPagesAway]) {
                clearTimeout(this.loadPageTimeouts[twoPagesAway]);
                this.loadPageTimeouts[twoPagesAway] = null;
                this.pagesLoading--;
              }
            }

            this.loadPage(start, end, true);
          }
        }, {
          key: 'loadPage',
          value: function loadPage(start, end, backwards) {
            var _this6 = this;

            var redraw = function redraw() {
              if (start < _this6.visibleStart || end > _this6.visibleEnd) return;

              var anchorIndex = backwards ? _this6.visibleEnd - 1 : _this6.visibleStart;
              anchorScroll('.PostStream-item[data-index="' + anchorIndex + '"]', function () {
                return m.redraw(true);
              });

              _this6.unpause();
            };
            redraw();

            this.loadPageTimeouts[start] = setTimeout(function () {
              _this6.loadRange(start, end).then(function () {
                redraw();
                _this6.pagesLoading--;
              });
              _this6.loadPageTimeouts[start] = null;
            }, this.pagesLoading ? 1000 : 0);

            this.pagesLoading++;
          }
        }, {
          key: 'loadRange',
          value: function loadRange(start, end) {
            var loadIds = [];
            var loaded = [];

            this.discussion.postIds().slice(start, end).forEach(function (id) {
              var post = app.store.getById('posts', id);

              if (post && post.discussion() && typeof post.canEdit() !== 'undefined') {
                loaded.push(post);
              } else {
                loadIds.push(id);
              }
            });

            return loadIds.length ? app.store.find('posts', loadIds) : m.deferred().resolve(loaded).promise;
          }
        }, {
          key: 'loadNearNumber',
          value: function loadNearNumber(number) {
            if (this.posts().some(function (post) {
              return post && Number(post.number()) === Number(number);
            })) {
              return m.deferred().resolve().promise;
            }

            this.reset();

            return app.store.find('posts', {
              filter: { discussion: this.discussion.id() },
              page: { near: number }
            }).then(this.show.bind(this));
          }
        }, {
          key: 'loadNearIndex',
          value: function loadNearIndex(index) {
            if (index >= this.visibleStart && index <= this.visibleEnd) {
              return m.deferred().resolve().promise;
            }

            var start = this.sanitizeIndex(index - this.constructor.loadCount / 2);
            var end = start + this.constructor.loadCount;

            this.reset(start, end);

            return this.loadRange(start, end).then(this.show.bind(this));
          }
        }, {
          key: 'calculatePosition',
          value: function calculatePosition() {
            var marginTop = this.getMarginTop();
            var $window = $(window);
            var viewportHeight = $window.height() - marginTop;
            var scrollTop = $window.scrollTop() + marginTop;
            var startNumber = void 0;
            var endNumber = void 0;

            this.$('.PostStream-item').each(function () {
              var $item = $(this);
              var top = $item.offset().top;
              var height = $item.outerHeight(true);

              if (top + height > scrollTop) {
                if (!startNumber) {
                  startNumber = endNumber = $item.data('number');
                }

                if (top + height < scrollTop + viewportHeight) {
                  if ($item.data('number')) {
                    endNumber = $item.data('number');
                  }
                } else return false;
              }
            });

            if (startNumber) {
              this.trigger('positionChanged', startNumber || 1, endNumber);
            }
          }
        }, {
          key: 'getMarginTop',
          value: function getMarginTop() {
            return this.$() && $('#header').outerHeight() + parseInt(this.$().css('margin-top'), 10);
          }
        }, {
          key: 'scrollToNumber',
          value: function scrollToNumber(number, noAnimation) {
            var $item = this.$('.PostStream-item[data-number=' + number + ']');

            return this.scrollToItem($item, noAnimation).done(this.flashItem.bind(this, $item));
          }
        }, {
          key: 'scrollToIndex',
          value: function scrollToIndex(index, noAnimation, bottom) {
            var $item = this.$('.PostStream-item[data-index=' + index + ']');

            return this.scrollToItem($item, noAnimation, true, bottom);
          }
        }, {
          key: 'scrollToItem',
          value: function scrollToItem($item, noAnimation, force, bottom) {
            var $container = $('html, body').stop(true);

            if ($item.length) {
              var itemTop = $item.offset().top - this.getMarginTop();
              var itemBottom = $item.offset().top + $item.height();
              var scrollTop = $(document).scrollTop();
              var scrollBottom = scrollTop + $(window).height();

              // If the item is already in the viewport, we may not need to scroll.
              // If we're scrolling to the bottom of an item, then we'll make sure the
              // bottom will line up with the top of the composer.
              if (force || itemTop < scrollTop || itemBottom > scrollBottom) {
                var top = bottom ? itemBottom - $(window).height() + app.composer.computedHeight() : $item.is(':first-child') ? 0 : itemTop;

                if (noAnimation) {
                  $container.scrollTop(top);
                } else if (top !== scrollTop) {
                  $container.animate({ scrollTop: top }, 'fast');
                }
              }
            }

            return $container.promise();
          }
        }, {
          key: 'flashItem',
          value: function flashItem($item) {
            $item.addClass('flash').one('animationend webkitAnimationEnd', function () {
              return $item.removeClass('flash');
            });
          }
        }, {
          key: 'unpause',
          value: function unpause() {
            this.paused = false;
            this.scrollListener.update(true);
            this.trigger('unpaused');
          }
        }]);
        return PostStream;
      }(Component);

      /**
       * The number of posts to load per page.
       *
       * @type {Integer}
       */
      PostStream.loadCount = 20;

      babelHelpers.extends(PostStream.prototype, evented);

      _export('default', PostStream);
    }
  };
});;
'use strict';

System.register('flarum/components/PostStreamScrubber', ['flarum/Component', 'flarum/helpers/icon', 'flarum/utils/ScrollListener', 'flarum/utils/SubtreeRetainer', 'flarum/utils/computed', 'flarum/utils/formatNumber'], function (_export, _context) {
  var Component, icon, ScrollListener, SubtreeRetainer, computed, formatNumber, PostStreamScrubber;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsScrollListener) {
      ScrollListener = _flarumUtilsScrollListener.default;
    }, function (_flarumUtilsSubtreeRetainer) {
      SubtreeRetainer = _flarumUtilsSubtreeRetainer.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }, function (_flarumUtilsFormatNumber) {
      formatNumber = _flarumUtilsFormatNumber.default;
    }],
    execute: function () {
      PostStreamScrubber = function (_Component) {
        babelHelpers.inherits(PostStreamScrubber, _Component);

        function PostStreamScrubber() {
          babelHelpers.classCallCheck(this, PostStreamScrubber);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostStreamScrubber).apply(this, arguments));
        }

        babelHelpers.createClass(PostStreamScrubber, [{
          key: 'init',
          value: function init() {
            this.handlers = {};

            /**
             * The index of the post that is currently at the top of the viewport.
             *
             * @type {Number}
             */
            this.index = 0;

            /**
             * The number of posts that are currently visible in the viewport.
             *
             * @type {Number}
             */
            this.visible = 1;

            /**
             * The description to render on the scrubber.
             *
             * @type {String}
             */
            this.description = '';

            // When the post stream begins loading posts at a certain index, we want our
            // scrubber scrollbar to jump to that position.
            this.props.stream.on('unpaused', this.handlers.streamWasUnpaused = this.streamWasUnpaused.bind(this));

            // Define a handler to update the state of the scrollbar to reflect the
            // current scroll position of the page.
            this.scrollListener = new ScrollListener(this.onscroll.bind(this));

            // Create a subtree retainer that will always cache the subtree after the
            // initial draw. We render parts of the scrubber using this because we
            // modify their DOM directly, and do not want Mithril messing around with
            // our changes.
            this.subtree = new SubtreeRetainer(function () {
              return true;
            });
          }
        }, {
          key: 'view',
          value: function view() {
            var retain = this.subtree.retain();
            var count = this.count();
            var unreadCount = this.props.stream.discussion.unreadCount();
            var unreadPercent = count ? Math.min(count - this.index, unreadCount) / count : 0;

            var viewing = app.translator.transChoice('core.forum.post_scrubber.viewing_text', count, {
              index: m(
                'span',
                { className: 'Scrubber-index' },
                retain || formatNumber(Math.ceil(this.index + this.visible))
              ),
              count: m(
                'span',
                { className: 'Scrubber-count' },
                formatNumber(count)
              )
            });

            function styleUnread(element, isInitialized, context) {
              var $element = $(element);
              var newStyle = {
                top: 100 - unreadPercent * 100 + '%',
                height: unreadPercent * 100 + '%'
              };

              if (context.oldStyle) {
                $element.stop(true).css(context.oldStyle).animate(newStyle);
              } else {
                $element.css(newStyle);
              }

              context.oldStyle = newStyle;
            }

            return m(
              'div',
              { className: 'PostStreamScrubber Dropdown ' + (this.disabled() ? 'disabled ' : '') + (this.props.className || '') },
              m(
                'button',
                { className: 'Button Dropdown-toggle', 'data-toggle': 'dropdown' },
                viewing,
                ' ',
                icon('sort')
              ),
              m(
                'div',
                { className: 'Dropdown-menu dropdown-menu' },
                m(
                  'div',
                  { className: 'Scrubber' },
                  m(
                    'a',
                    { className: 'Scrubber-first', onclick: this.goToFirst.bind(this) },
                    icon('angle-double-up'),
                    ' ',
                    app.translator.trans('core.forum.post_scrubber.original_post_link')
                  ),
                  m(
                    'div',
                    { className: 'Scrubber-scrollbar' },
                    m('div', { className: 'Scrubber-before' }),
                    m(
                      'div',
                      { className: 'Scrubber-handle' },
                      m('div', { className: 'Scrubber-bar' }),
                      m(
                        'div',
                        { className: 'Scrubber-info' },
                        m(
                          'strong',
                          null,
                          viewing
                        ),
                        m(
                          'span',
                          { 'class': 'Scrubber-description' },
                          retain || this.description
                        )
                      )
                    ),
                    m('div', { className: 'Scrubber-after' }),
                    m(
                      'div',
                      { className: 'Scrubber-unread', config: styleUnread },
                      app.translator.trans('core.forum.post_scrubber.unread_text', { count: unreadCount })
                    )
                  ),
                  m(
                    'a',
                    { className: 'Scrubber-last', onclick: this.goToLast.bind(this) },
                    icon('angle-double-down'),
                    ' ',
                    app.translator.trans('core.forum.post_scrubber.now_link')
                  )
                )
              )
            );
          }
        }, {
          key: 'goToFirst',
          value: function goToFirst() {
            this.props.stream.goToFirst();
            this.index = 0;
            this.renderScrollbar(true);
          }
        }, {
          key: 'goToLast',
          value: function goToLast() {
            this.props.stream.goToLast();
            this.index = this.props.stream.count();
            this.renderScrollbar(true);
          }
        }, {
          key: 'count',
          value: function count() {
            return this.props.stream.count();
          }
        }, {
          key: 'streamWasUnpaused',
          value: function streamWasUnpaused() {
            this.update(window.pageYOffset);
            this.renderScrollbar(true);
          }
        }, {
          key: 'disabled',
          value: function disabled() {
            return this.visible >= this.count();
          }
        }, {
          key: 'onscroll',
          value: function onscroll(top) {
            var stream = this.props.stream;

            if (stream.paused || !stream.$()) return;

            this.update(top);
            this.renderScrollbar();
          }
        }, {
          key: 'update',
          value: function update(scrollTop) {
            var stream = this.props.stream;

            var marginTop = stream.getMarginTop();
            var viewportTop = scrollTop + marginTop;
            var viewportHeight = $(window).height() - marginTop;
            var viewportBottom = viewportTop + viewportHeight;

            // Before looping through all of the posts, we reset the scrollbar
            // properties to a 'default' state. These values reflect what would be
            // seen if the browser were scrolled right up to the top of the page,
            // and the viewport had a height of 0.
            var $items = stream.$('> .PostStream-item[data-index]');
            var index = $items.first().data('index') || 0;
            var visible = 0;
            var period = '';

            // Now loop through each of the items in the discussion. An 'item' is
            // either a single post or a 'gap' of one or more posts that haven't
            // been loaded yet.
            $items.each(function () {
              var $this = $(this);
              var top = $this.offset().top;
              var height = $this.outerHeight(true);

              // If this item is above the top of the viewport, skip to the next
              // one. If it's below the bottom of the viewport, break out of the
              // loop.
              if (top + height < viewportTop) {
                return true;
              }
              if (top > viewportTop + viewportHeight) {
                return false;
              }

              // Work out how many pixels of this item are visible inside the viewport.
              // Then add the proportion of this item's total height to the index.
              var visibleTop = Math.max(0, viewportTop - top);
              var visibleBottom = Math.min(height, viewportTop + viewportHeight - top);
              var visiblePost = visibleBottom - visibleTop;

              if (top <= viewportTop) {
                index = parseFloat($this.data('index')) + visibleTop / height;
              }

              if (visiblePost > 0) {
                visible += visiblePost / height;
              }

              // If this item has a time associated with it, then set the
              // scrollbar's current period to a formatted version of this time.
              var time = $this.data('time');
              if (time) period = time;
            });

            this.index = index;
            this.visible = visible;
            this.description = period ? moment(period).format('MMMM YYYY') : '';
          }
        }, {
          key: 'config',
          value: function config(isInitialized, context) {
            if (isInitialized) return;

            context.onunload = this.ondestroy.bind(this);

            this.scrollListener.start();

            // Whenever the window is resized, adjust the height of the scrollbar
            // so that it fills the height of the sidebar.
            $(window).on('resize', this.handlers.onresize = this.onresize.bind(this)).resize();

            // When any part of the whole scrollbar is clicked, we want to jump to
            // that position.
            this.$('.Scrubber-scrollbar').bind('click', this.onclick.bind(this))

            // Now we want to make the scrollbar handle draggable. Let's start by
            // preventing default browser events from messing things up.
            .css({ cursor: 'pointer', 'user-select': 'none' }).bind('dragstart mousedown touchstart', function (e) {
              return e.preventDefault();
            });

            // When the mouse is pressed on the scrollbar handle, we capture some
            // information about its current position. We will store this
            // information in an object and pass it on to the document's
            // mousemove/mouseup events later.
            this.dragging = false;
            this.mouseStart = 0;
            this.indexStart = 0;

            this.$('.Scrubber-handle').css('cursor', 'move').bind('mousedown touchstart', this.onmousedown.bind(this))

            // Exempt the scrollbar handle from the 'jump to' click event.
            .click(function (e) {
              return e.stopPropagation();
            });

            // When the mouse moves and when it is released, we pass the
            // information that we captured when the mouse was first pressed onto
            // some event handlers. These handlers will move the scrollbar/stream-
            // content as appropriate.
            $(document).on('mousemove touchmove', this.handlers.onmousemove = this.onmousemove.bind(this)).on('mouseup touchend', this.handlers.onmouseup = this.onmouseup.bind(this));
          }
        }, {
          key: 'ondestroy',
          value: function ondestroy() {
            this.scrollListener.stop();

            this.props.stream.off('unpaused', this.handlers.streamWasUnpaused);

            $(window).off('resize', this.handlers.onresize);

            $(document).off('mousemove touchmove', this.handlers.onmousemove).off('mouseup touchend', this.handlers.onmouseup);
          }
        }, {
          key: 'renderScrollbar',
          value: function renderScrollbar(animate) {
            var percentPerPost = this.percentPerPost();
            var index = this.index;
            var count = this.count();
            var visible = this.visible || 1;

            var $scrubber = this.$();
            $scrubber.find('.Scrubber-index').text(formatNumber(Math.ceil(index + visible)));
            $scrubber.find('.Scrubber-description').text(this.description);
            $scrubber.toggleClass('disabled', this.disabled());

            var heights = {};
            heights.before = Math.max(0, percentPerPost.index * Math.min(index, count - visible));
            heights.handle = Math.min(100 - heights.before, percentPerPost.visible * visible);
            heights.after = 100 - heights.before - heights.handle;

            var func = animate ? 'animate' : 'css';
            for (var part in heights) {
              var $part = $scrubber.find('.Scrubber-' + part);
              $part.stop(true, true)[func]({ height: heights[part] + '%' }, 'fast');

              // jQuery likes to put overflow:hidden, but because the scrollbar handle
              // has a negative margin-left, we need to override.
              if (func === 'animate') $part.css('overflow', 'visible');
            }
          }
        }, {
          key: 'percentPerPost',
          value: function percentPerPost() {
            var count = this.count() || 1;
            var visible = this.visible || 1;

            // To stop the handle of the scrollbar from getting too small when there
            // are many posts, we define a minimum percentage height for the handle
            // calculated from a 50 pixel limit. From this, we can calculate the
            // minimum percentage per visible post. If this is greater than the actual
            // percentage per post, then we need to adjust the 'before' percentage to
            // account for it.
            var minPercentVisible = 50 / this.$('.Scrubber-scrollbar').outerHeight() * 100;
            var percentPerVisiblePost = Math.max(100 / count, minPercentVisible / visible);
            var percentPerPost = count === visible ? 0 : (100 - percentPerVisiblePost * visible) / (count - visible);

            return {
              index: percentPerPost,
              visible: percentPerVisiblePost
            };
          }
        }, {
          key: 'onresize',
          value: function onresize() {
            this.scrollListener.update(true);

            // Adjust the height of the scrollbar so that it fills the height of
            // the sidebar and doesn't overlap the footer.
            var scrubber = this.$();
            var scrollbar = this.$('.Scrubber-scrollbar');

            scrollbar.css('max-height', $(window).height() - scrubber.offset().top + $(window).scrollTop() - parseInt($('#app').css('padding-bottom'), 10) - (scrubber.outerHeight() - scrollbar.outerHeight()));
          }
        }, {
          key: 'onmousedown',
          value: function onmousedown(e) {
            this.mouseStart = e.clientY || e.originalEvent.touches[0].clientY;
            this.indexStart = this.index;
            this.dragging = true;
            this.props.stream.paused = true;
            $('body').css('cursor', 'move');
          }
        }, {
          key: 'onmousemove',
          value: function onmousemove(e) {
            if (!this.dragging) return;

            // Work out how much the mouse has moved by - first in pixels, then
            // convert it to a percentage of the scrollbar's height, and then
            // finally convert it into an index. Add this delta index onto
            // the index at which the drag was started, and then scroll there.
            var deltaPixels = (e.clientY || e.originalEvent.touches[0].clientY) - this.mouseStart;
            var deltaPercent = deltaPixels / this.$('.Scrubber-scrollbar').outerHeight() * 100;
            var deltaIndex = deltaPercent / this.percentPerPost().index || 0;
            var newIndex = Math.min(this.indexStart + deltaIndex, this.count() - 1);

            this.index = Math.max(0, newIndex);
            this.renderScrollbar();
          }
        }, {
          key: 'onmouseup',
          value: function onmouseup() {
            if (!this.dragging) return;

            this.mouseStart = 0;
            this.indexStart = 0;
            this.dragging = false;
            $('body').css('cursor', '');

            this.$().removeClass('open');

            // If the index we've landed on is in a gap, then tell the stream-
            // content that we want to load those posts.
            var intIndex = Math.floor(this.index);
            this.props.stream.goToIndex(intIndex);
            this.renderScrollbar(true);
          }
        }, {
          key: 'onclick',
          value: function onclick(e) {
            // Calculate the index which we want to jump to based on the click position.

            // 1. Get the offset of the click from the top of the scrollbar, as a
            //    percentage of the scrollbar's height.
            var $scrollbar = this.$('.Scrubber-scrollbar');
            var offsetPixels = (e.clientY || e.originalEvent.touches[0].clientY) - $scrollbar.offset().top + $('body').scrollTop();
            var offsetPercent = offsetPixels / $scrollbar.outerHeight() * 100;

            // 2. We want the handle of the scrollbar to end up centered on the click
            //    position. Thus, we calculate the height of the handle in percent and
            //    use that to find a new offset percentage.
            offsetPercent = offsetPercent - parseFloat($scrollbar.find('.Scrubber-handle')[0].style.height) / 2;

            // 3. Now we can convert the percentage into an index, and tell the stream-
            //    content component to jump to that index.
            var offsetIndex = offsetPercent / this.percentPerPost().index;
            offsetIndex = Math.max(0, Math.min(this.count() - 1, offsetIndex));
            this.props.stream.goToIndex(Math.floor(offsetIndex));
            this.index = offsetIndex;
            this.renderScrollbar(true);

            this.$().removeClass('open');
          }
        }]);
        return PostStreamScrubber;
      }(Component);

      _export('default', PostStreamScrubber);
    }
  };
});;
'use strict';

System.register('flarum/components/PostsUserPage', ['flarum/components/UserPage', 'flarum/components/LoadingIndicator', 'flarum/components/Button', 'flarum/components/CommentPost'], function (_export, _context) {
  var UserPage, LoadingIndicator, Button, CommentPost, PostsUserPage;
  return {
    setters: [function (_flarumComponentsUserPage) {
      UserPage = _flarumComponentsUserPage.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsCommentPost) {
      CommentPost = _flarumComponentsCommentPost.default;
    }],
    execute: function () {
      PostsUserPage = function (_UserPage) {
        babelHelpers.inherits(PostsUserPage, _UserPage);

        function PostsUserPage() {
          babelHelpers.classCallCheck(this, PostsUserPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostsUserPage).apply(this, arguments));
        }

        babelHelpers.createClass(PostsUserPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(PostsUserPage.prototype), 'init', this).call(this);

            /**
             * Whether or not the activity feed is currently loading.
             *
             * @type {Boolean}
             */
            this.loading = true;

            /**
             * Whether or not there are any more activity items that can be loaded.
             *
             * @type {Boolean}
             */
            this.moreResults = false;

            /**
             * The Post models in the feed.
             *
             * @type {Post[]}
             */
            this.posts = [];

            /**
             * The number of activity items to load per request.
             *
             * @type {Integer}
             */
            this.loadLimit = 20;

            this.loadUser(m.route.param('username'));
          }
        }, {
          key: 'content',
          value: function content() {
            var footer = void 0;

            if (this.loading) {
              footer = LoadingIndicator.component();
            } else if (this.moreResults) {
              footer = m(
                'div',
                { className: 'PostsUserPage-loadMore' },
                Button.component({
                  children: app.translator.trans('core.forum.user.posts_load_more_button'),
                  className: 'Button',
                  onclick: this.loadMore.bind(this)
                })
              );
            }

            return m(
              'div',
              { className: 'PostsUserPage' },
              m(
                'ul',
                { className: 'PostsUserPage-list' },
                this.posts.map(function (post) {
                  return m(
                    'li',
                    null,
                    m(
                      'div',
                      { className: 'PostsUserPage-discussion' },
                      app.translator.trans('core.forum.user.in_discussion_text', { discussion: m(
                          'a',
                          { href: app.route.post(post), config: m.route },
                          post.discussion().title()
                        ) })
                    ),
                    CommentPost.component({ post: post })
                  );
                })
              ),
              footer
            );
          }
        }, {
          key: 'show',
          value: function show(user) {
            babelHelpers.get(Object.getPrototypeOf(PostsUserPage.prototype), 'show', this).call(this, user);

            this.refresh();
          }
        }, {
          key: 'refresh',
          value: function refresh() {
            this.loading = true;
            this.posts = [];

            m.lazyRedraw();

            this.loadResults().then(this.parseResults.bind(this));
          }
        }, {
          key: 'loadResults',
          value: function loadResults(offset) {
            return app.store.find('posts', {
              filter: {
                user: this.user.id(),
                type: 'comment'
              },
              page: { offset: offset, limit: this.loadLimit },
              sort: '-time'
            });
          }
        }, {
          key: 'loadMore',
          value: function loadMore() {
            this.loading = true;
            this.loadResults(this.posts.length).then(this.parseResults.bind(this));
          }
        }, {
          key: 'parseResults',
          value: function parseResults(results) {
            this.loading = false;

            [].push.apply(this.posts, results);

            this.moreResults = results.length >= this.loadLimit;
            m.redraw();

            return results;
          }
        }]);
        return PostsUserPage;
      }(UserPage);

      _export('default', PostsUserPage);
    }
  };
});;
'use strict';

System.register('flarum/components/PostUser', ['flarum/Component', 'flarum/components/UserCard', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/userOnline', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, UserCard, avatar, username, userOnline, listItems, PostUser;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsUserCard) {
      UserCard = _flarumComponentsUserCard.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumHelpersUserOnline) {
      userOnline = _flarumHelpersUserOnline.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      PostUser = function (_Component) {
        babelHelpers.inherits(PostUser, _Component);

        function PostUser() {
          babelHelpers.classCallCheck(this, PostUser);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(PostUser).apply(this, arguments));
        }

        babelHelpers.createClass(PostUser, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not the user hover card is visible.
             *
             * @type {Boolean}
             */
            this.cardVisible = false;
          }
        }, {
          key: 'view',
          value: function view() {
            var post = this.props.post;
            var user = post.user();

            if (!user) {
              return m(
                'div',
                { className: 'PostUser' },
                m(
                  'h3',
                  null,
                  avatar(user, { className: 'PostUser-avatar' }),
                  ' ',
                  username(user)
                )
              );
            }

            var card = '';

            if (!post.isHidden() && this.cardVisible) {
              card = UserCard.component({
                user: user,
                className: 'UserCard--popover',
                controlsButtonClassName: 'Button Button--icon Button--flat'
              });
            }

            return m(
              'div',
              { className: 'PostUser' },
              userOnline(user),
              m(
                'h3',
                null,
                m(
                  'a',
                  { href: app.route.user(user), config: m.route },
                  avatar(user, { className: 'PostUser-avatar' }),
                  ' ',
                  username(user)
                )
              ),
              m(
                'ul',
                { className: 'PostUser-badges badges' },
                listItems(user.badges().toArray())
              ),
              card
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            var _this2 = this;

            if (isInitialized) return;

            var timeout = void 0;

            this.$().on('mouseover', 'h3 a, .UserCard', function () {
              clearTimeout(timeout);
              timeout = setTimeout(_this2.showCard.bind(_this2), 500);
            }).on('mouseout', 'h3 a, .UserCard', function () {
              clearTimeout(timeout);
              timeout = setTimeout(_this2.hideCard.bind(_this2), 250);
            });
          }
        }, {
          key: 'showCard',
          value: function showCard() {
            var _this3 = this;

            this.cardVisible = true;

            m.redraw();

            setTimeout(function () {
              return _this3.$('.UserCard').addClass('in');
            });
          }
        }, {
          key: 'hideCard',
          value: function hideCard() {
            var _this4 = this;

            this.$('.UserCard').removeClass('in').one('transitionend webkitTransitionEnd oTransitionEnd', function () {
              _this4.cardVisible = false;
              m.redraw();
            });
          }
        }]);
        return PostUser;
      }(Component);

      _export('default', PostUser);
    }
  };
});;
'use strict';

System.register('flarum/components/ReplyComposer', ['flarum/components/ComposerBody', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/helpers/icon', 'flarum/utils/extractText'], function (_export, _context) {
  var ComposerBody, Alert, Button, icon, extractText, ReplyComposer;


  function minimizeComposerIfFullScreen(e) {
    if (app.composer.isFullScreen()) {
      app.composer.minimize();
      e.stopPropagation();
    }
  }

  /**
   * The `ReplyComposer` component displays the composer content for replying to a
   * discussion.
   *
   * ### Props
   *
   * - All of the props of ComposerBody
   * - `discussion`
   */
  return {
    setters: [function (_flarumComponentsComposerBody) {
      ComposerBody = _flarumComponentsComposerBody.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      ReplyComposer = function (_ComposerBody) {
        babelHelpers.inherits(ReplyComposer, _ComposerBody);

        function ReplyComposer() {
          babelHelpers.classCallCheck(this, ReplyComposer);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ReplyComposer).apply(this, arguments));
        }

        babelHelpers.createClass(ReplyComposer, [{
          key: 'init',
          value: function init() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(ReplyComposer.prototype), 'init', this).call(this);

            this.editor.props.preview = function (e) {
              minimizeComposerIfFullScreen(e);

              m.route(app.route.discussion(_this2.props.discussion, 'reply'));
            };
          }
        }, {
          key: 'headerItems',
          value: function headerItems() {
            var items = babelHelpers.get(Object.getPrototypeOf(ReplyComposer.prototype), 'headerItems', this).call(this);
            var discussion = this.props.discussion;

            var routeAndMinimize = function routeAndMinimize(element, isInitialized) {
              if (isInitialized) return;
              $(element).on('click', minimizeComposerIfFullScreen);
              m.route.apply(this, arguments);
            };

            items.add('title', m(
              'h3',
              null,
              icon('reply'),
              ' ',
              ' ',
              m(
                'a',
                { href: app.route.discussion(discussion), config: routeAndMinimize },
                discussion.title()
              )
            ));

            return items;
          }
        }, {
          key: 'data',
          value: function data() {
            return {
              content: this.content(),
              relationships: { discussion: this.props.discussion }
            };
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {
            var discussion = this.props.discussion;

            this.loading = true;
            m.redraw();

            var data = this.data();

            app.store.createRecord('posts').save(data).then(function (post) {
              // If we're currently viewing the discussion which this reply was made
              // in, then we can update the post stream.
              if (app.viewingDiscussion(discussion)) {
                app.current.stream.update();
              } else {
                (function () {
                  // Otherwise, we'll create an alert message to inform the user that
                  // their reply has been posted, containing a button which will
                  // transition to their new post when clicked.
                  var alert = void 0;
                  var viewButton = Button.component({
                    className: 'Button Button--link',
                    children: app.translator.trans('core.forum.composer_reply.view_button'),
                    onclick: function onclick() {
                      m.route(app.route.post(post));
                      app.alerts.dismiss(alert);
                    }
                  });
                  app.alerts.show(alert = new Alert({
                    type: 'success',
                    message: app.translator.trans('core.forum.composer_reply.posted_message'),
                    controls: [viewButton]
                  }));
                })();
              }

              app.composer.hide();
            }, this.loaded.bind(this));
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(ReplyComposer), 'initProps', this).call(this, props);

            props.placeholder = props.placeholder || extractText(app.translator.trans('core.forum.composer_reply.body_placeholder'));
            props.submitLabel = props.submitLabel || app.translator.trans('core.forum.composer_reply.submit_button');
            props.confirmExit = props.confirmExit || extractText(app.translator.trans('core.forum.composer_reply.discard_confirmation'));
          }
        }]);
        return ReplyComposer;
      }(ComposerBody);

      _export('default', ReplyComposer);
    }
  };
});;
'use strict';

System.register('flarum/components/ReplyPlaceholder', ['flarum/Component', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/utils/DiscussionControls'], function (_export, _context) {
  var Component, avatar, username, DiscussionControls, ReplyPlaceholder;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumUtilsDiscussionControls) {
      DiscussionControls = _flarumUtilsDiscussionControls.default;
    }],
    execute: function () {
      ReplyPlaceholder = function (_Component) {
        babelHelpers.inherits(ReplyPlaceholder, _Component);

        function ReplyPlaceholder() {
          babelHelpers.classCallCheck(this, ReplyPlaceholder);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ReplyPlaceholder).apply(this, arguments));
        }

        babelHelpers.createClass(ReplyPlaceholder, [{
          key: 'view',
          value: function view() {
            var _this2 = this;

            if (app.composingReplyTo(this.props.discussion)) {
              return m(
                'article',
                { className: 'Post CommentPost editing' },
                m(
                  'header',
                  { className: 'Post-header' },
                  m(
                    'div',
                    { className: 'PostUser' },
                    m(
                      'h3',
                      null,
                      avatar(app.session.user, { className: 'PostUser-avatar' }),
                      username(app.session.user)
                    )
                  )
                ),
                m('div', { className: 'Post-body', config: this.configPreview.bind(this) })
              );
            }

            function triggerClick(e) {
              $(this).trigger('click');
              e.preventDefault();
            }

            var reply = function reply() {
              DiscussionControls.replyAction.call(_this2.props.discussion, true);
            };

            return m(
              'article',
              { className: 'Post ReplyPlaceholder', onclick: reply, onmousedown: triggerClick },
              m(
                'header',
                { className: 'Post-header' },
                avatar(app.session.user, { className: 'PostUser-avatar' }),
                ' ',
                app.translator.trans('core.forum.post_stream.reply_placeholder')
              )
            );
          }
        }, {
          key: 'configPreview',
          value: function configPreview(element, isInitialized, context) {
            if (isInitialized) return;

            // Every 50ms, if the composer content has changed, then update the post's
            // body with a preview.
            var preview = void 0;
            var updateInterval = setInterval(function () {
              var content = app.composer.component.content();

              if (preview === content) return;

              preview = content;

              var anchorToBottom = $(window).scrollTop() + $(window).height() >= $(document).height();

              s9e.TextFormatter.preview(preview || '', element);

              if (anchorToBottom) {
                $(window).scrollTop($(document).height());
              }
            }, 50);

            context.onunload = function () {
              return clearInterval(updateInterval);
            };
          }
        }]);
        return ReplyPlaceholder;
      }(Component);

      _export('default', ReplyPlaceholder);
    }
  };
});;
'use strict';

System.register('flarum/components/RequestErrorModal', ['flarum/components/Modal'], function (_export, _context) {
  var Modal, RequestErrorModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }],
    execute: function () {
      RequestErrorModal = function (_Modal) {
        babelHelpers.inherits(RequestErrorModal, _Modal);

        function RequestErrorModal() {
          babelHelpers.classCallCheck(this, RequestErrorModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RequestErrorModal).apply(this, arguments));
        }

        babelHelpers.createClass(RequestErrorModal, [{
          key: 'className',
          value: function className() {
            return 'RequestErrorModal Modal--large';
          }
        }, {
          key: 'title',
          value: function title() {
            return this.props.error.xhr ? this.props.error.xhr.status + ' ' + this.props.error.xhr.statusText : '';
          }
        }, {
          key: 'content',
          value: function content() {
            var responseText = void 0;

            try {
              responseText = JSON.stringify(JSON.parse(this.props.error.responseText), null, 2);
            } catch (e) {
              responseText = this.props.error.responseText;
            }

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'pre',
                null,
                this.props.error.options.method,
                ' ',
                this.props.error.options.url,
                m('br', null),
                m('br', null),
                responseText
              )
            );
          }
        }]);
        return RequestErrorModal;
      }(Modal);

      _export('default', RequestErrorModal);
    }
  };
});;
'use strict';

System.register('flarum/components/Search', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/utils/ItemList', 'flarum/utils/classList', 'flarum/utils/extractText', 'flarum/helpers/icon', 'flarum/components/DiscussionsSearchSource', 'flarum/components/UsersSearchSource'], function (_export, _context) {
  var Component, LoadingIndicator, ItemList, classList, extractText, icon, DiscussionsSearchSource, UsersSearchSource, Search;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumComponentsDiscussionsSearchSource) {
      DiscussionsSearchSource = _flarumComponentsDiscussionsSearchSource.default;
    }, function (_flarumComponentsUsersSearchSource) {
      UsersSearchSource = _flarumComponentsUsersSearchSource.default;
    }],
    execute: function () {
      Search = function (_Component) {
        babelHelpers.inherits(Search, _Component);

        function Search() {
          babelHelpers.classCallCheck(this, Search);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
        }

        babelHelpers.createClass(Search, [{
          key: 'init',
          value: function init() {
            /**
             * The value of the search input.
             *
             * @type {Function}
             */
            this.value = m.prop('');

            /**
             * Whether or not the search input has focus.
             *
             * @type {Boolean}
             */
            this.hasFocus = false;

            /**
             * An array of SearchSources.
             *
             * @type {SearchSource[]}
             */
            this.sources = this.sourceItems().toArray();

            /**
             * The number of sources that are still loading results.
             *
             * @type {Integer}
             */
            this.loadingSources = 0;

            /**
             * A list of queries that have been searched for.
             *
             * @type {Array}
             */
            this.searched = [];

            /**
             * The index of the currently-selected <li> in the results list. This can be
             * a unique string (to account for the fact that an item's position may jump
             * around as new results load), but otherwise it will be numeric (the
             * sequential position within the list).
             *
             * @type {String|Integer}
             */
            this.index = 0;
          }
        }, {
          key: 'view',
          value: function view() {
            var _this2 = this;

            var currentSearch = this.getCurrentSearch();

            // Initialize search input value in the view rather than the constructor so
            // that we have access to app.current.
            if (typeof this.value() === 'undefined') {
              this.value(currentSearch || '');
            }

            return m(
              'div',
              { className: 'Search ' + classList({
                  open: this.value() && this.hasFocus,
                  focused: this.hasFocus,
                  active: !!currentSearch,
                  loading: !!this.loadingSources
                }) },
              m(
                'div',
                { className: 'Search-input' },
                m('input', { className: 'FormControl',
                  placeholder: extractText(app.translator.trans('core.forum.header.search_placeholder')),
                  value: this.value(),
                  oninput: m.withAttr('value', this.value),
                  onfocus: function onfocus() {
                    return _this2.hasFocus = true;
                  },
                  onblur: function onblur() {
                    return _this2.hasFocus = false;
                  } }),
                this.loadingSources ? LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' }) : currentSearch ? m(
                  'button',
                  { className: 'Search-clear Button Button--icon Button--link', onclick: this.clear.bind(this) },
                  icon('times-circle')
                ) : ''
              ),
              m(
                'ul',
                { className: 'Dropdown-menu Search-results' },
                this.value() && this.hasFocus ? this.sources.map(function (source) {
                  return source.view(_this2.value());
                }) : ''
              )
            );
          }
        }, {
          key: 'config',
          value: function config(isInitialized) {
            var _this3 = this;

            // Highlight the item that is currently selected.
            this.setIndex(this.getCurrentNumericIndex());

            if (isInitialized) return;

            var search = this;

            this.$('.Search-results').on('mousedown', function (e) {
              return e.preventDefault();
            }).on('click', function () {
              return _this3.$('input').blur();
            })

            // Whenever the mouse is hovered over a search result, highlight it.
            .on('mouseenter', '> li:not(.Dropdown-header)', function () {
              search.setIndex(search.selectableItems().index(this));
            });

            // Handle navigation key events on the search input.
            this.$('input').on('keydown', function (e) {
              switch (e.which) {
                case 40:case 38:
                  // Down/Up
                  _this3.setIndex(_this3.getCurrentNumericIndex() + (e.which === 40 ? 1 : -1), true);
                  e.preventDefault();
                  break;

                case 13:
                  // Return
                  if (_this3.value()) {
                    m.route(_this3.getItem(_this3.index).find('a').attr('href'));
                  } else {
                    _this3.clear();
                  }
                  _this3.$('input').blur();
                  break;

                case 27:
                  // Escape
                  _this3.clear();
                  break;

                default:
                // no default
              }
            })

            // Handle input key events on the search input, triggering results to
            // load.
            .on('input focus', function () {
              var query = this.value.toLowerCase();

              if (!query) return;

              clearTimeout(search.searchTimeout);
              search.searchTimeout = setTimeout(function () {
                if (search.searched.indexOf(query) !== -1) return;

                if (query.length >= 3) {
                  search.sources.map(function (source) {
                    if (!source.search) return;

                    search.loadingSources++;

                    source.search(query).then(function () {
                      search.loadingSources--;
                      m.redraw();
                    });
                  });
                }

                search.searched.push(query);
                m.redraw();
              }, 250);
            }).on('focus', function () {
              $(this).one('mouseup', function (e) {
                return e.preventDefault();
              }).select();
            });
          }
        }, {
          key: 'getCurrentSearch',
          value: function getCurrentSearch() {
            return app.current && typeof app.current.searching === 'function' && app.current.searching();
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.value('');

            if (this.getCurrentSearch()) {
              app.current.clearSearch();
            } else {
              m.redraw();
            }
          }
        }, {
          key: 'sourceItems',
          value: function sourceItems() {
            var items = new ItemList();

            items.add('discussions', new DiscussionsSearchSource());
            items.add('users', new UsersSearchSource());

            return items;
          }
        }, {
          key: 'selectableItems',
          value: function selectableItems() {
            return this.$('.Search-results > li:not(.Dropdown-header)');
          }
        }, {
          key: 'getCurrentNumericIndex',
          value: function getCurrentNumericIndex() {
            return this.selectableItems().index(this.getItem(this.index));
          }
        }, {
          key: 'getItem',
          value: function getItem(index) {
            var $items = this.selectableItems();
            var $item = $items.filter('[data-index="' + index + '"]');

            if (!$item.length) {
              $item = $items.eq(index);
            }

            return $item;
          }
        }, {
          key: 'setIndex',
          value: function setIndex(index, scrollToItem) {
            var $items = this.selectableItems();
            var $dropdown = $items.parent();

            var fixedIndex = index;
            if (index < 0) {
              fixedIndex = $items.length - 1;
            } else if (index >= $items.length) {
              fixedIndex = 0;
            }

            var $item = $items.removeClass('active').eq(fixedIndex).addClass('active');

            this.index = $item.attr('data-index') || fixedIndex;

            if (scrollToItem) {
              var dropdownScroll = $dropdown.scrollTop();
              var dropdownTop = $dropdown.offset().top;
              var dropdownBottom = dropdownTop + $dropdown.outerHeight();
              var itemTop = $item.offset().top;
              var itemBottom = itemTop + $item.outerHeight();

              var scrollTop = void 0;
              if (itemTop < dropdownTop) {
                scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
              } else if (itemBottom > dropdownBottom) {
                scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
              }

              if (typeof scrollTop !== 'undefined') {
                $dropdown.stop(true).animate({ scrollTop: scrollTop }, 100);
              }
            }
          }
        }]);
        return Search;
      }(Component);

      _export('default', Search);
    }
  };
});;
"use strict";

System.register("flarum/components/SearchSource", [], function (_export, _context) {
  var SearchSource;
  return {
    setters: [],
    execute: function () {
      SearchSource = function () {
        function SearchSource() {
          babelHelpers.classCallCheck(this, SearchSource);
        }

        babelHelpers.createClass(SearchSource, [{
          key: "search",
          value: function search() {}
        }, {
          key: "view",
          value: function view() {}
        }]);
        return SearchSource;
      }();

      _export("default", SearchSource);
    }
  };
});;
'use strict';

System.register('flarum/components/Select', ['flarum/Component', 'flarum/helpers/icon'], function (_export, _context) {
  var Component, icon, Select;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      Select = function (_Component) {
        babelHelpers.inherits(Select, _Component);

        function Select() {
          babelHelpers.classCallCheck(this, Select);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
        }

        babelHelpers.createClass(Select, [{
          key: 'view',
          value: function view() {
            var _props = this.props;
            var options = _props.options;
            var onchange = _props.onchange;
            var value = _props.value;


            return m(
              'span',
              { className: 'Select' },
              m(
                'select',
                { className: 'Select-input FormControl', onchange: onchange ? m.withAttr('value', onchange.bind(this)) : undefined, value: value },
                Object.keys(options).map(function (key) {
                  return m(
                    'option',
                    { value: key },
                    options[key]
                  );
                })
              ),
              icon('sort', { className: 'Select-caret' })
            );
          }
        }]);
        return Select;
      }(Component);

      _export('default', Select);
    }
  };
});;
'use strict';

System.register('flarum/components/SelectDropdown', ['flarum/components/Dropdown', 'flarum/helpers/icon'], function (_export, _context) {
  var Dropdown, icon, SelectDropdown;
  return {
    setters: [function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      SelectDropdown = function (_Dropdown) {
        babelHelpers.inherits(SelectDropdown, _Dropdown);

        function SelectDropdown() {
          babelHelpers.classCallCheck(this, SelectDropdown);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SelectDropdown).apply(this, arguments));
        }

        babelHelpers.createClass(SelectDropdown, [{
          key: 'getButtonContent',
          value: function getButtonContent() {
            var activeChild = this.props.children.filter(function (child) {
              return child.props.active;
            })[0];
            var label = activeChild && activeChild.props.children || this.props.defaultLabel;

            if (label instanceof Array) label = label[0];

            return [m(
              'span',
              { className: 'Button-label' },
              label
            ), icon(this.props.caretIcon, { className: 'Button-caret' })];
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            props.caretIcon = typeof props.caretIcon !== 'undefined' ? props.caretIcon : 'sort';

            babelHelpers.get(Object.getPrototypeOf(SelectDropdown), 'initProps', this).call(this, props);

            props.className += ' Dropdown--select';
          }
        }]);
        return SelectDropdown;
      }(Dropdown);

      _export('default', SelectDropdown);
    }
  };
});;
"use strict";

System.register("flarum/components/Separator", ["flarum/Component"], function (_export, _context) {
  var Component, Separator;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }],
    execute: function () {
      Separator = function (_Component) {
        babelHelpers.inherits(Separator, _Component);

        function Separator() {
          babelHelpers.classCallCheck(this, Separator);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Separator).apply(this, arguments));
        }

        babelHelpers.createClass(Separator, [{
          key: "view",
          value: function view() {
            return m("li", { className: "Dropdown-separator" });
          }
        }]);
        return Separator;
      }(Component);

      Separator.isListItem = true;

      _export("default", Separator);
    }
  };
});;
'use strict';

System.register('flarum/components/SessionDropdown', ['flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/components/Dropdown', 'flarum/components/LinkButton', 'flarum/components/Button', 'flarum/utils/ItemList', 'flarum/components/Separator', 'flarum/models/Group'], function (_export, _context) {
  var avatar, username, Dropdown, LinkButton, Button, ItemList, Separator, Group, SessionDropdown;
  return {
    setters: [function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumModelsGroup) {
      Group = _flarumModelsGroup.default;
    }],
    execute: function () {
      SessionDropdown = function (_Dropdown) {
        babelHelpers.inherits(SessionDropdown, _Dropdown);

        function SessionDropdown() {
          babelHelpers.classCallCheck(this, SessionDropdown);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SessionDropdown).apply(this, arguments));
        }

        babelHelpers.createClass(SessionDropdown, [{
          key: 'view',
          value: function view() {
            this.props.children = this.items().toArray();

            return babelHelpers.get(Object.getPrototypeOf(SessionDropdown.prototype), 'view', this).call(this);
          }
        }, {
          key: 'getButtonContent',
          value: function getButtonContent() {
            var user = app.session.user;

            return [avatar(user), ' ', m(
              'span',
              { className: 'Button-label' },
              username(user)
            )];
          }
        }, {
          key: 'items',
          value: function items() {
            var items = new ItemList();
            var user = app.session.user;

            items.add('profile', LinkButton.component({
              icon: 'user',
              children: app.translator.trans('core.forum.header.profile_button'),
              href: app.route.user(user)
            }), 100);

            items.add('settings', LinkButton.component({
              icon: 'cog',
              children: app.translator.trans('core.forum.header.settings_button'),
              href: app.route('settings')
            }), 50);

            if (user.groups().some(function (group) {
              return group.id() === Group.ADMINISTRATOR_ID;
            })) {
              items.add('administration', LinkButton.component({
                icon: 'wrench',
                children: app.translator.trans('core.forum.header.admin_button'),
                href: app.forum.attribute('baseUrl') + '/admin',
                target: '_blank',
                config: function config() {}
              }), 0);
            }

            items.add('separator', Separator.component(), -90);

            items.add('logOut', Button.component({
              icon: 'sign-out',
              children: app.translator.trans('core.forum.header.log_out_button'),
              onclick: app.session.logout.bind(app.session)
            }), -100);

            return items;
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(SessionDropdown), 'initProps', this).call(this, props);

            props.className = 'SessionDropdown';
            props.buttonClassName = 'Button Button--user Button--flat';
            props.menuClassName = 'Dropdown-menu--right';
          }
        }]);
        return SessionDropdown;
      }(Dropdown);

      _export('default', SessionDropdown);
    }
  };
});;
'use strict';

System.register('flarum/components/SettingsPage', ['flarum/components/UserPage', 'flarum/utils/ItemList', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/components/FieldSet', 'flarum/components/NotificationGrid', 'flarum/components/ChangePasswordModal', 'flarum/components/ChangeEmailModal', 'flarum/helpers/listItems'], function (_export, _context) {
  var UserPage, ItemList, Switch, Button, FieldSet, NotificationGrid, ChangePasswordModal, ChangeEmailModal, listItems, SettingsPage;
  return {
    setters: [function (_flarumComponentsUserPage) {
      UserPage = _flarumComponentsUserPage.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsFieldSet) {
      FieldSet = _flarumComponentsFieldSet.default;
    }, function (_flarumComponentsNotificationGrid) {
      NotificationGrid = _flarumComponentsNotificationGrid.default;
    }, function (_flarumComponentsChangePasswordModal) {
      ChangePasswordModal = _flarumComponentsChangePasswordModal.default;
    }, function (_flarumComponentsChangeEmailModal) {
      ChangeEmailModal = _flarumComponentsChangeEmailModal.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      SettingsPage = function (_UserPage) {
        babelHelpers.inherits(SettingsPage, _UserPage);

        function SettingsPage() {
          babelHelpers.classCallCheck(this, SettingsPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SettingsPage).apply(this, arguments));
        }

        babelHelpers.createClass(SettingsPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(SettingsPage.prototype), 'init', this).call(this);

            this.show(app.session.user);
            app.setTitle(app.translator.trans('core.forum.settings.title'));
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'SettingsPage' },
              m(
                'ul',
                null,
                listItems(this.settingsItems().toArray())
              )
            );
          }
        }, {
          key: 'settingsItems',
          value: function settingsItems() {
            var items = new ItemList();

            items.add('account', FieldSet.component({
              label: app.translator.trans('core.forum.settings.account_heading'),
              className: 'Settings-account',
              children: this.accountItems().toArray()
            }));

            items.add('notifications', FieldSet.component({
              label: app.translator.trans('core.forum.settings.notifications_heading'),
              className: 'Settings-notifications',
              children: this.notificationsItems().toArray()
            }));

            items.add('privacy', FieldSet.component({
              label: app.translator.trans('core.forum.settings.privacy_heading'),
              className: 'Settings-privacy',
              children: this.privacyItems().toArray()
            }));

            return items;
          }
        }, {
          key: 'accountItems',
          value: function accountItems() {
            var items = new ItemList();

            items.add('changePassword', Button.component({
              children: app.translator.trans('core.forum.settings.change_password_button'),
              className: 'Button',
              onclick: function onclick() {
                return app.modal.show(new ChangePasswordModal());
              }
            }));

            items.add('changeEmail', Button.component({
              children: app.translator.trans('core.forum.settings.change_email_button'),
              className: 'Button',
              onclick: function onclick() {
                return app.modal.show(new ChangeEmailModal());
              }
            }));

            return items;
          }
        }, {
          key: 'notificationsItems',
          value: function notificationsItems() {
            var items = new ItemList();

            items.add('notificationGrid', NotificationGrid.component({ user: this.user }));

            return items;
          }
        }, {
          key: 'preferenceSaver',
          value: function preferenceSaver(key) {
            var _this2 = this;

            return function (value, component) {
              if (component) component.loading = true;
              m.redraw();

              _this2.user.savePreferences(babelHelpers.defineProperty({}, key, value)).then(function () {
                if (component) component.loading = false;
                m.redraw();
              });
            };
          }
        }, {
          key: 'privacyItems',
          value: function privacyItems() {
            var _this3 = this;

            var items = new ItemList();

            items.add('discloseOnline', Switch.component({
              children: app.translator.trans('core.forum.settings.privacy_disclose_online_label'),
              state: this.user.preferences().discloseOnline,
              onchange: function onchange(value, component) {
                _this3.user.pushAttributes({ lastSeenTime: null });
                _this3.preferenceSaver('discloseOnline')(value, component);
              }
            }));

            return items;
          }
        }]);
        return SettingsPage;
      }(UserPage);

      _export('default', SettingsPage);
    }
  };
});;
'use strict';

System.register('flarum/components/SignUpModal', ['flarum/components/Modal', 'flarum/components/LogInModal', 'flarum/helpers/avatar', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
  var Modal, LogInModal, avatar, Button, LogInButtons, extractText, SignUpModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      SignUpModal = function (_Modal) {
        babelHelpers.inherits(SignUpModal, _Modal);

        function SignUpModal() {
          babelHelpers.classCallCheck(this, SignUpModal);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SignUpModal).apply(this, arguments));
        }

        babelHelpers.createClass(SignUpModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(SignUpModal.prototype), 'init', this).call(this);

            /**
             * The value of the username input.
             *
             * @type {Function}
             */
            this.username = m.prop(this.props.username || '');

            /**
             * The value of the email input.
             *
             * @type {Function}
             */
            this.email = m.prop(this.props.email || '');

            /**
             * The value of the password input.
             *
             * @type {Function}
             */
            this.password = m.prop(this.props.password || '');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'Modal--small SignUpModal' + (this.welcomeUser ? ' SignUpModal--success' : '');
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.sign_up.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              this.body()
            ), m(
              'div',
              { className: 'Modal-footer' },
              this.footer()
            )];
          }
        }, {
          key: 'body',
          value: function body() {
            return [this.props.token ? '' : m(LogInButtons, null), m(
              'div',
              { className: 'Form Form--centered' },
              m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl', name: 'username', type: 'text', placeholder: extractText(app.translator.trans('core.forum.sign_up.username_placeholder')),
                  value: this.username(),
                  onchange: m.withAttr('value', this.username),
                  disabled: this.loading })
              ),
              m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl', name: 'email', type: 'email', placeholder: extractText(app.translator.trans('core.forum.sign_up.email_placeholder')),
                  value: this.email(),
                  onchange: m.withAttr('value', this.email),
                  disabled: this.loading || this.props.token && this.props.email })
              ),
              this.props.token ? '' : m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.sign_up.password_placeholder')),
                  value: this.password(),
                  onchange: m.withAttr('value', this.password),
                  disabled: this.loading })
              ),
              m(
                'div',
                { className: 'Form-group' },
                m(
                  Button,
                  {
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading },
                  app.translator.trans('core.forum.sign_up.submit_button')
                )
              )
            )];
          }
        }, {
          key: 'footer',
          value: function footer() {
            return [m(
              'p',
              { className: 'SignUpModal-logIn' },
              app.translator.trans('core.forum.sign_up.log_in_text', { a: m('a', { onclick: this.logIn.bind(this) }) })
            )];
          }
        }, {
          key: 'logIn',
          value: function logIn() {
            var props = {
              email: this.email() || this.username(),
              password: this.password()
            };

            app.modal.show(new LogInModal(props));
          }
        }, {
          key: 'onready',
          value: function onready() {
            if (this.props.username && !this.props.email) {
              this.$('[name=email]').select();
            } else {
              this.$('[name=username]').select();
            }
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            var data = this.submitData();

            app.request({
              url: app.forum.attribute('baseUrl') + '/register',
              method: 'POST',
              data: data,
              errorHandler: this.onerror.bind(this)
            }).then(function () {
              return window.location.reload();
            }, this.loaded.bind(this));
          }
        }, {
          key: 'submitData',
          value: function submitData() {
            var data = {
              username: this.username(),
              email: this.email()
            };

            if (this.props.token) {
              data.token = this.props.token;
            } else {
              data.password = this.password();
            }

            if (this.props.avatarUrl) {
              data.avatarUrl = this.props.avatarUrl;
            }

            return data;
          }
        }]);
        return SignUpModal;
      }(Modal);

      _export('default', SignUpModal);
    }
  };
});;
'use strict';

System.register('flarum/components/SplitDropdown', ['flarum/components/Dropdown', 'flarum/components/Button', 'flarum/helpers/icon'], function (_export, _context) {
  var Dropdown, Button, icon, SplitDropdown;
  return {
    setters: [function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      SplitDropdown = function (_Dropdown) {
        babelHelpers.inherits(SplitDropdown, _Dropdown);

        function SplitDropdown() {
          babelHelpers.classCallCheck(this, SplitDropdown);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SplitDropdown).apply(this, arguments));
        }

        babelHelpers.createClass(SplitDropdown, [{
          key: 'getButton',
          value: function getButton() {
            // Make a copy of the props of the first child component. We will assign
            // these props to a new button, so that it has exactly the same behaviour as
            // the first child.
            var firstChild = this.getFirstChild();
            var buttonProps = babelHelpers.extends({}, firstChild.props);
            buttonProps.className = (buttonProps.className || '') + ' SplitDropdown-button Button ' + this.props.buttonClassName;

            return [Button.component(buttonProps), m(
              'button',
              {
                className: 'Dropdown-toggle Button Button--icon ' + this.props.buttonClassName,
                'data-toggle': 'dropdown' },
              icon(this.props.icon, { className: 'Button-icon' }),
              icon('caret-down', { className: 'Button-caret' })
            )];
          }
        }, {
          key: 'getFirstChild',
          value: function getFirstChild() {
            var firstChild = this.props.children;

            while (firstChild instanceof Array) {
              firstChild = firstChild[0];
            }return firstChild;
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(SplitDropdown), 'initProps', this).call(this, props);

            props.className += ' Dropdown--split';
            props.menuClassName += ' Dropdown-menu--right';
          }
        }]);
        return SplitDropdown;
      }(Dropdown);

      _export('default', SplitDropdown);
    }
  };
});;
'use strict';

System.register('flarum/components/Switch', ['flarum/components/Checkbox'], function (_export, _context) {
  var Checkbox, Switch;
  return {
    setters: [function (_flarumComponentsCheckbox) {
      Checkbox = _flarumComponentsCheckbox.default;
    }],
    execute: function () {
      Switch = function (_Checkbox) {
        babelHelpers.inherits(Switch, _Checkbox);

        function Switch() {
          babelHelpers.classCallCheck(this, Switch);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
        }

        babelHelpers.createClass(Switch, [{
          key: 'getDisplay',
          value: function getDisplay() {
            return this.loading ? babelHelpers.get(Object.getPrototypeOf(Switch.prototype), 'getDisplay', this).call(this) : '';
          }
        }], [{
          key: 'initProps',
          value: function initProps(props) {
            babelHelpers.get(Object.getPrototypeOf(Switch), 'initProps', this).call(this, props);

            props.className = (props.className || '') + ' Checkbox--switch';
          }
        }]);
        return Switch;
      }(Checkbox);

      _export('default', Switch);
    }
  };
});;
'use strict';

System.register('flarum/components/TerminalPost', ['flarum/Component', 'flarum/helpers/humanTime', 'flarum/helpers/icon'], function (_export, _context) {
  var Component, humanTime, icon, TerminalPost;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumHelpersHumanTime) {
      humanTime = _flarumHelpersHumanTime.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {
      TerminalPost = function (_Component) {
        babelHelpers.inherits(TerminalPost, _Component);

        function TerminalPost() {
          babelHelpers.classCallCheck(this, TerminalPost);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TerminalPost).apply(this, arguments));
        }

        babelHelpers.createClass(TerminalPost, [{
          key: 'view',
          value: function view() {
            var discussion = this.props.discussion;
            var lastPost = this.props.lastPost && discussion.repliesCount();

            var user = discussion[lastPost ? 'lastUser' : 'startUser']();
            var time = discussion[lastPost ? 'lastTime' : 'startTime']();

            return m(
              'span',
              null,
              lastPost ? icon('reply') : '',
              ' ',
              app.translator.trans('core.forum.discussion_list.' + (lastPost ? 'replied' : 'started') + '_text', {
                user: user,
                ago: humanTime(time)
              })
            );
          }
        }]);
        return TerminalPost;
      }(Component);

      _export('default', TerminalPost);
    }
  };
});;
'use strict';

System.register('flarum/components/TextEditor', ['flarum/Component', 'flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/Button'], function (_export, _context) {
  var Component, ItemList, listItems, Button, TextEditor;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      TextEditor = function (_Component) {
        babelHelpers.inherits(TextEditor, _Component);

        function TextEditor() {
          babelHelpers.classCallCheck(this, TextEditor);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TextEditor).apply(this, arguments));
        }

        babelHelpers.createClass(TextEditor, [{
          key: 'init',
          value: function init() {
            /**
             * The value of the textarea.
             *
             * @type {String}
             */
            this.value = m.prop(this.props.value || '');
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'TextEditor' },
              m('textarea', { className: 'FormControl Composer-flexible',
                config: this.configTextarea.bind(this),
                oninput: m.withAttr('value', this.oninput.bind(this)),
                placeholder: this.props.placeholder || '',
                disabled: !!this.props.disabled,
                value: this.value() }),
              m(
                'ul',
                { className: 'TextEditor-controls Composer-footer' },
                listItems(this.controlItems().toArray())
              )
            );
          }
        }, {
          key: 'configTextarea',
          value: function configTextarea(element, isInitialized) {
            var _this2 = this;

            if (isInitialized) return;

            var handler = function handler() {
              _this2.onsubmit();
              m.redraw();
            };

            $(element).bind('keydown', 'meta+return', handler);
            $(element).bind('keydown', 'ctrl+return', handler);
          }
        }, {
          key: 'controlItems',
          value: function controlItems() {
            var items = new ItemList();

            items.add('submit', Button.component({
              children: this.props.submitLabel,
              icon: 'check',
              className: 'Button Button--primary',
              itemClassName: 'App-primaryControl',
              onclick: this.onsubmit.bind(this)
            }));

            if (this.props.preview) {
              items.add('preview', Button.component({
                icon: 'eye',
                className: 'Button Button--icon',
                onclick: this.props.preview
              }));
            }

            return items;
          }
        }, {
          key: 'setValue',
          value: function setValue(value) {
            this.$('textarea').val(value).trigger('input');
          }
        }, {
          key: 'setSelectionRange',
          value: function setSelectionRange(start, end) {
            var $textarea = this.$('textarea');

            $textarea[0].setSelectionRange(start, end);
            $textarea.focus();
          }
        }, {
          key: 'getSelectionRange',
          value: function getSelectionRange() {
            var $textarea = this.$('textarea');

            return [$textarea[0].selectionStart, $textarea[0].selectionEnd];
          }
        }, {
          key: 'insertAtCursor',
          value: function insertAtCursor(insert) {
            var textarea = this.$('textarea')[0];
            var value = this.value();
            var index = textarea ? textarea.selectionStart : value.length;

            this.setValue(value.slice(0, index) + insert + value.slice(index));

            // Move the textarea cursor to the end of the content we just inserted.
            if (textarea) {
              var pos = index + insert.length;
              this.setSelectionRange(pos, pos);
            }
          }
        }, {
          key: 'oninput',
          value: function oninput(value) {
            this.value(value);

            this.props.onchange(this.value());

            m.redraw.strategy('none');
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit() {
            this.props.onsubmit(this.value());
          }
        }]);
        return TextEditor;
      }(Component);

      _export('default', TextEditor);
    }
  };
});;
'use strict';

System.register('flarum/components/UserBio', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/utils/classList', 'flarum/utils/extractText'], function (_export, _context) {
  var Component, LoadingIndicator, classList, extractText, UserBio;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      UserBio = function (_Component) {
        babelHelpers.inherits(UserBio, _Component);

        function UserBio() {
          babelHelpers.classCallCheck(this, UserBio);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(UserBio).apply(this, arguments));
        }

        babelHelpers.createClass(UserBio, [{
          key: 'init',
          value: function init() {
            /**
             * Whether or not the bio is currently being edited.
             *
             * @type {Boolean}
             */
            this.editing = false;

            /**
             * Whether or not the bio is currently being saved.
             *
             * @type {Boolean}
             */
            this.loading = false;
          }
        }, {
          key: 'view',
          value: function view() {
            var user = this.props.user;
            var content = void 0;

            if (this.editing) {
              content = m('textarea', { className: 'FormControl', placeholder: extractText(app.translator.trans('core.forum.user.bio_placeholder')), rows: '3', value: user.bio() });
            } else {
              var subContent = void 0;

              if (this.loading) {
                subContent = m(
                  'p',
                  { className: 'UserBio-placeholder' },
                  LoadingIndicator.component({ size: 'tiny' })
                );
              } else {
                var bioHtml = user.bioHtml();

                if (bioHtml) {
                  subContent = m.trust(bioHtml);
                } else if (this.props.editable) {
                  subContent = m(
                    'p',
                    { className: 'UserBio-placeholder' },
                    app.translator.trans('core.forum.user.bio_placeholder')
                  );
                }
              }

              content = m(
                'div',
                { className: 'UserBio-content' },
                subContent
              );
            }

            return m(
              'div',
              { className: 'UserBio ' + classList({
                  editable: this.props.editable,
                  editing: this.editing
                }),
                onclick: this.edit.bind(this) },
              content
            );
          }
        }, {
          key: 'edit',
          value: function edit() {
            if (!this.props.editable) return;

            this.editing = true;
            m.redraw();

            var bio = this;
            var save = function save(e) {
              if (e.shiftKey) return;
              e.preventDefault();
              bio.save($(this).val());
            };

            this.$('textarea').focus().bind('blur', save).bind('keydown', 'return', save);
          }
        }, {
          key: 'save',
          value: function save(value) {
            var _this2 = this;

            var user = this.props.user;

            if (user.bio() !== value) {
              this.loading = true;

              user.save({ bio: value }).catch(function () {}).then(function () {
                _this2.loading = false;
                m.redraw();
              });
            }

            this.editing = false;
            m.redraw();
          }
        }]);
        return UserBio;
      }(Component);

      _export('default', UserBio);
    }
  };
});;
'use strict';

System.register('flarum/components/UserCard', ['flarum/Component', 'flarum/utils/humanTime', 'flarum/utils/ItemList', 'flarum/utils/UserControls', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/icon', 'flarum/components/Dropdown', 'flarum/components/UserBio', 'flarum/components/AvatarEditor', 'flarum/helpers/listItems'], function (_export, _context) {
  var Component, humanTime, ItemList, UserControls, avatar, username, icon, Dropdown, UserBio, AvatarEditor, listItems, UserCard;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumUtilsHumanTime) {
      humanTime = _flarumUtilsHumanTime.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsUserControls) {
      UserControls = _flarumUtilsUserControls.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumComponentsDropdown) {
      Dropdown = _flarumComponentsDropdown.default;
    }, function (_flarumComponentsUserBio) {
      UserBio = _flarumComponentsUserBio.default;
    }, function (_flarumComponentsAvatarEditor) {
      AvatarEditor = _flarumComponentsAvatarEditor.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      UserCard = function (_Component) {
        babelHelpers.inherits(UserCard, _Component);

        function UserCard() {
          babelHelpers.classCallCheck(this, UserCard);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(UserCard).apply(this, arguments));
        }

        babelHelpers.createClass(UserCard, [{
          key: 'view',
          value: function view() {
            var user = this.props.user;
            var controls = UserControls.controls(user, this).toArray();
            var color = user.color();
            var badges = user.badges().toArray();

            return m(
              'div',
              { className: 'UserCard ' + (this.props.className || ''),
                style: color ? { backgroundColor: color } : '' },
              m(
                'div',
                { className: 'darkenBackground' },
                m(
                  'div',
                  { className: 'container' },
                  controls.length ? Dropdown.component({
                    children: controls,
                    className: 'UserCard-controls App-primaryControl',
                    menuClassName: 'Dropdown-menu--right',
                    buttonClassName: this.props.controlsButtonClassName,
                    label: app.translator.trans('core.forum.user_controls.button'),
                    icon: 'ellipsis-v'
                  }) : '',
                  m(
                    'div',
                    { className: 'UserCard-profile' },
                    m(
                      'h2',
                      { className: 'UserCard-identity' },
                      this.props.editable ? [AvatarEditor.component({ user: user, className: 'UserCard-avatar' }), username(user)] : m(
                        'a',
                        { href: app.route.user(user), config: m.route },
                        m(
                          'div',
                          { className: 'UserCard-avatar' },
                          avatar(user)
                        ),
                        username(user)
                      )
                    ),
                    badges.length ? m(
                      'ul',
                      { className: 'UserCard-badges badges' },
                      listItems(badges)
                    ) : '',
                    m(
                      'ul',
                      { className: 'UserCard-info' },
                      listItems(this.infoItems().toArray())
                    )
                  )
                )
              )
            );
          }
        }, {
          key: 'infoItems',
          value: function infoItems() {
            var items = new ItemList();
            var user = this.props.user;
            var lastSeenTime = user.lastSeenTime();

            items.add('bio', UserBio.component({
              user: user,
              editable: this.props.editable
            }));

            if (lastSeenTime) {
              var online = user.isOnline();

              items.add('lastSeen', m(
                'span',
                { className: 'UserCard-lastSeen' + (online ? ' online' : '') },
                online ? [icon('circle'), ' ', app.translator.trans('core.forum.user.online_text')] : [icon('clock-o'), ' ', humanTime(lastSeenTime)]
              ));
            }

            items.add('joined', app.translator.trans('core.forum.user.joined_date_text', { ago: humanTime(user.joinTime()) }));

            return items;
          }
        }]);
        return UserCard;
      }(Component);

      _export('default', UserCard);
    }
  };
});;
'use strict';

System.register('flarum/components/UserPage', ['flarum/components/Page', 'flarum/utils/ItemList', 'flarum/utils/affixSidebar', 'flarum/components/UserCard', 'flarum/components/LoadingIndicator', 'flarum/components/SelectDropdown', 'flarum/components/LinkButton', 'flarum/components/Separator', 'flarum/helpers/listItems'], function (_export, _context) {
  var Page, ItemList, affixSidebar, UserCard, LoadingIndicator, SelectDropdown, LinkButton, Separator, listItems, UserPage;
  return {
    setters: [function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsAffixSidebar) {
      affixSidebar = _flarumUtilsAffixSidebar.default;
    }, function (_flarumComponentsUserCard) {
      UserCard = _flarumComponentsUserCard.default;
    }, function (_flarumComponentsLoadingIndicator) {
      LoadingIndicator = _flarumComponentsLoadingIndicator.default;
    }, function (_flarumComponentsSelectDropdown) {
      SelectDropdown = _flarumComponentsSelectDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems.default;
    }],
    execute: function () {
      UserPage = function (_Page) {
        babelHelpers.inherits(UserPage, _Page);

        function UserPage() {
          babelHelpers.classCallCheck(this, UserPage);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(UserPage).apply(this, arguments));
        }

        babelHelpers.createClass(UserPage, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(Object.getPrototypeOf(UserPage.prototype), 'init', this).call(this);

            /**
             * The user this page is for.
             *
             * @type {User}
             */
            this.user = null;

            app.history.push('user');

            this.bodyClass = 'App--user';
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'UserPage' },
              this.user ? [UserCard.component({
                user: this.user,
                className: 'Hero UserHero',
                editable: this.user.canEdit() || this.user === app.session.user,
                controlsButtonClassName: 'Button'
              }), m(
                'div',
                { className: 'container' },
                m(
                  'nav',
                  { className: 'sideNav UserPage-nav', config: affixSidebar },
                  m(
                    'ul',
                    null,
                    listItems(this.sidebarItems().toArray())
                  )
                ),
                m(
                  'div',
                  { className: 'sideNavOffset UserPage-content' },
                  this.content()
                )
              )] : [LoadingIndicator.component({ className: 'LoadingIndicator--block' })]
            );
          }
        }, {
          key: 'content',
          value: function content() {}
        }, {
          key: 'show',
          value: function show(user) {
            this.user = user;

            app.history.push('user', user.username());
            app.setTitle(user.username());

            m.redraw();
          }
        }, {
          key: 'loadUser',
          value: function loadUser(username) {
            var _this2 = this;

            var lowercaseUsername = username.toLowerCase();

            app.store.all('users').some(function (user) {
              if (user.username().toLowerCase() === lowercaseUsername && user.joinTime()) {
                _this2.show(user);
                return true;
              }
            });

            if (!this.user) {
              app.store.find('users', username).then(this.show.bind(this));
            }
          }
        }, {
          key: 'sidebarItems',
          value: function sidebarItems() {
            var items = new ItemList();

            items.add('nav', SelectDropdown.component({
              children: this.navItems().toArray(),
              className: 'App-titleControl',
              buttonClassName: 'Button'
            }));

            return items;
          }
        }, {
          key: 'navItems',
          value: function navItems() {
            var items = new ItemList();
            var user = this.user;

            items.add('posts', LinkButton.component({
              href: app.route('user.posts', { username: user.username() }),
              children: [app.translator.trans('core.forum.user.posts_link'), m(
                'span',
                { className: 'Button-badge' },
                user.commentsCount()
              )],
              icon: 'comment-o'
            }), 100);

            items.add('discussions', LinkButton.component({
              href: app.route('user.discussions', { username: user.username() }),
              children: [app.translator.trans('core.forum.user.discussions_link'), m(
                'span',
                { className: 'Button-badge' },
                user.discussionsCount()
              )],
              icon: 'reorder'
            }), 90);

            if (app.session.user === user) {
              items.add('separator', Separator.component(), -90);
              items.add('settings', LinkButton.component({
                href: app.route('settings'),
                children: app.translator.trans('core.forum.user.settings_link'),
                icon: 'cog'
              }), -100);
            }

            return items;
          }
        }]);
        return UserPage;
      }(Page);

      _export('default', UserPage);
    }
  };
});;
'use strict';

System.register('flarum/components/UsersSearchSource', ['flarum/helpers/highlight', 'flarum/helpers/avatar', 'flarum/helpers/username'], function (_export, _context) {
  var highlight, avatar, username, UsersSearchResults;
  return {
    setters: [function (_flarumHelpersHighlight) {
      highlight = _flarumHelpersHighlight.default;
    }, function (_flarumHelpersAvatar) {
      avatar = _flarumHelpersAvatar.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }],
    execute: function () {
      UsersSearchResults = function () {
        function UsersSearchResults() {
          babelHelpers.classCallCheck(this, UsersSearchResults);
        }

        babelHelpers.createClass(UsersSearchResults, [{
          key: 'search',
          value: function search(query) {
            return app.store.find('users', {
              filter: { q: query },
              page: { limit: 5 }
            });
          }
        }, {
          key: 'view',
          value: function view(query) {
            var results = app.store.all('users').filter(function (user) {
              return user.username().toLowerCase().substr(0, query.length) === query;
            });

            if (!results.length) return '';

            return [m(
              'li',
              { className: 'Dropdown-header' },
              app.translator.trans('core.forum.search.users_heading')
            ), results.map(function (user) {
              var name = username(user);
              name.children[0] = highlight(name.children[0], query);

              return m(
                'li',
                { className: 'UserSearchResult', 'data-index': 'users' + user.id() },
                m(
                  'a',
                  { href: app.route.user(user), config: m.route },
                  avatar(user),
                  name
                )
              );
            })];
          }
        }]);
        return UsersSearchResults;
      }();

      _export('default', UsersSearchResults);
    }
  };
});;
'use strict';

System.register('flarum/components/WelcomeHero', ['flarum/Component', 'flarum/components/Button'], function (_export, _context) {
  var Component, Button, WelcomeHero;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }],
    execute: function () {
      WelcomeHero = function (_Component) {
        babelHelpers.inherits(WelcomeHero, _Component);

        function WelcomeHero() {
          babelHelpers.classCallCheck(this, WelcomeHero);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(WelcomeHero).apply(this, arguments));
        }

        babelHelpers.createClass(WelcomeHero, [{
          key: 'init',
          value: function init() {
            this.hidden = localStorage.getItem('welcomeHidden');
          }
        }, {
          key: 'view',
          value: function view() {
            var _this2 = this;

            if (this.hidden) return m('div', null);

            var slideUp = function slideUp() {
              _this2.$().slideUp(_this2.hide.bind(_this2));
            };

            return m(
              'header',
              { className: 'Hero WelcomeHero' },
              m(
                'div',
                { 'class': 'container' },
                Button.component({
                  icon: 'times',
                  onclick: slideUp,
                  className: 'Hero-close Button Button--icon Button--link'
                }),
                m(
                  'div',
                  { className: 'containerNarrow' },
                  m(
                    'h2',
                    { className: 'Hero-title' },
                    app.forum.attribute('welcomeTitle')
                  ),
                  m(
                    'div',
                    { className: 'Hero-subtitle' },
                    m.trust(app.forum.attribute('welcomeMessage'))
                  )
                )
              )
            );
          }
        }, {
          key: 'hide',
          value: function hide() {
            localStorage.setItem('welcomeHidden', 'true');

            this.hidden = true;
          }
        }]);
        return WelcomeHero;
      }(Component);

      _export('default', WelcomeHero);
    }
  };
});;
"use strict";

System.register("flarum/extend", [], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      /**
       * Extend an object's method by running its output through a mutating callback
       * every time it is called.
       *
       * The callback accepts the method's return value and should perform any
       * mutations directly on this value. For this reason, this function will not be
       * effective on methods which return scalar values (numbers, strings, booleans).
       *
       * Care should be taken to extend the correct object – in most cases, a class'
       * prototype will be the desired target of extension, not the class itself.
       *
       * @example
       * extend(Discussion.prototype, 'badges', function(badges) {
       *   // do something with `badges`
       * });
       *
       * @param {Object} object The object that owns the method
       * @param {String} method The name of the method to extend
       * @param {function} callback A callback which mutates the method's output
       */
      function extend(object, method, callback) {
        var original = object[method];

        object[method] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var value = original ? original.apply(this, args) : undefined;

          callback.apply(this, [value].concat(args));

          return value;
        };

        babelHelpers.extends(object[method], original);
      }

      /**
       * Override an object's method by replacing it with a new function, so that the
       * new function will be run every time the object's method is called.
       *
       * The replacement function accepts the original method as its first argument,
       * which is like a call to 'super'. Any arguments passed to the original method
       * are also passed to the replacement.
       *
       * Care should be taken to extend the correct object – in most cases, a class'
       * prototype will be the desired target of extension, not the class itself.
       *
       * @example
       * override(Discussion.prototype, 'badges', function(original) {
       *   const badges = original();
       *   // do something with badges
       *   return badges;
       * });
       *
       * @param {Object} object The object that owns the method
       * @param {String} method The name of the method to override
       * @param {function} newMethod The method to replace it with
       */

      _export("extend", extend);

      function override(object, method, newMethod) {
        var original = object[method];

        object[method] = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return newMethod.apply(this, [original.bind(this)].concat(args));
        };

        babelHelpers.extends(object[method], original);
      }

      _export("override", override);
    }
  };
});;
'use strict';

System.register('flarum/ForumApp', ['flarum/utils/History', 'flarum/App', 'flarum/components/Search', 'flarum/components/Composer', 'flarum/components/ReplyComposer', 'flarum/components/DiscussionPage', 'flarum/components/SignUpModal'], function (_export, _context) {
  var History, App, Search, Composer, ReplyComposer, DiscussionPage, SignUpModal, ForumApp;
  return {
    setters: [function (_flarumUtilsHistory) {
      History = _flarumUtilsHistory.default;
    }, function (_flarumApp) {
      App = _flarumApp.default;
    }, function (_flarumComponentsSearch) {
      Search = _flarumComponentsSearch.default;
    }, function (_flarumComponentsComposer) {
      Composer = _flarumComponentsComposer.default;
    }, function (_flarumComponentsReplyComposer) {
      ReplyComposer = _flarumComponentsReplyComposer.default;
    }, function (_flarumComponentsDiscussionPage) {
      DiscussionPage = _flarumComponentsDiscussionPage.default;
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }],
    execute: function () {
      ForumApp = function (_App) {
        babelHelpers.inherits(ForumApp, _App);

        function ForumApp() {
          var _Object$getPrototypeO;

          babelHelpers.classCallCheck(this, ForumApp);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var _this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ForumApp)).call.apply(_Object$getPrototypeO, [this].concat(args)));

          /**
           * The app's history stack, which keeps track of which routes the user visits
           * so that they can easily navigate back to the previous route.
           *
           * @type {History}
           */
          _this.history = new History();

          /**
           * An object which controls the state of the page's side pane.
           *
           * @type {Pane}
           */
          _this.pane = null;

          /**
           * The page's search component instance.
           *
           * @type {SearchBox}
           */
          _this.search = new Search();

          /**
           * An object which controls the state of the page's drawer.
           *
           * @type {Drawer}
           */
          _this.drawer = null;

          /**
           * A map of post types to their components.
           *
           * @type {Object}
           */
          _this.postComponents = {};

          /**
           * A map of notification types to their components.
           *
           * @type {Object}
           */
          _this.notificationComponents = {};
          return _this;
        }

        /**
         * Check whether or not the user is currently composing a reply to a
         * discussion.
         *
         * @param {Discussion} discussion
         * @return {Boolean}
         */


        babelHelpers.createClass(ForumApp, [{
          key: 'composingReplyTo',
          value: function composingReplyTo(discussion) {
            return this.composer.component instanceof ReplyComposer && this.composer.component.props.discussion === discussion && this.composer.position !== Composer.PositionEnum.HIDDEN;
          }
        }, {
          key: 'viewingDiscussion',
          value: function viewingDiscussion(discussion) {
            return this.current instanceof DiscussionPage && this.current.discussion === discussion;
          }
        }, {
          key: 'authenticationComplete',
          value: function authenticationComplete(payload) {
            if (payload.authenticated) {
              window.location.reload();
            } else {
              var modal = new SignUpModal(payload);
              this.modal.show(modal);
              modal.$('[name=password]').focus();
            }
          }
        }]);
        return ForumApp;
      }(App);

      _export('default', ForumApp);
    }
  };
});;
'use strict';

System.register('flarum/helpers/avatar', [], function (_export, _context) {
  function avatar(user) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    attrs.className = 'Avatar ' + (attrs.className || '');
    var content = '';

    // If the `title` attribute is set to null or false, we don't want to give the
    // avatar a title. On the other hand, if it hasn't been given at all, we can
    // safely default it to the user's username.
    var hasTitle = attrs.title === 'undefined' || attrs.title;
    if (!hasTitle) delete attrs.title;

    // If a user has been passed, then we will set up an avatar using their
    // uploaded image, or the first letter of their username if they haven't
    // uploaded one.
    if (user) {
      var username = user.username() || '?';
      var avatarUrl = user.avatarUrl();

      if (hasTitle) attrs.title = attrs.title || username;

      if (avatarUrl) {
        return m('img', babelHelpers.extends({}, attrs, { src: avatarUrl }));
      }

      content = username.charAt(0).toUpperCase();
      attrs.style = { background: user.color() };
    }

    return m(
      'span',
      attrs,
      content
    );
  }

  _export('default', avatar);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/fullTime', [], function (_export, _context) {
  function fullTime(time) {
    var mo = moment(time);

    var datetime = mo.format();
    var full = mo.format('LLLL');

    return m(
      'time',
      { pubdate: true, datetime: datetime },
      full
    );
  }

  _export('default', fullTime);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/highlight', ['flarum/utils/string'], function (_export, _context) {
  var truncate;
  function highlight(string, phrase, length) {
    if (!phrase && !length) return string;

    // Convert the word phrase into a global regular expression (if it isn't
    // already) so we can search the string for matched.
    var regexp = phrase instanceof RegExp ? phrase : new RegExp(phrase, 'gi');

    var highlighted = string;
    var start = 0;

    // If a length was given, the truncate the string surrounding the first match.
    if (length) {
      if (phrase) start = Math.max(0, string.search(regexp) - length / 2);

      highlighted = truncate(highlighted, length, start);
    }

    // Convert the string into HTML entities, then highlight all matches with
    // <mark> tags. Then we will return the result as a trusted HTML string.
    highlighted = $('<div/>').text(highlighted).html();

    if (phrase) highlighted = highlighted.replace(regexp, '<mark>$&</mark>');

    return m.trust(highlighted);
  }

  _export('default', highlight);

  return {
    setters: [function (_flarumUtilsString) {
      truncate = _flarumUtilsString.truncate;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/humanTime', ['flarum/utils/humanTime'], function (_export, _context) {
  var humanTimeUtil;
  function humanTime(time) {
    var mo = moment(time);

    var datetime = mo.format();
    var full = mo.format('LLLL');
    var ago = humanTimeUtil(time);

    return m(
      'time',
      { pubdate: true, datetime: datetime, title: full, 'data-humantime': true },
      ago
    );
  }

  _export('default', humanTime);

  return {
    setters: [function (_flarumUtilsHumanTime) {
      humanTimeUtil = _flarumUtilsHumanTime.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/icon', [], function (_export, _context) {
  function icon(name) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    attrs.className = 'icon fa fa-fw fa-' + name + ' ' + (attrs.className || '');

    return m('i', attrs);
  }

  _export('default', icon);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/listItems', ['flarum/components/Separator', 'flarum/utils/classList'], function (_export, _context) {
  var Separator, classList;


  function isSeparator(item) {
    return item && item.component === Separator;
  }

  function withoutUnnecessarySeparators(items) {
    var newItems = [];
    var prevItem = void 0;

    items.forEach(function (item, i) {
      if (!isSeparator(item) || prevItem && !isSeparator(prevItem) && i !== items.length - 1) {
        prevItem = item;
        newItems.push(item);
      }
    });

    return newItems;
  }

  /**
   * The `listItems` helper wraps a collection of components in <li> tags,
   * stripping out any unnecessary `Separator` components.
   *
   * @param {*} items
   * @return {Array}
   */
  function listItems(items) {
    if (!(items instanceof Array)) items = [items];

    return withoutUnnecessarySeparators(items).map(function (item) {
      var isListItem = item.component && item.component.isListItem;
      var active = item.component && item.component.isActive && item.component.isActive(item.props);
      var className = item.props ? item.props.itemClassName : item.itemClassName;

      if (isListItem) {
        item.attrs = item.attrs || {};
        item.attrs.key = item.attrs.key || item.itemName;
      }

      var space = new String(' ');
      space.attrs = { key: '_space_' + item.itemName };

      return [isListItem ? item : m(
        'li',
        { className: classList([item.itemName ? 'item-' + item.itemName : '', className, active ? 'active' : '']),
          key: item.itemName },
        item
      ), space];
    });
  }

  _export('default', listItems);

  return {
    setters: [function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumUtilsClassList) {
      classList = _flarumUtilsClassList.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/punctuateSeries', [], function (_export, _context) {
  function punctuateSeries(items) {
    if (items.length === 2) {
      return app.translator.trans('core.lib.series.two_text', {
        first: items[0],
        second: items[1]
      });
    } else if (items.length >= 3) {
      // If there are three or more items, we will join all but the first and
      // last items with the equivalent of a comma, and then we will feed that
      // into the translator along with the first and last item.
      var second = items.slice(1, items.length - 1).reduce(function (list, item) {
        return list.concat([item, app.translator.trans('core.lib.series.glue_text')]);
      }, []).slice(0, -1);

      return app.translator.trans('core.lib.series.three_text', {
        first: items[0],
        second: second,
        third: items[items.length - 1]
      });
    }

    return items;
  }

  _export('default', punctuateSeries);

  return {
    setters: [],
    execute: function () {}
  };
});;
"use strict";

System.register("flarum/helpers/username", [], function (_export, _context) {
  function username(user) {
    var name = user && user.username() || app.translator.trans('core.lib.username.deleted_text');

    return m(
      "span",
      { className: "username" },
      name
    );
  }

  _export("default", username);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/helpers/userOnline', ['flarum/helpers/icon'], function (_export, _context) {
    var icon;
    function userOnline(user) {
        if (user.lastSeenTime() && user.isOnline()) {
            return m(
                'span',
                { className: 'UserOnline' },
                icon('circle')
            );
        }
    }

    _export('default', userOnline);

    return {
        setters: [function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flarum/initializers/alertEmailConfirmation', ['flarum/components/Alert', 'flarum/components/Button', 'flarum/helpers/icon'], function (_export, _context) {
  var Alert, Button, icon;
  function alertEmailConfirmation(app) {
    var user = app.session.user;

    if (!user || user.isActivated()) return;

    var resendButton = Button.component({
      className: 'Button Button--link',
      children: app.translator.trans('core.forum.user_email_confirmation.resend_button'),
      onclick: function onclick() {
        resendButton.props.loading = true;
        m.redraw();

        app.request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/users/' + user.id() + '/send-confirmation'
        }).then(function () {
          resendButton.props.loading = false;
          resendButton.props.children = [icon('check'), ' ', app.translator.trans('core.forum.user_email_confirmation.sent_message')];
          resendButton.props.disabled = true;
          m.redraw();
        }).catch(function () {
          resendButton.props.loading = false;
          m.redraw();
        });
      }
    });

    var ContainedAlert = function (_Alert) {
      babelHelpers.inherits(ContainedAlert, _Alert);

      function ContainedAlert() {
        babelHelpers.classCallCheck(this, ContainedAlert);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ContainedAlert).apply(this, arguments));
      }

      babelHelpers.createClass(ContainedAlert, [{
        key: 'view',
        value: function view() {
          var vdom = babelHelpers.get(Object.getPrototypeOf(ContainedAlert.prototype), 'view', this).call(this);

          vdom.children = [m(
            'div',
            { className: 'container' },
            vdom.children
          )];

          return vdom;
        }
      }]);
      return ContainedAlert;
    }(Alert);

    m.mount($('<div/>').insertBefore('#content')[0], ContainedAlert.component({
      dismissible: false,
      children: app.translator.trans('core.forum.user_email_confirmation.alert_message', { email: m(
          'strong',
          null,
          user.email()
        ) }),
      controls: [resendButton]
    }));
  }

  _export('default', alertEmailConfirmation);

  return {
    setters: [function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/boot', ['flarum/utils/ScrollListener', 'flarum/utils/Pane', 'flarum/utils/Drawer', 'flarum/utils/mapRoutes', 'flarum/helpers/icon', 'flarum/components/Navigation', 'flarum/components/HeaderPrimary', 'flarum/components/HeaderSecondary', 'flarum/components/Composer', 'flarum/components/ModalManager', 'flarum/components/AlertManager'], function (_export, _context) {
  var ScrollListener, Pane, Drawer, mapRoutes, icon, Navigation, HeaderPrimary, HeaderSecondary, Composer, ModalManager, AlertManager;
  function boot(app) {
    // Get the configured default route and update that route's path to be '/'.
    // Push the homepage as the first route, so that the user will always be
    // able to click on the 'back' button to go home, regardless of which page
    // they started on.
    var defaultRoute = app.forum.attribute('defaultRoute');
    var defaultAction = 'index';

    for (var i in app.routes) {
      if (app.routes[i].path === defaultRoute) defaultAction = i;
    }

    app.routes[defaultAction].path = '/';
    app.history.push(defaultAction, icon('bars'), '/');

    m.startComputation();

    m.mount(document.getElementById('app-navigation'), Navigation.component({ className: 'App-backControl', drawer: true }));
    m.mount(document.getElementById('header-navigation'), Navigation.component());
    m.mount(document.getElementById('header-primary'), HeaderPrimary.component());
    m.mount(document.getElementById('header-secondary'), HeaderSecondary.component());

    app.pane = new Pane(document.getElementById('app'));
    app.drawer = new Drawer();
    app.composer = m.mount(document.getElementById('composer'), Composer.component());
    app.modal = m.mount(document.getElementById('modal'), ModalManager.component());
    app.alerts = m.mount(document.getElementById('alerts'), AlertManager.component());

    var basePath = app.forum.attribute('basePath');
    m.route.mode = 'pathname';
    m.route(document.getElementById('content'), basePath + '/', mapRoutes(app.routes, basePath));

    m.endComputation();

    // Route the home link back home when clicked. We do not want it to register
    // if the user is opening it in a new tab, however.
    $('#home-link').click(function (e) {
      if (e.ctrlKey || e.metaKey || e.which === 2) return;
      e.preventDefault();
      app.history.home();
    });

    // Add a class to the body which indicates that the page has been scrolled
    // down.
    new ScrollListener(function (top) {
      var $app = $('#app');
      var offset = $app.offset().top;

      $app.toggleClass('affix', top >= offset).toggleClass('scrolled', top > offset);
    }).start();

    // Initialize FastClick, which makes links and buttons much more responsive on
    // touch devices.
    $(function () {
      FastClick.attach(document.body);

      $('body').addClass('ontouchstart' in window ? 'touch' : 'no-touch');
    });

    app.booted = true;
  }

  _export('default', boot);

  return {
    setters: [function (_flarumUtilsScrollListener) {
      ScrollListener = _flarumUtilsScrollListener.default;
    }, function (_flarumUtilsPane) {
      Pane = _flarumUtilsPane.default;
    }, function (_flarumUtilsDrawer) {
      Drawer = _flarumUtilsDrawer.default;
    }, function (_flarumUtilsMapRoutes) {
      mapRoutes = _flarumUtilsMapRoutes.default;
    }, function (_flarumHelpersIcon) {
      icon = _flarumHelpersIcon.default;
    }, function (_flarumComponentsNavigation) {
      Navigation = _flarumComponentsNavigation.default;
    }, function (_flarumComponentsHeaderPrimary) {
      HeaderPrimary = _flarumComponentsHeaderPrimary.default;
    }, function (_flarumComponentsHeaderSecondary) {
      HeaderSecondary = _flarumComponentsHeaderSecondary.default;
    }, function (_flarumComponentsComposer) {
      Composer = _flarumComponentsComposer.default;
    }, function (_flarumComponentsModalManager) {
      ModalManager = _flarumComponentsModalManager.default;
    }, function (_flarumComponentsAlertManager) {
      AlertManager = _flarumComponentsAlertManager.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/components', ['flarum/components/CommentPost', 'flarum/components/DiscussionRenamedPost', 'flarum/components/PostedActivity', 'flarum/components/JoinedActivity', 'flarum/components/DiscussionRenamedNotification'], function (_export, _context) {
  var CommentPost, DiscussionRenamedPost, PostedActivity, JoinedActivity, DiscussionRenamedNotification;
  function components(app) {
    app.postComponents.comment = CommentPost;
    app.postComponents.discussionRenamed = DiscussionRenamedPost;

    app.notificationComponents.discussionRenamed = DiscussionRenamedNotification;
  }

  _export('default', components);

  return {
    setters: [function (_flarumComponentsCommentPost) {
      CommentPost = _flarumComponentsCommentPost.default;
    }, function (_flarumComponentsDiscussionRenamedPost) {
      DiscussionRenamedPost = _flarumComponentsDiscussionRenamedPost.default;
    }, function (_flarumComponentsPostedActivity) {
      PostedActivity = _flarumComponentsPostedActivity.default;
    }, function (_flarumComponentsJoinedActivity) {
      JoinedActivity = _flarumComponentsJoinedActivity.default;
    }, function (_flarumComponentsDiscussionRenamedNotification) {
      DiscussionRenamedNotification = _flarumComponentsDiscussionRenamedNotification.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/humanTime', ['flarum/utils/humanTime'], function (_export, _context) {
  var humanTimeUtil;


  function updateHumanTimes() {
    $('[data-humantime]').each(function () {
      var $this = $(this);
      var ago = humanTimeUtil($this.attr('datetime'));

      $this.html(ago);
    });
  }

  /**
   * The `humanTime` initializer sets up a loop every 1 second to update
   * timestamps rendered with the `humanTime` helper.
   */
  function humanTime() {
    setInterval(updateHumanTimes, 10000);
  }

  _export('default', humanTime);

  return {
    setters: [function (_flarumUtilsHumanTime) {
      humanTimeUtil = _flarumUtilsHumanTime.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/preload', ['flarum/Session'], function (_export, _context) {
  var Session;
  function preload(app) {
    app.store.pushPayload({ data: app.preload.data });

    app.forum = app.store.getById('forums', 1);

    app.session = new Session(app.store.getById('users', app.preload.session.userId), app.preload.session.csrfToken);
  }

  _export('default', preload);

  return {
    setters: [function (_flarumSession) {
      Session = _flarumSession.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/routes', ['flarum/components/IndexPage', 'flarum/components/DiscussionPage', 'flarum/components/PostsUserPage', 'flarum/components/DiscussionsUserPage', 'flarum/components/SettingsPage', 'flarum/components/NotificationsPage'], function (_export, _context) {
  var IndexPage, DiscussionPage, PostsUserPage, DiscussionsUserPage, SettingsPage, NotificationsPage;

  _export('default', function (app) {
    app.routes = {
      'index': { path: '/all', component: IndexPage.component() },
      'index.filter': { path: '/:filter', component: IndexPage.component() },

      'discussion': { path: '/d/:id', component: DiscussionPage.component() },
      'discussion.near': { path: '/d/:id/:near', component: DiscussionPage.component() },

      'user': { path: '/u/:username', component: PostsUserPage.component() },
      'user.posts': { path: '/u/:username', component: PostsUserPage.component() },
      'user.discussions': { path: '/u/:username/discussions', component: DiscussionsUserPage.component() },

      'settings': { path: '/settings', component: SettingsPage.component() },
      'notifications': { path: '/notifications', component: NotificationsPage.component() }
    };

    /**
     * Generate a URL to a discussion.
     *
     * @param {Discussion} discussion
     * @param {Integer} [near]
     * @return {String}
     */
    app.route.discussion = function (discussion, near) {
      return app.route(near && near !== 1 ? 'discussion.near' : 'discussion', {
        id: discussion.id() + '-' + discussion.slug(),
        near: near && near !== 1 ? near : undefined
      });
    };

    /**
     * Generate a URL to a post.
     *
     * @param {Post} post
     * @return {String}
     */
    app.route.post = function (post) {
      return app.route.discussion(post.discussion(), post.number());
    };

    /**
     * Generate a URL to a user.
     *
     * @param {User} user
     * @return {String}
     */
    app.route.user = function (user) {
      return app.route('user', {
        username: user.username()
      });
    };
  });

  return {
    setters: [function (_flarumComponentsIndexPage) {
      IndexPage = _flarumComponentsIndexPage.default;
    }, function (_flarumComponentsDiscussionPage) {
      DiscussionPage = _flarumComponentsDiscussionPage.default;
    }, function (_flarumComponentsPostsUserPage) {
      PostsUserPage = _flarumComponentsPostsUserPage.default;
    }, function (_flarumComponentsDiscussionsUserPage) {
      DiscussionsUserPage = _flarumComponentsDiscussionsUserPage.default;
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default;
    }, function (_flarumComponentsNotificationsPage) {
      NotificationsPage = _flarumComponentsNotificationsPage.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/initializers/store', ['flarum/Store', 'flarum/models/Forum', 'flarum/models/User', 'flarum/models/Discussion', 'flarum/models/Post', 'flarum/models/Group', 'flarum/models/Activity', 'flarum/models/Notification'], function (_export, _context) {
  var Store, Forum, User, Discussion, Post, Group, Activity, Notification;
  function store(app) {
    app.store = new Store({
      forums: Forum,
      users: User,
      discussions: Discussion,
      posts: Post,
      groups: Group,
      activity: Activity,
      notifications: Notification
    });
  }

  _export('default', store);

  return {
    setters: [function (_flarumStore) {
      Store = _flarumStore.default;
    }, function (_flarumModelsForum) {
      Forum = _flarumModelsForum.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_flarumModelsDiscussion) {
      Discussion = _flarumModelsDiscussion.default;
    }, function (_flarumModelsPost) {
      Post = _flarumModelsPost.default;
    }, function (_flarumModelsGroup) {
      Group = _flarumModelsGroup.default;
    }, function (_flarumModelsActivity) {
      Activity = _flarumModelsActivity.default;
    }, function (_flarumModelsNotification) {
      Notification = _flarumModelsNotification.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/Model', [], function (_export, _context) {
  var Model;
  return {
    setters: [],
    execute: function () {
      Model = function () {
        /**
         * @param {Object} data A resource object from the API.
         * @param {Store} store The data store that this model should be persisted to.
         * @public
         */

        function Model() {
          var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          var store = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
          babelHelpers.classCallCheck(this, Model);

          /**
           * The resource object from the API.
           *
           * @type {Object}
           * @public
           */
          this.data = data;

          /**
           * The time at which the model's data was last updated. Watching the value
           * of this property is a fast way to retain/cache a subtree if data hasn't
           * changed.
           *
           * @type {Date}
           * @public
           */
          this.freshness = new Date();

          /**
           * Whether or not the resource exists on the server.
           *
           * @type {Boolean}
           * @public
           */
          this.exists = false;

          /**
           * The data store that this resource should be persisted to.
           *
           * @type {Store}
           * @protected
           */
          this.store = store;
        }

        /**
         * Get the model's ID.
         *
         * @return {Integer}
         * @public
         * @final
         */


        babelHelpers.createClass(Model, [{
          key: 'id',
          value: function id() {
            return this.data.id;
          }
        }, {
          key: 'attribute',
          value: function attribute(_attribute) {
            return this.data.attributes[_attribute];
          }
        }, {
          key: 'pushData',
          value: function pushData(data) {
            // Since most of the top-level items in a resource object are objects
            // (e.g. relationships, attributes), we'll need to check and perform the
            // merge at the second level if that's the case.
            for (var key in data) {
              if (babelHelpers.typeof(data[key]) === 'object') {
                this.data[key] = this.data[key] || {};

                // For every item in a second-level object, we want to check if we've
                // been handed a Model instance. If so, we will convert it to a
                // relationship data object.
                for (var innerKey in data[key]) {
                  if (data[key][innerKey] instanceof Model) {
                    data[key][innerKey] = { data: Model.getIdentifier(data[key][innerKey]) };
                  }
                  this.data[key][innerKey] = data[key][innerKey];
                }
              } else {
                this.data[key] = data[key];
              }
            }

            // Now that we've updated the data, we can say that the model is fresh.
            // This is an easy way to invalidate retained subtrees etc.
            this.freshness = new Date();
          }
        }, {
          key: 'pushAttributes',
          value: function pushAttributes(attributes) {
            this.pushData({ attributes: attributes });
          }
        }, {
          key: 'save',
          value: function save(attributes) {
            var _this = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var data = {
              type: this.data.type,
              id: this.data.id,
              attributes: attributes
            };

            // If a 'relationships' key exists, extract it from the attributes hash and
            // set it on the top-level data object instead. We will be sending this data
            // object to the API for persistence.
            if (attributes.relationships) {
              data.relationships = {};

              for (var key in attributes.relationships) {
                var model = attributes.relationships[key];

                data.relationships[key] = {
                  data: model instanceof Array ? model.map(Model.getIdentifier) : Model.getIdentifier(model)
                };
              }

              delete attributes.relationships;
            }

            // Before we update the model's data, we should make a copy of the model's
            // old data so that we can revert back to it if something goes awry during
            // persistence.
            var oldData = this.copyData();

            this.pushData(data);

            var request = { data: data };
            if (options.meta) request.meta = options.meta;

            return app.request(babelHelpers.extends({
              method: this.exists ? 'PATCH' : 'POST',
              url: app.forum.attribute('apiUrl') + this.apiEndpoint(),
              data: request
            }, options)).then(
            // If everything went well, we'll make sure the store knows that this
            // model exists now (if it didn't already), and we'll push the data that
            // the API returned into the store.
            function (payload) {
              _this.store.data[payload.data.type] = _this.store.data[payload.data.type] || {};
              _this.store.data[payload.data.type][payload.data.id] = _this;
              return _this.store.pushPayload(payload);
            },

            // If something went wrong, though... good thing we backed up our model's
            // old data! We'll revert to that and let others handle the error.
            function (response) {
              _this.pushData(oldData);
              m.lazyRedraw();
              throw response;
            });
          }
        }, {
          key: 'delete',
          value: function _delete(data) {
            var _this2 = this;

            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!this.exists) return m.deferred.resolve().promise;

            return app.request(babelHelpers.extends({
              method: 'DELETE',
              url: app.forum.attribute('apiUrl') + this.apiEndpoint(),
              data: data
            }, options)).then(function () {
              _this2.exists = false;
              _this2.store.remove(_this2);
            });
          }
        }, {
          key: 'apiEndpoint',
          value: function apiEndpoint() {
            return '/' + this.data.type + (this.exists ? '/' + this.data.id : '');
          }
        }, {
          key: 'copyData',
          value: function copyData() {
            return JSON.parse(JSON.stringify(this.data));
          }
        }], [{
          key: 'attribute',
          value: function attribute(name, transform) {
            return function () {
              var value = this.data.attributes && this.data.attributes[name];

              return transform ? transform(value) : value;
            };
          }
        }, {
          key: 'hasOne',
          value: function hasOne(name) {
            return function () {
              if (this.data.relationships) {
                var relationship = this.data.relationships[name];

                if (relationship) {
                  return app.store.getById(relationship.data.type, relationship.data.id);
                }
              }

              return false;
            };
          }
        }, {
          key: 'hasMany',
          value: function hasMany(name) {
            return function () {
              if (this.data.relationships) {
                var relationship = this.data.relationships[name];

                if (relationship) {
                  return relationship.data.map(function (data) {
                    return app.store.getById(data.type, data.id);
                  });
                }
              }

              return false;
            };
          }
        }, {
          key: 'transformDate',
          value: function transformDate(value) {
            return value ? new Date(value) : null;
          }
        }, {
          key: 'getIdentifier',
          value: function getIdentifier(model) {
            return {
              type: model.data.type,
              id: model.data.id
            };
          }
        }]);
        return Model;
      }();

      _export('default', Model);
    }
  };
});;
'use strict';

System.register('flarum/models/Discussion', ['flarum/Model', 'flarum/utils/computed', 'flarum/utils/ItemList', 'flarum/components/Badge'], function (_export, _context) {
  var Model, computed, ItemList, Badge, Discussion;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumComponentsBadge) {
      Badge = _flarumComponentsBadge.default;
    }],
    execute: function () {
      Discussion = function (_Model) {
        babelHelpers.inherits(Discussion, _Model);

        function Discussion() {
          babelHelpers.classCallCheck(this, Discussion);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Discussion).apply(this, arguments));
        }

        return Discussion;
      }(Model);

      _export('default', Discussion);

      babelHelpers.extends(Discussion.prototype, {
        title: Model.attribute('title'),
        slug: Model.attribute('slug'),

        startTime: Model.attribute('startTime', Model.transformDate),
        startUser: Model.hasOne('startUser'),
        startPost: Model.hasOne('startPost'),

        lastTime: Model.attribute('lastTime', Model.transformDate),
        lastUser: Model.hasOne('lastUser'),
        lastPost: Model.hasOne('lastPost'),
        lastPostNumber: Model.attribute('lastPostNumber'),

        commentsCount: Model.attribute('commentsCount'),
        repliesCount: computed('commentsCount', function (commentsCount) {
          return Math.max(0, commentsCount - 1);
        }),
        posts: Model.hasMany('posts'),
        relevantPosts: Model.hasMany('relevantPosts'),

        readTime: Model.attribute('readTime', Model.transformDate),
        readNumber: Model.attribute('readNumber'),
        isUnread: computed('unreadCount', function (unreadCount) {
          return !!unreadCount;
        }),
        isRead: computed('unreadCount', function (unreadCount) {
          return app.session.user && !unreadCount;
        }),

        hideTime: Model.attribute('hideTime', Model.transformDate),
        hideUser: Model.hasOne('hideUser'),
        isHidden: computed('hideTime', 'commentsCount', function (hideTime, commentsCount) {
          return !!hideTime || commentsCount === 0;
        }),

        canReply: Model.attribute('canReply'),
        canRename: Model.attribute('canRename'),
        canHide: Model.attribute('canHide'),
        canDelete: Model.attribute('canDelete'),

        removePost: function removePost(id) {
          var relationships = this.data.relationships;
          var posts = relationships && relationships.posts;

          if (posts) {
            posts.data.some(function (data, i) {
              if (id === data.id) {
                posts.data.splice(i, 1);
                return true;
              }
            });
          }
        },
        unreadCount: function unreadCount() {
          var user = app.session.user;

          if (user && user.readTime() < this.lastTime()) {
            return Math.max(0, this.lastPostNumber() - (this.readNumber() || 0));
          }

          return 0;
        },
        badges: function badges() {
          var items = new ItemList();

          if (this.isHidden()) {
            items.add('hidden', m(Badge, { type: 'hidden', icon: 'trash', label: app.translator.trans('core.lib.badge.hidden_tooltip') }));
          }

          return items;
        },
        postIds: function postIds() {
          var posts = this.data.relationships.posts;

          return posts ? posts.data.map(function (link) {
            return link.id;
          }) : [];
        }
      });

      _export('default', Discussion);
    }
  };
});;
'use strict';

System.register('flarum/models/Forum', ['flarum/Model'], function (_export, _context) {
  var Model, Forum;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }],
    execute: function () {
      Forum = function (_Model) {
        babelHelpers.inherits(Forum, _Model);

        function Forum() {
          babelHelpers.classCallCheck(this, Forum);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Forum).apply(this, arguments));
        }

        babelHelpers.createClass(Forum, [{
          key: 'apiEndpoint',
          value: function apiEndpoint() {
            return '/forum';
          }
        }]);
        return Forum;
      }(Model);

      _export('default', Forum);
    }
  };
});;
'use strict';

System.register('flarum/models/Group', ['flarum/Model'], function (_export, _context) {
  var Model, Group;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }],
    execute: function () {
      Group = function (_Model) {
        babelHelpers.inherits(Group, _Model);

        function Group() {
          babelHelpers.classCallCheck(this, Group);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
        }

        return Group;
      }(Model);

      babelHelpers.extends(Group.prototype, {
        nameSingular: Model.attribute('nameSingular'),
        namePlural: Model.attribute('namePlural'),
        color: Model.attribute('color'),
        icon: Model.attribute('icon')
      });

      Group.ADMINISTRATOR_ID = '1';
      Group.GUEST_ID = '2';
      Group.MEMBER_ID = '3';

      _export('default', Group);
    }
  };
});;
'use strict';

System.register('flarum/models/Notification', ['flarum/Model', 'flarum/utils/computed'], function (_export, _context) {
  var Model, computed, Notification;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }],
    execute: function () {
      Notification = function (_Model) {
        babelHelpers.inherits(Notification, _Model);

        function Notification() {
          babelHelpers.classCallCheck(this, Notification);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Notification).apply(this, arguments));
        }

        return Notification;
      }(Model);

      _export('default', Notification);

      babelHelpers.extends(Notification.prototype, {
        contentType: Model.attribute('contentType'),
        subjectId: Model.attribute('subjectId'),
        content: Model.attribute('content'),
        time: Model.attribute('time', Model.date),

        isRead: Model.attribute('isRead'),
        unreadCount: Model.attribute('unreadCount'),
        additionalUnreadCount: computed('unreadCount', function (unreadCount) {
          return Math.max(0, unreadCount - 1);
        }),

        user: Model.hasOne('user'),
        sender: Model.hasOne('sender'),
        subject: Model.hasOne('subject')
      });

      _export('default', Notification);
    }
  };
});;
'use strict';

System.register('flarum/models/Post', ['flarum/Model', 'flarum/utils/computed', 'flarum/utils/string'], function (_export, _context) {
  var Model, computed, getPlainContent, Post;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }, function (_flarumUtilsString) {
      getPlainContent = _flarumUtilsString.getPlainContent;
    }],
    execute: function () {
      Post = function (_Model) {
        babelHelpers.inherits(Post, _Model);

        function Post() {
          babelHelpers.classCallCheck(this, Post);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Post).apply(this, arguments));
        }

        return Post;
      }(Model);

      _export('default', Post);

      babelHelpers.extends(Post.prototype, {
        number: Model.attribute('number'),
        discussion: Model.hasOne('discussion'),

        time: Model.attribute('time', Model.transformDate),
        user: Model.hasOne('user'),
        contentType: Model.attribute('contentType'),
        content: Model.attribute('content'),
        contentHtml: Model.attribute('contentHtml'),
        contentPlain: computed('contentHtml', getPlainContent),

        editTime: Model.attribute('editTime', Model.transformDate),
        editUser: Model.hasOne('editUser'),
        isEdited: computed('editTime', function (editTime) {
          return !!editTime;
        }),

        hideTime: Model.attribute('hideTime', Model.transformDate),
        hideUser: Model.hasOne('hideUser'),
        isHidden: computed('hideTime', function (hideTime) {
          return !!hideTime;
        }),

        canEdit: Model.attribute('canEdit'),
        canDelete: Model.attribute('canDelete')
      });

      _export('default', Post);
    }
  };
});;
'use strict';

System.register('flarum/models/User', ['flarum/Model', 'flarum/utils/stringToColor', 'flarum/utils/ItemList', 'flarum/utils/computed', 'flarum/components/GroupBadge'], function (_export, _context) {
  var Model, stringToColor, ItemList, computed, GroupBadge, User;
  return {
    setters: [function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumUtilsStringToColor) {
      stringToColor = _flarumUtilsStringToColor.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsComputed) {
      computed = _flarumUtilsComputed.default;
    }, function (_flarumComponentsGroupBadge) {
      GroupBadge = _flarumComponentsGroupBadge.default;
    }],
    execute: function () {
      User = function (_Model) {
        babelHelpers.inherits(User, _Model);

        function User() {
          babelHelpers.classCallCheck(this, User);
          return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
        }

        return User;
      }(Model);

      _export('default', User);

      babelHelpers.extends(User.prototype, {
        username: Model.attribute('username'),
        email: Model.attribute('email'),
        isActivated: Model.attribute('isActivated'),
        password: Model.attribute('password'),

        avatarUrl: Model.attribute('avatarUrl'),
        bio: Model.attribute('bio'),
        bioHtml: computed('bio', function (bio) {
          return bio ? '<p>' + $('<div/>').text(bio).html().replace(/\n/g, '<br>').autoLink({ rel: 'nofollow' }) + '</p>' : '';
        }),
        preferences: Model.attribute('preferences'),
        groups: Model.hasMany('groups'),

        joinTime: Model.attribute('joinTime', Model.transformDate),
        lastSeenTime: Model.attribute('lastSeenTime', Model.transformDate),
        readTime: Model.attribute('readTime', Model.transformDate),
        unreadNotificationsCount: Model.attribute('unreadNotificationsCount'),
        newNotificationsCount: Model.attribute('newNotificationsCount'),

        discussionsCount: Model.attribute('discussionsCount'),
        commentsCount: Model.attribute('commentsCount'),

        canEdit: Model.attribute('canEdit'),
        canDelete: Model.attribute('canDelete'),

        avatarColor: null,
        color: computed('username', 'avatarUrl', 'avatarColor', function (username, avatarUrl, avatarColor) {
          // If we've already calculated and cached the dominant color of the user's
          // avatar, then we can return that in RGB format. If we haven't, we'll want
          // to calculate it. Unless the user doesn't have an avatar, in which case
          // we generate a color from their username.
          if (avatarColor) {
            return 'rgb(' + avatarColor.join(', ') + ')';
          } else if (avatarUrl) {
            this.calculateAvatarColor();
            return '';
          }

          return '#' + stringToColor(username);
        }),

        isOnline: function isOnline() {
          return this.lastSeenTime() > moment().subtract(5, 'minutes').toDate();
        },
        badges: function badges() {
          var items = new ItemList();
          var groups = this.groups();

          if (groups) {
            groups.forEach(function (group) {
              items.add('group' + group.id(), GroupBadge.component({ group: group }));
            });
          }

          return items;
        },
        calculateAvatarColor: function calculateAvatarColor() {
          var image = new Image();
          var user = this;

          image.onload = function () {
            var colorThief = new ColorThief();
            user.avatarColor = colorThief.getColor(this);
            user.freshness = new Date();
            m.redraw();
          };
          image.src = this.avatarUrl();
        },
        savePreferences: function savePreferences(newPreferences) {
          var preferences = this.preferences();

          babelHelpers.extends(preferences, newPreferences);

          return this.save({ preferences: preferences });
        }
      });

      _export('default', User);
    }
  };
});;
'use strict';

System.register('flarum/Session', [], function (_export, _context) {
  var Session;
  return {
    setters: [],
    execute: function () {
      Session = function () {
        function Session(user, csrfToken) {
          babelHelpers.classCallCheck(this, Session);

          /**
           * The current authenticated user.
           *
           * @type {User|null}
           * @public
           */
          this.user = user;

          /**
           * The CSRF token.
           *
           * @type {String|null}
           * @public
           */
          this.csrfToken = csrfToken;
        }

        /**
         * Attempt to log in a user.
         *
         * @param {String} identification The username/email.
         * @param {String} password
         * @param {Object} [options]
         * @return {Promise}
         * @public
         */


        babelHelpers.createClass(Session, [{
          key: 'login',
          value: function login(identification, password) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return app.request(babelHelpers.extends({
              method: 'POST',
              url: app.forum.attribute('baseUrl') + '/login',
              data: { identification: identification, password: password }
            }, options));
          }
        }, {
          key: 'logout',
          value: function logout() {
            window.location = app.forum.attribute('baseUrl') + '/logout?token=' + this.csrfToken;
          }
        }]);
        return Session;
      }();

      _export('default', Session);
    }
  };
});;
'use strict';

System.register('flarum/Store', [], function (_export, _context) {
  var Store;
  return {
    setters: [],
    execute: function () {
      Store = function () {
        function Store(models) {
          babelHelpers.classCallCheck(this, Store);

          /**
           * The local data store. A tree of resource types to IDs, such that
           * accessing data[type][id] will return the model for that type/ID.
           *
           * @type {Object}
           * @protected
           */
          this.data = {};

          /**
           * The model registry. A map of resource types to the model class that
           * should be used to represent resources of that type.
           *
           * @type {Object}
           * @public
           */
          this.models = models;
        }

        /**
         * Push resources contained within an API payload into the store.
         *
         * @param {Object} payload
         * @return {Model|Model[]} The model(s) representing the resource(s) contained
         *     within the 'data' key of the payload.
         * @public
         */


        babelHelpers.createClass(Store, [{
          key: 'pushPayload',
          value: function pushPayload(payload) {
            if (payload.included) payload.included.map(this.pushObject.bind(this));

            var result = payload.data instanceof Array ? payload.data.map(this.pushObject.bind(this)) : this.pushObject(payload.data);

            // Attach the original payload to the model that we give back. This is
            // useful to consumers as it allows them to access meta information
            // associated with their request.
            result.payload = payload;

            return result;
          }
        }, {
          key: 'pushObject',
          value: function pushObject(data) {
            if (!this.models[data.type]) return null;

            var type = this.data[data.type] = this.data[data.type] || {};

            if (type[data.id]) {
              type[data.id].pushData(data);
            } else {
              type[data.id] = this.createRecord(data.type, data);
            }

            type[data.id].exists = true;

            return type[data.id];
          }
        }, {
          key: 'find',
          value: function find(type, id) {
            var query = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            var data = query;
            var url = app.forum.attribute('apiUrl') + '/' + type;

            if (id instanceof Array) {
              url += '?filter[id]=' + id.join(',');
            } else if ((typeof id === 'undefined' ? 'undefined' : babelHelpers.typeof(id)) === 'object') {
              data = id;
            } else if (id) {
              url += '/' + id;
            }

            return app.request(babelHelpers.extends({
              method: 'GET',
              url: url,
              data: data
            }, options)).then(this.pushPayload.bind(this));
          }
        }, {
          key: 'getById',
          value: function getById(type, id) {
            return this.data[type] && this.data[type][id];
          }
        }, {
          key: 'getBy',
          value: function getBy(type, key, value) {
            return this.all(type).filter(function (model) {
              return model[key]() === value;
            })[0];
          }
        }, {
          key: 'all',
          value: function all(type) {
            var records = this.data[type];

            return records ? Object.keys(records).map(function (id) {
              return records[id];
            }) : [];
          }
        }, {
          key: 'remove',
          value: function remove(model) {
            delete this.data[model.data.type][model.id()];
          }
        }, {
          key: 'createRecord',
          value: function createRecord(type) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            data.type = data.type || type;

            return new this.models[type](data, this);
          }
        }]);
        return Store;
      }();

      _export('default', Store);
    }
  };
});;
'use strict';

System.register('flarum/Translator', ['flarum/models/User', 'flarum/helpers/username', 'flarum/utils/extractText', 'flarum/utils/extract'], function (_export, _context) {
  var User, username, extractText, extract, Translator;
  return {
    setters: [function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_flarumHelpersUsername) {
      username = _flarumHelpersUsername.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumUtilsExtract) {
      extract = _flarumUtilsExtract.default;
    }],
    execute: function () {
      Translator = function () {
        function Translator() {
          babelHelpers.classCallCheck(this, Translator);

          /**
           * A map of translation keys to their translated values.
           *
           * @type {Object}
           * @public
           */
          this.translations = {};

          this.locale = null;
        }

        babelHelpers.createClass(Translator, [{
          key: 'trans',
          value: function trans(id, parameters) {
            var translation = this.translations[id];

            if (translation) {
              return this.apply(translation, parameters || {});
            }

            return id;
          }
        }, {
          key: 'transChoice',
          value: function transChoice(id, number, parameters) {
            var translation = this.translations[id];

            if (translation) {
              number = parseInt(number, 10);

              translation = this.pluralize(translation, number);

              return this.apply(translation, parameters || {});
            }

            return id;
          }
        }, {
          key: 'apply',
          value: function apply(translation, input) {
            // If we've been given a user model as one of the input parameters, then
            // we'll extract the username and use that for the translation. In the
            // future there should be a hook here to inspect the user and change the
            // translation key. This will allow a gender property to determine which
            // translation key is used.
            if ('user' in input) {
              var user = extract(input, 'user');

              if (!input.username) input.username = username(user);
            }

            translation = translation.split(new RegExp('({[a-z0-9_]+}|</?[a-z0-9_]+>)', 'gi'));

            var hydrated = [];
            var open = [hydrated];

            translation.forEach(function (part) {
              var match = part.match(new RegExp('{([a-z0-9_]+)}|<(/?)([a-z0-9_]+)>', 'i'));

              if (match) {
                if (match[1]) {
                  open[0].push(input[match[1]]);
                } else if (match[3]) {
                  if (match[2]) {
                    open.shift();
                  } else {
                    var tag = input[match[3]] || [];
                    open[0].push(tag);
                    open.unshift(tag.children || tag);
                  }
                }
              } else {
                open[0].push(part);
              }
            });

            return hydrated.filter(function (part) {
              return part;
            });
          }
        }, {
          key: 'pluralize',
          value: function pluralize(translation, number) {
            var _this = this;

            var sPluralRegex = new RegExp(/^\w+\: +(.+)$/),
                cPluralRegex = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
                iPluralRegex = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/),
                standardRules = [],
                explicitRules = [];

            translation.split('|').forEach(function (part) {
              if (cPluralRegex.test(part)) {
                var matches = part.match(cPluralRegex);
                explicitRules[matches[0]] = matches[matches.length - 1];
              } else if (sPluralRegex.test(part)) {
                var _matches = part.match(sPluralRegex);
                standardRules.push(_matches[1]);
              } else {
                standardRules.push(part);
              }
            });

            explicitRules.forEach(function (rule, e) {
              if (iPluralRegex.test(e)) {
                var matches = e.match(iPluralRegex);

                if (matches[1]) {
                  var ns = matches[2].split(',');

                  for (var n in ns) {
                    if (number == ns[n]) {
                      return explicitRules[e];
                    }
                  }
                } else {
                  var leftNumber = _this.convertNumber(matches[4]);
                  var rightNumber = _this.convertNumber(matches[5]);

                  if (('[' === matches[3] ? number >= leftNumber : number > leftNumber) && (']' === matches[6] ? number <= rightNumber : number < rightNumber)) {
                    return explicitRules[e];
                  }
                }
              }
            });

            return standardRules[this.pluralPosition(number, this.locale)] || standardRules[0] || undefined;
          }
        }, {
          key: 'convertNumber',
          value: function convertNumber(number) {
            if ('-Inf' === number) {
              return Number.NEGATIVE_INFINITY;
            } else if ('+Inf' === number || 'Inf' === number) {
              return Number.POSITIVE_INFINITY;
            }

            return parseInt(number, 10);
          }
        }, {
          key: 'pluralPosition',
          value: function pluralPosition(number, locale) {
            if ('pt_BR' === locale) {
              locale = 'xbr';
            }

            if (locale.length > 3) {
              locale = locale.split('_')[0];
            }

            switch (locale) {
              case 'bo':
              case 'dz':
              case 'id':
              case 'ja':
              case 'jv':
              case 'ka':
              case 'km':
              case 'kn':
              case 'ko':
              case 'ms':
              case 'th':
              case 'tr':
              case 'vi':
              case 'zh':
                return 0;
              case 'af':
              case 'az':
              case 'bn':
              case 'bg':
              case 'ca':
              case 'da':
              case 'de':
              case 'el':
              case 'en':
              case 'eo':
              case 'es':
              case 'et':
              case 'eu':
              case 'fa':
              case 'fi':
              case 'fo':
              case 'fur':
              case 'fy':
              case 'gl':
              case 'gu':
              case 'ha':
              case 'he':
              case 'hu':
              case 'is':
              case 'it':
              case 'ku':
              case 'lb':
              case 'ml':
              case 'mn':
              case 'mr':
              case 'nah':
              case 'nb':
              case 'ne':
              case 'nl':
              case 'nn':
              case 'no':
              case 'om':
              case 'or':
              case 'pa':
              case 'pap':
              case 'ps':
              case 'pt':
              case 'so':
              case 'sq':
              case 'sv':
              case 'sw':
              case 'ta':
              case 'te':
              case 'tk':
              case 'ur':
              case 'zu':
                return number == 1 ? 0 : 1;

              case 'am':
              case 'bh':
              case 'fil':
              case 'fr':
              case 'gun':
              case 'hi':
              case 'ln':
              case 'mg':
              case 'nso':
              case 'xbr':
              case 'ti':
              case 'wa':
                return number === 0 || number == 1 ? 0 : 1;

              case 'be':
              case 'bs':
              case 'hr':
              case 'ru':
              case 'sr':
              case 'uk':
                return number % 10 == 1 && number % 100 != 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;

              case 'cs':
              case 'sk':
                return number == 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;

              case 'ga':
                return number == 1 ? 0 : number == 2 ? 1 : 2;

              case 'lt':
                return number % 10 == 1 && number % 100 != 11 ? 0 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;

              case 'sl':
                return number % 100 == 1 ? 0 : number % 100 == 2 ? 1 : number % 100 == 3 || number % 100 == 4 ? 2 : 3;

              case 'mk':
                return number % 10 == 1 ? 0 : 1;

              case 'mt':
                return number == 1 ? 0 : number === 0 || number % 100 > 1 && number % 100 < 11 ? 1 : number % 100 > 10 && number % 100 < 20 ? 2 : 3;

              case 'lv':
                return number === 0 ? 0 : number % 10 == 1 && number % 100 != 11 ? 1 : 2;

              case 'pl':
                return number == 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 1 : 2;

              case 'cy':
                return number == 1 ? 0 : number == 2 ? 1 : number == 8 || number == 11 ? 2 : 3;

              case 'ro':
                return number == 1 ? 0 : number === 0 || number % 100 > 0 && number % 100 < 20 ? 1 : 2;

              case 'ar':
                return number === 0 ? 0 : number == 1 ? 1 : number == 2 ? 2 : number >= 3 && number <= 10 ? 3 : number >= 11 && number <= 99 ? 4 : 5;

              default:
                return 0;
            }
          }
        }]);
        return Translator;
      }();

      _export('default', Translator);
    }
  };
});;
'use strict';

System.register('flarum/utils/abbreviateNumber', [], function (_export, _context) {
  function abbreviateNumber(number) {
    // TODO: translation
    if (number >= 1000000) {
      return Math.floor(number / 1000000) + app.translator.trans('core.lib.number_suffix.mega_text');
    } else if (number >= 1000) {
      return Math.floor(number / 1000) + app.translator.trans('core.lib.number_suffix.kilo_text');
    } else {
      return number.toString();
    }
  }

  _export('default', abbreviateNumber);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/affixSidebar', [], function (_export, _context) {
  function affixSidebar(element, isInitialized) {
    var _this = this;

    if (isInitialized) return;

    var $sidebar = $(element);
    var $header = $('#header');
    var $footer = $('#footer');

    // Don't affix the sidebar if it is taller than the viewport (otherwise
    // there would be no way to scroll through its content).
    if ($sidebar.outerHeight(true) > $(window).height() - $header.outerHeight(true)) return;

    $sidebar.find('> ul').affix({
      offset: {
        top: function top() {
          return $sidebar.offset().top - $header.outerHeight(true) - parseInt($sidebar.css('margin-top'), 10);
        },
        bottom: function bottom() {
          return _this.bottom = $footer.outerHeight(true);
        }
      }
    });
  }

  _export('default', affixSidebar);

  return {
    setters: [],
    execute: function () {}
  };
});;
"use strict";

System.register("flarum/utils/anchorScroll", [], function (_export, _context) {
  function anchorScroll(element, callback) {
    var $window = $(window);
    var relativeScroll = $(element).offset().top - $window.scrollTop();

    callback();

    $window.scrollTop($(element).offset().top - relativeScroll);
  }

  _export("default", anchorScroll);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/classList', [], function (_export, _context) {
  function classList(classes) {
    var classNames = void 0;

    if (classes instanceof Array) {
      classNames = classes.filter(function (name) {
        return name;
      });
    } else {
      classNames = [];

      for (var i in classes) {
        if (classes[i]) classNames.push(i);
      }
    }

    return classNames.join(' ');
  }

  _export('default', classList);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/computed', [], function (_export, _context) {
  function computed() {
    for (var _len = arguments.length, dependentKeys = Array(_len), _key = 0; _key < _len; _key++) {
      dependentKeys[_key] = arguments[_key];
    }

    var keys = dependentKeys.slice(0, -1);
    var compute = dependentKeys.slice(-1)[0];

    var dependentValues = {};
    var computedValue = void 0;

    return function () {
      var _this = this;

      var recompute = false;

      // Read all of the dependent values. If any of them have changed since last
      // time, then we'll want to recompute our output.
      keys.forEach(function (key) {
        var value = typeof _this[key] === 'function' ? _this[key]() : _this[key];

        if (dependentValues[key] !== value) {
          recompute = true;
          dependentValues[key] = value;
        }
      });

      if (recompute) {
        computedValue = compute.apply(this, keys.map(function (key) {
          return dependentValues[key];
        }));
      }

      return computedValue;
    };
  }

  _export('default', computed);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/DiscussionControls', ['flarum/components/DiscussionPage', 'flarum/components/ReplyComposer', 'flarum/components/LogInModal', 'flarum/components/Button', 'flarum/components/Separator', 'flarum/utils/ItemList', 'flarum/utils/extractText'], function (_export, _context) {
  var DiscussionPage, ReplyComposer, LogInModal, Button, Separator, ItemList, extractText;
  return {
    setters: [function (_flarumComponentsDiscussionPage) {
      DiscussionPage = _flarumComponentsDiscussionPage.default;
    }, function (_flarumComponentsReplyComposer) {
      ReplyComposer = _flarumComponentsReplyComposer.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      _export('default', {
        controls: function controls(discussion, context) {
          var _this = this;

          var items = new ItemList();

          ['user', 'moderation', 'destructive'].forEach(function (section) {
            var controls = _this[section + 'Controls'](discussion, context).toArray();
            if (controls.length) {
              controls.forEach(function (item) {
                return items.add(item.itemName, item);
              });
              items.add(section + 'Separator', Separator.component());
            }
          });

          return items;
        },
        userControls: function userControls(discussion, context) {
          var items = new ItemList();

          // Only add a reply control if this is the discussion's controls dropdown
          // for the discussion page itself. We don't want it to show up for
          // discussions in the discussion list, etc.
          if (context instanceof DiscussionPage) {
            items.add('reply', !app.session.user || discussion.canReply() ? Button.component({
              icon: 'reply',
              children: app.translator.trans(app.session.user ? 'core.forum.discussion_controls.reply_button' : 'core.forum.discussion_controls.log_in_to_reply_button'),
              onclick: this.replyAction.bind(discussion, true, false)
            }) : Button.component({
              icon: 'reply',
              children: app.translator.trans('core.forum.discussion_controls.cannot_reply_button'),
              className: 'disabled',
              title: app.translator.trans('core.forum.discussion_controls.cannot_reply_text')
            }));
          }

          return items;
        },
        moderationControls: function moderationControls(discussion) {
          var items = new ItemList();

          if (discussion.canRename()) {
            items.add('rename', Button.component({
              icon: 'pencil',
              children: app.translator.trans('core.forum.discussion_controls.rename_button'),
              onclick: this.renameAction.bind(discussion)
            }));
          }

          return items;
        },
        destructiveControls: function destructiveControls(discussion) {
          var items = new ItemList();

          if (!discussion.isHidden()) {
            if (discussion.canHide()) {
              items.add('hide', Button.component({
                icon: 'trash-o',
                children: app.translator.trans('core.forum.discussion_controls.delete_button'),
                onclick: this.hideAction.bind(discussion)
              }));
            }
          } else if (discussion.canDelete()) {
            items.add('restore', Button.component({
              icon: 'reply',
              children: app.translator.trans('core.forum.discussion_controls.restore_button'),
              onclick: this.restoreAction.bind(discussion),
              disabled: discussion.commentsCount() === 0
            }));

            items.add('delete', Button.component({
              icon: 'times',
              children: app.translator.trans('core.forum.discussion_controls.delete_forever_button'),
              onclick: this.deleteAction.bind(discussion)
            }));
          }

          return items;
        },
        replyAction: function replyAction(goToLast, forceRefresh) {
          var _this2 = this;

          var deferred = m.deferred();

          // Define a function that will check the user's permission to reply, and
          // either open the reply composer for this discussion and resolve the
          // promise, or reject it.
          var reply = function reply() {
            if (_this2.canReply()) {
              if (goToLast && app.viewingDiscussion(_this2)) {
                app.current.stream.goToLast();
              }

              var component = app.composer.component;
              if (!app.composingReplyTo(_this2) || forceRefresh) {
                component = new ReplyComposer({
                  user: app.session.user,
                  discussion: _this2
                });
                app.composer.load(component);
              }
              app.composer.show();

              deferred.resolve(component);
            } else {
              deferred.reject();
            }
          };

          // If the user is logged in, then we can run that function right away. But
          // if they're not, we'll prompt them to log in and then run the function
          // after the discussion has reloaded.
          if (app.session.user) {
            reply();
          } else {
            app.modal.show(new LogInModal({
              onlogin: function onlogin() {
                return app.current.one('loaded', reply);
              }
            }));
          }

          return deferred.promise;
        },
        hideAction: function hideAction() {
          this.pushAttributes({ hideTime: new Date(), hideUser: app.session.user });

          return this.save({ isHidden: true });
        },
        restoreAction: function restoreAction() {
          this.pushAttributes({ hideTime: null, hideUser: null });

          return this.save({ isHidden: false });
        },
        deleteAction: function deleteAction() {
          var _this3 = this;

          if (confirm(extractText(app.translator.trans('core.forum.discussion_controls.delete_confirmation')))) {
            // If we're currently viewing the discussion that was deleted, go back
            // to the previous page.
            if (app.viewingDiscussion(this)) {
              app.history.back();
            }

            return this.delete().then(function () {
              // If there is a discussion list in the cache, remove this discussion.
              if (app.cache.discussionList) {
                app.cache.discussionList.removeDiscussion(_this3);
                m.redraw();
              }
            });
          }
        },
        renameAction: function renameAction() {
          var _this4 = this;

          var currentTitle = this.title();
          var title = prompt(extractText(app.translator.trans('core.forum.discussion_controls.rename_text')), currentTitle);

          // If the title is different to what it was before, then save it. After the
          // save has completed, update the post stream as there will be a new post
          // indicating that the discussion was renamed.
          if (title && title !== currentTitle) {
            return this.save({ title: title }).then(function () {
              if (app.viewingDiscussion(_this4)) {
                app.current.stream.update();
              }
              m.redraw();
            });
          }
        }
      });
    }
  };
});;
'use strict';

System.register('flarum/utils/Drawer', [], function (_export, _context) {
  var Drawer;
  return {
    setters: [],
    execute: function () {
      Drawer = function () {
        function Drawer() {
          var _this = this;

          babelHelpers.classCallCheck(this, Drawer);

          // Set up an event handler so that whenever the content area is tapped,
          // the drawer will close.
          $('#content').click(function (e) {
            if (_this.isOpen()) {
              e.preventDefault();
              _this.hide();
            }
          });
        }

        /**
         * Check whether or not the drawer is currently open.
         *
         * @return {Boolean}
         * @public
         */


        babelHelpers.createClass(Drawer, [{
          key: 'isOpen',
          value: function isOpen() {
            return $('#app').hasClass('drawerOpen');
          }
        }, {
          key: 'hide',
          value: function hide() {
            $('#app').removeClass('drawerOpen');

            if (this.$backdrop) this.$backdrop.remove();
          }
        }, {
          key: 'show',
          value: function show() {
            var _this2 = this;

            $('#app').addClass('drawerOpen');

            this.$backdrop = $('<div/>').addClass('drawer-backdrop fade').appendTo('body').click(function () {
              return _this2.hide();
            });

            setTimeout(function () {
              return _this2.$backdrop.addClass('in');
            });
          }
        }]);
        return Drawer;
      }();

      _export('default', Drawer);
    }
  };
});;
"use strict";

System.register("flarum/utils/evented", [], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      _export("default", {
        /**
         * Arrays of registered event handlers, grouped by the event name.
         *
         * @type {Object}
         * @protected
         */
        handlers: null,

        getHandlers: function getHandlers(event) {
          this.handlers = this.handlers || {};

          this.handlers[event] = this.handlers[event] || [];

          return this.handlers[event];
        },
        trigger: function trigger(event) {
          var _this = this;

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          this.getHandlers(event).forEach(function (handler) {
            return handler.apply(_this, args);
          });
        },
        on: function on(event, handler) {
          this.getHandlers(event).push(handler);
        },
        one: function one(event, handler) {
          var wrapper = function wrapper() {
            handler.apply(this, arguments);

            this.off(event, wrapper);
          };

          this.getHandlers(event).push(wrapper);
        },
        off: function off(event, handler) {
          var handlers = this.getHandlers(event);
          var index = handlers.indexOf(handler);

          if (index !== -1) {
            handlers.splice(index, 1);
          }
        }
      });
    }
  };
});;
"use strict";

System.register("flarum/utils/extract", [], function (_export, _context) {
  function extract(object, property) {
    var value = object[property];

    delete object[property];

    return value;
  }

  _export("default", extract);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/extractText', [], function (_export, _context) {
  function extractText(vdom) {
    if (vdom instanceof Array) {
      return vdom.map(function (element) {
        return extractText(element);
      }).join('');
    } else if ((typeof vdom === 'undefined' ? 'undefined' : babelHelpers.typeof(vdom)) === 'object') {
      return extractText(vdom.children);
    } else {
      return vdom;
    }
  }

  _export('default', extractText);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/formatNumber', [], function (_export, _context) {
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  _export('default', formatNumber);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/History', [], function (_export, _context) {
  var History;
  return {
    setters: [],
    execute: function () {
      History = function () {
        function History(defaultRoute) {
          babelHelpers.classCallCheck(this, History);

          /**
           * The stack of routes that have been navigated to.
           *
           * @type {Array}
           * @protected
           */
          this.stack = [];
        }

        /**
         * Get the item on the top of the stack.
         *
         * @return {Object}
         * @public
         */


        babelHelpers.createClass(History, [{
          key: 'getCurrent',
          value: function getCurrent() {
            return this.stack[this.stack.length - 1];
          }
        }, {
          key: 'getPrevious',
          value: function getPrevious() {
            return this.stack[this.stack.length - 2];
          }
        }, {
          key: 'push',
          value: function push(name, title) {
            var url = arguments.length <= 2 || arguments[2] === undefined ? m.route() : arguments[2];

            // If we're pushing an item with the same name as second-to-top item in the
            // stack, we will assume that the user has clicked the 'back' button in
            // their browser. In this case, we don't want to push a new item, so we will
            // pop off the top item, and then the second-to-top item will be overwritten
            // below.
            var secondTop = this.stack[this.stack.length - 2];
            if (secondTop && secondTop.name === name) {
              this.stack.pop();
            }

            // If we're pushing an item with the same name as the top item in the stack,
            // then we'll overwrite it with the new URL.
            var top = this.getCurrent();
            if (top && top.name === name) {
              babelHelpers.extends(top, { url: url, title: title });
            } else {
              this.stack.push({ name: name, url: url, title: title });
            }
          }
        }, {
          key: 'canGoBack',
          value: function canGoBack() {
            return this.stack.length > 1;
          }
        }, {
          key: 'back',
          value: function back() {
            this.stack.pop();

            m.route(this.getCurrent().url);
          }
        }, {
          key: 'backUrl',
          value: function backUrl() {
            var secondTop = this.stack[this.stack.length - 2];

            return secondTop.url;
          }
        }, {
          key: 'home',
          value: function home() {
            this.stack.splice(0);

            m.route('/');
          }
        }]);
        return History;
      }();

      _export('default', History);
    }
  };
});;
'use strict';

System.register('flarum/utils/humanTime', [], function (_export, _context) {
  function humanTime(time) {
    var m = moment(time);
    var now = moment();

    // To prevent showing things like "in a few seconds" due to small offsets
    // between client and server time, we always reset future dates to the
    // current time. This will result in "just now" being shown instead.
    if (m.isAfter(now)) {
      m = now;
    }

    var day = 864e5;
    var diff = m.diff(moment());
    var ago = null;

    // If this date was more than a month ago, we'll show the name of the month
    // in the string. If it wasn't this year, we'll show the year as well.
    if (diff < -30 * day) {
      if (m.year() === moment().year()) {
        ago = m.format('D MMM');
      } else {
        ago = m.format('MMM \'YY');
      }
    } else {
      ago = m.fromNow();
    }

    return ago;
  }
  _export('default', humanTime);

  return {
    setters: [],
    execute: function () {
      ; /**
         * The `humanTime` utility converts a date to a localized, human-readable time-
         * ago string.
         *
         * @param {Date} time
         * @return {String}
         */
    }
  };
});;
"use strict";

System.register("flarum/utils/ItemList", [], function (_export, _context) {
  var Item, ItemList;
  return {
    setters: [],
    execute: function () {
      Item = function Item(content, priority) {
        babelHelpers.classCallCheck(this, Item);

        this.content = content;
        this.priority = priority;
      };

      ItemList = function () {
        function ItemList() {
          babelHelpers.classCallCheck(this, ItemList);

          /**
           * The items in the list.
           *
           * @type {Object}
           * @public
           */
          this.items = {};
        }

        /**
         * Check whether an item is present in the list.
         *
         * @param key
         * @returns {boolean}
         */


        babelHelpers.createClass(ItemList, [{
          key: "has",
          value: function has(key) {
            return !!this.items[key];
          }
        }, {
          key: "get",
          value: function get(key) {
            return this.items[key].content;
          }
        }, {
          key: "add",
          value: function add(key, content) {
            var priority = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

            this.items[key] = new Item(content, priority);
          }
        }, {
          key: "replace",
          value: function replace(key) {
            var content = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var priority = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            if (this.items[key]) {
              if (content !== null) {
                this.items[key].content = content;
              }

              if (priority !== null) {
                this.items[key].priority = priority;
              }
            }
          }
        }, {
          key: "remove",
          value: function remove(key) {
            delete this.items[key];
          }
        }, {
          key: "merge",
          value: function merge(items) {
            for (var i in items.items) {
              if (items.items.hasOwnProperty(i) && items.items[i] instanceof Item) {
                this.items[i] = items.items[i];
              }
            }
          }
        }, {
          key: "toArray",
          value: function toArray() {
            var items = [];

            for (var i in this.items) {
              if (this.items.hasOwnProperty(i) && this.items[i] instanceof Item) {
                this.items[i].content = Object(this.items[i].content);

                this.items[i].content.itemName = i;
                items.push(this.items[i]);
                this.items[i].key = items.length;
              }
            }

            return items.sort(function (a, b) {
              if (a.priority === b.priority) {
                return a.key - b.key;
              } else if (a.priority > b.priority) {
                return -1;
              }
              return 1;
            }).map(function (item) {
              return item.content;
            });
          }
        }]);
        return ItemList;
      }();

      _export("default", ItemList);
    }
  };
});;
'use strict';

System.register('flarum/utils/mapRoutes', [], function (_export, _context) {
  function mapRoutes(routes) {
    var basePath = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    var map = {};

    for (var key in routes) {
      var route = routes[key];

      if (route.component) route.component.props.routeName = key;

      map[basePath + route.path] = route.component;
    }

    return map;
  }

  _export('default', mapRoutes);

  return {
    setters: [],
    execute: function () {}
  };
});;
"use strict";

System.register("flarum/utils/mixin", [], function (_export, _context) {
  function mixin(Parent) {
    var Mixed = function (_Parent) {
      babelHelpers.inherits(Mixed, _Parent);

      function Mixed() {
        babelHelpers.classCallCheck(this, Mixed);
        return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Mixed).apply(this, arguments));
      }

      return Mixed;
    }(Parent);

    for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      mixins[_key - 1] = arguments[_key];
    }

    mixins.forEach(function (object) {
      babelHelpers.extends(Mixed.prototype, object);
    });

    return Mixed;
  }

  _export("default", mixin);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/Pane', [], function (_export, _context) {
  var Pane;
  return {
    setters: [],
    execute: function () {
      Pane = function () {
        function Pane(element) {
          babelHelpers.classCallCheck(this, Pane);

          /**
           * The localStorage key to store the pane's pinned state with.
           *
           * @type {String}
           * @protected
           */
          this.pinnedKey = 'panePinned';

          /**
           * The page element.
           *
           * @type {jQuery}
           * @protected
           */
          this.$element = $(element);

          /**
           * Whether or not the pane is currently pinned.
           *
           * @type {Boolean}
           * @protected
           */
          this.pinned = localStorage.getItem(this.pinnedKey) === 'true';

          /**
           * Whether or not the pane is currently exists.
           *
           * @type {Boolean}
           * @protected
           */
          this.active = false;

          /**
           * Whether or not the pane is currently showing, or is hidden off the edge
           * of the screen.
           *
           * @type {Boolean}
           * @protected
           */
          this.showing = false;

          this.render();
        }

        /**
         * Enable the pane.
         *
         * @public
         */


        babelHelpers.createClass(Pane, [{
          key: 'enable',
          value: function enable() {
            this.active = true;
            this.render();
          }
        }, {
          key: 'disable',
          value: function disable() {
            this.active = false;
            this.showing = false;
            this.render();
          }
        }, {
          key: 'show',
          value: function show() {
            clearTimeout(this.hideTimeout);
            this.showing = true;
            this.render();
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.showing = false;
            this.render();
          }
        }, {
          key: 'onmouseleave',
          value: function onmouseleave() {
            this.hideTimeout = setTimeout(this.hide.bind(this), 250);
          }
        }, {
          key: 'togglePinned',
          value: function togglePinned() {
            this.pinned = !this.pinned;

            localStorage.setItem(this.pinnedKey, this.pinned ? 'true' : 'false');

            this.render();
          }
        }, {
          key: 'render',
          value: function render() {
            this.$element.toggleClass('panePinned', this.pinned).toggleClass('hasPane', this.active).toggleClass('paneShowing', this.showing);
          }
        }]);
        return Pane;
      }();

      _export('default', Pane);
    }
  };
});;
'use strict';

System.register('flarum/utils/patchMithril', ['../Component'], function (_export, _context) {
  var Component;
  function patchMithril(global) {
    var mo = global.m;

    var m = function m(comp) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (comp.prototype && comp.prototype instanceof Component) {
        return comp.component.apply(comp, args);
      }

      var node = mo.apply(this, arguments);

      if (node.attrs.bidi) {
        m.bidi(node, node.attrs.bidi);
      }

      if (node.attrs.route) {
        node.attrs.href = node.attrs.route;
        node.attrs.config = m.route;

        delete node.attrs.route;
      }

      return node;
    };

    Object.keys(mo).forEach(function (key) {
      return m[key] = mo[key];
    });

    /**
     * Redraw only if not in the middle of a computation (e.g. a route change).
     *
     * @return {void}
     */
    m.lazyRedraw = function () {
      m.startComputation();
      m.endComputation();
    };

    global.m = m;
  }

  _export('default', patchMithril);

  return {
    setters: [function (_Component) {
      Component = _Component.default;
    }],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/PostControls', ['flarum/components/EditPostComposer', 'flarum/components/Button', 'flarum/components/Separator', 'flarum/utils/ItemList'], function (_export, _context) {
  var EditPostComposer, Button, Separator, ItemList;
  return {
    setters: [function (_flarumComponentsEditPostComposer) {
      EditPostComposer = _flarumComponentsEditPostComposer.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      _export('default', {
        controls: function controls(post, context) {
          var _this = this;

          var items = new ItemList();

          ['user', 'moderation', 'destructive'].forEach(function (section) {
            var controls = _this[section + 'Controls'](post, context).toArray();
            if (controls.length) {
              controls.forEach(function (item) {
                return items.add(item.itemName, item);
              });
              items.add(section + 'Separator', Separator.component());
            }
          });

          return items;
        },
        userControls: function userControls(post, context) {
          return new ItemList();
        },
        moderationControls: function moderationControls(post, context) {
          var items = new ItemList();

          if (post.contentType() === 'comment' && post.canEdit()) {
            if (!post.isHidden()) {
              items.add('edit', Button.component({
                icon: 'pencil',
                children: app.translator.trans('core.forum.post_controls.edit_button'),
                onclick: this.editAction.bind(post)
              }));
            }
          }

          return items;
        },
        destructiveControls: function destructiveControls(post, context) {
          var items = new ItemList();

          if (post.contentType() === 'comment' && !post.isHidden()) {
            if (post.canEdit()) {
              items.add('hide', Button.component({
                icon: 'trash-o',
                children: app.translator.trans('core.forum.post_controls.delete_button'),
                onclick: this.hideAction.bind(post)
              }));
            }
          } else {
            if (post.contentType() === 'comment' && post.canEdit()) {
              items.add('restore', Button.component({
                icon: 'reply',
                children: app.translator.trans('core.forum.post_controls.restore_button'),
                onclick: this.restoreAction.bind(post)
              }));
            }
            if (post.canDelete()) {
              items.add('delete', Button.component({
                icon: 'times',
                children: app.translator.trans('core.forum.post_controls.delete_forever_button'),
                onclick: this.deleteAction.bind(post, context)
              }));
            }
          }

          return items;
        },
        editAction: function editAction() {
          app.composer.load(new EditPostComposer({ post: this }));
          app.composer.show();
        },
        hideAction: function hideAction() {
          this.pushAttributes({ hideTime: new Date(), hideUser: app.session.user });

          return this.save({ isHidden: true }).then(function () {
            return m.redraw();
          });
        },
        restoreAction: function restoreAction() {
          this.pushAttributes({ hideTime: null, hideUser: null });

          return this.save({ isHidden: false }).then(function () {
            return m.redraw();
          });
        },
        deleteAction: function deleteAction(context) {
          var _this2 = this;

          if (context) context.loading = true;

          return this.delete().then(function () {
            var discussion = _this2.discussion();

            discussion.removePost(_this2.id());

            // If this was the last post in the discussion, then we will assume that
            // the whole discussion was deleted too.
            if (!discussion.postIds().length) {
              // If there is a discussion list in the cache, remove this discussion.
              if (app.cache.discussionList) {
                app.cache.discussionList.removeDiscussion(discussion);
              }

              if (app.viewingDiscussion(discussion)) {
                app.history.back();
              }
            }
          }).catch(function () {}).then(function () {
            if (context) context.loading = false;
            m.redraw();
          });
        }
      });
    }
  };
});;
"use strict";

System.register("flarum/utils/RequestError", [], function (_export, _context) {
  var RequestError;
  return {
    setters: [],
    execute: function () {
      RequestError = function RequestError(status, responseText, options, xhr) {
        babelHelpers.classCallCheck(this, RequestError);

        this.status = status;
        this.responseText = responseText;
        this.options = options;
        this.xhr = xhr;

        try {
          this.response = JSON.parse(responseText);
        } catch (e) {
          this.response = null;
        }

        this.alert = null;
      };

      _export("default", RequestError);
    }
  };
});;
"use strict";

System.register("flarum/utils/ScrollListener", [], function (_export, _context) {
  var scroll, ScrollListener;
  return {
    setters: [],
    execute: function () {
      scroll = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };

      ScrollListener = function () {
        /**
         * @param {Function} callback The callback to run when the scroll position
         *     changes.
         * @public
         */

        function ScrollListener(callback) {
          babelHelpers.classCallCheck(this, ScrollListener);

          this.callback = callback;
          this.lastTop = -1;
        }

        /**
         * On each animation frame, as long as the listener is active, run the
         * `update` method.
         *
         * @protected
         */


        babelHelpers.createClass(ScrollListener, [{
          key: "loop",
          value: function loop() {
            if (!this.active) return;

            this.update();

            scroll(this.loop.bind(this));
          }
        }, {
          key: "update",
          value: function update(force) {
            var top = window.pageYOffset;

            if (this.lastTop !== top || force) {
              this.callback(top);
              this.lastTop = top;
            }
          }
        }, {
          key: "start",
          value: function start() {
            if (!this.active) {
              this.active = true;
              this.loop();
            }
          }
        }, {
          key: "stop",
          value: function stop() {
            this.active = false;
          }
        }]);
        return ScrollListener;
      }();

      _export("default", ScrollListener);
    }
  };
});;
'use strict';

System.register('flarum/utils/slidable', [], function (_export, _context) {
  function slidable(element) {
    var $element = $(element);
    var threshold = 50;

    var $underneathLeft = void 0;
    var $underneathRight = void 0;

    var startX = void 0;
    var startY = void 0;
    var couldBeSliding = false;
    var isSliding = false;
    var pos = 0;

    /**
     * Animate the slider to a new position.
     *
     * @param {Integer} newPos
     * @param {Object} [options]
     */
    var animatePos = function animatePos(newPos) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // Since we can't animate the transform property with jQuery, we'll use a
      // bit of a workaround. We set up the animation with a step function that
      // will set the transform property, but then we animate an unused property
      // (background-position-x) with jQuery.
      options.duration = options.duration || 'fast';
      options.step = function (x) {
        $(this).css('transform', 'translate(' + x + 'px, 0)');
      };

      $element.find('.Slidable-content').animate({ 'background-position-x': newPos }, options);
    };

    /**
     * Revert the slider to its original position.
     */
    var reset = function reset() {
      animatePos(0, {
        complete: function complete() {
          $element.removeClass('sliding');
          $underneathLeft.hide();
          $underneathRight.hide();
          isSliding = false;
        }
      });
    };

    $element.find('.Slidable-content').on('touchstart', function (e) {
      // Update the references to the elements underneath the slider, provided
      // they're not disabled.
      $underneathLeft = $element.find('.Slidable-underneath--left:not(.disabled)');
      $underneathRight = $element.find('.Slidable-underneath--right:not(.disabled)');

      startX = e.originalEvent.targetTouches[0].clientX;
      startY = e.originalEvent.targetTouches[0].clientY;

      couldBeSliding = true;
      pos = 0;
    }).on('touchmove', function (e) {
      var newX = e.originalEvent.targetTouches[0].clientX;
      var newY = e.originalEvent.targetTouches[0].clientY;

      // Once the user moves their touch in a direction that's more up/down than
      // left/right, we'll assume they're scrolling the page. But if they do
      // move in a horizontal direction at first, then we'll lock their touch
      // into the slider.
      if (couldBeSliding && Math.abs(newX - startX) > Math.abs(newY - startY)) {
        isSliding = true;
      }
      couldBeSliding = false;

      if (isSliding) {
        pos = newX - startX;

        // If there are controls underneath the either side, then we'll show/hide
        // them depending on the slider's position. We also make the controls
        // icon get a bit bigger the further they slide.
        var toggle = function toggle($underneath, side) {
          if ($underneath.length) {
            var active = side === 'left' ? pos > 0 : pos < 0;

            if (active && $underneath.hasClass('Slidable-underneath--elastic')) {
              pos -= pos * 0.5;
            }
            $underneath.toggle(active);

            var scale = Math.max(0, Math.min(1, (Math.abs(pos) - 25) / threshold));
            $underneath.find('.icon').css('transform', 'scale(' + scale + ')');
          } else {
            pos = Math[side === 'left' ? 'min' : 'max'](0, pos);
          }
        };

        toggle($underneathLeft, 'left');
        toggle($underneathRight, 'right');

        $(this).css('transform', 'translate(' + pos + 'px, 0)');
        $(this).css('background-position-x', pos + 'px');

        $element.toggleClass('sliding', !!pos);

        e.preventDefault();
      }
    }).on('touchend', function () {
      // If the user releases the touch and the slider is past the threshold
      // position on either side, then we will activate the control for that
      // side. We will also animate the slider's position all the way to the
      // other side, or back to its original position, depending on whether or
      // not the side is 'elastic'.
      var activate = function activate($underneath) {
        $underneath.click();

        if ($underneath.hasClass('Slidable-underneath--elastic')) {
          reset();
        } else {
          animatePos((pos > 0 ? 1 : -1) * $element.width());
        }
      };

      if ($underneathRight.length && pos < -threshold) {
        activate($underneathRight);
      } else if ($underneathLeft.length && pos > threshold) {
        activate($underneathLeft);
      } else {
        reset();
      }

      couldBeSliding = false;
      isSliding = false;
    });

    return { reset: reset };
  }
  _export('default', slidable);

  return {
    setters: [],
    execute: function () {
      ; /**
         * The `slidable` utility adds touch gestures to an element so that it can be
         * slid away to reveal controls underneath, and then released to activate those
         * controls.
         *
         * It relies on the element having children with particular CSS classes.
         * TODO: document
         *
         * @param {DOMElement} element
         * @return {Object}
         * @property {function} reset Revert the slider to its original position. This
         *     should be called, for example, when a controls dropdown is closed.
         */
    }
  };
});;
'use strict';

System.register('flarum/utils/string', [], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      /**
       * Truncate a string to the given length, appending ellipses if necessary.
       *
       * @param {String} string
       * @param {Number} length
       * @param {Number} [start=0]
       * @return {String}
       */
      function truncate(string, length) {
        var start = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        return (start > 0 ? '...' : '') + string.substring(start, start + length) + (string.length > start + length ? '...' : '');
      }

      /**
       * Create a slug out of the given string. Non-alphanumeric characters are
       * converted to hyphens.
       *
       * @param {String} string
       * @return {String}
       */

      _export('truncate', truncate);

      function slug(string) {
        return string.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/-$|^-/g, '') || '-';
      }

      /**
       * Strip HTML tags and quotes out of the given string, replacing them with
       * meaningful punctuation.
       *
       * @param {String} string
       * @return {String}
       */

      _export('slug', slug);

      function getPlainContent(string) {
        var dom = $('<div/>').html(string.replace(/(<\/p>|<br>)/g, '$1 &nbsp;'));

        dom.find(getPlainContent.removeSelectors.join(',')).remove();

        return dom.text();
      }

      /**
       * An array of DOM selectors to remove when getting plain content.
       *
       * @type {Array}
       */

      _export('getPlainContent', getPlainContent);

      getPlainContent.removeSelectors = ['blockquote', 'script'];

      /**
       * Make a string's first character uppercase.
       *
       * @param {String} string
       * @return {String}
       */
      function ucfirst(string) {
        return string.substr(0, 1).toUpperCase() + string.substr(1);
      }

      _export('ucfirst', ucfirst);
    }
  };
});;
'use strict';

System.register('flarum/utils/stringToColor', [], function (_export, _context) {
  function hsvToRgb(h, s, v) {
    var r = void 0;
    var g = void 0;
    var b = void 0;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;g = t;b = p;break;
      case 1:
        r = q;g = v;b = p;break;
      case 2:
        r = p;g = v;b = t;break;
      case 3:
        r = p;g = q;b = v;break;
      case 4:
        r = t;g = p;b = v;break;
      case 5:
        r = v;g = p;b = q;break;
    }

    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
  }

  /**
   * Convert the given string to a unique color.
   *
   * @param {String} string
   * @return {String}
   */
  function stringToColor(string) {
    var num = 0;

    // Convert the username into a number based on the ASCII value of each
    // character.
    for (var i = 0; i < string.length; i++) {
      num += string.charCodeAt(i);
    }

    // Construct a color using the remainder of that number divided by 360, and
    // some predefined saturation and value values.
    var hue = num % 360;
    var rgb = hsvToRgb(hue / 360, 0.3, 0.9);

    return '' + rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
  }

  _export('default', stringToColor);

  return {
    setters: [],
    execute: function () {}
  };
});;
'use strict';

System.register('flarum/utils/SubtreeRetainer', [], function (_export, _context) {
  var SubtreeRetainer;
  return {
    setters: [],
    execute: function () {
      SubtreeRetainer = function () {
        /**
         * @param {...callbacks} callbacks Functions returning data to keep track of.
         */

        function SubtreeRetainer() {
          babelHelpers.classCallCheck(this, SubtreeRetainer);

          for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
            callbacks[_key] = arguments[_key];
          }

          this.callbacks = callbacks;
          this.data = {};
        }

        /**
         * Return a virtual DOM directive that will retain a subtree if no data has
         * changed since the last check.
         *
         * @return {Object|false}
         * @public
         */


        babelHelpers.createClass(SubtreeRetainer, [{
          key: 'retain',
          value: function retain() {
            var _this = this;

            var needsRebuild = false;

            this.callbacks.forEach(function (callback, i) {
              var result = callback();

              if (result !== _this.data[i]) {
                _this.data[i] = result;
                needsRebuild = true;
              }
            });

            return needsRebuild ? false : { subtree: 'retain' };
          }
        }, {
          key: 'check',
          value: function check() {
            for (var _len2 = arguments.length, callbacks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              callbacks[_key2] = arguments[_key2];
            }

            this.callbacks = this.callbacks.concat(callbacks);
          }
        }, {
          key: 'invalidate',
          value: function invalidate() {
            this.data = {};
          }
        }]);
        return SubtreeRetainer;
      }();

      _export('default', SubtreeRetainer);
    }
  };
});;
'use strict';

System.register('flarum/utils/UserControls', ['flarum/components/Button', 'flarum/components/Separator', 'flarum/components/EditUserModal', 'flarum/components/UserPage', 'flarum/utils/ItemList'], function (_export, _context) {
  var Button, Separator, EditUserModal, UserPage, ItemList;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator.default;
    }, function (_flarumComponentsEditUserModal) {
      EditUserModal = _flarumComponentsEditUserModal.default;
    }, function (_flarumComponentsUserPage) {
      UserPage = _flarumComponentsUserPage.default;
    }, function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList.default;
    }],
    execute: function () {
      _export('default', {
        controls: function controls(discussion, context) {
          var _this = this;

          var items = new ItemList();

          ['user', 'moderation', 'destructive'].forEach(function (section) {
            var controls = _this[section + 'Controls'](discussion, context).toArray();
            if (controls.length) {
              controls.forEach(function (item) {
                return items.add(item.itemName, item);
              });
              items.add(section + 'Separator', Separator.component());
            }
          });

          return items;
        },
        userControls: function userControls() {
          return new ItemList();
        },
        moderationControls: function moderationControls(user) {
          var items = new ItemList();

          if (user.canEdit()) {
            items.add('edit', Button.component({
              icon: 'pencil',
              children: app.translator.trans('core.forum.user_controls.edit_button'),
              onclick: this.editAction.bind(user)
            }));
          }

          return items;
        },
        destructiveControls: function destructiveControls(user) {
          var items = new ItemList();

          if (user.id() !== '1' && user.canDelete()) {
            items.add('delete', Button.component({
              icon: 'times',
              children: app.translator.trans('core.forum.user_controls.delete_button'),
              onclick: this.deleteAction.bind(user)
            }));
          }

          return items;
        },
        deleteAction: function deleteAction() {
          var _this2 = this;

          if (confirm(app.translator.trans('core.forum.user_controls.delete_confirmation'))) {
            this.delete().then(function () {
              if (app.current instanceof UserPage && app.current.user === _this2) {
                app.history.back();
              } else {
                window.location.reload();
              }
            });
          }
        },
        editAction: function editAction() {
          app.modal.show(new EditUserModal({ user: this }));
        }
      });
    }
  };
});