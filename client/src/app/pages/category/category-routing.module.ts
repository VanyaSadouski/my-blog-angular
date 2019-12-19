import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListResolver } from "@core/resolvers/category-list.resolver";
import { CategoryByIdResolver } from "@core/resolvers/catgory-by-id.resolver";
import { CategoryAddComponent } from "./category-add";
import { CategoryListComponent } from "./category-list";

const routes: Routes = [
  {
    path: "",
    component: CategoryListComponent
  },

  {
    path: "create",
    component: CategoryAddComponent
  },
  {
    path: "edit/:categoryId",
    component: CategoryAddComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      category: CategoryByIdResolver
    }
  },
  {
    path: "list",
    component: CategoryListComponent,
    runGuardsAndResolvers: "always",
    resolve: {
      categoryList: CategoryListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
