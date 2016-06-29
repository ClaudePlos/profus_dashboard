/**
 * Created by k.skowronski on 2016-06-29.
 */
import { Component, View, Input } from 'angular2/core';
///models:
import { Worker } from '../../../models/HR/worker';
import { AdresDTO } from '../../../models/css/adresDTO';

@Component({
    selector: 'worker-adresy',
    template: `
    <p></p>

     <!-- Modal -->
             <div *ngIf="adresy" class="modal fade" id="myModalAdresy" role="dialog">
                 <div class="modal-dialog">

                     <!-- Modal content-->
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal">&times;</button>
                             <h4 class="modal-title">Info Badania Pracownika</h4>
                         </div>
                         <div class="modal-body">
                             <p>Dodatkowe informacje.</p>{{worker.prcNumer}}{{worker.prcNazwisko}} {{worker.prcImie}}
                         </div>
                         <div>
                             <table class="table table-hover">
                                 <thead>
                                 <tr>
                                     <th>IDr</th>
                                     <th>Miejscowosc</th>
                                     <th>KodPocztowy</th>
                                     <th>T3</th>
                                     <th>T2</th>
                                     <th>T4</th>
                                 </tr>
                                 </thead>
                             <!--(click)="onSelect(worker)" -->
                                 <tbody>
                                 <tr *ngFor="#adres of adresy"  >
                                     <td>{{adres.adrId}}</td>
                                     <td>{{adres.adrMiejscowosc}}</td>
                                     <td>{{adres.adrKodPocztowy}}</td>
                                 </tr>
                                 </tbody>
                             </table>
                         </div>
                         
                         
                         <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                         </div>
                     </div>
                     
                     
                     

                 </div>
             </div>

  `
})
export class ListaPracAdresyComponent {
    @Input()
    adresy:AdresDTO[] = [];

    @Input()
    worker: Worker;
}
