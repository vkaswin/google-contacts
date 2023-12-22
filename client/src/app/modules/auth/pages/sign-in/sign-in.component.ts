import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { InputComponent } from "@/app/core/components/input/input.component";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ISignIn } from "../../types/auth";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [CommonModule, InputComponent, RouterLink],
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.scss"],
})
export class SignInComponent implements OnInit, OnDestroy {
  isSubmitted = false;

  formBuilder = inject(FormBuilder);

  authService = inject(AuthService);

  form = this.formBuilder.group({
    email: this.formBuilder.control("", [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control("", [Validators.required]),
  });

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  ngOnInit(): void {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  ngOnDestroy(): void {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") this.handleSubmit();
  };

  handleSubmit() {
    if (!this.isSubmitted) this.isSubmitted = true;

    if (!this.form.valid) return;

    this.authService.signIn(this.form.value as ISignIn);
  }
}
