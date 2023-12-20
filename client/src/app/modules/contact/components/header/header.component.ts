import { Component, EventEmitter, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import { debounce } from "@/app/core/utils";
import { AuthService } from "@/app/modules/auth/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent {
  @Output() onToggleMenu = new EventEmitter();

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  authService = inject(AuthService);

  handleClick() {
    this.onToggleMenu.emit();
  }

  get search() {
    return this.activatedRoute.snapshot.queryParams["q"] || "";
  }

  get initial() {
    if (!this.authService.user) return "";
    let [firstLetter, secondLetter = ""] =
      this.authService.user.name.split(" ");
    return `${firstLetter[0].toUpperCase()}${secondLetter[0].toUpperCase()}`.trim();
  }

  handleChange = debounce<Event>((event) => {
    let { value } = event.target as HTMLInputElement;
    this.router.navigate([], { queryParams: { q: value || null } });
  }, 500);
}
