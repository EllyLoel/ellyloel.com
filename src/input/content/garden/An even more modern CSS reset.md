---
title: Modern CSS reset
tags:
  - Budding
  - Projects
created: 2025-04-07
modified: 2025-04-07
id: 4a46ed11c2303f9f2dbc9033281303e2
date: 2025-04-07
draft: true
---

**A reset is more than a reset.**

Sure if you wanna actually just reset things and nothing else then here you go:

```css
*,
*::after,
*::before {
	all: initial !important;
}
```

> Why waste your time on half-measures? Make your site **THE MOST NORMALEST** with this **ULTIMATE CSS RESET**.
> – [Miriam Suzanne's most normalest CSS Reset](https://www.miriamsuzanne.com/2019/11/02/most-normal/)

> In other words, this is a starting point, not a self-contained black box of no-touchiness.
> – [Eric Meyer's CSS Reset](https://meyerweb.com/eric/tools/css/reset/)

## There are always some opinions in resets

- [ ] add examples

> Nicolas Gallagher and I started writing normalize.css together. I named and created the normalize.css repository with the help of Paul Irish and Ben Alman. I transferred the repository to Necolas, who turned it into a “household” CSS library.
>
> Later, I resumed authorship of normalize.css with Luciano Battagliero. Together, we tagged, deprecated, and removed “opinionated” styles — styles developers often prefer but which do not fix bugs or “normalize” browser differences.
>
> Later, Necolas resumed authorship and the issue of whether to include or omit the opinionated styles forced us to split.
>
> I continue working on the normalize.css project, currently under the “csstools” tag. I hope one day our differences are resolved and the projects are one again.
> – [@csstools/normalize.css's differences from normalize.css](https://github.com/csstools/normalize.css/#differences-from-necolasnormalizecss)

> A secondary reminders.css with more opinionated or situational remedies that should be reviewed and considered on a case-by-case basis.
> – [CSS Remedy's reminders](https://github.com/jensimmons/cssremedy#guiding-ideas)

> A reset of sensible defaults
> – [Andy Bell's modern CSS Reset](https://andy-bell.co.uk/a-modern-css-reset/#heading-a-reset-of-sensible-defaults)

{% unfurl "https://bitsofco.de/a-look-at-css-resets-in-2018/" %}

## My first take on a reset

- [ ] break it down
- [ ] explain what happened

Inspiration from:

- Adam Argyle
- Andy Bell
- Josh W Comeau

[Tweet](https://twitter.ellyloel.com/1538752447560110080)

## A revised take on a reset and more

- [ ] add a breakdown

Inspiration from: [a-z]

- Adam Argyle – [Open-Props Normalize](https://codepen.io/argyleink/pen/KKvRORE)
- Andy Bell – [Modern CSS Reset](https://andy-bell.co.uk/a-modern-css-reset/)
- Eric Meyer – [CSS Reset](https://meyerweb.com/eric/tools/css/reset/)
- Jen Simmons – [CSS Remedy](https://github.com/jensimmons/cssremedy)
- Jonathan Neal – [@csstools/normalize.css](https://github.com/csstools/normalize.css/) [sanitize.css](https://github.com/csstools/sanitize.css/)
- Josh W Comeau – [Custom CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
- Miriam Suzanne – [CSS Remedy](https://github.com/jensimmons/cssremedy) [miriamsuzanne.com reset styles](https://github.com/mirisuzanne/mia/tree/main/src/scss/reset) [miriamsuzanne.com default styles](https://github.com/mirisuzanne/mia/tree/main/src/scss/reset)
- Nicolas Gallagher – [normalize.css](https://github.com/necolas/normalize.css)

---

[Gist](https://gist.github.com/EllyLoel/4ff8a6472247e6dd2315fd4038926522)
