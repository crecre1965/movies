
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-app';


  
  constructor(){
    console.log ("==> début");
    console.log(this);
    console.log ("==> fin");
    
  }
}
