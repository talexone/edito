import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITheme, Theme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-theme-update',
  templateUrl: './theme-update.component.html',
})
export class ThemeUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  createDateDp: any;
  publishDateDp: any;

  editForm = this.fb.group({
    id: [],
    createDate: [],
    publishDate: [],
    title: [],
    description: [],
    user: [],
  });

  constructor(
    protected themeService: ThemeService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ theme }) => {
      this.updateForm(theme);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(theme: ITheme): void {
    this.editForm.patchValue({
      id: theme.id,
      createDate: theme.createDate,
      publishDate: theme.publishDate,
      title: theme.title,
      description: theme.description,
      user: theme.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const theme = this.createFromForm();
    if (theme.id !== undefined) {
      this.subscribeToSaveResponse(this.themeService.update(theme));
    } else {
      this.subscribeToSaveResponse(this.themeService.create(theme));
    }
  }

  private createFromForm(): ITheme {
    return {
      ...new Theme(),
      id: this.editForm.get(['id'])!.value,
      createDate: this.editForm.get(['createDate'])!.value,
      publishDate: this.editForm.get(['publishDate'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITheme>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
