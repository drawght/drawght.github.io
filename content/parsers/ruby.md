---
language: Ruby
externalReferences:
- name: Github
  url: "https://github.com/drawght/drawght-ruby"
- name: Rubygems
  url: "https://rubygems.org/gems/drawght"
---
Install:

```shell
gem install drawght
```

In the Ruby source code:

```ruby
require "date"
require "yaml"
require "drawght"

template = <<eot
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
eot

data = {
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
      name: "Mustache",
      url: "//mustache.github.io"
    } , {
      name: "Handlebars",
      url: "//handlebarsjs.com"
    }
  ],
  tags: [
    "Template",
    "Draf"
  ]
}

drawght = Drawght.load template
result = drawght.compile data

puts result

=begin Output result:
# Drawght is a very useful sketch

Drawght is a good tool for writing draft documents using datasets without
logical statements.

Written by Hallison Batista <email@hallison.dev.br>, created in 2021-06-28,
published in 2021-07-01 and tagged by Template.

- [Dev.to](//dev.to/hallison)
- [Github](//github.com/hallison)
- [Twitter](//twitter.com/hallison)

Follow the news on [Dev.to](//dev.to/hallison).

The syntax was inspired by:

- [Mustache](//mustache.github.io)
- [Handlebars](//handlebarsjs.com)

Tags:

- Template (tagged by Hallison Batista).
- Draf (tagged by Hallison Batista).
=end
```

The next source code, the dataset was written in YAML file `dataset.yaml` and
template was written `template.md.in` file.

```ruby
require "date"
require "yaml"
require "drawght"

yaml = File.read "dataset.yaml"
data = YAML.load yaml, permitted_class: [ Date ]
input_file = "template.md.in"

puts "Dataset", yaml

template = File.read input_file
drawght = Drawght.load template

puts drawght.compile(data)
```
