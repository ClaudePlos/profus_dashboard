// home.component.js
import { Component, View, OnInit } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DataService } from '../shared/services/data.service';
import { DashboardLayoutComponent } from '../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../auth_module/auth/auth';
//services:
import { CssService } from '../services/css/css.service';
///models:
import { PozycjaListyZadanDTO } from '../models/client/PozycjaListyZadanDTO';

@Component({
  selector: 'home',
  providers: [DataService, CssService]
})

@View({
  templateUrl: 'src/app/home/home.component.html',
  directives: [DashboardLayoutComponent, NgIf]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class HomeComponent implements OnInit {
    public zadaniaList: PozycjaListyZadanDTO[] =  [];
    public loginData: LoginDataInterface;

  constructor(private _router: Router, private _auth: Auth, private _cssService: CssService) {
      this.loginData = this._auth.loginData;
  }

    listaZadanUzytkownika(){
        this._cssService.pobierzZadaniaUzytkownika( this.loginData.uzId ).subscribe((response) => {
            for (var i in response) {

                let zadanie:PozycjaListyZadanDTO = new PozycjaListyZadanDTO();
                zadanie.tytulZadania = response[i].tytulZadania;
                zadanie.iloscZadan = response[i].iloscZadan;
                zadanie.kodTypuZadania = response[i].kodTypuZadania;
                this.zadaniaList.push(zadanie);
            }

        });
    }


    ngOnInit() {
        this.listaZadanUzytkownika();
    }

}
