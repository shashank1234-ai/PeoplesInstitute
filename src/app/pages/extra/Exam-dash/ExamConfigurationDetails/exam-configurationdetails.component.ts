import {Component,Inject,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { DOCUMENT } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/FileService/file.upload.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
@Component({
    selector:'app-exam-configuration',
    templateUrl:'./exam-configurationdetails.component.html',
    styleUrls:['./exam-configurationdetails.component.scss']
})
export class ExamConfigurationComponent implements OnInit{
    step:any='basicInfo'
    loader:boolean=false
    ExamName:any
    Examlevel:any
    Classes:any
    opened:boolean=false
    SubjectSelected:any
    SectionTable: FormGroup;
    subjects:any = [];

    subjectList:any=[]
    constructor(
        @Inject(DOCUMENT) private document:any,
        private restApi:RestapiServiceService,
        private fb: FormBuilder,
        private router:Router,
        private fileService:FileUploadService,
        private http:HttpClient

    ){
        
    }
    get getFormControls() {
        const control = this.SectionTable.get('tableRows') as FormArray;
        return control;
      }
    sectionsForSub:any=[]
      addRow(idx:any) {
        if(this.SubjectList.length!=this.subjects.length){
        for (let i=0;i<this.SubjectList.length;i++){
            this.subjects.push([])
        }
    }
    console.log(this.SubjectList,idx)
        let subjectsIdx = { section: '', numQuestions: 0,SubjectId:this.SubjectList[idx]["subjectId"] }
        this.subjects[idx].push(subjectsIdx);
        console.log(this.subjects)
        // const control =  this.SectionTable.get('tableRows') as FormArray;
        // body_div.innerHTML = control.push(this.initiateForm())
        // control.push(this.initiateForm());
        
      }
    
      deleteRow(index: number,tble:any) {
        const control =  this.SectionTable.get('tableRows') as FormArray;
        control.removeAt(index);
        console.log(tble)
      }
      removeRow(index: number,idxi:any) {
        this.subjects[index].splice(idxi, 1);

      }
      editRow(group: any) {
        group.get('isEditable')?.setValue(true);
      }
    
      doneRow(group: any,tble:any) {
        group.get('isEditable')?.setValue(false);
        let tablebody = this.document.getElementsByClassName('tablediv'+tble)
        console.log(tablebody)
        this.addRow(tble);

        // console.log(group)
        // console.log(tble)
      }
      initiateForm(): FormGroup {
        return this.fb.group({
          sectionType: ['', Validators.required],
          NoOfQs: ['', [Validators.email, Validators.required]],
          isEditable: [true]
        });
      }
  savesectionDetails() {
    console.log(this.SectionTable.value);
  }
//   exmaId:any
  touchedRows:any=[]
    ngOnInit(): void {
        this.touchedRows = [];
        this.SectionTable = this.fb.group({
          tableRows: this.fb.array([])
        });
        let body_div0 = this.document.getElementsByClassName('tablediv0')
        let body_div1 = this.document.getElementsByClassName('tablediv1')
        let body_div2 = this.document.getElementsByClassName('tablediv2')
        console.log(body_div0,body_div1,body_div2)
        // this.addRow(body_div0)
        // this.addRow(body_div1)
        // this.addRow(body_div2)
        if (sessionStorage.getItem('ExamEdit')!=undefined || sessionStorage.getItem('ExamEdit')!=null){

        
        let examEditData = JSON.parse(String(sessionStorage.getItem('ExamEdit')))
        this.ExamName = examEditData.ExamName
        this.Examlevel = examEditData.level
        this.Classes = examEditData.class.join(',')
        sessionStorage.removeItem('ExamEdit')
        let url = window.location.href
        this.ExamId = url.split('/')[url.split('/').length-1]
        this.getSubjectsForExam(this.ExamId)
        this.getSubjects();

        }else{
            this.router.navigate(['/oep/exam-dashboard'])
        }
    }
    SubjectList:any=[];
    openModal(modalId:any){
        let modal = this.document.getElementById(modalId)
        modal.style.display = 'block'
    }

    StepTo(page:any){
        this.step = page
    }

    closeModal(modalId:any){
        let modal = this.document.getElementById(modalId)
        modal.style.display='none'
    }
    
    openCloseAddSubjectField(){
        this.opened = !this.opened
    }

    stringify(data:any){
        return JSON.stringify(data)
       }
       ExamId:any
       subjectCode:any
       SubjectDescription:any
       subjectName:any
       ExamSubectMappingId:any

       getSubjectsForExam(examId:any){
        this.loader=true
        this.restApi.getSubjectsForExam(examId).subscribe((res:any)=>{
          console.log(res)
          this.loader=false
          if (res.Status){
            this.SubjectList = JSON.parse(res.data).Subjects
          }
        })
      }
       AddSubjects(){
        console.log(this.subjectCode,this.SubjectDescription,this.subjectName)
        console.log(this.SubjectSelected)
        var selectedSubjectsId=[]
        for (let i=0;i<this.SubjectSelected.length;i++){
          selectedSubjectsId.push(
            JSON.parse(this.SubjectSelected[i]).id
          )
        }
        console.log(selectedSubjectsId)
    
        let post_body = {
          "ExamId":this.ExamId,
          "SubjectIds":selectedSubjectsId
        }
        this.loader=true
        // create subject exam mapping
        this.restApi.createExamSubjectMapping(post_body).subscribe((res:any)=>{
        console.log(res)
        this.loader=false
        if (res.Status){
    this.ExamSubectMappingId = res.data
    this.getSubjectsForExam(this.ExamId)
    this.closeModal('questionModal')
    //get Subjects mapped with IDs
        }else{
          alert("Something went wrong reason:"+res.Message)
        }
        })
        
      }
      createSubMessage:any
      SubjectCode:any
      CreateSubject(){
        this.loader=true
        console.log(this.subjectCode)
        console.log(this.subjectName)
        let SubjectObj = {
          "Subjectcode":this.subjectCode.toUpperCase(),
          "Subjectname":this.subjectName
        }
        this.restApi.createnewSubject(SubjectObj).subscribe((res:any)=>{
          console.log(res)
          this.loader=false
          if (res.Success){
    
            this.createSubMessage='Sucessfully created'
        
          }else{
            this.createSubMessage = res.Message
          }
        })
        this.getSubjects()
        console.log(this.SubjectCode)
      }

      getSubjects(){
        this.loader=true
        this.subjectList=[]
        this.restApi.getSubjectList().subscribe((res:any)=>{
          console.log(res)
          this.loader=false
          if(res.Status){
            this.subjectList = JSON.parse(res.data)
            console.log(this.subjectList)
          }
        })
      }

subjectSectionError:any=''
  Submit(){
    console.log(this.subjects)
    if(this.subjects.length!=this.SubjectList.length){
        this.subjectSectionError = "All Subjects are Not Configured"
    }else if(this.template == null || this.template == undefined){
      this.subjectSectionError = "Please choose a Template"
    }
    else if(
      this.subjectSectionMapping['files']=='' || this.subjectSectionMapping['files']==null || this.subjectSectionMapping['files']==undefined
    ){
      this.subjectSectionError = "Please Upload past 10 Years of question papers"
    }
    else{
        this.subjectSectionError=""
    for(let i=0;i<this.subjects.length;i++){

        this.subjects.forEach((element:any) => {
            if (element.length==0){
                this.subjectSectionError = "Some Fields are empty"
            }else if(Object.values(element).length == 0){
                this.subjectSectionError = "Please fill all the details"
            }
            else{
                this.subjectSectionError=""
            }
        });
    }
this.subjectSectionMapping['data'] = this.subjects
console.log(this.subjectSectionMapping)
    // this.fileService.uploadMultipleFiles(this.selectedfiles).subscribe((res:any)=>{
    //   console.log(res)
    // })

    this.onUpload()
}

  }

  onChangeNoOfQ(e:any,sub:any,sec:any){
    console.log(e.target.value,sub,sec)
  }

  formattedSubject:any=[]
  
  OnSelectSectionType(e:any,sub:any,sec:any){
    console.log(e.value,sub,sec)
  }
subjectSectionMapping:any={}
  uploadFile(e:any){
    // this.subjects['files'] = e.target.files[0]
    this.selectedfiles = Object.values(e.target.files)
  this.subjectSectionMapping['files'] = this.selectedfiles
  console.log(this.selectedfiles)
    console.log(this.subjects)  
}


selectedfiles:File[]=[]


// dragoverHandler(e:any){
//   e.preventDefault()
//   e.stopPropagation()
// }

deleteFile(file:any,idx:any){
  console.log(file)
  // console.log(this.selectedfiles.indexOf(file))
  console.log(typeof(this.selectedfiles))
  this.selectedfiles.splice(idx,1)
  // this.selectedfiles = this.selectedfiles.filter((ele:any)=>{
  //   return ele ? ele!=file:''
  // })
  console.log(this.selectedfiles)
}

onUploadFile(e:any){
  console.log(e)
  // this.selectedfiles = e.target.files
  this.selectedfiles = Object.values(e.target.files)
 
  console.log(this.selectedfiles)
}
uploaded_files=[]
uploadError:any=''
template:any
OnSelectTemplate(e:any){
  console.log(e)
 this.template= e.target.value
}
onUpload(): void {
  this.loader=true
  const formData = new FormData();
  for (const file of this.selectedfiles) {
    formData.append('files[]', file, file.name);
  }

  this.http.post<any>(environment.apiUrl+'Upload/UploadMultipleFiles', formData).subscribe(
    (response:any) => {
      this.loader=false
      if(response.Status){
        this.uploadError=''
        this.uploaded_files = JSON.parse(response.data)
        let upload_sub_sec_body={
          ExamId:window.location.href.split('/')[window.location.href.split('/').length-1],
          files_url:this.uploaded_files,
          subSecdata:this.subjectSectionMapping['data'],
          template:this.template,
          UploadedBy: sessionStorage.getItem('UserDetails')!=undefined?JSON.parse(String(sessionStorage.getItem('UserDetails'))).id:''
        }
        console.log(upload_sub_sec_body)
        this.loader=true
        this.restApi.createSubjectSectionConfiguration(upload_sub_sec_body).subscribe((res:any)=>{
          console.log(res)
          this.loader=false
        })
      }else{
        this.uploadError = "Upload Failed reason :"+response.message
      }
      console.log('Upload success!', response);
    },
    (error:any) => {
      console.error('Error during upload:', error);
      this.uploadError = error
    }
  );
}


}