import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { PostService } from "@core/services/post/post.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostListByCategoryResolver implements Resolve<any> {
  constructor(private postService: PostService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get("categoryId");
    return this.postService.getPostsByCategory(id);
  }
}
