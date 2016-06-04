const m = require('./maudite')
const path = require('path')
const fs = require('fs')

function maudRequire (filename) {
  // TODO cache
  const filePath = path.resolve(filename)
  const fileData = fs.readFileSync(filename, 'utf8')

  const wrapped = new Function('m', 'p', 'return m`' + fileData + '`') // eslint-disable-line no-new-func

  function p (...args) {
    const partialPath = String.raw(...args)
    const templ = maudRequire(path.join(path.dirname(filePath), partialPath + '.maud'))
    return context => templ.asString(context)
  }
  return wrapped(m, p)
}

module.exports = maudRequire
