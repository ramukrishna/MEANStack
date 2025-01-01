import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoggedInUsers } from '../../interfaces/userinterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit  {

  users :LoggedInUsers[] = [];

  constructor(private http: HttpClient,private authservice:AuthService){

  }

  ngOnInit(): void {
   this.authservice.getallUsers({name:'ram'}).subscribe(data => { 
                    this.users = data;
                   });
  }
}
