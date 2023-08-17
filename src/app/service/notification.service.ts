import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 1000,
    })
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 1000,
    })
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 1500,
    })
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 1000,
    })
  }

}
