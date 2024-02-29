import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

SERVER_URL:string="https://employee-management-server-angular-2.onrender.com"

  constructor(private http:HttpClient) { }

  getAdminDetails(){
    return this.http.get(`${this.SERVER_URL}/users/1`)
  }

  updateAdmin(admin:any){
    return this.http.put(`${this.SERVER_URL}/users/1`,admin)
  }

  isLoggedIn(){
   return !! sessionStorage.getItem("adminDetails")
  }
}


