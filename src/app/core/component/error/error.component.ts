import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(public route: ActivatedRoute, private router: Router) {}

  public homeRoute = '/menu/home';

  navigate() {
    this.router.navigateByUrl('/menu/home');
  }
}
