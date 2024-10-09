import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: '',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  constructor(public router: Router) {}
}
