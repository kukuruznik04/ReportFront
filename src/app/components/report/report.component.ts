import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import { ParagraphService } from 'src/app/services/paragraph.service';
import { Paragraph } from 'src/app/models/paragraph';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {

  reports: Report[];
  paragraphs: Paragraph[];
  columns = ['paragraph1','paragraph2','paragraph3','paragraph4','paragraph5'];
  columnsToShow: string[];
  showInputs = false;
  form: FormGroup;

  constructor(private reportService: ReportService,
    private paragraphService: ParagraphService) { }

  ngOnInit(): void {
    this.columnsToShow = this.columns.slice();
    this.columnsToShow.push('action');
    this.reportService.getAll().subscribe((v: Report[]) => {
      this.reports = v;
    });
    this.paragraphService.getAll().subscribe((v: Paragraph[]) => {
      this.paragraphs = v;
    });
    this.form = new FormGroup({
      paragraph1id: new FormControl(''),
      paragraph2id: new FormControl(''),
      paragraph3id: new FormControl(''),
      paragraph4id: new FormControl(''),
      paragraph5id: new FormControl('')
    });
  }

  save() {
    this.showInputs = false;
    let request = this.form.value;
    for (let p in request) {
      if (!request[p]) delete request[p];
    }
    this.reportService.post(request).subscribe(v => {
      this.reportService.getAll().subscribe((v: Report[]) => {
        this.reports = v;
      });
    });
  }

  delete(id: string) {
    this.reportService.delete(id).subscribe(v => {
      this.reportService.getAll().subscribe((v: Report[]) => {
        this.reports = v;
      });
    });
  }

}
