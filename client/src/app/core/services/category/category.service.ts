import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

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

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl + "category-list").pipe(
      tap(_ => this.log("fetched Categories")),
      catchError(this.handleError("getCategories", []))
    );
  }

  updateCategory(id: any, category: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, category).pipe(
      tap(_ => console.log(`updated category id=${id}`)),
      catchError(this.handleError<any>("updateCategory"))
    );
  }

  getCategory(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched category by id=${id}`)),
      catchError(this.handleError<any>(`getCategory id=${id}`))
    );
  }

  deleteCategory(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.handleError<any>("deleteCategory"))
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
