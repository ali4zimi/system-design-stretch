# Lesson 5: The System Audit

The written audit of your running system. Every claim must be backed by
something you observed in the Network tab, the console, or the server's
terminal output.

## Single point of failure
When the json-server was off, the client app was not working. I believe if we had multiple replicas 
of the same server the client app would still work.

## Latency
I set the throtlling to 3G, and when I refreshed, first the text loading artists appeared, and then the cards
but without images, and then the images loaded.

## Caching
When retryed the above, the image started to appear faster, but when I disabled the cache,
it was slow in each refresh.

## The layers
1. The presentation layer is what is shown, like our page with the cards.
2. The application layer which loads the data from the server 
3. The data in our system is the json server.
4. What is really missing the middle layer is the validation layer.

## One request's full journey
First when visit the website, it load the html file, the html files load the components including the
javascript files. The javascript files runs and request from the server, the server runs and response
back with the data, the javascript parse the data and manipulate html document.

## STRETCH: what a real system would need that json-server skipped
A realy database server
