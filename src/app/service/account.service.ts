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

  getAccountInStorage(): any {
    let jsonData = sessionStorage.getItem('login');
    return jsonData ? JSON.parse(jsonData) : {};
  }

  checkLogin(data: any) {
    return this.http.post(`${api}/login`, data);
  }

  registerAccount(data: any) {
    return this.http.post(`${api}/register`, data);
  }
}
