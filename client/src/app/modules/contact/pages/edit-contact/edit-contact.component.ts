import { Component, OnInit, inject } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ActivatedRoute } from "@angular/router";
import { ContactService } from "../../services/contact.service";
import { IContactDetail } from "../../types/contact";

@Component({
  selector: "app-edit-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./edit-contact.component.html",
  styles: [],
})
export class EditContactComponent implements OnInit {
  contactDetail = {} as IContactDetail;

  contactService = inject(ContactService);

  activatedRoute = inject(ActivatedRoute);

  location = inject(Location);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let contactId = params.get("contactId");
      if (!contactId) return;
      this.getContactDetail(contactId);
    });
  }

  getContactDetail(contactId: string) {
    this.contactService
      .getContactById(contactId)
      .subscribe(({ data: { contact } }) => {
        this.contactDetail = contact;
      });
  }

  handleFormSubmit(contactDetail: IContactDetail) {
    let contactId = this.activatedRoute.snapshot.params["contactId"];

    if (!contactId) return;

    this.contactService
      .updateContactById(contactId, contactDetail)
      .subscribe(() => {
        this.handleCloseForm();
      });
  }

  handleCloseForm() {
    this.location.back();
  }
}
