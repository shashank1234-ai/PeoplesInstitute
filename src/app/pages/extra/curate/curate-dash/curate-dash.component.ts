import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
@Component({
    selector:'app-curate-dash',
    templateUrl:'./curate-dash.component.html',
    styleUrls:['./curate-dash.component.scss']
})

export class CurateDashComponent implements OnInit {
    
    constructor(
        private router:Router,
        private restApi:RestapiServiceService
    ){
    }
    
    ngOnInit(): void {
       this.getExamList()
    }

    
    navigate(pageName:any){
        this.router.navigate([pageName])
    }

    NavigateToCurate(examName:any){
        console.log(examName)
        sessionStorage.setItem('ExamNameForQs',examName)
        this.router.navigate(['/oep/Questions/:'+examName])

    }

    ExamList:any=[]
loader:boolean=false
ExamListError:any
FormattedExamLists:any=[]
   getExamList(){
    this.loader=true
    var countryId = JSON.parse(String(sessionStorage.getItem("UserDetails"))).Organization.CountryCode.id
    this.restApi.getExamList(countryId).subscribe((res:any)=>{
        console.log(res)
        this.loader=false
        if (res.Success){
            this.ExamList = res.data
            let formatData:any=[]

            for(let i=0;i<this.ExamList.length;i++){
                if (i%3==0 && i!=0){
                    formatData.push(this.ExamList[i])
                    this.FormattedExamLists.push(formatData)
                    formatData=[]
                    // formatData.push(this.ExamList[i])
                    
                }else if(this.ExamList.length<=4 && formatData.length==this.ExamList.length-1){
                    formatData.push(this.ExamList[i])
                    this.FormattedExamLists.push(formatData)
                    formatData=[]
                }
                else{
                    formatData.push(this.ExamList[i])
                }

            }
            if (formatData.length!=0 && formatData.length<4){
                this.FormattedExamLists.push(formatData)
                formatData=[]
            }
            console.log(this.FormattedExamLists)
        }else{
            this.ExamListError = res.Message
        }
    })

   }
}