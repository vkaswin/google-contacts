import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactTableComponent } from "../../components/contact-table/contact-table.component";
import { IContactList } from "../../types/contact";

@Component({
  selector: "app-trash",
  standalone: true,
  imports: [CommonModule, ContactTableComponent],
  templateUrl: "./trash.component.html",
  styles: [],
})
export class TrashComponent {
  contactsList: IContactList = [
    {
      title: "Trash",
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
  ];

  handleRecover(contactId: number) {
    console.log(contactId, "recover");
  }

  handleEmptyTrash() {
    console.log("empty trash");
  }
}
