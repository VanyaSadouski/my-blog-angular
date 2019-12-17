import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const apiUrl = "http://localhost:3000/api/auth/";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus = localStorage.getItem("token");

  constructor(private http: HttpClient, private router: Router) {}

  public user = JSON.parse(localStorage.getItem("user"));

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "login", data).pipe(
      tap(userInfo => {
        this.isLoggedIn.emit(true);
      }),
      catchError(this.handleError("login", []))
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(apiUrl + "logout", {}).pipe(
      tap(() => {
        this.isLoggedIn.emit(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["auth/login"]);
      }),
      catchError(this.handleError("logout", []))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "register", data).pipe(
      tap(() => this.log("register")),
      catchError(this.handleError("register", []))
    );
  }

  private handleError<T>(operation = "operation", result?: any) {
    return (error: any): Observable<any> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
