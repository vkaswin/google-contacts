import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { ContactService } from "../../services/contact.service";
import { InputComponent } from "@/app/core/components/input/input.component";
import { ILabel } from "../../types/contact";

@Component({
  selector: "app-label-popup",
  standalone: true,
  imports: [CommonModule, InputComponent, MatSnackBarModule],
  templateUrl: "./label-popup.component.html",
})
export class LabelPopupComponent implements OnInit {
  dialogRef = inject(MatDialogRef<LabelPopupComponent>);

  formBuilder = inject(FormBuilder);

  snackBar = inject(MatSnackBar);

  props = inject(MAT_DIALOG_DATA) as {
    label: ILabel;
    isEdit: boolean;
  };

  contactService = inject(ContactService);

  form = this.formBuilder.group({
    name: this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  isSubmitted = false;

  get name() {
    return this.form.controls["name"];
  }

  ngOnInit(): void {
    if (!this.props.isEdit) return;

    this.form.setValue({
      name: this.props.label.name,
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 3000 });
  }

  handleSubmit() {
    if (!this.isSubmitted) this.isSubmitted = true;

    if (!this.form.valid) return;

    let data = this.form.value as ILabel;

    if (this.props.isEdit) {
      this.contactService
        .updateLabelById(this.props.label._id, data)
        .subscribe(({ message }) => {
          this.showSnackBar(message);
          this.contactService.onUpdateLabel.emit({
            labelId: this.props.label._id,
            data,
          });
          this.dialogRef.close();
        });
    } else {
      this.contactService
        .createLabel(data)
        .subscribe(({ message, data: { label } }) => {
          this.showSnackBar(message);
          this.contactService.onCreateLabel.emit(label);
          this.dialogRef.close();
        });
    }
  }
}
