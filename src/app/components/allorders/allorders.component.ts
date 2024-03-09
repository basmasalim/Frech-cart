import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent {
  constructor(private _CartService: CartService) {}
  userData: any;
  allUserOrders: any;

  ngOnInit(): void {
    let encodeToken: any = localStorage.getItem('eToken');
    let decodeToken = jwtDecode(encodeToken);
    this.userData = decodeToken;
    this._CartService.allOrders(this.userData.id).subscribe({
      next: (response) => {
        console.log(response);
        this.allUserOrders = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
