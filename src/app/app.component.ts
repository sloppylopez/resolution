import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {GateChange} from "./interfaces/group.interface";
import {SearchService} from "./services/crud.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


    stateForm: FormGroup = this._formBuilder.group({
        stateGroup: '',
    });

    stateGroupOptions: Observable<GateChange[]>;

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
            this.data.search(result).subscribe(data => this._filterGroup(data));
        }
    }

    private _filterGroup(response: Object): void {
        if((response as Array<any>).length > 0) {
            let gateChanges = response as Array<GateChange>;
            if (gateChanges.length > 0) {
                this.stateGroupOptions = of(gateChanges);
            }
        } else {
            this.stateGroupOptions = of(null);
        }
    }
}
