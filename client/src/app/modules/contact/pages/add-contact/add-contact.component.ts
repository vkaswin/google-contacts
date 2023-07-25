import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: "app-add-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./add-contact.component.html",
  styles: [],
})
export class AddContactComponent {}
