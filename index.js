/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/
const Readable = require('stream').Readable

// Roughly the same as https://www.npmjs.com/package/deep-access, except with a
// faster loop and a shortcut for top level properties
function access (obj, pty) {
  if (pty.indexOf('.') === -1 && pty[pty.length - 1] !== '?') return obj[pty]
  const chunks = pty.split('.')
  const len = chunks.length
  let i = 0
  while (i < len) {
    let chunk = chunks[i++]
    let checkExistence = chunk.endsWith('?')
    if (checkExistence) chunk = chunk.slice(0, -1)
    obj = obj[chunk]
    if (!obj && checkExistence) return obj
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
    result = result + strings[i]
    if (i !== len - 1) {
      const templOrBuf = values[i](context)
      result = result + (
        templOrBuf.isTemplate
        ? stringify(templOrBuf, context)
        : templOrBuf
      )
    }
    i++
  }
  return result
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
