---
language: JavaScript
externalReferences:
- name: Github
  url: "https://github.com/drawght/drawght-js"
- name: NPM
  url: "https://www.npmjs.com/package/@drawght/parser"
---
Install:

```shell
npm install --save-dev @drawght/parser
```

In the JavaScript source code:

```javascript
"use strict";

const drawght = require("@drawght/parser");

var template = `
# {title}

Drawght is a good tool for writing draft documents using datasets without
logical statements.

Written by {author.name} <{author.email}>, created in {creation-date},
published in {publishing date} and tagged by {tags#1}.

- [{author.networks:name}]({author.networks:url})

Follow the news on [{author.networks#1.name}]({author.networks#1.url}).

The syntax was inspired by: 

- [{references:name}]({references:url})

Tags:

- {tags} (tagged by {author.name}).
`;

var result = drawght.parse(template, {
  title: "Drawght is a very useful sketch",
  author: {
    name: "Hallison Batista",
    email: "email@hallison.dev.br",
    networks: [
      {
        name: "Dev.to",
        url: "//dev.to/hallison"
      }, {
        name: "Github",
        url: "//github.com/hallison"
      }, {
        name: "Twitter",
        url: "//twitter.com/hallison"
      }
    ]
  },
  "creation-date": "2021-06-28",
  "publishing date": "2021-07-01",
  references: [
    {
      name: "JSON Template",
      url: "//code.google.com/archive/p/json-template"
    }, {
      name: "Mustache",
      url: "//mustache.github.io"
    } , {
      name: "Handlebars",
      url: "//handlebarsjs.com"
    }
  ],
  tags: [
    "Template",
    "Draft"
  ]
});

console.log(result);

/** Result output:
 *
 * # Drawght is a very useful sketch
 * 
 * Drawght is a good tool for writing draft documents using datasets without
 * logical statements.
 * 
 * Written by Hallison Batista <email@hallison.dev.br>, created in 2021-06-28,
 * published in 2021-07-01 and tagged by Template.
 * 
 * - [Dev.to](//dev.to/hallison)
 * - [Github](//github.com/hallison)
 * - [Twitter](//twitter.com/hallison)
 * 
 * Follow the news on [Dev.to](//dev.to/hallison).
 * 
 * The syntax was inspired by:
 * 
 * - [JSON Template](//code.google.com/archive/p/json-template)
 * - [Mustache](//mustache.github.io)
 * - [Handlebars](//handlebarsjs.com)
 * 
 * Tags:
 * 
 * - Template (tagged by Hallison Batista).
 * - Draft (tagged by Hallison Batista).
 */
```

The next source code, the dataset was written in JSON file `dataset.json` and
template was written `template.md.in` file.

```javascript
"use strict";

const fs = require("fs");
const drawght = require("@drawght/parser");
const data = require("./dataset.json");
const inputFile = "./template.md.in";

console.log("Dataset", data);
fs.readFile(inputFile, "utf8", function(fail, template) {
  if (fail) {
    return console.error(fail);
  }
  console.log(drawght.parse(template, data));
});
```
