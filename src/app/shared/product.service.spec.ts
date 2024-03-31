import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { addProductPayloadMock, addProductResponseMock, getProductsResponseMock, updateProductPayloadMock, updateProductResponseMock, uploadResMock } from './mocks.';
import { UpdateProductPayload } from './app.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should get All products`, waitForAsync(inject([HttpTestingController, ProductService],
    (httpClient: HttpTestingController, service: ProductService) => {
      const listProducts = getProductsResponseMock;

      service.getAllProducts({list_products: true})
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.productUrl);
        expect(req.request.method).toBe("POST");
        req.flush(listProducts);
        httpMock.verify();
    })));

  it(`should uploadImage`, waitForAsync(inject([HttpTestingController, ProductService],
    (httpClient: HttpTestingController, service: ProductService) => {
      const formData = new FormData();
      formData.append(
        'productImage', 'image.jpg'
        );

      const uploaded = uploadResMock;

      service.uploadImage(formData)
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.uploadImgUrl);
        expect(req.request.method).toBe("POST");
        req.flush(uploaded);
        httpMock.verify();
    })));

  it(`should add product`, waitForAsync(inject([HttpTestingController, ProductService],
    (httpClient: HttpTestingController, service: ProductService) => {
      const addPay = addProductPayloadMock;

      const addRes = addProductResponseMock;

      service.addProduct(addPay)
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.productUrl);
        expect(req.request.method).toBe("POST");
        req.flush(addRes);
        httpMock.verify();
    })));

  it(`should update product`, waitForAsync(inject([HttpTestingController, ProductService],
    (httpClient: HttpTestingController, service: ProductService) => {
      const updatePay = updateProductPayloadMock;

      const updateRes = updateProductResponseMock;

      service.updateProduct(updatePay)
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.productUrl);
        expect(req.request.method).toBe("PUT");
        req.flush(updateRes);
        httpMock.verify();
    })));


});
