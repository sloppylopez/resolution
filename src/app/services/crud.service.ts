import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

    constructor(private http: HttpClient) { }
    getGateChanges(flightNumber:string):Observable<Object> {
        return this.http.get(`http://localhost:3000/gate-changes/${flightNumber}`)
    }
}

