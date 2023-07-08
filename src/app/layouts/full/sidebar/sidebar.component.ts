import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  Country:any="India"
  constructor(public navService: NavService,private route:Router) {}
  superAdmin:boolean=true
  ngOnInit(): void {
    this.checkLogin()
    }

    navigate(page:any){
      this.route.navigate([page])
    }

    checkLogin(){
      var userDetails = sessionStorage.getItem("UserDetails")
      if (userDetails == undefined || userDetails == null){
        sessionStorage.clear()
        this.route.navigate(['authentication/login'])
      }
    }

    logout(){
      sessionStorage.clear()
      this.route.navigate(['authentication/login'])
    }
}
