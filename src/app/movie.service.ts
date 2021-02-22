import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{map} from 'rxjs/operators';
import {MovieModel} from  './models/movie.model';
import{environment} from '../environments/environment';
import { VideoModel } from './models/video-model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private API_URL = environment.TMDB_API_URL;
  private API_KEY = environment.TMDB_API_KEYS;
  currentPage:number=1;
// /discover/movie?api_key=efdeb661aaa006b1e4f36f990a5fd8fd&language=fr';

  movies$ = new BehaviorSubject([]);
  search$=new BehaviorSubject([]);
  video$=new BehaviorSubject([]);

  // Faire une requete HTTP à l'api theMovieDB pour récupérer
  // une suggestion de films (un tableau d'objets movie JSON)
  /*
  ** Pour effecutuer une requête HTTP, on a besoin de l'objet de la class HttpClient
  	 	> On crée donc une instance de HttpClient
  		> on peut alors utiliser ses méthodes (.get(), .post(), .put(), .delete())
        > Pour cela on va injecter http:HttpClient dans notre component
        (https://angular.io/guide/http)
  */
  /*
    Principe de l'injection de dépendance proposée par Angular (D.I)
    permet de récupérer un membre de notre class qui est une instance d'une autre class
    (https://angular.io/guide/dependency-injection)
  */

  constructor(private http:HttpClient) {  }
  
  getMoviesFromApi() {
    console.log(" ===> getMovies : ")

    
  const params= new HttpParams({fromObject :{
      api_key: this.API_KEY,
      language:'fr',
      page:this.currentPage.toString() 
                                           }
                              });



    this.http.get(this.API_URL + '/discover/movie',{params})
              .pipe( 
                map((data:any) => data.results.map(
                                        movie => new MovieModel(movie.id,
                                                                movie.title, 
                                                                movie.overview, 
                                                                movie.backdrop_path, 
                                                                movie.release_date,
                                                                movie.vote_average,
                                                                movie.video
                                                                )
                                              )
                 )
              )
              .subscribe(response => {
                              console.log(response);
                              let movies = this.movies$.getValue();
                              this.movies$.next([...movies, ...response]);
                                     }         
                        )
  } 
  


// page suivante
  getNextMoviesFromApi(){
    this.currentPage++;
    this.getMoviesFromApi();
  }


  searchMovieFromApi(searchText){
    console.log(" ===> search Movie : ")

    
    const params= new HttpParams({fromObject :{
        api_key: this.API_KEY,
        language:'fr',
        query:searchText
                                             }
                                });
  
  
  
      this.http.get(this.API_URL + '/search/movie',{params})
                .pipe( 
                  map((data:any) => data.results.map(
                                          movie => new MovieModel(movie.id,
                                                                  movie.title, 
                                                                  movie.overview, 
                                                                  movie.backdrop_path, 
                                                                  movie.release_date,
                                                                  movie.vote_average,
                                                                  movie.video
                                                                  )
                                                )
                   )
                )
                .subscribe(response => {
                                console.log(response);
                                this.search$.next(response);
                                       }         
                          )
    } 


// get video
    getVideo(movieId:number){
      console.log(" ===> get Video : ")
  
      
      const params= new HttpParams({fromObject :{
          api_key: this.API_KEY,
          language:'fr'
                                               }
                                  });
    
    
    
        this.http.get(this.API_URL + '/movie/'+movieId + '/videos',{params})
                  .pipe( 
                    map((data:any) => data.results.map(
                                            movie => new VideoModel(movie.key,
                                                                    movie.site
                                                                  )
                                                     )
                     )
                   )
                  .subscribe(response => {
                                  console.log(response);
                                  let videos = this.movies$.getValue();
                                  this.video$.next(response);
                                         }         
                            )
    
      
      console.log("==> video lue : " + this.video$.getValue);
    } 
        
      
  }


