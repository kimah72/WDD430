import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header/header';
import { Recipes } from './recipes/recipes';
import { RecipeList } from './recipes/recipe-list/recipe-list';
import { RecipeDetail } from './recipes/recipe-detail/recipe-detail';
import { RecipeItem } from './recipes/recipe-list/recipe-item/recipe-item';
import { ShoppingList } from './shopping-list/shopping-list';
import { ShoppingEdit } from './shopping-list/shopping-edit/shopping-edit';


@NgModule({
  declarations: [
    App,
    Header,
    Recipes,
    RecipeList,
    RecipeDetail,
    RecipeItem,
    ShoppingList,
    ShoppingEdit
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
