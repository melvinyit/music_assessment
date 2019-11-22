import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { TestUploadComponent } from './components/test-component/test-upload.component';
import { HomeComponent } from './components/home.component';
import { ResultComponent } from './components/result.component';
import { ListMusicComponent } from './components/list-music.component';
import { DisplayMusicComponent } from './components/display-music.component';
import { EmptyComponent } from './components/test-component/empty.component';
import { UploadMusicComponent } from './components/upload-music.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    TestUploadComponent,
    HomeComponent,
    ResultComponent,
    ListMusicComponent,
    DisplayMusicComponent,
    EmptyComponent,
    UploadMusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
