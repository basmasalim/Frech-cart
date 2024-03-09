import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss'],
})
export class CategorydetailsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  categoryId!: string | null;
  categoryDetails: Category = {} as Category;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      //get id of product
      next: (params) => {
        this.categoryId = params.get('id');
      },
    });
    this._ProductService.getCategoriesDetails(this.categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
        console.log(response);
      },
    });
  }
}
