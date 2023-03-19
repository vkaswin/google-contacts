import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/auth/sign-in" },
  {
    path: "auth",
    loadChildren: async () => {
      let { AuthRoutes } = await import("./modules/auth/auth-routing.module");
      return AuthRoutes;
    },
  },
  {
    path: "contact",
    loadChildren: async () => {
      let { ContactRoutes } = await import(
        "./modules/contact/contact-routing.module"
      );
      return ContactRoutes;
    },
  },
  {
    path: "**",
    loadComponent: async () => {
      let { PageNotFoundComponent } = await import(
        "./core/components/page-not-found/page-not-found.component"
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
