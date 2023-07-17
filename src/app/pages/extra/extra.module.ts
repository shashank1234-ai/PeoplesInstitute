import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { ExtraRoutes } from './extra.routing';
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { ExamDashComponent } from './Exam-dash/Exam-dash.component';
import { ExamOnboardComponent } from './Exam-dash/ExamOnboard/exam-onboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CurateDashComponent } from './curate/curate-dash/curate-dash.component';
import { QuestionConfigComponent } from './curate/question-config/question-config.component';
import { ExamConfigurationComponent } from './Exam-dash/ExamConfigurationDetails/exam-configurationdetails.component';
import { WorkComponent } from './work/work.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatTabsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    PdfViewerModule,
    AngularFireStorageModule
    
  ],
  declarations: [
    AppIconsComponent,
    AppSamplePageComponent,
    ExamDashComponent,
    ExamOnboardComponent,
    CurateDashComponent,
    QuestionConfigComponent,
    ExamConfigurationComponent,
    WorkComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

})
export class ExtraModule {}
