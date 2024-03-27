import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

interface ResultData {
  token: string
}

// interface LoggedInUser {
//   user: User,
//   loginState: boolean,
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // man kan stoppa in ett object istället för boolean value
  // t.ex. interface LoggedInUser

  // private loggedIn = new BehaviorSubject<LoggedInUser>({user: undefined, loginState: false});

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  // vi kan istället skapa ett interface som har typer och värden vi kan använda
  // Istället för loggedIn variabel som skapar ett nytt subjekt, och sen sätter en observable

  // loggedInUser interface:
  // - user 
  // - token
  // - status

  private baseUrl: string = 'http://127.0.0.1:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  // hämtar senaste värdet från behaviorSubject
  getLoginStatus() {
    return this.loggedIn.value;
  }

  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
  }

  loginUser(loginDeatils: LoginDetails) {
    this.http.post<ResultData>(this.baseUrl+'login', loginDeatils, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(true);
        // om result så tar vi det, som i det här fallet är token,
        // och sparar det i localStorage
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
  }

  logOut() {
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      })
  }


  // getCurrentUser() {
  //   let user: User;
  //   user = {
  //     id: 0,
  //     name: "",
  //     email: "",
  //   }
  //   this.http.get<User[]>(this.baseUrl+'getUser/' + this.loggedIn.value.user?.id, this.httpOptions).subscribe(res => user = res[0]);
  //   return user;
  // }

  public getUser2(): Observable<User[]> {
    // vi tar vår httpOptions.headers och sätter den till Auth bearer tokenet
    return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
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
