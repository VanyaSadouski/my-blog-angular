import { Component, OnInit, ViewChild } from "@angular/core";
import { IPost } from "@core/models/post";
import { PostService } from "@core/services";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public posts: Observable<IPost[]>;
  @ViewChild("mostLikedPosts", {
    static: true
  })
  public mostLikedPosts;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts = this.postService.getMostLikedPosts();
  }

  public toPosts() {
    this.mostLikedPosts.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
    });
  }
}
