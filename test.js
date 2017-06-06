/**
 * Tests the winnipegtransitapi client wrapper.
 */
  var WinnipegTransitAPI = require('./index.js');
  var util = require('util');
 
  // Init the client by sending an API key.
  var client = new WinnipegTransitAPI('2h0iEXRIB42f7XBxuodB'); // Decomp. API Key
 
 
 
 
 

  client.getStop(printFn, 50579);
  client.filterStops(printFn, "osborne");

  var printFn = function printFn(err, data) {
    if(err) {
      console.log("ERROR: %s", err);
    } else {
      console.log("DATA: %s", util.inspect(data));
      
    }
     
  };