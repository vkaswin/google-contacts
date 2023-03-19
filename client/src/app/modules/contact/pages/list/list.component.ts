import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {}
