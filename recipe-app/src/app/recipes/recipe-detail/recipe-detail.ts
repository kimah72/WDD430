import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail implements OnInit {
  recipe: Recipe;
  id: number;

  constructor
    ( private recipeServive: RecipeService,
      private route: ActivatedRoute,
      private router: Router) {
  }
// use the route params to get the id of the selected recipe and fetch it from the service
  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeServive.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeServive.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeServive.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
