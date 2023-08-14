import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerF: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  get f() { return this.registerF.controls }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.registerF.invalid) return;

    this.accountService.registerAccount(this.registerF.value).subscribe((res: any) => {
      if (res.status == 200) {
        alert('Sign Up Success');
        this.router.navigate(['/login']);
      } else {
        alert('Email already exists');
      }
    })
  }
}
