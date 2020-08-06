import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { SignHousePlanetComponent } from './components/sign-house-planet/sign-house-planet.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'paragraph',
    component: ParagraphComponent
  },
  {
    path: 'sign-house-plant',
    component: SignHousePlanetComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: '',
    redirectTo: '/paragraph',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/paragraph',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
