import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthService } from "./modules/auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [RouterOutlet, MatDialogModule, MatSnackBarModule],
})
export class AppComponent implements OnInit {
  title = "google-contacts";

  authService = inject(AuthService);

  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    document.addEventListener("httperror", this.handleHttpError.bind(this));
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["snackbar-warning", "text-center"],
    });
  }

  handleHttpError({ detail: { status, message } }: any) {
    this.showSnackBar(message);
    if (status === 401) this.authService.onLogout();
  }
}
