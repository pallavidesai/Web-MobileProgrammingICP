import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      fetch('https://api.edamam.com/search?q=chicken&app_id=$0efb796e&app_key=$16f7f2cc21d02b938105750e7facf2f6&from=0&to=3&health=alcohol-free')
    .then(function() {
        alert("Pallavi");
    })
    .catch(function() {
        alert("Desai");
    });
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get place
       */
      fetch('https://api.foursquare.com/v2/venues/explore?client_id=O4QK2SR0F4BNE434MZG1OUVK4OJ35FHBF11JG2GG5SDTJIHO&client_secret=T4T3AMA0UFA3LOLCMDFADS4DSWXSIWPTFGJMRTCYWGSCC5U4&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then(function() {
       
    })
    .catch(function() {
       
    });
    }
  }
}
