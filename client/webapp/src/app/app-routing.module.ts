import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { TestUploadComponent } from './components/test-component/test-upload.component';
import { EmptyComponent } from './components/test-component/empty.component';
import { HomeComponent } from './components/home.component';
import { UploadMusicComponent } from './components/upload-music.component';
import { ResultComponent } from './components/result.component';
import { ListMusicComponent } from './components/list-music.component';
import { DisplayMusicComponent } from './components/display-music.component';
import { CheckoutMusicComponent } from './components/checkout-music.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'upload',component:UploadMusicComponent},
  {path:'result',component:ResultComponent},
  {path:'list/music',component:ListMusicComponent},
  {path:'checkout/music/:userid',component:CheckoutMusicComponent},
  {path:'display/:musicid',component:DisplayMusicComponent},
  {path:'',component:EmptyComponent,outlet:'testoutlet'},
  { path: "**", redirectTo: "/", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
