import fetch from 'node-fetch';
import _ from 'lodash';

class WinnipegTransitAPI {
    #apiKey
    #host

    constructor(apiKey, host = 'https://api.winnipegtransit.com/v3') {
        this.#apiKey = apiKey;
        this.#host = host;
    }

    // Statuses
    async getStatus(params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/statuses/schedule.json?${formatParameters(params)}`);
        return res.json();
    }

    // Service Advisories
    async getServiceAdvisories(params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/service-advisories.json?${formatParameters(params)}`);
        return res.json();
    }

    async getServiceAdvisory(id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/service-advisories/${id}.json?${formatParameters(params)}`);
        return res.json();
    }

    // Location Services
    async findLocation(search_term, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/locations:${search_term}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getLocationsMatching(params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/locations.json?${formatParameters(params)}`);
        return res.json();
    }

    // Stop Services
    async findStops(search_term, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops:${search_term}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getStop(stop_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops/${stop_id}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getStopFeatures(stop_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops/${stop_id}/features.json?${formatParameters(params)}`);
        return res.json();
    }

    async getStopsMatching(params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops.json?${formatParameters(params)}`);
        return res.json();
    }

    async getStopSchedule(stop_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops/${stop_id}/schedule.json?${formatParameters(params)}`);
        return res.json();
    }

    // Route Services
    async findRoutes(search_term, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/routes:${search_term}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getRoute(route_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/routes/${route_id}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getRoutesAtStop(stop_id, params = {}) {
        params['api-key'] = this.#apiKey;
        params['stop'] = stop_id;

        const res = await fetch(`${this.#host}/routes.json?${formatParameters(params)}`);
        return res.json();
    }

    // Street Services
    async findStreet(search_term, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/streets:${search_term}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getStreet(street_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/streets/${street_id}.json?${formatParameters(params)}`);
        return res.json();
    }

    async getMatchingStreets(params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/streets.json?${formatParameters(params)}`);
        return res.json();
    }
}

const formatParameters = (params) => {
    let formattedParams = '';

    // sort the properties of the parameters
    let sortedKeys = _.keys(params).sort() || [];

    // create a string of key value pairs separated by '&' with '=' assignment
    for (let i = 0; i < sortedKeys.length; i++) {
        if (i != 0) {
            formattedParams += '&';
        }
        formattedParams += `${sortedKeys[i]}=${params[sortedKeys[i]]}`
    }

    return formattedParams;
};

export default WinnipegTransitAPI;
