---
title: Input types a11y
stage: seedling
created: 2023-03-07
modified: 2023-03-13
---

## TL;DR

See here for [a list of every single input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).

### The bad ones:

- `button`
- `date`
- `datetime-local`
- `email`
- `month`
- `number`
- `reset`
- `search`
- `submit`
- `time`
- `week`

### The good ones:

- `checkbox`
- `file`
- `hidden`
- `password`
- `radio`
- `text`

### The I'm not sure ones:

- `color`
- `image`
- `range`
- `tel`
- `url`

If you have any info/knowledge on whether these inputs are good or bad let me know!

## The longer version

### Button like inputs

- `button`
- `reset`
- `submit`

As far as I can tell they're not inherently terrible but you're probably just better off using the `<button>` version of them:

- `<button type="button">`
- `<button type="reset">`
- `<button type="submit">`

But for reset, keep in mind that:

> You should usually avoid including reset buttons in your forms. They're rarely useful, and are instead more likely to frustrate users who click them by mistake (often while trying to click the submit button).
> – [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset)

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
