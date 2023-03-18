import { Routes } from "@angular/router";

export const ContactRoutes: Routes = [
  {
    path: "",
    loadComponent: async () => {
      let { ContactLayoutComponent } = await import(
        "./contact-layout/contact-layout.component"
      );
      return ContactLayoutComponent;
    },
    children: [
      {
        path: "list",
        loadComponent: async () => {
          let { ContactListComponent } = await import(
            "./contact-list/contact-list.component"
          );
          return ContactListComponent;
        },
      },
      {
        path: ":id/detail",
        loadComponent: async () => {
          let { ContactDetailComponent } = await import(
            "./contact-detail/contact-detail.component"
          );
          return ContactDetailComponent;
        },
      },
    ],
  },
];
