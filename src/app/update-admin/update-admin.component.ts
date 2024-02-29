import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  @Output() onAdminChange = new EventEmitter();
  adminDetails:any={}
  editAdminStatus:boolean=false
  profileImage:string="https://png.pngtree.com/png-vector/20230316/ourmid/pngtree-admin-and-customer-service-job-vacancies-vector-png-image_6650726.png"
 

  constructor(private adminAPI:AdminService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails=res
      if(res.profileImage){
        this.profileImage=res.profileImage
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus= ! this.editAdminStatus
  }

  onCancel(){
    this.editAdminStatus=false
  }

  getFile(event:any){
    let file = event.target.files[0]
    let fr= new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.profileImage=event.target.result
    }
  }

  editAdmin(){
    this.adminAPI.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toaster.success("Admin details Updated successfully")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },error:(reason:any)=>{
        this.toaster.warning("Failed to update")
      }
    })
  }

}
