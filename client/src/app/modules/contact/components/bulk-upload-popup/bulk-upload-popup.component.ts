import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "app-bulk-upload-popup",
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: "./bulk-upload-popup.component.html",
})
export class BulkUploadPopupComponent {
  contactService = inject(ContactService);

  router = inject(Router);

  snackBar = inject(MatSnackBar);

  dialogRef = inject(MatDialogRef<BulkUploadPopupComponent>);

  file: File | null = null;

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  downloadSampleExcelSheet() {
    this.contactService.downloadSampleFile().subscribe((blob) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "sample-file";
      a.click();
    });
  }

  handleFileUpload() {
    if (!this.file) return;

    const formData = new FormData();

    formData.append("file", this.file);

    this.contactService.bulkUpload(formData).subscribe(({ message }) => {
      this.contactService.getContactCount();
      this.contactService.onBulkUpload.emit();
      this.showSnackBar(message);
      this.dialogRef.close();
    });
  }

  handleFileChange(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (!files || !files.length) return;

    this.file = files[0];
  }
}
