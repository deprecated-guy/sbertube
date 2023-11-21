import { BackendErrors, User } from '@types';

export interface UserState {
	isLoading: boolean | null;
	user: User | null;
	error: BackendErrors | null;
}
