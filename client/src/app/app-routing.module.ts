import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/auth/sign-in" },
  {
    path: "auth",
    loadChildren: async () => {
      let { AuthRoutes } = await import("./auth/auth-routes");
      return AuthRoutes;
    },
  },
  {
    path: "contact",
    loadChildren: async () => {
      let { ContactRoutes } = await import("./contact/contact-routes");
      return ContactRoutes;
    },
  },
  {
    path: "**",
    loadComponent: async () => {
      let { PageNotFoundComponent } = await import(
        "./page-not-found/page-not-found.component"
      );
      return PageNotFoundComponent;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
