/*!
 * long-press-event - v2.2.1
 * Pure JavaScript long-press-event
 * https://github.com/john-doherty/long-press-event
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function (e, t) { "use strict"; var n = null, a = "ontouchstart" in e || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, i = a ? "touchstart" : "mousedown", o = a ? "touchend" : "mouseup", m = a ? "touchmove" : "mousemove", u = 0, r = 0, s = 10, c = 10; function l(i) { v(i); var m = i.target, u = parseInt(m.getAttribute("data-long-press-delay") || "1500", 10); n = function (t, n) { if (!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame)) return e.setTimeout(t, n); var a = (new Date).getTime(), i = {}, o = function () { (new Date).getTime() - a >= n ? t.call() : i.value = requestAnimFrame(o) }; return i.value = requestAnimFrame(o), i }(function (e) { v(); var n = a ? e.touches[0].clientX : e.clientX, i = a ? e.touches[0].clientY : e.clientY; this.dispatchEvent(new CustomEvent("long-press", { bubbles: !0, cancelable: !0, detail: { clientX: n, clientY: i } })) && t.addEventListener(o, function e(n) { t.removeEventListener(o, e, !0), function (e) { e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation() }(n) }, !0) }.bind(m, i), u) } function v(t) { var a; (a = n) && (e.cancelAnimationFrame ? e.cancelAnimationFrame(a.value) : e.webkitCancelAnimationFrame ? e.webkitCancelAnimationFrame(a.value) : e.webkitCancelRequestAnimationFrame ? e.webkitCancelRequestAnimationFrame(a.value) : e.mozCancelRequestAnimationFrame ? e.mozCancelRequestAnimationFrame(a.value) : e.oCancelRequestAnimationFrame ? e.oCancelRequestAnimationFrame(a.value) : e.msCancelRequestAnimationFrame ? e.msCancelRequestAnimationFrame(a.value) : clearTimeout(a)), n = null } "function" != typeof e.CustomEvent && (e.CustomEvent = function (e, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = t.createEvent("CustomEvent"); return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a }, e.CustomEvent.prototype = e.Event.prototype), e.requestAnimFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) { e.setTimeout(t, 1e3 / 60) }, t.addEventListener(o, v, !0), t.addEventListener(m, function (e) { var t = Math.abs(u - e.clientX), n = Math.abs(r - e.clientY); (t >= s || n >= c) && v() }, !0), t.addEventListener("wheel", v, !0), t.addEventListener("scroll", v, !0), t.addEventListener(i, function (e) { u = e.clientX, r = e.clientY, l(e) }, !0) }(window, document);
// end of long-press-event

// https://cdn.jsdelivr.net/npm/redom@3.27.1
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).redom={})}(this,(function(e){"use strict";function t(e,t){var i=function(e){for(var t=e.split(/([#.])/),i="",n="",o=[],r=0;r<t.length;r++){var l=t[r];"#"===l?n=t[++r]:"."===l?o.push(t[++r]):l.length&&(i=l)}return{tag:i||"div",id:n,className:o.join(" ")}}(e),n=i.tag,o=i.id,r=i.className,l=t?document.createElementNS(t,n):document.createElement(n);return o&&(l.id=o),r&&(t?l.setAttribute("class",r):l.className=r),l}function i(e,t){var i=m(e),o=m(t);return t===o&&o.__redom_view&&(t=o.__redom_view),o.parentNode&&(n(t,o,i),i.removeChild(o)),t}function n(e,t,i){var n=t.__redom_lifecycle;if(o(n))t.__redom_lifecycle={};else{var r=i;for(t.__redom_mounted&&u(t,"onunmount");r;){var l=r.__redom_lifecycle||{};for(var s in n)l[s]&&(l[s]-=n[s]);o(l)&&(r.__redom_lifecycle=null),r=r.parentNode}}}function o(e){if(null==e)return!0;for(var t in e)if(e[t])return!1;return!0}var r=["onmount","onremount","onunmount"],l="undefined"!=typeof window&&"ShadowRoot"in window;function s(e,t,i,o){var s=m(e),a=m(t);t===a&&a.__redom_view&&(t=a.__redom_view),t!==a&&(a.__redom_view=t);var f=a.__redom_mounted,d=a.parentNode;return f&&d!==s&&n(0,a,d),null!=i?o?s.replaceChild(a,m(i)):s.insertBefore(a,m(i)):s.appendChild(a),function(e,t,i,n){for(var o=t.__redom_lifecycle||(t.__redom_lifecycle={}),s=i===n,a=!1,f=0,d=r;f<d.length;f+=1){var h=d[f];s||e!==t&&h in e&&(o[h]=(o[h]||0)+1),o[h]&&(a=!0)}if(!a)return void(t.__redom_lifecycle={});var v=i,c=!1;(s||v&&v.__redom_mounted)&&(u(t,s?"onremount":"onmount"),c=!0);for(;v;){var _=v.parentNode,p=v.__redom_lifecycle||(v.__redom_lifecycle={});for(var w in o)p[w]=(p[w]||0)+o[w];if(c)break;(v.nodeType===Node.DOCUMENT_NODE||l&&v instanceof ShadowRoot||_&&_.__redom_mounted)&&(u(v,s?"onremount":"onmount"),c=!0),v=_}}(t,a,s,d),t}function u(e,t){"onmount"===t||"onremount"===t?e.__redom_mounted=!0:"onunmount"===t&&(e.__redom_mounted=!1);var i=e.__redom_lifecycle;if(i){var n=e.__redom_view,o=0;for(var r in n&&n[t]&&n[t](),i)r&&o++;if(o)for(var l=e.firstChild;l;){var s=l.nextSibling;u(l,t),l=s}}}function a(e,t,i){var n=m(e);if("object"==typeof t)for(var o in t)f(n,o,t[o]);else f(n,t,i)}function f(e,t,i){e.style[t]=null==i?"":i}var d="http://www.w3.org/1999/xlink";function h(e,t,i,n){var o=m(e);if("object"==typeof t)for(var r in t)h(o,r,t[r],n);else{var l=o instanceof SVGElement,s="function"==typeof i;if("style"===t&&"object"==typeof i)a(o,i);else if(l&&s)o[t]=i;else if("dataset"===t)c(o,i);else if(l||!(t in o)&&!s||"list"===t){if(l&&"xlink"===t)return void v(o,i);n&&"class"===t&&(i=o.className+" "+i),null==i?o.removeAttribute(t):o.setAttribute(t,i)}else o[t]=i}}function v(e,t,i){if("object"==typeof t)for(var n in t)v(e,n,t[n]);else null!=i?e.setAttributeNS(d,t,i):e.removeAttributeNS(d,t,i)}function c(e,t,i){if("object"==typeof t)for(var n in t)c(e,n,t[n]);else null!=i?e.dataset[t]=i:delete e.dataset[t]}function _(e){return document.createTextNode(null!=e?e:"")}function p(e,t,i){for(var n=0,o=t;n<o.length;n+=1){var r=o[n];if(0===r||r){var l=typeof r;"function"===l?r(e):"string"===l||"number"===l?e.appendChild(_(r)):y(m(r))?s(e,r):r.length?p(e,r,i):"object"===l&&h(e,r,null,i)}}}function w(e){return"string"==typeof e?b(e):m(e)}function m(e){return e.nodeType&&e||!e.el&&e||m(e.el)}function y(e){return e&&e.nodeType}var g={};function b(e){for(var t,i=[],n=arguments.length-1;n-- >0;)i[n]=arguments[n+1];var o=typeof e;if("string"===o)t=k(e).cloneNode(!1);else if(y(e))t=e.cloneNode(!1);else{if("function"!==o)throw new Error("At least one argument required");var r=e;t=new(Function.prototype.bind.apply(r,[null].concat(i)))}return p(m(t),i,!0),t}var N=b,x=b;function k(e){return g[e]||(g[e]=t(e))}function S(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];for(var o=m(e),r=A(e,t,o.firstChild);r;){var l=r.nextSibling;i(e,r),r=l}}function A(e,t,i){for(var n=i,o=new Array(t.length),r=0;r<t.length;r++)o[r]=t[r]&&m(t[r]);for(var l=0;l<t.length;l++){var u=t[l];if(u){var a=o[l];if(a!==n)if(y(a)){var f=n&&n.nextSibling,d=null!=u.__redom_index&&f===o[l+1];s(e,u,n,d),d&&(n=f)}else null!=u.length&&(n=A(e,u,n));else n=n.nextSibling}}return n}b.extend=function(e){for(var t=[],i=arguments.length-1;i-- >0;)t[i]=arguments[i+1];var n=k(e);return b.bind.apply(b,[this,n].concat(t))};var D=function(e,t,i){this.View=e,this.initData=i,this.oldLookup={},this.lookup={},this.oldViews=[],this.views=[],null!=t&&(this.key="function"==typeof t?t:function(e){return function(t){return t[e]}}(t))};function V(e,t,i,n){return new j(e,t,i,n)}D.prototype.update=function(e,t){for(var i=this.View,n=this.key,o=this.initData,r=null!=n,l=this.lookup,s={},u=new Array(e.length),a=this.views,f=0;f<e.length;f++){var d=e[f],h=void 0;if(r){var v=n(d);h=l[v]||new i(o,d,f,e),s[v]=h,h.__redom_id=v}else h=a[f]||new i(o,d,f,e);h.update&&h.update(d,f,e,t),m(h.el).__redom_view=h,u[f]=h}this.oldViews=a,this.views=u,this.oldLookup=l,this.lookup=s};var j=function(e,t,i,n){this.View=t,this.initData=n,this.views=[],this.pool=new D(t,i,n),this.el=w(e),this.keySet=null!=i};j.prototype.update=function(e,t){void 0===e&&(e=[]);var n=this.keySet,o=this.views;this.pool.update(e,t);var r=this.pool,l=r.views,s=r.lookup;if(n)for(var u=0;u<o.length;u++){var a=o[u];null==s[a.__redom_id]&&(a.__redom_index=null,i(this,a))}for(var f=0;f<l.length;f++){l[f].__redom_index=f}S(this,l),n&&(this.lookup=s),this.views=l},j.extend=function(e,t,i,n){return j.bind(j,e,t,i,n)},V.extend=j.extend;var C=function(e,t){this.el=_(""),this.visible=!1,this.view=null,this._placeholder=this.el,e instanceof Node?this._el=e:e.el instanceof Node?(this._el=e,this.view=e):this._View=e,this._initData=t};C.prototype.update=function(e,t){var n=this._placeholder,o=this.el.parentNode;if(e){if(!this.visible)if(this._el)s(o,this._el,n),i(o,n),this.el=m(this._el),this.visible=e;else{var r=new(0,this._View)(this._initData);this.el=m(r),this.view=r,s(o,r,n),i(o,n)}this.view&&this.view.update&&this.view.update(t)}else if(this.visible){if(this._el)return s(o,n,this._el),i(o,this._el),this.el=n,void(this.visible=e);s(o,n,this.view),i(o,this.view),this.el=n,this.view=null}this.visible=e};var E=function(e,t,i){this.el=w(e),this.Views=t,this.initData=i};E.prototype.update=function(e,t){if(e!==this.route){var i=this.Views[e];this.route=e,i&&(i instanceof Node||i.el instanceof Node)?this.view=i:this.view=i&&new i(this.initData,t),S(this.el,[this.view])}this.view&&this.view.update&&this.view.update(t,e)};var T="http://www.w3.org/2000/svg",L={};function P(e){for(var t,i=[],n=arguments.length-1;n-- >0;)i[n]=arguments[n+1];var o=typeof e;if("string"===o)t=R(e).cloneNode(!1);else if(y(e))t=e.cloneNode(!1);else{if("function"!==o)throw new Error("At least one argument required");var r=e;t=new(Function.prototype.bind.apply(r,[null].concat(i)))}return p(m(t),i,!0),t}var O=P;function R(e){return L[e]||(L[e]=t(e,T))}P.extend=function(e){var t=R(e);return P.bind(this,t)},P.ns=T,e.List=j,e.ListPool=D,e.Place=C,e.Router=E,e.el=N,e.h=x,e.html=b,e.list=V,e.listPool=function(e,t,i){return new D(e,t,i)},e.mount=s,e.place=function(e,t){return new C(e,t)},e.router=function(e,t,i){return new E(e,t,i)},e.s=O,e.setAttr=function(e,t,i){h(e,t,i)},e.setChildren=S,e.setData=c,e.setStyle=a,e.setXlink=v,e.svg=P,e.text=_,e.unmount=i,Object.defineProperty(e,"__esModule",{value:!0})}));

const { el, mount } = redom;


function setRemoteData(method, data) {
    /* data.key = "tempkey"

    if (!data.key) {
        return
    } */

    if (!['POST','PUT','DELETE'].includes(method)) return

    let url = "https://api.todo.app.5ls.de/abcdefghijklmnopqrtsvwxyz"

    if (['PUT','DELETE'].includes(method)) {
        url += '/' + data._id
    }
    

    data._createdOn = undefined
    data._id = undefined

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }


    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log('Request failed', error)
        })
}


