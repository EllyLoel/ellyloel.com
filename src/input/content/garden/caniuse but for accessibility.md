---
title: caniuse but for accessibility
tags:
  - Seedling
  - Notes
  - Accessibility
created: 2025-01-21
modified: 2025-01-21
id: eb99643131e8eb61e8588edd15617ce7
draft: true
date: 2025-01-21
---
[A Framework for Evaluating Browser Support](https://www.joshwcomeau.com/css/browser-support/)

We need [Can I use](https://caniuse.com/) but instead of support and usage data for front-end web technologies in browsers it's support and usage data for accessibility web technologies in assistive technologies and browsers.

> Only accessibility-supported ways of using technologies are relied upon to satisfy the success criteria.
> — [5.2.4 Only Accessibility-Supported Ways of Using Technologies](https://www.w3.org/TR/WCAG/#cc4)

> supported by users' assistive technologies as well as the accessibility features in browsers and other user agents
> — [WCAG 2.2 Glossary: accessibility supported](https://www.w3.org/TR/WCAG/#dfn-accessibility-supported)

> This topic raises the question of how many or which assistive technologies must support a Web technology in order for that Web technology to be considered "accessibility supported".
> — [Level of Assistive Technology Support Needed for "Accessibility Support"](https://www.w3.org/WAI/WCAG22/Understanding/conformance#support-level)

There is [a11ysupport.io](https://a11ysupport.io/) which is awesome and I'm so glad it exists but it not the best. It needs more data and more features. 

For more data, we need more people to test the tests on with more AT + browser combos. If you have the time and energy you should [contribute to a11ysupport.io](https://a11ysupport.io/contribute)!

As for more features, I have a few key ones in mind. I think some of them are definitely do able but others I worry a possibly/probably not. A do able example would be browser support and usage could either be pulled from BCD and StatCounter or simply link to Can I use. A probably not do able example would be assistive technology usage, for obvious privacy concerns. Unless there was some way of making sure that the data was always anonymous and couldn't be used for finger printing, etc. Plus, it would also require many for profit, notoriously not open, companies to be on board with it, which is unlikely. I should be clear that I'm not talking about [assistive technology detection](https://adrianroselli.com/2014/03/on-screen-reader-detection.html). I'm referring to the usage data the the assistive technology vendors almost certainly already have (that I would **hope** is already annonymised).

[“Evergreen” Does Not Mean Immediately Available](https://css-tricks.com/evergreen-does-not-mean-immediately-available/)

[‘Can I Use…’, but for ARIA!](https://www.bocoup.com/blog/can-i-use-but-for-aria)