import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotpassService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`;

  forgotPassword(userEmail: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`, userEmail);
  }

  resetCode(restCode: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `verifyResetCode`, restCode);
  }

  resetPassword(resetPasswordForm: object): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `resetPassword`,
      resetPasswordForm
    );
  }
}
