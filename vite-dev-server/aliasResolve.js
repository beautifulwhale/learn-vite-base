module.exports = function aliasResolver(alias, jsContent) {
  const entries = Object.entries(alias);
  let realContent = jsContent
  entries.forEach(entry => {
    const [aliasName, realPath] = entry;
    const index = realPath.indexOf('/src');
    const path = realPath.slice(index, realPath.length)
    realContent = realContent.replace(aliasName, path);
  })

  return realContent;
}