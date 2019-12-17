import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "@core/services";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  public canActivate(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }

    this.router.navigate(["/auth/login"]);
    return false;
  }
}
