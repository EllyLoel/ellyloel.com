---
title: Details summary marker
tags:
  - Budding
  - Notes
  - HTML
  - CSS
created: 2022-12-16
modified: 2025-01-12
---

By default, `<summary>` inside `<details>` gets a `display: list-item;`, that's where the lil triangle `::marker` comes from. So it follows that if you change the `display` value, you will lose the `::marker`.

**BUT!** This doesn't seem to be the case on Safari. {% emoji "🤦🏼‍♀️", "white woman facepalming" %}

`::-webkit-details-marker` is what you want.

```css
summary::-webkit-details-marker {
	display: none;
}
```

## Recommended reading

{% unfurl "https://www.scottohara.me/blog/2022/09/12/details-summary.html" %}
