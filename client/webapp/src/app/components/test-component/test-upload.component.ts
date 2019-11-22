import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { TestConnectService } from 'src/app/services/test-connect.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.css']
})
export class TestUploadComponent implements OnInit {

  @ViewChild('imageFile', { static: false })
  imageFile: ElementRef;
  @ViewChild('imageFileReactive', { static: false })
  imageFileReactive: ElementRef;

  constructor(private srv:TestConnectService, private fb:FormBuilder) { } 

 reactiveForm:FormGroup= this.fb.group({
   testInput:['test'],
   testFile:['']
 });

  ngOnInit() {
  }

  testUpload(form:NgForm){
    console.log(form.value);
    // multipart/form-data
    const formData = new FormData();
    // normal non file files
    console.log('1');
    formData.set('comments', form.value['comments']);
    // file
    console.log('2');
    formData.set('fileFieldName', this.imageFile.nativeElement.files[0]);
    console.log('3');
    this.srv.testUpload(formData).then(r=>console.log('template:',r)).catch(e=>console.log('template:',e));
  }

  testUploadReactive(){
    console.log('reactive testing');
    console.log(this.reactiveForm.value);
    const formData = new FormData();
    formData.set('comments', this.reactiveForm.value['testInput']);
    formData.set('fileFieldName', this.imageFileReactive.nativeElement.files[0]);
    this.srv.testUpload(formData).then(r=>console.log('reactive:',r)).catch(e=>console.log('reactive:',e));

  }
}
