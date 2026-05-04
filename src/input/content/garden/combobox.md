---
title: Combobox
tags:
  - Seedling
  - Notes
  - Pattern library
created: 2026-02-18
modified: 2026-02-18
date: 2026-02-18
---

~~~ callout This is a pattern from my [pattern library](/pattern-library/)
~~~

Okay, for starters, [don't](https://sarahmhigley.com/writing/select-your-poison/).

If you must, please remember the first rule of ARIA:

```html
<label for=select>Select</label>
<select id=select>
  <option>Option 1</option>
  …
</select>
```

But also, maybe ignore the first rule of ARIA when it comes to `<datalist>` or `<select multiple>` lol

Sooo, here's these:

## Search

okay, unironically, you should just do this, no javascript required! beautiful!

```html
<search>
  <form method=get action=/search>
    <input
      type=text
      aria-labelledby=search
      enterkeyhint=search
    >
    <button type=submit id=search>Search</button>
  </form>
</search>
```

but if you must:

```html
<search>
  <label for=combobox>Search</label>
  <input
    type=text
    role=combobox
    aria-autocomplete=list
    aria-controls=listbox
    aria-expanded=true
    aria-activedescendant=option-1
    aria-haspopup=listbox
    enterkeyhint=search
  >
  <div
    id=listbox
    role=listbox
    aria-labelledby=listbox-name
    popover
  >
    <button
      id=option-1
      role=option
      aria-selected=true
    >Option 1</button>
    …
  </div>
  <p id=listbox-name hidden>Results</p>
</search>
```

## Multi-select

Go look at all the wonderful examples in Adrian's article [Under-engineered multi-selects](https://adrianroselli.com/2022/05/under-engineered-multi-selects.html).

Something like this should do you fine

```html
<fieldset>
    <legend>Multi-select</legend>
    <input type=checkbox name=… id=option-1 value="Option 1">
    <label for=option-1>Option 1</label>
    …
</fieldset>
```

But if you need to be able to "search" for options then

- if you've got "pills" put them visually outside of the input, making them look like they're inside the input is a recipe for a bad time
