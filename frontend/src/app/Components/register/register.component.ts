import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HeaderMenus } from '../../Models/header-menus.dto';
import { UserDTO } from '../../Models/user.dto';
import { HeaderMenusService } from '../../Services/header-menus.service';
import { SharedService } from '../../Services/shared.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private formBuilder = inject(UntypedFormBuilder);
  private userService = inject(UserService);
  private sharedService = inject(SharedService);
  private headerMenusService = inject(HeaderMenusService);
  private router = inject(Router);

  registerUser: UserDTO;

  name: UntypedFormControl;
  surname_1: UntypedFormControl;
  surname_2: UntypedFormControl;
  alias: UntypedFormControl;
  birth_date: UntypedFormControl;
  email: UntypedFormControl;
  password: UntypedFormControl;

  registerForm: UntypedFormGroup;
  isValidForm: boolean | null;

  constructor() {
    this.registerUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new UntypedFormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.surname_1 = new UntypedFormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.surname_2 = new UntypedFormControl(this.registerUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.alias = new UntypedFormControl(this.registerUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]);

    this.birth_date = new UntypedFormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new UntypedFormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.password = new UntypedFormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password
    });
  }

  register(): void {
    let responseOK = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    this.userService
      .register(this.registerUser)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'registerFeedback',
            responseOK,
            errorResponse
          );

          if (responseOK) {
            this.registerForm.reset();
            this.birth_date.setValue(
              formatDate(new Date(), 'yyyy-MM-dd', 'en')
            );
            this.router.navigateByUrl('home');
          }
        })
      )
      .subscribe(
        () => {
          responseOK = true;
        },
        (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;

          const headerInfo: HeaderMenus = {
            showAuthSection: false,
            showNoAuthSection: true
          };

          this.headerMenusService.headerManagement.next(headerInfo);
          this.sharedService.errorLog(errorResponse);
        }
      );
  }
}
