// listaPrac.component.js
import { Component, View } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DataService } from '../../../shared/services/data.service';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth, LoginDataInterface } from '../../../auth_module/auth/auth';
// import { Worker } from '../../../models/HR/worker';

export class Worker {
  id: number;
  name: string;
}

@Component({
  selector: 'listaPrac',
  providers: [DataService]
})

@View({
  templateUrl: 'src/app/views/HR/listaPracownikow/listaPrac.component.html',
  directives: [DashboardLayoutComponent, NgIf]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class ListaPracComponent {
  workers = WORKERS;
  
  constructor(private _router: Router, private _auth: Auth) {
  }
  
}

var WORKERS: Worker[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];