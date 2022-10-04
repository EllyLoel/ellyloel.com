---
title: Should I use Flex or Grid?
---

![[Pasted image 20221004110858.png]]

Picking the right layout mode can be a daunting and confusing decision for developers, especially to those just learning CSS. Don’t worry though we’re here to help guide you!

---

So should you use flex or grid? **Yes!**

Wait, *what?*

To think about this properly we need to reframe the question. Maybe “When should I use flex or grid?” or something like “How do I pick the right layout mode?”.

It’s important to keep in mind that there is no silver bullet, this isn’t a black and white, yes or no question; there is no one layout mode to rule them all. As with all things, there is nuance.

Flex and grid are not the only layout modes! Flow (aka the default layout mode), tables, floats, multi column, the list goes on; there are many different options, it’s all about picking the best one for your use case.

# Flexbox

## The history of the flexible box layout m**odule**

  

The idea of flexbox was first discussed by the CSS Working Group sometime before 2008 and the first public draft was published in 2009. In their blog post "[Flexbox is Dead, Long Live Flexbox!](https://www.xanthir.com/blog/b4Dm0)” Tab Atkins explains that “the original spec was too close of a direct translation from XUL”. XUL was Mozilla’s proprietary UI building language, it looks like an alternate universe version of HTML, which is why they were able to base the flexbox spec on it.

  

Due to the issues with the first working draft, Tab Atkins rewrote the spec and over the course of 2011 and 2012 published four working drafts.

  

Towards the end of 2012 the spec reached W3C candidate recommendation. This means the spec is stable, supported in browsers, tests are being written for it and there should not be a significant change from this version.

  

But, there was still performance and efficiency improvements to be made. So over 2014 and 2015 there were three more working drafts. Finally, the spec once again reached candidate recommendation in early 2016.

  

This is basically the flexbox we know and love today. The reason I covered this history in such detail is to help bring some context to the discussion surrounding layout in CSS. It wasn’t a easy or straight forward path to get to where we are today.

  

People had reservations around flexbox, because it changed multiple times people felt like they couldn’t use it, because they thought it might change again.

  

For the same reason people had reservations around grid when it first came out but the process for releasing the grid spec was much different to flexbox so it was needless worry.

  

![The flexbox spec went from draft to recommendation, then back to draft and back to recommendation again!](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled.png)

  

The flexbox spec went from draft to recommendation, then back to draft and back to recommendation again!

  

![The grid spec followed the usual draft to recommendation flow with no back tracking.](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%201.png)

  

The grid spec followed the usual draft to recommendation flow with no back tracking.

  

## CSS’s first layout mode intended for designing UIs

  

> “Flex layout … is designed for laying out more complex applications and webpages.”

>

  

