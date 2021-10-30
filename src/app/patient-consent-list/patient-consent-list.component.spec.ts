import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PatientConsentListComponent } from './patient-consent-list.component';
import { AttachViewComponent } from './attach-view/attach-view.component';
import { EditDeleteComponent } from './edit-delete/edit-delete.component';

import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ConsentService } from '../core/services/consent.service';
import { Consent } from '../core/models/consent.model';
import { IconDefinition } from '@ant-design/icons-angular';
import { FormsModule } from '@angular/forms';
import { PlusCircleFill, DeleteFill, EditFill, EyeFill,FileAddFill, DeleteOutline } from '@ant-design/icons-angular/icons';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { AgGridModule } from 'ag-grid-angular';
const icons: IconDefinition[] = [ PlusCircleFill, DeleteFill, EditFill, EyeFill, FileAddFill, DeleteOutline ];

describe('PatientConsentListComponent', () => {
  let component: PatientConsentListComponent;
  let fixture: ComponentFixture<PatientConsentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        NzButtonModule,
        NzModalModule,
        NzIconModule,
        NzDatePickerModule,
        NzTableModule,
        NzUploadModule,
        NzToolTipModule,
        NzIconModule.forRoot(icons),
        AgGridModule.withComponents([]),
      ],
      declarations: [ PatientConsentListComponent ],
      providers: [
        { provide: ConsentService },
        { provide: NZ_I18N, useValue: en_US },
        { provide: NZ_ICONS, useValue: icons },
        NzMessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConsentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('PATIENT CONSENTS');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have zero consent`, () => {
    expect(component.rowData.length).toEqual(0);
  });

  it(`should create consent`, fakeAsync(() => {
    const addConsentButton = fixture.nativeElement.querySelector('#addConsent');
    addConsentButton.click();
    fixture.detectChanges();
    const consentModal = fixture.nativeElement.nextElementSibling;
    const date = new Date();
    component.date.signedDate = date
    // setting tomorrow's date
    const tomorrow  = new Date((new Date()).setDate(date.getDate() + 1))
    fixture.detectChanges();
    consentModal.querySelector('#saveConsent').click();
    expect(component.rowData.length).toEqual(1);
  }));
});
