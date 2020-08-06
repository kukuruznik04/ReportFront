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

}
