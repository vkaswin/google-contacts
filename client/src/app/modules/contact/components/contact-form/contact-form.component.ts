import { Component, OnInit } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { InputComponent } from "@/app/shared/components/input/input.component";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: "./contact-form.component.html",
  styles: [],
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;
  isExpanded = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = fb.group({
      firstName: fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      lastName: fb.control(null, [
        Validators.min(3),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      nickName: fb.control(null, [
        Validators.min(3),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      company: fb.control(null),
      jobTitle: fb.control(null),
      department: fb.control(null),
      email: fb.control(null, [Validators.email]),
      phone: fb.control(null, [
        Validators.pattern(
          /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9][02-9])\s*\)|([2-9][02-9]))\s*(?:[.-]\s*)?)?([2-9][0-9]{2})\s*(?:[.-]\s*)?([0-9]{4})      /
        ),
      ]),
      country: fb.control(null),
      addressLine1: fb.control(null),
      addressLine2: fb.control(null),
      state: fb.control(null),
      city: fb.control(null),
      pincode: fb.control(null, [Validators.pattern(/^\d{6}$/)]),
      birthday: fb.control(null, [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
      event: fb.control(null),
      website: fb.control(null, [
        Validators.pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        ),
      ]),
      relatedPeople: fb.control(null),
      chat: fb.control(null),
      notes: fb.control(null),
    });
  }

  ngOnInit(): void {}

  get firstName() {
    return this.form.controls["firstName"] as FormControl;
  }

  get lastName() {
    return this.form.controls["lastName"] as FormControl;
  }

  get nickName() {
    return this.form.controls["nickName"] as FormControl;
  }

  get company() {
    return this.form.controls["company"] as FormControl;
  }

  get jobTitle() {
    return this.form.controls["jobTitle"] as FormControl;
  }

  get department() {
    return this.form.controls["department"] as FormControl;
  }

  get email() {
    return this.form.controls["email"] as FormControl;
  }

  get phone() {
    return this.form.controls["phone"] as FormControl;
  }

  get addressLine1() {
    return this.form.controls["addressLine1"] as FormControl;
  }

  get addressLine2() {
    return this.form.controls["addressLine2"] as FormControl;
  }

  get state() {
    return this.form.controls["state"] as FormControl;
  }

  get city() {
    return this.form.controls["city"] as FormControl;
  }

  get pincode() {
    return this.form.controls["pincode"] as FormControl;
  }

  get birthday() {
    return this.form.controls["birthday"] as FormControl;
  }

  get event() {
    return this.form.controls["event"] as FormControl;
  }

  get website() {
    return this.form.controls["website"] as FormControl;
  }

  get relatedPeople() {
    return this.form.controls["relatedPeople"] as FormControl;
  }

  get chat() {
    return this.form.controls["chat"] as FormControl;
  }

  get notes() {
    return this.form.controls["notes"] as FormControl;
  }
  handleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  handleSaveFrom() {
    if (!this.isSubmitted) this.isSubmitted = true;

    if (!this.form.valid) return;

    console.log(this.form.value);
    this.handleCloseForm();
  }

  handleCloseForm() {
    this.location.back();
  }
}
