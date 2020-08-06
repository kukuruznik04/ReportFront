import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ParagraphService } from '../../services/paragraph.service';
import { Paragraph } from '../../models/paragraph';
import { SignService } from '../../services/sign.service';
import { HouseService } from '../../services/house.service';
import { PlanetService } from '../../services/planet.service';
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
    private planetService: PlanetService) {
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

}
