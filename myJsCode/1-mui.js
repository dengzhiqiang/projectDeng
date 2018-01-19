var mui = (function (document, undefined) {
    // uninitialized(为初始化)：对象存在但尚未初始化。
    // loading(正在加载)：对象正在加载数据。
    // loaded(加载完毕)：对象加载数据完成。
    // interactive(交互)：可以操作对象了，但还没有完全加载。
    // complete(完成)：对象已经加载完毕。
    var readyRE = /complete|loaded|interactive/;


    var $ = function () {

    };

    $.noop = function () {
    };

    /**
     * extend(simple)
     * @param {type} target
     * @param {type} source
     * @param {type} deep
     * @returns {unresolved}
     */
    $.extend = function () { //from jquery2
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== "object" && !$.isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];

                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }

                        target[name] = $.extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };
    /**
     * slice(array)
     */
    $.slice = [].slice;
    /**
     *  filter(array)
     */
    $.filter = [].filter;

    // 类型判断对象
    var class2type = {};
    var toString = class2type.toString;

    $.type = function (mix) {
        // undefined == null ==> true
        // undefined + '' =  undefined
        // null + '' = null
        if (mix == null) return mix + '';
        // type参数不是null,则先判断class2Type中是否有相应的成员,如果存在着返回成员值,否则返回object
        return typeof mix === 'object' || typeof  mix === 'function'
            ? class2type[toString.call(mix)] || 'object '
            : typeof mix;
    };
    /**
     * 判断是否为类数组
     * @param obj
     * @returns {boolean}
     */
    $.isArrayLike = function (obj) {
        var length = !!obj && "length" in obj && obj.length;
        var type = $.type(obj);
        if (type === "function" || $.isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };

    /**
     *  isWindow(obj为undefined)
     */
    $.isWindow = function (obj) {
        return obj != null && obj === obj.window;
    };

    /**
     *  isObject
     */
    $.isObject = function (obj) {
        return $.type(obj) === "object";
    };

    /**
     * isPlainObject 是否是纯粹的对象
     */
    $.isPlainObject = function (obj) {
        return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
    };

    /**
     * 是否是空对象
     * isEmptyObject
     * @param {Object} o
     */
    $.isEmptyObject = function (obj) {
        var k;
        for (k in obj) {
            return false;
        }
        return true;
    };

    /**
     * 是否是函数
     * isFunction
     */
    $.isFunction = function (value) {
        return $.type(value) === "function";
    };

    /**
     *
     * @param obj 数组，类数组，或者对象
     * @param callback
     */
    $.each = function (obj, callback) {
        var length, i;
        if ($.isArrayLike(obj)) {
            // 数组用for循环 可以保证顺序
            for (i = 0, length = obj.length; i < length; i++) {
                /*
                 * $.each(obj,function(k,v)){
                 *     return false; // 如果return false 则退出，不在进行循环
                 * }
                 */
                if (callback.call(obj[i], i, obj[i]) === false) break;
            }
        } else {
            for (i in obj) {
                /*
                 * $.each(obj,function(k,v)){
                 *     return false; // 如果return false 则退出，不在进行循环
                 * }
                 */
                if (callback.call(obj[i], i, obj[i]) === false) break;
            }
        }
    };

    /**
     * ready(DOMContentLoaded)
     * @param {type} callback
     * @returns {_L6.$}
     */
    $.ready = function (callback) {
        if (readyRE.test(document.readyState)) {
            callback($);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                callback($);
            }, false);
        }
        return this;
    };

    $.qsa = function (selector, context) {
        // 判断selector 是id #box这样的选择器
        context = context || document;
        return context.querySelectorAll(selector);
    };


    $.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    window.$ = $;
    return $;
})(document);