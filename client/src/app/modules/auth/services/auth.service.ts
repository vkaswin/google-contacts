import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { cookie } from "@/app/core/utils";
import { ISignIn, ISignUp, IUser } from "../types/auth";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { USER_URL } from "@/app/core/constants/apiEndPoints";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authToken = cookie.get("auth_token");

  router = inject(Router);

  http = inject(HttpClient);

  user: IUser | null = this.authToken ? jwtDecode(this.authToken) : null;

  setUser(user: IUser) {
    this.user = user;
  }

  onLogout() {
    this.user = null;
    cookie.remove("auth_token");
    this.router.navigateByUrl("/auth/sign-in");
  }

  handleAuthResponse(token: string) {
    cookie.set({
      days: 28,
      name: "auth_token",
      value: token,
    });
    this.setUser(jwtDecode(token));
    this.router.navigateByUrl("/contact/list", { replaceUrl: true });
  }

  signIn(data: ISignIn) {
    this.http
      .post<{ message: string; data: { token: string } }>(
        `${USER_URL}/sign-in`,
        data
      )
      .subscribe(({ message, data: { token } }) => {
        this.handleAuthResponse(token);
      });
  }

  signUp(data: ISignUp) {
    this.http
      .post<{ message: string; data: { token: string } }>(
        `${USER_URL}/sign-up`,
        data
      )
      .subscribe(({ message, data: { token } }) => {
        this.handleAuthResponse(token);
      });
  }
}
