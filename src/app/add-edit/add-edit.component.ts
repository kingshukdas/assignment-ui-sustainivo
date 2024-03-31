import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductPayload, AddProductResponse, ListProduct, UpdateProductPayload, UpdateProductResponse, UploadImageResponse } from '../shared/app.model';
import { ProductService } from '../shared/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../shared/dialog.service';

  enum uploadStatus {
    UPLOADING = 'uploading',
    UPLOADED = 'uploaded',
    FAILED = 'failed'
  }

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {



  productForm!: FormGroup;
  file!: File;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogService = inject(DialogService);
  private _snackBar = inject(MatSnackBar);
  data: { title: string; product?: ListProduct } = inject(MAT_DIALOG_DATA);
  
  uploadStatus = uploadStatus;
  imageUploading!: uploadStatus;
  imageUploadedMessage!: string;
  errorMsg!: string;
  showError = false;

  ngOnInit(): void {
    if (this.data.product) {
      this.productForm = this.fb.group({
        id: new FormControl({value: this.data.product.product_id, disabled: true}),
        name: new FormControl(this.data.product.product_name),
        description: new FormControl(this.data.product.description),
        price: new FormControl(this.data.product.price, [Validators.max(100000)]),
        fileUrl: new FormControl(this.data.product.image)
      })
    } else {
      this.productForm = this.fb.group({
        name: new FormControl(''),
        description: new FormControl(''),
        price: new FormControl('', [Validators.max(100000)]),
        fileUrl: new FormControl('')
      })
    }
  }

  submit() {
    const id = this.productForm.controls['id'];
    const name = this.productForm.controls['name'];
    const description = this.productForm.controls['description'];
    const price = this.productForm.controls['price'];
    const fileUrl = this.productForm.controls['fileUrl'];
    if(name.value && description.value && price.value && fileUrl.value) {
      if(price.value && price.invalid) {
        this.showError = true;
        this.errorMsg = "Enter the price in range"
      } else {
        if(this.productForm.valid) {
          if(this.data.product) {
            const payload: UpdateProductPayload = {
              update_product: true,
              product_id: id.value,
              product_name: name.value,
              image: fileUrl.value,
              description: description.value,
              price: price.value
            };
            this.productService.updateProduct(payload).subscribe((res: UpdateProductResponse) => {
              this.openSnackBar(res.message);
              this.dialogService.closeDialogSubject.next();
            })
          } else {
            const payload: AddProductPayload = {
              add_product: true,
              product_name: name.value,
              image: fileUrl.value,
              description: description.value,
              price: price.value
            };
            this.productService.addProduct(payload).subscribe((res: AddProductResponse) => {
              this.openSnackBar(res.message);
              this.dialogService.closeDialogSubject.next();

            })
          }
        } else {
          this.showError = true;
          this.errorMsg = "Invalid data provided";
        }
      } 
    } else {
      this.showError = true;
      this.errorMsg = "Please fill up the required fields";
    }
  }


  setFile(event: any) {
    this.file = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    if (this.file) {
      this.imageUploading = uploadStatus.UPLOADING;
      const formData = new FormData();
      formData.append("productImage", this.file);
      const upload$ = this.productService.uploadImage(formData).subscribe((res: UploadImageResponse) => {
          if(res.status === 'success' && !res.error) {
            this.productForm.controls['fileUrl'].setValue(res.url);
          } else {
            this.imageUploading = uploadStatus.FAILED;
          }
          this.imageUploading = uploadStatus.UPLOADED;
          this.imageUploadedMessage = res.message;
          this.openSnackBar(this.imageUploadedMessage);
      },(err: any) => {
        this.imageUploading = uploadStatus.FAILED;
        this.imageUploadedMessage = "Upload Failed! Please add an image url manually below";
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss',{
      duration: 3000
    });
  }

}
