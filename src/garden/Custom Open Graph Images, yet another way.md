---
title: Custom Open Graph Images, yet another way
stage: budding
created: 2023-01-10
modified: 2023-01-10
---

## Creating a page for every page

::: callout :warning: This probably isn't the best way to do this!
If you're following along keep this in mind, and if you know a better way to do it please let me know, so I can update it!
:::

```jinja2
---
layout: og
pagination:
  data: collections.all
  size: 1
  alias: ogPost
permalink: "og/{{ ogPost.data.page.url }}/"
---

{{ ogPost.data.title }}
```

What I'm doing is using Eleventy's [pagination](https://www.11ty.dev/docs/pagination/) to paginate over `collections.all`, aka every page (I think?). Then I'm saying that the size of the paginated pages should be 1, aka one paginated page for each piece of data. Finally, I'm setting the permalink to be the same as the actual page's URL, with a prefix of `og/`.

The content of each paginated page is the title of the page, which gets passed to the layout. I won't paste the whole layout here, if you want to have a look, check out [the layout file on GitHub](https://github.com/EllyLoel/ellyloel.com/blob/main/src/layouts/og.njk). The layout is where I've done the styling and designing of what I want the Open Graph images to look like.

## Getting a screenshot of the `og` pages

Honestly, the main reason I kept on putting off making custom Open Graph images was because I didn't want to have to write a serverless function. I know that probably sounds silly, but I didn't :woman_shrugging:. Sorry if the lack of reasoning is annoying, I just didn't really want to do it, lol.

Luckily, unlike most other custom Open Graph image posts, we don't have to do that as I'm using the [11ty Screenshot API](https://github.com/11ty/api-screenshot) to screenshot the `og/` pages. As far as I can tell, it's pretty similar to the way most other people do it, a serverless function that uses Puppeteer (headless Chrome) to open a link and take a screenshot.

Here's the meta tags:
```jinja2
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:image" content="https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog{{ ogUrl | urlencode }}/opengraph/">
<meta property="og:image" content="https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog{{ ogUrl | urlencode }}/opengraph/">
<meta name="og:image" content="https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog{{ ogUrl | urlencode }}/opengraph/">
<meta name="og:image:secure_url" content="https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog{{ ogUrl | urlencode }}/opengraph/">
<meta property="og:image:alt" content="A background of curved purple lines with the text “{{ text }}” ontop, Elly's logo is in the bottom right corner.">
```

This is the link:
```jinja2
https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog{{ ogUrl | urlencode }}/opengraph/
```

As you can see, we're encoding `ogUrl` which is the current page's URL. Here's an example of what that looks like for this page:
```
https://v1.screenshot.11ty.dev/https%3A%2F%2Fellyloel.com%2Fog%2Fgarden%2Fcustom-open-graph-images-yet-another-way%2F/opengraph/
```

The 11ty Screenshot API URL format is: `https://v1.screenshot.11ty.dev/:url/:size/`.
(*if you want to see all the options and details, check out their docs*).

The size I'm using is `opengraph`, this just means that the screenshot will always be 1200×630, the best(?) size for Open Graph images.

As I mentioned earlier and as stated in the docs, the URL "must be URI encoded." This is what it looks like decoded:
```
https://ellyloel.com/og/garden/custom-open-graph-images-yet-another-way/
```

Feel free to go to that URL if you want, as I've explained, it is literally the HTML version of the Open Graph image for this page. I think Ideally I wouldn't actually want to have this be an accessible page, but it wouldn't work if it wasn't as the 11ty Screenshot API needs to be able to go to it. Soooo.... :woman_shrugging: 

One other idea I did have was creating a new site that scraped the pages on this site and created the Open Graph HTML pages, but that feels overly complex and kinda stupid? Idk, that could be another option if you don't like the extra pages on your site.

Thanks for reading if you got this far, and let me know if you end up doing this on your own site! I'm [@elly@front-end.social](https://front-end.social/@elly) on Mastodon, and I've got webmentions hooked up on here too.