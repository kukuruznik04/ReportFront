import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ParagraphService } from '../../services/paragraph.service';
import { Paragraph } from '../../models/paragraph';
import { SignService } from '../../services/sign.service';
import { HouseService } from '../../services/house.service';
import { PlanetService } from '../../services/planet.service';
import { ExcelService } from '../../services/excel.service';
import { SHP } from '../../models/shp';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.less']
})
export class ParagraphComponent implements OnInit {

  paragraph: Paragraph[];
  columns = ['name',
    'age',
    'gender',
    'planet',
    'house',
    'sign',];
  columnsToShow = ['name',
    'age',
    'gender',
    'planet',
    'house',
    'sign',
    'action'];
  showInputs = false;
  select = {
    gender: [
      {
        name: "Мужской",
        id: "M"
      },
      {
        name: "Женский",
        id: "F"
      },
    ]
  };
  form: FormGroup;
  columnToFormControl = {};

  constructor(private paragraphService: ParagraphService,
    private signService: SignService,
    private houseService: HouseService,
    private planetService: PlanetService,
    private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      planetId: new FormControl(''),
      houseId: new FormControl(''),
      signId: new FormControl(''),
    });
    this.paragraphService.getAll().subscribe((v: Paragraph[]) => {
      this.paragraph = v;
      if (this.paragraph && this.paragraph) {
        this.columns = Object.keys(this.paragraph[0]);
        this.columns.shift();
        this.columnsToShow = Object.keys(this.paragraph[0]);
        this.columnsToShow.shift();
        this.columnsToShow.push('action');
        this.columns.forEach(v => { 
          if (v == 'planet') this.columnToFormControl[v] = 'planetId'; else
          if (v == 'house') this.columnToFormControl[v] = 'houseId'; else
          if (v == 'sign') this.columnToFormControl[v] = 'signId'; else
          this.columnToFormControl[v] = v;
        });
      }
      console.log(this.paragraph);
    });
    this.signService.getAll().subscribe((v: SHP[]) => {
      this.select['sign'] = v;
    });
    this.houseService.getAll().subscribe((v: SHP[]) => {
      this.select['house'] = v;
    });
    this.planetService.getAll().subscribe((v: SHP[]) => {
      this.select['planet'] = v;
      console.log(this.select);
    });
  }

  getColumnData(column: string, element: Paragraph) {
    if (element[column] && typeof element[column] === 'object') {
      return element[column].name;
    }
    return element[column];
  }

  save() {
    this.showInputs = false;
    let request = this.form.value;
    for (let p in request) {
      if (!request[p]) delete request[p];
    }
    this.paragraphService.post(request).subscribe(v => {
      this.paragraphService.getAll().subscribe((v: Paragraph[]) => {
        this.paragraph = v;
      });
    });
  }

  delete(id: string) {
    this.paragraphService.delete(id).subscribe(() => {
      this.paragraphService.getAll().subscribe((v: Paragraph[]) => {
        this.paragraph = v;
      });
    });
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelService.importFromFile(bstr);

      const header = data.slice(0, 1);
      const importedData = data.slice(1, -1);

      if (header && header.length && importedData && importedData.length) {
        for (let k = 0; k < importedData.length; k++) {
          let request = {};
          for (let i = 0; i < header[0].length; i++) {
            if (header[0][i] && importedData[k][i]) {
              request[header[0][i]] = importedData[k][i];
            }
          }
          this.paragraphService.post(request).subscribe(() => {});
        }
      }
    };
    reader.readAsBinaryString(target.files[0]);

  }

  refresh() {
    this.paragraphService.getAll().subscribe((v: Paragraph[]) => {
      this.paragraph = v;
    });
  }

}
