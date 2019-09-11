import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

// firebase tells us the response data we're going to get back (five fields)
// so here's an interface to define how the response will look like
export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null); // The bahavior subject gives subscribers access to the previous emitted value, even if they hadn't subscribed at the point in time that value was submitted.
  tokenExpirationTimer: any;

  FIREBASE_API_KEY = 'AIzaSyBGZWUJbkMw6lQHTQcwJjDTtVXC8HdNy78';
  FIREBASE_SIGNUP_AUTH_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='; 
  FIREBASE_SIGNIN_AUTH_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http // returning here so we can subscribe in the authComponent
      .post<AuthResponseData>( // We know that the post's response will be of type (from the interface) AuthResponseData
        this.FIREBASE_SIGNUP_AUTH_ENDPOINT + this.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        ); 
      })
    );
  }

  login(email: string, password: string) {
    return this.http // returning here so we can subscribe in the component
      .post<AuthResponseData>(
        this.FIREBASE_SIGNIN_AUTH_ENDPOINT + this.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        ); 
      }));
  }

  logOut() {
    this.user.next(null); // set user to null
    localStorage.removeItem('userDataInLocalStorage');
    this.clearExpirationTimerIfNotNull();
  }

  private clearExpirationTimerIfNotNull() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationDurationInMilliseconds: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDurationInMilliseconds);
  }

  autoLogIn() {
    const userDataFromLocalStorage: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userDataInLocalStorage'));
    // JSON.parse converts a string back into a JS object
    if (!userDataFromLocalStorage) {
      return;
    }

    const tokenExpirationDateAsDate = new Date(userDataFromLocalStorage._tokenExpirationDate);

    const loadedUser = new User(
      userDataFromLocalStorage.email, 
      userDataFromLocalStorage.id, 
      userDataFromLocalStorage._token, 
      tokenExpirationDateAsDate
      );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = tokenExpirationDateAsDate.getTime() - new Date().getTime(); // the getTime() gives you the time in milliseconds
      this.autoLogOut(expirationDuration);
    }
  }

  private handleAuthentication(email, localId, idToken, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // beginning of time according to JS (sometime in 1970) PLUS expires in milliseconds times one thousand to make seconds
    const user = new User(
      email, 
      localId, 
      idToken, 
      expirationDate
    );
    this.user.next(user); // emit this as our currently logged-in user
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userDataInLocalStorage', JSON.stringify(user)); // writes an item to local storage
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.'
        break;
      case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist.'
        break;
      case 'INVALID_PASSWORD':
          errorMessage = 'The password is not correct.'
        break;
      }
    return throwError(errorMessage);
  }
}
