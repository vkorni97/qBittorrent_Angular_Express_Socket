import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './view/home-page/home-page.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { RegisterPageComponent } from './view/register-page/register-page.component';
import { ComponentsModule } from './modules/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseMenuComponent } from './components/collapse-menu/collapse-menu.component';
import { MenuItemComponent } from './components/collapse-menu/menu-item/menu-item.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { TorrentItemComponent } from './components/torrent-item/torrent-item.component';
import { TorrentItemContextComponent } from './components/torrent-item/context/context.component';
import { ConvertUnitPipe } from './pipes/convert-unit.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { HintDirective } from './directives/hint.directive';
import { TorrentItemDirective } from './directives/context/torrent-item.directive';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CollapseMenuComponent,
    MenuItemComponent,
    HeaderComponent,
    ProgressBarComponent,
    TorrentItemComponent,
    TorrentItemContextComponent,
    ConvertUnitPipe,
    FilterPipe,
    HintDirective,
    TorrentItemDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgApexchartsModule,
    ScrollingModule,
    OverlayModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: SocketService) => () => () => {},
      deps: [SocketService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
