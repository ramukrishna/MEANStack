import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoggedInUsers } from '../../interfaces/userinterface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  // users :LoggedInUsers[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource!: MatTableDataSource<LoggedInUsers>;

  constructor(private http: HttpClient, private authservice: AuthService) {
    this.dataSource = new MatTableDataSource<LoggedInUsers>();
  }

  ngOnInit(): void {
    this.authservice.getallUsers({ name: 'ram' }).subscribe(data => {
      this.dataSource = data;
    });
  }

  view(element: any) {
    console.log('View:', element);
  }
  edit(element: any) { 
    console.log('Edit:', element); 
  }
  delete(element: any) { 
    console.log('Delete:', element); 
  }
}
