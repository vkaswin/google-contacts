import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact, ILabel } from "../types/contact";
import { CONTACT_URL } from "@/app/core/constants/apiEndPoints";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  isExpanded = true;

  labels: ILabel[] = [
    { id: 1, title: "Home" },
    { id: 2, title: "Office" },
  ];

  constructor(private http: HttpClient) {}

  setIsExpanded(value: boolean) {
    this.isExpanded = value;
  }

  getContactById(contactId: string) {
    return this.http.get<{ message: string; data: { contact: IContact } }>(
      `${CONTACT_URL}/${contactId}/detail`,
      {}
    );
  }

  getAllContacts() {
    return this.http.get<{ message: string; data: { contacts: IContact[] } }>(
      `${CONTACT_URL}/all`
    );
  }

  updateContactById(contactId: string, data: Partial<IContact>) {
    return this.http.put(`${CONTACT_URL}/${contactId}/update`, data);
  }

  removeContactById(contactId: string) {
    return this.http.delete(`${CONTACT_URL}/${contactId}/remove`);
  }

  createContact(data: Partial<IContact>) {
    return this.http.post(`${CONTACT_URL}/create`, data);
  }
}
