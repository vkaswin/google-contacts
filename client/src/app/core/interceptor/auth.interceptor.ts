import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from "@angular/common/http";
import { catchError } from "rxjs";
import { cookie } from "../utils";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authToken = cookie.get("auth_token");

  let cloneReq = req.clone({
    ...(authToken && { headers: req.headers.set("authorization", authToken) }),
  });

  return next(cloneReq).pipe(
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
