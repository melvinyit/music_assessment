import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private fb:FormBuilder) { }

  loginForm:FormGroup= this.fb.group({
    name:['fred',Validators.required]
  });
  
  ngOnInit() {
  }

  gotoUpload(){
    this.router.navigate(['upload']);
  }

  gotoList(){
    this.router.navigate(['list/musics']);
  }

}
