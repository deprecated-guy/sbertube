import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { PersistenceService } from '@shared/services';
import { User } from '@types';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { IS_MOBILE } from '@di';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
	selector: 'sb-header',
	standalone: true,
	imports: [CommonModule, UserAvatarComponent, RouterLink, RouterLinkActive, NgxMaskDirective],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	private _userService = inject(UserService);
	private _persistenceService = inject(PersistenceService);
	private _destroyRef = inject(DestroyRef);
	protected token = this._persistenceService.getItem('token');
	protected user$!: Observable<User>;
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected IS_LANDSCAPE$ = inject(IS_MOBILE);

	ngOnInit() {
		if (this.token) {
			this.user$ = this._userService.getCurrentUser();
		}
	}
}
