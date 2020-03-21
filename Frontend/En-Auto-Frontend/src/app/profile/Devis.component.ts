import {Component, Inject, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Devis} from "../Interface/Interface.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolsService} from "../service/tools.service";

@Component({
  selector: 'app-profile',
  templateUrl: './Devis.component.html',
  styleUrls: ['./Devis.component.css']
})
export class DevisComponent implements OnInit {
  displayedColumns = ["Devis","Cost"];
  isLoading: boolean;
  value: number = 50;

  constructor(
    public dialogRef: MatDialogRef<DevisComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Devis,
    public tool : ToolsService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }


}
