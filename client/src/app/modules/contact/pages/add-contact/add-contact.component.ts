import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ContactService } from "../../services/contact.service";
import { IContactDetail } from "../../types/contact";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./add-contact.component.html",
  styles: [],
})
export class AddContactComponent {
  contactService = inject(ContactService);

  router = inject(Router);

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
        this.contactService.getContactCount();
      });
  }

  handleCloseForm() {
    this.router.navigateByUrl("/contact/list");
  }
}
