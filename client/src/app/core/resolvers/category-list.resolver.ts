import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CategoryService } from "@core/services/category/category.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryListResolver implements Resolve<any> {
  constructor(private categoryService: CategoryService) {}

  public resolve(): Observable<any> {
    return this.categoryService.getCategories();
  }
}
