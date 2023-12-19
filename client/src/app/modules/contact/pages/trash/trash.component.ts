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

  selectedContactIds = new Set<number>();

  contactService = inject(ContactService);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAllTrash().subscribe(({ data: { contacts } }) => {
      this.contactsList = contacts;
    });
  }

  handleRecover(contactId: number) {
    this.contactService.recoverContact(contactId).subscribe(({ message }) => {
      console.log(message);
      let index = this.contactsList.findIndex(({ id }) => contactId === id);
      if (index === -1) return;
      this.contactsList.splice(index, 1);
    });
  }

  handleEmptyTrash() {
    console.log("empty trash");
  }

  handleChange({
    checked,
    contactId,
  }: {
    checked: boolean;
    contactId: number;
  }) {
    if (checked) this.selectedContactIds.add(contactId);
    else this.selectedContactIds.delete(contactId);
  }

  handleClearAllSelectedContacts() {
    this.selectedContactIds.clear();
  }

  handleDeleteAllSelectedContacts() {
    let contactIds = [...this.selectedContactIds];
    console.log(contactIds);
  }
}
