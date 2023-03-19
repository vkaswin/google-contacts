import { Routes } from "@angular/router";

export const ContactRoutes: Routes = [
  {
    path: "",
    loadComponent: async () => {
      let { LayoutComponent } = await import("./layout/layout.component");
      return LayoutComponent;
    },
    children: [
      {
        path: "list",
        loadComponent: async () => {
          let { ListComponent } = await import("./pages/list/list.component");
          return ListComponent;
        },
      },
      {
        path: ":id/detail",
        loadComponent: async () => {
          let { DetailComponent } = await import(
            "./pages/detail/detail.component"
          );
          return DetailComponent;
        },
      },
    ],
  },
];
