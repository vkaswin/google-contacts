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
          let c = await import("./pages/all-contacts/all-contacts.component");
          return c.ContactListPageComponent;
        },
      },
      {
        path: "add",
        loadComponent: async () => {
          let c = await import("./pages/add-contact/add-contact.component");
          return c.AddContactComponent;
        },
      },
      {
        path: ":contactId/edit",
        loadComponent: async () => {
          let c = await import("./pages/edit-contact/edit-contact.component");
          return c.EditContactComponent;
        },
      },
      {
        path: ":contactId/view",
        loadComponent: async () => {
          let c = await import("./pages/view-contact/view-contact.component");
          return c.ViewContactComponent;
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
