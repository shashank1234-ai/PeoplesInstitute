import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/app/environment';
import { FileUploadService } from 'src/app/services/FileService/file.upload.service';
@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls:['./work.component.scss']
  })

  export class WorkComponent implements OnInit {

    constructor(
      private restApi:RestapiServiceService,
      private sanitizer:DomSanitizer,
      private storage:AngularFireStorage,
      private fileService:FileUploadService
    ){

    }
    ngOnInit(): void {
        console.log("work page")
        this.getMyWork()
    }
    p: number = 1;

    typesOfShoes:any=['NIKE','Jordans']
    folders:any=['folder1','folder2']
    notes:any=['note1','note2']
    NetworkError:any
    loader:boolean=false
    myWorkData:any
    getMyWork(){
      this.loader=true
      let UserId = JSON.parse(String(sessionStorage.getItem("UserDetails"))).id
      this.restApi.getMyWork(UserId).subscribe((resWork:any)=>{
        this.loader=false
        console.log(resWork)
        if(resWork.Status){
          console.log(JSON.parse(resWork.data))
          this.myWorkData = JSON.parse(resWork.data)
          for (let i=0;i<this.myWorkData.length;i++){
            let workData=[]
           let completeNo = 0
            // if (localStorage.getItem(this.myWorkData[i].parseDsId)==null){
              console.log(JSON.parse(this.myWorkData[i].ParsedDatasource).length,'length')
              if (localStorage.getItem(this.myWorkData[i].parseDsId)!=undefined || localStorage.getItem(this.myWorkData[i].parseDsId)!=null){
                 workData = JSON.parse(String(localStorage.getItem(this.myWorkData[i].parseDsId)))
              }else{

              
               workData = JSON.parse(this.myWorkData[i].ParsedDatasource)
              }
              for (let j=0;j<workData.length;j++){
                if (workData[j]['verified']!=null && workData[j]['verified']!=undefined && workData[j]['verified']==true){
                  completeNo+=1
                }else{
                  workData[j].verified=false
                  console.log(workData[j])
                }
              }
              this.myWorkData[i].ParsedDatasource = JSON.stringify(workData)
              workData=[]
              this.myWorkData[i]['completePercentage'] = ((completeNo/JSON.parse(this.myWorkData[i].ParsedDatasource).length)*100).toFixed(2)
            }
            console.log(this.myWorkData)
          // }
        }else{
          this.NetworkError = resWork.message
        }
      })
    }
    step:any='listQ'
    questionList:any
    pdfSrc:any
    parseDsId:any
    startVerify(workObj:any,state:any){
      if(state == 'new' || state=='continue'){
        console.log(workObj)
        if(localStorage.getItem(workObj.parseDsId)==undefined || localStorage.getItem(workObj.parseDsId)==null || localStorage.getItem(workObj.parseDsId)==''){

        
        this.questionList = JSON.parse(workObj.ParsedDatasource)
        this.parseDsId = workObj.ParsedDatasource
        }else{
          this.questionList = JSON.parse(String(localStorage.getItem(workObj.parseDsId)))
          let updateQList =[]
          for (let i=0;i<this.questionList.length;i++){
            if(!this.questionList['verified']){
              updateQList.push(this.questionList[i])
            }
          }
          this.questionList = updateQList
          this.parseDsId = workObj.ParsedDatasource

        }
        const ref = this.storage.refFromURL(workObj.fileurl)
        this.loader=true
        ref.getDownloadURL().subscribe((res:any)=>{
          this.loader=false
          console.log(res)
          // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(res)
          console.log(this.pdfSrc)
          this.pdfSrc = res
        })
        console.log(this.pdfSrc)
        console.log(JSON.parse(workObj.ParsedDatasource))
        console.log(workObj)
        this.parseDsId = workObj.parseDsId
        localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))
        // localStorage.setItem()
        this.step='verifyQs'
      // }else if(state == 'continue'){
      // //  let data = localStorage.getItem(workObj.parseDsId)
      //  this.step='verifyQs'

      // }
    }
  }
    image:any
    basedecode(base64image:any){
      this.image=''
      // var image = new Image()
      let imageString = "data:image/png;base64," +base64image
      // image.src = "data:image/png;base64," +base64image
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageString)
      console.log(this.image)
      return this.image
    }
    downloadPfd(){
      window.open(
        this.pdfSrc
      )
    }
    questionEdit:any
    options:any=[]
    edit:any
    editIdx:any
    EditQuestion(question:any,questIndex:any){
      console.log(question,questIndex)
      this.editIdx = questIndex
      this.questionEdit = question.Question
      this.options = question.options
      this.edit=true
    }

    onEditJson(e:any,field:any){
      if (field=='question'){
        this.questionEdit = e.target.value
      }else if(field == 'opt1'){
        this.options[0] = e.target.value
      }else if(field == 'opt2'){
        this.options[1] = e.target.value
      }else if (field == 'opt3'){
        this.options[2] = e.target.value
      }else if(field == 'opt4'){
        this.options[3] = e.target.value
      }
    }

