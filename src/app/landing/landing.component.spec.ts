import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { ProductService } from '../shared/product.service';
import { of } from 'rxjs';

const productList = [{
  "product_id": "4",
  "product_name": "Himalaya",
  "image": "https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn:ANd9GcToCzFlHQHBCJGLHnFp5DPlxW1QCKGMCECcrQ&s",
  "description": "This is best camera",
  "price": 7600,
  "del_status": "0"
},
{
  "product_id": "7",
  "product_name": "Mobile",
  "image": "https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn:ANd9GcToCzFlHQHBCJGLHnFp5DPlxW1QCKGMCECcrQ&s",
  "description": "This is best camera",
  "price": 76000,
  "del_status": "0"
}];

const getProductsResponseMock = {
  "status": "success",
  "products": productList
}

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [provideAnimations()
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOninit', () => {
    const getAllProductsSpy = spyOn(component, 'getProductsList').and.callThrough();
    component.ngOnInit();
    expect(getAllProductsSpy).toHaveBeenCalled();
  });

  it('should formatLabel', () => {
    const label = component.formatLabel(7000);
    const labelWithoutK = component.formatLabel(3);
    expect(label).toEqual('7k');
    expect(labelWithoutK).toEqual('3');
  });

  it('should add product', () => {
    const data = {
      title: 'Add new product'
    };
    const handleSpy = spyOn(component, 'handleDialogToggle');
    component.addProduct();
    expect(handleSpy).toHaveBeenCalledWith(data);
  });

  it('should update product', () => {
    const product = {
      del_status: "0",
      description: "demo product",
      image: "http://206.189.13.18/api/v1/images/520318-images.jpeg",
      price: 20,
      product_id: "45",
      product_name: "new product"
    }
    const data = {
      product: product,
      title: 'Update product'
    };
    const handleSpy = spyOn(component, 'handleDialogToggle');
    component.updateProduct(product);
    expect(handleSpy).toHaveBeenCalledWith(data);
  });

  it('should sort product in ascending order', () => {
    component.productList = productList.slice();
    component.sortProducts('ascending');
    const sortedAscending = component.productList.slice();
    expect(sortedAscending[0].price).toEqual(7600);
  });

  it('should sort product in descending order', () => {
    component.productList = productList.slice();
    component.sortProducts('descending');
    const sorteddescending = component.productList.slice();
    expect(sorteddescending[0].price).toEqual(76000);
  });

  it('should filter lower range', () => {
    component.masterProductList = productList;
    const sortSpy = spyOn(component, 'sortProducts');
    component.filterProducts('lower-range', 8000);
    expect(sortSpy).toHaveBeenCalled();
    expect(component.productList[0].price).toEqual(76000);
  });

  it('should filter upper range', () => {
    component.masterProductList = productList;
    const sortSpy = spyOn(component, 'sortProducts');
    component.filterProducts('upper-range', 8000);
    expect(sortSpy).toHaveBeenCalled();
    expect(component.productList[0].price).toEqual(7600);
  });

  it('should logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.logout();
    expect(navigateSpy).toHaveBeenCalled();
  })
});
