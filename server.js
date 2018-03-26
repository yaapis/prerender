#!/usr/bin/env node
let prerender = require('./lib');
let saveToFile = require('./plugins/saveToFile');

let server = prerender({
    logRequests: true
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
// server.use(prerender.removeScriptTags());
server.use(saveToFile);


server.start();
