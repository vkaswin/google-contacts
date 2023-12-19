import { inject } from "@angular/core";
import { cookie } from "../utils";
import { Router } from "@angular/router";

export function AuthGaurd() {
  let route = inject(Router);

  let authToken = cookie.get("auth_token");

  if (!authToken) return true;

  return route.navigate(["/contact/list"]);
}
