# Benchmarks

Here I'm comparing `maudite` with `handlebars`, using a straghtforward template
and context object. The same context object is provided to both, and the two
templates should produce roughly similar output. The only difference between the
two is whitespace, since template literals go through a little trimming upon
parsing.

## `npm run bench`

This runs the two templates a thousand times each, for 4 iterations.

The machine I've tested on is:

```
Macbook Pro (Retina, 15-inch, Mid 2014)
Processor: 2.5 GHz Intel Core i7
Memory: 16GB 1600 MHz DDR3
```

The results I get are:

```
handlebars*1000: 80.553ms
maudite*1000: 24.847ms
handlebars*1000: 31.505ms
maudite*1000: 22.055ms
handlebars*1000: 29.110ms
maudite*1000: 21.164ms
handlebars*1000: 29.595ms
maudite*1000: 20.976ms
```

## `npm run benchserver`

This spins a server listening on `$NODE_PORT || $PORT || 3000` that has one
endpoint each for `handlebars` and `maudite`. It compiles and runs the same
templates and context used in the benchmark test above. This is suitable for
testing with Apache Bench or similar tools.

On my machine, as specced above, I get around 7000 to 8000 rps for both.
