import { Component, EventEmitter, Input, inject, Output } from "@angular/core";
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
  @Input() count: number = 0;

  @Output() onDeleteLabel = new EventEmitter<string>();
  @Output() onEditLabel = new EventEmitter<ILabel>();
  @Output() onAddLabel = new EventEmitter();

  router = inject(Router);

  handleTrackLabel(index: number, label: ILabel) {
    return label._id;
  }

  handleDeleteLabel(event: MouseEvent, labelId: string) {
    event.stopPropagation();
    this.onDeleteLabel.emit(labelId);
  }

  handleAddLabel(event: MouseEvent) {
    event.stopPropagation();
    this.onAddLabel.emit();
  }

  handleEditLabel(event: MouseEvent, label: ILabel) {
    event.stopPropagation();
    this.onEditLabel.emit(label);
  }
}
