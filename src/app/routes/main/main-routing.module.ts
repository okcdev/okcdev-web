import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list/list.component';
import { ArticlesComponent } from './list/articles/articles.component';
import { ProjectsComponent } from './list/projects/projects.component';
import { OthersComponent } from './list/others/others.component';

const routes: Routes = [
  {
    path: 'list',
    children: [
      {
        path: '',
        component: ListComponent,
        children: [
          { path: '', component: ArticlesComponent },
          { path: 'articles', component: ArticlesComponent, data: { title: '文章' } },
          { path: 'projects', component: ProjectsComponent, data: { title: '项目' } },
          { path: 'others', component: OthersComponent, data: { title: '其他' } },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
