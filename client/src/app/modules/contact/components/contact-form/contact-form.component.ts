import { Component, OnInit } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";
import { InputComponent } from "@/app/shared/components/input/input.component";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: "./contact-form.component.html",
  styles: [],
})
export class ContactFormComponent implements OnInit {
  formControl;
  isExpanded = false;

  constructor(private fb: FormBuilder, private location: Location) {
    this.formControl = fb.group({
      firstName: fb.control({}, { validators: [Validators.required] }),
      lastName: fb.control({}, { validators: [Validators.required] }),
      nickName: fb.control({}, { validators: [] }),
      company: fb.control({}, { validators: [Validators.required] }),
      jobTitle: fb.control({}, { validators: [Validators.required] }),
      department: fb.control({}, {}),
      email: fb.control({}, { validators: [Validators.required] }),
      phone: fb.control({}, { validators: [Validators.required] }),
      country: fb.control({}, {}),
      addressLine1: fb.control({}, {}),
      addressLine2: fb.control({}, {}),
      state: fb.control({}, {}),
      city: fb.control({}, {}),
      pincode: fb.control({}, {}),
      birthday: fb.control({}, { validators: [Validators.required] }),
      event: fb.control({}, {}),
      website: fb.control({}, {}),
      relatedPeople: fb.control({}, {}),
      chat: fb.control({}, {}),
      notes: fb.control({}, { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {}

  handleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  handleSaveFrom() {
    console.log("save form");
    this.handleCloseForm();
  }

  handleCloseForm() {
    this.location.back();
  }
}
