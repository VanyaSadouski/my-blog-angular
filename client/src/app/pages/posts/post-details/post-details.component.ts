import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IPost } from "@core/models/post";
import { LoginService, PostService } from "@core/services";
import { FormErrorStateMatcher } from "@core/utils";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"]
})
export class PostDetailsComponent implements OnInit {
  public post: IPost;
  public isFavorite: boolean;
  public likes: number;
  public form: FormGroup;
  public id: string;

  public formErrorStateMatcher = new FormErrorStateMatcher();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("postId");

    this.createForm();
    this.getPostInfo();

    this.postService
      .isLikedPostByUser(this.loginService.user.username, this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.isFavorite = data;
      });
  }

  public getPostInfo() {
    this.postService
      .getPost(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.post = data;
        this.likes = data.likedByUsers.length;
      });
  }

  public onFavorite() {
    if (this.isFavorite) {
      this.postService
        .dislike(this.loginService.user.username, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([]);
          this.getPostInfo();
        });
    } else {
      this.postService
        .like(this.loginService.user.username, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([]);
          this.getPostInfo();
        });
    }
    this.isFavorite = !this.isFavorite;
  }

  public createForm() {
    this.form = this.fb.group({
      comment: [null, [Validators.required]],
      date: [null],
      name: [this.loginService.user.username]
    });
  }

  public onAddComment() {
    if (this.form.invalid) {
      return;
    }
    this.form.patchValue({
      date: new Date()
    });

    this.postService
      .addComment(this.id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getPostInfo();
      });

    this.form.reset();
  }
}
