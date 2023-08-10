import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { PostDashboardComponent } from './Post-dash/post.dash.component';
import { CreatePostComponent } from './Post-dash/create-post/create-post.component';
import {VerifyPostComponent} from './Post-dash/verify-post/verify.post.component'
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path:'post',
        component:PostDashboardComponent
      },
      {
        path:'createPost',
        component:CreatePostComponent
      },
      {
        path:'verifyPost',
        component:VerifyPostComponent
      }
    ],
  },
];
