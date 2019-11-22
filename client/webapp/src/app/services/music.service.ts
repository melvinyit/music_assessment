import { Injectable } from '@angular/core';
import { country, user } from '../model/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  BASEURL:string='http://localhost:3000/api';
  GETCOUTRTIES:string='/countries';
  UPLOADMUSIC='/music/upload';

  constructor(private http:HttpClient) { }

  getCountries():Promise<any>{
    return this.http.get(this.BASEURL+this.GETCOUTRTIES).toPromise();
  }

  uploadMusic(formdata:FormData):Promise<any>{
    return this.http.post(this.BASEURL+this.UPLOADMUSIC,formdata).toPromise();
  }

  verifyUser(user:user){

  }

  getMusicList(){}

  getMusicById(id:number){

  }
}
