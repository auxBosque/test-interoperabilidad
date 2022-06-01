import { Component } from '@angular/core';
import { PatientExample } from 'src/app/models/patient.example';

@Component({
    templateUrl: './example.dialog.html'
})
export class ExampleDialog {
    public showJson: boolean = true;
    public bodyJson: any;
    public bodyXml: ElementXml[] = [];
    public example: PatientExample;

    constructor() {
        this.example = new PatientExample();
        this.bodyJson = this.example.patientsJson();
        this.bodyXml = this.example.patientsXml();
    }

    onViewJson(): void {
        this.showJson = !this.showJson;
    }
}

interface ElementXml {
    value: string;
    margin: number;
}
