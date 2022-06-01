import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    templateUrl: './confirm.dialog.html'
})
export class ConfirmDialog {

    public showButtonAccept;
    public titleButtonAccept;
    public showButtonCancel;
    public titleButtonCancel;
    
    constructor(public dialogRef: MatDialogRef<ConfirmDialog>,
                @Inject(MAT_DIALOG_DATA) public props: any) {

        this.showButtonAccept = props.showButtonAccept === undefined ? true : props.showButtonAccept;
        this.titleButtonAccept = props.titleButtonAccept === undefined ? 'Aceptar' : props.titleButtonAccept;
        this.showButtonCancel = props.showButtonCancel === undefined ? true : props.showButtonCancel;
        this.titleButtonCancel = props.titleButtonCancel === undefined ? 'Cancelar' : props.titleButtonCancel;
    }

    onSubmit(): void {
        this.dialogRef.close(true);
    }
}
