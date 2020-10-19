import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../base.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Doc} from '../../@model/doc';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent extends BaseComponent implements OnInit {

  doc: Doc;

  constructor(public bsModalRef: BsModalRef) {
    super();
    this.viewName = 'Doc Viewer';
  }

  ngOnInit(): void {
    this.viewName = this.doc.label;
  }

}
