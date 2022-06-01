import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExtensionModel } from '../../models/extension.model';
import { PatientService } from '../../services/patient.service';
import { TypesEnum } from '../../enums/types.enum';
import { ConfirmDialog } from '../confirm/confirm.dialog';
import { IdentifierModel, NameModel, PatientModel, PatientPostModel, PatientPutModel } from '../../models/patient.model';
import * as moment from 'moment';

@Component({
    templateUrl: './patient.dialog.html'
})
export class PatientDialog {

    public selectedPatient: PatientModel;
    public patientForm: FormGroup;
    public loading: boolean = false;
    public showDeleteButton: boolean = false;
    public sended: boolean = false;
    public showSend: boolean = false;
    public showJson: boolean = true;
    public type: TypesEnum;
    public bodyJson: any;
    public bodyXml: ElementXml[] = [];
    public listExtensions: string[] = [];

    public fields = [
        { control: 'id', placeholder: 'Id', type: 'text' },
        { control: 'given', placeholder: 'Nombre', type: 'text' },
        { control: 'family', placeholder: 'Apellido', type: 'text' },
        { control: 'gender', placeholder: 'Sexo', type: 'select' },
        { control: 'birthDate', placeholder: 'Fecha Nacimiento', type: 'date' },
        { control: 'lastUpdated', placeholder: 'Última actualización', type: 'date' }
    ]

    constructor(private dialog: MatDialog,
                private builder: FormBuilder,
                private patientService: PatientService,
                public dialogRef: MatDialogRef<PatientDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.dialogRef.disableClose = true;
        this.selectedPatient = data.patient;
        this.listExtensions = data.extensions;
        this.type = data.type;
        this.showDeleteButton = this.type === TypesEnum.edit;
        this.patientForm = this.setPatientForm();
        this.setExtensionsControls();
    }

    setPatientForm(): FormGroup {
        return this.builder.group({
            id: [ { value: this.selectedPatient?.id, disabled: true }, [ Validators.required ] ],
            given: [ this.selectedPatient?.name[0]?.given[0], [ Validators.required ] ],
            family: [ this.selectedPatient?.name[0]?.family, [ Validators.required ] ],
            gender: [ this.selectedPatient?.gender, [ Validators.required ] ],
            birthDate: [ this.selectedPatient?.birthDate, [ Validators.required ] ],
            lastUpdated: [ { value: this.selectedPatient?.meta.lastUpdated, disabled: true }, [ Validators.required ] ]
        });
    }

    setExtensionsControls(): void {
        this.listExtensions.forEach(ext => {
            const search = this.selectedPatient.extension?.find((x: ExtensionModel) => x.url.includes(ext)) || '';
            const data = search ? search.valueCodeableConcept.text : '';
            this.patientForm.addControl(ext, new FormControl(data));
            this.fields.push({ control: ext, placeholder: ext, type: 'text' });
        });
    }

    onSubmit(_delete = false): void {        
        if (_delete) {
            const dialogRef = this.dialog.open(ConfirmDialog, {
                data: {
                    title: 'Confirmación',
                    description: '¿Está seguro de eliminar este registro?'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result && this.selectedPatient) {
                    const idTag = String(Number(this.selectedPatient.id) + 1);
                    this.patientService.deletePatient(idTag).subscribe(_ => console.log('Patient tag deleted'));
                    this.type = TypesEnum.delete;
                    this.executeService();
                };
            });
            
        } else {
            this.executeService();
        };
    }

    executeService(): void {
        this.loading = true;
        const body = this.createBody();
        this.patientService.savePatient(this.bodyJson.id, body, this.type).subscribe(_ => {
            this.sended = true;
            this.loading = false;
        });
    }

    createBody(): any {
        this.createBodyJson();
        this.createBodyXml();
        switch (this.patientService._formatType.getValue()) {
            case 'json': return this.bodyJson;
            case 'xml': return this.bodyXml.map(x => x.value).join("");
        }
    }

    createBodyJson(): void {
        const data = this.patientForm.value;
        const urlExt = 'http://fhiraux.herokuapp.com/fhir/Patient';
        this.bodyJson = null;
        
        switch (this.type) {
            case TypesEnum.new:
                this.bodyJson = new PatientPostModel(null);
                this.bodyJson.resourceType = "Patient";
                this.bodyJson.identifier = [new IdentifierModel({ system: "urn:oid:1.2.36.146.595.217.0.1", value: "749786" })]
                this.bodyJson.name = [new NameModel({ family: data.family, given: [data.given] })];
                this.bodyJson.gender = data.gender;
                this.bodyJson.birthDate = moment(data.birthDate).format('YYYY-MM-DD');
                if (this.listExtensions.length > 0) {
                    this.bodyJson.extension = [];
                    this.listExtensions.forEach(ext => {
                        this.bodyJson.extension.push(new ExtensionModel({ url: `${urlExt}/${ext}`, valueCodeableConcept: { text: `${data[ext]}` } }));
                    });
                };
                break;
            case TypesEnum.edit:
                this.bodyJson = new PatientPutModel(null);
                this.bodyJson.id = this.selectedPatient.id;
                this.bodyJson.resourceType = this.selectedPatient.resourceType;
                this.bodyJson.identifier = this.selectedPatient.identifier;
                this.bodyJson.meta = this.selectedPatient.meta;
                this.bodyJson.name = [new NameModel({ family: data.family, given: [data.given] })];
                this.bodyJson.gender = data.gender;
                this.bodyJson.birthDate = moment(data.birthDate).format('YYYY-MM-DD');
                if (this.listExtensions.length > 0) {
                    this.bodyJson.extension = [];
                    this.listExtensions.forEach(ext => {
                        this.bodyJson.extension.push(new ExtensionModel({ url: `${urlExt}/${ext}`, valueCodeableConcept: { text: `${data[ext]}` } }));
                    });
                }
                break;
        }
    }

