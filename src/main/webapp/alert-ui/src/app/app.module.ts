import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
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
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { TagInputModule } from 'ng2-tag-input';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


@NgModule({
  declarations: [
    AppComponent,
    ZoneComponent,
    ZoneDetailComponent,
    UserComponent,
    UserDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ZoneSearchComponent,
    UserSearchComponent,
    MapDirective,
    GeometryToolComponent,
    ButtonGroupDirective,
    ButtonDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TagInputModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, <InMemoryBackendConfigArgs>{
        dataEncapsulation: false
      }
    )
  ],
  providers: [
    ZoneService,
    UserService,
    MessageService,
    GeometryService,
    FeatureOverlayService,
    NgeoUtilsService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
