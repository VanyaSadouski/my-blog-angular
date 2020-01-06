import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "@core/services";
import { FormErrorStateMatcher } from "@core/utils";
import { Subject } from "rxjs";
import { pluck, takeUntil } from "rxjs/operators";
@Component({
  selector: "app-posts-add",
  templateUrl: "./posts-add.component.html",
  styleUrls: ["./posts-add.component.scss"]
})
export class PostsAddComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isLoadingResults = false;
  public category: any;
  public isEditPage: boolean;
  public categories;
  public id: string;
  public init = {
    height: 500,
    plugins: [
      "advlist lists link image charmap anchor",
      "fullscreen",
      "insertdatetime media table imagetools"
    ],
    toolbar:
      // tslint:disable-next-line: max-line-length
      "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
  };
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location
  ) {}

  public ngOnInit() {
    this.createForm();
    this.route.data
      .pipe(pluck("categories"), takeUntil(this.destroy$))
      .subscribe(data => {
        this.categories = data;
      });

    this.route.data
      .pipe(pluck("post"), takeUntil(this.destroy$))
      .subscribe(data => {
        if (!data) {
          return;
        }
        this.isEditPage = true;
        this.form.patchValue({
          postTitle: data.postTitle,
          postDesc: data.postDesc,
          postImgUrl: data.postImgUrl,
          postContent: data.postContent
        });
      });
  }

  public createForm() {
    this.form = this.fb.group({
      category: [null, [Validators.required]],
      postTitle: [null, [Validators.required]],
      postDesc: [null, [Validators.required]],
      postContent: [null],
      postImgUrl: [null],
      likes: 0
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isEditPage) {
      this.postService
        .updatePost(this.id, this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.isLoadingResults = false;
            this.location.back();
          },
          (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    } else {
      this.postService
        .addPost(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res => {
            this.router.navigate(["category/list"]);
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
      this.location.back();
    } else {
      this.router.navigate(["/home"]);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
