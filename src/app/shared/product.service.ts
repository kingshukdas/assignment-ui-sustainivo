import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductPayload, AddProductResponse, ListProductPayload, ListProductResponse, UpdateProductPayload, UpdateProductResponse, UploadImageResponse } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'http://206.189.13.18/api/v1/product/index.php';
  uploadImgUrl = 'http://206.189.13.18/api/v1/product/upload.php';

  constructor(private http: HttpClient) { }

  getAllProducts(payload: ListProductPayload) {
    return this.http.post<ListProductResponse>(this.productUrl, payload);
  }

  uploadImage(payload: FormData) {
    return this.http.post<UploadImageResponse>(this.uploadImgUrl, payload);
  }

  addProduct(payload: AddProductPayload) {
    return this.http.post<AddProductResponse>(this.productUrl, payload);
  }

  updateProduct(payload: UpdateProductPayload) {
    return this.http.put<UpdateProductResponse>(this.productUrl, payload);
  }
}
