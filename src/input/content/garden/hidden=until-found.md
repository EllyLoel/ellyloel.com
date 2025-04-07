---
title: hidden=until-found
tags:
  - Seedling
  - Notes
  - HTML
  - CSS
  - Accessibility
created: 2025-01-06
modified: 2025-01-13
id: 4e3bf56f3b688854bcbdf8e0a598dbfa
date: 2025-01-06
---
Don't use `[hidden] { display: none }` as it will break `hidden=until-found`.

Instead use `[hidden]:not([hidden="until-found"]) { display: none }` if you must.

> authors are encouraged to make sure that their style sheets don't change the 'display' or 'content-visibility' properties of hidden until found elements

— [HTML Standard § 6.1 The `hidden` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute:~:text=authors%20are%20encouraged%20to%20make%20sure%20that%20their%20style%20sheets%20don%27t%20change%20the%20%27display%27%20or%20%27content%2Dvisibility%27%20properties%20of%20hidden%20until%20found%20elements)

## Update: 13 January 2025

> I guess it doesn’t make much sense for `[hidden]:not([hidden="until-found"])` to ever really be overridden, so reset stylesheets that apply `display: none !important` with that selector seem practical. Still I guess there’s always the possibility that `hidden` gets more values.

— [Nathan Knowler](https://bsky.app/profile/knowler.dev/post/3lfgw6fem3224)

mmm it's an interesting train of thought!

maybe the selector `[hidden=""], [hidden="hidden"]` would be the best for future proofing? it matches `<p hidden>`, `<p hidden="">` and `<p hidden="hidden">` but not `<p hidden="until-found">` or `<p hidden="foo">`.