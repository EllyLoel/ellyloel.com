---
title: Details summary marker
created: 2022-12-16
modified: 2022-12-16
---

By default, `<summary>` inside `<details>` gets a `display: list-item;`, that's where the lil triangle `::marker` comes from. So it follows that if you change the `display` value, you will lose the `::marker`.

**BUT!** This doesn't seem to be the case on Safari. 🤦🏼‍♀️

`::-webkit-details-marker` is what you want.

```css
summary::-webkit-details-marker {
	display: none;
}
```