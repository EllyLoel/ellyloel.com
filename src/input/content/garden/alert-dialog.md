---
title: Alert dialog
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

use `.showModal()` on this:

```html
<dialog
  role=alertdialog
  aria-labelledby=name
  aria-describedby=desc
>
  <h2 id=name>Are you sure?</h2>
  <p id=desc>Watch out buddy, you're gonna lose all your stuff if you leave.</p>
  <form method=dialog>
    <button autofocus>No, stay and keep my stuff.</button>
    <button>Yes, leave and lose my stuff.</button>
  </form>
</dialog>
```
