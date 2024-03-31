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


  