import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { TestUploadComponent } from './components/test-component/test-upload.component';


const routes: Routes = [
  {path:'',component:TestComponentComponent},
  {path:'',component:TestUploadComponent,outlet:'testoutlet'},
  { path: "**", redirectTo: "/", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
