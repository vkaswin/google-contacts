import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() hasError = true;
  @Input() name = "";
  @Input() label = "";
}
