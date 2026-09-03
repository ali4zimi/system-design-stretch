'use strict';

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
// Total requests: 11
// 1. index.html
// 2. styles.css
// 3. script.js
//
// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
// Only the artists.json file changed, and not the script.js file. This separation
// makes it easier to update the data without having to change the code that renders it. 
//
// Step 7: paste the console error the broken artists.json produced.
// script.js:9 Error fetching artists: SyntaxError: Unexpected non-whitespace character after JSON at position 787 (line 38 column 2)

//
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.
const artist = {
  name: "John Doe",
  genre: "Rock",
  total: "15:45"
};
const artistString = JSON.stringify(artist);
console.log(artistString);
const parsedArtist = JSON.parse(artistString);
console.log(parsedArtist.name);
//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.
// The client is the browser, which requests the artists.json file from the server. 
// The server responds with the JSON data containing the list of artists, which the 
// client then uses to render the artist cards on the page.