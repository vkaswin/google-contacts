import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() hasError = false;
  @Input() readOnly = false;
  @Input() name = "";
  @Input() label = "";
  @Input() control = new FormControl();
  @Input() errorMessage: Record<string, string> = {};

  get errorType() {
    if (!this.control.errors) return;
    return Object.keys(this.control.errors)[0];
  }
}
