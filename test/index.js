const beautify = require('..')
const path = require('path')
const {readFileSync} = require('fs')
const reshape = require('reshape')
const test = require('ava')
const fixtures = path.join(__dirname, 'fixtures')

test('basic', (t) => {
  return compare(t, 'basic')
})

test('inline_code', (t) => {
  return compare(t, 'inline_code')
})

test('strips and replaces existing indentation', (t) => {
  return compare(t, 'bad_indents')
})

test('self-closing tags', (t) => {
  return compare(t, 'selfclosing')
})

test('custom indent level', (t) => {
  return compare(t, 'custom_indent', { indent: 4 })
})

function compare (t, name, opts) {
  const src = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return reshape({ plugins: beautify(opts) })
    .process(src)
    .then((res) => res.output())
    .tap((out) => t.is(expected, out))
}
