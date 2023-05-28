---
title: CSS wishlist 2023
stage: budding
tags:
  - CSS
created: 2023-05-01
modified: 2023-05-28
---

I know I'm late, but hey why not!

~~~ callout To be polished...
This is a bit of a messy brain dump, poke me on Mastodon to clean it up.
~~~

## Things that don't exist yet

Just to be clear, when I say "don't exist yet" I mean that these are things that the CSSWG aren't working on yet, *as far as I know*.

- Detect things ([flex wrap](https://ishadeed.com/article/css-wishlist-2023/#flex-wrapping-detection), [position sticky](https://ishadeed.com/article/css-wishlist-2023/#detect-when-sticky-is-active), etc.)  (stolen from Ahmad Shadeed)
- [Visually hidden](https://benmyers.dev/blog/native-visually-hidden/) (stolen from Ben Myers)
- [Styleable resizers](https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/#styleable-resizers) (stolen from Chris Coyier)
- [Standardized multi-line truncation](https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/#standardized-multi-line-truncation) (stolen from Chris Coyier)
- [Grid/flex track styles](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/#grid-track-styles) (stolen from Eric Meyer)
  - Lets chuck in flex too.
- [More and better `:has()`](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/#more-and-better-has) (stolen from Eric Meyer)
  - Not being able to do `a:has(> b)` has (pun intended) tripped me up before.
- [Cross-boundary styles](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/#cross-boundary-styles) (stolen from Eric Meyer)
- [Reference URLs and HTTP in CSS](https://blog.jim-nielsen.com/2023/css-wishlist/#me-reference-urls-and-http-in-css) (stolen from Jim Nielsen)
- [Alternative text for pseudo elements](https://www.matuzo.at/blog/2023/css-wish-list/#alternative-text-for-pseudo-elements) (stolen from Manuel Matuzo)
- [Block links](https://www.matuzo.at/blog/2023/css-wish-list/#block-links) (stolen from Manuel Matuzo)
- [Static variables](https://blog.mayank.co/my-css-wishlist-2023#heading-static-variables) (stolen from Mayank)

## Things that the CSSWG are already aware of/working on
- More logical properties
  - [\[css-logical-2\] issues](https://github.com/w3c/csswg-drafts/labels/css-logical-2)
- Scrollbar gutters
- Animate display none
  - As in, delay the application of `display: none;` until all the other animations have run.
- Unit division (Stolen from Scott Kellum)
  - Also more importantly but further off, [ruleset interpolation](https://css.typetura.com/ruleset-interpolation/explainer/).
- Easing gradients
- Better input styling (selectmenu, etc.)
- Anchor positioning
- Leading trim
- View transitions
- Subgrid
- Masonry layout
- Custom media
- `@property`
- Hanging punctuation
- Scoped styling
- Generated content alt text
- Colour contrast
- Display contents but without the accessibility issues (stolen from Tyler Sticka)
- Random numbers
  - [random() function](https://github.com/w3c/csswg-drafts/issues/2826#issuecomment-1204305712)

Not really CSS
- Declarative custom elements (no shadow DOM)
- `<tooltip>` like the title attribute but not shit

## Prior art

From A to Z:

{% unfurl "https://ishadeed.com/article/css-wishlist-2023/" %}
{% unfurl "https://benmyers.dev/blog/native-visually-hidden/" %}

Chris Coyier's [Things CSS Could Still Use Heading Into 2023](https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/) (unfurl not working with this post for some reason {% emoji "🤔", "Confused." %}).

{% unfurl "https://daverupert.com/2023/01/css-wishlist-2023/" %}
{% unfurl "https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/" %}
{% unfurl "https://meiert.com/en/blog/my-css-wishlist/" %}
{% unfurl "https://blog.jim-nielsen.com/2023/css-wishlist/" %}
{% unfurl "https://www.matuzo.at/blog/2023/css-wish-list/" %}
{% unfurl "https://blog.mayank.co/my-css-wishlist-2023" %}
{% unfurl "https://thinkdobecreate.com/articles/css-wishlist-2023/" %}
{% unfurl "https://cloudfour.com/thinks/tylers-css-wish-list-for-2023/" %}