closeEdit(){
  this.edit=false
  this.questionEdit=''
  this.options=[]
  this.editError=''
}
editError:any
submitEdit(){
  console.log(this.questionEdit,this.options)
  if(this.questionEdit==undefined || this.questionEdit==null || this.questionEdit==''){
    this.editError = 'Question is empty'
  }else if (this.options.length!=4){
    this.editError = "All options are not filled"
  }else{
    this.editError=''
  }
  if(this.editError==''){
      for(let i=0;i<this.options.length;i++){
        if (typeof(this.options[i])=='object'){
        this.fileService.convertToBase64(this.options[i]).then((res:any)=>{
          console.log(res)
          this.options[i] = res
          // this.options[i] = {"type":"object","data":this.sanitizer.bypassSecurityTrustResourceUrl(res)}
          console.log(this.options[i])
        })
      }else{
        this.options[i] = this.options[i]
      }
      this.questionList[this.editIdx-1]['options'] = this.options
    }
    this.questionList[this.editIdx-1]['question'] = this.questionEdit
    console.log(this.questionList[this.editIdx-1])
    this.closeEdit()
  }
}
BackToListing(){
  this.step = 'listQ'
}
removeQuestion(question:any,idx:any){
  console.log(idx)
  this.questionList.splice(idx-1,1)
  localStorage.removeItem(this.parseDsId)
  localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))
  
}

optTypeA:any
optTypeB:any
optTypeC:any
optTypeD:any
ChangeOptType(e:any,field:any){
  if (field=='optA'){
    this.optTypeA=e.target.selectedOptions[0].value
  }else if(field == 'optB'){
    this.optTypeB=e.target.selectedOptions[0].value
  }else if(field=='optC'){
    this.optTypeC=e.target.selectedOptions[0].value
  }else if(field=='optD'){
    this.optTypeD=e.target.selectedOptions[0].value
  }
}

OnEditJsonImage(e:any,field:any){
  if(field=='opt1'){
    this.options[0] = e.target.files[0]
  }else if(field == 'opt2'){
    this.options[1] = e.target.files[0]
  }else if(field=='opt3'){
    this.options[2] = e.target.files[0]
  }else if(field=='opt4'){
    this.options[3]=e.target.files[0]
  }

  
}
UploadEdited(){
  console.log(this.questionList)
  console.log(this.myWorkData['datasourceType'],this.myWorkData['parseDsId'])
  let body={
    "ds_type":"pdf",
    "id":this.parseDsId,
    "ParsedDatasource":JSON.stringify(this.questionList)

  }
  this.loader=true
  console.log(body)
  this.restApi.updateDSVerified(body).subscribe((res:any)=>{
    console.log(res)
    if(res.Status){
      alert("Updated Successfully")
    }else{
      alert("Update Failed: "+res.message)
    }
    this.loader=false
  })
}

onSelectOption(e:any,idx:any){
  console.log(e.target.value)
  this.questionList[idx-1]['answer']=e.target.value
  console.log(this.questionList[idx-1])
  // localStorage.removeItem(this.parseDsId)
  // localStorage.setItem(this.parseDsId,this.questionList)
}
approveError:any
ApproveQuestion(quest:any,ids:any){
  console.log(quest,ids)
  console.log(this.questionList[ids-1])
  if(this.questionList[ids-1]['answer'] == undefined || this.questionList[ids-1]['answer']==null || this.questionList[ids-1]['answer']==''){
    this.approveError = "Please Select Correct Option"
  }else{
    this.approveError=''
    this.questionList[ids-1]['verified']=true

    localStorage.removeItem(this.parseDsId)
    localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))

  }
 
}
  }