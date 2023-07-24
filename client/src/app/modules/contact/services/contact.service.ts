import { Injectable } from "@angular/core";
import { ILabel } from "../types/contact";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  isExpanded = true;

  labels: ILabel[] = [
    { id: 1, title: "Home" },
    { id: 2, title: "Office" },
  ];

  constructor() {}

  setIsExpanded(value: boolean) {
    this.isExpanded = value;
  }
}
