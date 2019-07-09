import * as WebSocket from 'ws';
import * as express from 'express';
import { Application } from 'express-ws';

import { ArrivalFlightUpdate, updatedArrivals } from './arrivals';
import { DepartureFlightUpdate, updatedDepartures } from './departures';

type FlightUpdate = ArrivalFlightUpdate | DepartureFlightUpdate;

const flightUpdates: FlightUpdate[] = [...updatedArrivals, ...updatedDepartures];

export const websocketify = (app: Application) => {
    app.ws('/flightUpdates', (ws: WebSocket, req: express.Request) => {
        console.log('Websocket client connected');

        console.log('Sending flight updates...');
        flightUpdates.forEach(update => ws.send(JSON.stringify(update)));

        console.log('Done');
        ws.close();

        ws.onclose = () => {
            console.log('Websocket client disconnected');
        };
    });
};
