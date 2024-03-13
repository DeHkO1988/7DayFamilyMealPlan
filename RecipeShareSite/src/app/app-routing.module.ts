import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [{
  path: "",
  pathMatch: "full",
  redirectTo: "/home",
},
{
  path: "home",
  component: HomeComponent,
},
{
  path: "login",
  component: LoginComponent,
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "catalog",
  component: RecipeCatalogComponent,
},
{
  path: "createRecipe",
  component: AddRecipeComponent,
},
{
  path: "details/:id",
  component: DetailRecipeComponent,
},
{
  path: "edit/:id",
  component: EditRecipeComponent,
}
// {
//   path: "**",
//   redirectTo: "/404"
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
