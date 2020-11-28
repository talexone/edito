import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditoSharedModule } from 'app/shared/shared.module';
import { ThemeComponent } from './theme.component';
import { ThemeDetailComponent } from './theme-detail.component';
import { ThemeUpdateComponent } from './theme-update.component';
import { ThemeDeleteDialogComponent } from './theme-delete-dialog.component';
import { themeRoute } from './theme.route';

@NgModule({
  imports: [EditoSharedModule, RouterModule.forChild(themeRoute)],
  declarations: [ThemeComponent, ThemeDetailComponent, ThemeUpdateComponent, ThemeDeleteDialogComponent],
  entryComponents: [ThemeDeleteDialogComponent],
})
export class EditoThemeModule {}
