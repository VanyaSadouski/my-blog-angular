import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryService } from "@core/services/category/category.service";
import { FormErrorStateMatcher } from "@core/utils";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-category-add",
  templateUrl: "./category-add.component.html",
  styleUrls: ["./category-add.component.scss"]
})
export class CategoryAddComponent implements OnInit {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isLoadingResults = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.form = this.fb.group({
      catName: [null, [Validators.required]],
      catDesc: [null, [Validators.required]],
      catImgUrl: [null]
    });
  }

  public onSubmit() {
    this.categoryService
      .create(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(["/category/details", id]);
        },
        (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  public onCancel() {
    this.router.navigate(["/home"]);
  }
}
