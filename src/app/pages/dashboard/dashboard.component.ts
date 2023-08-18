import { Component, ViewEncapsulation, ViewChild,OnInit } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { FileUploadService } from 'src/app/services/FileService/file.upload.service';
import {Inject} from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import { Router } from '@angular/router';
interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
}

// ecommerce card
interface CountryCards {
  id: number;
  imgSrc: string;
  title: string;
  
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Jr Associate',
    productName: 'OEP India'
   
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Volunteer',
    productName: 'OEP India'
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Volunteer',
    productName: 'OEP India'
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Lead QA',
    productName: 'OEP India'
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls:['./dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit{

  ngOnInit(): void {
    if(sessionStorage.getItem('UserDetails')!=undefined || sessionStorage.getItem('UserDetails')!=null){
      this.role = JSON.parse(String(sessionStorage.getItem('UserDetails'))).role
    }
      this.get_TotalWork()
  }
  role:any=''
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public yearlyChart!: Partial<yearlyChart> | any;
  public monthlyChart!: Partial<monthlyChart> | any;

  displayedColumns: string[] = ['assigned', 'name'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];

  // recent transaction
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Generated 1000 questions for Railways',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'Assigned For QA testing',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Uploaded a File For Submission',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'Received a File from Sunil',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'warning',
      subtext: 'Received a File from Nirav',
    },
  ];

  // ecommerce card
  countryCards: CountryCards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/Nigeria.png',
      title: 'Nigeria',
      
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/papanewguinea.png',
      title: 'Papa New Guinea',
     
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/Uganda.png',
      title: 'Uganda',
     
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/egypt.png',
      title: 'Egypt',
      
    },
  ];

  constructor(
    private fileUploadService:FileUploadService,
    @Inject(DOCUMENT) private document:any,
    private restApi:RestapiServiceService,
    private router:Router
  ) {
    // sales overview chart
    this.salesOverviewChart = {
      series: [
        {
          name: 'Eanings this month',
          data: [355, 390, 300, 350, 390, 180, 355, 390],
          color: '#5D87FF',
        },
        {
          name: 'Expense this month',
          data: [280, 250, 325, 215, 250, 310, 280, 250],
          color: '#49BEFF',
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [
          '16/08',
          '17/08',
          '18/08',
          '19/08',
          '20/08',
          '21/08',
          '22/08',
          '23/08',
        ],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    // yearly breakup chart
    this.yearlyChart = {
      series: [38, 40, 25],

      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 130,
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

    // mohtly earnings chart
    this.monthlyChart = {
      series: [
        {
          name: '',
          color: '#49BEFF',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }
  file:any
  loader:boolean=false
  DS_description:any
  uploadError:any
  uploadedfileName:any
  OnChangeUpload(e:any){
    console.log(e)
    console.log(e.target.files[0])
    this.file = e.target.files[0]
    this.uploadedfileName = e.target.files[0].name
    console.log("file upload clicked")
    this.loader=true
    try{
    this.fileUploadService.upload(this.file).subscribe((event:any)=>{
      this.loader=false
      console.log(event)
      if(event.Status){
        this.shortLink = event.data
      }else{
        this.loader=false
        this.dsError=event.message
      }
    })
    }catch(e:any){
      this.loader = false
      this.dsError = e
    }
  }
  shortLink:any
  UploadFile(){
    if(this.shortLink==null || this.shortLink==undefined|| this.shortLink==''){
      this.dsError = "Upload Files cannot be empty!!"
    }else{
this.dsError = ""
    
  this.openModal('questionModal')
  this.getExamList()
    }
  }


  openModal(modalId:any){
    var modal = this.document.getElementById(modalId)
    modal.style.display="block"
  }
  closeModal(modalId:any){
    var modalClose = this.document.getElementById(modalId)
    modalClose.style.display="none"
  }
examList:any
  getExamList(){
    // this.loader=true
    this.restApi.getExamList(JSON.parse(String(sessionStorage.getItem("UserDetails"))).Organization.CountryCode.id).subscribe((res:any)=>{
      // this.loader=false
      if (res.Success){
        this.examList = res.data
      }else{
        let nodata={
          "ExamName":"No Exams Found",
          "ExamDescription":"",
          "class":[]
        }
        this.examList = [nodata]
      }
    })
  }
  dsError:any
validateupload(){
  let validate=false
  if(this.shortLink==null|| this.shortLink==undefined){
    this.dsError = "Please upload a valid file"
  }else if(this.examselect == undefined || this.examselect == ''){
    this.uploadError = "Please Select Exam"
  }else if(this.dsType == undefined || this.dsType==''){
    this.uploadError = "Please select Type of datasource"
  }else if(this.dsType!='mock_test' &&( this.qtype == undefined || this.qtype == '')){
    this.uploadError ="Please select Type of Questions in the Uploded data source"
  }else if(this.dsFormat == undefined || this.dsFormat == ''){
    this.uploadError = "Please select Format of data source"
  }else if(this.dsFormat=='pdf' && (this.templateSelected==undefined || this.templateSelected==null)){
    this.uploadError = "Please Select a template"
  }else if(this.dsFormat == 'pdf' && (this.startPage==undefined || this.startPage==null || this.startPage=='')){
    this.uploadError = "Start Page is Empty"
  }else if(this.dsFormat == 'pdf' && (this.endPage==undefined || this.endPage == null || this.endPage == '')){
    this.uploadError = "End Page is Empty"
  }
  else{
    this.uploadError=''
    validate=true
  }
  return validate
}

examId:any
examSubMap:any
  OnSubmitDS(){
   let validateDatasource = this.validateupload()
   if(validateDatasource){
     this.examId = JSON.parse(this.examselect).id
     this.loader=true
    this.restApi.getExamSubMap(this.examId).subscribe((res:any)=>{
      console.log(res)
      this.loader=false
      if(res.Status){
this.examSubMap = res.data
      }
      let final_submit_upload={
        "ExamSubId":this.examSubMap,
        "dataSourceType":this.dsFormat,
        "datasourceName":this.shortLink.split('/')[this.shortLink.split('/').length-1],
        "fileurl":this.shortLink,
        "uploadedBy":JSON.parse(String(sessionStorage.getItem('UserDetails'))).id
      }
      this.loader=true
      this.restApi.parseDSOEP(final_submit_upload).subscribe((resupload:any)=>{
        console.log(resupload)
        this.loader=false
        // "Status":True,"data":json.dump({"oep_ds":oep_ds_doc.id,"parse_ds":{"Status":True,"data":parsed_ds_doc.id,"message":"Success"}}),"message":"Sucess"
        // "ExamId":"",
        // "datasourceId":"",
        // "datasourceType":"",
        // "parsedDatasourceId":""
        // {"Status":True,"data":oep_ds_doc.id,"message":"Sucess"}
        if (resupload.Status){
          let filetype = this.dsFormat
          let fileurl = this.shortLink
          this.loader=true
          // "StartPage":this.startPage,
          // "endPage":this.endPage
          if(this.dsFormat=='pdf'){

          this.restApi.parsepdf(fileurl,filetype,this.startPage,this.endPage,this.templateSelected).subscribe((resparse:any)=>{
            this.loader=false
            console.log(resparse)
            // {"Status":True,"data":parsed_ds_master.id,"message":"Success"}
            if (resparse.Status){
              let final_submit_return = resupload
              var DsTypeMap ={
                "ExamId":this.examId,
                "datasourceId":final_submit_return.data,
                "datasourceType":this.dsType,
                "parsedDatasourceId":resparse.data,
                "SubjectId":this.dsType!='mock_test'?this.selectedSubject.subjectId:'',
                "ChapterId":this.dsType=='chapter_wise'?this.selectedChapters.id:''
              }
              // if(this.dsType == 'chapter_wise' || this.dsType=='subject_wise'){
              //   DsTypeMap.SubjectId = this.selectedSubject.subjectId
              // }
              this.loader=true
              this.restApi.PostDsTypeMap(DsTypeMap).subscribe((resdsType:any)=>{
                this.loader=false
                console.log(resdsType)
                if(resdsType.Status){
                  alert(resdsType.message)
                  this.clearModalFields()
                }else{
                  alert(resdsType.message)
                }
              })
            }
          })
        }else{
          let body ={
            file_url:this.shortLink,
            ds_type:this.dsFormat,
            file_type:filetype
          }
          this.loader=true
          this.restApi.PostJSONExcel(body).subscribe((res_:any)=>{
            this.loader=false
            console.log(res_)
            if(res_.Status){
              let final_submit_return = resupload
              var DsTypeMap={
                "ExamId":this.examId,
                "datasourceId":final_submit_return.data,
                "datasourceType":this.dsType,
                "parsedDatasourceId":res_.data,
                "SubjectId":this.dsType!='mock_test'?this.selectedSubject.subjectId:'',
                "ChapterId":this.dsType=='chapter_wise'?this.selectedChapters.id:''
              }
              this.loader=true
              this.restApi.PostDsTypeMap(DsTypeMap).subscribe((res_ds_type:any)=>{
                this.loader=false
                if(res_ds_type.Status){
                  alert(res_ds_type.message)
                }else{
                  alert(res_ds_type.message)
                }
              })
            }

          })
        }
      }})
    })
    //call upload module and parsing logic
    // let OEP_DS_data = {
    //   "ExamSubMapId"
    // }
    // this.restApi.parseDSOEP()
   }
  }

  clearModalFields(){
    this.modalNext = 'configSelection'
    this.dsType=''
    this.examselect=''
    this.examId=''
    this.qtype=''
    this.dsFormat=''
    this.selectedChapters=''
    this.selectedSubject=''
    this.templateSelected=''
  }
dsType:any
examselect:any
qtype:any
dsFormat:any
selectedChapters:any
selectedSubject:any
  Onselectopt(e:any){
    console.log(e)
    if(e.target.id == "dsType"){
      console.log(e.target.selectedOptions[0].value)
      this.dsType = e.target.selectedOptions[0].value
    }
    else if(e.target.id == "examselect"){
      this.examselect = e.target.selectedOptions[0].value
      console.log(this.examselect)
      this.examId = JSON.parse(this.examselect).id
      this.getSubjectsExam(this.examId)
    }else if(e.target.id=="qtype"){
      this.qtype =  e.target.selectedOptions[0].value 
    }else if(e.target.id == "dsFormat"){
      this.dsFormat = e.target.selectedOptions[0].value 
    }else if(e.target.id=="chapter_select"){
this.selectedChapters = JSON.parse(e.target.selectedOptions[0].value)
    }else if(e.target.id=="subject_select"){
      this.selectedSubject = JSON.parse(e.target.selectedOptions[0].value)
      this.getChapterListSubject(this.selectedSubject,this.examId)

    }
    console.log(this.dsType,this.dsFormat,this.qtype,this.examselect,this.selectedSubject)
  }

  formatJSONToString(jsonObj:any){
    return JSON.stringify(jsonObj)
  }
  startPage:any
  endPage:any
  ChapterList:any
getChapterListSubject(subject:any,exam:any){
  let body = {
    ExamId:exam,
    SubjectId:subject.subjectId
  }
  console.log(body)
  this.restApi.getChaptersForExam(body).subscribe((res:any)=>{
    console.log(res)
    if(res.Status){
this.ChapterList = JSON.parse(res.data)
    }else{
      this.ChapterList=[{ChapterName:'No Data Found'}]
    }
  })
}

  OnInsertStartPage(e:any,field:any){
    if (field=='startpage'){
      this.startPage = e.target.value
    }
    if (field == 'endpage'){
      this.endPage = e.target.value
    }
  }

  get_TotalWork(){
    let userId = JSON.parse(String(sessionStorage.getItem("UserDetails"))).id
    this.loader=true
    this.restApi.get_dash_analytics(userId).subscribe((res:any)=>{
      this.loader=false
      console.log(res)
      this.yearlyChart.series=[JSON.parse(res.data).manualUpload,JSON.parse(res.data).ai_generated]
    })
  }
  modalNext:any='configSelection'
  Next(){
  
    this.modalNext = 'templateSelection'
   
  }

  templateSelected:any
  OnSelectTemplate(e:any){
    console.log(e)
    this.templateSelected = e.target.value
  }
  goBack(){
    this.modalNext = 'configSelection'
  }
SubjectsForExam:any=[]
  getSubjectsExam(examId:any){
    this.restApi.getSubjectsForExam(examId).subscribe((res:any)=>{
      console.log(res)
      if(res.Status){
        this.SubjectsForExam = JSON.parse(res.data).Subjects
      }
    })
  }

  openTeams(){
    this.router.navigate(['/oep/teams/<id>'])
  }
}

