import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: '',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [AuthService]
})
export class AppComponent {
  constructor(
    public router: Router,
    public authService: AuthService
  ) {}
}
