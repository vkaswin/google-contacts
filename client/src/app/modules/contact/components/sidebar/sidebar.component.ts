import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ILabel } from "../../types/contact";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent {
  @Input() labels: ILabel[] = [];

  handleTrackLabel(index: number, label: ILabel) {
    return label.id;
  }
}
