import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ConsentService } from '../../core/services/consent.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-attach-view',
  templateUrl: './attach-view.component.html',
  styleUrls: ['./attach-view.component.scss']
})

export class AttachViewComponent {

  data: any;

  constructor(private consentService: ConsentService,
    private message: NzMessageService) { }

  agInit(params: any) {
    this.data = params.data;
  }

  view() {
    if(this.data.file) {
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = this.data.fileUrl;
      a.download = this.data.file.name;
      a.click();
      a.remove();
    } else {
      this.message.create('warning', `No file attached!`);
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onloadend = (e) => {
      this.consentService.addFileInConsent(file, this.data.id, reader.result);
    };
    reader.onerror = (evt: Event) => {
      this.message.create('error', 'Error reading file');
    }
    return false;
  };
}
