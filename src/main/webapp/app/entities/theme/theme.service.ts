import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITheme } from 'app/shared/model/theme.model';

type EntityResponseType = HttpResponse<ITheme>;
type EntityArrayResponseType = HttpResponse<ITheme[]>;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public resourceUrl = SERVER_API_URL + 'api/themes';

  constructor(protected http: HttpClient) {}

  create(theme: ITheme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(theme);
    return this.http
      .post<ITheme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(theme: ITheme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(theme);
    return this.http
      .put<ITheme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITheme>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITheme[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(theme: ITheme): ITheme {
    const copy: ITheme = Object.assign({}, theme, {
      createDate: theme.createDate && theme.createDate.isValid() ? theme.createDate.format(DATE_FORMAT) : undefined,
      publishDate: theme.publishDate && theme.publishDate.isValid() ? theme.publishDate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createDate = res.body.createDate ? moment(res.body.createDate) : undefined;
      res.body.publishDate = res.body.publishDate ? moment(res.body.publishDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((theme: ITheme) => {
        theme.createDate = theme.createDate ? moment(theme.createDate) : undefined;
        theme.publishDate = theme.publishDate ? moment(theme.publishDate) : undefined;
      });
    }
    return res;
  }
}
