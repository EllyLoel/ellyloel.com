---
title: YAML is strict
---

If you've never written YAML before, one common issue, and one that I ran into myself making this blog, is using tabs rather than spaces 🤯

This doesn't work:
```YAML
foo:
	bar: baz
```

This does work:
```YAML
foo:
  bar: baz
```

You can barely spot the difference, so it's easy to get stuck on thinking something else is causing an issue.
