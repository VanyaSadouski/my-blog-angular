import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@core/material";
import { EditorModule } from "@tinymce/tinymce-angular";
import { SharedModule } from "app/shared/shared.module";
import { PostsAddComponent } from "./posts-add/posts-add.component";
import { PostsRoutingModule } from "./posts-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    EditorModule
  ],
  declarations: [PostsAddComponent]
})
export class PostsModule {}
