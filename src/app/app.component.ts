import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
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
            .subscribe(result => this.getGateChanges(result));
    }

    private getGateChanges(result: string) {
        if (result) {
            this.data.search(result).subscribe(
                data => this._filterGroup(data)
            );
        } else {
            this.stateGroupOptions = of(null);
        }
    }

    private _filterGroup(response: Object) {
        if (response) {
            let result: GateChange[] = [];
            (response as Array<GateChange>).map(function (gateChange:GateChange) {
                result.push(gateChange)
            });
            this.stateGroupOptions = of(result);
            return result
        }
    }
}
