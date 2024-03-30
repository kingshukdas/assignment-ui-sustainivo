import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListProductPayload, ListProductResponse } from './app.model';

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
}
