import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent {
  @Output() onToggleMenu = new EventEmitter();

  handleClick() {
    this.onToggleMenu.emit();
  }
}
