import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { IContact } from "../../types/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "app-trash",
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    ContactHeaderComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./trash.component.html",
})
export class TrashComponent implements OnInit {
  contactsList: IContact[] = [];

  selectedContactIds = new Set<string>();

  contactService = inject(ContactService);

  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAllTrash().subscribe(({ data: { contacts } }) => {
      this.contactsList = contacts;
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  handleRecover(contactId: string) {
    this.contactService.recoverContact(contactId).subscribe(({ message }) => {
      this.showSnackBar(message);
      let index = this.contactsList.findIndex(({ _id }) => contactId === _id);
      if (index === -1) return;
      this.contactsList.splice(index, 1);
      this.contactService.getContactCount();
    });
  }

  handleEmptyTrash() {
    if (!window.confirm("Are you sure to delete contacts in trash?")) return;

    this.contactService.clearTrash().subscribe(({ message }) => {
      this.showSnackBar(message);
      this.contactsList = [];
    });
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
    let contactIds = [...this.selectedContactIds];
    this.contactService.clearTrash(contactIds).subscribe(({ message }) => {
      this.showSnackBar(message);
      this.contactsList = this.contactsList.filter(
        ({ _id }) => !this.selectedContactIds.has(_id)
      );
      this.selectedContactIds = new Set();
    });
  }
}
