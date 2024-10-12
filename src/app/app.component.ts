import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: '',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule]
})
export class AppComponent {
  constructor(public router: Router) {}
}
