import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { ExamDashComponent } from './Exam-dash/Exam-dash.component';
import { ExamOnboardComponent } from './Exam-dash/ExamOnboard/exam-onboard.component';
import { CurateDashComponent } from './curate/curate-dash/curate-dash.component';
import { QuestionConfigComponent } from './curate/question-config/question-config.component';
import { ExamConfigurationComponent } from './Exam-dash/ExamConfigurationDetails/exam-configurationdetails.component';
import {WorkComponent} from './work/work.component';
export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path:'exam-dashboard',
        component:ExamDashComponent
      },
      {
        path:'onboard-exam',
        component:ExamOnboardComponent
      },
      {
        path:'curate',
        component:CurateDashComponent
      },
      {
        path:'Questions/:id',
        component:QuestionConfigComponent
      },
      {
        path:'exam-dashboard/:id',
        component:ExamConfigurationComponent
      },
      {
        path:'mywork',
        component:WorkComponent
      }
    ],
  },
];
