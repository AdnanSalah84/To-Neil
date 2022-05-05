import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error); //  Try remove   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      },
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error); //  Try remove   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      },
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error); //  Try remove   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      },
    });
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error); //  Try remove   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      },
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error); //  Try remove   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        this.validationErrors = error;
      },
    });
  }
}
