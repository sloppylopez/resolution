import * as express from 'express';
import * as cors from 'cors';
import { arrivals } from './arrivals';
import { departures } from './departures';
import { gateChanges } from './gate-changes';

const app = express();

app.use(cors());

app.get('/arrivals', (req, res) => {
    res.json(arrivals);
});

app.get('/departures', (req, res) => {
    res.json(departures);
});

app.get('/gate-changes', (req, res) => {
    res.json(gateChanges);
});

app.get('/gate-changes/:search', (req, res) => {
    const search = req.params.search;

    const filteredGateChanges = gateChanges.filter(gc => {
        return gc.flightNumber.includes(search);
    });

    // Mimic network latency
    setTimeout(() => {
        res.json(filteredGateChanges);
    }, Math.random() * 3000);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
