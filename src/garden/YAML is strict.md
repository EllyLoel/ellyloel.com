---
title: YAML is strict
stage: seedling
created: 2022-07-06
modified: 2022-09-28
---

If you've never written YAML before, one common issue, and one that I ran into myself making this blog, is using tabs rather than spaces :exploding_head:

:x: This doesn't work:

```yaml
foo:
	bar: baz
```

:white_check_mark: This does work:

```yaml
foo:
  bar: baz
```

You can barely spot the difference, so it's easy to get stuck on thinking something else is causing an issue.
