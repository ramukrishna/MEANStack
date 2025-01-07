import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  // ];

  public appPages =  [
    {
      "title": "About",
      "icon": "info",
      "route": "basic/about"
    },
    {
      "title": "Services",
      "icon": "build",
      "route": "basic/services"
    },
    {
      "title": "Contact",
      "icon": "contacts",
      "route": "basic/contact"
    },
    {
      "title": "Auth",
      "icon": "contacts",  
      "children": [
        {
          "title": "Login",
          "icon": "login",
          "route": "auth/login"
        },
        {
          "title": "Register",
          "icon": "person_add",
          "route": "auth/register"
        },
        {
          "title": "Forgot Password",
          "icon": "forgotpassword",
          "route": "auth/forgotpassword"
        },
        {
          "title": "Reset Password",
          "icon": "resetpassword",
          "route": "auth/resetpassword"
        }
      ]
    },
    {
      "title": "Settings",
      "icon": "settings",
      "children": [
        { "title": "Profile", "icon": "account_circle" },
        { "title": "Preferences", "icon": "tune" }
      ]
    },
  
    {
      "title": "logout",
      "icon": "logout",
      "fucntion": "logout"
    }
  ]
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
