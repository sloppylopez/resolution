import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {startWith, map} from "rxjs/operators";
import {GateChange} from "./interfaces/group.interface";
import {CrudService} from "./services/crud.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    stateForm: FormGroup = this._formBuilder.group({
        stateGroup: '',
    });

    stateGroups: GateChange[] = [
        {
            'currentGate': 'B3',
            'previousGate': 'H11',
            'flightNumber': 'OR1621', 'direction': 'Departure'
        }, {
            'currentGate': 'F0',
            'previousGate': 'D4',
            'flightNumber': 'OR1402',
            'direction': 'Departure'
        }, {
            'currentGate': 'E2',
            'previousGate': 'A4',
            'flightNumber': 'OR629',
            'direction': 'Arrival'
        }, {
            'currentGate': 'A4',
            'previousGate': 'E19',
            'flightNumber': 'OR1941',
            'direction': 'Arrival'
        }, {'currentGate': 'C27', 'previousGate': 'G1', 'flightNumber': 'OR1566', 'direction': 'Arrival'}];
    stateGroupOptions: Observable<GateChange[]>;
    users$: Object;

    constructor(private _formBuilder: FormBuilder, private data: CrudService) {
    }

    ngOnInit() {
        this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterGroup(value))
            );
    }

    private _filterGroup(value: string): GateChange[] {
        if (value) {
            this.data.getGateChanges(value).subscribe(
                data => this.users$ = data
            );
            return this.stateGroups.filter(group => group.flightNumber.includes(value));
        }

        return this.stateGroups;
    }
}
