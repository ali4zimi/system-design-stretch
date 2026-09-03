'use strict';

// Lesson 4: HTTP and the Fetch API.
// Recorded observations go in this file as comments. The loader and form
// work happens in stretch-records/script.js, against the server you run
// with json-server.
//
// Step 2: both status codes and the response Content-Type.
// status code: 200
// Content-Type: application/json
//
// Step 3: ok, status, and one Access-Control-Allow header from the Network tab.
// ok: true
// status: 200
// type: cors
//
// Step 4: show that the Promise fulfilled anyway on the wrong path.
// Error loading artists: Unexpected token '<', "<!doctype "... is not valid JSON
//
// Step 5: how did the refused connection differ from the 404?
// Refused connection: Error loading artists: Failed to fetch
// 404: Error loading artists: Not Found
// The 404 means the server is running, but the resource is not found. The refused connection means the server is not running or not reachable.
//
// STRETCH, step 8: the public API's endpoint address, the method, one
// parameter, the response shape you would code against, and one stated limit.
