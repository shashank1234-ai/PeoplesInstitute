import {Component,OnInit} from '@angular/core'
import { Router } from '@angular/router'
@Component({
    selector:'app-post-dash',
    templateUrl:'./post.dash.component.html',
    styleUrls:['./post.dash.component.scss']
})

export class PostDashboardComponent implements OnInit{
    loader:boolean=false
    ngOnInit(): void {
        
    }
    constructor(
        private router:Router
    ){

    }

    OpenPostCreate(){
        this.router.navigate(['/oep/createPost'])
    }

    verifyPosts(){
        this.router.navigate(['oep/verifyPost'])
    }
}