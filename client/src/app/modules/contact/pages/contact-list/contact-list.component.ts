import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { IContact } from "../../types/contact";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "app-contact-list-page",
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactHeaderComponent],
  templateUrl: "./contact-list.component.html",
  styles: [],
})
export class ContactListPageComponent implements OnInit {
  contactsList: IContact[] = [];

  selectedContactIds = new Set<number>();

  constructor(private contactService: ContactService) {}

  get favouritesList() {
    return this.contactsList.filter(({ isFavourite }) => isFavourite);
  }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(({ data: { contacts } }) => {
      this.contactsList = contacts;
    });
  }

  handleDelete(contactId: number) {
    console.log(contactId, "delete");
  }

  handleFavourite({
    contactId,
    isFavourite,
  }: {
    contactId: number;
    isFavourite: boolean;
  }) {
    console.log(contactId, isFavourite, "favourite");
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
