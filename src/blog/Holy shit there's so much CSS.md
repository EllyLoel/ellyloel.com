---
title: Holy shit there's so much CSS
---

[CSS-for-JS Devs](https://css-for-js.dev/)

---

# Fundamentals

## Pseudo-classes

[Article](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
[Podcast](https://open.spotify.com/episode/4oQ23OfgIMUsrJ4iuV9mG5?si=6115eb8b26ea4532)

## Color

[Article](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
[Podcast 1/2](https://open.spotify.com/episode/5WcgqRbtXg6j6N9GEO96ve?si=164f888ac2ae466f)
[Podcast 2/2](https://open.spotify.com/episode/2wdKgTolHCMXS1YD24WMHH?si=4d9ccfb6b9724522)
[Video](https://player.vimeo.com/video/609861139)

- Use HSL! (or LAB YCH coming soon)
- Use HSL w/ slash notation not HSLA as it's legacy (unless you need IE support)

## Units

### Which unit should I use when?

- For typography, I generally use `rem`, because it has important accessibility benefits. For example, users who set their own default font size in their browser settings only get that font size if we use `rem`.
- For box model properties (`padding`, `border`, `margin`) I usually use `px` as it's more intuitive than `rem`, and there isn't a clear accessibility win if you use `rem`.
- For `color`, I prefer `hsl` as mentioned earlier.
- For `width`/`height` (`inline-size`/`block-size`) it's not as clear cut, as it depends whether you're after an absolute or relative size. - [Absolute](https://drafts.csswg.org/css-values/#absolute-lengths): `px` is generally preferred because everyone understands what it is**\*** unlike `pc`, `Q`, etc. - [Relative](https://drafts.csswg.org/css-values/#relative-lengths): Is tricky as it depends what your element is and you want it to be relative to (content, parent element, viewport, etc.) For example, an element that contains text the `width`, or `inline-size` for non-right-to-left languages, should usually use between 45-90`ch`.
  [Why `em` actually isn't a good choice for UX](https://player.vimeo.com/video/526674427)
  `em` should be reserved for the very rare cases when you actually do want a property to scale directly with the font size.
  > - `1px` isn't actually always one physical pixel on your screen, this is for many reasons one of which being \`devicePixelRatio\`. If your tiny phone with a resolution of 2532×1170 mapped `1px` to one physical pixel you wouldn't be able to read anything!

# **Rendering Logic**

## Logical properties/values

[Article](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

## Border

If you don't specify a `border-color`, it'll inherit the font's `color` by default. This isn't well-known, but it can be very useful in cases where those things should be synchronised!

## Stacking contexts

[Article](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
[Stacking contexts inspector](https://github.com/andreadev-it/stacking-contexts-inspector)

# **Responsive and Behavioural CSS**

## Pixels

The iPhone 12 has a native resolution of 2532×1170 pixels—for context, this is more than most large desktop monitors!
So to account for this mobile devices have a `device pixel ratio`.
The ratio between the physical LED pixels on the device, and the "theoretical" pixels we use in CSS. On my iPhone, this number is 3. This means that a 10px length will actually be 30px long. Each software pixel actually corresponds to 9 hardware pixels:
![](https://courses.joshwcomeau.com/cfj-mats/hardware-to-software-px.png)
(In reality, [pixels aren't tiny squares](http://alvyray.com/Memos/CG/Microsoft/6_pixel.pdf), but for our purposes, we can pretend they are.)

```
.box {
  /*
    This CSS will ACTUALLY draw a
    150×150 box on a modern iPhone.
  */
  width: 50px;
  height: 50px;
  background: pink;
}
```

## Media queries

[Article](https://polypane.app/blog/the-complete-guide-to-css-media-queries/#upcoming-media-query-features)

# Typography and Images

Images are inline elements "magic space"

Variable fonts are the future

# **CSS Grid and Flexbox**

Flex for 1 dimension and Grid for 2 dimensions.

Gap 👏

Subgrid (_soon™️)_

# **Animations**

## Transitions

Reach for `transition` when your CSS will change as a result of some application state or user action.

I use it when I want to smooth out an otherwise harsh transition between values.

## Keyframes

If an animation needs to run immediately when the page loads or the component mounts, it's easiest to use `@keyframes`.

There are some things that only `@keyframes` can do:

- Looped animations

- Multi-step animations

- pauseable animations

## JS libraries

[Motion One](https://motion.dev/)

[Framer Motion](https://www.framer.com/motion/)

[React Spring](https://react-spring.io/)

[GreenSock GSAP](https://greensock.com/gsap/)

# **Little Big Details**

## Increase touch targets

For users using corse pointers (a.k.a mobile users) the minimum recommended size (by Apple) for touch targets is `44px²`. So ideally you should go through and make sure that all interactive elements are at least that size, but a smart and lazy person thought "no, I don't wanna do that!" and decided to come up with a way to calculate it automatically using `calc` and `min`: [https://codepen.io/third774/pen/XWgXZRY](https://codepen.io/third774/pen/XWgXZRY).

# **Generative art with CSS**

[CSS doodle](https://css-doodle.com/)

[Tabbied](https://tabbied.com/select-artwork)

## **Backdrop filters**

## **Layered shadows**

## **No more dull gradients**

## **Scroll snapping**

# **New CSS coming in 2022**

[Article](https://www.smashingmagazine.com/2022/03/new-css-features-2022)

Lots of amazing new CSS features coming this year, specifically:

\- Container queries

- `:has()`

- `@when/@else`

- `accent-color`

- New CSS Color Functions

- Cascade layers

- Subgrid

- `@scroll-timeline`

- Nesting
