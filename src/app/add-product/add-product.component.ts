import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Http} from "@angular/http";
import {ProductsService} from "../products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  private uploader: FileUploader = new FileUploader({url: "http://localhost:3000/new-product/file"});
  private name: String;
  private description: String;

  constructor(private service: ProductsService, private router:Router) {
  }

  ngOnInit() {
  }

  upload() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("name", this.name);
      form.append("description", this.description);

    };
    this.uploader.queue[0].upload();
    this.router.navigate([""]);


  }

}
