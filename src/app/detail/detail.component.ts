import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoModel } from '../models/video-model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  movieId:number;
  movie;
  type;
  videos: Array<VideoModel>;
  videoALire: VideoModel;
  videoYouTube:string;
  youTubeSource:string;
  // injection d'un objet de la classe ActivatedRoute
  constructor(
      private route: ActivatedRoute,
      private movieService:MovieService,
      private router:Router
      ) { }

  ngOnInit(): void {
    console.log("==> detail component nbOnInit");
    this.movieId=this.route.snapshot.params.id;
    this.type= this.route.snapshot.params.type;

    if (this.type=='movies'){
    this.movie= this.movieService.movies$.getValue().find(movie =>movie.id==this.movieId);
    } else {
      this.movie= this.movieService.search$.getValue().find(movie =>movie.id==this.movieId);
    }
   
   console.log("==> movie : "  + this.movieId);
   console.log(this.movie);
    //récuoérer les informations du film
    this.movieService.getVideo(this.movieId);
    this.movieService.video$.subscribe(data =>{
                             this.videos=data;}
      )
      console.log("==> debut table videos - nb poste  " + this.videos.length);
      for (let index = 0; index < this.videos.length; index++) {
        let videoALire = this.videos[index];
        console.log( index + " video id : " + videoALire.videoId + "/ site : "  + videoALire.videoSite) ;
      }
      console.log("==> fin table videos ");
      if (this.videos.length > 0){
         this.videoYouTube = this.videos[0].videoId;
      }else{
        this.videoYouTube = "KOXV-7Zo-yA";
    }
   console.log("video youtyube : " + this.videoYouTube);  
   this.youTubeSource= "'https://www.youtube.com/embed/" + this.videoYouTube + "'";
   console.log ("==> url : " + this.youTubeSource) ;  
  }


  
  goToRootPage(){
    this.movieService.search$.next([]);
    this.router.navigate(['/']);
  }


}
