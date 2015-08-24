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
		ret.push(attr + '="' + value + '"')
	}
	return ret.join(' ')
}

module.exports = attrs2str