---
title: YAML is strict
tags:
  - Seedling
  - Notes
created: 2022-07-06
modified: 2022-09-28
id: e152529df04285a400c438975d15391b
---

If you've never written YAML before, one common issue, and one that I ran into myself making this blog, is using tabs rather than spaces {% emoji "🤯", "Mind blown" %}

{% emoji "❌" %} This doesn't work:

```yaml
foo:
	bar: baz
```

{% emoji "☑️" %} This does work:

```yaml
foo:
  bar: baz
```

You can barely spot the difference, so it's easy to get stuck on thinking something else is causing an issue.