    createBodyXml(): void {
        const data = this.patientForm.value;
        const urlExt = 'http://fhiraux.herokuapp.com/fhir/Patient';
        this.bodyXml = [];

        switch (this.type) {
            case TypesEnum.new:
                this.bodyXml.push({ value: `<Patient xmlns="http://hl7.org/fhir">`, margin: 0 });
                this.bodyXml.push({ value: `<identifier>`, margin: 20 });
                this.bodyXml.push({ value: `<system value="urn:oid:1.2.36.146.595.217.0.1"/>`, margin: 40 });
                this.bodyXml.push({ value: `<value value="749786"/>`, margin: 40 });
                this.bodyXml.push({ value: `</identifier>`, margin: 20 });
                this.bodyXml.push({ value: `<name>`, margin: 20 });
                this.bodyXml.push({ value: `<family value="${data.family}"/>`, margin: 40 });
                this.bodyXml.push({ value: `<given value="${data.given}"/>`, margin: 40 });
                this.bodyXml.push({ value: `</name>`, margin: 20 });
                this.bodyXml.push({ value: `<gender value="${data.gender}"/>`, margin: 20 });
                this.bodyXml.push({ value: `<birthDate value="${moment(data.birthDate).format('YYYY-MM-DD')}"/>`, margin: 20 });
                this.listExtensions.forEach(ext => {
                    this.bodyXml.push({ value: `<extension url="${urlExt}/${ext}">`, margin: 20 });
                    this.bodyXml.push({ value: `<valueCodeableConcept>`, margin: 25 });
                    this.bodyXml.push({ value: `<text value="${data[ext]}"/>`, margin: 30 });
                    this.bodyXml.push({ value: `</valueCodeableConcept>`, margin: 25 });
                    this.bodyXml.push({ value: `</extension>`, margin: 20 });
                });
                this.bodyXml.push({ value: `</Patient>`, margin: 0 });
                break;
            case TypesEnum.edit:
                this.bodyXml.push({ value: `<Patient xmlns="http://hl7.org/fhir">`, margin: 0 });
                this.bodyXml.push({ value: `<id value="${this.selectedPatient.id}"/>`, margin: 20 });
                this.bodyXml.push({ value: `<identifier>`, margin: 20 });
                this.bodyXml.push({ value: `<system value="urn:oid:1.2.36.146.595.217.0.1"/>`, margin: 40 });
                this.bodyXml.push({ value: `<value value="749786"/>`, margin: 40 });
                this.bodyXml.push({ value: `</identifier>`, margin: 20 });
                this.bodyXml.push({ value: `<meta>`, margin: 20 });
                this.bodyXml.push({ value: `<versionId value="${this.selectedPatient.meta.versionId}"/>`, margin: 40 });
                this.bodyXml.push({ value: `<lastUpdated value="${this.selectedPatient.meta.lastUpdated}"/>`, margin: 40 });
                this.bodyXml.push({ value: `</meta>`, margin: 20 });
                this.bodyXml.push({ value: `<name>`, margin: 20 });
                this.bodyXml.push({ value: `<family value="${data.family}"/>`, margin: 40 });
                this.bodyXml.push({ value: `<given value="${data.given}"/>`, margin: 40 });
                this.bodyXml.push({ value: `</name>`, margin: 20 });
                this.bodyXml.push({ value: `<gender value="${data.gender}"/>`, margin: 20 });
                this.bodyXml.push({ value: `<birthDate value="${moment(data.birthDate).format('YYYY-MM-DD')}"/>`, margin: 20 });
                this.listExtensions.forEach(ext => {
                    this.bodyXml.push({ value: `<extension url="${urlExt}/${ext}">`, margin: 20 });
                    this.bodyXml.push({ value: `<valueCodeableConcept>`, margin: 25 });
                    this.bodyXml.push({ value: `<text value="${data[ext]}"/>`, margin: 30 });
                    this.bodyXml.push({ value: `</valueCodeableConcept>`, margin: 25 });
                    this.bodyXml.push({ value: `</extension>`, margin: 20 });
                });
                this.bodyXml.push({ value: `</Patient>`, margin: 0 });
                break;
        }
    }

    onViewSend(): void {
        this.showSend = !this.showSend;
    }

    onViewJson(): void {
        this.showJson = !this.showJson;
    }

    onClose(): void {
        this.dialogRef.close({ save: this.sended });
    }
}

interface ElementXml {
    value: string;
    margin: number;
}
