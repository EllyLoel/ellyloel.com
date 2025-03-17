---
title: Color.js convert Raycast script
tags:
  - Seedling
  - Notes
  - Tools
  - CSS
created: 2025-01-19
modified: 2025-01-19
id: 0373f587ead6c72db59c8fea29e12538
date: 2025-01-19
---
Similar to my [OddContrast Raycast script](/garden/oddcontrast-raycast-script), I built this for myself but again I figured others would find it useful as well. [Color.js convert](https://apps.colorjs.io/convert/) is my preferred color converter and I use Raycast for almost everything so using their [Script Commands](https://github.com/raycast/script-commands) feature for this made sense.

Here's the script:

```sh
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Color.js convert
# @raycast.mode silent
# @raycast.packageName Color.js convert

# Optional parameters:
# @raycast.icon 🎨
# @raycast.argument1 { "type": "text", "placeholder": "Color" }

# Documentation:
# @raycast.description Convert colors using Color.js
# @raycast.author Elly Loel
# @raycast.authorURL https://ellyloel.com

# Encode the color value for URL
encoded_color=$(printf "%s" "$1" | jq -sRr @uri)

# Open the Color.js converter with the encoded color
open "https://apps.colorjs.io/convert/?color=${encoded_color}&precision=4"
```