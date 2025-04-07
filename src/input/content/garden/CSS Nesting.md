---
title: CSS Nesting
tags:
  - Budding
  - Notes
  - CSS
created: 2022-12-16
modified: 2022-12-16
id: 976e13b9bf2526e79481ae90926a0673
date: 2022-12-16
---
## First nesting syntax survey

{% unfurl "https://developer.chrome.com/blog/help-css-nesting/" %}

> - **Option 1:** @nest: This is the current specified syntax in [CSS Nesting 1](https://www.w3.org/TR/css-nesting-1/). It offers a convenient way to nest appending styles by starting new nested selectors with `&`. It also offers `@nest` as a way to place the `&` context anywhere inside a new selector, like when you're not just appending subjects. It's flexible and minimal but at the expense of needing to remember `@nest` or `&` depending on your use case.
> - **Option 2:** @nest restricted: This is a stricter alternative, in an attempt to reduce the expense mentioned of remembering two nesting methods. This restricted syntax only allows nesting to occur following `@nest`, so there's no append only convenience pattern. Removing ambiguity of choice, creating one easy to remember way to nest, but sacrifices terseness in favor of convention.
> - **Option 3:** Brackets: In order to avoid the double-syntax or extra clutter involved with the `@nest` proposals, [Miriam Suzanne](https://www.miriamsuzanne.com/) and [Elika Etemad](https://twitter.com/fantasai) proposed an [alternative syntax](https://github.com/w3c/csswg-drafts/issues/4748#issuecomment-924118287) that instead relies on additional curly-brackets. This provides syntax clarity, with only two extra characters, and no new at-rules. It also allows nested rules to be grouped by the type of nesting required, as a way of simplifying multiple similarly nested selectors.

### Examples

#### **Option 1:** @nest

```css
.foo {
	color: #111;

	& .bar {
		color: #eee;
	}
}
```

#### **Option 2:** @nest always

```css
.foo {
	color: #111;

	@nest & .bar {
		color: #eee;
	}
}
```

#### **Option 3:** brackets

```css
.foo {
	color: #111;

	 {
		& .bar {
			color: #eee;
		}
	}
}
```

### Results

[Option 1 won the survey with 87% of the vote](https://developer.chrome.com/blog/help-css-nesting-results/) **_but_** [option 3 won out in the _extensive_ debate the CSS Working Group](https://front-end.social/@jensimmons/109521266937294554).

## Second nesting syntax survey

{% unfurl "https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/" %}

> - **Option 3:** Non-letter start: Nested style rules can be added directly into a declaration block, but cannot start with a letter.
> - **Option 4:** Postfix block: Style rules allow for an optional, second block after the declaration block that contains only style rules.
> - **Option 5:** Top-level @nest: Nested style rules are declared in a dedicated, independent at-rule that accepts only style rules. Declarations can be nested using & { .. }.

### Examples

#### Option 3: Non-letter start

```css
article {
	font-family: avenir;

	& aside {
		font-size: 1rem;
	}
}
```

#### Option 4: Postfix block

```css
article {
	font-family: avenir;
}
 {
	aside {
		font-size: 1rem;
	}
}
```

#### Option 5: Top-level @nest

```css
@nest article {
	& {
		font-family: avenir;
	}

	aside {
		font-size: 1rem;
	}
}
```

### Results

The results aren't finalised yet (_I don't think_), but at the time of writing, [option 3 has 76% of the vote](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/#:~:text=Which%20option%20is%20best%20for%20the%20future%20of%20CSS%3F).

## My opinion (_the only correct one_ {% emoji "😉", "Wink." %})

I think option 3 is the best, as do most other people going by the survey results. But with a caveat, I think the `&` should be required. This is both for parsing and for mental model consistency. Obviously, I'm no CSS spec author, but I think having the `&` be required would make things much easier for the parser. And on the side of user's mental models, not having the ambiguity around the `&` is a good idea. Though as mentioned in the first Chrome Developers post you could use a linter to enforce `&` usage.

---

~~~ callout **What do you think?**
Let me know on [this post on Mastodon](https://front-end.social/@elly/109522190096953962).
~~~