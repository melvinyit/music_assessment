import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private fb:FormBuilder, private musicSrv:MusicService) { }

  loginForm:FormGroup= this.fb.group({
    name:['fred',Validators.required]
  });
  errMsg:string='';
  
  ngOnInit() {
  }

  gotoUpload(){
    this.router.navigate(['upload']);
  }

  gotoList(){
    this.router.navigate(['list/music']);
  }

  gotoCheckout(){
    this.musicSrv.verifyUser({username:this.loginForm.value.name}).then(r=>{
      //console.log(r);
      this.router.navigate(['checkout/music/'+r.user_id]);
    }).catch(e=>{
      console.log(e);
      this.errMsg=e.error.error;
    });
  }

}
