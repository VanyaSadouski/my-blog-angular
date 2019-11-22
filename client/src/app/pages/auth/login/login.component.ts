import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "@core/services";
import { FormErrorStateMatcher } from "@core/utils";
import { take } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isHidden = true;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public toRegistration() {
    this.router.navigate(["register"]);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.value)
      .pipe(take(1))
      .subscribe(
        res => {
          console.log(res);
          if (res.token) {
            localStorage.setItem("token", res.token);
            this.router.navigate(["home"]);
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}
