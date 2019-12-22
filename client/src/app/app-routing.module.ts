import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guards";
import { BaselayoutComponent } from "@pages/base-layout/base-layout.component";

const routes: Routes = [
  {
    path: "",
    component: BaselayoutComponent,

    children: [
      {
        path: "home",
        loadChildren: "./pages/home/home.module#HomeModule",
        canActivate: [AuthGuard]
      },

      {
        path: "category",
        loadChildren: "./pages/category/category.module#CategoryModule",
        canActivate: [AuthGuard]
      },

      {
        path: "posts",
        loadChildren: "./pages/posts/posts.module#PostsModule",
        canActivate: [AuthGuard]
      },

      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      }
    ]
  },
  {
    path: "auth",
    loadChildren: "./pages/auth/auth.module#AuthModule"
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
