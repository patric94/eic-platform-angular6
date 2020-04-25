import { Component } from '@angular/core';
import {AppComponent} from '../../../../src/app/app.component';

@Component({
  selector: 'app-root',
  templateUrl: './neanias-app.component.html',
})
export class neaniasAppComponent extends AppComponent {
  title = 'NEANIAS';

  private scrollToTop() {
    window.scrollTo(0, 0);
  }
}
