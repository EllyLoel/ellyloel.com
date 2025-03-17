---
title: Font sizes
tags:
  - Seedling
  - Notes
  - CSS
  - Accessibility
  - Design
created: 2025-02-15
modified: 2025-02-15
id: c1ef6c76eddd80ecdb54e0e8c40f4301
draft: true
date: 2025-02-15
---
- min and max (clamp) are bad in our stylesheets
	- but can be good in user stylesheets
- (some) browsers 
	- let you set a default font size
	- let you set a minimum font size
	- should also let you set a maximum font size
- some viewport or container units being mixed in would be nice, but not too much to mess up zooming
	- https://adrianroselli.com/2019/12/responsive-type-and-zoom.html
		- https://fluid.style/type?min=2.25&max=4.5&min-bp=20&max-bp=77.5&unit=%22rem%22
	- easing like typetura talks about would be nice too
- why might users want or need to change the font size?
	- people with vision related disabilities might need to increase the default font size, and likely also set a minimum font size.
	- people with cognitive disabilities might want to be able to see more in the viewport at once so they might decrease the default font size and possibly set a maximum font size.
- should padding, margin, sizing, etc. scale with font size?
	- https://ashleemboyer.com/blog/why-you-should-use-px-units-for-margin-padding-and-other-spacing-techniques
		- https://codepen.io/miriamsuzanne/pen/KKjVQMK?editors=0100
- it can be frustrating when you resize the horizontal viewport and then you lose where you were in the page because the scroll point you were at no longer corresponds with the same point in the content.