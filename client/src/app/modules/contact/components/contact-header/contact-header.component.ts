import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-contact-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./contact-header.component.html",
  styles: [],
})
export class ContactHeaderComponent {
  @Input() isTrash = false;

  @Input() selectedContacts = 0;

  @Output() onClearSelectedContacts = new EventEmitter();

  @Output() onDeleteSelectedContacts = new EventEmitter();

  @Output() onExportContact = new EventEmitter();

  handleClearAllSelectedContacts() {
    this.onClearSelectedContacts.emit();
  }

  handleDeleteAllSelectedContacts() {
    this.onDeleteSelectedContacts.emit();
  }

  handleExportContact() {
    this.onExportContact.emit();
  }
}
