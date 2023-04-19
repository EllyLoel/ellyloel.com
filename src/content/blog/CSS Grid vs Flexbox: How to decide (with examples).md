---js
{
	title: "CSS Grid vs Flexbox: How to decide (with examples)",
	permalink: "/blog/css-grid-vs-flexbox",
	stage: "complete",
	image: "./src/assets/img/Should-I-use-Flexbox-or-Grid.png",
	created: new Date("2022-10-04"),
	modified: new Date("2022-10-24"),
	eleventyComputed: {
		canonical: () => "https://scrimba.com/articles/css-grid-vs-flexbox/",
	},
}
---

![](./src/assets/img/Should-I-use-Flexbox-or-Grid.png)

Should you use a hammer or a screwdriver? Of course that would depend on the job!

The same is true when comparing CSS Grid vs Flexbox. No one layout mode is better than the other. It depends on the task at hand!

**This post shows you [examples of when to use CSS Grid](#when-to-use-css-grid) and [examples of when to use Flex](#when-to-use-flexbox) before explaining the differences in detail so you can confidently reason about which tool to reach for no matter the scenario.**

There is some overlap in what Grid and Flex can do, and that can be super confusing! By the end of this tutorial, you will understand the key differences and know how to pick the most suitable tool for your task.

## Flexbox

### The history of the flexible box layout module

The idea of flexbox was first discussed by the CSS Working Group sometime before 2008 and the first public draft was published in 2009. In their blog post "[Flexbox is Dead, Long Live Flexbox!](https://www.xanthir.com/blog/b4Dm0)" Tab Atkins explains that "the original spec was too close of a direct translation from XUL". XUL was Mozilla’s proprietary UI building language, it looks like an alternate universe version of HTML, which is why they were able to base the flexbox spec on it.

Due to the issues with the first working draft, Tab Atkins rewrote the spec and over the course of 2011 and 2012, publishing four working drafts.

Towards the end of 2012 the spec reached W3C candidate recommendation. This means the spec is stable, supported in browsers, tests are being written for it and there should not be a significant change from this version.

But, there was still performance and efficiency improvements to be made. So over 2014 and 2015 there were three more working drafts. Finally, the spec once again reached candidate recommendation in early 2016.

This is basically the flexbox we know and love today. The reason I covered this history in such detail is to help bring some context to the discussion surrounding layout in CSS. It wasn’t a easy or straight forward path to get to where we are today.

People had reservations around flexbox, because it changed multiple times people felt like they couldn’t use it, because they thought it might change again.

For the same reason people had reservations around grid when it first came out but the process for releasing the grid spec was much different to flexbox so it was needless worry.

<details>
	<summary>
		Flexbox vs Grid publication history
	</summary>
	<div class="[ flex gap-3 flex-col ]">
		{% image "./src/assets/img/flexbox-publication-history.png", "The flexbox spec went from draft to recommendation, then back to draft and back to recommendation again!" %}
		{% image "./src/assets/img/grid-publication-history.png", "The grid spec followed the usual draft to recommendation flow with no back tracking." %}
	</div>
</details>

### CSS’s first layout mode intended for designing UIs

<figure>
  <blockquote>Flex layout ... is designed for laying out more complex applications and webpages.</blockquote>
  <figcaption>
    — <cite><a href="https://www.w3.org/TR/css-flexbox-1/#flex-layout">W3C Flexbox spec</a></cite>
  </figcaption>
</figure>

I covered this history in detail to help bring some context to the discussion surrounding layout in CSS. The path to get here was long and windy. So windy, many developers were reluctant to adopt Flexbox in case it changed again. For this reason, it would be many years until Flexbox became commonplace. Around that time, Grid entered the scene and confused matters further.

![The history of flexbox. 2008, Birth of an idea, CSS Working Group first discussed the idea of Flexbox. 2009, Published Draft, CSS Working Group publishes first public draft. 2012, W3C Candidate Recommendation, Flexbox is stable and supported in browsers. 2014, Improvements, The Flexbox team started working on improvements. 2016, W3C Candidate Recommendation, Flexbox is updated and is stable and supported in browsers.](./src/assets/img/The-History-of-Flexbox.webp)

Flex and Grid are not the only layout modes! There's flow (aka the default layout mode), tables, floats, multi-column, and the list goes on. There are many different options, and it's all about picking the best one for your use case.

Flexbox was what the web needed, but because it was the first tool of it's kind, developers misunderstood and misused it from time to time. Many layout problems would be better solved with Grid but are hacked together with Flex instead.

![Not the hero we deserved, but the hero we needed.](./src/assets/img/hero-we-needed.png)

The [law of the instrument](https://en.wikipedia.org/wiki/Law_of_the_instrument) is a cognitive bias that involves an over-reliance on a familiar tool. This perfectly describes most web developers' relationship with Flexbox 🤣.

<figure>
  <blockquote>If the only tool you have is a hammer, it is tempting to treat everything as if it were a nail</blockquote>
  <figcaption>
    — <cite>A. Maslow</cite>
  </figcaption>
</figure>

You might think there's no need to learn Grid when you know Flex because they are basically the same.

Ehhh, no, not really. It's important to remember that there will never be one layout mode to rule them all. They all exist for a reason.

### When to use Flexbox?

In this section let's look at some common uses for Flexbox:

#### Distributed navigation

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/navigation.html" loading="lazy"></iframe>
</div>

#### Split navigation

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/split-navigation.html" loading="lazy"></iframe>
</div>

#### Centring an element

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/center.html" loading="lazy"></iframe>
</div>

#### Card layout pushing footer down

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/cards.html" loading="lazy"></iframe>
</div>

#### Media objects

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/media.html" loading="lazy"></iframe>
</div>

#### Form controls

<div class="[ iframe-container ]">
	<iframe src="https://mdn.github.io/css-examples/flexbox/use-cases/label-input-button.html" loading="lazy"></iframe>
</div>

## CSS Grid

### Does CSS Grid replace Flexbox?

No! Not at all, they both have their use cases, and they work wonderfully together!

Grid is often seen as the replacement of Flexbox or "Flex 2.0" when it's really another tool for us to utilize.

Web browser developers wrote the specifications for Flex and Grid around the same time, but their journeys from spec to implementation were very different.

Grid makes so many layouts that used to be near impossible a lot simpler.

### When to use CSS Grid?

In this section let's look at some common uses for CSS Grid:

#### Responsive 1-3 column holy grail layout

<div class="[ iframe-container ]">
	<iframe src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout/_sample_.a_responsive_layout_with_1_to_3_fluid_columns_using_grid-template-areas.html" loading="lazy"></iframe>
</div>

#### RAM (Repeat, Auto, Minmax)

<div class="[ iframe-container ]">
	<iframe title="Grid by Example 28: minmax() in auto-fill repeating tracks" src="https://codepen.io/rachelandrew/embed/preview/GZQYOL?default-tab=css%2Cresult&editable=true&theme-id=light" loading="lazy" allowtransparency="true" allowfullscreen="true">
		See the Pen <a href="https://codepen.io/rachelandrew/pen/GZQYOL">
		Grid by Example 28: minmax() in auto-fill repeating tracks</a> by rachelandrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>)
		on <a href="https://codepen.io">CodePen</a>.
	</iframe>
</div>

#### Different sized grid items

<div class="[ iframe-container ]">
	<iframe title="CSS Grid: Multiple image hero block" src="https://codepen.io/rachelandrew/embed/preview/QKwvxJ?default-tab=css%2Cresult&editable=true&theme-id=light" loading="lazy" allowtransparency="true" allowfullscreen="true">
		See the Pen <a href="https://codepen.io/rachelandrew/pen/QKwvxJ">
		CSS Grid: Multiple image hero block</a> by rachelandrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>)
		on <a href="https://codepen.io">CodePen</a>.
	</iframe>
