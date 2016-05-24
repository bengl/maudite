const m = require('../index')
const e = m.each

const eachFoo = m`<li>Hello, ${'thing'}</li>\n`
const eachBar = m`<li>Goodbye, ${'thing'}</li>\n`

const template = m`
<h1>${'title'}</h1>
<ul>
  ${e('foos', eachFoo)}
</ul>
<ol>
  ${e('bars', eachBar)}
</ol>


<h1>${'title'}</h1>
<ul>
  ${e('foos', eachFoo)}
</ul>
<ol>
  ${e('bars', eachBar)}
</ol>


<h1>${'title'}</h1>
<ul>
  ${e('foos', eachFoo)}
</ul>
<ol>
  ${e('bars', eachBar)}
</ol>


<h1>${'title'}</h1>
<ul>
  ${e('foos', eachFoo)}
</ul>
<ol>
  ${e('bars', eachBar)}
</ol>


<h1>${'title'}</h1>
<ul>
  ${e('foos', eachFoo)}
</ul>
<ol>
  ${e('bars', eachBar)}
</ol>
`

module.exports = function (context, res) {
  return template.asString(context)
}

if (require.main === module) {
  const context = {
    title: 'This is a title',
    foos: [],
    bars: []
  }
  for (let i = 0; i < 10; i++) {
    context.foos[i] = {thing: 'this thing ' + i}
    context.bars[i] = {thing: 'that thing ' + i}
  }
  console.log(template.asString(context))
}
