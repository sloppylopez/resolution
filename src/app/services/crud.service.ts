import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class SearchService {
    baseUrl: string = `http://localhost:3000/gate-changes/`;
    constructor(private _http: HttpClient) { }
    search(queryString: string) {
        let _URL = this.baseUrl + queryString;
        return this._http.get(_URL);
    }
}
