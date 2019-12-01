import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "@core/services";
import { FormErrorStateMatcher } from "@core/utils";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formErrorStateMatcher = new FormErrorStateMatcher();
  public isHidden = true;
  public isAuthorized = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    this.router.navigate(["/auth/register"]);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          this.router.navigate(["/home"]);
        } else {
          this.anauthorized();
        }
      });
  }

  public anauthorized() {
    this.isAuthorized = false;
  }
}
