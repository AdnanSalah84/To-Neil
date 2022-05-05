import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  // loggedIn: boolean;
  // currentUser$: Observable<User>;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }

  login(loginForm: NgForm) {
    // this.accountService.login(this.model).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.loggedIn = true;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    this.accountService.login(this.model).subscribe({
      next: (response) => {
        // console.log(response);
        // this.loggedIn = true;

        this.router.navigateByUrl('/members');
        loginForm.resetForm();
      },
      // error: (error) => {
      //   console.log(error);
      //   this.toastr.error(error.error);
      // },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');

    // this.model = {};
    // this.loggedIn = false;
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: (user) => {
  //       this.loggedIn = !!user;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
