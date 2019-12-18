import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

const apiUrl = "http://localhost:3000/api/category/";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http
      .post<any>(apiUrl + "create", data)
      .pipe(catchError(this.handleError("create", [])));
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
