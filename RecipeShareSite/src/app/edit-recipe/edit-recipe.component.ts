import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenApiService } from '../token-api.service';
import { Recipe } from '../types/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  currentRecipeInfo: Recipe | undefined = undefined;

  constructor(private route: ActivatedRoute, private tokenService: TokenApiService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params["id"];

    this.tokenService.getOne(id).subscribe(data => {
      this.currentRecipeInfo = data;
    })


  }

}
