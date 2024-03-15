import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenApiService } from '../token-api.service';
import { Recipe } from '../types/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  currentRecipeInfo: Recipe | undefined = undefined;

  constructor(private route: ActivatedRoute, private tokenService: TokenApiService, private router: Router) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params["id"];

    this.tokenService.getOne(id).subscribe(data => {
      this.currentRecipeInfo = data;
    })


  }

  update(title: string, readyIn: string, ingredients: string, serves: string, image: string, description: string): void {

    const recipeId = this.route.snapshot.params["id"];

    this.tokenService.update(title, readyIn, ingredients, serves, image, description, recipeId).subscribe(data => {
      if (data.error) {
        console.log(data.error)
        return;
      } else {
        this.router.navigate([`/details/${recipeId}`]);
      }
    })
  }

}
