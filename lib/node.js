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
	var isVoidTag = isVoidElement(tag)
	var childrenStart = 2

	if (attrs && typeof attrs === 'object') {
		attrs = attrs2str(attrs)
	} else { // don't modify param attrs if is not valid!
		childrenStart = 1
	}

	var tagStart = '<' + tag + (childrenStart === 2 ? ' ' + attrs : '') + '>'

	if (isVoidTag) {
		return tagStart
	}

	var content = ''
	if (arguments.length > childrenStart) {
		children = [].slice.call(arguments, childrenStart)
		content = children.join('')
	}

	var tagEnd = '</' + tag + '>'

	return tagStart + content + tagEnd
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
		item = items[i]
		ret.push(cb(items[i], i, items))
	}
	return ret.join(separator);
}

module.exports = node