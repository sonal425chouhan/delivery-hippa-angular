import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import { IconDefinition } from '@ant-design/icons-angular';
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

import { PatientConsentListRoutingModule } from './patient-consent-list-routing.module';
import { PatientConsentListComponent } from './patient-consent-list.component';
import { AttachViewComponent } from './attach-view/attach-view.component';
import { EditDeleteComponent } from './edit-delete/edit-delete.component';

registerLocaleData(en);

const icons: IconDefinition[] = [ PlusCircleFill, DeleteFill, EditFill, EyeFill, FileAddFill, DeleteOutline ];

@NgModule({
  declarations: [PatientConsentListComponent, AttachViewComponent, EditDeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    PatientConsentListRoutingModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    NzDatePickerModule,
    NzTableModule,
    NzUploadModule,
    NzToolTipModule,
    NzIconModule.forRoot(icons),
    AgGridModule.withComponents([])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }, NzMessageService]
})
export class PatientConsentListModule { }
