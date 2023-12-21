import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { cookie } from "@/app/core/utils";
import { IUser } from "../types/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authToken = cookie.get("auth_token");

  router = inject(Router);

  user: IUser | null = this.authToken ? jwtDecode(this.authToken) : null;

  setUser(user: IUser) {
    this.user = user;
  }

  onLogout() {
    this.user = null;
    cookie.remove("auth_token");
    this.router.navigateByUrl("/auth/sign-in");
  }
}
