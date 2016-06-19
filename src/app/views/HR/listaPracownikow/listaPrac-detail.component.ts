/**
 * Created by k.skowronski on 2016-06-19.
 */
import { Component, View, Input } from 'angular2/core';
///models:
import { Worker } from '../../../models/HR/worker';

@Component({
    selector: 'worker-detail',
    template: `
    <p></p>

     <!-- Modal -->
             <div *ngIf="worker" class="modal fade" id="myModal" role="dialog">
                 <div class="modal-dialog">

                     <!-- Modal content-->
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal">&times;</button>
                             <h4 class="modal-title">Info Pracownik</h4>
                         </div>
                         <div class="modal-body">
                             <p>Dodatkowe informacje.</p>{{worker.prcNumer}}{{worker.prcNazwisko}} {{worker.prcImie}}
                         </div>
                         <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                         </div>
                     </div>

                 </div>
             </div>

  `
})
export class ListaPracDetailComponent {
    @Input()
        worker: Worker;
}
