---
title: Input types a11y
tags:
  - Budding
  - Notes
  - Accessibility
created: 2023-03-07
modified: 2025-01-24
id: aec8360bf759684e52ce230aef36c904
date: 2023-03-07
---
## TL;DR

See here for [a list of every single input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).

### The bad ones:

- `date`
- `datetime-local`
- `month`
- `number`
- `reset`
- `search`
- `time`
- `week`

### The good ones:

- `button`
- `checkbox`
- `email`
- `file`
- `hidden`
- `password`
- `radio`
- `range`
- `submit`
- `text`

### The I'm not sure ones:

- `color`
- `image`
- `tel`
- `url`

If you have any info/knowledge on whether these inputs are good or bad let me know!

## The longer version

### Reset

> You should usually avoid including reset buttons in your forms. They're rarely useful, and are instead more likely to frustrate users who click them by mistake (often while trying to click the submit button).

— [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset)

### Dates

- `date`
- `datetime-local`
- `month`
- `time`
- `week`

[Is input type=”date” ready for use in accessible websites? by Graham Armfield](https://www.hassellinclusion.com/blog/input-type-date-ready-for-use/)

[Why GOV.UK Design System doesn't use `input[type="date"]`](https://github.com/alphagov/govuk-design-system-backlog/issues/43#issuecomment-1160139594)

[Maybe You Don’t Need a Date Picker by Adrian Roselli](https://adrianroselli.com/2019/07/maybe-you-dont-need-a-date-picker.html)

If you really do need a date picker:

- [ARIA APG Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
- [ARIA APG Date Picker Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/)
- [Duet Date Picker](https://github.com/duetds/date-picker)
- [Tommy Feldt's inclusive datepicker](https://github.com/fymmot/inclusive-dates)

### Number

{% unfurl "https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/" %}

### Email

{% unfurl "https://github.com/alphagov/govuk-design-system/issues/2187" %}

### Search

{% unfurl "https://adrianroselli.com/2019/07/ignore-typesearch.html" %}

### Button

https://github.com/openui/open-ui/issues/1138#issuecomment-2610399934