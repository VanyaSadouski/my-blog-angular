import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListResolver } from "@core/resolvers/category-list.resolver";
import { PostByIdResolver } from "@core/resolvers/post-by-id.resolver";
import { PostListByCategoryResolver } from "@core/resolvers/post-list-by-category.resolver";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostsAddComponent } from "./posts-add/posts-add.component";

const routes: Routes = [
  {
    path: "create",
    component: PostsAddComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      categories: CategoryListResolver
    }
  },

  {
    path: "edit/:postId",
    component: PostsAddComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      post: PostByIdResolver,
      categories: CategoryListResolver
    }
  },
  {
    path: "details/:postId",
    component: PostDetailsComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      post: PostByIdResolver
    }
  },
  {
    path: "list/:categoryId",
    component: PostListComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      postList: PostListByCategoryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
