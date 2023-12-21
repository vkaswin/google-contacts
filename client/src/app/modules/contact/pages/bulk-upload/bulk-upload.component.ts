import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "app-bulk-upload",
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: "./bulk-upload.component.html",
  styles: [],
})
export class BulkUploadComponent {
  contactService = inject(ContactService);

  router = inject(Router);

  snackBar = inject(MatSnackBar);

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  handleFileChange(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (!files || !files.length) return;

    const formData = new FormData();

    formData.append("file", files[0]);

    this.contactService.bulkUpload(formData).subscribe(({ message }) => {
      this.showSnackBar(message);
      this.router.navigateByUrl("/contact/list");
    });
  }
}
