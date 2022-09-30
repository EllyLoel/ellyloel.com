---
title: Cascade layers
---

::: callout :construction_worker_woman: Under construction :construction:
Heads up! This post is under construction, so take it with a grain of salt.
:::

## Coming up with a layer stack

My current layer setup:
```css
@layer reset, vars, base, blocks, utilities;
```

## Ways to create or put styles into layers
### Formal syntax
{% svg "./public/assets/svg/cascade layer formal syntax.svg" %}
WTF does that mean though??

Okay, let's break it down
{% svg "./public/assets/svg/cascade layer formal syntax explained.svg" %}

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

Or linking to a stylesheet and 
```css

```

## References
- https://youtu.be/vK8vj1l_oRk
- https://youtu.be/NDNRGW-_1EE
- https://youtu.be/ilrPpSQJb3U
- https://youtu.be/_yC24JH71r4
- https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/
- https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/
- https://youtu.be/zEPXyqj7pEA