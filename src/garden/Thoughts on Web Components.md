---
title: Thoughts on Web Components
stage: seedling
---

::: callout Currently this is a bunch of snippets from other articles
[Let's talk about web components from Brad Frost](https://bradfrost.com/blog/post/lets-talk-about-web-components/)
:::

---

Web Components
front-of-the-front-end
markup, CSS, presentational JS

JS libraries
back-of-the-front-end
logic, data, routing, etc.

**Web components handle front-of-the-front-end code** (e.g. the look and feel of a button)
**JS libraries/frameworks handle back-of-the-front-end code** (e.g. what happens when a user clicks on that button)

**the overwhelming majority of web components don’t need to be web components.**

**why the hell do we need JavaScript at all in order to render web components?**

### basic, static components

**For a (strong?) majority of UI components, we want the developer ergonomics of working with the web component abstraction**, which again looks something like this:

```
<ds-badge
  variant="success" 
  text="99 Luftballons"
>
</ds-badge>
```

But we want the browser to spit out something that looks like this:

```
<div class="badge badge--success">
  99 Luftballons
</div>
```

That, my friends, is called [HyperText Markup Language](https://developer.mozilla.org/en-US/docs/Web/HTML), and it’s how the web has been working since 1991. This specific component doesn’t have any JavaScript razzle-dazzle going on, so effectively we want the web components to build in the same way we’ve been doing forever with [templating languages](https://en.wikipedia.org/wiki/Comparison_of_web_template_engines) like Mustache, Twig, Nunjucks, Jade, JSP, et al.