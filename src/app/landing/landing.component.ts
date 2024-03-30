import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl } from '@angular/forms';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { DialogData, ListProduct, ListProductResponse } from '../shared/app.model';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent implements OnInit{
  gridColumns = 4;
  load = true;
  sortControl = new FormControl('ascending');
  masterProductList!: ListProduct[];
  productList!: ListProduct[];

  public dialog = inject(MatDialog);
  private loginService = inject(LoginService);
  private productService = inject(ProductService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  fallBackImage!: string;

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.productService.getAllProducts({list_products: true}).subscribe((res: ListProductResponse) => {
      this.productList = res.products;
      this.masterProductList = res.products;
      this.sortProducts(this.sortControl.value as string);
    });
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
    const data = {
      title: 'Add new product'
    };
    this.handleDialogToggle(data);

  }

  updateProduct(product: ListProduct) {
    const data = {
      product: product,
      title: 'Update product'
    };
    this.handleDialogToggle(data);
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
    this.sortProducts(this.sortControl.value as string);
  }

  handleDialogToggle(data: DialogData) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      minWidth: '300px',
      width: '40%',
      data: data
    });

    this.dialogService.closeDialogSubject.subscribe(res => {
      dialogRef.close();
      this.getProductsList();
    });
  }
}
