import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { ContactService } from "../services/contact.service";
import { LabelPopupComponent } from "../components/label-popup/label-popup.component";
import { ILabel } from "../types/contact";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    MatSnackBarModule,
  ],
  templateUrl: "./layout.component.html",
})
export class LayoutComponent implements OnInit {
  contactService = inject(ContactService);

  authService = inject(AuthService);

  dialog = inject(MatDialog);

  snackBar = inject(MatSnackBar);

  router = inject(Router);

  get isExpanded() {
    return this.contactService.isExpanded;
  }

  get count() {
    return this.contactService.totalContacts;
  }

  get labels() {
    return this.contactService.labels;
  }

  ngOnInit(): void {
    this.contactService.getAllLabels();
    this.contactService.getContactCount();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  handleToggleMenu() {
    this.contactService.setIsExpanded(!this.isExpanded);
  }

  handleDeleteLabel(labelId: string) {
    if (!window.confirm("Are you sure to delete this lable")) return;

    this.contactService.removeLabelById(labelId).subscribe(({ message }) => {
      this.showSnackBar(message);
      this.contactService.onDeleteLabel.emit(labelId);
      this.router.navigateByUrl("/contact/list");
    });
  }

  handleAddLabel() {
    this.dialog.open(LabelPopupComponent, {
      width: "368px",
      data: {
        isEdit: false,
      },
    });
  }

  handleEditLabel(label: ILabel) {
    this.dialog.open(LabelPopupComponent, {
      width: "368px",
      data: {
        label,
        isEdit: true,
      },
    });
  }
}
