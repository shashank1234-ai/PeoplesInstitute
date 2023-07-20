import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environment';
import * as JSZip from 'jszip';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
 constructor(
    private http:HttpClient
  ) { }

  // upload(file:any):Observable<any>{
  //   const formData = new FormData();
  //   formData.append("file",file,file.name)
  //   return this.http.post(this.baseuri,formData)
  // }

  upload(file:any){
    const formData = new FormData();
    formData.append('pdf',file as Blob);
    return this.http.post(environment.apiUrl+'Upload/upload_to_bucket',formData)
  }

convertImageToBase64(file:any){
  try{
    const reader = new FileReader();
    var base64String:any=''
    // reader.onload = this.handleReaderLoaded.bind(this)
    // reader.readAsBinaryString(file)
    // return reader
    reader.onloadend = () => {
      base64String = reader.result
    }
    return base64String
  }catch(e:any){
    console.log(e)
  }
}

convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
handleReaderLoaded(e:any){
  let base64String = 'data:image/png;base64,'+btoa(e.target.result)
  return base64String
}
  createDatasourceMaster(body:any){
    
  }


  uploadZipfile(files:File){
    const formData = new FormData();
    formData.append('pdf',files as Blob)
    return this.http.post(environment.apiUrl+'Upload/UploadZIPFiles',formData)
  }

  // getFileUploadStatus(file:any){
  //   // fetch the file status on upload
  //   let headers = new HttpHeaders({
  //     "size": file.selectedFile.size.toString(),
  //     "x-file-id": file.fileId,
  //     'name': file.fileName
  //   });

  //  return this.http
  //     .get("http://localhost:3000/status", { headers: headers })
  // }

}
