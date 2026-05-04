---
title: Breadcrumb
tags:
  - Seedling
  - Notes
  - Pattern library
created: 2026-02-18
modified: 2026-02-18
date: 2026-02-18
---

~~~ callout This is a pattern from my [pattern library](/pattern-library/)
~~~

> Always place breadcrumbs at the top of a page, before the `<main>` element. Placing them here means that the ‘Skip to main content’ link allows the user to skip all navigation links, including breadcrumbs.
> 
> The breadcrumbs should start with your ‘home’ page and end with the parent section of the current page.
— [Breadcrumbs – GOV.UK Design System](https://design-system.service.gov.uk/components/breadcrumbs/)

```html
<header>
  <a href=#content>Skip to main content</a>
  <nav>
    <a href=/>My site</a>
    …
  </nav>
</header>
<nav aria-labelledby=name>
  <p id=name hidden>Breadcrumb</p>
  <ol>
    <li><a href=/>Home</a></li> <!-- could instead be the title of the site, or it could be left out as there is a home link in the main navigation right before the breadcrumb navigation -->
    <li><a href=/grandparent>Grandparent</a></li>
    <li><a href=/parent>Parent</a></li>
    <li><a href=/this-page aria-current=page>This page</a></li> <!-- could be left out as the h1 with the same content is directly after this -->
  </ol>
</nav>
<main id=content tabindex=-1>
  <h1>This page</h1>
  …
</main>
```

- wrap on mobile, pls don't collapse or remove items, it makes me sad ;-;
- more complex breadcrumbs that contain disclosures that let you navigate to different ancestor or sibling pages could be helpful but add significant complexity
