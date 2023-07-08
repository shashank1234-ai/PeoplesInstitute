import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth.service.service'
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  userName:any="";
  password:any="";
  disableLogin:boolean=false
  constructor(
    private router:Router,
    private authService:AuthServiceService,
    private restapi:RestapiServiceService
  ) {}
  UserNotfound:boolean=false
  login(){

    console.log(this.userName,this.password);
    if(this.userName!='' && this.password!=''){
      this.disableLogin=true
      this.authService.login(this.userName,this.password).then((res:any)=>{
        this.UserNotfound=false
        console.log(res.user.email)
        //get UserDetails based On Email
        this.restapi.getUserDetails(res.user.email).subscribe((resUser:any)=>{
          console.log(JSON.parse(resUser.data))
          sessionStorage.setItem("UserDetails",resUser.data)
          this.disableLogin=false
      this.router.navigate(['oep/dashboard'])
    })

      }).catch((err:any)=>{
        console.log(err)
        this.UserNotfound = true
        this.disableLogin=false
      })
    }
  }


}
