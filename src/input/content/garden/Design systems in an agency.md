---
title: Design systems in an agency
stage: seedling
tags:
  - Design systems
created: 2022-09-19
modified: 2022-09-23
---

~~~ callout **Multi layered design system**
With different levels of abstraction.
~~~

{% svg "./src/assets/svg/workflow.svg", "The client's brand identity is used to create design tokens which get passed into an unbranded component library to create the basis of their design system." %}

We don't need to build an accordion for the `N`th time. Building the same components over and over again means there are many more opportunities for error. And that's not even to mention the wasted time and effort doing the same thing over and over again. If a component can be built once and then iterated upon and improved over time, every project and client get the best version there can be of those components.

{% unfurl "https://bradfrost.com/blog/post/lets-talk-about-web-components/" %}

Web components are good for agencies for the same reason that they are good for huge companies with many products. There's always going to be lots of different frameworks in use, so being able to use a framework-agnostic tool to handle the presentational aspects of the components and let the framework handle the interactivity aspects.
