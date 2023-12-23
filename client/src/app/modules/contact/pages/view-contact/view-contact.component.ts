import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ContactService } from "../../services/contact.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IContactDetail } from "../../types/contact";

@Component({
  selector: "app-contact-detail",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./view-contact.component.html",
})
export class ViewContactComponent implements OnInit {
  contactDetail = {} as IContactDetail;

  activatedRoute = inject(ActivatedRoute);

  contactService = inject(ContactService);

  router = inject(Router);

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

  handleCloseForm() {
    this.router.navigateByUrl("/contact/list");
  }
}