</div>

#### Overlapping elements

Grid gives you great control over element placement, including layering elements on top of each other.

![A grid of 6 semi transparent elements overlapping in different ways.](./src/assets/img/overlapping-elements.png)_OVERLAP ALL THE THINGS._

#### Subgrid (coming soon)

[Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) is only supported in Gecko (Firefox) and WebKit (Safari), currently in development for Blink/Chromium (Chrome/Edge/Opera/Samsung/etc.):

![2 grids, each with 3 columns containing cards. The first grid's cards content sections are misaligned while the second grid's cards are correctly aligned thanks to subgrid.](./src/assets/img/subgrid.png)_The contents of the cards are able to be aligned thanks to subgrid._

#### Masonry layout (coming not so soon)

[Masonry](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout) layout only supported in Gecko (Firefox) behind a flag.

![A screenshot of a search for 'cats' on Pinterest showcasing their iconic masonry layout.](./src/assets/img/masonry-layout.webp)_We're focusing on the layout, right? Totally not the cats..._

## How to choose CSS Grid or Flexbox?

Now you've seen some examples I hope you'll have a better idea about which tool to reach for and when. Still, it's not always obvious which tool to reach for when you're building a custom UI so let's look at some of the ways you can think about when to use Grid and when to use Flexbox.

### One-dimensional versus two-dimensional layout

