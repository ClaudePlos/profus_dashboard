/**
 * Created by k.skowronski on 2016-06-08.
 */
import { Injectable } from 'angular2/core';
import { Http, Response, Headers, Request, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../config/config';
import { Worker } from '../../models/HR/worker';
import { LoginComponent } from '../../auth_module/login/login.component';
import { contentHeaders } from '../../common/headers';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';


@Injectable()
export class CssService {

    private mainUrl = 'http://localhost:8080/inapTestRest/rs';  // URL to web api
    private listWorkersUser = '/pracownicy/listPracUzytkownika/';

    private _request;

    constructor(private _http: Http, private _config: Config) { }

    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
            // if you're using lite-server, use the following line
            // instead of the line above:
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }





    pobierzSKdlaUsera( uzId: number, uprawnienie: string ) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', uzId.toString() );
        params.set('uprawnienie', uprawnienie);


        this._request = new Request({
            method: "GET",
            // change url to "./data/data.junk" to generate an error
            url: this.mainUrl + '/nupruprawnieniesk/skUseraDlaUprawnienia/',
            search: params
        });

        return this._http.request(this._request)
            // modify file data.json to contain invalid JSON to have .json() raise an error
            .map(res => res.json())  // could raise an error if invalid JSON
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError);

    }

    pobierzUsers() {
        this._request = new Request({
            method: "GET",
            // change url to "./data/data.junk" to generate an error
            url: this.mainUrl + '/users'
        });

        return this._http.request(this._request)
            // modify file data.json to contain invalid JSON to have .json() raise an error
            .map(res => res.json())  // could raise an error if invalid JSON
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError);
    }

    pobierzZadaniaUzytkownika( uzId : number ) {

        let params: URLSearchParams = new URLSearchParams();
        params.set('uzId', uzId.toString() );

        this._request = new Request({
            method: "GET",
            // change url to "./data/data.junk" to generate an error
            url: this.mainUrl + '/nupruprawnieniesk/listZadaniaUzytkownika',
            search: params
        });

        return this._http.request(this._request)
            // modify file data.json to contain invalid JSON to have .json() raise an error
            .map(res => res.json())  // could raise an error if invalid JSON
            .do(data => console.log('server data:', data))  // debug
            .catch(this._serverError);
    }


    




}