---
title: Google fonts hate her, speed up your website with this one weird trick!
stage: budding
created: 2022-12-30
modified: 2023-01-10
---

![Parody of an old school clickbait web ad with the text “GOOGLE FONTS HATE HER! Speed up your website With this one weird trick! LEARN THE TRUTH NOW”](./src/assets/img/one-weird-trick.png)

Jokes aside, I have spent a fair amount of time and effort figuring out how to improve my font situation.

Like many others, my "font setup" consisted of these three lines:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0;0,9..144,100..900,0..100,1;1,9..144,100..900,0..100,0;1,9..144,100..900,0..100,1&family=Nanum+Pen+Script&family=Noto+Color+Emoji&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
/>
```

After far too long, I finally thought I ought to spend a bit more time and effort to turn my "font setup" into an actual font setup.

## What I did

I went to the URL from the link tag above:

```txt
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0;0,9..144,100..900,0..100,1;1,9..144,100..900,0..100,0;1,9..144,100..900,0..100,1&family=Nanum+Pen+Script&family=Noto+Color+Emoji&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap
```

It's a CSS file with a bunch of `@font-face` declarations, here's an example:

```css
/* latin */
@font-face {
	font-family: "Fraunces";
	font-style: normal;
	font-weight: 100 900;
	font-display: swap;
	src: url(https://fonts.gstatic.com/s/fraunces/v26/6NUV8FyLNQOQZAnv9ZwIlOkuy91B.woff2)
		format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}
```

I then went to the `src` URL to download the font:

```txt
https://fonts.gstatic.com/s/fraunces/v26/6NUT8FyLNQOQZAnv9ZwNpOskzP9Ddt0.woff2
```

As you can see, there is a comment above the `@font-face` rule, that tells us that this is a subsetted version of the font file that only includes the Latin Unicode characters. For my site, I only needed the `latin` subset, if you need more you should also get the other subsets you need.

I then copied the `@font-face` block over to my `fonts.css` file and updated the `src` URL to the location I'm storing the font.

```css
@font-face {
	font-family: "Fraunces";
	font-display: swap;
	font-weight: 100 900;
	src: url("/assets/fonts/Fraunces--latin_basic.woff2") format("woff2");
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}
```

Then I repeated that for the rest of the fonts I'm using:

- Fraunces Italic
- Work Sans
- Work Sans Italic
- JetBrains Mono
- JetBrains Mono Italic
- Noto Color Emoji

## The other one

Except for Nanum Pen Script, because I only use 5 characters (`<`, `e`, `/`, `y`, `>`) from it's Google Fonts' subset was still going to be far too big for my needs.

So I had to pull out the big guns:

- glyphhanger
- woff2
- fonttools
- fontforge

~~~ callout To be continued…
~~~
