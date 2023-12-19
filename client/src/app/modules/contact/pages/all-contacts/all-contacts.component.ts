import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { IContact } from "../../types/contact";
import { ContactService } from "../../services/contact.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contact-list-page",
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactHeaderComponent],
  templateUrl: "./all-contacts.component.html",
  styles: [],
})
export class ContactListPageComponent implements OnInit {
  contactsList: IContact[] = [];

  selectedContactIds = new Set<string>();

  contactService = inject(ContactService);

  activatedRoute = inject(ActivatedRoute);

  get favouritesList() {
    return this.contactsList.filter(({ isFavourite }) => isFavourite);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      let q = params.get("q");
      this.getAllContacts(q);
    });
  }

  getAllContacts(search: string | null) {
    this.contactService
      .getAllContacts(search)
      .subscribe(({ data: { contacts } }) => {
        this.contactsList = contacts;
      });
  }

  handleDelete(contactId: string) {
    if (!window.confirm("Are you sure to delete this contact?")) return;

    this.contactService.removeContacts([contactId]).subscribe(({ message }) => {
      console.log(message);
      let index = this.contactsList.findIndex(({ _id }) => _id === contactId);
      if (index === -1) return;
      this.contactsList.splice(index, 1);
    });
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
        console.log(message);
        let contact = this.contactsList.find(({ _id }) => _id === contactId);
        if (!contact) return;
        contact.isFavourite = isFavourite;
      });
    } else {
      this.contactService
        .removeFromFavourite(contactId)
        .subscribe(({ message }) => {
          console.log(message);
          let contact = this.contactsList.find(({ _id }) => _id === contactId);
          if (!contact) return;
          contact.isFavourite = isFavourite;
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
    let contactIds = [...this.selectedContactIds];

    this.contactService.removeContacts(contactIds).subscribe(({ message }) => {
      console.log(message);
      this.contactsList = this.contactsList.filter(
        ({ _id }) => !this.selectedContactIds.has(_id)
      );
      this.selectedContactIds = new Set();
    });
  }
}
