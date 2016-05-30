import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../config/config';
import { Worker } from '../../models/HR/worker';

@Injectable()
export class HrService {
    
    private heroesUrl = 'http://localhost:8080/inapTestRest/rs';  // URL to web api
    
    constructor(private _http: Http, private _config: Config) { }
    
    getWorkers() {
    /*return this._http.get(this.heroesUrl + '/pracownicy')
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);*/
          return this._http.get(this.heroesUrl + '/pracownicy')
          .map(res => res.json());
  }
    
    // add new worker
    private post(worker: Worker): Promise<Worker> {
    let headers = new Headers({
        'Content-Type': 'application/json'});

    return this._http
                .post(this.heroesUrl, JSON.stringify(worker), {headers: headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
    }
    
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}