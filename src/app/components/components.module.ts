import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModuleShared } from '../app.module.shared';
import { PatientComponent } from './patient/patient.component';
import { PatientDialog } from './patient/patient.dialog';
import { ExtensionDialog } from './extension/extension.dialog';
import { ConfirmDialog } from './confirm/confirm.dialog';
import { ExampleDialog } from './example/example.dialog';

@NgModule({
  declarations: [
    PatientComponent,
    PatientDialog,
    ExtensionDialog,
    ConfirmDialog,
    ExampleDialog
  ],
  entryComponents: [
    PatientDialog,
    ExtensionDialog,
    ConfirmDialog,
    ExampleDialog
  ],
  exports: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppModuleShared
  ]
})
export class ComponentsModule { }
