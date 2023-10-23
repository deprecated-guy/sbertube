import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@showcase/components/ui';
import { VideoLoaderService } from '@showcase/services';
import { SEARCH_FORM } from '@di';
import { IconComponent, PlayerComponent } from '@ui';
import { UserAvatarComponent } from '@shared/ui/components/user';

@Component({
	selector: 'sb-welcome-page',
	standalone: true,
	imports: [CommonModule, ButtonComponent, IconComponent, PlayerComponent, UserAvatarComponent],
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
	animations: [],
})
export class WelcomePageComponent {
	private _videoLoader = inject(VideoLoaderService);
	protected search = inject(SEARCH_FORM);
	protected videos$ = this._videoLoader.getVideos(this.search.get('search')?.value as string);
}
