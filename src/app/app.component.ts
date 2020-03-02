import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {GateChange} from "./interfaces/gatechange.interface";
import {SearchService} from "./services/crud.service";
import {Destination} from "./interfaces/destination.interface";
import {Origin} from "./interfaces/origin.interface";

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
    directionsGroupOptions: Observable<GateChange[]>;
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
        if (result) {
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
        gateChanges.forEach((gateChange: GateChange) => {
            if (gateChange.direction == 'Arrival') {

                this.data.getDepartures().subscribe(data => this.addDepartures(data));
            } else {
                this.data.getArrivals().subscribe(data => this.addArrivals(data));
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
                    const direction = this.findDirectionByFlightNumber(data, gateChange);
                    if(direction != ''){
                        gateChange.direction = this.findDirectionByFlightNumber(data, gateChange);
                    }
                    return gateChange
                }
            }
        );
        this.stateGroupOptions = of(this.stateGroup);
    }

    findDirectionByFlightNumber(datas: Origin[] | Destination[], gateChange: GateChange) {
        let result = '';
        datas.forEach((data) => {
            if (gateChange.flightNumber == data.flightNumber) {
                console.log(data.flightNumber + ' ' + gateChange.flightNumber);
                result = data.origin ? data.origin : data.destination;
                return result;
            }
            return '';
        });
        return result;
    }
}
