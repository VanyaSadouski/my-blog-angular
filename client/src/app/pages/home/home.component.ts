import { Component, OnInit } from "@angular/core";
import { LoginService } from "@core/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}
}
