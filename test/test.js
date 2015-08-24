var node = require('../index')

console.log('===== test node() start =====')

compare(node(
		'div', {id: 'xxx'},
		node('p', 'hello world!'),
		node('p', {'class': 'welcome'}, 'welcome!')
	),
	'<div id="xxx">' +
		'<p>hello world!</p>' +
		'<p class="welcome">welcome!</p>' +
	'</div>'
)

console.log('===== test node() end =====')


console.log('===== test node.each() start =====')

compare(node(
		'ul',
		node.each(['luobo', 'tang', 'mickey'], renderPerson)
	),
	'<ul>' +
		'<li>luobo</li>' +
		'<li>tang</li>' +
		'<li>mickey</li>' +
	'</ul>'
)

console.log('===== test node.each() end =====')

function compare(result, expect) {
	console.log(result === expect ? 'success' : 
		'fail!!!\n' +
		'expect: ' + expect + '\n' +
		'result: ' + result)
}

function renderPerson(person) {
	return node('li', person)
}