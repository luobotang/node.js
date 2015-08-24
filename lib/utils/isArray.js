var isArray

if (Array.isArray && Array.isArray.bind) {
	isArray = Array.isArray.bind(Array)
} else {
	isArray = function (o) {
		return Object.prototype.toString.call(o) === '[object Array]'
	}
}

module.exports = isArray