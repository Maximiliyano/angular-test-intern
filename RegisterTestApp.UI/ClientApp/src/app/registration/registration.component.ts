import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class Registration {
  public showAgeError: boolean | undefined;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  model = new RegistrationModel();
  save = () => {
    this.http.post<RegistrationModel>(this.baseUrl + 'register', this.model).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }
  addPhone = () => {
    this.model.phoneNumbers.push('');
  }
  removePhone = (index: number) => {
    this.model.phoneNumbers.splice(index, 1);
  }
  trackByIndex = (index: number, obj: any): any => index;

  validateDateOfBirth() {
    const currentDate = new Date();
    const inputDate = new Date(this.model.dateBirth);
    const diff = currentDate.getTime() - inputDate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    this.showAgeError = age < 18;
  }
}

class RegistrationModel {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumbers: string[] = [''];
  dateBirth: Date = new Date();
}
