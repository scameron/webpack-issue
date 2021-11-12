# webpack-issue
Webpack 3 and Webpack 5 projects for reproducing TypeScript require.ensure issue.

The source code is exactly the same in each folder.  The only difference is one builds with Webpack 3 and one builds with Webpack 5.

The issue is that code in TypeScript files does not seem to be influenced by the chunkName argument when loaded with require.ensure in Webpack 5.  Instead of going into the specified chunk, it always gets added into the chunk of the caller.  This massively breaks lazy loading in our code base.

## How to run
In each folder, simply do:

* npm install
* npm run build

You can open `./dist/index.html` directly from the file system to see the different behaviour.

## Test case description
The test case is very simple:

* __index.js__ is the entry point in the default chunk `main`.   It does a dynamic import of ModuleA, assigning it to `chunk1`.
* __ModuleA.js__ contains an object with a function that is never invoked.  The function uses `require.ensure` to require `ModuleB` and `ModuleC` into chunk `chunk2`.
* __ModuleB.ts__ does nothing but export a class.  The interesting thing is that it is a TS file.
* __ModuleC.js__ does nothing but export an object.  The interesting thing is that it is a JS file.

By default you’ll see `chunk1` get loaded by the browser.  In WP3, you can see that `chunk1` contains only code from `ModuleA`, as expected.  In WP5, you can see that `chunk1` contains code from `ModuleA` and `ModuleB`.

## Test case variants

* If you look in `index.js` you’ll see a commented line at the top.  If you uncomment that, it will invoke a function in `ModuleA`.  Now you’ll see `chunk2` loaded also.  In WP3, `chunk2` will contain both `ModuleB` and `ModuleC`, as expected.  In WP5, `chunk2` contains only `ModuleC`.
* In the config file for the WP5 build, you’ll also see a commented out `splitChunks` definition where I force `ModuleB` into its own chunk called `chunk3`.  Make sure the line in `index.js` calling the `ModuleA` function is commented out before building.  This means that neither `chunk2` nor `chunk3` should be loaded.  But you can see that `chunk3` gets loaded (because `ModuleB` is actually part of `chunk1` not `chunk2`).
