import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component ({
    standalone: false,
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})

export class Login {
    isLoading = false;
    private authStatusSub!: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
        (authStatus: boolean) => {
                this.isLoading = false;
            }
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    }
    
    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}