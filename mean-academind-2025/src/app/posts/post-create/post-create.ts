import { Component } from "@angular/core";

@Component({
    selector: 'app-post-create',
    standalone: false,
    templateUrl: './post-create.html',
    styleUrls: ['./post-create.css']
})
export class PostCreate {
    enteredValue = '';
    newPost = 'NO CONTENT';

    onAddPost() {
        this.newPost = this.enteredValue;
    }}