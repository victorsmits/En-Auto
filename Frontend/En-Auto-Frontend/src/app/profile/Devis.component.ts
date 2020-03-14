import {Component, Inject, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Devis} from "../Interface/Interface.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './Devis.component.html',
  styleUrls: ['./Devis.component.css']
})
export class DevisComponent implements OnInit {
  displayedColumns = ["Devis","Cost"];
  isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DevisComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Devis) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }


}
