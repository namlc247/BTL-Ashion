import { Component, OnInit } from '@angular/core';
import { NotificationService } from './service/notification.service';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private notificationSrv: NotificationService,
    private accSrv: AccountService,
  ) { }

  ngOnInit(): void {
    let account = this.accSrv.getAccountInStorage();
    if (account) this.notificationSrv.showInfo(`Hello ${account.name}`, 'Login Success!');
  }

}
