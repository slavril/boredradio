import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PlayerComponent } from './pages/player/player.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SongItemComponent } from './pages/player/song-item/song-item.component';
import { RoundButtonComponent } from './components/round-button/round-button.component';
import { RealButton } from './components/round-button/real-button.componen';
import { AnimatedTextComponent } from './components/animated-text/animated-text.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SongItemComponent,
    RoundButtonComponent,
    RealButton,
    AnimatedTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
