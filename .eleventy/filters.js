// Environment
const TZ = process.env.TZ || "America/Manaus";

// Libraries
const slugify = require("slugify");

// Filters
const readingTime = function(htmlContent) {
  if (!htmlContent) return 0;
  const speed = 300;
  const matches = htmlContent.replace(/(<([^>]+)>)/gi, '').match(/[\u0400-\u04FF]+|\S+\s*/g);
  const count = matches !== null ? matches.length : 0;
  const minutes = Math.ceil(count / speed);

  return minutes;
}

const slug = function(string) {
  return slugify(string.replace("/", " "), {
    replacement: "-",
    lower: true,
    locale: "pt",
    remove: /[*+~,()#'"!:@]/g,
  });
}

const toFormat = function(object, format) {
  var result = format;
  format.match(/{(.*?)}/g).forEach(function(field) {
    result = result.replace(field, object[field.replace(/[{}]/g, "")]);
  })
  return result;
}

const frontMatterPatch = function(object) {
  object = object || this.ctx;
  Object.keys(object)
    .filter(key => key.match(/\W/))
    .map((key) => {
      object[
        key
          .replace(/\W\w/g, characters => characters.toUpperCase())
          .replace(/\W/g, "")
      ] = object[key];
      delete object[key];
    });
}

module.exports = {
  readingTime,
  slug,
  toFormat,
  frontMatterPatch,
}
