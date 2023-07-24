import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/auth/sign-in" },
  {
    path: "auth",
    loadChildren: async () => {
      let m = await import("./modules/auth/auth-routing.module");
      return m.AuthRoutes;
    },
  },
  {
    path: "contact",
    loadChildren: async () => {
      let m = await import("./modules/contact/contact-routing.module");
      return m.ContactRoutes;
    },
  },
  {
    path: "**",
    loadComponent: async () => {
      let c = await import(
        "./core/components/page-not-found/page-not-found.component"
      );
      return c.PageNotFoundComponent;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
