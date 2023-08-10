import {Component ,Inject,OnInit } from '@angular/core';
import { RestapiServiceService } from 'src/app/services/restapi.service.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router'; 
@Component({
    selector:'app-create-post',
    templateUrl:'./create-post.component.html',
    styleUrls:['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit{
    public Editor = ClassicEditor;
constructor(
    @Inject(DOCUMENT) private document:any,
    private restAPI:RestapiServiceService,
    private router:Router
){

}
    ngOnInit(): void {
        // this.makeDefaultSwitchOff()
        this.getExamList()
    }
    blogTitle:any
    onChageTitle(event:any){
        console.log(event)
        this.blogTitle = event.target.value
    }
    editorData:any=""
    subjectName:any=""
    onselectSubject(e:any){
        this.subjectName = JSON.parse(e.target.value).subject
    }
    
    blogDescription:any=""
    onChangeDescription(e:any){
        this.blogDescription = e.target.value
    }

    onCreatePost(e:any){
        console.log(e)
        console.log(this.editorData)
        let body ={
            'ExamName':this.examSelected,
            'Subject':this.subjectName,
            'createdBy':JSON.parse(String(sessionStorage.getItem('UserDetails'))).id,
            'title':this.blogTitle,
            'blog_data':this.editorData,
            'description':this.blogDescription
        }
        this.loader=true
        this.restAPI.CreatePost(body).subscribe((res:any)=>{
            this.loader=false
            console.log(res)
        })
    }

    onChagePost(e:any){
        console.log(this.editorData)
    }
    makeDefaultSwitchOff(){
        var switch_class = this.document.getElementsByClassName("switch")
        console.log(this.document.getElementById("switch"))
        // console.log(switch_class[0].childNodes[0])
        switch_class[0].childNodes[0].checked=false
    }
// createVideo:boolean = false

sentences:any=[]
createVideo:boolean=false
createVideoError:any=""
    Switch(e:any){
        if(this.editorData==""|| this.editorData==undefined || this.editorData==null){
            e.target.checked=false
            this.createVideoError="Please write a blog first"
        }else{
        // open a modal
            console.log(e.target.checked)
            this.createVideo=e.target.checked
            this.createVideoError=""
            this.sentences = this.editorData.split('.')
            console.log(this.sentences)
            // this.openModal('videoId')
            this.createVideoApi()
            // this.SummarizeBlog(this.editorData  )
        }
    }
    loader:boolean=false
SummarizeBlog(text:any){
    console.log(text)
    this.loader=true
    let body={
        'blog_data':text
    }
    this.restAPI.getSummarizedText(body).subscribe((res:any)=>{
        this.loader=false
        console.log(res)
    })
}

onUploadImage(e:any,idx:any){
    console.log(e,idx)
}

generateVideo(){
    console.log("Generate video Clicked")
}

closeModal(id:any){
    let modal = this.document.getElementById(id)
    modal.style.display='none'
}

openModal(id:any){
    let modal = this.document.getElementById(id)
    modal.style.display='block'
}
OnClickGenerateVideo(){
    
}
examList:any
getExamList(){
    // this.loader=true
    this.restAPI.getExamList(JSON.parse(String(sessionStorage.getItem("UserDetails"))).Organization.CountryCode.id).subscribe((res:any)=>{
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
  formatJSONToString(jsonObj:any){
    return JSON.stringify(jsonObj)
  }

  createVideoApi(){
    let body ={
        'blog_data':this.editorData,
        'exam':this.examSelected,
        'title':this.blogTitle
    }
    console.log(body)
    this.loader=true
    this.restAPI.CreateVideo(body).subscribe((res:any)=>{
        this.loader=false
        if(res.Status){
            this.clearData()
        }else{
            alert(res.message)
        }
        console.log(res)
    })
  }
  clearData(){
    this.editorData="",
    this.examSelected="",
    this.blogTitle="",
    this.blogDescription=""
  }
  examSelected:any
  onSelectExam(e:any){
    console.log(e)
    this.examSelected=JSON.parse(e.target.value).ExamName
  }
}

