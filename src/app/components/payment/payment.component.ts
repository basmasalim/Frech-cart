import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  cartId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
        // console.log(this.cartId);
      },
    });
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  handleForm(): void {
    // console.log(this.orderForm.value);
    const orderDara = this.orderForm.value;

    this._CartService.checkout(this.cartId, orderDara).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          open(response.session.url, '_self');
        }
      },
    });
  }
}
