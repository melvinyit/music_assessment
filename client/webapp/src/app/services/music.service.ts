import { Injectable } from '@angular/core';
import { country, user } from '../model/model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  BASEURL:string='http://localhost:3000/api';
  GETCOUTRTIES:string='/countries';
  UPLOADMUSIC='/music/upload';
  GETUSER='/user';
  GETMUSICLIST='/music/list';
  CHECKOUTMUSIC='/music/checkout';
  UNCHECKMUSIC='/music/uncheck';

  constructor(private http:HttpClient) { }

  //return promise country
  getCountries():Promise<any>{
    return this.http.get(this.BASEURL+this.GETCOUTRTIES).toPromise();
  }

  //return promise response
  uploadMusic(formdata:FormData):Promise<any>{
    return this.http.post(this.BASEURL+this.UPLOADMUSIC,formdata).toPromise();
  }

  //need to change to post to hide user name
  //return promise user
  verifyUser(user:user):Promise<any>{
    return this.http.get(this.BASEURL+this.GETUSER+'/'+user.username).toPromise();
  }

  getMusicList():Promise<any>{
    return this.http.get(this.BASEURL+this.GETMUSICLIST).toPromise();
  }

  checkoutMusic(userid:string,musicid:number):Promise<any>{
    return this.http.post(this.BASEURL+this.CHECKOUTMUSIC,{userid,musicid}).toPromise();
  }

  uncheckMusic(userid:string,musicid:number):Promise<any>{
    return this.http.post(this.BASEURL+this.UNCHECKMUSIC,{userid,musicid}).toPromise();
  }
  getMusicById(id:number){

  }
}
