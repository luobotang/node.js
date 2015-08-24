// Void elements have no end tag, and can't have content
// http://www.w3.org/TR/html5/syntax.html#void-elements
var VoidElements = ' area base br col embed hr img input keygen link meta param source track wbr ';

function isVoidElment(tag) {
	return VoidElements.indexOf(' ' + tag + ' ') > -1
}

module.exports = isVoidElment