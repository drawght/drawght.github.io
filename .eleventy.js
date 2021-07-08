// Libraries
const yaml = require("js-yaml");
const slugify = require("slugify");

const nunjucks = require("nunjucks");
const highlight = require("highlight.js/lib");

const markdownIt = require("markdown-it");
const markdownItDefList = require("markdown-it-deflist");
const markdownItHighlightsjs = require("markdown-it-highlightjs")

// Configurations
const markdownLibrary = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
});

markdownLibrary.use(markdownItDefList);
markdownLibrary.use(markdownItHighlightsjs, {
  auto: false,
  inline: true,
});

// Filters
const filters = require("./.eleventy/filters");

// Build
module.exports = function(settings) {
  settings.setLibrary("md", markdownLibrary);

  settings.addDataExtension("yaml", function(contents) {
    return yaml.safeLoad(contents);
  });

  for (filter in filters) {
    settings.addFilter(filter, filters[filter]);
  }

  settings.setDataDeepMerge(true);

  settings.addLayoutAlias("default", "layouts/default.njk")

  settings.addPassthroughCopy([
    "./assets/styles",
    "./assets/scripts",
  ]);

  return {
    templateFormats: [
      "md",
      "njk",
      "yaml",
      "html",
    ],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "deploy",
      data: "../data",
      includes: "../includes",
    }
  };
};
