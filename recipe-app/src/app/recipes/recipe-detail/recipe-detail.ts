import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeServive: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.recipeServive.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
