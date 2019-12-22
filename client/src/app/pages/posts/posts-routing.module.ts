import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListResolver } from "@core/resolvers/category-list.resolver";
import { PostsAddComponent } from "./posts-add/posts-add.component";

const routes: Routes = [
  // {
  //   path: "",
  //   component: CategoryListComponent
  // },

  {
    path: "create",
    component: PostsAddComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      categories: CategoryListResolver
    }
  }
  // {
  //   path: "edit/:postId",
  //   component: CategoryAddComponent,
  //   runGuardsAndResolvers: "always",
  //   resolve: {
  //     category: CategoryByIdResolver
  //   }
  // },
  // {
  //   path: "list",
  //   component: CategoryListComponent,
  //   runGuardsAndResolvers: "always",
  //   resolve: {
  //     categoryList: CategoryListResolver
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
