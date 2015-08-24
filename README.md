# node

用函数调用的方式来构建 HTML 片段。

## 示例

### node()

```javascript
node('div', {'class': 'message'}, node('p', 'hello'));
// returns
// '<div class="message"><p>hello</p></div>'
```

### node.each()

```javascript
node('ul', node.each(['luobo', 'tang', 'mickey'], function (p) { return node('li', p) }))
// returns
// '<ul><li>luobo</li><li>tang</li><li>mickey</li></ul>'
```
