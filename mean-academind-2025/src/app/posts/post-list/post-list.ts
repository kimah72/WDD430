import { Component } from "@angular/core";

@Component({
    selector: 'app-post-list',
    standalone: false,
    templateUrl: './post-list.html',
    styleUrls: ['./post-list.css']
})

export class PostList {
    posts = [
        { title: 'First Post', content: 'This is the first post\'s content' },
        { title: 'Second Post', content: 'This is the second post\'s content' },
        { title: 'Third Post', content: 'This is the third post\'s content' }
    ];
}