import { Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { Exception } from 'sass';
import { environment } from 'src/app/environment';
import { HttpClient } from '@angular/common/http';
@Component({
    selector:'app-exam-onboard',
    templateUrl:'./exam-onboard.component.html',
    styleUrls:['./exam-onboard.component.scss'],
})

export class ExamOnboardComponent implements OnInit {
[x: string]: any;
    SectionTable: FormGroup;
    control: FormArray;
    mode: boolean;
    touchedRows: any;
    SubjectSelected:any
    questionModal:boolean=false
   constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document:any,
    private fb: FormBuilder,
    private restAPI:RestapiServiceService,
    private http:HttpClient
   ){

   }
 ngOnInit(){
    this.touchedRows = [];
    this.SectionTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    // this.addRow();
    this.getSubjects();
 }

 ngAfterOnInit() {
    this.control = this.SectionTable.get('tableRows') as FormArray;
  }
  initiateForm(): FormGroup {
    return this.fb.group({
      sectionType: ['', Validators.required],
      NoOfQs: ['', [Validators.email, Validators.required]],
      isEditable: [true]
    });
  }
  SubjectList:any=[]
  subjects:any
  addRow(idx:any) {
    if(this.SubjectList.length!=this.subjects.length){
    for (let i=0;i<this.SubjectList.length;i++){
        this.subjects.push([])
    }
  }
}

  deleteRow(index: number) {
    const control =  this.SectionTable.get('tableRows') as FormArray;
    control.removeAt(index);
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
  savesectionDetails() {
    console.log(this.SectionTable.value);
  }

  get getFormControls() {
    const control = this.SectionTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.SectionTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }
  loader:boolean=false

SubjectSection:any=[]
ExamName:any=""
Examlevel:any=""
step:any='basicInfo'
panelOpenState:boolean=false
Classes:any
SubjectConfiguration(){
    var doc = this.document.getElementById("questionModal")
    doc.style.display="block";
  }

  closeModal(modalName:any){
    var doc = this.document.getElementById(modalName)
    doc.style.display="none";
  }

  StepTo(stepTo:any){
    this.step=stepTo;
  }



  openModal(modalName:any){
    var doc = this.document.getElementById(modalName);
    doc.style.display="block"
  }
  SubjectSectionConfig(){

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

  uploaded_files:any=[]

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
            ExamId:this.ExamId,
            files_url:this.uploaded_files,
            subSecdata:this.subjectSectionMapping['data'],
            template:this.template,
            UploadedBy: sessionStorage.getItem('UserDetails')!=undefined?JSON.parse(String(sessionStorage.getItem('UserDetails'))).id:''
          }
          console.log(upload_sub_sec_body)
          this.loader=true
          this.restAPI.createSubjectSectionConfiguration(upload_sub_sec_body).subscribe((res:any)=>{
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
  ExamId:any
  Editable:boolean=true
  ExamCreateMessage:any=""
  Examcreate:boolean=false
  subjectCode:any
  SubjectDescription:any
  createExam(){
    console.log(JSON.parse(sessionStorage.getItem("UserDetails")+''))
    var ExamObj = {
      ExamName:this.ExamName,
      examDescription:this.ExamName+" Exam",
      classes:this.Classes,
      exam_level:this.Examlevel,
      CountryId:JSON.parse(''+sessionStorage.getItem("UserDetails")).Organization.CountryCode.id
    }
    this.loader=true
    try{
      this.restAPI.createExam(ExamObj).subscribe((res:any)=>{
        console.log(res)
        this.ExamId = res.ExamId
        this.loader=false
        if (res.Success){
          this.Editable = false
          this.ExamCreateMessage="Exam Created."
          this.Examcreate = true
          this.closeModal('questionModal')
        }else{
          this.Editable = true
          this.ExamCreateMessage = res.Message
          this.Examcreate = true
  
        }
      })
    }catch(e:Exception|any){
      this.ExamCreateMessage = e.message
      this.Editable=true
      this.loader=false
    }
 
  
  }

  createtab(){
    let classId = this.document.getElementById('class')
    const tabsContainer = this.document.getElementById('tabs');
    var attribute = classId.value.trim();
    if (attribute!=''){
      const tab = this.document.createElement('div')
      tab.classList.add('tab');
      tab.textContent = attribute;
      tabsContainer.appendChild(tab)
      classId.value=''
    }
  }
  subjectName:any
  ExamSubectMappingId:any
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
    this.restAPI.createExamSubjectMapping(post_body).subscribe((res:any)=>{
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
  subjectList:any
  formattedSubject:any=[]
  getSubjects(){
    this.loader=true
    this.subjectList=[]
    this.restAPI.getSubjectList().subscribe((res:any)=>{
      console.log(res)
      this.loader=false
      if(res.Status){
        this.subjectList = JSON.parse(res.data)
        console.log(this.subjectList)
      }
    })
  }

  OnselectSubject(e:any){
    console.log(e)
   }
   stringify(data:any){
    return JSON.stringify(data)
   }
   opened:boolean=false
   openCloseAddSubjectField(){
    this.opened=!this.opened
   }
  SubjectName:any
  SubjectCode:any
  createSubMessage:any
  CreateSubject(){
    this.loader=true
    console.log(this.subjectCode)
    console.log(this.subjectName)
    let SubjectObj = {
      "Subjectcode":this.subjectCode.toUpperCase(),
      "Subjectname":this.subjectName
    }
    this.restAPI.createnewSubject(SubjectObj).subscribe((res:any)=>{
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
  
  getSubjectsForExam(examId:any){
    this.loader=true
    this.restAPI.getSubjectsForExam(examId).subscribe((res:any)=>{
      console.log(res)
      this.loader=false
      if (res.Status){
        this.SubjectList = JSON.parse(res.data).Subjects
      }
    })
  }
  subjectSectionMapping:any={}
  selectedfiles:any
  uploadFile(e:any){
    // this.subjects['files'] = e.target.files[0]
    this.selectedfiles = Object.values(e.target.files)
  this.subjectSectionMapping['files'] = e.target.files
    console.log(this.subjects)  
}

OnSelectSectionType(e:any,sub:any,sec:any){
  console.log(e.value,sub,sec)
}
onChangeNoOfQ(e:any,sub:any,sec:any){
  console.log(e.target.value,sub,sec)
}
removeRow(index: number,idxi:any) {
  this.subjects[index].splice(idxi, 1);

}

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
template:any
uploadError:any=""
OnSelectTemplate(e:any){
  console.log(e)
 this.template= e.target.value
}
}
// "rLV9JbgpnS7eTK5suynY"