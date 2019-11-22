import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TestConnectService {

  constructor(private http:HttpClient) { }

  testUpload(formData: FormData){
    console.log('firing to api')
    return (this.http.post<any>('http://localhost:3000/test/uploadobject', formData).toPromise());
  }

}
