import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
  {
    path: "",
    loadComponent: async () => {
      let { AuthLayoutComponent } = await import(
        "./auth-layout/auth-layout.component"
      );
      return AuthLayoutComponent;
    },
    children: [
      {
        path: "sign-in",
        loadComponent: async () => {
          let { SignInComponent } = await import("./signin/signin.component");
          return SignInComponent;
        },
      },
      {
        path: "sign-up",
        loadComponent: async () => {
          let { SignUpComponent } = await import("./signup/signup.component");
          return SignUpComponent;
        },
      },
    ],
  },
];
