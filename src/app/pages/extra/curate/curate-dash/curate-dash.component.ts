import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector:'app-curate-dash',
    templateUrl:'./curate-dash.component.html'
})

export class CurateDashComponent implements OnInit {
    
    constructor(
        private router:Router
    ){
    }
    ExamList:any=['Engnineering','Medical','Railways','Banking','CPT','Postal','Medical PG','Others']
    ExamList1:any=[]
    ExamList2:any=[]
    ExamList3:any=[]
    ngOnInit(): void {
        for(let i=0;i<this.ExamList.length;i++){
            if(i%3==0){
                this.ExamList3.push(this.ExamList[i])
            }else if(i%3==1){
                this.ExamList2.push(this.ExamList[i])
            }else if(i%3==2){
                this.ExamList1.push(this.ExamList[i])
            }
        }
        console.log(this.ExamList1,this.ExamList2,this.ExamList3)
    }

    
    navigate(pageName:any){
        this.router.navigate([pageName])
    }

    NavigateToCurate(examName:any){
        console.log(examName)
        sessionStorage.setItem('ExamNameForQs',examName)
        this.router.navigate(['/oep/Questions/:'+examName])

    }
}