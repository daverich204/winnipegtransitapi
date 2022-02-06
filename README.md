# winnipegtransitapi - javascript wrapper for Winnipeg Transit's Open Data Web Service

This is in development. Feel free to reach out if there's any functionality you would like added to this. 

## Installation

```
npm install winnipegtransitapi
yard add winnipegtransitapi
```

## Documentation

View the API Explorer and some demos [here](https://daverich204.github.io/winnipegtransitapi/).

### Setup

```markdown
import WinnipegTransitAPI from 'winnipegtransitapi';
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');
```
### Async Functions

You can await client functions

```
// in an async function
const res = await client.getStop(10064);
console.log("res => ", res);
```
### Thenable

You can also use .then() to handle your responses.

```markdown
// or then-able, 
client.getStop(10064).then((res) => {
  // do something with res
});
```

## Client Functions 

### - client.findStops('search_term', params)

This returns all stops matching a search term

### - client.getStop(stop_id, params)

Returns information about a stop when given an ID (5 digit stop number)

### - client.getStopsNearby(params)

Takes a set of parameters (eg: distance, lat, lon, x, y ) and returns stops nearby 

### - client.getStopSchedule(stop_id, params) 

Returns a stop schedule.

### - client.findRoutes('search_term', params)

Returns all routes matching a search term

### - client.getRoute(route_id, params)

Returns information about a route given a route id

### - client.getRoutesAtStop(stop_id, params) 

Returns all routes that pass through a stop

### Other Functions 

I'll be adding other functionality here as needed
