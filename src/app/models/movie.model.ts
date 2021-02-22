
    export class MovieModel {
    id:number;
    title: string;
    desc: string;
    image: string;
    date: Date;
    score: number;
    video:boolean;
    
    constructor(id:number,title:string, overview:string, backdrop:string, release_date:string, vote_average:number,video:boolean) {
        this.id=id;
        this.title=title;
        this.date=new Date(release_date);
        this.desc=overview;
        this.image=backdrop;
        this.score=vote_average;
        this.video=video;
    }
}
// interface MovieModel {
    
//         title: string;
//         desc: string;
//         image: string;
//         duration: number;
        
//     }