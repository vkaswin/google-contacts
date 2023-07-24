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
          let c = await import("./pages/contact-list/contact-list.component");
          return c.ContactListComponent;
        },
      },
      {
        path: "detail/:contactId",
        loadComponent: async () => {
          let c = await import(
            "./pages/contact-detail/contact-detail.component"
          );
          return c.ContactDetailComponent;
        },
      },
      {
        path: "trash",
        loadComponent: async () => {
          let c = await import("./pages/trash/trash.component");
          return c.TrashComponent;
        },
      },
      {
        path: "label/:labelId",
        loadComponent: async () => {
          let c = await import(
            "./pages/contact-by-label/contact-by-label.component"
          );
          return c.ContactByLabelComponent;
        },
      },
    ],
  },
];
