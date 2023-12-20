import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactService } from "../../services/contact.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bulk-upload",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./bulk-upload.component.html",
  styles: [],
})
export class BulkUploadComponent {
  contactService = inject(ContactService);

  router = inject(Router);

  handleFileChange(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (!files || !files.length) return;

    const formData = new FormData();

    formData.append("file", files[0]);

    this.contactService.bulkUpload(formData).subscribe(({ message }) => {
      console.log(message);
      this.router.navigateByUrl("/contact/list");
    });
  }
}
