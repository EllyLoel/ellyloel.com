---
layout: bookmark
title: Epoch Semantic Versioning
tags:
  - Bookmarks
  - Development
  - Communication
created: '2025-02-09T22:22:05.793Z'
modified: '2025-02-09T22:27:24.114Z'
link: https://antfu.me/posts/epoch-semver
id: 968029889
note: >-
  I don’t think I’m fully onboard with the idea of epoch semantic versioning but
  I do definitely agree that semantic versioning as it currently exists has
  issues, as highlighted in the article.
excerpt: >-
  Proposal for an extended Semantic Versioning called Epoch SemVer to provide
  more granular versioning information to users.
image: https://antfu.me/og/epoch-semver.png
highlights:
  - >-
    humans perceive numbers on a logarithmic scale. We tend to see v2.0 to v3.0
    as a huge, groundbreaking change, while v125.0 to v126.0 seems a lot more
    trivial, even though both indicate incompatible API changes in SemVer. This
    perception can make maintainers hesitant to bump the major version for minor
    breaking changes, leading to the accumulation of many breaking changes in a
    single major release, making upgrades harder for users. Conversely, with
    something like v125.0, it becomes difficult to convey the significance of a
    major change, as the jump to v126.0 appears minor.
  - >-
    I am a strong believer in the principle of progressiveness. Rather than
    making a giant leap to a significantly higher stage all at once,
    progressiveness allows users to adopt changes gradually at their own pace.
    It provides opportunities to pause and assess, making it easier to
    understand the impact of each change.



    Progressive as Stairs - a screenshot of my talk The Progressive Path


    I believe we should apply the same principle to versioning. Instead of
    treating a major version as a massive overhaul, we can break it down into
    smaller, more manageable updates. For example, rather than releasing v2.0.0
    with 10 breaking changes from v1.x, we could distribute these changes across
    several smaller major releases. This way, we might release v2.0 with 2
    breaking changes, followed by v3.0 with 1 breaking change, and so on. This
    approach makes it easier for users to adopt changes gradually and reduces
    the risk of overwhelming them with too many changes at once.



    Progressive on Breaking Changes - a screenshot of my talk The Progressive
    Path
---