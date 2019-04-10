import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { MainRoutingModule } from './main-routing.module';

import { ListComponent } from './list/list/list.component';
import { ArticlesComponent } from './list/articles/articles.component';
import { ProjectsComponent } from './list/projects/projects.component';
import { OthersComponent } from './list/others/others.component';

@NgModule({
  declarations: [ListComponent, ArticlesComponent, ProjectsComponent, OthersComponent],
  imports: [
    SharedModule,
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
