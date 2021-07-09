const { markdownParser } = require("./libraries")

const markdown = function(text) {
  return markdownParser.render(text);
}

module.exports = {
  markdown,
}
