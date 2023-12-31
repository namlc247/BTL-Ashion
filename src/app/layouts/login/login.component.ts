import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginF: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notificationSrv: NotificationService
  ) { }

  get f() { return this.loginF.controls }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginF.invalid) return;

    this.accountService.checkLogin(this.loginF.value).subscribe((res: any) => {
      if (res.status == 200) {

        let jsonData = JSON.stringify(res.result);
        sessionStorage.setItem('login', jsonData);

        location.assign('/')
      } else {
        this.notificationSrv.showError('Email or Password incorrect', 'Error!');
      }
    })
  }
}
