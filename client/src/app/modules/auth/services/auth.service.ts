import { Injectable, OnInit } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { cookie } from "@/app/core/utils";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authToken = cookie.get("auth_token");

  user: { id: number; email: string; name: string } | null = this.authToken
    ? jwtDecode(this.authToken)
    : null;
}
