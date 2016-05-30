// login.component.js
import { Component, View, ViewEncapsulation } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate  } from 'angular2/router';
import { CORE_DIRECTIVES,
    FormBuilder,
    Validators,
    Control,
    ControlGroup,
    FORM_DIRECTIVES } from 'angular2/common';
import { DataService } from '../../shared/services/data.service';
import { Auth } from '../auth/auth';
import { checkAuth } from '../auth/check_auth';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../../common/headers';

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
    form: ControlGroup
    username: Control
    password: Control

    constructor(private _router: Router, private _dataService: DataService, private _auth: Auth, private _formBuilder: FormBuilder, public _http: Http) {
        this.username = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required]));

        this.form = _formBuilder.group({
            username: this.username,
            password: this.password,
        });
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
          this._router.navigate(['\Home']);//this._router.parent.navigateByUrl('/home');
        },
        error => {
          console.log("Error ks123: " + error.text());
          alert(error.text());
          console.log(error.text());
        }
      );
  }
    
}
