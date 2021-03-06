// app.component.js
import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig, ComponentInstruction, CanActivate } from 'angular2/router';
import { CustomRouterOutlet } from './shared/directives/custom-router-outlet';
import { checkAuth } from './auth_module/auth/check_auth';
import { LoginComponent } from './auth_module/login/login.component';
import { SignupComponent } from './auth_module/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { P1Component } from './views/inne/p1/p1.component';
import { WnioskiComponent } from './views/HR/wnioski.component';
import { WniosekUrlopowyComponent } from './views/HR/wnioski/wniosekUrlopowy.component';
import { ListaPracComponent } from './views/HR/listaPracownikow/listaPrac.component';
import { UsersAdministrationComponent } from './views/ADMIN/users/usersAdministration.component';

@Component({
    selector: 'app-container',
    template: '<custom-router-outlet></custom-router-outlet>',
    directives: [CustomRouterOutlet],
})
@RouteConfig([
    { path: '/home', as: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/wnioski', as: 'Wnioski', component: WnioskiComponent },
    { path: '/wniosekUrlopowy', as: 'WniosekUrlopowy', component: WniosekUrlopowyComponent },
    { path: '/listaPrac', as: 'ListaPrac', component: ListaPracComponent },
    { path: '/p1', as: 'P1', component: P1Component },
    { path: '/login', as: 'Login', component: LoginComponent },
    { path: '/usersAdministration', as: 'UsersAdministration', component: UsersAdministrationComponent },
    { path: '/signup', as: 'Signup', component: SignupComponent },
    { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {


    constructor() {
    }


}



