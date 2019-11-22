import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService } from '../services/music.service';
import { music } from '../model/model';

@Component({
  selector: 'app-display-music',
  templateUrl: './display-music.component.html',
  styleUrls: ['./display-music.component.css']
})
export class DisplayMusicComponent implements OnInit {

  constructor(private router:Router,private musicSrv:MusicService, private ar:ActivatedRoute) { }

  userid:string = '';
  musicid:number = -1;
  musicObj:music = { title:'',checkout_limit:-1,country_code:'SG'};

  ngOnInit() {
    this.userid=this.ar.snapshot.params.userid;
    this.musicid=this.ar.snapshot.params.musicid;
    //console.log('userid',this.userid,'musicid',this.musicid);
    this.musicSrv.getMusicById(this.musicid).then(r=>{
      this.musicObj=r;
      //console.log(this.musicObj);
    }).catch(e=>{
      console.log(e);
    });
  }

  uncheckMusic(){
    this.musicSrv.uncheckMusic(this.userid,this.musicid).then(r=>{
      //console.log(r);
      this.router.navigate(['checkout/music/'+this.userid]);
    }).catch(e=>{
      console.log(e);
    });
  }  


}
