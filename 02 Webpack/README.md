# 02 Webpack

In this sample we are going to configure all necessary stuff to work with Webpack and TypeScript.

We will start from basic webpack configuration (_00 start point_) about copy an HTML template and insert all bundles using `html-webpack-plugin`.

# Steps to build it

- First we are going to create our awesome app about a `calculator` where we are going to have the `sum`, `substract`, `mul` and `div` methods.

### ./src/calculator.ts

```javascript
export function sum(a, b) {
   return a + b;
}

export function substract(a,b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function div(a, b) {
  return a / b;
}

```

- Let's add a `index.ts` file where we are going to use the `sum` method and we will just make an `h1` of the result:

### ./src/index.ts
```javascript
import { sum } from './calculator';

const result = sum(2, 2);

const element = document.createElement('h1');
element.innerHTML = `Sum result: ${result}`;

document.body.appendChild(element);

```

- What do we need to work with TypeScript and Webpack? First, we have to install some packages:

```bash
npm i awesome-typescript-loader typescript -D

```

- Let's to update the `webpack` config:

### ./webpack.config.js

```diff
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: {
+   app: './index.ts',
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[chunkhash].[name].js',
  },
  module: {
    rules: [
+     {
+       test: /\.ts$/,
+       exclude: /node_modules/,
+       loader: 'awesome-typescript-loader',
+     },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
};

```

- Finally, we need to add the `TypeScript` configuration file:

### ./tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

- If we run the app, we get something like:

```bash
npm start
```

![00 run app](../99%20Resources/02%20Webpack/00%20run%20app.png)

- Running `npm run build`, we can see in `dist` folder that all methods are imported:

### ./dist/...app.js

```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var calculator_1 = __webpack_require__("cOI6");
var result = calculator_1.sum(2, 2);
var element = document.createElement('h1');
element.innerHTML = "Sum result: " + result;
document.body.appendChild(element);


/***/ }),

/***/ "cOI6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
function substract(a, b) {
    return a - b;
}
exports.substract = substract;
function mul(a, b) {
    return a * b;
}
exports.mul = mul;
function div(a, b) {
    return a / b;
}
exports.div = div;


/***/ })

},["5fEv"]);
...
```

- One of the most interesting feature that ships from Webpack 2 is Tree Shaking: this allows to remove from a destination bundle the exports that are not in use by the project, reducing dramatically the site of our bundle. How we can configure to avoid unused modules?

- We have to take into account that [Webpack 2 Tree Shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx) comes with a built-in support for ES6 modules (alias harmony modules) and using that modules it could use the feature `unused module export detection`.

- By default, `tsconfig.json` has [`module` default value to `commonjs`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) when target is not ES6, so we need to configure target to ES6:

### ./tsconfig.json

```diff
{
  "compilerOptions": {
-   "target": "es5",
+   "target": "es6",
-   "module": "commonjs",
+   "module": "es6",
+   "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}

```

> NOTE: It's not necessary to set `"module": "es6"`. But we have to set `"moduleResolution": "node"` (this value is taken as default when is `commonjs`) to resolve modules. More [info](https://www.typescriptlang.org/docs/handbook/module-resolution.html#classic)

- Running `npm run build` again:

### ./dist/...app.js

```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__("cOI6");

const result = Object(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* sum */])(2, 2);
const element = document.createElement('h1');
element.innerHTML = `Sum result: ${result}`;
document.body.appendChild(element);


/***/ }),

/***/ "cOI6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sum;
/* unused harmony export substract */
/* unused harmony export mul */
/* unused harmony export div */
function sum(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}


/***/ })

},["5fEv"]);
...
```

- Now webpack knows which `harmony modules` (ES6 modules) are unused. If we run `npm run build:prod`:

![01 build prod error](../99%20Resources/02%20Webpack/01%20build%20prod%20error.png)

- What's it going on here? Since we are target to `es6`, TypeScript doesn't transpile backticks to `element.innerHTML = 'Sum result: ' + result;`

- So next step could be add this configuration:

```
TypeScript transpile to ES6 files and Babel transpile to ES5 files

      TypeScript            Babel
.ts ============> ES6 .js =========> ES5 .js

```

- We need to install:

```bash
npm i babel-core babel-preset-env -D

```

- Add `.babelrc` with `ES6 modules` config:

### ./.babelrc

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}

```

- And update `webpack.config`:

### ./webpack.config.js

```diff
...

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
+       options: {
+         useBabel: true,
+       },
      },
      ...
    ],
  },
  ...
};

```

- Running `npm run build` again, babel transform backticks into `element.innerHTML = 'Sum result: ' + result;`:

### ./dist/...app.js

```diff
webpackJsonp([1],{

/***/ "5fEv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculator__ = __webpack_require__("cOI6");

var result = Object(__WEBPACK_IMPORTED_MODULE_0__calculator__["a" /* sum */])(2, 2);
var element = document.createElement('h1');
element.innerHTML = 'Sum result: ' + result;
document.body.appendChild(element);

/***/ }),

/***/ "cOI6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sum;
/* unused harmony export substract */
/* unused harmony export mul */
/* unused harmony export div */
function sum(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}

/***/ })

},["5fEv"]);
...
```

- If we run `npm run build:prod` again:

### ./dist/...app.js
```diff
webpackJsonp([1],{"5fEv":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n("cOI6"),u=Object(c.a)(2,2),r=document.createElement("h1");r.innerHTML="Sum result: "+u,document.body.appendChild(r)},cOI6:function(e,t,n){"use strict";function c(e,t){return e+t}t.a=c}},["5fEv"]);
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
