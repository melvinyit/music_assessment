export interface user {
    user_id?:string,
    username:string
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
    lyric?:string,
    checkout_limit:number,
    country_code:string,
    country_image_url?:string,
    current_checkout?:number,
    total_played?:number
}

export interface checkout{
    user_id:string,
    music_id:number,
    timestamp?:number
}

export interface response{
    msg:string,
    error?:string
}