# maudite

**maudite** *(moe-DEET)* is a templating system using template literals. It returns
a stream of buffers for sending the resulting data quickly to its destination.

## Usage

A single function is exported, which acts as a template tag. This tag returns a
function taking in a context object, which is then passed to any functions that
are inlined into the template literal.

```js
const m = require('maudite')
const template = m`Hello, ${c=>c.name}!\n`;
template({name: 'World'}).pipe(process.stdout);

// Hello, World!
```

Your inlined functions can return a buffer or a string or another template, and
these will be sent to the stream. This means you can do any kind of conditional
logic you want to determine what to render.

As a shortcut, you can simply put a property name (as a string)_ for the contex
object, rather than a function accessing it.

```js
const m = require('maudite')
const template = m`Hello, ${'name'}!\n`;
template({name: 'World'}).pipe(process.stdout);

// Hello, World!
```

You can also use the special `m.each` function to iterate over arrays in your
context object.

```js
const m = require('maudite')
const template = m`Hello,${m.each('things', m` Thing ${c=>c.name}`)}!\n`;
template({
  things: [
    {name: '1'},
    {name: '2'}
  ]
}).pipe(process.stdout);

// Hello, Thing 1 Thing 2!
```

## License

See LICENSE.txt
