import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-checkout-music',
  templateUrl: './checkout-music.component.html',
  styleUrls: ['./checkout-music.component.css']
})
export class CheckoutMusicComponent implements OnInit {

  constructor(private router:Router,private musicSrv:MusicService, private ar:ActivatedRoute) { }

  userid:string='';
  musicList:[]=[];

  ngOnInit() {
    this.userid=this.ar.snapshot.params.userid;
    
    this.musicSrv.getMusicList().then(r=>{
      this.musicList=r;
      //console.log(this.musicList);
    }).catch(e=>{
      console.log(e);
    });
    //console.log('userid',this.userid);
  }

  gotoHome(){
    this.router.navigate(['home']);
  }

  //need to find a way to pass params to next time
  displayMusic(musicid:number){
    //console.log('retriving music for user');
    this.musicSrv.checkoutMusic(this.userid,musicid).then(r=>{
      //console.log(r);
      this.router.navigate(['/display/user/'+this.userid+'/music/'+musicid]);
    }).catch(e=>{
      console.log(e);
    });
    
  }

}
