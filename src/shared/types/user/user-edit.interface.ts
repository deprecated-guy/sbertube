import { Color } from '@services';

export interface UserEdit {
	username: string;
	email: string;
	password: string;
	bannerBackground: Color;
	avatarBackGround: Color;
}
