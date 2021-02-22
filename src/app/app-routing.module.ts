import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'',component: ListComponent},
  {path:'detail/:id/:type',component: DetailComponent}
];
// les routes défiies foncitonnent avec lecomponent-outlet
// <router-outler></router-outlet>
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
