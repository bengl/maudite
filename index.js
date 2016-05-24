/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/
const Readable = require('stream').Readable

// Roughly the same as https://www.npmjs.com/package/deep-access, except with a
// faster loop
function access (obj, prop) {
  const chunks = prop.split('.')
  const len = chunks.length
  let i = 0
  while (i < len) {
    let chunk = chunks[i]
    let checkExistence = chunk.endsWith('?')
    if (checkExistence) chunk = chunk.slice(0, -1)
    obj = obj[chunk]
    if (!obj && checkExistence) return obj
    i++
  }
  return obj
}

function stringify (template, context) {
  const strings = template.strings
  const len = strings.length
  const values = template.values
  let i = 0
  let result = ''
  while (i < len) {
    const str = strings[i]
    result = result + str
    const val = values[i]
    if (val) result = result + stringifyVal(val, context)
    i++
  }
  return result
}

function stringifyVal (val, context) {
  // val is a function returning template or buffer/string
  const templOrBuf = val(context)
  if (!templOrBuf.isTemplate) return templOrBuf
  else return stringify(templOrBuf, context)
}

function stringifyEach (val, context) {
  let result = ''
  const iterableContext = access(context, val.contextItem)
  const template = val.template
  const len = iterableContext.length
  let i = 0
  while (i < len) result = result + stringify(template, iterableContext[i++])
  return result
}

function compileVals (values) {
  return values.map(val => {
    if (typeof val === 'string') return context => access(context, val)
    if (val.isEach) return context => stringifyEach(val, context)
    return val
  })
}

class Template extends Function { // don't extend Function in 2.0.0
  constructor (strings, values) {
    // this is probably super-inefficient. deprecate in 2.0.0
    super('context', 'return arguments.callee.asStream(context)')
    this.strings = strings
    this.values = compileVals(values)
    this.isTemplate = true
  }

  asString (context) {
    return stringify(this, context)
  }

  asStream (context) {
    const self = this
    return Readable({
      read () {
        this.push(self.asString(context))
        this.push(null)
      }
    })
  }
}

class Each {
  constructor (contextItem, template) {
    this.template = template
    this.contextItem = contextItem
    this.isEach = true
  }
}

module.exports = (strings, ...values) => new Template(strings, values)
module.exports.each = (contextItem, template) => new Each(contextItem, template)
