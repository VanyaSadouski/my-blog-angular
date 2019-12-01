import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { HeaderModule } from "@pages/header/header.module";
import { BaselayoutComponent } from "./base-layout.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MaterialModule
    // NavigationModule
  ],
  declarations: [BaselayoutComponent]
})
export class BaseLayoutModule {}
