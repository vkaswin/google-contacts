import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: "./layout.component.html",
})
export class LayoutComponent {
  contactService = inject(ContactService);

  get isExpanded() {
    return this.contactService.isExpanded;
  }

  get labels() {
    return this.contactService.labels;
  }

  handleToggleMenu() {
    this.contactService.setIsExpanded(!this.isExpanded);
  }
}
