import { Injectable } from '@angular/core';
import * as env from '../environment'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestapiServiceService {

  constructor(
    private http:HttpClient
  ) { }



  getUserDetails(emailId:any){
    return this.http.get(env.environment.apiUrl+'User/getUser?email='+emailId)
  }

  createExam(ExamObj:any){
    return this.http.post(env.environment.apiUrl+'Exam/newExam',JSON.stringify(ExamObj))
  }

  getExamList(countryId:any){
    return this.http.get(env.environment.apiUrl+'Exam/exam_list?countryId='+countryId)
  }

  getSubjectList(){
    return this.http.get(env.environment.apiUrl+'Exam/get_subjects')
  }
}
