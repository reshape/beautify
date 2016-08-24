module.exports = function reshapeBeautify (opts = {}) {
  const indentDefault = opts.indent || 2
  return function beautifyPlugin (tree) {
    const indent = 0
    // remove all indents from the tree to start
    tree = sanitize(tree)
    // run the indent processing
    tree = walk(tree, indent, indentDefault, false)
    // if there's a leading newline/indent, it can be sliced off
    if (tree[0].content.match(/^\s+$/)) { tree = tree.slice(1) }
    return tree
  }
}

function walk (tree, indent, indentDefault, adjust) {
  return tree.reduce((m, node, i, a) => {
    // return non-tags
    if (node.type !== 'tag') { m.push(node); return m }

    // add the newline/indent for the open tag
    if (!adjust) {
      m.push({
        type: 'text',
        content: `\n${formatIndent(indent, indentDefault)}`
      })
    }

    if (node.content) {
      // if there is text content inside a node, we don't touch the spacing
      const adj = !!node.content.find((n) => n.type === 'text')

      // recurse and add the tag itself
      node.content = walk(node.content, ++indent, indentDefault, adj)
      indent--
    }
    m.push(node)

    // TODO deal with self-closing tags

    // last child adds an indent for the closing tag
    if (i === a.length - 1 && !adjust) {
      m.push({
        type: 'text',
        content: `\n${formatIndent(indent - 1, indentDefault)}`
      })
    }

    return m
  }, [])
}

function sanitize (tree) {
  return tree.reduce((m, node) => {
    // remove any existing indents
    if (node.type === 'text' && node.content.match(/^\s+$/)) { return m }

    // return non-tags
    if (node.type !== 'tag' || !node.content) { m.push(node); return m }

    // recurse
    node.content = sanitize(node.content)
    m.push(node); return m
  }, [])
}

function formatIndent (n, level) {
  const res = []
  for (let i = 0; i < level * n; i++) { res.push(' ') }
  return res.join('')
}
