import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IfdPlanComponent } from './ifd-plan/ifd-plan.component';
import {SceneDetailsComponent} from './scene-details/scene-details.component';
import {RuleAnalysisComponent} from './rule-analysis/rule-analysis.component';

const routes: Routes = [
  {path: '',redirectTo:'/main',pathMatch:'full'},
  {path:'main',component:MainComponent},
  {path: 'ifd-plan', component:IfdPlanComponent},
  {path : 'scene-details',component:SceneDetailsComponent},
  {path: 'scene-details/:id', component:SceneDetailsComponent},
  {path: 'rule-analysis', component:RuleAnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
