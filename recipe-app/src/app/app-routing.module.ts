import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Recipes } from "./recipes/recipes";
import { ShoppingList } from "./shopping-list/shopping-list";
import { RecipeStart } from "./recipes/recipe-start/recipe-start";
import { RecipeDetail } from "./recipes/recipe-detail/recipe-detail";
import { RecipeEdit } from "./recipes/recipe-edit/recipe-edit";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

// the array of routes for the application
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {path: 'recipes', component: Recipes, children: [
        {path: '', component: RecipeStart},
        {path: 'new', component: RecipeEdit},
        {path: ':id', 
            component: RecipeDetail, 
            resolve: [RecipesResolverService]},
        {path: ':id/edit', 
            component: RecipeEdit, 
            resolve: [RecipesResolverService]}
    ]
    },
    {path: 'shopping-list', component: ShoppingList },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
// bundles the routes and makes them available to the rest of the app
export class AppRoutingModule {

}