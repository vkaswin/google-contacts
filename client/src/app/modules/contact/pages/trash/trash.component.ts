import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { IContact } from "../../types/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "app-trash",
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactHeaderComponent],
  templateUrl: "./trash.component.html",
  styles: [],
})
export class TrashComponent implements OnInit {
  contactsList: IContact[] = [];

  selectedContactIds = new Set<string>();

  contactService = inject(ContactService);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAllTrash().subscribe(({ data: { contacts } }) => {
      this.contactsList = contacts;
    });
  }

  handleRecover(contactId: string) {
    this.contactService.recoverContact(contactId).subscribe(({ message }) => {
      console.log(message);
      let index = this.contactsList.findIndex(({ _id }) => contactId === _id);
      if (index === -1) return;
      this.contactsList.splice(index, 1);
      this.contactService.getContactCount();
    });
  }

  handleEmptyTrash() {
    if (!window.confirm("Are you sure to delete contacts in trash?")) return;

    this.contactService.clearTrash().subscribe(({ message }) => {
      console.log(message);
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
      console.log(message);
      this.contactsList = this.contactsList.filter(
        ({ _id }) => !this.selectedContactIds.has(_id)
      );
      this.selectedContactIds = new Set();
    });
  }
}
