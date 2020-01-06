import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IPost } from "@core/models/post";
import { LoginService, PostService } from "@core/services";
import { Subject } from "rxjs";
import { pluck, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"]
})
export class PostDetailsComponent implements OnInit {
  public post: IPost;
  public isFavorite: boolean;
  public likes: number;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location,
    private loginService: LoginService
  ) {}

  public ngOnInit() {
    this.route.data
      .pipe(pluck("post"), takeUntil(this.destroy$))
      .subscribe(data => {
        this.post = data;
        this.likes = data.likedByUsers.length;
      });
    this.postService
      .isLikedPostByUser(this.loginService.user.username, this.post._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.isFavorite = data;
      });
  }

  public getPostInfo() {
    this.postService
      .getPost(this.post._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.likes = data.likedByUsers.length;
      });
  }

  public onFavorite() {
    if (this.isFavorite) {
      this.postService
        .dislike(this.loginService.user.username, this.post._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([]);
          this.getPostInfo();
        });
    } else {
      this.postService
        .like(this.loginService.user.username, this.post._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([]);
          this.getPostInfo();
        });
    }
    this.isFavorite = !this.isFavorite;
  }
}
