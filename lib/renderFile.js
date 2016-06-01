/*
Copyright 2016, Yahoo Inc.
Code licensed under the MIT License.
See LICENSE.txt
*/

// TODO his depends on require.cache to do all the caching for us. This can be
// optimized later.
function renderFile (path, context, cb) {
  try {
    cb(null, require(path).asString(context))
  } catch (e) {
    cb(e)
  }
}

module.exports = renderFile
