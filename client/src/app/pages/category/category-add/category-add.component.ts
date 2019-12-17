import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormErrorStateMatcher } from "@core/utils";

@Component({
  selector: "app-category-add",
  templateUrl: "./category-add.component.html",
  styleUrls: ["./category-add.component.scss"]
})
export class CategoryAddComponent implements OnInit {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  constructor() {}

  ngOnInit() {}
}
