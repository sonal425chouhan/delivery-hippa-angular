import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { getDate } from 'date-fns';
import { en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { Subscription } from 'rxjs';

import { AttachViewComponent } from './attach-view/attach-view.component';
import { EditDeleteComponent } from './edit-delete/edit-delete.component';
import { ConsentService } from '../core/services/consent.service';
import { Consent } from '../core/models/consent.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-patient-consent-list',
  templateUrl: './patient-consent-list.component.html',
  styleUrls: ['./patient-consent-list.component.scss'],
})
export class PatientConsentListComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  private gridApi: any;
  isModalVisible: boolean = false;
  isConfirmLoading: boolean = false;
  date: any = { signedDate: null, expireDate: null };
  showValidationMessage: string = '';
  toEditConsent: any;
  noRowsTemplate = 'No consent found';

  columnDefs: ColDef[] = [
    { field: 'status', sortable: true, filter: true, cellClass: 'custom-class' },
    { field: 'hippaSigned', sortable: true, filter: true },
    { field: 'hippaExpires', sortable: true, filter: true },
    { field: 'Attach/View', cellRendererFramework: AttachViewComponent },
    { field: 'Edit/Delete', cellRendererFramework: EditDeleteComponent }
  ];
  rowData: Consent[] = [];

  constructor(
    private consentService: ConsentService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.rowData = this.consentService.fetchConsents();
    this.subscribeToDeleteEvent();
    this.subscribeToUpdateEvent();
    this.subscribeToAddFileEvent();
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days today or after today
    differenceInCalendarDays(current, new Date()) < 0;

  subscribeToAddFileEvent() {
    this.subscription.add(this.consentService.addFile.subscribe((res: any) => {
      const index = this.findConsentIndex(res.id);
      this.rowData[index].file = res.file;
      this.rowData[index].fileUrl =  res.fileUrl;
      this.updateConsentsList('File attached successfully.');
    }));
  }

  findConsentIndex(consentId: number) {
    return this.rowData.findIndex((data: Consent) => data.id === consentId);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  subscribeToDeleteEvent() {
    this.subscription.add(this.consentService.deleteConsent.subscribe((id: number) => {
      this.deleteConsent(id);
    }));
  }

  subscribeToUpdateEvent() {
    this.subscription.add(this.consentService.editConsent.subscribe((consentToEdit: Consent) => {
      this.isModalVisible = true;
      this.toEditConsent = consentToEdit;
      this.date = { signedDate: consentToEdit.signedDate, expireDate: consentToEdit.expireDate };
    }));
  }

  deleteConsent(id: number) {
    const index = this.findConsentIndex(id)
    this.rowData.splice(index, 1);
    this.updateConsentsList('Consent deleted successfully.');
  }

  addNewConsent() {
    const signedDate = new Date(this.date.signedDate);
    const expireDate = new Date(this.date.expireDate);
    if(!signedDate || !expireDate) {
      this.showValidationMessage = 'Please fill all the details.';
    } else if(signedDate >= expireDate) {
      this.showValidationMessage = 'Signed date should be smaller than expire date.';
    } else {
      this.isConfirmLoading = true;
      this.toEditConsent ? this.editConsent() : this.addNewRowData();
      this.updateConsentsList(`Consent ${this.toEditConsent ? 'update' : 'added'} successfully.`);
      this.resetData();
    }
  }

  editConsent() {
    const index = this.findConsentIndex(this.toEditConsent.id);
    this.setNewRowData(this.rowData[index], index)
  }

  updateConsentsList(message: string) {
    this.gridApi.setRowData(this.rowData);
    this.consentService.setConsentInLocalStorage(this.rowData);
    this.showMessage(message)
  }

  addNewRowData() {
    this.setNewRowData({}, this.rowData.length)
  }

  setNewRowData(data: any, index: number){
    const consent = {
      'id': data.id || Date.now(),
      'status' : data.status || 'Active',
      'hippaSigned': this.consentService.convertDate(this.date.signedDate),
      'hippaExpires': this.consentService.convertDate(this.date.expireDate),
      'signedDate': this.date.signedDate,
      'expireDate': this.date.expireDate,
      'file': data.file,
      'fileUrl': data.fileUrl
    }
    this.rowData[index] = consent;
  }

  modalAction(event: boolean) {
    this.isModalVisible = event;
    !event && this.resetData();
  }

  showMessage(message: string) {
    this.messageService.create('success', message);
  }

  resetData() {
    this.toEditConsent = null;
    this.showValidationMessage = '';
    this.isConfirmLoading = false;
    this.isModalVisible = false;
    this.date = { signedDate: null, expireDate: null };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
