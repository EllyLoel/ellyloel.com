---
title: How to get Cloudflare redirects to ignore index.html
tags:
  - Evergreen
  - Notes
  - Resources
created: 2025-03-12
modified: 2025-03-12
id: 7eadd018223dd54cb520fc17ccf1b239
date: 2025-03-12
---
As you may or may not be aware I rearranged things around here a bit, and thus I needed to setup some redirects because [Cool URIs don't change](https://www.w3.org/Provider/Style/URI).

So I went looking and saw that Cloudflare Pages supports a `_redirects` files, similar to Netlify. So I tried this:

```
/garden/* /:splat 301
```

But that didn't work in my case because I need `/garden/index.html` to not redirect to `/index.html`.

So instead of using the `_redirects` file, I had to use =="Cloudflare Rules"==, specifically =="Redirect Rules"==. More specifically a =="Single Redirect"== using a =="Custom Filter Expression"==:

```
(http.request.uri.path wildcard r"/garden/*/") and (http.request.uri.path ne "/garden/" or http.request.uri.path ne "/garden/index.html")
```

That redirects to a =="Dynamic"== expression:

```
wildcard_replace(http.request.uri.path, r"/garden/*/", r"/${1}/")
```

I spent hour faffing around with this trying to get it to work. The key was placing the trailing slashes in the expressions, _even though I didn't even know that was allowed as it wasn't mentioned in the docs once_.

Without the trailing slashes in the expressions `/garden/index.html` just redirect to `/index.html` like it did earlier with the `_redirects` file.

---

Hope this helps someone else in the future struggling with this same issue!