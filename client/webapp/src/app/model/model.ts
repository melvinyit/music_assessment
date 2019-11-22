export interface user {
    user_id:string,
    name:string
}

export interface country{
    country_code:string,
    country_name:string,
    image_url?:string
}

export interface music{
    music_id?:number,
    title:string,
    mp3url?:string,
    lyric:string,
    limit:number,
    country_code:string
}

export interface checkout{
    user_id:string,
    music_id:number,
    timestamp?:number
}