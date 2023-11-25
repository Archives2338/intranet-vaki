import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit{
  constructor( private dialogRef: MatDialogRef<ModalConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
public title = 'Estas seguro de realizar esta accion?';
public cancelText = 'Cancel';
public confirmText = 'Confirm';
public onCancel(): void {
  console.log('Cancel');
  this.dialogRef.close(false);
}
public onConfirm(): void {
  console.log('Confirm');
  this.dialogRef.close(true);
}
}
