# winnipegtransitapi

An unofficial javascript wrapper for Winnipeg Transit's Open Data Web Service.

Contains some common functions for pulling data from the public API provided by Winnipeg Transit.

## Documentation

See the official [`Winnipeg Transit API docs`](https://api.winnipegtransit.com/) for more details.

## Installation

Install the package with:

```sh
npm install --save winnipegtransitapi
# or
yarn add winnipegtransitapi
```

## Configuration

The package needs to be configured with your Winnipeg Transit API key, which is
available on your home screen when you log into your [Winnipeg Transit API Account](https://api.winnipegtransit.com/). 

Create a new instance of the client with your API key. 

```js
import WinnipegTransitAPI from 'winnipegtransitapi'
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');
```

Optionally, you can pass a different API version as the second parameter in this constructor

```js
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE', 'https://api.winnipegtransit.com/v2')
```

The default URL is [v3]('https://api.winnipegtransit.com/v3') of the API

### Usage

You can use ES modules and `async`/`await`:

```js
import WinnipegTransitAPI from 'winnipegtransitapi';
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');

const stop_details = await client.getStop(10064);
// print out stop details
console.log("stop_details => ", stop_details);
```


Or, you can use this with `promises` like this:

```js
import WinnipegTransitAPI from 'winnipegtransitapi';
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');

client.getStop(10064).then((stop_details) => {
    // do something with json response object.
    console.log("stop_details => ", stop_details);
});
```
## General Services

### To check schedule status: 

You can get an overall status message for the schedule service with

```js
const status = await client.getStatus();
```

### To get Service Advisories:

You can load all current service advisories like this:

```js
const service_advisories = await client.getServiceAdvisories();
// or
const some_params = { priority: 2, limit: 3 }
const service_advisories = await client.getServiceAdvisories(some_params);
```

For a full list of params check out the official Winnipeg Transit [API docs](https://api.winnipegtransit.com/home/api/v3/services/service-advisories)

#### To get details for a particular service advisory:

```js 
const service_advisory = await client.getServiceAdvisory(advisory_id);
```

## Stop Services

### To search for a stop:

You can search for a stop using `.findStops()`, providing a search term like this:

```js
const search_results = await client.findStops('search_term');
// or provide additional params  
const search_results = await client.findStops('search_term', other_params);
```

This will perform a wildcard stop search given the search term, and any additional parameters can
be found on the official [api docs](https://api.winnipegtransit.com/home/api/v3/services/stops)

You will get back an array of stop objects matching your query.

### To get stop details: 

You can use `.getStop()` to get back information about a single stop like this:

```js
// pass in a 5 digit stop id.
const stop_details = await client.getStop(stop_id);
// or provide additional params  
const stop_details = await client.getStop(stop_id, other_params);
```

### To get stop features:

You can use `.getStopFeatures()` to get back features for a particular stop.

```js
// pass in a 5 digit stop id.
const stop_features = await client.getStopFeatures(stop_id);
// or provide additional params  
const stop_features = await client.getStopFeatures(stop_id, other_params);
```

This is what the [api docs](https://api.winnipegtransit.com/home/api/v3/services/stops) refer to as an
identity query. Some example additional parameters are `{ usage: 'long' }`

### Get stops near a location and more:

You can use `.getStopsMatching()` to return an array of stops using a `filter` query. 

It can be used to return stops near a location, but it can also be used to return stops matching any number of criteria. 

```js
// get stops near a location 
const nearby_stops = await client.getStopsMatching({ lat: 49.86954995, lon: -97.13714044, distance: 250 });

// get stops for a particular route 
const route_stops = await client.getStopsMatching({ route: 16 });

// get stops on a street
const stops_on_street = await client.getStopsMatching({ street: 2717 });
```

### To get the schedule for a particular stop:

You can use `getStopSchedule()` to get the schedule for a stop. 

```js
// return a immediate schedule 
const stop_schedule = await client.getStopSchedule(stop_id);

// pass some additional params 
const other_params = { start: '06:00:00', end : '08:00:00'}
const stop_schedule = await client.getStopSchedule(stop_id, other_params);

// get the stop schedule for a particular route
const route_schedule = await client.getStopSchedule(stop_id, { route: 16 });
```

## Route Services

### To search for a route:

Use `.findRoutes()`, providing a search term like this:

```js
const search_results = await client.findRoutes('search_term');
// or provide additional params  
const search_results = await client.findRoutes('search_term', other_params);
```


### To get route details:

You can use `.getRoute()` to get back information about a single route like this:

```js
// pass in a route ID.
const route_details = await client.getRoute(11);
// or provide additional params  
const route_details = await client.getRoute(route_id, other_params);
```

### To get routes at a particular stop:

You can use `getRoutesAtStop(stop_id)` to return a list of routes that visit that stop:

```js
// pass in a 5 digit stop id.
const routes_through_stop = await client.getRoutesAtStop(stop_id);
```

## Street Services 

### To search for a street:

You can use `.findStreet()` to find streets given a search term:

```js 
const streets = await client.findStreet('main street');
// or, with additional params
const streets = await client.findStreet('main street', { leg: e });
```

### To get details for a particular street:

Use the `.getStreet` function for this:

```js
const street_data = await client.getStreet(street_id);
// or with additional params 
const street_data = await client.getStreet(street_id, additional_params);
```

### To get streets that match given criteria: 

Use the `getMatchingStreets()` function like this:

```js
const street_params = { name: 'Main', leg: 'N' };
const streets = await client.getMatchingStreets(street_params);
```

See the official API docs for parameters that can be passed in here.

## Other Functions 

I'll be adding other functionality here as needed.