import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "@core/services/category/category.service";
import { FormErrorStateMatcher } from "@core/utils";
import { Subject } from "rxjs";
import { pluck, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-category-add",
  templateUrl: "./category-add.component.html",
  styleUrls: ["./category-add.component.scss"]
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isLoadingResults = false;
  public category: any;
  public isEditPage: boolean;
  public id: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.createForm();
    this.route.data
      .pipe(pluck("category"), takeUntil(this.destroy$))
      .subscribe(data => {
        this.id = data._id;
        this.isEditPage = true;
        this.form.patchValue({
          catName: data.catName,
          catDesc: data.catDesc,
          catImgUrl: data.catImgUrl
        });
      });
  }

  public createForm() {
    this.form = this.fb.group({
      catName: [null, [Validators.required]],
      catDesc: [null, [Validators.required]],
      catImgUrl: [null]
    });
  }

  public onSubmit() {
    if (this.isEditPage) {
      this.categoryService
        .updateCategory(this.id, this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.isLoadingResults = false;
            this.router.navigate(["/category/list"]);
          },
          (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    } else {
      this.categoryService
        .create(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            const id = res._id;
            this.isLoadingResults = false;
            this.router.navigate(["/category/list"]);
          },
          (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
  }

  public onCancel() {
    if (this.isEditPage) {
      this.router.navigate(["/category/list"]);
    } else {
      this.router.navigate(["/home"]);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
