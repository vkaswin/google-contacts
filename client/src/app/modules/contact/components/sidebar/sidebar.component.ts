import { Component, Input } from "@angular/core";
import { CommonModule, NgFor } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ILabel } from "../../types/contact";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgFor],
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent {
  @Input() labels: ILabel[] = [];

  trackLabel(index: number, label: ILabel) {
    return label.id;
  }
}
