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


headers:any={"ngrok-skip-browser-warning":"69420"}
  getUserDetails(emailId:any){
    // let headers = new Headers()
    // headers.append("ngrok-skip-browser-warning","69420")
    return this.http.get(env.environment.apiUrl+'User/getUser?email='+emailId,{headers:this.headers})
  }

  createExam(ExamObj:any){
    return this.http.post(env.environment.apiUrl+'Exam/newExam',JSON.stringify(ExamObj))
  }

  getExamList(countryId:any){
    return this.http.get(env.environment.apiUrl+'Exam/exam_list?countryId='+countryId,{headers:this.headers})
  }

  getSubjectList(){
    return this.http.get(env.environment.apiUrl+'Exam/get_subjects',{headers:this.headers})
  }

  createExamSubjectMapping(body:any){
    return this.http.post(env.environment.apiUrl+'Exam/create_exam_sub_map',body)
  }

  createnewSubject(body:any){
    return this.http.post(env.environment.apiUrl+'Subject/create_subject',body)
  }

  getSubjectsForExam(examId:any){
    return this.http.get(env.environment.apiUrl+'Subject/get_sub_exam?examId='+examId,{headers:this.headers})
  }

  parseDSOEP(body:any){
    return this.http.post(env.environment.apiUrl+'Datasource/insert_OEP_DS_master',body)
  }

  getExamSubMap(examId:any){
    return this.http.get(env.environment.apiUrl+'Exam/get_exam_sub_map?examId='+examId,{headers:this.headers})
  }

  PostDsTypeMap(data:any){
    return this.http.post(env.environment.apiUrl+'Datasource/ds_type_mapping',data)
  }

  parsepdf(fileurl:any,fileType:any,startpage:any,endpage:any,template:any){
   return this.http.get(env.environment.apiUrl+'Datasource/parse_ds?file_url='+fileurl+'&file_type='+fileType+'&startPage='+startpage+'&endPage='+endpage+'&template='+template,{headers:this.headers})
  }

  getMyWork(UserId:any){
    return this.http.get(env.environment.apiUrl+'Work/get_ds_master_user?UserId='+UserId,{headers:this.headers})
  }

  updateDSVerified(body:any){
    return this.http.post(env.environment.apiUrl+'Datasource/ds_update',body)
  }
  

  get_dash_analytics(UserId:any){
    return this.http.get(env.environment.apiUrl+'Dash/get_total_work?UserId='+UserId,{headers:this.headers})
  }

  createSubjectSectionConfiguration(body:any){
    return this.http.post(env.environment.apiUrl+'SubjectSectionconf/crete_sub_sec_conf',body)
  }

  getSubjectSectionDSForVerify(UserId:any){
    return this.http.get(env.environment.apiUrl+'SubjectSectionconf/get_sub_sec_parsed?UserId='+UserId,{headers:this.headers})
  }

  getSubjectsSectionConfig(examId:any){
    return this.http.get(env.environment.apiUrl+'SubjectSectionconf/get_sub_sec_config?ExamId='+examId,{headers:this.headers})
  }

  getSummarizedText(body:any){
    return this.http.post(env.environment.apiUrl+'VideoCreation/summarize_text_for_video',body)
  }

  CreateVideo(body:any){
    return this.http.post(env.environment.apiUrl+'VideoCreation/create_video',body)
  }

  CreatePost(body:any){
    return this.http.post(env.environment.apiUrl+'Posts/create_post',body)
  }

  getPosts(body:any){
    return this.http.post(env.environment.apiUrl+'Posts/get_posts',body)
  }

  getChaptersForExam(body:any){
    return this.http.post(env.environment.apiUrl+'Subject/get_chapter_sub_exam',body)
  }

  UpsertChapter(body:any){
    return this.http.post(env.environment.apiUrl+'Subject/upsert_chapter',body)
  }

  deleteChapter(body:any){
    return this.http.post(env.environment.apiUrl+'Subject/delete_chapter',body)
  }

  PostJSONExcel(body:any){
    return this.http.post(env.environment.apiUrl+'Datasource/parse_ds_json_excel',body)
  }

  uploadSolutionImage(body:any){
    return this.http.post(env.environment.apiUrl+'Work/upload_solution',body)
  }

  partialUpdateDs(body:any){
    return this.http.post(env.environment.apiUrl+'Datasource/update_partial_work',body)
  }
}
