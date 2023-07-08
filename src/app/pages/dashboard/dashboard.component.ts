import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
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
export class AppDashboardComponent {
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
      title: 'OEP Nigeria',
      
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/papanewguinea.png',
      title: 'OEP Papa New Guinea',
     
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/Uganda.png',
      title: 'OEP Uganda',
     
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/egypt.png',
      title: 'OEP Egypt',
      
    },
  ];

  constructor(
    private fileUploadService:FileUploadService,
    @Inject(DOCUMENT) private document:any
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
  OnChangeUpload(e:any){
    console.log(e)
    console.log(e.target.files[0])
    this.file = e.target.files[0]
    console.log("file upload clicked")
    this.loader=true
    try{
    this.fileUploadService.upload(this.file).subscribe((event:any)=>{
      this.loader=false
      console.log(event)
      if(typeof(event)=="object"){''
        this.shortLink = event.link
        console.log(this.shortLink)
        this.uploadError=''
      }else{
        this.loader=false
        this.uploadError = "Error Uploading files"
      }
    })
    }catch(e:any){
      this.loader = false
      this.uploadError = e
    }
  }
  shortLink:any
  UploadFile(){
  this.openModal('questionModal')
  }


  openModal(modalId:any){
    var modal = this.document.getElementById(modalId)
    modal.style.display="block"
  }
  closeModal(modalId:any){
    var modalClose = this.document.getElementById(modalId)
    modalClose.style.display="none"
  }
}
