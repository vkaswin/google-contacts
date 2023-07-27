import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
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

  constructor(private router: Router) {}

  handleTrackLabel(index: number, label: ILabel) {
    return label.id;
  }

  handleDeleteLabel(event: MouseEvent, labelId: number) {
    event.stopPropagation();
    console.log("delete label", labelId);
    this.router.navigateByUrl("/contact/list");
  }

  handleEditLabel(event: MouseEvent, labelId: number) {
    event.stopPropagation();
    console.log("edit label", labelId);
  }
}