– [W3C Flexbox spec](https://www.w3.org/TR/css-flexbox-1/#flex-layout)

  

Flexbox was what the web needed, but because it was the first tool of it’s kind it’s used in many situations that it shouldn’t be. This used to be because it was the only tool of it’s kind but now we have grid yet we still see many hacky flexbox based grids.

  

![Untitled](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%202.png)

  

The [law of the instrument](https://en.wikipedia.org/wiki/Law_of_the_instrument) is a cognitive bias that involves an over-reliance on a familiar tool. This perfectly describes the relationship we have with flexbox, maybe we haven’t learnt grid and we’re reluctant to because we already know flexbox and they’re ***basically*** the same, right? Ehhh, no, not really. It’s important to keep in mind that there is never going to be one layout mode to rule them all, they all exist for a reason.

  

> "If the only tool you have is a hammer, it is tempting to treat everything as if it were a nail”

>

  

– A. Maslow

  

## Use cases

  

### Distributed nav/header

  

[https://mdn.github.io/css-examples/flexbox/use-cases/navigation.html](https://mdn.github.io/css-examples/flexbox/use-cases/navigation.html)

  

### Split nav/header

  

[https://mdn.github.io/css-examples/flexbox/use-cases/split-navigation.html](https://mdn.github.io/css-examples/flexbox/use-cases/split-navigation.html)

  

### Centring an element

  

[https://mdn.github.io/css-examples/flexbox/use-cases/center.html](https://mdn.github.io/css-examples/flexbox/use-cases/center.html)

  

### Card layout pushing footer down

  

[https://mdn.github.io/css-examples/flexbox/use-cases/cards.html](https://mdn.github.io/css-examples/flexbox/use-cases/cards.html)

  

### Media objects

  

[https://mdn.github.io/css-examples/flexbox/use-cases/media.html](https://mdn.github.io/css-examples/flexbox/use-cases/media.html)

  

### Form controls

  

[https://mdn.github.io/css-examples/flexbox/use-cases/label-input-button.html](https://mdn.github.io/css-examples/flexbox/use-cases/label-input-button.html)

  

# Grid

  

## Wait, does this replace flexbox?

  

No! Not at all, they both have their own use cases and they work wonderfully together!

  

Grid is often seen as the replacement of flexbox or flex 2.0, when it’s really another tool for us to utilise. Both grid and flex were conceptualised and specified around the same time, it’s just that their journeys from spec to implementation were very different.

  

## Makes the impossible possible

  

Grid makes so many layouts that used to be near impossible a lot simpler.

  

### Responsive 1-3 column holy grail layout

  

[https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout/_sample_.a_responsive_layout_with_1_to_3_fluid_columns_using_grid-template-areas.html](https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout/_sample_.a_responsive_layout_with_1_to_3_fluid_columns_using_grid-template-areas.html)

  

[Realizing common layouts using grids - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout#a_responsive_layout_with_1_to_3_fluid_columns_using_grid-template-areas)

  

### RAM (Repeat, Auto, Minmax)

  

[Grid by Example 28: minmax() in auto-fill repeating tracks by [Rachel Andrew on CodePen](https://codepen.io/rachelandrew)](https://codepen.io/rachelandrew/pen/GZQYOL)

  

Grid by Example 28: minmax() in auto-fill repeating tracks by [Rachel Andrew on CodePen](https://codepen.io/rachelandrew)

  

[RAM (Repeat, Auto, Minmax)](https://web.dev/patterns/layout/repeat-auto-minmax/)

  

### Different sized grid items

  

[CSS Grid: Multiple image hero block by [Rachel Andrew on CodePen](https://codepen.io/rachelandrew)](https://codepen.io/rachelandrew/pen/QKwvxJ)

  

CSS Grid: Multiple image hero block by [Rachel Andrew on CodePen](https://codepen.io/rachelandrew)

  

### Overlapping elements

  

Grid gives you great control over element placement, including layering elements on top of each other.

  

![OVERLAP ALL THE THINGS.](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%203.png)

  

OVERLAP ALL THE THINGS.

  

### Subgrid (soon!)

  

Only supported in Gecko (Firefox) and WebKit (Safari), currently in development for Blink/Chromium (Chrome/Edge/Opera/Samsung/etc.)

  

[Subgrid - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid)

  

![Untitled](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%204.png)

  

### Masonry layout (not so soon)

  

Only supported in Gecko (Firefox) behind a flag.

  

[Masonry layout - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout)

  

![Untitled](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%205.png)

  

# Ways of thinking about their differences

  

## One-dimensional versus two-dimensional layout

  

Flexbox lays out it’s elements in either a row or a column, not both. You can fake it, and get something that looks like a grid with flexbox but the flexbox algorithm doesn’t know about the second dimension.

  

![Untitled](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%206.png)

  

Grid positions it’s elements based on both it’s rows and columns.

  

![Untitled](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%207.png)

  

## Content first (intrinsic) or layout first (extrinsic)?

  

Use grid when you already have the layout structure in mind, and flex when you aren’t as worried about the layout and just want everything to fit.

  

### Flex will listen to it’s content, so it’s content first or intrinsic.

  

![Initially intended layout](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%206.png)

  

Initially intended layout

  

![Doesn’t look like it’s changed (it has)](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%208.png)

  

Doesn’t look like it’s changed (it has)

  

![Woah, what the?!](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%209.png)

  

Woah, what the?!

  

![Oh god, what in the world is going on?!?](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%2010.png)

  

Oh god, what in the world is going on?!?

  

Flex is not grid, grid is grid. 😂

  

### Grid will stick to it’s rows and columns no matter what, so it’s layout first or extrinsic.

  

![Initial intended layout](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%207.png)

  

Initial intended layout

  

![Doesn’t look like it’s changed (it has)](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%2011.png)

  

Doesn’t look like it’s changed (it has)

  

![Never changing these columns](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%2012.png)

  

Never changing these columns

  

![Uh oh, we’ve got some overflow](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%2013.png)

  

Uh oh, we’ve got some overflow

  

If you want you can even make the layout so rigid that it stays exactly the same, though you probably don’t actually want this.

  

![A very very long what?](Should%20I%20use%20Flex%20or%20Grid%207cc8f4ac2a2e43c987ca539568846bfb/Untitled%2014.png)

  

A very very long what?

  

# Other layout modes

  

I won’t go into too much detail as this isn’t the main focus of the article but here’s a rough “cheatsheet” if you will.

  

## Layout mode cheatsheet

  

| Flexbox | The children of a flex container can be laid out in a column or a row and will automatically flex their size, either growing to fill unused space or shrinking to avoid overflowing the parent. Horizontal and vertical alignment can easily be set, making Flexbox ideal for distributed nav/header, split nav/header, centring an element, card layout pushing footer down, media objects, and form controls. |

| --- | --- |

| Grid | The children of a grid container are laid out in rows and columns that can be easily defined. This is best when you have a structured layout in mind, for example responsive 1-3 column holy grail layout, RAM (Repeat, Auto, Minmax), different sized grid items, overlapping elements, subgrid (soon!), and masonry layout (not so soon). |

| Multi column | The children of a multi column container are laid out in columns. You are able to set the number of columns and/or the width of columns, as well as how content should flow between columns, the size of columns gaps, and lines in the gaps. This is best when you have lots of text that you want to break into multiple columns. |

| Table | Table layout may seem similar to grid layout but table layout comes with semantics. This is best when you have a structured set of data made up of rows and columns (tabular data). If you have tabular data is is important you use a table and not grid, as the semantics tables have helps screen readers and other assistive technology describe it better. |

| Flow | Flow layout is the default layout mode for most elements. It’s best for laying out document like content, because of how it handles inline and block elements differently. |

| Float | Floats are best for placing media within text. The text is able to wrap around floated elements, like images in a newspaper article for example. |

| Positioned | There are multiple different types of positioned layout. An element can be positioned relative to itself, it’s containing block, or the viewport. This can be used, for example, to position the header to always be at the top of the viewport, to position a chat window in the corner of the viewport, or to position a tooltip next to a button. |

  

# The Verdict

  

Layout is the bedrock of CSS. Different layout modes are useful in different circumstances. There's no silver bullet answer to the question of which one you should use.

  

The most important thing is to know is that they all have their use cases. Take your time to learn about them all, so that you can use the right tool for each situation.

  

And remember, it’s okay if you can’t remember all this right away. This article isn’t going anywhere, so feel free to come back and use this as a reference when you’re trying to make this tricky decision. We’re here to help!

  

There is an overwhelming amount of resources available online for learning more about layout. If you're interested in learning more check out Scrimba's [Learn Flexbox for free](https://scrimba.com/learn/flexbox) or [Learn CSS Grid for free](https://scrimba.com/learn/cssgrid) courses, or check out [How not to struggle with CSS, with Kevin Powell](https://scrimba.com/podcast/how-not-to-struggle-with-css-with-kevin-powell/) on the Scrimba Podcast. And lastly, if you're looking for something more comprehensive checkout Kevin Powell's awesome [Learn Responsive Web Design](https://scrimba.com/learn/responsive) course on Scrimba.