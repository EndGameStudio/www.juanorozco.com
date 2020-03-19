---
title: Hacking WordPress shortened links and Twitter Tools
authors: 
  - "juan-orozco"
type: post
date: 2009-06-01T17:22:04+00:00
url: /2009/06/01/hacking-wordpress-shortened-links-and-twitter-tools/
aktt_tweeted:
  - 1
categories:
  - Uncategorized
tags:
  - hack
  - shortened url
  - twitter
  - Twitter Tools
  - wordpress

---
This shortened URL business really has gotten out of hand.  <a href="http://www.morningtoast.com/" target="_blank" rel="noopener noreferrer">Morning Toast</a> <a href="http://www.morningtoast.com/2009/05/why-tiny-urls-change-how-we-design/" target="_blank" rel="noopener noreferrer">wrote a rant</a> about it a few days ago and it got me thinking about their usefulness.  He also twittered about <a href="http://www.flickr.com/groups/flickrideas/discuss/72157616526758077/" target="_blank" rel="noopener noreferrer">Flickr's own URL shortener</a> as well.  Although Flickr uses a different domain name for these shortened URLs, the link is still obvious about it's context; it is a Flickr image.

I found out about this idea of using "[rev=canonical][1]" within a link.  I'm still trying to understand the whole concept: essentially if a link is created, a shortener service checks if the link owner has already shortened it.  If the owner has indeed shortened it, the shortener service will provide the owner's short URL to the request-or.  That's way to complicated for me, but it would be nice have my own shortened links when I post them to a service like Twitter.

Then it hit me.

I remembered that when you first install WordPress, "pretty" permalinks are deactivated.  Running in this default mode, a post link looks like this: <http://guamaso.com/?p=293>.  It still doesn't have the context of the post itself, but at least now you know that it is related to The Guamaso.  It may not be shorter than <http://bit.ly/1m4Qp>, but the added context is worth it to me.

So how do I implement this "built-in shortener?"  I use Twitter Tools to automatically send a blog post to Twitter.  Why not use Twitter Tools to send the short URL instead of the pretty URL!  I changed a few things on line 466:

**$shorturl = get_bloginfo('url');
  
$shorturl .= "/?p=";
  
$shorturl .= $post_id;**
  
LINE 466: $url = apply\_filters('tweet\_blog\_post\_url', **$shorturl**);

**UPDATE: The items in bold are what I changed / added.**

I sent a a test "twit" to Twitter earlier and it worked (actually, I initially forgot to add the "p" but it's in there now.).  So instead of passing the full permalink that will get shortened by Twitter anyway, it now sends the shorter WordPress URL that starts with my domain name.  Boom.

I don't think a reader can find the post's ID without direct access to the Admin area, so providing this short link for the reader to use is the _key_ to making this method successful.  I'd also like to see more plugins that use these shorter links when posting to Twitter.  It makes way more sense then letting Twitter make the decision.  On the other hand, blogs that post 10+ entries a day may out grow it in a few years... but hey, maybe by then we'll jump to the next social trend anyway.

**UPDATE 2: Scratch everything I just said!  Don't edit Twitter Tools, instead download the <a title="Twitter Friendly Links Plug In" href="http://kovshenin.com/wordpress/plugins/twitter-friendly-links/" target="_blank" rel="noopener noreferrer">Twitter Friendly Links plug-in</a>.  It works with rev=canonical, Twitter Tools, and it will also add the short link on your posts for your readers.  The best part is it will make the link shorter than with the hack I explained above.  Instead of [http://guamaso.com/?p=293][2] it will be [][2][http://guamaso.com/293][3]. Good plugin, give it a try!**

 [1]: http://revcanonical.appspot.com/
 [2]: ../?p=293
 [3]: /293