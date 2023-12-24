import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { IContact } from "../../types/contact";
import { ContactService } from "../../services/contact.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-contact-list-page",
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    ContactHeaderComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./all-contacts.component.html",
})
export class ContactListPageComponent implements OnInit {
  allContacts: IContact[] = [];

  selectedContactIds = new Set<string>();

  contactService = inject(ContactService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  snackBar = inject(MatSnackBar);

  paramSubscribed = false;

  querySubscribed = false;

  get starredContactList() {
    return this.allContacts.filter(({ isFavourite }) => isFavourite);
  }

  get contactList() {
    return this.allContacts.filter(({ isFavourite }) => !isFavourite);
  }

  get labelId(): string | null {
    return this.activatedRoute.snapshot.params["labelId"] || null;
  }

  get search(): string | null {
    return this.activatedRoute.snapshot.queryParams["q"] || null;
  }

  ngOnInit(): void {
    this.getAllContacts();

    this.contactService.onBulkUpload.subscribe(() => {
      this.getAllContacts();
    });

    this.activatedRoute.params.subscribe(() => {
      if (!this.paramSubscribed) {
        this.paramSubscribed = true;
        return;
      }

      this.getAllContacts();
    });

    this.activatedRoute.queryParams.subscribe(() => {
      if (!this.querySubscribed) {
        this.querySubscribed = true;
        return;
      }

      this.getAllContacts();
    });
  }

  getAllContacts() {
    this.contactService
      .getAllContacts(this.search, this.labelId)
      .subscribe(({ data: { contacts } }) => {
        this.allContacts = contacts;
      });
  }

  handleDelete(contactId: string) {
    if (!window.confirm("Are you sure to delete this contact?")) return;

    this.contactService.removeContacts([contactId]).subscribe(({ message }) => {
      this.showSnackBar(message);
      let index = this.allContacts.findIndex(({ _id }) => _id === contactId);
      if (index === -1) return;
      this.allContacts.splice(index, 1);
      this.contactService.getContactCount();
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  handleFavourite({
    contactId,
    isFavourite,
  }: {
    contactId: string;
    isFavourite: boolean;
  }) {
    if (isFavourite) {
      this.contactService.addToFavourite(contactId).subscribe(({ message }) => {
        this.showSnackBar(message);
        let contact = this.allContacts.find(({ _id }) => _id === contactId);
        if (!contact) return;
        contact.isFavourite = isFavourite;
        this.contactService.getContactCount();
      });
    } else {
      this.contactService
        .removeFromFavourite(contactId)
        .subscribe(({ message }) => {
          this.showSnackBar(message);
          let contact = this.allContacts.find(({ _id }) => _id === contactId);
          if (!contact) return;
          contact.isFavourite = isFavourite;
          this.contactService.getContactCount();
        });
    }
  }

  handleChange({
    checked,
    contactId,
  }: {
    checked: boolean;
    contactId: string;
  }) {
    if (checked) this.selectedContactIds.add(contactId);
    else this.selectedContactIds.delete(contactId);
  }

  handleClearAllSelectedContacts() {
    this.selectedContactIds.clear();
  }

  handleDeleteAllSelectedContacts() {
    if (!window.confirm("Are you sure to delete all the selected contacts?"))
      return;

    let contactIds = [...this.selectedContactIds];

    this.contactService.removeContacts(contactIds).subscribe(({ message }) => {
      this.showSnackBar(message);
      this.allContacts = this.allContacts.filter(
        ({ _id }) => !this.selectedContactIds.has(_id)
      );
      this.selectedContactIds = new Set();
      this.contactService.getContactCount();
    });
  }

  handleExportContacts() {
    this.contactService.exportContacts().subscribe((blob) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "contacts";
      a.click();
    });
  }
}
