import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialog } from './patient.dialog';
import { PatientModel } from '../../models/patient.model';
import { TypesEnum } from 'src/app/enums/types.enum';
import { ConfirmDialog } from '../confirm/confirm.dialog';
import { PatientService } from '../../services/patient.service';
import { ExampleDialog } from '../example/example.dialog';
import { ExtensionModel } from '../../models/extension.model';
import { ExtensionDialog } from '../extension/extension.dialog';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  public listPatients: PatientModel[] = [];
  public listExtensions: string[] = [];
  public listDataExtensions: any[] = [];
  public loading: boolean = false;
  public dataEmpty: boolean = false;
  
  constructor(private dialog: MatDialog,
              private patientService: PatientService) {
    this.loadList();
  }

  loadList(): void {
    this.loading = true;
    this.patientService.getPatientList().subscribe(data => {
      this.loading = false;
      if (data.entry) {
        this.dataEmpty = false;
        const object: any[] = data.entry;
        const list = object.map(x => x.resource);
        this.listPatients = list.filter(x => x.meta.tag === undefined);
        this.listExtensions = this.patientService.getExtensions(this.listPatients, this.listExtensions);
        if (this.listPatients.length === 0) this.dataEmpty = true;
      } else {
        this.dataEmpty = true;
      }
      this.getDataExtensions();
    });
  }

  getDataExtensions(): void {
    this.listDataExtensions = [];
    this.listPatients.forEach(patient => {
      const data:string[] = [];
      this.listExtensions.forEach(ext => {
        const search = patient.extension?.find((x: ExtensionModel) => x.url.includes(ext));
        const value = search ? search.valueCodeableConcept.text : '';
        data.push(value);
      });
      this.listDataExtensions.push(data);
    });
  }

  addPatient(): void {
    this.openDialog(new PatientModel(null), TypesEnum.new);
  }

  editPatient(patient: PatientModel): void {
    this.openDialog(patient, TypesEnum.edit);
  }

  deletePatient(patient: PatientModel): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confirmación',
        description: '¿Está seguro de eliminar este registro?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loading = true;
          const idTag = String(Number(patient.id) + 1);
          this.patientService.deletePatient(idTag).subscribe(_ => console.log('Patient tag deleted'));
          this.patientService.deletePatient(patient.id).subscribe(_ => {
            setTimeout(() => this.loadList(), 3000);
          });
        };
    });
  }

  openDialog(patient: PatientModel, type: TypesEnum): void {
    const dialogRef = this.dialog.open(PatientDialog, {
      data: {
        extensions: this.listExtensions,
        patient,
        type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.save) {
        this.loading = true;
        setTimeout(() => this.loadList(), 3000);
      };
    });
  }

  openDialogExample(): void {
    this.dialog.open(ExampleDialog);
  }

  addExtension(): void {
    const dialogRef = this.dialog.open(ExtensionDialog, {
      data: {
        extensions: this.listExtensions
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.extension) {
        this.listExtensions.push(result.extension);
        this.getDataExtensions();
      };
    });
  }
}
