/**
 * Tests the winnipegtransitapi client wrapper.
 */

// Write tests.
import WinnipegTransitAPI from "./index.js";

describe('winnipegtransitapi - api functions', () => {
    const client = new WinnipegTransitAPI('YOUR_API_KEY_HERE');

    describe('status', () => {
        test('getStatus()', async () => {
            const resp = await client.getStatus();
            expect(resp).toBeDefined();
        });
    });

    describe('service advisories', () => {
       test('getServiceAdvisories()', async () => {
           const resp = await client.getServiceAdvisories();
           expect(resp).toBeDefined();
       });

       test('getServiceAdvisory()', async () => {
          const advisories = await client.getServiceAdvisories();

          const an_advisory_id = advisories['service-advisories'][0].key;

          const resp = await client.getServiceAdvisory(an_advisory_id);
          expect(resp).toBeDefined();
       });
    });

    describe('stops', () => {
        test('findStops()', async () => {
            const stops = await client.findStops('osborne');
            expect(stops).toBeDefined();
        });

        test('getStop()', async () => {
           const stop = await client.getStop(10064);
           expect(stop).toBeDefined();
        });

        test('getStopFeatures()', async () => {
            const features = await client.getStopFeatures(10064);
            expect(features).toBeDefined();
        });

        test('getStopsMatching()', async () => {
           const stops = await client.getStopsMatching({ route: 16 });
           expect(stops).toBeDefined();
        });

        test('getStopSchedule()', async () => {
           const schedule = await client.getStopSchedule(10064);
           expect(schedule).toBeDefined();
        });
    });

    describe('routes', () => {
        test('findRoutes()', async () => {
            const routes = await client.findRoutes('osborne');
            expect(routes).toBeDefined();
        });

        test('getRoute()', async () => {
            const route = await client.getRoute(16);
            expect(route).toBeDefined();
        });

        test('getRoutesAtStop()', async () => {
            const stop_routes = await client.getRoutesAtStop(10064);
            expect(stop_routes).toBeDefined();
        });
    });

    describe('streets', () => {
        test('findStreet()', async () => {
            const streets = await client.findStreet('osborne');
            expect(streets).toBeDefined();
        });

        test('getStreet()', async () => {
            const street = await client.getStreet(2716);
            expect(street).toBeDefined();
        });

        test('getMatchingStreets()', async () => {
            const streets = await client.getMatchingStreets({ name: 'portage' });
            expect(streets).toBeDefined();
        });
    });

});