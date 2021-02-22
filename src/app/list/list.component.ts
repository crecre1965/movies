import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { MovieModel } from '../models/movie.model';

import{MovieService} from '../movie.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  movies: Array<MovieModel>;
  results:Array<MovieModel>;
  isLoading:boolean;

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.movieService.getMoviesFromApi();
    this.movieService.movies$.subscribe(data =>{
                            this.movies=data;
                            this.isLoading=false;
                            } 
    
                        );
     this.movieService.search$.subscribe(data =>{ 
                          this.results=data;
                          this.isLoading=false;
                            }
                        );
                      }

  printImageSrc(movie:MovieModel):string{
    return  'https://image.tmdb.org/t/p/w500/' + movie.image;
  }

  loadNextMovies(){
    this.isLoading=true;
    this.movieService.getNextMoviesFromApi();
   
  }

  getListOpacity(){
    return this.isLoading?0.1:1;
  }


  searchMovies(searchText:string){
    console.log(searchText);
    if (searchText.trim().length<1){
      this.movieService.search$.next([]);
    }else{
      this.movieService.searchMovieFromApi(searchText);
    }
  }

  
  
}
