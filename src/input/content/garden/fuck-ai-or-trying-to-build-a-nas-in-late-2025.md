---
title: Fuck AI; or, Trying to build a NAS in late 2025
tags:
  - Seedling
  - Notes
created: 2025-12-16
modified: 2025-12-16
date: 2025-12-16
id: 9d4f6fd3f63e303058ce858d82b05715
---
I didn't think I'd still be finding more ways to hate AI and big tech companies but here we are.
I'm not going to say anymore about AI, for that you can check out my [posts tagged AI](/tags/ai/) (mostly bookmarks).

---

So yeah I want to build a NAS. I want to self-host stuff. This is the obvious next step considering my disdain for big tech.

But I'm only interest in this stuff for practicality. I don't want to be endlessly tinkering with it. I'm not into networking or devops. This is similar enough to work related things that I really don't want to spend more time on it than I have to.

I've been down this rabbit hole on and off for months now. Doing *wayyyy* too much research, watching lots of channels, Level1Techs, Wolfgang's Channel, Hardware Haven, NASCompares, etc.

Please help me escape 🫠

## Hardware

Currently I'm using an old gaming laptop as my NAS though it's more so just a home server as it's only got 1TB of storage that is now very very full and obviously being a laptop it's not really easily expandable or upgradable.

Choosing parts has been an unending battle. Mostly thanks to late 2025 AI bubble inflated RAM prices. But also because of my incredible ability for indecisiveness. Over the past few months I have caught myself many many times trapped in thought loops:
1. Should I get interesting NAS specific parts off of AliExpress? I'm impatient, my current NAS is full and I need a solution that's not going to take months to arrive.
2. Do I buy second hand server parts on Gumtree, FB Marketplace, or eBay? I don't know enough to tell if I'm getting a good deal or if I'm being ripped off on parts that were already obsolete a decade ago.
3. Maybe I just get regular consumer parts? But I'll probably end up paying way more to get NAS specific features, like a fast ethernet port or more SATA ports, etc.
4. Go to step 1… 🫩

I did find a cool website, [staticice.com.au](https://staticice.com.au/) — "Finding you the best tech deals from 198 Australian stores". Not something I'd expect to find in the AU market, but I'm glad it does! I do wish the UI was better, only having a text input for filtering down parts is annoying. I've spent a lot of time going through pages and pages of dud results while trying to find the thing I'm looking for. Also they forgot their `<meta name="viewport" content="width=device-width, initial-scale=1">` so it sucks extra hard on mobile.

I finally made my first purchase just the other day, I bought two 8TB Seagate IronWolf hard drives, buh-bye AUD$600 💸 I did do a couple of smart things though. I bought both of the drives in person to avoid them getting damaged in shipping, and I also bought them from different stores so that in the case one store had a bad batch both my drives wouldn't be bad and potentially die at the same time.

I'm looking at building a DDR4 system instead of DDR5 because of the RAM price situation. DDR4 prices are still high but much less absurd than DDR5. Thus as I'm looking at AMD CPUs (or more technically APUs) I'm looking at the AM4 socket, not the AM5 socket. Which feels less than ideal as I'd rather have something more future proofed but oh well. The APU I've been looking at is the AMD Ryzen 5 5600GT as it's the cheapest AMD APU I could get brand new (the 5500GT is only $10 cheaper so I feel like going for the 5600GT is a no-brainer). But honestly I really don't know if it's worth it and as I already mentioned before consumer motherboards suck, I'd rather not have to pay for and use lots of PCIe slots for a NIC or an LSI HBA, etc.

I think the one thing that I have actually decided on is the case that I'm planning on using (*though admittedly I am still having some doubts lol*). I'm probably going to go with the [Fractal Define 7 XL](https://www.fractal-design.com/products/cases/define/define-7-xl/black-solid/) as it has plenty of space for everything, but specifically it's got room to mount up to 18 HDDs plus five SSDs, which is just mind boggling for a regular consumer case these days, I'm so glad it exists so I don't have to shell out for a huge expensive rack mount case.

The other thing I've been struggling with is power supplies, all the ones with good [80 Plus](https://en.wikipedia.org/wiki/80_Plus) ratings are far higher wattage than I need because I won't have a GPU in there. I think the lowest wattage I've seen with at least a platinum rating was 750W or 850W which is just wild, I have a 750W in my gaming PC with an RTX 3080 in it!

Oh and somewhat related, I bought a new router, the GL.iNet Flint 3. I thought about building my own router but I decided against it for sake of simplicity and cost, also the Flint 3 has OpenWRT preinstalled so that's cool. If I do want to build my own in future, I can just turn the Flint 3 into a wireless access point seeing as it's Wi-Fi 7, *which is incredibly overkill for my needs lol*. But yeah it was a great deal so I thought it made more sense than building my own.

## Software

I'm currently using [CasaOS](https://casaos.zimaspace.com/) on the laptop NAS, for the new NAS I'm thinking about maybe running [ZimaOS](https://www.zimaspace.com/zimaos) (I tried installing it on the laptop but it didn't work), but honestly I'll probably just run [TrueNAS](https://www.truenas.com/truenas-community-edition/). [Unraid](https://unraid.net/) is interesting but $\$\$, same goes for [HexOS](https://hexos.com/), which is a nicer UI and simpler UX for TrueNAS, but HexOS is still only about a year old not even 1.0 yet, so I might wait before using it (tho the cheaper early access price is tempting).

Currently the main things I'm running on my server are:
- [Jellyfin](https://jellyfin.org/) (*and Plex just for the PS5 app* 🥲)
- [Audiobookshelf](https://www.audiobookshelf.org/)
- [Home Assistant](https://www.home-assistant.io/) (but haven't really set up anything yet)

But once I've sorted out the new NAS I want to run:
- something for my photos, like [Immich](https://immich.app/)
- something for listening to music so I can hopefully move away from Spotify
- and maybe something for reading manga (I loving buying and reading physical manga but sometimes I'm an impatient bitch who needs to read the next chapter NOW 🤭)

---

Thanks for reading the unraveling of Elly's mind, hope you enjoyed my torment! lol

If you've got any advice or suggestions or whatever hmu via masto or bluesky or email 🫶🏻