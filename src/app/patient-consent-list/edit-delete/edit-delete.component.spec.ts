import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteComponent } from './edit-delete.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ConsentService } from '../../core/services/consent.service';

describe('EditDeleteComponent', () => {
  let component: EditDeleteComponent;
  let fixture: ComponentFixture<EditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteComponent ],
      providers: [ { provide: NzModalService, useValue: {} }, ConsentService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
