import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';

@Component({
    selector:'app-exam-configuration',
    templateUrl:'./exam-configurationdetails.component.html',
    styleUrls:['./exam-configurationdetails.component.scss']
})

export class ExamConfigurationComponent implements OnInit{
    ngOnInit(): void {
        
    }
    constructor(){
        
    }
}