Flexbox lays out it's elements in either a row or a column, not both. You can fake it, and get something that looks like a Grid with Flexbox but the Flexbox algorithm doesn't know about the second dimension.

![5 elements laid out with flex, 4 and 5 are much wider than 1, 2, and 3.](./src/assets/img/1d-vs-2d-1.png)

Grid positions its elements based on both it's rows and columns.

![5 elements laid out with grid, all the elements are the same width.](./src/assets/img/1d-vs-2d-2.png)

### Content first (intrinsic) or layout first (extrinsic)?

Use Grid when you already have the layout structure in mind, and Flexbox when you aren't as worried about the layout and just want everything to fit.

#### Flexbox will listen to it's content, so it's content first (intrinsic).

![5 elements laid out with flex, 4 and 5 are much wider than 1, 2, and 3.](./src/assets/img/intrinsic-or-extrinsic-1.png)_Intended layout._

![The same 5 elements but now 1 and 2 have shrunk slightly and 3 has grown slightly due to it's content.](./src/assets/img/intrinsic-or-extrinsic-2.png)_Doesn't look like it's changed (it has)._

![The same 5 elements but now 1, 2, 3, and 4 are all the same size and 5 is twice their size.](./src/assets/img/intrinsic-or-extrinsic-3.png)_Woah, what the?!_

![The same 5 elements but now none of the elements are the same size, all because of 3's large content.](./src/assets/img/intrinsic-or-extrinsic-4.png)_Oh boy, what in the world is going on?!?_

#### Grid will stick to it's rows and columns no matter what, so it's layout first or extrinsic.

![5 elements laid out with grid, all the elements are the same width.](./src/assets/img/intrinsic-or-extrinsic-5.png)_Intended layout._

![The same 5 elements but now 2 and 5 are slightly wider because of 2's content.](./src/assets/img/intrinsic-or-extrinsic-6.png)_Doesn't look like it's changed (it has)._

![The same 5 elements but now 2 and 5 are wider because of 2's content.](./src/assets/img/intrinsic-or-extrinsic-7.png)_Never changing these columns._

![The same 5 elements but now 2 and 5 are a lot wider and 3 is overflowing because of 2's content.](./src/assets/img/intrinsic-or-extrinsic-8.png)_Uh oh, we've got some overflow._

If you want you can even make the layout so rigid that it stays exactly the same, though you probably don't actually want this.

![The same 5 elements, all the elements are the same width but 2's content is cut off.](./src/assets/img/intrinsic-or-extrinsic-9.png)_A very very long what?_

## Layout mode cheat sheet

A CSS layout mode, sometimes called layout, is an algorithm that determines the position and size of boxes based on the way they interact with their sibling and ancestor boxes. There are several of them:

<div class="[ table-container ][ visually-hidden ]">
	<table>
		<caption>Layout mode cheat sheet</caption>
		<tbody>
			<tr>
				<th>Flexbox</th>
				<td>The children of a flex container can be laid out in a column or a row and will automatically flex their size, either growing to fill unused space or shrinking to avoid overflowing the parent. Horizontal and vertical alignment can easily be set, making Flexbox ideal for distributed nav/header, split nav/header, centring an element, card layout pushing footer down, media objects, and form controls.</td>
			</tr>
			<tr>
				<th>Grid</th>
				<td>The children of a grid container are laid out in rows and columns that can be easily defined. This is best when you have a structured layout in mind, for example responsive 1-3 column holy grail layout, RAM (Repeat, Auto, Minmax), different sized grid items, overlapping elements, subgrid (soon!), and masonry layout (not so soon).</td>
			</tr>
			<tr>
				<th>Multi column</th>
				<td>The children of a multi column container are laid out in columns. You are able to set the number of columns and/or the width of columns, as well as how content should flow between columns, the size of columns gaps, and lines in the gaps. This is best when you have lots of text that you want to break into multiple columns.</td>
			</tr>
			<tr>
				<th>Table</th>
				<td>Table layout may seem similar to grid layout but table layout comes with semantics. This is best when you have a structured set of data made up of rows and columns (tabular data). If you have tabular data is is important you use a table and not grid, as the semantics tables have helps screen readers and other assistive technology describe it better.</td>
			</tr>
			<tr>
				<th>Flow</th>
				<td>Flow layout is the default layout mode for most elements. It’s best for laying out document like content, because of how it handles inline and block elements differently.</td>
			</tr>
			<tr>
				<th>Float</th>
				<td>Floats are best for placing media within text. The text is able to wrap around floated elements, like images in a newspaper article for example.</td>
			</tr>
			<tr>
				<th>Positioned</th>
				<td>There are multiple different types of positioned layout. An element can be positioned relative to itself, it’s containing block, or the viewport. This can be used, for example, to position the header to always be at the top of the viewport, to position a chat window in the corner of the viewport, or to position a tooltip next to a button.</td>
			</tr>
		</tbody>
	</table>
</div>

![](./src/assets/img/layout-mode-cheat-sheet.png)

~~~ callout Warning
Developers used to push table and float to the limit to layout pages. This is now considered a bad practice, as you should use the best layout mode for the job, reserving table and float for what they were originally designed to do.
~~~

## The verdict

Layout is the bedrock of CSS. Different layout modes are useful in different circumstances. There's no silver bullet answer to the question of which one you should use.

The most important thing is to know is that they all have their use cases. Take your time to learn about them all, so that you can use the right tool for each situation.

And remember, it's okay if you can't remember all this right away. This article isn't going anywhere, so feel free to come back and use this as a reference when you're trying to make this tricky decision. We're here to help!

There is an overwhelming amount of resources available online for learning more about layout. If you're interested in learning more check out Scrimba's [Learn Flexbox for free](https://scrimba.com/learn/flexbox) or [Learn CSS Grid for free](https://scrimba.com/learn/cssgrid) courses, or check out [How not to struggle with CSS, with Kevin Powell](https://scrimba.com/podcast/how-not-to-struggle-with-css-with-kevin-powell/) on the Scrimba Podcast. And lastly, if you're looking for something more comprehensive checkout Kevin Powell's awesome [Learn Responsive Web Design](https://scrimba.com/learn/responsive) course on Scrimba.
