import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl } from '@angular/forms';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SharedModule],
  providers: [ LoginService],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  gridColumns = 4;
  colorControl = new FormControl('ascending');

  public dialog = inject(MatDialog);
  private loginService = inject(LoginService);
  private router = inject(Router);

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  logout() {
    this.loginService.setLoggedOut();
    this.router.navigate(['/']);
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
