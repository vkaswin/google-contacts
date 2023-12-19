import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact, IContactDetail, ILabel } from "../types/contact";
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

  http = inject(HttpClient);

  setIsExpanded(value: boolean) {
    this.isExpanded = value;
  }

  getContactById(contactId: string) {
    return this.http.get<{
      message: string;
      data: { contact: IContactDetail };
    }>(`${CONTACT_URL}/${contactId}/detail`, {});
  }

  getAllContacts(search: string | null) {
    return this.http.get<{ message: string; data: { contacts: IContact[] } }>(
      `${CONTACT_URL}/all`,
      { params: search ? { q: search } : undefined }
    );
  }

  updateContactById(contactId: string, data: Partial<IContactDetail>) {
    return this.http.put(`${CONTACT_URL}/${contactId}/update`, data);
  }

  removeContacts(contactIds: string[]) {
    return this.http.delete<{ message: string }>(`${CONTACT_URL}/remove`, {
      body: contactIds,
    });
  }

  addToFavourite(contactId: string) {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/favourite`,
      {}
    );
  }

  removeFromFavourite(contactId: string) {
    return this.http.delete<{ message: string }>(
      `${CONTACT_URL}/${contactId}/favourite`
    );
  }

  createContact(data: Partial<IContactDetail>) {
    return this.http.post<{
      message: string;
      data: { contact: Partial<IContactDetail> };
    }>(`${CONTACT_URL}/create`, data);
  }

  recoverContact(contactId: string) {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/recover`,
      {}
    );
  }

  getAllTrash() {
    return this.http.get<{ message: string; data: { contacts: IContact[] } }>(
      `${CONTACT_URL}/trash`
    );
  }

  clearTrash(contactIds?: string[]) {
    return this.http.delete<{ message: string }>(`${CONTACT_URL}/trash`, {
      body: contactIds,
    });
  }
}
