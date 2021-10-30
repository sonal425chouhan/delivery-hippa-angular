import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Consent } from '../models/consent.model';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  deleteConsent: any = new Subject<number>();
  editConsent: any = new Subject<any>();
  addFile: any = new Subject<any>();

  constructor() { }

  fetchConsents() {
    const consentJson: any = localStorage.getItem('consents');
    return this.setConsentInactive(consentJson ? JSON.parse(consentJson) : []);
  }

  setConsentInactive(consentsList: Consent[]) {
    consentsList.map((consent: Consent) => {
      if(new Date(consent.expireDate) < new Date())
        consent.status = 'Inactive';
    });
    return consentsList;
  }

  removeConsent(rowIndex: number) {
    this.deleteConsent.next(rowIndex);
  }

  updateConsent(consent: Consent) {
    this.editConsent.next(consent);
  }

  addFileInConsent(file: any, id: number, fileUrl: any) {
    this.addFile.next({file, id, fileUrl});
  }

  convertDate(inputFormat: Date) {
   const date = new Date(inputFormat);
   return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
  }

  setConsentInLocalStorage(updatedConsents: Consent[]) {
    localStorage.setItem('consents', JSON.stringify(updatedConsents));
  }
}
