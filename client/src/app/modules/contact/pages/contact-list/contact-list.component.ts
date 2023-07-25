import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactTableComponent } from "../../components/contact-table/contact-table.component";
import { IContactList } from "../../types/contact";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [CommonModule, ContactTableComponent],
  templateUrl: "./contact-list.component.html",
  styles: [],
})
export class ContactListComponent {
  constactsList: IContactList = [
    {
      title: "STARRED CONTACTS",
      isFavourite: true,
      contacts: [
        {
          contactId: 1,
          name: "john Doe",
          phone: 9342342323,
          jobTitle: "Software Engineer",
          company: "Zoho",
          email: "john@gmail.com",
          colorCode: "#EF4770",
          createdAt: "Yesterday, 5:11 PM",
          updatedAt: "Yesterday, 5:11 PM",
        },
        {
          contactId: 2,
          name: "Michel Jordan",
          phone: 8015127363,
          jobTitle: "",
          company: "",
          email: "michel@gmail.com",
          colorCode: "#6F6F6F",
          createdAt: "Yesterday, 5:11 PM",
          updatedAt: "Yesterday, 5:11 PM",
        },
      ],
    },
    {
      title: "CONTACTS",
      isFavourite: false,
      contacts: [
        {
          contactId: 3,
          name: "John Doe",
          phone: 9342342323,
          jobTitle: "Software Engineer",
          company: "Zoho",
          email: "john@gmail.com",
          colorCode: "#DCB604",
          createdAt: "Yesterday, 5:11 PM",
          updatedAt: "Yesterday, 5:11 PM",
        },
        {
          contactId: 4,
          name: "Karthick",
          phone: 8015127363,
          jobTitle: "",
          company: "",
          email: "karthick@gmail.com",
          colorCode: "#199393",
          createdAt: "Yesterday, 5:11 PM",
          updatedAt: "Yesterday, 5:11 PM",
        },
        {
          contactId: 5,
          name: "Mom",
          phone: 9094825472,
          jobTitle: "",
          company: "",
          email: "",
          colorCode: "#029ACD",
          createdAt: "Yesterday, 5:11 PM",
          updatedAt: "Yesterday, 5:11 PM",
        },
      ],
    },
  ];

  handleDelete(contactId: number) {
    console.log(contactId, "delete");
  }

  handleFavourite({
    contactId,
    isFavourite,
  }: {
    contactId: number;
    isFavourite: boolean;
  }) {
    console.log(contactId, isFavourite, "favourite");
  }
}
