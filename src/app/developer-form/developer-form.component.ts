import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PICK_FORMATS, PickDateAdapter } from "../helpers/date-adapter";
import { distinctUntilKeyChanged, map, Subscription } from "rxjs";
import { UserService } from "../services/user.service";
import { CustomValidators } from "../helpers/custom-validators";
import * as moment from 'moment';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}  ]
})
export class DeveloperFormComponent extends PickDateAdapter implements OnDestroy {

  form: FormGroup

  minDate = new Date(1960, 0, 1);
  maxDate = new Date(2010,11,31);

  fetchData: any = {
      angular: ['1.1.1', '1.2.1', '1.3.3'],
      react: ['2.1.2', '3.2.4', '4.3.1'],
      vue: ['3.3.1', '5.2.1', '5.1.3'],
    }


  frameworks = Object.keys(this.fetchData)
  frameworkVersions: string[] = []

  versionsSubscription = Subscription.EMPTY;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super('');
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      framework: ['', Validators.required],
      frameworkVersion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [
        CustomValidators.emailValidator(this.userService)
      ]],
      hobby: this.fb.array(
        [this.createHobbyGroup()],
      )
    });

    this.versionsSubscription = this.form.valueChanges.pipe(
      distinctUntilKeyChanged('framework'),
      map(formValue => formValue.framework)
    ).subscribe(framework => {

      this.frameworkVersions = this.fetchData[framework];
    })
  }

  get hobbies() {
    return this.form.get('hobby') as FormArray;
  }

  ngOnDestroy() {
    this.versionsSubscription.unsubscribe();
  }

  createHobbyGroup() {
    return this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
    })
  }

  addHobby() {
    const fg = this.createHobbyGroup();
    this.hobbies.push(fg);
  }

  deleteHobby(idx: number) {
    this.hobbies.removeAt(idx)
  }

  onSubmit() {
    this.form.get('dateOfBirth')?.setValue(moment(this.form.value.dateOfBirth).format('DD-MM-YYYY'));

    console.log('send', this.form.value); // value for request

    this.form.reset()
  }
}
