import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientConsentListComponent } from './patient-consent-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatientConsentListComponent
  },
  {
    path: '**',
    component: PatientConsentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientConsentListRoutingModule { }
