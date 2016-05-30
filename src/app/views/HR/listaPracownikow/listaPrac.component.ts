// listaPrac.component.js
import { Component, View, OnInit } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
import { Worker } from '../../../models/HR/worker';
import { HrService } from '../../../services/HR/hr.service';
import { List } from 'immutable';

@Component({
  selector: 'listaPrac',
  providers: [HrService]
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
  
  constructor(private _router: Router, private _hrService: HrService, private _auth: Auth) {
  }
  
  getWorkers() {
    //this.selectedHero = undefined;
     /* this._hrService
        .getWorkers()
        .then(workers => this.workers = workers)
        .catch(error => this.error = error); // TODO: Display error message*/
        
         this._hrService.getWorkers()
        .subscribe(
             data => this.workers = data,
             error => alert(error),
             () => console.log('Finished')
         );


  }
  
  ngOnInit() {
    this.getWorkers();
  }
  
}
