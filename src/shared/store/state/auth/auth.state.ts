import { BackendErrors, User } from '@types';

export interface AuthState {
	isLoading: boolean | null;
	activationData: { id: string; code: string } | null;
	user: User | null;
	error: BackendErrors | null;
}
