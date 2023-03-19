import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
  {
    path: "",
    loadComponent: async () => {
      let { LayoutComponent } = await import("./layout/layout.component");
      return LayoutComponent;
    },
    children: [
      {
        path: "sign-in",
        loadComponent: async () => {
          let { SignInComponent } = await import(
            "./pages/sign-in/sign-in.component"
          );
          return SignInComponent;
        },
      },
      {
        path: "sign-up",
        loadComponent: async () => {
          let { SignUpComponent } = await import(
            "./pages/sign-up/sign-up.component"
          );
          return SignUpComponent;
        },
      },
    ],
  },
];
