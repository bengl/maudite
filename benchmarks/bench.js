const mauditeTemplate = require('./maudite_template')
const handlebarsTemplate = require('./handlebars_template')
const fastbench = require('fastbench')

const context = {
  title: 'This is a title',
  foos: [],
  bars: []
}

for (let i = 0; i < 10; i++) {
  context.foos[i] = {thing: 'this thing ' + i}
  context.bars[i] = {thing: 'that thing ' + i}
}

const run = fastbench([
  function handlebars (done) {
    handlebarsTemplate(context)
    done()
  },
  function maudite (done) {
    mauditeTemplate(context)
    done()
  }
], 1000)

if (process.argv[2] === 'server') {
  const port = process.env.NODE_PORT || process.env.PORT || 3000
  require('http').createServer((req, res) => {
    switch(req.url) {
      case '/handlebars':
        res.end(handlebarsTemplate(context))
        break
      case '/maudite':
        res.end(mauditeTemplate(context))
        break
      default:
        res.statusCode = 404
        res.end()
    }
  }).listen(port, _ => console.log('listening on port', port))
} else {
  run(run(run(run)))
}
