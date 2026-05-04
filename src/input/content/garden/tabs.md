---
title: Tabs
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

- do **NOT** use them to change the main content of the page

progressively enhance the tab roles and styles like [GOV.UK Design System Tabs component](https://design-system.service.gov.uk/components/tabs/)

```html
<div class=tabs>
	<ul role=tablist>
		<li role=presentation>
			<a
				id=tab-1
				href=#tab-1
				role=tab
				aria-selected=true
				aria-controls=tabpanel-1
			>
				Tab 1
			</a>
			…
		</li>
	</ul>
	<div
		id=tabpanel-1
		role=tabpanel
		tabindex=0
		aria-labelledby=tab-1
	>
		<p>Tab panel 1</p>
	</div>
	…
</div>
```

or a button based version:

```html
<div class=tabs>
	<div role=tablist>
		<button
			id=tab-1
			type=button
			role=tab
			aria-selected=true
			aria-controls=tabpanel-1
		>
			Tab 1
		</button>
		…
	</div>
	<div
		id=tabpanel-1
		role=tabpanel
		tabindex=0
		aria-labelledby=tab-1
	>
		<p>Tab panel 1</p>
	</div>
	…
</div>
```
