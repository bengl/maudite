const testSuite = require('pitesti')()
const m = require('./index')
const assert = require('assert')

function test (desc, templ, context, expected) {
  testSuite(desc, _ => {
    return new Promise((resolve) => {
      var res = ''
      templ(context).on('data', d => { res += d.toString() }).on('end', _ => {
        assert.equal(res, expected)
        resolve()
      })
    })
  })
}

test(
  'one var',
  m`foo ${c => c.bar} baz`,
  {bar: 'bbaarr'},
  'foo bbaarr baz'
)

test(
  'two vars',
  m`foo ${c => c.bar} baz ${c => c.bux} buf`,
  {bar: 'bbaarr', bux: 'BUX'},
  'foo bbaarr baz BUX buf'
)

test(
  'nested',
  m`foo ${_ => m`bar ${c => c.baz} bux`} buf`,
  {baz: 'BAZ'},
  'foo bar BAZ bux buf'
)

test(
  'conditional string true',
  m`foo ${c => c.ok ? m`ok` : m`notok`} baz`,
  {ok: true},
  'foo ok baz'
)

test(
  'conditional string false',
  m`foo ${c => c.ok ? m`ok` : m`notok`} baz`,
  {ok: false},
  'foo notok baz'
)

test(
  'conditional nested true',
  m`foo ${c => c.ok ? m`ok ${c => c.bob}` : m`notok ${c => c.bob}`} baz`,
  {bob: 'BOB', ok: true},
  'foo ok BOB baz'
)

test(
  'conditional nested false',
  m`foo ${c => c.ok ? m`ok ${c => c.bob}` : m`notok ${c => c.bob}`} baz`,
  {bob: 'BOB', ok: false},
  'foo notok BOB baz'
)

test(
  'each',
  m`buy ${m.each('numbers', m`${c => c} chickens `)}today!`,
  {numbers: ['two', 'four', 'six']},
  'buy two chickens four chickens six chickens today!'
)

testSuite()
