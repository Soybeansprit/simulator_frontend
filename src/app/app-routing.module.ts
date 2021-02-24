import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesOntologyComponent } from './rules-ontology/rules-ontology.component';
import { RandomAllComponent } from './random-all/random-all.component';
import { MainComponent } from './main/main.component';
import { IfdPlanComponent } from './ifd-plan/ifd-plan.component';
import {SceneDetailsComponent} from './scene-details/scene-details.component';

const routes: Routes = [
  {path: '',redirectTo:'/main',pathMatch:'full'},
  {path:'main',component:MainComponent},
  {path: 'ifd-plan', component:IfdPlanComponent},
  {path :'random-all',component:RandomAllComponent},
  {path : 'rules-ontology',component:RulesOntologyComponent},
  {path : 'scene-details',component:SceneDetailsComponent},
  {path: 'scene-details/:id', component:SceneDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
