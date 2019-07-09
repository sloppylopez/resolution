/**
 * Challenge 3
 *
 * The goal of this challenge is to collect arrival and departure flight records and placing them into 4 buckets:
 *
 * - Early Arrivals
 * - Late Arrivals
 * - Early Departures
 * - Late Departures
 *
 * The flight data can be collected from the backend, which you can start up with "npm run start:api"
 *
 * You can get flight information by making a REST call to http://localhost:3000/arrivals and http://localhost:3000/departures
 * You can get flight actual landing/take-off times through WebSockets from ws://localhost:3000/flightUpdates
 *
 * Accumulate the flight data until the websocket disconnects. Then group the flights into the buckets above,
 * this can be determined by the delta between the departureTime vs takeOffTime and arrivalTime vs landingTime.
 * For example; a flight with a takeOffTime that is before the departureTime is counted as an early departure.
 *
 * How many flights are there in each bucket?
 *
 * The output could look something like this:
 *
 * {
 *     lateArrivals: 10,
 *     earlyArrivals: 15,
 *     lateDepartures: 20,
 *     earlyDepartures: 25,
 * }
 *
 * (Tip: the use of RxJS might be of big help but is not obligated)
 */

import { ArrivalFlight, ArrivalFlightUpdate } from '../api/arrivals';
import { DepartureFlight, DepartureFlightUpdate } from '../api/departures';

type Flight = ArrivalFlight | DepartureFlight;
type FlightUpdate = ArrivalFlightUpdate | DepartureFlightUpdate;
