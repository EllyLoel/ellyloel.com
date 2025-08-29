---
title: Cascade layers
tags:
  - Budding
  - Notes
  - CSS
created: 2022-09-28
modified: 2022-10-07
id: 73cffd11a92cd27d7984039848eda2e1
date: 2022-09-28
---
~~~ callout **{% emoji "👷🏼‍♀️", "Construction worker woman." %} Under construction {% emoji "🚧", "Construction sign." %}**
Heads up! This post is under construction, so take it with a grain of salt.
~~~

## Coming up with a layer stack

My current layer setup:

```css
@layer reset, vars, base, blocks, utilities;
```

Miriam Suzanne shared this one in her CSS-Tricks article:

```css
@layer reset, default, themes, patterns, layouts, components, utilities;
```

And this one in her article "A Whole Cascade of Layers":

```css
@layer spec, browser, reset, default, features, layout, theme;
```

Though, as she mentions, `spec` and `browser` aren't actual layers she's creating, they're fundamental to the web.
So it's something more like this:

```css
@layer reset, default, features, layout, theme;
```

## Ways to create or put styles into layers

### Formal syntax

```css
@layer [ <layer-name># | <layer-name>? { <stylesheet> } ]
```

WTF does that mean though??

Okay, let's break it down

```css
@layer [
  /* 1 or more layer names */
  <layer-name>#
  /* OR */
  |
  /* 0 or 1 layer names with styles */
  <layer-name>? { <stylesheet> }
]
```

Basically, these are the ways you can use `@layer`:

```css
/* 1 layer name */
@layer layer-name;

/* More than 1 layer name */
@layer layer-name, layer-name, layer-name;

/* No layer name with styles */
@layer {
	.foo {
		baz: bar;
	}
}

/* 1 layer name with styles */
@layer layer-name {
	.foo {
		baz: bar;
	}
}
```

### But wait, there's more

Don't forget about importing styles into a layer

```css
@import "foo.css" layer(layer-name);
```

There's even been [talk](https://github.com/w3c/csswg-drafts/issues/5853) of being able to set a layer when linking to a stylesheet

```html
<link rel="stylesheet" href="foo.css" layer="layer-name" />
```

## References

- [Improving CSS Architecture with Cascade Layers, Container Queries, Scope, by Miriam Suzanne](https://youtu.be/vK8vj1l_oRk)
- [No more specificity issues?! (or all new ones 🤔) - A look at CSS Cascade Layers by Kevin Powell](https://youtu.be/NDNRGW-_1EE)
- [CSS Cascade Layers: An overview of the new @layer and layer() CSS primitives by Una Kravets](https://youtu.be/ilrPpSQJb3U)
- [Cascade layers on the CSS Podcast](https://youtu.be/_yC24JH71r4)
- [Getting Started With CSS Cascade Layers by Stephanie Eckles](https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/)
- [The Future of CSS: Cascade Layers (CSS `@layer`) by Bramus Van Damme](https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/)
- [The CSS Cascade, a deep dive by Bramus Van Damme](https://youtu.be/zEPXyqj7pEA)