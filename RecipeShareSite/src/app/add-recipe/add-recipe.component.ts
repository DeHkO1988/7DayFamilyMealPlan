import { Component } from '@angular/core';
import { TokenApiService } from '../token-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  constructor(private tokenService: TokenApiService, private router: Router) { }

  create(title: string, readyIn: string, ingredients: string, serves: string, image: string, description: string): void {
    this.tokenService.create(title, readyIn, ingredients, serves, image, description).subscribe({
      next: data => {
        if (data.error) {
          console.log(data.error)
          return;
        } else {
          this.router.navigate(["/catalog"]);
        }
      },
      error: err => {
        console.log(err);
        console.log("create recipe component error");
      }
    })
  }
}
