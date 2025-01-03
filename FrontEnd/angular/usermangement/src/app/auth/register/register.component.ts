import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '../../interfaces/userinterface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  geolocation!: Geolocation;

  constructor(private fb: FormBuilder, private geolocationService:GeolocationService) { }

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
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      gender: ['', Validators.required],
      dofb: ['', Validators.required],
      is_married: ['', Validators.required],
    });

    this.getLocation();
  }

  getLocation(): void {
    this.geolocationService.getCurrentLocation().then(s_result => {
      this.geolocation = s_result;
      console.log(s_result);
    }).catch(e_result => {
      this.geolocation = e_result;
      console.log(e_result)
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
