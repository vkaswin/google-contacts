import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "@/app/core/components/input/input.component";
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ISignUp } from "../../types/auth";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule, RouterLink],
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.scss"],
})
export class SignUpComponent {
  isSubmitted = false;

  showPassword = false;

  formBuilder = inject(FormBuilder);

  authService = inject(AuthService);

  form = this.formBuilder.group({
    firstName: this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    lastName: this.formBuilder.control("", [
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    email: this.formBuilder.control("", [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control("", [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
    ]),
    confirmPassword: this.formBuilder.control("", [
      Validators.required,
      this.confirmPasswordValidator,
    ]),
  });

  get firstName() {
    return this.form.controls.firstName;
  }

  get lastName() {
    return this.form.controls.lastName;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
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

    delete this.form.value.confirmPassword;

    this.authService.signUp(this.form.value as ISignUp);
  }

  confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    let password = control.parent?.get("password")?.value;

    return password === control.value ? null : { passwordMismatch: true };
  }

  handleCheckBox(event: Event) {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }
}
