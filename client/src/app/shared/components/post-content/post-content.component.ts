import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-post-content",
  templateUrl: "./post-content.component.html",
  styleUrls: ["./post-content.component.scss"]
})
export class PostContentComponent implements OnInit {
  public fc: FormControl = new FormControl("");
  public init = {
    selector: "textarea#image-tools",
    height: 500,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste imagetools wordcount"
    ],
    toolbar:
      "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
  };
  constructor() {}

  ngOnInit() {}
}
