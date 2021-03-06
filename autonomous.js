var arDrone = require('ar-drone'); // imp
var http    = require('http');

var pngStream = arDrone.createClient().getPngStream();
var client = arDrone.createClient(); //imp
client.disableEmergency();

//****************************************************
* This part of code helps streaming the video to the
* browser.
****************************************************//
console.log('Connecting png stream ...');
var pngStream = client.getPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');

  //.....................................................
  * The is a simple code that runs the drone 
  * automously. Other commands like client.fornt, back
  * can be used to make the drone go specific path.
  ******************************************************//
  client.takeoff();

  client
    .after(5000, function() {
      this.clockwise(0.5);
    })
     .after(5000, function() {
       this.stop();
     })
     .after(5000, function() {
       this.clockwise(0.5);
    })
    .after(5000, function() {
      this.stop();
    })
      this.land();
    });
//});
