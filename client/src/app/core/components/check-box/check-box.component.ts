import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-check-box",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./check-box.component.html",
})
export class CheckBoxComponent {
  @Input() checked = false;

  @Output() onChange = new EventEmitter<Event>();
}
