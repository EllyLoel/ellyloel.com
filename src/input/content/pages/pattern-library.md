---
layout: base
title: Pattern library
eleventyNavigation:
  key: Pattern library
  parent: Garden
  order: 7
---

~~~ callout
## Continue with caution

This is a work in progress, currently it's mostly very scattered thoughts that I wanted to get out of my brain.

They have not been made nice and presentable, nor has my reasoning or anything really been explained.

So like, yeah,, *please* take caution.
~~~

A set of patterns common to the web. Thoughts and opinions I've collected over time. Lots of links to helpful resources. Not ready to go examples, definitely not an NPM-installable kinda vibe. Maybe at some point they'll be mostly or fully copy-pastable but I don't want this to be something people can use without thinking. You [MUST](https://www.rfc-editor.org/rfc/rfc2119#:~:text=1.%20MUST%20%20%20This%20word%2C%20or%20the%20terms%20%22REQUIRED%22%20or%20%22SHALL%22%2C%20mean%20that%20the%0A%20%20%20definition%20is%20an%20absolute%20requirement%20of%20the%20specification.){.force-uppercase} use your brain when implementing these patterns.

{%- set patterns = collections["Pattern library"] -%}
{%- for pattern in patterns %}
- [{{ pattern.data.title }}]({{ pattern.url }})
{%- endfor -%}
