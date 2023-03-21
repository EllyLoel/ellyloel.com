---
title: There Is No Document Outline Algorithm
tags: articles
image: "https://v1.opengraph.11ty.dev/https%3A%2F%2Fadrianroselli.com%2F2016%2F08%2Fthere-is-no-document-outline-algorithm.html/onerror/"
created: 2023-01-13
modified: 2023-01-13
---

{% unfurl "https://adrianroselli.com/2016/08/there-is-no-document-outline-algorithm.html" %}

> "Way back in the early oughts (actually, 1999–2000) I wrote a CMS (Content Management System) based on delimited text files. It was a lark. I wanted to teach myself some programming skills and my brother needed a mini-CMS while he was overseas.
> I quickly ran into the heading issue that HTML5 tried to solve — sometimes his content would be re-used elsewhere in the layout, and the headings would not make sense anymore. But I solved it. I solved it without any fancy frameworks or libraries or HTML5 retooling.
> Every content container carried a variable (this was all server-side code). That variable was a number reflecting its nesting level on the page. That number was then used to replace the number in any `<h#>` levels in the content (the content was chunked enough that there was not more than one heading).
> I carried that technique forward into projects on much beefier CMSes and never had to worry about training authors how to manage chunked content on their home pages (and similar chunked pages). The move to HTML5 never made me consider an all-`<h1>` solution, partly because I knew the outline was not supported."

> "Have a single `<h1>` per page, and that `<h1>` should correspond to the value of the `<title>` (excluding the site name, marketing tagline, etc)."
