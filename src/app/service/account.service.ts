import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

const api = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  checkLogin(data: any) {
    this.http.post(`${api}/account`, data);
  }
}
