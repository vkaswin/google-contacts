import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ContactService } from "../../services/contact.service";
import { IContactDetail } from "../../types/contact";

@Component({
  selector: "app-edit-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent, MatSnackBarModule],
  templateUrl: "./edit-contact.component.html",
})
export class EditContactComponent implements OnInit {
  contactDetail = {} as IContactDetail;

  contactService = inject(ContactService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  snackBar = inject(MatSnackBar);

  get labels() {
    return this.contactService.labels;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let contactId = params.get("contactId");
      if (!contactId) return;
      this.getContactDetail(contactId);
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
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
    this.router.navigateByUrl("/contact/list");
  }

  handleApplyLabel(labelIds: string[]) {
    let contactId = this.activatedRoute.snapshot.params["contactId"];

    if (!contactId) return;

    this.contactService
      .updateContactLabel(contactId, {
        labels: [...labelIds],
      })
      .subscribe(({ message }) => {
        this.showSnackBar(message);
        this.getContactDetail(contactId);
      });
  }
}
