import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class SearchService {
    baseUrl: string = `http://localhost:3000/gate-changes/`;
    baseUrlDepartures: string = `http://localhost:3000/departures`;
    baseUrlArrivals: string = `http://localhost:3000/arrivals`;
    constructor(private _http: HttpClient) { }
    getGateChange(queryString: string) {
        let _URL = this.baseUrl + queryString;
        return this._http.get(_URL);
    }
    getDepartures() {
        let _URL = this.baseUrlDepartures ;
        return this._http.get(_URL);
    }
    getArrivals() {
        let _URL = this.baseUrlArrivals ;
        return this._http.get(_URL);
    }
}
