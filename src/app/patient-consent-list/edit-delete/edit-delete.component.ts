import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { ConsentService } from '../../core/services/consent.service';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.scss']
})
export class EditDeleteComponent {

  modalRef?: NzModalRef;
  params: any;

  constructor(private modal: NzModalService,
    private consentService: ConsentService) { }

  agInit(params: any) {
    this.params = params;
  }

  showConfirm(): void {
    this.modalRef = this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this consent?',
      nzOnOk: () =>
        this.consentService.removeConsent(this.params.data.id)
    });
  }

  edit() {
    this.consentService.updateConsent(this.params.data);
  }

}
