import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service';
import { HouseService } from '../../services/house.service';
import { PlanetService } from '../../services/planet.service';
import { SHP } from '../../models/shp';

@Component({
  selector: 'app-sign-house-planet',
  templateUrl: './sign-house-planet.component.html',
  styleUrls: ['./sign-house-planet.component.less']
})
export class SignHousePlanetComponent implements OnInit {

  signs: SHP[];
  houses: SHP[];
  planets: SHP[];
  showInputs1 = false;
  showInputs2 = false;
  showInputs3 = false;
  inputName: string = '';

  constructor(private signService: SignService,
    private houseService: HouseService,
    private planetService: PlanetService) { }

  ngOnInit(): void {
    this.signService.getAll().subscribe((v: SHP[]) => {
      this.signs = v;
    });
    this.houseService.getAll().subscribe((v: SHP[]) => {
      this.houses = v;
    });
    this.planetService.getAll().subscribe((v: SHP[]) => {
      this.planets = v;
    });
  }

  save(type: string) {
    
    if (type == 'planet') {
      this.showInputs3 = false;
      this.planetService.post({name: this.inputName}).subscribe(() => {
        this.planetService.getAll().subscribe((v: SHP[]) => {
          this.planets = v;
        });
      });
    } else if (type == 'house') {
      this.showInputs2 = false;
      this.houseService.post({name: this.inputName}).subscribe(() => {
        this.houseService.getAll().subscribe((v: SHP[]) => {
          this.houses = v;
        });
      });
    } else if (type == 'sign') {
      this.showInputs1 = false;
      this.signService.post({name: this.inputName}).subscribe(() => {
        this.signService.getAll().subscribe((v: SHP[]) => {
          this.signs = v;
        });
      });
    }
  }

  delete(type: string, id: string) {
    if (type == 'planet') {
      this.planetService.delete(id).subscribe(() => {
        this.planetService.getAll().subscribe((v: SHP[]) => {
          this.planets = v;
        });
      });
    } else if (type == 'house') {
      this.houseService.delete(id).subscribe(() => {
        this.houseService.getAll().subscribe((v: SHP[]) => {
          this.houses = v;
        });
      });
    } else if (type == 'sign') {
      this.signService.delete(id).subscribe(() => {
        this.signService.getAll().subscribe((v: SHP[]) => {
          this.signs = v;
        });
      });
    }
  }

}
