import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Devis, User} from "../Interface/Interface.module";
import {ApiService} from "../service/api.service";
import {ToolsService} from "../service/tools.service";
import {MatDialog} from "@angular/material/dialog";
import {DevisComponent} from "./Devis.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public isLoading = false;
  public dataSource: MatTableDataSource<Devis>;
  public User : User;
  public devisList = [];
  displayedColumns = ["Devis","Date", "action"];

  constructor(public api : ApiService,
              public tool : ToolsService,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.User = this.tool.getUser();

    this.api.getDevis(this.User._id).subscribe((data:[JSON]) =>{
      this.devisList = [];
      for(let devi of data){
        this.devisList.push(this.tool.setDevis(devi));
      }
      this.dataSource = new MatTableDataSource(this.devisList);
    })
  }

  deleteDevis(devis:Devis){
    this.api.deleteDevis(devis).subscribe(data => {
      if (data["message"]){
        this.ngOnInit();
      }
    })
  }

  openDevis(element: Devis) {
    const dialogRef = this.dialog.open(DevisComponent, {
      width: '50%',
      data: element
    });

    dialogRef.afterClosed().subscribe(data =>{
      this.ngOnInit()
    })
  }

}
