---
title: Using Dropbox for versioning
authors: 
  - "juan-orozco"
type: post
date: 2012-08-08T02:37:39+00:00
url: /2012/08/07/using-dropbox-for-versioning/
categories:
  - post
tags:
  - dropbox
  - revision
  - software development
  - source control
  - versioning

---
Prior to my current position, I had no clue what SVN or GIT were.&#160; I finally got a very thorough explanation of SVN and versioning in general a few weeks ago.&#160; Like all concepts I learn, I started to examine areas that might benefit from not just SVN but the concept of versions and revisions.

The obvious place was my personal pool of ongoing projects.&#160; But I know how I work with new things.&#160; I get all “ooo shiny” and want to find a place for it even thought all it is is shiny – nothing more. With this in mind, I thought about where my projects currently reside: Dropbox.&#160; 

### Versioning

Dropbox has revisions!&#160; Duh!&#160; Using the methods explained to me but considering the size and use of my files, Dropbox is the perfect platform. I have accumulated about 4 gigs of extra space on my free account over the years; It already creates periodic revisions (<strike>I don’t believe it’s with every save, but that’s ok for my use</strike> it is with “every change”); and it syncs to all my other computers including my test server. 

The test server, by the way, has symbolic links set up so when I save the file locally, it is immediately pushed to my web server for testing. No FTP required!

### Research is for weenies.

I didn’t think to search if anyone already thought about this until recently.&#160; Maybe I’m not searching with the right query, but I couldn't find much except “Hey! Here’s an idea!” which is less than helpful.

I did start reading up on the concepts behind SVN and GIT which helped a little.&#160; Wiki: saving the day again.

[Update] I just found this link. I don’t have a problem with rollbacks but most of my projects are small.

<http://stackoverflow.com/questions/8238399/dropbox-as-a-programmers-source-control>

[/Update]

### SVN THIS!

I have a web application that I am updating: DailyKittehEmail App.&#160; The current stable version is 1.0 while the current development version I call RC. So the folder structure looks like this:

WEBAPPS > DailyKittehEmail&#160; > 1.0, RC

The versioned folders are locked – I don’t edit those anymore. If I need to make an update, I copy the whole folder to an RC folder and work from there – this is how I branch or fork a version.&#160; When I’m ready to commit that release, I give it a version based on the edits made and change the folder name to the new version number. The new folder structure will look like this:

WEBAPPS > DailyKittehEmail > 1.0, 1.1

During development, though, as I finish editing for the night, I update my release notes with that nights version number.&#160; Discipline, lads and laddettes, discipline. The folder would stay as RC but I keep the log going.

So, the cycle continues.&#160; If I need to update 1.1, I copy it into a new RC folder and squash bugs or add new cool stuff.&#160; The best part is that all this is done within Dropbox so it’s backed up and versioned.

### Meh. What about source control.

The one thing it needs is source control.&#160; Because it’s just myself, I don’t really run into me overwriting my own changes because I didn’t properly check something out/in.&#160; But to make this a valid solution, it would obviously need some way of controlling edits and commits.

Another necessity would be to create a copy with every save.&#160; The source control can back up the file before overwriting it to a specified folder in the Dropbox space.

Ok, it’s not very robust on it’s own, but it’s free and it’s robust _enough_ for a one-dev gig.&#160; With some proper planning, it can probably work with multiples but why when SVN is pretty cheap.

[Update]

Also, apparently this helps with source control

<http://tortoisehg.bitbucket.org/>

[/Update]