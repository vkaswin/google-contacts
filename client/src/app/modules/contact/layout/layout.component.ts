import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { ContactService } from "../services/contact.service";
import { LabelPopupComponent } from "../components/label-popup/label-popup.component";
import { ILabel } from "../types/contact";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: "./layout.component.html",
})
export class LayoutComponent implements OnInit {
  labels: ILabel[] = [
    { _id: "1", name: "Home" },
    { _id: "2", name: "Office" },
  ];

  contactService = inject(ContactService);

  dialog = inject(MatDialog);

  get isExpanded() {
    return this.contactService.isExpanded;
  }

  get count() {
    return this.contactService.totalContacts;
  }

  ngOnInit(): void {
    this.contactService.getContactCount();
  }

  handleToggleMenu() {
    this.contactService.setIsExpanded(!this.isExpanded);
  }

  handleDeleteLabel(labelId: string) {
    if (!window.confirm("Are you sure to delete this lable")) return;
    console.log(labelId);
  }

  handleEditLabel(labelId: string) {
    console.log(labelId);
    this.dialog.open(LabelPopupComponent);
  }
}
