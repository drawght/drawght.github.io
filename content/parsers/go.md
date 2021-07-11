---
language: Go
externalReferences:
- name: Github
  url: "https://github.com/drawght/drawght-go"
- name: GoPkg
  url: "https://gopkg.in/drawght/drawght-go.v0"
---
Install:

```shell
{%- for reference in externalReferences %}
go get {{ reference.url }} // to use {{ reference.name }}
{%- endfor %}
```

In the Go source code:

```go
package main

import "fmt"
import "github.com/drawght/drawght-go"

func main() {
	template := `
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
`
	data := map[string] interface{} {
		"title": "Drawght is a very useful sketch",
		"author": map[string] interface{} {
			"name": "Hallison Batista",
			"email": "email@hallison.dev.br",
			"networks": []interface{} {
				map[string] interface{} {
					"name": "Dev.to",
					"url": "//dev.to/hallison",
				},
				map[string] interface{} {
					"name": "Github",
					"url": "//github.com/hallison",
				},
				map[string] interface{} {
					"name": "Twitter",
					"url": "//twitter.com/hallison",
				},
			},
		},
		"creation-date": "2021-06-28",
		"publishing date": "2021-07-01",
		"references": []interface{} {
			map[string] interface{} {
				"name": "JSON Template",
				"url": "//code.google.com/archive/p/json-template",
			},
			map[string] interface{} {
				"name": "Mustache",
				"url": "//mustache.github.io",
			} ,
			map[string] interface{} {
				"name": "Handlebars",
				"url": "//handlebarsjs.com",
			},
		},
		"tags": []interface{} {
			"Template",
			"Draft",
		},
	}

	result := drawght.Parse(string(template), data)

	fmt.Println(result)
}

/** Output result:
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
```

The next source code, the dataset was written in JSON file `dataset.json` and
template was written `template.md.in` file.

```go
package main

import (
	"fmt"
	"io/ioutil"
	"encoding/json"
)

import "github.com/drawght/drawght-go"

func main() {
	jsonContent, fail := ioutil.ReadFile("dataset.json")
	if fail != nil {
		fmt.Println(fail)
	}

	var data interface{}
	if fail := json.Unmarshal(jsonContent, &data); fail != nil {
		fmt.Println(fail)
	}

	template, fail := ioutil.ReadFile("template.md.in")
	if fail != nil {
		fmt.Println(fail)
	}

	result := drawght.Parse(string(template), data)

	fmt.Println(result)
}
```
