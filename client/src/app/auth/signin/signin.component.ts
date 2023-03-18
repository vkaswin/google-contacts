import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SignInComponent {}
