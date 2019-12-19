import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "@core/services";
import { CategoryService } from "@core/services/category/category.service";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"]
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categories: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.userInfo = this.loginService.user;
  }

  public getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.categories = data;
      });
  }

  public deleteCategory(id) {
    this.categoryService
      .deleteCategory(id)
      .pipe(take(1))
      .subscribe(() => {
        this.getCategories();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
