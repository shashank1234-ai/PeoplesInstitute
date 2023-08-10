import {Component,OnInit} from '@angular/core'
import { RestapiServiceService } from 'src/app/services/restapi.service.service'
@Component({
    selector:'app-verify-post',
    templateUrl:'./verify.post.component.html',
    styleUrls:['./verify.post.component.scss']
})

export class VerifyPostComponent implements OnInit {
    constructor(
        private restApi:RestapiServiceService
    ){

    }
    ELEMENT_DATA:any = [
      ];
    dataSource = this.ELEMENT_DATA;
    displayedColumns: string[] = ['assigned', 'name'];

    loader:boolean=false
    ngOnInit(): void {
        this.getPosts()
    }

    getPosts(){
        let body = {
            'UserId':sessionStorage.getItem('UserDetails')!=undefined?JSON.parse(String(sessionStorage.getItem('UserDetails'))).id:''
        }
        this.loader=true
        this.restApi.getPosts(body).subscribe((res:any)=>{
            this.loader=false
            // console.log(res)
            console.log(JSON.parse(res.data))
            // console.log(JSON.parse(String(res.data)))
            this.dataSource = JSON.parse(res.data)
        })
    }

    openBlog(data:any){
        console.log(data)
    }
}