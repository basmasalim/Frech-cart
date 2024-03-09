import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  // behaver subject
  favNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addWishlist(prodId: string | undefined): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`, {
      productId: prodId,
    });
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`);
  }

  removeWishlist(prodId: string | undefined): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`);
  }
}
