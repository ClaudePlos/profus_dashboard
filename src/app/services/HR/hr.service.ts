import { Injectable } from 'angular2/core';
import { Http, Response, Headers, Request, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../config/config';

import { LoginComponent } from '../../auth_module/login/login.component';
import { contentHeaders } from '../../common/headers';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';

//models:
import { Worker } from '../../models/HR/worker';
import { StanowiskoKosztow } from '../../models/css/stanowiskoKosztow';


@Injectable()
export class HrService {
    
    private mainUrl = 'http://localhost:8080/inapTestRest/rs';  // URL to web api
    private listWorkersUser = '/pracownicy/listPracUzytkownika/';
    
    constructor(private _http: Http, private _config: Config) { }
    
    getWorkers() {
    /*return this._http.get(this.heroesUrl + '/pracownicy')
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);*/
          return this._http.get(this.mainUrl + '/pracownicy')
          .map(res => res.json());
   }
   
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

   private _request;

   getWorkersForSk( sk : StanowiskoKosztow ) {

       let params: URLSearchParams = new URLSearchParams();
       params.set('skId', sk.skId.toString() );
       params.set('skKod', sk.skKod );


       this._request = new Request({
           method: "GET",
           // change url to "./data/data.junk" to generate an error
           url: this.mainUrl + '/pracownicy/listPracDlaSK',
           search: params
       });

       return this._http.request(this._request)
           // modify file data.json to contain invalid JSON to have .json() raise an error
           .map(res => res.json())  // could raise an error if invalid JSON
           .do(data => console.log('server data:', data))  // debug
           .catch(this._serverError);

   }
   
   
   getWorkersForUser( uzId : number ) {
        console.log("test PrcId: " + uzId );
    /*let userLogin = JSON.stringify({ prcId: prcId });
    this._http.post(this.heroesUrl + '/pracownicy/listPracUzytkownika', userLogin, { headers: contentHeaders }) //
      .subscribe(
        response => {
          //console.log("To ja ks123: " + response.json().uzNazwa);
   
          return response.json();
        },
        error => {
          console.log("Error ks123: " + error.text());
          alert(error.text());
          console.log(error.text());
        }
      );*/

       this.listWorkersUser = this.listWorkersUser + uzId;

       this._request = new Request({
           method: "GET",
           // change url to "./data/data.junk" to generate an error
           url: this.mainUrl + this.listWorkersUser
       });

       return this._http.request(this._request)
           // modify file data.json to contain invalid JSON to have .json() raise an error
           .map(res => res.json())  // could raise an error if invalid JSON
           .do(data => console.log('server data:', data))  // debug
           .catch(this._serverError);
  
  }


   /*
  addHero (name: string): Observable<Hero> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }*/
    
    // add new worker
    private post(worker: Worker): Promise<Worker> {
    let headers = new Headers({
        'Content-Type': 'application/json'});

    return this._http
                .post(this.mainUrl, JSON.stringify(worker), {headers: headers})
                .toPromise()
                .then(res => res.json().data)
                .catch(this.handleError);
    }
    
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}