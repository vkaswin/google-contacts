import { Component, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ContactService } from "../../services/contact.service";
import { IContactDetail } from "../../types/contact";

@Component({
  selector: "app-add-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./add-contact.component.html",
  styles: [],
})
export class AddContactComponent {
  location = inject(Location);

  contactService = inject(ContactService);

  handleFormSubmit(contactDetail: any) {
    let body: Partial<IContactDetail> = {};

    for (let key in contactDetail) {
      if (!contactDetail[key as keyof IContactDetail]) continue;
      body[key as keyof IContactDetail] = contactDetail[key];
    }

    this.contactService
      .createContact(body)
      .subscribe(({ data: { contact } }) => {
        this.handleCloseForm();
      });
  }

  handleCloseForm() {
    this.location.back();
  }
}
