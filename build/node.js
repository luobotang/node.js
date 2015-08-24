(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.node = require('./lib/node.js')
},{"./lib/node.js":2}],2:[function(require,module,exports){
var isArray = require('./utils/isArray')
var isVoidElement = require('./utils/isVoidElement')
var attrs2str = require('./utils/attrs2str')

/*
 * 构建 HTML 片段
 * @example
 *   node('div', {'class': 'message', 'data-name': 'xxxx'},
 *     node('p', 'line one'),
 *     node('p', 'line two')
 *   )
 * @param {string} tag
 * @param {Object} [attrs]
 * @param {string} [...children]
 * @returns {string} - HTML fragment
 */
function node(tag, attrs, children) {
	var isVoidElement = isVoidElement(tag)
	var childrenStart = 2
	var content = ''

	if (attrs && typeof attrs === 'object') {
		attrs = attrs2str(attrs)
	} else {
		attrs = null
		childrenStart = 1
	}

	attrs = attrs ? ' ' + attrs : '';

	if (!isVoidElement && arguments.length > childrenStart) {
		children = [].slice.call(arguments, childrenStart)
		content = children.join('')
	}

	var tagStart = '<' + tag + attrs + '>'
	var tagEnd = '</' + tag + '>'

	return isVoidElement ?
		tagStart :
		tagStart + content + tagEnd
}

/*
 * 遍历数组，返回组成的字符串
 * @example
 *   node.each(['a', 'b', 'c'], function (val, i) { return node(li, (i + 1) + ' - ' + val) })
 *   // 结果
 *   // '<li>1 - a</li><li>2 - b</li><li>3 - c</li>'
 */
node.each = function (items, cb, separator) {
	separator = separator || '';
	var ret = []
	var i = 0
	var len = items.length
	for (; i < len; i++) {
		ret.push(cb(items[i], i, items))
	}
	return ret.join(separator);
}

module.exports = node
},{"./utils/attrs2str":3,"./utils/isArray":4,"./utils/isVoidElement":5}],3:[function(require,module,exports){
/*
 * 属性配置对象转为字符串形式的属性
 * @example
 * attrs2str({'class': 'btn-close', 'data-val': 'xxxx'})
 * // returns:
 * // 'class="btn-close" data-val="xxxx"'
 * @param {Object} o
 * @returns {string}
 */
function attrs2str(o) {
	var ret = []
	var attr
	var value
	for (attr in o) {
		value = o[attr]
		if (typeof value === 'function') {
			value = value.call(o)
		}
		ret.push(attr + '=' + value)
	}
	return ret.join(' ')
}

module.exports = attrs2str
},{}],4:[function(require,module,exports){
var isArray

if (Array.isArray && Array.isArray.bind) {
	isArray = Array.isArray.bind(Array)
} else {
	isArray = function (o) {
		return Object.prototype.toString.call(o) === '[object Array]'
	}
}

module.exports = isArray
},{}],5:[function(require,module,exports){
// Void elements have no end tag, and can't have content
// http://www.w3.org/TR/html5/syntax.html#void-elements
var VoidElements = ' area base br col embed hr img input keygen link meta param source track wbr ';

function isVoidElment(tag) {
	return VoidElements.indexOf(' ' + tag + ' ') > -1
}

module.exports = isVoidElment
},{}]},{},[1]);
