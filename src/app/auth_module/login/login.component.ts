// login.component.js
import { Component, View, ViewEncapsulation } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate  } from 'angular2/router';
import { CORE_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES } from 'angular2/common';
import { DataService } from '../../shared/services/data.service';
import { Auth } from '../auth/auth';
import { checkAuth } from '../auth/check_auth';
import { Http, Headers, Request, Response, URLSearchParams  } from 'angular2/http';
import { contentHeaders } from '../../common/headers';
import { Observable } from 'rxjs/Observable';
import { NuprUprawnienia } from '../../models/nupr/NuprUprawnienia';

@Component({
    selector: 'login',
    providers: [DataService, Auth],
    directives: [RouterLink],
    templateUrl: 'src/app/auth_module/login/login.component.html',
    styles: [`
      body {
          background: #d2d6de;
      }
  `],
    encapsulation: ViewEncapsulation.None
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return checkAuth(next, previous);
})

export class LoginComponent {
    public form: ControlGroup;
    username: Control;
    password: Control;
    private _request;

    constructor(private _router: Router, private _dataService: DataService, private _auth: Auth, private _formBuilder: FormBuilder, public _http: Http) {
        this.username = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required]));

        this.form = _formBuilder.group({
            username: this.username,
            password: this.password
        });
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


    /*login(event: Event) {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        this._dataService.loginUser(this.form.value)
            .subscribe((response) => {

                this._auth.login(response);
                // and then we redirect the user to the home
                this._router.navigate(['\Home']);
            });

    }*/
    
    login(event : Event) {
    event.preventDefault();
        console.log("test123: " + this.form.value.username);
    let userLogin = JSON.stringify({ uzNazwa:this.form.value.username, uzHaslo:this.form.value.password });
    this._http.post('http://localhost:8080/inapTestRest/rs/login', userLogin, { headers: contentHeaders }) //
      .subscribe(
        response => {
          console.log("To ja ks123: " + response.json().uzNazwa);
          //localStorage.setItem('jwt', response.json().uzNazwa); // response.json().id_token TODO po co to jest
          this._auth.login(response.json());
          this.getUprawnieniaUseraZalogowanego( response.json().uzId ).subscribe((response) => {
                 // console.log( response );
                  let uprawnieniaUseraList: NuprUprawnienia[] =  [];
                  for (var i in response) {
                      let uprawnienie: NuprUprawnienia = new NuprUprawnienia();
                      uprawnienie.uprawnienieDo = response[i].grupaSk;
                      uprawnienie.uzId = response[i].uzId;
                      uprawnienie.skId = response[i].skId;
                      uprawnieniaUseraList.push(uprawnienie);

                      /*this._auth.uprawnieniaUseraList.push(new NuprUprawnienia());
                      this._auth.uprawnieniaUseraList[i].uprawnienieDo = response[i].grupaSk;
                      this._auth.uprawnieniaUseraList[i].uzId = response[i].uzId;
                      this._auth.uprawnieniaUseraList[i].skId = response[i].skId;*/
                     // console.log( uprawnienie.skId );
                  }
              this._auth.dodajUprawnienie( uprawnieniaUseraList );
          });
          this._router.navigate(['\Home']);//this._router.parent.navigateByUrl('/home');
        },
        error => {
          console.log("Error ks123: " + error.text());
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  getUprawnieniaUseraZalogowanego( uzId : number){
      let days = new Date();

      let params: URLSearchParams = new URLSearchParams();
      params.set('userId', uzId.toString() );
      params.set('cnt', days.toString());

      this._request = new Request({
          method: "GET",
          // change url to "./data/data.junk" to generate an error
          url: 'http://localhost:8080/inapTestRest/rs/nupruprawnieniesk/uprawnieniaUsera',
          search: params
      });

      return this._http.request(this._request)
          // modify file data.json to contain invalid JSON to have .json() raise an error
          .map(res => res.json())  // could raise an error if invalid JSON
          .do(data => console.log('server data:', data))  // debug
          .catch(this._serverError);
  }


    
}
