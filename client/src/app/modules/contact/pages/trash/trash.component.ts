import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactHeaderComponent } from "../../components/contact-header/contact-header.component";
import { ContactListComponent } from "../../components/contact-list/contact-list.component";
import { IContact } from "../../types/contact";

@Component({
  selector: "app-trash",
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactHeaderComponent],
  templateUrl: "./trash.component.html",
  styles: [],
})
export class TrashComponent {
  contactsList: IContact[] = [];

  selectedContactIds = new Set<number>();

  handleRecover(contactId: number) {
    console.log(contactId, "recover");
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
