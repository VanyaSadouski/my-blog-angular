import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
