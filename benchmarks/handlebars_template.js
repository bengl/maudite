const handlebars = require('handlebars')

const template = handlebars.compile(`
<h1>{{title}}</h1>
<ul>
  {{#each foos}}
    <li>Hello, {{thing}}</li>
  {{/each}}
</ul>
<ol>
  {{#each bars}}
    <li>Goodbye, {{thing}}</li>
  {{/each}}
</ol>


<h1>{{title}}</h1>
<ul>
  {{#each foos}}
    <li>Hello, {{thing}}</li>
  {{/each}}
</ul>
<ol>
  {{#each bars}}
    <li>Goodbye, {{thing}}</li>
  {{/each}}
</ol>


<h1>{{title}}</h1>
<ul>
  {{#each foos}}
    <li>Hello, {{thing}}</li>
  {{/each}}
</ul>
<ol>
  {{#each bars}}
    <li>Goodbye, {{thing}}</li>
  {{/each}}
</ol>


<h1>{{title}}</h1>
<ul>
  {{#each foos}}
    <li>Hello, {{thing}}</li>
  {{/each}}
</ul>
<ol>
  {{#each bars}}
    <li>Goodbye, {{thing}}</li>
  {{/each}}
</ol>


<h1>{{title}}</h1>
<ul>
  {{#each foos}}
    <li>Hello, {{thing}}</li>
  {{/each}}
</ul>
<ol>
  {{#each bars}}
    <li>Goodbye, {{thing}}</li>
  {{/each}}
</ol>
`)

module.exports = function (context) {
  return template(context)
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
  console.log(template(context))
}
