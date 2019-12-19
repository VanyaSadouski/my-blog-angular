import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { CategoryService } from "@core/services/category/category.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryByIdResolver implements Resolve<any> {
  constructor(private categoryService: CategoryService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log(route);

    const id = route.paramMap.get("categoryId");
    return this.categoryService.getCategory(id);
  }
}
