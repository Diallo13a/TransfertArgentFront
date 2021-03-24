import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    this.userService.getUser(Number(id))
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
      });
  }

  logout() {
    if (confirm('Voulez-vous vraiment vous deconnecter?')) {
      const token = localStorage.getItem('token') ;
      localStorage.clear();
      this.router.navigateByUrl('');
    }
  }
}
