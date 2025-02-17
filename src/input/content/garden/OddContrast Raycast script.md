---
title: OddContrast Raycast script
tags:
  - Seedling
  - Notes
  - Tools
  - Accessibility
  - CSS
created: 2025-01-19
modified: 2025-01-19
id: 5c4db3f5c64ebdcf27323e0d3fd0d825
---

I built this for myself but I figure others will likely find it useful too. [OddContrast](https://www.oddcontrast.com/) is my preferred contrast checker and I use Raycast for almost everything so using their [Script Commands](https://github.com/raycast/script-commands) feature for this made sense (an extension might be nicer but, it would also much more complex).

Here's the script:

```sh
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title OddContrast
# @raycast.mode silent
# @raycast.packageName OddContrast

# Optional parameters:
# @raycast.icon 🎨
# @raycast.argument1 { "type": "text", "placeholder": "Foreground color", "optional": false }
# @raycast.argument2 { "type": "text", "placeholder": "Background color", "optional": true }

# Documentation:
# @raycast.description Check contrast ratio between two colors using OddContrast
# @raycast.author Elly Loel
# @raycast.authorURL https://ellyloel.com

# Replace " " with "_", "%" with "~", and "#" with "*" in the color values. https://github.com/oddbird/oddcontrast/blob/71641065fce39c2639e5a34652336cdb74eff2d4/src/lib/utils.ts#L52
foregroundColor=$(echo "$1" | sed 's/ /_/g' | sed 's/%/~/g' | sed 's/#/*/g')

# If a background color is not provided use white.
if [ -z "$2" ]; then
    backgroundColor="white"
else
    backgroundColor=$(echo "$2" | sed 's/ /_/g' | sed 's/%/~/g' | sed 's/#/*/g')
fi

# Construct the OddContrast URL
url="https://www.oddcontrast.com/#oklch__${backgroundColor}__${foregroundColor}"

# Open the URL in the default browser
open "$url"
```
