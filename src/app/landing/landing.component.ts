import { Component, OnInit, inject, ɵ_sanitizeUrl } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl } from '@angular/forms';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { ListProduct, ListProductResponse } from '../shared/app.model';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SharedModule],
  providers: [ LoginService, ProductService],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent implements OnInit{
  gridColumns = 4;
  load = true;
  colorControl = new FormControl('ascending');
  masterProductList!: ListProduct[];
  productList!: ListProduct[];

  public dialog = inject(MatDialog);
  private loginService = inject(LoginService);
  private productService = inject(ProductService);
  private router = inject(Router);
  fallBackImage!: string;

  ngOnInit(): void {
    this.productService.getAllProducts({list_products: true}).subscribe((res: ListProductResponse) => {
      this.productList = res.products;
      this.masterProductList = res.products;
      this.sortProducts('ascending');
    })
  }   


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

  sortProducts(event: string) {
    if(event === 'ascending') {
      this.productList.sort((a,b) => {
        return a.price - b.price;
      });
    } else {
      this.productList.sort((a,b) => {
        return b.price - a.price;
      });
    }
  }

  filterProducts(range: string, value: number) {
    if(range === 'lower-range') {
      this.productList = this.masterProductList.filter(e => e.price >= value);
    } else {
      this.productList = this.masterProductList.filter(e => e.price <= value);
    }
    this.sortProducts(this.colorControl.value as string);
  }
}
