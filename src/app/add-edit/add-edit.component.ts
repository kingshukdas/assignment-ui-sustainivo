import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit{

  productForm!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      fileInput: new FormControl(null)
    })
  }

  submit() {

  }

  uploadFiles(file: any) {}

}
