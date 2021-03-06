// listaPrac.component.js
import { Component, View, OnInit } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
//inne
import { ListaPracDetailComponent } from './listaPrac-detail.component';
import { ListaPracBadaniaComponent } from './listaPrac-badania.component';
import { ListaPracAdresyComponent } from './listaPrac-adresy.component';
//services:
import { HrService } from '../../../services/HR/hr.service';
import { CssService } from '../../../services/css/css.service';
///models:
import { Worker } from '../../../models/HR/worker';
import { NuprUprawnienia } from '../../../models/nupr/NuprUprawnienia';
import { StanowiskoKosztow } from '../../../models/css/stanowiskoKosztow';
import { AdresDTO } from '../../../models/css/adresDTO';

@Component({
  selector: 'listaPrac',
  providers: [HrService,CssService]
})

@View({
  templateUrl: 'src/app/views/HR/listaPracownikow/listaPrac.component.html',
  directives: [DashboardLayoutComponent, NgIf, ListaPracDetailComponent, ListaPracBadaniaComponent, ListaPracAdresyComponent ]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class ListaPracComponent implements OnInit {
  public workers =  [{}];//Worker[];
  error: any;
  public loginData: LoginDataInterface;
  public uprawnieniaUseraList: NuprUprawnienia[] =  [];
  public skUseraList: StanowiskoKosztow[] =  [];
  public selectedSK: StanowiskoKosztow;
  private selectedWorker: Worker;
  public selPracAdresy: AdresDTO[] = [];

  constructor(private _router: Router, private _hrService: HrService, private _cssService: CssService, private _auth: Auth) {
     this.loginData = this._auth.loginData;
     this.uprawnieniaUseraList = this._auth.uprawnieniaUseraList;
  }

  getSK(){

      for (var i in this.uprawnieniaUseraList) {

          if ( this.uprawnieniaUseraList[i].uprawnienieDo == NuprUprawnienia.HR_KADROWE  ){
             this._cssService.pobierzSKdlaUsera( this.uprawnieniaUseraList[i].uzId, NuprUprawnienia.HR_KADROWE ).subscribe((response) => {

                 let skAll:StanowiskoKosztow = new StanowiskoKosztow();
                 skAll.skId = 0;
                 skAll.skKod = "WSZYSCY";
                 this.skUseraList.push(skAll);

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

            this.workers.length = 0;

            for (var i in response) {
                let worker = new Worker();
                worker.prcId = response[i].prcId;
                worker.prcNumer = response[i].prcNumer;
                worker.prcNazwisko = response[i].prcNazwisko;
                worker.prcImie = response[i].prcImie;

                this.workers.push(worker);
                // and then we redirect the user to the home
                //this._router.navigate(['\Home']);

            }

            });
  }

  getAdresyPracownika( prcId : number ){

      /*let selPracAd: AdresDTO = new AdresDTO();
      selPracAd.adrId = 12;
      selPracAd.adrMiejscowosc = "asdasd";
      this.selPracAdresy.push(selPracAd);*/

      this._hrService.pobierzAdresyPracownika( this.selectedWorker.prcId ).subscribe((response) => {

          this.selPracAdresy.length = 0;

          for (var i in response) {

              let adr: AdresDTO = new AdresDTO();
              adr.adrId = response[i].adrId;
              adr.adrPrcId = response[i].adrPrcId;
              adr.adrKodPocztowy = response[i].adrKodPocztowy;
              adr.adrTyp = response[i].adrTyp;
              adr.adrMiejscowosc = response[i].adrMiejscowosc;
              adr.adrUlica = response[i].adrUlica;
              this.selPracAdresy.push(adr);
          }



      });



  }

  onSelect(worker: Worker) {
      this.selectedWorker = worker;
      console.log(this.selectedWorker.prcNazwisko);

      $(document).ready(function(){
          $("#myModal").modal();
      });

      //let index = this.workers.indexOf(worker);
      //this.workers.splice(index,1); //splice usuwa a push dodaje

     // modal.alert();
  }



    onSelectDodInfo(worker: Worker){
        this.selectedWorker = worker;
        console.log('Info:' + this.selectedWorker.prcNazwisko);

        $(document).ready(function(){
            $("#myModal").modal();
        });

    }

    onSelectAdresy(worker: Worker){
        this.selectedWorker = worker;
        console.log('Adresy:' + this.selectedWorker.prcNazwisko);

        this.getAdresyPracownika( this.selectedWorker.prcId );

        $(document).ready(function(){
            $("#myModalAdresy").modal();
        });


    }

    onSelectBadania(worker: Worker){
        this.selectedWorker = worker;
        console.log('Badania:' + this.selectedWorker.prcNazwisko);

        $(document).ready(function(){
            $("#myModalBadania").modal();
        });
    }


    ngOnInit() {

    this.selectedWorker = new Worker();
    this.getSK();
  }

}
