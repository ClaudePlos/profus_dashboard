// home.component.js
import { Component, View } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DataService } from '../../../shared/services/data.service';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';

@Component({
  selector: 'p1',
  providers: [DataService]
})

@View({
  templateUrl: 'src/app/views/inne/p1/p1.component.html',
  directives: [DashboardLayoutComponent, NgIf]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class P1Component {

  constructor(private _router: Router, private _auth: Auth) {
  }
}
