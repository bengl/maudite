const maud = require('../lib/maud')
const path = require('path')
const assert = require('assert')
const templ = maud(path.join(__dirname, 'fixtures', 'template.maud'))

test`maud files work`(_ => {
  const result = templ.asString({world: 'World'})
  assert.equal(`
Hello, World!

This is a partial.

`, result)
})
