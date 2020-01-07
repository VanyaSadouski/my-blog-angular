import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IPost } from "@core/models/post";
import { LoginService, PostService } from "@core/services";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-post-tile",
  templateUrl: "./post-tile.component.html",
  styleUrls: ["./post-tile.component.scss"]
})
export class PostTileComponent implements OnInit {
  public userInfo: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() public posts: IPost[];
  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userInfo = this.loginService.user;
  }

  public getPosts() {
    this.postService
      .getPostsByCategory(this.route.snapshot.paramMap.get("categoryId"))
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.posts = data;
      });
  }

  public deletePost(id) {
    this.postService
      .deletePost(id)
      .pipe(take(1))
      .subscribe(() => {
        this.getPosts();
      });
  }
}
