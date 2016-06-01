
const m = require('../../')
const e = m.each

const eachFoo = m`<li>Hello, ${'thing'}</li>\n`
const eachBar = m`<li>Goodbye, ${'thing'}</li>\n`

module.exports = m`
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
