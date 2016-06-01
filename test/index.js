global.test = require('pitesti')()

require('fs').readdirSync(__dirname).forEach(file => {
  if (file === 'index.js' || !file.endsWith('.js')) return
  require('./' + file)
})

global.test()
