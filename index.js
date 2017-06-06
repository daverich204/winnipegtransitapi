var util = require('util'),
    _ = require('lodash'),
    request	= require('request'),
    crypto = require('crypto'),
    VError = require('verror'),
    md5 = require('md5');

var WinnipegTransitAPI = function WinnipegTransitAPI(api_key, server, timeout) {
    this.api_key = api_key;
    
    this.server = server || 'https://api.winnipegtransit.com';

    this.timeout = timeout || 20000;
};

var headers = {"User-Agent": "WinnipegTransitAPI Javascript API Client"};

WinnipegTransitAPI.prototype.createRequest = function(method, params, callback)
{
    var functionName = 'WinnipegTransitAPI.createRequest()',
        self = this;

    if(!this.api_key)
    {
        var error = new VError('%s must provide api_key and secret to make this API request.', functionName);
        return callback(error);
    }

    if(!_.isObject(params))
    {
        var error = new VError('%s second parameter %s must be an object. If no params then pass an empty object {}', functionName, params);
        return callback(error);
    }

    if (!callback || typeof(callback) != 'function')
    {
        var error = new VError('%s third parameter needs to be a callback function', functionName);
        return callback(error);
    }

    params['api-key'] = this.api_key;
    
    var options = {
        url: this.server + '/v2/' + method + '.json?' + formatParameters(params),
        method: 'POST',
        headers: headers,
        form: params
    };

    var requestDesc = util.format('\n%s request::::\nurl: %s \nmethod: %s \nparams: %s',
        options.method, options.url, method, JSON.stringify(params));

    // console.log("Request:::\n%s", requestDesc);
        
    executeRequest(options, requestDesc, callback);
};

/**
 * This method returns the parameters as key=value pairs separated by & sorted by the key
 * @param  {Object}  params   The object to encode
 * @return {String}           formatted parameters
 */
function formatParameters(params)
{
    var sortedKeys = [],
        formattedParams = '';

    // sort the properties of the parameters
    sortedKeys = _.keys(params).sort();

    // create a string of key value pairs separated by '&' with '=' assignement
    for (i = 0; i < sortedKeys.length; i++)
    {
        if (i != 0) {
            formattedParams += '&';
        }
        formattedParams += sortedKeys[i] + '=' + params[sortedKeys[i]];
    }

    return formattedParams;
}


function executeRequest(options, requestDesc, callback) {
  
  var functionName = 'WinnipegTransitAPI.executeRequest()';
  
  // console.log(functionName); // DEBUG
  
  request(options, function(err, response, data) {
    var error = null,   // default to no errors
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
      var errorMessage = mapErrorMessage(returnObject.error_code);

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

/**
 * Maps the WinnipegTransitAPI error codes to error message
 * @param  {Integer}  error_code   WinnipegTransitAPI error code
 * @return {String}                error message
 */
function mapErrorMessage(error_code) {
    var errorCodes = {
      503: 'Too many requests (HTTP)'
    };

    if (!errorCodes[error_code])
    {
        return 'Unknown WinnipegTransitAPI error code: ' + error_code;
    }

    return( errorCodes[error_code] );
}

module.exports = WinnipegTransitAPI;