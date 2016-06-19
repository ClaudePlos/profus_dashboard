// listaPrac.component.js
import { Component, View, OnInit } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
import { List } from 'immutable';
//services:
import { HrService } from '../../../services/HR/hr.service';
import { CssService } from '../../../services/css/css.service';
///models:
import { Worker } from '../../../models/HR/worker';
import { NuprUprawnienia } from '../../../models/nupr/NuprUprawnienia';
import { StanowiskoKosztow } from '../../../models/css/stanowiskoKosztow';

@Component({
  selector: 'listaPrac',
  providers: [HrService,CssService]
})

@View({
  templateUrl: 'src/app/views/HR/listaPracownikow/listaPrac.component.html',
  directives: [DashboardLayoutComponent, NgIf]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class ListaPracComponent implements OnInit {
  public workers =  [{}];//Worker[];
  error: any;
  public loginData: LoginDataInterface
  public uprawnieniaUseraList: NuprUprawnienia[] =  [];
  public skUseraList: StanowiskoKosztow[] =  [];
  public selectedSK: StanowiskoKosztow;
  

  constructor(private _router: Router, private _hrService: HrService, private _cssService: CssService, private _auth: Auth) {
     this.loginData = this._auth.loginData;
     this.uprawnieniaUseraList = this._auth.uprawnieniaUseraList;
  }

  getSK(){

      for (var i in this.uprawnieniaUseraList) {

          if ( this.uprawnieniaUseraList[i].uprawnienieDo == NuprUprawnienia.HR_KADROWE  ){
             this._cssService.pobierzSKdlaUsera( this.uprawnieniaUseraList[i].uzId, NuprUprawnienia.HR_KADROWE ).subscribe((response) => {
                 for (var i in response) {

                     let sk:StanowiskoKosztow = new StanowiskoKosztow();
                     sk.skId = response[i].skId;
                     sk.skKod = response[i].skKod;
                     this.skUseraList.push(sk);
                 }

             });

             return;
          }
      }
  }


    onChangeSK(selectedSkKod: String)
    {
        this.selectedSK = this.skUseraList.find( (obj:StanowiskoKosztow) => obj.skKod === selectedSkKod )
        console.log(this.selectedSK.skKod);
        this.getWorkersForSK(this.selectedSK);
    }

    getWorkersForSK( sk: StanowiskoKosztow ) {

          this._hrService.getWorkersForSk( sk )
            .subscribe((response) => {

            this.workers.length = 0

            for (var i in response) {
                let worker = new Worker();
                worker.prcId = response[i].prcId;
                worker.prcNazwisko = response[i].prcNazwisko;
                worker.prcImie = response[i].prcImie;

                this.workers.push(worker);
                // and then we redirect the user to the home
                //this._router.navigate(['\Home']);

            }



            });



  }

  ngOnInit() {
    this.getSK();
  }

}
