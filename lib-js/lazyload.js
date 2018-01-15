/*
lazyload是微小的（只有966字节压缩和gzip），依赖免费的JavaScript工具，可以很容易加载外部JavaScript和CSS文件的需求。

只要有可能，lazyload会自动加载资源并行的同时保证执行顺序，当你指定的URL来加载一个数组。在浏览器中，不保留的执行顺序异步加载脚本，将安全的负载脚本顺序lazyload。

使用lazyLoad当你需要一个小的，快速，安全的动态JS和CSS加载，而不需要依赖管理或其他额外功能的开销，较大的脚本装载机提供。
*/

// Load a single JavaScript file and execute a callback when it finishes.
/*
LazyLoad.js('http://example.com/foo.js', function () {
    alert('foo.js has been loaded');
});

// Load multiple JS files and execute a callback when they've all finished.
LazyLoad.js(['foo.js', 'bar.js', 'baz.js'], function () {
    alert('all files have been loaded');
});

// Load a CSS file and pass an argument to the callback function.
LazyLoad.css('foo.css', function (arg) {
    alert(arg);
}, 'foo.css has been loaded');

// Load a CSS file and execute the callback in a different scope.
LazyLoad.css('foo.css', function () {
    alert(this.foo); // displays 'bar'
}, null, {foo: 'bar'});
*/


/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/**
 LazyLoad makes it easy and painless to lazily load one or more external
 JavaScript or CSS files on demand either during or after the rendering of a web
 page.

 lazyload使得它很容易和无痛懒洋洋地加载一个或多个外部
 在Web呈现过程中或之后的点播或JavaScript文件
 页。

 Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
 Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
 are not officially supported.

 支持的浏览器包括Firefox 2 +，ie6+，Safari 3 +（包括莫比尔
 Safari），谷歌浏览器和Opera 9 +。其他浏览器可能工作，也可能不工作。
 没有正式支持。

 Visit https://github.com/rgrove/lazyload/ for more info.

 Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
 All rights reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the 'Software'), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 冰将权限授予自由电荷，任何人获得一份
 本软件和相关文件档案（“软件”），在两个交易
 没有限制的软件，包括两个没有限制的权利
 使用，复制，修改，MERGE，出版，distribute，许可，和/或销售部的副本
 《软件许可证和两人的两个谁的软件furnished冰做的婊子
 受以下条件：

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 上述版权通知及本许可通知应包括在所有
 软件的副本或实质部分。

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 该软件提供的'是'，没有任何形式的保证，快递或
 暗示的，包括但不限于适销性的保证，健身
 为特定目的和不侵权。无论如何，作者或
 版权人对任何索赔、损害赔偿或其他责任承担责任，是否
 在合同、侵权或其他行为中，由、出于或在
 与软件或软件中的使用或其他交易有关。

 @module lazyload
 @class LazyLoad
 @static
 */

