import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from "../services/user.service";

export class CustomValidators {
  static emailValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .checkEmailExists(control.value)
        .pipe(
          map((result: boolean) =>
            result ? { emailAlreadyExists: true } : null
          )
        );
    };
  }
}
