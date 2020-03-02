import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {GateChange} from "./interfaces/gatechange.interface";
import {SearchService} from "./services/crud.service";
import {Destination} from "./interfaces/destination.interface";
import {Origin} from "./interfaces/origin.interface";
import { APP_BASE_HREF } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    stateForm: FormGroup = this._formBuilder.group({
        stateGroup: '',
    });

    stateGroup: GateChange[];
    stateGroupOptions: Observable<GateChange[]>;
    departures: Observable<Destination[]>;
    arrivals: Observable<Origin[]>;

    constructor(private _formBuilder: FormBuilder, private data: SearchService) {
    }

    ngOnInit() {
        this.stateForm.get('stateGroup')!.valueChanges
            .pipe(debounceTime(250))
            .pipe(distinctUntilChanged())
            .subscribe(result => this.getGateChanges(result));
    }

    private getGateChanges(result: string) {
        if (result && result.trim() != '') {
            this.data.getGateChange(result).subscribe(data => this._filterGroup(data));
        } else {
            this.stateGroupOptions = of(null);
        }
    }

    private _filterGroup(data: Object): void {
        if ((data as Array<any>).length > 0) {
            let gateChanges = data as GateChange[];

            if (gateChanges.length > 0) {
                gateChanges = gateChanges.slice(Math.max(gateChanges.length - 5, 0));
                this.stateGroup = gateChanges;
                this.stateGroupOptions = of(gateChanges);
                this.getDirections(gateChanges);
            }
        } else {
            this.stateGroupOptions = of(null);
        }
    }

    private getDirections(gateChanges: Array<GateChange>) {
        let isSubscribedArrival = false;
        let isSubscribedDeparture = false;
        gateChanges.forEach((gateChange: GateChange) => {
            if (gateChange.direction == 'Arrival') {
                if (!isSubscribedArrival) {
                    this.data.getArrivals().subscribe(data => this.addArrivals(data));
                    isSubscribedArrival = true;
                }
            } else {
                if (!isSubscribedDeparture) {
                    this.data.getDepartures().subscribe(data => this.addDepartures(data));
                    isSubscribedDeparture = true;
                }
            }
        });
    }

    private addDepartures(data: Object) {
        if ((data as Array<any>).length > 0) {
            let destinations = data as Destination[];
            if (destinations.length > 0) {
                this.departures = of(destinations);
                this.departures.subscribe(data => this.addDataToGateChange(data))
            }
        }
    }

    private addArrivals(data: Object) {
        if ((data as Array<any>).length > 0) {
            let arrivals = data as Origin[];
            if (arrivals.length > 0) {
                this.arrivals = of(arrivals);
                this.arrivals.subscribe(data => this.addDataToGateChange(data))
            }
        }
    }

    private addDataToGateChange(data: Origin[] | Destination[]) {
        this.stateGroup.forEach(gateChange => {
                if (gateChange) {
                    data.forEach((element) => {
                        if (gateChange.flightNumber == element.flightNumber) {
                            gateChange.landsIn = this.findDirectionByFlightNumber(data, gateChange);
                            let time = this.findTimeByFlightNumber(element, gateChange);
                            gateChange.time = time ? time : gateChange.time;
                        }
                    });
                    return gateChange
                }
            }
        );
        this.stateGroup=this.stateGroup.sort(function(a:GateChange, b:GateChange){
            return Math.round(new Date(a.time).getTime()/1000) - Math.round(new Date(b.time).getTime()/1000)
        });
        this.stateGroupOptions = of(this.stateGroup);
    }

    findDirectionByFlightNumber(data: Origin[] | Destination[], gateChange: GateChange) {
        let result = '';
        if (data.length > 0) {
            data.forEach((element) => {
                if (gateChange.flightNumber == element.flightNumber) {
                    result = element.origin ? element.origin : element.destination;
                }
            });
        }
        return result;
    }

    private findTimeByFlightNumber(element: any, gateChange: GateChange) {
        let result = '';
        if (element) {
            if (gateChange.flightNumber == element.flightNumber) {
                result = element.departureTime ? element.departureTime : element.arrivalTime;
                return result;
            }
            return '';
        }
        return result;
    }
}
