import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ITheme {
  id?: number;
  createDate?: Moment;
  publishDate?: Moment;
  title?: string;
  description?: string;
  user?: IUser;
}

export class Theme implements ITheme {
  constructor(
    public id?: number,
    public createDate?: Moment,
    public publishDate?: Moment,
    public title?: string,
    public description?: string,
    public user?: IUser
  ) {}
}
