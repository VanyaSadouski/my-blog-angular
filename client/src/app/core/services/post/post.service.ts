import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPost } from "@core/models/post";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const apiUrl = "http://localhost:3000/api/post/";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(apiUrl).pipe(
      tap(_ => this.log("fetched Posts")),
      catchError(this.handleError("getPosts", []))
    );
  }

  getPost(id: any): Observable<IPost> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<IPost>(url).pipe(
      tap(_ => console.log(`fetched post by id=${id}`)),
      catchError(this.handleError<IPost>(`getPost id=${id}`))
    );
  }

  addPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(apiUrl, post).pipe(
      tap((prod: IPost) => console.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<IPost>("addPost"))
    );
  }

  updatePost(id: any, post: IPost): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post).pipe(
      tap(_ => console.log(`updated post id=${id}`)),
      catchError(this.handleError<any>("updatePost"))
    );
  }

  deletePost(id: any): Observable<IPost> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<IPost>(url).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<IPost>("deletePost"))
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
