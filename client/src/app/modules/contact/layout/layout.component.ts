import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {}
