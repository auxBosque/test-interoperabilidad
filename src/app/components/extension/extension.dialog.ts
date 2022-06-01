import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './extension.dialog.html'
})
export class ExtensionDialog {

    public extensionCtrl: FormControl;
    public listExtensions: string[] = [];
    public errorSpaces: boolean = false;
    public errorDuplicate: boolean = false;
    
    constructor(public dialogRef: MatDialogRef<ExtensionDialog>,
                @Inject(MAT_DIALOG_DATA) public props: any) {

        this.listExtensions = props.extensions;
        this.extensionCtrl = new FormControl('', [Validators.required, Validators.pattern(/[a-z]$/)]);
        this.extensionCtrl.valueChanges.subscribe((data: string) => {
            this.errorSpaces = data.includes(" ");
            this.errorDuplicate = false;
            if (!this.errorSpaces) {
                const search = this.listExtensions.find(x => x === data);
                this.errorDuplicate = search ? true : false;
            }
        });
    }

    onSubmit(): void {
        this.dialogRef.close({ extension: this.extensionCtrl.value });
    }
}
