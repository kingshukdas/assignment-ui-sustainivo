import { of } from "rxjs";
import { ListProductResponse } from "./app.model";
import { ProductService } from "./product.service";
import { HttpClient } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";

export const productList = [{
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
  
export const getProductsResponseMock = {
    "status": "success",
    "products": productList
  };

export const uploadResMock = {
    "status": "success",
    "error": false,
    "message": "File uploaded successfully",
    "url": "http://206.189.13.18/api/v1/images/163105-testimg.webp"
};

export const addProductPayloadMock = {
    "add_product":true,
    "product_name":"Mobile",
    "image":"http://206.189.13.18/api/v1/images/304119-mobile.jpg",
    "description":"This is best moile",
    "price":"32000.00"
};

export const addProductResponseMock = {
    "status": "success",
    "message": "Product added successfully"
}

export const updateProductPayloadMock = {
    "update_product":true,
    "product_id":"3",
    "product_name":"Camera",
    "image":"camera.png",
    "description":"This is best camera",
    "price":"21000.00"
};

export const updateProductResponseMock = {
    "status": "success",
    "message": "Product updated successfully"
};

export const loginResponseMock = {
  "status": "success",
  "message": "Login successful",
  "data": {
  "user_id": 2,
  "email": "test@email.com",
  "user_name": "Dummy Name"
  }
  }

export const productServiceStub = {

  getAllProducts(payload: any) { 
    return of(getProductsResponseMock as ListProductResponse)
  },

  uploadImage(payload: any) {
    return of(uploadResMock);
  },

  addProduct(payload: any) {
    return of(addProductResponseMock);
  },

  updateProduct(payload: any) {
    return of(updateProductResponseMock);
  }
}


  