import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.css']
})
export class ListMusicComponent implements OnInit {

  constructor(private router:Router, private musicSrv:MusicService) { }

  musicList:[]=[];

  ngOnInit() {
    this.musicSrv.getMusicList().then(r=>{
      console.log(r);
      this.musicList=r;
    }).catch(e=>{
      console.log(e);
    });
  }

  gotoHome(){
    this.router.navigate(['home']);
  }

}
