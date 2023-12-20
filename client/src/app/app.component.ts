import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./modules/auth/services/auth.service";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet, MatDialogModule, MatTooltipModule],
})
export class AppComponent {
  title = "google-contacts";

  authService = inject(AuthService);
}
