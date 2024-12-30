import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      u_id: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      s_name: [''],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      coordinates: ['', Validators.required],
      gender: ['', Validators.required],
      dofb: ['', Validators.required],
      is_married: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}
