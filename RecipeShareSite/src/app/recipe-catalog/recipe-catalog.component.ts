import { Component, OnInit } from '@angular/core';
import { TokenApiService } from '../token-api.service';
import { Recipe } from '../types/recipe';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.css']
})
export class RecipeCatalogComponent implements OnInit {

  allRecipes: Recipe[] = [];

  constructor(private tokenApiService: TokenApiService, private userService: UserApiService) { }

  user = this.userService.userInfo()

  ngOnInit(): void {
    this.tokenApiService.getAll().subscribe(data => {
      this.allRecipes = data
      console.log(this.allRecipes);
    })
  }
}
