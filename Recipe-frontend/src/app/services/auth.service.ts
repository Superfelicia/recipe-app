import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginDetails } from '../interfaces/login-details';
import { Registerdetails } from '../interfaces/registerdetails';
import { BehaviorSubject, EMPTY, Observable, catchError, throwError, map, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/loggedinuser';
import { RegisteredUser } from '../interfaces/registered-user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // man kan stoppa in ett object istället för boolean value
  // t.ex. interface LoggedInUser

  // private loggedIn = new BehaviorSubject<LoggedInUser>({user: undefined, loginState: false});

  private registered = new BehaviorSubject<RegisteredUser>({
    user: undefined,
    registeredState: false,
  });

  registered$ = this.registered.asObservable();

  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });

  loggedIn$ = this.loggedIn.asObservable();

  // vi kan istället skapa ett interface som har typer och värden vi kan använda
  // Istället för loggedIn variabel som skapar ett nytt subjekt, och sen sätter en observable

  // loggedInUser interface:
  // - user 
  // - token
  // - status

  private baseUrl: string = 'https://u06-fullstack-recipe-app-superfelicia.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  registeredUserState(registeredState: RegisteredUser) {
    this.registered.next(registeredState);
  }

  registerNewUser(registerDetails: Registerdetails): Observable<any> {
    return this.http.post<any>(this.baseUrl+'register', registerDetails, this.httpOptions).pipe(
      catchError(this.handleError),
      tap(result => {
        console.log('Registrering lyckades', result);
        this.registeredUserState({
          user: result.user,
          registeredState: true,
        });

        localStorage.setItem('token', result.token);
        this.router.navigate(['/']);

        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
    );
  }

  updateLoginState(loginState: LoggedInUser) {
    this.loggedIn.next(loginState);
  }

  // hämtar senaste värdet från behaviorSubject
  getLoginStatus() {
    return this.loggedIn.value.loginState;
  }

  loginUser(loginDetails: LoginDetails): Observable<any> {
    return this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError),
      tap(result => {
        console.log('Inlogg lyckades för user:', result.user);
        this.updateLoginState({
          user: result.user,
          loginState: true,
        });
        // om result så tar vi det, som i det här fallet är token,
        // och sparar det i localStorage
        localStorage.setItem('token', result.token);
        this.router.navigate(['/']);

        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
    );
  }

  logOut() {
    this.http.post<any>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: false,
        });
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      });
  }

  getCurrentUser(): Observable<User> {
    if (!this.loggedIn.value.user) {
      return EMPTY;
    }

    return this.http.get<User[]>(this.baseUrl + 'getuser/' + this.loggedIn.value.user?.id, this.httpOptions)
    .pipe(
      map(users => users[0]),
      catchError(this.handleError)
    );
    // this.http.get<User[]>(this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id, this.httpOptions).subscribe((res) => (user = res[0]));
    // return user;
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code: ${error.status}, body was: `, error.error
      );
    }
    return throwError(() => new Error('Something bad happened: please try again later.'))
  }
}
