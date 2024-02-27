import { Component, OnInit } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import jspdf from "jspdf";
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers:UserSchema[]=[]
  searchKey:string=""
  p: number = 1;

  constructor (private api:ApiService,private toaster:ToastrService){}


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

  deleteUser(id:any){
    this.api.removeUserAPI(id).subscribe(
      (res:any)=>{
        this.toaster.success("User Removed!!")
        this.getAllUsersList()
      }
    )
  }

  generatePDF(){
    let pdf = new jspdf()
    let head =[['EMPID','Username','Email','Status']]
    let body:any =[]
    this.allUsers.forEach((item:any)=>{
      if(item.id !='1'){
        body.push([item.empId, item.name,item.email,item.status])
      }
    })
    pdf.setFontSize(18)
    pdf.text("All User List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow');
    pdf.save('allUserslist.pdf')
  }

  sortById(){
    this.allUsers.sort((user1:any,user2)=>user1.empId.localeCompare(user2.name))
  }

  sortByName(){
    this.allUsers.sort((user1:any,user2)=>user1.name.localeCompare(user2.name))
  }

}
