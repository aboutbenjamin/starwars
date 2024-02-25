import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaCardComponent } from './persona-card/persona-card.component';
import { PersonaDetailsComponent } from './persona-details/persona-details.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    PersonaCardComponent,
    PersonaDetailsComponent,
    PlanetsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
