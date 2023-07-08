import {CUSTOM_ELEMENTS_SCHEMA, Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { Exception } from 'sass';

@Component({
    selector:'app-exam-onboard',
    templateUrl:'./exam-onboard.component.html',
    styleUrls:['./exam-onboard.component.scss'],
})

export class ExamOnboardComponent implements OnInit {
    SectionTable: FormGroup;
    control: FormArray;
    mode: boolean;
    touchedRows: any;
   constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document:any,
    private fb: FormBuilder,
    private restAPI:RestapiServiceService
   ){

   }
 ngOnInit(): void {
    this.touchedRows = [];
    this.SectionTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
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
  addRow() {
    const control =  this.SectionTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.SectionTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: any) {
    group.get('isEditable')?.setValue(true);
  }

  doneRow(group: any) {
    group.get('isEditable')?.setValue(false);
    this.addRow();
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
SubjectList:any=[
    
]
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

  Submit(){

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
  subjectList:any=[]
  AddSubject(){
    console.log(this.subjectCode,this.SubjectDescription,this.subjectName)
  }
  formattedSubject:any=[]
  getSubjects(){
    this.loader=true
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
   
}
