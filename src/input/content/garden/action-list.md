---
title: Action list
tags:
  - Seedling
  - Notes
  - Pattern library
created: 2026-02-20
modified: 2026-02-20
date: 2026-02-20
---

~~~ callout This is a pattern from my [pattern library](/pattern-library/)
~~~

```html
<button
	type=button
	id=button
	aria-controls=list
	commandfor=list
	command=toggle-popover
>
	Actions
</button>
<ul
	id=list
	aria-labelledby=button
	popover
>
	<li>
		<a href=…>Edit</button>
	</li>
	<li>
		<a href=… download>Download</button>
	</li>
	<li>
		<button type=button>Delete</button>
	</li>
	…
</ul>
```

if you do actually need an ARIA menu, then here you go. *but also like, do you really?*

```html
<button
	type=button
	id=button
	aria-haspopup=menu
	aria-controls=menu
	commandfor=menu
	command=toggle-popover
>
	Actions
</button>
<div
	id=menu
	role=menu
	aria-labelledby=button
	popover
>
	<button role=menuitem>Action 1</button>
	…
</div>
```
