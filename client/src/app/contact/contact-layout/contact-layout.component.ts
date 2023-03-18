import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-contact-layout",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./contact-layout.component.html",
  styleUrls: ["./contact-layout.component.scss"],
})
export class ContactLayoutComponent {}
