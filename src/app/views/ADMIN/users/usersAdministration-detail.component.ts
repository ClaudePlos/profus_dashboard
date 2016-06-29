import { Component, View, OnInit, Input } from 'angular2/core';
import { CORE_DIRECTIVES,
    FormBuilder,
    Validators,
    Control,
    ControlGroup,
    FORM_DIRECTIVES } from 'angular2/common';
///models:
import { User } from '../../../models/admin/user';

@Component({
    selector: 'user-detail',
    template: `
    <p></p>

     <!-- Modal  ng-controller="egeria.CtlController as ctlCtrl" -->
             <div *ngIf="user" class="modal fade" id="myModal" role="dialog">
                 <div class="modal-dialog">

                     <!-- Modal content-->
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal">&times;</button>
                             <h4 class="modal-title">Info Uzytkownik</h4>
                         </div>
                         <div class="modal-body">
                             <p>Dane uzytkownika.</p>

                           <form>
                             <div class="form-group has-feedback">
                                <input required  ngControl="uzNazwa" type="text" class="form-control" value="{{user.uzNazwa}}" minlength="5" maxlength="50">
                                <span class="glyphicon glyphicon-user form-control-feedback"></span>
                             </div>

                             <div class="form-group has-feedback">
                                <input required ngControl="password" type="password" class="form-control" placeholder="Nowe haslo" minlength="6" maxlength="20">
                                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                             </div>
                             
                             <div class="form-group">
                                <label>Czy uzytkownik aktywny?
                                <input required ngControl="czyAktywny" type="checkbox" ></label>
                             </div>
                             

                              <div class="col-xs-4">
                                  <button  (click)="submitForm()" [disabled]="!form.valid" type="submit" class="btn btn-primary btn-block btn-flat">Rejestruj</button>
                              </div>
                              
                              
                            </form>


                         </div>
                         <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                         </div>
                     </div>

                 </div>
             </div>

  `
})

export class UsersAdministrationDetailComponent {
    form: ControlGroup;
    uzNazwa: Control;
    password: Control;
    czyAktywny: Control;

    constructor( private _formBuilder: FormBuilder) {
        this.uzNazwa = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required]));
        this.czyAktywny = new Control("", Validators.compose([Validators.required]));

        this.form = _formBuilder.group({
            uzNazwa: this.uzNazwa,
            password: this.password,
            czyAktywny: this.czyAktywny
        });
    }

    @Input()
        user: User;


    submitForm() {
        console.log("To ja " + JSON.stringify(this.form.value));

        /*this._dataService.signupUser(this.form.value)
            .subscribe((response) => {
                // login user
                this._auth.login(response);
                // and then we redirect the user to the home
                this._router.navigate(['\Home']);
            });*/
    }

}
