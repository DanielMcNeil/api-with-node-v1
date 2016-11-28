# content-scraper
Full Stack JavaScript Techdegree Project 7

A Twitter interface that shows my 5 most current tweets, friends, and direct messages.  Also allows me to post a tweet.

JavaScript validated with JSHint

Checked for cross browser compatibility with Firefox, Chrome, and Opera in Ubuntu

**notes**

Twitter used to have a conversation view for direct messages API in v 1.0, but they got rid of it in 1.1.  No you have to choose received messages or sent messages, and there is no good way to request them both and then paste them together.  As best I can tell, Twitter has no good explanation for why they did it this way.

At first I set this app up to deploy to heroku.  When I realized that the project involved simply displaying my Twitter data, and not a login, I decided to delete it.  Giving anyone that visited the site the ability to post tweets as me seems like kind of a bad idea. *lol*

If you have your own token and secret from Twitter, you should be able to clone this project and use them to display your Twitter data.