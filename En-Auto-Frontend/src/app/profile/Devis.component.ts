import {Component, Inject, ViewChild, OnInit, ElementRef} from "@angular/core";
import {Devis} from "../Interface/Interface.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolsService} from "../service/tools.service";
import * as JSPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ApiService} from "../service/api.service";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-profile',
  templateUrl: './Devis.component.html',
  styleUrls: ['./Devis.component.css']
})
export class DevisComponent implements OnInit {

  @ViewChild('devis') htmlData: ElementRef;
  value: number;
  private color: string;
  styleEl: HTMLStyleElement = document.createElement('style');

  constructor(
    public dialogRef: MatDialogRef<DevisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Devis,
    public tool: ToolsService,
    public api: ApiService,
    private el: ElementRef) {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.appendChild(this.styleEl);
  }

  ngOnInit(): void {
    this.value = Math.round(this.data.rentability.valueOf() + 50);
    this.updateColor();
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
      if (data["message"]) {
        this.dialogRef.close();
      }
    })
  }

  updateColor(): void {
    if (this.value > 100) {
      this.color = '#07db09'
    }
    else if (this.value <= 100 && this.value > 90) {
      this.color = '#4b9026'
    }
    else if (this.value <= 90 && this.value > 80) {
      this.color = '#86a531'
    }
    else if (this.value <= 80 && this.value > 70) {
      this.color = '#cebd3b'
    }
    else if (this.value <= 70 && this.value > 60) {
      this.color = '#b1aa29'
    }
    else if (this.value >= 60 && this.value > 50) {
      this.color = '#a0912c'
    }
    else if (this.value <= 50 && this.value > 40) {
      this.color = '#ba6012'
    }
    else if (this.value <= 40 && this.value > 30) {
      this.color = '#a33e0b'
    }
    else if (this.value <= 30 && this.value > 20) {
      this.color = '#ac4330'
    }
    else if (this.value <= 20 && this.value > 10) {
      this.color = '#923b2c'
    }
    else if (this.value <= 10) {
      this.color = '#9e2828'
    }

    this.styleEl.innerText = `
  .mat-progress-bar-fill::after {
    background-color: ${this.color};
  }
`;

  }
}
