import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "@/app/shared/components/input/input.component";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: "./contact-form.component.html",
  styles: [],
})
export class ContactFormComponent {
  isExpanded = false;

  handleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
