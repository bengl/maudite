# maudite

**maudite** *(moe-DEET)* is a templating system using template literals. It returns
a stream of buffers, or a string, for sending the resulting data to its
destination.

`maudite` is [pretty quick](benchmarks/README.md)

## Usage

A single function is exported, which acts as a template tag. This tag returns a
function taking in a context object, which is then passed to any functions that
are inlined into the template literal.

```js
const m = require('maudite');
const template = m`Hello, ${c=>c.name}!\n`;
template({name: 'World'}).pipe(process.stdout);

// Hello, World!
```

Your inlined functions can return a buffer or a string or another template, and
these will be sent to the stream. This means you can do any kind of conditional
logic you want to determine what to render.

As a shortcut, you can simply put a property name (as a string that's parsed
with [`deep-access`](https://www.npmjs.com/package/deep-access)) for the context object, rather than a function accessing it.

```js
const m = require('maudite');
const template = m`Hello, ${'name'}!\n`;
template({name: 'World'}).pipe(process.stdout);

// Hello, World!
```

You can also use the special `m.each` function to iterate over arrays in your
context object.

```js
const m = require('maudite');
const template = m`Hello,${m.each('things', m` Thing ${c=>c.name}`)}!\n`;
template({
  things: [
    {name: '1'},
    {name: '2'}
  ]
}).pipe(process.stdout);

// Hello, Thing 1 Thing 2!
```

The first argument to `m.each` is a context accessor string (see **Accessing
Properties**, below), giving the property that is an array to iterate over. The
next argument is a template to apply to each element of the array.

To return a compiled and ready-to-go string, rather than a stream, just call the
`asString` function on the template, passing in the context object.

```js
const m = require('maudite');
const template = m`Hello, ${'name'}!\n`;
console.log(template.asString({name: 'World'}));

// Hello, World!
```

### Accessing properties

For both inline values (like `${'foo'}`) and for the first argument to `m.each`,
strings can be used to access properties of the context object. These are
dot-separated strings that are compatible with their usage in [`deep-access`][].

In addition, you can use the `@` symbol to refer to the current context object.

Here's an example, where the context object passed in is the string `'World':

```js
const m = require('maudite');
const template = m`Hello, ${'@'}!\n`;
console.log(template.asString('World'));


// Hello, World!
```

## License

See LICENSE.txt
