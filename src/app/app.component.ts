import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public formatType = new FormControl('json');

  constructor(private patientService: PatientService) {
    this.formatType.valueChanges.subscribe((data: string) => {
      patientService._formatType.next(data);
    });
  }
}  
