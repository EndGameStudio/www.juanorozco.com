---
author: Juan Orozco
categories:
- Blog
date: 2023-07-09 04:53:00
draft: true
slug: unlocking-bd-drive-for-4k-movies
title: Unlocking BD Drive for 4K Movies
type: post
---

Prior to getting our RV, I had no desire for 4K movies. Standard HD was amazing to me coming from 480i. Our RV came with a TCL 50 inch 4K TV and coupled with an Apple TV 4K and a pair of Airpods Pro, I quickly became interested.

I was suprised to find out that neither the Playstation 4 Pro nor my LG BP50NB40 Bluray drive could read UHD discs. I assumed that the difference between HD and UHD was software, I guess it's a little more than that. But not much! I found out that, with some firmware updates, my LG drive can be used to read UHD discs.

The MakeMKV forums can be incredibly confusing with heavy jargon and wild text formatting that make it hard to follow. It took me a while to work up the courage to risk bricking my drive but the risk was worth the reward.

I recently started buying more UHD discs, along with the digital copy just in case, with the intent that I would stream my movies locally. Starlink is our internet provider and it isn't always consistent (no complaints here, it's been a life saver overall) with obstructions and signal drops. Not to mention the constant fiddling they do with their Fair Use policy. Hosting my movies locally makes me a better user of Starlink's resources but it also makes for a way better viewing experience. Especially, coupled with Infuse for AppleTV.

## Firmware Update Steps

### Prequisites

- sdf.bin file
- All you need firmware pack
- MakeMKV
- Acceptable drive

I'm not entirely sure what the sdf.bin file does, from what I could understand, it has something to do deciphering discs. It should be automatically downloaded, I think, but it can be downloaded manually via `https://makemkv.com/sdf.bin`.

The firmware pack is linked in [this post](https://forum.makemkv.com/forum/viewtopic.php?f=16&t=19634). There are references to firmware packs and individual files everywhere, but the [Google Drive link](https://drive.google.com/file/d/1HRnbXiM8TkwcAcvqYFR31bbJsEZ0FCdM/view) seems to be the best place for all you need.

Not all drives seem to be friendly to firmware updates. The same post has a good list of drives. My specific drive, LG BP50NB40, requires two steps before it will read UHD discs.

### Building command

1. Find the `makemkvcon` script, on MacOS Ventura, I found it in `/Applications/MakeMKV.app/Contents/MacOS`.
2. Find the drive path by running `/Applications/MakeMKV.app/Contents/MacOS/makemkvcon f -l`

Results for me looked like:

```bash
Found 1 drives(s)

00: /IOBDServices/6A7D2AA8

  HL-DT-ST_BD-RE_BP50NB40_1.03_212005070917_SIK04KB1D1051
```

My drive's path is `/IOBDServices/6A7D2AA8`.

Updating to the first firmware, my command was `/Applications/MakeMKV.app/Contents/MacOS/makemkvcon f -d '/IOBDServices/6A7D2AA8' -f ~/temp/sdf.bin rawflash enc -i ~/temp/HL-DT-ST-BD-RE_BP50NB40-NB50-1.03-NM00800-212005070917.bin`

`/Applications/MakeMKV.app/Contents/MacOS/makemkvcon f -d '/IOBDServices/6A7D2AA8' -f ~/temp/sdf.bin rawflash main -i ~/temp/HL-DT-ST-BD-RE_BP60NB10-1.02-NM00800-212005070935.bin`