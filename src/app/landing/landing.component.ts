import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  gridColumns = 4;
  colorControl = new FormControl('ascending');

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  logout() {
  }

  addProduct() {

  }
}
