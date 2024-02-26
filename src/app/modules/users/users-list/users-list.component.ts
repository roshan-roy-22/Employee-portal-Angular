import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers:UserSchema[]=[]

  constructor (private api:ApiService){}

  ngOnInit():void{
    this.getAllUsersList();
  }

  getAllUsersList(){
    this.api.getAllUsersAPI().subscribe({
      next:(result:any)=>{
        this.allUsers=result
        console.log(this.allUsers);
      },
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }

}
