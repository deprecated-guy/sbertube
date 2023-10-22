import { Color } from '@shared/types';

export interface UserEdit {
	username: string;
	email: string;
	password: string;
	bannerBackground: Color;
	avatarBackGround: Color;
}
