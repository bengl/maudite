/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/
const Readable = require('stream').Readable
const stringCache = {}

function getBuff (str) {
  if (stringCache[str]) {
    return stringCache[str]
  } else {
    const buff = new Buffer(str)
    stringCache[str] = buff
    return buff
  }
}

class State {
  constructor (templ, par, context = par.context, stream = par.stream) {
    this.template = templ
    this.context = context
    this.stream = stream
    this.parent = par
    this.index = 0
    this.len = templ.strings.length

    // these are for handling `m.each`
    this.eachIndex = 0
    this.currentEach = null
  }

  iterate (plusOne) {
    if (this.currentEach) {
      return this.handleEach()
    }
    const i = plusOne ? this.index + 1 : this.index
    const len = this.len
    if (i < len) {
      this.stream.push(this.template.strings[i])
      if (i < len - 1) {
        const val = this.template.values[i]
        if (val.each) { // as returned by `m.each`
          return this.handleEach(val)
        }
        const templOrBuf = val(this.context)
        if (!templOrBuf.isTemplate) {
          this.stream.push(templOrBuf)
        } else {
          return new State(templOrBuf, this)
        }
      }
    } else {
      if (this.parent) {
        return this.parent.iterate(true)
      } else {
        this.stream.push(null)
      }
    }
    this.index = i + 1
    return this
  }

  handleEach (val) {
    if (val) { this.currentEach = val }
    val = this.currentEach
    const iterableContext = this.context[val.contextItem]
    const eachContext = iterableContext[this.eachIndex++]
    if (this.eachIndex === iterableContext.length) {
      this.currentEach = null
      this.eachIndex = 0
    }
    // need to iterate here or else no pushes happen in this iteration
    return new State(val.template, this, eachContext).iterate()
  }
}

function m (strings, ...values) {
  strings = strings.map(getBuff)
  function compiledTemplate (context) {
    const stream = Readable({
      // instead of going through all that bidniz of handling a "tree of
      // loops" here, it's handled by instances of the state class, which
      // handle where we are in the iteration.
      read () { state = state.iterate() }
    })
    var state = new State(compiledTemplate, null, context, stream)
    return stream
  }
  compiledTemplate.strings = strings
  compiledTemplate.values = values
  compiledTemplate.isTemplate = true
  return compiledTemplate
}

function each (contextItem, template) {
  return {
    template: template,
    contextItem: contextItem,
    each: true
  }
}

m.each = each
module.exports = m
