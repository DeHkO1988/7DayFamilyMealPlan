import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenApiService } from '../token-api.service';
import { Recipe } from '../types/recipe';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css']
})
export class DetailRecipeComponent implements OnInit {

  recipe: Recipe = {
    _id: "",
    title: "",
    readyIn: "",
    ingredients: "",
    serves: "",
    image: "",
    description: "",
    ownerUsername: "",
    likes: [],
    owner: {
      _id: "",
      username: "",
      email: "",
      token: "",
      error: "",
    },
    error: "",
  }

  isOwner: boolean = false;

  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private tokenApiService: TokenApiService, private userService: UserApiService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.isLoggedIn = this.userService.isLogged
    const user = this.userService.userInfo();

    this.tokenApiService.getOne(id).subscribe(data => {
      this.recipe = data;
      this.isOwner = user?._id === data.owner?._id
    })
  }
}
