import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./components/angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";


describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
            imports: [BrowserModule, AppRoutingModule, FormsModule, NoopAnimationsModule, AngularMaterialModule, ReactiveFormsModule, HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
