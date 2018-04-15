import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {
  HttpClientInMemoryWebApiModule,
  InMemoryBackendConfigArgs
} from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { ZoneComponent } from './zone/zones/zones.component';
import { ZoneDetailComponent } from './zone/zone-detail/zone-detail.component';
import {ZoneService} from "./zone/zone.service";
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { ZoneSearchComponent } from './zone/zone-search/zone-search.component';
import { MapDirective } from './ngeo/map/map.directive';
import { GeometryToolComponent } from './ngeo/geom/geometry-tool/geometry-tool.component';
import {GeometryService} from "./ngeo/geom/geometry.service";
import {FeatureOverlayService} from "./ngeo/feature-overlay/feature-overlay.service";
import {NgeoUtilsService} from "./ngeo/ngeo-utils.service";
import { ButtonGroupDirective } from './ngeo/button/button-group.directive';
import { ButtonDirective } from './ngeo/button/button.directive';
import {UserComponent} from "./user/users/users.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {UserSearchComponent} from "./user/user-search/user-search.component";
import {UserService} from "./user/user.service";
import {ApiService} from "./common/api.service";
import { TagInputModule } from 'ngx-chips';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import 'hammerjs';
import 'web-animations-js';
import { HomeComponent } from './home/home.component';
import {BassinComponent} from "./bassin/bassins/bassins.component";
import {BassinService} from "./bassin/bassin.service";
import {BassinDetailComponent} from "./bassin/bassin-detail/bassin-detail.component";
import {BassinMapService} from "./bassin/bassin-map.service";

@NgModule({
  declarations: [
    AppComponent,
    BassinComponent,
    BassinDetailComponent,
    ZoneComponent,
    ZoneDetailComponent,
    UserComponent,
    UserDetailComponent,
    MessagesComponent,
    ZoneSearchComponent,
    UserSearchComponent,
    MapDirective,
    GeometryToolComponent,
    ButtonGroupDirective,
    ButtonDirective,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TagInputModule,

    // environment.dev ? HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, <InMemoryBackendConfigArgs>{
    //     dataEncapsulation: false
    //   }
    // ) : [],

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,

    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    ZoneService,
    BassinService,
    BassinMapService,
    UserService,
    ApiService,
    MessageService,
    GeometryService,
    FeatureOverlayService,
    NgeoUtilsService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
