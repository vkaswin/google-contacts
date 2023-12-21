import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { catchError, tap } from "rxjs";
import { cookie } from "../utils";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authToken = cookie.get("auth_token");

  if (!authToken) return next(req);

  let authReq = req.clone({
    headers: req.headers.set("authorization", authToken),
  });

  return next(authReq).pipe(
    catchError((event: HttpEvent<any>) => {
      if (event instanceof HttpErrorResponse) {
        let { error: { message = "Error" } = {}, status } = event;

        let customEvent = new CustomEvent<{ status: number; message: string }>(
          "httperror",
          {
            detail: {
              status,
              message,
            },
          }
        );

        document.dispatchEvent(customEvent);
      }

      throw event;
    })
  );
};