LazyLoad = (function (doc) {
    // -- Private Variables ------------------------------------------------------

    // User agent and feature test information.
    // 用户代理和特征测试信息。
    var env,

        // Reference to the <head> element (populated lazily).
        head,

        // Requests currently in progress, if any.
        // 正在进行中的请求，如果有的话。
        pending = {},

        // Number of times we've polled to check whether a pending stylesheet has
        // finished loading. If this gets too high, we're probably stalled.

        // 我们调查，检查是否有挂起的样式表有次数
        // 装完。如果这太高了，我们可能会停滞不前。

        pollCount = 0,

        // Queued requests.
        queue = {css: [], js: []},

        // Reference to the browser's list of stylesheets.
        // 引用样式表的浏览器的列表。
        styleSheets = doc.styleSheets;

    // -- Private Methods --------------------------------------------------------

    /**
     Creates and returns an HTML element with the specified name and attributes.
     创建并返回具有指定名称和属性的HTML元素。

     @method createNode
     @param {String} name element name
     @param {Object} attrs name/value mapping of element attributes
     @return {HTMLElement}
     @private
     */
    function createNode(name, attrs) {
        var node = doc.createElement(name), attr;

        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                node.setAttribute(attr, attrs[attr]);
            }
        }

        return node;
    }

    /**
     Called when the current pending resource of the specified type has finished
     loading. Executes the associated callback (if any) and loads the next
     resource in the queue.

     当指定类型的当前挂起资源完成时调用。
     加载.执行关联回调（如果有的话）并加载下一个回调函数。
     队列中的资源。

     @method finish
     @param {String} type resource type ('css' or 'js')
     @private
     */
    function finish(type) {
        var p = pending[type],
            callback,
            urls;

        if (p) {
            callback = p.callback;
            urls = p.urls;

            urls.shift();
            pollCount = 0;

            // If this is the last of the pending URLs, execute the callback and
            // start the next request in the queue (if any).
            // 如果这是最后一个挂起的URL，执行回调和
            // 启动队列中的下一个请求（如果有的话）。
            if (!urls.length) {
                callback && callback.call(p.context, p.obj);
                pending[type] = null;
                queue[type].length && load(type);
            }
        }
    }

    /**
     Populates the <code>env</code> variable with user agent and feature test
     information.

     @method getEnv
     @private
     */
    function getEnv() {
        var ua = navigator.userAgent;

        env = {
            // True if this browser supports disabling async mode on dynamically
            // created script nodes. See
            // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            async: doc.createElement('script').async === true
        };

        // 查看当前是哪个浏览器
        (env.webkit = /AppleWebKit\//.test(ua))
        || (env.ie = /MSIE|Trident/.test(ua))
        || (env.opera = /Opera/.test(ua))
        || (env.gecko = /Gecko\//.test(ua))
        || (env.unknown = true);
    }

    /**
     Loads the specified resources, or the next resource of the specified type
     in the queue if no resources are specified. If a resource of the specified
     type is already being loaded, the new request will be queued until the
     first request has been finished.

     加载指定的资源或指定类型的下一个资源。
     如果没有指定资源，则在队列中。如果指定的资源
     类型已经加载，新的请求将被排队直到
     第一个请求已经完成。

     When an array of resource URLs is specified, those URLs will be loaded in
     parallel if it is possible to do so while preserving execution order. All
     browsers support parallel loading of CSS, but only Firefox and Opera
     support parallel loading of scripts. In other browsers, scripts will be
     queued and loaded one at a time to ensure correct execution order.

     当指定资源URL数组时，将加载这些URL。
     并行，如果可以这样做，同时保留执行顺序。所有
     浏览器支持CSS的并行加载，但只有Firefox和Opera。
     支持脚本的并行加载。在其他浏览器中，脚本将是
     每次排队并加载一个，以确保正确的执行顺序。

     @method load
     @param {String} type resource type ('css' or 'js')
     @param {String|Array} urls (optional) URL or array of URLs to load
     @param {Function} callback (optional) callback function to execute when the
     resource is loaded
     @param {Object} obj (optional) object to pass to the callback function
     @param {Object} context (optional) if provided, the callback function will
     be executed in this object's context
     @private
     */
    function load(type, urls, callback, obj, context) {
        var _finish = function () {
                finish(type);
            },
            isCSS = type === 'css',
            nodes = [],
            i, len, node, p, pendingUrls, url;

        env || getEnv();

        if (urls) {
            // If urls is a string, wrap it in an array. Otherwise assume it's an
            // array and create a copy of it so modifications won't be made to the
            // original.
            urls = typeof urls === 'string' ? [urls] : urls.concat();

            // Create a request object for each URL. If multiple URLs are specified,
            // the callback will only be executed after all URLs have been loaded.
            //
            // Sadly, Firefox and Opera are the only browsers capable of loading
            // scripts in parallel while preserving execution order. In all other
            // browsers, scripts must be loaded sequentially.
            //
            // All browsers respect CSS specificity based on the order of the link
            // elements in the DOM, regardless of the order in which the stylesheets
            // are actually downloaded.
            if (isCSS || env.async || env.gecko || env.opera) {
                // Load in parallel.
                queue[type].push({
                    urls: urls,
                    callback: callback,
                    obj: obj,
                    context: context
                });
            } else {
                // Load sequentially.
                for (i = 0, len = urls.length; i < len; ++i) {
                    queue[type].push({
                        urls: [urls[i]],
                        callback: i === len - 1 ? callback : null, // callback is only added to the last URL
                        obj: obj,
                        context: context
                    });
                }
            }
        }

        // If a previous load request of this type is currently in progress, we'll
        // wait our turn. Otherwise, grab the next item in the queue.
        if (pending[type] || !(p = pending[type] = queue[type].shift())) {
            return;
        }

        head || (head = doc.head || doc.getElementsByTagName('head')[0]);
        pendingUrls = p.urls.concat();

        for (i = 0, len = pendingUrls.length; i < len; ++i) {
            url = pendingUrls[i];

            if (isCSS) {
                node = env.gecko ? createNode('style') : createNode('link', {
                    href: url,
                    rel: 'stylesheet'
                });
            } else {
                node = createNode('script', {src: url});
                node.async = false;
            }

            node.className = 'lazyload';
            node.setAttribute('charset', 'utf-8');

            if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
                node.onreadystatechange = function () {
                    if (/loaded|complete/.test(node.readyState)) {
                        node.onreadystatechange = null;
                        _finish();
                    }
                };
            } else if (isCSS && (env.gecko || env.webkit)) {
                // Gecko and WebKit don't support the onload event on link nodes.
                if (env.webkit) {
                    // In WebKit, we can poll for changes to document.styleSheets to
                    // figure out when stylesheets have loaded.
                    p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
                    pollWebKit();
                } else {
                    // In Gecko, we can import the requested URL into a <style> node and
                    // poll for the existence of node.sheet.cssRules. Props to Zach
                    // Leatherman for calling my attention to this technique.
                    node.innerHTML = '@import "' + url + '";';
                    pollGecko(node);
                }
            } else {
                node.onload = node.onerror = _finish;
            }

            nodes.push(node);
        }

        for (i = 0, len = nodes.length; i < len; ++i) {
            head.appendChild(nodes[i]);
        }
    }

    /**
     Begins polling to determine when the specified stylesheet has finished loading
     in Gecko. Polling stops when all pending stylesheets have loaded or after 10
     seconds (to prevent stalls).

     Thanks to Zach Leatherman for calling my attention to the @import-based
     cross-domain technique used here, and to Oleg Slobodskoi for an earlier
     same-domain implementation. See Zach's blog for more details:
     http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

     @method pollGecko
     @param {HTMLElement} node Style node to poll.
     @private
     */
    function pollGecko(node) {
        var hasRules;

        try {
            // We don't really need to store this value or ever refer to it again, but
            // if we don't store it, Closure Compiler assumes the code is useless and
            // removes it.
            hasRules = !!node.sheet.cssRules;
        } catch (ex) {
            // An exception means the stylesheet is still loading.
            pollCount += 1;

            if (pollCount < 200) {
                setTimeout(function () {
                    pollGecko(node);
                }, 50);
            } else {
                // We've been polling for 10 seconds and nothing's happened. Stop
                // polling and finish the pending requests to avoid blocking further
                // requests.
                hasRules && finish('css');
            }

            return;
        }

        // If we get here, the stylesheet has loaded.
        finish('css');
    }

    /**
     Begins polling to determine when pending stylesheets have finished loading
     in WebKit. Polling stops when all pending stylesheets have loaded or after 10
     seconds (to prevent stalls).

     @method pollWebKit
     @private
     */
    function pollWebKit() {
        var css = pending.css, i;

        if (css) {
            i = styleSheets.length;

            // Look for a stylesheet matching the pending URL.
            while (--i >= 0) {
                if (styleSheets[i].href === css.urls[0]) {
                    finish('css');
                    break;
                }
            }

            pollCount += 1;

            if (css) {
                if (pollCount < 200) {
                    setTimeout(pollWebKit, 50);
                } else {
                    // We've been polling for 10 seconds and nothing's happened, which may
                    // indicate that the stylesheet has been removed from the document
                    // before it had a chance to load. Stop polling and finish the pending
                    // request to prevent blocking further requests.
                    finish('css');
                }
            }
        }
    }

    return {

        /**
         Requests the specified CSS URL or URLs and executes the specified
         callback (if any) when they have finished loading. If an array of URLs is
         specified, the stylesheets will be loaded in parallel and the callback
         will be executed after all stylesheets have finished loading.

         @method css
         @param {String|Array} urls CSS URL or array of CSS URLs to load
         @param {Function} callback (optional) callback function to execute when
         the specified stylesheets are loaded
         @param {Object} obj (optional) object to pass to the callback function
         @param {Object} context (optional) if provided, the callback function
         will be executed in this object's context
         @static
         */
        css: function (urls, callback, obj, context) {
            load('css', urls, callback, obj, context);
        },

        /**
         Requests the specified JavaScript URL or URLs and executes the specified
         callback (if any) when they have finished loading. If an array of URLs is
         specified and the browser supports it, the scripts will be loaded in
         parallel and the callback will be executed after all scripts have
         finished loading.

         Currently, only Firefox and Opera support parallel loading of scripts while
         preserving execution order. In other browsers, scripts will be
         queued and loaded one at a time to ensure correct execution order.

         @method js
         @param {String|Array} urls JS URL or array of JS URLs to load
         @param {Function} callback (optional) callback function to execute when
         the specified scripts are loaded
         @param {Object} obj (optional) object to pass to the callback function
         @param {Object} context (optional) if provided, the callback function
         will be executed in this object's context
         @static
         */
        js: function (urls, callback, obj, context) {
            load('js', urls, callback, obj, context);
        }

    };
})(this.document);