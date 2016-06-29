// home.component.js
import { Component, View, OnInit } from 'angular2/core';
import { Router, RouterLink, ComponentInstruction, CanActivate } from 'angular2/router';
import { CORE_DIRECTIVES, NgIf } from 'angular2/common';
import { DataService } from '../../../shared/services/data.service';
import { DashboardLayoutComponent } from '../../../dashboard_layout/dashboard_layout.component';
import { checkAuth } from '../../../auth_module/auth/check_auth';
import { Auth } from '../../../auth_module/auth/auth';
//inne
import { UsersAdministrationDetailComponent } from './usersAdministration-detail.component';
//services:
import { CssService } from '../../../services/css/css.service';
///models:
import { User } from '../../../models/admin/user';

@Component({
  selector: 'usersAdministration',
  providers: [DataService,CssService]
})

@View({
  templateUrl: 'src/app/views/ADMIN/users/usersAdministration.component.html',
  directives: [DashboardLayoutComponent, NgIf, UsersAdministrationDetailComponent]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return checkAuth(next, previous);
})

export class UsersAdministrationComponent implements OnInit {
  abstract;
  private users =  [{}];
  private selectedUser : User;

  constructor(private _router: Router, private _auth: Auth, private _cssService: CssService) {

  }



  pobierzUzytkownikow() {
    this._cssService.pobierzUsers().subscribe((response) => {
      for (var i in response) {

        let uz:User = new User();
        uz.uzId = response[i].uzId;
        uz.uzNazwa = response[i].uzNazwa;
        uz.uzHaslo = response[i].uzHaslo;
        uz.uzStanowisko = response[i].uzStanowisko;
        uz.uzAktywny = response[i].uzAktywny;

        uz.uzAktywnyB = true;

        if ( response[i].uzAktywny == 'N' )
          uz.uzAktywnyB = false;


        this.users.push(uz);
      }

    });
  }

  onSelect(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser.uzNazwa);

    $(document).ready(function(){
      $("#myModal").modal();
    });

  }



  ngOnInit() {
    this.selectedUser = new User();
    this.pobierzUzytkownikow();
  }

}


