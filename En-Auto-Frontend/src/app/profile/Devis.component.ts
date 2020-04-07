import {Component, Inject, ViewChild, OnInit, ElementRef} from "@angular/core";
import {Devis} from "../Interface/Interface.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolsService} from "../service/tools.service";
import * as JSPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './Devis.component.html',
  styleUrls: ['./Devis.component.css']
})
export class DevisComponent implements OnInit {

  @ViewChild('devis') htmlData: ElementRef;
  value: number;

  constructor(
    public dialogRef: MatDialogRef<DevisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Devis,
    public tool: ToolsService,
    public api: ApiService) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.value = Math.round(this.data.rentability.valueOf() + 100);
  }

  close(): void {
    this.dialogRef.close();
  }

  downloadPDF() {
    let data = document.getElementById('devis');
    html2canvas(data).then(canvas => {

      let imgWidth = 190;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new JSPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', position, position, imgWidth, imgHeight)
      pdf.save(this.data.address + '-' +
        this.tool.convertDateToString(this.data.created_at) + '.pdf'); // Generated PDF
    });
  }

  delete() {
    this.api.deleteDevis(this.data).subscribe(data => {
      if (data["message"]){
        this.dialogRef.close();
      }
    })
  }
}
