import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EditoSharedModule } from 'app/shared/shared.module';
import { EditoCoreModule } from 'app/core/core.module';
import { EditoAppRoutingModule } from './app-routing.module';
import { EditoHomeModule } from './home/home.module';
import { EditoEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EditoSharedModule,
    EditoCoreModule,
    EditoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EditoEntityModule,
    EditoAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class EditoAppModule {}