var list = document.getElementById("list")


function createTodo(data) {
    let div_item = el(".item.row",{ id: data._id })
    let div_circle = el(".column.circle")
    let div_arrow = el(".column.arrow",el("img.float-right", {src: "https://res.cloudinary.com/demo/image/fetch/https://www.svgrepo.com/show/92420/right-arrow.svg"}))
    let div_numberCircle = el(".numberCircle.float-right")

    if (data.checked == "false") {
        div_numberCircle.innerText = data.priority
    } else {
        div_item.classList.add("checked")
        let img_checked = el("img", {src: "https://res.cloudinary.com/demo/image/fetch/https://www.svgrepo.com/show/101837/correct-signal.svg"})

        div_numberCircle.append(img_checked)
    }

    div_circle.append(div_numberCircle)
    div_item.append(div_arrow)
    div_item.append(div_circle)

    div_circle.addEventListener('click',function (e) {
        if (data.checked == "true") {
            data.checked = "false"
            div_numberCircle.innerText = data.priority
            div_item.classList.remove("checked")
        } else {
            data.checked = "true"
            div_item.classList.add("checked")
            let img_checked = el("img", {src: "https://res.cloudinary.com/demo/image/fetch/https://www.svgrepo.com/show/101837/correct-signal.svg"})
    
            div_numberCircle.innerText = ""
            div_numberCircle.append(img_checked)
        }
        setRemoteData('PUT',data)
    })


    let div_80 = el(".column.column-80",{innerText : data.value})    


    div_80.addEventListener('dblclick', function (e) {
        if (this.getAttribute("contenteditable")=="true") return

        this.setAttribute("contenteditable", "true")
        this.focus()
        
        this.addEventListener('keydown',function (e) {
            if ((!e.shiftKey && e.key == "Enter") || e.key == "Escape") {
                this.blur()
                return false
            }
        })
    
        this.addEventListener('blur',function (e) {
            this.setAttribute("contenteditable", "false")
            data.value = this.innerText
            setRemoteData('PUT',data)
        })
    })

    div_item.append(div_80)
    

    /* let div_column = el(".column",el(".buttons.row",el(".column.delete",{innerText: "x"})))
    div_item.append(div_column) */


    return div_item
}

