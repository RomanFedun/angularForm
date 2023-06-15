import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperFormComponent } from './developer-form/developer-form.component';

const routes: Routes = [
  {path: 'form', component: DeveloperFormComponent},
  {path: '', redirectTo: 'form', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
