import fetch from 'node-fetch';
import _ from 'lodash';

class WinnipegTransitAPI {
    #apiKey
    #host

    constructor(apiKey, host = 'https://api.winnipegtransit.com/v3') {
        this.#apiKey = apiKey;
        this.#host = host;
    }

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

    async getStopSchedule(stop_id, params = {}) {
        params['api-key'] = this.#apiKey;

        const res = await fetch(`${this.#host}/stops/${stop_id}/schedule.json?${formatParameters(params)}`);
        return res.json();
    }
};

const formatParameters = (params) => {
    let sortedKeys = [], formattedParams = '';

    // sort the properties of the parameters
    sortedKeys = _.keys(params).sort();

    // create a string of key value pairs separated by '&' with '=' assignement
    for (let i = 0; i < sortedKeys.length; i++){
        if (i != 0) {
            formattedParams += '&';
        }
        formattedParams += sortedKeys[i] + '=' + params[sortedKeys[i]];
    }

    return formattedParams;
};

export default WinnipegTransitAPI;
