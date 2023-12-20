import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-label-popup",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./label-popup.component.html",
  styles: [],
})
export class LabelPopupComponent {
  constructor(private dialogRef: MatDialogRef<LabelPopupComponent>) {
    console.log(dialogRef);
  }
}
