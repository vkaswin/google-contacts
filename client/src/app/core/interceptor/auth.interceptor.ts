import { HttpInterceptorFn } from "@angular/common/http";
import { cookie } from "../utils";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authToken = cookie.get("auth_token");

  if (!authToken) return next(req);

  let authReq = req.clone({
    headers: req.headers.set("authorization", authToken),
  });

  return next(authReq);
};
