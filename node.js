(function (factory) {
	window.node = factory();
})(function () {
	var ElementsNotClose = ' input img ';
	/*
	 * Usage:
	 *     node('div'[, {id: 'xxx', data: {value: 'xxx'}}][, <array of string> | <string> ...]
	 *     node(renderFunction, data)
	 */
	function node(type, attrs, childNodes) {
		if (typeof type === 'string') {
			var html = '<', attrsIsChild = false;
			html += type;
			if (typeof attrs === 'object') {
				html += ' ' + obj2arr(attrs).join(' ');
			}
			html += '>';
			if (ElementsNotClose.indexOf(' ' + type + ' ') > -1) {
				return html;
			}
			if (typeof attrs === 'string') {
				attrsIsChild = true; 
			}
			childNodes = flattenArray([].slice.call(arguments, attrsIsChild ? 1 : 2));
			if (childNodes.length) {
				html +=  childNodes.join('');
			}
			return html + '</' + type + '>';
		} else if (typeof type === 'function') {
			return type.call({ attrs: attrs }, attrs);
		}
	}

	function isArray(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	function flattenArray(array) {
		if (array.length) {
			var ret = [];
			node.each(array, function (item) {
				if (isArray(item)) {
					ret = ret.concat(flattenArray(item));
				} else {
					ret.push(item);
				}
			});
			return ret;
		} else {
			return array;
		}
	}

	function obj2arr(o, pre) {
		var ret = [];
		for (var key in o) {
			var prop = o[key], newObject = false;
			if (typeof prop === 'function') {
				prop = prop();
			}
			if (typeof prop === 'object') {
				if (isArray(prop)) {
					prop = prop.join(' ');
				} else {
					newObject = true;
					ret = ret.concat(obj2arr(prop, pre ? pre + '-' + key : key));
				}
			}
			if (!newObject) {
				ret.push(pre ? pre + '-' + key + '="' + prop + '"' : key + '="' + prop + '"');
			}
		}
		return ret;
	}

	function renderFoo(attrs) {
		return node('ul', attrs,
				node('li', null, 'luobo'),
				node('li', null, 'tang'));
	}

	node.each = function (items, fn) {
		for (var i = 0, ret = [], item, len = items.length; i < len; i++) {
			item = items[i];
			// 跳过的空的数组元素
			if (typeof item === 'undefined') {
				continue;
			} else {
				ret.push(fn(item, i));
			}
		}
		return ret;
	};

	var Helpers = {};

	node.helper = function (helperName, args) {
		var helperFn = Helpers[helperName];
		return typeof helperFn === 'function' ? helperFn.apply(null, [].slice.call(arguments, 1)) : '';
	}

	node.helper.register = function (helperName, fn) {
		Helpers[helperName] = fn;
	}

	return node;
});