// Libraries
const yaml = require("js-yaml");

// Filters
const filters = require("./.eleventy/filters");

// Shortcodes
const shortcodes = require("./.eleventy/shortcodes");

// Libraries
const libraries = require("./.eleventy/libraries");

// Build
module.exports = function(settings) {
  settings.addDataExtension("yaml", function(contents) {
    return yaml.safeLoad(contents);
  });

  for (extension in libraries.extensions) {
    console.log(`Setting library to extension "${extension}" ...`);
    settings.setLibrary(extension, libraries.extensions[extension]);
  }

  for (filter in filters) {
    console.log(`Adding filter "${filter}" ...`);
    settings.addFilter(filter, filters[filter]);
  }

  for (shortcode in shortcodes) {
    console.log(`Adding paired shortcode "${shortcode}" ...`);
    settings.addPairedShortcode(shortcode, shortcodes[shortcode]);
  }

  settings.setDataDeepMerge(true);

  settings.addLayoutAlias("default", "layouts/default.njk");
  settings.addLayoutAlias("parser", "layouts/parser.njk");

  settings.addPassthroughCopy({
    "./assets/images" : "assets/images",
    "./assets/styles" : "assets/styles",
    "./assets/scripts": "assets/scripts",
  });

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
