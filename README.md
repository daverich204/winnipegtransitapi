# winnipegtransitapi - a NodeJS wrapper for Winnipeg Transit's Open Data Web Service

This Wrapper is in the development stage and this page will be updated soon with some documentation for the package. 

## Installation

```
npm install winnipegtransitapi
yard add winnipegtransitapi
```

## Documentation

View the API Explorer and some demos [here](https://daverich204.github.io/winnipegtransitapi/).

```markdown
import WinnipegTransitAPI from 'winnipegtransitapi';
const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');

// in an async function
const res = await client.getStop(10064);
console.log("res => ", res);

// or then-able, 
client.getStop(10064).then((res) => {
  // do something with res
});
```

## Client Functions 

### findStops('search_term')

This returns all stops matching a search term

### getStop(stop_id)

Returns information about a stop when given an ID (5 digit stop number)

### getStopSchedule(stop_id) 

Returns a stop schedule.

### findRoutes('search_term')

Returns all routes matching a search term

### getRoute(route_id)

Returns information about a route given a route id

### getRoutesAtStop(stop_id) 

Returns all routes that pass through a stop

### Other Functions 

I'll be adding other functionality here as needed
