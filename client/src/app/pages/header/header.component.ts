import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "@core/services";
import { take } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit() {}

  private onLogout() {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(["/auth/login"]);
      });
  }
}