function toogleBetween(value,first,second) {
    if (value == first) {
        value = second
    } else if (value == second) {
        value = first
    }
}

function createChild(data) {

    let parent = document.getElementById(data.parent)
    let arrow = parent.getElementsByClassName("arrow")[0]
    let child = createTodo(data)

    let div_indents = document.getElementsByClassName("parent-"+data.parent)
    let div_indent
    if (div_indents[0]) {
        div_indent = div_indents[0]
    } else {
        div_indent = document.createElement("div")
        div_indent.classList.add("indent","parent-"+data.parent)
        arrow.classList.add("showarrow","rotated")
        arrow.addEventListener('click',function (e) {
            if (div_indent.style.display == "") {
                div_indent.style.display = "none"
                this.classList.remove("rotated")
            } else {
                div_indent.style.display = ""
                this.classList.add("rotated")
            }
        })
    }
    
    div_indent.append(document.createElement("hr"))
    div_indent.append(child)
    parent.after(div_indent)  
}


fetch("https://api.todo.app.5ls.de/abcdefghijklmnopqrtsvwxyz")
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            
            let withParent = []

            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i])

                    if (data[i].parent && data[i].parent != "") {
                        withParent.push(data[i])
                    } else {
                        if (i>0) list.append(document.createElement("hr"))
                        list.append(createTodo(data[i]))
                    }
                }
                list.append(document.createElement("hr"))
            }
            
            if (withParent.length > 0) {
                for (let i = 0; i < withParent.length; i++) {
                    console.log(withParent[i])
                    createChild(withParent[i])
                }
            }








        })
        .catch((error) => {
            console.log('Request failed', error)
        })