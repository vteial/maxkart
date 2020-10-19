import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {Doc} from '../../@model/doc';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {ApiService} from '../../@shared/api.service';
import Swal from 'sweetalert2';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DocViewerComponent} from '../doc-viewer/doc-viewer.component';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent extends BaseComponent implements OnInit {

  private docTypes = Doc.TYPES;
  private docTypesMap = Doc.asTypesMap();

  counter: number;

  item: Doc;

  itemFg: FormGroup;

  @Input()
  entityName: string;

  @Input()
  entityId: number;

  @Input()
  items: Array<Doc>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private formBuilder: RxFormBuilder,
              private modalService: BsModalService) {
    super();
    this.viewName = 'Doc';
  }

  ngOnInit(): void {
    if (!this.items) {
      this.items = new Array<Doc>();
    }
    this.counter = this.items.length;
    this.add();
    // bsCustomFileInput.init();
    // console.log(this.items);
  }

  onName(): void {
    const docType = this.docTypesMap[this.item.name];
    if (docType) {
      this.item.type = docType.type;
      this.item.label = docType.label;
    }
  }

  onFileName(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.item.file = file;
    }
  }

  add(): void {
    this.item = new Doc();
    this.item.id = 0;
    this.item.name = '-';
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  edit(item: Doc): void {
    this.item = item;
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  view(item: Doc): void {
    // console.log(item);
    item.srcUrl = this.api.getApiPrefix() + item.srcPath + '?apiKey=' + this.api.sessionUser.accessToken;
    const initialState = {doc: item};
    this.modalService.show(DocViewerComponent, {initialState});
  }

  remove(): void {
    Swal.fire('Info!', 'Remove feature will come soon...', 'info');
    // const index: number = this.items.indexOf(this.item);
    // if (index !== -1) {
    //   this.items.splice(index, 1);
    //   this.add();
    // }
  }

  save(): void {
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    if (this.item.name === '-') {
      this.toastr.error('Please select valid document name');
      return;
    }
    this.api.uploadData(this.entityName, this.entityId,
      this.item.name, this.item.file).subscribe((data) => {
      console.log(data);
      this.item.fileName = this.item.name + this.item.file.name.substring(this.item.file.name.indexOf('.'));
      if (this.item.id === 0) {
        this.item.id = ++this.counter;
        this.items.push(this.item);
        this.add();
      }
    }, (error) => {
      console.log(error);
      Swal.fire('Error!', 'Oops! Upload failed...', 'error');
    });
  }
}
