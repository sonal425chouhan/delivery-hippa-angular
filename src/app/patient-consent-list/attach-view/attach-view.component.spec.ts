import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachViewComponent } from './attach-view.component';

describe('AttachViewComponent', () => {
  let component: AttachViewComponent;
  let fixture: ComponentFixture<AttachViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
