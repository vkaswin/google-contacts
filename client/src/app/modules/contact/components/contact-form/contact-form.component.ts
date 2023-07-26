import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
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

  constructor(private fb: FormBuilder) {
    this.formControl = fb.group({
      firstName: fb.control({}, { validators: [Validators.required] }),
      lastName: fb.control({}, { validators: [Validators.required] }),
      nickName: fb.control({}, { validators: [] }),
      company: fb.control({}, { validators: [] }),
      jobTitle: fb.control({}, {}),
    });
  }

  ngOnInit(): void {}

  handleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
