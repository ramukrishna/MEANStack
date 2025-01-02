import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem, NavItem } from '../interfaces/userinterface';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  menuItems: NavItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<NavItem[]>('assets/menuitems.json').subscribe(data => {
      this.menuItems = data;
    });
  }
}
