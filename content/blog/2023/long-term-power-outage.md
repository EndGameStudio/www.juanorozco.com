---
title: Long Term Power Outage
author: "Juan Orozco"
type: post
date: 2023-08-23T21:53:00-07:00
categories:
  - Blog
  - Homelab
---

Using a Raspberry Pi as a DNS server is not a good idea. Most computers have an internal clock, or a "Real Time Clock". **Pi's don't.** So, say a natural disaster leads to an extended power outage, the iternal clock will be off and that can cause some fun DNS issues.

"So? Just update the clock," I hear. Well, yea, that's what I ended up doing ... once we got power back after four days. The problem is, though, that when local DNS goes down for the family internet, people are liable to get realy grumpy. _Especially_ after already dealing with no power, no hot water, and no internet.

{{< alert message="There are people that have lost homes and more in the recent fires. I don't mean to compare my silly DNS issues to their pain; this is just something I would like to document with a lighthearted story and I hope everyone affected is safe and sound." type="info" badge="Hrm..." >}}

Local disaster relief efforts located industrial generators that are no powering our small town. Once they turned the grid back on, I was able to reboot all my hardware. That's when I found that all requests to the internet were failing.

## Identifying the problem

The first thing I did was check the logs in the Starlink advanced tab - it reported that it could access the internet. I then checked my router and pinged google, also good. That's when I knew the issue was with Pihole and DNS.

I changed the DNS server on my machine to Google's DNS, `8.8.8.8` and the internet started to work again! I made the change at the router and restarted everything again. At this point, I wasn't sure why the Pi was failing to resolve DNS but to make sure my kids didn't revolt on me, I just went ahead and got things working.

Once that was back up, I could now spend the time to investigate why Pihole was acting up. I've had issues with DNS servers having the wrong clock before and this felt very familiar.

I ssh'd into the Pi and checked its current time by running `date`. The power was cut on the 18th around 4:30 pm pacific time and that's exactly what the Pi was reporting as the current time.

## Fixing the problem

I made sure that timezone was correct by using `raspi-config` and then tried to run an update. `update` failed with an odd message - again, making me feel like the time was the issue. So, I went ahead and overwrote the Pi's time:

```shell
# Turn off ntpupdate first otherwise set-time will fail
sudo timedatectl set-ntp no
sudo timedatectl set-time “2023-08-23 20:15:00”
sudo timedatectl set-ntp yes
```

With this done, I ran update for Raspbian, updated Pihole, and added it back to my computer's DNS server. Et viola, it worked again!

## Conclusion

It's really interesting running into this problem - we don't really get power outages that last more than a few hours now-a-days. If the clock was off by a few hours, it probably would have been fine. Being off by days wreaked a lot of havoc on my home network. My TP-Link Deco's, for example, without DNS, would not load the Deco app. I love my Deco's but that was really frustrating to see "Deco not found".

A Raspberry Pi, especially an old Pi 2, makes for a great DNS widget and since the power grid is mostly robust, the lack of a Real Time Clock isn't always a problem. Still, being able to [quickly fix the time](#fixing-the-problem) or maybe adding one of [these RTC modules](https://learn.adafruit.com/adding-a-real-time-clock-to-raspberry-pi/overview) would prevent this issue in the future.
