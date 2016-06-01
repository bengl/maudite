const m = require('../')
const assert = require('assert')

function t (desc, templ, context, expected) {
  test(desc, _ => {
    return new Promise((resolve) => {
      var res = ''
      templ(context).on('data', d => { res += d.toString() }).on('end', _ => {
        assert.equal(res, expected)
        resolve()
      })
    })
  })
}

t(
  'one var',
  m`foo ${c => c.bar} baz`,
  {bar: 'bbaarr'},
  'foo bbaarr baz'
)

t(
  'one var as property name',
  m`foo ${'bar'} baz`,
  {bar: 'bbaarr'},
  'foo bbaarr baz'
)

t(
  'one var as deep property name',
  m`foo ${'bar.bux'} baz`,
  {bar: {bux: 'bbaarr'}},
  'foo bbaarr baz'
)

t(
  'at-sign as `this`',
  m`foo ${'@'} baz`,
  'bar',
  'foo bar baz'
)

t(
  'two vars',
  m`foo ${c => c.bar} baz ${c => c.bux} buf`,
  {bar: 'bbaarr', bux: 'BUX'},
  'foo bbaarr baz BUX buf'
)

t(
  'nested',
  m`foo ${_ => m`bar ${c => c.baz} bux`} buf`,
  {baz: 'BAZ'},
  'foo bar BAZ bux buf'
)

t(
  'conditional string true',
  m`foo ${c => c.ok ? m`ok` : m`notok`} baz`,
  {ok: true},
  'foo ok baz'
)

t(
  'conditional string false',
  m`foo ${c => c.ok ? m`ok` : m`notok`} baz`,
  {ok: false},
  'foo notok baz'
)

t(
  'conditional nested true',
  m`foo ${c => c.ok ? m`ok ${c => c.bob}` : m`notok ${c => c.bob}`} baz`,
  {bob: 'BOB', ok: true},
  'foo ok BOB baz'
)

t(
  'conditional nested false',
  m`foo ${c => c.ok ? m`ok ${c => c.bob}` : m`notok ${c => c.bob}`} baz`,
  {bob: 'BOB', ok: false},
  'foo notok BOB baz'
)

t(
  'each',
  m`buy ${m.each('numbers', m`${c => c} chickens `)}today!`,
  {numbers: ['two', 'four', 'six']},
  'buy two chickens four chickens six chickens today!'
)

t(
  'deep each',
  m`buy ${m.each('foo.numbers', m`${c => c} chickens `)}today!`,
  {foo: {numbers: ['two', 'four', 'six']}},
  'buy two chickens four chickens six chickens today!'
)

t(
  'multi each',
  m`buy ${m.each('numbers', m`${c => c} chickens `)}and ${m.each('numbers', m`${c => c} cows `)}today!`,
  {numbers: ['two', 'four', 'six']},
  'buy two chickens four chickens six chickens and two cows four cows six cows today!'
)

test`string rather than stream`(_ => {
  const templ = m`buy ${m.each('numbers', m`${c => c} chickens `)}and ${m.each('numbers', m`${c => c} cows `)}today!`
  const context = {numbers: ['two', 'four', 'six']}
  const result = templ.asString(context)
  assert.equal(
    result,
    'buy two chickens four chickens six chickens and two cows four cows six cows today!'
  )
})
