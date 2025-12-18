import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Error } from './error/error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        // Close any open error dialog first
        this.dialog.closeAll();

        // Open new error dialog
        this.dialog.open(Error, {
          data: { message: errorMessage },
          width: '400px'
        });

        return throwError(() => error);
      })
    );
  }
}