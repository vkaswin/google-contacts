import { EventEmitter, Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IContact, IContactDetail, ILabel } from "../types/contact";
import { CONTACT_URL, LABEL_URL } from "@/app/core/constants/apiEndPoints";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  isExpanded = true;

  totalContacts = 0;

  labels: ILabel[] = [];

  onUpdateLabel = new EventEmitter<{
    labelId: string;
    data: Partial<ILabel>;
  }>();

  onCreateLabel = new EventEmitter<ILabel>();

  onDeleteLabel = new EventEmitter<string>();

  onBulkUpload = new EventEmitter();

  constructor() {
    this.onCreateLabel.subscribe((data) => {
      this.labels.push(data);
    });

    this.onUpdateLabel.subscribe(({ labelId, data }) => {
      let index = this.labels.findIndex(({ _id }) => _id === labelId);
      if (index === -1) return;
      this.labels[index] = { ...this.labels[index], ...data };
    });

    this.onDeleteLabel.subscribe((labelId) => {
      let index = this.labels.findIndex(({ _id }) => _id === labelId);
      if (index === -1) return;
      this.labels.splice(index, 1);
    });
  }

  http = inject(HttpClient);

  setIsExpanded(value: boolean) {
    this.isExpanded = value;
  }

  getContactById(contactId: string) {
    return this.http.get<{
      message: string;
      data: { contact: IContactDetail };
    }>(`${CONTACT_URL}/${contactId}/detail`);
  }

  getAllContacts(search: string | null, labelId: string | null) {
    let params: any = {};
    if (search) params.q = search;
    if (labelId) params.labelId = labelId;

    return this.http.get<{
      message: string;
      data: { contacts: IContact[]; starredContacts: IContact[] };
    }>(`${CONTACT_URL}/all`, { params });
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

  downloadSampleFile() {
    return this.http.get(`${CONTACT_URL}/sample`, { responseType: "blob" });
  }

  bulkUpload(file: FormData) {
    return this.http.post<{ message: string }>(`${CONTACT_URL}/upload`, file);
  }

  exportContacts() {
    return this.http.get(`${CONTACT_URL}/export`, { responseType: "blob" });
  }

  getContactCount() {
    this.http
      .get<{
        message: string;
        data: { count: number };
      }>(`${CONTACT_URL}/count`)
      .subscribe(({ data: { count } }) => {
        this.totalContacts = count;
      });
  }

  getAllLabels() {
    this.http
      .get<{ message: string; data: { labels: ILabel[] } }>(`${LABEL_URL}/all`)
      .subscribe(({ data: { labels } }) => {
        this.labels = labels;
      });
  }

  createLabel(data: Partial<ILabel>) {
    return this.http.post<{ message: string; data: { label: ILabel } }>(
      `${LABEL_URL}/create`,
      data
    );
  }

  updateLabelById(labelId: string, data: Partial<ILabel>) {
    return this.http.put<{ message: string }>(
      `${LABEL_URL}/${labelId}/update`,
      data
    );
  }

  removeLabelById(labelId: string) {
    return this.http.delete<{ message: string }>(
      `${LABEL_URL}/${labelId}/remove`
    );
  }

  updateContactLabel(contactId: string, data: { labels: string[] }) {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/label`,
      data
    );
  }
}
