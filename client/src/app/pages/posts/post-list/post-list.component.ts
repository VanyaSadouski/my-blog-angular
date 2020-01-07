import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IPost } from "@core/models/post";
import { CategoryService, LoginService, PostService } from "@core/services";
import { Subject } from "rxjs";
import { pluck, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: IPost[];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private loginService: LoginService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(pluck("postList"), takeUntil(this.destroy$))
      .subscribe(data => {
        this.posts = data;
      });
    this.userInfo = this.loginService.user;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
