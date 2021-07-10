{{ pkg.description }}

Parsers:

{%- for parser in pkg.links.parsers %}
- [{{ parser.language }}]({{ parser.url }})
{%- endfor %}

Manual pages:

{%- for manual in collections.manuals | reverse %}
- [{{ manual.fileSlug }}]({{ manual.url }})
{%- endfor %}

To understand the sections of the man pages, see [the description page][1].

[1]: https://www.commandlinux.com/man-pages-sections
