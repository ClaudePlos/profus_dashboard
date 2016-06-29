/**
 * Created by k.skowronski on 2016-06-29.
 */
import { Component, View, Input } from 'angular2/core';
///models:
import { Worker } from '../../../models/HR/worker';

@Component({
    selector: 'worker-badania',
    template: `
    <p></p>

     <!-- Modal -->
             <div *ngIf="worker" class="modal fade" id="myModalBadania" role="dialog">
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
                         <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                         </div>
                     </div>

                 </div>
             </div>

  `
})
export class ListaPracBadaniaComponent {
    @Input()
      worker: Worker;
}
