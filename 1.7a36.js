(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{177:function(t,n,o){"use strict";var e,i=o(7),r=o(28),s=(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),a=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return s(n,t),n.prototype.connectedCallback=function(){var n=this;t.prototype.connectedCallback.call(this),this._onStoreChange(r.a.getState()),this.__unsubscribe=r.a.subscribe(function(){return n._onStoreChange(r.a.getState())})},n.prototype.disconnectedCallback=function(){t.prototype.disconnectedCallback.call(this),this.__unsubscribe(),t.prototype.disconnectedCallback&&t.prototype.disconnectedCallback.call(this)},n.prototype._onStoreChange=function(t){this.stateReceiver(t)},n}(i.a);o.d(n,"a",function(){return p});var c=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}(),p=function(t){function n(){var n=t.call(this)||this;return n._visible=!0,n._definePropertyAccessor("_visible"),n.classList.add("l-page","e-fade","e-from-left"),n}return c(n,t),n.prototype.enter=function(){this.classList.add("isVisible")},n.prototype.leave=function(){this.classList.remove("isVisible")},n.prototype._onStoreChange=function(n){t.prototype._onStoreChange.call(this,n);var o=this.isVisible(n);o?this.enter():this.leave(),this._visible=o},n.prototype._shouldRender=function(t,n,o){return this._visible},n}(a)},178:function(t,n,o){var e;
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function i(){for(var t=[],n=0;n<arguments.length;n++){var e=arguments[n];if(e){var r=typeof e;if("string"===r||"number"===r)t.push(e);else if(Array.isArray(e))t.push(i.apply(null,e));else if("object"===r)for(var s in e)o.call(e,s)&&e[s]&&t.push(s)}}return t.join(" ")}void 0!==t&&t.exports?t.exports=i:void 0===(e=function(){return i}.apply(n,[]))||(t.exports=e)}()},179:function(t,n,o){"use strict";o.r(n);var e,i,r=o(7),s=o(28),a=o(25),c=(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),p=o(178),u=o.n(p),l=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}(),d=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.inited=!1,n}return l(n,t),Object.defineProperty(n,"properties",{get:function(){return{title:String,done:Boolean,inited:Boolean}},enumerable:!0,configurable:!0}),n.prototype._render=function(t){return Object(r.b)(i||(i=function(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t}(['\n            <style>\n                .item {\n                    background: #474357;\n                    padding: 10px 15px;\n                    border-radius: 3px;\n                    margin-top: 5px;\n                    display: flex;\n                    cursor: pointer;\n                    transition: .5s;\n                    opacity: 1;\n                    transform: translate(0)\n                }\n                \n                .item.isNotInited {\n                    opacity: 0;\n                    transform: translateY(-15px);\n                }\n                \n                .item--content {\n                    flex-grow: 1;\n                    flex-shrink: 1;\n                }\n                \n                .item--content.isDone {\n                    text-decoration: line-through;\n                }\n                \n                .item--menu {\n                    flex-grow: 0;\n                    flex-shrink: 0;\n                }\n                \n                .action {\n                    text-decoration: underline;\n                }\n            </style>\n            \n            <div class$="item ','" on-click="','">\n                <div class$="item--content ','">\n                    <slot></slot>\n                </div>\n                <div class="item--menu">\n                    <span class="action" on-click="','">Delete</span>\n                </div>\n            </div>\n        '],['\n            <style>\n                .item {\n                    background: #474357;\n                    padding: 10px 15px;\n                    border-radius: 3px;\n                    margin-top: 5px;\n                    display: flex;\n                    cursor: pointer;\n                    transition: .5s;\n                    opacity: 1;\n                    transform: translate(0)\n                }\n                \n                .item.isNotInited {\n                    opacity: 0;\n                    transform: translateY(-15px);\n                }\n                \n                .item--content {\n                    flex-grow: 1;\n                    flex-shrink: 1;\n                }\n                \n                .item--content.isDone {\n                    text-decoration: line-through;\n                }\n                \n                .item--menu {\n                    flex-grow: 0;\n                    flex-shrink: 0;\n                }\n                \n                .action {\n                    text-decoration: underline;\n                }\n            </style>\n            \n            <div class$="item ','" on-click="','">\n                <div class$="item--content ','">\n                    <slot></slot>\n                </div>\n                <div class="item--menu">\n                    <span class="action" on-click="','">Delete</span>\n                </div>\n            </div>\n        '])),u()({isNotInited:!this.inited}),this.dispatchDone.bind(this),u()({isDone:this.done}),this.dispatchDelete.bind(this))},n.prototype._firstRendered=function(){var t=this;setTimeout(function(){return t.inited=!0},150)},n.prototype.dispatchDelete=function(){console.log("Delete todo",this.title),this.dispatchEvent(new CustomEvent("delete"))},n.prototype.dispatchDone=function(t){t.target!==this.shadowRoot.querySelector(".action")&&(console.log("Complete todo",this.title),this.dispatchEvent(new CustomEvent("done-toggle")))},n}(r.a);customElements.define("todo-item",d);var f=o(177),h=o(45);o.d(n,"TodosPage",function(){return m});var y,v,_=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}(),b=function(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t},m=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.todoInput="",n._todos=[],n}return _(n,t),Object.defineProperty(n,"properties",{get:function(){return{todoInput:String,_todos:Array}},enumerable:!0,configurable:!0}),n.prototype._render=function(t){var n=this;return Object(r.b)(v||(v=b(['\n            <section class="todos l-container">\n                <form class="form" on-submit="','">\n                    <input class="todos--input form--floatinput l-width-100" \n                           placeholder="My todo is..."\n                           value="','"\n                           on-change="','">\n                </form>\n                <ul class="todos--items">\n                    ',"\n                </ul>\n            </section>\n        "],['\n            <section class="todos l-container">\n                <form class="form" on-submit="','">\n                    <input class="todos--input form--floatinput l-width-100" \n                           placeholder="My todo is..."\n                           value="','"\n                           on-change="','">\n                </form>\n                <ul class="todos--items">\n                    ',"\n                </ul>\n            </section>\n        "])),this.addTodo.bind(this),this.get("todoInput"),this.set("todoInput","value"),this._todos.map(function(t){return Object(r.b)(y||(y=b(['\n                        <li>\n                            <todo-item done="','"\n                                       on-done-toggle="','"\n                                       on-delete="','">',"</todo-item>\n                        </li>"],['\n                        <li>\n                            <todo-item done="','"\n                                       on-done-toggle="','"\n                                       on-delete="','">',"</todo-item>\n                        </li>"])),t.done,function(){return n.toggleTodo(t)},function(){return n.removeTodo(t)},t.title)}))},n.prototype._createRoot=function(){return this},n.prototype.stateReceiver=function(t){this._todos=t.todo.data},n.prototype.isVisible=function(t){return t.app.location.route==h.a.app.routes.root},n.prototype.addTodo=function(t){t.preventDefault();var n=this.todoInput;if(!n)return console.log("No value to add todo");s.a.dispatch(a.b.addTodo({title:n,done:!1})),this.todoInput=""},n.prototype.removeTodo=function(t){s.a.dispatch(a.b.removeTodo(t))},n.prototype.toggleTodo=function(t){s.a.dispatch(a.b.toggleTodo(t))},n}(function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.set=function(t,n){var o=this;return function(e){return o._safelySetPropValue(t.split("."),e.currentTarget[n])}}.bind(n),n.get=function(t){return this._safelyNavigate(t.split("."),this)}.bind(n),n}return c(n,t),n.prototype._safelyNavigate=function(t,n){if(void 0===n||null===n||t.length<1)return n;var o=t.shift();return this._safelyNavigate(t,n[o])},n.prototype._safelySetPropValue=function(t,n,o){var e=o||this;if(t.length>1){var i=t.shift();return e[i]="object"==typeof e[i]?e[i]:{},this._safelySetPropValue(t,n,e[i])}return e[t.shift()]=n},n}(f.a));customElements.define("todos-page",m)}}]);