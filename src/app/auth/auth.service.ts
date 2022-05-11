import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router) {}

  user = new BehaviorSubject<any>(null);
  private tokenExpiration: any;

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCj0t82El_3wSBC_gDIIeoYJrMO6-sVDWg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleLogin(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCj0t82El_3wSBC_gDIIeoYJrMO6-sVDWg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleLogin(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an unkown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This E-Mail already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This E-Mail does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }

  private handleLogin(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn + 3000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
