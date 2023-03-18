import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-auth-layout",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent {}
