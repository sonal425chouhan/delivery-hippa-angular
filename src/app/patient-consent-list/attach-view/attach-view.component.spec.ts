import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachViewComponent } from './attach-view.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientModule } from '@angular/common/http';

describe('AttachViewComponent', () => {
  let component: AttachViewComponent;
  let fixture: ComponentFixture<AttachViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NzUploadModule, HttpClientModule ],
      declarations: [ AttachViewComponent ],
      providers: [ NzMessageService ]
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
