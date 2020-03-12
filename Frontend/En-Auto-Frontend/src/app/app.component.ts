import { Component } from '@angular/core';
import {ToolsService} from "./service/tools.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'En-Auto';
  public isHandset$ = this.tool.isHandset$;

  constructor(private tool: ToolsService) {}
}
