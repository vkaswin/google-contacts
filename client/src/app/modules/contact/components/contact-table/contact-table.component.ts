import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IContact, IContactList } from "../../types/contact";

@Component({
  selector: "app-contact-table",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./contact-table.component.html",
  styles: [],
})
export class ContactTableComponent {
  @Input() contactsList: IContactList = [];

  @Output() onDeleteContact = new EventEmitter<number>();

  @Output() onFavouriteContact = new EventEmitter<{
    contactId: number;
    isFavourite: boolean;
  }>();

  onDelete(event: MouseEvent, contactId: number) {
    event.stopPropagation();
    this.onDeleteContact.emit(contactId);
  }

  onFavourite(event: MouseEvent, contactId: number, isFavourite: boolean) {
    event.stopPropagation();
    this.onFavouriteContact.emit({ contactId, isFavourite });
  }

  handleTrackContact(index: number, contact: IContact) {
    return contact.contactId;
  }
}
