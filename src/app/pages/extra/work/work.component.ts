import { Component,Inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadService } from 'src/app/services/FileService/file.upload.service';
import { DOCUMENT } from '@angular/common';
import { Exception } from 'sass';
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
      private fileService:FileUploadService,
      @Inject(DOCUMENT) private document:any
    ){

    }
    ngOnInit(): void {
        console.log("work page")
        this.getMyWork()
        this.getSubjectSectionConfigurationUpload()
    }
    p: number = 1;
    loader_new:boolean=false
    typesOfShoes:any=['NIKE','Jordans']
    folders:any=['folder1','folder2']
    notes:any=['note1','note2']
    NetworkError:any
    loader:boolean=false
    myWorkData:any
    finished_work:any=[]
    getMyWork(){
      this.loader=true
      let UserId = JSON.parse(String(sessionStorage.getItem("UserDetails"))).id
      this.restApi.getMyWork(UserId).subscribe((resWork:any)=>{
        this.loader=false
        console.log(resWork)
        this.finished_work=[]
        if(resWork.Status){
          console.log(JSON.parse(resWork.data))

          this.myWorkData = JSON.parse(resWork.data)
          let updated_data=[]
          for (let i=0;i<this.myWorkData.length;i++){
            if(this.myWorkData[i].verified){
              console.log(this.myWorkData[i])
            //  let finish = this.myWorkData.splice(this.myWorkData[i],1)
            //  console.log(finish)
              this.finished_work.push(this.myWorkData[i])
            }else{
              updated_data.push(this.myWorkData[i])
            }
          }
          console.log(this.finished_work)
          this.myWorkData = updated_data
          for (let i=0;i<this.myWorkData.length;i++){
            let workData=[]
           let completeNo = 0
            // if (localStorage.getItem(this.myWorkData[i].parseDsId)==null){
              // console.log(JSON.parse(this.myWorkData[i].ParsedDatasource),'length')
              if(this.myWorkData[i].ParsedDatasource.length>0){

              
              console.log(this.myWorkData[i].parseDsId)
              if (localStorage.getItem(this.myWorkData[i].parseDsId)!=undefined || localStorage.getItem(this.myWorkData[i].parseDsId)!=null){
                 workData = JSON.parse(String(localStorage.getItem(this.myWorkData[i].parseDsId)))
              }else{

              
               workData =typeof(JSON.parse(this.myWorkData[i].ParsedDatasource))=='object'? JSON.parse(this.myWorkData[i].ParsedDatasource):[]
              }
          
              for (let j=0;j<workData.length;j++){
                if (workData[j]['verified']!=null && workData[j]['verified']!=undefined && workData[j]['verified']==true){
                  completeNo+=1
                }else{
                  workData[j].verified=false
                  // console.log(workData[j])
                }
              }
              this.myWorkData[i].ParsedDatasource = JSON.stringify(workData)
              workData=[]
              this.myWorkData[i]['completePercentage'] = ((completeNo/JSON.parse(this.myWorkData[i].ParsedDatasource).length)*100).toFixed(2)
            }
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
    dsType:any
    ExamId:any
    SubjectId:any
    startVerify(workObj:any,state:any){
      if(state == 'new' || state=='continue'){
        console.log(workObj)
        this.dsType = workObj.dsType
        this.ExamId = workObj.ExamId
        if(localStorage.getItem(workObj.parseDsId)==undefined || localStorage.getItem(workObj.parseDsId)==null || localStorage.getItem(workObj.parseDsId)==''){

        
        this.questionList = JSON.parse(workObj.ParsedDatasource)
        console.log(this.questionList)
        var updated_data:any=[]
        for (let i=0;i< this.questionList.length;i++){
          if(this.questionList[i].Question.length>0 && this.questionList[i].options!=undefined && this.questionList[i].options.length>0){
            updated_data.push(this.questionList[i])
          }
        }
        this.questionList = updated_data
        for (let i=0;i<this.questionList.length;i++){
          // console.log(this.questionList[i].Question.length)
          // console.log(i)

          // console.log(this.questionList[i].Question)
          if(this.questionList[i].Question.length>0 && this.questionList[i].options.length>=4){
            let opt:any
            try{
               opt = JSON.parse(this.questionList[i].options)
            }catch{
               opt = this.questionList[i].options
            }
            // let opt=JSON.parse(this.questionList[i].options)!=undefined?JSON.parse(this.questionList[i].options):this.questionList[i].options
            let updated_opt:any={}
            let updated_opt_arr=[]
            for (let k=0;k<4;k++){
            if(this.questionList[i].options[k].optType!='image' && this.questionList[i].options[k].optType == undefined && typeof(this.questionList[i].options[k])!='object'){
              updated_opt['optType'] = 'text'
              updated_opt['opt'] = opt[k]!=undefined?opt[k]:""
              updated_opt_arr.push(updated_opt)
              updated_opt={}
              // this.questionList[i].options[k].optType='text'
              // this.questionList[i].options[k].opt = opt[k]
            }else{
              updated_opt['optType'] = this.questionList[i].options[k].optType!=undefined? this.questionList[i].options[k].optType:"text"
              updated_opt['opt'] = this.questionList[i].options[k].opt!=undefined?this.questionList[i].options[k].opt:''
              updated_opt_arr.push(updated_opt)
              updated_opt={}
            }
            }
            this.questionList[i].options = updated_opt_arr
            updated_opt_arr=[]
          }
        }
        // }
        console.log(this.questionList)
        this.parseDsId = workObj.ParsedDatasource
        
        }else{
          this.questionList = JSON.parse(String(localStorage.getItem(workObj.parseDsId)))
          var updated_data:any=[]
        for (let i=0;i< this.questionList.length;i++){
          if(this.questionList[i].Question.length>0 && this.questionList[i].options !=undefined && this.questionList[i].options.length>0){
            updated_data.push(this.questionList[i])
          }
        }
        this.questionList = updated_data
          let updateQList =[]
          // for (let i=0;i<this.questionList.length;i++){
          //   if(!this.questionList['verified']){
          //     updateQList.push(this.questionList[i])
          //   }
          // }
          // this.questionList = updateQList
          // updateQList=[]
          for (let i=0;i<this.questionList.length;i++){
            // console.log(this.questionList[i].Question.length)
            if(this.questionList[i].Question.length>0){
              let opt:any
            try{
               opt = JSON.parse(this.questionList[i].options)
            }catch{
               opt = this.questionList[i].options
            }
              // let opt=JSON.parse(this.questionList[i].options)!=undefined?JSON.parse(this.questionList[i].options):this.questionList[i].options
              let updated_opt:any={}
              let updated_opt_arr=[]
              for (let k=0;k<4;k++){
                try{
              if(this.questionList[i].options[k].optType!='image' && this.questionList[i].options[k].optType == undefined && typeof(this.questionList[i].options[k])!='object'){
                updated_opt['optType'] = 'text'
                updated_opt['opt'] = opt[k]!=undefined?opt[k]:''
                updated_opt_arr.push(updated_opt)
                updated_opt={}
                // this.questionList[i].options[k].optType='text'
                // this.questionList[i].options[k].opt = opt[k]
              }else{
                updated_opt['optType'] = this.questionList[i].options[k].optType!=undefined?this.questionList[i].options[k].optType:"text"
                updated_opt['opt'] = this.questionList[i].options[k].opt!=undefined?this.questionList[i].options[k].opt:""
                updated_opt_arr.push(updated_opt)
                updated_opt={}
              }
            }catch{
              updated_data['optType']='text'
              updated_data['opt']=''
              updated_opt_arr.push(updated_opt)
              updated_opt={}
            }
              }
              this.questionList[i].options = updated_opt_arr
              updated_opt_arr=[]
              updateQList.push(this.questionList[i])
            }
          }
          this.questionList = updateQList
          console.log(this.questionList.length)
          this.parseDsId = workObj.ParsedDatasource
          console.log(this.parseDsId)


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
        this.SubjectId = workObj.subjectId

        // localStorage.setItem()
        if(this.dsType == 'subject_wise'){        
        this.getChForSubject(this.ExamId,this.SubjectId)
        }
        if (this.dsType=='mock_test'){
          this.GetSubjectForExam(this.ExamId)
        }
        if(this.dsType=="chapter_wise"){
          this.restApi.getFullDataWork(this.parseDsId).subscribe((res:any)=>{
            console.log(JSON.parse(res.data))
            for(let i=0;i<this.questionList.length;i++){
              this.questionList[i]['ChapterId'] = JSON.parse(res.data)['ChapterId']
              this.questionList[i]['SubjectId'] = JSON.parse(res.data)['SubjectId']
              // if(this.questionList[i]['Explaination']!=undefined || this.questionList[i]['Explaination']!=null || this.questionList[i]['Explaination']!=''){
              //   this.questionList[i]['ExplainationType'] = 'Text'
              // }
            }
          })
          
        }
        console.log(this.questionList)
        localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))

        this.step='verifyQs'
      // }else if(state == 'continue'){
      // //  let data = localStorage.getItem(workObj.parseDsId)
      //  this.step='verifyQs'

      // }
    }
  }
ChaptersList:any
  getChForSubject(examId:any,subjectId:any){
    let chaptBody = {
      ExamId:examId,
      SubjectId:subjectId
    }
    // this.loader=true
    this.restApi.getChaptersForExam(chaptBody).subscribe((res:any)=>{
      // this.loader=false
      console.log(res)
      if(res.Status){
        this.ChaptersList = JSON.parse(res.data)
      }
    })
  }
    image:any
    basedecode(base64image:any){
      this.image=''
      // var image = new Image()
      // let imageString = "data:image/png;base64," +base64image
      // image.src = "data:image/png;base64," +base64image
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(base64image)
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
    imageEdit:any
    EditQuestion_obj:any={}
    EditQuestion(question:any,questIndex:any){
      console.log(question,questIndex)
      this.questionList[questIndex-1]['verified']=false
      this.editIdx = questIndex
      this.questionEdit = question.Question
      this.options = question.options
      this.explainationForQuestion = question.Explaination
      this.explainType = question.ExplainationType=='Image'?'image':'text'
      this.EditQuestion_obj['Question'] = this.questionEdit
      this.EditQuestion_obj['options']=this.options
      // this.EditQuestion_obj['Explaination']=this.explainationForQuestion
      
      this.edit=true
      if(question.image){
        this.imageEdit = question.image
      }else{
        this.imageEdit = ''
      }
    }

    onEditJson(e:any,field:any){
      if (field=='question'){
        this.questionEdit = e.target.value
      }else if(field == 'opt1'){
        this.options[0]['opt'] = e.target.value
      }else if(field == 'opt2'){
        this.options[1]['opt'] = e.target.value
      }else if (field == 'opt3'){
        this.options[2]['opt'] = e.target.value
      }else if(field == 'opt4'){
        this.options[3]['opt'] = e.target.value
      }
    }

closeEdit(){
  try{

  
  localStorage.removeItem(this.parseDsId)
  localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))
  this.edit=false
  this.questionEdit=''
  this.options=[]
  this.editError=''
  this.explainationForQuestion=''
  this.explainFile=''
  this.explainImage=''
  this.explainType=''
  this.explainUploadOption=''
  this.optSelected=''
  }catch(e:any){
    console.log(e)

  }
}

clearFields(){
  this.questionEdit=''
  this.options=[]
  this.editError=''
  this.explainationForQuestion=''
  this.explainFile=''
  this.explainImage=''
  this.explainType=''
  this.explainUploadOption=''
  this.optSelected=''
  this.isexplainParse=false
  this.dsType=''

}
editError:any
submitEdit(){
  console.log(this.questionEdit,this.options)
  if(this.questionEdit==undefined || this.questionEdit==null || this.questionEdit==''){
    this.editError = 'Question is empty'
  }else if (this.options.length!=4){
    this.editError = "All options are not filled"
  }else if(this.explainationForQuestion==undefined || this.explainationForQuestion==null || this.explainationForQuestion == ''){
    this.editError = "Please Fill the Explaination"
  }
  else{
    this.editError=''
  }
  if(this.editError==''){
      for(let i=0;i<this.options.length;i++){
        if (typeof(this.options[i])=='object' && this.options[i]['optType']=="image"){
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
    this.questionList[this.editIdx-1]['Question'] = this.questionEdit
    if(this.base64String!=undefined || this.base64String!=null || this.base64String!=''){

    
    this.questionList[this.editIdx-1]['image'] = this.base64String
  this.base64String=''  
  }
    console.log(this.questionList[this.editIdx-1])
    this.closeEdit()
  }
}
BackToListing(){
  this.step = 'listQ'
  this.clearLocalStorageAndPushToDb()
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
  console.log(e.target.selectedOptions[0].value)
  if (field=='optA'){
     
    this.optTypeA=e.target.selectedOptions[0].value
    this.options[0]['optType'] = this.optTypeA
  }else if(field == 'optB'){
    this.optTypeB=e.target.selectedOptions[0].value
    this.options[1]['optType'] = this.optTypeB
  }else if(field=='optC'){
    this.optTypeC=e.target.selectedOptions[0].value
    this.options[2]['optType'] = this.optTypeC
  }else if(field=='optD'){
    this.optTypeD=e.target.selectedOptions[0].value
    this.options[3]['optType'] = this.optTypeD
  }
}

OnEditJsonImage(e:any,field:any){
  this.fileService.convertToBase64(e.target.files[0]).then((res:any)=>{
    console.log(res)
    if(field=='opt1'){
      this.options[0]['opt'] = res
  
    }else if(field == 'opt2'){
      this.options[1]['opt'] = res
    }else if(field=='opt3'){
      this.options[2]['opt'] = res
    }else if(field=='opt4'){
      this.options[3]['opt']=res
    }  })
  

  
}

getSizeOfUpload(data:any){
  let stringify = JSON.stringify(data)
  const encoder = new TextEncoder();
  const data_encode = encoder.encode(stringify)
  let megabytesize = data_encode.length/(1024*1024)
  return megabytesize
}
UploadEdited(){
  console.log(this.questionList)
  console.log(this.myWorkData['datasourceType'],this.myWorkData['parseDsId'])
  // var size_upload = this.getSizeOfUpload(this.questionList)
  let body={}
  let questions=[]
  let questionsWithImage=[]
  let QExplainWithImages=[]
  // if(size_upload<=1){
    for (let i=0;i<this.questionList.length;i++){
      // if(this.questionList[i][''])
      if (this.questionList[i]['ExplainationType']=='image'){
        QExplainWithImages.push(this.questionList[i])
      }
      else if(this.questionList[i]['image']!=undefined || this.questionList[i]['image']!=null || this.questionList[i]['image']!=''){
        questionsWithImage.push(this.questionList[i])
      }else{
        questions.push(this.questionList)
      }
    }
    body={
      "ds_type":"pdf",
      "id":this.parseDsId,
      // "QuestionWithImage":JSON.stringify(questionsWithImage),
      // ""
      "ParsedDatasource":JSON.stringify(this.questionList),
      'verified':true
  
    // }
  }

  
  
  this.loader=true
  console.log(body)
  this.restApi.updateDSVerified(body).subscribe((res:any)=>{
    console.log(res)
    if(res.Status){
      alert("Updated Successfully")
      this.step = 'listQ'
      if (localStorage.getItem(this.parseDsId)!=undefined){
      localStorage.removeItem(this.parseDsId)
      }
      // this.getMyWork()
    }else{
      alert("Update Failed: "+res.message)
    }
    this.loader=false
  })
}

optSelected:any=""
onSelectOption(e:any,idx:any){
  console.log(e.target.value)
  console.log(this.optSelected)
  this.questionList[idx-1]['answer']=this.optSelected
  console.log(this.questionList[idx-1])

  // localStorage.removeItem(this.parseDsId)
  // localStorage.setItem(this.parseDsId,this.questionList)
}

ReturnInt(str:any){
  return Number(str);
}
approveError:any
ApproveQuestion(quest:any,ids:any){
  console.log(quest,ids)
  console.log(this.questionList[ids-1])
  if(this.questionList[ids-1]['answer'] == undefined || this.questionList[ids-1]['answer']==null || this.questionList[ids-1]['answer']==''){
    this.approveError = "Please Select Correct Option"
  }else if(this.questionList[ids-1]['Explaination']==undefined || this.questionList[ids-1]['Explaination']==null){
    this.approveError = "Please Provide Explaination by clicking on Edit"
  }else if(this.dsType=='subject_wise' &&(this.questionList[ids-1]['ChapterId'] ==undefined || this.questionList[ids-1]['ChapterName']==undefined || this.questionList[ids-1]['ChapterId']==null || this.questionList[ids-1]['ChapterName']==null)){
    this.approveError = "Please Select Chapter"
  }else if(this.dsType == 'mock_test' && (this.SubjectId == null || this.SubjectId==undefined || this.SubjectId == '')){
    // if(this.SubjectId == null || this.SubjectId==undefined || this.SubjectId == ''){
      this.approveError = "Please select Subject"
    }
    else if( this.dsType == 'mock_test' && (this.questionList[ids-1]['ChapterId'] == null || this.questionList[ids-1]['ChapterId']==undefined || this.questionList['ChapterId'] == '')){
      this.approveError="Please select Chapter"
    }
  else{
    this.approveError=''
    this.questionList[ids-1]['verified']=true

    localStorage.removeItem(this.parseDsId)
    localStorage.setItem(this.parseDsId,JSON.stringify(this.questionList))

  }
  
}
base64String:any
uploadImageToQuestion(e:any,p:any){
    console.log(e.target.files[0],p)
    console.log(this.questionList[p-1])
    this.fileService.convertToBase64(e.target.files[0]).then((res:any)=>{
      console.log(res)
      this.base64String = res
      this.questionList[p-1]['image'] = this.base64String
      console.log(this.questionList[p-1])
    }).catch((res:any)=>{
      this.questionList[p-1]['image']=''
    })
   
}
ExamConfigurationData:any
parsed_ds_format:any
getSubjectSectionConfigurationUpload(){
  this.loader_new=true
  this.restApi.getSubjectSectionDSForVerify(JSON.parse(String(sessionStorage.getItem('UserDetails'))).id).subscribe((res:any)=>{
    this.loader_new=false
    console.log(res)
    if(res.Status){
      console.log(JSON.parse(res.data))
      this.ExamConfigurationData =JSON.parse(res.data)
      for (let i=0;i<this.ExamConfigurationData.length;i++){
        let parsedData = this.ExamConfigurationData[i].DataSource
        // console.log(parsedData)
        // let parsedds = parsedData.ParsedDatasource
        for(let j=0;j<parsedData.length;j++){
          console.log()
          let parsedds = JSON.parse(parsedData[j].ParsedDS.ParsedDatasource)
          // console.log(parsedds)
          let c=0
          parsedds.forEach((e:any) => {
            e['verified'] = false
          });
          for(let k=0;k<parsedds.length;k++){
            if(parsedds['verified']){
              c+=1
            }
          }
          parsedData[j].ParsedDS['CompletePer'] = String(((c/parsedds.length)*100).toFixed(2))
          c=0
          // this.parsed_ds_format = parsedds
          // console.log(parsedData[j])
        }
        // this.ExamConfigurationData[i].DataSource = parsedData
        this.ExamConfigurationData[i].DataSource = parsedData
      }
      console.log(this.ExamConfigurationData)
    }
  })
}

startVerifyDSConfig(data:any,examId:any){
console.log(data)
let workObj = data
if(localStorage.getItem(data.ParsedDSId)==undefined || localStorage.getItem(data.ParsedDSId)==null || localStorage.getItem(data.ParsedDSId)==''){
  this.questionList = JSON.parse(data.ParsedDS.ParsedDatasource)
  this.parseDsId = data.ParsedDSId
  localStorage.setItem(data.ParsedDSId,data.ParsedDS.ParsedDatasource)
}else{
  this.questionList = JSON.parse(String(localStorage.getItem(data.ParsedDSId)))
  let updateQList=[]
  for(let i=0;i<this.questionList.length;i++){
    if(!this.questionList[i]['verified'] && this.questionList[i].Question.length>0){
      updateQList.push(this.questionList[i])
    }
  }
  this.questionList = updateQList
  this.parseDsId = data.ParsedDSId
  this.dsType = data.ParsedDS.type  
}
const ref = this.storage.refFromURL(data.file_url)
this.loader=true

ref.getDownloadURL().subscribe((res:any)=>{
  this.loader=false
  this.pdfSrc = res
})
this.parseDsId = workObj.parseDsId
this.ExamId=examId
// this.SubjectId = workObj.subjectId
// if(this.dsType == 'subject_wise'){        
  // this.getChForSubject(this.ExamId,this.SubjectId)
  // }
  // if (this.dsType=='mock_test'){
    this.GetSubjectForExam(this.ExamId)
  // }
this.step='verifyQs'
}
explainationForQuestion:any
OnChangeExplaination(e:any,p:any){
  console.log(e,p)
  this.explainationForQuestion = e.target.value
  this.questionList[p-1]["Explaination"] = e.target.value
  console.log(this.questionList[p-1])
  console.log(this.questionList)
}

  OnExplain(e:any,p:any,parsopt:any){
  if(parsopt=='P'){
    this.questionList[p-1]['ExplainationType']='Text'
  }else if(parsopt=='NP'){
    this.questionList[p-1]['ExplainationType'] = 'Image'
  }
  console.log(e,p)
  this.explainationForQuestion = e
  this.questionList[p-1]["Explaination"] = this.explainationForQuestion
  console.log(this.questionList[p-1])
  console.log(this.questionList)
}
clearimage(){
  this.imageEdit=''
}
OnSelectChpt(e:any,idx:any){
  console.log(idx-1,this.questionList)
  console.log(e.target.selectedOptions[0].value)
  this.questionList[idx-1]['ChapterId'] = JSON.parse(e.target.selectedOptions[0].value).id
  this.questionList[idx-1]['ChapterName'] = JSON.parse(e.target.selectedOptions[0].value).ChapterName
  this.questionList[idx-1]['SubjectId'] = this.SubjectId
  console.log(this.questionList[idx-1])
}
StringifyJSON(obj:any){
  return JSON.stringify(obj)
}

SubjectList:any
GetSubjectForExam(examId:any){
  this.restApi.getSubjectsForExam(examId).subscribe((res:any)=>{
    console.log(res)
    if(res.Status){
      this.SubjectList = JSON.parse(res.data)['Subjects']
    }
  })
}


OnSelectSubject(e:any){
  console.log(e)
let Subject = JSON.parse(e.target.selectedOptions[0].value)
this.SubjectId = Subject.subjectId
if(this.SubjectId!=undefined|| this.SubjectId!=null){
  this.getChForSubject(this.ExamId,this.SubjectId)
}
}
explainImage:any

// onUploadExplainFile(e:any,idx:any){
//   console.log(e.target.files[0])
//   this.fileService.convertToBase64(e.target.files[0]).then((res:any)=>{
//     console.log(res)
//     if(res){
//       this.explainImage=res
//       let image_name = String(idx)+'_'+this.ExamId
//       let upload_body = {
//         image_string:this.explainImage,
//         image_name:image_name
//       }
//       this.restApi.uploadSolutionImage(upload_body).subscribe((res_sol:any)=>{
//         console.log(res_sol)
//       })
//       // upload the base 64 to api
//     }else{
//       this.explainImage=""
//     }
//   }).catch((res:any)=>{
// this.editError = res
//   })

// }

isexplainParse:boolean=false
explainUploadOption:any=''
explainParseMode:any=''
explainFile:any

uploadExplainPrompt(e:any,idx:any){
  if(e.target.files.length>0){
    this.isexplainParse=true
    this.explainFile = e.target.files[0]  
    // this.openModal('parseModal')
  }
}
explainType:any
onUploadExplainFile(file:any,idx:any,parsOpt:any){

  const formData = new FormData();
  formData.append('image',file)
  formData.append('mode',parsOpt)
  // this.loader=true
  this.restApi.uploadSolutionImage(formData).subscribe((res:any)=>{
    console.log(res)
    // this.loader=false
    if(res.Status){
     let data = JSON.parse(res.data)
     if(data.Status){

      
      this.explainationForQuestion = data.data
      this.explainType='text'
      this.OnExplain(data.data,idx,parsOpt)
      console.log(this.explainationForQuestion)
     }else{
      this.editError=data.message
     }
    }else{
      this.editError = res.message
     }
  })

}
openModal(id:any){
  let modal = this.document.getElementById(id)
  modal.style.display='block'
}

closeModal(id:any){
let modal = this.document.getElementById(id)
modal.style.display = 'none'
}
onChangeParseOpt(e:any){
  console.log(this.explainUploadOption)
  if (this.explainUploadOption == 'P'){
this.onUploadExplainFile(this.explainFile,this.editIdx,this.explainUploadOption)
  }else if(this.explainUploadOption == 'NP'){
    console.log(this.explainFile)
    this.fileService.convertToBase64(this.explainFile).then((res:any)=>{
    // else if(data.mode == 'NP'){
      this.explainationForQuestion = res
      this.explainType='image'
      this.questionList[this.editIdx-1]['Explaination'] = this.explainationForQuestion
      this.questionList[this.editIdx-1]['ExplainationType'] = 'Image'
            // }
    })
    // upload Image by removing background to white color and removing all watermark
    // this.fileService.
  }
  }
  clearExplain(){
    this.explainationForQuestion=''
    this.questionList[this.editIdx-1]['Explaination']=''
    this.questionList[this.editIdx-1]['ExplainationType']=''
  }



  clearLocalStorageAndPushToDb(){
    let questionList = localStorage.getItem(this.parseDsId)
    console.log("HI")
    this.loader=true
    for(let i=0;i<JSON.parse(String(questionList)).length;i++){
      let opts = JSON.stringify(JSON.parse(String(questionList))[i].options)
      JSON.parse(String(questionList))[i].options = opts
      opts=""
    }
    console.log(JSON.parse(String(questionList)))

   let  body={
      "ds_type":"pdf",
      "id":this.parseDsId,
      "ParsedDatasource":questionList,
      'verified':false
    // }
  }
  this.loader=true
    this.restApi.partialUpdateDs(body).subscribe((res:any)=>{
      this.loader=false
      console.log(res)
      if(res.Status){
        localStorage.removeItem(this.parseDsId)
        this.getMyWork()
        alert('Updated Successfully')
      }else{
        alert(res.message)
      }
    })
  }

  deleteOpt(idx:any){
    let id:any
    if(idx=='opt1')
    {
      id = 0
    }else if(idx=='opt2'){
      id=1
    }else if(idx=='opt3'){
      id=2
    }else if(idx == 'opt4'){
      id=3
    }
    this.options[id]['opt'] = ''
  }
  onchangePage(p:any){
    console.log(p)
    // this.optSelected = this.questionList[p-1].answer!=undefined ? this.questionList[p-1].answer:''
    // this.selecte
  }
  generatedText:any=""
  showPrompt:boolean=false
  fixUsingAI(idx:any){
    let body = {QData:JSON.stringify(this.EditQuestion_obj)}
    this.loader=true
    this.restApi.getFixedQuestion(body).subscribe((res:any)=>{
      console.log(res)
this.loader=false
      try{
      console.log(JSON.parse(res.data)) 
      if(res.Status){
        this.explainationForQuestion = JSON.parse(res.data).Explaination!=undefined?JSON.parse(res.data).Explaination:JSON.parse(res.data).Explanation!=undefined?JSON.parse(res.data).Explanation:JSON.parse(res.data).explaination!=undefined?JSON.parse(res.data).explaination:JSON.parse(res.data).explanation!=undefined?JSON.parse(res.data).explanation:'';
        // this.questionEdit = JSON.parse(res.data).Question
        this.questionEdit = JSON.parse(res.data).Question!=undefined?JSON.parse(res.data).Question:JSON.parse(res.data).question!=undefined?JSON.parse(res.data).question:this.EditQuestion_obj.Question
        this.options = JSON.parse(res.data).options!=undefined?JSON.parse(res.data).options:JSON.parse(res.data).Options!=undefined?JSON.parse(res.data).Options:this.EditQuestion_obj.options
        this.questionList[idx-1]['answer'] =Number(JSON.parse(res.data).answer)!=undefined? Number(JSON.parse(res.data).answer)-1:JSON.parse(res.data).answer.toLowerCase() =='a'?0:JSON.parse(res.data).answer.toLowerCase() =='b'?1:JSON.parse(res.data).answer.toLowerCase() =='c'?2:JSON.parse(res.data).answer.toLowerCase() =='d'?3:NaN
        this.questionList[idx-1]['Explaination'] = this.explainationForQuestion
        this.questionList[idx-1]['options']=this.options
        console.log(this.questionList[idx-1])
        this.showPrompt=false
      }
    }catch(e:any){
      console.log(e)
      // console.log(err)
      // give pop up with error or with generated prompt
      // let modal = this.document.getElementById('promptModal')
      // modal.style.display = 'block'
      this.showPrompt=true
      this.generatedText = (res.data)
    }
    }
    )
  
  }
  Onselectdifficulty(e:any,idx:any){
    console.log(e,idx)
    this.questionList[idx-1]["difficulty_level"] = e.target.value
    console.log(this.questionList[idx-1])
  }

  bulkSubmit(){
    console.log(this.myWorkData)
    try{
    for (let i=0;i<this.myWorkData.length;i++){

      this.parseDsId = this.myWorkData[i]["dsMasterId"]
      console.log("started "+this.parseDsId)
      this.questionList=JSON.parse(this.myWorkData[i]["ParsedDatasource"])
      this.UploadEdited()
    }
  }catch(e:any){
console.log(e)
  }
  }
}
  