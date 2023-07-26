import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CheckBoxComponent } from "@/app/shared/components/check-box/check-box.component";
import { IContact, IContactList } from "../../types/contact";

@Component({
  selector: "app-contact-table",
  standalone: true,
  imports: [CommonModule, RouterLink, CheckBoxComponent],
  templateUrl: "./contact-table.component.html",
  styles: [],
})
export class ContactTableComponent {
  @Input() contactsList: IContactList = [];

  @Input() isTrash = false;

  @Output() onDelete = new EventEmitter<number>();

  @Output() onRecover = new EventEmitter<number>();

  @Output() onFavourite = new EventEmitter<{
    contactId: number;
    isFavourite: boolean;
  }>();

  handleDelete(event: MouseEvent, contactId: number) {
    event.stopPropagation();
    this.onDelete.emit(contactId);
  }

  handleFavourite(event: MouseEvent, contactId: number, isFavourite: boolean) {
    event.stopPropagation();
    this.onFavourite.emit({ contactId, isFavourite });
  }

  handleRecover(event: MouseEvent, contactId: number) {
    event.stopPropagation();
    this.onRecover.emit(contactId);
  }

  handleTrackContact(index: number, contact: IContact) {
    return contact.contactId;
  }
}
