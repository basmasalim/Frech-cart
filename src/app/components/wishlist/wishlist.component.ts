import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CommonModule,
    CuttextPipe,
    CarouselModule,
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  wishListData: string[] = []; //Data --> wishlist(add, remove)

  term: string = '';

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
        // console.log(response);
      },
    });
  }

  addProduct(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addCart(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addWishList(prodId: string | undefined): void {
    this._WishlistService.addWishlist(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._WishlistService.favNumber.next(response.data.length);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(prodId: string | undefined): void {
    this._WishlistService.removeWishlist(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._WishlistService.favNumber.next(response.data.length);
        this.wishListData = response.data;

        const newProductData = this.products.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.products = newProductData;
      },
    });
  }
}
