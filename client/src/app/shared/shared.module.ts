import { NgModule } from "@angular/core";
import { EditorModule } from "@tinymce/tinymce-angular";
import { SanitazeHtmlPipe } from "./pipes/sanitaze-html.pipe";

@NgModule({
  imports: [EditorModule],
  declarations: [SanitazeHtmlPipe],
  exports: [SanitazeHtmlPipe]
})
export class SharedModule {}
