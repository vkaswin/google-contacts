import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-contact-header",
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: "./contact-header.component.html",
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
