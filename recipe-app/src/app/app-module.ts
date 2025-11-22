import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { Header } from './header/header';
import { Recipes } from './recipes/recipes';
import { RecipeList } from './recipes/recipe-list/recipe-list';
import { RecipeDetail } from './recipes/recipe-detail/recipe-detail';
import { RecipeItem } from './recipes/recipe-list/recipe-item/recipe-item';
import { ShoppingList } from './shopping-list/shopping-list';
import { ShoppingEdit } from './shopping-list/shopping-edit/shopping-edit';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStart } from './recipes/recipe-start/recipe-start';
import { RecipeEdit } from './recipes/recipe-edit/recipe-edit';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
declarations: [
  App,
  Header,
  Recipes,
  RecipeList,
  RecipeDetail,
  RecipeItem,
  ShoppingList,
  ShoppingEdit,
  DropdownDirective,
  RecipeStart,
  RecipeEdit,
],
imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  // deprecated in Angular 14 and later
  HttpClientModule,
  AppRoutingModule
],
  providers: [
    ShoppingListService,
    provideBrowserGlobalErrorListeners(),
    RecipeService
  ],
  bootstrap: [App]
})
export class AppModule { }
