import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
})
export class ContactListComponent {}
