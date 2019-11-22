import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { LoginFormGuard } from "@core/guards";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./pages/auth/auth.module#AuthModule"
    // canActivate: [LoginFormGuard],
    // canLoad: [LoginFormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
