# Reshape Beautify

[![npm](https://img.shields.io/npm/v/reshape-beautify.svg?style=flat-square)](https://npmjs.com/package/reshape-beautify)
[![tests](https://img.shields.io/travis/reshape/beautify.svg?style=flat-square)](https://travis-ci.org/reshape/beautify?branch=master)
[![dependencies](https://img.shields.io/david/reshape/beautify.svg?style=flat-square)](https://david-dm.org/reshape/beautify)
[![coverage](https://img.shields.io/coveralls/reshape/beautify.svg?style=flat-square)](https://coveralls.io/r/reshape/beautify?branch=master)

A reshape plugin that pretty-prints your html

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install reshape-beautify --save`

> **Note:** This project is compatible with node v6+ only

### Usage

Add it as a reshape plugin:

```js
const reshape = require('reshape')
const beautify = require('reshape-beautify')

reshape({ plugins: beautify(/* options */) })
  .process(htmlString)
  .then((res) => console.log(res.output()))
```

...and that's it! You can specify any options as listed below to customize the behavior.

This plugin will ensure that all tags are correctly indented. However, it will not make changes to any tag that contains a plain text node, because this could interfere with the way the content looks. For example, this crappy html:

```html
 <head>
    <title>bad indentation</title>
<meta name='author' content='not me'>
      </head>
  <body><section>    <p>hi there</p>
     </section>
 </body>
```

Would be transformed as such:

```html
<head>
  <title>bad indentation</title>
  <meta name='author' content='not me'>
</head>
<body>
  <section>
    <p>hi there</p>
  </section>
</body>
```

Wow, so clean! It will do the same for minified html:

```html
<body><p>hi there</p><div class='wow'>this is minified</div></body>
```

Is transformed to:

```html
<body>
  <p>hi there</p>
  <div class='wow'>this is minified</div>
</body>
```

However, if you have something like this:

```html
<section>
    hello there!
 <span>this is great</span>
    </section>
```

We won't alter the spaces inside your section content, because this would change the way it looks on the page, so it would turn out exactly the same as the input.

### Options

| Name | Description | Default |
| ---- | ----------- | ------- |
| **indent** | Number of spaces to indent your elements | `2` |

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
