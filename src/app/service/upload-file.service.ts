import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import {FileUploader} from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:8083/str/upload',
    method: 'POST',
    itemAlias: 'file'
  });

  constructor(private httpClient:HttpClient) { }

  // uploadFile(file:File):Observable<HttpEvent<any>>{
  //   let formData=new FormData();
  //   formData.append('uploadedFile',file);
  //   let params =new HttpParams();
  //   const options = {
  //     params: params,
  //     reportProgress: true,
  //   };
  //   const req = new HttpRequest('POST', 'http://localhost:8083/str/upload', formData, options);
  //   // const req = new HttpRequest('POST', 'http://47.52.116.116:8081/api/upload', formData, options);
  //   return this.httpClient.request(req);
  // }

  uploadFile(uploader: FileUploader) {
    console.log('执行上传文件');
    // 上传
    uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = response;
        console.log(response);
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('上传失败');
      }
    };
    // onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any;
    uploader.queue[0].upload(); // 开始上传
    // this.uploader.queue[0].onSuccess()
    console.log('上传之后');
  }
}
