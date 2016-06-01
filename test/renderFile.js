const m = require('../')
const assert = require('assert')

const context = {
  title: 'This is a title',
  foos: [],
  bars: []
}
for (let i = 0; i < 10; i++) {
  context.foos[i] = {thing: 'this thing ' + i}
  context.bars[i] = {thing: 'that thing ' + i}
}

const templatePath = require('path').join(__dirname, 'fixtures', 'template.js')

const expected = `
<h1>This is a title</h1>
<ul>
  <li>Hello, this thing 0</li>
<li>Hello, this thing 1</li>
<li>Hello, this thing 2</li>
<li>Hello, this thing 3</li>
<li>Hello, this thing 4</li>
<li>Hello, this thing 5</li>
<li>Hello, this thing 6</li>
<li>Hello, this thing 7</li>
<li>Hello, this thing 8</li>
<li>Hello, this thing 9</li>

</ul>
<ol>
  <li>Goodbye, that thing 0</li>
<li>Goodbye, that thing 1</li>
<li>Goodbye, that thing 2</li>
<li>Goodbye, that thing 3</li>
<li>Goodbye, that thing 4</li>
<li>Goodbye, that thing 5</li>
<li>Goodbye, that thing 6</li>
<li>Goodbye, that thing 7</li>
<li>Goodbye, that thing 8</li>
<li>Goodbye, that thing 9</li>

</ol>


<h1>This is a title</h1>
<ul>
  <li>Hello, this thing 0</li>
<li>Hello, this thing 1</li>
<li>Hello, this thing 2</li>
<li>Hello, this thing 3</li>
<li>Hello, this thing 4</li>
<li>Hello, this thing 5</li>
<li>Hello, this thing 6</li>
<li>Hello, this thing 7</li>
<li>Hello, this thing 8</li>
<li>Hello, this thing 9</li>

</ul>
<ol>
  <li>Goodbye, that thing 0</li>
<li>Goodbye, that thing 1</li>
<li>Goodbye, that thing 2</li>
<li>Goodbye, that thing 3</li>
<li>Goodbye, that thing 4</li>
<li>Goodbye, that thing 5</li>
<li>Goodbye, that thing 6</li>
<li>Goodbye, that thing 7</li>
<li>Goodbye, that thing 8</li>
<li>Goodbye, that thing 9</li>

</ol>


<h1>This is a title</h1>
<ul>
  <li>Hello, this thing 0</li>
<li>Hello, this thing 1</li>
<li>Hello, this thing 2</li>
<li>Hello, this thing 3</li>
<li>Hello, this thing 4</li>
<li>Hello, this thing 5</li>
<li>Hello, this thing 6</li>
<li>Hello, this thing 7</li>
<li>Hello, this thing 8</li>
<li>Hello, this thing 9</li>

</ul>
<ol>
  <li>Goodbye, that thing 0</li>
<li>Goodbye, that thing 1</li>
<li>Goodbye, that thing 2</li>
<li>Goodbye, that thing 3</li>
<li>Goodbye, that thing 4</li>
<li>Goodbye, that thing 5</li>
<li>Goodbye, that thing 6</li>
<li>Goodbye, that thing 7</li>
<li>Goodbye, that thing 8</li>
<li>Goodbye, that thing 9</li>

</ol>


<h1>This is a title</h1>
<ul>
  <li>Hello, this thing 0</li>
<li>Hello, this thing 1</li>
<li>Hello, this thing 2</li>
<li>Hello, this thing 3</li>
<li>Hello, this thing 4</li>
<li>Hello, this thing 5</li>
<li>Hello, this thing 6</li>
<li>Hello, this thing 7</li>
<li>Hello, this thing 8</li>
<li>Hello, this thing 9</li>

</ul>
<ol>
  <li>Goodbye, that thing 0</li>
<li>Goodbye, that thing 1</li>
<li>Goodbye, that thing 2</li>
<li>Goodbye, that thing 3</li>
<li>Goodbye, that thing 4</li>
<li>Goodbye, that thing 5</li>
<li>Goodbye, that thing 6</li>
<li>Goodbye, that thing 7</li>
<li>Goodbye, that thing 8</li>
<li>Goodbye, that thing 9</li>

</ol>


<h1>This is a title</h1>
<ul>
  <li>Hello, this thing 0</li>
<li>Hello, this thing 1</li>
<li>Hello, this thing 2</li>
<li>Hello, this thing 3</li>
<li>Hello, this thing 4</li>
<li>Hello, this thing 5</li>
<li>Hello, this thing 6</li>
<li>Hello, this thing 7</li>
<li>Hello, this thing 8</li>
<li>Hello, this thing 9</li>

</ul>
<ol>
  <li>Goodbye, that thing 0</li>
<li>Goodbye, that thing 1</li>
<li>Goodbye, that thing 2</li>
<li>Goodbye, that thing 3</li>
<li>Goodbye, that thing 4</li>
<li>Goodbye, that thing 5</li>
<li>Goodbye, that thing 6</li>
<li>Goodbye, that thing 7</li>
<li>Goodbye, that thing 8</li>
<li>Goodbye, that thing 9</li>

</ol>
`

test`renderFile > loads file correctly`(new Promise((resolve, reject) => {
  m.renderFile(templatePath, context, (err, result) => {
    if (err) return reject(err)
    assert.equal(result, expected)
    resolve()
  })
}))

test`renderFile > bad filename does errback`(new Promise((resolve, reject) => {
  m.renderFile('fubarbad', context, (err, result) => {
    assert(err)
    assert(!result)
    resolve()
  })
}))
