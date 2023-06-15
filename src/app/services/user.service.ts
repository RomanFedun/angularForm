import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private existingEmails = ['test@test.test']

  constructor() {
  }

  checkEmailExists(email: string): Observable<boolean> {
    return of(this.existingEmails.includes(email)).pipe(
      delay(2000)
    );
  }
}
