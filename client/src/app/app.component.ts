import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./modules/auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = "google-contacts";

  authService = inject(AuthService);
}
