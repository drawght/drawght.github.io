const markdownIt = require("markdown-it");
const markdownItDefList = require("markdown-it-deflist");
const markdownItHighlightsjs = require("markdown-it-highlightjs");

// Configurations
const markdownParser = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

markdownParser.use(markdownItDefList);
markdownParser.use(markdownItHighlightsjs, {
  auto: false,
  inline: true,
});

module.exports = {
  markdownParser,
  extensions: {
    md: markdownParser,
  }
}
