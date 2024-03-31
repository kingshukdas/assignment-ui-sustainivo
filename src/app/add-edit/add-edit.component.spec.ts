import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComponent } from './add-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../shared/app.model';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addProductPayloadMock, productList, productServiceStub, updateProductPayloadMock } from '../shared/mocks.';
import { ProductService } from '../shared/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

const dialogDataStub : DialogData = {
  title: 'Add new product'
}

const snackbarStub = {
  open( ){

  }
}

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataStub },
        { provide: MatDialogRef, useValue: {}},
        { provide: ProductService, useValue: productServiceStub},
        { provide: MatSnackBar, useValue: snackbarStub},
        provideAnimations()
      ],
      teardown: {destroyAfterEach: false}
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOninit', () => {
    dialogDataStub.product = productList[0];
    component.ngOnInit();
    expect(component.productForm.controls['id']).toBeTruthy();
  });

  it('should submit add product data', () => {
    component.ngOnInit();
    expect(component.data.title).toEqual(dialogDataStub.title);
    if(productServiceStub.addProduct)
    productServiceStub.addProduct(addProductPayloadMock).subscribe(res => {
      expect(res.status).toBe('success');
    })

    component.submit();
    setTimeout(() => {
      expect(spyOn(productServiceStub, 'addProduct')).toHaveBeenCalled();
    },3000)
  });

  it('should submit update product data', () => {
    dialogDataStub.product = productList[0];
    component.ngOnInit();
    expect(component.productForm.controls['id']).toBeTruthy();
    if(productServiceStub.updateProduct) {
      productServiceStub.updateProduct(updateProductPayloadMock).subscribe(res => {
        expect(res.status).toEqual('success');
      });
    }

    component.submit();
    setTimeout(() => {
      expect(spyOn(productServiceStub, 'updateProduct')).toHaveBeenCalled();
    },3000)
  });

  it('should covers miscellaneous submit branches', () => {
    component.productForm.controls['price'].setValue(111111);
    component.submit();
    expect(component.showError).toBeTrue();

    component.productForm.controls['price'].setValue(1191);
    component.submit();

    component.productForm.controls['price'].setValue(null);
    component.submit();
    expect(component.showError).toBeTrue();
    expect(component.errorMsg).toBeDefined();
  });

  it('should set file', () => {
    const event = {
      target: {
        files: ['image.jpg']
      }
    };
    component.setFile(event);
    expect(component.file).toBeDefined();
  });

  it('should upload image', () => {
    const event = {
      target: {
        files: ['image.jpg']
      }
    };
    component.setFile(event);
    expect(component.file).toBeDefined();
    component.openSnackBar('hello');
    
    const formdata = new FormData().append('productImage', component.file);
    productServiceStub.uploadImage(formdata).subscribe(res => {
      console.log(res)
    });
    component.uploadFile();

    setTimeout(() => {
      expect(component.productForm.controls['fileUrl'].value).toBeTruthy();
      expect(spyOn(productServiceStub, 'uploadImage')).toHaveBeenCalled();
    }, 3000)
  });
});
