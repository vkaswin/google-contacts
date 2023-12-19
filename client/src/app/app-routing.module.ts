import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactGaurd } from "@/app/core/gaurds/contact.gaurd";
import { AuthGaurd } from "@/app/core/gaurds/auth.gaurd";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/auth/sign-in" },
  {
    path: "auth",
    canActivate: [AuthGaurd],
    loadChildren: async () => {
      let m = await import("./modules/auth/auth-routing.module");
      return m.AuthRoutes;
    },
  },
  {
    path: "contact",
    canActivate: [ContactGaurd],
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
