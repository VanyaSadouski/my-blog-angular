import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
