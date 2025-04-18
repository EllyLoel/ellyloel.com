---
title: My dream list styles aren't allowed
tags:
  - Seedling
  - Notes
  - CSS
created: 2025-04-13
modified: 2025-04-13
date: 2025-04-13
id: 40cd5684409171688ef5a3eb11f1aa7d
---
I've been thinking about list styles. Specifically about `list-style-position`.

The `outside` value lines things up nicely but can easily lead to the `::marker` running off the edge of the viewport if you're not careful. The `inside` value fixes that issue but then the alignment goes to 💩

Look at this example from the [Inside vs outside section of Chris Coyier's List style recipes](https://css-tricks.com/list-style-recipes/#aa-inside-vs-outside) article.

<div class="[ iframe-container ]">
	<iframe title="CodePen example" src="https://codepen.io/chriscoyier/embed/eYpWrPB?default-tab=html%2Cresult&editable=true">
		See the Pen <a href="https://codepen.io/chriscoyier/pen/eYpWrPB">Inside vs Outside Lists</a> by Chris Coyier (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.
	</iframe>
</div>

In my mind the perfect way to style lists would be with an inside positioned marker, subgrid, and [display's multi-keyword syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/multi-keyword_syntax_of_display):

```css
:is(ul, ol) {
	padding: 0;
	list-style-position: inside;
	display: grid;
	grid-template-columns: min-content 1fr;

	> li {
		align-items: baseline;
		grid-column: 1 / -1;
		display: block grid list-item;
		grid-template-columns: subgrid;

		> * {
			grid-column: 2 / -1;
		}
	}
}
```

but alas, CSS spec says no:

> Note: In this level, as restricted in the grammar, list-items are limited to the Flow Layout display types ('block'/'inline'/'run-in' with 'flow'/'flow-root' inner types). This restriction may be relaxed in a future level of this module.
> — [CSS Display Module](https://drafts.csswg.org/css-display/#list-items:~:text=NOTE%3A%20In%20this%20level%2C%20as%20restricted%20in%20the%20grammar%2C%20list%2Ditems%20are%20limited%20to%20the%20Flow%20Layout%20display%20types%20(block/inline/run%2Din%20with%20flow/flow%2Droot%20inner%20types).%20This%20restriction%20may%20be%20relaxed%20in%20a%20future%20level%20of%20this%20module.)

I guess I'll cross my fingers that "This restriction may be relaxed in a future level of this module" because until then it's not doable[^1].

[^1]:Technically it is kinda doable but it's gotta use `::before` and [CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters) to work around the fact that the `list-item` display keyword is needed to generate the `::marker`. You can see an example of this in Chris' CodePen example earlier in the post.

## Update: 18 April 2025

> @elly oh you already have the workaround in your post. When you ask questions, you bring receipts!
> You link to the note in the spec, but I don't see any open issues for solving it. Maybe you should open one! (because I agree it's a common need)
> https://github.com/w3c/csswg-drafts/issues/?q=is%3Aissue%20state%3Aopen%20%22list-item%22%20label%3Acss-display-4%20
> — [Miriam Suzanne](https://front-end.social/@mia/114357139576097940)

Well, thank you for the push Mia, here's the link to [the issue](https://github.com/w3c/csswg-drafts/issues/12100) if anyone wants to go +1 it!
