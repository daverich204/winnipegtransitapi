const util = require('util');
const _ = require('lodash');
const request	= require('request');
const VError = require('verror');

let WinnipegTransitAPI = function WinnipegTransitAPI(api_key, server = 'https://api.winnipegtransit.com', timeout = 20000) {
    this.api_key = api_key;
    this.server = server;
    this.timeout = timeout;
};

let headers = {"User-Agent": "WinnipegTransitAPI Javascript API Client"};

WinnipegTransitAPI.prototype.createRequest = function(method, params, callback) {
    let functionName = 'WinnipegTransitAPI.createRequest()';

    if(!this.api_key) {
        const error = new VError('%s must provide api_key and secret to make this API request.', functionName);
        return callback(error);
    }

    if(!_.isObject(params)) {
        let error = new VError('%s second parameter %s must be an object. If no params then pass an empty object {}', functionName, params);
        return callback(error);
    }

    if (!callback || typeof(callback) != 'function') {
        let error = new VError('%s third parameter needs to be a callback function', functionName);
        return callback(error);
    }

    params['api-key'] = this.api_key;
    
    let options = {
        url: this.server + '/v2/' + method + '.json?' + formatParameters(params),
        method: 'GET',
        headers: headers,
        form: params
    };

    let requestDesc = util.format('\n%s request::::\nurl: %s \nmethod: %s \nparams: %s',
        options.method, options.url, method, JSON.stringify(params));

    // console.log("Request:::\n%s", requestDesc);
        
    executeRequest(options, requestDesc, callback);
};

/**
 * This method returns the parameters as key=value pairs separated by & sorted by the key
 * @param  {Object}  params   The object to encode
 * @return {String}           formatted parameters
 */
function formatParameters(params) {
    let sortedKeys = [], formattedParams = '';

    // sort the properties of the parameters
    sortedKeys = _.keys(params).sort();

    // create a string of key value pairs separated by '&' with '=' assignement
    for (i = 0; i < sortedKeys.length; i++){
        if (i != 0) {
            formattedParams += '&';
        }
        formattedParams += sortedKeys[i] + '=' + params[sortedKeys[i]];
    }

    return formattedParams;
}


function executeRequest(options, requestDesc, callback) {
  
  let functionName = 'WinnipegTransitAPI.executeRequest()';
  
  // console.log(functionName); // DEBUG
  
  request(options, function(err, response, data) {
    let error = null,   // default to no errors
      returnObject = data;

    // console.log("Data: %s", util.inspect(data) );
    
      
    if(err) {
      error = new VError(err, '%s failed %s', functionName, requestDesc);
      error.name = err.code;
    }
    else if (response.statusCode < 200 || response.statusCode >= 300) {
      
      // console.log("Response: %s", util.inspect(response)); // DEBUG
      
      error = new VError('%s HTTP status code %s returned from %s', functionName,
          response.statusCode, requestDesc);
      error.name = response.statusCode;
    }
    else if (options.form) {
      try {
          returnObject = JSON.parse(data);
      }
      catch(e) {
          error = new VError(e, 'Could not parse response from server: ' + data);
      }
    }
    // if json request was not able to parse json response into an object
    else if (options.json && !_.isObject(data) ) {
      error = new VError('%s could not parse response from %s\nResponse: %s', functionName, requestDesc, data);
    }

    if (_.has(returnObject, 'error_code')) {
      let errorMessage = mapErrorMessage(returnObject.error_code);

      error = new VError('%s %s returned error code %s, message: "%s"', functionName,
          requestDesc, returnObject.error_code, errorMessage);

      error.name = returnObject.error_code;
    }

    callback(error, returnObject);
  });
}

/**
 * Get's details for a bus stop.
 * @param  {Integer}  id           id of associated stop
 * @return {String}                error message
 */
WinnipegTransitAPI.prototype.getStop = function getStop(callback, id) {
    this.createRequest('stops/' + id, {}, callback);
};

/**
 * Returns a list of stops filtered by parameters.
 * @return {String}                array of stop objects.
 */

WinnipegTransitAPI.prototype.getStops = function getStops(callback, params) {
    this.createRequest('stops', params, callback);
};

WinnipegTransitAPI.prototype.filterStops = function filterStops(callback, term) {
    this.createRequest('stops:' + term, {}, callback);
};


WinnipegTransitAPI.prototype.getStopSchedule = function getStopSchedule(callback, id) {
    this.createRequest(`stops/${id}/schedule`, {}, callback);
};


/**
 * Maps the WinnipegTransitAPI error codes to error message
 * @param  {Integer}  error_code   WinnipegTransitAPI error code
 * @return {String}                error message
 */
function mapErrorMessage(error_code) {
    const errorCodes = {
      503: 'Too many requests (HTTP)'
    };

    if (!errorCodes[error_code]) {
        return 'Unknown WinnipegTransitAPI error code: ' + error_code;
    }

    return errorCodes[error_code];
}

module.exports = WinnipegTransitAPI;