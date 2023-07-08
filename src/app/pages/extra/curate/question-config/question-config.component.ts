import { Component,Inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
    selector:'app-question-config',
    templateUrl:'./question-config.component.html',
    styleUrls:['./question-config.component.scss']
})

export class QuestionConfigComponent implements OnInit{
    constructor(private router:Router, @Inject(DOCUMENT) private document:any){
        
    }
Exam:any=''
NoOfQs:any
DifficultyLevel:any
TypesOfQs:any
ChapterList:any=['chapter1','chapter2','chapter3']
    ngOnInit(): void {
        this.Exam = sessionStorage.getItem('ExamNameForQs')
    }

    navigate(page:any){
        this.router.navigate([page])
    }

    openModal(modalname:any){
        var modal = this.document.getElementById(modalname)
        modal.style.display='block'
    }

    closeModal(modal:any){
        var modal = this.document.getElementById(modal)
        modal.style.display='none'
    }
    
}