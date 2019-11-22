import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { country } from '../model/model';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.css']
})
export class UploadMusicComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder, private musicSrv:MusicService) { }

  @ViewChild('mp3File', { static: false })
  mp3File: ElementRef;

  countries:country[]=[{country_code:'SG',country_name:'Singapore'}];
  limitArray:number[]=[1,2,3,4,5,6,7,8,9,10];

  uploadForm:FormGroup=this.fb.group({
    title:['a',Validators.required],
    country:['SG',Validators.required],
    limit:['3',Validators.required],
    lyric:['test'],
    mp3:['',Validators.required]
  });

  ngOnInit() {
    this.musicSrv.getCountries().then(r=>this.countries=r).catch(e=>console.log(e));
  }

  onUpload(){
    console.log(this.uploadForm.value);
    const formData = new FormData();
    formData.set('title', this.uploadForm.value['title']);
    formData.set('country_code', this.uploadForm.value['country']);
    formData.set('checkout_limit', this.uploadForm.value['limit']);
    formData.set('lyric', this.uploadForm.value['lyric']);
    formData.set('mp3File', this.mp3File.nativeElement.files[0]);
    this.musicSrv.uploadMusic(formData).then(r=>{
      console.log(r);
      this.router.navigate(['result',{msg:'success add song'}]);
    }).catch(e=>{
      console.log(e);
      this.router.navigate(['result',{msg:'fail add song'}]);
    });
    
  }

}
