---
title: Learning Bazzite and Fedora
author: "Juan Orozco"
type: post
date: 2026-08-23T10:00:00-07:00
categories:
  - linux
---

Obviously, I like working with computers. Ironically, I've never really owned a high end computer. I had a Sony Vaio way back in the day that was supposed to be a great gaming maching but that was before discrete GPUs. This last year, I finally built a [really nice PC for myself](https://pcpartpicker.com/user/exitzaero/saved/VLfm3C).

[![Fractal Design Terra](https://res.cloudinary.com/deo07tbou/image/upload/c_crop,g_auto,h_850,w_1600/juan-orozco-com/2026/fractal-design-terra)](https://pcpartpicker.com/user/exitzaero/saved/VLfm3C)

When I finally finished it over Christmas break, I installed Bazzite and immediately feel like I made a great decision. I used the `deck` version at first but I really wanted a desktop environment so I switched to the full KDE experience and it's been a great ride so far until last night when it auto-updated to [version 44](https://github.com/ublue-os/bazzite/releases/tag/44.20260820). 

I booted up my PC and received the familiar boot screen - which I learned is called the [Plymouth boot splash](https://wiki.gentoo.org/wiki/Plymouth), then my TV flipped to "No Signal". I did some basic troubleshooting - rebooting, turning the TV off/on, checking cables - nothing worked.

I don't use Linux often but I really want to learn. I've been enjoying asking Claude questions about error states or messages - it saves me a ton of time sifting through other codebases. In this case, I know nothing about how a system negotiates displays during OS boot. I assumed this was a weird hardware issue since it worked the night before - I didn't realize that major updates happened silently. I then learned about Fedora's immutability. I mean, I knew about it, but didn't realize its power until this moment.

Claude pointing out the immutability and the commands to rollback the upgrade made it all click. I looked up the repo issues and sure enough, the new upgrade seems to have broken something with external displays, specifically with 4K and HDMI transport. Again, things I don't know much about but understand at a very rudimentary level to know that a rollback should be good. As easy as the update was applies (still miffed that a major upgrade was applied without my consent) the rollback was also easily applied. Is rolling back a MacOS update this easy? Windows? Granted, this is a Fedora thing not a Linux thing - it's still really great ergonomics.

Here's what I ran to rollback:


```sh
sudo rpm-ostree rollback
sudo systemctl reboot
```

Once I confirmed that 44 was indeed the issue, I pinned the version to 43 - luckily I had that rolled back already so it didn't get garbage collected.

```sh
# Pins the second item in the list, which was version 43 for me
sudo ostree admin pin 1
```

{{< alert message="I'm still learning how Generative AI fits in my life and, probably more importantly, how I feel about its increasing demand on our resources." type="info" badge="AI" >}}

I came home from a long day and I really wanted to play some games. Thanks to Claude, I was able to get it working within 15 minutes (after my 30 minutes of checking cables and turning things on/off) and I learned some new things about Linux, Fedora, and Bazzite. I learned more about supporting my hobby and it feels pretty good.