---
title: Speedify Node
---

## Steps

### Prepared Raspberry PI

Using the Raspberry Pi Imager, I used the 64-bit Rasbpian Lite image. I changed the host name, login/password, and the preset wifi to log in to. I decided to have it log into the main wifi, although, I changed this later.

Once the Pi was booted, I logged in via SSH and started realizing that I should have set up the wifi differently. I hadn't thought ahead of time how I would use the device. Should I connect to the device via wifi or via ethernet? Once I got it all working, I decided that, for the near term, connecting to its wifi would be easier for anyone that wanted to use it.

I hooked up an ethernet cable, reconnected via SSH using the new ethernet IP, and updated the wifi login details to instead log in to my Verizon hotspot. `sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`

## Install Speedify

Mostly just followed the [Speedify install doc](https://support.speedify.com/article/562-install-speedify-linux).

1. Installed Speedify using curl and install url

- `bash -c "$(curl -sL https://get.speedify.com)"`

2. I logged in to Speedify using speedify_cli tool: `/usr/share/speedify/speedify_cli login {username} {password}` and connected: `/usr/share/speedify/speedify_cli connect`
3. I set up auto connect while I was at it: `/usr/share/speedify/speedify_cli startupconnect on`
4. I [updated speedify conf](https://support.speedify.com/article/566-speedify-linux-wifi) to share connection over built in eth (I'll change this to use wlan1 later):

- By default, device is set to "speed" bonding mode and has wlan set to secondary and eth as "always" which I think is primary.

5. Restarted speedify and speedify shared. `sudo service speedify restart` and `sudo service speedify-sharing restart`. Not sure if I needed to restart speedify but I did it anyway.
6. Connected a second WIFI USB adapter but didn't set it up.
7. Installed USB handler (`usbmuxd`) so I can connect USB modems (like cell phones) - but didn't test it.

## Testing

This is by far one of the easiest Raspberry Pi projects I've done. Everything just worked. It's nice when that happens. The biggest concern is the throughput - it is pretty slow. Also, the lack of UI. Speed mode isn't great when Starlink just drops so I like to switch to Redundant when I'm on a zoom call but, without a UI, I'm unable to do that.

## Todos:

- Create a web service that I can monitor, basically a http service that mimics the Speedify app
  - Create a script that runs gets info from the Speedify CLI tool
  - Create a script that runs specific CLI commands for speedify (like changing mode to "redundant" or changing the priority of an adapter)
  - Create a web service that displays, polls, and executes speedify information

## Future upgrades

- RPi 4 with 4Gb ram (the USB 3 ports would be nice) with Dual NIC and POE
  - Or a cheap tiny i3 machine that can handle higher throughput (RPi is limited to 100's of megabits because of some encryption package)
- WIFI radio with antenna connections (would like to connect to the external antennas for better campground reception)
