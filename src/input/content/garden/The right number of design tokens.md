---
title: The right number of design tokens
tags:
  - Seedling
  - Notes
  - Design Tokens
created: 2022-09-21
modified: 2022-09-21
id: ebaee0e2c9150eddf197cc57e913fe74
date: 2022-09-21
---
Something I've been thinking about for a while now is, how many design tokens is the right amount?

I often see roughly around 10 for each colour, whether they're named 1-10 counting one-by-one or 100-1000 like font weights. So for example, in the font weight style of naming you might have `purple-300` and `teal-900`, etc.

Sometimes these are then also given semantic names, maybe something like `primary-bg` and `neutral-text`, or maybe something like `error-border` and `success-text`.

I've also found that often I'm just wanting a specific colour that the semantic name mightn't actually fit or make sense in the circumstance. For example, I might be wanting to use the `accent-border` colour but for something that isn't a border.