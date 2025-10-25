import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: false,
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.css'
})
export class RecipeEdit implements OnInit{
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          // nice way of checking if we are in edit mode
          // console.log(this.editMode);
        }
      );
  }
}
