import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.scss']
})
export class ModalServiceComponent implements OnInit{

  constructor (private dialogRef:MatDialogRef<ModalServiceComponent>, @Inject(MAT_DIALOG_DATA) public data:any ){}

  ngOnInit(): void {


  }


}

