import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component ({
    standalone: false,
    templateUrl: './signup.html',
    styleUrls: ['./signup.css'],
})

export class Signup {
    isLoading = false;

    constructor(public authService: AuthService) {}

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password);
    }
}