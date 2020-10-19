import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {ToastrService} from 'ngx-toastr';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent extends BaseComponent implements OnInit {

  @Input()
  mode: string;

  @Input()
  content: any;

  contentObject: any;

  contentSource: any;

  constructor(private toastr: ToastrService,
              private clipboardService: ClipboardService) {
    super();
    this.viewName = 'JSON Dumb';
    if (!this.mode) {
      this.mode = 'inline';
    }
  }

  ngOnInit(): void {
    this.contentObject = Object.assign({}, this.content);
    this.contentObject.sourceMap = undefined;
    this.contentSource = this.content.sourceMap;
  }

  copyToClipBoard(): void {
    this.clipboardService.copy(JSON.stringify(this.content));
    this.toastr.info('Copied to clipboard!');
  }

}
