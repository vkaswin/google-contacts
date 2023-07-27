import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ILabel } from "../types/contact";
import { Observable } from "rxjs";

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
    return new Observable();
    return this.http.get(`/${contactId}`, {});
  }
}
