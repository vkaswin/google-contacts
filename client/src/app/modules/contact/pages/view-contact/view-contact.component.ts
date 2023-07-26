import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: "app-contact-detail",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./view-contact.component.html",
  styles: [],
})
export class ViewContactComponent {}
