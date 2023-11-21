import { BackendErrors, Video } from '@types';

export interface VideoState {
	isLoading: boolean | null;
	video: Video | Video[] | null;
	error: BackendErrors | null;
}
